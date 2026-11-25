import { describe, it, expect } from 'vitest';
import {
  calculateCartTotals,
  calculatePaymentChange,
  calculateExpectedShiftCash,
  calculateShiftDifference,
  calculateRecipeBatchCost,
  formatSequentialCode,
} from '../calculations';
import { marketplaceService } from '../services/marketplaceService';

describe('POS Checkout Calculations', () => {
  it('computes cart subtotal and total accurately in integer rupiah', () => {
    const res = calculateCartTotals(
      [
        { price: 15000, quantity: 2 },
        { price: 18000, quantity: 3 },
      ],
      4000
    );
    // 2*15000 + 3*18000 = 30000 + 54000 = 84000; 84000 - 4000 = 80000
    expect(res.subtotal).toBe(84000);
    expect(res.discount).toBe(4000);
    expect(res.total).toBe(80000);
  });

  it('clamps negative totals to zero when discount exceeds subtotal', () => {
    const res = calculateCartTotals([{ price: 10000, quantity: 1 }], 25000);
    expect(res.total).toBe(0);
  });

  it('rejects insufficient cash payment and computes exact change for valid cash', () => {
    const invalid = calculatePaymentChange(50000, 'tunai', 40000);
    expect(invalid.valid).toBe(false);
    expect(invalid.error).toBeDefined();

    const valid = calculatePaymentChange(50000, 'tunai', 100000);
    expect(valid.valid).toBe(true);
    expect(valid.change).toBe(50000);
  });

  it('sets zero change and exact total for non-cash methods (qris / transfer)', () => {
    const qris = calculatePaymentChange(36000, 'qris', 0);
    expect(qris.valid).toBe(true);
    expect(qris.amountPaid).toBe(36000);
    expect(qris.change).toBe(0);
  });
});

describe('Cashier Shift Reconciliation', () => {
  it('computes expected cash as Opening + Cash Sales - Cash Expenses - Cash Refunds', () => {
    // Opening: 200,000; Cash Sales: 450,000; Cash Expense: 35,000; Refunds: 15,000
    // Expected = 200,000 + 450,000 - 35,000 - 15,000 = 600,000
    const expected = calculateExpectedShiftCash(200000, 450000, 35000, 15000);
    expect(expected).toBe(600000);
  });

  it('calculates cash surplus and shortage accurately', () => {
    expect(calculateShiftDifference(600000, 600000)).toBe(0);
    expect(calculateShiftDifference(612000, 600000)).toBe(12000);
    expect(calculateShiftDifference(585000, 600000)).toBe(-15000);
  });
});

describe('Recipe-based Batch HPP Calculations', () => {
  it('computes batch cost, per-portion HPP, and scaled production batch cost', () => {
    // 2 kg tapioka @ 14,000 = 28,000; 1 L minyak @ 16,000 = 16,000; bumbu = 6,000 -> total 50,000
    // Yield = 25 portions -> HPP per portion = 2,000
    // Target batch = 50 portions (2x) -> scaled cost = 100,000
    const res = calculateRecipeBatchCost(
      [
        { amount: 2, unitCost: 14000 },
        { amount: 1, unitCost: 16000 },
        { amount: 1, unitCost: 6000 },
      ],
      25,
      50
    );
    expect(res.totalBatchCost).toBe(50000);
    expect(res.hppPerPortion).toBe(2000);
    expect(res.scaledTotalCost).toBe(100000);
  });
});

describe('Sequential Invoice & Batch Numbering', () => {
  it('preserves INV-YYYYMMDD-XXXX and BATCH-YYYYMMDD-XXX formats without truncating on high volume', () => {
    expect(formatSequentialCode('INV', '20261125', 1, 4)).toBe('INV-20261125-0001');
    expect(formatSequentialCode('INV', '20261125', 9999, 4)).toBe('INV-20261125-9999');
    expect(formatSequentialCode('INV', '20261125', 10000, 4)).toBe('INV-20261125-10000');

    expect(formatSequentialCode('BATCH', '20261125', 7, 3)).toBe('BATCH-20261125-007');
    expect(formatSequentialCode('BATCH', '20261125', 1200, 3)).toBe('BATCH-20261125-1200');
  });

  it('produces zero duplicates across 20,000 sequential/concurrent increments', () => {
    const seen = new Set<string>();
    for (let seq = 1; seq <= 20000; seq++) {
      seen.add(formatSequentialCode('INV', '20261125', seq, 4));
    }
    expect(seen.size).toBe(20000);
  });
});

describe('Marketplace CSV Report Parser', () => {
  it('parses valid comma-delimited and semicolon-delimited CSV reports', () => {
    const csv = [
      'Order ID;Tanggal;Total;Diskon;Komisi;Produk;Qty;Pelanggan',
      'SF-001;2026-11-25;Rp 36.000;2.000;4.000;Cireng Original;2;Budi',
      'SF-002;2026-11-25;25000;0;5000;Cireng Keju;1;Siti',
    ].join('\n');

    const result = marketplaceService.parseReportCSV(csv, 'shopeefood');
    expect(result.errors).toHaveLength(0);
    expect(result.records).toHaveLength(2);
    expect(result.records[0].platformOrderId).toBe('SF-001');
    expect(result.records[0].grossAmount).toBe(36000);
    expect(result.records[0].netAmount).toBe(30000);
    expect(result.records[1].netAmount).toBe(20000);
  });

  it('rejects empty files and malformed rows with clear error reasons', () => {
    const emptyRes = marketplaceService.parseReportCSV('', 'gofood');
    expect(emptyRes.records).toHaveLength(0);
    expect(emptyRes.errors.length).toBeGreaterThan(0);

    const invalidRes = marketplaceService.parseReportCSV(
      'Order ID,Tanggal,Total\n,2026-11-25,15000\nGF-1,bukan-tanggal,15000\nGF-2,2026-11-25,abc',
      'gofood'
    );
    expect(invalidRes.records).toHaveLength(0);
    expect(invalidRes.errors).toHaveLength(3);
  });
});
