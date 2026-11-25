'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import AppShell from '../../components/AppShell';
import WordRevealHeading from '../../components/WordRevealHeading';
import MotionCard from '../../components/MotionCard';
import { useApp } from '../../lib/context';
import {
  IconUser,
  IconLock,
  IconCheckCircle,
  IconShield,
  IconStore,
  IconClock,
  IconMail,
  IconLogout,
  IconCheck,
  IconAlertTriangle,
  IconShift,
  IconWhatsApp,
} from '../../components/Icons';

export default function ProfilKasirPage() {
  const { currentUser, activeShift, showToast } = useApp();
  const [pinCurrent, setPinCurrent] = useState('');
  const [pinNew, setPinNew] = useState('');
  const [pinConfirm, setPinConfirm] = useState('');
  const [fullName, setFullName] = useState(currentUser?.name || 'Rina Oktaviani');
  const [phone, setPhone] = useState('0812-3456-7890');
  const [email, setEmail] = useState('rina.kasir@cirengcangkeling.com');
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPin, setIsSavingPin] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setTimeout(() => {
      setIsSavingProfile(false);
      showToast('Informasi data pribadi kasir berhasil diperbarui.', 'success');
    }, 600);
  };

  const handleSavePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinNew.length !== 6 || !/^\d+$/.test(pinNew)) {
      showToast('PIN baru harus terdiri dari 6 digit angka numerik.', 'error');
      return;
    }
    if (pinNew !== pinConfirm) {
      showToast('Konfirmasi PIN baru tidak sesuai.', 'error');
      return;
    }
    setIsSavingPin(true);
    setTimeout(() => {
      setIsSavingPin(false);
      setPinCurrent('');
      setPinNew('');
      setPinConfirm('');
      showToast('PIN otorisasi kasir berhasil diperbarui.', 'success');
    }, 700);
  };

  return (
    <AppShell>
      <div className="space-y-6 font-sans max-w-[1400px] mx-auto pb-16">
        {/* TOP BAR / BREADCRUMB SECTION (Figma 127:36) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#565E74] tracking-wider uppercase">
              <span>AKUN</span>
              <span className="text-slate-400">/</span>
              <span className="text-[#A24F9D]">Profil Saya</span>
            </div>
            <WordRevealHeading
              text="Profil Kasir"
              as="h1"
              className="text-2xl sm:text-3xl font-extrabold text-[#191C1D] tracking-tight"
            />
            <p className="text-sm text-[#565E74] leading-relaxed max-w-2xl">
              Kelola informasi data diri, PIN otorisasi kasir, dan pantau status shift operasional Anda secara real-time.
            </p>
          </div>

          {/* LIVE TELEMETRY STATUS PILL (Figma 127:49) */}
          <div className="bg-[#A24F9D] rounded-[14px] p-2 flex items-center gap-3 text-white shadow-xs self-start md:self-auto">
            <div className="bg-[#F3F4F5] rounded-[10px] px-3 py-1.5 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#008438] animate-pulse" />
              <div className="text-[11px] font-bold text-[#00682B] leading-tight">
                <div>SISTEM POS</div>
                <div>ONLINE</div>
              </div>
            </div>
            <div className="pr-3 text-right">
              <div className="text-[10px] text-white/80 leading-tight">Sinkronisasi Terakhir</div>
              <div className="text-[11px] font-bold text-white font-mono mt-0.5">
                {new Date().toLocaleTimeString('id-ID')} WIB
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT LAYOUT: 2 COLUMNS (Figma 127:59) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* KOLOM KIRI (Kartu Identitas Kasir & Keamanan) - Span 4/12 */}
          <div className="lg:col-span-4 space-y-5">
            {/* 1. Identity Card (Figma 127:61) */}
            <MotionCard className="bg-white rounded-[16px] border border-[#EDEEEF] shadow-xs overflow-hidden">
              {/* Subtle crimson accent bar */}
              <div className="h-1.5 bg-[#A24F9D] w-full" />

              <div className="p-6 text-center space-y-4">
                {/* Avatar with Status Badge */}
                <div className="relative inline-block mx-auto">
                  <div className="w-24 h-24 rounded-full bg-[#FAF0F8] border-2 border-[#A24F9D]/20 overflow-hidden relative shadow-sm flex items-center justify-center">
                    <Image
                      src="/figma/a01b110d9071990f24cb5e0b4776ee6239fc8d89.png"
                      alt="Kasir Avatar"
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span
                    className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-[#008438] border-2 border-white shadow-xs"
                    title="Online"
                  />
                </div>

                {/* Name & Role Badges */}
                <div className="space-y-2">
                  <h2 className="text-xl font-extrabold text-[#191C1D] tracking-tight">{fullName}</h2>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FFDAD6] text-[#A24F9D] font-bold text-[11px] tracking-wide">
                      ROLE: KASIR
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#005320] font-bold text-[11px] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00682B]" />
                      <span>Aktif • Terverifikasi</span>
                    </span>
                  </div>
                </div>

                <div className="border-t border-[#EDEEEF] pt-4 space-y-2.5 text-left text-xs">
                  {/* ID Karyawan */}
                  <div className="bg-[#F8F9FA] rounded-[10px] p-2.5 flex items-center justify-between border border-[#EDEEEF]/50">
                    <div className="flex items-center gap-2 text-[#565E74]">
                      <IconUser size={15} className="text-[#A24F9D]" />
                      <span>ID Karyawan</span>
                    </div>
                    <span className="font-bold text-[#191C1D] font-mono">
                      {currentUser?.id ? `KSR-CKT-${currentUser.id.slice(0, 3)}` : 'KSR-CKT-004'}
                    </span>
                  </div>

                  {/* Outlet Penugasan */}
                  <div className="bg-[#F8F9FA] rounded-[10px] p-2.5 space-y-1 border border-[#EDEEEF]/50">
                    <div className="flex items-center gap-2 text-[#565E74]">
                      <IconStore size={15} className="text-[#A24F9D]" />
                      <span>Outlet Penugasan</span>
                    </div>
                    <p className="font-bold text-[#191C1D] pl-6 text-xs">
                      Outlet Pusat (Cikutra, Bandung)
                    </p>
                  </div>

                  {/* Bergabung Sejak */}
                  <div className="bg-[#F8F9FA] rounded-[10px] p-2.5 flex items-center justify-between border border-[#EDEEEF]/50">
                    <div className="flex items-center gap-2 text-[#565E74]">
                      <IconClock size={15} className="text-[#A24F9D]" />
                      <span>Bergabung Sejak</span>
                    </div>
                    <span className="font-bold text-[#191C1D]">15 Januari 2023</span>
                  </div>
                </div>
              </div>
            </MotionCard>

            {/* 2. Info Shift Hari Ini Widget (Figma 127:105) */}
            <div className="bg-[#A24F9D] rounded-[16px] p-5 text-white shadow-xs space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-[8px] bg-white text-[#A24F9D] flex items-center justify-center font-bold">
                    <IconShift size={16} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm leading-tight">Shift Operasional</h3>
                    <p className="text-[11px] text-white/80">Jadwal tugas kasir</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-[6px] bg-[#7FFC97] text-[#005320] font-bold text-[10px] tracking-wide uppercase">
                  {activeShift ? 'SEDANG BERJALAN' : 'BELUM DIBUKA'}
                </span>
              </div>

              <div className="space-y-2">
                <div className="bg-[#F3F4F5] rounded-[10px] p-3 text-[#191C1D]">
                  <span className="text-[10px] font-bold text-[#A24F9D] tracking-wider uppercase block mb-1">
                    JADWAL SHIFT HARI INI
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-[#A24F9D]">Shift 1 Pagi</span>
                    <span className="font-bold text-xs text-[#565E74]">08:00 - 16:00 WIB</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-[#F3F4F5] rounded-[10px] p-2.5 text-[#191C1D]">
                    <span className="text-[10px] font-bold text-[#A24F9D] block mb-0.5">Stasiun POS</span>
                    <span className="font-bold text-xs text-[#191C1D]">Pos 01 (Depan)</span>
                  </div>
                  <div className="bg-[#F3F4F5] rounded-[10px] p-2.5 text-[#191C1D]">
                    <span className="text-[10px] font-bold text-[#A24F9D] block mb-0.5">Jam Presensi</span>
                    <span className="font-bold text-xs text-[#191C1D]">07:52 WIB (Tepat)</span>
                  </div>
                </div>

                <div className="bg-white rounded-[10px] p-3 text-[#191C1D] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#565E74] block">Shift Berjalan</span>
                    <span className="font-bold text-xs text-[#A24F9D]">Total Transaksi</span>
                  </div>
                  <span className="font-extrabold text-base text-[#A24F9D]">24 Nota</span>
                </div>
              </div>
            </div>

            {/* 3. Action Danger Zone (Logout) (Figma 127:156) */}
            <div className="bg-white rounded-[16px] border border-[#EDEEEF] p-4 shadow-xs space-y-3">
              <span className="text-[11px] font-bold text-[#565E74] tracking-wider uppercase block">
                TINDAKAN SESI
              </span>
              <Link
                href="/login"
                className="w-full py-2.5 px-4 rounded-[12px] bg-[#FFDAD6] hover:bg-[#FBC4BE] text-[#93000A] font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-2xs active:scale-[0.98]"
              >
                <IconLogout size={16} />
                <span>Logout / Keluar Akun Kasir</span>
              </Link>
              <p className="text-[11px] text-[#565E74] text-center leading-relaxed">
                Pastikan laci kasir telah direkap sebelum menutup sesi.
              </p>
            </div>
          </div>

          {/* KOLOM KANAN (Pengaturan Data Diri, Keamanan & RBAC) - Span 8/12 */}
          <div className="lg:col-span-8 space-y-6">
            {/* 1. Form Informasi Data Diri (Figma 127:167) */}
            <div className="bg-white rounded-[16px] border border-[#EDEEEF] p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-[#EDEEEF] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[12px] bg-[#FFDAD6] text-[#A24F9D] flex items-center justify-center font-bold">
                    <IconUser size={20} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-[#191C1D]">Data Pribadi Kasir</h3>
                    <p className="text-xs text-[#565E74]">
                      Perbarui informasi kontak dan identitas akun kerja Anda
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#00682B] bg-[#DCFCE7] px-3 py-1 rounded-full">
                  <IconCheck size={14} />
                  <span>Data Tersinkron</span>
                </div>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Field 1: Nama Lengkap */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <label className="font-bold text-[#191C1D]">Nama Lengkap</label>
                      <span className="text-[#A24F9D] font-semibold">*Wajib</span>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-[8px] bg-[#F3F4F5] border border-transparent focus:border-[#A24F9D] focus:bg-white text-xs sm:text-sm text-[#191C1D] outline-none transition-all"
                      />
                      <span className="absolute left-3.5 top-3 text-[#565E74]">
                        <IconUser size={15} />
                      </span>
                    </div>
                  </div>

                  {/* Field 2: Username (Locked) */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <label className="font-bold text-[#191C1D]">Username Kasir</label>
                      <span className="text-[#565E74] flex items-center gap-1">
                        <IconLock size={12} />
                        <span>Terkunci</span>
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        value={currentUser?.email ? currentUser.email.split('@')[0] : 'rina.cangkeling'}
                        disabled
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-[8px] bg-[#E7E8E9] border border-transparent text-xs sm:text-sm text-[#565E74] cursor-not-allowed outline-none"
                      />
                      <span className="absolute left-3.5 top-3 text-[#565E74]">
                        <IconLock size={15} />
                      </span>
                    </div>
                  </div>

                  {/* Field 3: No. WhatsApp / Telepon */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <label className="font-bold text-[#191C1D]">Nomor WhatsApp / HP</label>
                      <span className="text-[#A24F9D] font-semibold">*Aktif</span>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-[8px] bg-[#F3F4F5] border border-transparent focus:border-[#A24F9D] focus:bg-white text-xs sm:text-sm text-[#191C1D] outline-none transition-all"
                      />
                      <span className="absolute left-3.5 top-3 text-[#565E74]">
                        <IconWhatsApp size={15} />
                      </span>
                    </div>
                  </div>

                  {/* Field 4: Email Operasional */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#191C1D]">Email Operasional</label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-[8px] bg-[#F3F4F5] border border-transparent focus:border-[#A24F9D] focus:bg-white text-xs sm:text-sm text-[#191C1D] outline-none transition-all"
                      />
                      <span className="absolute left-3.5 top-3 text-[#565E74]">
                        <IconMail size={15} />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setFullName(currentUser?.name || 'Rina Oktaviani');
                      setPhone('0812-3456-7890');
                      setEmail('rina.kasir@cirengcangkeling.com');
                    }}
                    className="px-4 py-2 rounded-[8px] text-xs font-semibold text-[#565E74] hover:bg-slate-100 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingProfile}
                    className="px-5 py-2 rounded-[8px] bg-[#A24F9D] hover:bg-[#8D3B89] disabled:opacity-50 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
                  >
                    <IconCheck size={14} />
                    <span>{isSavingProfile ? 'Menyimpan...' : 'Simpan Perubahan Profil'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* 2. Form Keamanan & PIN Otorisasi Transaksi (Figma 127:238) */}
            <div className="bg-white rounded-[16px] border border-[#EDEEEF] p-6 shadow-xs space-y-5">
              <div className="flex items-center gap-3 border-b border-[#EDEEEF] pb-4">
                <div className="w-10 h-10 rounded-[12px] bg-[#DAE2FD] text-[#002109] flex items-center justify-center font-bold">
                  <IconLock size={20} />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-[#191C1D]">
                    PIN Otorisasi Kasir (6 Digit)
                  </h3>
                  <p className="text-xs text-[#565E74]">
                    Proteksi akses brankas kasir, void struk, dan serah terima shift harian
                  </p>
                </div>
              </div>

              {/* Callout Notice */}
              <div className="p-3.5 rounded-[12px] bg-[#F8F9FA] border border-[#EDEEEF] flex items-start gap-3 text-xs text-[#565E74]">
                <IconShield size={18} className="text-[#A24F9D] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="text-[#191C1D]">Keamanan Kasir:</strong> PIN Kasir 6-digit digunakan secara mandiri untuk membuka laci kasir (cash drawer) manual, melakukan pembatalan item pada antrian nota, dan validasi absensi shift. Jangan berikan kombinasi ini kepada pihak luar.
                </p>
              </div>

              <form onSubmit={handleSavePin} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Current PIN */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#191C1D]">PIN Saat Ini</label>
                    <input
                      type="password"
                      maxLength={6}
                      value={pinCurrent}
                      onChange={(e) => setPinCurrent(e.target.value)}
                      placeholder="••••••"
                      className="w-full px-3 py-2.5 rounded-[8px] bg-[#F3F4F5] border border-transparent focus:border-[#A24F9D] focus:bg-white text-center font-mono tracking-widest text-sm text-[#191C1D] outline-none transition-all"
                    />
                  </div>

                  {/* New PIN */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#191C1D]">PIN Baru (6 Digit)</label>
                    <input
                      type="password"
                      maxLength={6}
                      value={pinNew}
                      onChange={(e) => setPinNew(e.target.value)}
                      placeholder="Ketik 6 angka"
                      className="w-full px-3 py-2.5 rounded-[8px] bg-[#F3F4F5] border border-transparent focus:border-[#A24F9D] focus:bg-white text-center font-mono tracking-widest text-sm text-[#191C1D] outline-none transition-all"
                    />
                  </div>

                  {/* Confirm PIN */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#191C1D]">Konfirmasi PIN Baru</label>
                    <input
                      type="password"
                      maxLength={6}
                      value={pinConfirm}
                      onChange={(e) => setPinConfirm(e.target.value)}
                      placeholder="Ulangi 6 angka"
                      className="w-full px-3 py-2.5 rounded-[8px] bg-[#F3F4F5] border border-transparent focus:border-[#A24F9D] focus:bg-white text-center font-mono tracking-widest text-sm text-[#191C1D] outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <p className="text-[11px] text-[#565E74]">
                    Kombinasi harus berupa 6 digit angka numerik.
                  </p>
                  <button
                    type="submit"
                    disabled={isSavingPin || !pinCurrent || !pinNew || !pinConfirm}
                    className="px-5 py-2 rounded-[8px] bg-[#A24F9D] hover:bg-[#8D3B89] disabled:opacity-50 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors shrink-0"
                  >
                    <IconLock size={14} />
                    <span>{isSavingPin ? 'Memperbarui...' : 'Perbarui PIN Kasir'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* 3. Ringkasan Hak Akses Kasir (RBAC Matrix) (Figma 127:285) */}
            <div className="bg-white rounded-[16px] border border-[#EDEEEF] p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-[#EDEEEF] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[12px] bg-[#A24F9D] text-white flex items-center justify-center font-bold">
                    <IconShield size={20} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-[#191C1D]">
                      Hak Akses & Batasan Peran
                    </h3>
                    <p className="text-xs text-[#565E74]">
                      Ketentuan hak operasi akun kasir cabang Cireng Cangkeling
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-[6px] bg-[#A24F9D] text-white text-xs font-semibold">
                  Role: Kasir Toko
                </span>
              </div>

              {/* Permission Matrix 2-Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Granted Permissions */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#00682B] tracking-wider uppercase">
                    <IconCheckCircle size={15} />
                    <span>IZIN OPERASIONAL AKTIF</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-3 rounded-[10px] bg-[#F8F9FA] border border-[#EDEEEF] space-y-1">
                      <p className="font-bold text-[#191C1D]">Membuka Transaksi POS & Struk</p>
                      <p className="text-[11px] text-[#565E74]">
                        Dapat memproses pesanan dan mencetak receipt pelanggan.
                      </p>
                    </div>

                    <div className="p-3 rounded-[10px] bg-[#F8F9FA] border border-[#EDEEEF] space-y-1">
                      <p className="font-bold text-[#191C1D]">Riwayat Transaksi Shift Berjalan</p>
                      <p className="text-[11px] text-[#565E74]">
                        Melihat & mencetak ulang nota penjualan shift saat ini.
                      </p>
                    </div>

                    <div className="p-3 rounded-[10px] bg-[#F8F9FA] border border-[#EDEEEF] space-y-1">
                      <p className="font-bold text-[#191C1D]">Memantau Ketersediaan Stok</p>
                      <p className="text-[11px] text-[#565E74]">
                        Melihat jumlah stok cireng & frozen food yang siap dijual.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Restricted Permissions */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#93000A] tracking-wider uppercase">
                    <IconLock size={15} />
                    <span>AKSES DIBATASI (KHUSUS OWNER)</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-3 rounded-[10px] bg-[#FFDAD6]/30 border border-[#E6BDB8]/40 space-y-1">
                      <p className="font-bold text-[#191C1D]">Ubah Harga Produk & HPP Master</p>
                      <p className="text-[11px] text-[#565E74]">
                        Penyesuaian nominal jual hanya oleh Kang Asep (Owner).
                      </p>
                    </div>

                    <div className="p-3 rounded-[10px] bg-[#FFDAD6]/30 border border-[#E6BDB8]/40 space-y-1">
                      <p className="font-bold text-[#191C1D]">Audit Stok Gudang Bahan Baku</p>
                      <p className="text-[11px] text-[#565E74]">
                        Input tepung tapioka, minyak, bumbu diatur Kepala Dapur/Owner.
                      </p>
                    </div>

                    <div className="p-3 rounded-[10px] bg-[#FFDAD6]/30 border border-[#E6BDB8]/40 space-y-1">
                      <p className="font-bold text-[#191C1D]">Laporan Keuangan & Margin Laba</p>
                      <p className="text-[11px] text-[#565E74]">
                        Kasir hanya memiliki akses rekapan omzet kas kecil shift.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* RBAC Escalation Notice (Figma 127:365) */}
              <div className="p-4 rounded-[12px] bg-[#A24F9D] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <IconShield size={16} />
                  </div>
                  <p className="text-xs leading-relaxed">
                    Jika memerlukan perubahan hak akses atau pembukaan laci darurat, silakan hubungi{' '}
                    <strong className="underline decoration-white/40">Kang Asep Sunandar (Owner)</strong>.
                  </p>
                </div>
                <a
                  href="https://wa.me/628123456789"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-[8px] bg-white text-[#A24F9D] hover:bg-slate-100 font-bold text-xs shrink-0 flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                >
                  <IconWhatsApp size={14} />
                  <span>Hubungi Owner</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
