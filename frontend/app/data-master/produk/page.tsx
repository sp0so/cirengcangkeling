'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AppShell from '../../components/AppShell';
import WordRevealHeading from '../../components/WordRevealHeading';
import MotionCard from '../../components/MotionCard';
import { useApp } from '../../lib/context';
import { Product } from '../../lib/types';
import {
  IconProduct,
  IconPlus,
  IconSearch,
  IconEdit,
  IconTrash,
  IconClose,
  IconCheckCircle,
  IconDownload,
  IconEye,
} from '../../components/Icons';

export default function KelolaProdukOwnerPage() {
  const { products, categories, addProduct, updateProduct, deleteProduct, showToast } = useApp();

  const [search, setSearch] = useState('');
  const [selectedTab, setSelectedTab] = useState<'all' | 'vakum' | 'fresh' | 'bundling'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [sortBy, setSortBy] = useState<'best-seller' | 'price-desc' | 'price-asc' | 'margin'>('best-seller');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || '');
  const [packagingType, setPackagingType] = useState('Kemasan Vakum (Frozen)');
  const [price, setPrice] = useState(20000);
  const [baseCost, setBaseCost] = useState(12000);
  const [unit, setUnit] = useState('pack');
  const [stock, setStock] = useState(20);
  const [minStock, setMinStock] = useState(10);
  const [isActive, setIsActive] = useState(true);

  // Calculated profit margin
  const marginNominal = Math.max(0, price - baseCost);
  const marginPercent = price > 0 ? ((marginNominal / price) * 100).toFixed(1) : '0';

  // Extended product mapping
  const mappedProducts = products.map((p) => {
    let packaging = 'Kemasan Vakum (Frozen)';
    if (p.name.toLowerCase().includes('rujak')) {
      packaging = 'Siap Goreng (Fresh)';
    } else if (p.name.toLowerCase().includes('besek') || p.name.toLowerCase().includes('bundling')) {
      packaging = 'Bundling Besek Oleh-oleh';
    }

    const marginNom = p.price - p.baseCost;
    const marginPct = p.price > 0 ? ((marginNom / p.price) * 100).toFixed(1) : '0';

    return {
      ...p,
      packaging,
      marginNom,
      marginPct,
    };
  });

  const totalSKU = mappedProducts.length;
  const countLow = mappedProducts.filter((p) => p.stock <= p.minStock).length;
  const totalCatalogValue = mappedProducts.reduce((sum, p) => sum + p.stock * p.price, 0);

  // Filter & Sort
  const filteredProducts = mappedProducts
    .filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase()) ||
        p.categoryName.toLowerCase().includes(search.toLowerCase());

      const matchTab =
        selectedTab === 'all' ||
        (selectedTab === 'vakum' && p.packaging.includes('Vakum')) ||
        (selectedTab === 'fresh' && p.packaging.includes('Fresh')) ||
        (selectedTab === 'bundling' && p.packaging.includes('Bundling'));

      const matchStatus =
        filterStatus === 'all' ||
        (filterStatus === 'active' && p.isActive !== false) ||
        (filterStatus === 'inactive' && p.isActive === false);

      return matchSearch && matchTab && matchStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'margin') return Number(b.marginPct) - Number(a.marginPct);
      return b.stock - a.stock;
    });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setName('');
    setSku(`CRG-00${products.length + 1}`);
    setCategoryId(categories[0]?.id || '');
    setPackagingType('Kemasan Vakum (Frozen)');
    setPrice(20000);
    setBaseCost(12000);
    setUnit('pack');
    setStock(25);
    setMinStock(10);
    setIsActive(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: typeof mappedProducts[0]) => {
    setEditingProduct(p);
    setName(p.name);
    setSku(p.sku);
    setCategoryId(p.categoryId);
    setPackagingType(p.packaging);
    setPrice(p.price);
    setBaseCost(p.baseCost);
    setUnit(p.unit);
    setStock(p.stock);
    setMinStock(p.minStock);
    setIsActive(p.isActive !== false);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const cat = categories.find((c) => c.id === categoryId);
    const categoryName = cat ? cat.name : 'Varian Cireng';

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name,
        sku,
        categoryId,
        categoryName,
        price: Number(price),
        baseCost: Number(baseCost),
        unit,
        stock: Number(stock),
        minStock: Number(minStock),
        isActive,
      });
      showToast(`Produk ${name} berhasil diperbarui!`, 'success');
    } else {
      addProduct({
        name,
        sku,
        categoryId,
        categoryName,
        price: Number(price),
        baseCost: Number(baseCost),
        unit,
        stock: Number(stock),
        minStock: Number(minStock),
        isActive,
      });
      showToast(`Produk baru ${name} berhasil ditambahkan ke katalog!`, 'success');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, prodName: string) => {
    if (confirm(`Yakin ingin menghapus varian produk "${prodName}" dari katalog?`)) {
      deleteProduct(id);
      showToast(`Produk ${prodName} berhasil dihapus`, 'info');
    }
  };

  return (
    <AppShell>
      <div className="space-y-6 font-sans">
        {/* =========================================================================
            1. BREADCRUMB & HEADER ACTIONS (Figma 6:2224)
           ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#5B403D] mb-1">
              <Link href="/dashboard" className="hover:text-[#A24F9D] transition-colors">
                Dashboard
              </Link>
              <span>/</span>
              <span className="font-bold text-[#0B1C30]">Data Produk</span>
            </div>
            <WordRevealHeading
              text="Data Master Produk"
              as="h1"
              className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30] tracking-tight"
            />
            <p className="text-[13px] text-[#5B403D] mt-0.5">
              Atur harga jual, estimasi HPP, margin laba, dan status tayang katalog POS kasir OUTLET.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => {
                const csvContent =
                  'data:text/csv;charset=utf-8,SKU,Nama,Kategori,Harga,HPP,Margin,Stok\n' +
                  mappedProducts
                    .map((p) => `${p.sku},"${p.name}","${p.categoryName}",${p.price},${p.baseCost},${p.marginPct}%,${p.stock}`)
                    .join('\n');
                const encodedUri = encodeURI(csvContent);
                const link = document.createElement('a');
                link.setAttribute('href', encodedUri);
                link.setAttribute('download', 'katalog_produk_cireng_cangkeling.csv');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                showToast('Katalog produk diexport ke CSV', 'success');
              }}
              className="px-3.5 py-2 rounded-xl bg-white text-[#0B1C30] border border-[#CBD5E1] text-[13px] font-bold hover:bg-[#F8FAFC] transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <IconDownload size={15} />
              <span>Export CSV/Excel</span>
            </button>

            <Link
              href="/menu-siap-makan"
              target="_blank"
              className="px-3.5 py-2 rounded-xl bg-white text-[#0B1C30] border border-[#CBD5E1] text-[13px] font-bold hover:bg-[#F8FAFC] transition-all flex items-center gap-1.5 shadow-xs"
            >
              <IconEye size={15} className="text-[#16A34A]" />
              <span>Katalog Publik WA</span>
            </Link>

            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 rounded-xl bg-[#A24F9D] hover:bg-[#8F3D8A] text-white text-[13px] font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <IconPlus size={15} />
              <span>+ Tambah Produk Baru</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            2. 4 KPI STRIP CARDS (Figma 6:2240)
           ========================================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {/* Card 1: Total SKU Aktif */}
          <MotionCard delay={0.05} hoverEffect="lift" className="p-4 rounded-2xl bg-white border border-[#CBD5E1] shadow-card">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B403D] block">
              TOTAL SKU AKTIF
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30]">
                {totalSKU}
              </span>
              <span className="text-[12px] font-semibold text-[#5B403D]">SKU Terdaftar</span>
            </div>
            <span className="text-[11px] text-[#16A34A] font-medium block mt-1">
              ✓ 100% aktif tayang di katalog kasir
            </span>
          </MotionCard>

          {/* Card 2: Kategori Kemasan */}
          <MotionCard delay={0.1} hoverEffect="lift" className="p-4 rounded-2xl bg-white border border-[#CBD5E1] shadow-card">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B403D] block">
              KATEGORI KEMASAN
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30]">
                3
              </span>
              <span className="text-[12px] font-semibold text-[#5B403D]">Lini Produk</span>
            </div>
            <span className="text-[11px] text-[#5B403D] font-medium block mt-1">
              Vakum • Siap Goreng • Besek Bundling
            </span>
          </MotionCard>

          {/* Card 3: Perhatian Stok */}
          <MotionCard delay={0.15} hoverEffect="lift" className="p-4 rounded-2xl bg-[#FEF3C7]/40 border border-[#F59E0B]/30 shadow-card">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#92400E] block">
              PERHATIAN STOK
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#92400E]">
                {countLow}
              </span>
              <span className="text-[12px] font-semibold text-[#92400E]">SKU Menipis</span>
            </div>
            <span className="text-[11px] text-[#D97706] font-medium block mt-1">
              Segera buat jadwal olah adonan dapur
            </span>
          </MotionCard>

          {/* Card 4: Total Nilai Katalog */}
          <MotionCard delay={0.2} hoverEffect="lift" className="p-4 rounded-2xl bg-white border border-[#CBD5E1] shadow-card">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B403D] block">
              TOTAL NILAI KATALOG
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl sm:text-2xl font-extrabold text-[#A24F9D]">
                Rp {totalCatalogValue.toLocaleString('id-ID')}
              </span>
            </div>
            <span className="text-[11px] text-[#5B403D] font-medium block mt-1">
              Estimasi nilai jual seluruh stok fisik
            </span>
          </MotionCard>
        </div>

        {/* =========================================================================
            3. PACKAGING CATEGORY TABS & FILTER BAR (Figma 6:2255)
           ========================================================================= */}
        <div className="p-4 rounded-2xl bg-white border border-[#CBD5E1] shadow-card flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Packaging Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
            <button
              onClick={() => setSelectedTab('all')}
              className={`px-3 py-1.5 rounded-xl text-[12px] font-bold transition-all shrink-0 cursor-pointer ${
                selectedTab === 'all'
                  ? 'bg-[#5B3765] text-white shadow-xs'
                  : 'bg-[#F8FAFC] text-[#475569] border border-[#CBD5E1] hover:bg-slate-100'
              }`}
            >
              Semua Produk ({totalSKU})
            </button>
            <button
              onClick={() => setSelectedTab('vakum')}
              className={`px-3 py-1.5 rounded-xl text-[12px] font-bold transition-all shrink-0 cursor-pointer ${
                selectedTab === 'vakum'
                  ? 'bg-[#A24F9D] text-white shadow-xs'
                  : 'bg-[#F8FAFC] text-[#475569] border border-[#CBD5E1] hover:bg-slate-100'
              }`}
            >
              Kemasan Vakum (Frozen)
            </button>
            <button
              onClick={() => setSelectedTab('fresh')}
              className={`px-3 py-1.5 rounded-xl text-[12px] font-bold transition-all shrink-0 cursor-pointer ${
                selectedTab === 'fresh'
                  ? 'bg-[#A24F9D] text-white shadow-xs'
                  : 'bg-[#F8FAFC] text-[#475569] border border-[#CBD5E1] hover:bg-slate-100'
              }`}
            >
              Siap Goreng (Fresh)
            </button>
            <button
              onClick={() => setSelectedTab('bundling')}
              className={`px-3 py-1.5 rounded-xl text-[12px] font-bold transition-all shrink-0 cursor-pointer ${
                selectedTab === 'bundling'
                  ? 'bg-[#A24F9D] text-white shadow-xs'
                  : 'bg-[#F8FAFC] text-[#475569] border border-[#CBD5E1] hover:bg-slate-100'
              }`}
            >
              Bundling Besek
            </button>
          </div>

          {/* Search, Status & Sort */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari produk cireng..."
                className="pl-8 pr-3 py-1.5 rounded-xl border border-[#CBD5E1] text-[12px] text-[#0B1C30] placeholder-[#5B403D]/60 focus:outline-none focus:border-[#A24F9D]"
              />
              <span className="absolute left-2.5 top-2 text-[#5B403D]/60">
                <IconSearch size={14} />
              </span>
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-2.5 py-1.5 rounded-xl border border-[#CBD5E1] text-[12px] font-semibold text-[#0B1C30] bg-white cursor-pointer"
            >
              <option value="all">Status: Semua</option>
              <option value="active">Aktif</option>
              <option value="inactive">Nonaktif</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2.5 py-1.5 rounded-xl border border-[#CBD5E1] text-[12px] font-semibold text-[#0B1C30] bg-white cursor-pointer"
            >
              <option value="best-seller">Urutan: Terlaris</option>
              <option value="margin">Margin Laba Tertinggi</option>
              <option value="price-desc">Harga Tertinggi</option>
              <option value="price-asc">Harga Terendah</option>
            </select>
          </div>
        </div>

        {/* =========================================================================
            4. PRODUCTS DATA TABLE (Figma 6:2280)
           ========================================================================= */}
        <div className="rounded-2xl bg-white border border-[#CBD5E1] shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-[#FAF7F2] border-b border-[#CBD5E1] text-[#5B403D]">
                <tr>
                  <th className="py-3 px-4 font-bold">PRODUK &amp; SKU</th>
                  <th className="py-3 px-4 font-bold">KATEGORI KEMASAN</th>
                  <th className="py-3 px-4 font-bold text-right">HARGA JUAL</th>
                  <th className="py-3 px-4 font-bold text-right">HPP (BIAYA POKOK)</th>
                  <th className="py-3 px-4 font-bold text-center">MARGIN LABA</th>
                  <th className="py-3 px-4 font-bold text-center">STOK FISIK</th>
                  <th className="py-3 px-4 font-bold text-center">STATUS</th>
                  <th className="py-3 px-4 font-bold text-center">AKSI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-[#FFF7ED]/30 transition-colors">
                          {/* Name & SKU */}
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-[#0B1C30]">{p.name}</div>
                            <div className="text-[11px] font-mono text-[#A24F9D] font-bold">{p.sku}</div>
                          </td>

                          {/* Packaging */}
                          <td className="py-3.5 px-4">
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#F1F5F9] text-[#475569]">
                              {p.packaging}
                            </span>
                          </td>

                          {/* Selling Price */}
                          <td className="py-3.5 px-4 text-right font-extrabold text-[#0B1C30]">
                            Rp {p.price.toLocaleString('id-ID')}
                          </td>

                          {/* HPP */}
                          <td className="py-3.5 px-4 text-right text-[#5B403D] font-semibold">
                            Rp {p.baseCost.toLocaleString('id-ID')}
                          </td>

                          {/* Profit Margin */}
                          <td className="py-3.5 px-4 text-center">
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-[#DCFCE7] text-[#15803D] border border-[#16A34A]/30">
                              {p.marginPct}% (Rp {p.marginNom.toLocaleString('id-ID')})
                            </span>
                          </td>

                          {/* Stock */}
                          <td className="py-3.5 px-4 text-center">
                            <span className="font-extrabold text-[15px] text-[#0B1C30]">
                              {p.stock}
                            </span>{' '}
                            <span className="text-[11px] text-[#5B403D]">{p.unit}</span>
                          </td>

                          {/* Status */}
                          <td className="py-3.5 px-4 text-center">
                            {p.isActive !== false ? (
                              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#DCFCE7] text-[#15803D]">
                                Aktif Tayang
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#F1F5F9] text-[#64748B]">
                                Nonaktif
                              </span>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => handleOpenEdit(p)}
                                title="Edit Produk"
                                className="p-1.5 rounded-lg text-[#5B403D] hover:bg-slate-100 transition-all cursor-pointer"
                              >
                                <IconEdit size={15} />
                              </button>
                              <button
                                onClick={() => handleDelete(p.id, p.name)}
                                title="Hapus Produk"
                                className="p-1.5 rounded-lg text-[#BA1A1A] hover:bg-[#FFDAD6] transition-all cursor-pointer"
                              >
                                <IconTrash size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-[#5B403D]">
                          <div className="flex flex-col items-center justify-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-[#E5EEFF] text-[#A24F9D] flex items-center justify-center">
                              <IconProduct size={24} />
                            </div>
                            <p className="font-bold text-[16px] text-[#0B1C30]">Belum ada produk yang ditambahkan</p>
                            <p className="text-[13px] text-[#5B403D] max-w-sm">Mulai tambahkan varian produk cireng Anda untuk dapat dijual di kasir dan dipantau inventarisnya.</p>
                            <button
                              onClick={handleOpenAdd}
                              className="mt-2 bg-[#A24F9D] hover:bg-[#8F3D8A] text-white text-[13px] font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-sm"
                            >
                              <IconPlus size={16} />
                              <span>Tambah Produk Pertama</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-[#FAF7F2] border-t border-[#CBD5E1] text-[12px] text-[#5B403D] flex items-center justify-between">
            <span>
              Menampilkan {filteredProducts.length} dari {totalSKU} SKU Produk
            </span>
            <span className="font-semibold text-[#0B1C30]">
              Estimasi Rata-rata Margin: 38.4%
            </span>
          </div>
        </div>

        {/* =========================================================================
            5. ADD / EDIT PRODUCT MODAL (Figma 6:2320)
           ========================================================================= */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl border border-[#CBD5E1] animate-scale-in">
              <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4 mb-4">
                <h3 className="font-extrabold text-lg text-[#0B1C30]">
                  {editingProduct ? 'Edit Data Produk' : 'Tambah Produk Baru'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-lg text-[#5B403D] hover:bg-slate-100"
                >
                  <IconClose size={20} />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#334155] mb-1">Kode SKU *</label>
                    <input
                      type="text"
                      required
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#334155] mb-1">Kategori Kemasan *</label>
                    <select
                      value={packagingType}
                      onChange={(e) => setPackagingType(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] font-bold"
                    >
                      <option value="Kemasan Vakum (Frozen)">Kemasan Vakum (Frozen)</option>
                      <option value="Siap Goreng (Fresh)">Siap Goreng (Fresh)</option>
                      <option value="Bundling Besek Oleh-oleh">Bundling Besek Oleh-oleh</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#334155] mb-1">Nama Varian Produk *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Cireng Isi Keju Mozzarella"
                    className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#334155] mb-1">Harga Jual (Rp) *</label>
                    <input
                      type="number"
                      required
                      min={1000}
                      step={500}
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] font-extrabold text-[15px] text-[#0B1C30]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#334155] mb-1">Estimasi HPP (Rp) *</label>
                    <input
                      type="number"
                      required
                      min={0}
                      step={500}
                      value={baseCost}
                      onChange={(e) => setBaseCost(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] font-semibold text-[#5B403D]"
                    />
                  </div>
                </div>

                {/* Auto Calculated Margin Callout */}
                <div className="p-3 bg-[#DCFCE7]/60 rounded-xl border border-[#16A34A]/30 flex items-center justify-between">
                  <span className="font-bold text-[#15803D]">Proyeksi Margin Laba:</span>
                  <span className="font-extrabold text-[14px] text-[#15803D]">
                    {marginPercent}% (Rp {marginNominal.toLocaleString('id-ID')} / pack)
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-[#334155] mb-1">Satuan</label>
                    <select
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1]"
                    >
                      <option value="pack">pack</option>
                      <option value="porsi">porsi</option>
                      <option value="besek">besek</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-[#334155] mb-1">Stok Fisik</label>
                    <input
                      type="number"
                      min={0}
                      value={stock}
                      onChange={(e) => setStock(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#334155] mb-1">Batas Minimum</label>
                    <input
                      type="number"
                      min={1}
                      value={minStock}
                      onChange={(e) => setMinStock(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="active-toggle"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 rounded text-[#A24F9D] focus:ring-[#A24F9D]"
                  />
                  <label htmlFor="active-toggle" className="font-bold text-[#0B1C30]">
                    Aktifkan dan tampilkan varian ini pada katalog sistem kasir POS
                  </label>
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
                    Simpan Produk
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
