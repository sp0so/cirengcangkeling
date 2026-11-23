'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function InformasiPemesananPage() {
  return (
    <div className="min-h-screen bg-[#FFF7ED] text-[#0B1C30] flex flex-col font-sans selection:bg-[#A24F9D] selection:text-white">
      {/* 1. BRAND HEADER */}
      <header className="sticky top-0 z-40 bg-[#A24F9D] border-b border-[#5B3765] shadow-md transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-[41px] h-[40px] rounded-[11px] overflow-hidden shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-200">
              <Image
                src="/logo-cireng-figma.png"
                alt="Logo Cireng Cangkeling"
                fill
                sizes="41px"
                className="object-cover rounded-[11px]"
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
                className="text-white/90 hover:text-white font-bold text-xs px-3 sm:px-4 py-2 rounded-[2px] tracking-[0.48px] transition"
              >
                Menu Frozen
              </Link>
              <Link
                href="/pesan"
                className="bg-white text-[#7F1D1D] font-bold text-sm px-4 py-2 rounded-[2px] shadow-xs transition"
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

      {/* 2. SECTION - HUB AMBIENT HEADER (Node 79:5) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#653763] to-[#5B3765] text-white py-12 sm:py-16 px-4 sm:px-8 lg:px-12 border-b border-black/20">
        {/* Ambient Blur Bubbles */}
        <div className="absolute -top-20 right-0 w-96 h-96 bg-[#793775] rounded-full blur-3xl pointer-events-none opacity-80" />
        <div className="absolute top-10 -left-20 w-80 h-80 bg-[#783274] rounded-full blur-2xl pointer-events-none opacity-70" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-6">
          {/* Breadcrumb Return Action (Node 79:9) */}
          <Link
            href="/menu-siap-makan"
            className="backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-lg text-xs font-bold text-white inline-flex items-center gap-2 self-start transition active:scale-95"
          >
            <span>←</span>
            <span>Kembali ke Menu & Price List</span>
          </Link>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black font-brand tracking-[-1.1px] leading-tight uppercase mb-3">
                MAU PESAN DI MANA?
              </h1>
              <p className="text-[#FFB3AD] text-sm sm:text-base leading-relaxed font-normal">
                Pilih platform favoritmu untuk menikmati kegurihan Cireng Cangkeling hangat siap santap atau paket frozen food kirim ke seluruh kota!
              </p>
            </div>

            {/* Quick Status Tag (Node 79:24) */}
            <div className="backdrop-blur-md bg-[#9E6899]/80 border border-white/20 rounded-xl p-4 shadow-lg flex items-center gap-4 shrink-0">
              <div className="w-12 h-12 rounded-lg bg-[#5B3765] flex items-center justify-center text-2xl shrink-0">
                🍳
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#34D399] animate-pulse" />
                  <span className="font-bold text-[#FFDCC3] text-xs uppercase tracking-wider">
                    KITCHEN & DISPATCH AKTIF
                  </span>
                </div>
                <p className="text-xs text-white/90 font-medium">
                  Buka Hari Ini: 10.00 – 21.30 WIB
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION - INTERACTIVE PLATFORM SELECTION GRID (Node 79:37) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12 flex-1 w-full space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Platform Card 1: ShopeeFood (Node 79:39) */}
          <div className="bg-white rounded-xl border border-[#CBD5E1]/60 shadow-md p-6 sm:p-7 flex flex-col justify-between hover:shadow-xl transition-all group">
            <div>
              <div className="w-16 h-16 rounded-xl bg-[#EE4D2D]/10 flex items-center justify-center text-3xl mb-5 group-hover:scale-105 transition-transform">
                🛍️
              </div>
              <h2 className="font-black text-2xl text-[#121C2A] tracking-tight uppercase mb-2">
                SHOPEEFOOD
              </h2>
              <p className="text-sm text-[#574240] leading-relaxed mb-6 font-normal">
                Pesan makanan favoritmu dengan mudah melalui ShopeeFood. Nikmati promo voucher hemat, potongan ongkir ekstra, dan cireng digoreng dadakan langsung antar.
              </p>
              <div className="space-y-1.5 text-xs text-[#64748B] mb-6">
                <p className="flex items-center gap-2">
                  <span className="text-[#EE4D2D]">✓</span> Tersedia Menu Siap Makan & Gorengan Dadakan
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-[#EE4D2D]">✓</span> Dukungan ShopeePay & Diskon Merchant
                </p>
              </div>
            </div>

            <a
              href="https://shopee.co.id/universal-link/now-food"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#EE4D2D] hover:bg-[#D73C1D] text-white font-bold text-sm py-3.5 px-6 rounded text-center shadow transition-all active:scale-[0.98] uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>PESAN VIA SHOPEEFOOD</span>
              <span>→</span>
            </a>
          </div>

          {/* Platform Card 2: GoFood (Node 79:74) */}
          <div className="bg-white rounded-xl border border-[#CBD5E1]/60 shadow-md p-6 sm:p-7 flex flex-col justify-between hover:shadow-xl transition-all group">
            <div>
              <div className="w-16 h-16 rounded-xl bg-[#00AA13]/10 flex items-center justify-center text-3xl mb-5 group-hover:scale-105 transition-transform">
                🛵
              </div>
              <h2 className="font-black text-2xl text-[#121C2A] tracking-tight uppercase mb-2">
                GOFOOD
              </h2>
              <p className="text-sm text-[#574240] leading-relaxed mb-6 font-normal">
                Nikmati kemudahan memesan Cireng Cangkeling melalui GoFood. Armada driver sigap menjangkau area Sleman, Kampus UGM, UNY, hingga pusat Kota Yogyakarta.
              </p>
              <div className="space-y-1.5 text-xs text-[#64748B] mb-6">
                <p className="flex items-center gap-2">
                  <span className="text-[#00AA13]">✓</span> Pengantaran Cepat Cireng Hangat
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-[#00AA13]">✓</span> Promo GoPay & GoFood Pasti Ada Promo
                </p>
              </div>
            </div>

            <a
              href="https://gofood.link"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#00AA13] hover:bg-[#008F10] text-white font-bold text-sm py-3.5 px-6 rounded text-center shadow transition-all active:scale-[0.98] uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>PESAN VIA GOFOOD</span>
              <span>→</span>
            </a>
          </div>

          {/* Platform Card 3: GrabFood (Node 79:144) */}
          <div className="bg-white rounded-xl border border-[#CBD5E1]/60 shadow-md p-6 sm:p-7 flex flex-col justify-between hover:shadow-xl transition-all group">
            <div>
              <div className="w-16 h-16 rounded-xl bg-[#00B14F]/10 flex items-center justify-center text-3xl mb-5 group-hover:scale-105 transition-transform">
                🍔
              </div>
              <h2 className="font-black text-2xl text-[#121C2A] tracking-tight uppercase mb-2">
                GRABFOOD
              </h2>
              <p className="text-sm text-[#574240] leading-relaxed mb-6 font-normal">
                Pesan menu cireng dan camilan gurih langsung dari aplikasi Grab. Dapatkan diskon langganan GrabUnlimited dan garansi antar tepat waktu.
              </p>
              <div className="space-y-1.5 text-xs text-[#64748B] mb-6">
                <p className="flex items-center gap-2">
                  <span className="text-[#00B14F]">✓</span> Pengiriman Terjadwal & Dine-Out
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-[#00B14F]">✓</span> Diskon GrabUnlimited Aktif
                </p>
              </div>
            </div>

            <a
              href="https://grab.onelink.me"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#00B14F] hover:bg-[#009643] text-white font-bold text-sm py-3.5 px-6 rounded text-center shadow transition-all active:scale-[0.98] uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>PESAN VIA GRABFOOD</span>
              <span>→</span>
            </a>
          </div>

          {/* Platform Card 4: WhatsApp Hotline (Node 79:144 / CS) */}
          <div className="bg-white rounded-xl border border-[#CBD5E1]/60 shadow-md p-6 sm:p-7 flex flex-col justify-between hover:shadow-xl transition-all group">
            <div>
              <div className="w-16 h-16 rounded-xl bg-[#25D366]/10 flex items-center justify-center text-3xl mb-5 group-hover:scale-105 transition-transform">
                💬
              </div>
              <h2 className="font-black text-2xl text-[#121C2A] tracking-tight uppercase mb-2">
                WHATSAPP RESMI
              </h2>
              <p className="text-sm text-[#574240] leading-relaxed mb-6 font-normal">
                Ingin pesan langsung atau bertanya? Hubungi kami melalui WhatsApp. Layanan ramah untuk pesanan prasmanan arisan, katering kantor, paket frozen antar kota, atau kemitraan reseller.
              </p>
              <div className="space-y-1.5 text-xs text-[#64748B] mb-6">
                <p className="flex items-center gap-2">
                  <span className="text-[#25D366]">✓</span> Pesanan Partai Besar & Konsultasi Menu
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-[#25D366]">✓</span> Pengiriman Luar Kota via Paxel & JNE YES
                </p>
              </div>
            </div>

            <a
              href="https://wa.me/6281234567890?text=Halo%20Cireng%20Cangkeling,%20saya%20ingin%20memesan%20langsung"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm py-3.5 px-6 rounded text-center shadow transition-all active:scale-[0.98] uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>CHAT RESMI VIA WHATSAPP</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* 4. OUTLET WALK-IN INFO SECTION */}
        <section className="bg-white rounded-2xl border border-[#CBD5E1] p-8 sm:p-10 shadow-sm">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-black text-[#5B3765] uppercase tracking-wider bg-[#F5EEF8] px-3 py-1 rounded-full">
              Kunjungi Langsung
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-brand text-[#0F172A] mt-2">
              Beli Langsung di Gerai Cireng Cangkeling
            </h2>
            <p className="text-sm text-[#64748B] mt-1">
              Nikmati sensasi makan cireng hangat langsung dari wajan di outlet resmi kami di Yogyakarta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-[#CBD5E1]/70 rounded-xl p-5 bg-[#FFFDF9]">
              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-xl">📍</span>
                <h3 className="font-bold text-base text-[#0F172A]">Outlet Kaliurang KM 5.2</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#574240] leading-relaxed mb-3">
                Jl. Kaliurang KM 5.2 No. 12, Sleman, D.I. Yogyakarta (Dekat Kawasan Kampus UGM)
              </p>
              <div className="text-xs text-[#64748B] flex items-center gap-2">
                <span>⏰ Buka Setiap Hari: 10.00 – 21.30 WIB</span>
              </div>
            </div>

            <div className="border border-[#CBD5E1]/70 rounded-xl p-5 bg-[#FFFDF9]">
              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-xl">📍</span>
                <h3 className="font-bold text-base text-[#0F172A]">Outlet Kaliurang KM 9.2</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#574240] leading-relaxed mb-3">
                Jl. Kaliurang KM 9.2, Sinduharjo, Ngaglik, Sleman, D.I. Yogyakarta
              </p>
              <div className="text-xs text-[#64748B] flex items-center gap-2">
                <span>⏰ Buka Setiap Hari: 10.00 – 21.30 WIB</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 5. BRAND FOOTER */}
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
                  <Image src="/icons/shield.svg" alt="Shield" fill className="object-contain" />
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
                  <Image src="/icons/store.svg" alt="Store" fill className="object-contain" />
                </div>
                <span className="font-bold text-[#FCD34D] text-sm tracking-[0.7px] uppercase">
                  GERAI YOGYAKARTA
                </span>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5">
                  <div className="relative w-[11px] h-[15px] shrink-0 mt-0.5">
                    <Image src="/icons/map-pin.svg" alt="Pin" fill className="object-contain" />
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
                    <Image src="/icons/map-pin.svg" alt="Pin" fill className="object-contain" />
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

            {/* Col 3 */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className="relative w-[15px] h-[15px] shrink-0">
                  <Image src="/icons/clock.svg" alt="Clock" fill className="object-contain" />
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

            {/* Col 4 */}
            <div className="bg-black/25 border border-white/15 rounded-[8px] p-4 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="relative w-[14px] h-[15px] shrink-0">
                    <Image src="/icons/social.svg" alt="Social" fill className="object-contain" />
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
  );
}
