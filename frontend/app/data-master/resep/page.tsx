'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppShell from '../../components/AppShell';
import { useApp } from '../../lib/context';
import {
  IconRecipe,
  IconPlus,
  IconFinance,
  IconClose,
  IconTrash,
} from '../../components/Icons';

interface IngredientRow {
  materialId: string;
  materialName: string;
  amount: number;
  unit: string;
  unitCost: number;
}

export default function ManajemenResepPage() {
  const { recipes, products, rawMaterials, addRecipe } = useApp();
  const [selectedRecipeId, setSelectedRecipeId] = useState(recipes[0]?.id || '');

  // Modal form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [yieldPortions, setYieldPortions] = useState(20);
  const [ingredients, setIngredients] = useState<IngredientRow[]>([]);

  // Ingredient row temporary state
  const [tempMaterialId, setTempMaterialId] = useState(rawMaterials[0]?.id || '');
  const [tempAmount, setTempAmount] = useState<number>(1);

  const activeRecipe = recipes.find((r) => r.id === selectedRecipeId) || recipes[0];
  const linkedProduct = products.find((p) => p.id === activeRecipe?.productId);

  // Total cost of all ingredients in the recipe
  const totalBatchCost = activeRecipe
    ? activeRecipe.ingredients.reduce((sum, ing) => sum + ing.amount * ing.unitCost, 0)
    : 0;

  const hppPerPortion =
    activeRecipe && activeRecipe.yieldPortions > 0
      ? Math.round(totalBatchCost / activeRecipe.yieldPortions)
      : 0;

  const sellingPrice = linkedProduct ? linkedProduct.price : 6000;
  const marginRp = sellingPrice - hppPerPortion;
  const marginPercent = sellingPrice > 0 ? Math.round((marginRp / sellingPrice) * 100) : 0;

  const handleOpenAddModal = () => {
    setSelectedProductId(products[0]?.id || '');
    setYieldPortions(20);
    setIngredients([]);
    setTempMaterialId(rawMaterials[0]?.id || '');
    setTempAmount(1);
    setIsModalOpen(true);
  };

  const handleAddIngredient = () => {
    const mat = rawMaterials.find((m) => m.id === tempMaterialId);
    if (!mat || tempAmount <= 0) return;

    setIngredients((prev) => [
      ...prev,
      {
        materialId: mat.id,
        materialName: mat.name,
        amount: Number(tempAmount),
        unit: mat.unit,
        unitCost: mat.unitCost,
      },
    ]);
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSaveRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    const prod = products.find((p) => p.id === selectedProductId);
    const productName = prod ? prod.name : 'Varian Baru';

    if (ingredients.length === 0) {
      alert('Tambahkan minimal 1 bahan baku ke dalam resep!');
      return;
    }

    const totalCost = ingredients.reduce((sum, ing) => sum + ing.amount * ing.unitCost, 0);
    const portions = Number(yieldPortions) > 0 ? Number(yieldPortions) : 1;
    const estimatedHppPerPortion = Math.round(totalCost / portions);

    addRecipe({
      productId: selectedProductId,
      productName,
      yieldPortions: portions,
      ingredients: ingredients.map((ing) => ({
        materialId: ing.materialId || 'raw-custom',
        materialName: ing.materialName,
        amount: ing.amount,
        unit: ing.unit,
        unitCost: ing.unitCost,
      })),
      estimatedHppPerPortion,
    });

    setIsModalOpen(false);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#833E17] uppercase tracking-wider">
                Data Master &amp; Keuangan
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30] tracking-tight">
              Manajemen Resep &amp; Perhitungan HPP
            </h2>
            <p className="text-sm text-[#5B403D]">
              Komposisi takaran bahan baku per batch produksi untuk menghitung Harga Pokok Penjualan (HPP) akurat.
            </p>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="btn-primary text-xs sm:text-sm self-start sm:self-auto"
          >
            <IconPlus size={16} />
            <span>Tambah Resep Baru</span>
          </button>
        </div>

        {/* Recipe Selection Tabs */}
        {recipes.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {recipes.map((rcp) => (
              <button
                key={rcp.id}
                onClick={() => setSelectedRecipeId(rcp.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${activeRecipe?.id === rcp.id
                    ? 'bg-[#732662] text-white shadow-xs'
                    : 'bg-white text-[#475569] border border-[#CBD5E1] hover:bg-[#FFF7ED]'
                  }`}
              >
                {rcp.productName}
              </button>
            ))}
          </div>
        )}

        {/* Recipe Breakdown Card or Empty State */}
        {activeRecipe ? (
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
                    Kalkulasi HPP &amp; Margin Laba
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
        ) : (
          <div className="p-12 rounded-2xl bg-white border border-[#CBD5E1] shadow-card text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#E5EEFF] text-[#A24F9D] inline-flex items-center justify-center">
              <IconRecipe size={32} />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#0B1C30]">Belum Ada Resep Produk</h3>
              <p className="text-xs text-[#5B403D] max-w-md mx-auto">
                Susun formula komposisi takaran bahan baku untuk produk Anda agar sistem dapat menghitung HPP (Harga Pokok Penjualan) secara otomatis dan akurat.
              </p>
            </div>
            <button
              onClick={handleOpenAddModal}
              className="btn-primary text-xs sm:text-sm inline-flex items-center gap-1.5"
            >
              <IconPlus size={16} />
              <span>Buat Resep Pertama</span>
            </button>
          </div>
        )}

        {/* Modal Tambah Resep Baru */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-alert border border-[#CBD5E1] p-6 space-y-4 animate-scale-in max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <h3 className="text-base font-bold text-[#0B1C30]">Tambah Formula Resep Baru</h3>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-[#5B403D] hover:text-[#0B1C30]"
                >
                  <IconClose size={20} />
                </button>
              </div>

              {products.length === 0 ? (
                <div className="py-6 text-center space-y-3">
                  <p className="text-sm text-[#BA1A1A] font-semibold">
                    Belum ada produk yang terdaftar di sistem.
                  </p>
                  <p className="text-xs text-[#5B403D]">
                    Silakan tambahkan data produk terlebih dahulu di menu Data Produk sebelum membuat resep.
                  </p>
                  <Link
                    href="/data-master/produk"
                    className="inline-block btn-primary text-xs font-bold"
                  >
                    Buka Data Produk
                  </Link>
                </div>
              ) : rawMaterials.length === 0 ? (
                <div className="py-6 text-center space-y-3">
                  <p className="text-sm text-[#BA1A1A] font-semibold">
                    Belum ada bahan baku yang terdaftar di sistem.
                  </p>
                  <p className="text-xs text-[#5B403D]">
                    Silakan tambahkan bahan baku terlebih dahulu agar dapat dipilih sebagai takaran resep.
                  </p>
                  <Link
                    href="/data-master/bahan-baku"
                    className="inline-block btn-primary text-xs font-bold"
                  >
                    Buka Data Bahan Baku
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSaveRecipe} className="space-y-4 text-xs sm:text-sm">
                  <div>
                    <label className="block font-bold text-[#334155] mb-1">Pilih Produk *</label>
                    <select
                      value={selectedProductId}
                      onChange={(e) => setSelectedProductId(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] font-semibold text-[#0B1C30]"
                    >
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.sku})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-[#334155] mb-1">
                      Hasil Jadi 1 Batch (Porsi / Bungkus) *
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={yieldPortions}
                      onChange={(e) => setYieldPortions(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1]"
                    />
                  </div>

                  {/* Add Ingredient Section */}
                  <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#CBD5E1] space-y-2">
                    <span className="font-bold text-[#0B1C30] block">Tambah Bahan Baku:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-end">
                      <div className="sm:col-span-6">
                        <label className="block text-[11px] text-[#5B403D] mb-0.5">Bahan Baku</label>
                        <select
                          value={tempMaterialId}
                          onChange={(e) => setTempMaterialId(e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-[#CBD5E1] text-xs font-semibold"
                        >
                          {rawMaterials.map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.name} ({m.unit} - Rp {m.unitCost.toLocaleString('id-ID')})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block text-[11px] text-[#5B403D] mb-0.5">Takaran</label>
                        <input
                          type="number"
                          step="any"
                          min={0.01}
                          value={tempAmount}
                          onChange={(e) => setTempAmount(Number(e.target.value))}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-[#CBD5E1] text-xs"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <button
                          type="button"
                          onClick={handleAddIngredient}
                          className="w-full py-1.5 bg-[#732662] hover:bg-[#5b1e4e] text-white rounded-lg text-xs font-bold transition-colors"
                        >
                          + Tambah
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Ingredients Table in Form */}
                  {ingredients.length > 0 && (
                    <div className="border border-[#CBD5E1] rounded-xl overflow-hidden">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#FAF7F2] text-[#5B403D]">
                          <tr>
                            <th className="py-2 px-3">Bahan</th>
                            <th className="py-2 px-3 text-center">Takaran</th>
                            <th className="py-2 px-3 text-right">Biaya/unit</th>
                            <th className="py-2 px-3 text-center">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F1F5F9]">
                          {ingredients.map((ing, idx) => (
                            <tr key={idx}>
                              <td className="py-2 px-3 font-semibold text-[#0B1C30]">
                                {ing.materialName}
                              </td>
                              <td className="py-2 px-3 text-center font-mono">
                                {ing.amount} {ing.unit}
                              </td>
                              <td className="py-2 px-3 text-right">
                                Rp {(ing.amount * ing.unitCost).toLocaleString('id-ID')}
                              </td>
                              <td className="py-2 px-3 text-center">
                                <button
                                  type="button"
                                  onClick={() => handleRemoveIngredient(idx)}
                                  className="text-[#BA1A1A] hover:underline"
                                >
                                  <IconTrash size={14} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  <div className="flex justify-end gap-2 pt-2 border-t border-[#F1F5F9]">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 rounded-xl border border-[#CBD5E1] text-[#5B403D] hover:bg-[#FAF7F2] font-bold text-xs"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="btn-primary text-xs font-bold"
                    >
                      Simpan Resep
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
