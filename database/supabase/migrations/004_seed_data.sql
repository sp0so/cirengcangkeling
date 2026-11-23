-- ====================================================================
-- CIRENG CANGKELING MANAGEMENT INFORMATION SYSTEM
-- Migration 004: Clean Initial Setup (Ready for User Input)
-- Only sets up essential System Profile & Role Accounts.
-- All operational data (products, materials, suppliers, recipes,
-- transactions, shifts, expenses) are left EMPTY for user input.
-- ====================================================================

-- 1. Default Business Profile (Can be edited by Owner in Pengaturan > Profil)
INSERT INTO public.business_profiles (
    id, name, tagline, address, phone, email, logo_url, description
) VALUES (
    '00000000-0000-0000-0000-000000000001',
    'Cireng Cangkeling',
    'Renyah di Luar, Kenyal Gurih di Dalam',
    'Jl. Terusan Buah Batu No. 45, Bandung, Jawa Barat',
    '0812-3456-7890',
    'kontak@cirengcangkeling.com',
    '/Logo-Cireng.webp',
    'UMKM Kuliner Camilan Tradisional Khas Sunda Spesialisasi Aneka Cireng Kekinian dan Frozen Food'
) ON CONFLICT (id) DO NOTHING;

-- 2. Essential User Profiles (Owner & Kasir Accounts for Login)
INSERT INTO public.profiles (
    id, email, full_name, role, phone, is_active
) VALUES 
(
    '11111111-1111-1111-1111-111111111111',
    'owner@cirengcangkeling.com',
    'Pemilik Usaha (Owner)',
    'owner',
    '0811-2233-4455',
    TRUE
),
(
    '22222222-2222-2222-2222-222222222222',
    'kasir@cirengcangkeling.com',
    'Staf Kasir (Kasir)',
    'kasir',
    '0855-6677-8899',
    TRUE
) ON CONFLICT (id) DO NOTHING;

-- All other tables (products, raw_materials, suppliers, recipes, cashier_sessions,
-- sales_transactions, productions, purchases, expenses, marketplace) are clean
-- and ready for user input.
