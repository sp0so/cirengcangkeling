import { getClientSafe } from './supabaseService';
import { CartItem, Transaction, Shift } from '../types';

export const posService = {
  async getActiveSession(): Promise<Shift | null> {
    const supabase = getClientSafe();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('cashier_sessions')
      .select('*, profiles(full_name)')
      .eq('status', 'active')
      .single();

    if (error || !data) return null;

    return {
      id: data.id,
      cashierId: data.user_id,
      cashierName: data.profiles?.full_name || 'Kasir',
      status: 'open',
      startingCash: Number(data.opening_cash),
      openedAt: data.opened_at,
      expectedCash: Number(data.expected_cash || data.opening_cash),
      totalTransactions: 0,
      totalSales: Number(data.total_cash_sales) + Number(data.total_non_cash_sales),
      cashSales: Number(data.total_cash_sales),
      qrisSales: 0,
      transferSales: Number(data.total_non_cash_sales),
      notes: data.notes,
    };
  },

  async openSession(userId: string, startingCash: number, mode: 'kasir' | 'owner_kasir' = 'kasir', notes?: string) {
    const supabase = getClientSafe();
    if (!supabase) return null;

    const sessionCode = `SHIFT-${new Date().toISOString().replace(/\D/g, '').slice(0, 8)}-${Math.floor(Math.random() * 900 + 100)}`;
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
    notes?: string
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
      p_notes: notes,
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
      p_notes: notes,
      p_closed_by: closedBy,
      p_is_force_close: isForceClose,
      p_force_reason: forceReason,
    });

    if (error) throw error;
    return data;
  },
};
