'use client';

import React, { useState } from 'react';
import AppShell from '../../components/AppShell';
import { useApp } from '../../lib/context';
import {
  IconRecipe,
  IconPlus,
  IconFinance,
  IconClose,
} from '../../components/Icons';

export default function ManajemenResepPage() {
  const { recipes, products, rawMaterials } = useApp();
  const [selectedRecipeId, setSelectedRecipeId] = useState(recipes[0]?.id || '');

  const activeRecipe = recipes.find((r) => r.id === selectedRecipeId) || recipes[0];
  const linkedProduct = products.find((p) => p.id === activeRecipe?.productId);

  // Total cost of all ingredients in the recipe
  const totalBatchCost = activeRecipe
    ? activeRecipe.ingredients.reduce((sum, ing) => sum + ing.amount * ing.unitCost, 0)
    : 0;

  const hppPerPortion = activeRecipe && activeRecipe.yieldPortions > 0
    ? Math.round(totalBatchCost / activeRecipe.yieldPortions)
    : 0;

  const sellingPrice = linkedProduct ? linkedProduct.price : 6000;
  const marginRp = sellingPrice - hppPerPortion;
  const marginPercent = sellingPrice > 0 ? Math.round((marginRp / sellingPrice) * 100) : 0;

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#833E17] uppercase tracking-wider">
                Data Master & Keuangan
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30] tracking-tight">
              Manajemen Resep & Perhitungan HPP
            </h2>
            <p className="text-sm text-[#5B403D]">
              Komposisi takaran bahan baku per batch produksi untuk menghitung Harga Pokok Penjualan (HPP) akurat.
            </p>
          </div>
        </div>

        {/* Recipe Selection Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {recipes.map((rcp) => (
            <button
              key={rcp.id}
              onClick={() => setSelectedRecipeId(rcp.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
                activeRecipe?.id === rcp.id
                  ? 'bg-[#732662] text-white shadow-xs'
                  : 'bg-white text-[#475569] border border-[#CBD5E1] hover:bg-[#FFF7ED]'
              }`}
            >
              {rcp.productName}
            </button>
          ))}
        </div>

        {/* Recipe Breakdown Card */}
        {activeRecipe && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Ingredients Table (8 cols) */}
            <div className="lg:col-span-8 p-6 rounded-2xl bg-white border border-[#CBD5E1] shadow-card space-y-4">
              <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
                <div>
                  <h3 className="font-bold text-base text-[#0B1C30]">
                    Daftar Takaran Bahan Mentah ({activeRecipe.productName})
                  </h3>
                  <p className="text-xs text-[#5B403D]">
                    Estimasi 1 batch menghasilkan: <strong>{activeRecipe.yieldPortions} porsi</strong>
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#FAF7F2] border-b border-[#CBD5E1] text-[#5B403D]">
                    <tr>
                      <th className="py-2.5 px-3 font-bold">Bahan Baku</th>
                      <th className="py-2.5 px-3 font-bold text-center">Takaran Pemakaian</th>
                      <th className="py-2.5 px-3 font-bold text-right">Biaya Satuan</th>
                      <th className="py-2.5 px-3 font-bold text-right">Total Biaya Komponen</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F5F9]">
                    {activeRecipe.ingredients.map((ing, idx) => {
                      const costContribution = ing.amount * ing.unitCost;
                      return (
                        <tr key={idx} className="hover:bg-[#FFF7ED]/50 transition-colors">
                          <td className="py-3 px-3 font-bold text-[#0B1C30]">
                            {ing.materialName}
                          </td>
                          <td className="py-3 px-3 text-center font-mono font-semibold text-[#732662]">
                            {ing.amount} {ing.unit}
                          </td>
                          <td className="py-3 px-3 text-right text-[#5B403D]">
                            Rp {ing.unitCost.toLocaleString('id-ID')} / {ing.unit}
                          </td>
                          <td className="py-3 px-3 text-right font-extrabold text-[#0B1C30]">
                            Rp {costContribution.toLocaleString('id-ID')}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot className="bg-[#FAF7F2] font-bold border-t border-[#CBD5E1]">
                    <tr>
                      <td colSpan={3} className="py-3 px-3 text-right text-[#0B1C30]">
                        Total Biaya Bahan 1 Batch ({activeRecipe.yieldPortions} Porsi):
                      </td>
                      <td className="py-3 px-3 text-right text-[#732662] font-extrabold text-base">
                        Rp {totalBatchCost.toLocaleString('id-ID')}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Right: HPP & Profit Margin Summary Card (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-6 rounded-2xl bg-white border border-[#CBD5E1] shadow-card space-y-4">
                <div className="flex items-center gap-2 border-b border-[#F1F5F9] pb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#DCFCE7] text-[#15803D] flex items-center justify-center">
                    <IconFinance size={18} />
                  </div>
                  <h3 className="font-bold text-base text-[#0B1C30]">
                    Kalkulasi HPP & Margin Laba
                  </h3>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-1 border-b border-[#F1F5F9]">
                    <span className="text-[#5B403D]">Harga Jual Konsumen:</span>
                    <strong className="text-[#0B1C30] font-mono text-base">
                      Rp {sellingPrice.toLocaleString('id-ID')}
                    </strong>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-[#F1F5F9]">
                    <span className="text-[#5B403D]">HPP per Porsi (Modal):</span>
                    <strong className="text-[#BA1A1A] font-mono text-base">
                      Rp {hppPerPortion.toLocaleString('id-ID')}
                    </strong>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-[#F1F5F9]">
                    <span className="text-[#5B403D]">Keuntungan Kotor / Porsi:</span>
                    <strong className="text-[#15803D] font-mono text-base">
                      Rp {marginRp.toLocaleString('id-ID')}
                    </strong>
                  </div>

                  <div className="flex justify-between items-center py-2 bg-[#DCFCE7]/60 p-3 rounded-xl border border-[#16A34A]/20">
                    <span className="font-bold text-[#15803D]">Gross Profit Margin:</span>
                    <span className="font-extrabold text-lg text-[#15803D]">
                      {marginPercent}%
                    </span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-[#5B403D] leading-relaxed">
                  💡 HPP dihitung otomatis dari fluktuasi harga bahan baku pada modul pengadaan. Menjaga harga jual tetap menguntungkan.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

