'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AppShell from '../components/AppShell';
import { useApp } from '../lib/context';
import {
  IconAlertTriangle,
  IconProduct,
  IconRawMaterial,
  IconPOS,
  IconFinance,
  IconArrowUp,
  IconPlus,
  IconCheckCircle,
} from '../components/Icons';

export default function DashboardPage() {
  const {
    products,
    rawMaterials,
    transactions,
    expenses,
  } = useApp();

  const [periodFilter, setPeriodFilter] = useState<'today' | '7days' | 'month'>('today');

  // Chart data for 7 days per Figma Spec (18 Okt to Hari Ini)
  const figmaChartData = [
    { label: '18 Okt', sales: 1200000, expense: 500000, sH: 60, eH: 25 },
    { label: '19 Okt', sales: 1450000, expense: 400000, sH: 72, eH: 20 },
    { label: '20 Okt', sales: 1100000, expense: 800000, sH: 55, eH: 40 },
    { label: '21 Okt', sales: 1600000, expense: 600000, sH: 80, eH: 30 },
    { label: '22 Okt', sales: 1750000, expense: 900000, sH: 88, eH: 45 },
    { label: '23 Okt', sales: 1950000, expense: 1100000, sH: 98, eH: 55 },
    { label: 'Hari Ini', sales: 1450000, expense: 350000, sH: 72, eH: 18, isToday: true },
  ];

  return (
    <AppShell>
      <div className="space-y-6 font-sans">
        {/* =========================================================================
            1. CRITICAL STOCK ALERT BANNER (Figma Frame 6:167)
            Background: #FFDAD6, Blur Overlay: #BA1A1A/10
            Alert Title: Bold 16px #93000A, Badge: Bold 11px #BA1A1A
            Description: Regular 14px rgba(147,0,10,0.9) with bold underlines
            Action Button: Bold 14px bg-[#A24F9D] hover:bg-[#8F3D8A] text-white
           ========================================================================= */}
        <div className="bg-[#FFDAD6] rounded-[12px] p-5 sm:p-6 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Decorative ambient blur circle */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#BA1A1A]/10 rounded-full blur-[40px] pointer-events-none" />

          {/* Left: Icon, Title, and Description */}
          <div className="flex items-start gap-4 relative z-10">
            <div className="w-9 h-9 rounded-[12px] bg-[#BA1A1A] text-white flex items-center justify-center shrink-0 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
              <IconAlertTriangle size={20} />
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-bold text-[16px] leading-[24px] text-[#93000A] tracking-[-0.4px]">
                  Perhatian 2 Bahan Baku Mencapai Batas Kritis!
                </h3>
                <span className="bg-[#BA1A1A] text-white text-[11px] leading-[14px] font-bold px-2 py-0.5 rounded-full tracking-[0.55px] uppercase">
                  KRITIS
                </span>
              </div>

              <div className="text-[14px] leading-[22.75px] text-[rgba(147,0,10,0.9)] max-w-2xl">
                <p>
                  <span className="font-bold underline decoration-[#BA1A1A] decoration-1">
                    Tepung Tapioka tinggal 15 kg
                  </span>{' '}
                  (min. 25 kg){' '}
                  <span className="font-bold underline decoration-[#BA1A1A] decoration-1">
                    Minyak Goreng tinggal 2 L
                  </span>{' '}
                  (min. 10 L). Segera lakukan pembelian untuk mencegah terhentinya aktivitas dapur produksi hari ini!
                </p>
              </div>
            </div>
          </div>

          {/* Right: Action Button in Primary Magenta #A24F9D */}
          <div className="relative z-10 shrink-0 self-end md:self-center">
            <Link
              href="/operasional/pembelian"
              className="bg-[#A24F9D] hover:bg-[#8F3D8A] text-white text-[14px] leading-[20px] font-bold px-4 py-2.5 rounded-[12px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] flex items-center gap-2 transition-all active:scale-[0.98]"
            >
              <IconPlus size={16} />
              <span>Beli / Catat Stok Masuk</span>
            </Link>
          </div>
        </div>

        {/* =========================================================================
            2. CONTEXT & DEMO INFO BAR (Figma Frame 6:187)
            Dot: #833E17, Text: #0B1C30 SemiBold 12px
            Badge: #E5EEFF / #5B403D Medium 11px
            Right: Sync text #5B403D Regular 12px
           ========================================================================= */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#833E17] shrink-0" />
            <span className="font-semibold text-[#0B1C30] text-[12px] leading-[16px] tracking-[0.24px]">
              Ikhtisar Operasional Dapur & Penjualan Harian
            </span>
            <span className="bg-[#E5EEFF] text-[#5B403D] text-[11px] leading-[14px] font-medium px-2 py-0.5 rounded-[6px] tracking-[0.33px]">
              Data Demonstrasi / Kasir Lokal
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[#5B403D] text-[12px] leading-[18px]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
            <span>Sinkronisasi otomatis setiap 5 menit</span>
          </div>
        </div>

        {/* =========================================================================
            3. SECTION - 5 KPI SUMMARY CARDS (Figma Frame 6:199)
            5 Columns, 4px Top color accent, Plus Jakarta Sans typography
            Card 1: TOTAL PRODUK JADI (Top #A24F9D, Value: 8 Varian, Semua Varian Aktif)
            Card 2: TOTAL BAHAN BAKU (Top #BA1A1A, Value: 14 Item, 2 Kritis / 3 Menipis / 9 Aman)
            Card 3: PRODUK MENIPIS (Top #F59E0B, Value: 2 SKU, Keju Pedas, Rujak Jumbo)
            Card 4: PENJUALAN HARI INI (Top #16A34A, Value: Rp 1.450.000, 116 bks)
            Card 5: PENGELUARAN BULAN INI (Top #833E17, Value: Rp 8.750.000, Belanja bahan & gas)
           ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Card 1: TOTAL PRODUK JADI */}
          <div className="bg-white rounded-[12px] p-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#A24F9D]" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] leading-[14px] font-bold uppercase tracking-[0.55px] text-[#5B403D]">
                TOTAL PRODUK JADI
              </span>
              <div className="w-9 h-9 rounded-[12px] bg-[#E5EEFF] text-[#A24F9D] flex items-center justify-center">
                <IconProduct size={18} />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="text-[32px] leading-[40px] font-bold text-[#0B1C30] tracking-[-0.64px]">
                  {products.length || 8}
                </span>
                <span className="text-[12px] leading-[16px] font-medium text-[#5B403D] tracking-[0.24px]">
                  Varian
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[12px] leading-[18px] text-[#15803D] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
                <span>Semua Varian Aktif</span>
              </div>
            </div>
          </div>

          {/* Card 2: TOTAL BAHAN BAKU */}
          <div className="bg-white rounded-[12px] p-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#BA1A1A]" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] leading-[14px] font-bold uppercase tracking-[0.55px] text-[#5B403D]">
                TOTAL BAHAN BAKU
              </span>
              <div className="w-9 h-9 rounded-[12px] bg-[#FFDAD6] text-[#BA1A1A] flex items-center justify-center">
                <IconRawMaterial size={18} />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="text-[32px] leading-[40px] font-bold text-[#0B1C30] tracking-[-0.64px]">
                  {rawMaterials.length || 14}
                </span>
                <span className="text-[12px] leading-[16px] font-medium text-[#5B403D] tracking-[0.24px]">
                  Item
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] leading-[14px] font-bold">
                <span className="bg-[#FFDAD6] text-[#93000A] px-1.5 py-0.5 rounded-[4px] tracking-[0.33px]">
                  2 Kritis
                </span>
                <span className="bg-[#FEF3C7] text-[#92400E] px-1.5 py-0.5 rounded-[4px] tracking-[0.33px]">
                  3 Menipis
                </span>
                <span className="bg-[#DCFCE7] text-[#166534] px-1.5 py-0.5 rounded-[4px] tracking-[0.33px]">
                  9 Aman
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: PRODUK MENIPIS */}
          <div className="bg-white rounded-[12px] p-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#F59E0B]" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] leading-[14px] font-bold uppercase tracking-[0.55px] text-[#5B403D]">
                PRODUK MENIPIS
              </span>
              <div className="w-9 h-9 rounded-[12px] bg-[#FFFBEB] text-[#F59E0B] flex items-center justify-center">
                <IconAlertTriangle size={18} />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-[32px] leading-[40px] font-bold text-[#B45309] tracking-[-0.64px]">
                  2
                </span>
                <span className="text-[12px] leading-[16px] font-medium text-[#5B403D] tracking-[0.24px]">
                  SKU Siap Jual
                </span>
              </div>
              <p className="text-[12px] leading-[18px] text-[#5B403D] truncate">
                Keju Pedas, Rujak Jumbo
              </p>
            </div>
          </div>

          {/* Card 4: PENJUALAN HARI INI */}
          <div className="bg-white rounded-[12px] p-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#16A34A]" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] leading-[14px] font-bold uppercase tracking-[0.55px] text-[#5B403D]">
                PENJUALAN HARI INI
              </span>
              <div className="w-9 h-9 rounded-[12px] bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center">
                <IconPOS size={18} />
              </div>
            </div>
            <div>
              <div className="text-[24px] leading-[32px] font-bold text-[#0B1C30] tracking-[-0.6px] mb-1">
                Rp 1.450.000
              </div>
              <div className="flex items-center gap-1 text-[11px] leading-[14px] text-[#15803D] font-semibold tracking-[0.33px]">
                <IconArrowUp size={13} />
                <span>116 bks (Target 150)</span>
              </div>
            </div>
          </div>

          {/* Card 5: PENGELUARAN BULAN INI */}
          <div className="bg-white rounded-[12px] p-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#833E17]" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] leading-[14px] font-bold uppercase tracking-[0.55px] text-[#5B403D]">
                PENGELUARAN BULAN INI
              </span>
              <div className="w-9 h-9 rounded-[12px] bg-[#FFDBCC] text-[#833E17] flex items-center justify-center">
                <IconFinance size={18} />
              </div>
            </div>
            <div>
              <div className="text-[24px] leading-[32px] font-bold text-[#0B1C30] tracking-[-0.6px] mb-1">
                Rp 8.750.000
              </div>
              <p className="text-[12px] leading-[18px] text-[#5B403D] truncate">
                Belanja bahan & gas LPG
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            4. SECTION - GRID UTAMA: VISUALISASI TREN & PEMBELIAN SEGERA (Figma Frame 6:281)
            Left: Panel Kiri Visualisasi Tren Penjualan & Pengeluaran (2/3 lebar)
            Right: Panel Kanan Kebutuhan Mendesak Bahan Baku Perlu Dibeli (1/3 lebar)
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel: Visualisasi Tren Penjualan & Pengeluaran */}
          <div className="lg:col-span-2 bg-white rounded-[12px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col justify-between space-y-4">
            {/* Header: Subtitle, Title & Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] leading-[14px] font-bold uppercase tracking-[0.55px] text-[#A24F9D] block mb-0.5">
                  ANALISIS KEUANGAN & ARUS BARANG
                </span>
                <h2 className="text-[20px] leading-[28px] font-bold text-[#0B1C30]">
                  Tren Penjualan & Pengeluaran 7 Hari Terakhir
                </h2>
              </div>

              {/* Tabs: Harian, Mingguan, Bulanan */}
              <div className="bg-[#EFF4FF] p-1 rounded-[12px] flex items-center gap-1 self-start sm:self-center">
                <button
                  type="button"
                  onClick={() => setPeriodFilter('today')}
                  className={`px-3 py-1 rounded-[8px] text-[11px] leading-[14px] font-semibold tracking-[0.33px] transition-all ${
                    periodFilter === 'today'
                      ? 'bg-[#A24F9D] text-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]'
                      : 'text-[#5B403D] hover:text-[#0B1C30]'
                  }`}
                >
                  Harian
                </button>
                <button
                  type="button"
                  onClick={() => setPeriodFilter('7days')}
                  className={`px-3 py-1 rounded-[8px] text-[11px] leading-[14px] font-semibold tracking-[0.33px] transition-all ${
                    periodFilter === '7days'
                      ? 'bg-[#A24F9D] text-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]'
                      : 'text-[#5B403D] hover:text-[#0B1C30]'
                  }`}
                >
                  Mingguan
                </button>
                <button
                  type="button"
                  onClick={() => setPeriodFilter('month')}
                  className={`px-3 py-1 rounded-[8px] text-[11px] leading-[14px] font-semibold tracking-[0.33px] transition-all ${
                    periodFilter === 'month'
                      ? 'bg-[#A24F9D] text-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]'
                      : 'text-[#5B403D] hover:text-[#0B1C30]'
                  }`}
                >
                  Bulanan
                </button>
              </div>
            </div>

            {/* Legend & Summary Row */}
            <div className="border-b border-[rgba(220,233,255,0.4)] pb-2.5 pt-1 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-4 text-[12px] leading-[16px] tracking-[0.24px]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-[4px] bg-[#A24F9D] shrink-0" />
                  <span className="text-[#5B403D]">
                    Penjualan: <strong className="text-[#0B1C30] font-bold">Rp 10.820.000</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-[4px] bg-[#A1552D] shrink-0" />
                  <span className="text-[#5B403D]">
                    Pengeluaran: <strong className="text-[#0B1C30] font-bold">Rp 4.150.000</strong>
                  </span>
                </div>
              </div>

              <div className="bg-[#F0FDF4] px-2 py-0.5 rounded-full flex items-center gap-1 text-[11px] leading-[14px] font-bold text-[#15803D] tracking-[0.33px]">
                <IconArrowUp size={11} />
                <span>Margin Kotor +61.6%</span>
              </div>
            </div>

            {/* Dual-bar Chart per Figma specs */}
            <div className="h-56 pt-2 flex items-end justify-between gap-3 sm:gap-6 px-2">
              {figmaChartData.map((bar) => (
                <div key={bar.label} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full flex items-end justify-center gap-1.5 h-44">
                    {/* Penjualan Bar in Primary Magenta #A24F9D */}
                    <div
                      style={{ height: `${bar.sH}%` }}
                      className="w-full max-w-[20px] bg-[#A24F9D] hover:brightness-110 rounded-t-[4px] transition-all cursor-pointer"
                      title={`Penjualan: Rp ${bar.sales.toLocaleString('id-ID')}`}
                    />
                    {/* Pengeluaran Bar in Brown Accent #A1552D */}
                    <div
                      style={{ height: `${bar.eH}%` }}
                      className="w-full max-w-[20px] bg-[#A1552D] hover:brightness-110 rounded-t-[4px] transition-all cursor-pointer"
                      title={`Pengeluaran: Rp ${bar.expense.toLocaleString('id-ID')}`}
                    />
                  </div>

                  <span
                    className={`text-[12px] leading-[16px] ${
                      bar.isToday ? 'font-bold text-[#A24F9D]' : 'font-semibold text-[#625E58]'
                    }`}
                  >
                    {bar.label}
                  </span>
                </div>
              ))}
            </div>

            {/* 3 Detail Arus Masuk Keluar Barang Cepat */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-[rgba(220,233,255,0.4)]">
              <div className="bg-[#EFF4FF] p-2 rounded-[12px] flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#D3E4FE] text-[#A24F9D] flex items-center justify-center shrink-0">
                  <IconProduct size={16} />
                </div>
                <div>
                  <p className="text-[11px] leading-[14px] font-bold text-[#5B403D] tracking-[0.33px]">
                    Barang Diterima
                  </p>
                  <p className="text-[14px] leading-[20px] font-bold text-[#0B1C30] tracking-[0.14px]">
                    3 Pesanan (Pagi)
                  </p>
                </div>
              </div>

              <div className="bg-[#EFF4FF] p-2 rounded-[12px] flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#D3E4FE] text-[#833E17] flex items-center justify-center shrink-0">
                  <IconRawMaterial size={16} />
                </div>
                <div>
                  <p className="text-[11px] leading-[14px] font-bold text-[#5B403D] tracking-[0.33px]">
                    Terpakai Dapur
                  </p>
                  <p className="text-[14px] leading-[20px] font-bold text-[#0B1C30] tracking-[0.14px]">
                    32 kg Tepung
                  </p>
                </div>
              </div>

              <div className="bg-[#EFF4FF] p-2 rounded-[12px] flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#D3E4FE] text-[#16A34A] flex items-center justify-center shrink-0">
                  <IconPOS size={16} />
                </div>
                <div>
                  <p className="text-[11px] leading-[14px] font-bold text-[#5B403D] tracking-[0.33px]">
                    Output Kemasan
                  </p>
                  <p className="text-[14px] leading-[20px] font-bold text-[#0B1C30] tracking-[0.14px]">
                    140 Pack Siap Jual
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Daftar Bahan Baku yang Perlu Segera Dibeli */}
          <div className="lg:col-span-1 bg-white rounded-[12px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col justify-between space-y-4">
            <div>
              {/* Header */}
              <div className="border-b border-[rgba(220,233,255,0.4)] pb-2.5 flex items-center justify-between mb-3">
                <div>
                  <span className="text-[11px] leading-[14px] font-bold uppercase tracking-[0.55px] text-[#BA1A1A] block">
                    KEBUTUHAN MENDESAK
                  </span>
                  <h3 className="text-[16px] leading-[24px] font-bold text-[#0B1C30]">
                    Bahan Baku Perlu Dibeli
                  </h3>
                </div>
                <span className="bg-[#FFDAD6] text-[#93000A] text-[11px] leading-[14px] font-bold px-2 py-0.5 rounded-full tracking-[0.33px]">
                  5 Item
                </span>
              </div>

              {/* 3 Urgent Items */}
              <div className="space-y-3">
                {/* Item 1: Tepung Tapioka */}
                <div className="bg-[#EFF4FF] p-2.5 rounded-[12px] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#BA1A1A] shrink-0" />
                      <span className="text-[14px] leading-[20px] font-bold text-[#0B1C30] tracking-[0.14px]">
                        Tepung Tapioka (Cap Gunung)
                      </span>
                    </div>
                    <span className="bg-[#FFDAD6] text-[#93000A] text-[11px] leading-[14px] font-bold px-2 py-0.5 rounded-full">
                      Kritis
                    </span>
                  </div>

                  <div className="bg-white rounded-[8px] py-1.5 px-2 grid grid-cols-3 text-center">
                    <div>
                      <p className="text-[12px] leading-[18px] text-[#5B403D]">Sisa Stok</p>
                      <p className="text-[14px] leading-[20px] font-bold text-[#BA1A1A]">15 kg</p>
                    </div>
                    <div>
                      <p className="text-[12px] leading-[18px] text-[#5B403D]">Min. Stok</p>
                      <p className="text-[14px] leading-[20px] font-semibold text-[#0B1C30]">50 kg</p>
                    </div>
                    <div>
                      <p className="text-[12px] leading-[18px] text-[#5B403D]">Estimasi/kg</p>
                      <p className="text-[14px] leading-[20px] font-semibold text-[#0B1C30]">Rp 12.500</p>
                    </div>
                  </div>

                  <Link
                    href="/operasional/pembelian"
                    className="w-full bg-[#D3E4FE] hover:bg-[#C2DAFD] text-[#A24F9D] py-1.5 rounded-[8px] text-[11px] leading-[14px] font-bold tracking-[0.33px] flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>+ Restock Cepat</span>
                  </Link>
                </div>

                {/* Item 2: Minyak Goreng Curah */}
                <div className="bg-[#EFF4FF] p-2.5 rounded-[12px] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#BA1A1A] shrink-0" />
                      <span className="text-[14px] leading-[20px] font-bold text-[#0B1C30] tracking-[0.14px]">
                        Minyak Goreng Curah
                      </span>
                    </div>
                    <span className="bg-[#FFDAD6] text-[#93000A] text-[11px] leading-[14px] font-bold px-2 py-0.5 rounded-full">
                      Kritis
                    </span>
                  </div>

                  <div className="bg-white rounded-[8px] py-1.5 px-2 grid grid-cols-3 text-center">
                    <div>
                      <p className="text-[12px] leading-[18px] text-[#5B403D]">Sisa Stok</p>
                      <p className="text-[14px] leading-[20px] font-bold text-[#BA1A1A]">8 Liter</p>
                    </div>
                    <div>
                      <p className="text-[12px] leading-[18px] text-[#5B403D]">Min. Stok</p>
                      <p className="text-[14px] leading-[20px] font-semibold text-[#0B1C30]">25 Liter</p>
                    </div>
                    <div>
                      <p className="text-[12px] leading-[18px] text-[#5B403D]">Estimasi/L</p>
                      <p className="text-[14px] leading-[20px] font-semibold text-[#0B1C30]">Rp 16.000</p>
                    </div>
                  </div>

                  <Link
                    href="/operasional/pembelian"
                    className="w-full bg-[#D3E4FE] hover:bg-[#C2DAFD] text-[#A24F9D] py-1.5 rounded-[8px] text-[11px] leading-[14px] font-bold tracking-[0.33px] flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>+ Restock Cepat</span>
                  </Link>
                </div>

                {/* Item 3: Cabai Rawit Merah */}
                <div className="bg-[#EFF4FF] p-2.5 rounded-[12px] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] shrink-0" />
                      <span className="text-[14px] leading-[20px] font-bold text-[#0B1C30] tracking-[0.14px]">
                        Cabai Rawit Merah
                      </span>
                    </div>
                    <span className="bg-[#FEF3C7] text-[#92400E] text-[11px] leading-[14px] font-bold px-2 py-0.5 rounded-full">
                      Menipis
                    </span>
                  </div>

                  <div className="bg-white rounded-[8px] py-1.5 px-2 grid grid-cols-3 text-center">
                    <div>
                      <p className="text-[12px] leading-[18px] text-[#5B403D]">Sisa Stok</p>
                      <p className="text-[14px] leading-[20px] font-bold text-[#B45309]">3.5 kg</p>
                    </div>
                    <div>
                      <p className="text-[12px] leading-[18px] text-[#5B403D]">Min. Stok</p>
                      <p className="text-[14px] leading-[20px] font-semibold text-[#0B1C30]">8 kg</p>
                    </div>
                    <div>
                      <p className="text-[12px] leading-[18px] text-[#5B403D]">Estimasi/kg</p>
                      <p className="text-[14px] leading-[20px] font-semibold text-[#0B1C30]">Rp 48.000</p>
                    </div>
                  </div>

                  <Link
                    href="/operasional/pembelian"
                    className="w-full bg-[#D3E4FE] hover:bg-[#C2DAFD] text-[#A24F9D] py-1.5 rounded-[8px] text-[11px] leading-[14px] font-bold tracking-[0.33px] flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>+ Restock Cepat</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Link: Lihat Semua 14 Bahan Baku */}
            <div className="pt-2">
              <Link
                href="/data-master/bahan-baku"
                className="w-full bg-[#E5EEFF] hover:bg-[#D3E4FE] text-[#0B1C30] py-2.5 rounded-[12px] text-[12px] leading-[16px] font-bold tracking-[0.24px] text-center flex items-center justify-center gap-2 transition-colors"
              >
                <span>Lihat Semua 14 Bahan Baku</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* =========================================================================
            5. SECTION - BAGIAN BAWAH: LOG AKTIVITAS STOK & PRODUK TERLARIS (Figma Frame 6:463)
            Left: Kolom 1 & 2 Tabel Aktivitas Stok & Perubahan Terakhir (2/3 lebar)
            Right: Kolom 3 Card Ringkasan Produk Terlaris Minggu Ini (1/3 lebar)
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Tabel Aktivitas Stok */}
          <div className="lg:col-span-2 bg-white rounded-[12px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col justify-between space-y-4">
            <div>
              {/* Header */}
              <div className="border-b border-[rgba(220,233,255,0.4)] pb-2.5 flex items-center justify-between mb-3">
                <div>
                  <span className="text-[11px] leading-[14px] font-bold uppercase tracking-[0.55px] text-[#A24F9D] block">
                    AUDIT MUTASI INVENTORI
                  </span>
                  <h3 className="text-[20px] leading-[28px] font-bold text-[#0B1C30]">
                    Riwayat Perubahan Stok Terakhir
                  </h3>
                </div>
                <Link
                  href="/operasional/penyesuaian-stok"
                  className="text-[11px] leading-[14px] font-bold text-[#A24F9D] hover:underline tracking-[0.33px] flex items-center gap-1"
                >
                  <span>Buka Riwayat Lengkap</span>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-[#EFF4FF] text-[#5B403D] text-[11px] leading-[14px] font-bold uppercase tracking-[0.55px]">
                      <th className="py-3 px-3 rounded-l-[8px]">WAKTU</th>
                      <th className="py-3 px-3">ITEM / SKU</th>
                      <th className="py-3 px-3">JENIS MUTASI</th>
                      <th className="py-3 px-3 text-right">JUMLAH</th>
                      <th className="py-3 px-3">DILAKUKAN OLEH</th>
                      <th className="py-3 px-3 text-center rounded-r-[8px]">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[rgba(220,233,255,0.4)] text-[12px] leading-[16px]">
                    {/* Log 1 */}
                    <tr className="hover:bg-[#FFF7ED]/50 transition-colors">
                      <td className="py-3 px-3 text-[#5B403D] whitespace-nowrap">13:45 WIB</td>
                      <td className="py-3 px-3">
                        <div className="font-bold text-[#0B1C30] tracking-[0.24px]">Cireng Rujak Original</div>
                        <div className="text-[#5B403D] text-[11px]">PRD-CR-01</div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="bg-[#FFDAD6] text-[#93000A] text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">
                          Keluar (Kasir)
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-[#BA1A1A] whitespace-nowrap">
                        -24 pack
                      </td>
                      <td className="py-3 px-3 text-[#0B1C30] font-medium whitespace-nowrap">
                        Rina (Kasir Outlet)
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="inline-flex items-center gap-1 bg-[#F0FDF4] text-[#15803D] text-[11px] font-bold px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                          <span>Sukses</span>
                        </span>
                      </td>
                    </tr>

                    {/* Log 2 */}
                    <tr className="hover:bg-[#FFF7ED]/50 transition-colors">
                      <td className="py-3 px-3 text-[#5B403D] whitespace-nowrap">11:20 WIB</td>
                      <td className="py-3 px-3">
                        <div className="font-bold text-[#0B1C30] tracking-[0.24px]">Bawang Putih Kating</div>
                        <div className="text-[#5B403D] text-[11px]">RAW-BP-04</div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="bg-[#DCFCE7] text-[#166534] text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">
                          Masuk (Beli)
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-[#15803D] whitespace-nowrap">
                        +10 kg
                      </td>
                      <td className="py-3 px-3 text-[#0B1C30] font-medium whitespace-nowrap">
                        Kang Asep (Owner)
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="inline-flex items-center gap-1 bg-[#F0FDF4] text-[#15803D] text-[11px] font-bold px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                          <span>Terverifikasi</span>
                        </span>
                      </td>
                    </tr>

                    {/* Log 3 */}
                    <tr className="hover:bg-[#FFF7ED]/50 transition-colors">
                      <td className="py-3 px-3 text-[#5B403D] whitespace-nowrap">09:10 WIB</td>
                      <td className="py-3 px-3">
                        <div className="font-bold text-[#0B1C30] tracking-[0.24px]">Minyak Goreng Curah</div>
                        <div className="text-[#5B403D] text-[11px]">RAW-MY-02</div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="bg-[#FEF3C7] text-[#92400E] text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">
                          Keluar (Dapur)
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-[#0B1C30] whitespace-nowrap">
                        -12 Liter
                      </td>
                      <td className="py-3 px-3 text-[#0B1C30] font-medium whitespace-nowrap">
                        Ujang (Koki Dapur)
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="inline-flex items-center gap-1 bg-[#F0FDF4] text-[#15803D] text-[11px] font-bold px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                          <span>Selesai</span>
                        </span>
                      </td>
                    </tr>

                    {/* Log 4 */}
                    <tr className="hover:bg-[#FFF7ED]/50 transition-colors">
                      <td className="py-3 px-3 text-[#5B403D] whitespace-nowrap">08:30 WIB</td>
                      <td className="py-3 px-3">
                        <div className="font-bold text-[#0B1C30] tracking-[0.24px]">Cireng Pedas Jeletot</div>
                        <div className="text-[#5B403D] text-[11px]">PRD-CP-03</div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="bg-[#DCFCE7] text-[#166534] text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">
                          Masuk (Hasil Olah)
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-[#15803D] whitespace-nowrap">
                        +60 pack
                      </td>
                      <td className="py-3 px-3 text-[#0B1C30] font-medium whitespace-nowrap">
                        Ujang (Koki Dapur)
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="inline-flex items-center gap-1 bg-[#F0FDF4] text-[#15803D] text-[11px] font-bold px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                          <span>QC Lolos</span>
                        </span>
                      </td>
                    </tr>

                    {/* Log 5 */}
                    <tr className="hover:bg-[#FFF7ED]/50 transition-colors">
                      <td className="py-3 px-3 text-[#5B403D] whitespace-nowrap">Kemarin, 19:40</td>
                      <td className="py-3 px-3">
                        <div className="font-bold text-[#0B1C30] tracking-[0.24px]">Tepung Tapioka (Cap Gunung)</div>
                        <div className="text-[#5B403D] text-[11px]">RAW-TP-01</div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="bg-[#DCE9FF] text-[#0B1C30] text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">
                          Koreksi Audit Opname
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-[#BA1A1A] whitespace-nowrap">
                        -2 kg (Susut)
                      </td>
                      <td className="py-3 px-3 text-[#0B1C30] font-medium whitespace-nowrap">
                        Kang Asep (Owner)
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="bg-[#FEF3C7] text-[#92400E] text-[11px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                          Penyesuaian
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table Footer */}
            <div className="border-t border-[rgba(220,233,255,0.4)] pt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-[#5B403D] text-[12px] leading-[18px]">
                Menampilkan 5 mutasi terkini dari 48 pencatatan minggu ini
              </span>
              <button
                type="button"
                className="text-[#A24F9D] hover:underline font-bold text-[12px] leading-[16px] tracking-[0.24px]"
              >
                Unduh Laporan Audit (.XLS)
              </button>
            </div>
          </div>

          {/* Right: Card Ringkasan Produk Terlaris Minggu Ini */}
          <div className="lg:col-span-1 bg-white rounded-[12px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col justify-between space-y-4">
            <div>
              {/* Header */}
              <div className="border-b border-[rgba(220,233,255,0.4)] pb-2.5 flex items-center justify-between mb-4">
                <div>
                  <span className="text-[11px] leading-[14px] font-bold uppercase tracking-[0.55px] text-[#15803D] block">
                    PERFORMA PENJUALAN
                  </span>
                  <h3 className="text-[16px] leading-[24px] font-bold text-[#0B1C30]">
                    Produk Terlaris Minggu Ini
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#DCFCE7] text-[#15803D] flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
              </div>

              {/* 3 Best Selling Products */}
              <div className="space-y-3">
                {/* Juara 1: Cireng Rujak Original */}
                <div className="bg-[#EFF4FF] p-2.5 rounded-[12px] flex items-center gap-3">
                  <div className="w-14 h-14 rounded-[12px] bg-white border border-[#CBD5E1]/40 relative overflow-hidden flex items-center justify-center shrink-0">
                    <span className="text-xl">🥟</span>
                    <span className="absolute top-1 left-1 w-5 h-5 rounded-full bg-[#FBBF24] text-[#0B1C30] text-[12px] font-bold flex items-center justify-center shadow-xs">
                      1
                    </span>
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-bold text-[14px] leading-[20px] text-[#0B1C30] truncate">
                        Cireng Rujak Original
                      </h4>
                      <span className="font-bold text-[14px] leading-[20px] text-[#A24F9D] shrink-0">
                        Rp 5.100.000
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] leading-[14px]">
                      <span className="text-[#5B403D]">Terjual 340 Bungkus</span>
                      <span className="text-[#15803D] font-semibold">+18% vs mgg lalu</span>
                    </div>

                    {/* Progress Bar with #A24F9D */}
                    <div className="w-full bg-[#D3E4FE] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#A24F9D] h-full rounded-full" style={{ width: '88%' }} />
                    </div>
                  </div>
                </div>

                {/* Juara 2: Cireng Pedas Jeletot */}
                <div className="bg-[#EFF4FF] p-2.5 rounded-[12px] flex items-center gap-3">
                  <div className="w-14 h-14 rounded-[12px] bg-white border border-[#CBD5E1]/40 relative overflow-hidden flex items-center justify-center shrink-0">
                    <span className="text-xl">🌶️</span>
                    <span className="absolute top-1 left-1 w-5 h-5 rounded-full bg-[#CBD5E1] text-[#0B1C30] text-[12px] font-bold flex items-center justify-center shadow-xs">
                      2
                    </span>
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-bold text-[14px] leading-[20px] text-[#0B1C30] truncate">
                        Cireng Pedas Jeletot
                      </h4>
                      <span className="font-bold text-[14px] leading-[20px] text-[#A24F9D] shrink-0">
                        Rp 4.240.000
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] leading-[14px]">
                      <span className="text-[#5B403D]">Terjual 265 Bungkus</span>
                      <span className="text-[#15803D] font-semibold">+12% vs mgg lalu</span>
                    </div>

                    {/* Progress Bar with #C92A2A */}
                    <div className="w-full bg-[#D3E4FE] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#C92A2A] h-full rounded-full" style={{ width: '68%' }} />
                    </div>
                  </div>
                </div>

                {/* Juara 3: Cireng Keju Lumer */}
                <div className="bg-[#EFF4FF] p-2.5 rounded-[12px] flex items-center gap-3">
                  <div className="w-14 h-14 rounded-[12px] bg-white border border-[#CBD5E1]/40 relative overflow-hidden flex items-center justify-center shrink-0">
                    <span className="text-xl">🧀</span>
                    <span className="absolute top-1 left-1 w-5 h-5 rounded-full bg-[#B45309] text-white text-[12px] font-bold flex items-center justify-center shadow-xs">
                      3
                    </span>
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-bold text-[14px] leading-[20px] text-[#0B1C30] truncate">
                        Cireng Keju Lumer
                      </h4>
                      <span className="font-bold text-[14px] leading-[20px] text-[#A24F9D] shrink-0">
                        Rp 3.420.000
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] leading-[14px]">
                      <span className="text-[#5B403D]">Terjual 190 Bungkus</span>
                      <span className="text-[#5B403D] font-semibold">Stabil</span>
                    </div>

                    {/* Progress Bar with #A1552D */}
                    <div className="w-full bg-[#D3E4FE] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#A1552D] h-full rounded-full" style={{ width: '49%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendation Production Card */}
            <div className="bg-[#E5EEFF] rounded-[12px] p-3.5 flex items-center justify-between gap-2">
              <div className="text-[12px]">
                <p className="font-bold text-[#0B1C30] leading-[16px] tracking-[0.24px]">
                  Rekomendasi Produksi:
                </p>
                <p className="text-[#5B403D] leading-[18px] mt-0.5">
                  Fokus adonan Rujak Original & Jeletot jelang akhir pekan!
                </p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-[#D3E4FE] text-[#0B1C30] flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
