'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import AppShell from '../../components/AppShell';
import WordRevealHeading from '../../components/WordRevealHeading';
import MotionCard from '../../components/MotionCard';
import { useApp } from '../../lib/context';
import {
  IconCheckCircle,
  IconClose,
  IconEye,
  IconShoppingBag,
  IconWhatsApp,
  IconBike,
  IconStore,
  IconClock,
  IconUser,
} from '../../components/Icons';

interface PlatformOrderRedirect {
  id: string;
  refCode: string;
  time: string;
  customerName: string;
  customerType: string;
  menuDescription: string;
  platform: 'ShopeeFood' | 'GoFood' | 'Shopee' | 'WhatsApp';
  platformLabel: string;
  platformBg: string;
  platformText: string;
  status: 'Terdireksi' | 'Diproses' | 'Selesai';
  nominal: number;
}

export default function DashboardKasirPage() {
  const { transactions, currentUser } = useApp();
  const [selectedOrder, setSelectedOrder] = useState<PlatformOrderRedirect | null>(null);

  // Exact sample redirect orders from Figma 127:1661 (rows 127:1882 to 127:1950)
  const defaultRedirects: PlatformOrderRedirect[] = useMemo(() => [
    {
      id: 'dir-089',
      refCode: '#ORD-DIR-089',
      time: '14:10 WIB',
      customerName: 'Mas Dedi',
      customerType: 'Delivery Online',
      menuDescription: '2x Cireng Rujak, 1x Jeletot',
      platform: 'ShopeeFood',
      platformLabel: 'ShopeeFood',
      platformBg: 'bg-[#FFDAD6] text-[#B70011]',
      platformText: 'text-[#B70011]',
      status: 'Terdireksi',
      nominal: 48000,
    },
    {
      id: 'dir-088',
      refCode: '#ORD-DIR-088',
      time: '13:42 WIB',
      customerName: 'Ibu Dewi Permata',
      customerType: 'Pesan Cepat',
      menuDescription: '2x Paket Besek, 1x Mozzarella',
      platform: 'GoFood',
      platformLabel: 'GoFood',
      platformBg: 'bg-[#7FFC97] text-[#00682B]',
      platformText: 'text-[#00682B]',
      status: 'Terdireksi',
      nominal: 62000,
    },
    {
      id: 'dir-087',
      refCode: '#ORD-DIR-087',
      time: '13:25 WIB',
      customerName: 'Kang Budi Cileunyi',
      customerType: 'Order Luar Kota',
      menuDescription: '3x Cireng Rujak Frozen',
      platform: 'Shopee',
      platformLabel: 'Shopee Official',
      platformBg: 'bg-[#DAE2FD] text-[#131B2E]',
      platformText: 'text-[#131B2E]',
      status: 'Terdireksi',
      nominal: 45000,
    },
    {
      id: 'dir-086',
      refCode: '#ORD-DIR-086',
      time: '12:50 WIB',
      customerName: 'Teh Nengsih',
      customerType: 'Chat Langsung',
      menuDescription: '4x Cireng Pedas, 2x Keju',
      platform: 'WhatsApp',
      platformLabel: 'WhatsApp Admin',
      platformBg: 'bg-[#7FFC97] text-[#00682B]',
      platformText: 'text-[#00682B]',
      status: 'Terdireksi',
      nominal: 116000,
    },
  ], []);

  // Merge any live cashier transactions smoothly into the workbench
  const allOrders = useMemo(() => {
    if (transactions.length === 0) return defaultRedirects;
    const dynamicOrders: PlatformOrderRedirect[] = transactions.slice(0, 4).map((tx) => ({
      id: tx.id,
      refCode: tx.code,
      time: tx.date ? tx.date.split('T')[1]?.substring(0, 5) + ' WIB' : 'Hari ini',
      customerName: `Pelanggan #${tx.code.slice(-3)}`,
      customerType: tx.paymentMethod === 'tunai' ? 'POS OUTLET' : 'Order Digital',
      menuDescription: tx.items.map((it) => `${it.quantity}x ${it.productName}`).join(', '),
      platform: tx.paymentMethod === 'qris' ? 'ShopeeFood' : tx.paymentMethod === 'transfer' ? 'Shopee' : 'WhatsApp',
      platformLabel: tx.paymentMethod === 'qris' ? 'ShopeeFood' : tx.paymentMethod === 'transfer' ? 'Shopee Official' : 'WhatsApp Admin',
      platformBg: tx.paymentMethod === 'qris' ? 'bg-[#FFDAD6] text-[#B70011]' : tx.paymentMethod === 'transfer' ? 'bg-[#DAE2FD] text-[#131B2E]' : 'bg-[#7FFC97] text-[#00682B]',
      platformText: tx.paymentMethod === 'qris' ? 'text-[#B70011]' : tx.paymentMethod === 'transfer' ? 'text-[#131B2E]' : 'text-[#00682B]',
      status: 'Terdireksi',
      nominal: tx.total,
    }));
    return [...dynamicOrders, ...defaultRedirects.slice(dynamicOrders.length)];
  }, [transactions, defaultRedirects]);

  const totalRedirects = 86 + transactions.length;
  const totalPlatformClicks = 142 + transactions.length * 2;

  return (
    <AppShell>
      <div className="space-y-6 font-sans max-w-[1280px] mx-auto pb-12">
        {/* =========================================================================
            SECTION A: OPERATIONAL GREETING (Figma 127:1664)
           ========================================================================= */}
        <div className="bg-white rounded-[12px] p-6 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25),0px_1px_3px_0px_rgba(15,23,42,0.04)] border border-[#EDEEEF] flex items-center justify-between">
          <div className="space-y-1">
            <WordRevealHeading
              text={`Halo, Kasir ${currentUser?.name || 'Kasir'}!`}
              as="h1"
              className="text-[24px] font-bold text-[#191C1D] tracking-[-0.6px] leading-[32px]"
            />
            <div className="text-[14px] text-[#565E74] leading-[20px]">
              <p>Pantau ringkasan pengalihan pesanan online shift Anda, integrasi</p>
              <p>channel pesan makanan, dan ketersediaan menu aktif.</p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            SECTION B: 3 SUMMARY METRIC CARDS (Figma 127:1720)
           ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: PESANAN DIARAHKAN (Figma 127:1721) */}
          <MotionCard
            delay={0.05}
            hoverEffect="lift"
            className="bg-white rounded-[12px] p-4 h-[172px] shadow-[0px_4px_2px_0px_rgba(0,0,0,0.25),0px_1px_1.5px_0px_rgba(15,23,42,0.04)] border border-[#EDEEEF] flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[12px] font-semibold text-[#565E74] uppercase tracking-wider block leading-[16px]">
                  PESANAN DIARAHKAN
                </span>
                <div className="mt-1">
                  <p className="text-[32px] font-extrabold text-[#191C1D] leading-[40px]">
                    {totalRedirects}
                  </p>
                  <p className="text-[32px] font-extrabold text-[#191C1D] leading-[40px]">
                    Pesanan
                  </p>
                </div>
              </div>
              <div className="w-[44px] h-[44px] rounded-[12px] bg-[#FFDAD6] text-[#B70011] flex items-center justify-center shrink-0">
                <IconShoppingBag size={20} />
              </div>
            </div>
          </MotionCard>

          {/* Card 2: KUNJUNGAN PLATFORM (Figma 127:1737) */}
          <MotionCard
            delay={0.1}
            hoverEffect="lift"
            className="bg-white rounded-[12px] p-4 h-[172px] shadow-[0px_4px_2px_0px_rgba(0,0,0,0.25),0px_1px_1.5px_0px_rgba(15,23,42,0.04)] border border-[#EDEEEF] flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[12px] font-semibold text-[#565E74] uppercase tracking-wider block leading-[16px]">
                  KUNJUNGAN
                </span>
                <span className="text-[12px] font-semibold text-[#565E74] uppercase tracking-wider block leading-[16px]">
                  PLATFORM
                </span>
                <div className="mt-1">
                  <p className="text-[32px] font-extrabold text-[#B70011] leading-[40px]">
                    {totalPlatformClicks} Klik
                  </p>
                </div>
              </div>
              <div className="w-[44px] h-[44px] rounded-[12px] bg-[#7FFC97] text-[#00682B] flex items-center justify-center shrink-0">
                <IconBike size={21} />
              </div>
            </div>
            <div className="pt-2 border-t border-[#EDEEEF] flex items-center gap-1.5 text-[11px] text-[#565E74] font-bold">
              <span>GoFood: <strong className="text-[#191C1D] font-extrabold">52</strong></span>
              <span className="text-[#E1E3E4] font-normal text-[16px]">•</span>
              <span>ShopeeFood: <strong className="text-[#191C1D] font-extrabold">48</strong></span>
              <span className="text-[#E1E3E4] font-normal text-[16px]">•</span>
              <span>WA: <strong className="text-[#191C1D] font-extrabold">42</strong></span>
            </div>
          </MotionCard>

          {/* Card 3: MENU FAVORIT DIPILIH (Figma 127:1760) */}
          <MotionCard
            delay={0.15}
            hoverEffect="lift"
            className="bg-white rounded-[12px] p-4 h-[172px] shadow-[0px_4px_2px_0px_rgba(0,0,0,0.25),0px_1px_1.5px_0px_rgba(15,23,42,0.04)] border border-[#EDEEEF] flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[12px] font-semibold text-[#565E74] uppercase tracking-wider block leading-[16px]">
                  MENU FAVORIT DIPILIH
                </span>
                <div className="mt-1">
                  <p className="text-[32px] font-extrabold text-[#191C1D] leading-[40px]">
                    Cireng
                  </p>
                  <p className="text-[32px] font-extrabold text-[#191C1D] leading-[40px]">
                    Rujak
                  </p>
                </div>
              </div>
              <div className="w-[44px] h-[44px] rounded-[12px] bg-[#DAE2FD] text-[#131B2E] flex items-center justify-center shrink-0">
                <IconStore size={20} />
              </div>
            </div>
            <div className="pt-2 border-t border-[#EDEEEF] flex items-center gap-1.5 text-[12px] text-[#565E74]">
              <IconStore size={14} className="text-[#565E74] shrink-0" />
              <span className="truncate">58x diteruskan ke platform mitra</span>
            </div>
          </MotionCard>
        </div>

        {/* =========================================================================
            SECTION D: TWO-COLUMN OPERATIONAL WORKBENCH (Figma 127:1847)
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* =======================================================================
              LEFT COLUMN: LIVE TRANSAKSI SHIFT (8 COLS) (Figma 127:1848)
             ======================================================================= */}
          <MotionCard
            delay={0.2}
            hoverEffect="lift"
            className="lg:col-span-8 bg-white rounded-[12px] shadow-[0px_4px_2px_0px_rgba(0,0,0,0.25),0px_1px_3px_0px_rgba(15,23,42,0.04)] border border-[#EDEEEF] overflow-hidden flex flex-col justify-between"
          >
            <div>
              {/* Workbench Header */}
              <div className="p-4 border-b border-[#EDEEEF] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-[8px] bg-[#FFDAD6] text-[#B70011] flex items-center justify-center shrink-0">
                    <IconBike size={16} />
                  </div>
                  <div>
                    <h2 className="text-[16px] font-bold text-[#191C1D] leading-[22px]">
                      Aktivitas Pengalihan Pesanan Platform
                    </h2>
                    <p className="text-[12px] text-[#565E74] leading-[16px]">
                      Log pengalihan pesanan pelanggan ke saluran mitra online
                    </p>
                  </div>
                </div>

                <div className="bg-[#E7E8E9] px-2.5 py-1 rounded-full text-[11px] font-semibold text-[#191C1D] flex items-center gap-1.5 shrink-0">
                  <IconUser size={12} className="text-[#565E74]" />
                  <span>Kasir: {currentUser?.name || 'Kasir'}</span>
                </div>
              </div>

              {/* Tidy, non-crowded Table with Balanced Column Widths (Figma 127:1865) */}
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse table-auto">
                  <thead>
                    <tr className="bg-[#F3F4F5] border-b border-[#EDEEEF] text-[#565E74] text-[11px] font-bold tracking-[0.55px] uppercase">
                      <th className="py-3 px-3 w-[84px] whitespace-nowrap">NO. TIKET/REF</th>
                      <th className="py-3 px-3 w-[75px] whitespace-nowrap">WAKTU</th>
                      <th className="py-3 px-3 w-[110px] whitespace-nowrap">PELANGGAN</th>
                      <th className="py-3 px-3 min-w-[170px]">MENU YANG DIPILIH</th>
                      <th className="py-3 px-3 w-[125px] whitespace-nowrap">PLATFORM TUJUAN</th>
                      <th className="py-3 px-3 w-[90px] whitespace-nowrap">STATUS</th>
                      <th className="py-3 px-3 w-[50px] text-right whitespace-nowrap">AKSI</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EDEEEF] text-[12px]">
                    {allOrders.map((ord) => (
                      <tr
                        key={ord.id}
                        className="hover:bg-[#FFF7ED]/40 transition-colors group"
                      >
                        {/* 1. Tiket / Ref */}
                        <td className="py-3 px-3 font-mono font-bold text-[#191C1D] whitespace-nowrap text-[12px]">
                          {ord.refCode}
                        </td>

                        {/* 2. Waktu */}
                        <td className="py-3 px-3 text-[#565E74] whitespace-nowrap text-[12px]">
                          {ord.time}
                        </td>

                        {/* 3. Pelanggan */}
                        <td className="py-3 px-3">
                          <div className="font-bold text-[#191C1D] leading-tight text-[12px]">
                            {ord.customerName}
                          </div>
                          <span className="text-[11px] text-[#565E74] font-bold block mt-0.5 leading-tight">
                            {ord.customerType}
                          </span>
                        </td>

                        {/* 4. Menu Dipilih */}
                        <td className="py-3 px-3 text-[#5C403C] leading-snug text-[12px]">
                          {ord.menuDescription}
                        </td>

                        {/* 5. Platform Tujuan Badge */}
                        <td className="py-3 px-3 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-[11px] font-semibold ${ord.platformBg}`}
                          >
                            {ord.platform === 'WhatsApp' ? (
                              <IconWhatsApp size={11} />
                            ) : ord.platform === 'GoFood' ? (
                              <IconBike size={11} />
                            ) : (
                              <IconShoppingBag size={11} />
                            )}
                            <span>{ord.platformLabel}</span>
                          </span>
                        </td>

                        {/* 6. Status Chip */}
                        <td className="py-3 px-3 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 text-[#00682B] text-[11px] font-semibold">
                            <span className="size-2 rounded-full bg-[#16A34A]" />
                            <span>{ord.status}</span>
                          </span>
                        </td>

                        {/* 7. Aksi */}
                        <td className="py-3 px-3 text-right">
                          <button
                            type="button"
                            onClick={() => setSelectedOrder(ord)}
                            className="p-1 rounded text-[#565E74] hover:text-[#B70011] transition-colors"
                            title="Lihat Detail Pesanan"
                          >
                            <IconEye size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table Footer */}
            <div className="border-t border-[#EDEEEF] p-3 px-4 flex items-center justify-between bg-white">
              <span className="text-[11px] text-[#565E74] font-medium">
                Menampilkan 4 log pesanan terarah shift berjalan
              </span>
              <Link
                href="/kasir/riwayat"
                className="text-[12px] font-bold text-[#B70011] hover:underline flex items-center gap-1"
              >
                <span>Lihat Semua Riwayat Pengalihan Shift Ini</span>
                <span className="text-sm font-sans">→</span>
              </Link>
            </div>
          </MotionCard>

          {/* =======================================================================
              RIGHT COLUMN: TAUTAN SALURAN PLATFORM AKTIF (4 COLS) (Figma 127:1980)
             ======================================================================= */}
          <MotionCard
            delay={0.25}
            hoverEffect="lift"
            className="lg:col-span-4 bg-white rounded-[12px] shadow-[0px_4px_2px_0px_rgba(0,0,0,0.25),0px_1px_3px_0px_rgba(15,23,42,0.04)] border border-[#EDEEEF] p-4 flex flex-col justify-between space-y-4"
          >
            <div>
              {/* Header Tautan */}
              <div className="flex items-start justify-between pb-3 border-b border-[#EDEEEF]">
                <div>
                  <h3 className="text-[16px] font-bold text-[#191C1D] leading-tight">
                    Tautan Saluran Platform Aktif
                  </h3>
                  <p className="text-[12px] text-[#565E74] leading-[16px] mt-0.5">
                    Saluran resmi untuk mengarahkan pesanan online pelanggan secara langsung
                  </p>
                </div>
                <span className="bg-[#DCFCE7] text-[#00682B] text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                  <span className="size-1.5 rounded-full bg-[#16A34A] animate-pulse" />
                  <span>Online</span>
                </span>
              </div>

              {/* 4 Official Channels with Figma exact design (127:1991 - 127:2043) */}
              <div className="space-y-2.5 pt-3">
                {/* 1. ShopeeFood */}
                <div className="flex items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-[8px] bg-[#FFDAD6] text-[#B70011] flex items-center justify-center shrink-0">
                      <IconShoppingBag size={18} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[12px] font-bold text-[#191C1D] truncate leading-[16px]">
                        ShopeeFood Cireng Cangkeling
                      </h4>
                      <p className="text-[12px] text-[#565E74] truncate leading-[16px]">
                        Menu Siap Antar • Aktif
                      </p>
                    </div>
                  </div>
                  <a
                    href="https://shopee.co.id/now-food"
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1 rounded-[8px] bg-[#B70011] hover:bg-[#92000E] text-white text-[11px] font-semibold transition-all shrink-0"
                  >
                    Buka
                  </a>
                </div>

                {/* 2. GoFood */}
                <div className="border-t border-[#EDEEEF] pt-2.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-[8px] bg-[#7FFC97] text-[#00682B] flex items-center justify-center shrink-0">
                      <IconBike size={18} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[12px] font-bold text-[#191C1D] truncate leading-[16px]">
                        GoFood Cireng Cangkeling
                      </h4>
                      <p className="text-[12px] text-[#565E74] truncate leading-[16px]">
                        Grab &amp; Go / Delivery • Aktif
                      </p>
                    </div>
                  </div>
                  <a
                    href="https://gofood.co.id"
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1 rounded-[8px] bg-[#00682B] hover:bg-[#005222] text-white text-[11px] font-semibold transition-all shrink-0"
                  >
                    Buka
                  </a>
                </div>

                {/* 3. Shopee Official Store */}
                <div className="border-t border-[#EDEEEF] pt-2.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-[8px] bg-[#DAE2FD] text-[#131B2E] flex items-center justify-center shrink-0">
                      <IconStore size={18} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[12px] font-bold text-[#191C1D] truncate leading-[16px]">
                        Shopee Official Store
                      </h4>
                      <p className="text-[12px] text-[#565E74] truncate leading-[16px]">
                        Cireng Frozen Luar Kota • Aktif
                      </p>
                    </div>
                  </div>
                  <a
                    href="https://shopee.co.id"
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1 rounded-[8px] bg-[#565E74] hover:bg-[#3D4559] text-white text-[11px] font-semibold transition-all shrink-0"
                  >
                    Buka
                  </a>
                </div>

                {/* 4. WhatsApp Admin */}
                <div className="border-t border-[#EDEEEF] pt-2.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-[8px] bg-[#7FFC97] text-[#00682B] flex items-center justify-center shrink-0">
                      <IconWhatsApp size={18} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[12px] font-bold text-[#191C1D] truncate leading-[16px]">
                        WhatsApp Admin Pesanan
                      </h4>
                      <p className="text-[12px] text-[#565E74] truncate leading-[16px]">
                        Respon Cepat Pesanan Custom
                      </p>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1 rounded-[8px] bg-[#00682B] hover:bg-[#005222] text-white text-[11px] font-semibold transition-all shrink-0 flex items-center gap-1"
                  >
                    Chat
                  </a>
                </div>
              </div>
            </div>

            {/* Cashier Shift Guidance Callout Box (Figma 127:2048) */}
            <div className="bg-[#F3F4F5] rounded-[8px] p-3 border border-[#EDEEEF] flex items-start gap-2.5 text-[12px] leading-[19.5px]">
              <span className="text-[#A24F9D] font-bold text-base shrink-0">💡</span>
              <div>
                <strong className="text-[#191C1D] font-bold">Tugas Shift Kasir:</strong>{' '}
                <span className="text-[#565E74]">
                  Bantu pelanggan memilih menu favorit dari katalog dan arahkan ke tautan platform online resmi untuk kemudahan pemesanan dan pengantaran.
                </span>
              </div>
            </div>
          </MotionCard>
        </div>

        {/* =========================================================================
            DETAIL MODAL FOR ORDER REDIRECT
           ========================================================================= */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in font-sans">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-[#CBD5E1] p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#EDEEEF]">
                <div>
                  <span className="text-[11px] font-bold text-[#B70011] uppercase tracking-wider">
                    DETAIL PENGALIHAN PESANAN
                  </span>
                  <h3 className="text-base font-bold text-[#191C1D]">
                    {selectedOrder.refCode}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="text-[#565E74] hover:text-[#191C1D]"
                >
                  <IconClose size={20} />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-[#FAF7F2] rounded-xl space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#565E74]">Waktu Pencatatan:</span>
                    <strong className="text-[#191C1D]">{selectedOrder.time}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#565E74]">Pelanggan:</span>
                    <strong className="text-[#191C1D]">{selectedOrder.customerName} ({selectedOrder.customerType})</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#565E74]">Saluran Tujuan:</span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${selectedOrder.platformBg}`}>
                      {selectedOrder.platformLabel}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#565E74]">Estimasi Nilai:</span>
                    <strong className="text-[#B70011] font-bold">
                      Rp {selectedOrder.nominal.toLocaleString('id-ID')}
                    </strong>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-[#EDEEEF]">
                  <span className="text-[11px] font-bold text-[#565E74] block mb-1">Menu yang Dipesan:</span>
                  <p className="text-[13px] text-[#191C1D] font-medium leading-relaxed">
                    {selectedOrder.menuDescription}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="w-full py-2.5 rounded-xl bg-[#B70011] text-white text-xs font-bold hover:bg-[#92000E] transition-colors"
                >
                  Tutup Informasi
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
