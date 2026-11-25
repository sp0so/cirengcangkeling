-- ====================================================================
-- CIRENG CANGKELING MANAGEMENT INFORMATION SYSTEM
-- Migration 005: Expanded Features Schema & Multi-channel Entities
-- Matches: SRS-MainSistem.md, PRD-MainSistem.md, design.md
-- Covers: Sales Channels, Product Mappings, Import Errors, Other Incomes,
--         Raw Material Categories, Payments, Stock Adjustments
-- ====================================================================

-- 1. Raw Material Categories Table (SYS-RAW-CAT)
CREATE TABLE IF NOT EXISTS public.raw_material_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add category_id to raw_materials table if not present
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
          AND table_name = 'raw_materials' 
          AND column_name = 'category_id'
    ) THEN
        ALTER TABLE public.raw_materials 
        ADD COLUMN category_id UUID REFERENCES public.raw_material_categories(id) ON DELETE SET NULL;
    END IF;
END $$;

-- 2. Sales Channels Table (SYS-CHNL)
-- Covers offline POS, online food delivery (GoFood, GrabFood, ShopeeFood), and e-commerce
CREATE TABLE IF NOT EXISTS public.sales_channels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    platform marketplace_platform,
    channel_type VARCHAR(30) NOT NULL DEFAULT 'offline', -- 'offline', 'delivery', 'marketplace'
    commission_rate_pct NUMERIC(5, 2) NOT NULL DEFAULT 0 CHECK (commission_rate_pct >= 0),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Product Mappings Table (SYS-MKT-MAP)
-- Maps external SKU / item names from marketplace channels to internal products
CREATE TABLE IF NOT EXISTS public.product_mappings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    channel_id UUID REFERENCES public.sales_channels(id) ON DELETE CASCADE,
    platform marketplace_platform NOT NULL,
    external_sku VARCHAR(100),
    external_product_name VARCHAR(255) NOT NULL,
    internal_product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    multiplier INT NOT NULL DEFAULT 1 CHECK (multiplier > 0),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_platform_product_mapping UNIQUE (platform, external_product_name)
);

-- 4. Marketplace Import Errors Log Table (SYS-MKT-ERR)
-- Detailed error tracking for spreadsheet imports per SRS Section 6.4
CREATE TABLE IF NOT EXISTS public.sales_import_errors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    batch_id UUID NOT NULL REFERENCES public.marketplace_import_batches(id) ON DELETE CASCADE,
    row_number INT NOT NULL,
    external_order_id VARCHAR(120),
    error_type VARCHAR(100) NOT NULL, -- 'unmapped_product', 'invalid_date', 'invalid_amount', 'duplicate_order', 'validation_error'
    raw_payload JSONB,
    error_message TEXT NOT NULL,
    resolved BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Other Incomes Table (SYS-FIN-INC)
-- Non-POS income streams (events, catering, scrap sales, interest, etc.) per SRS & PRD
CREATE TABLE IF NOT EXISTS public.other_incomes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    income_code VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(100) NOT NULL DEFAULT 'lainnya', -- 'katering', 'event', 'bunga_bank', 'penjualan_limbah', 'sponsorship', 'lainnya'
    amount NUMERIC(14, 2) NOT NULL CHECK (amount > 0),
    payment_method payment_method NOT NULL DEFAULT 'transfer',
    cashier_session_id UUID REFERENCES public.cashier_sessions(id) ON DELETE SET NULL,
    income_date DATE NOT NULL DEFAULT CURRENT_DATE,
    description TEXT NOT NULL,
    proof_url TEXT,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. POS Detailed Payments Table (SYS-POS-PAY)
-- Multi-payment breakdown per transaction (split cash/non-cash, voucher, trace number)
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_id UUID NOT NULL REFERENCES public.sales_transactions(id) ON DELETE CASCADE,
    payment_method payment_method NOT NULL,
    amount NUMERIC(14, 2) NOT NULL CHECK (amount > 0),
    reference_number VARCHAR(120),
    status VARCHAR(30) NOT NULL DEFAULT 'completed',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Stock Adjustments & Opname Table (SYS-ADJ)
CREATE TABLE IF NOT EXISTS public.stock_adjustments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    adjustment_code VARCHAR(100) NOT NULL UNIQUE,
    adjustment_date DATE NOT NULL DEFAULT CURRENT_DATE,
    adjustment_type VARCHAR(50) NOT NULL DEFAULT 'opname', -- 'opname', 'damaged', 'expired', 'loss', 'internal_use'
    notes TEXT,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Stock Adjustment Details Table
CREATE TABLE IF NOT EXISTS public.stock_adjustment_details (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    adjustment_id UUID NOT NULL REFERENCES public.stock_adjustments(id) ON DELETE CASCADE,
    item_type item_type NOT NULL, -- 'raw_material' or 'finished_good'
    item_id UUID NOT NULL,
    item_name VARCHAR(150) NOT NULL,
    system_stock NUMERIC(12, 3) NOT NULL,
    physical_stock NUMERIC(12, 3) NOT NULL,
    difference NUMERIC(12, 3) NOT NULL,
    unit VARCHAR(30) NOT NULL,
    reason TEXT
);

-- ====================================================================
-- TRIGGERS FOR NEW TABLES
-- ====================================================================

CREATE OR REPLACE TRIGGER trg_raw_material_categories_updated_at
BEFORE UPDATE ON public.raw_material_categories
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE OR REPLACE TRIGGER trg_sales_channels_updated_at
BEFORE UPDATE ON public.sales_channels
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE OR REPLACE TRIGGER trg_product_mappings_updated_at
BEFORE UPDATE ON public.product_mappings
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Trigger to record inventory_movements on Stock Adjustment Details insert
CREATE OR REPLACE FUNCTION public.handle_stock_adjustment_movement()
RETURNS TRIGGER AS $$
DECLARE
    v_adj RECORD;
    v_mov_type movement_type := 'adjustment';
BEGIN
    SELECT * INTO v_adj FROM public.stock_adjustments WHERE id = NEW.adjustment_id;

    -- Update actual stock in product or raw_material table
    IF NEW.item_type = 'finished_good' THEN
        UPDATE public.products 
        SET stock = GREATEST(0, NEW.physical_stock::INT)
        WHERE id = NEW.item_id;
    ELSIF NEW.item_type = 'raw_material' THEN
        UPDATE public.raw_materials 
        SET stock = GREATEST(0, NEW.physical_stock)
        WHERE id = NEW.item_id;
    END IF;

    -- Insert movement log
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
        NEW.item_type,
        NEW.item_id,
        NEW.item_name,
        v_mov_type,
        NEW.difference,
        NEW.system_stock,
        NEW.physical_stock,
        NEW.adjustment_id,
        'stock_adjustment',
        COALESCE(NEW.reason, v_adj.notes, 'Penyesuaian stok opname fisik'),
        v_adj.created_by
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_stock_adjustment_detail_movement
AFTER INSERT ON public.stock_adjustment_details
FOR EACH ROW EXECUTE FUNCTION public.handle_stock_adjustment_movement();

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) FOR NEW TABLES
-- ====================================================================

ALTER TABLE public.raw_material_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_import_errors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.other_incomes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stock_adjustments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stock_adjustment_details ENABLE ROW LEVEL SECURITY;

-- 1. Raw Material Categories Policies
CREATE POLICY "Authenticated users can view raw material categories"
ON public.raw_material_categories FOR SELECT
TO authenticated USING (TRUE);

CREATE POLICY "Owner can manage raw material categories"
ON public.raw_material_categories FOR ALL
USING (public.is_owner());

-- 2. Sales Channels Policies
CREATE POLICY "Authenticated users can view sales channels"
ON public.sales_channels FOR SELECT
TO authenticated USING (TRUE);

CREATE POLICY "Owner can manage sales channels"
ON public.sales_channels FOR ALL
USING (public.is_owner());

-- 3. Product Mappings Policies
CREATE POLICY "Authenticated users can view product mappings"
ON public.product_mappings FOR SELECT
TO authenticated USING (TRUE);

CREATE POLICY "Owner can manage product mappings"
ON public.product_mappings FOR ALL
USING (public.is_owner());

-- 4. Import Errors Policies
CREATE POLICY "Owner can view and manage import errors"
ON public.sales_import_errors FOR ALL
USING (public.is_owner());

-- 5. Other Incomes Policies
CREATE POLICY "Owner can view and manage other incomes"
ON public.other_incomes FOR ALL
USING (public.is_owner());

-- 6. Payments Policies
CREATE POLICY "Authenticated users can view payments"
ON public.payments FOR SELECT
TO authenticated USING (TRUE);

CREATE POLICY "Authenticated users can insert payments"
ON public.payments FOR INSERT
TO authenticated WITH CHECK (TRUE);

CREATE POLICY "Owner can manage all payments"
ON public.payments FOR ALL
USING (public.is_owner());

-- 7. Stock Adjustments Policies
CREATE POLICY "Authenticated users can view stock adjustments"
ON public.stock_adjustments FOR SELECT
TO authenticated USING (TRUE);

CREATE POLICY "Authenticated users can create stock adjustments"
ON public.stock_adjustments FOR INSERT
TO authenticated WITH CHECK (TRUE);

CREATE POLICY "Owner can manage stock adjustments"
ON public.stock_adjustments FOR ALL
USING (public.is_owner());

CREATE POLICY "Authenticated users can view stock adjustment details"
ON public.stock_adjustment_details FOR SELECT
TO authenticated USING (TRUE);

CREATE POLICY "Authenticated users can insert stock adjustment details"
ON public.stock_adjustment_details FOR INSERT
TO authenticated WITH CHECK (TRUE);

CREATE POLICY "Owner can manage stock adjustment details"
ON public.stock_adjustment_details FOR ALL
USING (public.is_owner());

-- Helpful Indexes
CREATE INDEX IF NOT EXISTS idx_raw_materials_category ON public.raw_materials(category_id);
CREATE INDEX IF NOT EXISTS idx_product_mappings_channel ON public.product_mappings(channel_id);
CREATE INDEX IF NOT EXISTS idx_product_mappings_internal ON public.product_mappings(internal_product_id);
CREATE INDEX IF NOT EXISTS idx_sales_import_errors_batch ON public.sales_import_errors(batch_id);
CREATE INDEX IF NOT EXISTS idx_other_incomes_date ON public.other_incomes(income_date);
CREATE INDEX IF NOT EXISTS idx_payments_transaction ON public.payments(transaction_id);
CREATE INDEX IF NOT EXISTS idx_stock_adjustments_date ON public.stock_adjustments(adjustment_date);
CREATE INDEX IF NOT EXISTS idx_stock_adjustment_details_item ON public.stock_adjustment_details(item_id, item_type);
