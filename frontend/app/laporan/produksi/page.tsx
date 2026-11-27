'use client';

import React from 'react';
import AppShell from '../../components/AppShell';
import { useApp } from '../../lib/context';
import { IconPrint } from '../../components/Icons';

export default function LaporanProduksiPage() {
  const { productionOrders } = useApp();
  const totalProduced = productionOrders.reduce((sum, p) => sum + p.targetQuantity, 0);

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#833E17] uppercase tracking-wider">
                Laporan Produksi
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30] tracking-tight">
              Laporan Hasil Batch Produksi
            </h2>
            <p className="text-sm text-[#5B403D]">
              Rekapitulasi batch pembuatan cireng siap goreng dan kemasan frozen di OUTLET.
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
          <span>Total Batch Produksi: <strong>{productionOrders.length} Batch Selesai</strong></span>
          <span className="text-base font-extrabold text-[#15803D]">
            +{totalProduced} Porsi Dihasilkan
          </span>
        </div>

        <div className="rounded-2xl bg-white border border-[#CBD5E1] shadow-card overflow-hidden">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#FAF7F2] border-b border-[#CBD5E1] text-[#5B403D]">
              <tr>
                <th className="py-3 px-4 font-bold">No. Batch</th>
                <th className="py-3 px-4 font-bold">Waktu</th>
                <th className="py-3 px-4 font-bold">Menu / Varian</th>
                <th className="py-3 px-4 font-bold text-center">Jumlah Dihasilkan</th>
                <th className="py-3 px-4 font-bold">Catatan</th>
                <th className="py-3 px-4 font-bold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {productionOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-[#5B403D]">
                    Belum ada riwayat batch produksi yang tercatat.
                  </td>
                </tr>
              ) : (
                productionOrders.map((ord) => (
                  <tr key={ord.id}>
                    <td className="py-3 px-4 font-mono font-bold text-[#732662]">{ord.code}</td>
                    <td className="py-3 px-4 text-[#5B403D]">{ord.date}</td>
                    <td className="py-3 px-4 font-bold text-[#0B1C30]">{ord.productName}</td>
                    <td className="py-3 px-4 text-center font-bold text-[#15803D]">
                      +{ord.targetQuantity} porsi
                    </td>
                    <td className="py-3 px-4 text-[#5B403D]">{ord.notes || '-'}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D]">
                        {ord.status}
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

