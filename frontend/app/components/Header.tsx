'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  const { currentUser, switchRole, rawMaterials } = useApp();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const criticalMaterials = rawMaterials.filter((m) => m.stock < m.minStock);

  const handleLogout = () => {
    router.push('/login');
  };

  // Formatted date string matching Figma's "Jumat, 30 Oktober 2026"
  const formattedDate = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(2026, 9, 30));

  return (
    <header className="h-[80px] bg-white/95 backdrop-blur-[12px] border-b border-[#E2E8F0] px-4 md:px-6 flex items-center justify-between sticky top-0 z-20 shadow-xs">
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
                {currentUser.role === 'owner' ? 'Owner & Pengelola' : 'Kasir Shift'}
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
                  {currentUser.role === 'owner' ? 'owner@cirengcangkeling.com' : 'kasir@cirengcangkeling.com'}
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
