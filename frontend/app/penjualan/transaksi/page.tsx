'use client';

import React, { useState } from 'react';
import AppShell from '../../components/AppShell';
import { useApp } from '../../lib/context';
import { Transaction } from '../../lib/types';
import {
  IconPOS,
  IconSearch,
  IconPrint,
  IconClose,
  IconCheckCircle,
} from '../../components/Icons';

export default function TransaksiPenjualanPage() {
  const { transactions } = useApp();
  const [search, setSearch] = useState('');
  const [filterPayment, setFilterPayment] = useState<'all' | 'tunai' | 'qris' | 'transfer'>('all');
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  const filtered = transactions.filter((tx) => {
    const matchSearch =
      tx.code.toLowerCase().includes(search.toLowerCase()) ||
      tx.cashierName.toLowerCase().includes(search.toLowerCase());
    const matchPayment = filterPayment === 'all' || tx.paymentMethod === filterPayment;
    return matchSearch && matchPayment;
  });

  const totalSalesAll = transactions.reduce((sum, tx) => sum + tx.total, 0);

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
              Daftar Transaksi Penjualan (Figma 6:3562)
            </h2>
            <p className="text-sm text-[#5B403D]">
              Semua struk dan riwayat pembayaran pelanggan dari kasir toko fisik dan pesanan takeaway.
            </p>
          </div>

          <div className="p-3 px-4 rounded-xl bg-white border border-[#CBD5E1] shadow-card flex items-center gap-3">
            <span className="text-xs font-bold text-[#5B403D]">Total Penjualan:</span>
            <span className="text-lg font-extrabold text-[#732662]">
              Rp {totalSalesAll.toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        {/* Filter bar */}
        <div className="p-4 rounded-2xl bg-white border border-[#CBD5E1] shadow-card flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full md:w-80 relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari kode transaksi atau nama kasir..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#CBD5E1] text-xs sm:text-sm text-[#0B1C30] focus:outline-none focus:border-[#732662]"
            />
            <span className="absolute left-3 top-2.5 text-[#5B403D]/60">
              <IconSearch size={16} />
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterPayment('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterPayment === 'all'
                  ? 'bg-[#732662] text-white shadow-xs'
                  : 'bg-[#F8FAFC] text-[#475569] border border-[#CBD5E1]'
              }`}
            >
              Semua Metode ({transactions.length})
            </button>
            <button
              onClick={() => setFilterPayment('tunai')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterPayment === 'tunai'
                  ? 'bg-[#732662] text-white shadow-xs'
                  : 'bg-[#F8FAFC] text-[#475569] border border-[#CBD5E1]'
              }`}
            >
              Tunai
            </button>
            <button
              onClick={() => setFilterPayment('qris')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterPayment === 'qris'
                  ? 'bg-[#732662] text-white shadow-xs'
                  : 'bg-[#F8FAFC] text-[#475569] border border-[#CBD5E1]'
              }`}
            >
              QRIS
            </button>
            <button
              onClick={() => setFilterPayment('transfer')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterPayment === 'transfer'
                  ? 'bg-[#732662] text-white shadow-xs'
                  : 'bg-[#F8FAFC] text-[#475569] border border-[#CBD5E1]'
              }`}
            >
              Transfer
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="rounded-2xl bg-white border border-[#CBD5E1] shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#FAF7F2] border-b border-[#CBD5E1] text-[#5B403D]">
                <tr>
                  <th className="py-3 px-4 font-bold">No. Transaksi</th>
                  <th className="py-3 px-4 font-bold">Waktu</th>
                  <th className="py-3 px-4 font-bold">Kasir</th>
                  <th className="py-3 px-4 font-bold">Detail Pesanan</th>
                  <th className="py-3 px-4 font-bold">Metode Bayar</th>
                  <th className="py-3 px-4 font-bold text-right">Total Tagihan</th>
                  <th className="py-3 px-4 font-bold text-center">Status</th>
                  <th className="py-3 px-4 font-bold text-center">Struk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {filtered.length > 0 ? (
                  filtered.map((tx) => (
                    <tr key={tx.id} className="hover:bg-[#FFF7ED]/50 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#732662]">
                        {tx.code}
                      </td>
                      <td className="py-3.5 px-4 text-[#5B403D] text-xs">
                        {tx.date.replace('T', ' ').substring(0, 16)}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-[#0B1C30]">
                        {tx.cashierName}
                      </td>
                      <td className="py-3.5 px-4 text-[#0B1C30]">
                        <span className="font-semibold">{tx.items.length} item</span> (
                        {tx.items.map((i) => `${i.productName} (${i.quantity}x)`).join(', ')})
                      </td>
                      <td className="py-3.5 px-4 uppercase font-bold text-[#5B403D] text-xs">
                        <span
                          className={`px-2 py-0.5 rounded-md ${
                            tx.paymentMethod === 'tunai'
                              ? 'bg-[#DCFCE7] text-[#15803D]'
                              : tx.paymentMethod === 'qris'
                              ? 'bg-[#E5EEFF] text-[#0B1C30]'
                              : 'bg-[#FEF3C7] text-[#92400E]'
                          }`}
                        >
                          {tx.paymentMethod}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-extrabold text-[#0B1C30]">
                        Rp {tx.total.toLocaleString('id-ID')}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D]">
                          <IconCheckCircle size={12} />
                          <span>Selesai</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => setSelectedTx(tx)}
                          className="p-1.5 rounded-lg border border-[#CBD5E1] hover:bg-[#FFF7ED] text-[#732662] transition-colors"
                          title="Cetak Struk"
                        >
                          <IconPrint size={15} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="py-10 text-center text-[#5B403D]">
                      <p className="font-bold text-[14px] text-[#0B1C30]">Belum ada riwayat transaksi</p>
                      <p className="text-[12px] text-[#5B403D] mt-1">
                        Transaksi pelanggan akan otomatis tercatat di sini setelah kasir memproses pesanan di POS.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Thermal Receipt */}
        {selectedTx && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-alert border border-[#CBD5E1] p-6 space-y-4 animate-scale-in">
              <div className="flex items-center justify-between pb-2 border-b border-[#F1F5F9]">
                <h3 className="text-sm font-bold text-[#0B1C30]">Pratinjau Struk Kasir</h3>
                <button
                  type="button"
                  onClick={() => setSelectedTx(null)}
                  className="text-[#5B403D] hover:text-[#0B1C30]"
                >
                  <IconClose size={18} />
                </button>
              </div>

              {/* Thermal Paper Look */}
              <div className="p-4 bg-[#FAF7F2] rounded-xl border border-dashed border-[#CBD5E1] text-[#0B1C30] text-xs font-mono space-y-3">
                <div className="text-center space-y-0.5">
                  <h4 className="font-extrabold text-sm tracking-wide text-[#5F030A]">
                    CIRENG CANGKELING
                  </h4>
                  <p className="text-[10px] text-[#5B403D]">Jl. Semolowaru No. 45, Surabaya</p>
                  <p className="text-[10px] text-[#5B403D]">Telp: 0812-3456-7890</p>
                </div>

                <div className="border-t border-b border-dashed border-[#CBD5E1] py-1.5 text-[10px] text-[#5B403D] space-y-0.5">
                  <div className="flex justify-between">
                    <span>No: {selectedTx.code}</span>
                    <span>Kasir: {selectedTx.cashierName}</span>
                  </div>
                  <div>Waktu: {selectedTx.date.replace('T', ' ').substring(0, 16)}</div>
                </div>

                <div className="space-y-1.5">
                  {selectedTx.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <div>
                        <div>{item.productName}</div>
                        <div className="text-[10px] text-[#5B403D]">
                          {item.quantity}x @ Rp {item.price.toLocaleString('id-ID')}
                        </div>
                      </div>
                      <span className="font-bold">
                        Rp {item.subtotal.toLocaleString('id-ID')}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-dashed border-[#CBD5E1] pt-2 space-y-1">
                  <div className="flex justify-between font-bold text-xs">
                    <span>TOTAL:</span>
                    <span className="text-[#732662]">Rp {selectedTx.total.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-[#5B403D]">
                    <span>Metode ({selectedTx.paymentMethod.toUpperCase()}):</span>
                    <span>Rp {selectedTx.amountPaid.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-[#5B403D]">
                    <span>Kembalian:</span>
                    <span>Rp {selectedTx.change.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                <div className="text-center pt-2 text-[10px] text-[#5B403D]">
                  *** Terima Kasih Atas Kunjungan Anda ***<br />
                  Nikmati Kelezatan Renyah Cireng Kami!
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedTx(null)}
                  className="btn-secondary text-xs"
                >
                  Tutup
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="btn-primary text-xs"
                >
                  <IconPrint size={14} />
                  <span>Cetak Struk Sekarang</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

