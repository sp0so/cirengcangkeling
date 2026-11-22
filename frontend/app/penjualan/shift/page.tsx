'use client';

import React, { useState } from 'react';
import AppShell from '../../components/AppShell';
import { useApp } from '../../lib/context';
import {
  IconShift,
  IconClose,
  IconAlertTriangle,
  IconCheckCircle,
} from '../../components/Icons';

export default function ManajemenShiftPage() {
  const { activeShift, shiftHistory, forceCloseShift } = useApp();

  const [isForceModalOpen, setIsForceModalOpen] = useState(false);
  const [reason, setReason] = useState('Kasir pergantian darurat / toko tutup lebih awal');

  const handleForceClose = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;
    forceCloseShift(reason);
    setIsForceModalOpen(false);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#833E17] uppercase tracking-wider">
                Penjualan & Kasir
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30] tracking-tight">
              Manajemen Shift & Rekonsiliasi Kas Laci
            </h2>
            <p className="text-sm text-[#5B403D]">
              Monitoring uang modal laci fisik, penjualan kasir real-time, dan histori penutupan shift.
            </p>
          </div>
        </div>

        {/* Current Active Shift Status Card */}
        {activeShift ? (
          <div className="p-6 rounded-2xl bg-white border border-[#16A34A]/40 shadow-card space-y-4 animate-scale-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F1F5F9] pb-4">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#16A34A] animate-ping" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-[#0B1C30]">
                      Shift Kasir Sedang Berjalan
                    </h3>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D]">
                      Aktif
                    </span>
                  </div>
                  <p className="text-xs text-[#5B403D]">
                    Petugas Kasir: <strong>{activeShift.cashierName}</strong> • Dibuka sejak:{' '}
                    {activeShift.openedAt.replace('T', ' ').substring(0, 16)}
                  </p>
                </div>
              </div>

              {/* Force Close by Owner button */}
              <button
                type="button"
                onClick={() => setIsForceModalOpen(true)}
                className="px-3.5 py-2 bg-[#FFDAD6] hover:bg-[#BA1A1A] text-[#93000A] hover:text-white rounded-xl text-xs font-bold transition-all border border-[#BA1A1A]/30 self-start sm:self-auto flex items-center gap-2"
              >
                <IconAlertTriangle size={14} />
                <span>Force-Close Sesi Kasir</span>
              </button>
            </div>

            {/* Financial Numbers in Current Shift */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#CBD5E1]/50">
                <span className="text-[11px] font-bold text-[#5B403D] block uppercase">
                  Modal Awal Laci
                </span>
                <span className="text-xl font-extrabold text-[#0B1C30]">
                  Rp {activeShift.startingCash.toLocaleString('id-ID')}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#CBD5E1]/50">
                <span className="text-[11px] font-bold text-[#5B403D] block uppercase">
                  Penjualan Tunai
                </span>
                <span className="text-xl font-extrabold text-[#15803D]">
                  Rp {activeShift.cashSales.toLocaleString('id-ID')}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#CBD5E1]/50">
                <span className="text-[11px] font-bold text-[#5B403D] block uppercase">
                  Non-Tunai (QRIS & Transfer)
                </span>
                <span className="text-xl font-extrabold text-[#732662]">
                  Rp {(activeShift.qrisSales + activeShift.transferSales).toLocaleString('id-ID')}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#DCFCE7]/60 border border-[#16A34A]/30">
                <span className="text-[11px] font-bold text-[#15803D] block uppercase">
                  Ekspektasi Uang Fisik Laci
                </span>
                <span className="text-xl font-extrabold text-[#15803D]">
                  Rp {activeShift.expectedCash.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-white border border-[#CBD5E1] shadow-card text-center space-y-2">
            <span className="w-12 h-12 rounded-full bg-[#FAF7F2] text-[#5B403D] inline-flex items-center justify-center font-bold">
              <IconShift size={24} />
            </span>
            <h3 className="font-bold text-base text-[#0B1C30]">
              Tidak Ada Shift Kasir yang Sedang Aktif
            </h3>
            <p className="text-xs text-[#5B403D] max-w-md mx-auto">
              Petugas kasir dapat membuka shift dengan menginput modal awal uang laci di modul Kasir POS.
            </p>
          </div>
        )}

        {/* Shift History Table */}
        <div className="rounded-2xl bg-white border border-[#CBD5E1] shadow-card overflow-hidden">
          <div className="p-4 border-b border-[#F1F5F9] flex items-center justify-between">
            <h3 className="font-bold text-sm text-[#0B1C30]">
              Riwayat Penutupan Shift & Rekap Selisih Kas
            </h3>
            <span className="text-xs text-[#5B403D]">
              {shiftHistory.length} Shift Ditutup
            </span>
          </div>

          {shiftHistory.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#5B403D]">
              Belum ada data penutupan shift kasir pada hari ini.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#FAF7F2] border-b border-[#CBD5E1] text-[#5B403D]">
                  <tr>
                    <th className="py-3 px-4 font-bold">Waktu Tutup</th>
                    <th className="py-3 px-4 font-bold">Kasir</th>
                    <th className="py-3 px-4 font-bold text-right">Modal Awal</th>
                    <th className="py-3 px-4 font-bold text-right">Total Transaksi</th>
                    <th className="py-3 px-4 font-bold text-right">Ekspektasi Kas</th>
                    <th className="py-3 px-4 font-bold text-right">Uang Fisik Aktual</th>
                    <th className="py-3 px-4 font-bold text-center">Selisih</th>
                    <th className="py-3 px-4 font-bold">Catatan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  {shiftHistory.map((s) => {
                    const diff = s.difference || 0;
                    return (
                      <tr key={s.id} className="hover:bg-[#FFF7ED]/50 transition-colors">
                        <td className="py-3.5 px-4 font-mono text-[#5B403D]">
                          {s.closedAt ? s.closedAt.replace('T', ' ').substring(0, 16) : '-'}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-[#0B1C30]">
                          {s.cashierName}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          Rp {s.startingCash.toLocaleString('id-ID')}
                        </td>
                        <td className="py-3.5 px-4 text-right font-bold">
                          Rp {s.totalSales.toLocaleString('id-ID')} ({s.totalTransactions} tx)
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          Rp {s.expectedCash.toLocaleString('id-ID')}
                        </td>
                        <td className="py-3.5 px-4 text-right font-bold text-[#0B1C30]">
                          Rp {(s.actualCash || 0).toLocaleString('id-ID')}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span
                            className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full ${
                              diff === 0
                                ? 'bg-[#DCFCE7] text-[#15803D]'
                                : diff > 0
                                ? 'bg-[#E5EEFF] text-[#0B1C30]'
                                : 'bg-[#FFDAD6] text-[#93000A]'
                            }`}
                          >
                            {diff === 0
                              ? 'Cocok'
                              : diff > 0
                              ? `+Rp ${diff.toLocaleString('id-ID')}`
                              : `-Rp ${Math.abs(diff).toLocaleString('id-ID')}`}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-xs text-[#5B403D]">
                          {s.notes || '-'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal Force Close Confirmation */}
        {isForceModalOpen && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-alert border border-[#CBD5E1] p-6 space-y-4 animate-scale-in">
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <h3 className="text-base font-bold text-[#BA1A1A] flex items-center gap-2">
                  <IconAlertTriangle size={18} />
                  <span>Konfirmasi Force-Close Sesi Kasir</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setIsForceModalOpen(false)}
                  className="text-[#5B403D] hover:text-[#0B1C30]"
                >
                  <IconClose size={20} />
                </button>
              </div>

              <p className="text-xs text-[#5B403D] leading-relaxed">
                Tindakan ini akan menghentikan sesi kasir aktif saat ini ({activeShift?.cashierName}) secara paksa. Seluruh transaksi berikutnya akan diblokir sampai shift baru dibuka.
              </p>

              <form onSubmit={handleForceClose} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-1">
                    Alasan Force Close (Audit Trail) *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Kasir berhalangan / toko ditutup lebih awal..."
                    className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] text-xs text-[#0B1C30]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t border-[#F1F5F9]">
                  <button
                    type="button"
                    onClick={() => setIsForceModalOpen(false)}
                    className="btn-secondary text-xs"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#BA1A1A] hover:bg-[#93000A] text-white font-bold rounded-xl text-xs transition-all shadow-xs"
                  >
                    Ya, Tutup Paksa Sesi
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

