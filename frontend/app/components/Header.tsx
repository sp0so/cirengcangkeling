'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useApp } from '../lib/context';
import {
  IconBell,
  IconUser,
  IconLogout,
  IconAlertTriangle,
  IconCheck,
  IconChevronDown,
} from './Icons';

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const { currentUser, switchRole, rawMaterials } = useApp();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const criticalMaterials = rawMaterials.filter((m) => m.stock < m.minStock);

  const handleLogout = () => {
    router.push('/login');
  };

  const isKasir = pathname.startsWith('/kasir') || currentUser.role === 'kasir';

  // Live formatted date
  const formattedDate = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date());

  // Kasir Top Bar - Figma 127:2053
  if (isKasir) {
    return (
      <header className="h-[64px] bg-[rgba(248,249,250,0.85)] backdrop-blur-[24px] border-b border-[#EDEEEF] px-4 md:px-6 flex items-center justify-between sticky top-0 z-20 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.06),0px_1px_8px_0px_rgba(0,0,0,0.04)] font-sans">
        {/* Left section: Hamburger button for Mobile & Breadcrumb */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            onClick={onMenuClick}
            className="p-1.5 -ml-1 rounded-lg text-[#565E74] hover:bg-black/5 lg:hidden"
            aria-label="Buka navigasi menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#565E74] shrink-0">
              <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/>
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
              <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/>
              <path d="M2 7h20"/>
            </svg>
            <span className="text-[#565E74] text-[12px] font-normal hidden sm:inline">Kasir Portal</span>
            <span className="text-[#565E74] text-[11px] hidden sm:inline">›</span>
            <span className="text-[#191C1D] text-[12px] font-bold truncate max-w-[190px] sm:max-w-none">
              Cireng Cangkeling Outlet Pusat
            </span>
          </div>
        </div>

        {/* Right section: Date & Shift pill, Online pill, Notif, Avatar */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Date & Shift Capsule */}
          <div className="hidden md:flex items-center gap-2 bg-[#E7E8E9] rounded-full px-3 py-1.5 text-[11px] font-bold text-[#565E74]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#565E74]">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>{formattedDate}</span>
            <span className="text-[#E6BDB8]">•</span>
            <span className="text-[#191C1D] font-semibold">Shift 1 Aktif</span>
          </div>

          {/* Online Pill */}
          <div className="hidden lg:flex items-center gap-1.5 bg-white drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.04)] border border-[#EDEEEF] rounded-[8px] px-2.5 py-1 text-[11px] font-bold text-[#191C1D]">
            <span className="size-2 rounded-full bg-[#16A34A] animate-pulse" />
            <span>Portal Online Aktif</span>
          </div>

          {/* Notifikasi */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setNotifOpen(!notifOpen)}
              className="w-9 h-9 rounded-[8px] hover:bg-black/5 flex items-center justify-center text-[#191C1D] transition-colors relative"
              aria-label="Pemberitahuan notifikasi"
            >
              <IconBell size={18} />
              <span className="absolute top-1.5 right-1.5 size-2 bg-[#B70011] rounded-full ring-2 ring-[#F8F9FA]" />
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-alert border border-[#CBD5E1] py-3 px-4 z-50 animate-fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-[#F1F5F9] mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0B1C30]">
                    Pemberitahuan Sistem
                  </span>
                  <span className="text-[11px] font-semibold text-[#B70011]">
                    {criticalMaterials.length} Kritis
                  </span>
                </div>

                {criticalMaterials.length === 0 ? (
                  <div className="text-center py-4 text-xs text-[#565E74]">
                    Semua stok dan kanal online berjalan normal.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {criticalMaterials.map((m) => (
                      <div
                        key={m.id}
                        className="p-2 rounded-xl bg-[#FFDAD6] border border-[#B70011]/20 flex items-start gap-2.5"
                      >
                        <span className="text-[#B70011] mt-0.5">
                          <IconAlertTriangle size={15} />
                        </span>
                        <div className="text-xs">
                          <p className="font-bold text-[#93000A]">{m.name} Kritis</p>
                          <p className="text-[#565E74] text-[11px]">
                            Sisa {m.stock} {m.unit} (Min. {m.minStock} {m.unit})
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Vertical Divider */}
          <div className="w-px h-6 bg-[#E1E3E4]" />

          {/* User Profile Block */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-1 rounded-xl hover:bg-black/5 transition-colors"
            >
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-[12px] leading-[15px] font-bold text-[#191C1D]">
                  {currentUser.name}
                </span>
                <span className="text-[11px] leading-[14px] font-semibold text-[#B70011] tracking-wider uppercase">
                  KASIR
                </span>
              </div>
              <div className="size-8 rounded-full bg-[#B70011] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                {currentUser.name.charAt(0)}
              </div>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-alert border border-[#CBD5E1] py-2 z-50 animate-fade-in font-sans">
                <div className="px-4 py-2 border-b border-[#F1F5F9]">
                  <p className="text-xs font-bold text-[#0B1C30]">{currentUser.name}</p>
                  <p className="text-[11px] text-[#565E74]">
                    kasir@cirengcangkeling.com
                  </p>
                </div>

                {/* Role Switcher */}
                <div className="p-2 border-b border-[#F1F5F9]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#565E74] px-2 block mb-1">
                    Ganti Hak Akses
                  </span>
                  <div className="flex gap-1 bg-[#F8FAFC] p-1 rounded-xl border border-[#CBD5E1]/60">
                    <button
                      type="button"
                      onClick={() => {
                        switchRole('owner');
                        setProfileOpen(false);
                      }}
                      className={`flex-1 py-1 px-2 rounded-lg text-xs font-bold transition-all ${
                        currentUser.role === 'owner'
                          ? 'bg-[#A24F9D] text-white shadow-xs'
                          : 'text-[#565E74] hover:text-[#0B1C30]'
                      }`}
                    >
                      Owner
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        switchRole('kasir');
                        setProfileOpen(false);
                      }}
                      className={`flex-1 py-1 px-2 rounded-lg text-xs font-bold transition-all ${
                        currentUser.role === 'kasir'
                          ? 'bg-[#B70011] text-white shadow-xs'
                          : 'text-[#565E74] hover:text-[#0B1C30]'
                      }`}
                    >
                      Kasir
                    </button>
                  </div>
                </div>

                <div className="p-1">
                  <Link
                    href="/kasir/profil"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#0B1C30] hover:bg-[#FFF7ED] rounded-xl transition-colors"
                  >
                    <IconUser size={15} />
                    <span>Profil Kasir</span>
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#BA1A1A] hover:bg-[#FFDAD6]/50 rounded-xl transition-colors"
                  >
                    <IconLogout size={15} />
                    <span>Keluar Sistem</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    );
  }

  // Owner Header
  return (
    <header className="h-[80px] bg-white/95 backdrop-blur-[12px] border-b border-[#E2E8F0] px-4 md:px-6 flex items-center justify-between sticky top-0 z-20 shadow-xs font-sans">
      {/* Left section: Hamburger button for Mobile & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 rounded-lg text-[#5B403D] hover:bg-[#FFF7ED] lg:hidden"
          aria-label="Buka navigasi menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div className="flex flex-col">
          <h1 className="text-[16px] leading-[24px] font-bold text-[#0B1C30] font-sans">
            Halo, {currentUser.name}!
          </h1>
          <div className="flex items-center gap-1.5 text-[12px] leading-[18px] text-[#5B403D] font-sans">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#5B403D]">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>

      {/* Right section: Notifications & User Profile (Figma Frame 6:676) */}
      <div className="flex items-center gap-4">
        {/* Notifications Button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setNotifOpen(!notifOpen)}
            className="w-10 h-10 rounded-[12px] bg-[#EFF4FF] hover:bg-[#E5EEFF] flex items-center justify-center text-[#0B1C30] transition-colors relative"
            aria-label="Pemberitahuan notifikasi"
          >
            <IconBell size={18} />
            {criticalMaterials.length > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#BA1A1A] ring-2 ring-white rounded-full" />
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-alert border border-[#CBD5E1] py-3 px-4 z-50 animate-fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-[#F1F5F9] mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0B1C30]">
                  Pemberitahuan Sistem
                </span>
                <span className="text-[11px] font-semibold text-[#A24F9D]">
                  {criticalMaterials.length} Kritis
                </span>
              </div>

              {criticalMaterials.length === 0 ? (
                <div className="text-center py-4 text-xs text-[#5B403D]">
                  Semua stok bahan baku aman terkendali.
                </div>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {criticalMaterials.map((m) => (
                    <div
                      key={m.id}
                      className="p-2 rounded-xl bg-[#FFDAD6] border border-[#BA1A1A]/20 flex items-start gap-2.5"
                    >
                      <span className="text-[#BA1A1A] mt-0.5">
                        <IconAlertTriangle size={15} />
                      </span>
                      <div className="text-xs">
                        <p className="font-bold text-[#93000A]">{m.name} Kritis</p>
                        <p className="text-[#5B403D] text-[11px]">
                          Sisa {m.stock} {m.unit} (Min. {m.minStock} {m.unit})
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Vertical Divider */}
        <div className="w-px h-8 bg-[rgba(228,190,186,0.4)]" />

        {/* User Profile Block */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-[#FFF7ED] transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#A24F9D] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              {currentUser.name.charAt(0)}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-[12px] leading-[15px] font-bold text-[#0B1C30] tracking-[0.24px] font-sans">
                {currentUser.name}
              </span>
              <span className="text-[11px] leading-[14px] font-bold text-[#5B403D] tracking-[0.33px] font-sans">
                Owner & Pengelola
              </span>
            </div>
            <div className="p-1 rounded-lg text-[#5B403D]">
              <IconChevronDown size={14} />
            </div>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-alert border border-[#CBD5E1] py-2 z-50 animate-fade-in font-sans">
              <div className="px-4 py-2 border-b border-[#F1F5F9]">
                <p className="text-xs font-bold text-[#0B1C30]">{currentUser.name}</p>
                <p className="text-[11px] text-[#5B403D]">
                  owner@cirengcangkeling.com
                </p>
              </div>

              {/* Role Switcher */}
              <div className="p-2 border-b border-[#F1F5F9]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#5B403D] px-2 block mb-1">
                  Ganti Hak Akses
                </span>
                <div className="flex gap-1 bg-[#F8FAFC] p-1 rounded-xl border border-[#CBD5E1]/60">
                  <button
                    type="button"
                    onClick={() => {
                      switchRole('owner');
                      setProfileOpen(false);
                    }}
                    className={`flex-1 py-1 px-2 rounded-lg text-xs font-bold transition-all ${
                      currentUser.role === 'owner'
                        ? 'bg-[#A24F9D] text-white shadow-xs'
                        : 'text-[#5B403D] hover:text-[#0B1C30]'
                    }`}
                  >
                    Owner
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      switchRole('kasir');
                      setProfileOpen(false);
                    }}
                    className={`flex-1 py-1 px-2 rounded-lg text-xs font-bold transition-all ${
                      currentUser.role === 'kasir'
                        ? 'bg-[#A24F9D] text-white shadow-xs'
                        : 'text-[#5B403D] hover:text-[#0B1C30]'
                    }`}
                  >
                    Kasir
                  </button>
                </div>
              </div>

              <div className="p-1">
                <Link
                  href="/pengaturan/profil"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#0B1C30] hover:bg-[#FFF7ED] rounded-xl transition-colors"
                >
                  <IconUser size={15} />
                  <span>Profil Usaha</span>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#BA1A1A] hover:bg-[#FFDAD6]/50 rounded-xl transition-colors"
                >
                  <IconLogout size={15} />
                  <span>Keluar Sistem</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
