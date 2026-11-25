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
  IconPOS,
  IconFinance,
  IconReport,
  IconSettings,
  IconShift,
  IconOperasional,
  IconUser,
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
      sectionTitle: 'MENU UTAMA',
      items: [
        {
          title: 'Dashboard',
          href: '/dashboard',
          icon: <IconDashboard size={18} />,
        },
      ],
    },
    {
      sectionTitle: 'INVENTARIS & PRODUK',
      items: [
        {
          title: 'Stok Bahan Baku',
          href: '/data-master/bahan-baku',
          icon: <IconRawMaterial size={18} />,
          badge: criticalMaterialsCount > 0 ? `${criticalMaterialsCount} Kritis` : undefined,
          badgeBg: 'bg-[#BA1A1A]',
        },
        {
          title: 'Stok Produk Jadi',
          href: '/operasional/stok-produk',
          icon: <IconOperasional size={18} />,
        },
        {
          title: 'Data Produk',
          href: '/data-master/produk',
          icon: <IconProduct size={18} />,
        },
        {
          title: 'Riwayat Perubahan Stok',
          href: '/operasional/penyesuaian-stok',
          icon: <IconReport size={18} />,
        },
      ],
    },
    {
      sectionTitle: 'TRANSAKSI & KEUANGAN',
      items: [
        {
          title: 'Penjualan & Kasir',
          href: '/penjualan/transaksi',
          icon: <IconPOS size={18} />,
        },
        {
          title: 'Pengeluaran Usaha',
          href: '/keuangan/pengeluaran',
          icon: <IconFinance size={18} />,
        },
        {
          title: 'Laporan Usaha',
          href: '/laporan/keuangan',
          icon: <IconReport size={18} />,
        },
      ],
    },
    {
      sectionTitle: 'PENGATURAN',
      items: [
        {
          title: 'Manajemen Pengguna',
          href: '/pengaturan/user',
          icon: <IconUser size={18} />,
        },
        {
          title: 'Profil Usaha',
          href: '/pengaturan/profil',
          icon: <IconSettings size={18} />,
        },
      ],
    },
  ];

  const isKasir = pathname.startsWith('/kasir') || currentUser.role === 'kasir';

  const kasirSections: NavSection[] = [
    {
      sectionTitle: 'UTAMA',
      items: [
        {
          title: 'Dashboard Kasir',
          href: '/kasir/dashboard',
          icon: <IconDashboard size={18} />,
        },
      ],
    },
    {
      sectionTitle: 'TRANSAKSI',
      items: [
        {
          title: 'Penjualan & Kasir',
          href: '/kasir/pos',
          icon: <IconPOS size={18} />,
        },
        {
          title: 'Riwayat Transaksi',
          href: '/kasir/riwayat',
          icon: <IconReport size={18} />,
        },
      ],
    },
    {
      sectionTitle: 'AKUN',
      items: [
        {
          title: 'Profil Saya',
          href: '/kasir/profil',
          icon: <IconUser size={18} />,
        },
        {
          title: 'Keluar / Logout',
          href: '/login',
          icon: <IconShift size={18} />,
        },
      ],
    },
  ];

  const currentSections = isKasir ? kasirSections : ownerSections;

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
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
          {/* Brand Header */}
          {isKasir ? (
            <div className="pb-3 border-b border-white/10 space-y-2.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 shrink-0 relative rounded-[10px] overflow-hidden drop-shadow-sm">
                  <Image
                    src="/logo-brand.png"
                    alt="Logo Cireng Cangkeling"
                    fill
                    sizes="40px"
                    className="object-contain pointer-events-none rounded-[10px]"
                    priority
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-[16px] leading-[22px] text-white tracking-[-0.4px] truncate font-sans">
                    Cireng Cangkeling
                  </span>
                </div>
              </div>
              <div>
                <div className="bg-[#FFDAD6] rounded-full px-2.5 py-1 inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B70011]" />
                  <span className="text-[#93000B] text-[11px] font-bold uppercase tracking-[0.275px]">ROLE : KASIR</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[63px] pb-[9px] border-b border-white/10 flex items-center gap-2.5">
              <div className="w-10 h-10 shrink-0 relative rounded-[12px] overflow-hidden drop-shadow-sm">
                <Image
                  src="/logo-brand.png"
                  alt="Logo Cireng Cangkeling"
                  fill
                  sizes="40px"
                  className="object-contain pointer-events-none"
                  priority
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-[16px] leading-[20px] text-white tracking-[-0.4px] truncate font-sans">
                  Cireng Cangkeling
                </span>
                <span className="text-[10px] font-semibold text-white/70 tracking-wider uppercase font-sans">
                  Owner Portal
                </span>
              </div>
            </div>
          )}

          {/* Navigation Sections */}
          <nav className="space-y-4">
            {currentSections.map((sec) => (
              <div key={sec.sectionTitle} className="space-y-1.5">
                <div className="px-2">
                  <span className="text-[11px] leading-[14px] font-bold text-[#FFE5E2] uppercase tracking-[0.55px] font-sans">
                    {sec.sectionTitle}
                  </span>
                </div>

                <div className="space-y-1">
                  {sec.items.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/kasir/dashboard' && item.href !== '/dashboard' && pathname.startsWith(item.href + '/'));

                    if (isActive) {
                      return (
                        <Link
                          key={item.title}
                          href={item.href}
                          onClick={onClose}
                          className={`flex items-center justify-between px-3 py-2.5 rounded-[8px] transition-all font-semibold text-[14px] leading-[20px] tracking-[0.14px] ${
                            isKasir
                              ? 'bg-[#C875C3] text-[#FFF6F5] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]'
                              : 'bg-white text-[#A24F9D] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={isKasir ? 'text-[#FFF6F5]' : 'text-[#A24F9D]'}>{item.icon}</span>
                            <span className={`font-semibold ${isKasir ? 'text-[#FFF6F5]' : 'text-[#A24F9D]'}`}>{item.title}</span>
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
                        className="flex items-center justify-between px-3 py-2.5 rounded-[8px] text-white/90 hover:bg-white/10 hover:text-white transition-all font-semibold text-[14px] leading-[20px] tracking-[0.14px]"
                      >
                        <div className="flex items-center gap-3">
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

        {/* Bottom Card: Katalog Publik & WA Order (Figma Frame 6:786 - Only for Owner) */}
        {!isKasir && (
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
        )}
      </aside>
    </>
  );
}
