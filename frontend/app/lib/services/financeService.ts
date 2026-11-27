import { getClientSafe } from './supabaseService';
import { Expense } from '../types';

export const financeService = {
  async getExpenses(): Promise<Expense[] | null> {
    const supabase = getClientSafe();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('expenses')
      .select('*, profiles(full_name)')
      .order('expense_date', { ascending: false });

    if (error || !data) return null;

    return data.map((item) => ({
      id: item.id,
      category: (item.category === 'operasional'
        ? 'Operasional'
        : item.category === 'bahan_baku'
        ? 'Bahan Baku'
        : item.category === 'gaji'
        ? 'Gaji Karyawan'
        : item.category === 'utilitas'
        ? 'Sewa & Listrik'
        : 'Lain-lain') as Expense['category'],
      description: item.description,
      amount: Number(item.amount),
      date: item.expense_date,
      recordedBy: item.profiles?.full_name || 'Admin',
      paymentMethod: (item.payment_method === 'transfer' ? 'transfer' : 'cash') as 'cash' | 'transfer',
      shiftId: item.cashier_session_id || undefined,
    }));
  },

  async addExpense(expense: Omit<Expense, 'id'>, userId?: string) {
    const supabase = getClientSafe();
    if (!supabase) return null;

    const code = `EXP-${new Date().toISOString().replace(/\D/g, '').slice(0, 8)}-${Math.floor(Math.random() * 900 + 100)}`;
    const categoryMap: Record<string, string> = {
      'Operasional': 'operasional',
      'Bahan Baku': 'bahan_baku',
      'Gaji Karyawan': 'gaji',
      'Sewa & Listrik': 'utilitas',
      'Pemasaran': 'operasional',
      'Lain-lain': 'lainnya',
    };

    const { data, error } = await supabase
      .from('expenses')
      .insert({
        expense_code: code,
        category: categoryMap[expense.category] || 'operasional',
        amount: expense.amount,
        payment_method: expense.paymentMethod || 'cash',
        cashier_session_id: expense.shiftId || null,
        expense_date: expense.date,
        description: expense.description,
        created_by: userId || null,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getFinancialSummary() {
    const supabase = getClientSafe();
    if (!supabase) return null;

    // 1. Fetch total sales from sales_transactions
    const { data: salesData } = await supabase
      .from('sales_transactions')
      .select('total_amount')
      .eq('status', 'completed');

    const totalOfflineSales = salesData?.reduce((sum, item) => sum + Number(item.total_amount), 0) || 0;

    // 2. Fetch marketplace net revenue
    const { data: mktData } = await supabase
      .from('marketplace_import_batches')
      .select('total_net_revenue');

    const totalMarketplaceNet = mktData?.reduce((sum, item) => sum + Number(item.total_net_revenue), 0) || 0;
    const totalGrossRevenue = totalOfflineSales + totalMarketplaceNet;

    // 3. Fetch operational expenses
    const { data: expData } = await supabase
      .from('expenses')
      .select('amount');

    const totalExpenses = expData?.reduce((sum, item) => sum + Number(item.amount), 0) || 0;

    // 4. Fetch production COGM / HPP
    const { data: prodData } = await supabase
      .from('productions')
      .select('calculated_cost');

    const totalCOGM = prodData?.reduce((sum, item) => sum + Number(item.calculated_cost), 0) || 0;

    // Estimated profit = Gross Revenue - Total COGM - Operational Expenses
    const estimatedProfit = totalGrossRevenue - totalCOGM - totalExpenses;

    return {
      totalGrossRevenue,
      totalOfflineSales,
      totalMarketplaceNet,
      totalCOGM,
      totalExpenses,
      estimatedProfit,
      isEstimated: true, // Marked as estimate per SRS 7.7
    };
  },
};
