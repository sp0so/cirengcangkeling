'use client';

import React, { useState } from 'react';
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
  const { transactions, showToast } = useApp();

  const [period, setPeriod] = useState<'month' | '7days' | 'quarter'>('month');
  const [channel, setChannel] = useState<string>('all');

  // Core P&L values from Figma 6:5179
  const grossRevenue = 31925000;
  const cogsHPP = 11500000;
  const grossProfit = grossRevenue - cogsHPP; // 20.425.000
  const opex = 6750000;
  const netProfit = grossProfit - opex; // 13.675.000
  const netMargin = ((netProfit / grossRevenue) * 100).toFixed(1); // 42.8%

  const productContributions = [
    {
      name: 'Cireng Isi Keju Mozzarella',
      sku: 'CRG-003',
      salesQty: 400,
      revenue: 8800000,
      cogs: 4400000,
      marginPct: '50.0%',
      profitContribution: 4400000,
    },
    {
      name: 'Cireng Sambal Rujak Original',
      sku: 'CRG-001',
      salesQty: 650,
      revenue: 10400000,
      cogs: 3900000,
      marginPct: '62.5%',
      profitContribution: 6500000,
    },
    {
      name: 'Cireng Pedas Jeletot Ayam Suwir',
      sku: 'CRG-002',
      salesQty: 375,
      revenue: 7500000,
      cogs: 4500000,
      marginPct: '40.0%',
      profitContribution: 3000000,
    },
    {
      name: 'Besek Bundling Oleh-oleh Jogja',
      sku: 'CRG-BDL-01',
      salesQty: 75,
      revenue: 3725000,
      cogs: 2420000,
      marginPct: '35.0%',
      profitContribution: 1305000,
    },
    {
      name: 'Cireng Kuah Seblak Pedas Instan',
      sku: 'CRG-SBK-01',
      salesQty: 100,
      revenue: 1500000,
      cogs: 825000,
      marginPct: '45.0%',
      profitContribution: 675000,
    },
  ];

  return (
    <AppShell>
      <div className="space-y-6 font-sans">
        {/* =========================================================================
            1. BREADCRUMB & HEADER (Figma 6:5181)
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
              <span>Export Laporan Excel</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            2. CONTROL PANEL / FILTER TOOLBAR (Figma 6:5198)
           ========================================================================= */}
        <div className="p-4 rounded-2xl bg-white border border-[#CBD5E1] shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value as any)}
              className="px-3 py-2 rounded-xl border border-[#CBD5E1] text-[12px] font-bold text-[#0B1C30] bg-white cursor-pointer"
            >
              <option value="month">Bulan Ini (Oktober 2026)</option>
              <option value="7days">7 Hari Terakhir</option>
              <option value="quarter">Kuartal 4 (Q4 2026)</option>
            </select>

            <select
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
              className="px-3 py-2 rounded-xl border border-[#CBD5E1] text-[12px] font-semibold text-[#0B1C30] bg-white cursor-pointer"
            >
              <option value="all">Semua Channel &amp; Gerai</option>
              <option value="pos1">Outlet 1 (Kaliurang KM 5.2)</option>
              <option value="pos2">Outlet 2 (Kaliurang KM 9.2)</option>
              <option value="wa">WhatsApp &amp; Pesanan Katering</option>
              <option value="gofood">GoFood &amp; GrabFood</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#15803D] font-bold bg-[#DCFCE7] px-3 py-1.5 rounded-full border border-[#16A34A]/30">
            <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
            <span>Live Sinkronisasi POS Aktif</span>
          </div>
        </div>

        {/* =========================================================================
            3. EXECUTIVE SUMMARY CARDS / TOP METRICS (Figma 6:5215)
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
              ↑ +18.2% vs Bulan Lalu
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
            <span className="text-[11px] text-[#5B403D] font-medium block mt-1">
              36.0% dari total omzet
            </span>
          </div>

          {/* Card 3: OPEX */}
          <div className="p-4 rounded-2xl bg-white border border-[#CBD5E1] shadow-card">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E40AF] block">
              BEBAN OPERASIONAL (OPEX)
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl sm:text-2xl font-extrabold text-[#0B1C30]">
                Rp {opex.toLocaleString('id-ID')}
              </span>
            </div>
            <span className="text-[11px] text-[#5B403D] font-medium block mt-1">
              Gaji Staf, Gas LPG, Listrik
            </span>
          </div>

          {/* Card 4: Net Profit (Hero Highlight) */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#5B3765] to-[#A24F9D] text-white shadow-card">
            <span className="text-[11px] font-bold uppercase tracking-wider text-white/80 block">
              LABA BERSIH (NET PROFIT)
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl sm:text-2xl font-extrabold text-white">
                Rp {netProfit.toLocaleString('id-ID')}
              </span>
            </div>
            <span className="text-[11px] text-[#FDE047] font-bold block mt-1">
              ★ Margin Bersih: {netMargin}% (Sangat Sehat)
            </span>
          </div>
        </div>

        {/* =========================================================================
            4. SECTION: P&L FINANCIAL STATEMENT (8 COLS) + ANALYTICS (4 COLS)
               (Figma 6:5240)
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* P&L Statement Card (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-[#CBD5E1] p-5 sm:p-6 shadow-card space-y-4">
            <div className="border-b border-[#F1F5F9] pb-3">
              <span className="text-[11px] font-bold text-[#A24F9D] tracking-wider uppercase block">
                LAPORAN LABA RUGI RESMI
              </span>
              <h2 className="text-base font-extrabold text-[#0B1C30]">
                P&amp;L Financial Statement (Oktober 2026)
              </h2>
            </div>

            <div className="space-y-4 text-xs">
              {/* 1. Pendapatan Operasional */}
              <div>
                <div className="font-extrabold text-[13px] text-[#0B1C30] flex justify-between py-1 border-b border-[#CBD5E1]">
                  <span>1. PENDAPATAN OPERASIONAL</span>
                  <span className="text-[#16A34A]">Rp {grossRevenue.toLocaleString('id-ID')}</span>
                </div>
                <div className="py-2 pl-3 space-y-1.5 text-[#5B403D]">
                  <div className="flex justify-between">
                    <span>Penjualan Cireng Siap Saji Hangat di Gerai</span>
                    <span className="font-semibold text-[#0B1C30]">Rp 18.450.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Penjualan Kemasan Frozen Vacuum Pack</span>
                    <span className="font-semibold text-[#0B1C30]">Rp 12.125.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Jasa Paket Besek Bundling Katering</span>
                    <span className="font-semibold text-[#0B1C30]">Rp 1.350.000</span>
                  </div>
                </div>
              </div>

              {/* 2. Harga Pokok Penjualan (HPP) */}
              <div>
                <div className="font-extrabold text-[13px] text-[#0B1C30] flex justify-between py-1 border-b border-[#CBD5E1]">
                  <span>2. HARGA POKOK PENJUALAN (HPP)</span>
                  <span className="text-[#BA1A1A]">(Rp {cogsHPP.toLocaleString('id-ID')})</span>
                </div>
                <div className="py-2 pl-3 space-y-1.5 text-[#5B403D]">
                  <div className="flex justify-between">
                    <span>Tepung Tapioka &amp; Isian Protein (Keju, Ayam, Sapi, Cumi)</span>
                    <span className="font-semibold text-[#0B1C30]">Rp 7.800.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Minyak Goreng Sawit Higienis &amp; Bumbu Rempah Sunda</span>
                    <span className="font-semibold text-[#0B1C30]">Rp 3.700.000</span>
                  </div>
                </div>
              </div>

              {/* Gross Profit Callout */}
              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#CBD5E1] flex justify-between items-center text-xs">
                <span className="font-extrabold text-[#833E17]">
                  GROSS PROFIT (LABA KOTOR)
                </span>
                <span className="font-extrabold text-[15px] text-[#833E17]">
                  Rp {grossProfit.toLocaleString('id-ID')} (Gross Margin: 64.0%)
                </span>
              </div>

              {/* 3. Beban Operasional (OPEX) */}
              <div>
                <div className="font-extrabold text-[13px] text-[#0B1C30] flex justify-between py-1 border-b border-[#CBD5E1]">
                  <span>3. BEBAN OPERASIONAL (OPEX)</span>
                  <span className="text-[#BA1A1A]">(Rp {opex.toLocaleString('id-ID')})</span>
                </div>
                <div className="py-2 pl-3 space-y-1.5 text-[#5B403D]">
                  <div className="flex justify-between">
                    <span>Gaji Tenaga Kerja (2 Staf Gerai &amp; Dapur)</span>
                    <span className="font-semibold text-[#0B1C30]">Rp 4.000.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Listrik PLN Gerai &amp; Freezer + Gas LPG 12kg</span>
                    <span className="font-semibold text-[#0B1C30]">Rp 1.450.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kemasan Plastik Pouch Vakum Nylon &amp; Box</span>
                    <span className="font-semibold text-[#0B1C30]">Rp 850.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kebersihan &amp; Perlengkapan Toko</span>
                    <span className="font-semibold text-[#0B1C30]">Rp 450.000</span>
                  </div>
                </div>
              </div>

              {/* 4. Final Net Profit Result */}
              <div className="p-4 rounded-xl bg-[#DCFCE7] border border-[#16A34A]/40 flex justify-between items-center text-xs">
                <div>
                  <span className="font-extrabold text-[14px] text-[#15803D] block">
                    4. FINAL NET PROFIT (LABA BERSIH UMKM)
                  </span>
                  <span className="text-[11px] text-[#15803D]">
                    Net Margin: {netMargin}% dari total omzet gerai
                  </span>
                </div>
                <span className="font-extrabold text-[18px] text-[#15803D]">
                  Rp {netProfit.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </div>

          {/* Revenue Usage & Financial Analytics (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl border border-[#CBD5E1] p-5 shadow-card space-y-4">
              <div className="border-b border-[#F1F5F9] pb-2">
                <span className="text-[11px] font-bold text-[#833E17] uppercase tracking-wider block">
                  DISTRIBUSI OMZET
                </span>
                <h3 className="text-sm font-extrabold text-[#0B1C30]">
                  Alokasi Arus Kas Pendapatan
                </h3>
              </div>

              {/* Proportion Stack */}
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="font-bold text-[#15803D]">Laba Bersih Tersimpan</span>
                    <span className="font-extrabold text-[#15803D]">42.8%</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-[#16A34A] rounded-full" style={{ width: '42.8%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="font-bold text-[#0B1C30]">Biaya Bahan Baku (HPP)</span>
                    <span className="font-extrabold text-[#0B1C30]">36.0%</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-[#A24F9D] rounded-full" style={{ width: '36.0%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="font-bold text-[#1E40AF]">Beban Operasional Toko</span>
                    <span className="font-extrabold text-[#1E40AF]">21.2%</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-[#3B82F6] rounded-full" style={{ width: '21.2%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Kang Asep Financial Advisor Insight Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#FFF7ED] to-[#FEF3C7] border border-[#CBD5E1] shadow-card space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-lg">📈</span>
                <strong className="text-[#833E17] font-extrabold">Kang Asep Financial Advisor:</strong>
              </div>
              <p className="text-[#5B403D] leading-relaxed text-[11px]">
                Periode: 1 Okt 2026 - 30 Okt 2026. Laba bersih mencapai <strong>42.8%</strong>, sangat sehat untuk standar kuliner UMKM! Pos bahan baku di angka 36% terkendali baik karena pembelian tapioka dalam kuantitas sak besar.
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            5. SECTION: PRODUCT MARGIN CONTRIBUTION ANALYSIS (Figma 6:5310)
           ========================================================================= */}
        <div className="rounded-2xl bg-white border border-[#CBD5E1] shadow-card overflow-hidden">
          <div className="p-4 bg-[#FAF7F2] border-b border-[#CBD5E1]">
            <h3 className="font-extrabold text-sm text-[#0B1C30]">
              Analisis Kontribusi Margin &amp; Laba Per Varian Produk
            </h3>
            <p className="text-[11px] text-[#5B403D] mt-0.5">
              Evaluasi SKU penghasil margin tertinggi untuk prioritas promosi katalog kasir.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-white border-b border-[#CBD5E1] text-[#5B403D]">
                <tr>
                  <th className="py-3 px-4 font-bold">VARIAN PRODUK</th>
                  <th className="py-3 px-4 font-bold text-center">TERJUAL</th>
                  <th className="py-3 px-4 font-bold text-right">TOTAL OMZET</th>
                  <th className="py-3 px-4 font-bold text-right">TOTAL HPP</th>
                  <th className="py-3 px-4 font-bold text-center">MARGIN LABA</th>
                  <th className="py-3 px-4 font-bold text-right">KONTRIBUSI PROFIT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {productContributions.map((p, idx) => (
                  <tr key={idx} className="hover:bg-[#FFF7ED]/30 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#0B1C30]">{p.name}</div>
                      <div className="text-[11px] font-mono text-[#A24F9D]">{p.sku}</div>
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-[#0B1C30]">
                      {p.salesQty} pack
                    </td>
                    <td className="py-3.5 px-4 text-right font-semibold text-[#0B1C30]">
                      Rp {p.revenue.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3.5 px-4 text-right text-[#5B403D]">
                      Rp {p.cogs.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-[#DCFCE7] text-[#15803D]">
                        {p.marginPct}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-extrabold text-[#16A34A]">
                      Rp {p.profitContribution.toLocaleString('id-ID')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* =========================================================================
            6. SECTION: CASH FLOW RATIO & INVENTORY SHRINKAGE AUDIT (Figma 6:5350)
           ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#CBD5E1] shadow-card space-y-3">
            <span className="text-[11px] font-bold text-[#833E17] uppercase tracking-wider block">
              SALDO KAS &amp; LIKUIDITAS
            </span>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#CBD5E1]">
                <span className="text-[11px] text-[#5B403D] block">Kas Fisik Laci Toko</span>
                <span className="text-lg font-extrabold text-[#0B1C30] block mt-0.5">
                  Rp 3.420.000
                </span>
                <span className="text-[10px] text-[#5B403D]">Petty cash &amp; uang kembalian</span>
              </div>
              <div className="p-3 bg-[#EFF4FF] rounded-xl border border-[#CBD5E1]">
                <span className="text-[11px] text-[#1E40AF] block">Rekening Bank BRI</span>
                <span className="text-lg font-extrabold text-[#1E40AF] block mt-0.5">
                  Rp 28.505.000
                </span>
                <span className="text-[10px] text-[#5B403D]">Penerimaan QRIS &amp; Transfer</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#CBD5E1] shadow-card space-y-3">
            <span className="text-[11px] font-bold text-[#15803D] uppercase tracking-wider block">
              AUDIT SUSUT PERSEN &amp; WASTE (SHRINKAGE)
            </span>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-extrabold text-[#16A34A]">0.4%</span>
                <span className="text-xs text-[#5B403D] block">Tingkat Susut Produk &lt; 0.5%</span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#DCFCE7] text-[#15803D] border border-[#16A34A]/30">
                ✓ Sangat Terkontrol
              </span>
            </div>
            <p className="text-[11px] text-[#5B403D]">
              Tidak ditemukan selisih opname mencurigakan selama siklus pembukuan Oktober 2026.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
