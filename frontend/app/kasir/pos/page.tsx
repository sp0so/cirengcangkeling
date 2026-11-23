'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AppShell from '../../components/AppShell';
import { useApp } from '../../lib/context';
import { Product, Transaction } from '../../lib/types';
import {
  IconPOS,
  IconSearch,
  IconClose,
  IconCheckCircle,
  IconPrint,
  IconAlertTriangle,
  IconShift,
  IconPlus,
} from '../../components/Icons';

export default function PosKasirPage() {
  const {
    products,
    categories,
    activeShift,
    cart,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    processTransaction,
    showToast,
  } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [paymentMethod, setPaymentMethod] = useState<'tunai' | 'qris' | 'transfer'>('tunai');
  const [amountPaid, setAmountPaid] = useState<number>(0);
  const [completedTx, setCompletedTx] = useState<Transaction | null>(null);
  const [processing, setProcessing] = useState(false);

  // Filter products by search and category
  const filteredProducts = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      selectedCategory === 'all' ||
      p.categoryId === selectedCategory ||
      p.categoryName.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchSearch && matchCategory;
  });

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const change = paymentMethod === 'tunai' ? Math.max(0, amountPaid - cartTotal) : 0;

  const handleCheckout = async () => {
    if (!activeShift) {
      showToast('Shift kasir belum aktif! Buka shift terlebih dahulu di menu Shift Kasir.', 'warning');
      return;
    }
    if (cart.length === 0) {
      showToast('Keranjang belanja masih kosong.', 'error');
      return;
    }
    if (paymentMethod === 'tunai' && amountPaid < cartTotal) {
      showToast('Uang tunai yang dibayarkan kurang dari total belanja.', 'error');
      return;
    }

    try {
      setProcessing(true);
      const tx = await processTransaction(paymentMethod, paymentMethod === 'tunai' ? amountPaid : cartTotal);
      setCompletedTx(tx);
      setAmountPaid(0);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal memproses transaksi';
      showToast(msg, 'error');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <AppShell>
      <div className="space-y-6 font-sans max-w-[1440px] mx-auto">
        {/* SHIFT STATUS BANNER */}
        {!activeShift && (
          <div className="p-4 rounded-2xl bg-[#FFDAD6] border border-[#BA1A1A]/30 text-xs text-[#93000A] flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
            <div className="flex items-center gap-2.5">
              <IconAlertTriangle size={20} className="text-[#BA1A1A] shrink-0" />
              <div>
                <span className="font-bold block">Sesi Shift Kasir Belum Dibuka!</span>
                <span className="text-[11px] text-[rgba(147,0,10,0.85)]">
                  Sesuai aturan keamanan kas, transaksi penjualan tidak dapat diproses sebelum kasir menginput modal awal.
                </span>
              </div>
            </div>
            <Link
              href="/kasir/shift"
              className="px-3.5 py-2 rounded-xl bg-[#BA1A1A] hover:bg-[#93000A] text-white font-bold text-xs shrink-0 flex items-center justify-center gap-1.5"
            >
              <IconShift size={14} />
              <span>Buka Shift Sekarang</span>
            </Link>
          </div>
        )}

        {/* MAIN LAYOUT: CATALOG (LEFT 7-8 COLS) + CART WORKBENCH (RIGHT 4-5 COLS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: PRODUCT CATALOG */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4">
            {/* SEARCH & CATEGORY FILTER STRIP */}
            <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari varian cireng atau SKU..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#CBD5E1] text-xs sm:text-sm text-[#0B1C30] focus:outline-none focus:border-[#732662]"
                />
                <span className="absolute left-3 top-2.5 text-[#5B403D]/60">
                  <IconSearch size={16} />
                </span>
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-[#732662] text-white shadow-xs'
                      : 'bg-[#F8FAFC] text-[#475569] border border-[#CBD5E1] hover:bg-slate-100'
                  }`}
                >
                  Semua ({products.length})
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      selectedCategory === cat.name
                        ? 'bg-[#732662] text-white shadow-xs'
                        : 'bg-[#F8FAFC] text-[#475569] border border-[#CBD5E1] hover:bg-slate-100'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* PRODUCT GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3.5">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p) => {
                  const isOutOfStock = p.stock <= 0;
                  return (
                    <div
                      key={p.id}
                      className="bg-white rounded-[16px] border border-[#E2E8F0] shadow-card overflow-hidden flex flex-col justify-between card-hover"
                    >
                      <div className="p-3 space-y-2">
                        {/* Image / Thumbnail */}
                        <div className="w-full h-32 rounded-xl bg-[#FAF7F2] relative overflow-hidden flex items-center justify-center border border-slate-100">
                          {p.image ? (
                            <Image
                              src={p.image}
                              alt={p.name}
                              fill
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                              className="object-cover"
                            />
                          ) : (
                            <span className="text-3xl">🥟</span>
                          )}
                          <span
                            className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              isOutOfStock
                                ? 'bg-[#FFDAD6] text-[#93000A]'
                                : p.stock <= p.minStock
                                ? 'bg-[#FEF3C7] text-[#92400E]'
                                : 'bg-[#DCFCE7] text-[#15803D]'
                            }`}
                          >
                            {isOutOfStock ? 'Habis' : `Stok: ${p.stock}`}
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] font-mono text-[#5B403D] block">{p.sku}</span>
                          <h4 className="font-bold text-xs sm:text-sm text-[#0B1C30] line-clamp-1">{p.name}</h4>
                          <span className="text-xs text-[#5B403D] block">{p.categoryName}</span>
                          <span className="text-sm font-extrabold text-[#732662] block mt-1">
                            Rp {p.price.toLocaleString('id-ID')}
                          </span>
                        </div>
                      </div>

                      <div className="p-3 pt-0">
                        <button
                          type="button"
                          disabled={isOutOfStock || !activeShift}
                          onClick={() => addToCart(p, 1)}
                          className="w-full py-2 px-3 rounded-xl bg-[#732662] hover:bg-[#5E1E4F] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                        >
                          <IconPlus size={14} />
                          <span>+ Tambah</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full py-16 text-center text-xs text-[#5B403D] bg-white rounded-2xl border border-[#CBD5E1]">
                  Tidak ada produk yang cocok dengan pencarian atau filter yang dipilih.
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: SHOPPING CART & CHECKOUT WORKBENCH */}
          <div className="lg:col-span-5 xl:col-span-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-card p-5 space-y-4 sticky top-6">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#EFF4FF] text-[#732662] flex items-center justify-center">
                  <IconPOS size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#0B1C30]">Keranjang Belanja</h3>
                  <span className="text-[11px] text-[#5B403D]">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)} item dipilih
                  </span>
                </div>
              </div>
              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs font-bold text-red-600 hover:underline"
                >
                  Kosongkan
                </button>
              )}
            </div>

            {/* CART ITEMS LIST */}
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-2.5 rounded-xl bg-[#FAF7F2] border border-slate-100 flex items-center justify-between text-xs"
                  >
                    <div className="min-w-0 pr-2">
                      <span className="font-bold text-[#0B1C30] block truncate">{item.product.name}</span>
                      <span className="text-[11px] text-[#732662] font-semibold">
                        Rp {item.product.price.toLocaleString('id-ID')}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-lg bg-white border border-[#CBD5E1] text-[#0B1C30] font-bold flex items-center justify-center hover:bg-slate-100"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-bold text-[#0B1C30]">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-lg bg-white border border-[#CBD5E1] text-[#0B1C30] font-bold flex items-center justify-center hover:bg-slate-100"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id)}
                        className="ml-1 text-slate-400 hover:text-red-600"
                      >
                        <IconClose size={14} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-10 text-center text-xs text-[#5B403D]">
                  <p>Keranjang masih kosong.</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Pilih produk di katalog untuk ditambahkan.</p>
                </div>
              )}
            </div>

            {/* TOTALS & PAYMENT */}
            <div className="pt-3 border-t border-[#F1F5F9] space-y-3">
              <div className="flex justify-between items-center text-xs text-[#5B403D]">
                <span>Total Tagihan:</span>
                <span className="text-lg font-extrabold text-[#732662]">
                  Rp {cartTotal.toLocaleString('id-ID')}
                </span>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                  Metode Pembayaran
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['tunai', 'qris', 'transfer'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => {
                        setPaymentMethod(m);
                        if (m !== 'tunai') setAmountPaid(cartTotal);
                      }}
                      className={`py-2 px-2 rounded-xl text-xs font-bold uppercase transition-all ${
                        paymentMethod === m
                          ? 'bg-[#732662] text-white shadow-xs'
                          : 'bg-[#F8FAFC] text-[#475569] border border-[#CBD5E1] hover:bg-slate-100'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cash Input if Tunai */}
              {paymentMethod === 'tunai' && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <label className="font-bold text-[#334155]">Nominal Uang Tunai Diterima:</label>
                    {amountPaid >= cartTotal && (
                      <span className="font-bold text-[#15803D]">
                        Kembalian: Rp {change.toLocaleString('id-ID')}
                      </span>
                    )}
                  </div>
                  <input
                    type="number"
                    value={amountPaid || ''}
                    onChange={(e) => setAmountPaid(Number(e.target.value))}
                    placeholder="Masukkan jumlah uang tunai"
                    className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] text-xs sm:text-sm font-bold text-[#0B1C30] focus:outline-none focus:border-[#732662]"
                  />

                  {/* Quick Cash Buttons */}
                  <div className="flex gap-1.5 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setAmountPaid(cartTotal)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-[11px] font-semibold text-[#0B1C30] hover:bg-slate-200"
                    >
                      Uang Pas
                    </button>
                    {[20000, 50000, 100000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setAmountPaid(amt)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 text-[11px] font-semibold text-[#0B1C30] hover:bg-slate-200"
                      >
                        Rp {amt.toLocaleString('id-ID')}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* CHECKOUT SUBMIT BUTTON */}
              <button
                type="button"
                disabled={processing || cart.length === 0 || !activeShift || (paymentMethod === 'tunai' && amountPaid < cartTotal)}
                onClick={handleCheckout}
                className="w-full py-3 rounded-xl btn-primary text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-card"
              >
                <IconCheckCircle size={16} />
                <span>{processing ? 'Memproses Transaksi...' : `Bayar Rp ${cartTotal.toLocaleString('id-ID')}`}</span>
              </button>
            </div>
          </div>
        </div>

        {/* RECEIPT / COMPLETION MODAL */}
        {completedTx && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 animate-scale-in">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-full bg-[#DCFCE7] text-[#15803D] mx-auto flex items-center justify-center mb-2">
                  <IconCheckCircle size={28} />
                </div>
                <h3 className="font-extrabold text-lg text-[#0B1C30]">Transaksi Berhasil!</h3>
                <p className="text-xs text-[#5B403D]">Kode Struk: {completedTx.code}</p>
              </div>

              {/* Receipt Preview */}
              <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-dashed border-[#CBD5E1] text-xs space-y-2 font-mono">
                <div className="text-center border-b border-dashed border-[#CBD5E1] pb-2">
                  <p className="font-bold text-sm">CIRENG CANGKELING</p>
                  <p className="text-[10px] text-[#5B403D]">Pelopor Cireng Renyah Gurih</p>
                  <p className="text-[10px] text-[#5B403D]">Kasir: {completedTx.cashierName}</p>
                </div>

                <div className="space-y-1 py-1">
                  {completedTx.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>{it.quantity}x {it.productName}</span>
                      <span>Rp {it.subtotal.toLocaleString('id-ID')}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-dashed border-[#CBD5E1] pt-2 space-y-1">
                  <div className="flex justify-between font-bold">
                    <span>TOTAL:</span>
                    <span>Rp {completedTx.total.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span>Metode:</span>
                    <span className="uppercase">{completedTx.paymentMethod}</span>
                  </div>
                  {completedTx.paymentMethod === 'tunai' && (
                    <>
                      <div className="flex justify-between text-[11px]">
                        <span>Diterima:</span>
                        <span>Rp {completedTx.amountPaid.toLocaleString('id-ID')}</span>
                      </div>
                      <div className="flex justify-between text-[11px] font-bold text-[#15803D]">
                        <span>Kembali:</span>
                        <span>Rp {completedTx.change.toLocaleString('id-ID')}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 btn-secondary text-xs flex items-center justify-center gap-1.5"
                >
                  <IconPrint size={14} />
                  <span>Cetak Struk</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCompletedTx(null)}
                  className="flex-1 btn-primary text-xs"
                >
                  Transaksi Baru
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
