'use client';

import React from 'react';
import Link from 'next/link';
import AppShell from '../../components/AppShell';
import { useApp } from '../../lib/context';
import {
  IconLock,
  IconPOS,
  IconAlertTriangle,
  IconCheckCircle,
} from '../../components/Icons';

export default function ModeKasirOwnerPage() {
  const { activeShift, currentUser } = useApp();

  const isLockedByKasir = activeShift && activeShift.cashierName !== currentUser.name;

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#833E17] uppercase tracking-wider">
                Penjualan & Kasir
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30] tracking-tight">
              Mode Kasir Khusus Owner
            </h2>
            <p className="text-sm text-[#5B403D]">
              Akses kasir langsung bagi pemilik usaha ketika bertugas mandiri tanpa petugas kasir reguler.
            </p>
          </div>
        </div>

        {/* Status Card based on global single active session rule */}
        {isLockedByKasir ? (
          <div className="p-8 rounded-2xl bg-white border border-[#BA1A1A]/30 shadow-card text-center space-y-4 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#FFDAD6] text-[#93000A] inline-flex items-center justify-center">
              <IconLock size={32} />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-[#93000A]">
                Mode Kasir Owner Terkunci!
              </h3>
              <p className="text-xs text-[#5B403D] leading-relaxed">
                Saat ini petugas kasir <strong>{activeShift.cashierName}</strong> sedang membuka shift aktif. Sesuai aturan sistem single-cashier, Owner tidak dapat memproses transaksi kasir secara bersamaan agar pembukuan uang fisik di laci tidak rancu.
              </p>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <Link
                href="/penjualan/shift"
                className="btn-secondary text-xs font-bold"
              >
                Cek Monitoring Shift
              </Link>
            </div>
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-white border border-[#16A34A]/30 shadow-card text-center space-y-4 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#DCFCE7] text-[#15803D] inline-flex items-center justify-center">
              <IconCheckCircle size={32} />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-[#15803D]">
                Akses Kasir Owner Tersedia
              </h3>
              <p className="text-xs text-[#5B403D] leading-relaxed">
                Tidak ada petugas kasir yang sedang bertugas. Anda dapat membuka kasir dan melayani transaksi langsung dengan aman.
              </p>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <Link
                href="/kasir/pos"
                className="btn-primary text-xs sm:text-sm"
              >
                <IconPOS size={16} />
                <span>Buka Terminal POS</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

