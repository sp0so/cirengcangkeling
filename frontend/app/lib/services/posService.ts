import { getClientSafe } from './supabaseService';
import { CartItem, Transaction, Shift } from '../types';

export const posService = {
  async getActiveSession(): Promise<Shift | null> {
    const supabase = getClientSafe();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('cashier_sessions')
      .select('*, profiles:user_id(full_name)')
      .eq('status', 'active')
      .maybeSingle();

    if (error || !data) return null;

    return {
      id: data.id,
      cashierId: data.user_id,
      cashierName: data.profiles?.full_name || 'Kasir',
      status: 'open',
      startingCash: Number(data.opening_cash),
      openedAt: data.opened_at,
      expectedCash: Number(
        data.opening_cash +
          data.total_cash_sales -
          (data.total_cash_expenses || 0) -
          (data.total_cash_refunds || 0)
      ),
      totalTransactions: 0,
      totalSales: Number(data.total_cash_sales) + Number(data.total_non_cash_sales),
      cashSales: Number(data.total_cash_sales),
      qrisSales: 0,
      transferSales: Number(data.total_non_cash_sales),
      notes: data.notes,
    };
  },

  async getShiftHistory(): Promise<Shift[] | null> {
    const supabase = getClientSafe();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('cashier_sessions')
      .select('*, profiles:user_id(full_name)')
      .neq('status', 'active')
      .order('closed_at', { ascending: false })
      .limit(50);

    if (error || !data) return null;

    return data.map((s) => ({
      id: s.id,
      cashierId: s.user_id,
      cashierName: s.profiles?.full_name || 'Kasir',
      status: 'closed',
      startingCash: Number(s.opening_cash),
      openedAt: s.opened_at,
      closedAt: s.closed_at || undefined,
      expectedCash: Number(s.expected_cash || 0),
      actualCash: s.actual_cash !== null ? Number(s.actual_cash) : undefined,
      difference: s.cash_difference !== null ? Number(s.cash_difference) : undefined,
      notes: s.notes || undefined,
      totalTransactions: 0,
      totalSales: Number(s.total_cash_sales) + Number(s.total_non_cash_sales),
      cashSales: Number(s.total_cash_sales),
      qrisSales: 0,
      transferSales: Number(s.total_non_cash_sales),
    }));
  },

  async getTransactions(): Promise<Transaction[] | null> {
    const supabase = getClientSafe();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('sales_transactions')
      .select('*, profiles:user_id(full_name), sales_transaction_details(*)')
      .order('transaction_date', { ascending: false })
      .limit(200);

    if (error || !data) return null;

    return data.map((tx) => ({
      id: tx.id,
      code: tx.invoice_number,
      date: tx.transaction_date,
      cashierId: tx.user_id,
      cashierName: tx.profiles?.full_name || 'Kasir',
      shiftId: tx.cashier_session_id,
      items: (tx.sales_transaction_details || []).map((d: {
        product_id: string;
        product_name: string;
        unit_price: number;
        quantity: number;
        subtotal: number;
      }) => ({
        productId: d.product_id,
        productName: d.product_name,
        price: Number(d.unit_price),
        quantity: Number(d.quantity),
        subtotal: Number(d.subtotal),
      })),
      total: Number(tx.total_amount),
      paymentMethod: tx.payment_method,
      amountPaid: Number(tx.amount_paid),
      change: Number(tx.change_amount),
      status: tx.status === 'cancelled' ? 'dibatalkan' : 'selesai',
    }));
  },

  async openSession(
    userId: string,
    startingCash: number,
    mode: 'kasir' | 'owner_kasir' = 'kasir',
    notes?: string
  ) {
    const supabase = getClientSafe();
    if (!supabase) return null;

    const sessionCode = `SHIFT-${new Date().toISOString().replace(/\D/g, '').slice(0, 8)}-${Math.floor(Math.random() * 9000 + 1000)}`;
    const { data, error } = await supabase
      .from('cashier_sessions')
      .insert({
        session_code: sessionCode,
        user_id: userId,
        mode,
        status: 'active',
        opening_cash: startingCash,
        expected_cash: startingCash,
        notes,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async processCheckout(
    sessionId: string,
    userId: string,
    cart: CartItem[],
    paymentMethod: 'tunai' | 'qris' | 'transfer',
    amountPaid: number,
    notes?: string,
    idempotencyKey?: string
  ) {
    const supabase = getClientSafe();
    if (!supabase) return null;

    const itemsPayload = cart.map((item) => ({
      product_id: item.product.id,
      product_name: item.product.name,
      quantity: item.quantity,
      unit_price: item.product.price,
      subtotal: item.product.price * item.quantity,
    }));

    const { data, error } = await supabase.rpc('process_pos_checkout', {
      p_session_id: sessionId,
      p_user_id: userId,
      p_items: itemsPayload,
      p_payment_method: paymentMethod,
      p_amount_paid: amountPaid,
      p_discount: 0,
      p_notes: notes || null,
      p_idempotency_key: idempotencyKey || null,
    });

    if (error) throw error;
    return data;
  },

  async closeSession(
    sessionId: string,
    actualCash: number,
    notes?: string,
    closedBy?: string,
    isForceClose = false,
    forceReason?: string
  ) {
    const supabase = getClientSafe();
    if (!supabase) return null;

    const { data, error } = await supabase.rpc('close_cashier_shift', {
      p_session_id: sessionId,
      p_actual_cash: actualCash,
      p_notes: notes || null,
      p_closed_by: closedBy || null,
      p_is_force_close: isForceClose,
      p_force_reason: forceReason || null,
    });

    if (error) throw error;
    return data;
  },
};
