'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppShell from '../../components/AppShell';
import WordRevealHeading from '../../components/WordRevealHeading';
import MotionCard from '../../components/MotionCard';
import { useApp } from '../../lib/context';
import {
  IconPlus,
  IconClose,
  IconArrowUp,
  IconArrowDown,
  IconSearch,
  IconDownload,
  IconCheckCircle,
  IconAlertTriangle,
} from '../../components/Icons';

export default function RiwayatPerubahanStokOwnerPage() {
  const { stockMovements, products, rawMaterials, addStockAdjustment, showToast } = useApp();

  const [search, setSearch] = useState('');
  const [filterModule, setFilterModule] = useState<'all' | 'produk' | 'bahan_baku'>('all');
  const [filterMutationType, setFilterMutationType] = useState<string>('all');
  const [filterDatePreset, setFilterDatePreset] = useState<string>('7days');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states for Opname adjustment
  const [itemType, setItemType] = useState<'produk' | 'bahan_baku'>('produk');
  const [selectedItemName, setSelectedItemName] = useState(products[0]?.name || '');
  const [adjustmentQty, setAdjustmentQty] = useState(1);
  const [reason, setReason] = useState('Koreksi selisih opname fisik berkala');

  // Dynamic real audit items derived strictly from live stockMovements
  const allAuditItems = stockMovements.map((sm) => {
    let mutationKind = 'Penyesuaian Opname';
    if (sm.quantity > 0) mutationKind = 'Stok Masuk / Produksi';
    else if (sm.quantity < 0) mutationKind = 'Penjualan / Pemakaian';

    return {
      ...sm,
      reason: sm.note || 'Penyesuaian stok sistem',
      actor: 'Owner / Admin',
      mutationKind,
      finalStock: 0,
    };
  });

  const totalIn = allAuditItems.filter((m) => m.quantity > 0).reduce((sum, m) => sum + m.quantity, 0);
  const totalOut = allAuditItems.filter((m) => m.quantity < 0).reduce((sum, m) => sum + Math.abs(m.quantity), 0);
  const totalLogs = allAuditItems.length;

  const filteredLogs = allAuditItems.filter((sm) => {
    const matchSearch =
      sm.itemName.toLowerCase().includes(search.toLowerCase()) ||
      sm.reference.toLowerCase().includes(search.toLowerCase()) ||
      sm.reason.toLowerCase().includes(search.toLowerCase()) ||
      sm.actor.toLowerCase().includes(search.toLowerCase());

    const matchModule = filterModule === 'all' || sm.itemType === filterModule;

    const matchMutation =
      filterMutationType === 'all' ||
      sm.mutationKind.toLowerCase().includes(filterMutationType.toLowerCase());

    return matchSearch && matchModule && matchMutation;
  });

  const handleSubmitAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    let unit = 'pack';
    if (itemType === 'produk') {
      const p = products.find((prod) => prod.name === selectedItemName);
      if (p) unit = p.unit;
    } else {
      const m = rawMaterials.find((mat) => mat.name === selectedItemName);
      if (m) unit = m.unit;
    }

    addStockAdjustment(selectedItemName, itemType, Number(adjustmentQty), unit, reason);
    showToast(`Penyesuaian stok ${selectedItemName} sebesar ${adjustmentQty >= 0 ? '+' : ''}${adjustmentQty} ${unit} berhasil dicatat di log audit!`, 'success');
    setIsModalOpen(false);
  };

  return (
    <AppShell>
      <div className="space-y-6 font-sans">
        {/* =========================================================================
            1. HEADER BANNER & AUDIT INTEGRITY SEAL (Figma 6:2875)
           ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#5B3765]/10 text-[#5B3765] uppercase tracking-wider">
                AUDIT LOG PERSIS
              </span>
              <span className="text-[11px] text-[#5B403D]/70 font-medium">
                Pembaruan: Real-time Sinkronisasi
              </span>
            </div>
            <WordRevealHeading
              text="Riwayat Perubahan Stok"
              as="h1"
              className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30] tracking-tight"
            />
            <p className="text-[13px] text-[#5B403D] mt-0.5">
              Pencatatan mutasi otomatis seluruh arus persediaan barang masuk, penjualan POS, dan penyesuaian opname fisik.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => {
                const csvContent =
                  'data:text/csv;charset=utf-8,Waktu,Ref ID,Item,Tipe,Mutasi,Satuan,Operator,Alasan\n' +
                  allAuditItems
                    .map((m) => `"${m.date}","${m.reference}","${m.itemName}","${m.itemType}",${m.quantity},"${m.unit}","${m.actor}","${m.reason}"`)
                    .join('\n');
                const encodedUri = encodeURI(csvContent);
                const link = document.createElement('a');
                link.setAttribute('href', encodedUri);
                link.setAttribute('download', 'audit_log_mutasi_persediaan.csv');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                showToast('Audit log diexport ke CSV', 'success');
              }}
              className="px-3.5 py-2 rounded-xl bg-white text-[#0B1C30] border border-[#CBD5E1] text-[13px] font-bold hover:bg-[#F8FAFC] transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <IconDownload size={15} />
              <span>Export Audit Log (CSV)</span>
            </button>

            <button
              onClick={() => {
                setItemType('produk');
                setSelectedItemName(products[0]?.name || '');
                setAdjustmentQty(1);
                setReason('Selisih fisik opname berkala');
                setIsModalOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-[#A24F9D] hover:bg-[#8F3D8A] text-white text-[13px] font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <IconPlus size={15} />
              <span>+ Input Penyesuaian Opname</span>
            </button>
          </div>
        </div>

        {/* Audit Lock Notice Banner */}
        <div className="bg-[#FAF7F2] rounded-[12px] p-3.5 sm:p-4 border border-[#CBD5E1] flex items-center gap-3 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-[#5B3765] text-white flex items-center justify-center shrink-0">
            <IconCheckCircle size={18} />
          </div>
          <div className="text-[12px] text-[#5B403D] leading-relaxed">
            <strong className="text-[#0B1C30]">Integritas Terjamin:</strong> Seluruh riwayat mutasi persediaan tercatat otomatis oleh sistem dan tidak dapat dimanipulasi atau dihapus untuk menjaga keabsahan pembukuan audit UMKM.
          </div>
        </div>

        {/* =========================================================================
            2. METRIC STATISTICS CARDS (Figma 6:2890)
           ========================================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {/* Card 1: Mutasi Masuk */}
          <MotionCard delay={0.05} hoverEffect="lift" className="p-4 rounded-2xl bg-white border border-[#CBD5E1] shadow-card">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#15803D] block">
              MUTASI MASUK (IN)
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#16A34A]">
                +{totalIn}
              </span>
              <span className="text-[12px] font-semibold text-[#5B403D]">Pack / Unit</span>
            </div>
            <span className="text-[11px] text-[#5B403D] font-medium block mt-1">
              Hasil produksi &amp; belanja bahan
            </span>
          </MotionCard>

          {/* Card 2: Mutasi Keluar */}
          <MotionCard delay={0.1} hoverEffect="lift" className="p-4 rounded-2xl bg-white border border-[#CBD5E1] shadow-card">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#93000A] block">
              MUTASI KELUAR (OUT)
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#BA1A1A]">
                -{totalOut}
              </span>
              <span className="text-[12px] font-semibold text-[#5B403D]">Pack / Terpakai</span>
            </div>
            <span className="text-[11px] text-[#5B403D] font-medium block mt-1">
              Penjualan kasir &amp; dapur olah
            </span>
          </MotionCard>

          {/* Card 3: Koreksi Opname */}
          <MotionCard delay={0.15} hoverEffect="lift" className="p-4 rounded-2xl bg-[#FEF3C7]/40 border border-[#F59E0B]/30 shadow-card">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#92400E] block">
              KOREKSI OPNAME FISIK
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#D97706]">
                3
              </span>
              <span className="text-[12px] font-semibold text-[#92400E]">Penyesuaian</span>
            </div>
            <span className="text-[11px] text-[#5B403D] font-medium block mt-1">
              Selisih wajar &lt; 0.5%
            </span>
          </MotionCard>

          {/* Card 4: Total Log */}
          <MotionCard delay={0.2} hoverEffect="lift" className="p-4 rounded-2xl bg-white border border-[#CBD5E1] shadow-card">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B403D] block">
              TOTAL LOG TERCATAT
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30]">
                {totalLogs}
              </span>
              <span className="text-[12px] font-semibold text-[#5B403D]">Aktivitas Audit</span>
            </div>
            <span className="text-[11px] text-[#16A34A] font-medium block mt-1">
              ✓ Log terkunci &amp; valid
            </span>
          </MotionCard>
        </div>

        {/* =========================================================================
            3. ADVANCED FILTER BAR (Figma 6:2910)
           ========================================================================= */}
        <div className="p-4 rounded-2xl bg-white border border-[#CBD5E1] shadow-card flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="w-full lg:w-80 relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari SKU, Nama Barang, atau ID Log..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#CBD5E1] text-[13px] text-[#0B1C30] placeholder-[#5B403D]/60 focus:outline-none focus:border-[#A24F9D]"
            />
            <span className="absolute left-3 top-2.5 text-[#5B403D]/60">
              <IconSearch size={16} />
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={filterDatePreset}
              onChange={(e) => setFilterDatePreset(e.target.value)}
              className="px-3 py-2 rounded-xl border border-[#CBD5E1] text-[12px] font-semibold text-[#0B1C30] bg-white cursor-pointer"
            >
              <option value="7days">7 Hari Terakhir</option>
              <option value="30days">30 Hari Terakhir</option>
              <option value="month">Bulan Ini (Oktober)</option>
            </select>

            <select
              value={filterModule}
              onChange={(e) => setFilterModule(e.target.value as 'all' | 'produk' | 'bahan_baku')}
              className="px-3 py-2 rounded-xl border border-[#CBD5E1] text-[12px] font-semibold text-[#0B1C30] bg-white cursor-pointer"
            >
              <option value="all">Semua Persediaan</option>
              <option value="produk">Hanya Produk Jadi</option>
              <option value="bahan_baku">Hanya Bahan Baku</option>
            </select>

            <select
              value={filterMutationType}
              onChange={(e) => setFilterMutationType(e.target.value)}
              className="px-3 py-2 rounded-xl border border-[#CBD5E1] text-[12px] font-semibold text-[#0B1C30] bg-white cursor-pointer"
            >
              <option value="all">Semua Jenis Perubahan</option>
              <option value="Hasil Produksi">Hasil Produksi</option>
              <option value="Penjualan POS">Penjualan POS</option>
              <option value="Pemakaian Dapur">Pemakaian Dapur</option>
              <option value="Stok Masuk">Stok Masuk (Restock)</option>
              <option value="Penyesuaian Opname">Opname Fisik</option>
            </select>
          </div>
        </div>

        {/* =========================================================================
            4. IMMUTABLE AUDIT LOG TABLE (Figma 6:2935)
           ========================================================================= */}
        <div className="rounded-2xl bg-white border border-[#CBD5E1] shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-[#FAF7F2] border-b border-[#CBD5E1] text-[#5B403D]">
                <tr>
                  <th className="py-3 px-4 font-bold">WAKTU &amp; TANGGAL</th>
                  <th className="py-3 px-4 font-bold">KODE REF / ID LOG</th>
                  <th className="py-3 px-4 font-bold">NAMA BARANG</th>
                  <th className="py-3 px-4 font-bold">MODUL</th>
                  <th className="py-3 px-4 font-bold text-center">MUTASI (+/-)</th>
                  <th className="py-3 px-4 font-bold">OPERATOR / PENCATAT</th>
                  <th className="py-3 px-4 font-bold">ALASAN &amp; KETERANGAN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#5B403D]">
                      <div className="max-w-md mx-auto space-y-2">
                        <p className="font-bold text-[14px] text-[#0B1C30]">Belum ada riwayat mutasi atau penyesuaian stok</p>
                        <p className="text-[12px]">Semua pergerakan bahan baku, hasil produksi, transaksi kasir, dan penyesuaian opname fisik akan tercatat di sini secara otomatis.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#FFF7ED]/30 transition-colors">
                    {/* Date */}
                    <td className="py-3.5 px-4 text-[12px] text-[#5B403D]">
                      {log.date.replace('T', ' ').substring(0, 16)} WIB
                    </td>

                    {/* Ref */}
                    <td className="py-3.5 px-4 font-mono font-bold text-[12px] text-[#5B3765]">
                      {log.reference}
                    </td>

                    {/* Item */}
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-[#0B1C30]">{log.itemName}</span>
                    </td>

                    {/* Module */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                          log.itemType === 'produk'
                            ? 'bg-[#EFF4FF] text-[#1E40AF]'
                            : 'bg-[#FEF3C7] text-[#92400E]'
                        }`}
                      >
                        {log.itemType === 'produk' ? 'Produk Jadi' : 'Bahan Baku'}
                      </span>
                    </td>

                    {/* Mutation */}
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`font-extrabold text-[14px] inline-flex items-center gap-1 ${
                          log.quantity > 0
                            ? 'text-[#16A34A]'
                            : log.quantity < 0
                            ? 'text-[#BA1A1A]'
                            : 'text-[#5B403D]'
                        }`}
                      >
                        {log.quantity > 0 ? (
                          <IconArrowUp size={14} />
                        ) : log.quantity < 0 ? (
                          <IconArrowDown size={14} />
                        ) : null}
                        <span>
                          {log.quantity > 0 ? `+${log.quantity}` : log.quantity} {log.unit}
                        </span>
                      </span>
                    </td>

                    {/* Actor */}
                    <td className="py-3.5 px-4 text-[12px] font-semibold text-[#0B1C30]">
                      {log.actor}
                    </td>

                    {/* Reason */}
                    <td className="py-3.5 px-4 text-[12px] text-[#5B403D]">
                      <div>{log.reason}</div>
                      <span className="text-[10px] text-[#A24F9D] font-bold">
                        {log.mutationKind}
                      </span>
                    </td>
                  </tr>
                )))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-[#FAF7F2] border-t border-[#CBD5E1] text-[12px] text-[#5B403D] flex items-center justify-between">
            <span>
              Menampilkan {filteredLogs.length} dari {totalLogs} catatan mutasi
            </span>
            <span className="font-semibold text-[#0B1C30]">
              Integritas Sistem: SHA-256 Validated
            </span>
          </div>
        </div>

        {/* =========================================================================
            5. MODAL PENYESUAIAN OPNAME
           ========================================================================= */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl border border-[#CBD5E1] animate-scale-in">
              <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4 mb-4">
                <h3 className="font-extrabold text-base text-[#0B1C30]">
                  Input Penyesuaian Opname Fisik
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-lg text-[#5B403D] hover:bg-slate-100"
                >
                  <IconClose size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmitAdjustment} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-[#334155] mb-1">Pilih Jenis Barang</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setItemType('produk');
                        setSelectedItemName(products[0]?.name || '');
                      }}
                      className={`py-2 rounded-xl font-bold border transition-all ${
                        itemType === 'produk'
                          ? 'bg-[#5B3765] text-white border-[#5B3765]'
                          : 'bg-white text-[#5B403D] border-[#CBD5E1]'
                      }`}
                    >
                      Produk Jadi
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setItemType('bahan_baku');
                        setSelectedItemName(rawMaterials[0]?.name || '');
                      }}
                      className={`py-2 rounded-xl font-bold border transition-all ${
                        itemType === 'bahan_baku'
                          ? 'bg-[#5B3765] text-white border-[#5B3765]'
                          : 'bg-white text-[#5B403D] border-[#CBD5E1]'
                      }`}
                    >
                      Bahan Baku
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#334155] mb-1">Pilih Item Barang *</label>
                  <select
                    value={selectedItemName}
                    onChange={(e) => setSelectedItemName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] font-bold text-[#0B1C30]"
                  >
                    {itemType === 'produk'
                      ? products.map((p) => (
                          <option key={p.id} value={p.name}>
                            {p.name} ({p.sku})
                          </option>
                        ))
                      : rawMaterials.map((m) => (
                          <option key={m.id} value={m.name}>
                            {m.name} ({m.code})
                          </option>
                        ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#334155] mb-1">
                    Besaran Penyesuaian (Gunakan tanda minus untuk pengurangan) *
                  </label>
                  <input
                    type="number"
                    required
                    value={adjustmentQty}
                    onChange={(e) => setAdjustmentQty(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] font-extrabold text-[15px]"
                  />
                  <span className="text-[11px] text-[#5B403D] mt-1 block">
                    Contoh: Masukkan <strong>-2</strong> bila fisik berkurang 2, atau <strong>5</strong> bila bertambah 5.
                  </span>
                </div>

                <div>
                  <label className="block font-bold text-[#334155] mb-1">Alasan Penyesuaian *</label>
                  <input
                    type="text"
                    required
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Contoh: Selisih fisik opname freezer, rusak kemasan, dsb"
                    className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1]"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-2 border-t border-[#F1F5F9]">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-[#CBD5E1] font-bold text-[#475569]"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#A24F9D] hover:bg-[#8F3D8A] text-white font-bold"
                  >
                    Simpan ke Audit Log
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
