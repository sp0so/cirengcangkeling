'use client';

import React, { useState } from 'react';
import AppShell from '../../components/AppShell';
import { useApp } from '../../lib/context';
import {
  marketplaceService,
  MarketplaceOrderRecord,
  MarketplaceParseError,
} from '../../lib/services';
import {
  IconUpload,
  IconCheckCircle,
  IconClose,
  IconMarketplace,
} from '../../components/Icons';

export default function ImportMarketplacePage() {
  const { importMarketplaceReport, showToast } = useApp();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [platform, setPlatform] = useState<'GoFood' | 'GrabFood' | 'ShopeeFood' | 'Shopee'>('ShopeeFood');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadState, setUploadState] = useState<'idle' | 'validating' | 'preview' | 'imported'>('idle');
  const [validationStep, setValidationStep] = useState(0);
  const [parsedRecords, setParsedRecords] = useState<MarketplaceOrderRecord[]>([]);
  const [parseErrors, setParseErrors] = useState<MarketplaceParseError[]>([]);
  const [fileError, setFileError] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);

  const validationSteps = [
    'File laporan diterima oleh sistem',
    'Memvalidasi format file CSV (UTF-8)',
    'Membaca struktur kolom laporan marketplace',
    'Mengekstrak data transaksi & identitas pembeli',
    'Memeriksa potensi duplikasi ID pesanan',
    'Menyiapkan pratinjau data impor',
  ];

  const totalPreviewAmount = parsedRecords.reduce((sum, o) => sum + o.netAmount, 0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setParsedRecords([]);
      setParseErrors([]);
      setFileError('');
      setUploadState('idle');
    }
  };

  const handleStartProcess = async () => {
    if (!selectedFile) {
      setFileError('Silakan pilih file laporan CSV terlebih dahulu.');
      return;
    }

    const lowerName = selectedFile.name.toLowerCase();
    if (lowerName.endsWith('.xlsx') || lowerName.endsWith('.xls')) {
      setFileError(
        'Format biner Excel (.xlsx/.xls) belum didukung langsung oleh browser. Silakan simpan/ekspor laporan Anda ke format .csv (UTF-8 Comma/Semicolon Delimited) dari Excel atau dashboard marketplace.'
      );
      return;
    }

    if (!lowerName.endsWith('.csv') && !lowerName.endsWith('.txt')) {
      setFileError('Format file tidak didukung. Harap unggah file berekstensi .csv.');
      return;
    }

    setFileError('');
    setUploadState('validating');
    setValidationStep(0);

    try {
      const content = await selectedFile.text();
      const platformKey = platform.toLowerCase() as 'gofood' | 'grabfood' | 'shopeefood' | 'shopee';
      const result = marketplaceService.parseReportCSV(content, platformKey);

      setParsedRecords(result.records);
      setParseErrors(result.errors);

      if (result.records.length === 0) {
        const firstReason = result.errors[0]?.reason || 'Tidak ditemukan baris transaksi yang valid pada file CSV.';
        setFileError(firstReason);
        setUploadState('idle');
        showToast(firstReason, 'error');
        return;
      }

      setValidationStep(validationSteps.length - 1);
      setUploadState('preview');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Gagal membaca isi file.';
      setFileError(msg);
      setUploadState('idle');
      showToast(msg, 'error');
    }
  };

  const handleConfirmImport = async () => {
    if (!selectedFile || parsedRecords.length === 0) return;
    setIsSaving(true);
    try {
      await importMarketplaceReport(platform, selectedFile.name, selectedFile.size, parsedRecords);
      setUploadState('imported');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Gagal menyimpan laporan marketplace.';
      showToast(msg, 'error');
    } finally {
      setIsSaving(false);
    }
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
              Unggah file rekapan transaksi dari platform GoFood, GrabFood, ShopeeFood, atau Shopee untuk konsolidasi omzet usaha.
            </p>
          </div>
        </div>

        {/* Critical Business Rule Warning Box */}
        <div className="p-4 rounded-2xl bg-[#E5EEFF] border border-[#CBD5E1] text-xs text-[#0B1C30] flex items-start gap-3">
          <span className="text-base">💡</span>
          <div className="space-y-1">
            <span className="font-bold block">Ketentuan Bisnis Import Marketplace (PRD & SRS):</span>
            <p className="text-[#5B403D] leading-relaxed">
              Import laporan marketplace adalah pencatatan histori omzet manual. Mengimpor transaksi marketplace <strong>TIDAK AKAN</strong> memotong stok fisik aktif di toko secara otomatis, guna menghindari selisih inventaris riil di OUTLET.
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
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['GoFood', 'GrabFood', 'ShopeeFood', 'Shopee'] as const).map((p) => (
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
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".xlsx,.csv"
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
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
                    Mendukung format spreadsheet (.xlsx / .csv) pesanan {platform}
                  </p>
                </div>
              </div>
            </div>

            {fileError && (
              <div className="p-3 rounded-xl bg-[#FFDAD6] border border-[#BA1A1A]/30 text-xs text-[#93000A] font-medium">
                {fileError}
              </div>
            )}

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
                  <span>Total Pesanan Divalidasi: <strong>{parsedRecords.length} Transaksi</strong></span>
                  <span className="font-bold text-[#732662] text-sm">
                    Total Omzet Bersih: Rp {totalPreviewAmount.toLocaleString('id-ID')}
                  </span>
                </div>

                {parseErrors.length > 0 && (
                  <div className="p-3 rounded-xl bg-[#FEF3C7] border border-[#F59E0B]/30 text-xs text-[#92400E] space-y-1">
                    <span className="font-bold block">
                      {parseErrors.length} baris dilewati karena format tidak valid:
                    </span>
                    <ul className="list-disc pl-4 space-y-0.5 max-h-24 overflow-y-auto">
                      {parseErrors.slice(0, 5).map((err, i) => (
                        <li key={i}>
                          Baris {err.rowNumber}: {err.reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="overflow-x-auto max-h-72 overflow-y-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#CBD5E1] text-[#5B403D]">
                        <th className="py-2 px-2 font-bold">ID Pesanan</th>
                        <th className="py-2 px-2 font-bold">Nama Pembeli</th>
                        <th className="py-2 px-2 font-bold">Produk</th>
                        <th className="py-2 px-2 font-bold text-center">Qty</th>
                        <th className="py-2 px-2 font-bold text-right">Netto</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9]">
                      {parsedRecords.map((ord) => (
                        <tr key={ord.platformOrderId}>
                          <td className="py-2.5 px-2 font-mono font-bold text-[#732662]">{ord.platformOrderId}</td>
                          <td className="py-2.5 px-2">{ord.customerName || 'Pelanggan Marketplace'}</td>
                          <td className="py-2.5 px-2 font-medium">{ord.productName || '-'}</td>
                          <td className="py-2.5 px-2 text-center">{ord.quantity || 1}</td>
                          <td className="py-2.5 px-2 text-right font-bold text-[#0B1C30]">
                            Rp {ord.netAmount.toLocaleString('id-ID')}
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
                    disabled={isSaving}
                    className="btn-secondary text-xs"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmImport}
                    disabled={isSaving}
                    className="btn-primary text-xs disabled:opacity-50"
                  >
                    <IconCheckCircle size={16} />
                    <span>{isSaving ? 'Menyimpan...' : 'Konfirmasi Simpan ke Master Penjualan'}</span>
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
                  Data penjualan marketplace {platform} telah tercatat di master laporan tanpa mengurangi stok fisik OUTLET.
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

