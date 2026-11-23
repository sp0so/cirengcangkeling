-- ====================================================================
-- CIRENG CANGKELING MANAGEMENT INFORMATION SYSTEM
-- Migration 001: Initial Database Schema
-- Matches: SRS-MainSistem.md (Section 6 & 7) & PRD-MainSistem.md
-- ====================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Clean existing schema if needed
DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS payment_method CASCADE;
DROP TYPE IF EXISTS cashier_session_status CASCADE;
DROP TYPE IF EXISTS cashier_session_mode CASCADE;
DROP TYPE IF EXISTS movement_type CASCADE;
DROP TYPE IF EXISTS item_type CASCADE;
DROP TYPE IF EXISTS production_status CASCADE;
DROP TYPE IF EXISTS expense_category CASCADE;
DROP TYPE IF EXISTS marketplace_platform CASCADE;

-- Enum Types
CREATE TYPE user_role AS ENUM ('owner', 'kasir');
CREATE TYPE payment_method AS ENUM ('tunai', 'qris', 'transfer');
CREATE TYPE cashier_session_status AS ENUM ('active', 'closed', 'force_closed');
CREATE TYPE cashier_session_mode AS ENUM ('kasir', 'owner_kasir');
CREATE TYPE movement_type AS ENUM ('purchase', 'production_in', 'production_out', 'sales', 'adjustment');
CREATE TYPE item_type AS ENUM ('raw_material', 'finished_good');
CREATE TYPE production_status AS ENUM ('completed', 'draft', 'cancelled');
CREATE TYPE expense_category AS ENUM ('operasional', 'gaji', 'utilitas', 'bahan_baku', 'lainnya');
CREATE TYPE marketplace_platform AS ENUM ('gofood', 'grabfood', 'shopeefood', 'shopee', 'tokopedia', 'tiktok_shop');

-- 1. Profiles / Users Table (Extends Supabase auth.users or standalone)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    role user_role NOT NULL DEFAULT 'kasir',
    phone VARCHAR(30),
    avatar_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Business Profile Table (SYS-PROF)
CREATE TABLE IF NOT EXISTS public.business_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(150) NOT NULL DEFAULT 'Cireng Cangkeling',
    tagline VARCHAR(255) DEFAULT 'Renyah di Luar, Kenyal Gurih di Dalam',
    address TEXT,
    phone VARCHAR(30),
    email VARCHAR(255),
    logo_url TEXT,
    currency VARCHAR(10) NOT NULL DEFAULT 'IDR',
    description TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Product Categories Table
CREATE TABLE IF NOT EXISTS public.product_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(120) NOT NULL UNIQUE,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Products Table (SYS-PROD)
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    category_id UUID REFERENCES public.product_categories(id) ON DELETE SET NULL,
    selling_price NUMERIC(12, 2) NOT NULL CHECK (selling_price >= 0),
    estimated_hpp NUMERIC(12, 2) DEFAULT 0 CHECK (estimated_hpp >= 0),
    stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
    min_stock INT NOT NULL DEFAULT 10 CHECK (min_stock >= 0),
    unit VARCHAR(30) NOT NULL DEFAULT 'porsi',
    image_url TEXT,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Raw Materials Table (SYS-RAW)
CREATE TABLE IF NOT EXISTS public.raw_materials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    unit VARCHAR(30) NOT NULL, -- 'kg', 'gram', 'liter', 'pcs'
    stock NUMERIC(12, 3) NOT NULL DEFAULT 0 CHECK (stock >= 0),
    min_stock NUMERIC(12, 3) NOT NULL DEFAULT 5 CHECK (min_stock >= 0),
    cost_per_unit NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (cost_per_unit >= 0),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Suppliers Table (SYS-SUPP)
CREATE TABLE IF NOT EXISTS public.suppliers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    contact_person VARCHAR(100),
    phone VARCHAR(30),
    email VARCHAR(255),
    address TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Procurement / Purchases Table (SYS-PROC)
CREATE TABLE IF NOT EXISTS public.purchases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_number VARCHAR(100) NOT NULL UNIQUE,
    supplier_id UUID REFERENCES public.suppliers(id) ON DELETE SET NULL,
    purchase_date DATE NOT NULL DEFAULT CURRENT_DATE,
    total_amount NUMERIC(14, 2) NOT NULL DEFAULT 0 CHECK (total_amount >= 0),
    notes TEXT,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Purchase Details Table
CREATE TABLE IF NOT EXISTS public.purchase_details (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    purchase_id UUID NOT NULL REFERENCES public.purchases(id) ON DELETE CASCADE,
    raw_material_id UUID NOT NULL REFERENCES public.raw_materials(id) ON DELETE RESTRICT,
    quantity NUMERIC(12, 3) NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(12, 2) NOT NULL CHECK (unit_price >= 0),
    subtotal NUMERIC(14, 2) NOT NULL CHECK (subtotal >= 0)
);

-- 9. Recipes Table (SYS-RECIPE)
CREATE TABLE IF NOT EXISTS public.recipes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL UNIQUE REFERENCES public.products(id) ON DELETE CASCADE,
    yield_quantity INT NOT NULL DEFAULT 1 CHECK (yield_quantity > 0),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. Recipe Details Table
CREATE TABLE IF NOT EXISTS public.recipe_details (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipe_id UUID NOT NULL REFERENCES public.recipes(id) ON DELETE CASCADE,
    raw_material_id UUID NOT NULL REFERENCES public.raw_materials(id) ON DELETE RESTRICT,
    quantity NUMERIC(12, 3) NOT NULL CHECK (quantity > 0),
    unit VARCHAR(30) NOT NULL
);

-- 11. Production Orders / Records Table (SYS-PROD-REC)
CREATE TABLE IF NOT EXISTS public.productions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    batch_number VARCHAR(100) NOT NULL UNIQUE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
    planned_quantity INT NOT NULL CHECK (planned_quantity > 0),
    actual_quantity INT NOT NULL CHECK (actual_quantity >= 0),
    status production_status NOT NULL DEFAULT 'completed',
    production_date DATE NOT NULL DEFAULT CURRENT_DATE,
    calculated_cost NUMERIC(14, 2) DEFAULT 0,
    cost_per_unit NUMERIC(12, 2) DEFAULT 0,
    notes TEXT,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. Production Details (Actual Material Consumption)
CREATE TABLE IF NOT EXISTS public.production_details (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    production_id UUID NOT NULL REFERENCES public.productions(id) ON DELETE CASCADE,
    raw_material_id UUID NOT NULL REFERENCES public.raw_materials(id) ON DELETE RESTRICT,
    estimated_quantity NUMERIC(12, 3) NOT NULL,
    actual_quantity NUMERIC(12, 3) NOT NULL CHECK (actual_quantity >= 0),
    unit VARCHAR(30) NOT NULL,
    cost_per_unit NUMERIC(12, 2) DEFAULT 0,
    total_cost NUMERIC(14, 2) DEFAULT 0
);

-- 13. Cashier Sessions Table (SYS-SHIFT)
-- Rule: Only ONE session can have status = 'active' globally at any time!
CREATE TABLE IF NOT EXISTS public.cashier_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_code VARCHAR(100) NOT NULL UNIQUE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    mode cashier_session_mode NOT NULL DEFAULT 'kasir',
    status cashier_session_status NOT NULL DEFAULT 'active',
    opened_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    closed_at TIMESTAMPTZ,
    opening_cash NUMERIC(12, 2) NOT NULL CHECK (opening_cash >= 0),
    total_cash_sales NUMERIC(14, 2) NOT NULL DEFAULT 0,
    total_non_cash_sales NUMERIC(14, 2) NOT NULL DEFAULT 0,
    total_cash_expenses NUMERIC(14, 2) NOT NULL DEFAULT 0,
    total_cash_refunds NUMERIC(14, 2) NOT NULL DEFAULT 0,
    expected_cash NUMERIC(14, 2),
    actual_cash NUMERIC(14, 2),
    cash_difference NUMERIC(14, 2),
    notes TEXT,
    force_close_reason TEXT,
    closed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Unique index ensuring ONLY ONE active cashier session globally
CREATE UNIQUE INDEX IF NOT EXISTS unique_single_active_cashier_session 
ON public.cashier_sessions (status) 
WHERE status = 'active';

-- 14. Sales Transactions Table (SYS-POS)
CREATE TABLE IF NOT EXISTS public.sales_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_number VARCHAR(100) NOT NULL UNIQUE,
    cashier_session_id UUID NOT NULL REFERENCES public.cashier_sessions(id) ON DELETE RESTRICT,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    transaction_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    subtotal NUMERIC(14, 2) NOT NULL CHECK (subtotal >= 0),
    discount NUMERIC(14, 2) NOT NULL DEFAULT 0 CHECK (discount >= 0),
    total_amount NUMERIC(14, 2) NOT NULL CHECK (total_amount >= 0),
    payment_method payment_method NOT NULL DEFAULT 'tunai',
    amount_paid NUMERIC(14, 2) NOT NULL CHECK (amount_paid >= 0),
    change_amount NUMERIC(14, 2) NOT NULL DEFAULT 0 CHECK (change_amount >= 0),
    status VARCHAR(30) NOT NULL DEFAULT 'completed', -- 'completed', 'cancelled'
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 15. Sales Transaction Details
CREATE TABLE IF NOT EXISTS public.sales_transaction_details (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_id UUID NOT NULL REFERENCES public.sales_transactions(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
    product_name VARCHAR(150) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(12, 2) NOT NULL CHECK (unit_price >= 0),
    subtotal NUMERIC(14, 2) NOT NULL CHECK (subtotal >= 0)
);

-- 16. Inventory Movements Table (Audit trail for all stock changes)
CREATE TABLE IF NOT EXISTS public.inventory_movements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    item_type item_type NOT NULL,
    item_id UUID NOT NULL,
    item_name VARCHAR(150) NOT NULL,
    movement_type movement_type NOT NULL,
    quantity_change NUMERIC(12, 3) NOT NULL,
    previous_stock NUMERIC(12, 3) NOT NULL,
    current_stock NUMERIC(12, 3) NOT NULL,
    reference_id UUID,
    reference_type VARCHAR(50),
    reason TEXT,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 17. Expenses / Financial Records Table (SYS-FIN)
CREATE TABLE IF NOT EXISTS public.expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    expense_code VARCHAR(100) NOT NULL UNIQUE,
    category expense_category NOT NULL DEFAULT 'operasional',
    amount NUMERIC(14, 2) NOT NULL CHECK (amount > 0),
    payment_method VARCHAR(20) NOT NULL DEFAULT 'cash', -- 'cash' | 'transfer'
    cashier_session_id UUID REFERENCES public.cashier_sessions(id) ON DELETE SET NULL,
    expense_date DATE NOT NULL DEFAULT CURRENT_DATE,
    description TEXT NOT NULL,
    proof_url TEXT,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 18. Marketplace Import Batches (SYS-MKT)
CREATE TABLE IF NOT EXISTS public.marketplace_import_batches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    platform marketplace_platform NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_size INT,
    period_start DATE,
    period_end DATE,
    total_orders INT NOT NULL DEFAULT 0,
    total_gross_sales NUMERIC(14, 2) NOT NULL DEFAULT 0,
    total_discounts NUMERIC(14, 2) NOT NULL DEFAULT 0,
    total_platform_fees NUMERIC(14, 2) NOT NULL DEFAULT 0,
    total_net_revenue NUMERIC(14, 2) NOT NULL DEFAULT 0,
    status VARCHAR(30) NOT NULL DEFAULT 'completed',
    uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 19. Marketplace Sales Records (SYS-MKT-REC)
CREATE TABLE IF NOT EXISTS public.marketplace_sales (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    import_batch_id UUID NOT NULL REFERENCES public.marketplace_import_batches(id) ON DELETE CASCADE,
    platform marketplace_platform NOT NULL,
    platform_order_id VARCHAR(120) NOT NULL,
    order_date TIMESTAMPTZ NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'completed',
    gross_amount NUMERIC(14, 2) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(14, 2) NOT NULL DEFAULT 0,
    platform_fee NUMERIC(14, 2) NOT NULL DEFAULT 0,
    net_amount NUMERIC(14, 2) NOT NULL DEFAULT 0,
    customer_name VARCHAR(150),
    raw_data JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_platform_order UNIQUE (platform, platform_order_id)
);

-- 20. Marketplace Sales Details (Per product item)
CREATE TABLE IF NOT EXISTS public.marketplace_sales_details (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    marketplace_sale_id UUID NOT NULL REFERENCES public.marketplace_sales(id) ON DELETE CASCADE,
    product_name VARCHAR(150) NOT NULL,
    matched_product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    quantity INT NOT NULL DEFAULT 1,
    unit_price NUMERIC(12, 2) NOT NULL DEFAULT 0,
    subtotal NUMERIC(14, 2) NOT NULL DEFAULT 0
);

-- 21. Audit Logs Table (SYS-AUDIT)
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_name VARCHAR(100) NOT NULL,
    entity_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address VARCHAR(50),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Helpful Indexing for fast lookups & analytical queries
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_code ON public.products(code);
CREATE INDEX IF NOT EXISTS idx_raw_materials_code ON public.raw_materials(code);
CREATE INDEX IF NOT EXISTS idx_purchases_date ON public.purchases(purchase_date);
CREATE INDEX IF NOT EXISTS idx_productions_product ON public.productions(product_id);
CREATE INDEX IF NOT EXISTS idx_sales_transactions_date ON public.sales_transactions(transaction_date);
CREATE INDEX IF NOT EXISTS idx_sales_transactions_session ON public.sales_transactions(cashier_session_id);
CREATE INDEX IF NOT EXISTS idx_inventory_movements_item ON public.inventory_movements(item_id, item_type);
CREATE INDEX IF NOT EXISTS idx_expenses_date ON public.expenses(expense_date);
CREATE INDEX IF NOT EXISTS idx_marketplace_sales_date ON public.marketplace_sales(order_date);
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
-- ====================================================================
-- CIRENG CANGKELING MANAGEMENT INFORMATION SYSTEM
-- Migration 003: Row Level Security (RLS) & Role-Based Permissions
-- Matches: SRS Section 2.6 (User Access and Permissions)
-- ====================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.raw_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchase_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipe_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.productions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.production_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cashier_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_transaction_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_import_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_sales_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function: Check if current user is owner
CREATE OR REPLACE FUNCTION public.is_owner()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'owner' AND is_active = TRUE
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function: Check if current user is cashier
CREATE OR REPLACE FUNCTION public.is_cashier()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'kasir' AND is_active = TRUE
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. Profiles Policy
CREATE POLICY "Users can read own profile or owner can read all"
ON public.profiles FOR SELECT
USING (auth.uid() = id OR public.is_owner());

CREATE POLICY "Owner can manage profiles"
ON public.profiles FOR ALL
USING (public.is_owner());

-- 2. Business Profile: readable by authenticated users, editable by Owner
CREATE POLICY "All authenticated can view business profile"
ON public.business_profiles FOR SELECT
TO authenticated USING (TRUE);

CREATE POLICY "Only owner can edit business profile"
ON public.business_profiles FOR ALL
USING (public.is_owner());

-- 3. Categories & Products:
-- Viewable by everyone (Cashier needs to view products for POS)
CREATE POLICY "Authenticated users can view categories"
ON public.product_categories FOR SELECT
TO authenticated USING (TRUE);

CREATE POLICY "Owner can manage categories"
ON public.product_categories FOR ALL
USING (public.is_owner());

CREATE POLICY "Authenticated users can view products"
ON public.products FOR SELECT
TO authenticated USING (TRUE);

CREATE POLICY "Only owner can manage products"
ON public.products FOR ALL
USING (public.is_owner());

-- 4. Raw Materials, Suppliers, Procurement, Recipes, Production:
-- EXCLUSIVE TO OWNER
CREATE POLICY "Owner can manage raw materials"
ON public.raw_materials FOR ALL
USING (public.is_owner());

CREATE POLICY "Owner can manage suppliers"
ON public.suppliers FOR ALL
USING (public.is_owner());

CREATE POLICY "Owner can manage purchases"
ON public.purchases FOR ALL
USING (public.is_owner());

CREATE POLICY "Owner can manage purchase details"
ON public.purchase_details FOR ALL
USING (public.is_owner());

CREATE POLICY "Owner can manage recipes"
ON public.recipes FOR ALL
USING (public.is_owner());

CREATE POLICY "Owner can manage recipe details"
ON public.recipe_details FOR ALL
USING (public.is_owner());

CREATE POLICY "Owner can manage productions"
ON public.productions FOR ALL
USING (public.is_owner());

CREATE POLICY "Owner can manage production details"
ON public.production_details FOR ALL
USING (public.is_owner());

-- 5. Cashier Sessions:
-- Cashier can view and manage their own session, Owner can view and manage all
CREATE POLICY "Cashier can view and manage own session, Owner can manage all"
ON public.cashier_sessions FOR ALL
TO authenticated
USING (public.is_owner() OR user_id = auth.uid());

-- 6. Sales Transactions & Details:
-- Cashier can insert and view their own transactions, Owner can manage all
CREATE POLICY "Cashier and Owner can view transactions"
ON public.sales_transactions FOR SELECT
TO authenticated
USING (public.is_owner() OR user_id = auth.uid());

CREATE POLICY "Cashier and Owner can insert transactions"
ON public.sales_transactions FOR INSERT
TO authenticated
WITH CHECK (public.is_owner() OR user_id = auth.uid());

CREATE POLICY "Transaction details viewable by creator or owner"
ON public.sales_transaction_details FOR SELECT
TO authenticated
USING (TRUE);

CREATE POLICY "Transaction details insertable by creator or owner"
ON public.sales_transaction_details FOR INSERT
TO authenticated
WITH CHECK (TRUE);

-- 7. Inventory Movements & Audit Logs:
CREATE POLICY "Owner can view all inventory movements"
ON public.inventory_movements FOR SELECT
USING (public.is_owner());

CREATE POLICY "Owner can view audit logs"
ON public.audit_logs FOR SELECT
USING (public.is_owner());

-- 8. Expenses:
CREATE POLICY "Owner can manage all expenses"
ON public.expenses FOR ALL
USING (public.is_owner());

-- 9. Marketplace:
CREATE POLICY "Owner can manage marketplace batches"
ON public.marketplace_import_batches FOR ALL
USING (public.is_owner());

CREATE POLICY "Owner can manage marketplace sales"
ON public.marketplace_sales FOR ALL
USING (public.is_owner());

CREATE POLICY "Owner can manage marketplace sales details"
ON public.marketplace_sales_details FOR ALL
USING (public.is_owner());
