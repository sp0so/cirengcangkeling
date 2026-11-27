'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { useApp } from '../lib/context';
import PageTransition from '../components/PageTransition';
import WordRevealHeading from '../components/WordRevealHeading';
import { businessInfo } from '../lib/businessInfo';
import {
  IconSnowflake,
  IconPepper,
  IconFlame,
  IconLightbulb,
  IconCheck,
  IconWhatsApp,
} from '../components/Icons';

export default function MenuSiapMakanPage() {
  const { addToCart, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'tanpa-isi' | 'isi' | 'camilan'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Menu items list from Figma Node 82:1218
  const menuCategories = [
    {
      id: 'tanpa-isi',
      number: '01',
      title: 'CIRENG TANPA ISI',
      items: [
        {
          id: 'mini-single',
          name: 'Cireng Rujak Mini (Single)',
          desc: 'Bite-sized renyah di luar kenyal di dalam, disajikan hangat lengkap dengan cocolan sambal rujak legit.',
          portion: '1 Porsi (Isi 6 pcs)',
          price: 6000,
          badge: 'FAVORIT',
          spicy: 'Pedas Sedang',
        },
        {
          id: 'mini-double',
          name: 'Cireng Rujak Mini (Double)',
          desc: 'Porsi dobel puas untuk teman kumpul, disajikan segar dengan sambal rujak ekstra pedas manis khas Jogja.',
          portion: '1 Porsi (Isi 12 pcs)',
          price: 11000,
          badge: 'HEMAT',
          spicy: 'Pedas Sedang',
        },
        {
          id: 'rujak-reguler',
          name: 'Cireng Sambal Rujak Reguler',
          desc: 'Ukuran reguler mantap dengan tekstur luaran garing mekar dan sambal rujak kental beraroma terasi asam Jawa.',
          portion: '1 Porsi (Isi 5 pcs)',
          price: 7000,
          badge: 'SIGNATURE',
          spicy: 'Pedas Sedang',
        },
        {
          id: 'bangkok-reguler',
          name: 'Cireng Sambal Bangkok Reguler',
          desc: 'Dipadukan dengan saus sambal Bangkok asam manis segar bertabur biji wijen dan cabai merah cincang.',
          portion: '1 Porsi (Isi 5 pcs)',
          price: 7500,
          badge: 'SEGAR',
          spicy: 'Manis Gurih Pedas',
        },
      ],
    },
    {
      id: 'isi',
      number: '02',
      title: 'CIRENG ISI',
      items: [
        {
          id: 'isi-ayam',
          name: 'Cireng Isi Ayam Suwir',
          desc: 'Pilihan rasa: Original / Pedas / Cabe Ijo. Daging ayam suwir empuk melimpah racikan rempah gurih.',
          portion: '1 Pcs (Jumbo)',
          price: 3500,
          badge: 'BESTSELLER',
          spicy: 'Level 1 - 3',
        },
        {
          id: 'isi-tetelan',
          name: 'Cireng Isi Tetelan Sapi',
          desc: 'Pilihan rasa: Original / Pedas. Tetelan sapi kenyal berbumbu gurih kaldu pekat yang menggugah selera.',
          portion: '1 Pcs (Jumbo)',
          price: 4000,
          badge: 'GURIH NIKMAT',
          spicy: 'Pedas Sedang',
        },
        {
          id: 'isi-ati-ampela',
          name: 'Cireng Isi Ati Ampela',
          desc: 'Pilihan rasa: Original / Pedas. Olahan ati dan ampela empuk tanpa amis, dibumbui bawang dan cabai merah.',
          portion: '1 Pcs (Jumbo)',
          price: 3500,
          badge: 'TRADISIONAL',
          spicy: 'Pedas Sedang',
        },
        {
          id: 'isi-ikan',
          name: 'Cireng Isi Daging Ikan',
          desc: 'Pilihan rasa: Original / Pedas. Daging ikan olahan segar gurih khas pesisir yang harum rempah kemangi.',
          portion: '1 Pcs (Jumbo)',
          price: 3500,
          badge: 'AROMATIK',
          spicy: 'Wangi Kemangi',
        },
        {
          id: 'isi-cumi',
          name: 'Cireng Isi Cumi Pedas',
          desc: 'Potongan cumi segar kenyal dimasak oseng cabai rawit pedas menggelegar dan wangi daun jeruk.',
          portion: '1 Pcs (Jumbo)',
          price: 4500,
          badge: 'EXTRA PEDAS',
          spicy: 'Super Pedas',
        },
        {
          id: 'isi-beef-bulgogi',
          name: 'Cireng Isi Beef Bulgogi',
          desc: 'Daging sapi marinasi saus bulgogi manis gurih oriental beraroma minyak wijen dan lada hitam.',
          portion: '1 Pcs (Jumbo)',
          price: 4500,
          badge: 'SPESIAL',
          spicy: 'Manis Gurih',
        },
        {
          id: 'isi-keju',
          name: 'Cireng Isi Keju Melted',
          desc: 'Keju premium meleleh lumer sempurna di dalam balutan cireng renyah, gurih asin nikmat.',
          portion: '1 Pcs (Jumbo)',
          price: 4000,
          badge: 'LUMER MELELEH',
          spicy: 'Gurih Keju',
        },
      ],
    },
    {
      id: 'camilan',
      number: '03',
      title: 'CAMILAN GURIH & MENU PENDAMPING',
      items: [
        {
          id: 'tahu-aci',
          name: 'Tahu Aci Pletok',
          desc: 'Tahu kuning gurih dengan isian adonan aci berbumbu daun kucai yang digoreng garing renyah.',
          portion: '1 Porsi (Isi 8 pcs)',
          price: 8000,
          badge: 'RENYAH',
          spicy: 'Gurih Gurih Nyoi',
        },
        {
          id: 'pentol-kudus',
          name: 'Pentol Kudus',
          desc: 'Pentol daging gurih bertekstur mantap khas Kudus, disajikan hangat dengan bumbu cocolan sedap.',
          portion: '1 Porsi (Isi 10 pcs)',
          price: 10000,
          badge: 'DAGING ASLI',
          spicy: 'Khas Kudus',
        },
        {
          id: 'cilok-sapi',
          name: 'Cilok Sapi',
          desc: 'Cilok kenyal padat isi daging sapi giling lezat dengan aroma bawang putih dan lada yang kuat.',
          portion: '1 Porsi (Isi 10 pcs)',
          price: 8000,
          badge: 'KENYAL',
          spicy: 'Bumbu Kacang/Saus',
        },
        {
          id: 'bakso-goreng',
          name: 'Bakso Goreng Jumbo',
          desc: 'Bakso goreng ukuran besar, garing renyah di luar, empuk berongga di dalam dengan rasa daging ayam udang pekat.',
          portion: '1 Pcs Jumbo',
          price: 5000,
          badge: 'CRISPY',
          spicy: 'Gurih',
        },
        {
          id: 'dimsum-s',
          name: 'Dimsum Ayam S (Porsi Kecil)',
          desc: 'Siomay ayam kukus lembut juicy daging melimpah, disajikan bersama saus sambal dimsum pedas asam manis.',
          portion: 'Isi 4 pcs',
          price: 12000,
          badge: 'KUKUS JUICY',
          spicy: 'Saus Dimsum',
        },
        {
          id: 'dimsum-m',
          name: 'Dimsum Ayam M (Porsi Sedang)',
          desc: 'Porsi sedang pas untuk santap santai bersama teman, tekstur kulit tipis dengan isian ayam padat gurih.',
          portion: 'Isi 6 pcs',
          price: 17500,
          badge: 'HEMAT',
          spicy: 'Saus Dimsum',
        },
        {
          id: 'dimsum-l',
          name: 'Dimsum Ayam L (Porsi Besar)',
          desc: 'Porsi besar puas untuk keluarga atau traktiran, lengkap dengan bumbu cocolan ekstra.',
          portion: 'Isi 10 pcs',
          price: 28000,
          badge: 'PUAS KELUARGA',
          spicy: 'Saus Dimsum',
        },
        {
          id: 'combro',
          name: 'Combro Pedas Kemangi',
          desc: 'Parutan singkong goreng garing dengan isian oncom pedas khas Sunda otentik yang harum kemangi.',
          portion: '1 Pcs',
          price: 3000,
          badge: 'PEDAS GURIH',
          spicy: 'Pedas Kemangi',
        },
        {
          id: 'kentang-goreng',
          name: 'Kentang Goreng (French Fries)',
          desc: 'French fries renyah keemasan dibumbui garam gurih, disajikan segar selagi panas.',
          portion: '1 Porsi',
          price: 8000,
          badge: 'KRISPI',
          spicy: 'Saus Tomat / Sambal',
        },
      ],
    },
  ];

  const filteredCategories = useMemo(() => {
    return menuCategories
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
    const text = `Halo Cireng Cangkeling! Saya ingin memesan menu siap makan:\n• ${itemName} (Rp ${price.toLocaleString('id-ID')})\nMohon informasi pemesanannya ya, terima kasih!`;
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
                  className="bg-white text-[#7F1D1D] font-bold text-sm px-4 py-2 rounded-[2px] shadow-xs transition"
                >
                  Menu Siap Makan
                </Link>
                <Link
                  href="/menu-frozen"
                  className="text-white/90 hover:text-white font-bold text-xs px-3 sm:px-4 py-2 rounded-[2px] tracking-[0.48px] transition"
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

        {/* 2. TOP DECORATIVE HERO HEADER (Node 82:1237) */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#5B3765] via-[#7E3778] to-[#5B3765] text-white py-12 sm:py-16 px-4 sm:px-8 lg:px-12">
          {/* Ambient Glows */}
          <div className="absolute -top-24 right-0 w-96 h-96 bg-[#EC4899]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-10 -left-20 w-80 h-80 bg-[#581C87]/40 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              {/* Breadcrumb / Badge Pill */}
              <div className="backdrop-blur-sm bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full inline-flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
                <span className="font-bold text-[#FCD34D] text-xs tracking-wider uppercase">
                  KITCHEN FRESH • DIGORENG DADAKAN PANAS
                </span>
              </div>

              <WordRevealHeading
                text="MENU SIAP MAKAN CIRENG CANGKELING"
                as="h1"
                className="text-3xl sm:text-4xl lg:text-5xl font-black font-brand tracking-tight leading-tight mb-3 text-white"
              />

              <p className="text-[#FEE2E2] text-sm sm:text-base leading-relaxed font-normal">
                Sajian aneka cireng renyah gurih hangat langsung dari wajan penggorengan kami. Dilengkapi bumbu rujak legit pedas manis khas Sunda atau sambal Bangkok istimewa.
              </p>
            </div>

            {/* Quick Switch Banner to Frozen (Node 82:1256) */}
            <Link
              href="/menu-frozen"
              className="w-full lg:w-96 bg-black/25 hover:bg-black/35 border border-white/20 hover:border-[#FCD34D]/60 rounded-xl p-4 shadow-xl backdrop-blur-md transition-all group flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-lg bg-[#FBBF24]/20 border border-[#FCD34D]/40 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                  <IconSnowflake size={22} className="text-[#FCD34D]" />
                </div>
                <div>
                  <span className="block text-[11px] font-black text-[#FCD34D] uppercase tracking-wider">
                    Mau Simpan Buat Nanti?
                  </span>
                  <span className="block text-sm font-bold text-white group-hover:text-[#FCD34D] transition-colors">
                    Lihat Menu Frozen Pack →
                  </span>
                </div>
              </div>
              <span className="text-white/60 group-hover:translate-x-1 transition-transform text-lg">
                →
              </span>
            </Link>
          </div>
        </section>

      {/* 3. INTERACTIVE FILTER & JUMP NAVIGATION BAR (Node 82:1222) */}
      <section className="sticky top-20 z-30 bg-[#FFF7ED]/95 backdrop-blur-md border-b border-[#CBD5E1]/70 shadow-xs py-3 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-[4px] text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === 'all'
                  ? 'bg-[#5B3765] text-white shadow-xs'
                  : 'bg-white text-[#5B3765] border border-[#CBD5E1] hover:border-[#5B3765]'
              }`}
            >
              Semua Kategori (20)
            </button>
            <button
              onClick={() => setActiveTab('tanpa-isi')}
              className={`px-3.5 py-1.5 rounded-[4px] text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === 'tanpa-isi'
                  ? 'bg-[#5B3765] text-white shadow-xs'
                  : 'bg-white text-[#5B3765] border border-[#CBD5E1] hover:border-[#5B3765]'
              }`}
            >
              01 Tanpa Isi (4)
            </button>
            <button
              onClick={() => setActiveTab('isi')}
              className={`px-3.5 py-1.5 rounded-[4px] text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === 'isi'
                  ? 'bg-[#5B3765] text-white shadow-xs'
                  : 'bg-white text-[#5B3765] border border-[#CBD5E1] hover:border-[#5B3765]'
              }`}
            >
              02 Cireng Isi Daging (7)
            </button>
            <button
              onClick={() => setActiveTab('camilan')}
              className={`px-3.5 py-1.5 rounded-[4px] text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === 'camilan'
                  ? 'bg-[#5B3765] text-white shadow-xs'
                  : 'bg-white text-[#5B3765] border border-[#CBD5E1] hover:border-[#5B3765]'
              }`}
            >
              03 Camilan & Dimsum (9)
            </button>
          </div>

          {/* Quick Search */}
          <div className="w-full sm:w-64 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari menu cireng..."
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

      {/* 4. PRODUCT CATEGORIES CATALOG (Node 82:1269) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10 flex-1 w-full space-y-12">
        {filteredCategories.map((cat) => (
          <section key={cat.id} id={cat.id} className="scroll-mt-36">
            {/* Category Header Bar (Node 89:2360) */}
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
                {cat.items.length} Menu
              </span>
            </div>

            {/* Menu Items Table / Cards */}
            <div className="bg-white rounded-lg shadow-sm border border-[#CBD5E1]/60 overflow-hidden divide-y divide-[#CBD5E1]/50">
              {cat.items.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(idx * 0.04, 0.3) }}
                  className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#FFFDF9] transition-colors"
                >
                  {/* Left Info */}
                  <div className="flex-1 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <h3 className="font-bold text-base sm:text-lg text-[#0F172A]">
                        {item.name}
                      </h3>
                      <span className="bg-[#FEF3C7] text-[#92400E] text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                        {item.badge}
                      </span>
                      <span className="text-[11px] text-[#059669] font-semibold bg-[#ECFDF5] px-2 py-0.5 rounded inline-flex items-center gap-1">
                        <IconCheck size={12} className="text-[#059669]" />
                        <span>{item.portion}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#64748B]">
                      <span className="inline-flex items-center gap-1">
                        <IconPepper size={13} className="text-[#E11D48]" />
                        <span>{item.spicy}</span>
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1">
                        <IconFlame size={13} className="text-[#EA580C]" />
                        <span>Digoreng Panas Dadakan</span>
                      </span>
                    </div>
                  </div>

                  {/* Right Price & Order Action */}
                  <div className="flex items-center md:flex-col md:items-end justify-between md:justify-center gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100">
                    <div className="text-left md:text-right">
                      <span className="block text-xs text-gray-400 font-semibold uppercase">
                        Harga
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
                        <span>Pesan WA</span>
                      </button>

                      <Link
                        href="/pesan"
                        className="bg-[#5B3765] hover:bg-[#482852] text-white px-3.5 py-2 rounded text-xs font-bold shadow-xs hover:shadow transition active:scale-95"
                      >
                        Pilih Platform
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        ))}

        {/* 5. SECTION - IMPORTANT ORDERING NOTES (Node 82:1705) */}
        <section className="bg-[#FEF3C7] border border-[#FCD34D] rounded-xl p-6 sm:p-7 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#F59E0B] text-white flex items-center justify-center shrink-0 shadow-sm">
              <IconLightbulb size={22} className="text-white" />
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg text-[#92400E] mb-2 uppercase tracking-wide">
                Catatan Penting Pemesanan Siap Makan:
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs sm:text-sm text-[#78350F] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span><strong>Digoreng Dadakan:</strong> Setiap porsi baru digoreng saat pesanan masuk agar kerenyahan luar & kenyal dalam tetap maksimal.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span><strong>Konsumsi Terbaik:</strong> Santap dalam waktu 30 menit selagi hangat bersama cocolan sambal rujak khas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span><strong>Kemasan Khusus:</strong> Menggunakan kotak berpori sirkulasi udara agar gorengan tidak beruap atau lembek di perjalanan.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 6. CALL TO ACTION SECTION (Node 82:1720) */}
        <section className="bg-gradient-to-r from-[#5B3765] via-[#A24F9D] to-[#5B3765] text-white rounded-2xl p-8 sm:p-10 text-center shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="bg-white/20 text-[#FCD34D] text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider inline-block">
              Siap Menikmati Renyahnya Cireng?
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-brand">
              Pesan Sekarang & Dapatkan Cireng Hangat!
            </h2>
            <p className="text-sm text-[#FEE2E2] leading-relaxed">
              Tersedia di OUTLET Cireng Cangkeling atau dikirim ke lokasi Anda melalui GoFood, GrabFood, ShopeeFood, dan hotline WhatsApp resmi.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <a
                href="https://wa.me/6281234567890?text=Halo%20Cireng%20Cangkeling,%20saya%20ingin%20pesan%20menu%20siap%20makan"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black text-sm px-6 py-3.5 rounded shadow-lg transition active:scale-95 inline-flex items-center gap-2"
              >
                <span>WhatsApp Hotline</span>
                <span>→</span>
              </a>
              <Link
                href="/pesan"
                className="bg-[#FCD34D] hover:bg-[#FBBF24] text-[#5B3765] font-black text-sm px-6 py-3.5 rounded shadow-lg transition active:scale-95"
              >
                Pilih Platform Pemesanan
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* 7. BRAND FOOTER (Node 82:1781) */}
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
                  href="https://wa.me/6281234567890?text=Halo%20Cireng%20Cangkeling,%20saya%20ingin%20pesan%20menu%20siap%20makan"
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
