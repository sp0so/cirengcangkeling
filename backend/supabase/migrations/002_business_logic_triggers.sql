-- ====================================================================
-- CIRENG CANGKELING MANAGEMENT INFORMATION SYSTEM
-- Migration 002: Stored Procedures, Functions & Triggers
-- Matches: SRS Section 7 (Business Rules) & Section 8 (Process Flows)
-- ====================================================================

-- 1. Automatic Timestamp Updater
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE OR REPLACE TRIGGER trg_raw_materials_updated_at
BEFORE UPDATE ON public.raw_materials
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE OR REPLACE TRIGGER trg_recipes_updated_at
BEFORE UPDATE ON public.recipes
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE OR REPLACE TRIGGER trg_business_profiles_updated_at
BEFORE UPDATE ON public.business_profiles
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 2. Procedure: Process POS Checkout (Atomically updates stock & session totals)
CREATE OR REPLACE FUNCTION public.process_pos_checkout(
    p_session_id UUID,
    p_user_id UUID,
    p_items JSONB, -- Array of { "product_id": "uuid", "product_name": "string", "quantity": 1, "unit_price": 15000, "subtotal": 15000 }
    p_payment_method payment_method,
    p_amount_paid NUMERIC,
    p_discount NUMERIC DEFAULT 0,
    p_notes TEXT DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
    v_session RECORD;
    v_invoice_number VARCHAR(100);
    v_subtotal NUMERIC := 0;
    v_total_amount NUMERIC := 0;
    v_change_amount NUMERIC := 0;
    v_item JSONB;
    v_prod_id UUID;
    v_qty INT;
    v_price NUMERIC;
    v_item_subtotal NUMERIC;
    v_item_name VARCHAR(150);
    v_curr_stock INT;
    v_tx_id UUID;
BEGIN
    -- Verify active session
    SELECT * INTO v_session FROM public.cashier_sessions 
    WHERE id = p_session_id AND status = 'active';

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Sesi kasir tidak aktif atau tidak ditemukan.';
    END IF;

    -- Calculate total from items
    FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
    LOOP
        v_subtotal := v_subtotal + ((v_item->>'subtotal')::NUMERIC);
    END LOOP;

    v_total_amount := v_subtotal - p_discount;
    IF v_total_amount < 0 THEN
        v_total_amount := 0;
    END IF;

    IF p_payment_method = 'tunai' THEN
        IF p_amount_paid < v_total_amount THEN
            RAISE EXCEPTION 'Jumlah uang yang dibayarkan kurang dari total belanja.';
        END IF;
        v_change_amount := p_amount_paid - v_total_amount;
    ELSE
        p_amount_paid := v_total_amount;
        v_change_amount := 0;
    END IF;

    -- Generate Invoice Number: INV-YYYYMMDD-XXXX
    v_invoice_number := 'INV-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');

    -- Insert Transaction
    INSERT INTO public.sales_transactions (
        invoice_number,
        cashier_session_id,
        user_id,
        transaction_date,
        subtotal,
        discount,
        total_amount,
        payment_method,
        amount_paid,
        change_amount,
        status,
        notes
    ) VALUES (
        v_invoice_number,
        p_session_id,
        p_user_id,
        NOW(),
        v_subtotal,
        p_discount,
        v_total_amount,
        p_payment_method,
        p_amount_paid,
        v_change_amount,
        'completed',
        p_notes
    ) RETURNING id INTO v_tx_id;

    -- Process Details & Stock Deductions
    FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
    LOOP
        v_prod_id := (v_item->>'product_id')::UUID;
        v_item_name := (v_item->>'product_name');
        v_qty := (v_item->>'quantity')::INT;
        v_price := (v_item->>'unit_price')::NUMERIC;
        v_item_subtotal := (v_item->>'subtotal')::NUMERIC;

        -- Check current product stock
        SELECT stock INTO v_curr_stock FROM public.products WHERE id = v_prod_id FOR UPDATE;
        IF NOT FOUND THEN
            RAISE EXCEPTION 'Produk dengan ID % tidak ditemukan.', v_prod_id;
        END IF;

        IF v_curr_stock < v_qty THEN
            RAISE EXCEPTION 'Stok produk "%" tidak mencukupi. Tersedia: %, diminta: %', v_item_name, v_curr_stock, v_qty;
        END IF;

        -- Insert item detail
        INSERT INTO public.sales_transaction_details (
            transaction_id,
            product_id,
            product_name,
            quantity,
            unit_price,
            subtotal
        ) VALUES (
            v_tx_id,
            v_prod_id,
            v_item_name,
            v_qty,
            v_price,
            v_item_subtotal
        );

        -- Deduct stock
        UPDATE public.products 
        SET stock = stock - v_qty 
        WHERE id = v_prod_id;

        -- Record Inventory Movement
        INSERT INTO public.inventory_movements (
            item_type,
            item_id,
            item_name,
            movement_type,
            quantity_change,
            previous_stock,
            current_stock,
            reference_id,
            reference_type,
            reason,
            created_by
        ) VALUES (
            'finished_good',
            v_prod_id,
            v_item_name,
            'sales',
            -v_qty,
            v_curr_stock,
            v_curr_stock - v_qty,
            v_tx_id,
            'sales_transaction',
            'Penjualan kasir: ' || v_invoice_number,
            p_user_id
        );
    END LOOP;

    -- Update Cashier Session Totals
    IF p_payment_method = 'tunai' THEN
        UPDATE public.cashier_sessions 
        SET total_cash_sales = total_cash_sales + v_total_amount 
        WHERE id = p_session_id;
    ELSE
        UPDATE public.cashier_sessions 
        SET total_non_cash_sales = total_non_cash_sales + v_total_amount 
        WHERE id = p_session_id;
    END IF;

    RETURN jsonb_build_object(
        'success', true,
        'transaction_id', v_tx_id,
        'invoice_number', v_invoice_number,
        'total_amount', v_total_amount,
        'amount_paid', p_amount_paid,
        'change_amount', v_change_amount
    );
END;
$$ LANGUAGE plpgsql;

-- 3. Procedure: Production Execution with Recipe-based Stock Deduction & HPP Calculation
CREATE OR REPLACE FUNCTION public.execute_production_batch(
    p_product_id UUID,
    p_planned_quantity INT,
    p_actual_quantity INT,
    p_raw_material_adjustments JSONB DEFAULT NULL, -- Optional override: [{"raw_material_id": "...", "actual_quantity": 2.5}]
    p_notes TEXT DEFAULT NULL,
    p_user_id UUID DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
    v_prod RECORD;
    v_recipe RECORD;
    v_detail RECORD;
    v_batch_number VARCHAR(100);
    v_production_id UUID;
    v_total_production_cost NUMERIC(14, 2) := 0;
    v_unit_hpp NUMERIC(12, 2) := 0;
    v_recipe_yield INT;
    v_scale_factor NUMERIC;
    v_mat_stock NUMERIC;
    v_mat_cost NUMERIC;
    v_mat_name VARCHAR(150);
    v_needed_qty NUMERIC;
    v_actual_qty NUMERIC;
    v_mat_cost_subtotal NUMERIC;
    v_adj_item JSONB;
BEGIN
    SELECT * INTO v_prod FROM public.products WHERE id = p_product_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Produk tidak ditemukan.';
    END IF;

    -- Retrieve Recipe
    SELECT * INTO v_recipe FROM public.recipes WHERE product_id = p_product_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Resep untuk produk % belum ditentukan.', v_prod.name;
    END IF;

    v_recipe_yield := v_recipe.yield_quantity;
    v_scale_factor := (p_actual_quantity::NUMERIC) / (v_recipe_yield::NUMERIC);

    v_batch_number := 'BATCH-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 1000)::TEXT, 3, '0');

    -- Insert Production Record
    INSERT INTO public.productions (
        batch_number,
        product_id,
        planned_quantity,
        actual_quantity,
        status,
        production_date,
        notes,
        created_by
    ) VALUES (
        v_batch_number,
        p_product_id,
        p_planned_quantity,
        p_actual_quantity,
        'completed',
        CURRENT_DATE,
        p_notes,
        p_user_id
    ) RETURNING id INTO v_production_id;

    -- Process Recipe Ingredients & Deduct Raw Material Stock
    FOR v_detail IN 
        SELECT rd.*, rm.name as mat_name, rm.stock as mat_stock, rm.cost_per_unit as mat_cost
        FROM public.recipe_details rd
        JOIN public.raw_materials rm ON rm.id = rd.raw_material_id
        WHERE rd.recipe_id = v_recipe.id
    LOOP
        v_needed_qty := v_detail.quantity * v_scale_factor;
        v_actual_qty := v_needed_qty;

        -- Check if manual override provided
        IF p_raw_material_adjustments IS NOT NULL THEN
            FOR v_adj_item IN SELECT * FROM jsonb_array_elements(p_raw_material_adjustments)
            LOOP
                IF (v_adj_item->>'raw_material_id')::UUID = v_detail.raw_material_id THEN
                    v_actual_qty := (v_adj_item->>'actual_quantity')::NUMERIC;
                END IF;
            END LOOP;
        END IF;

        IF v_detail.mat_stock < v_actual_qty THEN
            RAISE EXCEPTION 'Bahan baku "%" tidak mencukupi untuk produksi. Tersedia: %, dibutuhkan: %', 
                v_detail.mat_name, v_detail.mat_stock, v_actual_qty;
        END IF;

        v_mat_cost_subtotal := v_actual_qty * v_detail.mat_cost;
        v_total_production_cost := v_total_production_cost + v_mat_cost_subtotal;

        -- Insert Production Detail
        INSERT INTO public.production_details (
            production_id,
            raw_material_id,
            estimated_quantity,
            actual_quantity,
            unit,
            cost_per_unit,
            total_cost
        ) VALUES (
            v_production_id,
            v_detail.raw_material_id,
            v_needed_qty,
            v_actual_qty,
            v_detail.unit,
            v_detail.mat_cost,
            v_mat_cost_subtotal
        );

        -- Deduct raw material stock
        UPDATE public.raw_materials
        SET stock = stock - v_actual_qty
        WHERE id = v_detail.raw_material_id;

        -- Log movement
        INSERT INTO public.inventory_movements (
            item_type,
            item_id,
            item_name,
            movement_type,
            quantity_change,
            previous_stock,
            current_stock,
            reference_id,
            reference_type,
            reason,
            created_by
        ) VALUES (
            'raw_material',
            v_detail.raw_material_id,
            v_detail.mat_name,
            'production_out',
            -v_actual_qty,
            v_detail.mat_stock,
            v_detail.mat_stock - v_actual_qty,
            v_production_id,
            'production',
            'Pemakaian produksi batch ' || v_batch_number,
            p_user_id
        );
    END LOOP;

    -- Calculate HPP per unit
    IF p_actual_quantity > 0 THEN
        v_unit_hpp := v_total_production_cost / p_actual_quantity;
    ELSE
        v_unit_hpp := 0;
    END IF;

    -- Update production cost fields
    UPDATE public.productions 
    SET calculated_cost = v_total_production_cost,
        cost_per_unit = v_unit_hpp
    WHERE id = v_production_id;

    -- Update Product Finished Goods Stock & HPP estimate
    UPDATE public.products
    SET stock = stock + p_actual_quantity,
        estimated_hpp = v_unit_hpp
    WHERE id = p_product_id;

    -- Log finished good addition
    INSERT INTO public.inventory_movements (
        item_type,
        item_id,
        item_name,
        movement_type,
        quantity_change,
        previous_stock,
        current_stock,
        reference_id,
        reference_type,
        reason,
        created_by
    ) VALUES (
        'finished_good',
        p_product_id,
        v_prod.name,
        'production_in',
        p_actual_quantity,
        v_prod.stock,
        v_prod.stock + p_actual_quantity,
        v_production_id,
        'production',
        'Hasil produksi batch ' || v_batch_number,
        p_user_id
    );

    RETURN jsonb_build_object(
        'success', true,
        'production_id', v_production_id,
        'batch_number', v_batch_number,
        'actual_quantity', p_actual_quantity,
        'total_cost', v_total_production_cost,
        'cost_per_unit', v_unit_hpp
    );
END;
$$ LANGUAGE plpgsql;

-- 4. Procedure: Close Cashier Shift & Cash Reconciliation
-- Formula: Expected Cash = Opening Cash + Cash Sales - Cash Expenses - Cash Refunds
-- Difference = Actual Cash - Expected Cash
CREATE OR REPLACE FUNCTION public.close_cashier_shift(
    p_session_id UUID,
    p_actual_cash NUMERIC,
    p_notes TEXT DEFAULT NULL,
    p_closed_by UUID DEFAULT NULL,
    p_is_force_close BOOLEAN DEFAULT FALSE,
    p_force_reason TEXT DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
    v_session RECORD;
    v_expected_cash NUMERIC;
    v_difference NUMERIC;
    v_new_status cashier_session_status;
BEGIN
    SELECT * INTO v_session FROM public.cashier_sessions 
    WHERE id = p_session_id AND status = 'active';

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Sesi kasir tidak ditemukan atau sudah ditutup.';
    END IF;

    -- Calculate expected cash according to SRS 7.3:
    v_expected_cash := v_session.opening_cash + v_session.total_cash_sales - v_session.total_cash_expenses - v_session.total_cash_refunds;
    v_difference := p_actual_cash - v_expected_cash;

    IF p_is_force_close THEN
        v_new_status := 'force_closed';
    ELSE
        v_new_status := 'closed';
    END IF;

    UPDATE public.cashier_sessions
    SET status = v_new_status,
        closed_at = NOW(),
        actual_cash = p_actual_cash,
        expected_cash = v_expected_cash,
        cash_difference = v_difference,
        notes = p_notes,
        force_close_reason = p_force_reason,
        closed_by = p_closed_by
    WHERE id = p_session_id;

    -- Record Audit Trail
    INSERT INTO public.audit_logs (
        user_id,
        action,
        entity_name,
        entity_id,
        old_values,
        new_values
    ) VALUES (
        p_closed_by,
        CASE WHEN p_is_force_close THEN 'FORCE_CLOSE_SHIFT' ELSE 'CLOSE_SHIFT' END,
        'cashier_sessions',
        p_session_id,
        jsonb_build_object('status', 'active', 'opening_cash', v_session.opening_cash),
        jsonb_build_object(
            'status', v_new_status,
            'expected_cash', v_expected_cash,
            'actual_cash', p_actual_cash,
            'cash_difference', v_difference,
            'force_reason', p_force_reason
        )
    );

    RETURN jsonb_build_object(
        'success', true,
        'session_id', p_session_id,
        'expected_cash', v_expected_cash,
        'actual_cash', p_actual_cash,
        'cash_difference', v_difference,
        'status', v_new_status
    );
END;
$$ LANGUAGE plpgsql;
