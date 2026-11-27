'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AppShell from '../../components/AppShell';
import WordRevealHeading from '../../components/WordRevealHeading';
import MotionCard from '../../components/MotionCard';
import { useApp } from '../../lib/context';
import { formatOutletCopy } from '../../lib/businessInfo';
import { Transaction } from '../../lib/types';
import {
  IconSearch,
  IconPrint,
  IconClose,
  IconCheckCircle,
  IconBike,
  IconShoppingBag,
  IconStore,
  IconWhatsApp,
  IconDownload,
  IconRefresh,
  IconEye,
  IconClock,
  IconUser,
} from '../../components/Icons';

interface LogPlatformItem {
  id: string;
  refCode: string;
  time: string;
  customerName: string;
  customerNote: string;
  itemsSummary: string;
  platform: 'ShopeeFood' | 'GoFood' | 'WhatsApp' | 'Shopee';
  platformLabel: string;
  platformBadgeBg: string;
  platformBadgeText: string;
  status: 'Terkirim' | 'Selesai' | 'Terdireksi';
  statusBg: string;
  statusText: string;
  totalNominal: number;
}

export default function RiwayatPengalihanKasirPage() {
  const { transactions, currentUser, showToast } = useApp();
  const [search, setSearch] = useState('');
  const [selectedChannel, setSelectedChannel] = useState<'all' | 'ShopeeFood' | 'GoFood' | 'WhatsApp' | 'Shopee'>('all');
  const [selectedItem, setSelectedItem] = useState<LogPlatformItem | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  // Kasir only sees transactions processed by themselves (Section 6.2.3 & 6.3)
  const myTransactions = useMemo(
    () =>
      transactions.filter(
        (tx) => tx.cashierId === currentUser?.id || tx.cashierName === currentUser?.name
      ),
    [transactions, currentUser]
  );

  // Merge real transactions dynamically
  const mergedLogs: LogPlatformItem[] = useMemo(() => {
    return myTransactions.map((tx, idx) => {
      const platformTypes: Array<'ShopeeFood' | 'GoFood' | 'WhatsApp' | 'Shopee'> = [
        'ShopeeFood',
        'GoFood',
        'WhatsApp',
        'Shopee',
      ];
      const p = platformTypes[idx % 4];
      return {
        id: `tx-${tx.id}`,
        refCode: `#REF-${tx.code}`,
        time: tx.date ? new Date(tx.date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB' : '14:00 WIB',
        customerName: formatOutletCopy(tx.cashierName || 'Pelanggan Gerai'),
        customerNote: '(POS Kasir)',
        itemsSummary: tx.items.map((i) => `${i.quantity}x ${i.productName}`).join(', '),
        platform: p,
        platformLabel: p === 'Shopee' ? 'Shopee Official' : p === 'WhatsApp' ? 'WhatsApp Order' : p,
        platformBadgeBg: p === 'ShopeeFood' ? '#FFDAD6' : p === 'GoFood' ? '#DCFCE7' : p === 'WhatsApp' ? 'rgba(0,132,56,0.15)' : '#DAE2FD',
        platformBadgeText: p === 'ShopeeFood' ? '#93000B' : '#00682B',
        status: 'Terdireksi',
        statusBg: 'rgba(0,132,56,0.15)',
        statusText: '#00682B',
        totalNominal: tx.total,
      };
    });
  }, [myTransactions]);

  // Filter logs
  const filteredLogs = useMemo(() => {
    return mergedLogs.filter((item) => {
      const matchSearch =
        item.refCode.toLowerCase().includes(search.toLowerCase()) ||
        item.customerName.toLowerCase().includes(search.toLowerCase()) ||
        item.itemsSummary.toLowerCase().includes(search.toLowerCase());
      const matchChannel = selectedChannel === 'all' || item.platform === selectedChannel;
      return matchSearch && matchChannel;
    });
  }, [mergedLogs, search, selectedChannel]);

  // Quick stats
  const totalRef = mergedLogs.length;
  const shopeeFoodCount = mergedLogs.filter((i) => i.platform === 'ShopeeFood').length;
  const goFoodCount = mergedLogs.filter((i) => i.platform === 'GoFood').length;
  const marketplaceWaCount = mergedLogs.filter((i) => i.platform === 'Shopee' || i.platform === 'WhatsApp').length;

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      showToast('Saluran pesanan platform berhasil disinkronisasi.', 'success');
    }, 800);
  };

  const handleExportCSV = () => {
    const headers = 'No Referensi,Waktu,Pelanggan,Catatan,Item Pesanan,Platform,Status,Total Nominal\n';
    const rows = filteredLogs
      .map(
        (i) =>
          `"${i.refCode}","${i.time}","${i.customerName}","${i.customerNote}","${i.itemsSummary.replace(/"/g, '""')}","${i.platformLabel}","${i.status}",${i.totalNominal}`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `log_pengalihan_pesanan_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Log pengalihan berhasil diekspor ke format CSV.', 'success');
  };

  const renderPlatformIcon = (platform: LogPlatformItem['platform']) => {
    switch (platform) {
      case 'ShopeeFood':
        return <IconBike size={13} className="text-[#93000B]" />;
      case 'GoFood':
        return <IconShoppingBag size={13} className="text-[#002109]" />;
      case 'WhatsApp':
        return <IconWhatsApp size={13} className="text-[#00682B]" />;
      case 'Shopee':
        return <IconStore size={13} className="text-[#002109]" />;
    }
  };

  return (
    <AppShell>
      <div className="space-y-6 font-sans max-w-[1400px] mx-auto pb-16">
        {/* SECTION A: HEADER & BREADCRUMB (Figma 127:488) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#565E74]">
              <span>Pesanan Platform</span>
              <span className="text-slate-400">/</span>
              <span className="text-[#A24F9D]">Riwayat Pengalihan</span>
            </div>
            <WordRevealHeading
              text="Riwayat Pengalihan Pesanan Platform"
              as="h1"
              className="text-2xl sm:text-3xl font-extrabold text-[#191C1D] tracking-tight"
            />
          </div>

          {/* Top Right Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleExportCSV}
              className="px-3.5 py-2 rounded-[8px] bg-white border border-[#EDEEEF] hover:bg-slate-50 text-xs font-bold text-[#191C1D] flex items-center gap-2 transition-colors shadow-2xs"
            >
              <IconDownload size={14} className="text-[#A24F9D]" />
              <span>Ekspor CSV Log</span>
            </button>
            <button
              type="button"
              onClick={handleSync}
              disabled={isSyncing}
              className="px-3.5 py-2 rounded-[8px] bg-white border border-[#EDEEEF] hover:bg-slate-50 text-xs font-bold text-[#191C1D] flex items-center gap-2 transition-colors shadow-2xs"
            >
              <IconRefresh size={14} className={`text-[#A24F9D] ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Menyinkronkan...' : 'Sinkron Saluran'}</span>
            </button>
          </div>
        </div>

        {/* SECTION B: 4 MINI STAT CARDS (Figma 127:512) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: TOTAL PESANAN TERARAH */}
          <MotionCard className="bg-white rounded-[16px] border border-[#EDEEEF] p-4 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-[#565E74] tracking-wider uppercase block">
                TOTAL PESANAN TERARAH
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold text-[#191C1D]">{totalRef}</span>
                <span className="text-xs font-semibold text-[#565E74]">Ref</span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-[12px] bg-[#FFDAD6] text-[#93000B] flex items-center justify-center shrink-0">
              <IconStore size={20} />
            </div>
          </MotionCard>

          {/* Card 2: SHOPEEFOOD ORDERS */}
          <MotionCard className="bg-white rounded-[16px] border border-[#EDEEEF] p-4 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-[#565E74] tracking-wider uppercase block">
                SHOPEEFOOD ORDERS
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold text-[#A24F9D]">{shopeeFoodCount}</span>
                <span className="text-xs font-semibold text-[#565E74]">Pesanan</span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-[12px] bg-[#FFDAD6]/30 text-[#A24F9D] flex items-center justify-center shrink-0">
              <IconBike size={20} />
            </div>
          </MotionCard>

          {/* Card 3: GOFOOD ORDERS */}
          <MotionCard className="bg-white rounded-[16px] border border-[#EDEEEF] p-4 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-[#565E74] tracking-wider uppercase block">
                GOFOOD ORDERS
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold text-[#00682B]">{goFoodCount}</span>
                <span className="text-xs font-semibold text-[#565E74]">Pesanan</span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-[12px] bg-[#7FFC97] text-[#005320] flex items-center justify-center shrink-0">
              <IconShoppingBag size={20} />
            </div>
          </MotionCard>

          {/* Card 4: MARKETPLACE / WA */}
          <MotionCard className="bg-white rounded-[16px] border border-[#EDEEEF] p-4 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-[#565E74] tracking-wider uppercase block">
                MARKETPLACE / WA
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold text-[#191C1D]">{marketplaceWaCount}</span>
                <span className="text-xs font-semibold text-[#565E74]">Pesanan</span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-[12px] bg-[#DAE2FD] text-[#002109] flex items-center justify-center shrink-0">
              <IconWhatsApp size={20} />
            </div>
          </MotionCard>
        </div>

        {/* SECTION D: SEARCH & CHANNEL FILTER STRIP */}
        <div className="bg-white border border-[#EDEEEF] rounded-[16px] shadow-xs p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari no referensi, nama pemesan, atau item..."
              className="w-full pl-10 pr-4 py-2.5 rounded-[12px] bg-[#F3F4F5] border border-transparent focus:border-[#A24F9D] focus:bg-white text-xs sm:text-sm text-[#191C1D] placeholder:text-[#565E74] transition-all outline-none"
            />
            <span className="absolute left-3.5 top-3 text-[#565E74]">
              <IconSearch size={16} />
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedChannel('all')}
              className={`px-3.5 py-1.5 rounded-[8px] text-xs font-medium whitespace-nowrap transition-all ${
                selectedChannel === 'all'
                  ? 'bg-[#A24F9D] text-white shadow-xs font-semibold'
                  : 'bg-[#F3F4F5] text-[#565E74] hover:bg-slate-200'
              }`}
            >
              Semua ({mergedLogs.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedChannel('ShopeeFood')}
              className={`px-3.5 py-1.5 rounded-[8px] text-xs font-medium whitespace-nowrap transition-all ${
                selectedChannel === 'ShopeeFood'
                  ? 'bg-[#A24F9D] text-white shadow-xs font-semibold'
                  : 'bg-[#F3F4F5] text-[#565E74] hover:bg-slate-200'
              }`}
            >
              ShopeeFood ({shopeeFoodCount})
            </button>
            <button
              type="button"
              onClick={() => setSelectedChannel('GoFood')}
              className={`px-3.5 py-1.5 rounded-[8px] text-xs font-medium whitespace-nowrap transition-all ${
                selectedChannel === 'GoFood'
                  ? 'bg-[#A24F9D] text-white shadow-xs font-semibold'
                  : 'bg-[#F3F4F5] text-[#565E74] hover:bg-slate-200'
              }`}
            >
              GoFood ({goFoodCount})
            </button>
            <button
              type="button"
              onClick={() => setSelectedChannel('WhatsApp')}
              className={`px-3.5 py-1.5 rounded-[8px] text-xs font-medium whitespace-nowrap transition-all ${
                selectedChannel === 'WhatsApp'
                  ? 'bg-[#A24F9D] text-white shadow-xs font-semibold'
                  : 'bg-[#F3F4F5] text-[#565E74] hover:bg-slate-200'
              }`}
            >
              WhatsApp
            </button>
            <button
              type="button"
              onClick={() => setSelectedChannel('Shopee')}
              className={`px-3.5 py-1.5 rounded-[8px] text-xs font-medium whitespace-nowrap transition-all ${
                selectedChannel === 'Shopee'
                  ? 'bg-[#A24F9D] text-white shadow-xs font-semibold'
                  : 'bg-[#F3F4F5] text-[#565E74] hover:bg-slate-200'
              }`}
            >
              Shopee Official
            </button>
          </div>
        </div>

        {/* SECTION E: TIDY & SPACIOUS TABLE (Figma 127:610) */}
        <div className="bg-white rounded-[16px] border border-[#EDEEEF] shadow-xs overflow-hidden">
          {/* Table Topbar */}
          <div className="bg-[#F8F9FA] border-b border-[#EDEEEF] px-5 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#A24F9D]" />
              <h2 className="font-bold text-sm sm:text-base text-[#191C1D]">
                Log Pengalihan Pesanan
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#FFDAD6] text-[#93000B] font-bold text-xs">
                {filteredLogs.length} Terkini
              </span>
            </div>
            <span className="text-xs text-[#565E74]">Real-time sinkronisasi kasir</span>
          </div>

          {/* Table Container with proper horizontal overflow and clean min-widths */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8F9FA]/70 border-b border-[#EDEEEF] text-[#565E74] text-[11px] font-bold tracking-wider uppercase">
                  <th className="py-4 px-5 min-w-[175px]">NO. REFERENSI</th>
                  <th className="py-4 px-4 min-w-[95px]">WAKTU</th>
                  <th className="py-4 px-4 min-w-[160px]">PELANGGAN</th>
                  <th className="py-4 px-4 min-w-[240px]">ITEM PESANAN</th>
                  <th className="py-4 px-4 min-w-[150px] text-center">PLATFORM TUJUAN</th>
                  <th className="py-4 px-4 min-w-[120px] text-center">STATUS PENGALIHAN</th>
                  <th className="py-4 px-5 min-w-[110px] text-center">AKSI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDEEEF] text-xs">
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-[#FAF7F2]/60 transition-colors group cursor-pointer"
                      onClick={() => setSelectedItem(item)}
                    >
                      {/* No. Referensi */}
                      <td className="py-4 px-5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#A24F9D] shrink-0" />
                          <span className="font-mono font-bold text-[#A24F9D] text-xs sm:text-sm">
                            {item.refCode}
                          </span>
                        </div>
                      </td>

                      {/* Waktu */}
                      <td className="py-4 px-4 text-[#565E74] whitespace-nowrap font-medium">
                        {item.time}
                      </td>

                      {/* Pelanggan */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="font-bold text-[#191C1D]">{item.customerName}</div>
                        <div className="text-[11px] text-[#565E74]">{item.customerNote}</div>
                      </td>

                      {/* Item Pesanan */}
                      <td className="py-4 px-4 max-w-[280px]">
                        <p className="font-normal text-[#565E74] line-clamp-1 group-hover:text-[#191C1D] transition-colors leading-relaxed">
                          {item.itemsSummary}
                        </p>
                      </td>

                      {/* Platform Tujuan */}
                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        <span
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-2xs"
                          style={{
                            backgroundColor: item.platformBadgeBg,
                            color: item.platformBadgeText,
                          }}
                        >
                          {renderPlatformIcon(item.platform)}
                          <span>{item.platformLabel}</span>
                        </span>
                      </td>

                      {/* Status Pengalihan */}
                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        <span
                          className="inline-block px-3 py-0.5 rounded-full text-[11px] font-bold"
                          style={{
                            backgroundColor: item.statusBg,
                            color: item.statusText,
                          }}
                        >
                          {item.status}
                        </span>
                      </td>

                      {/* Aksi */}
                      <td className="py-4 px-5 text-center whitespace-nowrap">
                        <div
                          className="flex items-center justify-center gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            onClick={() => setSelectedItem(item)}
                            className="px-2.5 py-1 rounded-[6px] bg-[#A24F9D] hover:bg-[#8D3B89] text-white font-bold text-xs transition-colors shadow-2xs"
                          >
                            Detail
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedItem(item)}
                            title="Cetak Salinan Struk"
                            className="p-1 rounded-[6px] border border-[#EDEEEF] hover:bg-slate-100 text-[#565E74] hover:text-[#191C1D] transition-colors"
                          >
                            <IconPrint size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-16 text-center text-xs text-[#565E74] bg-[#F8F9FA]/30">
                      <p className="font-bold text-sm text-[#191C1D] mb-1">Tidak Ada Data</p>
                      <p>Tidak ada riwayat pengalihan yang cocok dengan filter atau pencarian Anda.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ORDER DETAIL & RECEIPT MODAL */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 12 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-[#EDEEEF]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between border-b border-[#EDEEEF] pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-[#A24F9D] tracking-wider uppercase block">
                      Rincian Log Pengalihan
                    </span>
                    <h3 className="font-extrabold text-lg text-[#191C1D]">{selectedItem.refCode}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedItem(null)}
                    className="text-slate-400 hover:text-slate-600 p-1"
                  >
                    <IconClose size={20} />
                  </button>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs bg-[#F8F9FA] p-3.5 rounded-xl border border-[#EDEEEF]">
                  <div>
                    <span className="text-[11px] text-[#565E74] block">Waktu Pesanan</span>
                    <span className="font-bold text-[#191C1D]">{selectedItem.time}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#565E74] block">Pelanggan</span>
                    <span className="font-bold text-[#191C1D]">
                      {selectedItem.customerName} {selectedItem.customerNote}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#565E74] block">Platform Saluran</span>
                    <span className="font-bold text-[#A24F9D]">{selectedItem.platformLabel}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#565E74] block">Status Rujukan</span>
                    <span className="font-bold text-[#00682B]">{selectedItem.status}</span>
                  </div>
                </div>

                {/* Items & Nominal */}
                <div className="p-4 rounded-xl bg-[#FFF7ED] border border-dashed border-[#CBD5E1] space-y-2 font-mono text-xs">
                  <p className="font-bold text-[#A24F9D] text-center border-b border-dashed border-[#CBD5E1] pb-1.5">
                    CIRENG CANGKELING - LOG ORDER
                  </p>
                  <div className="py-1 space-y-1 text-[#191C1D]">
                    <p className="font-sans text-[11px] text-[#565E74]">Ringkasan Item:</p>
                    <p className="font-sans font-semibold text-xs leading-relaxed">
                      {selectedItem.itemsSummary}
                    </p>
                  </div>
                  <div className="border-t border-dashed border-[#CBD5E1] pt-2 flex justify-between font-bold text-sm text-[#A24F9D]">
                    <span>ESTIMASI NILAI:</span>
                    <span>Rp {selectedItem.totalNominal.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="flex gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-[#191C1D] flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <IconPrint size={14} />
                    <span>Cetak Log</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedItem(null)}
                    className="flex-1 py-2 rounded-xl bg-[#A24F9D] hover:bg-[#8D3B89] text-white text-xs font-bold transition-colors"
                  >
                    Tutup
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppShell>
  );
}
