'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppShell from '../../components/AppShell';
import { useApp } from '../../lib/context';

const imgImage4 = "/figma/cdcc004194fc85647526629fb6822fd54bbd911e.png";
const imgContainer = "/figma/c2a82c75f930b8e768b46d8a4c9e5711ebe1e2df.svg";
const imgContainer1 = "/figma/57dae1cf0d3a41bb16d14fe2d2be6f967452f7fc.svg";
const imgContainer2 = "/figma/10b374e73f8764a423cefd687002ab02fbd99621.svg";
const imgContainer3 = "/figma/46cedc142c6b99e1278183a9e2bf39a0fee0e860.svg";
const imgContainer4 = "/figma/e13dcf590b40be3e4063084e4c313e0bd9d50c6f.svg";
const imgContainer5 = "/figma/91aeead690f40c7917e8c31390ac3f55c0912cc1.svg";
const imgIcon = "/figma/0d8469ba9d04d5a4cc56c60b92f0ddfcc2ba0e60.svg";
const imgIcon1 = "/figma/a7f18199123d73dc3435c643af68308a80877d25.svg";
const imgButton = "/figma/dcd7bd8a4d1107d1a589e48ed7d6dc23f46ae724.svg";
const imgIcon2 = "/figma/94ebd46601e04125c98a8d7e2c05a304b2feb3be.svg";
const imgIcon3 = "/figma/98b21d3c9f3feacbbe6abe3ca02f5a81a3f94fec.svg";
const imgIcon4 = "/figma/60b69e958657c6f681704146a20607c5d71b8e88.svg";
const imgContainer6 = "/figma/9e048ef27c6bda9e58e92dcdfeb5092ddf798d00.svg";
const imgContainer7 = "/figma/d94b612399ed83c5c82c4d764d263492000c8dce.svg";
const imgContainer8 = "/figma/b5abc875f9baf903a0697861913eabc41d8e26e2.svg";
const imgContainer9 = "/figma/8f31694b6f2df89adb28f6d6f4ccb38766b05617.svg";
const imgContainer10 = "/figma/2c51e5cec9a90143e33841ac40a63b52b5077bc3.svg";
const imgContainer11 = "/figma/cd587e7623414dd00f1f18ba215adf4d59c178c6.svg";
const imgContainer12 = "/figma/4b2acd462a4fec3ecac241f0523ff42189a41899.svg";
const imgMargin = "/figma/591a43cf0239448a1b37ec79dbcff4a95e174fec.svg";
const imgContainer13 = "/figma/07afc40f264fcfd1cefbc4b76335959f61ba53fe.svg";
const imgContainer14 = "/figma/ffecbff62753a883ea7ee5426565e221d1b73b0f.svg";
const imgContainer15 = "/figma/2ef0040e59f73a23d023cbd9672d54b9a7820c91.svg";
const imgContainer16 = "/figma/a18235778110b4e9af336599d7cf0e6604e8bd53.svg";
const imgIcon5 = "/figma/dd63e32cb396996d28b173075dfae3f25f7435cc.svg";
const imgContainer17 = "/figma/e2cfb718f955e0e2280329966970da76b5c844e5.svg";
const imgContainer18 = "/figma/2be7671e2e023e022c7aa5030300a7b7c9e1e999.svg";
const imgContainer19 = "/figma/274e45ee4d425336baf7dbab482383a7f0b5d366.svg";
const imgContainer20 = "/figma/9edaffdd891e367489261334740a08b54cc99ca7.svg";
const imgContainer21 = "/figma/eab4f9ff14f5d07be2bb050f8bd121662363c70c.svg";
const imgContainer22 = "/figma/c12ca9f491074be66600e815040d224fc5201899.svg";

export default function DashboardKasirPage() {
  const { activeShift, transactions, currentUser } = useApp();

  return (
    <AppShell>
      <div className="w-full font-sans">
      <div className="bg-[#fff7ed] content-stretch flex flex-col items-start min-h-[1092px] pt-[64px] relative shrink-0 w-full" data-node-id="127:1662" data-name="Main">
        <div className="content-stretch flex flex-col gap-[24px] items-start max-w-[1280px] p-[24px] relative shrink-0 w-full" data-node-id="127:1663" data-name="Container">
          <div className="bg-white content-stretch flex items-center justify-between p-[24px] relative rounded-[12px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25),0px_1px_3px_0px_rgba(15,23,42,0.04)] shrink-0 w-full" data-node-id="127:1664" data-name="SECTION A: OPERATIONAL GREETING & CASH DRAWER METRICS">
            <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[422.64px]" data-node-id="127:1665" data-name="Container">
              <div className="content-center flex flex-wrap gap-y-[8px] items-center relative shrink-0 w-full" data-node-id="127:1666" data-name="Container">
                <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="127:1667" data-name="Heading 1">
                  <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[24px] tracking-[-0.6px] whitespace-nowrap" data-node-id="127:1668">
                    <p className="leading-[32px]">Halo, Kasir Rina!</p>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:1672" data-name="Container">
                <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#565e74] text-[14px] whitespace-nowrap" data-node-id="127:1673">
                  <p className="leading-[20px] mb-0">Pantau ringkasan pengalihan pesanan online shift Anda, integrasi</p>
                  <p className="leading-[20px]">channel pesan makanan, dan ketersediaan menu aktif.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch drop-shadow-[0px_4px_2px_rgba(0,0,0,0.25)] flex gap-[16px] items-start justify-center relative shrink-0 w-full" data-node-id="127:1720" data-name="SECTION B: 4 SUMMARY CARDS">
            <div className="bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(15,23,42,0.04)] flex flex-[1_0_0] flex-col h-[172px] items-start justify-between min-w-px p-[16px] relative rounded-[12px]" data-node-id="127:1721" data-name="Background+Shadow">
              <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-node-id="127:1722" data-name="Container">
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-[129.77px]" data-node-id="127:1723" data-name="Container">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:1724" data-name="Container">
                    <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-[#565e74] text-[12px] uppercase whitespace-nowrap" data-node-id="127:1725">
                      <p className="leading-[16px]">PESANAN DIARAHKAN</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0 w-full" data-node-id="127:1726" data-name="Margin">
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:1727" data-name="Container">
                      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:ExtraBold'] font-extrabold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[32px] w-[192px]" data-node-id="127:1728">
                        <p className="leading-[40px] mb-0">86</p>
                        <p className="leading-[40px]">Pesanan</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#ffdad6] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[44px]" data-node-id="127:1729" data-name="Background">
                  <div className="relative shrink-0 size-[20px]" data-node-id="127:1730" data-name="Container">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer} />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(15,23,42,0.04)] flex flex-[1_0_0] flex-col gap-[12px] items-start min-w-px p-[16px] relative rounded-[12px]" data-node-id="127:1737" data-name="Background+Shadow">
              <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-node-id="127:1738" data-name="Container">
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-[74.44px]" data-node-id="127:1739" data-name="Container">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:1740" data-name="Container">
                    <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-[#565e74] text-[12px] uppercase whitespace-nowrap" data-node-id="127:1741">
                      <p className="leading-[16px] mb-0">KUNJUNGAN</p>
                      <p className="leading-[16px]">PLATFORM</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0 w-full" data-node-id="127:1742" data-name="Margin">
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:1743" data-name="Container">
                      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:ExtraBold'] font-extrabold justify-center leading-[0] relative shrink-0 text-[#b70011] text-[32px] w-[143px]" data-node-id="127:1744">
                        <p className="leading-[40px]">142 Klik</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#7ffc97] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[44px]" data-node-id="127:1745" data-name="Background">
                  <div className="relative shrink-0 size-[20.5px]" data-node-id="127:1746" data-name="Container">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer1} />
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-node-id="127:1748" data-name="Margin">
                <div className="content-stretch flex gap-[6px] items-center pt-[8px] relative shrink-0 w-full" data-node-id="127:1749" data-name="Container">
                  <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="127:1750" data-name="Container">
                    <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#565e74] text-[11px] whitespace-nowrap" data-node-id="127:1751">
                      <p className="leading-[14px] mb-0">GoFood:</p>
                      <p className="font-['Plus_Jakarta_Sans:ExtraBold'] font-extrabold leading-[14px] text-[#191c1d]">52</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="127:1752" data-name="Container">
                    <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#e1e3e4] text-[16px] whitespace-nowrap" data-node-id="127:1753">
                      <p className="leading-[24px]">•</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="127:1754" data-name="Container">
                    <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#565e74] text-[11px] whitespace-nowrap" data-node-id="127:1755">
                      <p className="leading-[14px] mb-0">ShopeeFood:</p>
                      <p className="font-['Plus_Jakarta_Sans:ExtraBold'] font-extrabold leading-[14px] text-[#191c1d]">48</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="127:1756" data-name="Container">
                    <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#e1e3e4] text-[16px] whitespace-nowrap" data-node-id="127:1757">
                      <p className="leading-[24px]">•</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start pr-[5.92px] relative shrink-0" data-node-id="127:1758" data-name="Container">
                    <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#565e74] text-[11px] whitespace-nowrap" data-node-id="127:1759">
                      <p className="leading-[14px] mb-0">WA:</p>
                      <p className="font-['Plus_Jakarta_Sans:ExtraBold'] font-extrabold leading-[14px] text-[#191c1d]">42</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(15,23,42,0.04)] flex flex-[1_0_0] flex-col items-start justify-between min-w-px p-[16px] relative rounded-[12px]" data-node-id="127:1760" data-name="Background+Shadow">
              <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-node-id="127:1761" data-name="Container">
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-[131.13px]" data-node-id="127:1762" data-name="Container">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:1763" data-name="Container">
                    <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-[#565e74] text-[12px] uppercase whitespace-nowrap" data-node-id="127:1764">
                      <p className="leading-[16px]">MENU FAVORIT DIPILIH</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0 w-full" data-node-id="127:1765" data-name="Margin">
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:1766" data-name="Container">
                      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:ExtraBold'] font-extrabold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[32px] w-full" data-node-id="127:1767">
                        <p className="leading-[40px] mb-0">Cireng</p>
                        <p className="leading-[40px]">Rujak</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#dae2fd] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[44px]" data-node-id="127:1768" data-name="Background">
                  <div className="h-[18px] relative shrink-0 w-[20px]" data-node-id="127:1769" data-name="Container">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer2} />
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-node-id="127:1771" data-name="Margin">
                <div className="content-stretch flex gap-[6px] items-center pt-[8px] relative shrink-0 w-full" data-node-id="127:1772" data-name="Container">
                  <div className="h-[13.333px] relative shrink-0 w-[14px]" data-node-id="127:1773" data-name="Container">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer3} />
                  </div>
                  <div className="content-stretch flex flex-col items-start overflow-clip pr-[8.34px] relative shrink-0" data-node-id="127:1775" data-name="Container">
                    <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] overflow-hidden relative shrink-0 text-[#565e74] text-[12px] text-ellipsis whitespace-nowrap" data-node-id="127:1776">
                      <p className="leading-[16px]">58x diteruskan ke platform mitra</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="drop-shadow-[0px_4px_2px_rgba(0,0,0,0.25)] gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[_508.50px] relative shrink-0 w-full" data-node-id="127:1847" data-name="SECTION D: TWO-COLUMN OPERATIONAL WORKBENCH">
            <div className="bg-white col-[1/span_8] content-stretch flex flex-col items-start justify-self-start overflow-clip relative rounded-[12px] row-1 self-start shadow-[0px_1px_3px_0px_rgba(15,23,42,0.04)] shrink-0 w-[645px]" data-node-id="127:1848" data-name="LEFT COLUMN: LIVE TRANSAKSI SHIFT (8 COLS)">
              <div className="border-[#edeeef] border-b border-solid content-stretch flex items-center justify-between pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-full" data-node-id="127:1849" data-name="Workbench Header">
                <div className="relative shrink-0" data-node-id="127:1850" data-name="Container">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
                    <div className="bg-[#ffdad6] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[32px]" data-node-id="127:1851" data-name="Background">
                      <div className="relative shrink-0 size-[13.5px]" data-node-id="127:1852" data-name="Container">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer4} />
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[328.05px]" data-node-id="127:1854" data-name="Container">
                      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:1855" data-name="Heading 2">
                        <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[16px] whitespace-nowrap" data-node-id="127:1856">
                          <p className="leading-[22px]">Aktivitas Pengalihan Pesanan Platform</p>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:1857" data-name="Container">
                        <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#565e74] text-[12px] whitespace-nowrap" data-node-id="127:1858">
                          <p className="leading-[16px]">Log pengalihan pesanan pelanggan ke saluran mitra online</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#e7e8e9] relative rounded-[9999px] shrink-0" data-node-id="127:1859" data-name="Background">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[5.99px] items-center px-[10px] py-[4px] relative size-full">
                    <div className="h-[11.667px] relative shrink-0 w-[9.333px]" data-node-id="127:1860" data-name="Container">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer5} />
                    </div>
                    <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="127:1862" data-name="Container">
                      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[11px] whitespace-nowrap" data-node-id="127:1863">
                        <p className="leading-[14px]">Kasir: Rina</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start overflow-auto relative shrink-0 w-full" data-node-id="127:1864" data-name="Table Container">
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-[724.23px]" data-node-id="127:1865" data-name="Table">
                  <div className="bg-[#f3f4f5] content-stretch flex items-start justify-center relative shrink-0 w-full" data-node-id="127:1866" data-name="Header → Row">
                    <div className="content-stretch flex flex-col items-start p-[12px] relative shrink-0 w-[83.8px]" data-node-id="127:1867" data-name="Cell">
                      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#565e74] text-[11px] tracking-[0.55px] uppercase whitespace-nowrap" data-node-id="127:1868">
                        <p className="leading-[14px] mb-0">NO.</p>
                        <p className="leading-[14px]">TIKET/REF</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start pb-[19.5px] pt-[18.5px] px-[12px] relative shrink-0 w-[80.5px]" data-node-id="127:1869" data-name="Cell">
                      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#565e74] text-[11px] tracking-[0.55px] uppercase whitespace-nowrap" data-node-id="127:1870">
                        <p className="leading-[14px]">WAKTU</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start pb-[19.5px] pt-[18.5px] px-[12px] relative shrink-0 w-[98.27px]" data-node-id="127:1871" data-name="Cell">
                      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#565e74] text-[11px] tracking-[0.55px] uppercase whitespace-nowrap" data-node-id="127:1872">
                        <p className="leading-[14px]">PELANGGAN</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start pb-[19.5px] pt-[18.5px] px-[12px] relative shrink-0 w-[189.28px]" data-node-id="127:1873" data-name="Cell">
                      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#565e74] text-[11px] tracking-[0.55px] uppercase whitespace-nowrap" data-node-id="127:1874">
                        <p className="leading-[14px]">MENU YANG DIPILIH</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start p-[12px] relative shrink-0 w-[127.63px]" data-node-id="127:1875" data-name="Cell">
                      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#565e74] text-[11px] tracking-[0.55px] uppercase whitespace-nowrap" data-node-id="127:1876">
                        <p className="leading-[14px] mb-0">PLATFORM</p>
                        <p className="leading-[14px]">TUJUAN</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start pb-[19.5px] pt-[18.5px] px-[12px] relative shrink-0 w-[93.19px]" data-node-id="127:1877" data-name="Cell">
                      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#565e74] text-[11px] tracking-[0.55px] uppercase whitespace-nowrap" data-node-id="127:1878">
                        <p className="leading-[14px]">STATUS</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-end pb-[19.5px] pt-[18.5px] px-[12px] relative shrink-0 w-[51.58px]" data-node-id="127:1879" data-name="Cell">
                      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#565e74] text-[11px] text-right tracking-[0.55px] uppercase whitespace-nowrap" data-node-id="127:1880">
                        <p className="leading-[14px]">AKSI</p>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:1881" data-name="Body">
                    <div className="content-stretch flex items-start justify-center mb-[-1px] relative shrink-0 w-full" data-node-id="127:1882" data-name="Row">
                      <div className="content-stretch flex flex-col items-start pb-[18.5px] pt-[18px] px-[12px] relative shrink-0 w-[83.8px]" data-node-id="127:1883" data-name="Data">
                        <div className="[word-break:break-word] flex flex-col font-['Liberation_Mono:Bold'] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[12px] whitespace-nowrap" data-node-id="127:1884">
                          <p className="leading-[16px] mb-0">#ORD-</p>
                          <p className="leading-[16px]">DIR-089</p>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col items-start pb-[27px] pt-[25.5px] px-[12px] relative shrink-0 w-[80.5px]" data-node-id="127:1885" data-name="Data">
                        <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#565e74] text-[12px] whitespace-nowrap" data-node-id="127:1886">
                          <p className="leading-[16px]">14:10 WIB</p>
                        </div>
                      </div>
                      <div className="h-[68.5px] relative shrink-0 w-[98.27px]" data-node-id="127:1887" data-name="Data">
                        <div className="absolute content-stretch flex flex-col items-start left-[12px] right-[12px] top-[10px]" data-node-id="127:1888" data-name="Container">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[12px] whitespace-nowrap" data-node-id="127:1889">
                            <p className="leading-[16px]">Mas Dedi</p>
                          </div>
                        </div>
                        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] left-[12px] text-[#565e74] text-[11px] top-[33.5px] whitespace-nowrap" data-node-id="127:1890">
                          <p className="leading-[14px]">Delivery</p>
                        </div>
                        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] left-[12px] text-[#565e74] text-[11px] top-[49.5px] whitespace-nowrap" data-node-id="127:1891">
                          <p className="leading-[14px]">Online</p>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col items-start max-w-[200px] overflow-clip pb-[27px] pt-[25.5px] px-[12px] relative shrink-0 w-[189.28px]" data-node-id="127:1892" data-name="Data">
                        <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#5c403c] text-[12px] whitespace-nowrap" data-node-id="127:1893">
                          <p className="leading-[16px]">2x Cireng Rujak, 1x Jeletot</p>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col items-start pb-[26.5px] pt-[24px] px-[12px] relative shrink-0 w-[127.63px]" data-node-id="127:1894" data-name="Data">
                        <div className="bg-[#ffdad6] content-stretch flex gap-[4px] items-center px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-node-id="127:1895" data-name="Paragraph+Background">
                          <div className="h-[11.667px] relative shrink-0 w-[9.333px]" data-node-id="127:1896" data-name="Icon">
                            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
                          </div>
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-[#b70011] text-[11px] whitespace-nowrap" data-node-id="127:1897">
                            <p className="leading-[14px]">ShopeeFood</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col items-start pb-[29.5px] pt-[24.5px] px-[12px] relative shrink-0 w-[93.19px]" data-node-id="127:1898" data-name="Data">
                        <div className="content-stretch flex gap-[3.99px] items-center relative shrink-0" data-node-id="127:1899" data-name="Paragraph">
                          <div className="relative shrink-0 size-[11.667px]" data-node-id="127:1900" data-name="Icon">
                            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon1} />
                          </div>
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-[#00682b] text-[11px] whitespace-nowrap" data-node-id="127:1901">
                            <p className="leading-[14px]">Terdireksi</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col items-end pb-[20.5px] pt-[20px] px-[12px] relative shrink-0 w-[51.58px]" data-node-id="127:1902" data-name="Data">
                        <div className="h-[24px] relative shrink-0 w-[20px]" data-node-id="127:1903" data-name="Button">
                          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgButton} />
                        </div>
                      </div>
                    </div>
                    <div className="border-[#edeeef] border-solid border-t content-stretch flex items-start justify-center mb-[-1px] pt-px relative shrink-0 w-full" data-node-id="127:1905" data-name="Row">
                      <div className="relative shrink-0 w-[83.8px]" data-node-id="127:1906" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[12px] py-[18.5px] relative size-full">
                          <div className="[word-break:break-word] flex flex-col font-['Liberation_Mono:Bold'] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[12px] whitespace-nowrap" data-node-id="127:1907">
                            <p className="leading-[16px] mb-0">#ORD-</p>
                            <p className="leading-[16px]">DIR-088</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-[80.5px]" data-node-id="127:1908" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[27px] pt-[26px] px-[12px] relative size-full">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#565e74] text-[12px] whitespace-nowrap" data-node-id="127:1909">
                            <p className="leading-[16px]">13:42 WIB</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-[98.27px]" data-node-id="127:1910" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[0.5px] items-start pb-[12px] pt-[10.5px] px-[12px] relative size-full">
                          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:1911" data-name="Container">
                            <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[12px] w-full" data-node-id="127:1912">
                              <p className="leading-[16px] mb-0">Ibu Dewi</p>
                              <p className="leading-[16px]">Permata</p>
                            </div>
                          </div>
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#565e74] text-[11px] whitespace-nowrap" data-node-id="127:1913">
                            <p className="leading-[14px]">Pesan Cepat</p>
                          </div>
                        </div>
                      </div>
                      <div className="max-w-[200px] relative shrink-0 w-[189.28px]" data-node-id="127:1914" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] overflow-clip pb-[27px] pt-[26px] px-[12px] relative rounded-[inherit] size-full">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#5c403c] text-[12px] whitespace-nowrap" data-node-id="127:1915">
                            <p className="leading-[16px]">2x Paket Besek, 1x Mozzarella</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-[127.63px]" data-node-id="127:1916" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[26.5px] pt-[24.5px] px-[12px] relative size-full">
                          <div className="bg-[#7ffc97] content-stretch flex gap-[4px] items-center px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-node-id="127:1917" data-name="Paragraph+Background">
                            <div className="h-[8.167px] relative shrink-0 w-[11.667px]" data-node-id="127:1918" data-name="Icon">
                              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon2} />
                            </div>
                            <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-[#00682b] text-[11px] whitespace-nowrap" data-node-id="127:1919">
                              <p className="leading-[14px]">GoFood</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-[93.19px]" data-node-id="127:1920" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[29.5px] pt-[25px] px-[12px] relative size-full">
                          <div className="content-stretch flex gap-[3.99px] items-center relative shrink-0" data-node-id="127:1921" data-name="Paragraph">
                            <div className="relative shrink-0 size-[11.667px]" data-node-id="127:1922" data-name="Icon">
                              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon1} />
                            </div>
                            <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-[#00682b] text-[11px] whitespace-nowrap" data-node-id="127:1923">
                              <p className="leading-[14px]">Terdireksi</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-[51.58px]" data-node-id="127:1924" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end px-[12px] py-[20.5px] relative size-full">
                          <div className="h-[24px] relative shrink-0 w-[20px]" data-node-id="127:1925" data-name="Button">
                            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgButton} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-[#edeeef] border-solid border-t content-stretch flex items-start justify-center mb-[-1px] pt-px relative shrink-0 w-full" data-node-id="127:1927" data-name="Row">
                      <div className="relative shrink-0 w-[83.8px]" data-node-id="127:1928" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[12px] py-[26.5px] relative size-full">
                          <div className="[word-break:break-word] flex flex-col font-['Liberation_Mono:Bold'] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[12px] whitespace-nowrap" data-node-id="127:1929">
                            <p className="leading-[16px] mb-0">#ORD-</p>
                            <p className="leading-[16px]">DIR-087</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-[80.5px]" data-node-id="127:1930" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[35px] pt-[34px] px-[12px] relative size-full">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#565e74] text-[12px] whitespace-nowrap" data-node-id="127:1931">
                            <p className="leading-[16px]">13:25 WIB</p>
                          </div>
                        </div>
                      </div>
                      <div className="h-[85px] relative shrink-0 w-[98.27px]" data-node-id="127:1932" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                          <div className="absolute content-stretch flex flex-col items-start left-[12px] right-[12px] top-[10.5px]" data-node-id="127:1933" data-name="Container">
                            <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[12px] whitespace-nowrap" data-node-id="127:1934">
                              <p className="leading-[16px] mb-0">Kang Budi</p>
                              <p className="leading-[16px]">Cileunyi</p>
                            </div>
                          </div>
                          <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] left-[12px] text-[#565e74] text-[11px] top-[50px] whitespace-nowrap" data-node-id="127:1935">
                            <p className="leading-[14px]">Order Luar</p>
                          </div>
                          <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] left-[12px] text-[#565e74] text-[11px] top-[66px] whitespace-nowrap" data-node-id="127:1936">
                            <p className="leading-[14px]">Kota</p>
                          </div>
                        </div>
                      </div>
                      <div className="max-w-[200px] relative shrink-0 w-[189.28px]" data-node-id="127:1937" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] overflow-clip pb-[35px] pt-[34px] px-[12px] relative rounded-[inherit] size-full">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#5c403c] text-[12px] whitespace-nowrap" data-node-id="127:1938">
                            <p className="leading-[16px]">3x Cireng Rujak Frozen</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-[127.63px]" data-node-id="127:1939" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[12px] py-[26.5px] relative size-full">
                          <div className="bg-[#dae2fd] content-stretch flex gap-[4px] items-center pl-[8px] pr-[36px] py-[2px] relative rounded-[4px] shrink-0" data-node-id="127:1940" data-name="Paragraph+Background">
                            <div className="h-[9.333px] relative shrink-0 w-[10.5px]" data-node-id="127:1941" data-name="Icon">
                              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon3} />
                            </div>
                            <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-[#131b2e] text-[11px] whitespace-nowrap" data-node-id="127:1942">
                              <p className="leading-[14px] mb-0">Shopee</p>
                              <p className="leading-[14px]">Official</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-[93.19px]" data-node-id="127:1943" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[37.5px] pt-[33px] px-[12px] relative size-full">
                          <div className="content-stretch flex gap-[3.99px] items-center relative shrink-0" data-node-id="127:1944" data-name="Paragraph">
                            <div className="relative shrink-0 size-[11.667px]" data-node-id="127:1945" data-name="Icon">
                              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon1} />
                            </div>
                            <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-[#00682b] text-[11px] whitespace-nowrap" data-node-id="127:1946">
                              <p className="leading-[14px]">Terdireksi</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-[51.58px]" data-node-id="127:1947" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end px-[12px] py-[28.5px] relative size-full">
                          <div className="h-[24px] relative shrink-0 w-[20px]" data-node-id="127:1948" data-name="Button">
                            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgButton} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-[#edeeef] border-solid border-t content-stretch flex items-start justify-center pt-px relative shrink-0 w-full" data-node-id="127:1950" data-name="Row">
                      <div className="relative shrink-0 w-[83.8px]" data-node-id="127:1951" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[18px] pt-[18.5px] px-[12px] relative size-full">
                          <div className="[word-break:break-word] flex flex-col font-['Liberation_Mono:Bold'] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[12px] whitespace-nowrap" data-node-id="127:1952">
                            <p className="leading-[16px] mb-0">#ORD-</p>
                            <p className="leading-[16px]">DIR-086</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-[80.5px]" data-node-id="127:1953" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[26.5px] pt-[26px] px-[12px] relative size-full">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#565e74] text-[12px] whitespace-nowrap" data-node-id="127:1954">
                            <p className="leading-[16px]">12:50 WIB</p>
                          </div>
                        </div>
                      </div>
                      <div className="h-[68.5px] relative shrink-0 w-[98.27px]" data-node-id="127:1955" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                          <div className="absolute content-stretch flex flex-col items-start left-[12px] right-[12px] top-[10.5px]" data-node-id="127:1956" data-name="Container">
                            <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[12px] whitespace-nowrap" data-node-id="127:1957">
                              <p className="leading-[16px]">Teh Nengsih</p>
                            </div>
                          </div>
                          <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] left-[12px] text-[#565e74] text-[11px] top-[34px] whitespace-nowrap" data-node-id="127:1958">
                            <p className="leading-[14px]">Chat</p>
                          </div>
                          <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] left-[12px] text-[#565e74] text-[11px] top-[50px] whitespace-nowrap" data-node-id="127:1959">
                            <p className="leading-[14px]">Langsung</p>
                          </div>
                        </div>
                      </div>
                      <div className="max-w-[200px] relative shrink-0 w-[189.28px]" data-node-id="127:1960" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] overflow-clip pb-[26.5px] pt-[26px] px-[12px] relative rounded-[inherit] size-full">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#5c403c] text-[12px] whitespace-nowrap" data-node-id="127:1961">
                            <p className="leading-[16px]">4x Cireng Pedas, 2x Keju</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-[127.63px]" data-node-id="127:1962" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[18px] pt-[18.5px] px-[12px] relative size-full">
                          <div className="bg-[#7ffc97] content-stretch flex gap-[4px] items-center pl-[8px] pr-[21.38px] py-[2px] relative rounded-[4px] shrink-0" data-node-id="127:1963" data-name="Paragraph+Background">
                            <div className="relative shrink-0 size-[11.667px]" data-node-id="127:1964" data-name="Icon">
                              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon4} />
                            </div>
                            <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-[#00682b] text-[11px] whitespace-nowrap" data-node-id="127:1965">
                              <p className="leading-[14px] mb-0">WhatsApp</p>
                              <p className="leading-[14px]">Order</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-[93.19px]" data-node-id="127:1966" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[29px] pt-[25px] px-[12px] relative size-full">
                          <div className="content-stretch flex gap-[3.99px] items-center relative shrink-0" data-node-id="127:1967" data-name="Paragraph">
                            <div className="relative shrink-0 size-[11.667px]" data-node-id="127:1968" data-name="Icon">
                              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon1} />
                            </div>
                            <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-[#00682b] text-[11px] whitespace-nowrap" data-node-id="127:1969">
                              <p className="leading-[14px]">Terdireksi</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-[51.58px]" data-node-id="127:1970" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end pb-[20px] pt-[20.5px] px-[12px] relative size-full">
                          <div className="h-[24px] relative shrink-0 w-[20px]" data-node-id="127:1971" data-name="Button">
                            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgButton} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#f3f4f5] content-stretch flex items-center justify-between p-[12px] relative shrink-0 w-full" data-node-id="127:1973" data-name="Table Footer / Action Link">
                <div className="h-[16px] relative shrink-0 w-[12.13px]" data-node-id="127:1974" data-name="Container" />
                <div className="content-stretch flex gap-[17.99px] items-center relative shrink-0" data-node-id="127:1976" data-name="Link">
                  <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#b70011] text-[12px] whitespace-nowrap" data-node-id="127:1977">
                    <p className="leading-[16px] mb-0">Lihat Semua Riwayat Pengalihan Shift</p>
                    <p className="leading-[16px]">Ini</p>
                  </div>
                  <div className="relative shrink-0 size-[10.667px]" data-node-id="127:1978" data-name="Container">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer6} />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white col-[9/span_4] content-stretch drop-shadow-[0px_1px_1.5px_rgba(15,23,42,0.04)] flex flex-col gap-[12px] items-start justify-self-stretch p-[16px] relative rounded-[12px] row-1 self-start shrink-0" data-node-id="127:1980" data-name="RIGHT COLUMN: STATUS KETERSEDIAAN PRODUK (5 COLS)">
              <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-node-id="127:1981" data-name="Container">
                <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="127:1982" data-name="Container">
                  <div className="content-stretch flex flex-col items-start pr-[23.06px] relative shrink-0" data-node-id="127:1983" data-name="Heading 2">
                    <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[16px] whitespace-nowrap" data-node-id="127:1984">
                      <p className="leading-[22px] mb-0">Tautan Saluran Platform</p>
                      <p className="leading-[22px]">Aktif</p>
                    </div>
                  </div>
                  <div className="bg-[#7ffc97] content-stretch flex gap-[4px] items-center px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-node-id="127:1985" data-name="Background">
                    <div className="bg-[#00682b] relative rounded-[9999px] shrink-0 size-[6px]" data-node-id="127:1986" data-name="Background" />
                    <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-[#00682b] text-[11px] whitespace-nowrap" data-node-id="127:1987">
                      <p className="leading-[14px]">Online</p>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:1988" data-name="Container">
                  <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#565e74] text-[12px] w-full" data-node-id="127:1989">
                    <p className="leading-[16px] mb-0">Saluran resmi untuk mengarahkan pesanan</p>
                    <p className="leading-[16px]">online pelanggan secara langsung</p>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[10px] items-start pt-[4px] relative shrink-0 w-full" data-node-id="127:1990" data-name="Container">
                <div className="content-stretch flex items-center justify-between pt-[8px] relative shrink-0 w-full" data-node-id="127:1991" data-name="Container">
                  <div className="content-stretch flex gap-[10px] items-center relative shrink-0" data-node-id="127:1992" data-name="Container">
                    <div className="bg-[#ffdad6] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[36px]" data-node-id="127:1993" data-name="Background">
                      <div className="h-[15px] relative shrink-0 w-[12px]" data-node-id="127:1994" data-name="Container">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer7} />
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[152px]" data-node-id="127:1996" data-name="Container">
                      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-node-id="127:1997" data-name="Container">
                        <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] overflow-hidden relative shrink-0 text-[#191c1d] text-[12px] text-ellipsis whitespace-nowrap" data-node-id="127:1998">
                          <p className="leading-[16px]">ShopeeFood Cireng Cangkeling</p>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:1999" data-name="Container">
                        <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#565e74] text-[12px] whitespace-nowrap" data-node-id="127:2000">
                          <p className="leading-[16px]">Menu Siap Antar • Aktif</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#b70011] content-stretch flex gap-[3.99px] items-center px-[10px] py-[4px] relative rounded-[8px] shrink-0" data-node-id="127:2001" data-name="Link">
                    <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-[11px] text-white whitespace-nowrap" data-node-id="127:2002">
                      <p className="leading-[14px]">Buka</p>
                    </div>
                    <div className="relative shrink-0 size-[10.5px]" data-node-id="127:2003" data-name="Container">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer8} />
                    </div>
                  </div>
                </div>
                <div className="border-[#edeeef] border-solid border-t content-stretch flex items-center justify-between pt-[11px] relative shrink-0 w-full" data-node-id="127:2005" data-name="HorizontalBorder">
                  <div className="relative shrink-0" data-node-id="127:2006" data-name="Container">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[10px] items-center relative size-full">
                      <div className="bg-[#7ffc97] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[36px]" data-node-id="127:2007" data-name="Background">
                        <div className="h-[10.5px] relative shrink-0 w-[15px]" data-node-id="127:2008" data-name="Container">
                          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer9} />
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col items-start relative shrink-0 w-[152.09px]" data-node-id="127:2010" data-name="Container">
                        <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-node-id="127:2011" data-name="Container">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] overflow-hidden relative shrink-0 text-[#191c1d] text-[12px] text-ellipsis whitespace-nowrap" data-node-id="127:2012">
                            <p className="leading-[16px]">GoFood Cireng Cangkeling</p>
                          </div>
                        </div>
                        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:2013" data-name="Container">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#565e74] text-[12px] whitespace-nowrap" data-node-id="127:2014">
                            <p className="leading-[16px]">{`Grab & Go / Delivery • Aktif`}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#00682b] relative rounded-[8px] shrink-0" data-node-id="127:2015" data-name="Link">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[3.99px] items-center px-[10px] py-[4px] relative size-full">
                      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-[11px] text-white whitespace-nowrap" data-node-id="127:2016">
                        <p className="leading-[14px]">Buka</p>
                      </div>
                      <div className="relative shrink-0 size-[10.5px]" data-node-id="127:2017" data-name="Container">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer8} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-[#edeeef] border-solid border-t content-stretch flex items-center justify-between pt-[11px] relative shrink-0 w-full" data-node-id="127:2019" data-name="HorizontalBorder">
                  <div className="relative shrink-0" data-node-id="127:2020" data-name="Container">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[10px] items-center relative size-full">
                      <div className="bg-[#dae2fd] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[36px]" data-node-id="127:2021" data-name="Background">
                        <div className="h-[12px] relative shrink-0 w-[13.5px]" data-node-id="127:2022" data-name="Container">
                          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer10} />
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col items-start relative shrink-0 w-[142.06px]" data-node-id="127:2024" data-name="Container">
                        <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-node-id="127:2025" data-name="Container">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[12px] whitespace-nowrap" data-node-id="127:2026">
                            <p className="leading-[16px]">Shopee Official Store</p>
                          </div>
                        </div>
                        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:2027" data-name="Container">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#565e74] text-[12px] whitespace-nowrap" data-node-id="127:2028">
                            <p className="leading-[16px] mb-0">Cireng Frozen Luar Kota •</p>
                            <p className="leading-[16px]">Aktif</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#565e74] relative rounded-[8px] shrink-0" data-node-id="127:2029" data-name="Link">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[3.99px] items-center px-[10px] py-[4px] relative size-full">
                      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-[11px] text-white whitespace-nowrap" data-node-id="127:2030">
                        <p className="leading-[14px]">Buka</p>
                      </div>
                      <div className="relative shrink-0 size-[10.5px]" data-node-id="127:2031" data-name="Container">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer8} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-[#edeeef] border-solid border-t content-stretch flex items-center justify-between pt-[11px] relative shrink-0 w-full" data-node-id="127:2033" data-name="HorizontalBorder">
                  <div className="relative shrink-0" data-node-id="127:2034" data-name="Container">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[10px] items-center relative size-full">
                      <div className="bg-[#7ffc97] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[36px]" data-node-id="127:2035" data-name="Background">
                        <div className="relative shrink-0 size-[15px]" data-node-id="127:2036" data-name="Container">
                          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer11} />
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col items-start relative shrink-0 w-[153.06px]" data-node-id="127:2038" data-name="Container">
                        <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-node-id="127:2039" data-name="Container">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[12px] whitespace-nowrap" data-node-id="127:2040">
                            <p className="leading-[16px]">WhatsApp Admin Pesanan</p>
                          </div>
                        </div>
                        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:2041" data-name="Container">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#565e74] text-[12px] whitespace-nowrap" data-node-id="127:2042">
                            <p className="leading-[16px] mb-0">Respon Cepat Pesanan</p>
                            <p className="leading-[16px]">Custom</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#00682b] relative rounded-[8px] shrink-0" data-node-id="127:2043" data-name="Link">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center px-[10px] py-[4px] relative size-full">
                      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-[11px] text-white whitespace-nowrap" data-node-id="127:2044">
                        <p className="leading-[14px]">Chat</p>
                      </div>
                      <div className="relative shrink-0 size-[9.333px]" data-node-id="127:2045" data-name="Container">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer12} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full" data-node-id="127:2047" data-name="Margin">
                <div className="bg-[#f3f4f5] content-stretch flex gap-[10px] items-start p-[12px] relative rounded-[8px] shrink-0 w-full" data-node-id="127:2048" data-name="Background">
                  <div className="h-[17px] relative shrink-0 w-[15px]" data-node-id="127:2049" data-name="Margin">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgMargin} />
                  </div>
                  <div className="content-stretch flex flex-col items-start pr-[4.95px] relative shrink-0" data-node-id="127:2051" data-name="Container">
                    <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[12px] whitespace-nowrap" data-node-id="127:2052">
                      <p className="mb-0">
                        <span className="leading-[19.5px]">Tugas Shift Kasir:</span>
                        <span className="[word-break:break-word] font-['Plus_Jakarta_Sans:Regular'] font-normal leading-[19.5px] text-[#565e74]">{` Bantu pelanggan`}</span>
                      </p>
                      <p className="font-['Plus_Jakarta_Sans:Regular'] font-normal leading-[19.5px] mb-0 text-[#565e74]">memilih menu favorit dari katalog dan</p>
                      <p className="font-['Plus_Jakarta_Sans:Regular'] font-normal leading-[19.5px] mb-0 text-[#565e74]">arahkan ke tautan platform online</p>
                      <p className="font-['Plus_Jakarta_Sans:Regular'] font-normal leading-[19.5px] mb-0 text-[#565e74]">resmi untuk kemudahan pemesanan</p>
                      <p className="font-['Plus_Jakarta_Sans:Regular'] font-normal leading-[19.5px] text-[#565e74]">dan pengantaran.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </AppShell>
  );
}
