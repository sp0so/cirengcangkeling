'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AppShell from '../../components/AppShell';
import { useApp } from '../../lib/context';
import {
  IconSettings,
  IconCheckCircle,
} from '../../components/Icons';

export default function ProfilUsahaOwnerPage() {
  const { showToast, clearAllData, loadSampleData } = useApp();

  const [brandName, setBrandName] = useState('Cireng Cangkeling');
  const [tagline, setTagline] = useState('Yang kamu ingin, kita adain!');
  const [ownerName, setOwnerName] = useState('Astriana (Usaha Dagang / Perorangan UMKM)');
  const [yearFounded, setYearFounded] = useState('2021');
  const [nibNumber, setNibNumber] = useState('0220202931029');
  const [halalCert, setHalalCert] = useState('ID3211000000000 (Halal Kemenag RI)');
  const [description, setDescription] = useState(
    'Cireng Cangkeling memproduksi olahan cireng krispi dengan racikan bumbu rempah Sunda autentik dan berbagai isian. Dibuat setiap pagi dari bahan tapioka pilihan segar tanpa pengawet berbahaya. Melayani pembelian cemilan hangat di tempat, kemasan vacuum beku (frozen food), serta pesanan katering UMKM se-Yogyakarta.'
  );

  const [outlet1Address, setOutlet1Address] = useState(
    'Jl. Kaliurang KM 5.2 No. 18, Caturtunggal, Depok, Sleman, D.I. Yogyakarta 55281'
  );
  const [outlet2Address, setOutlet2Address] = useState(
    'Jl. Kaliurang KM 9.2 (Depan Pasar Gentan), Sleman, D.I. Yogyakarta'
  );
  const [waNumber, setWaNumber] = useState('0822-1234-5678');
  const [instagram, setInstagram] = useState('@cirengcangkeling.yk');
  const [operatingHours, setOperatingHours] = useState('Setiap Hari, 09.00 - 21.00 WIB');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Profil usaha & identitas bisnis berhasil diperbarui!', 'success');
  };

  return (
    <AppShell>
      <div className="space-y-6 font-sans">
        {/* =========================================================================
            1. BREADCRUMB & HEADER (Figma 6:6643)
           ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#5B403D] mb-1">
              <Link href="/dashboard" className="hover:text-[#A24F9D] transition-colors">
                Dashboard
              </Link>
              <span>/</span>
              <span className="font-bold text-[#0B1C30]">Profil Usaha</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30] tracking-tight">
              Profil Usaha
            </h1>
            <p className="text-[13px] text-[#5B403D] mt-0.5">
              Informasi pokok entitas UMKM, perizinan OSS, sertifikasi halal, dan saluran komunikasi pelanggan.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl bg-[#A24F9D] hover:bg-[#8F3D8A] text-white text-[13px] font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <IconCheckCircle size={16} />
              <span>Simpan Perubahan Profil</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            2. BRAND IDENTITY CARD PREVIEW (Figma 6:6660)
           ========================================================================= */}
        <div className="bg-gradient-to-r from-[#5B3765] via-[#A24F9D] to-[#5B3765] text-white rounded-2xl p-6 shadow-card flex flex-col md:flex-row items-center gap-6">
          <div className="w-20 h-20 shrink-0 relative drop-shadow-md">
            <Image
              src="/logo-brand.png"
              alt="Logo Cireng Cangkeling"
              fill
              sizes="80px"
              className="object-contain"
              priority
            />
          </div>

          <div className="text-center md:text-left space-y-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <h2 className="text-2xl font-extrabold tracking-tight">{brandName}</h2>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FDE047] text-[#833E17]">
                ✓ UMKM Terverifikasi OSS
              </span>
            </div>
            <p className="text-sm font-semibold text-white/90 italic">
              &quot;{tagline}&quot;
            </p>
            <div className="text-xs text-white/80 flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1">
              <span>📍 Kaliurang, Yogyakarta</span>
              <span>•</span>
              <span>🕒 {operatingHours}</span>
              <span>•</span>
              <span>💬 {waNumber}</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            3. SECTION 1: INFORMASI POKOK & LEGALITAS UMKM (Figma 6:6685)
           ========================================================================= */}
        <div className="p-6 rounded-2xl bg-white border border-[#CBD5E1] shadow-card space-y-5">
          <div className="border-b border-[#F1F5F9] pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[11px] font-bold text-[#833E17] uppercase tracking-wider block">
                LEGALITAS &amp; KREDENSIAL
              </span>
              <h3 className="text-base font-extrabold text-[#0B1C30]">
                Informasi Pokok &amp; Legalitas UMKM
              </h3>
              <p className="text-[12px] text-[#5B403D]">
                Data terdaftar di sistem OSS &amp; Kementerian Agama RI
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#DCFCE7] text-[#15803D] border border-[#16A34A]/30 self-start sm:self-auto">
              ✓ Legal Terjamin
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-[#334155] mb-1">
                Nama Merk Dagang / Brand *
              </label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] font-bold text-[#0B1C30]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#334155] mb-1">
                Slogan / Tagline Resmi *
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-[#334155] mb-1">
                Pemilik / Penanggung Jawab Terdaftar *
              </label>
              <input
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] font-semibold"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-[#334155] mb-1">Tahun Berdiri</label>
                <input
                  type="text"
                  value={yearFounded}
                  onChange={(e) => setYearFounded(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] font-semibold"
                />
              </div>
              <div>
                <label className="block font-bold text-[#334155] mb-1">Status Usaha</label>
                <input
                  type="text"
                  readOnly
                  value="5 Tahun Beroperasi"
                  className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] bg-slate-50 font-bold text-[#16A34A]"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#334155] mb-1">
                Nomor Induk Berusaha (NIB OSS)
              </label>
              <input
                type="text"
                value={nibNumber}
                onChange={(e) => setNibNumber(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] font-mono font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-[#334155] mb-1">
                Sertifikat Halal Kemenag RI
              </label>
              <input
                type="text"
                value={halalCert}
                onChange={(e) => setHalalCert(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] font-mono font-semibold text-[#15803D]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-bold text-[#334155] mb-1">
                Deskripsi Singkat Profil Usaha (Ditampilkan pada Katalog &amp; Nota)
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] text-xs resize-none leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* =========================================================================
            4. SECTION 2: LOKASI OUTLET & KONTAK RESMI (Figma 6:6715)
           ========================================================================= */}
        <div className="p-6 rounded-2xl bg-white border border-[#CBD5E1] shadow-card space-y-5">
          <div className="border-b border-[#F1F5F9] pb-3">
            <span className="text-[11px] font-bold text-[#833E17] uppercase tracking-wider block">
              GERAI &amp; KOMUNIKASI
            </span>
            <h3 className="text-base font-extrabold text-[#0B1C30]">
              Lokasi Outlet, Dapur Produksi &amp; Kontak Resmi
            </h3>
            <p className="text-[12px] text-[#5B403D]">
              Titik operasional sentral dan saluran komunikasi pelanggan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-[#334155] mb-1">
                Outlet 1 (Sentral &amp; Dapur Produksi Utama) *
              </label>
              <textarea
                rows={2}
                value={outlet1Address}
                onChange={(e) => setOutlet1Address(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] resize-none"
              />
            </div>

            <div>
              <label className="block font-bold text-[#334155] mb-1">
                Outlet 2 (Cabang Gerai Kaliurang Atas)
              </label>
              <textarea
                rows={2}
                value={outlet2Address}
                onChange={(e) => setOutlet2Address(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] resize-none"
              />
            </div>

            <div>
              <label className="block font-bold text-[#334155] mb-1">
                Nomor WhatsApp Resmi (Order Katering &amp; Frozen) *
              </label>
              <input
                type="text"
                value={waNumber}
                onChange={(e) => setWaNumber(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] font-mono font-bold text-[#16A34A]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#334155] mb-1">
                Akun Instagram Resmi
              </label>
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] font-semibold text-[#A24F9D]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-bold text-[#334155] mb-1">
                Jam Operasional Toko
              </label>
              <input
                type="text"
                value={operatingHours}
                onChange={(e) => setOperatingHours(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] font-semibold"
              />
            </div>
          </div>
        </div>

        {/* =========================================================================
            5. DATA STATE CONTROLS (RESET / SAMPLE)
           ========================================================================= */}
        <div className="p-6 rounded-2xl bg-white border border-[#CBD5E1] shadow-card space-y-4">
          <div className="border-b border-[#F1F5F9] pb-3">
            <span className="text-[11px] font-bold text-[#833E17] uppercase tracking-wider block">
              MANAJEMEN DATA SISTEM
            </span>
            <h3 className="text-base font-extrabold text-[#0B1C30]">
              Pembersihan &amp; Pengisian Data Operasional
            </h3>
            <p className="text-xs text-[#5B403D] mt-0.5">
              Kontrol penuh atas basis data lokal. Anda dapat mengosongkan data untuk memulai bisnis dari awal, atau memuat data percontohan untuk pelatihan kasir.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (confirm('Apakah Anda yakin ingin mengosongkan seluruh data operasional (produk, bahan baku, transaksi, kas)?')) {
                  clearAllData();
                }
              }}
              className="px-4 py-2.5 rounded-xl bg-[#FFDAD6] hover:bg-[#ffb4ab] text-[#93000A] text-xs font-bold transition-all border border-[#BA1A1A]/30 flex items-center gap-2 cursor-pointer"
            >
              <span>🗑️ Kosongkan Seluruh Data (Mulai dari Nol)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (confirm('Muat data percontohan untuk keperluan simulasi?')) {
                  loadSampleData();
                }
              }}
              className="px-4 py-2.5 rounded-xl bg-[#EFF4FF] hover:bg-[#dbe7ff] text-[#0B1C30] text-xs font-bold transition-all border border-[#CBD5E1] flex items-center gap-2 cursor-pointer"
            >
              <span>📦 Muat Data Percontohan (Demo)</span>
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
