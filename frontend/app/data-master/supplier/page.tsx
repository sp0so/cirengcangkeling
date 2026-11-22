'use client';

import React, { useState } from 'react';
import AppShell from '../../components/AppShell';
import { useApp } from '../../lib/context';
import {
  IconSupplier,
  IconPlus,
  IconSearch,
  IconClose,
} from '../../components/Icons';

export default function DataSupplierPage() {
  const { suppliers, addSupplier } = useApp();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [materialsStr, setMaterialsStr] = useState('');

  const filtered = suppliers.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.contactPerson.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addSupplier({
      name,
      contactPerson,
      phone,
      address,
      materials: materialsStr.split(',').map((m) => m.trim()).filter(Boolean),
    });
    setIsModalOpen(false);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#833E17] uppercase tracking-wider">
                Data Master
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30] tracking-tight">
              Data Mitra Pemasok (Supplier)
            </h2>
            <p className="text-sm text-[#5B403D]">
              Daftar rekanan pengadaan bahan mentah, bumbu, minyak, dan kemasan outlet Cireng Cangkeling.
            </p>
          </div>

          <button
            onClick={() => {
              setName('');
              setContactPerson('');
              setPhone('');
              setAddress('');
              setMaterialsStr('');
              setIsModalOpen(true);
            }}
            className="btn-primary text-xs sm:text-sm self-start sm:self-auto"
          >
            <IconPlus size={16} />
            <span>Tambah Supplier</span>
          </button>
        </div>

        {/* Search */}
        <div className="p-4 rounded-2xl bg-white border border-[#CBD5E1] shadow-card flex items-center justify-between">
          <div className="w-full max-w-sm relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama pemasok atau kontak person..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#CBD5E1] text-xs sm:text-sm text-[#0B1C30] focus:outline-none focus:border-[#732662]"
            />
            <span className="absolute left-3 top-2.5 text-[#5B403D]/60">
              <IconSearch size={16} />
            </span>
          </div>
        </div>

        {/* Supplier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((sup) => (
            <div
              key={sup.id}
              className="p-5 rounded-2xl bg-white border border-[#CBD5E1] shadow-card card-hover flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#732662] bg-[#FBF4F9] px-2 py-0.5 rounded-full border border-[#732662]/20">
                    Mitra Terdaftar
                  </span>
                </div>
                <h3 className="font-extrabold text-base text-[#0B1C30]">{sup.name}</h3>
                <p className="text-xs text-[#5B403D] mt-1">
                  Kontak Person: <strong>{sup.contactPerson}</strong>
                </p>
                <p className="text-xs text-[#5B403D]">
                  Telepon: <span className="font-mono text-[#0B1C30] font-semibold">{sup.phone}</span>
                </p>
                <p className="text-xs text-[#5B403D] mt-2 line-clamp-2">
                  Alamat: {sup.address}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F1F5F9]">
                <span className="text-[11px] font-bold text-[#334155] block mb-1.5">
                  Bahan Pasokan:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {sup.materials.map((mat, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#FFF7ED] text-[#833E17] border border-[#FFDBCC]"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Add Supplier */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-alert border border-[#CBD5E1] p-6 space-y-4 animate-scale-in">
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <h3 className="text-lg font-bold text-[#0B1C30]">Tambah Mitra Pemasok Baru</h3>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-[#5B403D] hover:text-[#0B1C30]"
                >
                  <IconClose size={20} />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-1">
                    Nama Badan Usaha / Toko Pemasok *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="CV Sumber Rasa Makmur"
                    className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] text-xs text-[#0B1C30]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#334155] mb-1">
                      Nama Penanggung Jawab *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      placeholder="Bpk. Budi Santoso"
                      className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] text-xs text-[#0B1C30]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#334155] mb-1">
                      Nomor Telepon / WhatsApp *
                    </label>
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0812-3456-7890"
                      className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] text-xs font-mono text-[#0B1C30]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-1">
                    Alamat Lengkap
                  </label>
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Jl. Margomulyo No. 45, Surabaya"
                    className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] text-xs text-[#0B1C30]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-1">
                    Bahan yang Disediakan (Pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    value={materialsStr}
                    onChange={(e) => setMaterialsStr(e.target.value)}
                    placeholder="Tepung Tapioka, Bumbu Tabur, Minyak Goreng"
                    className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] text-xs text-[#0B1C30]"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-[#F1F5F9]">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn-secondary text-xs"
                  >
                    Batal
                  </button>
                  <button type="submit" className="btn-primary text-xs">
                    Simpan Supplier
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

