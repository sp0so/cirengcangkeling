'use client';

import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import {
  User,
  UserRole,
  Shift,
  Product,
  Category,
  RawMaterial,
  Supplier,
  Recipe,
  StockMovement,
  CartItem,
  Transaction,
  Expense,
  MarketplaceReport,
  ProductionOrder,
  ProcurementOrder,
} from './types';
import {
  getClientSafe,
  checkSupabaseConnection,
  inventoryService,
  financeService,
  posService,
  marketplaceService,
  MarketplaceOrderRecord,
} from './services';
import {
  calculateCartTotals,
  calculatePaymentChange,
  calculateExpectedShiftCash,
  calculateShiftDifference,
} from './calculations';

interface ToastInfo {
  id: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
}

interface AppContextType {
  currentUser: User | null;
  authenticatedRole: UserRole | null;
  isAuthLoading: boolean;
  loginWithPassword: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; role?: UserRole; error?: string }>;
  logout: () => Promise<void>;
  switchRole: (role: UserRole) => void;
  
  // Shift management
  activeShift: Shift | null;
  shiftHistory: Shift[];
  openShift: (startingCash: number, notes?: string) => Promise<boolean>;
  closeShift: (actualCash: number, notes?: string) => Promise<{ difference: number; expected: number }>;
  forceCloseShift: (reason: string) => Promise<void>;
  
  // Data Master & Operasional
  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  rawMaterials: RawMaterial[];
  addRawMaterial: (material: Omit<RawMaterial, 'id'>) => void;
  updateRawMaterial: (id: string, updates: Partial<RawMaterial>) => void;
  deleteRawMaterial: (id: string) => void;
  
  suppliers: Supplier[];
  addSupplier: (supplier: Omit<Supplier, 'id'>) => void;
  updateSupplier: (id: string, updates: Partial<Supplier>) => void;
  deleteSupplier: (id: string) => void;
  
  recipes: Recipe[];
  addRecipe: (recipe: Omit<Recipe, 'id'>) => void;
  updateRecipe: (id: string, updates: Partial<Recipe>) => void;
  deleteRecipe: (id: string) => void;
  stockMovements: StockMovement[];
  addStockAdjustment: (itemName: string, itemType: 'produk' | 'bahan_baku', qty: number, unit: string, reason: string) => void;
  
  // Data State Management
  clearAllData: () => void;
  loadSampleData: () => void;
  
  // POS & Transactions
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  processTransaction: (paymentMethod: 'tunai' | 'qris' | 'transfer', amountPaid: number) => Promise<Transaction>;
  transactions: Transaction[];
  
  // Keuangan
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  
  // Marketplace
  marketplaceReports: MarketplaceReport[];
  importMarketplaceReport: (
    platform: 'GoFood' | 'GrabFood' | 'ShopeeFood' | 'Shopee',
    fileName: string,
    fileSize: number,
    parsedRecords: MarketplaceOrderRecord[]
  ) => Promise<MarketplaceReport>;
  
  // Produksi & Pengadaan
  productionOrders: ProductionOrder[];
  addProductionOrder: (productId: string, quantity: number, notes?: string) => void;
  procurementOrders: ProcurementOrder[];
  addProcurementOrder: (supplierName: string, items: { materialName: string; quantity: number; unit: string; price: number }[]) => void;
  
  // Toast notifications
  toasts: ToastInfo[];
  showToast: (message: string, type?: 'success' | 'warning' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authenticatedRole, setAuthenticatedRole] = useState<UserRole | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const isCheckingOutRef = useRef<boolean>(false);

  const [activeShift, setActiveShift] = useState<Shift | null>(null);
  const [shiftHistory, setShiftHistory] = useState<Shift[]>([]);
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [stockMovements, setStockMovements] = useState<StockMovement[]>([]);
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [marketplaceReports, setMarketplaceReports] = useState<MarketplaceReport[]>([]);
  
  const [productionOrders, setProductionOrders] = useState<ProductionOrder[]>([]);
  const [procurementOrders, setProcurementOrders] = useState<ProcurementOrder[]>([]);

  // Shared helper to fetch live data from Supabase once authenticated
  const syncDatabase = async () => {
    try {
      const isConnected = await checkSupabaseConnection();
      if (isConnected) {
        const [
          dbCategories,
          dbProducts,
          dbMaterials,
          dbExpenses,
          dbShift,
          dbShiftHistory,
          dbTransactions,
        ] = await Promise.all([
          inventoryService.getCategories(),
          inventoryService.getProducts(),
          inventoryService.getRawMaterials(),
          financeService.getExpenses(),
          posService.getActiveSession(),
          posService.getShiftHistory(),
          posService.getTransactions(),
        ]);

        if (dbCategories) setCategories(dbCategories);
        if (dbProducts) setProducts(dbProducts);
        if (dbMaterials) setRawMaterials(dbMaterials);
        if (dbExpenses) setExpenses(dbExpenses);
        if (dbShift) setActiveShift(dbShift);
        if (dbShiftHistory) setShiftHistory(dbShiftHistory);
        if (dbTransactions) setTransactions(dbTransactions);
      }
    } catch (err) {
      console.warn('Background database synchronization notice:', err);
    }
  };

  // Auth verification & LocalStorage hydration on mount
  useEffect(() => {
    const initSessionAndData = async () => {
      try {
        const savedCategories = localStorage.getItem('cc_categories');
        if (savedCategories) setCategories(JSON.parse(savedCategories));

        const savedProducts = localStorage.getItem('cc_products');
        if (savedProducts) setProducts(JSON.parse(savedProducts));

        const savedMaterials = localStorage.getItem('cc_materials');
        if (savedMaterials) setRawMaterials(JSON.parse(savedMaterials));

        const savedSuppliers = localStorage.getItem('cc_suppliers');
        if (savedSuppliers) setSuppliers(JSON.parse(savedSuppliers));

        const savedRecipes = localStorage.getItem('cc_recipes');
        if (savedRecipes) setRecipes(JSON.parse(savedRecipes));

        const savedMovements = localStorage.getItem('cc_movements');
        if (savedMovements) setStockMovements(JSON.parse(savedMovements));

        const savedTransactions = localStorage.getItem('cc_transactions');
        if (savedTransactions) setTransactions(JSON.parse(savedTransactions));

        const savedExpenses = localStorage.getItem('cc_expenses');
        if (savedExpenses) setExpenses(JSON.parse(savedExpenses));

        const savedMarketplace = localStorage.getItem('cc_marketplace_reports');
        if (savedMarketplace) setMarketplaceReports(JSON.parse(savedMarketplace));

        const savedShift = localStorage.getItem('cc_active_shift');
        if (savedShift) setActiveShift(JSON.parse(savedShift));

        const savedShiftHistory = localStorage.getItem('cc_shift_history');
        if (savedShiftHistory) setShiftHistory(JSON.parse(savedShiftHistory));

        const savedProduction = localStorage.getItem('cc_production_orders');
        if (savedProduction) setProductionOrders(JSON.parse(savedProduction));

        const savedProcurement = localStorage.getItem('cc_procurement_orders');
        if (savedProcurement) setProcurementOrders(JSON.parse(savedProcurement));
      } catch {
        // Ignore localStorage parse errors
      }

      const supabase = getClientSafe();
      if (supabase) {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('id, email, full_name, role, phone, is_active')
              .eq('id', user.id)
              .single();

            if (profile && profile.is_active) {
              const verifiedRole: UserRole = profile.role === 'owner' ? 'owner' : 'kasir';
              setCurrentUser({
                id: profile.id,
                name: profile.full_name,
                email: profile.email,
                role: verifiedRole,
                phone: profile.phone || '',
              });
              setAuthenticatedRole(verifiedRole);
              await syncDatabase();
            }
          }
        } catch (err) {
          console.warn('Auth session verification failed:', err);
        }
      } else {
        // Local offline mode without Supabase credentials: require explicit login stored in sessionStorage
        try {
          const localSession = sessionStorage.getItem('cc_local_session');
          if (localSession) {
            const parsed: User = JSON.parse(localSession);
            setCurrentUser(parsed);
            setAuthenticatedRole(parsed.role);
          }
        } catch {
          // Ignore session parse errors
        }
      }

      setIsAuthLoading(false);
    };

    initSessionAndData();
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cc_categories', JSON.stringify(categories));
      localStorage.setItem('cc_products', JSON.stringify(products));
      localStorage.setItem('cc_materials', JSON.stringify(rawMaterials));
      localStorage.setItem('cc_suppliers', JSON.stringify(suppliers));
      localStorage.setItem('cc_recipes', JSON.stringify(recipes));
      localStorage.setItem('cc_movements', JSON.stringify(stockMovements));
      localStorage.setItem('cc_transactions', JSON.stringify(transactions));
      localStorage.setItem('cc_expenses', JSON.stringify(expenses));
      localStorage.setItem('cc_marketplace_reports', JSON.stringify(marketplaceReports));
      localStorage.setItem('cc_shift_history', JSON.stringify(shiftHistory));
      localStorage.setItem('cc_production_orders', JSON.stringify(productionOrders));
      localStorage.setItem('cc_procurement_orders', JSON.stringify(procurementOrders));
      if (activeShift) {
        localStorage.setItem('cc_active_shift', JSON.stringify(activeShift));
      } else {
        localStorage.removeItem('cc_active_shift');
      }
    } catch {
      // Ignore storage quota errors
    }
  }, [
    categories,
    products,
    rawMaterials,
    suppliers,
    recipes,
    stockMovements,
    transactions,
    expenses,
    marketplaceReports,
    shiftHistory,
    productionOrders,
    procurementOrders,
    activeShift,
  ]);

  const clearAllData = () => {
    setCategories([]);
    setProducts([]);
    setRawMaterials([]);
    setSuppliers([]);
    setRecipes([]);
    setStockMovements([]);
    setTransactions([]);
    setExpenses([]);
    setMarketplaceReports([]);
    setProductionOrders([]);
    setProcurementOrders([]);
    setActiveShift(null);
    setCart([]);
    try {
      localStorage.clear();
    } catch {}
    showToast('Seluruh data operasional berhasil dikosongkan.', 'info');
  };

  const loadSampleData = async () => {
    const mod = await import('./mockData');
    setCategories(mod.initialCategories);
    setProducts(mod.initialProducts);
    setRawMaterials(mod.initialRawMaterials);
    setSuppliers(mod.initialSuppliers);
    setRecipes(mod.initialRecipes);
    setStockMovements(mod.initialStockMovements);
    setTransactions(mod.initialTransactions);
    setExpenses(mod.initialExpenses);
    setMarketplaceReports(mod.initialMarketplaceReports);
    showToast('Data percontohan (sample) berhasil dimuat.', 'success');
  };

  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  const showToast = (message: string, type: 'success' | 'warning' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const loginWithPassword = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; role?: UserRole; error?: string }> => {
    const supabase = getClientSafe();
    if (supabase) {
      const { data: authData, error: authErr } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (authErr || !authData.user) {
        return {
          success: false,
          error: authErr?.message || 'Email atau kata sandi tidak valid.',
        };
      }

      const { data: profile, error: profErr } = await supabase
        .from('profiles')
        .select('id, email, full_name, role, phone, is_active')
        .eq('id', authData.user.id)
        .single();

      if (profErr || !profile || !profile.is_active) {
        await supabase.auth.signOut();
        return {
          success: false,
          error: 'Profil pengguna tidak ditemukan atau akun sedang dinonaktifkan.',
        };
      }

      const verifiedRole: UserRole = profile.role === 'owner' ? 'owner' : 'kasir';
      const userObj: User = {
        id: profile.id,
        name: profile.full_name,
        email: profile.email,
        role: verifiedRole,
        phone: profile.phone || '',
      };

      setCurrentUser(userObj);
      setAuthenticatedRole(verifiedRole);
      await syncDatabase();
      return { success: true, role: verifiedRole };
    }

    return {
      success: false,
      error: 'Konfigurasi Supabase belum tersedia. Periksa NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY.',
    };
  };

  const logout = async () => {
    const supabase = getClientSafe();
    if (supabase) {
      await supabase.auth.signOut();
    }
    try {
      sessionStorage.removeItem('cc_local_session');
    } catch {}
    setCurrentUser(null);
    setAuthenticatedRole(null);
    setCart([]);
    showToast('Berhasil keluar dari sistem.', 'info');
  };

  const switchRole = (role: UserRole) => {
    if (authenticatedRole !== 'owner') {
      showToast('Akses ditolak: hanya akun Owner yang dapat beralih mode tampilan.', 'error');
      return;
    }
    setCurrentUser((prev) => (prev ? { ...prev, role } : null));
    showToast(
      role === 'owner' ? 'Beralih ke mode Owner / Manajemen' : 'Beralih ke mode Kasir POS',
      'info'
    );
  };

  // Shift Operations
  const openShift = async (startingCash: number, notes?: string): Promise<boolean> => {
    if (!currentUser) {
      showToast('Anda harus login untuk membuka shift.', 'error');
      return false;
    }
    if (activeShift) {
      showToast('Sesi kasir aktif sudah berjalan. Hanya 1 shift yang boleh aktif secara global.', 'warning');
      return false;
    }

    const supabase = getClientSafe();
    let sessionId = `shift-${Date.now()}`;
    let openedAt = new Date().toISOString();

    if (supabase) {
      try {
        const dbSession = await posService.openSession(
          currentUser.id,
          startingCash,
          currentUser.role === 'owner' ? 'owner_kasir' : 'kasir',
          notes
        );
        if (!dbSession) throw new Error('Gagal membuat sesi kasir di database.');
        sessionId = dbSession.id;
        openedAt = dbSession.opened_at;
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Gagal membuka shift di Supabase.';
        showToast(msg, 'error');
        return false;
      }
    }

    const newShift: Shift = {
      id: sessionId,
      cashierId: currentUser.id,
      cashierName: currentUser.name,
      status: 'open',
      startingCash,
      openedAt,
      expectedCash: startingCash,
      totalTransactions: 0,
      totalSales: 0,
      cashSales: 0,
      qrisSales: 0,
      transferSales: 0,
      notes,
    };
    setActiveShift(newShift);
    showToast(`Shift berhasil dibuka dengan modal awal Rp ${startingCash.toLocaleString('id-ID')}`, 'success');
    return true;
  };

  const closeShift = async (actualCash: number, notes?: string) => {
    if (!activeShift) {
      throw new Error('Tidak ada shift kasir yang sedang aktif');
    }

    const supabase = getClientSafe();
    let expectedCash = activeShift.expectedCash;
    let difference = calculateShiftDifference(actualCash, expectedCash);

    if (supabase) {
      const res = await posService.closeSession(
        activeShift.id,
        actualCash,
        notes,
        currentUser?.id,
        false
      );
      if (!res || !res.success) {
        throw new Error('Gagal menyimpan penutupan shift ke database.');
      }
      expectedCash = Number(res.expected_cash);
      difference = Number(res.cash_difference);
    }

    const closed: Shift = {
      ...activeShift,
      status: 'closed',
      closedAt: new Date().toISOString(),
      expectedCash,
      actualCash,
      difference,
      notes: notes || activeShift.notes,
    };

    setShiftHistory((prev) => [closed, ...prev]);
    setActiveShift(null);
    clearCart();

    const diffText =
      difference === 0
        ? 'Kas fisik cocok sesuai perhitungan sistem'
        : difference > 0
        ? `Surplus kas fisik: +Rp ${difference.toLocaleString('id-ID')}`
        : `Selisih kurang: -Rp ${Math.abs(difference).toLocaleString('id-ID')}`;

    showToast(`Shift ditutup. ${diffText}`, difference === 0 ? 'success' : 'warning');
    return { difference, expected: expectedCash };
  };

  const forceCloseShift = async (reason: string) => {
    if (!activeShift) return;

    const supabase = getClientSafe();
    let expectedCash = activeShift.expectedCash;

    if (supabase) {
      const res = await posService.closeSession(
        activeShift.id,
        expectedCash,
        `[FORCE CLOSE OLEH OWNER]: ${reason}`,
        currentUser?.id,
        true,
        reason
      );
      if (res && res.expected_cash !== undefined) {
        expectedCash = Number(res.expected_cash);
      }
    }

    const closed: Shift = {
      ...activeShift,
      status: 'closed',
      closedAt: new Date().toISOString(),
      expectedCash,
      actualCash: expectedCash,
      difference: 0,
      notes: `[FORCE CLOSE OLEH OWNER]: ${reason}`,
    };
    setShiftHistory((prev) => [closed, ...prev]);
    setActiveShift(null);
    showToast('Shift kasir berhasil di-force close oleh Owner.', 'info');
  };

  // Categories
  const addCategory = (cat: Omit<Category, 'id'>) => {
    const id = `cat-${Date.now()}`;
    const newCat = { ...cat, id };
    setCategories((prev) => [...prev, newCat]);
    showToast(`Kategori "${cat.name}" berhasil ditambahkan`, 'success');
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
    showToast('Kategori berhasil diperbarui', 'success');
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    showToast('Kategori berhasil dihapus', 'info');
  };

  // Products
  const addProduct = (p: Omit<Product, 'id'>) => {
    const id = `prd-${Date.now()}`;
    const newProduct: Product = { ...p, id };
    setProducts((prev) => [newProduct, ...prev]);
    inventoryService.addProduct(p).catch((err) => console.warn('Supabase product sync:', err));
    showToast(`Produk "${p.name}" berhasil ditambahkan`, 'success');
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
    inventoryService.updateProduct(id, updates).catch((err) => console.warn('Supabase product sync:', err));
    showToast('Data produk berhasil diperbarui', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    inventoryService.deleteProduct(id).catch((err) => console.warn('Supabase product sync:', err));
    showToast('Produk telah dihapus', 'info');
  };

  // Raw Materials
  const addRawMaterial = (m: Omit<RawMaterial, 'id'>) => {
    const id = `raw-${Date.now()}`;
    setRawMaterials((prev) => [{ ...m, id }, ...prev]);
    inventoryService.addRawMaterial(m).catch((err) => console.warn('Supabase raw material sync:', err));
    showToast(`Bahan baku "${m.name}" berhasil ditambahkan`, 'success');
  };

  const updateRawMaterial = (id: string, updates: Partial<RawMaterial>) => {
    setRawMaterials((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
    inventoryService.updateRawMaterial(id, updates).catch((err) => console.warn('Supabase raw material sync:', err));
    showToast('Data bahan baku berhasil diperbarui', 'success');
  };

  const deleteRawMaterial = (id: string) => {
    setRawMaterials((prev) => prev.filter((item) => item.id !== id));
    inventoryService.deleteRawMaterial(id).catch((err) => console.warn('Supabase raw material sync:', err));
    showToast('Bahan baku telah dihapus', 'info');
  };

  // Suppliers
  const addSupplier = (s: Omit<Supplier, 'id'>) => {
    const id = `sup-${Date.now()}`;
    setSuppliers((prev) => [{ ...s, id }, ...prev]);
    showToast(`Pemasok "${s.name}" berhasil didaftarkan`, 'success');
  };

  const updateSupplier = (id: string, updates: Partial<Supplier>) => {
    setSuppliers((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
    showToast('Data pemasok berhasil diperbarui', 'success');
  };

  const deleteSupplier = (id: string) => {
    setSuppliers((prev) => prev.filter((item) => item.id !== id));
    showToast('Pemasok telah dihapus', 'info');
  };

  // Recipes
  const addRecipe = (r: Omit<Recipe, 'id'>) => {
    const id = `rcp-${Date.now()}`;
    setRecipes((prev) => [{ ...r, id }, ...prev]);
    showToast(`Resep untuk "${r.productName}" berhasil disimpan`, 'success');
  };

  const updateRecipe = (id: string, updates: Partial<Recipe>) => {
    setRecipes((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
    showToast('Data resep berhasil diperbarui', 'success');
  };

  const deleteRecipe = (id: string) => {
    setRecipes((prev) => prev.filter((item) => item.id !== id));
    showToast('Resep telah dihapus', 'info');
  };

  // Stock Adjustment
  const addStockAdjustment = (
    itemName: string,
    itemType: 'produk' | 'bahan_baku',
    qty: number,
    unit: string,
    reason: string
  ) => {
    const now = new Date();
    const dateStr = `${now.toISOString().split('T')[0]} ${now.toTimeString().substring(0, 5)}`;
    const movement: StockMovement = {
      id: `sm-${Date.now()}`,
      date: dateStr,
      type: 'penyesuaian',
      itemType,
      itemName,
      quantity: Math.abs(qty),
      unit,
      reference: `Penyesuaian Fisik Opname: ${reason}`,
      note: reason,
    };

    setStockMovements((prev) => [movement, ...prev]);

    if (itemType === 'produk') {
      setProducts((prev) =>
        prev.map((p) =>
          p.name === itemName ? { ...p, stock: Math.max(0, p.stock + qty) } : p
        )
      );
    } else {
      setRawMaterials((prev) =>
        prev.map((m) =>
          m.name === itemName ? { ...m, stock: Math.max(0, m.stock + qty) } : m
        )
      );
    }
    showToast(`Penyesuaian stok "${itemName}" berhasil dicatat`, 'success');
  };

  // Cart
  const addToCart = (product: Product, quantity = 1) => {
    if (!activeShift) {
      showToast('Shift kasir belum dibuka! Silakan buka shift terlebih dahulu untuk mulai transaksi.', 'warning');
      return;
    }
    if (product.stock < quantity) {
      showToast(`Stok "${product.name}" tidak mencukupi (sisa ${product.stock} ${product.unit})`, 'error');
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        const newQty = existing.quantity + quantity;
        if (newQty > product.stock) {
          showToast(`Stok terbatas. Maksimal ${product.stock} ${product.unit}`, 'warning');
          return prev;
        }
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: newQty } : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`${product.name} dimasukkan ke keranjang`, 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const product = products.find((p) => p.id === productId);
    if (product && quantity > product.stock) {
      showToast(`Stok hanya tersisa ${product.stock} ${product.unit}`, 'warning');
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  // Transaction checkout (Persisted atomically in Supabase with idempotency)
  const processTransaction = async (
    paymentMethod: 'tunai' | 'qris' | 'transfer',
    amountPaid: number
  ): Promise<Transaction> => {
    if (!currentUser) {
      throw new Error('Anda harus login untuk memproses transaksi');
    }
    if (!activeShift) {
      throw new Error('Shift belum dibuka');
    }
    if (cart.length === 0) {
      throw new Error('Keranjang belanja masih kosong');
    }
    if (isCheckingOutRef.current) {
      throw new Error('Transaksi sedang diproses, harap tunggu sebentar.');
    }

    isCheckingOutRef.current = true;
    try {
      const { total } = calculateCartTotals(
        cart.map((c) => ({ price: c.product.price, quantity: c.quantity }))
      );
      const paymentCheck = calculatePaymentChange(total, paymentMethod, amountPaid);
      if (!paymentCheck.valid) {
        throw new Error(paymentCheck.error || 'Pembayaran tidak valid');
      }

      const idempotencyKey =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `idem-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

      const supabase = getClientSafe();
      let txId = `trx-${Date.now()}`;
      let code = `TRX-${new Date().toISOString().replace(/\D/g, '').slice(0, 14)}`;

      if (supabase) {
        const rpcResult = await posService.processCheckout(
          activeShift.id,
          currentUser.id,
          cart,
          paymentMethod,
          paymentCheck.amountPaid,
          undefined,
          idempotencyKey
        );
        if (!rpcResult || !rpcResult.success) {
          throw new Error('Gagal menyimpan transaksi ke database Supabase.');
        }
        txId = rpcResult.transaction_id;
        code = rpcResult.invoice_number;
      }

      const details = cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        subtotal: item.product.price * item.quantity,
      }));

      const newTx: Transaction = {
        id: txId,
        code,
        shiftId: activeShift.id,
        cashierId: currentUser.id,
        cashierName: currentUser.name,
        date: new Date().toISOString(),
        items: details,
        total,
        paymentMethod,
        amountPaid: paymentCheck.amountPaid,
        change: paymentCheck.change,
        status: 'selesai',
      };

      setProducts((prev) =>
        prev.map((prod) => {
          const cartItem = cart.find((c) => c.product.id === prod.id);
          if (cartItem) {
            return { ...prod, stock: Math.max(0, prod.stock - cartItem.quantity) };
          }
          return prod;
        })
      );

      const movements: StockMovement[] = cart.map((item) => ({
        id: `sm-${Date.now()}-${item.product.id}`,
        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        type: 'keluar',
        itemType: 'produk',
        itemName: item.product.name,
        quantity: item.quantity,
        unit: item.product.unit,
        reference: `Penjualan #${code}`,
      }));

      setStockMovements((prev) => [...movements, ...prev]);

      setActiveShift((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          totalTransactions: prev.totalTransactions + 1,
          totalSales: prev.totalSales + total,
          cashSales: paymentMethod === 'tunai' ? prev.cashSales + total : prev.cashSales,
          qrisSales: paymentMethod === 'qris' ? prev.qrisSales + total : prev.qrisSales,
          transferSales: paymentMethod === 'transfer' ? prev.transferSales + total : prev.transferSales,
          expectedCash:
            paymentMethod === 'tunai'
              ? calculateExpectedShiftCash(
                  prev.startingCash,
                  prev.cashSales + total,
                  prev.startingCash + prev.cashSales - prev.expectedCash
                )
              : prev.expectedCash,
        };
      });

      setTransactions((prev) => [newTx, ...prev]);
      clearCart();
      showToast(`Transaksi #${code} berhasil diproses!`, 'success');
      return newTx;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Transaksi gagal diproses.';
      showToast(msg, 'error');
      throw err;
    } finally {
      isCheckingOutRef.current = false;
    }
  };

  // Expenses (FR-FIN: Expected Cash = Opening + Cash Sales - Cash Expenses - Cash Refunds)
  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const id = `exp-${Date.now()}`;
    const paymentMethod = expense.paymentMethod || 'cash';
    const isCashExpense = paymentMethod === 'cash';
    const shiftId = expense.shiftId || (isCashExpense && activeShift ? activeShift.id : undefined);
    const enrichedExpense: Omit<Expense, 'id'> = {
      ...expense,
      paymentMethod,
      shiftId,
    };

    setExpenses((prev) => [{ ...enrichedExpense, id }, ...prev]);
    financeService
      .addExpense(enrichedExpense, currentUser?.id)
      .catch((err) => console.warn('Supabase expense sync:', err));

    // Only cash expenses linked to the active shift reduce the physical drawer expectedCash
    if (isCashExpense && activeShift && shiftId === activeShift.id) {
      setActiveShift((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          expectedCash: prev.expectedCash - expense.amount,
        };
      });
    }

    showToast(`Pengeluaran Rp ${expense.amount.toLocaleString('id-ID')} berhasil dicatat`, 'success');
  };

  // Marketplace (Uses real parsed CSV records, zero dummy defaults)
  const importMarketplaceReport = async (
    platform: 'GoFood' | 'GrabFood' | 'ShopeeFood' | 'Shopee',
    fileName: string,
    fileSize: number,
    parsedRecords: MarketplaceOrderRecord[]
  ): Promise<MarketplaceReport> => {
    if (!parsedRecords || parsedRecords.length === 0) {
      throw new Error('Tidak ada baris transaksi valid untuk diimpor.');
    }

    const platformKey = platform.toLowerCase() as 'gofood' | 'grabfood' | 'shopeefood' | 'shopee';
    const supabase = getClientSafe();
    let batchId = `rep-${platformKey}-${Date.now()}`;

    if (supabase) {
      const batch = await marketplaceService.importBatch(
        platformKey,
        fileName,
        fileSize,
        parsedRecords,
        currentUser?.id
      );
      if (batch) {
        batchId = batch.id;
      }
    }

    const totalOrders = parsedRecords.length;
    const totalRevenue = parsedRecords.reduce((sum, r) => sum + r.netAmount, 0);

    const report: MarketplaceReport = {
      id: batchId,
      platform,
      fileName,
      importDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
      totalOrders,
      totalRevenue,
      status: 'Sukses',
      orders: parsedRecords.map((rec) => ({
        orderId: rec.platformOrderId,
        platform,
        date: rec.orderDate.split('T')[0],
        customerName: rec.customerName || 'Pelanggan Marketplace',
        productName: rec.productName || 'Item Marketplace',
        quantity: rec.quantity || 1,
        total: rec.netAmount,
        status: 'Selesai',
      })),
    };
    setMarketplaceReports((prev) => [report, ...prev]);
    showToast(`Laporan ${platform} "${fileName}" (${totalOrders} pesanan) berhasil diimpor.`, 'success');
    return report;
  };

  // Production (FR-PRODCT-07: deducts raw materials based on recipe)
  const addProductionOrder = (productId: string, quantity: number, notes?: string) => {
    const prod = products.find((p) => p.id === productId);
    if (!prod) return;

    // Find recipe for this product to deduct raw materials
    const recipe = recipes.find((r) => r.productId === productId);

    // If recipe exists, check and deduct raw materials
    if (recipe) {
      const portionMultiplier = quantity / (recipe.yieldPortions || 1);
      
      // Verify sufficient raw materials before proceeding
      for (const ing of recipe.ingredients) {
        const rawMat = rawMaterials.find((m) => m.id === ing.materialId || m.name === ing.materialName);
        if (rawMat) {
          const requiredQty = ing.amount * portionMultiplier;
          if (rawMat.stock < requiredQty) {
            showToast(
              `Stok bahan baku "${rawMat.name}" tidak mencukupi (butuh ${requiredQty.toFixed(1)} ${ing.unit}, sisa ${rawMat.stock} ${rawMat.unit})`,
              'error'
            );
            return;
          }
        }
      }

      // Deduct raw materials
      setRawMaterials((prev) =>
        prev.map((raw) => {
          const ing = recipe.ingredients.find((i) => i.materialId === raw.id || i.materialName === raw.name);
          if (ing) {
            const deductQty = ing.amount * portionMultiplier;
            return { ...raw, stock: Math.max(0, raw.stock - deductQty) };
          }
          return raw;
        })
      );

      // Record raw material outgoing movements
      const rawMovements: StockMovement[] = recipe.ingredients
        .map((ing) => {
          const rawMat = rawMaterials.find((m) => m.id === ing.materialId || m.name === ing.materialName);
          if (!rawMat) return null;
          return {
            id: `sm-${Date.now()}-raw-${ing.materialId}`,
            date: new Date().toISOString().replace('T', ' ').substring(0, 16),
            type: 'keluar' as const,
            itemType: 'bahan_baku' as const,
            itemName: rawMat.name,
            quantity: ing.amount * portionMultiplier,
            unit: ing.unit,
            reference: `Produksi #PRD-${new Date().toISOString().replace(/\D/g, '').slice(0, 10)} (${prod.name})`,
          };
        })
        .filter((m): m is NonNullable<typeof m> => m !== null) as StockMovement[];

      setStockMovements((prev) => [...rawMovements, ...prev]);
    }

    const code = `PRD-${new Date().toISOString().replace(/\D/g, '').slice(0, 10)}`;
    const newOrder: ProductionOrder = {
      id: `ord-${Date.now()}`,
      code,
      productId,
      productName: prod.name,
      targetQuantity: quantity,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Selesai',
      notes,
    };

    setProductionOrders((prev) => [newOrder, ...prev]);

    // Increase product stock
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: p.stock + quantity } : p))
    );

    // Record finished goods stock movement
    const movement: StockMovement = {
      id: `sm-${Date.now()}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      type: 'masuk',
      itemType: 'produk',
      itemName: prod.name,
      quantity,
      unit: prod.unit,
      reference: `Hasil Produksi #${code}`,
    };
    setStockMovements((prev) => [movement, ...prev]);
    showToast(`Produksi ${quantity} ${prod.unit} "${prod.name}" berhasil dicatat`, 'success');
  };

  // Procurement
  const addProcurementOrder = (
    supplierName: string,
    items: { materialName: string; quantity: number; unit: string; price: number }[]
  ) => {
    const code = `PO-${new Date().toISOString().replace(/\D/g, '').slice(0, 10)}`;
    const totalAmount = items.reduce((sum, it) => sum + it.quantity * it.price, 0);

    const procurement: ProcurementOrder = {
      id: `po-${Date.now()}`,
      code,
      supplierName,
      date: new Date().toISOString().split('T')[0],
      items: items.map((it) => ({ ...it, subtotal: it.quantity * it.price })),
      totalAmount,
      status: 'Selesai',
    };

    setProcurementOrders((prev) => [procurement, ...prev]);

    // Update raw materials stock
    setRawMaterials((prev) =>
      prev.map((raw) => {
        const found = items.find((it) => it.materialName === raw.name);
        if (found) {
          return { ...raw, stock: raw.stock + found.quantity };
        }
        return raw;
      })
    );

    // Record movements
    const movements: StockMovement[] = items.map((it) => ({
      id: `sm-${Date.now()}-${it.materialName}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      type: 'masuk',
      itemType: 'bahan_baku',
      itemName: it.materialName,
      quantity: it.quantity,
      unit: it.unit,
      reference: `Pengadaan #${code} (${supplierName})`,
    }));
    setStockMovements((prev) => [...movements, ...prev]);

    showToast(`Pengadaan senilai Rp ${totalAmount.toLocaleString('id-ID')} berhasil dicatat`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        authenticatedRole,
        isAuthLoading,
        loginWithPassword,
        logout,
        switchRole,
        activeShift,
        shiftHistory,
        openShift,
        closeShift,
        forceCloseShift,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        rawMaterials,
        addRawMaterial,
        updateRawMaterial,
        deleteRawMaterial,
        suppliers,
        addSupplier,
        updateSupplier,
        deleteSupplier,
        recipes,
        addRecipe,
        updateRecipe,
        deleteRecipe,
        stockMovements,
        addStockAdjustment,
        clearAllData,
        loadSampleData,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        processTransaction,
        transactions,
        expenses,
        addExpense,
        marketplaceReports,
        importMarketplaceReport,
        productionOrders,
        addProductionOrder,
        procurementOrders,
        addProcurementOrder,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
      {/* Toast Notification Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-alert text-sm font-semibold transition-all transform animate-fade-in ${
              toast.type === 'success'
                ? 'bg-[#DCFCE7] text-[#15803D] border border-[#16A34A]/30'
                : toast.type === 'warning'
                ? 'bg-[#FEF3C7] text-[#92400E] border border-[#F59E0B]/30'
                : toast.type === 'error'
                ? 'bg-[#FFDAD6] text-[#93000A] border border-[#BA1A1A]/30'
                : 'bg-[#E5EEFF] text-[#0B1C30] border border-[#CBD5E1]'
            }`}
          >
            <span>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-2 text-xs opacity-60 hover:opacity-100"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

