'use client';

import React, { useState } from 'react';
import AppShell from '../../components/AppShell';
import { useApp } from '../../lib/context';
import {
  IconUpload,
  IconCheckCircle,
  IconClose,
  IconMarketplace,
} from '../../components/Icons';

export default function ImportMarketplacePage() {
  const { importMarketplaceReport } = useApp();

  const [platform, setPlatform] = useState<'Shopee' | 'Tokopedia' | 'TikTok Shop'>('Shopee');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadState, setUploadState] = useState<'idle' | 'validating' | 'preview' | 'imported'>('idle');
  const [validationStep, setValidationStep] = useState(0);

  const validationSteps = [
    'File laporan diterima oleh sistem',
    'Memvalidasi format spreadsheet (.xlsx / .csv)',
    'Membaca struktur kolom laporan marketplace',
    'Mengekstrak data transaksi & identitas pembeli',
    'Memeriksa potensi duplikasi ID pesanan',
    'Menyiapkan pratinjau data impor',
  ];

  const simulatedPreviewOrders = [
    { id: 'ORD-261114-01', customer: 'Anisa Rahmawati', product: 'Cireng Frozen Pack Original (10 pcs)', qty: 2, total: 36000 },
    { id: 'ORD-261114-02', customer: 'Rizky Pratama', product: 'Cireng Frozen Pack Keju (10 pcs)', qty: 3, total: 66000 },
    { id: 'ORD-261114-03', customer: 'Siti Nurhaliza', product: 'Cireng Frozen Pack Original (10 pcs)', qty: 4, total: 72000 },
    { id: 'ORD-261114-04', customer: 'Hendra Gunawan', product: 'Cireng Bumbu Rujak Kemasan Frozen', qty: 2, total: 40000 },
  ];

  const totalPreviewAmount = simulatedPreviewOrders.reduce((sum, o) => sum + o.total, 0);

  const handleStartProcess = () => {
    setUploadState('validating');
    setValidationStep(0);

    const interval = setInterval(() => {
      setValidationStep((prev) => {
        if (prev >= validationSteps.length - 1) {
          clearInterval(interval);
          setUploadState('preview');
          return prev;
        }
        return prev + 1;
      });
    }, 400);
  };

  const handleConfirmImport = async () => {
    await importMarketplaceReport(platform, selectedFile ? selectedFile.name : `Laporan_${platform}_Nov2026.xlsx`, simulatedPreviewOrders.length, totalPreviewAmount);
    setUploadState('imported');
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#833E17] uppercase tracking-wider">
                Marketplace & Omnichannel
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30] tracking-tight">
              Import Laporan Penjualan Marketplace
            </h2>
            <p className="text-sm text-[#5B403D]">
              Unggah file rekapan transaksi dari platform Shopee, Tokopedia, atau TikTok Shop untuk konsolidasi omzet usaha.
            </p>
          </div>
        </div>

        {/* Critical Business Rule Warning Box */}
        <div className="p-4 rounded-2xl bg-[#E5EEFF] border border-[#CBD5E1] text-xs text-[#0B1C30] flex items-start gap-3">
          <span className="text-base">💡</span>
          <div className="space-y-1">
            <span className="font-bold block">Ketentuan Bisnis Import Marketplace (PRD & SRS):</span>
            <p className="text-[#5B403D] leading-relaxed">
              Import laporan marketplace adalah pencatatan histori omzet manual. Mengimpor transaksi marketplace <strong>TIDAK AKAN</strong> memotong stok fisik aktif di toko secara otomatis, guna menghindari selisih inventaris riil di gerai.
            </p>
          </div>
        </div>

        {/* Upload Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-[#CBD5E1] shadow-card space-y-4">
            <h3 className="font-bold text-base text-[#0B1C30]">
              1. Konfigurasi Unggah File
            </h3>

            {/* Platform Selector */}
            <div>
              <label className="block text-xs font-bold text-[#334155] mb-2">
                Pilih Platform Penjualan *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Shopee', 'Tokopedia', 'TikTok Shop'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      setPlatform(p);
                      setUploadState('idle');
                    }}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                      platform === p
                        ? 'bg-[#732662] text-white border-[#732662] shadow-xs'
                        : 'bg-[#F8FAFC] text-[#475569] border-[#CBD5E1] hover:bg-slate-100'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Drag & Drop Box */}
            <div>
              <label className="block text-xs font-bold text-[#334155] mb-2">
                File Laporan (.xlsx / .csv) *
              </label>
              <div
                onClick={() => {
                  setSelectedFile(new File([''], `Laporan_Pesanan_${platform}_Nov2026.xlsx`));
                  setUploadState('idle');
                }}
                className="border-2 border-dashed border-[#CBD5E1] hover:border-[#732662] bg-[#FAF7F2] p-8 rounded-2xl text-center cursor-pointer transition-colors space-y-2"
              >
                <div className="w-12 h-12 rounded-full bg-white text-[#732662] mx-auto flex items-center justify-center shadow-xs">
                  <IconUpload size={22} />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-[#0B1C30]">
                    {selectedFile ? selectedFile.name : 'Klik untuk memilih file laporan'}
                  </span>
                  <p className="text-[#5B403D] text-[11px] mt-0.5">
                    Mendukung format laporan standar penyelesaian pesanan {platform}
                  </p>
                </div>
              </div>
            </div>

            {selectedFile && uploadState === 'idle' && (
              <button
                type="button"
                onClick={handleStartProcess}
                className="w-full btn-primary text-xs"
              >
                <span>Mulai Validasi & Ekstraksi</span>
              </button>
            )}

            {/* Step-by-Step Validation Feedback */}
            {uploadState === 'validating' && (
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#CBD5E1] space-y-2 animate-fade-in">
                <span className="text-xs font-bold text-[#0B1C30] block">
                  Proses Validasi Laporan Berjalan...
                </span>
                <div className="space-y-1.5 text-xs">
                  {validationSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-2 ${
                        idx <= validationStep
                          ? 'text-[#15803D] font-bold'
                          : 'text-[#94A3B8]'
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] border border-current">
                        {idx < validationStep ? '✓' : idx === validationStep ? '●' : idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Preview & Confirm (7 cols) */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-[#CBD5E1] shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
              <h3 className="font-bold text-base text-[#0B1C30]">
                2. Pratinjau Data Impor
              </h3>
              {uploadState === 'preview' && (
                <span className="text-xs font-bold text-[#15803D] bg-[#DCFCE7] px-2.5 py-0.5 rounded-full">
                  Validasi Sukses (0 Duplikasi)
                </span>
              )}
            </div>

            {uploadState === 'preview' ? (
              <div className="space-y-4 animate-fade-in">
                <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#CBD5E1] flex justify-between items-center text-xs">
                  <span>Total Pesanan Divalidasi: <strong>{simulatedPreviewOrders.length} Transaksi</strong></span>
                  <span className="font-bold text-[#732662] text-sm">
                    Total Omzet: Rp {totalPreviewAmount.toLocaleString('id-ID')}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#CBD5E1] text-[#5B403D]">
                        <th className="py-2 px-2 font-bold">ID Pesanan</th>
                        <th className="py-2 px-2 font-bold">Nama Pembeli</th>
                        <th className="py-2 px-2 font-bold">Produk</th>
                        <th className="py-2 px-2 font-bold text-center">Qty</th>
                        <th className="py-2 px-2 font-bold text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9]">
                      {simulatedPreviewOrders.map((ord) => (
                        <tr key={ord.id}>
                          <td className="py-2.5 px-2 font-mono font-bold text-[#732662]">{ord.id}</td>
                          <td className="py-2.5 px-2">{ord.customer}</td>
                          <td className="py-2.5 px-2 font-medium">{ord.product}</td>
                          <td className="py-2.5 px-2 text-center">{ord.qty}</td>
                          <td className="py-2.5 px-2 text-right font-bold text-[#0B1C30]">
                            Rp {ord.total.toLocaleString('id-ID')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setUploadState('idle')}
                    className="btn-secondary text-xs"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmImport}
                    className="btn-primary text-xs"
                  >
                    <IconCheckCircle size={16} />
                    <span>Konfirmasi Simpan ke Master Penjualan</span>
                  </button>
                </div>
              </div>
            ) : uploadState === 'imported' ? (
              <div className="p-8 text-center space-y-3 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-[#DCFCE7] text-[#15803D] mx-auto flex items-center justify-center">
                  <IconCheckCircle size={28} />
                </div>
                <h4 className="font-extrabold text-base text-[#15803D]">
                  Laporan Berhasil Disimpan!
                </h4>
                <p className="text-xs text-[#5B403D] max-w-sm mx-auto">
                  Data penjualan marketplace {platform} telah tercatat di master laporan tanpa mengurangi stok fisik gerai.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSelectedFile(null);
                      setUploadState('idle');
                    }}
                    className="btn-secondary text-xs"
                  >
                    Unggah File Laporan Lain
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-xs text-[#5B403D]">
                Silakan pilih platform dan file laporan di sebelah kiri untuk melihat pratinjau data.
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

