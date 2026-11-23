'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppShell from '../../components/AppShell';
import { useApp } from '../../lib/context';
import { MarketplaceReport } from '../../lib/types';
import {
  IconMarketplace,
  IconCheckCircle,
  IconPlus,
  IconClose,
} from '../../components/Icons';

export default function RiwayatImportPage() {
  const { marketplaceReports } = useApp();
  const [selectedReport, setSelectedReport] = useState<MarketplaceReport | null>(null);

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
              Riwayat Impor Laporan Marketplace
            </h2>
            <p className="text-sm text-[#5B403D]">
              Daftar file rekapitulasi transaksi online yang telah berhasil ditarik ke dalam sistem.
            </p>
          </div>

          <Link
            href="/marketplace/import"
            className="btn-primary text-xs sm:text-sm self-start sm:self-auto"
          >
            <IconPlus size={16} />
            <span>Impor Laporan Baru</span>
          </Link>
        </div>

        {/* Reports Table */}
        <div className="rounded-2xl bg-white border border-[#CBD5E1] shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#FAF7F2] border-b border-[#CBD5E1] text-[#5B403D]">
                <tr>
                  <th className="py-3 px-4 font-bold">Platform</th>
                  <th className="py-3 px-4 font-bold">Nama Berkas</th>
                  <th className="py-3 px-4 font-bold">Waktu Impor</th>
                  <th className="py-3 px-4 font-bold text-center">Jumlah Pesanan</th>
                  <th className="py-3 px-4 font-bold text-right">Total Pendapatan</th>
                  <th className="py-3 px-4 font-bold text-center">Status</th>
                  <th className="py-3 px-4 font-bold text-center">Detail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {marketplaceReports.length > 0 ? (
                  marketplaceReports.map((rep) => (
                    <tr key={rep.id} className="hover:bg-[#FFF7ED]/50 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-[#0B1C30]">
                        <span className="px-2.5 py-1 rounded-md bg-[#FAF7F2] border border-[#CBD5E1]/40 text-xs font-bold text-[#732662]">
                          {rep.platform}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-[#0B1C30]">
                        {rep.fileName}
                      </td>
                      <td className="py-3.5 px-4 text-[#5B403D] text-xs">
                        {rep.importDate}
                      </td>
                      <td className="py-3.5 px-4 text-center font-bold text-[#0B1C30]">
                        {rep.totalOrders} Pesanan
                      </td>
                      <td className="py-3.5 px-4 text-right font-extrabold text-[#15803D]">
                        Rp {rep.totalRevenue.toLocaleString('id-ID')}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D]">
                          <IconCheckCircle size={12} />
                          <span>{rep.status}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => setSelectedReport(rep)}
                          className="px-2.5 py-1 rounded-lg border border-[#CBD5E1] hover:bg-[#FFF7ED] text-[#732662] text-xs font-bold transition-colors"
                        >
                          Lihat Data
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-[#5B403D]">
                      <p className="font-bold text-[14px] text-[#0B1C30]">Belum ada riwayat impor laporan</p>
                      <p className="text-[12px] text-[#5B403D] mt-1">
                        Tarik file CSV/Excel dari GoFood, GrabFood, ShopeeFood, atau Shopee di menu Impor Laporan.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Detail Orders */}
        {selectedReport && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-alert border border-[#CBD5E1] p-6 space-y-4 animate-scale-in">
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <div>
                  <h3 className="text-base font-bold text-[#0B1C30]">
                    Detail Pesanan {selectedReport.platform}
                  </h3>
                  <p className="text-xs text-[#5B403D]">{selectedReport.fileName}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedReport(null)}
                  className="text-[#5B403D] hover:text-[#0B1C30]"
                >
                  <IconClose size={20} />
                </button>
              </div>

              <div className="overflow-x-auto max-h-80">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#CBD5E1] text-[#5B403D]">
                      <th className="py-2 px-2 font-bold">ID Pesanan</th>
                      <th className="py-2 px-2 font-bold">Pembeli</th>
                      <th className="py-2 px-2 font-bold">Item Menu</th>
                      <th className="py-2 px-2 font-bold text-center">Qty</th>
                      <th className="py-2 px-2 font-bold text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F5F9]">
                    {selectedReport.orders.map((o) => (
                      <tr key={o.orderId}>
                        <td className="py-2.5 px-2 font-mono font-bold text-[#732662]">{o.orderId}</td>
                        <td className="py-2.5 px-2">{o.customerName}</td>
                        <td className="py-2.5 px-2 font-medium">{o.productName}</td>
                        <td className="py-2.5 px-2 text-center">{o.quantity}</td>
                        <td className="py-2.5 px-2 text-right font-bold text-[#0B1C30]">
                          Rp {o.total.toLocaleString('id-ID')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedReport(null)}
                  className="btn-secondary text-xs"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

