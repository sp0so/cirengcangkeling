'use client';

import React from 'react';
import AppShell from '../../components/AppShell';
import { useApp } from '../../lib/context';
import {
  IconFinance,
  IconArrowUp,
  IconDownload,
} from '../../components/Icons';

export default function EstimasiLabaPage() {
  const { transactions, products, expenses } = useApp();

  const totalRevenue = transactions.reduce((sum, tx) => sum + tx.total, 0);

  const totalHpp = transactions.reduce((acc, tx) => {
    return (
      acc +
      tx.items.reduce((sub, it) => {
        const prod = products.find((p) => p.id === it.productId);
        return sub + (prod ? prod.baseCost * it.quantity : 0);
      }, 0)
    );
  }, 0);

  const grossProfit = totalRevenue - totalHpp;
  const totalOperatingExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const netProfit = grossProfit - totalOperatingExpenses;

  const grossMarginPct = totalRevenue > 0 ? Math.round((grossProfit / totalRevenue) * 100) : 0;
  const netMarginPct = totalRevenue > 0 ? Math.round((netProfit / totalRevenue) * 100) : 0;

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#833E17] uppercase tracking-wider">
                Keuangan & Profitabilitas
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30] tracking-tight">
              Laporan Estimasi Laba Bersih (P&L)
            </h2>
            <p className="text-sm text-[#5B403D]">
              Proyeksi laba rugi usaha Cireng Cangkeling menggabungkan pendapatan kasir, beban pokok, dan biaya operasional.
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="btn-secondary text-xs sm:text-sm self-start sm:self-auto font-bold"
          >
            <IconDownload size={16} />
            <span>Cetak Ikhtisar Laba</span>
          </button>
        </div>

        {/* Estimation Notice Pill */}
        <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#CBD5E1] text-xs text-[#5B403D] flex items-center justify-between">
          <span>ℹ️ Seluruh nilai di bawah adalah <strong>Estimasi Manajemen</strong> periode berjalan.</span>
          <span className="font-bold text-[#732662]">Mata Uang: IDR (Rupiah)</span>
        </div>

        {/* Profit Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#CBD5E1] shadow-card">
            <span className="text-[11px] font-bold uppercase text-[#5B403D] block mb-1">
              Pendapatan Usaha (Revenue)
            </span>
            <div className="text-2xl font-extrabold text-[#0B1C30]">
              Rp {totalRevenue.toLocaleString('id-ID')}
            </div>
            <span className="text-xs text-[#15803D] font-semibold mt-1 block">
              100% dari total omzet
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#CBD5E1] shadow-card">
            <span className="text-[11px] font-bold uppercase text-[#5B403D] block mb-1">
              Beban Pokok Penjualan (HPP)
            </span>
            <div className="text-2xl font-extrabold text-[#BA1A1A]">
              Rp {totalHpp.toLocaleString('id-ID')}
            </div>
            <span className="text-xs text-[#5B403D] font-medium mt-1 block">
              Modal bahan baku menu
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#CBD5E1] shadow-card">
            <span className="text-[11px] font-bold uppercase text-[#5B403D] block mb-1">
              Estimasi Laba Kotor
            </span>
            <div className="text-2xl font-extrabold text-[#15803D]">
              Rp {grossProfit.toLocaleString('id-ID')}
            </div>
            <span className="text-xs text-[#15803D] font-bold mt-1 block">
              Margin Kotor: {grossMarginPct}%
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#CBD5E1] shadow-card">
            <span className="text-[11px] font-bold uppercase text-[#5B403D] block mb-1">
              Estimasi Laba Bersih (Net)
            </span>
            <div
              className={`text-2xl font-extrabold ${
                netProfit >= 0 ? 'text-[#732662]' : 'text-[#BA1A1A]'
              }`}
            >
              Rp {netProfit.toLocaleString('id-ID')}
            </div>
            <span className="text-xs text-[#5B403D] font-bold mt-1 block">
              Margin Bersih: {netMarginPct}%
            </span>
          </div>
        </div>

        {/* Structured Income Statement Table */}
        <div className="rounded-2xl bg-white border border-[#CBD5E1] shadow-card p-6 space-y-4">
          <h3 className="font-bold text-base text-[#0B1C30] border-b border-[#F1F5F9] pb-3">
            Rincian Laporan Laba Rugi Sederhana
          </h3>

          <div className="space-y-3 text-xs sm:text-sm">
            {/* Section 1: Pendapatan */}
            <div className="flex justify-between items-center py-2 font-bold text-[#0B1C30] bg-[#FAF7F2] px-3 rounded-lg">
              <span>1. TOTAL PENDAPATAN PENJUALAN</span>
              <span>Rp {totalRevenue.toLocaleString('id-ID')}</span>
            </div>

            {/* Section 2: HPP */}
            <div className="pl-4 space-y-1 text-[#5B403D]">
              <div className="flex justify-between items-center py-1">
                <span>Biaya Bahan Mentah Siap Saji</span>
                <span>Rp {(totalHpp * 0.7).toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span>Biaya Kemasan & Paper Bowl</span>
                <span>Rp {(totalHpp * 0.3).toLocaleString('id-ID')}</span>
              </div>
            </div>

            <div className="flex justify-between items-center py-2 font-bold text-[#BA1A1A] border-b border-[#F1F5F9] px-3">
              <span>TOTAL BEBAN POKOK (HPP)</span>
              <span>(Rp {totalHpp.toLocaleString('id-ID')})</span>
            </div>

            {/* Section 3: Laba Kotor */}
            <div className="flex justify-between items-center py-2.5 font-extrabold text-[#15803D] bg-[#DCFCE7]/60 px-3 rounded-lg">
              <span>LABA KOTOR (GROSS PROFIT)</span>
              <span className="text-base">Rp {grossProfit.toLocaleString('id-ID')}</span>
            </div>

            {/* Section 4: Biaya Operasional */}
            <div className="flex justify-between items-center py-2 font-bold text-[#0B1C30] bg-[#FAF7F2] px-3 rounded-lg mt-4">
              <span>2. TOTAL BEBAN OPERASIONAL USAHA</span>
              <span>(Rp {totalOperatingExpenses.toLocaleString('id-ID')})</span>
            </div>

            <div className="pl-4 space-y-1 text-[#5B403D]">
              {expenses.map((e) => (
                <div key={e.id} className="flex justify-between items-center py-1">
                  <span>{e.category} — {e.description}</span>
                  <span>Rp {e.amount.toLocaleString('id-ID')}</span>
                </div>
              ))}
            </div>

            {/* Section 5: Laba Bersih Final */}
            <div className="flex justify-between items-center py-3 font-extrabold text-white bg-[#732662] px-4 rounded-xl mt-4 shadow-sm">
              <span className="text-sm uppercase tracking-wider">
                ESTIMASI LABA BERSIH USAHA (NET PROFIT)
              </span>
              <span className="text-lg">
                Rp {netProfit.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

