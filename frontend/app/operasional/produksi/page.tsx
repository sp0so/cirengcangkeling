'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppShell from '../../components/AppShell';
import { useApp } from '../../lib/context';
import {
  IconPlus,
  IconClose,
  IconCheckCircle,
  IconOperasional,
} from '../../components/Icons';

export default function ProduksiPage() {
  const { products, recipes, productionOrders, addProductionOrder } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [targetQuantity, setTargetQuantity] = useState(30);
  const [notes, setNotes] = useState('Produksi batch harian outlet');

  const activeProduct = products.find((p) => p.id === selectedProductId) || products[0];
  const activeRecipe = recipes.find((r) => r.productId === selectedProductId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProductionOrder(selectedProductId, Number(targetQuantity), notes);
    setIsModalOpen(false);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#833E17] uppercase tracking-wider">
                Operasional Produksi
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30] tracking-tight">
              Manajemen Produksi Cireng
            </h2>
            <p className="text-sm text-[#5B403D]">
              Pencatatan batch pembuatan cireng siap saji & kemasan frozen. Stok produk jadi akan otomatis bertambah saat batch selesai.
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedProductId(products[0]?.id || '');
              setTargetQuantity(25);
              setIsModalOpen(true);
            }}
            className="btn-primary text-xs sm:text-sm self-start sm:self-auto"
          >
            <IconPlus size={16} />
            <span>Mulai Batch Produksi</span>
          </button>
        </div>

        {/* Production Batches Table */}
        <div className="rounded-2xl bg-white border border-[#CBD5E1] shadow-card overflow-hidden">
          <div className="p-4 border-b border-[#F1F5F9] flex items-center justify-between">
            <h3 className="font-bold text-sm text-[#0B1C30]">
              Riwayat Batch Produksi OUTLET
            </h3>
            <span className="text-xs text-[#5B403D]">
              Total: {productionOrders.length} Batch Selesai
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#FAF7F2] border-b border-[#CBD5E1] text-[#5B403D]">
                <tr>
                  <th className="py-3 px-4 font-bold">No. Batch</th>
                  <th className="py-3 px-4 font-bold">Waktu Produksi</th>
                  <th className="py-3 px-4 font-bold">Menu / Varian</th>
                  <th className="py-3 px-4 font-bold text-center">Jumlah Dihasilkan</th>
                  <th className="py-3 px-4 font-bold">Keterangan</th>
                  <th className="py-3 px-4 font-bold text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {productionOrders.length > 0 ? (
                  productionOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#FFF7ED]/50 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#732662]">
                        {ord.code}
                      </td>
                      <td className="py-3.5 px-4 text-[#5B403D]">
                        {ord.date}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#0B1C30]">
                        {ord.productName}
                      </td>
                      <td className="py-3.5 px-4 text-center font-extrabold text-[#15803D]">
                        +{ord.targetQuantity} porsi
                      </td>
                      <td className="py-3.5 px-4 text-[#5B403D]">
                        {ord.notes || '-'}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D]">
                          <IconCheckCircle size={12} />
                          <span>{ord.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-[#5B403D]">
                      <p className="font-bold text-[14px] text-[#0B1C30]">Belum ada batch produksi yang dicatat</p>
                      <p className="text-[12px] text-[#5B403D] mt-1">
                        Klik tombol &quot;Mulai Batch Produksi&quot; di atas saat dapur selesai mengolah cireng.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Buat Batch Produksi */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-alert border border-[#CBD5E1] p-6 space-y-4 animate-scale-in">
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <h3 className="text-lg font-bold text-[#0B1C30]">
                  Jadwalkan Batch Produksi Baru
                </h3>
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
                    Belum ada varian produk yang terdaftar.
                  </p>
                  <p className="text-xs text-[#5B403D]">
                    Silakan tambahkan data produk terlebih dahulu agar dapat dijadwalkan dalam batch produksi.
                  </p>
                  <Link
                    href="/data-master/produk"
                    className="inline-block btn-primary text-xs font-bold"
                  >
                    Buka Data Produk
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-1">
                    Pilih Menu yang Diproduksi *
                  </label>
                  <select
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] text-xs text-[#0B1C30]"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} (Stok Saat Ini: {p.stock} {p.unit})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-1">
                    Target Jumlah Produk Jadi ({activeProduct?.unit || 'porsi'}) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={targetQuantity}
                    onChange={(e) => setTargetQuantity(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] text-xs text-[#0B1C30]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-1">
                    Catatan Produksi
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Batch gorengan pagi / stok frozen freezer"
                    className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] text-xs text-[#0B1C30]"
                  />
                </div>

                {activeRecipe && (
                  <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#CBD5E1] text-xs space-y-1.5">
                    <span className="font-bold text-[#0B1C30] block">
                      Estimasi Kebutuhan Bahan (Berdasarkan Resep):
                    </span>
                    <ul className="list-disc pl-4 text-[#5B403D] space-y-0.5">
                      {activeRecipe.ingredients.map((ing, i) => (
                        <li key={i}>
                          {ing.materialName}: ~{((ing.amount * targetQuantity) / activeRecipe.yieldPortions).toFixed(2)} {ing.unit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-3 flex justify-end gap-2 border-t border-[#F1F5F9]">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn-secondary text-xs"
                  >
                    Batal
                  </button>
                  <button type="submit" className="btn-primary text-xs">
                    Selesaikan & Tambah Stok
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

