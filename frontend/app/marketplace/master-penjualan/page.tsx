'use client';

import React, { useState } from 'react';
import AppShell from '../../components/AppShell';
import { useApp } from '../../lib/context';
import {
  IconSearch,
  IconDownload,
  IconPOS,
  IconMarketplace,
} from '../../components/Icons';

export default function MasterLaporanPenjualanPage() {
  const { transactions, marketplaceReports } = useApp();
  const [filterChannel, setFilterChannel] = useState<'all' | 'pos' | 'marketplace'>('all');

  const totalPosSales = transactions.reduce((sum, tx) => sum + tx.total, 0);
  const totalMarketplaceSales = marketplaceReports.reduce((sum, rep) => sum + rep.totalRevenue, 0);
  const grandTotalSales = totalPosSales + totalMarketplaceSales;

  // Flatten marketplace orders for combined list
  const marketplaceOrders = marketplaceReports.flatMap((rep) =>
    rep.orders.map((ord) => ({
      code: ord.orderId,
      date: ord.date,
      channel: rep.platform,
      customer: ord.customerName,
      itemsSummary: `${ord.productName} (${ord.quantity}x)`,
      total: ord.total,
      type: 'marketplace',
    }))
  );

  const posOrders = transactions.map((tx) => ({
    code: tx.code,
    date: tx.date.split('T')[0],
    channel: 'Kasir Gerai Fisik',
    customer: tx.cashierName,
    itemsSummary: tx.items.map((i) => `${i.productName} (${i.quantity}x)`).join(', '),
    total: tx.total,
    type: 'pos',
  }));

  const allOrders = [...posOrders, ...marketplaceOrders].filter((item) => {
    if (filterChannel === 'pos') return item.type === 'pos';
    if (filterChannel === 'marketplace') return item.type === 'marketplace';
    return true;
  });

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#833E17] uppercase tracking-wider">
                Marketplace & Omnichannel
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30] tracking-tight">
              Master Laporan Penjualan (Terpadu)
            </h2>
            <p className="text-sm text-[#5B403D]">
              Rekapitulasi omzet komprehensif mengintegrasikan kasir POS gerai fisik dan import marketplace online.
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="btn-secondary text-xs sm:text-sm self-start sm:self-auto font-bold"
          >
            <IconDownload size={16} />
            <span>Unduh Rekap Laporan</span>
          </button>
        </div>

        {/* Omnichannel KPI Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#CBD5E1] shadow-card">
            <span className="text-[11px] font-bold uppercase text-[#5B403D] block mb-1">
              Grand Total Omzet Gabungan
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#732662]">
              Rp {grandTotalSales.toLocaleString('id-ID')}
            </div>
            <span className="text-xs text-[#15803D] font-semibold mt-1 block">
              POS Toko + Marketplace Online
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#CBD5E1] shadow-card">
            <span className="text-[11px] font-bold uppercase text-[#5B403D] block mb-1">
              Omzet Kasir Gerai Fisik (POS)
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30]">
              Rp {totalPosSales.toLocaleString('id-ID')}
            </div>
            <span className="text-xs text-[#5B403D] font-medium mt-1 block">
              {transactions.length} Transaksi Terlayani
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#CBD5E1] shadow-card">
            <span className="text-[11px] font-bold uppercase text-[#5B403D] block mb-1">
              Omzet Marketplace Online
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#15803D]">
              Rp {totalMarketplaceSales.toLocaleString('id-ID')}
            </div>
            <span className="text-xs text-[#5B403D] font-medium mt-1 block">
              {marketplaceReports.length} Laporan Impor Terdata
            </span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterChannel('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterChannel === 'all'
                ? 'bg-[#732662] text-white shadow-xs'
                : 'bg-white text-[#475569] border border-[#CBD5E1]'
            }`}
          >
            Semua Saluran Penjualan ({allOrders.length})
          </button>
          <button
            onClick={() => setFilterChannel('pos')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterChannel === 'pos'
                ? 'bg-[#732662] text-white shadow-xs'
                : 'bg-white text-[#475569] border border-[#CBD5E1]'
            }`}
          >
            Kasir Gerai POS ({posOrders.length})
          </button>
          <button
            onClick={() => setFilterChannel('marketplace')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterChannel === 'marketplace'
                ? 'bg-[#732662] text-white shadow-xs'
                : 'bg-white text-[#475569] border border-[#CBD5E1]'
            }`}
          >
            Marketplace ({marketplaceOrders.length})
          </button>
        </div>

        {/* Combined Orders Table */}
        <div className="rounded-2xl bg-white border border-[#CBD5E1] shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#FAF7F2] border-b border-[#CBD5E1] text-[#5B403D]">
                <tr>
                  <th className="py-3 px-4 font-bold">No. Referensi</th>
                  <th className="py-3 px-4 font-bold">Tanggal</th>
                  <th className="py-3 px-4 font-bold">Saluran Penjualan</th>
                  <th className="py-3 px-4 font-bold">Menu / Item</th>
                  <th className="py-3 px-4 font-bold text-right">Nilai Transaksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {allOrders.map((ord, idx) => (
                  <tr key={idx} className="hover:bg-[#FFF7ED]/50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-[#732662]">
                      {ord.code}
                    </td>
                    <td className="py-3 px-4 text-[#5B403D]">{ord.date}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                          ord.type === 'pos'
                            ? 'bg-[#DCFCE7] text-[#15803D]'
                            : 'bg-[#FBF4F9] text-[#732662] border border-[#732662]/30'
                        }`}
                      >
                        {ord.channel}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#0B1C30] font-medium max-w-xs truncate">
                      {ord.itemsSummary}
                    </td>
                    <td className="py-3 px-4 text-right font-extrabold text-[#0B1C30]">
                      Rp {ord.total.toLocaleString('id-ID')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

