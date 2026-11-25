-- ====================================================================
-- CIRENG CANGKELING MANAGEMENT INFORMATION SYSTEM
-- Migration 006: Security, Concurrency, Idempotency & Accounting Fixes
-- ====================================================================

-- 1. Atomic Sequences for Invoice & Production Batch Numbers (No Random Collisions)
CREATE SEQUENCE IF NOT EXISTS public.sales_invoice_seq START 1;
CREATE SEQUENCE IF NOT EXISTS public.production_batch_seq START 1;

-- 2. Idempotency Key on Sales Transactions (Prevents duplicate checkouts on retry/double-click)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'sales_transactions'
          AND column_name = 'idempotency_key'
    ) THEN
        ALTER TABLE public.sales_transactions
        ADD COLUMN idempotency_key VARCHAR(128);
    END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS idx_sales_transactions_idempotency_key
ON public.sales_transactions (idempotency_key)
WHERE idempotency_key IS NOT NULL;

-- 3. Harden Helper Role Functions with explicit search_path
CREATE OR REPLACE FUNCTION public.is_owner()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'owner' AND is_active = TRUE
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.is_cashier()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'kasir' AND is_active = TRUE
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 4. Automatic Cash Expense Tracking in Cashier Sessions (INSERT / UPDATE / DELETE)
CREATE OR REPLACE FUNCTION public.sync_cashier_session_cash_expenses()
RETURNS TRIGGER AS $$
BEGIN
    -- Subtract old cash expense if applicable
    IF TG_OP IN ('UPDATE', 'DELETE') THEN
        IF OLD.payment_method = 'cash' AND OLD.cashier_session_id IS NOT NULL THEN
            UPDATE public.cashier_sessions
            SET total_cash_expenses = GREATEST(0, total_cash_expenses - OLD.amount)
            WHERE id = OLD.cashier_session_id;
        END IF;
    END IF;

    -- Add new cash expense if applicable
    IF TG_OP IN ('INSERT', 'UPDATE') THEN
        IF NEW.payment_method = 'cash' AND NEW.cashier_session_id IS NOT NULL THEN
            UPDATE public.cashier_sessions
            SET total_cash_expenses = total_cash_expenses + NEW.amount
            WHERE id = NEW.cashier_session_id;
        END IF;
    END IF;

    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS trg_sync_cashier_session_cash_expenses ON public.expenses;
CREATE TRIGGER trg_sync_cashier_session_cash_expenses
AFTER INSERT OR UPDATE OR DELETE ON public.expenses
FOR EACH ROW EXECUTE FUNCTION public.sync_cashier_session_cash_expenses();

-- 5. Updated POS Checkout RPC (Sequence-based invoice, Idempotency, Row Locking, Auth Check, Payments record)
DROP FUNCTION IF EXISTS public.process_pos_checkout(UUID, UUID, JSONB, payment_method, NUMERIC, NUMERIC, TEXT);

CREATE OR REPLACE FUNCTION public.process_pos_checkout(
    p_session_id UUID,
    p_user_id UUID,
    p_items JSONB,
    p_payment_method payment_method,
    p_amount_paid NUMERIC,
    p_discount NUMERIC DEFAULT 0,
    p_notes TEXT DEFAULT NULL,
    p_idempotency_key VARCHAR(128) DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
    v_session RECORD;
    v_existing_tx RECORD;
    v_seq BIGINT;
    v_seq_str TEXT;
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
    -- Idempotency check before mutating any state
    IF p_idempotency_key IS NOT NULL THEN
        SELECT * INTO v_existing_tx
        FROM public.sales_transactions
        WHERE idempotency_key = p_idempotency_key;

        IF FOUND THEN
            RETURN jsonb_build_object(
                'success', true,
                'idempotent_replay', true,
                'transaction_id', v_existing_tx.id,
                'invoice_number', v_existing_tx.invoice_number,
                'total_amount', v_existing_tx.total_amount,
                'amount_paid', v_existing_tx.amount_paid,
                'change_amount', v_existing_tx.change_amount
            );
        END IF;
    END IF;

    -- Lock and verify active session
    SELECT * INTO v_session FROM public.cashier_sessions
    WHERE id = p_session_id AND status = 'active'
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Sesi kasir tidak aktif atau tidak ditemukan.';
    END IF;

    -- Authorization check (enforce caller identity when invoked via Supabase Auth)
    IF current_user NOT IN ('postgres', 'service_role') THEN
        IF auth.uid() IS NULL THEN
            RAISE EXCEPTION 'Akses ditolak: pengguna belum terautentikasi.';
        END IF;
        IF NOT (public.is_owner() OR (public.is_cashier() AND p_user_id = auth.uid() AND v_session.user_id = auth.uid())) THEN
            RAISE EXCEPTION 'Akses ditolak: tidak memiliki izin memproses transaksi pada sesi ini.';
        END IF;
    END IF;

    IF p_items IS NULL OR jsonb_array_length(p_items) = 0 THEN
        RAISE EXCEPTION 'Keranjang transaksi tidak boleh kosong.';
    END IF;

    -- Calculate subtotal from authoritative product prices or validated payload
    FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
    LOOP
        v_qty := (v_item->>'quantity')::INT;
        v_price := (v_item->>'unit_price')::NUMERIC;
        IF v_qty <= 0 OR v_price < 0 THEN
            RAISE EXCEPTION 'Kuantitas atau harga item tidak valid.';
        END IF;
        v_subtotal := v_subtotal + (v_qty * v_price);
    END LOOP;

    IF p_discount < 0 THEN
        RAISE EXCEPTION 'Diskon tidak boleh bernilai negatif.';
    END IF;

    v_total_amount := GREATEST(0, v_subtotal - p_discount);

    IF p_payment_method = 'tunai' THEN
        IF p_amount_paid < v_total_amount THEN
            RAISE EXCEPTION 'Jumlah uang yang dibayarkan kurang dari total belanja.';
        END IF;
        v_change_amount := p_amount_paid - v_total_amount;
    ELSE
        p_amount_paid := v_total_amount;
        v_change_amount := 0;
    END IF;

    -- Generate Collision-Free Invoice Number using PostgreSQL Sequence (INV-YYYYMMDD-XXXX, expands cleanly >= 10000)
    v_seq := nextval('public.sales_invoice_seq');
    v_seq_str := CASE WHEN v_seq < 10000 THEN LPAD(v_seq::TEXT, 4, '0') ELSE v_seq::TEXT END;
    v_invoice_number := 'INV-' || TO_CHAR(NOW() AT TIME ZONE 'Asia/Jakarta', 'YYYYMMDD') || '-' || v_seq_str;

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
        notes,
        idempotency_key
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
        p_notes,
        p_idempotency_key
    ) RETURNING id INTO v_tx_id;

    -- Record payment entry
    INSERT INTO public.payments (
        transaction_id,
        payment_method,
        amount,
        status
    ) VALUES (
        v_tx_id,
        p_payment_method,
        v_total_amount,
        'completed'
    );

    -- Process Details & Stock Deductions
    FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
    LOOP
        v_prod_id := (v_item->>'product_id')::UUID;
        v_item_name := (v_item->>'product_name');
        v_qty := (v_item->>'quantity')::INT;
        v_price := (v_item->>'unit_price')::NUMERIC;
        v_item_subtotal := v_qty * v_price;

        SELECT stock INTO v_curr_stock FROM public.products WHERE id = v_prod_id FOR UPDATE;
        IF NOT FOUND THEN
            RAISE EXCEPTION 'Produk dengan ID % tidak ditemukan.', v_prod_id;
        END IF;

        IF v_curr_stock < v_qty THEN
            RAISE EXCEPTION 'Stok produk "%" tidak mencukupi. Tersedia: %, diminta: %', v_item_name, v_curr_stock, v_qty;
        END IF;

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

        UPDATE public.products
        SET stock = stock - v_qty
        WHERE id = v_prod_id;

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
        'idempotent_replay', false,
        'transaction_id', v_tx_id,
        'invoice_number', v_invoice_number,
        'total_amount', v_total_amount,
        'amount_paid', p_amount_paid,
        'change_amount', v_change_amount
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 6. Updated Production Batch RPC (Sequence-based batch number, Owner authorization)
CREATE OR REPLACE FUNCTION public.execute_production_batch(
    p_product_id UUID,
    p_planned_quantity INT,
    p_actual_quantity INT,
    p_raw_material_adjustments JSONB DEFAULT NULL,
    p_notes TEXT DEFAULT NULL,
    p_user_id UUID DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
    v_prod RECORD;
    v_recipe RECORD;
    v_detail RECORD;
    v_seq BIGINT;
    v_seq_str TEXT;
    v_batch_number VARCHAR(100);
    v_production_id UUID;
    v_total_production_cost NUMERIC(14, 2) := 0;
    v_unit_hpp NUMERIC(12, 2) := 0;
    v_recipe_yield INT;
    v_scale_factor NUMERIC;
    v_needed_qty NUMERIC;
    v_actual_qty NUMERIC;
    v_mat_cost_subtotal NUMERIC;
    v_adj_item JSONB;
BEGIN
    IF current_user NOT IN ('postgres', 'service_role') THEN
        IF NOT public.is_owner() THEN
            RAISE EXCEPTION 'Akses ditolak: hanya Owner yang dapat mengeksekusi batch produksi.';
        END IF;
    END IF;

    SELECT * INTO v_prod FROM public.products WHERE id = p_product_id FOR UPDATE;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Produk tidak ditemukan.';
    END IF;

    SELECT * INTO v_recipe FROM public.recipes WHERE product_id = p_product_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Resep untuk produk % belum ditentukan.', v_prod.name;
    END IF;

    v_recipe_yield := v_recipe.yield_quantity;
    v_scale_factor := (p_actual_quantity::NUMERIC) / (v_recipe_yield::NUMERIC);

    v_seq := nextval('public.production_batch_seq');
    v_seq_str := CASE WHEN v_seq < 1000 THEN LPAD(v_seq::TEXT, 3, '0') ELSE v_seq::TEXT END;
    v_batch_number := 'BATCH-' || TO_CHAR(NOW() AT TIME ZONE 'Asia/Jakarta', 'YYYYMMDD') || '-' || v_seq_str;

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

    FOR v_detail IN
        SELECT rd.*, rm.name as mat_name, rm.stock as mat_stock, rm.cost_per_unit as mat_cost
        FROM public.recipe_details rd
        JOIN public.raw_materials rm ON rm.id = rd.raw_material_id
        WHERE rd.recipe_id = v_recipe.id
        FOR UPDATE OF rm
    LOOP
        v_needed_qty := v_detail.quantity * v_scale_factor;
        v_actual_qty := v_needed_qty;

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

        UPDATE public.raw_materials
        SET stock = stock - v_actual_qty
        WHERE id = v_detail.raw_material_id;

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

    IF p_actual_quantity > 0 THEN
        v_unit_hpp := v_total_production_cost / p_actual_quantity;
    ELSE
        v_unit_hpp := 0;
    END IF;

    UPDATE public.productions
    SET calculated_cost = v_total_production_cost,
        cost_per_unit = v_unit_hpp
    WHERE id = v_production_id;

    UPDATE public.products
    SET stock = stock + p_actual_quantity,
        estimated_hpp = v_unit_hpp
    WHERE id = p_product_id;

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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 7. Updated Close Cashier Shift RPC (Row Lock prevents double-closing, Auth Check)
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
    -- Lock row so concurrent close requests cannot both succeed
    SELECT * INTO v_session FROM public.cashier_sessions
    WHERE id = p_session_id AND status = 'active'
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Sesi kasir tidak ditemukan atau sudah ditutup.';
    END IF;

    IF current_user NOT IN ('postgres', 'service_role') THEN
        IF auth.uid() IS NULL THEN
            RAISE EXCEPTION 'Akses ditolak: pengguna belum terautentikasi.';
        END IF;
        IF p_is_force_close AND NOT public.is_owner() THEN
            RAISE EXCEPTION 'Akses ditolak: hanya Owner yang dapat melakukan force close.';
        END IF;
        IF NOT (public.is_owner() OR (public.is_cashier() AND v_session.user_id = auth.uid())) THEN
            RAISE EXCEPTION 'Akses ditolak: tidak memiliki izin menutup sesi kasir ini.';
        END IF;
    END IF;

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
        closed_by = COALESCE(p_closed_by, auth.uid())
    WHERE id = p_session_id;

    INSERT INTO public.audit_logs (
        user_id,
        action,
        entity_name,
        entity_id,
        new_values
    ) VALUES (
        COALESCE(p_closed_by, auth.uid()),
        CASE WHEN p_is_force_close THEN 'FORCE_CLOSE_SHIFT' ELSE 'CLOSE_SHIFT' END,
        'cashier_sessions',
        p_session_id,
        jsonb_build_object(
            'expected_cash', v_expected_cash,
            'actual_cash', p_actual_cash,
            'cash_difference', v_difference
        )
    );

    RETURN jsonb_build_object(
        'success', true,
        'session_id', p_session_id,
        'status', v_new_status,
        'expected_cash', v_expected_cash,
        'actual_cash', p_actual_cash,
        'cash_difference', v_difference
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 8. Tighten Overly Permissive RLS Policies (Least Privilege)
DROP POLICY IF EXISTS "Transaction details viewable by creator or owner" ON public.sales_transaction_details;
DROP POLICY IF EXISTS "Transaction details insertable by creator or owner" ON public.sales_transaction_details;

CREATE POLICY "Transaction details viewable by creator or owner"
ON public.sales_transaction_details FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.sales_transactions st
        WHERE st.id = transaction_id
          AND (public.is_owner() OR st.user_id = auth.uid())
    )
);

CREATE POLICY "Transaction details insertable by creator or owner"
ON public.sales_transaction_details FOR INSERT
TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.sales_transactions st
        WHERE st.id = transaction_id
          AND (public.is_owner() OR st.user_id = auth.uid())
    )
);

DROP POLICY IF EXISTS "Authenticated users can view payments" ON public.payments;
DROP POLICY IF EXISTS "Authenticated users can insert payments" ON public.payments;

CREATE POLICY "Payments viewable by transaction creator or owner"
ON public.payments FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.sales_transactions st
        WHERE st.id = transaction_id
          AND (public.is_owner() OR st.user_id = auth.uid())
    )
);

CREATE POLICY "Payments insertable by transaction creator or owner"
ON public.payments FOR INSERT
TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.sales_transactions st
        WHERE st.id = transaction_id
          AND (public.is_owner() OR st.user_id = auth.uid())
    )
);

DROP POLICY IF EXISTS "Authenticated users can view stock adjustments" ON public.stock_adjustments;
DROP POLICY IF EXISTS "Authenticated users can create stock adjustments" ON public.stock_adjustments;
DROP POLICY IF EXISTS "Authenticated users can view stock adjustment details" ON public.stock_adjustment_details;
DROP POLICY IF EXISTS "Authenticated users can insert stock adjustment details" ON public.stock_adjustment_details;

-- Cashiers can insert expenses only for their own active shift; Owner manages all
DROP POLICY IF EXISTS "Cashier can record cash expense for own active shift" ON public.expenses;
CREATE POLICY "Cashier can record cash expense for own active shift"
ON public.expenses FOR INSERT
TO authenticated
WITH CHECK (
    public.is_owner()
    OR (
        public.is_cashier()
        AND created_by = auth.uid()
        AND cashier_session_id IN (
            SELECT id FROM public.cashier_sessions
            WHERE user_id = auth.uid() AND status = 'active'
        )
    )
);
