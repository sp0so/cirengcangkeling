'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import WordRevealHeading from './components/WordRevealHeading';
import MotionCard from './components/MotionCard';
import PageTransition from './components/PageTransition';

export default function HomePelanggan() {
  return (
    <PageTransition className="min-h-screen bg-[#F8F9FF] text-[#0B1C30] selection:bg-[#A24F9D] selection:text-white">
      {/* 1. HEADER (Node 82:1197) */}
      <header className="sticky top-0 z-40 bg-[#A24F9D] border-b border-[#5B3765] shadow-md transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between gap-4">
          {/* Logo & Brand Identity (Node 82:1200 / Node 111:3) */}
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
                PELOPOR CIRENG RENYAH GURIH
              </span>
            </div>
          </Link>

          {/* Navigation Links (Node 82:1210) */}
          <div className="flex items-center gap-2">
            <nav className="bg-black/20 border border-white/10 rounded-[4px] p-1 flex items-center gap-1">
              {/* Home (Active) */}
              <Link
                href="/"
                className="bg-white text-[#7F1D1D] font-bold text-sm px-4 py-2 rounded-[2px] shadow-xs transition"
              >
                Home
              </Link>
              {/* Menu Siap Makan */}
              <Link
                href="/menu-siap-makan"
                className="text-white/90 hover:text-white font-bold text-xs px-3 sm:px-4 py-2 rounded-[2px] tracking-[0.48px] transition"
              >
                Menu Siap Makan
              </Link>
              {/* Menu Frozen */}
              <Link
                href="/menu-frozen"
                className="text-white/90 hover:text-white font-bold text-xs px-3 sm:px-4 py-2 rounded-[2px] tracking-[0.48px] transition"
              >
                Menu Frozen
              </Link>
              {/* Cara Pesan (Node 79:2) */}
              <Link
                href="/pesan"
                className="text-white/90 hover:text-white font-bold text-xs px-3 sm:px-4 py-2 rounded-[2px] tracking-[0.48px] transition"
              >
                Cara Pesan
              </Link>
            </nav>

            {/* Portal Login Shortcut (Node 140:251) */}
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

      {/* 2. HERO SECTION (Node 82:1000) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#5B3765] via-[#A24F9D] to-[#5B3765] text-white py-14 sm:py-20 px-4 sm:px-8 lg:px-12">
        {/* Subtle Radial Dot Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255, 220, 195, 1) 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          {/* Left Column (Span 7) - Node 82:1024 */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Pill Badge (Node 82:1026) */}
            <div className="backdrop-blur-[4px] bg-[rgba(251,191,36,0.2)] border border-[rgba(252,211,77,0.3)] rounded-[12px] shadow-xs px-3.5 py-1.5 inline-flex items-center gap-2 mb-4 self-start">
              <div className="relative w-[14px] h-[14px] shrink-0">
                <Image
                  src="/icons/sparkle.svg"
                  alt="Badge Icon"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-[#FDE68A] text-xs tracking-[0.48px]">
                100% Halal & Gurih Otentik • Digoreng Dadakan Fresh
              </span>
            </div>

            {/* Heading 1 (Node 82:1031) - Animated Word-by-Word with GSAP */}
            <div className="mb-4">
              <WordRevealHeading
                text="NIKMATNYA"
                as="h1"
                className="font-black text-white text-3xl sm:text-4xl lg:text-[44px] tracking-[-1.1px] leading-[1.1]"
              />
              <WordRevealHeading
                text="CIRENG CANGKELING!"
                as="div"
                delay={0.15}
                className="font-black text-[#FCD34D] text-3xl sm:text-4xl lg:text-[44px] tracking-[-1.1px] leading-[1.1] drop-shadow-sm"
              />
            </div>

            {/* Description (Node 82:1036) */}
            <p className="text-[#FEE2E2] text-sm sm:text-base leading-[26px] max-w-xl mb-6 font-normal">
              Teman ngemil terbaik dengan berbagai pilihan rasa yang bikin ketagihan. Renyah garing di luar, kenyal lembut di dalam berpadu cocolan bumbu rujak legit khas Sunda.
            </p>

            {/* Action Buttons (Node 82:1038) */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Link
                href="/menu-siap-makan"
                className="bg-[#FBBF24] hover:bg-[#F59E0B] text-[#5B3765] font-black text-sm px-6 py-3.5 rounded-[4px] tracking-[0.28px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] transition-all active:scale-[0.98] inline-flex items-center justify-center"
              >
                LIHAT MENU SIAP MAKAN
              </Link>
              <Link
                href="/menu-frozen"
                className="backdrop-blur-[4px] bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-sm px-6 py-3.5 rounded-[4px] tracking-[0.28px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] transition-all active:scale-[0.98] inline-flex items-center justify-center"
              >
                LIHAT MENU FROZEN
              </Link>
            </div>

            {/* Trust Badges (Node 82:1050) */}
            <div className="pt-4 border-t border-white/15 w-full flex flex-wrap items-center gap-6 sm:gap-8">
              {/* Badge 1 */}
              <div className="flex items-center gap-2">
                <div className="relative w-[16px] h-[16px] shrink-0">
                  <Image
                    src="/icons/rempah.svg"
                    alt="Rempah"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-black text-[#FEF3C7] text-[10px] tracking-[0.6px] uppercase">
                  Bumbu Rempah Alami
                </span>
              </div>

              {/* Badge 2 */}
              <div className="flex items-center gap-2">
                <div className="relative w-[16px] h-[12px] shrink-0">
                  <Image
                    src="/icons/shipping.svg"
                    alt="Shipping"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-black text-[#FEF3C7] text-[10px] tracking-[0.6px] uppercase">
                  Bisa Kirim Luar Kota
                </span>
              </div>

              {/* Badge 3 */}
              <div className="flex items-center gap-2">
                <div className="relative w-[15px] h-[15px] shrink-0">
                  <Image
                    src="/icons/star.svg"
                    alt="Rating"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-black text-[#FEF3C7] text-[10px] tracking-[0.6px] uppercase">
                  4.9/5 Rating Pelanggan
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (Span 5) - Signature Dish Card (Node 82:1003) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <MotionCard
              delay={0.2}
              hoverY={-8}
              hoverScaleValue={1.025}
              className="w-full max-w-[477px] aspect-square rounded-[16px] border-4 border-white/20 bg-black/40 overflow-hidden shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] relative group cursor-pointer"
            >
              {/* Dish Photo */}
              <Image
                src="/hero-cireng.png"
                alt="Cireng Bumbu Rujak Cangkeling"
                fill
                sizes="(max-width: 768px) 100vw, 477px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />

              {/* Bottom Gradient Overlay (Node 82:1006) */}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(69,2,7,0.92)] via-[rgba(69,2,7,0.25)] to-transparent flex flex-col justify-end p-6 sm:p-7">
                <span className="font-bold text-[#FCD34D] text-[10px] tracking-[0.5px] uppercase mb-1">
                  SIGNATURE DISH
                </span>
                <h2 className="font-bold text-white text-xl sm:text-[22px] leading-tight mb-1">
                  Cireng Bumbu Rujak
                </h2>
                <p className="text-[#FEE2E2] text-xs leading-[18px]">
                  Disajikan hangat dengan kuah rujak yang otentik.
                </p>
              </div>
            </MotionCard>
          </div>
        </div>
      </section>

      {/* 3. ABOUT SECTION (Node 82:1063) */}
      <section className="bg-gradient-to-b from-[#FFF7ED] to-[#FEF2F2] border-t-4 border-[#A24F9D] py-14 sm:py-20 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column (Span 5) - About Photo Card (Node 82:1065) */}
          <div className="lg:col-span-5 flex justify-center">
            <MotionCard
              delay={0.1}
              hoverY={-6}
              hoverScaleValue={1.02}
              className="w-full max-w-[477px] h-[320px] sm:h-[358px] rounded-[16px] border-2 border-[rgba(127,29,29,0.2)] bg-[#E6EEFF] overflow-hidden shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] relative group cursor-pointer"
            >
              <Image
                src="/about-cireng.png"
                alt="Tentang Cireng Cangkeling"
                fill
                sizes="(max-width: 768px) 100vw, 477px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </MotionCard>
          </div>

          {/* Right Column (Span 7) - About Details & Value Grid (Node 82:1078) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Tag Badge (Node 82:1079) */}
            <div className="bg-[rgba(127,29,29,0.1)] rounded-[2px] px-2.5 py-1 inline-flex items-center gap-2 mb-3 self-start">
              <div className="relative w-[15px] h-[11px] shrink-0">
                <Image
                  src="/icons/story.svg"
                  alt="Story Icon"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-[#A24F9D] text-xs tracking-[0.6px] uppercase">
                KISAH RASA & KUALITAS
              </span>
            </div>

            {/* Heading 2 (Node 82:1082) - Animated Word-by-Word with GSAP */}
            <WordRevealHeading
              text="Tentang Cireng Cangkeling"
              as="h2"
              className="font-black text-[#5B3765] text-2xl sm:text-3xl lg:text-[32px] tracking-[-0.32px] mb-4"
            />

            {/* Story Paragraph (Node 82:1084) */}
            <p className="text-[#44403C] text-sm sm:text-base leading-[26px] mb-8 max-w-2xl font-normal">
              Cireng Cangkeling menghadirkan kelezatan camilan khas Nusantara yang diracik khusus untuk memanjakan lidah para pecinta gorengan renyah. Dengan karakteristik unik tekstur renyah di luar dan kenyal lembut di dalam, setiap gigitan diperkaya bumbu rempah pilihan gurih, dan pedas menggigit. Tersedia dalam sajian siap santap hangat dari dapur kami maupun kemasan frozen higienis kedap udara yang aman dikirim ke berbagai kota di Indonesia.
            </p>

            {/* 3 Value Cards Grid (Node 82:1086) - Animated with Motion */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              {/* Card 1: Olahan Alami (Node 82:1087) */}
              <MotionCard
                delay={0.1}
                hoverY={-6}
                hoverScaleValue={1.03}
                className="bg-white border border-[rgba(127,29,29,0.15)] rounded-[8px] p-4 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col cursor-default"
              >
                <div className="bg-[#A24F9D] rounded-[4px] w-10 h-10 flex items-center justify-center mb-3 shrink-0">
                  <div className="relative w-[16px] h-[16px]">
                    <Image
                      src="/icons/natural.svg"
                      alt="Olahan Alami"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <h3 className="font-bold text-[#A24F9D] text-[18px] leading-[24px] mb-1">
                  Olahan Alami
                </h3>
                <p className="text-[#57534E] text-xs leading-[18px]">
                  Bebas bahan pengawet sintetik, memakai bahan baku tapioka bermutu tinggi.
                </p>
              </MotionCard>

              {/* Card 2: Bumbu Rujak Legit (Node 82:1097) */}
              <MotionCard
                delay={0.18}
                hoverY={-6}
                hoverScaleValue={1.03}
                className="bg-white border border-[rgba(127,29,29,0.15)] rounded-[8px] p-4 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col cursor-default"
              >
                <div className="bg-[#904D00] rounded-[4px] w-10 h-10 flex items-center justify-center mb-3 shrink-0">
                  <div className="relative w-[17px] h-[18px]">
                    <Image
                      src="/icons/chili.svg"
                      alt="Bumbu Rujak"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <h3 className="font-bold text-[#904D00] text-[18px] leading-[24px] mb-1">
                  Bumbu Rujak Legit
                </h3>
                <p className="text-[#57534E] text-xs leading-[18px]">
                  Diracik dari gula aren asli pilihan serta sambal Bangkok pedas manis istimewa.
                </p>
              </MotionCard>

              {/* Card 3: Kemasan Vakum (Node 82:1107) */}
              <MotionCard
                delay={0.26}
                hoverY={-6}
                hoverScaleValue={1.03}
                className="bg-white border border-[rgba(127,29,29,0.15)] rounded-[8px] p-4 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col cursor-default"
              >
                <div className="bg-[#A24F9D] rounded-[4px] w-10 h-10 flex items-center justify-center mb-3 shrink-0">
                  <div className="relative w-[18px] h-[18px]">
                    <Image
                      src="/icons/vacuum.svg"
                      alt="Kemasan Vakum"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <h3 className="font-bold text-[#A24F9D] text-[18px] leading-[24px] mb-1">
                  Kemasan Vakum
                </h3>
                <p className="text-[#57534E] text-xs leading-[18px]">
                  Segel kedap udara higienis, menjaga cita rasa segar tahan kirim antar kota.
                </p>
              </MotionCard>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOOTER (Node 82:1117) */}
      <footer className="bg-gradient-to-b from-[#A24F9D] to-[#5B3765] border-t-4 border-[#F9EB10] text-white shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] pt-12 pb-8 px-4 sm:px-8 lg:px-12 mt-auto">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content: 4 Columns (Node 82:1120) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {/* Col 1: Brand Info (Node 82:1121) */}
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

            {/* Col 2: Gerai Yogyakarta (Node 82:1134) */}
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
                  GERAI YOGYAKARTA
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
                      Outlet Kaliurang KM 5.2
                    </p>
                    <p className="text-[#FEE2E2] text-xs leading-[18px]">
                      Jl. Kaliurang KM 5.2 No. 12, Sleman, D.I. Yogyakarta
                    </p>
                  </div>
                </li>
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
                      Outlet Kaliurang KM 9.2
                    </p>
                    <p className="text-[#FEE2E2] text-xs leading-[18px]">
                      Jl. Kaliurang KM 9.2, Sinduharjo, Ngaglik, Sleman
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Col 3: Jam Operasional (Node 82:1150) */}
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
                    Senin - Jumat
                  </p>
                  <p className="text-[#FEE2E2] text-xs leading-[18px]">
                    10.00 - 21.30 WIB
                  </p>
                </div>
                <div className="bg-black/20 border border-white/10 rounded-[4px] p-2.5">
                  <p className="font-semibold text-xs text-white leading-[18px]">
                    Sabtu - Minggu
                  </p>
                  <p className="text-[#FEE2E2] text-xs leading-[18px]">
                    09.00 - 22.00 WIB
                  </p>
                </div>
              </div>
            </div>

            {/* Col 4: Media Sosial & Order (Node 82:1166) */}
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
                  href="https://wa.me/6281234567890?text=Halo%20Cireng%20Cangkeling,%20saya%20ingin%20pesan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 border border-white/15 rounded-[2px] px-2.5 py-1.5 flex items-center gap-2.5 transition text-white font-bold text-xs tracking-[0.48px]"
                >
                  <div className="relative w-[15px] h-[15px] shrink-0">
                    <Image
                      src="/icons/wa.svg"
                      alt="WA"
                      fill
                      className="object-contain"
                    />
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
                    <Image
                      src="/icons/ig.svg"
                      alt="IG"
                      fill
                      className="object-contain"
                    />
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
                    <Image
                      src="/icons/tiktok.svg"
                      alt="TikTok"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span>TikTok @cirengcangkeling</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Legal (Node 82:1187) */}
          <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p className="text-[rgba(254,202,202,0.9)] text-xs text-center sm:text-left">
              © 2024 Cireng Cangkeling Nusantara. Seluruh hak cipta dilindungi undang-undang.
            </p>
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.6px] text-[rgba(254,202,202,0.9)]">
              <span className="hover:text-white cursor-pointer transition">
                Kebijakan Privasi
              </span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer transition">
                Syarat Layanan
              </span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer transition">
                Kemitraan
              </span>
            </div>
          </div>
        </div>
      </footer>
    </PageTransition>
  );
}
