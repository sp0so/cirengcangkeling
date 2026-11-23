'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppShell from '../../components/AppShell';
import { useApp } from '../../lib/context';
import { Expense } from '../../lib/types';
import {
  IconFinance,
  IconPlus,
  IconClose,
  IconTrash,
  IconSearch,
  IconCheckCircle,
  IconDownload,
} from '../../components/Icons';

export default function PengeluaranUsahaOwnerPage() {
  const { expenses, addExpense, currentUser, showToast } = useApp();

  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterPeriod, setFilterPeriod] = useState<string>('month');
  const [filterPayment, setFilterPayment] = useState<string>('all');

  // Form states for Quick Expense
  const [formCategory, setFormCategory] = useState<Expense['category']>('Bahan Baku');
  const [formDesc, setFormDesc] = useState('');
  const [formAmount, setFormAmount] = useState<number>(0);
  const [formSource, setFormSource] = useState<'Kas Tunai Gerai' | 'Rekening Bank BRI'>('Kas Tunai Gerai');
  const [formDate, setFormDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [formTime, setFormTime] = useState<string>('14:30');

  // Dynamic user-entered expenses
  const allExpenses = expenses.map((e, idx) => ({
    ...e,
    code: `#EXP-${e.date.substring(0, 7).replace('-', '')}-0${String(idx + 1).padStart(3, '0')}`,
    source: e.category === 'Bahan Baku' ? 'Kas Tunai Gerai' : 'Rekening Bank BRI',
    hasReceipt: true,
  }));

  const totalExpense = allExpenses.reduce((sum, e) => sum + e.amount, 0);
  const bahanBakuExpense = allExpenses
    .filter((e) => e.category === 'Bahan Baku')
    .reduce((sum, e) => sum + e.amount, 0);
  const opexExpense = allExpenses
    .filter((e) => e.category === 'Operasional')
    .reduce((sum, e) => sum + e.amount, 0);
  const gajiExpense = allExpenses
    .filter((e) => e.category === 'Gaji Karyawan')
    .reduce((sum, e) => sum + e.amount, 0);

  const filteredExpenses = allExpenses.filter((e) => {
    const matchSearch =
      e.description.toLowerCase().includes(search.toLowerCase()) ||
      e.code.toLowerCase().includes(search.toLowerCase()) ||
      e.recordedBy.toLowerCase().includes(search.toLowerCase());

    const matchCategory = filterCategory === 'all' || e.category === filterCategory;
    const matchPayment = filterPayment === 'all' || e.source.toLowerCase().includes(filterPayment.toLowerCase());

    return matchSearch && matchCategory && matchPayment;
  });

  const handleSaveExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formDesc.trim() || formAmount <= 0) {
      alert('Harap isi keterangan dan nominal pengeluaran secara valid!');
      return;
    }

    addExpense({
      category: formCategory,
      description: formDesc,
      amount: Number(formAmount),
      date: `${formDate}T${formTime}:00Z`,
      recordedBy: currentUser.name,
    });

    showToast(`Pengeluaran Rp ${Number(formAmount).toLocaleString('id-ID')} berhasil dicatat!`, 'success');
    setFormDesc('');
    setFormAmount(0);
  };

  return (
    <AppShell>
      <div className="space-y-6 font-sans">
        {/* =========================================================================
            1. BREADCRUMB & HEADER (Figma 6:4482)
           ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#5B403D] mb-1">
              <Link href="/dashboard" className="hover:text-[#A24F9D] transition-colors">
                Dashboard
              </Link>
              <span>/</span>
              <span className="font-bold text-[#0B1C30]">Keuangan &amp; Pengeluaran</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30] tracking-tight">
              Pengeluaran Usaha &amp; Catatan Belanja Operasional
            </h1>
            <p className="text-[13px] text-[#5B403D] mt-0.5">
              Pencatatan pos pengeluaran kas kecil gerai, belanja bahan baku di pasar, token listrik, dan gaji karyawan.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                const el = document.getElementById('form-catat-pengeluaran');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-xl bg-[#A24F9D] hover:bg-[#8F3D8A] text-white text-[13px] font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <IconPlus size={15} />
              <span>+ Catat Pengeluaran Baru</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            2. 4 SUMMARY METRIC CARDS (Figma 6:4498)
           ========================================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {/* Card 1: Total Pengeluaran */}
          <div className="p-4 rounded-2xl bg-white border border-[#CBD5E1] shadow-card">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#93000A] block">
              TOTAL PENGELUARAN BULAN INI
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#BA1A1A]">
                Rp {totalExpense.toLocaleString('id-ID')}
              </span>
            </div>
            <span className="text-[11px] text-[#5B403D] font-medium block mt-1">
              {allExpenses.length} Pos Pembayaran Terdata
            </span>
          </div>

          {/* Card 2: Bahan Baku COGS */}
          <div className="p-4 rounded-2xl bg-white border border-[#CBD5E1] shadow-card">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#833E17] block">
              BELANJA BAHAN BAKU (COGS)
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30]">
                Rp {bahanBakuExpense.toLocaleString('id-ID')}
              </span>
            </div>
            <span className="text-[11px] text-[#16A34A] font-medium block mt-1">
              ~55% dari total belanja toko
            </span>
          </div>

          {/* Card 3: Biaya Operasional OPEX */}
          <div className="p-4 rounded-2xl bg-white border border-[#CBD5E1] shadow-card">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E40AF] block">
              BIAYA OPERASIONAL (OPEX)
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30]">
                Rp {opexExpense.toLocaleString('id-ID')}
              </span>
            </div>
            <span className="text-[11px] text-[#5B403D] font-medium block mt-1">
              Listrik, Gas LPG &amp; Plastik Pouch
            </span>
          </div>

          {/* Card 4: Tenaga Kerja / Gaji */}
          <div className="p-4 rounded-2xl bg-white border border-[#CBD5E1] shadow-card">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B403D] block">
              BIAYA TENAGA KERJA / GAJI
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30]">
                Rp {gajiExpense.toLocaleString('id-ID')}
              </span>
            </div>
            <span className="text-[11px] text-[#5B403D] font-medium block mt-1">
              2 Staf Gerai Kasir &amp; Dapur
            </span>
          </div>
        </div>

        {/* =========================================================================
            3. TWO-COLUMN MAIN GRID: EXPENSE TABLE (68%) & FORMULIR CEPAT (32%)
               (Figma 6:4520)
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* KOLOM KIRI (LEBAR ~ 68% / 8 KOLOM GRID DESKTOP) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Filter Toolbar */}
            <div className="p-4 rounded-2xl bg-white border border-[#CBD5E1] shadow-card flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="w-full md:w-64 relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari nomor bukti, keperluan..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-[#CBD5E1] text-[12px] text-[#0B1C30] placeholder-[#5B403D]/60 focus:outline-none focus:border-[#A24F9D]"
                />
                <span className="absolute left-2.5 top-2 text-[#5B403D]/60">
                  <IconSearch size={14} />
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-2.5 py-1.5 rounded-xl border border-[#CBD5E1] text-[12px] font-semibold text-[#0B1C30] bg-white cursor-pointer"
                >
                  <option value="all">Semua Kategori</option>
                  <option value="Bahan Baku">Bahan Baku</option>
                  <option value="Operasional">Operasional</option>
                  <option value="Gaji">Gaji &amp; Upah</option>
                  <option value="Lainnya">Lainnya</option>
                </select>

                <select
                  value={filterPayment}
                  onChange={(e) => setFilterPayment(e.target.value)}
                  className="px-2.5 py-1.5 rounded-xl border border-[#CBD5E1] text-[12px] font-semibold text-[#0B1C30] bg-white cursor-pointer"
                >
                  <option value="all">Semua Kas/Bank</option>
                  <option value="Kas Tunai">Kas Laci Tunai</option>
                  <option value="Bank BRI">Bank BRI</option>
                </select>
              </div>
            </div>

            {/* Detailed Expenses Table */}
            <div className="rounded-2xl bg-white border border-[#CBD5E1] shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[13px]">
                  <thead className="bg-[#FAF7F2] border-b border-[#CBD5E1] text-[#5B403D]">
                    <tr>
                      <th className="py-3 px-4 font-bold">NO. BUKTI</th>
                      <th className="py-3 px-4 font-bold">TANGGAL &amp; JAM</th>
                      <th className="py-3 px-4 font-bold">RINCIAN PENGELUARAN</th>
                      <th className="py-3 px-4 font-bold">KATEGORI</th>
                      <th className="py-3 px-4 font-bold">SUMBER DANA</th>
                      <th className="py-3 px-4 font-bold text-right">NOMINAL</th>
                      <th className="py-3 px-4 font-bold text-center">BUKTI</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F5F9]">
                    {filteredExpenses.length > 0 ? (
                      filteredExpenses.map((exp) => (
                        <tr key={exp.id} className="hover:bg-[#FFF7ED]/30 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-[12px] text-[#A24F9D]">
                            {exp.code}
                          </td>
                          <td className="py-3.5 px-4 text-[12px] text-[#5B403D]">
                            {exp.date.replace('T', ' ').substring(0, 16)}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-[#0B1C30]">{exp.description}</div>
                            <div className="text-[11px] text-[#5B403D]/70">Pencatat: {exp.recordedBy}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#F1F5F9] text-[#475569]">
                              {exp.category}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-[12px] font-medium text-[#0B1C30]">
                            {exp.source}
                          </td>
                          <td className="py-3.5 px-4 text-right font-extrabold text-[#BA1A1A]">
                            Rp {exp.amount.toLocaleString('id-ID')}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            {exp.hasReceipt ? (
                              <span className="text-[11px] font-bold text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded-md">
                                Ada Nota
                              </span>
                            ) : (
                              <span className="text-[11px] text-[#94A3B8]">
                                -
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="py-10 text-center text-[#5B403D]">
                          <p className="font-bold text-[14px] text-[#0B1C30]">Belum ada pencatatan pengeluaran</p>
                          <p className="text-[12px] text-[#5B403D] mt-1 max-w-sm mx-auto">
                            Gunakan formulir cepat di samping untuk mencatat belanja bahan baku, operasional harian, atau kas kecil gerai.
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-[#FAF7F2] border-t border-[#CBD5E1] text-[12px] text-[#5B403D] flex items-center justify-between">
                <span>Menampilkan {filteredExpenses.length} dari {allExpenses.length} catatan pengeluaran</span>
                <span className="font-bold text-[#0B1C30]">
                  Total Rincian: Rp {filteredExpenses.reduce((s, e) => s + e.amount, 0).toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN (LEBAR ~ 32% / 4 KOLOM GRID DESKTOP) */}
          <div className="lg:col-span-4 space-y-6">
            {/* FORMULIR CEPAT: CATAT PENGELUARAN KAS KECIL */}
            <div id="form-catat-pengeluaran" className="p-5 sm:p-6 rounded-2xl bg-white border border-[#CBD5E1] shadow-card space-y-4">
              <div className="border-b border-[#F1F5F9] pb-3">
                <span className="text-[11px] font-bold text-[#A24F9D] tracking-wider uppercase block">
                  FORMULIR CEPAT
                </span>
                <h2 className="text-base font-extrabold text-[#0B1C30]">
                  Catat Pengeluaran Kas Kecil
                </h2>
                <p className="text-[12px] text-[#5B403D] mt-0.5">
                  Input transaksi belanja mendadak di pasar atau pengeluaran harian gerai.
                </p>
              </div>

              <form onSubmit={handleSaveExpense} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-[#334155] mb-1">Tanggal</label>
                    <input
                      type="date"
                      required
                      value={formDate}
                      onChange={(e) => setFormDate(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-xl border border-[#CBD5E1]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#334155] mb-1">Jam</label>
                    <input
                      type="time"
                      required
                      value={formTime}
                      onChange={(e) => setFormTime(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-xl border border-[#CBD5E1]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#334155] mb-1">Kategori Biaya *</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] font-semibold text-[#0B1C30]"
                  >
                    <option value="Bahan Baku">Bahan Baku Segar Pasar (Cabai, Bawang, Daun Bawang)</option>
                    <option value="Operasional">Operasional Gerai (Gas, Listrik, Es Batu, Kemasan)</option>
                    <option value="Gaji">Gaji &amp; Uang Makan Karyawan</option>
                    <option value="Lainnya">Lain-lain / Biaya Tak Terduga</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#334155] mb-1">Nominal (Rupiah) *</label>
                  <input
                    type="number"
                    required
                    min={500}
                    step={500}
                    value={formAmount}
                    onChange={(e) => setFormAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] font-extrabold text-[16px] text-[#BA1A1A] focus:outline-none focus:border-[#A24F9D]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#334155] mb-1">Pilihan Sumber Dana *</label>
                  <select
                    value={formSource}
                    onChange={(e) => setFormSource(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] font-semibold"
                  >
                    <option value="Kas Tunai Gerai">Kas Laci Gerai (Uang Tunai Fisik)</option>
                    <option value="Rekening Bank BRI">Rekening Bank BRI (Transfer / QRIS)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#334155] mb-1">Keperluan / Keterangan Belanja *</label>
                  <textarea
                    rows={2}
                    required
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    placeholder="Contoh: Beli daun bawang 3 ikat + es batu kristal 2 bal..."
                    className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] text-xs resize-none"
                  />
                </div>

                <div className="p-3 border border-dashed border-[#CBD5E1] rounded-xl text-center bg-[#F8FAFC]">
                  <span className="text-[11px] text-[#5B403D] block">
                    📎 Lampiran Bukti Nota / Kwitansi (Opsional)
                  </span>
                  <span className="text-[10px] text-[#94A3B8]">
                    Format JPG, PNG, PDF maks 5MB
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#A24F9D] hover:bg-[#8F3D8A] text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
                >
                  Simpan Pengeluaran
                </button>
              </form>
            </div>

            {/* VISUAL ALOKASI BIAYA & FINANCIAL INSIGHT */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#CBD5E1] shadow-card space-y-4">
              <div className="border-b border-[#F1F5F9] pb-2">
                <span className="text-[11px] font-bold text-[#833E17] uppercase tracking-wider block">
                  PROPORSI PENGELUARAN
                </span>
                <h3 className="text-sm font-extrabold text-[#0B1C30]">
                  Alokasi Biaya Bulan Ini
                </h3>
              </div>

              {/* Stacked Bar Visual */}
              <div className="w-full h-4 rounded-full overflow-hidden flex">
                <div style={{ width: '55%' }} className="bg-[#A24F9D]" title="Bahan Baku 55%" />
                <div style={{ width: '23%' }} className="bg-[#3B82F6]" title="OPEX 23%" />
                <div style={{ width: '22%' }} className="bg-[#F59E0B]" title="Gaji 22%" />
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[#5B403D]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#A24F9D]" />
                    <span>Bahan Baku (COGS)</span>
                  </span>
                  <span className="font-bold text-[#0B1C30]">55% (Rp 10.050.000)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[#5B403D]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
                    <span>Biaya Operasional (OPEX)</span>
                  </span>
                  <span className="font-bold text-[#0B1C30]">23% (Rp 4.200.000)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[#5B403D]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                    <span>Gaji Tenaga Kerja</span>
                  </span>
                  <span className="font-bold text-[#0B1C30]">22% (Rp 4.000.000)</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FFF7ED] border border-[#CBD5E1] text-[11px] text-[#5B403D] space-y-1">
                <span className="font-bold text-[#833E17] block">💡 Edukasi Insight Finansial UMKM:</span>
                <p>
                  Biaya bahan baku menyumbang 55% pengeluaran. Selalu pantau fluktuasi harga tepung tapioka dan minyak goreng di pasar agar margin keuntungan bersih produk olahan cireng tetap di atas 35%.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
