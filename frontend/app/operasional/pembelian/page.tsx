'use client';

import React, { useState } from 'react';
import AppShell from '../../components/AppShell';
import { useApp } from '../../lib/context';
import {
  IconPlus,
  IconClose,
  IconCheckCircle,
} from '../../components/Icons';

export default function PembelianPengadaanPage() {
  const { suppliers, rawMaterials, procurementOrders, addProcurementOrder } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(suppliers[0]?.name || '');
  const [selectedMaterial, setSelectedMaterial] = useState(rawMaterials[0]?.name || '');
  const [quantity, setQuantity] = useState(25);
  const [unitPrice, setUnitPrice] = useState(12500);

  const activeMaterial = rawMaterials.find((m) => m.name === selectedMaterial) || rawMaterials[0];
  const unit = activeMaterial ? activeMaterial.unit : 'kg';
  const totalCost = quantity * unitPrice;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProcurementOrder(selectedSupplier, [
      {
        materialName: selectedMaterial,
        quantity: Number(quantity),
        unit,
        price: Number(unitPrice),
      },
    ]);
    setIsModalOpen(false);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#833E17] uppercase tracking-wider">
                Operasional & Pengadaan
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30] tracking-tight">
              Pembelian & Pengadaan Bahan Baku
            </h2>
            <p className="text-sm text-[#5B403D]">
              Input faktur pembelian bahan mentah dari pemasok. Stok fisik bahan baku akan otomatis bertambah.
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedSupplier(suppliers[0]?.name || '');
              setSelectedMaterial(rawMaterials[0]?.name || '');
              setUnitPrice(rawMaterials[0]?.unitCost || 15000);
              setIsModalOpen(true);
            }}
            className="btn-primary text-xs sm:text-sm self-start sm:self-auto"
          >
            <IconPlus size={16} />
            <span>Buat Order Pengadaan</span>
          </button>
        </div>

        {/* Procurement Orders Table */}
        <div className="rounded-2xl bg-white border border-[#CBD5E1] shadow-card overflow-hidden">
          <div className="p-4 border-b border-[#F1F5F9] flex items-center justify-between">
            <h3 className="font-bold text-sm text-[#0B1C30]">
              Riwayat Transaksi Pengadaan Bahan
            </h3>
            <span className="text-xs text-[#5B403D]">
              Total: {procurementOrders.length} Pembelian
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#FAF7F2] border-b border-[#CBD5E1] text-[#5B403D]">
                <tr>
                  <th className="py-3 px-4 font-bold">No. Order</th>
                  <th className="py-3 px-4 font-bold">Tanggal</th>
                  <th className="py-3 px-4 font-bold">Pemasok</th>
                  <th className="py-3 px-4 font-bold">Bahan Masuk</th>
                  <th className="py-3 px-4 font-bold text-right">Total Biaya</th>
                  <th className="py-3 px-4 font-bold text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {procurementOrders.map((po) => (
                  <tr key={po.id} className="hover:bg-[#FFF7ED]/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#732662]">
                      {po.code}
                    </td>
                    <td className="py-3.5 px-4 text-[#5B403D]">
                      {po.date}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#0B1C30]">
                      {po.supplierName}
                    </td>
                    <td className="py-3.5 px-4 text-[#0B1C30]">
                      {po.items.map((it, idx) => (
                        <span key={idx}>
                          {it.materialName} ({it.quantity} {it.unit} @ Rp {it.price.toLocaleString('id-ID')})
                        </span>
                      ))}
                    </td>
                    <td className="py-3.5 px-4 text-right font-extrabold text-[#0B1C30]">
                      Rp {po.totalAmount.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D]">
                        <IconCheckCircle size={12} />
                        <span>{po.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Buat Order Pengadaan */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-alert border border-[#CBD5E1] p-6 space-y-4 animate-scale-in">
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <h3 className="text-lg font-bold text-[#0B1C30]">
                  Formulir Pengadaan Bahan Baku
                </h3>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-[#5B403D] hover:text-[#0B1C30]"
                >
                  <IconClose size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-1">
                    Pilih Mitra Supplier *
                  </label>
                  <select
                    value={selectedSupplier}
                    onChange={(e) => setSelectedSupplier(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] text-xs text-[#0B1C30]"
                  >
                    {suppliers.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name} ({s.contactPerson})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-1">
                    Pilih Bahan Baku yang Dibeli *
                  </label>
                  <select
                    value={selectedMaterial}
                    onChange={(e) => {
                      const matName = e.target.value;
                      setSelectedMaterial(matName);
                      const m = rawMaterials.find((item) => item.name === matName);
                      if (m) setUnitPrice(m.unitCost);
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] text-xs text-[#0B1C30]"
                  >
                    {rawMaterials.map((m) => (
                      <option key={m.id} value={m.name}>
                        {m.name} (Stok Saat Ini: {m.stock} {m.unit})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#334155] mb-1">
                      Jumlah Pembelian ({unit}) *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      min={0.1}
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] text-xs text-[#0B1C30]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#334155] mb-1">
                      Harga Satuan Beli (Rp) *
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={unitPrice}
                      onChange={(e) => setUnitPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] text-xs text-[#0B1C30]"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#CBD5E1] flex justify-between items-center text-xs">
                  <span className="font-bold text-[#5B403D]">Total Estimasi Pembelian:</span>
                  <span className="text-base font-extrabold text-[#732662]">
                    Rp {totalCost.toLocaleString('id-ID')}
                  </span>
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-[#F1F5F9]">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn-secondary text-xs"
                  >
                    Batal
                  </button>
                  <button type="submit" className="btn-primary text-xs">
                    Konfirmasi Masuk Stok
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

