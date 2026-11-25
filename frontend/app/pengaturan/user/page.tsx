'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppShell from '../../components/AppShell';
import { useApp } from '../../lib/context';
import {
  IconUser,
  IconCheckCircle,
  IconAlertTriangle,
  IconPlus,
  IconEdit,
  IconClose,
  IconSearch,
} from '../../components/Icons';

interface SystemUser {
  id: string;
  name: string;
  username: string;
  email: string;
  role: 'Owner' | 'Kasir Gerai' | 'Staf Dapur';
  outlet: string;
  permissions: string[];
  lastActive: string;
  isOnline: boolean;
  status: 'Aktif' | 'Nonaktif';
}

export default function UserManagementOwnerPage() {
  const { activeShift, showToast } = useApp();

  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isResetPinOpen, setIsResetPinOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<SystemUser | null>(null);

  // Form states
  const [formName, setFormName] = useState('');
  const [formUsername, setFormUsername] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formRole, setFormRole] = useState<'Kasir Gerai' | 'Staf Dapur'>('Kasir Gerai');
  const [formOutlet, setFormOutlet] = useState('Outlet Kaliurang KM 5.2');
  const [formPin, setFormPin] = useState('1234');

  const [userList, setUserList] = useState<SystemUser[]>([
    {
      id: 'usr-1',
      name: 'Owner Cireng',
      username: 'admin.owner',
      email: 'admin@cirengcangkeling.id',
      role: 'Owner',
      outlet: 'Semua Gerai & Sentral',
      permissions: ['Full Access', 'Keuangan', 'Audit Log', 'Katalog', 'User Management'],
      lastActive: 'Aktif Sekarang (Sesi Ini)',
      isOnline: true,
      status: 'Aktif',
    },
    {
      id: 'usr-2',
      name: 'Rian Pratama',
      username: 'rian.kasir1',
      email: 'rian@cirengcangkeling.id',
      role: 'Kasir Gerai',
      outlet: 'Outlet Kaliurang KM 5.2',
      permissions: ['POS Kasir', 'Buka/Tutup Shift', 'Cetak Struk'],
      lastActive: activeShift ? 'Shift Sedang Berjalan' : 'Kemarin 21:00 WIB',
      isOnline: !!activeShift,
      status: 'Aktif',
    },
  ]);

  // LocalStorage persistence for user list
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('cc_system_users');
      if (saved) setUserList(JSON.parse(saved));
    } catch {}
  }, []);

  React.useEffect(() => {
    try {
      localStorage.setItem('cc_system_users', JSON.stringify(userList));
    } catch {}
  }, [userList]);

  const filteredUsers = userList.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === 'all' || u.role === filterRole;
    return matchSearch && matchRole;
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: SystemUser = {
      id: `usr-${Date.now()}`,
      name: formName,
      username: formUsername,
      email: formEmail,
      role: formRole,
      outlet: formOutlet,
      permissions:
        formRole === 'Kasir Gerai'
          ? ['POS Kasir', 'Buka/Tutup Shift', 'Cetak Struk']
          : ['Catat Hasil Produksi', 'Cek Bahan Baku'],
      lastActive: 'Belum pernah login',
      isOnline: false,
      status: 'Aktif',
    };

    setUserList((prev) => [...prev, newUser]);
    showToast(`Akun karyawan "${formName}" berhasil dibuat dengan PIN: ${formPin}`, 'success');
    setIsAddModalOpen(false);
    setFormName('');
    setFormUsername('');
    setFormEmail('');
  };

  const handleResetPinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    showToast(`PIN POS untuk ${selectedUser.name} berhasil direset ke PIN baru!`, 'success');
    setIsResetPinOpen(false);
  };

  return (
    <AppShell>
      <div className="space-y-6 font-sans">
        {/* =========================================================================
            1. GREETING & PAGE HEADER (Figma 6:5940)
           ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#5B3765]/10 text-[#5B3765] uppercase tracking-wider">
                HAK AKSES &amp; KEAMANAN
              </span>
              <span className="text-[11px] text-[#5B403D]/70 font-medium">
                Jumat, 30 Oktober 2026
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30] tracking-tight">
              Manajemen Pengguna
            </h1>
            <p className="text-[13px] text-[#5B403D] mt-0.5">
              Kelola akun staf kasir gerai, tim dapur produksi, dan kredensial PIN keamanan sistem POS.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                setFormName('');
                setFormUsername('');
                setFormEmail('');
                setFormPin('1234');
                setIsAddModalOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-[#A24F9D] hover:bg-[#8F3D8A] text-white text-[13px] font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <IconPlus size={15} />
              <span>+ Tambah Akun Karyawan</span>
            </button>
          </div>
        </div>

        {/* Global Security Box */}
        <div className="p-4 rounded-2xl bg-[#E5EEFF] border border-[#CBD5E1] text-xs text-[#0B1C30] flex items-start gap-3">
          <span className="text-[#0B1C30] mt-0.5 text-base">🛡️</span>
          <div className="space-y-1">
            <span className="font-bold text-[13px] block">
              Ketentuan Sesi Kasir Tunggal (Single Active Session):
            </span>
            <p className="text-[#5B403D] leading-relaxed">
              Sistem membatasi hanya 1 kasir aktif pada shift yang sama untuk memastikan rekonsiliasi kas laci fisik tidak selisih. Mode kasir owner otomatis dinonaktifkan ketika shift kasir sedang bertugas.
            </p>
          </div>
        </div>

        {/* =========================================================================
            2. 4 KPI STAT CARDS (Figma 6:5960)
           ========================================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          <div className="p-4 rounded-2xl bg-white border border-[#CBD5E1] shadow-card">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B403D] block">
              TOTAL PENGGUNA TERDAFTAR
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30]">
                {userList.length}
              </span>
              <span className="text-[12px] font-semibold text-[#5B403D]">Akun</span>
            </div>
            <span className="text-[11px] text-[#16A34A] font-medium block mt-1">
              ✓ 100% terverifikasi
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#CBD5E1] shadow-card">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#16A34A] block">
              KASIR AKTIF BERTUGAS
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#16A34A]">
                {userList.filter((u) => u.role === 'Kasir Gerai').length}
              </span>
              <span className="text-[12px] font-semibold text-[#16A34A]">Petugas</span>
            </div>
            <span className="text-[11px] text-[#5B403D] font-medium block mt-1">
              Shift Pagi &amp; Shift Sore
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#CBD5E1] shadow-card">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#833E17] block">
              STAF DAPUR &amp; PRODUKSI
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30]">
                {userList.filter((u) => u.role === 'Staf Dapur').length}
              </span>
              <span className="text-[12px] font-semibold text-[#5B403D]">Petugas</span>
            </div>
            <span className="text-[11px] text-[#5B403D] font-medium block mt-1">
              Dapur Sentral Kaliurang
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#DCFCE7]/50 border border-[#16A34A]/30 shadow-card">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#15803D] block">
              TINGKAT KEAMANAN SISTEM
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl sm:text-2xl font-extrabold text-[#15803D]">
                Maksimal
              </span>
            </div>
            <span className="text-[11px] text-[#15803D] font-medium block mt-1">
              PIN 4-digit &amp; RBAC Enforced
            </span>
          </div>
        </div>

        {/* =========================================================================
            3. FILTER TOOLBAR & USER TABLE (Figma 6:5980)
           ========================================================================= */}
        <div className="p-4 rounded-2xl bg-white border border-[#CBD5E1] shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="w-full md:w-80 relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama karyawan, username, email..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#CBD5E1] text-[13px] text-[#0B1C30] placeholder-[#5B403D]/60 focus:outline-none focus:border-[#A24F9D]"
            />
            <span className="absolute left-3 top-2.5 text-[#5B403D]/60">
              <IconSearch size={16} />
            </span>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-3 py-2 rounded-xl border border-[#CBD5E1] text-[12px] font-semibold text-[#0B1C30] bg-white cursor-pointer"
            >
              <option value="all">Semua Role Pengguna</option>
              <option value="Owner">Owner</option>
              <option value="Kasir Gerai">Kasir Gerai</option>
              <option value="Staf Dapur">Staf Dapur</option>
            </select>
          </div>
        </div>

        {/* User Table */}
        <div className="rounded-2xl bg-white border border-[#CBD5E1] shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-[#FAF7F2] border-b border-[#CBD5E1] text-[#5B403D]">
                <tr>
                  <th className="py-3 px-4 font-bold">PENGGUNA &amp; USERNAME</th>
                  <th className="py-3 px-4 font-bold">ROLE &amp; OTORITAS</th>
                  <th className="py-3 px-4 font-bold">OUTLET PENUGASAN</th>
                  <th className="py-3 px-4 font-bold">HAK AKSES SISTEM</th>
                  <th className="py-3 px-4 font-bold">SESI &amp; AKTIVITAS</th>
                  <th className="py-3 px-4 font-bold text-center">STATUS</th>
                  <th className="py-3 px-4 font-bold text-center">AKSI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-[#FFF7ED]/30 transition-colors">
                    {/* User */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#FBF4F9] text-[#732662] border border-[#732662]/20 flex items-center justify-center font-extrabold text-sm shrink-0">
                          {u.name[0]}
                        </div>
                        <div>
                          <div className="font-bold text-[#0B1C30]">{u.name}</div>
                          <div className="text-[11px] font-mono text-[#5B403D]/70">@{u.username}</div>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                          u.role === 'Owner'
                            ? 'bg-[#5B3765] text-white'
                            : u.role === 'Kasir Gerai'
                            ? 'bg-[#A24F9D] text-white'
                            : 'bg-[#FEF3C7] text-[#92400E]'
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>

                    {/* Outlet */}
                    <td className="py-3.5 px-4 text-[#5B403D] font-medium">
                      {u.outlet}
                    </td>

                    {/* Permissions */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {u.permissions.map((p, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#F1F5F9] text-[#475569]"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Activity */}
                    <td className="py-3.5 px-4 text-[12px]">
                      <div className="flex items-center gap-1.5">
                        {u.isOnline && (
                          <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
                        )}
                        <span className={u.isOnline ? 'font-bold text-[#15803D]' : 'text-[#5B403D]'}>
                          {u.lastActive}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 text-center">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#DCFCE7] text-[#15803D] border border-[#16A34A]/30">
                        {u.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-center">
                      {u.role !== 'Owner' ? (
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => {
                              setSelectedUser(u);
                              setIsResetPinOpen(true);
                            }}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-bold border border-[#CBD5E1] text-[#0B1C30] hover:bg-[#F8FAFC] cursor-pointer"
                          >
                            Reset PIN
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-[#94A3B8] italic">Master</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* =========================================================================
            4. MODAL TAMBAH AKUN KARYAWAN
           ========================================================================= */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl border border-[#CBD5E1] animate-scale-in">
              <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4 mb-4">
                <h3 className="font-extrabold text-base text-[#0B1C30]">
                  Tambah Akun Karyawan Baru
                </h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 rounded-lg text-[#5B403D] hover:bg-slate-100"
                >
                  <IconClose size={20} />
                </button>
              </div>

              <form onSubmit={handleAddUser} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-[#334155] mb-1">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Contoh: Rian Pratama"
                    className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#334155] mb-1">Username POS *</label>
                    <input
                      type="text"
                      required
                      value={formUsername}
                      onChange={(e) => setFormUsername(e.target.value)}
                      placeholder="rian.kasir"
                      className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#334155] mb-1">Role Jabatan *</label>
                    <select
                      value={formRole}
                      onChange={(e) => setFormRole(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] font-bold"
                    >
                      <option value="Kasir Gerai">Kasir Gerai</option>
                      <option value="Staf Dapur">Staf Dapur</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#334155] mb-1">Email / Kontak</label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="karyawan@cirengcangkeling.id"
                    className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#334155] mb-1">Penugasan Outlet *</label>
                  <select
                    value={formOutlet}
                    onChange={(e) => setFormOutlet(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1]"
                  >
                    <option value="Outlet Kaliurang KM 5.2">Outlet Kaliurang KM 5.2</option>
                    <option value="Outlet Kaliurang KM 9.2">Outlet Kaliurang KM 9.2</option>
                    <option value="Dapur Sentral KM 5.2">Dapur Sentral KM 5.2</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#334155] mb-1">
                    PIN POS 4-Digit (Digunakan untuk Login Kasir) *
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    required
                    value={formPin}
                    onChange={(e) => setFormPin(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] font-mono text-center tracking-widest text-lg font-bold text-[#A24F9D]"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-2 border-t border-[#F1F5F9]">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-[#CBD5E1] font-bold text-[#475569]"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#A24F9D] hover:bg-[#8F3D8A] text-white font-bold"
                  >
                    Simpan Akun
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL RESET PIN */}
        {isResetPinOpen && selectedUser && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl border border-[#CBD5E1] animate-scale-in">
              <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4 mb-4">
                <h3 className="font-extrabold text-base text-[#0B1C30]">
                  Reset PIN: {selectedUser.name}
                </h3>
                <button
                  onClick={() => setIsResetPinOpen(false)}
                  className="p-1 rounded-lg text-[#5B403D] hover:bg-slate-100"
                >
                  <IconClose size={20} />
                </button>
              </div>

              <form onSubmit={handleResetPinSubmit} className="space-y-4 text-xs">
                <p className="text-[#5B403D]">
                  Masukkan 4-digit PIN baru untuk staf kasir <strong>{selectedUser.name}</strong> (@{selectedUser.username}):
                </p>

                <div>
                  <input
                    type="password"
                    maxLength={4}
                    defaultValue="1234"
                    required
                    className="w-full px-3 py-2.5 rounded-xl border border-[#CBD5E1] font-mono text-center tracking-widest text-xl font-bold text-[#A24F9D]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t border-[#F1F5F9]">
                  <button
                    type="button"
                    onClick={() => setIsResetPinOpen(false)}
                    className="px-4 py-2 rounded-xl border border-[#CBD5E1] font-bold text-[#475569]"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#A24F9D] hover:bg-[#8F3D8A] text-white font-bold"
                  >
                    Update PIN
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
