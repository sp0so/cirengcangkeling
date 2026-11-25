'use client';

import React from 'react';
import AppShell from '../../components/AppShell';
import { useApp } from '../../lib/context';
import {
  IconArrowUp,
  IconArrowDown,
  IconDownload,
} from '../../components/Icons';

export default function CatatanKeuanganPage() {
  const { transactions, expenses } = useApp();

  const totalInflow = transactions.reduce((sum, tx) => sum + tx.total, 0);
  const totalOutflow = expenses.reduce((sum, e) => sum + e.amount, 0);
  const netCashFlow = totalInflow - totalOutflow;

  // Combine inflows and outflows chronologically
  const ledger = [
    ...transactions.map((tx) => ({
      date: tx.date.replace('T', ' ').substring(0, 16),
      description: `Penerimaan Kas Kasir #${tx.code} (${tx.items.length} item)`,
      type: 'inflow' as const,
      amount: tx.total,
    })),
    ...expenses.map((e) => ({
      date: `${e.date} 12:00`,
      description: `Beban ${e.category}: ${e.description}`,
      type: 'outflow' as const,
      amount: e.amount,
    })),
  ].sort((a, b) => (b.date > a.date ? 1 : -1));

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#833E17] uppercase tracking-wider">
                Keuangan & Pembukuan
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30] tracking-tight">
              Buku Kas & Catatan Keuangan
            </h2>
            <p className="text-sm text-[#5B403D]">
              Arus penerimaan kas harian (inflow) vs pengeluaran operasional (outflow) gerai.
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="btn-secondary text-xs sm:text-sm self-start sm:self-auto font-bold"
          >
            <IconDownload size={16} />
            <span>Cetak Rekap Kas</span>
          </button>
        </div>

        {/* Financial Flow Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#CBD5E1] shadow-card">
            <span className="text-[11px] font-bold uppercase text-[#5B403D] block mb-1">
              Total Penerimaan (Inflow)
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#15803D]">
              +Rp {totalInflow.toLocaleString('id-ID')}
            </div>
            <span className="text-xs text-[#15803D] font-semibold mt-1 flex items-center gap-1">
              <IconArrowUp size={14} />
              Dari {transactions.length} transaksi kasir
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#CBD5E1] shadow-card">
            <span className="text-[11px] font-bold uppercase text-[#5B403D] block mb-1">
              Total Pengeluaran (Outflow)
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#BA1A1A]">
              -Rp {totalOutflow.toLocaleString('id-ID')}
            </div>
            <span className="text-xs text-[#BA1A1A] font-semibold mt-1 flex items-center gap-1">
              <IconArrowDown size={14} />
              Beban operasional & bahan
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#CBD5E1] shadow-card">
            <span className="text-[11px] font-bold uppercase text-[#5B403D] block mb-1">
              Saldo Arus Kas Bersih
            </span>
            <div
              className={`text-2xl sm:text-3xl font-extrabold ${
                netCashFlow >= 0 ? 'text-[#732662]' : 'text-[#BA1A1A]'
              }`}
            >
              Rp {netCashFlow.toLocaleString('id-ID')}
            </div>
            <span className="text-xs text-[#5B403D] font-medium mt-1 block">
              Posisi likuiditas kas aktif
            </span>
          </div>
        </div>

        {/* Ledger Table */}
        <div className="rounded-2xl bg-white border border-[#CBD5E1] shadow-card overflow-hidden">
          <div className="p-4 border-b border-[#F1F5F9]">
            <h3 className="font-bold text-sm text-[#0B1C30]">
              Mutasi Buku Kas Masuk & Keluar
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#FAF7F2] border-b border-[#CBD5E1] text-[#5B403D]">
                <tr>
                  <th className="py-3 px-4 font-bold">Waktu</th>
                  <th className="py-3 px-4 font-bold">Uraian Transaksi</th>
                  <th className="py-3 px-4 font-bold text-center">Jenis Arus</th>
                  <th className="py-3 px-4 font-bold text-right">Nominal (Rp)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {ledger.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-[#5B403D]">
                      Belum ada catatan arus kas masuk maupun beban pengeluaran.
                    </td>
                  </tr>
                ) : (
                  ledger.map((item, idx) => (
                    <tr key={idx} className="hover:bg-[#FFF7ED]/50 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-[#5B403D]">{item.date}</td>
                      <td className="py-3.5 px-4 font-semibold text-[#0B1C30]">
                        {item.description}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                            item.type === 'inflow'
                              ? 'bg-[#DCFCE7] text-[#15803D]'
                              : 'bg-[#FFDAD6] text-[#93000A]'
                          }`}
                        >
                          {item.type === 'inflow' ? 'Kas Masuk' : 'Kas Keluar'}
                        </span>
                      </td>
                      <td
                        className={`py-3.5 px-4 text-right font-extrabold ${
                          item.type === 'inflow' ? 'text-[#15803D]' : 'text-[#BA1A1A]'
                        }`}
                      >
                        {item.type === 'inflow' ? '+' : '-'}Rp{' '}
                        {item.amount.toLocaleString('id-ID')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

