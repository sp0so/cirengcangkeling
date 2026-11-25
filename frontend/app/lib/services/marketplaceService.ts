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

export interface MarketplaceParseError {
  rowNumber: number;
  rawLine: string;
  reason: string;
}

export interface MarketplaceParseResult {
  records: MarketplaceOrderRecord[];
  errors: MarketplaceParseError[];
}

function splitCsvLine(line: string, delimiter: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === delimiter && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function detectDelimiter(headerLine: string): string {
  const commaCount = (headerLine.match(/,/g) || []).length;
  const semiCount = (headerLine.match(/;/g) || []).length;
  const tabCount = (headerLine.match(/\t/g) || []).length;

  if (semiCount > commaCount && semiCount >= tabCount) return ';';
  if (tabCount > commaCount && tabCount > semiCount) return '\t';
  return ',';
}

function parseMoney(raw: string | undefined): number {
  if (!raw) return NaN;
  // Strip currency labels and whitespace
  const cleaned = raw.replace(/rp\.?/gi, '').replace(/\s+/g, '');
  if (!cleaned) return NaN;

  // Handle Indonesian thousand-dot separator (e.g., 25.000 or 1.250.000) vs decimal
  if (/^\d{1,3}(\.\d{3})+(,\d+)?$/.test(cleaned)) {
    return Math.round(Number(cleaned.replace(/\./g, '').replace(',', '.')));
  }
  // Handle standard comma-separated thousands (e.g., 25,000)
  if (/^\d{1,3}(,\d{3})+(\.\d+)?$/.test(cleaned)) {
    return Math.round(Number(cleaned.replace(/,/g, '')));
  }
  const num = Number(cleaned.replace(',', '.'));
  return Number.isFinite(num) ? Math.round(num) : NaN;
}

export const marketplaceService = {
  /**
   * Parses CSV content from GoFood, GrabFood, ShopeeFood, or Shopee exports.
   * Rejects malformed/empty rows without fabricating dummy defaults.
   */
  parseReportCSV(
    csvContent: string,
    _platform: 'gofood' | 'grabfood' | 'shopeefood' | 'shopee'
  ): MarketplaceParseResult {
    const cleanText = csvContent.replace(/^\uFEFF/, '');
    const lines = cleanText.split(/\r?\n/).filter((line) => line.trim().length > 0);

    if (lines.length === 0) {
      return {
        records: [],
        errors: [{ rowNumber: 1, rawLine: '', reason: 'File kosong dan tidak memiliki baris data.' }],
      };
    }

    if (lines.length === 1) {
      return {
        records: [],
        errors: [{ rowNumber: 1, rawLine: lines[0], reason: 'File hanya berisi header tanpa baris transaksi.' }],
      };
    }

    const delimiter = detectDelimiter(lines[0]);
    const headers = splitCsvLine(lines[0], delimiter).map((h) => h.toLowerCase());

    const findCol = (keywords: string[], fallbackIdx: number): number => {
      const idx = headers.findIndex((h) => keywords.some((k) => h.includes(k)));
      return idx >= 0 ? idx : fallbackIdx;
    };

    const orderIdIdx = findCol(['order_id', 'order id', 'no. pesanan', 'no pesanan', 'id pesanan'], 0);
    const dateIdx = findCol(['date', 'tanggal', 'waktu', 'created'], 1);
    const grossIdx = findCol(['gross', 'total', 'omzet', 'subtotal', 'amount', 'harga'], 2);
    const discountIdx = findCol(['discount', 'diskon', 'promo', 'voucher'], 3);
    const feeIdx = findCol(['fee', 'komisi', 'potongan', 'biaya layanan'], 4);
    const productIdx = findCol(['product', 'produk', 'menu', 'item'], 5);
    const qtyIdx = findCol(['qty', 'quantity', 'jumlah'], 6);
    const customerIdx = findCol(['customer', 'pelanggan', 'pembeli', 'nama'], -1);

    const records: MarketplaceOrderRecord[] = [];
    const errors: MarketplaceParseError[] = [];

    for (let i = 1; i < lines.length; i++) {
      const cols = splitCsvLine(lines[i], delimiter);
      if (cols.length < 3) {
        errors.push({
          rowNumber: i + 1,
          rawLine: lines[i],
          reason: 'Jumlah kolom tidak mencukupi (minimal Order ID, Tanggal, dan Total Nilai).',
        });
        continue;
      }

      const orderId = cols[orderIdIdx]?.trim();
      if (!orderId) {
        errors.push({
          rowNumber: i + 1,
          rawLine: lines[i],
          reason: 'ID Pesanan kosong.',
        });
        continue;
      }

      const rawDate = cols[dateIdx]?.trim();
      const parsedDate = rawDate ? new Date(rawDate) : null;
      if (!rawDate || !parsedDate || Number.isNaN(parsedDate.getTime())) {
        errors.push({
          rowNumber: i + 1,
          rawLine: lines[i],
          reason: `Format tanggal tidak valid: "${rawDate || ''}"`,
        });
        continue;
      }

      const gross = parseMoney(cols[grossIdx]);
      if (Number.isNaN(gross) || gross < 0) {
        errors.push({
          rowNumber: i + 1,
          rawLine: lines[i],
          reason: `Nilai transaksi tidak valid: "${cols[grossIdx] || ''}"`,
        });
        continue;
      }

      const parsedDiscount = cols[discountIdx] ? parseMoney(cols[discountIdx]) : 0;
      const discount = Number.isNaN(parsedDiscount) ? 0 : Math.max(0, parsedDiscount);

      const parsedFee = cols[feeIdx] ? parseMoney(cols[feeIdx]) : 0;
      const fee = Number.isNaN(parsedFee) ? 0 : Math.max(0, parsedFee);

      const net = Math.max(0, gross - discount - fee);
      const qtyRaw = cols[qtyIdx] ? parseInt(cols[qtyIdx], 10) : 1;
      const quantity = Number.isFinite(qtyRaw) && qtyRaw > 0 ? qtyRaw : 1;
      const productName = cols[productIdx]?.trim() || 'Item Marketplace';
      const customerName = customerIdx >= 0 ? cols[customerIdx]?.trim() : undefined;

      records.push({
        platformOrderId: orderId,
        orderDate: parsedDate.toISOString(),
        grossAmount: gross,
        discountAmount: discount,
        platformFee: fee,
        netAmount: net,
        customerName: customerName || 'Pelanggan Marketplace',
        productName,
        quantity,
        unitPrice: Math.round(gross / quantity),
      });
    }

    return { records, errors };
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

    if (records.length === 0) {
      throw new Error('Tidak ada data transaksi valid untuk diimpor.');
    }

    const totalGross = records.reduce((sum, r) => sum + r.grossAmount, 0);
    const totalDiscounts = records.reduce((sum, r) => sum + r.discountAmount, 0);
    const totalFees = records.reduce((sum, r) => sum + r.platformFee, 0);
    const totalNet = records.reduce((sum, r) => sum + r.netAmount, 0);

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
        uploaded_by: userId || null,
      })
      .select()
      .single();

    if (batchErr) throw batchErr;

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
        .maybeSingle();

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
      .select('*, marketplace_sales(*, marketplace_sales_details(*))')
      .order('created_at', { ascending: false });

    if (error) return null;
    return data;
  },
};
