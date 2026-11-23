'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import AppShell from '../../components/AppShell';
import { useApp } from '../../lib/context';
import {
  IconDownload,
  IconPrint,
  IconCheckCircle,
  IconArrowUp,
  IconSearch,
} from '../../components/Icons';

export default function LaporanUsahaOwnerPage() {
  const { transactions, expenses, products, showToast } = useApp();

  const [period, setPeriod] = useState<'month' | '7days' | 'quarter'>('month');
  const [channel, setChannel] = useState<string>('all');

  // Dynamic P&L values calculated from real transactions, expenses, and product HPP
  const grossRevenue = useMemo(
    () => transactions.reduce((sum, tx) => (tx.status !== 'dibatalkan' ? sum + tx.total : sum), 0),
    [transactions]
  );

  const cogsHPP = useMemo(
    () =>
      transactions.reduce((acc, tx) => {
        if (tx.status === 'dibatalkan') return acc;
        return (
          acc +
          tx.items.reduce((sub, it) => {
            const prod = products.find((p) => p.id === it.productId || p.name === it.productName);
            return sub + (prod ? prod.baseCost * it.quantity : 0);
          }, 0)
        );
      }, 0),
    [transactions, products]
  );

  const grossProfit = grossRevenue - cogsHPP;
  const opex = useMemo(() => expenses.reduce((sum, e) => sum + e.amount, 0), [expenses]);
  const netProfit = grossProfit - opex;
  const netMargin = grossRevenue > 0 ? ((netProfit / grossRevenue) * 100).toFixed(1) : '0.0';

  // Dynamic Product Contribution from actual sales transactions
  const productContributions = useMemo(() => {
    const map: { [name: string]: { name: string; sku: string; qty: number; revenue: number; cogs: number } } = {};

    transactions.forEach((tx) => {
      if (tx.status !== 'dibatalkan') {
        tx.items.forEach((it) => {
          const prod = products.find((p) => p.id === it.productId || p.name === it.productName);
          const sku = prod ? prod.sku : 'PRD-CUSTOM';
          const baseCost = prod ? prod.baseCost : 0;

          if (!map[it.productName]) {
            map[it.productName] = {
              name: it.productName,
              sku,
              qty: 0,
              revenue: 0,
              cogs: 0,
            };
          }
          map[it.productName].qty += it.quantity;
          map[it.productName].revenue += it.subtotal;
          map[it.productName].cogs += baseCost * it.quantity;
        });
      }
    });

    return Object.values(map)
      .map((item) => {
        const profit = item.revenue - item.cogs;
        const marginPct = item.revenue > 0 ? ((profit / item.revenue) * 100).toFixed(1) + '%' : '0%';
        return {
          name: item.name,
          sku: item.sku,
          salesQty: item.qty,
          revenue: item.revenue,
          cogs: item.cogs,
          marginPct,
          profitContribution: profit,
        };
      })
      .sort((a, b) => b.revenue - a.revenue);
  }, [transactions, products]);

  return (
    <AppShell>
      <div className="space-y-6 font-sans">
        {/* =========================================================================
            1. BREADCRUMB & HEADER
           ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#5B403D] mb-1">
              <Link href="/dashboard" className="hover:text-[#A24F9D] transition-colors">
                Dashboard
              </Link>
              <span>/</span>
              <span className="font-bold text-[#0B1C30]">Laporan Usaha</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30] tracking-tight">
              Laporan Usaha &amp; Kinerja Finansial UMKM
            </h1>
            <p className="text-[13px] text-[#5B403D] mt-0.5">
              Laporan laba rugi komprehensif (P&amp;L), margin kontribusi produk, dan rasio likuiditas kas gerai.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => {
                window.print();
                showToast('Membuka dialog cetak laporan...', 'info');
              }}
              className="px-3.5 py-2 rounded-xl bg-white text-[#0B1C30] border border-[#CBD5E1] text-[13px] font-bold hover:bg-[#F8FAFC] transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <IconPrint size={15} />
              <span>Cetak Rekap PDF</span>
            </button>

            <button
              onClick={() => {
                const csv =
                  'data:text/csv;charset=utf-8,Komponen,Nilai (Rp)\n' +
                  `Gross Revenue,${grossRevenue}\n` +
                  `HPP (COGS),${cogsHPP}\n` +
                  `Gross Profit,${grossProfit}\n` +
                  `OPEX,${opex}\n` +
                  `Net Profit,${netProfit}\n`;
                const encoded = encodeURI(csv);
                const a = document.createElement('a');
                a.href = encoded;
                a.download = 'laporan_keuangan_cireng_cangkeling.csv';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                showToast('Laporan keuangan diexport ke CSV', 'success');
              }}
              className="px-4 py-2 rounded-xl bg-[#A24F9D] hover:bg-[#8F3D8A] text-white text-[13px] font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <IconDownload size={15} />
              <span>Export Laporan CSV</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            2. CONTROL PANEL / FILTER TOOLBAR
           ========================================================================= */}
        <div className="p-4 rounded-2xl bg-white border border-[#CBD5E1] shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value as any)}
              className="px-3 py-2 rounded-xl border border-[#CBD5E1] text-[12px] font-bold text-[#0B1C30] bg-white cursor-pointer"
            >
              <option value="month">Periode Saat Ini</option>
              <option value="7days">7 Hari Terakhir</option>
              <option value="quarter">Kuartal Berjalan</option>
            </select>

            <select
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
              className="px-3 py-2 rounded-xl border border-[#CBD5E1] text-[12px] font-semibold text-[#0B1C30] bg-white cursor-pointer"
            >
              <option value="all">Semua Saluran &amp; Gerai</option>
              <option value="pos">Kasir Gerai Fisik</option>
              <option value="marketplace">Marketplace &amp; Omnichannel</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#15803D] font-bold bg-[#DCFCE7] px-3 py-1.5 rounded-full border border-[#16A34A]/30">
            <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
            <span>Database Terhubung &amp; Terhitung Dinamis</span>
          </div>
        </div>

        {/* =========================================================================
            3. EXECUTIVE SUMMARY CARDS / TOP METRICS (100% Dynamic)
           ========================================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {/* Card 1: Gross Revenue */}
          <div className="p-4 rounded-2xl bg-white border border-[#CBD5E1] shadow-card">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B403D] block">
              GROSS REVENUE (OMZET)
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl sm:text-2xl font-extrabold text-[#0B1C30]">
                Rp {grossRevenue.toLocaleString('id-ID')}
              </span>
            </div>
            <span className="text-[11px] text-[#16A34A] font-bold block mt-1">
              {transactions.length} Total Transaksi
            </span>
          </div>

          {/* Card 2: COGS / HPP */}
          <div className="p-4 rounded-2xl bg-white border border-[#CBD5E1] shadow-card">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#833E17] block">
              COGS / HPP BAHAN BAKU
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl sm:text-2xl font-extrabold text-[#0B1C30]">
                Rp {cogsHPP.toLocaleString('id-ID')}
              </span>
            </div>
            <span className="text-[11px] text-[#5B403D] font-semibold block mt-1">
              Estimasi Biaya Pokok
            </span>
          </div>

          {/* Card 3: OPEX */}
          <div className="p-4 rounded-2xl bg-white border border-[#CBD5E1] shadow-card">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#BA1A1A] block">
              TOTAL PENGELUARAN (OPEX)
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl sm:text-2xl font-extrabold text-[#0B1C30]">
                Rp {opex.toLocaleString('id-ID')}
              </span>
            </div>
            <span className="text-[11px] text-[#BA1A1A] font-semibold block mt-1">
              {expenses.length} Transaksi Beban
            </span>
          </div>

          {/* Card 4: Net Profit */}
          <div className="p-4 rounded-2xl bg-white border border-[#CBD5E1] shadow-card">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#16A34A] block">
              LABA BERSIH (NET PROFIT)
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className={`text-xl sm:text-2xl font-extrabold ${netProfit >= 0 ? 'text-[#15803D]' : 'text-[#BA1A1A]'}`}>
                Rp {netProfit.toLocaleString('id-ID')}
              </span>
            </div>
            <span className="text-[11px] text-[#15803D] font-bold block mt-1">
              Margin Bersih: {netMargin}%
            </span>
          </div>
        </div>

        {/* =========================================================================
            4. PRODUCT CONTRIBUTION TABLE (100% Dynamic from actual sales)
           ========================================================================= */}
        <div className="bg-white rounded-2xl border border-[#CBD5E1] shadow-card overflow-hidden">
          <div className="p-4 border-b border-[#F1F5F9] flex justify-between items-center">
            <div>
              <h3 className="font-bold text-base text-[#0B1C30]">
                Margin Kontribusi per Varian Produk
              </h3>
              <p className="text-xs text-[#5B403D]">
                Analisis perolehan omzet, estimasi beban pokok, dan kontribusi profitabilitas per SKU dari riwayat transaksi.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#FAF7F2] border-b border-[#CBD5E1] text-[#5B403D]">
                <tr>
                  <th className="py-3 px-4 font-bold">Varian Produk</th>
                  <th className="py-3 px-4 font-bold text-center">Terjual</th>
                  <th className="py-3 px-4 font-bold text-right">Omzet Penjualan</th>
                  <th className="py-3 px-4 font-bold text-right">Estimasi HPP</th>
                  <th className="py-3 px-4 font-bold text-center">Margin (%)</th>
                  <th className="py-3 px-4 font-bold text-right">Kontribusi Laba</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {productContributions.length > 0 ? (
                  productContributions.map((p) => (
                    <tr key={p.sku} className="row-hover-satisfying">
                      <td className="py-3 px-4">
                        <div className="font-bold text-[#0B1C30]">{p.name}</div>
                        <div className="font-mono text-[11px] text-[#732662]">{p.sku}</div>
                      </td>
                      <td className="py-3 px-4 text-center font-bold text-[#0B1C30]">
                        {p.salesQty} porsi
                      </td>
                      <td className="py-3 px-4 text-right font-extrabold text-[#0B1C30]">
                        Rp {p.revenue.toLocaleString('id-ID')}
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-[#BA1A1A]">
                        Rp {p.cogs.toLocaleString('id-ID')}
                      </td>
                      <td className="py-3 px-4 text-center font-extrabold text-[#15803D]">
                        {p.marginPct}
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-[#15803D]">
                        +Rp {p.profitContribution.toLocaleString('id-ID')}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-xs text-[#5B403D]">
                      Belum ada penjualan tercatat. Transaksi di kasir POS akan otomatis tercatat dan menghasilkan rincian kontribusi laba di sini.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
