'use client';

import React from 'react';
import AppShell from '../../components/AppShell';
import { useApp } from '../../lib/context';
import { IconPrint } from '../../components/Icons';

export default function LaporanPersediaanPage() {
  const { rawMaterials, products } = useApp();

  const totalRawAsset = rawMaterials.reduce((sum, m) => sum + m.stock * m.unitCost, 0);
  const totalProductAsset = products.reduce((sum, p) => sum + p.stock * p.baseCost, 0);
  const totalValuation = totalRawAsset + totalProductAsset;

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#833E17] uppercase tracking-wider">
                Laporan Persediaan
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30] tracking-tight">
              Laporan Nilai Persediaan (Valuasi Stok)
            </h2>
            <p className="text-sm text-[#5B403D]">
              Valuasi aset persediaan bahan baku di gudang dan produk jadi di etalase gerai.
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="btn-secondary text-xs sm:text-sm self-start sm:self-auto font-bold"
          >
            <IconPrint size={16} />
            <span>Cetak Valuasi</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#CBD5E1] shadow-card">
            <span className="text-[11px] font-bold uppercase text-[#5B403D] block mb-1">
              Valuasi Bahan Baku Gudang
            </span>
            <div className="text-2xl font-extrabold text-[#0B1C30]">
              Rp {totalRawAsset.toLocaleString('id-ID')}
            </div>
            <span className="text-xs text-[#5B403D] mt-1 block">
              {rawMaterials.length} Jenis Bahan Baku
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#CBD5E1] shadow-card">
            <span className="text-[11px] font-bold uppercase text-[#5B403D] block mb-1">
              Valuasi Produk Jadi (HPP)
            </span>
            <div className="text-2xl font-extrabold text-[#0B1C30]">
              Rp {totalProductAsset.toLocaleString('id-ID')}
            </div>
            <span className="text-xs text-[#5B403D] mt-1 block">
              {products.length} Varian Menu Etalase
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#CBD5E1] shadow-card">
            <span className="text-[11px] font-bold uppercase text-[#5B403D] block mb-1">
              Total Valuasi Aset Inventaris
            </span>
            <div className="text-2xl font-extrabold text-[#732662]">
              Rp {totalValuation.toLocaleString('id-ID')}
            </div>
            <span className="text-xs text-[#15803D] font-bold mt-1 block">
              Aset Likuid Berjalan
            </span>
          </div>
        </div>

        {/* Raw Material Inventory Table */}
        <div className="rounded-2xl bg-white border border-[#CBD5E1] shadow-card overflow-hidden">
          <div className="p-4 border-b border-[#F1F5F9] font-bold text-sm text-[#0B1C30]">
            Rincian Stok Bahan Baku
          </div>
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#FAF7F2] border-b border-[#CBD5E1] text-[#5B403D]">
              <tr>
                <th className="py-2.5 px-4 font-bold">Kode</th>
                <th className="py-2.5 px-4 font-bold">Nama Bahan</th>
                <th className="py-2.5 px-4 font-bold text-center">Stok Fisik</th>
                <th className="py-2.5 px-4 font-bold text-right">Biaya Satuan</th>
                <th className="py-2.5 px-4 font-bold text-right">Total Nilai Aset</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {rawMaterials.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-[#5B403D]">
                    Belum ada data bahan baku terdaftar di gudang.
                  </td>
                </tr>
              ) : (
                rawMaterials.map((m) => (
                  <tr key={m.id}>
                    <td className="py-3 px-4 font-mono font-bold text-[#732662]">{m.code}</td>
                    <td className="py-3 px-4 font-bold text-[#0B1C30]">{m.name}</td>
                    <td className="py-3 px-4 text-center font-semibold">{m.stock} {m.unit}</td>
                    <td className="py-3 px-4 text-right">Rp {m.unitCost.toLocaleString('id-ID')}</td>
                    <td className="py-3 px-4 text-right font-bold text-[#0B1C30]">
                      Rp {Math.round(m.stock * m.unitCost).toLocaleString('id-ID')}
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

