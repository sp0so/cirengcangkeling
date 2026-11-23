export type UserRole = 'owner' | 'kasir';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  avatar?: string;
}

export interface Shift {
  id: string;
  cashierId: string;
  cashierName: string;
  status: 'open' | 'closed';
  startingCash: number;
  openedAt: string;
  closedAt?: string;
  expectedCash: number;
  actualCash?: number;
  difference?: number;
  notes?: string;
  totalTransactions: number;
  totalSales: number;
  cashSales: number;
  qrisSales: number;
  transferSales: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  categoryId: string;
  categoryName: string;
  price: number;
  baseCost: number; // HPP
  unit: string;
  stock: number;
  minStock: number;
  image?: string;
  isActive: boolean;
}

export interface RawMaterial {
  id: string;
  name: string;
  code: string;
  unit: string;
  stock: number;
  minStock: number;
  unitCost: number;
  supplierName: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  address: string;
  materials: string[];
}

export interface RecipeIngredient {
  materialId: string;
  materialName: string;
  amount: number;
  unit: string;
  unitCost: number;
}

export interface Recipe {
  id: string;
  productId: string;
  productName: string;
  yieldPortions: number;
  ingredients: RecipeIngredient[];
  estimatedHppPerPortion: number;
}

export interface StockMovement {
  id: string;
  date: string;
  type: 'masuk' | 'keluar' | 'penyesuaian';
  itemType: 'produk' | 'bahan_baku';
  itemName: string;
  quantity: number;
  unit: string;
  reference: string;
  note?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  notes?: string;
}

export interface TransactionDetail {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Transaction {
  id: string;
  code: string;
  shiftId: string;
  cashierId: string;
  cashierName: string;
  date: string;
  items: TransactionDetail[];
  total: number;
  paymentMethod: 'tunai' | 'qris' | 'transfer';
  amountPaid: number;
  change: number;
  status: 'selesai' | 'dibatalkan';
}

export interface Expense {
  id: string;
  category: 'Operasional' | 'Bahan Baku' | 'Gaji Karyawan' | 'Sewa & Listrik' | 'Pemasaran' | 'Lain-lain';
  description: string;
  amount: number;
  date: string;
  recordedBy: string;
}

export interface MarketplaceOrder {
  orderId: string;
  platform: 'Shopee' | 'Tokopedia' | 'TikTok Shop';
  date: string;
  customerName: string;
  productName: string;
  quantity: number;
  total: number;
  status: 'Selesai' | 'Batal' | 'Dikirim';
}

export interface MarketplaceReport {
  id: string;
  platform: 'Shopee' | 'Tokopedia' | 'TikTok Shop';
  fileName: string;
  importDate: string;
  totalOrders: number;
  totalRevenue: number;
  status: 'Sukses' | 'Memeriksa Duplikasi' | 'Gagal';
  orders: MarketplaceOrder[];
}

export interface ProductionOrder {
  id: string;
  code: string;
  productId: string;
  productName: string;
  targetQuantity: number;
  date: string;
  status: 'Selesai' | 'Dalam Proses';
  notes?: string;
}

export interface ProcurementOrder {
  id: string;
  code: string;
  supplierName: string;
  date: string;
  items: { materialName: string; quantity: number; unit: string; price: number; subtotal: number }[];
  totalAmount: number;
  status: 'Selesai' | 'Dipesan';
}

