'use client';

import React, { useState } from 'react';
import AppShell from '../../components/AppShell';
import { useApp } from '../../lib/context';
import { Transaction } from '../../lib/types';
import {
  IconReport,
  IconSearch,
  IconPrint,
  IconClose,
  IconCheckCircle,
} from '../../components/Icons';

export default function RiwayatTransaksiKasirPage() {
  const { transactions, currentUser } = useApp();
  const [search, setSearch] = useState('');
  const [filterPayment, setFilterPayment] = useState<'all' | 'tunai' | 'qris' | 'transfer'>('all');
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  // Kasir only sees transactions processed by themselves (Section 6.2.3 & 6.3)
  const myTransactions = transactions.filter(
    (tx) => tx.cashierId === currentUser.id || tx.cashierName === currentUser.name
  );

  const filtered = myTransactions.filter((tx) => {
    const matchSearch =
      tx.code.toLowerCase().includes(search.toLowerCase()) ||
      tx.items.some((it) => it.productName.toLowerCase().includes(search.toLowerCase()));
    const matchPayment = filterPayment === 'all' || tx.paymentMethod === filterPayment;
    return matchSearch && matchPayment;
  });

  const totalSales = myTransactions.reduce((sum, tx) => sum + tx.total, 0);

  return (
    <AppShell>
      <div className="space-y-6 font-sans">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#833E17] uppercase tracking-wider">
                3. Riwayat Transaksi
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30] tracking-tight">
              Riwayat Transaksi Pribadi Kasir
            </h2>
            <p className="text-sm text-[#5B403D]">
              Daftar seluruh transaksi kasir yang Anda proses secara pribadi di gerai Cireng Cangkeling.
            </p>
          </div>

          <div className="p-3.5 px-4 rounded-xl bg-white border border-[#CBD5E1] shadow-card flex items-center gap-3">
            <span className="text-xs font-bold text-[#5B403D]">Total Penjualan Pribadi:</span>
            <span className="text-lg font-extrabold text-[#732662]">
              Rp {totalSales.toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="p-4 rounded-2xl bg-white border border-[#CBD5E1] shadow-card flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full md:w-80 relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari kode struk atau nama produk..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#CBD5E1] text-xs sm:text-sm text-[#0B1C30] focus:outline-none focus:border-[#732662]"
            />
            <span className="absolute left-3 top-2.5 text-[#5B403D]/60">
              <IconSearch size={16} />
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFilterPayment('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterPayment === 'all'
                  ? 'bg-[#732662] text-white shadow-xs'
                  : 'bg-[#F8FAFC] text-[#475569] border border-[#CBD5E1] hover:bg-slate-100'
              }`}
            >
              Semua ({myTransactions.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterPayment('tunai')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterPayment === 'tunai'
                  ? 'bg-[#732662] text-white shadow-xs'
                  : 'bg-[#F8FAFC] text-[#475569] border border-[#CBD5E1] hover:bg-slate-100'
              }`}
            >
              Tunai
            </button>
            <button
              type="button"
              onClick={() => setFilterPayment('qris')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterPayment === 'qris'
                  ? 'bg-[#732662] text-white shadow-xs'
                  : 'bg-[#F8FAFC] text-[#475569] border border-[#CBD5E1] hover:bg-slate-100'
              }`}
            >
              QRIS
            </button>
            <button
              type="button"
              onClick={() => setFilterPayment('transfer')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterPayment === 'transfer'
                  ? 'bg-[#732662] text-white shadow-xs'
                  : 'bg-[#F8FAFC] text-[#475569] border border-[#CBD5E1] hover:bg-slate-100'
              }`}
            >
              Transfer
            </button>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="rounded-2xl bg-white border border-[#CBD5E1] shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#FAF7F2] border-b border-[#CBD5E1] text-[#5B403D]">
                <tr>
                  <th className="py-3 px-4 font-bold">Kode Struk</th>
                  <th className="py-3 px-4 font-bold">Waktu Transaksi</th>
                  <th className="py-3 px-4 font-bold">Rincian Item</th>
                  <th className="py-3 px-4 font-bold text-center">Metode</th>
                  <th className="py-3 px-4 font-bold text-right">Total Tagihan</th>
                  <th className="py-3 px-4 font-bold text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {filtered.length > 0 ? (
                  filtered.map((tx) => (
                    <tr key={tx.id} className="row-hover-satisfying">
                      <td className="py-3 px-4 font-mono font-bold text-[#732662]">
                        {tx.code}
                      </td>
                      <td className="py-3 px-4 text-[#5B403D] whitespace-nowrap">
                        {tx.date ? new Date(tx.date).toLocaleString('id-ID') : '-'}
                      </td>
                      <td className="py-3 px-4 font-medium text-[#0B1C30]">
                        {tx.items.map((i) => `${i.quantity}x ${i.productName}`).join(', ')}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase ${
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
                      <td className="py-3 px-4 text-right font-extrabold text-[#0B1C30]">
                        Rp {tx.total.toLocaleString('id-ID')}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => setSelectedTx(tx)}
                          className="px-2.5 py-1 rounded-lg bg-[#E5EEFF] hover:bg-[#D3E4FE] text-[#732662] font-bold text-xs transition-colors"
                        >
                          Lihat Struk
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-xs text-[#5B403D]">
                      Belum ada riwayat transaksi yang Anda layani di kasir.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* RECEIPT DETAIL MODAL */}
        {selectedTx && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 animate-scale-in">
              <div className="flex justify-between items-center border-b border-[#F1F5F9] pb-2">
                <span className="font-bold text-sm text-[#0B1C30]">Struk Pembayaran Kasir</span>
                <button
                  type="button"
                  onClick={() => setSelectedTx(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <IconClose size={18} />
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-dashed border-[#CBD5E1] text-xs font-mono space-y-2">
                <div className="text-center border-b border-dashed border-[#CBD5E1] pb-2">
                  <p className="font-bold text-sm">CIRENG CANGKELING</p>
                  <p className="text-[10px] text-[#5B403D]">Pelopor Cireng Renyah Gurih</p>
                  <p className="text-[10px] text-[#5B403D]">No: {selectedTx.code}</p>
                  <p className="text-[10px] text-[#5B403D]">Waktu: {selectedTx.date}</p>
                  <p className="text-[10px] text-[#5B403D]">Kasir: {selectedTx.cashierName}</p>
                </div>

                <div className="space-y-1 py-1">
                  {selectedTx.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>{item.quantity}x {item.productName}</span>
                      <span>Rp {item.subtotal.toLocaleString('id-ID')}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-dashed border-[#CBD5E1] pt-2 space-y-1">
                  <div className="flex justify-between font-bold">
                    <span>TOTAL:</span>
                    <span>Rp {selectedTx.total.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span>Metode:</span>
                    <span className="uppercase">{selectedTx.paymentMethod}</span>
                  </div>
                  {selectedTx.paymentMethod === 'tunai' && (
                    <>
                      <div className="flex justify-between text-[11px]">
                        <span>Diterima:</span>
                        <span>Rp {selectedTx.amountPaid.toLocaleString('id-ID')}</span>
                      </div>
                      <div className="flex justify-between text-[11px] font-bold text-[#15803D]">
                        <span>Kembali:</span>
                        <span>Rp {selectedTx.change.toLocaleString('id-ID')}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 btn-primary text-xs flex items-center justify-center gap-1.5"
                >
                  <IconPrint size={14} />
                  <span>Cetak Struk</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedTx(null)}
                  className="btn-secondary text-xs"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
