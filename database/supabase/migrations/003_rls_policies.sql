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
