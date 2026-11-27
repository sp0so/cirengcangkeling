'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AppShell from '../../components/AppShell';
import WordRevealHeading from '../../components/WordRevealHeading';
import MotionCard from '../../components/MotionCard';
import { useApp } from '../../lib/context';
import { businessInfo } from '../../lib/businessInfo';
import { Product } from '../../lib/types';
import {
  IconProduct,
  IconSearch,
  IconAlertTriangle,
  IconCheckCircle,
  IconArrowUp,
  IconArrowDown,
  IconClose,
  IconDownload,
} from '../../components/Icons';

export default function InventarisProdukOwnerPage() {
  const { products, updateProduct, addStockAdjustment, showToast } = useApp();

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'ready' | 'low' | 'out'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Quick Production Entry State
  // Modal Stock Opname
  const [isOpnameModalOpen, setIsOpnameModalOpen] = useState(false);
  const [opnameProd, setOpnameProd] = useState<Product | null>(null);
  const [opnamePhysicalCount, setOpnamePhysicalCount] = useState<number>(0);
  const [opnameReason, setOpnameReason] = useState<string>('Opname fisik harian freezer OUTLET');

  // Extended product inventory data
  const inventoryItems = products.map((p) => {
    let packagingType = 'Kemasan Vakum (Frozen)';
    let shelfLocation = 'Deep Freezer Gudang (-18°C)';
    let packCount = '10 pcs / pack';

    if (p.name.toLowerCase().includes('rujak')) {
      shelfLocation = 'Chiller Display Kasir (4°C)';
      packCount = '12 pcs + Sambal Rujak';
    } else if (p.name.toLowerCase().includes('siap saji') || p.name.toLowerCase().includes('matang')) {
      packagingType = 'Siap Saji Hangat';
      shelfLocation = 'Etalase Penghangat (Warm Display)';
      packCount = '1 Porsi (5 pcs)';
    }

    let statusBadge: 'ready' | 'low' | 'out' = 'ready';
    if (p.stock === 0) statusBadge = 'out';
    else if (p.stock <= p.minStock) statusBadge = 'low';

    return {
      ...p,
      packagingType,
      shelfLocation,
      packCount,
      statusBadge,
      lastUpdated: 'Hari ini, 09:30 WIB',
    };
  });

  const totalPack = inventoryItems.reduce((sum, item) => sum + item.stock, 0);
  const totalValue = inventoryItems.reduce((sum, item) => sum + item.stock * item.price, 0);
  const bestSeller = inventoryItems.find((p) => p.name.toLowerCase().includes('rujak')) || inventoryItems[0] || null;
  const frozenCount = inventoryItems
    .filter((p) => p.packagingType.includes('Vakum'))
    .reduce((sum, item) => sum + item.stock, 0);

  const filteredItems = inventoryItems.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase()) ||
      item.packagingType.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      filterStatus === 'all' ||
      (filterStatus === 'ready' && item.statusBadge === 'ready') ||
      (filterStatus === 'low' && item.statusBadge === 'low') ||
      (filterStatus === 'out' && item.statusBadge === 'out');
    const matchCat =
      filterCategory === 'all' ||
      item.categoryName.toLowerCase().includes(filterCategory.toLowerCase()) ||
      item.packagingType.toLowerCase().includes(filterCategory.toLowerCase());

    return matchSearch && matchStatus && matchCat;
  });

  const handleOpenOpname = (item: Product) => {
    setOpnameProd(item);
    setOpnamePhysicalCount(item.stock);
    setOpnameReason('Pemeriksaan fisik stok harian freezer');
    setIsOpnameModalOpen(true);
  };

  const handleSaveOpname = (e: React.FormEvent) => {
    e.preventDefault();
    if (!opnameProd) return;
    const diff = Number(opnamePhysicalCount) - opnameProd.stock;

    updateProduct(opnameProd.id, {
      stock: Number(opnamePhysicalCount),
    });

    addStockAdjustment(
      opnameProd.name,
      'produk',
      diff,
      opnameProd.unit,
      `Koreksi Opname: ${opnameReason} (Selisih: ${diff >= 0 ? '+' : ''}${diff})`
    );

    showToast(`Opname fisik ${opnameProd.name} tersimpan. Stok disesuaikan menjadi ${opnamePhysicalCount} pack.`, 'success');
    setIsOpnameModalOpen(false);
  };

  return (
    <AppShell>
      <div className="space-y-6 font-sans">
        {/* =========================================================================
            1. SYSTEM ALERT NOTICE (Figma 6:1441)
            Notice: Terhubung POS Outlet 1
           ========================================================================= */}
        <div className="bg-[#EFF4FF] rounded-[12px] p-3.5 sm:p-4 border border-[#CBD5E1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#5B3765] text-white flex items-center justify-center shrink-0">
              <IconCheckCircle size={18} />
            </div>
            <div>
              <div className="font-bold text-[14px] text-[#0B1C30]">
                Sinkronisasi Inventaris Aktif
              </div>
              <p className="text-[12px] text-[#5B403D]">
                Stok fisik terhubung langsung dengan POS. Setiap penjualan otomatis memotong jumlah stok di sini.
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#DCFCE7] text-[#15803D] border border-[#16A34A]/30 shrink-0 self-end sm:self-auto flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
            <span>Terhubung POS {businessInfo.outletName}</span>
          </span>
        </div>

        {/* =========================================================================
            2. HERO HEADER & QUICK ACTION ROW (Figma 6:1453)
           ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#5B3765]/10 text-[#5B3765] uppercase tracking-wider">
                INVENTARIS &amp; PRODUK JADI
              </span>
              <span className="text-[11px] text-[#5B403D]/70 font-medium">
                Pembaruan: Hari ini 09:30 WIB
              </span>
            </div>
            <WordRevealHeading
              text="Stok Produk Jadi"
              as="h1"
              className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30] tracking-tight"
            />
            <p className="text-[13px] text-[#5B403D] mt-0.5">
              Monitoring persediaan fisik cireng siap saji hangat dan kemasan frozen siap jual di etalase kasir.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => {
                if (products[0]) handleOpenOpname(products[0]);
              }}
              className="px-3.5 py-2 rounded-xl bg-white text-[#0B1C30] border border-[#CBD5E1] text-[13px] font-bold hover:bg-[#F8FAFC] transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <IconAlertTriangle size={15} className="text-[#F59E0B]" />
              <span>Stock Opname Fisik</span>
            </button>

            <Link
              href="/operasional/produksi"
              className="px-4 py-2 rounded-xl bg-[#A24F9D] hover:bg-[#8F3D8A] text-white text-[13px] font-bold transition-all flex items-center gap-1.5 shadow-xs"
            >
              <span>Manajemen Produksi</span>
            </Link>
          </div>
        </div>

        {/* =========================================================================
            3. SUMMARY CARDS BENTO GRID (Figma 6:1478)
           ========================================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {/* Card 1: Stok Siap Jual */}
          <MotionCard delay={0.05} hoverEffect="lift" className="p-4 rounded-2xl bg-white border border-[#CBD5E1] shadow-card">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B403D] block">
              TOTAL STOK SIAP JUAL
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30]">
                {totalPack}
              </span>
              <span className="text-[12px] font-semibold text-[#5B403D]">Pack Terdaftar</span>
            </div>
            <span className="text-[11px] text-[#16A34A] font-medium block mt-1">
              ✓ Siap melayani pelanggan
            </span>
          </MotionCard>

          {/* Card 2: Crispy Bumbu Rujak */}
          <MotionCard delay={0.1} hoverEffect="lift" className="p-4 rounded-2xl bg-[#FFF7ED] border border-[#CBD5E1] shadow-card">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#833E17] block">
              PRODUK TERLARIS (TOP SKU)
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl sm:text-2xl font-extrabold text-[#A24F9D] truncate">
                {bestSeller ? bestSeller.name : 'Belum Ada Produk'}
              </span>
            </div>
            <span className="text-[11px] text-[#5B403D] font-medium block mt-1">
              Stok saat ini: <strong>{bestSeller ? `${bestSeller.stock} Pack` : '0 Pack'}</strong>
            </span>
          </MotionCard>

          {/* Card 3: Stok Frozen Pack */}
          <MotionCard delay={0.15} hoverEffect="lift" className="p-4 rounded-2xl bg-[#EFF4FF] border border-[#CBD5E1] shadow-card">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E40AF] block">
              STOK FROZEN PACK
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#1E40AF]">
                {frozenCount}
              </span>
              <span className="text-[12px] font-semibold text-[#1E40AF]">Pack Vakum</span>
            </div>
            <span className="text-[11px] text-[#5B403D] font-medium block mt-1">
              Tersimpan aman di suhu -18°C
            </span>
          </MotionCard>

          {/* Card 4: Nilai Total Inventaris */}
          <MotionCard delay={0.2} hoverEffect="lift" className="p-4 rounded-2xl bg-white border border-[#CBD5E1] shadow-card">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B403D] block">
              NILAI TOTAL INVENTARIS
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl sm:text-2xl font-extrabold text-[#16A34A]">
                Rp {totalValue.toLocaleString('id-ID')}
              </span>
            </div>
            <span className="text-[11px] text-[#5B403D] font-medium block mt-1">
              Berdasarkan harga jual retail
            </span>
          </MotionCard>
        </div>

        {/* =========================================================================
            4. SEARCH & FILTER CONTROLS (Figma 6:1506)
           ========================================================================= */}
        <div className="p-4 rounded-2xl bg-white border border-[#CBD5E1] shadow-card flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="w-full lg:w-96 relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari varian cireng (cth: 'Keju', 'CRG-002', 'Vakum')..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#CBD5E1] text-[13px] text-[#0B1C30] placeholder-[#5B403D]/60 focus:outline-none focus:border-[#A24F9D] transition-colors"
            />
            <span className="absolute left-3 top-2.5 text-[#5B403D]/60">
              <IconSearch size={16} />
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-xl text-[12px] font-bold transition-all shrink-0 cursor-pointer ${
                filterStatus === 'all'
                  ? 'bg-[#5B3765] text-white shadow-xs'
                  : 'bg-[#F8FAFC] text-[#475569] border border-[#CBD5E1] hover:bg-slate-100'
              }`}
            >
              Semua ({inventoryItems.length})
            </button>
            <button
              onClick={() => setFilterStatus('ready')}
              className={`px-3 py-1.5 rounded-xl text-[12px] font-bold transition-all shrink-0 cursor-pointer ${
                filterStatus === 'ready'
                  ? 'bg-[#16A34A] text-white shadow-xs'
                  : 'bg-[#DCFCE7] text-[#15803D] border border-[#16A34A]/30 hover:bg-[#bbf7d0]'
              }`}
            >
              Siap Jual
            </button>
            <button
              onClick={() => setFilterStatus('low')}
              className={`px-3 py-1.5 rounded-xl text-[12px] font-bold transition-all shrink-0 cursor-pointer ${
                filterStatus === 'low'
                  ? 'bg-[#F59E0B] text-white shadow-xs'
                  : 'bg-[#FEF3C7] text-[#92400E] border border-[#F59E0B]/30 hover:bg-[#fde68a]'
              }`}
            >
              Menipis
            </button>
            <button
              onClick={() => setFilterStatus('out')}
              className={`px-3 py-1.5 rounded-xl text-[12px] font-bold transition-all shrink-0 cursor-pointer ${
                filterStatus === 'out'
                  ? 'bg-[#BA1A1A] text-white shadow-xs'
                  : 'bg-[#FFDAD6] text-[#93000A] border border-[#BA1A1A]/30 hover:bg-[#ffcdc7]'
              }`}
            >
              Habis (0)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 rounded-xl border border-[#CBD5E1] text-[12px] font-semibold text-[#0B1C30] bg-white focus:outline-none focus:border-[#A24F9D] cursor-pointer"
            >
              <option value="all">Semua Kategori Kemasan</option>
              <option value="Vakum">Kemasan Vakum (Frozen)</option>
              <option value="Siap Saji">Siap Saji Hangat</option>
              <option value="Bundling">Bundling Besek</option>
            </select>
          </div>
        </div>

        {/* =========================================================================
            5. MAIN PRODUCT STOCK TABLE (Figma 6:1525)
           ========================================================================= */}
        <div className="rounded-2xl bg-white border border-[#CBD5E1] shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-[#FAF7F2] border-b border-[#CBD5E1] text-[#5B403D]">
                <tr>
                  <th className="py-3 px-4 font-bold">KODE SKU &amp; VARIAN</th>
                  <th className="py-3 px-4 font-bold">KEMASAN / ISI</th>
                  <th className="py-3 px-4 font-bold text-right">HARGA JUAL</th>
                  <th className="py-3 px-4 font-bold">LOKASI SIMPAN</th>
                  <th className="py-3 px-4 font-bold text-center">STOK FISIK</th>
                  <th className="py-3 px-4 font-bold text-center">STATUS</th>
                  <th className="py-3 px-4 font-bold">UPDATE TERAKHIR</th>
                  <th className="py-3 px-4 font-bold text-center">AKSI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-[#FFF7ED]/30 transition-colors">
                    {/* SKU & Name */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#0B1C30]">{item.name}</div>
                      <div className="text-[11px] font-mono text-[#A24F9D] font-bold">{item.sku}</div>
                    </td>

                    {/* Packaging */}
                    <td className="py-3.5 px-4">
                      <div className="text-[#0B1C30] font-medium">{item.packCount}</div>
                      <div className="text-[11px] text-[#5B403D]/70">{item.packagingType}</div>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4 text-right font-extrabold text-[#0B1C30]">
                      Rp {item.price.toLocaleString('id-ID')}
                    </td>

                    {/* Location */}
                    <td className="py-3.5 px-4">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#EFF4FF] text-[#1E40AF]">
                        {item.shelfLocation}
                      </span>
                    </td>

                    {/* Stock */}
                    <td className="py-3.5 px-4 text-center">
                      <span className="font-extrabold text-[16px] text-[#0B1C30]">
                        {item.stock}
                      </span>{' '}
                      <span className="text-[11px] text-[#5B403D]">{item.unit}</span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 text-center">
                      {item.statusBadge === 'ready' && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#DCFCE7] text-[#15803D] border border-[#16A34A]/30">
                          SIAP JUAL
                        </span>
                      )}
                      {item.statusBadge === 'low' && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FEF3C7] text-[#92400E] border border-[#F59E0B]/30">
                          MENIPIS
                        </span>
                      )}
                      {item.statusBadge === 'out' && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FFDAD6] text-[#93000A] border border-[#BA1A1A]/30">
                          HABIS
                        </span>
                      )}
                    </td>

                    {/* Last Updated */}
                    <td className="py-3.5 px-4 text-[12px] text-[#5B403D]">
                      {item.lastUpdated}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => {
                            updateProduct(item.id, { stock: item.stock + 5 });
                            showToast(`+5 pack ${item.name} berhasil ditambahkan`, 'success');
                          }}
                          title="Tambah +5 Pack Cepat"
                          className="p-1.5 rounded-lg text-[#16A34A] hover:bg-[#DCFCE7] transition-all cursor-pointer font-bold text-xs"
                        >
                          +5
                        </button>
                        <button
                          onClick={() => handleOpenOpname(item)}
                          title="Input Opname Fisik"
                          className="p-1.5 rounded-lg text-[#5B403D] hover:bg-slate-100 transition-all cursor-pointer"
                        >
                          <IconAlertTriangle size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="py-10 text-center text-[#5B403D]">
                      <p className="font-bold text-[14px] text-[#0B1C30]">Belum ada produk terdaftar</p>
                      <p className="text-[12px] text-[#5B403D] mt-1">
                        Daftarkan produk cireng Anda di modul Data Produk untuk memantau stok fisik di freezer dan chiller.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="p-4 bg-[#FAF7F2] border-t border-[#CBD5E1] text-[12px] text-[#5B403D] flex items-center justify-between">
            <span>
              Menampilkan {filteredItems.length} dari {inventoryItems.length} SKU Produk Jadi Terdaftar
            </span>
            <span className="font-semibold text-[#0B1C30]">
              Total Fisik: {totalPack} Pack Siap Jual
            </span>
          </div>
        </div>

        {/* =========================================================================
            6. STORAGE & CHILLER DISTRIBUTION INSIGHTS
           ========================================================================= */}
        <div className="bg-white rounded-2xl border border-[#CBD5E1] p-5 sm:p-6 shadow-card space-y-4">
            <div className="border-b border-[#F1F5F9] pb-3">
              <span className="text-[11px] font-bold text-[#833E17] tracking-wider uppercase block">
                SEBARAN SUHU &amp; LOKASI SIMPAN
              </span>
              <h3 className="text-base font-extrabold text-[#0B1C30]">
                Status Penyimpanan Beku
              </h3>
              <p className="text-[12px] text-[#5B403D] mt-0.5">
                Menjaga kualitas cireng beku tanpa pengawet (tahan 30 hari pada suhu -18°C).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Deep Freezer Gudang */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-[#0B1C30]">Deep Freezer Gudang (-18°C)</span>
                  <span className="font-bold text-[#1E40AF]">110 / 150 Pack (73%)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#E2E8F0] overflow-hidden">
                  <div className="h-full bg-[#3B82F6] rounded-full" style={{ width: '73%' }} />
                </div>
                <span className="text-[11px] text-[#5B403D] mt-0.5 block">
                  Varian Frozen Vacuum Pack (Ayam Ori, Keju, Beef Bulgogi, Cumi)
                </span>
              </div>

              {/* Chiller Display Kasir */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-[#0B1C30]">Chiller Display Kasir (4°C)</span>
                  <span className="font-bold text-[#15803D]">35 / 50 Pack (70%)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#E2E8F0] overflow-hidden">
                  <div className="h-full bg-[#16A34A] rounded-full" style={{ width: '70%' }} />
                </div>
                <span className="text-[11px] text-[#5B403D] mt-0.5 block">
                  Varian Siap Goreng + Sambal Rujak Fresh
                </span>
              </div>

              {/* Etalase Penghangat */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-[#0B1C30]">Etalase Hangat OUTLET (Warm)</span>
                  <span className="font-bold text-[#D97706]">20 / 30 Porsi (66%)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#E2E8F0] overflow-hidden">
                  <div className="h-full bg-[#F59E0B] rounded-full" style={{ width: '66%' }} />
                </div>
                <span className="text-[11px] text-[#5B403D] mt-0.5 block">
                  Cireng hangat siap santap langsung
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FFF7ED] border border-[#CBD5E1] text-[11px] text-[#5B403D] space-y-1">
              <span className="font-bold text-[#833E17] block">💡 SOP Kualitas Produk UMKM:</span>
              <p>
                Pastikan rotasi stok menggunakan metode <strong>FIFO (First In, First Out)</strong>. Kemasan vakum yang diproduksi lebih awal wajib dikeluarkan terlebih dahulu.
              </p>
            </div>
          </div>
        {/* =========================================================================
            7. MODAL STOCK OPNAME FISIK
           ========================================================================= */}
        {isOpnameModalOpen && opnameProd && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl border border-[#CBD5E1] animate-scale-in">
              <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4 mb-4">
                <h3 className="font-extrabold text-base text-[#0B1C30] flex items-center gap-2">
                  <IconAlertTriangle className="text-[#F59E0B]" size={18} />
                  <span>Stock Opname Fisik: {opnameProd.name}</span>
                </h3>
                <button
                  onClick={() => setIsOpnameModalOpen(false)}
                  className="p-1 rounded-lg text-[#5B403D] hover:bg-slate-100"
                >
                  <IconClose size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveOpname} className="space-y-4 text-xs">
                <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#CBD5E1] flex justify-between items-center">
                  <span>Stok Tercatat di Sistem:</span>
                  <span className="font-extrabold text-base text-[#0B1C30]">
                    {opnameProd.stock} {opnameProd.unit}
                  </span>
                </div>

                <div>
                  <label className="block font-bold text-[#334155] mb-1">
                    Hitungan Fisik Nyata di Freezer/OUTLET *
                  </label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={opnamePhysicalCount}
                    onChange={(e) => setOpnamePhysicalCount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] font-extrabold text-[16px] text-[#A24F9D] focus:outline-none focus:border-[#A24F9D]"
                  />
                  <span className="text-[11px] text-[#5B403D] mt-1 block">
                    Selisih: {Number(opnamePhysicalCount) - opnameProd.stock >= 0 ? '+' : ''}
                    {Number(opnamePhysicalCount) - opnameProd.stock} {opnameProd.unit}
                  </span>
                </div>

                <div>
                  <label className="block font-bold text-[#334155] mb-1">
                    Alasan Penyesuaian / Keterangan *
                  </label>
                  <input
                    type="text"
                    required
                    value={opnameReason}
                    onChange={(e) => setOpnameReason(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1]"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-2 border-t border-[#F1F5F9]">
                  <button
                    type="button"
                    onClick={() => setIsOpnameModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-[#CBD5E1] font-bold text-[#475569]"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#A24F9D] hover:bg-[#8F3D8A] text-white font-bold"
                  >
                    Update Stok Fisik
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
