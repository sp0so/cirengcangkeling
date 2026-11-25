'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { useApp } from '../lib/context';
import { UserRole } from '../lib/types';
import {
  IconLock,
  IconUser,
  IconCrown,
  IconMail,
  IconEye,
  IconEyeOff,
  IconSpinner,
  IconInfo,
  IconAlertTriangle,
} from '../components/Icons';
import PageTransition from '../components/PageTransition';

export default function LoginPage() {
  const router = useRouter();
  const { loginWithPassword, showToast } = useApp();

  const [selectedRole, setSelectedRole] = useState<UserRole>('owner');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    setErrorMessage('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username || !password) {
      setErrorMessage('Silakan isi email dan kata sandi Anda.');
      return;
    }

    setLoading(true);
    try {
      const result = await loginWithPassword(username, password);
      if (!result.success || !result.role) {
        setErrorMessage(result.error || 'Email atau kata sandi salah.');
        setLoading(false);
        return;
      }

      if (result.role === 'owner') {
        showToast('Login berhasil sebagai Owner!', 'success');
        router.replace('/dashboard');
      } else {
        showToast('Login berhasil sebagai Kasir!', 'success');
        router.replace('/kasir/dashboard');
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Terjadi kesalahan saat memverifikasi akun.';
      setErrorMessage(msg);
      setLoading(false);
    }
  };

  return (
    <PageTransition className="min-h-screen bg-[#F1F5F9] text-[#0B1C30] selection:bg-[#A24F9D] selection:text-white">
      {/* 1. HEADER - TOP NAVIGATION BAR (Node 140:252) */}
      <header className="bg-white border-b border-[#E2E8F0] px-6 sm:px-10 py-3 relative shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Brand Identity */}
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
              <span className="font-semibold text-lg text-[#5F030A] tracking-[-0.45px] block leading-tight font-brand">
                Cireng Cangkeling
              </span>
              <span className="text-[10px] font-black text-[#904D00] tracking-[1px] block uppercase mt-0.5">
                PELOPOR CIRENG RENYAH GURIH
              </span>
            </div>
          </Link>

          {/* Return link to public site */}
          <Link
            href="/"
            className="text-xs font-bold text-[#64748B] hover:text-[#5B3765] px-3.5 py-2 rounded-lg border border-[#CBD5E1] bg-white transition hover:bg-gray-50 flex items-center gap-1.5 hover:shadow-xs"
          >
            <span>←</span>
            <span>Kembali ke Website</span>
          </Link>
        </div>
      </header>

      {/* 2. MAIN CONTENT AREA (Node 140:268) */}
      <div className="flex-1 flex items-center justify-center py-10 sm:py-16 px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white border border-[#F1F5F9] w-full max-w-5xl rounded-[24px] shadow-[0px_20px_25px_-5px_rgba(226,232,240,0.8),0px_8px_10px_-6px_rgba(226,232,240,0.8)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]"
        >
          {/* Left Feature Panel (Node 140:270) */}
          <div
            className="lg:col-span-5 relative p-8 sm:p-12 text-white flex flex-col justify-between overflow-hidden"
            style={{
              backgroundImage:
                'linear-gradient(127.45deg, rgb(91, 55, 101) 0%, rgb(162, 79, 157) 50%, rgb(92, 54, 101) 100%)',
            }}
          >
            {/* Ambient Decorative Glows */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#EC4899]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#581C87]/50 rounded-full blur-3xl pointer-events-none" />

            {/* Top Text Content */}
            <div className="relative z-10 space-y-4">
              <h1 className="text-2xl sm:text-3xl font-black font-brand tracking-tight leading-tight">
                Kelola Produksi & Stok <br />
                Cireng Tanpa Selisih.
              </h1>
              <p className="text-xs sm:text-sm text-[#F5E8F2]/90 leading-relaxed font-normal">
                Sistem pencatatan persediaan bahan baku dapur, monitoring stok produk jadi, dan audit mutasi transparan untuk operasional harian gerai.
              </p>
            </div>

            {/* Bottom Highlight Feature Badges (Node 140:279) */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-8 mt-8 border-t border-white/15">
              {/* Card 1: Peringatan Dini */}
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-3.5 hover:bg-white/15 transition-colors">
                <div className="flex items-center gap-1.5 mb-1 text-[#FCD34D] font-bold text-[10px] tracking-wider uppercase">
                  <IconAlertTriangle size={14} className="text-[#FCD34D]" />
                  <span>PERINGATAN DINI</span>
                </div>
                <h3 className="font-bold text-xs text-white mb-0.5">Batas Stok Minimum</h3>
                <p className="text-[11px] text-[#EBD1E5] leading-tight">
                  Cegah kehabisan tepung & minyak mendadak
                </p>
              </div>

              {/* Card 2: Audit Trail */}
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-3.5 hover:bg-white/15 transition-colors">
                <div className="flex items-center gap-1.5 mb-1 text-[#6EE7B7] font-bold text-[10px] tracking-wider uppercase">
                  <IconLock size={14} className="text-[#6EE7B7]" />
                  <span>AUDIT TRAIL</span>
                </div>
                <h3 className="font-bold text-xs text-white mb-0.5">Anti Manipulasi</h3>
                <p className="text-[11px] text-[#EBD1E5] leading-tight">
                  Tercatat permanen tiap log perubahan
                </p>
              </div>
            </div>
          </div>

          {/* Right Form Panel (Node 140:300) */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center bg-white">
            <div className="max-w-md mx-auto w-full space-y-6">
              {/* Form Header (Node 140:302) */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-black font-brand text-[#0F172A] tracking-tight">
                  Selamat Datang Kembali
                </h2>
                <p className="text-xs sm:text-sm text-[#64748B] mt-1.5">
                  Silakan masukkan kredensial akun untuk masuk ke sistem pengelolaan UMKM Cireng Cangkeling.
                </p>
              </div>

              {/* Form (Node 140:307) */}
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Role Selector (Node 140:308) */}
                <div>
                  <label className="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-2">
                    MASUK SEBAGAI <span className="text-[#F43F5E]">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleRoleChange('kasir')}
                      className={`py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 border ${
                        selectedRole === 'kasir'
                          ? 'bg-[#FBF4F9] border-2 border-[#732662] text-[#5E1E4F] shadow-xs scale-[1.01]'
                          : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#475569] hover:bg-gray-100 hover:text-slate-800'
                      }`}
                    >
                      <IconUser size={16} className={selectedRole === 'kasir' ? 'text-[#5E1E4F]' : 'text-slate-500'} />
                      <span>Kasir</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRoleChange('owner')}
                      className={`py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 border ${
                        selectedRole === 'owner'
                          ? 'bg-[#FBF4F9] border-2 border-[#732662] text-[#5E1E4F] shadow-xs scale-[1.01]'
                          : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#475569] hover:bg-gray-100 hover:text-slate-800'
                      }`}
                    >
                      <IconCrown size={16} className={selectedRole === 'owner' ? 'text-[#5E1E4F]' : 'text-slate-500'} />
                      <span>Owner</span>
                    </button>
                  </div>
                </div>

                {/* Username Input (Node 140:322) */}
                <div>
                  <label className="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                    USERNAME / EMAIL <span className="text-[#F43F5E]">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3 text-slate-400">
                      <IconMail size={16} />
                    </span>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Masukkan username atau email Anda"
                      className="w-full bg-white border border-[#CBD5E1] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#732662] transition shadow-2xs"
                      required
                    />
                  </div>
                </div>

                {/* Password Input (Node 140:332) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-bold text-[#334155] uppercase tracking-wider">
                      PASSWORD <span className="text-[#F43F5E]">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => showToast('Hubungi Owner untuk reset kata sandi.', 'info')}
                      className="text-xs font-bold text-[#732662] hover:underline"
                    >
                      Lupa Sandi?
                    </button>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3 text-slate-400">
                      <IconLock size={16} />
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white border border-[#CBD5E1] rounded-xl pl-10 pr-11 py-2.5 text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#732662] transition shadow-2xs"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-2.5 p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
                      aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                    >
                      {showPassword ? <IconEyeOff size={16} /> : <IconEye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me Checkbox (Node 140:349) */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-[#732662] focus:ring-[#732662] border-[#CBD5E1] cursor-pointer"
                  />
                  <label htmlFor="rememberMe" className="text-xs text-[#475569] cursor-pointer select-none">
                    Ingat akun di perangkat ini
                  </label>
                </div>

                {errorMessage && (
                  <p className="text-xs font-bold text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
                    {errorMessage}
                  </p>
                )}

                {/* Submit Button (Node 140:353) with Loading State */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#732662] hover:bg-[#5E1E4F] text-white py-3 px-4 rounded-xl font-bold text-sm shadow-md transition-all active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading && <IconSpinner size={16} className="text-white" />}
                  <span>{loading ? 'Memverifikasi...' : 'Login ke Sistem'}</span>
                </button>

                {/* Info Callout Box (Node 140:356) */}
                <div className="bg-[#FFFBEB]/80 border border-[#FDE68A] rounded-xl p-3.5 flex items-start gap-3">
                  <IconInfo size={18} className="text-[#92400E] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-[11px] text-[#92400E] mb-0.5">
                      Ketentuan Akun Sistem UMKM
                    </h4>
                    <p className="text-[11px] text-[#B45309] leading-snug">
                      Tidak tersedia tombol pendaftaran mandiri (registrasi publik). Akun karyawan dapur dan kasir dikonfigurasi langsung oleh Owner demi melindungi integritas data stok dan audit.
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3. SITE FOOTER (Node 140:366) */}
      <footer className="py-5 px-6 text-center text-xs text-[#94A3B8] border-t border-[#E2E8F0] bg-white">
        <div className="flex items-center justify-center gap-3">
          <span>© Cireng Cangkeling Yogyakarta</span>
          <span>•</span>
          <span className="hover:underline cursor-pointer">Bantuan Teknis</span>
          <span>•</span>
          <span className="hover:underline cursor-pointer">Kebijakan Privasi</span>
        </div>
      </footer>
    </PageTransition>
  );
}
