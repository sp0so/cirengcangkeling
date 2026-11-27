'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import PageTransition from '../components/PageTransition';
import WordRevealHeading from '../components/WordRevealHeading';
import MotionCard from '../components/MotionCard';
import { businessInfo } from '../lib/businessInfo';
import {
  IconFlame,
  IconShield,
  IconPackage,
  IconSnowflake,
  IconLeaf,
  IconCheck,
  IconWhatsApp,
} from '../components/Icons';

export default function MenuFrozenPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'tanpa-isi' | 'isi' | 'menu-lain'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Frozen categories & items from Figma Node 82:1862
  const frozenCategories = [
    {
      id: 'tanpa-isi',
      number: '01',
      title: 'CIRENG TANPA ISI (FROZEN PACK)',
      items: [
        {
          id: 'fr-mini-10',
          name: 'Cireng Rujak Mini Frozen (Pack 10)',
          desc: 'Kemasan vakum isi 10 cireng mini siap goreng + 1 sachet bumbu rujak legit gula aren asli.',
          portion: 'Pack Isi 10 pcs',
          price: 10000,
          badge: 'BEST VALUE',
          storage: 'Tahan 3 Bulan Freezer',
        },
        {
          id: 'fr-mini-20',
          name: 'Cireng Rujak Mini Frozen Jumbo (Pack 20)',
          desc: 'Porsi hemat keluarga isi 20 cireng mini + 2 sachet bumbu rujak ekstra pedas manis.',
          portion: 'Pack Isi 20 pcs',
          price: 18000,
          badge: 'HEMAT JUMBO',
          storage: 'Tahan 3 Bulan Freezer',
        },
        {
          id: 'fr-reguler-rujak',
          name: 'Cireng Sambal Rujak Reguler Frozen',
          desc: 'Cireng ukuran reguler tebal isi 10 pcs dengan racikan tepung tapioka premium + bumbu rujak kental.',
          portion: 'Pack Isi 10 pcs',
          price: 12000,
          badge: 'SIGNATURE',
          storage: 'Tahan 3 Bulan Freezer',
        },
        {
          id: 'fr-reguler-bangkok',
          name: 'Cireng Sambal Bangkok Reguler Frozen',
          desc: 'Cireng reguler isi 10 pcs berpadu saus sambal Bangkok asam manis pedas segar khas Thailand.',
          portion: 'Pack Isi 10 pcs',
          price: 13000,
          badge: 'SEGAR PEDAS',
          storage: 'Tahan 3 Bulan Freezer',
        },
      ],
    },
    {
      id: 'isi',
      number: '02',
      title: 'CIRENG ISI (FROZEN PACK)',
      items: [
        {
          id: 'fr-isi-ayam',
          name: 'Cireng Isi Ayam Suwir Frozen (Pack 5)',
          desc: 'Daging ayam suwir empuk gurih bumbu rempah pilihan (Pilihan rasa: Original / Pedas / Cabe Ijo).',
          portion: 'Pack Isi 5 pcs Jumbo',
          price: 16000,
          badge: 'FAVORIT KELUARGA',
          storage: 'Tahan 3 Bulan Freezer',
        },
        {
          id: 'fr-isi-tetelan',
          name: 'Cireng Isi Tetelan Sapi Frozen (Pack 5)',
          desc: 'Tetelan sapi lembut gurih berkaldu sedap tanpa bau amis (Pilihan rasa: Original / Pedas).',
          portion: 'Pack Isi 5 pcs Jumbo',
          price: 18500,
          badge: 'GURIH KALDU',
          storage: 'Tahan 3 Bulan Freezer',
        },
        {
          id: 'fr-isi-ati-ampela',
          name: 'Cireng Isi Ati Ampela Frozen (Pack 5)',
          desc: 'Olahan ati ampela segar dimasak bumbu balado gurih pedas nikmat.',
          portion: 'Pack Isi 5 pcs Jumbo',
          price: 16000,
          badge: 'TRADISIONAL',
          storage: 'Tahan 3 Bulan Freezer',
        },
        {
          id: 'fr-isi-ikan',
          name: 'Cireng Isi Daging Ikan Frozen (Pack 5)',
          desc: 'Olahan ikan laut segar dengan racikan rempah wangi kemangi khas pesisir.',
          portion: 'Pack Isi 5 pcs Jumbo',
          price: 16000,
          badge: 'WANGI KEMANGI',
          storage: 'Tahan 3 Bulan Freezer',
        },
        {
          id: 'fr-isi-cumi',
          name: 'Cireng Isi Cumi Pedas Frozen (Pack 5)',
          desc: 'Potongan cumi kenyal dimasak oseng cabai rawit merah pedas nendang dan daun jeruk.',
          portion: 'Pack Isi 5 pcs Jumbo',
          price: 21000,
          badge: 'SUPER PEDAS',
          storage: 'Tahan 3 Bulan Freezer',
        },
        {
          id: 'fr-isi-beef-bulgogi',
          name: 'Cireng Isi Beef Bulgogi Frozen (Pack 5)',
          desc: 'Daging sapi marinasi saus manis gurih bulgogi ala Korea berpadu adonan cireng Nusantara.',
          portion: 'Pack Isi 5 pcs Jumbo',
          price: 21000,
          badge: 'PREMIUM',
          storage: 'Tahan 3 Bulan Freezer',
        },
        {
          id: 'fr-isi-keju',
          name: 'Cireng Isi Keju Melted Frozen (Pack 5)',
          desc: 'Perpaduan keju cheddar dan mozzarella gurih asin yang meleleh lumer saat digoreng panas.',
          portion: 'Pack Isi 5 pcs Jumbo',
          price: 18500,
          badge: 'LUMER MELELEH',
          storage: 'Tahan 3 Bulan Freezer',
        },
      ],
    },
    {
      id: 'menu-lain',
      number: '03',
      title: 'MENU LAIN',
      items: [
        {
          id: 'fr-tahu-aci',
          name: 'Tahu Aci Pletok Frozen (Pack 10)',
          desc: 'Tahu kuning gurih dengan adonan aci daun kucai siap goreng krispi mengembang.',
          portion: 'Pack Isi 10 pcs',
          price: 10000,
          badge: 'GARING MEKAR',
          storage: 'Tahan 3 Bulan Freezer',
        },
        {
          id: 'fr-pentol-kudus',
          name: 'Pentol Kudus Frozen (Pack 20)',
          desc: 'Pentol daging bertekstur mantap lengkap dengan racikan bumbu gurih khas Kudus.',
          portion: 'Pack Isi 20 pcs',
          price: 18000,
          badge: 'DAGING ASLI',
          storage: 'Tahan 3 Bulan Freezer',
        },
        {
          id: 'fr-cilok-sapi',
          name: 'Cilok Daging Sapi Frozen (Pack 20)',
          desc: 'Cilok kenyal padat isi daging sapi giling + bumbu kacang sedap siap seduh.',
          portion: 'Pack Isi 20 pcs + Bumbu',
          price: 15000,
          badge: 'KENYAL GURIH',
          storage: 'Tahan 3 Bulan Freezer',
        },
        {
          id: 'fr-bakso-goreng',
          name: 'Bakso Goreng Jumbo Frozen (Pack 5)',
          desc: 'Bakso ayam udang garing mekar siap digoreng dengan api sedang.',
          portion: 'Pack Isi 5 pcs Jumbo',
          price: 22500,
          badge: 'MEKAR CRISPY',
          storage: 'Tahan 3 Bulan Freezer',
        },
        {
          id: 'fr-dimsum-ayam',
          name: 'Dimsum Siomay Ayam Frozen (Pack 10)',
          desc: 'Dimsum daging ayam padat juicy lembut tinggal dikukus 10 menit + saus pedas manis.',
          portion: 'Pack Isi 10 pcs + Saus',
          price: 26000,
          badge: 'SIAP KUKUS',
          storage: 'Tahan 3 Bulan Freezer',
        },
        {
          id: 'fr-combro',
          name: 'Combro Pedas Kemangi Frozen (Pack 5)',
          desc: 'Parutan singkong isi oncom pedas daun kemangi khas Sunda siap goreng keemasan.',
          portion: 'Pack Isi 5 pcs',
          price: 14000,
          badge: 'KHAS SUNDA',
          storage: 'Tahan 3 Bulan Freezer',
        },
      ],
    },
  ];

  const filteredCategories = useMemo(() => {
    return frozenCategories
      .filter((cat) => (activeTab === 'all' ? true : cat.id === activeTab))
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((item) =>
          searchQuery.trim() === ''
            ? true
            : item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.desc.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [activeTab, searchQuery]);

  const handleOrderWhatsapp = (itemName: string, price: number) => {
    const text = `Halo Cireng Cangkeling! Saya ingin memesan paket frozen:\n• ${itemName} (Rp ${price.toLocaleString('id-ID')})\nMohon informasi ongkir dan pengirimannya ya, terima kasih!`;
    window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#FFF7ED] text-[#0B1C30] flex flex-col font-sans selection:bg-[#A24F9D] selection:text-white">
        {/* 1. BRAND HEADER (Node 82:1835) */}
        <header className="sticky top-0 z-40 bg-[#A24F9D] border-b border-[#5B3765] shadow-md transition-all">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 shrink-0 drop-shadow-xs group-hover:scale-105 transition-transform duration-200">
                <Image
                  src="/logo-brand.png"
                  alt="Logo Cireng Cangkeling"
                  fill
                  sizes="40px"
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <span className="font-semibold text-lg sm:text-[18px] text-white tracking-[-0.45px] block leading-tight font-brand">
                  Cireng Cangkeling
                </span>
                <span className="text-[10px] font-black text-[#FCD34D] tracking-[1px] block uppercase mt-0.5">
                  {businessInfo.slogan}
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              <nav className="bg-black/20 border border-white/10 rounded-[4px] p-1 flex items-center gap-1">
                <Link
                  href="/"
                  className="text-white/90 hover:text-white font-bold text-xs px-3 sm:px-4 py-2 rounded-[2px] tracking-[0.48px] transition"
                >
                  Home
                </Link>
                <Link
                  href="/menu-siap-makan"
                  className="text-white/90 hover:text-white font-bold text-xs px-3 sm:px-4 py-2 rounded-[2px] tracking-[0.48px] transition"
                >
                  Menu Siap Makan
                </Link>
                <Link
                  href="/menu-frozen"
                  className="bg-white text-[#7F1D1D] font-bold text-sm px-4 py-2 rounded-[2px] shadow-xs transition"
                >
                  Menu Frozen
                </Link>
                <Link
                  href="/pesan"
                  className="text-white/90 hover:text-white font-bold text-xs px-3 sm:px-4 py-2 rounded-[2px] tracking-[0.48px] transition"
                >
                  Cara Pesan
                </Link>
              </nav>
              <Link
                href="/login"
                className="hidden md:inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-3 py-2 rounded-[4px] font-semibold text-xs transition"
                title="Portal Staf & Kasir"
              >
                <span>Portal Login</span>
                <span className="text-xs">→</span>
              </Link>
            </div>
          </div>
        </header>

        {/* 2. HERO SECTION - FROZEN (Node 82:1865) */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#5B3765] via-[#6B3767] to-[#5B3765] text-white py-14 sm:py-20 px-4 sm:px-8 lg:px-12 shadow-2xl">
          {/* Glow Effects */}
          <div className="absolute -top-24 right-0 w-96 h-96 bg-[#A24F9D]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#FE932C]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Column (Span 7) */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <WordRevealHeading
                text="MENU FROZEN CIRENG CANGKELING"
                as="h1"
                className="tracking-[-1.1px] leading-[1.15] mb-4 font-black text-3xl sm:text-4xl lg:text-[44px] text-[#FCD34D]"
              />

              <p className="text-[rgba(234,241,255,0.9)] text-sm sm:text-base leading-[26px] max-w-xl mb-6 font-normal">
                Pilihan camilan frozen yang praktis untuk stok di rumah dan dinikmati kapan saja. Kemasan vakum kedap udara, higienis & tahan kirim ke berbagai kota!
              </p>

              <div className="flex flex-wrap items-center gap-3 mb-8">
                <a
                  href="#katalog-frozen"
                  className="bg-[#FE932C] hover:bg-[#E8801C] text-[#2F1500] font-black text-xs px-5 py-3 rounded shadow-md transition active:scale-95 inline-flex items-center gap-2 uppercase tracking-wide"
                >
                  <span>Lihat Daftar Harga Resmi</span>
                  <span>↓</span>
                </a>
                <div className="bg-[#9E6899] text-[#EAF1FF] font-bold text-xs px-4 py-3 rounded inline-flex items-center gap-2">
                  <IconShield size={16} className="text-[#EAF1FF]" />
                  <span>100% Halal & Higienis</span>
                </div>
              </div>
            </div>

            {/* Right Column (Span 5) - Visual Card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-[477px] h-[320px] rounded-xl overflow-hidden shadow-2xl relative border-2 border-white/20 bg-[#5F030A]">
                <Image
                  src="/hero-cireng.png"
                  alt="Paket Frozen Cireng Cangkeling"
                  fill
                  sizes="(max-width: 768px) 100vw, 477px"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#27313F]/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-[#9E6899]/90 backdrop-blur-md rounded px-3 py-2 flex items-center justify-between">
                  <span className="text-[10px] font-black text-[#EAF1FF] uppercase tracking-wider flex items-center gap-1.5">
                    <IconPackage size={14} className="text-[#EAF1FF]" />
                    <span>VAKUM TAHAN KIRIM ANTAR KOTA</span>
                  </span>
                  <span className="bg-[#6F4771] text-[#FFDCC3] text-[10px] font-bold px-2 py-0.5 rounded">
                    Ready Stock
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Value Cards (Node 82:1904) */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10 border-t border-white/15 mt-8">
            {/* Card 1 */}
            <MotionCard delay={0.05} hoverEffect="glow" className="bg-[#9E6899]/70 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-sm flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-lg bg-[#5B3765] text-white flex items-center justify-center shrink-0">
                <IconPackage size={22} className="text-[#FCD34D]" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm sm:text-base leading-snug">
                  Kemasan Vakum Kedap Udara
                </h3>
                <p className="text-xs text-[rgba(234,241,255,0.8)] leading-relaxed mt-1">
                  Dipress dengan mesin vakum berstandar food grade untuk menjaga cita rasa dan tekstur kenyal.
                </p>
              </div>
            </MotionCard>

            {/* Card 2 */}
            <MotionCard delay={0.15} hoverEffect="glow" className="bg-[#9E6899]/70 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-sm flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-lg bg-[#5B3765] text-white flex items-center justify-center shrink-0">
                <IconSnowflake size={22} className="text-[#FCD34D]" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm sm:text-base leading-snug">
                  Tahan 3 Bulan di Freezer
                </h3>
                <p className="text-xs text-[rgba(234,241,255,0.8)] leading-relaxed mt-1">
                  Aman 4-5 hari suhu ruang selama pengiriman reguler, serta awet hingga 90 hari dalam freezer beku.
                </p>
              </div>
            </MotionCard>

            {/* Card 3 */}
            <MotionCard delay={0.25} hoverEffect="glow" className="bg-[#9E6899]/70 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-sm flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-lg bg-[#5B3765] text-white flex items-center justify-center shrink-0">
                <IconLeaf size={22} className="text-[#FCD34D]" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm sm:text-base leading-snug">
                  100% Bebas Pengawet Kimia
                </h3>
                <p className="text-xs text-[rgba(234,241,255,0.8)] leading-relaxed mt-1">
                  Diracik dari tapioka murni, rempah alami pilihan, dan daging segar tanpa zat pengawet sintetis.
                </p>
              </div>
            </MotionCard>
          </div>
        </section>

      {/* 3. FILTER TABS & SEARCH */}
      <section id="katalog-frozen" className="sticky top-20 z-30 bg-[#FFF7ED]/95 backdrop-blur-md border-b border-[#CBD5E1]/70 shadow-xs py-3 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-[4px] text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === 'all'
                  ? 'bg-[#5B3765] text-white shadow-xs'
                  : 'bg-white text-[#5B3765] border border-[#CBD5E1] hover:border-[#5B3765]'
              }`}
            >
              Semua Menu Frozen (17)
            </button>
            <button
              onClick={() => setActiveTab('tanpa-isi')}
              className={`px-3.5 py-1.5 rounded-[4px] text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === 'tanpa-isi'
                  ? 'bg-[#5B3765] text-white shadow-xs'
                  : 'bg-white text-[#5B3765] border border-[#CBD5E1] hover:border-[#5B3765]'
              }`}
            >
              01 Tanpa Isi Frozen (4)
            </button>
            <button
              onClick={() => setActiveTab('isi')}
              className={`px-3.5 py-1.5 rounded-[4px] text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === 'isi'
                  ? 'bg-[#5B3765] text-white shadow-xs'
                  : 'bg-white text-[#5B3765] border border-[#CBD5E1] hover:border-[#5B3765]'
              }`}
            >
              02 Cireng Isi Frozen (7)
            </button>
            <button
              onClick={() => setActiveTab('menu-lain')}
              className={`px-3.5 py-1.5 rounded-[4px] text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === 'menu-lain'
                  ? 'bg-[#5B3765] text-white shadow-xs'
                  : 'bg-white text-[#5B3765] border border-[#CBD5E1] hover:border-[#5B3765]'
              }`}
            >
              03 Menu Lain Frozen (6)
            </button>
          </div>

          <div className="w-full sm:w-64 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari varian frozen..."
              className="w-full bg-white border border-[#CBD5E1] rounded-[4px] px-3 py-1.5 text-xs text-[#0B1C30] placeholder:text-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#5B3765]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1.5 text-xs text-gray-400 hover:text-black font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 4. PRODUCT CATALOG */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10 flex-1 w-full space-y-12">
        {filteredCategories.map((cat) => (
          <section key={cat.id} id={cat.id} className="scroll-mt-36">
            <div className="bg-[#5B3765] text-white rounded-[4px] p-4 mb-4 shadow-sm flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-8 h-8 rounded-[2px] bg-white text-[#5F030A] font-bold text-base flex items-center justify-center shrink-0">
                  {cat.number}
                </div>
                <div>
                  <h2 className="font-bold text-lg sm:text-xl tracking-wide uppercase font-brand text-white">
                    {cat.title}
                  </h2>
                </div>
              </div>
              <span className="text-[11px] font-black text-[#FCD34D] bg-white/10 px-2.5 py-1 rounded uppercase tracking-wider">
                {cat.items.length} Paket
              </span>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-[#CBD5E1]/60 overflow-hidden divide-y divide-[#CBD5E1]/50">
              {cat.items.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(idx * 0.04, 0.3) }}
                  className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#FFFDF9] transition-colors"
                >
                  <div className="flex-1 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <h3 className="font-bold text-base sm:text-lg text-[#0F172A]">
                        {item.name}
                      </h3>
                      <span className="bg-[#E0F2FE] text-[#0369A1] text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                        {item.badge}
                      </span>
                      <span className="text-[11px] text-[#059669] font-semibold bg-[#ECFDF5] px-2 py-0.5 rounded inline-flex items-center gap-1">
                        <IconCheck size={12} className="text-[#059669]" />
                        <span>{item.portion}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#64748B]">
                      <span className="inline-flex items-center gap-1">
                        <IconSnowflake size={13} className="text-[#0284C7]" />
                        <span>{item.storage}</span>
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1">
                        <IconPackage size={13} className="text-[#0284C7]" />
                        <span>Segel Kedap Udara Vakum</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center md:flex-col md:items-end justify-between md:justify-center gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100">
                    <div className="text-left md:text-right">
                      <span className="block text-xs text-gray-400 font-semibold uppercase">
                        Harga / Pack
                      </span>
                      <span className="font-black text-xl sm:text-2xl text-[#5B3765]">
                        Rp {item.price.toLocaleString('id-ID')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOrderWhatsapp(item.name, item.price)}
                        className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-3.5 py-2 rounded text-xs font-bold shadow-xs hover:shadow transition flex items-center gap-1.5 active:scale-95"
                      >
                        <IconWhatsApp size={14} className="text-white" />
                        <span>Order WA</span>
                      </button>

                      <Link
                        href="/pesan"
                        className="bg-[#5B3765] hover:bg-[#482852] text-white px-3.5 py-2 rounded text-xs font-bold shadow-xs hover:shadow transition active:scale-95"
                      >
                        Info Pengiriman
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        ))}

        {/* 5. PETUNJUK MENGGORENG / FRYING INSTRUCTIONS (Node 82:2180) */}
        <section className="bg-white border border-[#CBD5E1] rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-black text-[#5B3765] uppercase tracking-wider bg-[#F5EEF8] px-3 py-1 rounded-full">
              Tips Praktis
            </span>
            <h2 className="text-xl sm:text-2xl font-black font-brand text-[#0F172A] mt-2">
              Cara Menggoreng Cireng Frozen yang Sempurna
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1">
              Ikuti 4 langkah mudah berikut agar cireng mekar renyah di luar dan kenyal lembut di dalam.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <MotionCard delay={0.05} hoverEffect="lift" className="bg-[#FFF7ED] rounded-xl p-5 border border-[#FFEDD5] flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-[#FE932C] text-white font-black text-sm flex items-center justify-center mb-3">
                1
              </div>
              <h3 className="font-bold text-sm text-[#0F172A] mb-1">Thawing Suhu Ruang</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Keluarkan cireng dari freezer dan diamkan 10–15 menit hingga tidak beku keras.
              </p>
            </MotionCard>

            <MotionCard delay={0.12} hoverEffect="lift" className="bg-[#FFF7ED] rounded-xl p-5 border border-[#FFEDD5] flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-[#FE932C] text-white font-black text-sm flex items-center justify-center mb-3">
                2
              </div>
              <h3 className="font-bold text-sm text-[#0F172A] mb-1">Minyak Api Sedang</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Panaskan minyak goreng dalam jumlah cukup dengan api sedang (jangan terlalu panas).
              </p>
            </MotionCard>

            <MotionCard delay={0.19} hoverEffect="lift" className="bg-[#FFF7ED] rounded-xl p-5 border border-[#FFEDD5] flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-[#FE932C] text-white font-black text-sm flex items-center justify-center mb-3">
                3
              </div>
              <h3 className="font-bold text-sm text-[#0F172A] mb-1">Goreng 3–5 Menit</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Masukkan cireng, bolak-balik perlahan hingga kulit luar mekar dan renyah keemasan.
              </p>
            </MotionCard>

            <MotionCard delay={0.26} hoverEffect="lift" className="bg-[#FFF7ED] rounded-xl p-5 border border-[#FFEDD5] flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-[#FE932C] text-white font-black text-sm flex items-center justify-center mb-3">
                4
              </div>
              <h3 className="font-bold text-sm text-[#0F172A] mb-1">Tiriskan & Cocol Rujak</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Angkat, tiriskan minyak, dan nikmati hangat bersama bumbu rujak legit Cireng Cangkeling!
              </p>
            </MotionCard>
          </div>
        </section>
      </main>

      {/* 6. BRAND FOOTER (Node 82:1781) */}
      <footer className="bg-gradient-to-b from-[#A24F9D] to-[#5B3765] border-t-4 border-[#F9EB10] text-white shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] pt-12 pb-8 px-4 sm:px-8 lg:px-12 mt-auto">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {/* Col 1 */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#FBBF24] rounded-[4px] w-9 h-9 flex items-center justify-center shadow-xs shrink-0">
                  <div className="relative w-[13px] h-[17px]">
                    <Image
                      src="/icons/footer-logo.svg"
                      alt="Logo icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <span className="font-bold text-white text-[18px] tracking-[-0.45px]">
                  Cireng Cangkeling
                </span>
              </div>
              <p className="text-[#FEE2E2] text-xs leading-[19.5px] mb-4">
                Pelopor cireng renyah gurih khas Nusantara asal Yogyakarta. Diracik dengan bumbu rempah pilihan, isian daging premium, dan resep otentik.
              </p>
              <div className="bg-white/10 border border-white/20 rounded-[2px] px-2.5 py-1 inline-flex items-center gap-2 self-start">
                <div className="relative w-[13px] h-[12px] shrink-0">
                  <Image
                    src="/icons/shield.svg"
                    alt="Shield Icon"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-black text-[#FCD34D] text-[10px] tracking-[0.6px] uppercase">
                  Otentik & Higienis
                </span>
              </div>
            </div>

            {/* Col 2 */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className="relative w-[14px] h-[12px] shrink-0">
                  <Image
                    src="/icons/store.svg"
                    alt="Store Icon"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-bold text-[#FCD34D] text-sm tracking-[0.7px] uppercase">
                  OUTLET YOGYAKARTA
                </span>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5">
                  <div className="relative w-[11px] h-[15px] shrink-0 mt-0.5">
                    <Image
                      src="/icons/map-pin.svg"
                      alt="Pin Icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-xs text-white leading-[18px]">
                      {businessInfo.outletName}
                    </p>
                    <p className="text-[#FEE2E2] text-xs leading-[18px]">
                      {businessInfo.address}
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Col 3 */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className="relative w-[15px] h-[15px] shrink-0">
                  <Image
                    src="/icons/clock.svg"
                    alt="Clock Icon"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-bold text-[#FCD34D] text-sm tracking-[0.7px] uppercase">
                  JAM OPERASIONAL
                </span>
              </div>
              <div className="space-y-2.5">
                <div className="bg-black/20 border border-white/10 rounded-[4px] p-2.5">
                  <p className="font-semibold text-xs text-white leading-[18px]">
                    Setiap Hari
                  </p>
                  <p className="text-[#FEE2E2] text-xs leading-[18px]">
                    {businessInfo.hours}
                  </p>
                </div>
              </div>
            </div>

            {/* Col 4 */}
            <div className="bg-black/25 border border-white/15 rounded-[8px] p-4 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="relative w-[14px] h-[15px] shrink-0">
                    <Image
                      src="/icons/social.svg"
                      alt="Social Icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="font-bold text-[#FCD34D] text-sm tracking-[0.7px] uppercase">
                    MEDIA SOSIAL & ORDER
                  </span>
                </div>
                <p className="text-[#FEE2E2] text-xs leading-[19.5px] mb-3">
                  Terhubung langsung dengan tim kami dan pantau info promo terbaru:
                </p>
              </div>

              <div className="space-y-2">
                <a
                  href="https://wa.me/6281234567890?text=Halo%20Cireng%20Cangkeling,%20saya%20ingin%20pesan%20paket%20frozen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 border border-white/15 rounded-[2px] px-2.5 py-1.5 flex items-center gap-2.5 transition text-white font-bold text-xs tracking-[0.48px]"
                >
                  <div className="relative w-[15px] h-[15px] shrink-0">
                    <Image src="/icons/wa.svg" alt="WA" fill className="object-contain" />
                  </div>
                  <span>WhatsApp Hotline</span>
                </a>
                <a
                  href="https://instagram.com/cirengcangkeling"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 border border-white/15 rounded-[2px] px-2.5 py-1.5 flex items-center gap-2.5 transition text-white font-bold text-xs tracking-[0.48px]"
                >
                  <div className="relative w-[15px] h-[14px] shrink-0">
                    <Image src="/icons/ig.svg" alt="IG" fill className="object-contain" />
                  </div>
                  <span>Instagram @cirengcangkeling</span>
                </a>
                <a
                  href="https://tiktok.com/@cirengcangkeling"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 border border-white/15 rounded-[2px] px-2.5 py-1.5 flex items-center gap-2.5 transition text-white font-bold text-xs tracking-[0.48px]"
                >
                  <div className="relative w-[15px] h-[12px] shrink-0">
                    <Image src="/icons/tiktok.svg" alt="TikTok" fill className="object-contain" />
                  </div>
                  <span>TikTok @cirengcangkeling</span>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p className="text-[rgba(254,202,202,0.9)] text-xs text-center sm:text-left">
              © 2024 Cireng Cangkeling Nusantara. Seluruh hak cipta dilindungi undang-undang.
            </p>
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.6px] text-[rgba(254,202,202,0.9)]">
              <span className="hover:text-white cursor-pointer transition">Kebijakan Privasi</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer transition">Syarat Layanan</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer transition">Kemitraan</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </PageTransition>
  );
}
