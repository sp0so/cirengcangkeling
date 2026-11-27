'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import AppShell from '../../components/AppShell';
import WordRevealHeading from '../../components/WordRevealHeading';
import MotionCard from '../../components/MotionCard';
import { useApp } from '../../lib/context';
import { businessInfo } from '../../lib/businessInfo';
import { Product, Transaction } from '../../lib/types';
import {
  IconSearch,
  IconClose,
  IconCheckCircle,
  IconPrint,
  IconAlertTriangle,
  IconShift,
  IconPlus,
  IconSpinner,
  IconProduct,
  IconShoppingBag,
  IconWhatsApp,
  IconBike,
  IconStore,
} from '../../components/Icons';

// Figma 127:2161 image assets
const figmaProductImages: Record<string, string> = {
  'cireng rujak original': '/figma/9b2f3f9fc7cb73f2f581eb33bc35033fca2efd89.png',
  'cireng pedas jeletot': '/figma/078a4b8feddf4b35797f74c6f321158cbdea2cde.png',
  'cireng keju melted mozzarella': '/figma/e849c57313a32cd53f87d89d03ce0a80fdcd261c.png',
  'cireng kuah seblak': '/figma/58490d9e874c87dbcf7dcb015f907380154007c1.png',
  'cireng goreng matang box': '/figma/9f24403fce0435826fcd7c7d13969110b3b888d2.png',
  'paket bundling besek': '/figma/baf5e8b3d826e24305be9995e739c3c75a1a1b89.png',
};

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
  const [showPosDrawer, setShowPosDrawer] = useState(false);

  // Filter products by search and category
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase());
      const matchCategory =
        selectedCategory === 'all' ||
        p.categoryId === selectedCategory ||
        p.categoryName.toLowerCase().includes(selectedCategory.toLowerCase());
      return matchSearch && matchCategory;
    });
  }, [products, search, selectedCategory]);

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cart]
  );
  const cartItemCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );
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
      setShowPosDrawer(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal memproses transaksi';
      showToast(msg, 'error');
    } finally {
      setProcessing(false);
    }
  };

  const getProductImage = (p: Product) => {
    const key = p.name.toLowerCase().trim();
    for (const [name, img] of Object.entries(figmaProductImages)) {
      if (key.includes(name) || name.includes(key)) {
        return img;
      }
    }
    return p.image || '/figma/9b2f3f9fc7cb73f2f581eb33bc35033fca2efd89.png';
  };

  return (
    <AppShell>
      <div className="space-y-6 font-sans max-w-[1400px] mx-auto pb-16">
        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#565E74]">
          <span>Kasir Portal</span>
          <span className="text-slate-400">/</span>
          <span className="text-[#A24F9D] font-bold">Katalog & Saluran Pemesanan</span>
        </div>

        {/* TOP OPERATIONAL & CHANNEL NAVIGATION STRIP (Figma 127:2164) */}
        <div className="bg-white border border-[#EDEEEF] rounded-[16px] shadow-xs p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <WordRevealHeading
              text="Katalog Produk & Saluran Pemesanan"
              as="h1"
              className="text-2xl sm:text-3xl font-extrabold text-[#191C1D] tracking-tight"
            />
            <p className="text-sm text-[#565E74] leading-relaxed">
              Kelola katalog, pantau ketersediaan produk, dan arahkan pemesanan pelanggan ke channel online resmi.
            </p>
          </div>

          {/* Quick Shift Status & Online Channels */}
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="https://shopee.co.id"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#EE4D2D]/10 hover:bg-[#EE4D2D]/20 text-[#EE4D2D] font-bold text-xs transition-colors shadow-xs"
            >
              <IconStore size={14} />
              <span>Shopee</span>
            </a>
            <a
              href="https://shopeefood.co.id"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#F94E2E] hover:bg-[#E03D1E] text-white font-bold text-xs transition-colors shadow-xs"
            >
              <IconBike size={14} />
              <span>ShopeeFood</span>
            </a>
            <a
              href="https://gofood.co.id"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#D02428] hover:bg-[#B51B1F] text-white font-bold text-xs transition-colors shadow-xs"
            >
              <IconShoppingBag size={14} />
              <span>GoFood</span>
            </a>
            <a
              href="https://wa.me/628123456789"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#008438] hover:bg-[#006B2D] text-white font-bold text-xs transition-colors shadow-xs"
            >
              <IconWhatsApp size={14} />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* SHIFT STATUS BANNER (If shift not open) */}
        {!activeShift && (
          <div className="p-4 rounded-2xl bg-[#FFDAD6] border border-[#BA1A1A]/30 text-xs text-[#93000A] flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in shadow-xs">
            <div className="flex items-center gap-2.5">
              <IconAlertTriangle size={20} className="text-[#BA1A1A] shrink-0" />
              <div>
                <span className="font-bold block text-sm">Sesi Shift Kasir Belum Dibuka!</span>
                <span className="text-xs text-[#93000A]/85">
                  Transaksi kasir fisik dinonaktifkan sementara hingga shift dibuka. Saluran rujukan online tetap aktif.
                </span>
              </div>
            </div>
            <Link
              href="/kasir/shift"
              className="px-3.5 py-2 rounded-xl bg-[#BA1A1A] hover:bg-[#93000A] text-white font-bold text-xs shrink-0 flex items-center justify-center gap-1.5 transition-colors"
            >
              <IconShift size={14} />
              <span>Buka Shift Sekarang</span>
            </Link>
          </div>
        )}

        {/* SEARCH & MINIMALIST FILTER (Figma 127:2202) */}
        <div className="bg-white border border-[#EDEEEF] rounded-[16px] shadow-xs p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari varian cireng atau SKU..."
              className="w-full pl-10 pr-4 py-2.5 rounded-[12px] bg-[#F3F4F5] border border-transparent focus:border-[#A24F9D] focus:bg-white text-xs sm:text-sm text-[#191C1D] placeholder:text-[#565E74] transition-all outline-none"
            />
            <span className="absolute left-3.5 top-3 text-[#565E74]">
              <IconSearch size={16} />
            </span>
          </div>

          {/* Clean Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-[8px] text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#A24F9D] text-white shadow-xs font-semibold'
                  : 'bg-[#F3F4F5] text-[#565E74] hover:bg-slate-200'
              }`}
            >
              Semua ({products.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-3.5 py-1.5 rounded-[8px] text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.name
                    ? 'bg-[#A24F9D] text-white shadow-xs font-semibold'
                    : 'bg-[#F3F4F5] text-[#565E74] hover:bg-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* MAIN 2-COLUMN: PRODUCT CATALOG (8 COLS) + RIGHT SIDEBAR (4 COLS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: PRODUCT CATALOG GRID (8 COLS) */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p) => {
                  const isOutOfStock = p.stock <= 0;
                  const imgSrc = getProductImage(p);

                  return (
                    <MotionCard
                      key={p.id}
                      className="bg-white border border-[#EDEEEF] rounded-[16px] shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
                    >
                      <div className="p-4 space-y-3">
                        {/* Thumbnail */}
                        <div className="relative w-full h-44 rounded-[12px] bg-[#F3F4F5] overflow-hidden flex items-center justify-center">
                          <Image
                            src={imgSrc}
                            alt={p.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <span
                            className={`absolute top-2.5 right-2.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-xs shadow-xs ${
                              isOutOfStock
                                ? 'bg-[#FFDAD6] text-[#93000A]'
                                : p.stock <= p.minStock
                                ? 'bg-[#FEF3C7] text-[#92400E]'
                                : 'bg-[#DCFCE7] text-[#00682B]'
                            }`}
                          >
                            {isOutOfStock ? 'Stok Habis' : `Stok: ${p.stock}`}
                          </span>
                        </div>

                        {/* Title & Price */}
                        <div>
                          <span className="text-[10px] font-mono font-bold text-[#565E74] block">
                            {p.sku || 'CRG-CAT'}
                          </span>
                          <h3 className="font-bold text-[15px] text-[#191C1D] line-clamp-1 leading-snug">
                            {p.name}
                          </h3>
                          <span className="text-base font-extrabold text-[#A24F9D] block mt-1">
                            Rp {p.price.toLocaleString('id-ID')}
                          </span>
                        </div>
                      </div>

                      {/* Card Action Button */}
                      <div className="p-4 pt-0">
                        <div className="pt-3 border-t border-[#EDEEEF]">
                          <button
                            type="button"
                            disabled={isOutOfStock}
                            onClick={() => {
                              addToCart(p, 1);
                              setShowPosDrawer(true);
                              showToast(`Ditambahkan ke pesanan: ${p.name}`, 'info');
                            }}
                            className="w-full py-2.5 px-3 rounded-[8px] bg-[#A24F9D] hover:bg-[#8D3B89] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-xs active:scale-[0.98]"
                          >
                            <IconShoppingBag size={14} />
                            <span>Pesan Sekarang</span>
                          </button>
                        </div>
                      </div>
                    </MotionCard>
                  );
                })
              ) : (
                <div className="col-span-full py-16 text-center text-xs text-[#565E74] bg-white rounded-2xl border border-[#EDEEEF] p-8 shadow-xs">
                  <p className="font-bold text-sm text-[#191C1D] mb-1">Produk Tidak Ditemukan</p>
                  <p>Tidak ada varian cireng yang cocok dengan kata kunci &quot;{search}&quot;.</p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDEBAR: INTEGRATION GUIDE & POS CART (4 COLS) */}
          <div className="lg:col-span-4 space-y-5 sticky top-6">
            {/* 1. STORE CHANNEL STATUS CARD (Figma 127:2323) */}
            <div className="bg-white border border-[#EDEEEF] rounded-[16px] shadow-xs p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#EDEEEF] pb-3.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#EFF4FF] text-[#A24F9D] flex items-center justify-center">
                    <IconStore size={16} />
                  </div>
                  <h2 className="font-bold text-base text-[#191C1D]">Integrasi Toko Online</h2>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#7FFC97] text-[#005320] font-bold text-xs">
                  Aktif
                </span>
              </div>

              {/* Channels List */}
              <div className="space-y-2.5">
                {/* ShopeeFood */}
                <div className="p-3 rounded-[12px] bg-[#F3F4F5] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-[8px] bg-[#F94E2E] text-white flex items-center justify-center shrink-0">
                      <IconBike size={16} />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-[#191C1D] leading-tight">ShopeeFood</p>
                      <p className="text-[11px] text-[#565E74]">Cireng Cangkeling Pusat</p>
                    </div>
                  </div>
                  <a
                    href="https://shopeefood.co.id"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-[6px] bg-white border border-[#EDEEEF] text-[#F94E2E] font-bold text-xs hover:bg-slate-50 transition-colors shadow-2xs"
                  >
                    Buka
                  </a>
                </div>

                {/* GoFood */}
                <div className="p-3 rounded-[12px] bg-[#F3F4F5] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-[8px] bg-[#D02428] text-white flex items-center justify-center shrink-0">
                      <IconShoppingBag size={16} />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-[#191C1D] leading-tight">GoFood</p>
                      <p className="text-[11px] text-[#565E74]">Cireng Cangkeling Official</p>
                    </div>
                  </div>
                  <a
                    href="https://gofood.co.id"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-[6px] bg-white border border-[#EDEEEF] text-[#D02428] font-bold text-xs hover:bg-slate-50 transition-colors shadow-2xs"
                  >
                    Buka
                  </a>
                </div>

                {/* Shopee Official */}
                <div className="p-3 rounded-[12px] bg-[#F3F4F5] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-[8px] bg-[#EE4D2D] text-white flex items-center justify-center shrink-0">
                      <IconStore size={16} />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-[#191C1D] leading-tight">Shopee Official</p>
                      <p className="text-[11px] text-[#565E74]">Paket Frozen & Besek</p>
                    </div>
                  </div>
                  <a
                    href="https://shopee.co.id"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-[6px] bg-white border border-[#EDEEEF] text-[#EE4D2D] font-bold text-xs hover:bg-slate-50 transition-colors shadow-2xs"
                  >
                    Buka
                  </a>
                </div>
              </div>
            </div>

            {/* POS CHECKOUT WORKBENCH (Interactive In-Store Order Panel) */}
            <div className="bg-white border border-[#EDEEEF] rounded-[16px] shadow-xs p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#EDEEEF] pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#FAF0F8] text-[#A24F9D] flex items-center justify-center font-bold">
                    🛒
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#191C1D]">Keranjang Kasir OUTLET</h3>
                    <span className="text-[11px] text-[#565E74]">{cartItemCount} item dipilih</span>
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

              {/* Cart Items List */}
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="p-2.5 rounded-xl bg-[#F3F4F5] border border-slate-200/60 flex items-center justify-between text-xs"
                    >
                      <div className="min-w-0 pr-2">
                        <span className="font-bold text-[#191C1D] block truncate">{item.product.name}</span>
                        <span className="text-[11px] text-[#A24F9D] font-semibold">
                          Rp {item.product.price.toLocaleString('id-ID')}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-lg bg-white border border-[#CBD5E1] text-[#191C1D] font-bold flex items-center justify-center hover:bg-slate-100"
                        >
                          -
                        </button>
                        <span className="w-5 text-center font-bold text-[#191C1D]">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-lg bg-white border border-[#CBD5E1] text-[#191C1D] font-bold flex items-center justify-center hover:bg-slate-100"
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
                  <div className="py-8 text-center text-xs text-[#565E74] space-y-1">
                    <p>Keranjang masih kosong.</p>
                    <p className="text-[11px] text-slate-400">
                      Klik &quot;Pesan Sekarang&quot; pada katalog di samping.
                    </p>
                  </div>
                )}
              </div>

              {/* Cart Footer & Checkout */}
              <div className="pt-3 border-t border-[#EDEEEF] space-y-3">
                <div className="flex justify-between items-center text-xs text-[#565E74]">
                  <span>Total Tagihan:</span>
                  <span className="text-lg font-extrabold text-[#A24F9D]">
                    Rp {cartTotal.toLocaleString('id-ID')}
                  </span>
                </div>

                {/* Payment Selector */}
                <div>
                  <label className="block text-[10px] font-bold text-[#565E74] uppercase tracking-wider mb-1.5">
                    Metode Pembayaran
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['tunai', 'qris', 'transfer'] as const).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => {
                          setPaymentMethod(m);
                          if (m !== 'tunai') setAmountPaid(cartTotal);
                        }}
                        className={`py-1.5 px-2 rounded-lg text-xs font-bold uppercase transition-all ${
                          paymentMethod === m
                            ? 'bg-[#A24F9D] text-white shadow-xs'
                            : 'bg-[#F3F4F5] text-[#565E74] hover:bg-slate-200'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tunai Input */}
                {paymentMethod === 'tunai' && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <label className="font-bold text-[#565E74] text-[11px]">Nominal Tunai Diterima:</label>
                      {amountPaid >= cartTotal && (
                        <span className="font-bold text-[#00682B] text-[11px]">
                          Kembali: Rp {change.toLocaleString('id-ID')}
                        </span>
                      )}
                    </div>
                    <input
                      type="number"
                      value={amountPaid || ''}
                      onChange={(e) => setAmountPaid(Number(e.target.value))}
                      placeholder="Masukkan jumlah uang tunai"
                      className="w-full px-3 py-2 rounded-xl bg-[#F3F4F5] border border-transparent focus:border-[#A24F9D] focus:bg-white text-xs font-bold text-[#191C1D] outline-none transition-all"
                    />
                    <div className="flex gap-1.5 flex-wrap">
                      <button
                        type="button"
                        onClick={() => setAmountPaid(cartTotal)}
                        className="px-2 py-1 rounded bg-slate-100 text-[10px] font-bold text-[#191C1D] hover:bg-slate-200"
                      >
                        Uang Pas
                      </button>
                      {[20000, 50000, 100000].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setAmountPaid(amt)}
                          className="px-2 py-1 rounded bg-slate-100 text-[10px] font-bold text-[#191C1D] hover:bg-slate-200"
                        >
                          Rp {amt.toLocaleString('id-ID')}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Checkout Submit Button */}
                <button
                  type="button"
                  disabled={
                    processing ||
                    cart.length === 0 ||
                    !activeShift ||
                    (paymentMethod === 'tunai' && amountPaid < cartTotal)
                  }
                  onClick={handleCheckout}
                  className="w-full py-2.5 rounded-xl bg-[#A24F9D] hover:bg-[#8D3B89] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs active:scale-[0.98] transition-all"
                >
                  {processing ? (
                    <>
                      <IconSpinner size={16} className="text-white" />
                      <span>Memproses Transaksi...</span>
                    </>
                  ) : (
                    <>
                      <IconCheckCircle size={16} />
                      <span>Selesaikan Transaksi (Rp {cartTotal.toLocaleString('id-ID')})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RECEIPT / COMPLETION MODAL */}
        <AnimatePresence>
          {completedTx && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 12 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 border border-[#EDEEEF]"
              >
                <div className="text-center space-y-1">
                  <div className="w-12 h-12 rounded-full bg-[#DCFCE7] text-[#00682B] mx-auto flex items-center justify-center mb-2">
                    <IconCheckCircle size={28} />
                  </div>
                  <h3 className="font-extrabold text-lg text-[#191C1D]">Transaksi Berhasil!</h3>
                  <p className="text-xs text-[#565E74]">Kode Struk: {completedTx.code}</p>
                </div>

                {/* Receipt Preview */}
                <div className="p-3.5 rounded-xl bg-[#FFF7ED] border border-dashed border-[#CBD5E1] text-xs space-y-2 font-mono">
                  <div className="text-center border-b border-dashed border-[#CBD5E1] pb-2">
                    <p className="font-bold text-sm text-[#A24F9D]">CIRENG CANGKELING</p>
                    <p className="text-[10px] text-[#565E74]">{businessInfo.slogan}</p>
                    <p className="text-[10px] text-[#565E74]">Kasir: {completedTx.cashierName}</p>
                  </div>

                  <div className="space-y-1 py-1">
                    {completedTx.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between text-[#191C1D]">
                        <span>{it.quantity}x {it.productName}</span>
                        <span>Rp {it.subtotal.toLocaleString('id-ID')}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-dashed border-[#CBD5E1] pt-2 space-y-1">
                    <div className="flex justify-between font-bold text-[#A24F9D]">
                      <span>TOTAL:</span>
                      <span>Rp {completedTx.total.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-[#565E74]">
                      <span>Metode:</span>
                      <span className="uppercase font-bold text-[#191C1D]">{completedTx.paymentMethod}</span>
                    </div>
                    {completedTx.paymentMethod === 'tunai' && (
                      <>
                        <div className="flex justify-between text-[11px] text-[#565E74]">
                          <span>Diterima:</span>
                          <span>Rp {completedTx.amountPaid.toLocaleString('id-ID')}</span>
                        </div>
                        <div className="flex justify-between text-[11px] font-bold text-[#00682B]">
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
                    className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-[#191C1D] flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <IconPrint size={14} />
                    <span>Cetak Struk</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCompletedTx(null)}
                    className="flex-1 py-2 rounded-xl bg-[#A24F9D] hover:bg-[#8D3B89] text-white text-xs font-bold transition-colors"
                  >
                    Transaksi Baru
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppShell>
  );
}
