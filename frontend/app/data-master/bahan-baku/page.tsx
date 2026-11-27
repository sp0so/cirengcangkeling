'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppShell from '../../components/AppShell';
import WordRevealHeading from '../../components/WordRevealHeading';
import MotionCard from '../../components/MotionCard';
import { useApp } from '../../lib/context';
import { RawMaterial } from '../../lib/types';
import {
  IconRawMaterial,
  IconPlus,
  IconSearch,
  IconEdit,
  IconAlertTriangle,
  IconClose,
  IconCheckCircle,
  IconArrowUp,
  IconArrowDown,
} from '../../components/Icons';

export default function StokBahanBakuOwnerPage() {
  const { rawMaterials, addRawMaterial, updateRawMaterial, showToast } = useApp();

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'kritis' | 'menipis' | 'aman'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'stock-asc' | 'stock-desc' | 'name-asc'>('stock-asc');

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRestockModalOpen, setIsRestockModalOpen] = useState(false);
  const [isUsageModalOpen, setIsUsageModalOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<RawMaterial | null>(null);

  // Form states for Add/Edit
  const [formName, setFormName] = useState('');
  const [formCode, setFormCode] = useState('');
  const [formUnit, setFormUnit] = useState('kg');
  const [formStock, setFormStock] = useState(10);
  const [formMinStock, setFormMinStock] = useState(5);
  const [formUnitCost, setFormUnitCost] = useState(0);
  const [formSupplier, setFormSupplier] = useState('');
  const [formCategory, setFormCategory] = useState('Bahan Pokok');

  // Quick Action form states
  const [selectedMatId, setSelectedMatId] = useState<string>('');
  const [quickQty, setQuickQty] = useState<number>(10);
  const [quickNotes, setQuickNotes] = useState<string>('');

  // Extended mock data mapping for rich display
  const materialsWithCategories = rawMaterials.map((m) => {
    let cat = 'Bahan Pokok';
    if (m.name.toLowerCase().includes('cabai') || m.name.toLowerCase().includes('bawang') || m.name.toLowerCase().includes('bumbu') || m.name.toLowerCase().includes('garam') || m.name.toLowerCase().includes('rempah')) {
      cat = 'Bumbu & Rempah';
    } else if (m.name.toLowerCase().includes('minyak') || m.name.toLowerCase().includes('plastik') || m.name.toLowerCase().includes('pouch') || m.name.toLowerCase().includes('gas')) {
      cat = 'Kemasan & Energi';
    } else if (m.name.toLowerCase().includes('keju') || m.name.toLowerCase().includes('ayam') || m.name.toLowerCase().includes('daging') || m.name.toLowerCase().includes('cumi')) {
      cat = 'Isian & Protein';
    }

    // Determine status
    let status: 'kritis' | 'menipis' | 'aman' = 'aman';
    if (m.stock <= m.minStock * 0.6) {
      status = 'kritis';
    } else if (m.stock <= m.minStock) {
      status = 'menipis';
    }

    // Days remaining estimate
    const dailyUsage = Math.max(1, m.minStock / 3);
    const daysRemaining = Math.max(1, Math.round(m.stock / dailyUsage));

    return {
      ...m,
      category: cat,
      computedStatus: status,
      daysRemaining,
    };
  });

  const countKritis = materialsWithCategories.filter((m) => m.computedStatus === 'kritis').length;
  const countMenipis = materialsWithCategories.filter((m) => m.computedStatus === 'menipis').length;
  const countAman = materialsWithCategories.filter((m) => m.computedStatus === 'aman').length;
  const totalItems = materialsWithCategories.length;

  // Filtered & Sorted list
  const filteredMaterials = materialsWithCategories
    .filter((m) => {
      const matchSearch =
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.code.toLowerCase().includes(search.toLowerCase()) ||
        m.category.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === 'all' || m.computedStatus === filterStatus;
      const matchCat = selectedCategory === 'all' || m.category === selectedCategory;
      return matchSearch && matchStatus && matchCat;
    })
    .sort((a, b) => {
      if (sortBy === 'stock-asc') return a.stock - b.stock;
      if (sortBy === 'stock-desc') return b.stock - a.stock;
      return a.name.localeCompare(b.name);
    });

  const handleOpenAdd = () => {
    setEditingMaterial(null);
    setFormName('');
    setFormCode(`BB-00${rawMaterials.length + 1}`);
    setFormUnit('kg');
    setFormStock(15);
    setFormMinStock(10);
    setFormUnitCost(20000);
    setFormSupplier('Pemasok Tepung Jaya CV');
    setFormCategory('Bahan Pokok');
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (m: RawMaterial) => {
    setEditingMaterial(m);
    setFormName(m.name);
    setFormCode(m.code);
    setFormUnit(m.unit);
    setFormStock(m.stock);
    setFormMinStock(m.minStock);
    setFormUnitCost(m.unitCost);
    setFormSupplier(m.supplierName);
    setIsAddModalOpen(true);
  };

  const handleSaveMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMaterial) {
      updateRawMaterial(editingMaterial.id, {
        name: formName,
        code: formCode,
        unit: formUnit,
        stock: Number(formStock),
        minStock: Number(formMinStock),
        unitCost: Number(formUnitCost),
        supplierName: formSupplier,
      });
      showToast('Data bahan baku berhasil diperbarui!', 'success');
    } else {
      addRawMaterial({
        name: formName,
        code: formCode,
        unit: formUnit,
        stock: Number(formStock),
        minStock: Number(formMinStock),
        unitCost: Number(formUnitCost),
        supplierName: formSupplier,
      });
      showToast('Bahan baku baru berhasil ditambahkan!', 'success');
    }
    setIsAddModalOpen(false);
  };

  const handleQuickRestockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = rawMaterials.find((m) => m.id === selectedMatId);
    if (!target) return;
    updateRawMaterial(target.id, {
      stock: target.stock + Number(quickQty),
    });
    showToast(`Stok masuk +${quickQty} ${target.unit} untuk ${target.name} berhasil dicatat!`, 'success');
    setIsRestockModalOpen(false);
  };

  const handleQuickUsageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = rawMaterials.find((m) => m.id === selectedMatId);
    if (!target) return;
    const newStock = Math.max(0, target.stock - Number(quickQty));
    updateRawMaterial(target.id, {
      stock: newStock,
    });
    showToast(`Pemakaian dapur -${quickQty} ${target.unit} untuk ${target.name} berhasil dicatat!`, 'info');
    setIsUsageModalOpen(false);
  };

  return (
    <AppShell>
      <div className="space-y-6 font-sans">
        {/* =========================================================================
            1. EMERGENCY RESTOCK ALERT BANNER (Figma 6:802)
            bg-[#FFDAD6], text-[#93000A], icon bg-[#BA1A1A]
           ========================================================================= */}
        {countKritis > 0 && (
          <div className="bg-[#FFDAD6] rounded-[12px] p-4 sm:p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] border border-[#BA1A1A]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-[8px] bg-[#BA1A1A] text-white flex items-center justify-center shrink-0 shadow-xs">
                <IconAlertTriangle size={18} />
              </div>
              <div>
                <h4 className="font-bold text-[15px] sm:text-[16px] text-[#93000A] leading-tight">
                  Peringatan Kebutuhan Belanja Darurat
                </h4>
                <p className="text-[12px] sm:text-[13px] text-[#93000A]/85 mt-0.5">
                  {countKritis} bahan baku utama (Tepung Tapioka &amp; Minyak Goreng) berada di bawah batas cadangan aman operasional 3 hari.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                const firstKritis = materialsWithCategories.find((m) => m.computedStatus === 'kritis');
                if (firstKritis) setSelectedMatId(firstKritis.id);
                setQuickQty(25);
                setQuickNotes('Restock darurat supplier');
                setIsRestockModalOpen(true);
              }}
              className="bg-[#A24F9D] hover:bg-[#8F3D8A] text-white text-[13px] font-bold px-4 py-2 rounded-[8px] shadow-xs shrink-0 transition-all flex items-center gap-1.5 self-end md:self-auto cursor-pointer"
            >
              <IconPlus size={14} />
              <span>Restock Cepat</span>
            </button>
          </div>
        )}

        {/* =========================================================================
            2. PAGE TITLE & QUICK ACTION BAR (Figma 6:814)
           ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#5B3765]/10 text-[#5B3765] uppercase tracking-wider">
                MODUL INTI UMKM
              </span>
              <span className="text-[11px] text-[#5B403D]/70 font-medium">
                Pembaruan: Hari ini 09:42 WIB
              </span>
            </div>
            <WordRevealHeading
              text="Stok Bahan Baku"
              as="h1"
              className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30] tracking-tight"
            />
            <p className="text-[13px] text-[#5B403D] mt-0.5">
              Kelola ketersediaan tepung tapioka, cabai rawit, bumbu rempah Sunda, dan minyak goreng.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => {
                if (rawMaterials[0]) setSelectedMatId(rawMaterials[0].id);
                setQuickQty(10);
                setQuickNotes('Catat stok masuk gudang');
                setIsRestockModalOpen(true);
              }}
              className="px-3.5 py-2 rounded-xl bg-white text-[#0B1C30] border border-[#CBD5E1] text-[13px] font-bold hover:bg-[#F8FAFC] transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <IconArrowUp size={15} className="text-[#16A34A]" />
              <span>Catat Stok Masuk</span>
            </button>

            <button
              onClick={() => {
                if (rawMaterials[0]) setSelectedMatId(rawMaterials[0].id);
                setQuickQty(5);
                setQuickNotes('Pemakaian batch produksi dapur');
                setIsUsageModalOpen(true);
              }}
              className="px-3.5 py-2 rounded-xl bg-white text-[#0B1C30] border border-[#CBD5E1] text-[13px] font-bold hover:bg-[#F8FAFC] transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <IconArrowDown size={15} className="text-[#BA1A1A]" />
              <span>Pakai Produksi</span>
            </button>

            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 rounded-xl bg-[#A24F9D] hover:bg-[#8F3D8A] text-white text-[13px] font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <IconPlus size={15} />
              <span>Tambah Bahan Baku</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            3. 4 STAT METRIC CARDS (Figma 6:820)
           ========================================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {/* Card 1: Total Bahan */}
          <MotionCard delay={0.05} hoverEffect="lift" className="p-4 rounded-2xl bg-white border border-[#CBD5E1] shadow-card">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B403D] block">
              TOTAL BAHAN BAKU
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30]">
                {totalItems}
              </span>
              <span className="text-[12px] font-semibold text-[#5B403D]">Bahan Baku</span>
            </div>
            <span className="text-[11px] text-[#16A34A] font-medium block mt-1">
              ✓ Semua terdaftar di resep
            </span>
          </MotionCard>

          {/* Card 2: Status Kritis */}
          <MotionCard delay={0.1} hoverEffect="lift" className="p-4 rounded-2xl bg-[#FFDAD6]/50 border border-[#BA1A1A]/30 shadow-card">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#93000A] block">
              STATUS KRITIS
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#93000A]">
                {countKritis}
              </span>
              <span className="text-[12px] font-semibold text-[#93000A]">Bahan Pokok</span>
            </div>
            <span className="text-[11px] text-[#BA1A1A] font-bold block mt-1">
              ⚠ Cadangan di bawah 3 hari
            </span>
          </MotionCard>

          {/* Card 3: Status Menipis */}
          <MotionCard delay={0.15} hoverEffect="lift" className="p-4 rounded-2xl bg-[#FEF3C7]/50 border border-[#F59E0B]/30 shadow-card">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#92400E] block">
              STATUS MENIPIS
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#92400E]">
                {countMenipis}
              </span>
              <span className="text-[12px] font-semibold text-[#92400E]">Bahan</span>
            </div>
            <span className="text-[11px] text-[#D97706] font-medium block mt-1">
              Perlu order dalam 5 hari
            </span>
          </MotionCard>

          {/* Card 4: Status Aman */}
          <MotionCard delay={0.2} hoverEffect="lift" className="p-4 rounded-2xl bg-[#DCFCE7]/50 border border-[#16A34A]/30 shadow-card">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#15803D] block">
              STATUS AMAN
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#15803D]">
                {countAman}
              </span>
              <span className="text-[12px] font-semibold text-[#15803D]">Bahan Baku</span>
            </div>
            <span className="text-[11px] text-[#16A34A] font-medium block mt-1">
              Stok siap pakai melimpah
            </span>
          </MotionCard>
        </div>

        {/* =========================================================================
            4. SEARCH & FILTER TOOLBAR (Figma 6:835)
           ========================================================================= */}
        <div className="p-4 rounded-2xl bg-white border border-[#CBD5E1] shadow-card flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="w-full lg:w-80 relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama bahan baku (e.g. Tepung, Cabai)..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#CBD5E1] text-[13px] text-[#0B1C30] placeholder-[#5B403D]/60 focus:outline-none focus:border-[#A24F9D] transition-colors"
            />
            <span className="absolute left-3 top-2.5 text-[#5B403D]/60">
              <IconSearch size={16} />
            </span>
          </div>

          {/* Status Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-xl text-[12px] font-bold transition-all shrink-0 cursor-pointer ${
                filterStatus === 'all'
                  ? 'bg-[#5B3765] text-white shadow-xs'
                  : 'bg-[#F8FAFC] text-[#475569] border border-[#CBD5E1] hover:bg-slate-100'
              }`}
            >
              Semua ({totalItems})
            </button>
            <button
              onClick={() => setFilterStatus('kritis')}
              className={`px-3 py-1.5 rounded-xl text-[12px] font-bold transition-all shrink-0 cursor-pointer ${
                filterStatus === 'kritis'
                  ? 'bg-[#BA1A1A] text-white shadow-xs'
                  : 'bg-[#FFDAD6] text-[#93000A] border border-[#BA1A1A]/30 hover:bg-[#ffcdc7]'
              }`}
            >
              Kritis ({countKritis})
            </button>
            <button
              onClick={() => setFilterStatus('menipis')}
              className={`px-3 py-1.5 rounded-xl text-[12px] font-bold transition-all shrink-0 cursor-pointer ${
                filterStatus === 'menipis'
                  ? 'bg-[#F59E0B] text-white shadow-xs'
                  : 'bg-[#FEF3C7] text-[#92400E] border border-[#F59E0B]/30 hover:bg-[#fde68a]'
              }`}
            >
              Menipis ({countMenipis})
            </button>
            <button
              onClick={() => setFilterStatus('aman')}
              className={`px-3 py-1.5 rounded-xl text-[12px] font-bold transition-all shrink-0 cursor-pointer ${
                filterStatus === 'aman'
                  ? 'bg-[#16A34A] text-white shadow-xs'
                  : 'bg-[#DCFCE7] text-[#15803D] border border-[#16A34A]/30 hover:bg-[#bbf7d0]'
              }`}
            >
              Aman ({countAman})
            </button>
          </div>

          {/* Dropdown Filters: Category & Sort */}
          <div className="flex items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-xl border border-[#CBD5E1] text-[12px] font-semibold text-[#0B1C30] bg-white focus:outline-none focus:border-[#A24F9D] cursor-pointer"
            >
              <option value="all">Semua Kategori</option>
              <option value="Bahan Pokok">Bahan Pokok</option>
              <option value="Bumbu & Rempah">Bumbu &amp; Rempah</option>
              <option value="Isian & Protein">Isian &amp; Protein</option>
              <option value="Kemasan & Energi">Kemasan &amp; Energi</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'stock-asc' | 'stock-desc' | 'name-asc')}
              className="px-3 py-2 rounded-xl border border-[#CBD5E1] text-[12px] font-semibold text-[#0B1C30] bg-white focus:outline-none focus:border-[#A24F9D] cursor-pointer"
            >
              <option value="stock-asc">Sisa Stok Terendah</option>
              <option value="stock-desc">Stok Terbanyak</option>
              <option value="name-asc">Nama A-Z</option>
            </select>
          </div>
        </div>

        {/* =========================================================================
            5. MAIN RAW MATERIALS DATA TABLE (Figma 6:850)
           ========================================================================= */}
        <div className="rounded-2xl bg-white border border-[#CBD5E1] shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-[#FAF7F2] border-b border-[#CBD5E1] text-[#5B403D]">
                <tr>
                  <th className="py-3 px-4 font-bold">NAMA BAHAN &amp; KODE</th>
                  <th className="py-3 px-4 font-bold">KATEGORI</th>
                  <th className="py-3 px-4 font-bold text-center">STOK SAAT INI</th>
                  <th className="py-3 px-4 font-bold text-center">BATAS MINIMUM</th>
                  <th className="py-3 px-4 font-bold text-center">ESTIMASI HABIS</th>
                  <th className="py-3 px-4 font-bold text-center">STATUS</th>
                  <th className="py-3 px-4 font-bold text-center">AKSI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {filteredMaterials.length > 0 ? (
                  filteredMaterials.map((m) => (
                  <tr key={m.id} className="hover:bg-[#FFF7ED]/30 transition-colors">
                    {/* Name & Code */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#0B1C30]">{m.name}</div>
                      <div className="text-[11px] font-mono text-[#5B403D]/70">{m.code}</div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#F1F5F9] text-[#475569]">
                        {m.category}
                      </span>
                    </td>

                    {/* Current Stock */}
                    <td className="py-3.5 px-4 text-center">
                      <span className="font-extrabold text-[15px] text-[#0B1C30]">
                        {m.stock}
                      </span>{' '}
                      <span className="text-[12px] text-[#5B403D] font-medium">{m.unit}</span>
                    </td>

                    {/* Min Stock */}
                    <td className="py-3.5 px-4 text-center text-[#5B403D] font-medium">
                      {m.minStock} {m.unit}
                    </td>

                    {/* Days remaining */}
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`text-[12px] font-bold ${
                          m.computedStatus === 'kritis'
                            ? 'text-[#BA1A1A]'
                            : m.computedStatus === 'menipis'
                            ? 'text-[#D97706]'
                            : 'text-[#16A34A]'
                        }`}
                      >
                        ~{m.daysRemaining} Hari
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4 text-center">
                      {m.computedStatus === 'kritis' && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FFDAD6] text-[#93000A] border border-[#BA1A1A]/30">
                          KRITIS
                        </span>
                      )}
                      {m.computedStatus === 'menipis' && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FEF3C7] text-[#92400E] border border-[#F59E0B]/30">
                          MENIPIS
                        </span>
                      )}
                      {m.computedStatus === 'aman' && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#DCFCE7] text-[#15803D] border border-[#16A34A]/30">
                          AMAN
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => {
                            setSelectedMatId(m.id);
                            setQuickQty(10);
                            setQuickNotes('');
                            setIsRestockModalOpen(true);
                          }}
                          title="Restock Cepat"
                          className="p-1.5 rounded-lg text-[#16A34A] hover:bg-[#DCFCE7] transition-all cursor-pointer"
                        >
                          <IconArrowUp size={15} />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(m)}
                          title="Edit Rincian"
                          className="p-1.5 rounded-lg text-[#5B403D] hover:bg-slate-100 transition-all cursor-pointer"
                        >
                          <IconEdit size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-[#5B403D]">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#FFDAD6] text-[#BA1A1A] flex items-center justify-center">
                          <IconRawMaterial size={24} />
                        </div>
                        <p className="font-bold text-[16px] text-[#0B1C30]">Belum ada bahan baku yang terdaftar</p>
                        <p className="text-[13px] text-[#5B403D] max-w-sm">
                          Mulai daftarkan bahan baku seperti tepung, minyak, bumbu, dan kemasan untuk mengontrol persediaan dapur.
                        </p>
                        <button
                          onClick={handleOpenAdd}
                          className="mt-2 bg-[#A24F9D] hover:bg-[#8F3D8A] text-white text-[13px] font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-sm"
                        >
                          <IconPlus size={16} />
                          <span>Tambah Bahan Baku Pertama</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="p-4 bg-[#FAF7F2] border-t border-[#CBD5E1] text-[12px] text-[#5B403D] flex items-center justify-between">
            <span>
              Menampilkan {filteredMaterials.length} dari {totalItems} bahan baku
            </span>
            <span className="font-semibold text-[#0B1C30]">
              Estimasi Total Nilai Persediaan: Rp{' '}
              {materialsWithCategories
                .reduce((sum, m) => sum + m.stock * m.unitCost, 0)
                .toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        {/* =========================================================================
            6. MODALS: ADD/EDIT, QUICK RESTOCK, QUICK USAGE
           ========================================================================= */}
        {/* Modal Add / Edit */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl border border-[#CBD5E1] animate-scale-in">
              <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4 mb-4">
                <h3 className="font-extrabold text-lg text-[#0B1C30]">
                  {editingMaterial ? 'Edit Bahan Baku' : 'Tambah Bahan Baku Baru'}
                </h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 rounded-lg text-[#5B403D] hover:bg-slate-100"
                >
                  <IconClose size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveMaterial} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#334155] mb-1">Kode Bahan *</label>
                    <input
                      type="text"
                      required
                      value={formCode}
                      onChange={(e) => setFormCode(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#334155] mb-1">Kategori *</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] font-bold"
                    >
                      <option value="Bahan Pokok">Bahan Pokok</option>
                      <option value="Bumbu & Rempah">Bumbu &amp; Rempah</option>
                      <option value="Isian & Protein">Isian &amp; Protein</option>
                      <option value="Kemasan & Energi">Kemasan &amp; Energi</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#334155] mb-1">Nama Bahan Baku *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Contoh: Tepung Tapioka Cap Tani"
                    className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] font-semibold"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-[#334155] mb-1">Satuan *</label>
                    <select
                      value={formUnit}
                      onChange={(e) => setFormUnit(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1]"
                    >
                      <option value="kg">kg</option>
                      <option value="gram">gram</option>
                      <option value="liter">liter</option>
                      <option value="pcs">pcs</option>
                      <option value="ikat">ikat</option>
                      <option value="tabung">tabung</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-[#334155] mb-1">Stok Fisik *</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={formStock}
                      onChange={(e) => setFormStock(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#334155] mb-1">Batas Minimum *</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={formMinStock}
                      onChange={(e) => setFormMinStock(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] font-bold text-[#BA1A1A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#334155] mb-1">Harga Satuan (Rp)</label>
                    <input
                      type="number"
                      min={0}
                      value={formUnitCost}
                      onChange={(e) => setFormUnitCost(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#334155] mb-1">Pemasok Utama</label>
                    <input
                      type="text"
                      value={formSupplier}
                      onChange={(e) => setFormSupplier(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1]"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-2 border-t border-[#F1F5F9]">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-[#CBD5E1] font-bold text-[#475569]"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#A24F9D] hover:bg-[#8F3D8A] text-white font-bold"
                  >
                    Simpan Bahan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Quick Restock (Catat Stok Masuk) */}
        {isRestockModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl border border-[#CBD5E1] animate-scale-in">
              <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4 mb-4">
                <h3 className="font-extrabold text-base text-[#0B1C30] flex items-center gap-2">
                  <IconArrowUp className="text-[#16A34A]" size={18} />
                  <span>Catat Stok Masuk (Restock)</span>
                </h3>
                <button
                  onClick={() => setIsRestockModalOpen(false)}
                  className="p-1 rounded-lg text-[#5B403D] hover:bg-slate-100"
                >
                  <IconClose size={20} />
                </button>
              </div>

              <form onSubmit={handleQuickRestockSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-[#334155] mb-1">Pilih Bahan Baku *</label>
                  <select
                    value={selectedMatId}
                    onChange={(e) => setSelectedMatId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] font-bold text-[#0B1C30]"
                  >
                    {rawMaterials.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} (Stok Saat Ini: {m.stock} {m.unit})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#334155] mb-1">Jumlah Masuk *</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={quickQty}
                    onChange={(e) => setQuickQty(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] font-extrabold text-[15px] text-[#16A34A]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#334155] mb-1">Keterangan / Nomor Nota</label>
                  <input
                    type="text"
                    value={quickNotes}
                    onChange={(e) => setQuickNotes(e.target.value)}
                    placeholder="Contoh: Belanja Pasar Induk / Faktur CV-028"
                    className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1]"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-2 border-t border-[#F1F5F9]">
                  <button
                    type="button"
                    onClick={() => setIsRestockModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-[#CBD5E1] font-bold text-[#475569]"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-bold"
                  >
                    Tambah ke Stok Fisik
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Quick Usage (Pakai Produksi) */}
        {isUsageModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl border border-[#CBD5E1] animate-scale-in">
              <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4 mb-4">
                <h3 className="font-extrabold text-base text-[#0B1C30] flex items-center gap-2">
                  <IconArrowDown className="text-[#BA1A1A]" size={18} />
                  <span>Catat Pemakaian Produksi Dapur</span>
                </h3>
                <button
                  onClick={() => setIsUsageModalOpen(false)}
                  className="p-1 rounded-lg text-[#5B403D] hover:bg-slate-100"
                >
                  <IconClose size={20} />
                </button>
              </div>

              <form onSubmit={handleQuickUsageSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-[#334155] mb-1">Pilih Bahan Baku *</label>
                  <select
                    value={selectedMatId}
                    onChange={(e) => setSelectedMatId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] font-bold text-[#0B1C30]"
                  >
                    {rawMaterials.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} (Sisa: {m.stock} {m.unit})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#334155] mb-1">Jumlah Terpakai *</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={quickQty}
                    onChange={(e) => setQuickQty(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] font-extrabold text-[15px] text-[#BA1A1A]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#334155] mb-1">Keperluan Batch Olahan</label>
                  <input
                    type="text"
                    value={quickNotes}
                    onChange={(e) => setQuickNotes(e.target.value)}
                    placeholder="Contoh: Batch olahan Cireng Isi Keju 50 pcs"
                    className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1]"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-2 border-t border-[#F1F5F9]">
                  <button
                    type="button"
                    onClick={() => setIsUsageModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-[#CBD5E1] font-bold text-[#475569]"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#BA1A1A] hover:bg-[#93000A] text-white font-bold"
                  >
                    Kurangi dari Stok
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
