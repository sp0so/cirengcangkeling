'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useApp } from '../lib/context';
import {
  IconDashboard,
  IconProduct,
  IconRawMaterial,
  IconSupplier,
  IconRecipe,
  IconPOS,
  IconFinance,
  IconReport,
  IconSettings,
  IconShift,
  IconOperasional,
  IconMarketplace,
} from './Icons';

interface NavLinkItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
  badgeBg?: string;
}

interface NavSection {
  sectionTitle: string;
  items: NavLinkItem[];
}

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose?: () => void }) {
  const pathname = usePathname();
  const { currentUser, rawMaterials } = useApp();

  const criticalMaterialsCount = rawMaterials.filter((m) => m.stock < m.minStock).length;

  const ownerSections: NavSection[] = [
    {
      sectionTitle: '1. DASHBOARD',
      items: [
        {
          title: 'Dashboard Utama',
          href: '/dashboard',
          icon: <IconDashboard size={18} />,
        },
      ],
    },
    {
      sectionTitle: '2. DATA MASTER',
      items: [
        {
          title: 'Data Produk',
          href: '/data-master/produk',
          icon: <IconProduct size={18} />,
        },
        {
          title: 'Data Bahan Baku',
          href: '/data-master/bahan-baku',
          icon: <IconRawMaterial size={18} />,
          badge: criticalMaterialsCount > 0 ? `${criticalMaterialsCount} Kritis` : undefined,
          badgeBg: 'bg-[#BA1A1A]',
        },
        {
          title: 'Data Supplier',
          href: '/data-master/supplier',
          icon: <IconSupplier size={18} />,
        },
        {
          title: 'Manajemen Resep',
          href: '/data-master/resep',
          icon: <IconRecipe size={18} />,
        },
      ],
    },
    {
      sectionTitle: '3. OPERASIONAL',
      items: [
        {
          title: 'Stok Produk Jadi',
          href: '/operasional/stok-produk',
          icon: <IconOperasional size={18} />,
        },
        {
          title: 'Pembelian / Pengadaan',
          href: '/operasional/pembelian',
          icon: <IconFinance size={18} />,
        },
        {
          title: 'Produksi',
          href: '/operasional/produksi',
          icon: <IconProduct size={18} />,
        },
        {
          title: 'Penyesuaian Stok',
          href: '/operasional/penyesuaian-stok',
          icon: <IconReport size={18} />,
        },
      ],
    },
    {
      sectionTitle: '4. PENJUALAN & KASIR',
      items: [
        {
          title: 'Transaksi Penjualan',
          href: '/penjualan/transaksi',
          icon: <IconPOS size={18} />,
        },
        {
          title: 'Manajemen Kasir',
          href: '/penjualan/manajemen-kasir',
          icon: <IconSettings size={18} />,
        },
        {
          title: 'Manajemen Shift',
          href: '/penjualan/shift',
          icon: <IconShift size={18} />,
        },
        {
          title: 'Mode Kasir Owner',
          href: '/penjualan/kasir-owner',
          icon: <IconPOS size={18} />,
          badge: 'Owner Mode',
          badgeBg: 'bg-[#A1552D]',
        },
      ],
    },
    {
      sectionTitle: '5. MARKETPLACE',
      items: [
        {
          title: 'Import Laporan Marketplace',
          href: '/marketplace/import',
          icon: <IconMarketplace size={18} />,
        },
        {
          title: 'Riwayat Import',
          href: '/marketplace/riwayat',
          icon: <IconReport size={18} />,
        },
        {
          title: 'Master Laporan Penjualan',
          href: '/marketplace/master-penjualan',
          icon: <IconPOS size={18} />,
        },
      ],
    },
    {
      sectionTitle: '6. KEUANGAN',
      items: [
        {
          title: 'Pengeluaran Usaha',
          href: '/keuangan/pengeluaran',
          icon: <IconFinance size={18} />,
        },
        {
          title: 'Catatan Keuangan',
          href: '/keuangan/catatan',
          icon: <IconFinance size={18} />,
        },
        {
          title: 'Perhitungan HPP',
          href: '/keuangan/hpp',
          icon: <IconRecipe size={18} />,
        },
        {
          title: 'Estimasi Laba',
          href: '/keuangan/estimasi-laba',
          icon: <IconFinance size={18} />,
        },
      ],
    },
    {
      sectionTitle: '7. LAPORAN',
      items: [
        {
          title: 'Laporan Penjualan',
          href: '/laporan/penjualan',
          icon: <IconReport size={18} />,
        },
        {
          title: 'Laporan Pembelian',
          href: '/laporan/pembelian',
          icon: <IconReport size={18} />,
        },
        {
          title: 'Laporan Persediaan',
          href: '/laporan/persediaan',
          icon: <IconReport size={18} />,
        },
        {
          title: 'Laporan Produksi',
          href: '/laporan/produksi',
          icon: <IconReport size={18} />,
        },
        {
          title: 'Laporan Keuangan',
          href: '/laporan/keuangan',
          icon: <IconReport size={18} />,
        },
      ],
    },
    {
      sectionTitle: '8. PENGATURAN',
      items: [
        {
          title: 'Profil Usaha',
          href: '/pengaturan/profil',
          icon: <IconSettings size={18} />,
        },
      ],
    },
  ];

  const kasirSections: NavSection[] = [
    {
      sectionTitle: '1. DASHBOARD KASIR',
      items: [
        {
          title: 'Dashboard Kasir',
          href: '/kasir/dashboard',
          icon: <IconDashboard size={18} />,
        },
      ],
    },
    {
      sectionTitle: '2. TRANSAKSI PENJUALAN',
      items: [
        {
          title: 'Katalog & POS Kasir',
          href: '/kasir/pos',
          icon: <IconPOS size={18} />,
          badge: 'POS',
          badgeBg: 'bg-[#16A34A]',
        },
      ],
    },
    {
      sectionTitle: '3. RIWAYAT TRANSAKSI',
      items: [
        {
          title: 'Riwayat Transaksi Pribadi',
          href: '/kasir/riwayat',
          icon: <IconReport size={18} />,
        },
      ],
    },
    {
      sectionTitle: '4. SHIFT KASIR',
      items: [
        {
          title: 'Shift & Kas Fisik',
          href: '/kasir/shift',
          icon: <IconShift size={18} />,
        },
      ],
    },
  ];

  const currentSections = currentUser.role === 'owner' ? ownerSections : kasirSections;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Aside Figma Specification:
          Width: 288px (w-72)
          Background: linear gradient from #5B3765 via #A04D9B to #5B3765
          Shadow: shadow-[0px_4px_20px_0px_rgba(165,9,21,0.15)]
      */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-72 bg-gradient-to-b from-[#5B3765] via-[#A04D9B] to-[#5B3765] text-white flex flex-col justify-between shadow-[0px_4px_20px_0px_rgba(165,9,21,0.15)] transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top: Brand Header & Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          {/* Brand Header */}
          <div className="h-[63px] pb-[9px] border-b border-white/10 flex items-center gap-2.5">
            <div className="w-[41px] h-[40px] rounded-[10px] overflow-hidden shrink-0 relative shadow-sm border border-white/20">
              <img
                src="/logo-sidebar.png"
                alt="Logo Cireng Cangkeling"
                className="w-full h-full object-cover pointer-events-none"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-[16px] leading-[20px] text-white tracking-[-0.4px] truncate font-sans">
                Cireng Cangkeling
              </span>
              <span className="text-[10px] font-semibold text-white/70 tracking-wider uppercase font-sans">
                {currentUser.role === 'owner' ? 'Owner Portal' : 'ROLE : KASIR'}
              </span>
            </div>
          </div>

          {/* Navigation Sections */}
          <nav className="space-y-5">
            {currentSections.map((sec) => (
              <div key={sec.sectionTitle} className="space-y-1.5">
                <div className="px-2">
                  <span className="text-[11px] leading-[14px] font-semibold text-[#FFE5E2] opacity-75 uppercase tracking-[0.55px] font-sans">
                    {sec.sectionTitle}
                  </span>
                </div>

                <div className="space-y-1">
                  {sec.items.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

                    if (isActive) {
                      return (
                        <Link
                          key={item.title}
                          href={item.href}
                          onClick={onClose}
                          className="flex items-center justify-between p-2 rounded-[12px] bg-white text-[#A24F9D] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition-all font-semibold text-[14px] leading-[20px] tracking-[0.14px]"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-[#A24F9D]">{item.icon}</span>
                            <span className="font-semibold text-[#A24F9D]">{item.title}</span>
                          </div>
                          {item.badge && (
                            <span
                              className={`text-[11px] font-bold px-2 py-0.5 rounded-full text-white ${
                                item.badgeBg || 'bg-[#BA1A1A]'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      );
                    }

                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={onClose}
                        className="flex items-center justify-between p-2 rounded-[12px] text-white/90 hover:bg-white/10 hover:text-white transition-all font-semibold text-[14px] leading-[20px] tracking-[0.14px]"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-white/80">{item.icon}</span>
                          <span>{item.title}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`text-[11px] font-bold px-2 py-0.5 rounded-full text-white ${
                              item.badgeBg || 'bg-[#BA1A1A]'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Card: Katalog Publik & WA Order (Figma Frame 6:786) */}
        <div className="p-4 border-t border-white/10 shrink-0">
          <Link
            href="/pesan"
            className="w-full p-2.5 rounded-[12px] bg-white/10 hover:bg-white/15 transition-all flex items-center justify-between text-white group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <div className="flex flex-col text-left leading-tight">
                <span className="text-[12px] font-semibold text-white tracking-[0.24px]">Katalog Publik</span>
                <span className="text-[11px] font-bold text-white/80 tracking-[0.33px]">& WA Order</span>
              </div>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70 group-hover:translate-x-0.5 transition-transform">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </div>
      </aside>
    </>
  );
}
