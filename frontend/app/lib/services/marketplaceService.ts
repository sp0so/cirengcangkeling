import { getClientSafe } from './supabaseService';

export interface MarketplaceOrderRecord {
  platformOrderId: string;
  orderDate: string;
  grossAmount: number;
  discountAmount: number;
  platformFee: number;
  netAmount: number;
  customerName?: string;
  productName?: string;
  quantity?: number;
  unitPrice?: number;
}

export const marketplaceService = {
  // Parse CSV or tabular text from marketplace report
  parseReportCSV(csvContent: string, platform: 'gofood' | 'grabfood' | 'shopeefood' | 'shopee'): MarketplaceOrderRecord[] {
    const lines = csvContent.split(/\r?\n/).filter((line) => line.trim().length > 0);
    if (lines.length <= 1) return [];

    const headers = lines[0].toLowerCase().split(',').map((h) => h.trim().replace(/^"|"$/g, ''));
    const records: MarketplaceOrderRecord[] = [];

    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',').map((c) => c.trim().replace(/^"|"$/g, ''));
      if (cols.length < 2) continue;

      // Extract basic fields with fallbacks
      const orderId = cols[0] || `ORD-${Date.now()}-${i}`;
      const orderDate = cols[1] || new Date().toISOString();
      const gross = parseFloat(cols[2]) || 25000;
      const discount = parseFloat(cols[3]) || 0;
      const fee = parseFloat(cols[4]) || Math.round(gross * 0.2); // Typical 20% platform commission
      const net = gross - discount - fee;

      records.push({
        platformOrderId: orderId,
        orderDate,
        grossAmount: gross,
        discountAmount: discount,
        platformFee: fee,
        netAmount: Math.max(0, net),
        productName: cols[5] || 'Cireng Paket Komplit',
        quantity: parseInt(cols[6], 10) || 1,
        unitPrice: parseFloat(cols[7]) || gross,
      });
    }

    return records;
  },

  async importBatch(
    platform: 'gofood' | 'grabfood' | 'shopeefood' | 'shopee',
    fileName: string,
    fileSize: number,
    records: MarketplaceOrderRecord[],
    userId?: string
  ) {
    const supabase = getClientSafe();
    if (!supabase) return null;

    const totalGross = records.reduce((sum, r) => sum + r.grossAmount, 0);
    const totalDiscounts = records.reduce((sum, r) => sum + r.discountAmount, 0);
    const totalFees = records.reduce((sum, r) => sum + r.platformFee, 0);
    const totalNet = records.reduce((sum, r) => sum + r.netAmount, 0);

    // 1. Create Batch Record
    const { data: batch, error: batchErr } = await supabase
      .from('marketplace_import_batches')
      .insert({
        platform,
        file_name: fileName,
        file_size: fileSize,
        total_orders: records.length,
        total_gross_sales: totalGross,
        total_discounts: totalDiscounts,
        total_platform_fees: totalFees,
        total_net_revenue: totalNet,
        uploaded_by: userId,
      })
      .select()
      .single();

    if (batchErr) throw batchErr;

    // 2. Insert Sales with ON CONFLICT ignore (preventing duplicates per SRS 7.6)
    for (const rec of records) {
      const { data: sale } = await supabase
        .from('marketplace_sales')
        .upsert(
          {
            import_batch_id: batch.id,
            platform,
            platform_order_id: rec.platformOrderId,
            order_date: rec.orderDate,
            gross_amount: rec.grossAmount,
            discount_amount: rec.discountAmount,
            platform_fee: rec.platformFee,
            net_amount: rec.netAmount,
            customer_name: rec.customerName || 'Pelanggan Online',
          },
          { onConflict: 'platform,platform_order_id', ignoreDuplicates: true }
        )
        .select()
        .single();

      if (sale && rec.productName) {
        await supabase.from('marketplace_sales_details').insert({
          marketplace_sale_id: sale.id,
          product_name: rec.productName,
          quantity: rec.quantity || 1,
          unit_price: rec.unitPrice || rec.grossAmount,
          subtotal: rec.grossAmount,
        });
      }
    }

    return batch;
  },

  async getMasterSalesSummary() {
    const supabase = getClientSafe();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('marketplace_import_batches')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return null;
    return data;
  },
};
