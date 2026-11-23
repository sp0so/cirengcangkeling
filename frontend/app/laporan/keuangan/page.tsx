'use client';

import React, { useState } from 'react';
import AppShell from '../../components/AppShell';
import { useApp } from '../../lib/context';
import {
  IconReport,
  IconDownload,
  IconPrint,
} from '../../components/Icons';

export default function LaporanUsahaPage() {
  const { transactions, expenses, rawMaterials, products } = useApp();
  const [selectedMonth, setSelectedMonth] = useState('2026-11');

  const totalOmzet = transactions.reduce((sum, tx) => sum + tx.total, 0);
  const totalBiaya = expenses.reduce((sum, e) => sum + e.amount, 0);
  const netEstimated = totalOmzet - totalBiaya;

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#833E17] uppercase tracking-wider">
                Laporan & Evaluasi
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30] tracking-tight">
              Laporan Usaha & Keuangan (Figma 6:5179)
            </h2>
            <p className="text-sm text-[#5B403D]">
              Rekapitulasi berkala pendapatan kotor, beban operasional, dan ringkasan laba bersih outlet.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="btn-secondary text-xs sm:text-sm font-bold"
            >
              <IconPrint size={16} />
              <span>Cetak Laporan</span>
            </button>
            <button
              onClick={() => alert('Laporan berhasil diekspor ke format Excel (.xlsx)')}
              className="btn-primary text-xs sm:text-sm"
            >
              <IconDownload size={16} />
              <span>Ekspor Excel</span>
            </button>
          </div>
        </div>

        {/* Filter Month */}
        <div className="p-4 rounded-2xl bg-white border border-[#CBD5E1] shadow-card flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#334155]">Periode Laporan:</span>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-[#CBD5E1] text-xs font-bold text-[#0B1C30]"
            />
          </div>
          <span className="text-xs text-[#5B403D]">Status Buku: <strong>Terbuka (Berjalan)</strong></span>
        </div>

        {/* Financial KPI Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#CBD5E1] shadow-card">
            <span className="text-[11px] font-bold uppercase text-[#5B403D] block mb-1">
              Total Omzet Penjualan
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#15803D]">
              Rp {totalOmzet.toLocaleString('id-ID')}
            </div>
            <span className="text-xs text-[#5B403D] mt-1 block">
              Dari kasir gerai aktif
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#CBD5E1] shadow-card">
            <span className="text-[11px] font-bold uppercase text-[#5B403D] block mb-1">
              Total Beban Usaha
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#BA1A1A]">
              Rp {totalBiaya.toLocaleString('id-ID')}
            </div>
            <span className="text-xs text-[#5B403D] mt-1 block">
              Bahan & operasional
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#CBD5E1] shadow-card">
            <span className="text-[11px] font-bold uppercase text-[#5B403D] block mb-1">
              Surplus / Laba Bersih Sementara
            </span>
            <div
              className={`text-2xl sm:text-3xl font-extrabold ${
                netEstimated >= 0 ? 'text-[#732662]' : 'text-[#BA1A1A]'
              }`}
            >
              Rp {netEstimated.toLocaleString('id-ID')}
            </div>
            <span className="text-xs text-[#15803D] font-bold mt-1 block">
              Margin bersih ~{totalOmzet > 0 ? Math.round((netEstimated / totalOmzet) * 100) : 0}%
            </span>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="rounded-2xl bg-white border border-[#CBD5E1] shadow-card p-6 space-y-4">
          <h3 className="font-bold text-base text-[#0B1C30] border-b border-[#F1F5F9] pb-3">
            Rangkuman Kinerja Bulanan (November 2026)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#732662]">
                Ringkasan Transaksi Penjualan
              </h4>
              <div className="p-4 rounded-xl bg-[#FAF7F2] space-y-2 text-[#0B1C30]">
                <div className="flex justify-between">
                  <span>Total Kunjungan Pelanggan:</span>
                  <strong>{transactions.length} transaksi</strong>
                </div>
                <div className="flex justify-between">
                  <span>Porsi Terjual:</span>
                  <strong>
                    {transactions.reduce((acc, t) => acc + t.items.reduce((s, i) => s + i.quantity, 0), 0)} porsi
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span>Rata-rata Keranjang (Basket Size):</span>
                  <strong>
                    Rp {transactions.length > 0 ? Math.round(totalOmzet / transactions.length).toLocaleString('id-ID') : 0}
                  </strong>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#BA1A1A]">
                Ringkasan Beban & Pengeluaran
              </h4>
              <div className="p-4 rounded-xl bg-[#FAF7F2] space-y-2 text-[#0B1C30]">
                <div className="flex justify-between">
                  <span>Jumlah Pos Pengeluaran:</span>
                  <strong>{expenses.length} bukti kas keluar</strong>
                </div>
                <div className="flex justify-between">
                  <span>Alokasi Bahan Mentah:</span>
                  <strong>Rp {expenses.filter((e) => e.category === 'Bahan Baku').reduce((s, e) => s + e.amount, 0).toLocaleString('id-ID')}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Alokasi Operasional & Utilitas:</span>
                  <strong>Rp {expenses.filter((e) => e.category !== 'Bahan Baku').reduce((s, e) => s + e.amount, 0).toLocaleString('id-ID')}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

