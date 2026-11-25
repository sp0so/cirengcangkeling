'use client';

import React from 'react';
import Link from 'next/link';
import AppShell from '../../components/AppShell';
import { useApp } from '../../lib/context';
import {
  IconDashboard,
  IconPOS,
  IconShift,
  IconReport,
  IconCheckCircle,
  IconAlertTriangle,
} from '../../components/Icons';

export default function DashboardKasirPage() {
  const { activeShift, transactions, currentUser, products } = useApp();

  // Transactions on this cashier's current shift
  const shiftTransactions = activeShift
    ? transactions.filter((tx) => tx.shiftId === activeShift.id && tx.status !== 'dibatalkan')
    : [];

  const shiftTotalSales = shiftTransactions.reduce((sum, tx) => sum + tx.total, 0);
  const shiftCashSales = shiftTransactions
    .filter((tx) => tx.paymentMethod === 'tunai')
    .reduce((sum, tx) => sum + tx.total, 0);
  const shiftQrisSales = shiftTransactions
    .filter((tx) => tx.paymentMethod === 'qris')
    .reduce((sum, tx) => sum + tx.total, 0);
  const shiftTransferSales = shiftTransactions
    .filter((tx) => tx.paymentMethod === 'transfer')
    .reduce((sum, tx) => sum + tx.total, 0);

  return (
    <AppShell>
      <div className="space-y-6 font-sans">
        {/* SECTION A: GREETING & SHIFT STATUS */}
        <div className="bg-white rounded-[16px] p-6 shadow-card border border-[#E2E8F0] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#A24F9D] uppercase tracking-wider">
                PORTAL OPERASIONAL KASIR
              </span>
              <span className="bg-[#E5EEFF] text-[#0B1C30] text-[11px] font-bold px-2 py-0.5 rounded-full">
                {currentUser?.name}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30] tracking-tight mt-1">
              Selamat Bertugas, {currentUser?.name}!
            </h1>
            <p className="text-sm text-[#5B403D] mt-0.5">
              Kelola pencatatan penjualan POS kasir toko fisik dan pantau status laci kasir harian.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {activeShift ? (
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#DCFCE7] border border-[#16A34A]/30 text-[#15803D]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] animate-ping" />
                <span className="text-xs font-bold">Shift Aktif Berjalan</span>
              </div>
            ) : (
              <Link
                href="/kasir/shift"
                className="btn-primary text-xs"
              >
                <IconShift size={16} />
                <span>Buka Shift Kasir Baru</span>
              </Link>
            )}
          </div>
        </div>

        {/* SECTION B: 4 SUMMARY CARDS FOR ACTIVE SHIFT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: MODAL AWAL KAS */}
          <div className="bg-white rounded-[12px] p-4 shadow-card border border-[#E2E8F0] relative overflow-hidden flex flex-col justify-between card-hover">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B403D]">
                MODAL AWAL KASIR
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#E5EEFF] text-[#A24F9D] flex items-center justify-center">
                <IconShift size={16} />
              </div>
            </div>
            <div>
              <div className="text-[22px] font-extrabold text-[#0B1C30]">
                Rp {activeShift ? activeShift.startingCash.toLocaleString('id-ID') : '0'}
              </div>
              <p className="text-[11px] text-[#5B403D] mt-0.5">
                {activeShift ? `Dibuka pukul ${new Date(activeShift.openedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB` : 'Belum buka shift'}
              </p>
            </div>
          </div>

          {/* Card 2: TOTAL TRANSAKSI SHIFT */}
          <div className="bg-white rounded-[12px] p-4 shadow-card border border-[#E2E8F0] relative overflow-hidden flex flex-col justify-between card-hover">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B403D]">
                TOTAL TRANSAKSI SHIFT
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center">
                <IconPOS size={16} />
              </div>
            </div>
            <div>
              <div className="text-[22px] font-extrabold text-[#0B1C30]">
                {shiftTransactions.length} Transaksi
              </div>
              <p className="text-[11px] text-[#15803D] font-semibold mt-0.5">
                Omzet: Rp {shiftTotalSales.toLocaleString('id-ID')}
              </p>
            </div>
          </div>

          {/* Card 3: PENJUALAN TUNAI (CASH) */}
          <div className="bg-white rounded-[12px] p-4 shadow-card border border-[#E2E8F0] relative overflow-hidden flex flex-col justify-between card-hover">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B403D]">
                PENJUALAN TUNAI
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#FFFBEB] text-[#F59E0B] flex items-center justify-center">
                <IconPOS size={16} />
              </div>
            </div>
            <div>
              <div className="text-[22px] font-extrabold text-[#B45309]">
                Rp {shiftCashSales.toLocaleString('id-ID')}
              </div>
              <p className="text-[11px] text-[#5B403D] mt-0.5">
                Ekspektasi Kas Laci: Rp {activeShift ? activeShift.expectedCash.toLocaleString('id-ID') : '0'}
              </p>
            </div>
          </div>

          {/* Card 4: NON-TUNAI (QRIS & TRANSFER) */}
          <div className="bg-white rounded-[12px] p-4 shadow-card border border-[#E2E8F0] relative overflow-hidden flex flex-col justify-between card-hover">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B403D]">
                NON-TUNAI (QRIS/TRF)
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#EFF4FF] text-[#732662] flex items-center justify-center">
                <IconReport size={16} />
              </div>
            </div>
            <div>
              <div className="text-[22px] font-extrabold text-[#732662]">
                Rp {(shiftQrisSales + shiftTransferSales).toLocaleString('id-ID')}
              </div>
              <p className="text-[11px] text-[#5B403D] mt-0.5">
                QRIS: Rp {shiftQrisSales.toLocaleString('id-ID')} | Trf: Rp {shiftTransferSales.toLocaleString('id-ID')}
              </p>
            </div>
          </div>
        </div>

        {/* SECTION C: TRANSAKSI TERAKHIR PADA SHIFT AKTIF & MENU CEPAT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel: Daftar Transaksi Terkini Shift */}
          <div className="lg:col-span-2 bg-white rounded-[16px] p-6 shadow-card border border-[#E2E8F0] space-y-4">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
              <div>
                <h3 className="font-bold text-base text-[#0B1C30]">
                  Transaksi Shift Ini
                </h3>
                <p className="text-xs text-[#5B403D]">
                  Struk dan pembayaran yang dilayani selama sesi shift aktif berjalan.
                </p>
              </div>
              <Link
                href="/kasir/riwayat"
                className="text-xs font-bold text-[#A24F9D] hover:underline"
              >
                Lihat Semua Riwayat →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#EFF4FF] text-[#5B403D] font-bold">
                    <th className="py-2.5 px-3 rounded-l-lg">KODE STRUK</th>
                    <th className="py-2.5 px-3">WAKTU</th>
                    <th className="py-2.5 px-3">ITEM</th>
                    <th className="py-2.5 px-3">METODE</th>
                    <th className="py-2.5 px-3 text-right rounded-r-lg">TOTAL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  {shiftTransactions.length > 0 ? (
                    shiftTransactions.slice(0, 5).map((tx) => (
                      <tr key={tx.id} className="row-hover-satisfying">
                        <td className="py-2.5 px-3 font-mono font-bold text-[#732662]">{tx.code}</td>
                        <td className="py-2.5 px-3 text-[#5B403D]">
                          {tx.date ? new Date(tx.date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '-'}
                        </td>
                        <td className="py-2.5 px-3 font-medium text-[#0B1C30]">
                          {tx.items.map((it) => `${it.quantity}x ${it.productName}`).join(', ')}
                        </td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                              tx.paymentMethod === 'tunai'
                                ? 'bg-[#DCFCE7] text-[#15803D]'
                                : tx.paymentMethod === 'qris'
                                ? 'bg-[#EFF4FF] text-[#732662]'
                                : 'bg-[#FEF3C7] text-[#92400E]'
                            }`}
                          >
                            {tx.paymentMethod}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right font-bold text-[#0B1C30]">
                          Rp {tx.total.toLocaleString('id-ID')}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-[#5B403D]">
                        {activeShift
                          ? 'Belum ada transaksi di kasir pada shift ini. Buka menu Transaksi Penjualan untuk mulai melayani pelanggan.'
                          : 'Shift kasir belum aktif. Silakan buka shift untuk mulai melayani transaksi.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="pt-2 flex justify-between items-center text-xs text-[#5B403D]">
              <span>Tercatat {shiftTransactions.length} transaksi di shift saat ini.</span>
              <Link
                href="/kasir/pos"
                className="btn-primary text-xs"
              >
                <IconPOS size={14} />
                <span>Buka Layar Kasir POS</span>
              </Link>
            </div>
          </div>

          {/* Right Panel: Ketersediaan Menu & Shortcut */}
          <div className="lg:col-span-1 bg-white rounded-[16px] p-6 shadow-card border border-[#E2E8F0] flex flex-col justify-between space-y-4">
            <div>
              <div className="border-b border-[#F1F5F9] pb-3 mb-3">
                <h3 className="font-bold text-base text-[#0B1C30]">
                  Ketersediaan Menu Gerai
                </h3>
                <p className="text-xs text-[#5B403D]">
                  Stok produk siap jual yang tersedia di etalase gerai.
                </p>
              </div>

              <div className="space-y-2">
                {products.length > 0 ? (
                  products.slice(0, 5).map((p) => (
                    <div key={p.id} className="p-2.5 rounded-xl bg-[#FAF7F2] flex items-center justify-between text-xs">
                      <div className="min-w-0 pr-2">
                        <span className="font-bold text-[#0B1C30] block truncate">{p.name}</span>
                        <span className="text-[11px] text-[#5B403D]">Rp {p.price.toLocaleString('id-ID')}</span>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full font-bold text-[11px] shrink-0 ${
                          p.stock > p.minStock
                            ? 'bg-[#DCFCE7] text-[#15803D]'
                            : p.stock > 0
                            ? 'bg-[#FEF3C7] text-[#92400E]'
                            : 'bg-[#FFDAD6] text-[#93000A]'
                        }`}
                      >
                        {p.stock > 0 ? `${p.stock} ${p.unit}` : 'Habis'}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-[#5B403D] text-center py-4">
                    Belum ada data produk di sistem.
                  </p>
                )}
              </div>
            </div>

            <div className="pt-2 border-t border-[#F1F5F9]">
              <Link
                href="/kasir/shift"
                className="w-full btn-secondary text-xs text-center flex items-center justify-center gap-2"
              >
                <IconShift size={14} />
                <span>Manajemen Shift & Rekonsiliasi Kas</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
