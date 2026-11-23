'use client';

import React from 'react';
import Link from 'next/link';
import AppShell from '../../components/AppShell';
import { useApp } from '../../lib/context';
import {
  IconFinance,
  IconRecipe,
  IconArrowUp,
} from '../../components/Icons';

export default function PerhitunganHppPage() {
  const { products, recipes } = useApp();

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#833E17] uppercase tracking-wider">
                Keuangan & Biaya Pokok
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30] tracking-tight">
              Perhitungan Harga Pokok Produksi (HPP)
            </h2>
            <p className="text-sm text-[#5B403D]">
              Analisis struktur biaya bahan mentah dan margin laba kotor per porsi produk Cireng Cangkeling.
            </p>
          </div>

          <Link
            href="/data-master/resep"
            className="btn-primary text-xs sm:text-sm self-start sm:self-auto"
          >
            <IconRecipe size={16} />
            <span>Kelola Komposisi Resep</span>
          </Link>
        </div>

        {/* Estimation Notice as per design.md Section 6.1.6 */}
        <div className="p-4 rounded-2xl bg-[#FEF3C7] border border-[#F59E0B]/30 text-xs text-[#92400E] flex items-start gap-3">
          <span className="text-base">⚠️</span>
          <div>
            <span className="font-bold block">Pemberitahuan Estimasi Biaya (PRD & SRS Compliance):</span>
            <p className="mt-0.5 leading-relaxed">
              Kalkulasi HPP di bawah merupakan <em>estimasi dinamis</em> berdasarkan harga pembelian bahan baku terakhir dan standar takaran resep. Biaya tenaga kerja langsung dan overhead gas/listrik dihitung secara terpisah.
            </p>
          </div>
        </div>

        {/* HPP Table */}
        <div className="rounded-2xl bg-white border border-[#CBD5E1] shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#FAF7F2] border-b border-[#CBD5E1] text-[#5B403D]">
                <tr>
                  <th className="py-3 px-4 font-bold">Kode SKU</th>
                  <th className="py-3 px-4 font-bold">Nama Menu</th>
                  <th className="py-3 px-4 font-bold">Kategori</th>
                  <th className="py-3 px-4 font-bold text-right">Harga Jual</th>
                  <th className="py-3 px-4 font-bold text-right">Estimasi HPP (Modal)</th>
                  <th className="py-3 px-4 font-bold text-right">Gross Margin (Rp)</th>
                  <th className="py-3 px-4 font-bold text-center">Margin (%)</th>
                  <th className="py-3 px-4 font-bold text-center">Kesehatan Margin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {products.map((prod) => {
                  const grossMargin = prod.price - prod.baseCost;
                  const marginPct = prod.price > 0 ? Math.round((grossMargin / prod.price) * 100) : 0;
                  const isHealthy = marginPct >= 45;

                  return (
                    <tr key={prod.id} className="hover:bg-[#FFF7ED]/50 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#732662]">
                        {prod.sku}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#0B1C30]">
                        {prod.name}
                      </td>
                      <td className="py-3.5 px-4 text-[#5B403D]">
                        {prod.categoryName}
                      </td>
                      <td className="py-3.5 px-4 text-right font-extrabold text-[#0B1C30]">
                        Rp {prod.price.toLocaleString('id-ID')}
                      </td>
                      <td className="py-3.5 px-4 text-right font-semibold text-[#BA1A1A]">
                        Rp {prod.baseCost.toLocaleString('id-ID')}
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-[#15803D]">
                        +Rp {grossMargin.toLocaleString('id-ID')}
                      </td>
                      <td className="py-3.5 px-4 text-center font-extrabold text-[#0B1C30]">
                        {marginPct}%
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                            isHealthy
                              ? 'bg-[#DCFCE7] text-[#15803D]'
                              : 'bg-[#FEF3C7] text-[#92400E]'
                          }`}
                        >
                          {isHealthy ? 'Sangat Sehat (>45%)' : 'Moderat (<45%)'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

