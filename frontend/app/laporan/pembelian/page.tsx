'use client';

import React from 'react';
import AppShell from '../../components/AppShell';
import { useApp } from '../../lib/context';
import { IconPrint } from '../../components/Icons';

export default function LaporanPembelianPage() {
  const { procurementOrders } = useApp();
  const totalAmount = procurementOrders.reduce((sum, po) => sum + po.totalAmount, 0);

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#833E17] uppercase tracking-wider">
                Laporan Pengadaan
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30] tracking-tight">
              Laporan Pembelian Bahan Baku
            </h2>
            <p className="text-sm text-[#5B403D]">
              Rekapitulasi pengeluaran pembelian bahan mentah tepung, minyak, bumbu, dan kemasan.
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="btn-secondary text-xs sm:text-sm self-start sm:self-auto font-bold"
          >
            <IconPrint size={16} />
            <span>Cetak Rekap</span>
          </button>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#CBD5E1] shadow-card flex justify-between items-center text-xs">
          <span>Total Order Pembelian: <strong>{procurementOrders.length} Order</strong></span>
          <span className="text-base font-extrabold text-[#BA1A1A]">
            Rp {totalAmount.toLocaleString('id-ID')}
          </span>
        </div>

        <div className="rounded-2xl bg-white border border-[#CBD5E1] shadow-card overflow-hidden">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#FAF7F2] border-b border-[#CBD5E1] text-[#5B403D]">
              <tr>
                <th className="py-3 px-4 font-bold">No. Order</th>
                <th className="py-3 px-4 font-bold">Tanggal</th>
                <th className="py-3 px-4 font-bold">Supplier</th>
                <th className="py-3 px-4 font-bold">Item Dipesan</th>
                <th className="py-3 px-4 font-bold text-right">Total Biaya</th>
                <th className="py-3 px-4 font-bold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {procurementOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-[#5B403D]">
                    Belum ada riwayat pembelian bahan baku tercatat.
                  </td>
                </tr>
              ) : (
                procurementOrders.map((po) => (
                  <tr key={po.id}>
                    <td className="py-3 px-4 font-mono font-bold text-[#732662]">{po.code}</td>
                    <td className="py-3 px-4 text-[#5B403D]">{po.date}</td>
                    <td className="py-3 px-4 font-semibold">{po.supplierName}</td>
                    <td className="py-3 px-4">{po.items.map((i) => `${i.materialName} (${i.quantity} ${i.unit})`).join(', ')}</td>
                    <td className="py-3 px-4 text-right font-extrabold text-[#0B1C30]">
                      Rp {po.totalAmount.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D]">
                        {po.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}

