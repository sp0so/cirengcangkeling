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
