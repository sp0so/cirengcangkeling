'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import AppShell from '../components/AppShell';
import WordRevealHeading from '../components/WordRevealHeading';
import MotionCard from '../components/MotionCard';
import { useApp } from '../lib/context';
import { formatOutletCopy } from '../lib/businessInfo';
import {
  IconAlertTriangle,
  IconProduct,
  IconRawMaterial,
  IconPOS,
  IconFinance,
  IconArrowUp,
  IconPlus,
  IconCheckCircle,
  IconPepper,
  IconCrown,
  IconSparkles,
} from '../components/Icons';

export default function DashboardPage() {
  const {
    products,
    rawMaterials,
    transactions,
    expenses,
    stockMovements,
  } = useApp();

  const [periodFilter, setPeriodFilter] = useState<'today' | '7days' | 'month'>('7days');

  // Today's date strings
  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);
  const currentMonthStr = useMemo(() => todayStr.substring(0, 7), [todayStr]);

  // 1. Critical Materials Calculation
  const criticalMaterials = useMemo(
    () => rawMaterials.filter((m) => m.stock < m.minStock),
    [rawMaterials]
  );
  const warningMaterials = useMemo(
    () => rawMaterials.filter((m) => m.stock >= m.minStock && m.stock <= m.minStock * 1.5),
    [rawMaterials]
  );
  const safeMaterialsCount = useMemo(
    () => rawMaterials.filter((m) => m.stock > m.minStock * 1.5).length,
    [rawMaterials]
  );

  // 2. Low-stock products calculation
  const lowStockProducts = useMemo(
    () => products.filter((p) => p.stock <= p.minStock),
    [products]
  );

  // 3. Today's sales calculation
  const todayTransactions = useMemo(
    () => transactions.filter((tx) => tx.date && tx.date.startsWith(todayStr) && tx.status !== 'dibatalkan'),
    [transactions, todayStr]
  );
  const todaySalesTotal = useMemo(
    () => todayTransactions.reduce((sum, tx) => sum + tx.total, 0),
    [todayTransactions]
  );
  const todayPacksSold = useMemo(
    () =>
      todayTransactions.reduce(
        (sum, tx) => sum + tx.items.reduce((iSum, it) => iSum + it.quantity, 0),
        0
      ),
    [todayTransactions]
  );

  // 4. Monthly expenses calculation
  const monthlyExpenses = useMemo(
    () => expenses.filter((exp) => exp.date && exp.date.startsWith(currentMonthStr)),
    [expenses, currentMonthStr]
  );
  const monthlyExpenseTotal = useMemo(
    () => monthlyExpenses.reduce((sum, exp) => sum + exp.amount, 0),
    [monthlyExpenses]
  );

  // 5. Dynamic 7-day trend chart
  const dynamicChartData = useMemo(() => {
    const days: { label: string; dateStr: string; sales: number; expense: number; isToday: boolean }[] = [];
    const now = new Date();

    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
      const isToday = i === 0;

      const daySales = transactions
        .filter((tx) => tx.date && tx.date.startsWith(dateStr) && tx.status !== 'dibatalkan')
        .reduce((sum, tx) => sum + tx.total, 0);

      const dayExpense = expenses
        .filter((exp) => exp.date && exp.date.startsWith(dateStr))
        .reduce((sum, exp) => sum + exp.amount, 0);

      days.push({
        label: isToday ? 'Hari Ini' : dayName,
        dateStr,
        sales: daySales,
        expense: dayExpense,
        isToday,
      });
    }

    const maxVal = Math.max(
      ...days.map((d) => Math.max(d.sales, d.expense)),
      100000 // minimum baseline
    );

    return days.map((d) => ({
      ...d,
      sH: Math.round((d.sales / maxVal) * 90) + (d.sales > 0 ? 5 : 0),
      eH: Math.round((d.expense / maxVal) * 90) + (d.expense > 0 ? 5 : 0),
    }));
  }, [transactions, expenses]);

  const total7DaySales = useMemo(
    () => dynamicChartData.reduce((sum, d) => sum + d.sales, 0),
    [dynamicChartData]
  );
  const total7DayExpense = useMemo(
    () => dynamicChartData.reduce((sum, d) => sum + d.expense, 0),
    [dynamicChartData]
  );
  const grossMarginPercent = useMemo(() => {
    if (total7DaySales === 0) return 0;
    return Math.round(((total7DaySales - total7DayExpense) / total7DaySales) * 100);
  }, [total7DaySales, total7DayExpense]);

  // 6. Dynamic Top Selling Products
  const bestSellers = useMemo(() => {
    const counts: { [name: string]: { count: number; revenue: number } } = {};
    transactions.forEach((tx) => {
      if (tx.status !== 'dibatalkan') {
        tx.items.forEach((item) => {
          if (!counts[item.productName]) {
            counts[item.productName] = { count: 0, revenue: 0 };
          }
          counts[item.productName].count += item.quantity;
          counts[item.productName].revenue += item.subtotal;
        });
      }
    });

    const sorted = Object.entries(counts)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.count - a.count);

    const maxCount = sorted.length > 0 ? sorted[0].count : 1;
    return sorted.slice(0, 3).map((item, idx) => ({
      rank: idx + 1,
      name: item.name,
      revenue: item.revenue,
      packsSold: item.count,
      barWidth: Math.min(100, Math.max(15, Math.round((item.count / maxCount) * 100))),
      color: idx === 0 ? '#A24F9D' : idx === 1 ? '#C92A2A' : '#A1552D',
      badgeBg: idx === 0 ? 'bg-[#FBBF24] text-[#0B1C30]' : idx === 1 ? 'bg-[#CBD5E1] text-[#0B1C30]' : 'bg-[#B45309] text-white',
      icon: idx === 0 ? <IconCrown size={20} className="text-[#D97706]" /> : idx === 1 ? <IconPepper size={20} className="text-[#DC2626]" /> : <IconSparkles size={20} className="text-[#A1552D]" />,
    }));
  }, [transactions]);

  // 7. Recent stock movements (last 5)
  const recentMovements = useMemo(() => stockMovements.slice(0, 5), [stockMovements]);

  return (
    <AppShell>
      <div className="space-y-6 font-sans">
        {/* =========================================================================
            1. CRITICAL STOCK ALERT BANNER (Dynamically Driven)
           ========================================================================= */}
        {criticalMaterials.length > 0 ? (
          <div className="bg-[#FFDAD6] rounded-[12px] p-5 sm:p-6 shadow-alert relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#BA1A1A]/10 rounded-full blur-[40px] pointer-events-none" />

            <div className="flex items-start gap-4 relative z-10">
              <div className="w-9 h-9 rounded-[12px] bg-[#BA1A1A] text-white flex items-center justify-center shrink-0 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                <IconAlertTriangle size={20} />
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-[16px] leading-[24px] text-[#93000A] tracking-[-0.4px]">
                    Perhatian: {criticalMaterials.length} Bahan Baku Mencapai Batas Kritis!
                  </h3>
                  <span className="bg-[#BA1A1A] text-white text-[11px] leading-[14px] font-bold px-2 py-0.5 rounded-full tracking-[0.55px] uppercase">
                    KRITIS
                  </span>
                </div>

                <div className="text-[14px] leading-[22px] text-[rgba(147,0,10,0.9)] max-w-2xl">
                  <p>
                    {criticalMaterials.map((mat, idx) => (
                      <span key={mat.id}>
                        <span className="font-bold underline decoration-[#BA1A1A] decoration-1">
                          {mat.name} tinggal {mat.stock} {mat.unit}
                        </span>{' '}
                        (min. {mat.minStock} {mat.unit})
                        {idx < criticalMaterials.length - 1 ? ', ' : '. '}
                      </span>
                    ))}
                    Segera lakukan pembelian bahan baku untuk mencegah terhentinya aktivitas dapur produksi!
                  </p>
                </div>
              </div>
            </div>

            <div className="relative z-10 shrink-0 self-end md:self-center">
              <Link
                href="/data-master/bahan-baku"
                className="bg-[#A24F9D] hover:bg-[#8F3D8A] text-white text-[14px] leading-[20px] font-bold px-4 py-2.5 rounded-[12px] shadow-card flex items-center gap-2 transition-all active:scale-[0.98]"
              >
                <IconPlus size={16} />
                <span>Beli / Catat Stok Masuk</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-[#DCFCE7] border border-[#16A34A]/30 rounded-[12px] p-4 flex items-center justify-between gap-3 text-[#15803D]">
            <div className="flex items-center gap-2.5">
              <IconCheckCircle size={20} className="text-[#16A34A]" />
              <span className="text-sm font-bold">
                Semua stok bahan baku saat ini berada di atas batas kritis. Operasional dapur berjalan optimal.
              </span>
            </div>
            <Link
              href="/data-master/bahan-baku"
              className="text-xs font-bold text-[#15803D] hover:underline"
            >
              + Pengadaan Baru
            </Link>
          </div>
        )}

        {/* =========================================================================
            2. CONTEXT INFO BAR
           ========================================================================= */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#833E17] shrink-0" />
            <WordRevealHeading
              text="Ikhtisar Operasional Dapur & Penjualan Terkini"
              as="span"
              className="font-semibold text-[#0B1C30] text-[12px] leading-[16px] tracking-[0.24px]"
            />
            <span className="bg-[#E5EEFF] text-[#5B403D] text-[11px] leading-[14px] font-medium px-2 py-0.5 rounded-[6px] tracking-[0.33px]">
              Database Terhubung
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[#5B403D] text-[12px] leading-[18px]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
            <span>Real-time state & localStorage synchronization</span>
          </div>
        </div>

        {/* =========================================================================
            3. SECTION - 5 KPI SUMMARY CARDS (Fully Database-Driven)
           ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Card 1: TOTAL PRODUK JADI */}
          <MotionCard delay={0.05} hoverEffect="lift" className="bg-white rounded-[12px] p-4 shadow-card relative overflow-hidden flex flex-col justify-between">
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
                  {products.length}
                </span>
                <span className="text-[12px] leading-[16px] font-medium text-[#5B403D] tracking-[0.24px]">
                  Varian
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[12px] leading-[18px] text-[#15803D] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
                <span>
                  {products.filter((p) => p.isActive).length} Varian Aktif
                </span>
              </div>
            </div>
          </MotionCard>

          {/* Card 2: TOTAL BAHAN BAKU */}
          <MotionCard delay={0.1} hoverEffect="lift" className="bg-white rounded-[12px] p-4 shadow-card relative overflow-hidden flex flex-col justify-between">
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
                  {rawMaterials.length}
                </span>
                <span className="text-[12px] leading-[16px] font-medium text-[#5B403D] tracking-[0.24px]">
                  Item
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] leading-[14px] font-bold">
                <span className="bg-[#FFDAD6] text-[#93000A] px-1.5 py-0.5 rounded-[4px] tracking-[0.33px]">
                  {criticalMaterials.length} Kritis
                </span>
                <span className="bg-[#FEF3C7] text-[#92400E] px-1.5 py-0.5 rounded-[4px] tracking-[0.33px]">
                  {warningMaterials.length} Menipis
                </span>
                <span className="bg-[#DCFCE7] text-[#166534] px-1.5 py-0.5 rounded-[4px] tracking-[0.33px]">
                  {safeMaterialsCount} Aman
                </span>
              </div>
            </div>
          </MotionCard>

          {/* Card 3: PRODUK MENIPIS */}
          <MotionCard delay={0.15} hoverEffect="lift" className="bg-white rounded-[12px] p-4 shadow-card relative overflow-hidden flex flex-col justify-between">
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
                  {lowStockProducts.length}
                </span>
                <span className="text-[12px] leading-[16px] font-medium text-[#5B403D] tracking-[0.24px]">
                  SKU Siap Jual
                </span>
              </div>
              <p className="text-[12px] leading-[18px] text-[#5B403D] truncate">
                {lowStockProducts.length > 0
                  ? lowStockProducts.map((p) => p.name).join(', ')
                  : 'Semua stok produk aman'}
              </p>
            </div>
          </MotionCard>

          {/* Card 4: PENJUALAN HARI INI */}
          <MotionCard delay={0.2} hoverEffect="lift" className="bg-white rounded-[12px] p-4 shadow-card relative overflow-hidden flex flex-col justify-between">
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
              <div className="text-[22px] leading-[30px] font-bold text-[#0B1C30] tracking-[-0.6px] mb-1 truncate">
                Rp {todaySalesTotal.toLocaleString('id-ID')}
              </div>
              <div className="flex items-center gap-1 text-[11px] leading-[14px] text-[#15803D] font-semibold tracking-[0.33px]">
                <IconArrowUp size={13} />
                <span>{todayPacksSold} bks ({todayTransactions.length} transaksi)</span>
              </div>
            </div>
          </MotionCard>

          {/* Card 5: PENGELUARAN BULAN INI */}
          <MotionCard delay={0.25} hoverEffect="lift" className="bg-white rounded-[12px] p-4 shadow-card relative overflow-hidden flex flex-col justify-between">
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
              <div className="text-[22px] leading-[30px] font-bold text-[#0B1C30] tracking-[-0.6px] mb-1 truncate">
                Rp {monthlyExpenseTotal.toLocaleString('id-ID')}
              </div>
              <p className="text-[12px] leading-[18px] text-[#5B403D] truncate">
                {monthlyExpenses.length > 0
                  ? `${monthlyExpenses.length} transaksi beban tercatat`
                  : 'Belum ada pengeluaran'}
              </p>
            </div>
          </MotionCard>
        </div>

        {/* =========================================================================
            4. SECTION - GRID UTAMA: VISUALISASI TREN & PEMBELIAN SEGERA
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel: Visualisasi Tren Penjualan & Pengeluaran 7 Hari */}
          <MotionCard delay={0.25} hoverEffect="lift" className="lg:col-span-2 bg-white rounded-[12px] p-6 shadow-card flex flex-col justify-between space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] leading-[14px] font-bold uppercase tracking-[0.55px] text-[#A24F9D] block mb-0.5">
                  ANALISIS KEUANGAN & ARUS BARANG
                </span>
                <WordRevealHeading
                  text="Tren Penjualan & Pengeluaran 7 Hari Terakhir"
                  as="h2"
                  className="text-[20px] leading-[28px] font-bold text-[#0B1C30]"
                />
              </div>

              <div className="bg-[#EFF4FF] p-1 rounded-[12px] flex items-center gap-1 self-start sm:self-center">
                <button
                  type="button"
                  onClick={() => setPeriodFilter('today')}
                  className={`px-3 py-1 rounded-[8px] text-[11px] leading-[14px] font-semibold tracking-[0.33px] transition-all ${
                    periodFilter === 'today'
                      ? 'bg-[#A24F9D] text-white shadow-xs'
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
                      ? 'bg-[#A24F9D] text-white shadow-xs'
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
                      ? 'bg-[#A24F9D] text-white shadow-xs'
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
                    Penjualan 7 Hari: <strong className="text-[#0B1C30] font-bold">Rp {total7DaySales.toLocaleString('id-ID')}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-[4px] bg-[#A1552D] shrink-0" />
                  <span className="text-[#5B403D]">
                    Pengeluaran 7 Hari: <strong className="text-[#0B1C30] font-bold">Rp {total7DayExpense.toLocaleString('id-ID')}</strong>
                  </span>
                </div>
              </div>

              <div className="bg-[#F0FDF4] px-2.5 py-1 rounded-full flex items-center gap-1 text-[11px] leading-[14px] font-bold text-[#15803D] tracking-[0.33px]">
                <IconArrowUp size={11} />
                <span>
                  Margin Kotor {grossMarginPercent >= 0 ? `+${grossMarginPercent}%` : `${grossMarginPercent}%`}
                </span>
              </div>
            </div>

            {/* Dual-bar Dynamic Chart */}
            <div className="h-56 pt-2 flex items-end justify-between gap-2 sm:gap-4 px-2">
              {dynamicChartData.map((bar) => (
                <div key={bar.dateStr} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full flex items-end justify-center gap-1 h-44">
                    {/* Penjualan Bar */}
                    <div
                      style={{ height: `${Math.max(bar.sH, 4)}%` }}
                      className={`w-full max-w-[18px] rounded-t-[4px] transition-all cursor-pointer ${
                        bar.sales > 0 ? 'bg-[#A24F9D] hover:brightness-110' : 'bg-slate-200'
                      }`}
                      title={`Penjualan (${bar.label}): Rp ${bar.sales.toLocaleString('id-ID')}`}
                    />
                    {/* Pengeluaran Bar */}
                    <div
                      style={{ height: `${Math.max(bar.eH, 4)}%` }}
                      className={`w-full max-w-[18px] rounded-t-[4px] transition-all cursor-pointer ${
                        bar.expense > 0 ? 'bg-[#A1552D] hover:brightness-110' : 'bg-slate-200'
                      }`}
                      title={`Pengeluaran (${bar.label}): Rp ${bar.expense.toLocaleString('id-ID')}`}
                    />
                  </div>

                  <span
                    className={`text-[11px] leading-[14px] truncate ${
                      bar.isToday ? 'font-bold text-[#A24F9D]' : 'font-medium text-[#625E58]'
                    }`}
                  >
                    {bar.label}
                  </span>
                </div>
              ))}
            </div>

            {/* 3 Detail Arus Masuk Keluar Barang */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-[rgba(220,233,255,0.4)]">
              <div className="bg-[#EFF4FF] p-2.5 rounded-[12px] flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#D3E4FE] text-[#A24F9D] flex items-center justify-center shrink-0">
                  <IconProduct size={16} />
                </div>
                <div>
                  <p className="text-[11px] leading-[14px] font-bold text-[#5B403D] tracking-[0.33px]">
                    Total Varian Siap Jual
                  </p>
                  <p className="text-[14px] leading-[20px] font-bold text-[#0B1C30] tracking-[0.14px]">
                    {products.reduce((sum, p) => sum + p.stock, 0)} Porsi Total
                  </p>
                </div>
              </div>

              <div className="bg-[#EFF4FF] p-2.5 rounded-[12px] flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#D3E4FE] text-[#833E17] flex items-center justify-center shrink-0">
                  <IconRawMaterial size={16} />
                </div>
                <div>
                  <p className="text-[11px] leading-[14px] font-bold text-[#5B403D] tracking-[0.33px]">
                    Katalog Bahan Baku
                  </p>
                  <p className="text-[14px] leading-[20px] font-bold text-[#0B1C30] tracking-[0.14px]">
                    {rawMaterials.length} Komponen
                  </p>
                </div>
              </div>

              <div className="bg-[#EFF4FF] p-2.5 rounded-[12px] flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#D3E4FE] text-[#16A34A] flex items-center justify-center shrink-0">
                  <IconPOS size={16} />
                </div>
                <div>
                  <p className="text-[11px] leading-[14px] font-bold text-[#5B403D] tracking-[0.33px]">
                    Transaksi Terverifikasi
                  </p>
                  <p className="text-[14px] leading-[20px] font-bold text-[#0B1C30] tracking-[0.14px]">
                    {transactions.length} Total Transaksi
                  </p>
                </div>
              </div>
            </div>
          </MotionCard>

          {/* Right Panel: Kebutuhan Mendesak Bahan Baku Perlu Dibeli */}
          <MotionCard delay={0.3} hoverEffect="lift" className="lg:col-span-1 bg-white rounded-[12px] p-6 shadow-card flex flex-col justify-between space-y-4">
            <div>
              <div className="border-b border-[rgba(220,233,255,0.4)] pb-2.5 flex items-center justify-between mb-3">
                <div>
                  <span className="text-[11px] leading-[14px] font-bold uppercase tracking-[0.55px] text-[#BA1A1A] block">
                    KEBUTUHAN MENDESAK
                  </span>
                  <WordRevealHeading
                    text="Bahan Baku Perlu Dibeli"
                    as="h3"
                    className="text-[16px] leading-[24px] font-bold text-[#0B1C30]"
                  />
                </div>
                <span className="bg-[#FFDAD6] text-[#93000A] text-[11px] leading-[14px] font-bold px-2 py-0.5 rounded-full tracking-[0.33px]">
                  {criticalMaterials.length} Item
                </span>
              </div>

              {criticalMaterials.length > 0 ? (
                <div className="space-y-3">
                  {criticalMaterials.slice(0, 3).map((mat) => (
                    <div key={mat.id} className="bg-[#EFF4FF] p-2.5 rounded-[12px] space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#BA1A1A] shrink-0" />
                          <span className="text-[14px] leading-[20px] font-bold text-[#0B1C30] tracking-[0.14px]">
                            {mat.name}
                          </span>
                        </div>
                        <span className="bg-[#FFDAD6] text-[#93000A] text-[11px] leading-[14px] font-bold px-2 py-0.5 rounded-full">
                          Kritis
                        </span>
                      </div>

                      <div className="bg-white rounded-[8px] py-1.5 px-2 grid grid-cols-3 text-center">
                        <div>
                          <p className="text-[12px] leading-[18px] text-[#5B403D]">Sisa Stok</p>
                          <p className="text-[14px] leading-[20px] font-bold text-[#BA1A1A]">
                            {mat.stock} {mat.unit}
                          </p>
                        </div>
                        <div>
                          <p className="text-[12px] leading-[18px] text-[#5B403D]">Min. Stok</p>
                          <p className="text-[14px] leading-[20px] font-semibold text-[#0B1C30]">
                            {mat.minStock} {mat.unit}
                          </p>
                        </div>
                        <div>
                          <p className="text-[12px] leading-[18px] text-[#5B403D]">Estimasi/Satuan</p>
                          <p className="text-[14px] leading-[20px] font-semibold text-[#0B1C30]">
                            Rp {mat.unitCost ? mat.unitCost.toLocaleString('id-ID') : '-'}
                          </p>
                        </div>
                      </div>

                      <Link
                        href="/data-master/bahan-baku"
                        className="w-full bg-[#D3E4FE] hover:bg-[#C2DAFD] text-[#A24F9D] py-1.5 rounded-[8px] text-[11px] leading-[14px] font-bold tracking-[0.33px] flex items-center justify-center gap-1 transition-colors"
                      >
                        <span>+ Restock Cepat</span>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-[#5B403D] bg-[#EFF4FF] rounded-xl space-y-2">
                  <IconCheckCircle size={28} className="mx-auto text-[#16A34A]" />
                  <p className="font-bold text-[#0B1C30]">Semua Bahan Baku Aman</p>
                  <p className="text-[11px]">Tidak ada stok bahan baku yang berada di bawah ambang batas minimum saat ini.</p>
                </div>
              )}
            </div>

            <div className="pt-2">
              <Link
                href="/data-master/bahan-baku"
                className="w-full bg-[#E5EEFF] hover:bg-[#D3E4FE] text-[#0B1C30] py-2.5 rounded-[12px] text-[12px] leading-[16px] font-bold tracking-[0.24px] text-center flex items-center justify-center gap-2 transition-colors"
              >
                <span>Lihat Semua {rawMaterials.length} Bahan Baku</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            </div>
          </MotionCard>
        </div>

        {/* =========================================================================
            5. SECTION - BAGIAN BAWAH: LOG AKTIVITAS STOK & PRODUK TERLARIS
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Riwayat Perubahan Stok (Tabel Mutasi Dinamis) */}
          <MotionCard delay={0.35} hoverEffect="lift" className="lg:col-span-2 bg-white rounded-[12px] p-6 shadow-card flex flex-col justify-between space-y-4">
            <div>
              <div className="border-b border-[rgba(220,233,255,0.4)] pb-2.5 flex items-center justify-between mb-3">
                <div>
                  <span className="text-[11px] leading-[14px] font-bold uppercase tracking-[0.55px] text-[#A24F9D] block">
                    AUDIT MUTASI INVENTORI
                  </span>
                  <WordRevealHeading
                    text="Riwayat Perubahan Stok Terakhir"
                    as="h3"
                    className="text-[20px] leading-[28px] font-bold text-[#0B1C30]"
                  />
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

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-[#EFF4FF] text-[#5B403D] text-[11px] leading-[14px] font-bold uppercase tracking-[0.55px]">
                      <th className="py-2 px-2.5 rounded-l-[8px]">WAKTU</th>
                      <th className="py-2 px-2.5">ITEM</th>
                      <th className="py-2 px-2.5">JENIS MUTASI</th>
                      <th className="py-2 px-2.5 text-right">JUMLAH</th>
                      <th className="py-2 px-2.5">REFERENSI</th>
                      <th className="py-2 px-2.5 text-center rounded-r-[8px]">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[rgba(220,233,255,0.4)] text-[12px] leading-[16px]">
                    {recentMovements.length > 0 ? (
                      recentMovements.map((m) => (
                        <tr key={m.id} className="row-hover-satisfying">
                          <td className="py-2.5 px-2.5 text-[#5B403D] whitespace-nowrap">{m.date}</td>
                          <td className="py-2.5 px-2.5">
                            <div className="font-bold text-[#0B1C30] tracking-[0.24px]">{m.itemName}</div>
                            <div className="text-[#5B403D] text-[11px] uppercase">{m.itemType}</div>
                          </td>
                          <td className="py-2.5 px-2.5">
                            <span
                              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${
                                m.type === 'masuk'
                                  ? 'bg-[#DCFCE7] text-[#166534]'
                                  : m.type === 'keluar'
                                  ? 'bg-[#FFDAD6] text-[#93000A]'
                                  : 'bg-[#DCE9FF] text-[#0B1C30]'
                              }`}
                            >
                              {m.type === 'masuk' ? 'Masuk' : m.type === 'keluar' ? 'Keluar' : 'Penyesuaian'}
                            </span>
                          </td>
                          <td
                            className={`py-2.5 px-2.5 text-right font-bold whitespace-nowrap ${
                              m.type === 'masuk' ? 'text-[#15803D]' : 'text-[#BA1A1A]'
                            }`}
                          >
                            {m.type === 'masuk' ? '+' : '-'}{m.quantity} {m.unit}
                          </td>
                          <td className="py-2.5 px-2.5 text-[#0B1C30] font-medium max-w-[180px] truncate">
                            {formatOutletCopy(m.reference)}
                          </td>
                          <td className="py-2.5 px-2.5 text-center">
                            <span className="inline-flex items-center gap-1 bg-[#F0FDF4] text-[#15803D] text-[11px] font-bold px-2 py-0.5 rounded-full">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                              <span>Tercatat</span>
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-xs text-[#5B403D]">
                          Belum ada mutasi stok tercatat dalam sistem. Lakukan transaksi, pembelian, atau produksi untuk melihat log.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="border-t border-[rgba(220,233,255,0.4)] pt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-[#5B403D] text-[12px] leading-[18px]">
                Menampilkan {recentMovements.length} mutasi terkini dari {stockMovements.length} total pencatatan
              </span>
              <Link
                href="/operasional/penyesuaian-stok"
                className="text-[#A24F9D] hover:underline font-bold text-[12px] leading-[16px] tracking-[0.24px]"
              >
                Buka Log Audit Lengkap →
              </Link>
            </div>
          </MotionCard>

          {/* Right: Ringkasan Produk Terlaris (Dinamis dari Data Transaksi) */}
          <MotionCard delay={0.4} hoverEffect="lift" className="lg:col-span-1 bg-white rounded-[12px] p-6 shadow-card flex flex-col justify-between space-y-4">
            <div>
              <div className="border-b border-[rgba(220,233,255,0.4)] pb-2.5 flex items-center justify-between mb-4">
                <div>
                  <span className="text-[11px] leading-[14px] font-bold uppercase tracking-[0.55px] text-[#15803D] block">
                    PERFORMA PENJUALAN
                  </span>
                  <WordRevealHeading
                    text="Produk Terlaris"
                    as="h3"
                    className="text-[16px] leading-[24px] font-bold text-[#0B1C30]"
                  />
                </div>
                <div className="w-8 h-8 rounded-full bg-[#DCFCE7] text-[#15803D] flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
              </div>

              {bestSellers.length > 0 ? (
                <div className="space-y-3">
                  {bestSellers.map((item) => (
                    <div key={item.name} className="bg-[#EFF4FF] p-2.5 rounded-[12px] flex items-center gap-3">
                      <div className="w-12 h-12 rounded-[12px] bg-white border border-[#CBD5E1]/40 relative overflow-hidden flex items-center justify-center shrink-0">
                        {item.icon}
                        <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full ${item.badgeBg} text-[10px] font-bold flex items-center justify-center shadow-xs`}>
                          {item.rank}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="font-bold text-[13px] leading-[18px] text-[#0B1C30] truncate">
                            {item.name}
                          </h4>
                          <span className="font-bold text-[13px] leading-[18px] text-[#A24F9D] shrink-0">
                            Rp {item.revenue.toLocaleString('id-ID')}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-[11px] leading-[14px]">
                          <span className="text-[#5B403D]">Terjual {item.packsSold} Porsi</span>
                          <span className="text-[#15803D] font-semibold">Tersedia</span>
                        </div>

                        <div className="w-full bg-[#D3E4FE] h-1.5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{ width: `${item.barWidth}%`, backgroundColor: item.color }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-[#5B403D] bg-[#EFF4FF] rounded-xl space-y-1">
                  <p className="font-bold text-[#0B1C30]">Belum Ada Data Penjualan</p>
                  <p className="text-[11px]">Setelah kasir mencatat transaksi di POS, produk terlaris akan otomatis terurut di sini.</p>
                </div>
              )}
            </div>

            <div className="bg-[#E5EEFF] rounded-[12px] p-3.5 flex items-center justify-between gap-2">
              <div className="text-[12px]">
                <p className="font-bold text-[#0B1C30] leading-[16px] tracking-[0.24px]">
                  Rekomendasi Dapur:
                </p>
                <p className="text-[#5B403D] leading-[18px] mt-0.5">
                  {bestSellers.length > 0
                    ? `Prioritaskan produksi adonan "${bestSellers[0].name}" untuk mengantisipasi permintaan!`
                    : 'Siapkan varian cireng beku & bumbu rujak untuk persiapan jam operasional OUTLET.'}
                </p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-[#D3E4FE] text-[#0B1C30] flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
              </div>
            </div>
          </MotionCard>
        </div>
      </div>
    </AppShell>
  );
}
