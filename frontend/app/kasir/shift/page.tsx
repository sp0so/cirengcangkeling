'use client';

import React, { useState } from 'react';
import AppShell from '../../components/AppShell';
import { useApp } from '../../lib/context';
import {
  IconShift,
  IconClose,
  IconCheckCircle,
  IconAlertTriangle,
} from '../../components/Icons';

export default function ShiftKasirPage() {
  const { activeShift, shiftHistory, openShift, closeShift, currentUser } = useApp();

  // Buka Shift modal state
  const [isOpenShiftModal, setIsOpenShiftModal] = useState(false);
  const [startingCash, setStartingCash] = useState(100000);
  const [openNotes, setOpenNotes] = useState('Uang pecahan Rp 5rb & Rp 10rb untuk kembalian');

  // Tutup Shift modal state
  const [isCloseShiftModal, setIsCloseShiftModal] = useState(false);
  const [actualCash, setActualCash] = useState(0);
  const [closeNotes, setCloseNotes] = useState('');

  const handleOpenShiftSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (startingCash < 0) return;
    const success = openShift(Number(startingCash), openNotes);
    if (success) {
      setIsOpenShiftModal(false);
    }
  };

  const handleOpenCloseModal = () => {
    if (!activeShift) return;
    setActualCash(activeShift.expectedCash);
    setCloseNotes('');
    setIsCloseShiftModal(true);
  };

  const handleCloseShiftSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    closeShift(Number(actualCash), closeNotes);
    setIsCloseShiftModal(false);
  };

  const difference = activeShift ? actualCash - activeShift.expectedCash : 0;

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#833E17] uppercase tracking-wider">
                Shift & Laci Kasir
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30] tracking-tight">
              Sesi Shift & Rekonsiliasi Kas Fisik
            </h2>
            <p className="text-sm text-[#5B403D]">
              Buka shift sebelum melayani transaksi dan lakukan perhitungan uang fisik laci saat pergantian shift.
            </p>
          </div>

          <div>
            {activeShift ? (
              <button
                onClick={handleOpenCloseModal}
                className="px-4 py-2.5 rounded-xl bg-[#BA1A1A] hover:bg-[#93000A] text-white text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center gap-2"
              >
                <span>Tutup Shift Kasir Sekarang</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setStartingCash(100000);
                  setIsOpenShiftModal(true);
                }}
                className="btn-primary text-xs sm:text-sm"
              >
                <IconShift size={16} />
                <span>Buka Shift Baru</span>
              </button>
            )}
          </div>
        </div>

        {/* Active Shift Card or Shift Closed Callout */}
        {activeShift ? (
          <div className="p-6 rounded-2xl bg-white border border-[#16A34A]/40 shadow-card space-y-4 animate-scale-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F1F5F9] pb-4">
              <div className="flex items-center gap-3">
                <span className="w-3.5 h-3.5 rounded-full bg-[#16A34A] animate-ping" />
                <div>
                  <h3 className="font-extrabold text-base text-[#0B1C30]">
                    Shift Kasir Sedang Berjalan: {activeShift.cashierName}
                  </h3>
                  <p className="text-xs text-[#5B403D]">
                    Dibuka sejak: {activeShift.openedAt.replace('T', ' ').substring(0, 16)} WIB
                  </p>
                </div>
              </div>

              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#DCFCE7] text-[#15803D] self-start sm:self-auto">
                Status: Sesi Kasir Siap Transaksi
              </span>
            </div>

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
                  Uang Fisik Laci Seharusnya
                </span>
                <span className="text-xl font-extrabold text-[#15803D]">
                  Rp {activeShift.expectedCash.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-white border border-[#CBD5E1] shadow-card text-center space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#FFF7ED] text-[#732662] inline-flex items-center justify-center font-bold">
              <IconShift size={32} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0B1C30]">
                Shift Kasir Belum Dibuka
              </h3>
              <p className="text-xs text-[#5B403D] mt-1 leading-relaxed">
                Sebelum melayani pembeli di gerai, silakan masukkan jumlah modal uang fisik di laci untuk memulai shift.
              </p>
            </div>
            <button
              onClick={() => {
                setStartingCash(100000);
                setIsOpenShiftModal(true);
              }}
              className="btn-primary text-xs sm:text-sm font-bold"
            >
              <IconShift size={16} />
              <span>Buka Shift Sekarang</span>
            </button>
          </div>
        )}

        {/* Modal Buka Shift */}
        {isOpenShiftModal && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-alert border border-[#CBD5E1] p-6 space-y-4 animate-scale-in">
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <h3 className="text-base font-bold text-[#0B1C30]">Buka Shift Kasir Baru</h3>
                <button
                  type="button"
                  onClick={() => setIsOpenShiftModal(false)}
                  className="text-[#5B403D] hover:text-[#0B1C30]"
                >
                  <IconClose size={20} />
                </button>
              </div>

              <form onSubmit={handleOpenShiftSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-1">
                    Petugas Kasir Bertugas
                  </label>
                  <input
                    type="text"
                    disabled
                    value={currentUser.name}
                    className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] bg-slate-100 text-xs text-[#0B1C30] font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-1">
                    Modal Awal Uang Fisik di Laci (Rp) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={startingCash}
                    onChange={(e) => setStartingCash(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#CBD5E1] text-base font-mono font-bold text-[#732662]"
                  />
                  <span className="text-[11px] text-[#5B403D] mt-1 block">
                    Hitung fisik uang receh & uang kertas di laci sebelum membuka sistem POS.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-1">
                    Catatan Pembukaan Shift
                  </label>
                  <input
                    type="text"
                    value={openNotes}
                    onChange={(e) => setOpenNotes(e.target.value)}
                    placeholder="Uang kembalian pecahan 2rb, 5rb, 10rb..."
                    className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] text-xs text-[#0B1C30]"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-[#F1F5F9]">
                  <button
                    type="button"
                    onClick={() => setIsOpenShiftModal(false)}
                    className="btn-secondary text-xs"
                  >
                    Batal
                  </button>
                  <button type="submit" className="btn-primary text-xs">
                    Konfirmasi Buka Shift
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Tutup Shift & Rekonsiliasi Kas */}
        {isCloseShiftModal && activeShift && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-alert border border-[#CBD5E1] p-6 space-y-4 animate-scale-in">
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <h3 className="text-base font-bold text-[#0B1C30]">
                  Tutup Shift & Rekonsiliasi Uang Kas
                </h3>
                <button
                  type="button"
                  onClick={() => setIsCloseShiftModal(false)}
                  className="text-[#5B403D] hover:text-[#0B1C30]"
                >
                  <IconClose size={20} />
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#CBD5E1] space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#5B403D]">Modal Awal:</span>
                  <strong>Rp {activeShift.startingCash.toLocaleString('id-ID')}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5B403D]">Penjualan Tunai ({activeShift.totalTransactions} tx):</span>
                  <strong className="text-[#15803D]">+Rp {activeShift.cashSales.toLocaleString('id-ID')}</strong>
                </div>
                <div className="flex justify-between pt-1 border-t border-[#CBD5E1]/60 font-bold">
                  <span>Ekspektasi Uang Fisik Sistem:</span>
                  <span className="text-[#732662] text-sm">
                    Rp {activeShift.expectedCash.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              <form onSubmit={handleCloseShiftSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-1">
                    Hitungan Uang Fisik Aktual di Laci (Rp) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={actualCash}
                    onChange={(e) => setActualCash(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#CBD5E1] text-base font-mono font-bold text-[#0B1C30]"
                  />
                </div>

                {/* Dynamic Difference Feedback Chip */}
                <div
                  className={`p-3 rounded-xl border flex justify-between items-center text-xs font-bold ${
                    difference === 0
                      ? 'bg-[#DCFCE7] text-[#15803D] border-[#16A34A]/30'
                      : difference > 0
                      ? 'bg-[#E5EEFF] text-[#0B1C30] border-[#CBD5E1]'
                      : 'bg-[#FFDAD6] text-[#93000A] border-[#BA1A1A]/30'
                  }`}
                >
                  <span>Status Selisih Kas:</span>
                  <span>
                    {difference === 0
                      ? 'Kas Fisik Cocok (Rp 0)'
                      : difference > 0
                      ? `Surplus Kas: +Rp ${difference.toLocaleString('id-ID')}`
                      : `Selisih Kurang: -Rp ${Math.abs(difference).toLocaleString('id-ID')}`}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-1">
                    Catatan Rekonsiliasi (Jika Ada Selisih)
                  </label>
                  <textarea
                    rows={2}
                    value={closeNotes}
                    onChange={(e) => setCloseNotes(e.target.value)}
                    placeholder="Alasan selisih kas / kondisi serah terima..."
                    className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] text-xs text-[#0B1C30]"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-[#F1F5F9]">
                  <button
                    type="button"
                    onClick={() => setIsCloseShiftModal(false)}
                    className="btn-secondary text-xs"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#BA1A1A] hover:bg-[#93000A] text-white font-bold rounded-xl text-xs transition-all shadow-xs"
                  >
                    Konfirmasi Tutup Shift
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Shift History List */}
        <div className="rounded-2xl bg-white border border-[#CBD5E1] shadow-card overflow-hidden">
          <div className="p-4 border-b border-[#F1F5F9] font-bold text-sm text-[#0B1C30]">
            Histori Sesi Shift Anda
          </div>
          {shiftHistory.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#5B403D]">
              Belum ada riwayat penutupan shift pada hari ini.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#FAF7F2] border-b border-[#CBD5E1] text-[#5B403D]">
                  <tr>
                    <th className="py-3 px-4 font-bold">Waktu Tutup</th>
                    <th className="py-3 px-4 font-bold text-right">Modal Awal</th>
                    <th className="py-3 px-4 font-bold text-right">Penjualan Tunai</th>
                    <th className="py-3 px-4 font-bold text-right">Uang Fisik Aktual</th>
                    <th className="py-3 px-4 font-bold text-center">Selisih</th>
                    <th className="py-3 px-4 font-bold">Catatan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  {shiftHistory.map((s) => {
                    const diff = s.difference || 0;
                    return (
                      <tr key={s.id}>
                        <td className="py-3.5 px-4 font-mono text-[#5B403D]">
                          {s.closedAt ? s.closedAt.substring(11, 16) : '-'} WIB
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          Rp {s.startingCash.toLocaleString('id-ID')}
                        </td>
                        <td className="py-3.5 px-4 text-right font-bold text-[#15803D]">
                          Rp {s.cashSales.toLocaleString('id-ID')}
                        </td>
                        <td className="py-3.5 px-4 text-right font-bold text-[#0B1C30]">
                          Rp {(s.actualCash || 0).toLocaleString('id-ID')}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span
                            className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                              diff === 0
                                ? 'bg-[#DCFCE7] text-[#15803D]'
                                : diff > 0
                                ? 'bg-[#E5EEFF] text-[#0B1C30]'
                                : 'bg-[#FFDAD6] text-[#93000A]'
                            }`}
                          >
                            {diff === 0 ? 'Cocok' : `Rp ${diff.toLocaleString('id-ID')}`}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-xs text-[#5B403D]">{s.notes || '-'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}

