'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Sidebar from './Sidebar';
import Header from './Header';
import { useApp } from '../lib/context';
import { IconLock } from './Icons';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { currentUser } = useApp();

  // Role-Based Access Control as per design.md Section 6.3
  const isKasir = currentUser.role === 'kasir';
  const isOwnerRoute =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/data-master/bahan-baku') ||
    pathname.startsWith('/data-master/supplier') ||
    pathname.startsWith('/data-master/resep') ||
    pathname.startsWith('/operasional') ||
    pathname.startsWith('/penjualan') ||
    pathname.startsWith('/marketplace') ||
    pathname.startsWith('/keuangan') ||
    pathname.startsWith('/laporan') ||
    pathname.startsWith('/pengaturan');

  const isRestrictedForKasir = isKasir && isOwnerRoute;

  return (
    <div className="min-h-screen flex bg-[#FFF7ED]">
      {/* Sidebar (Width 288px / w-72 per Figma Spec) */}
      <Sidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        <Header onMenuClick={() => setMobileMenuOpen(true)} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 animate-fade-in">
          {isRestrictedForKasir ? (
            <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-2xl shadow-card border border-[#CBD5E1] text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FFDAD6] text-[#93000A] mx-auto flex items-center justify-center">
                <IconLock size={32} />
              </div>
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-[#0B1C30]">Akses Dibatasi (Owner Only)</h2>
                <p className="text-xs text-[#5B403D] leading-relaxed">
                  Sesuai matriks perizinan sistem (design.md Section 6.3), akun berhak akses <strong>Kasir</strong> tidak diizinkan mengakses modul manajemen bisnis ini.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/kasir/dashboard"
                  className="btn-primary text-xs w-full justify-center"
                >
                  Kembali ke Dashboard Kasir
                </Link>
              </div>
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
}
