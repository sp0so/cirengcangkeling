'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppShell from '../../components/AppShell';
import { useApp } from '../../lib/context';

const imgImage7 = "/figma/cdcc004194fc85647526629fb6822fd54bbd911e.png";
const imgContainer = "/figma/ffecbff62753a883ea7ee5426565e221d1b73b0f.svg";
const imgContainer1 = "/figma/8fc4ad26a27fb5da8f0b9a3955dc94056b1c3ff0.svg";
const imgContainer2 = "/figma/7311828a64d3de9c97ae07f880444355d748a412.svg";
const imgContainer3 = "/figma/be208d0c390a408111cb947c9a45265a0610a843.svg";
const imgContainer4 = "/figma/f715478bda5c14abe258a54ec952bc1de6ac9499.svg";
const imgContainer5 = "/figma/4c86b35e84e62e4a89b7497ac86447056b844710.svg";
const imgContainer6 = "/figma/7d06638799668015b43a972b223bb7af1d8fedcc.svg";
const imgContainer7 = "/figma/b9c48a68e1d44114f3aef8c944089b244ee65c72.svg";
const imgIcon = "/figma/a028bffa8ed474677c220b7e08cfb261684b7ad6.svg";
const imgButton = "/figma/8b2e275ebdf7daf05646483f3a9f3d8f2828361f.svg";
const imgIcon1 = "/figma/3f01fd54769996c8387022dff5f92c4daeea4ea1.svg";
const imgIcon2 = "/figma/60b69e958657c6f681704146a20607c5d71b8e88.svg";
const imgIcon3 = "/figma/134271bca9b592a8cf65053d43a51d349706dd19.svg";
const imgButton1 = "/figma/f5511d88c6dd228723a88dadf2ee9bce9529a4c9.svg";
const imgContainer8 = "/figma/7712ad0a000575779202a5d03cdae9e26c69cb9d.svg";
const imgContainer9 = "/figma/5e57b85a5c4d61e9a4b26429be086274d37651a9.svg";
const imgContainer10 = "/figma/2ef0040e59f73a23d023cbd9672d54b9a7820c91.svg";
const imgContainer11 = "/figma/bb37d8b9cf074a6c18ffca277c68ba355641459c.svg";
const imgMargin = "/figma/1f48977c4c42270423191e78a22fd535aecc4696.svg";
const imgContainer12 = "/figma/07afc40f264fcfd1cefbc4b76335959f61ba53fe.svg";
const imgContainer13 = "/figma/aa4c62235f24e2df24d347f78c51383ea4f6d686.svg";
const imgIcon4 = "/figma/dd63e32cb396996d28b173075dfae3f25f7435cc.svg";
const imgContainer14 = "/figma/e2cfb718f955e0e2280329966970da76b5c844e5.svg";
const imgContainer15 = "/figma/820b1414d5fe705e753c49c03d0eda32b4573807.svg";
const imgContainer16 = "/figma/274e45ee4d425336baf7dbab482383a7f0b5d366.svg";
const imgContainer17 = "/figma/9edaffdd891e367489261334740a08b54cc99ca7.svg";
const imgContainer18 = "/figma/eab4f9ff14f5d07be2bb050f8bd121662363c70c.svg";
const imgContainer19 = "/figma/c12ca9f491074be66600e815040d224fc5201899.svg";

export default function RiwayatTransaksiKasirPage() {
  const { transactions, currentUser } = useApp();
  const [selectedTxId, setSelectedTxId] = useState<string>('#CC-POS-202611-0086');
  const [activeTab, setActiveTab] = useState<'all' | 'pos' | 'shopee' | 'gofood'>('all');

  return (
    <AppShell>
      <div className="w-full font-sans max-w-[1280px] mx-auto pb-16">
        <div className="content-stretch drop-shadow-[0px_4px_2px_rgba(0,0,0,0.25)] flex flex-col gap-[24px] items-start p-[24px] relative shrink-0 w-full" data-node-id="127:487" data-name="Container">
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="127:488" data-name="SECTION A: HEADER & BREADCRUMB">
            <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[556.88px]" data-node-id="127:489" data-name="Container">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="127:490" data-name="Container">
                <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="127:491" data-name="Container">
                  <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#565e74] text-[11px] whitespace-nowrap" data-node-id="127:492">
                    <p className="leading-[14px]">Pesanan Platform</p>
                  </div>
                </div>
                <div className="h-[7px] relative shrink-0 w-[4.317px]" data-node-id="127:493" data-name="Container">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer} />
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="127:495" data-name="Container">
                  <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#a24f9d] text-[11px] whitespace-nowrap" data-node-id="127:496">
                    <p className="leading-[14px]">Riwayat Pengalihan</p>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:497" data-name="Heading 1">
                <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:ExtraBold'] font-extrabold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[32px] tracking-[-0.8px] whitespace-nowrap" data-node-id="127:498">
                  <p className="leading-[40px]">Riwayat Pengalihan Pesanan Platform</p>
                </div>
              </div>
            </div>
            <div className="content-stretch flex gap-[8px] items-center pr-[136.73px] relative shrink-0 w-[274px]" data-node-id="127:501" data-name="Top Right Actions">
              <div className="bg-white content-stretch flex gap-[6px] items-center px-[12px] py-[6px] relative rounded-[8px] shrink-0" data-node-id="127:507" data-name="Button">
                <div className="relative shrink-0 size-[12px]" data-node-id="127:508" data-name="Container">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer1} />
                </div>
                <div className="content-stretch flex flex-col items-center relative shrink-0" data-node-id="127:510" data-name="Container">
                  <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[12px] text-center whitespace-nowrap" data-node-id="127:511">
                    <p className="leading-[16px]">Ekspor CSV Log</p>
                  </div>
                </div>
              </div>
              <div className="bg-white content-stretch flex gap-[6px] items-center px-[12px] py-[6px] relative rounded-[8px] shrink-0" data-node-id="127:502" data-name="Button">
                <div className="relative shrink-0 size-[12px]" data-node-id="127:503" data-name="Container">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer2} />
                </div>
                <div className="content-stretch flex flex-col items-center relative shrink-0" data-node-id="127:505" data-name="Container">
                  <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[12px] text-center whitespace-nowrap" data-node-id="127:506">
                    <p className="leading-[16px]">Sinkron Saluran</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[16px] items-start justify-center relative shrink-0 w-full" data-node-id="127:512" data-name="SECTION B: 4 MINI STAT CARDS (RINGKASAN HARI INI)">
            <div className="bg-white content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip p-[16px] relative rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" data-node-id="127:513" data-name="Background+Shadow">
              <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-node-id="127:514" data-name="Container">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[7.5px] items-start leading-[0] pt-[6.5px] relative shrink-0 whitespace-nowrap" data-node-id="127:515" data-name="Container">
                  <div className="flex flex-col font-['Plus_Jakarta_Sans:SemiBold'] font-semibold justify-center relative shrink-0 text-[#565e74] text-[11px] tracking-[0.55px] uppercase" data-node-id="127:516">
                    <p className="leading-[14px]">TOTAL PESANAN TERARAH</p>
                  </div>
                  <div className="h-[40px] relative shrink-0 w-full" data-node-id="127:517" data-name="Paragraph">
                    <div className="-translate-y-1/2 absolute flex flex-col font-['Plus_Jakarta_Sans:ExtraBold'] font-extrabold justify-center left-0 text-[#191c1d] text-[32px] top-[20px]" data-node-id="127:518">
                      <p className="leading-[40px]">{`24 `}</p>
                    </div>
                    <div className="-translate-y-1/2 absolute flex flex-col font-['Plus_Jakarta_Sans:SemiBold'] font-semibold justify-center left-[45.7px] text-[#565e74] text-[14px] top-[27px]" data-node-id="127:519">
                      <p className="leading-[20px]">Ref</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#ffdad6] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[40px]" data-node-id="127:520" data-name="Background">
                  <div className="relative shrink-0 size-[13.75px]" data-node-id="127:521" data-name="Container">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer3} />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip p-[16px] relative rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" data-node-id="127:530" data-name="Background+Shadow">
              <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-node-id="127:531" data-name="Container">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[7.5px] items-start leading-[0] pt-[6.5px] relative shrink-0 whitespace-nowrap" data-node-id="127:532" data-name="Container">
                  <div className="flex flex-col font-['Plus_Jakarta_Sans:SemiBold'] font-semibold justify-center relative shrink-0 text-[#565e74] text-[11px] tracking-[0.55px] uppercase" data-node-id="127:533">
                    <p className="leading-[14px]">SHOPEEFOOD ORDERS</p>
                  </div>
                  <div className="h-[40px] relative shrink-0 w-full" data-node-id="127:534" data-name="Paragraph">
                    <div className="-translate-y-1/2 absolute flex flex-col font-['Plus_Jakarta_Sans:ExtraBold'] font-extrabold justify-center left-0 text-[#a24f9d] text-[32px] top-[20px]" data-node-id="127:535">
                      <p className="leading-[40px]">{`12 `}</p>
                    </div>
                    <div className="-translate-y-1/2 absolute flex flex-col font-['Plus_Jakarta_Sans:SemiBold'] font-semibold justify-center left-[38.06px] text-[#565e74] text-[14px] top-[27px]" data-node-id="127:536">
                      <p className="leading-[20px]">Pesanan</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[rgba(255,218,214,0.2)] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[40px]" data-node-id="127:537" data-name="Overlay">
                  <div className="h-[18.333px] relative shrink-0 w-[13.75px]" data-node-id="127:538" data-name="Container">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer4} />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip p-[16px] relative rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" data-node-id="127:546" data-name="Background+Shadow">
              <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-node-id="127:547" data-name="Container">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[7.5px] items-start leading-[0] pt-[6.5px] relative shrink-0 whitespace-nowrap" data-node-id="127:548" data-name="Container">
                  <div className="flex flex-col font-['Plus_Jakarta_Sans:SemiBold'] font-semibold justify-center relative shrink-0 text-[#565e74] text-[11px] tracking-[0.55px] uppercase" data-node-id="127:549">
                    <p className="leading-[14px]">GOFOOD ORDERS</p>
                  </div>
                  <div className="h-[40px] relative shrink-0 w-full" data-node-id="127:550" data-name="Paragraph">
                    <div className="-translate-y-1/2 absolute flex flex-col font-['Plus_Jakarta_Sans:ExtraBold'] font-extrabold justify-center left-0 text-[#00682b] text-[32px] top-[20px]" data-node-id="127:551">
                      <p className="leading-[40px]">{`8 `}</p>
                    </div>
                    <div className="-translate-y-1/2 absolute flex flex-col font-['Plus_Jakarta_Sans:SemiBold'] font-semibold justify-center left-[26.03px] text-[#565e74] text-[14px] top-[27px]" data-node-id="127:552">
                      <p className="leading-[20px]">Pesanan</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#7ffc97] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[40px]" data-node-id="127:553" data-name="Background">
                  <div className="h-[12.833px] relative shrink-0 w-[18.333px]" data-node-id="127:554" data-name="Container">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer5} />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white content-stretch flex flex-[1_0_0] flex-col h-[100px] items-start min-w-px overflow-clip p-[16px] relative rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" data-node-id="127:562" data-name="Background+Shadow">
              <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-node-id="127:563" data-name="Container">
                <div className="[word-break:break-word] h-[92px] leading-[0] relative shrink-0 w-[155.02px] whitespace-nowrap" data-node-id="127:564" data-name="Container">
                  <div className="-translate-y-1/2 absolute flex flex-col font-['Plus_Jakarta_Sans:SemiBold'] font-semibold justify-center left-0 text-[#565e74] text-[11px] top-[13.5px] tracking-[0.55px] uppercase" data-node-id="127:565">
                    <p className="leading-[14px]">MARKETPLACE / WA</p>
                  </div>
                  <div className="absolute h-[40px] left-0 top-[26px] w-[155.02px]" data-node-id="127:567" data-name="Paragraph">
                    <div className="-translate-y-1/2 absolute flex flex-col font-['Plus_Jakarta_Sans:ExtraBold'] font-extrabold justify-center left-0 text-[#191c1d] text-[32px] top-[20px]" data-node-id="127:568">
                      <p className="leading-[40px]">{`4 `}</p>
                    </div>
                    <div className="-translate-y-1/2 absolute flex flex-col font-['Plus_Jakarta_Sans:SemiBold'] font-semibold justify-center left-[26.95px] text-[#565e74] text-[14px] top-[27px]" data-node-id="127:569">
                      <p className="leading-[20px]">Pesanan</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#dae2fd] content-stretch flex h-[40px] items-center justify-center relative rounded-[12px] shrink-0 w-[36.98px]" data-node-id="127:570" data-name="Background">
                  <div className="h-[18.333px] relative shrink-0 w-[14.667px]" data-node-id="127:571" data-name="Container">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer6} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[_856.38px] relative shrink-0 w-full" data-node-id="127:609" data-name="SECTION D & E: 2-COLUMN MAIN CONTENT (TABLE & DRAWER PREVIEW)">
            <div className="bg-white col-[1/span_8] content-stretch flex flex-col h-[506px] items-start justify-self-stretch overflow-clip relative rounded-[12px] row-1 self-start shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0" data-node-id="127:610" data-name="LEFT: MAIN TABLE DATA (7 OR 8 COLS ON DESKTOP)">
              <div className="bg-[#f3f4f5] content-stretch flex items-center justify-between px-[16px] py-[12px] relative shrink-0 w-full" data-node-id="127:611" data-name="Table Topbar">
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-node-id="127:612" data-name="Container">
                  <div className="h-[16.667px] relative shrink-0 w-[15px]" data-node-id="127:613" data-name="Container">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer7} />
                  </div>
                  <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="127:615" data-name="Container">
                    <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[16px] whitespace-nowrap" data-node-id="127:616">
                      <p className="leading-[22px]">Log Pengalihan Pesanan</p>
                    </div>
                  </div>
                  <div className="bg-[#ffdad6] content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-[9999px] shrink-0" data-node-id="127:617" data-name="Background">
                    <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#93000b] text-[11px] whitespace-nowrap" data-node-id="127:618">
                      <p className="leading-[14px]">6 Terkini</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start overflow-auto relative shrink-0 w-full" data-node-id="127:621" data-name="Table Responsive">
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-[1014.44px]" data-node-id="127:622" data-name="Table">
                  <div className="bg-[rgba(243,244,245,0.5)] content-stretch flex items-start justify-center relative shrink-0 w-full" data-node-id="127:623" data-name="Header → Row">
                    <div className="content-stretch flex flex-col items-start pb-[19.5px] pt-[18.5px] px-[16px] relative shrink-0 w-[186.83px]" data-node-id="127:624" data-name="Cell">
                      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#565e74] text-[11px] tracking-[0.55px] uppercase whitespace-nowrap" data-node-id="127:625">
                        <p className="leading-[14px]">NO. REFERENSI</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start pb-[19.5px] pt-[18.5px] px-[12px] relative shrink-0 w-[82px]" data-node-id="127:626" data-name="Cell">
                      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#565e74] text-[11px] tracking-[0.55px] uppercase whitespace-nowrap" data-node-id="127:627">
                        <p className="leading-[14px]">WAKTU</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start pb-[19.5px] pt-[18.5px] px-[12px] relative shrink-0 w-[169.8px]" data-node-id="127:628" data-name="Cell">
                      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#565e74] text-[11px] tracking-[0.55px] uppercase whitespace-nowrap" data-node-id="127:629">
                        <p className="leading-[14px]">PELANGGAN</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start pb-[19.5px] pt-[18.5px] px-[12px] relative shrink-0 w-[200px]" data-node-id="127:630" data-name="Cell">
                      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#565e74] text-[11px] tracking-[0.55px] uppercase whitespace-nowrap" data-node-id="127:631">
                        <p className="leading-[14px]">ITEM PESANAN</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-center pb-[19.5px] pt-[18.5px] px-[12px] relative shrink-0 w-[173.44px]" data-node-id="127:632" data-name="Cell">
                      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#565e74] text-[11px] text-center tracking-[0.55px] uppercase whitespace-nowrap" data-node-id="127:633">
                        <p className="leading-[14px]">PLATFORM TUJUAN</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-center p-[12px] relative shrink-0 w-[101.05px]" data-node-id="127:634" data-name="Cell">
                      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#565e74] text-[11px] text-center tracking-[0.55px] uppercase whitespace-nowrap" data-node-id="127:635">
                        <p className="leading-[14px] mb-0">STATUS</p>
                        <p className="leading-[14px]">PENGALIHAN</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-center pb-[19.5px] pt-[18.5px] px-[16px] relative shrink-0 w-[101.33px]" data-node-id="127:636" data-name="Cell">
                      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#565e74] text-[11px] text-center tracking-[0.55px] uppercase whitespace-nowrap" data-node-id="127:637">
                        <p className="leading-[14px]">AKSI</p>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:638" data-name="Body">
                    <div className="bg-[rgba(255,218,214,0.2)] content-stretch flex items-center justify-center mb-[-1px] relative shrink-0 w-full" data-node-id="127:639" data-name="Row">
                      <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-[154.83px]" data-node-id="127:640" data-name="Data">
                        <div className="bg-[#a24f9d] relative rounded-[9999px] shrink-0 size-[6px]" data-node-id="127:641" data-name="Background" />
                        <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="127:642" data-name="Container">
                          <div className="[word-break:break-word] flex flex-col font-['Liberation_Mono:Bold'] justify-center leading-[0] not-italic relative shrink-0 text-[#a24f9d] text-[14px] whitespace-nowrap" data-node-id="127:643">
                            <p className="leading-[20px]">#REF-20241024-025</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col items-start pb-[19px] pl-[28px] pr-[12px] pt-[17.5px] relative shrink-0 w-[98px]" data-node-id="127:644" data-name="Data">
                        <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#565e74] text-[12px] whitespace-nowrap" data-node-id="127:645">
                          <p className="leading-[16px]">14:10 WIB</p>
                        </div>
                      </div>
                      <div className="[word-break:break-word] h-[52.5px] leading-[0] relative shrink-0 w-[169.8px] whitespace-nowrap" data-node-id="127:646" data-name="Data">
                        <div className="-translate-y-1/2 absolute flex flex-col font-['Plus_Jakarta_Sans:SemiBold'] font-semibold justify-center left-[12px] text-[#191c1d] text-[14px] top-[26px]" data-node-id="127:647">
                          <p className="leading-[20px]">{`Mas Dedi `}</p>
                        </div>
                        <div className="-translate-y-1/2 absolute flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center left-[76.17px] text-[#565e74] text-[11px] top-[27.5px]" data-node-id="127:648">
                          <p className="leading-[14px]">(Order Cepat)</p>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col items-start max-w-[200px] overflow-clip pb-[16.5px] pt-[16px] px-[12px] relative shrink-0 w-[200px]" data-node-id="127:649" data-name="Data">
                        <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] overflow-hidden relative shrink-0 text-[#565e74] text-[14px] text-ellipsis whitespace-nowrap" data-node-id="127:650">
                          <p className="leading-[20px]">2x Cireng Rujak, 1x Jeletot, 1x Goreng Matang</p>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col items-center pb-[15.5px] pt-[15px] px-[12px] relative shrink-0 w-[173.44px]" data-node-id="127:651" data-name="Data">
                        <div className="bg-[#ffdad6] content-stretch flex gap-[3.99px] items-center px-[10px] py-[4px] relative rounded-[9999px] shrink-0" data-node-id="127:652" data-name="Paragraph+Background">
                          <div className="h-[11.667px] relative shrink-0 w-[8.75px]" data-node-id="127:653" data-name="Icon">
                            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
                          </div>
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#93000b] text-[11px] text-center whitespace-nowrap" data-node-id="127:654">
                            <p className="leading-[14px]">ShopeeFood</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col items-center pb-[16px] pt-[18.5px] px-[12px] relative shrink-0 w-[101.05px]" data-node-id="127:655" data-name="Data">
                        <div className="bg-[rgba(0,132,56,0.15)] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[9999px] shrink-0" data-node-id="127:656" data-name="Overlay">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#00682b] text-[11px] text-center whitespace-nowrap" data-node-id="127:657">
                            <p className="leading-[14px]">Terkirim</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex gap-[4px] items-center justify-center pl-[16px] relative shrink-0 w-[85.33px]" data-node-id="127:658" data-name="Data">
                        <div className="bg-[#a24f9d] content-stretch flex flex-col items-center justify-center px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-node-id="127:659" data-name="Button">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[11px] text-center text-white whitespace-nowrap" data-node-id="127:660">
                            <p className="leading-[14px]">Detail</p>
                          </div>
                        </div>
                        <div className="h-[20.5px] relative shrink-0 w-[14.5px]" data-node-id="127:661" data-name="Button">
                          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgButton} />
                        </div>
                      </div>
                    </div>
                    <div className="border-[rgba(231,232,233,0.4)] border-solid border-t content-stretch flex items-center justify-center mb-[-1px] pr-[16px] pt-px relative shrink-0 w-full" data-node-id="127:663" data-name="Row">
                      <div className="relative shrink-0 w-[186.83px]" data-node-id="127:664" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[15.5px] pt-[17.5px] px-[16px] relative size-full">
                          <div className="[word-break:break-word] flex flex-col font-['Liberation_Mono:Bold'] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[14px] whitespace-nowrap" data-node-id="127:665">
                            <p className="leading-[20px]">#REF-20241024-024</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-[82px]" data-node-id="127:666" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[19px] pt-[18px] px-[12px] relative size-full">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#565e74] text-[12px] whitespace-nowrap" data-node-id="127:667">
                            <p className="leading-[16px]">13:42 WIB</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-[169.8px]" data-node-id="127:668" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[12px] py-[16.5px] relative size-full">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[14px] whitespace-nowrap" data-node-id="127:669">
                            <p className="leading-[20px]">Ibu Dewi Permata</p>
                          </div>
                        </div>
                      </div>
                      <div className="max-w-[200px] relative shrink-0 w-[200px]" data-node-id="127:670" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] overflow-clip px-[12px] py-[16.5px] relative rounded-[inherit] size-full">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] overflow-hidden relative shrink-0 text-[#565e74] text-[14px] text-ellipsis whitespace-nowrap" data-node-id="127:671">
                            <p className="leading-[20px]">2x Cireng Rujak, 1x Besek Oleh-oleh</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-[173.44px]" data-node-id="127:672" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center px-[12px] py-[15.5px] relative size-full">
                          <div className="bg-[#7ffc97] content-stretch flex gap-[4px] items-center px-[10px] py-[4px] relative rounded-[9999px] shrink-0" data-node-id="127:673" data-name="Paragraph+Background">
                            <div className="h-[8.167px] relative shrink-0 w-[11.667px]" data-node-id="127:674" data-name="Icon">
                              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon1} />
                            </div>
                            <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#002109] text-[11px] text-center whitespace-nowrap" data-node-id="127:675">
                              <p className="leading-[14px]">GoFood</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-[101.05px]" data-node-id="127:676" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pb-[16px] pt-[19px] px-[12px] relative size-full">
                          <div className="bg-[rgba(0,132,56,0.15)] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[9999px] shrink-0" data-node-id="127:677" data-name="Overlay">
                            <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#00682b] text-[11px] text-center whitespace-nowrap" data-node-id="127:678">
                              <p className="leading-[14px]">Selesai</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-[85.33px]" data-node-id="127:679" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center justify-center pl-[16px] relative size-full">
                          <div className="bg-[#e7e8e9] content-stretch flex flex-col items-center justify-center px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-node-id="127:680" data-name="Button">
                            <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[11px] text-center whitespace-nowrap" data-node-id="127:681">
                              <p className="leading-[14px]">Detail</p>
                            </div>
                          </div>
                          <div className="h-[20.5px] relative shrink-0 w-[14.5px]" data-node-id="127:682" data-name="Button">
                            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgButton} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-[rgba(231,232,233,0.4)] border-solid border-t content-stretch flex items-center justify-center mb-[-1px] pr-[16px] pt-px relative shrink-0 w-full" data-node-id="127:684" data-name="Row">
                      <div className="relative shrink-0 w-[186.83px]" data-node-id="127:685" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[15.5px] pt-[17.5px] px-[16px] relative size-full">
                          <div className="[word-break:break-word] flex flex-col font-['Liberation_Mono:Bold'] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[14px] whitespace-nowrap" data-node-id="127:686">
                            <p className="leading-[20px]">#REF-20241024-023</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-[82px]" data-node-id="127:687" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[19px] pt-[18px] px-[12px] relative size-full">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#565e74] text-[12px] whitespace-nowrap" data-node-id="127:688">
                            <p className="leading-[16px]">13:25 WIB</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-[169.8px]" data-node-id="127:689" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[12px] py-[16.5px] relative size-full">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[14px] whitespace-nowrap" data-node-id="127:690">
                            <p className="leading-[20px]">Kang Budi Cileunyi</p>
                          </div>
                        </div>
                      </div>
                      <div className="max-w-[200px] relative shrink-0 w-[200px]" data-node-id="127:691" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] overflow-clip px-[12px] py-[16.5px] relative rounded-[inherit] size-full">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#565e74] text-[14px] whitespace-nowrap" data-node-id="127:692">
                            <p className="leading-[20px]">3x Cireng Goreng Matang</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-[173.44px]" data-node-id="127:693" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center px-[12px] py-[15.5px] relative size-full">
                          <div className="bg-[#ffdad6] content-stretch flex gap-[3.99px] items-center px-[10px] py-[4px] relative rounded-[9999px] shrink-0" data-node-id="127:694" data-name="Paragraph+Background">
                            <div className="h-[11.667px] relative shrink-0 w-[8.75px]" data-node-id="127:695" data-name="Icon">
                              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
                            </div>
                            <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#93000b] text-[11px] text-center whitespace-nowrap" data-node-id="127:696">
                              <p className="leading-[14px]">ShopeeFood</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-[101.05px]" data-node-id="127:697" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pb-[16px] pt-[19px] px-[12px] relative size-full">
                          <div className="bg-[rgba(0,132,56,0.15)] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[9999px] shrink-0" data-node-id="127:698" data-name="Overlay">
                            <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#00682b] text-[11px] text-center whitespace-nowrap" data-node-id="127:699">
                              <p className="leading-[14px]">Terkirim</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-[85.33px]" data-node-id="127:700" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center justify-center pl-[16px] relative size-full">
                          <div className="bg-[#e7e8e9] content-stretch flex flex-col items-center justify-center px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-node-id="127:701" data-name="Button">
                            <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[11px] text-center whitespace-nowrap" data-node-id="127:702">
                              <p className="leading-[14px]">Detail</p>
                            </div>
                          </div>
                          <div className="h-[20.5px] relative shrink-0 w-[14.5px]" data-node-id="127:703" data-name="Button">
                            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgButton} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-[rgba(231,232,233,0.4)] border-solid border-t content-stretch flex items-center justify-center mb-[-1px] pr-[16px] pt-px relative shrink-0 w-full" data-node-id="127:705" data-name="Row">
                      <div className="relative shrink-0 w-[186.83px]" data-node-id="127:706" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[15.5px] pt-[17.5px] px-[16px] relative size-full">
                          <div className="[word-break:break-word] flex flex-col font-['Liberation_Mono:Bold'] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[14px] whitespace-nowrap" data-node-id="127:707">
                            <p className="leading-[20px]">#REF-20241024-022</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-[82px]" data-node-id="127:708" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[19px] pt-[18px] px-[12px] relative size-full">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#565e74] text-[12px] whitespace-nowrap" data-node-id="127:709">
                            <p className="leading-[16px]">12:50 WIB</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-[169.8px]" data-node-id="127:710" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[12px] py-[16.5px] relative size-full">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[14px] whitespace-nowrap" data-node-id="127:711">
                            <p className="leading-[20px]">Teh Nengsih</p>
                          </div>
                        </div>
                      </div>
                      <div className="max-w-[200px] relative shrink-0 w-[200px]" data-node-id="127:712" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] overflow-clip px-[12px] py-[16.5px] relative rounded-[inherit] size-full">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] overflow-hidden relative shrink-0 text-[#565e74] text-[14px] text-ellipsis whitespace-nowrap" data-node-id="127:713">
                            <p className="leading-[20px]">4x Cireng Pedas, 2x Cireng Keju</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-[173.44px]" data-node-id="127:714" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center px-[12px] py-[15.5px] relative size-full">
                          <div className="bg-[rgba(0,132,56,0.15)] content-stretch flex gap-[3.99px] items-center px-[10px] py-[4px] relative rounded-[9999px] shrink-0" data-node-id="127:715" data-name="Paragraph+Overlay">
                            <div className="relative shrink-0 size-[11.667px]" data-node-id="127:716" data-name="Icon">
                              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon2} />
                            </div>
                            <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#00682b] text-[11px] text-center whitespace-nowrap" data-node-id="127:717">
                              <p className="leading-[14px]">WhatsApp Order</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-[101.05px]" data-node-id="127:718" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pb-[16px] pt-[19px] px-[12px] relative size-full">
                          <div className="bg-[rgba(0,132,56,0.15)] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[9999px] shrink-0" data-node-id="127:719" data-name="Overlay">
                            <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#00682b] text-[11px] text-center whitespace-nowrap" data-node-id="127:720">
                              <p className="leading-[14px]">Terkirim</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-[85.33px]" data-node-id="127:721" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center justify-center pl-[16px] relative size-full">
                          <div className="bg-[#e7e8e9] content-stretch flex flex-col items-center justify-center px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-node-id="127:722" data-name="Button">
                            <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[11px] text-center whitespace-nowrap" data-node-id="127:723">
                              <p className="leading-[14px]">Detail</p>
                            </div>
                          </div>
                          <div className="h-[20.5px] relative shrink-0 w-[14.5px]" data-node-id="127:724" data-name="Button">
                            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgButton} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-[rgba(231,232,233,0.4)] border-solid border-t content-stretch flex items-center justify-center mb-[-1px] pr-[16px] pt-px relative shrink-0 w-full" data-node-id="127:726" data-name="Row">
                      <div className="relative shrink-0 w-[186.83px]" data-node-id="127:727" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[15.5px] pt-[17.5px] px-[16px] relative size-full">
                          <div className="[word-break:break-word] flex flex-col font-['Liberation_Mono:Bold'] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[14px] whitespace-nowrap" data-node-id="127:728">
                            <p className="leading-[20px]">#REF-20241024-021</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-[82px]" data-node-id="127:729" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[19px] pt-[18px] px-[12px] relative size-full">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#565e74] text-[12px] whitespace-nowrap" data-node-id="127:730">
                            <p className="leading-[16px]">11:15 WIB</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-[169.8px]" data-node-id="127:731" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[12px] py-[16.5px] relative size-full">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[14px] whitespace-nowrap" data-node-id="127:732">
                            <p className="leading-[20px]">Pelanggan Walk-In</p>
                          </div>
                        </div>
                      </div>
                      <div className="max-w-[200px] relative shrink-0 w-[200px]" data-node-id="127:733" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] overflow-clip px-[12px] py-[16.5px] relative rounded-[inherit] size-full">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] overflow-hidden relative shrink-0 text-[#565e74] text-[14px] text-ellipsis whitespace-nowrap" data-node-id="127:734">
                            <p className="leading-[20px]">1x Cireng Rujak, 1x Seblak Instan</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-[173.44px]" data-node-id="127:735" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center px-[12px] py-[15.5px] relative size-full">
                          <div className="bg-[#7ffc97] content-stretch flex gap-[4px] items-center px-[10px] py-[4px] relative rounded-[9999px] shrink-0" data-node-id="127:736" data-name="Paragraph+Background">
                            <div className="h-[8.167px] relative shrink-0 w-[11.667px]" data-node-id="127:737" data-name="Icon">
                              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon1} />
                            </div>
                            <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#002109] text-[11px] text-center whitespace-nowrap" data-node-id="127:738">
                              <p className="leading-[14px]">GoFood</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-[101.05px]" data-node-id="127:739" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pb-[16px] pt-[19px] px-[12px] relative size-full">
                          <div className="bg-[rgba(0,132,56,0.15)] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[9999px] shrink-0" data-node-id="127:740" data-name="Overlay">
                            <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#00682b] text-[11px] text-center whitespace-nowrap" data-node-id="127:741">
                              <p className="leading-[14px]">Selesai</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-[85.33px]" data-node-id="127:742" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center justify-center pl-[16px] relative size-full">
                          <div className="bg-[#e7e8e9] content-stretch flex flex-col items-center justify-center px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-node-id="127:743" data-name="Button">
                            <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[11px] text-center whitespace-nowrap" data-node-id="127:744">
                              <p className="leading-[14px]">Detail</p>
                            </div>
                          </div>
                          <div className="h-[20.5px] relative shrink-0 w-[14.5px]" data-node-id="127:745" data-name="Button">
                            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgButton} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-[rgba(231,232,233,0.4)] border-solid border-t content-stretch flex items-center justify-center pr-[16px] pt-px relative shrink-0 w-full" data-node-id="127:747" data-name="Row">
                      <div className="relative shrink-0 w-[186.83px]" data-node-id="127:748" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[15px] pt-[17.5px] px-[16px] relative size-full">
                          <div className="[word-break:break-word] flex flex-col font-['Liberation_Mono:Bold'] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[14px] whitespace-nowrap" data-node-id="127:749">
                            <p className="leading-[20px]">#REF-20241024-020</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-[82px]" data-node-id="127:750" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[18.5px] pt-[18px] px-[12px] relative size-full">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#565e74] text-[12px] whitespace-nowrap" data-node-id="127:751">
                            <p className="leading-[16px]">10:30 WIB</p>
                          </div>
                        </div>
                      </div>
                      <div className="h-[52.5px] relative shrink-0 w-[169.8px]" data-node-id="127:752" data-name="Data">
                        <div className="[word-break:break-word] bg-clip-padding border-0 border-[transparent] border-solid leading-[0] relative size-full whitespace-nowrap">
                          <div className="-translate-y-1/2 absolute flex flex-col font-['Plus_Jakarta_Sans:SemiBold'] font-semibold justify-center left-[12px] text-[#191c1d] text-[14px] top-[26.5px]" data-node-id="127:753">
                            <p className="leading-[20px]">{`Pak Herman `}</p>
                          </div>
                          <div className="-translate-y-1/2 absolute flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center left-[94.58px] text-[#565e74] text-[11px] top-[28px]" data-node-id="127:754">
                            <p className="leading-[14px]">(Wisatawan)</p>
                          </div>
                        </div>
                      </div>
                      <div className="max-w-[200px] relative shrink-0 w-[200px]" data-node-id="127:755" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] overflow-clip pb-[16px] pt-[16.5px] px-[12px] relative rounded-[inherit] size-full">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#565e74] text-[14px] whitespace-nowrap" data-node-id="127:756">
                            <p className="leading-[20px]">2x Paket Bundling Besek</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-[173.44px]" data-node-id="127:757" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pb-[15px] pt-[15.5px] px-[12px] relative size-full">
                          <div className="bg-[#dae2fd] content-stretch flex gap-[3.99px] items-center px-[10px] py-[4px] relative rounded-[9999px] shrink-0" data-node-id="127:758" data-name="Paragraph+Background">
                            <div className="h-[11.667px] relative shrink-0 w-[9.333px]" data-node-id="127:759" data-name="Icon">
                              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon3} />
                            </div>
                            <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#131b2e] text-[11px] text-center whitespace-nowrap" data-node-id="127:760">
                              <p className="leading-[14px]">Shopee Marketplace</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-[101.05px]" data-node-id="127:761" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pb-[15.5px] pt-[19px] px-[12px] relative size-full">
                          <div className="bg-[rgba(0,132,56,0.15)] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[9999px] shrink-0" data-node-id="127:762" data-name="Overlay">
                            <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#00682b] text-[11px] text-center whitespace-nowrap" data-node-id="127:763">
                              <p className="leading-[14px]">Selesai</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-[85.33px]" data-node-id="127:764" data-name="Data">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center justify-center pl-[16px] relative size-full">
                          <div className="bg-[#e7e8e9] content-stretch flex flex-col items-center justify-center px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-node-id="127:765" data-name="Button">
                            <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[11px] text-center whitespace-nowrap" data-node-id="127:766">
                              <p className="leading-[14px]">Detail</p>
                            </div>
                          </div>
                          <div className="h-[20.5px] relative shrink-0 w-[14.5px]" data-node-id="127:767" data-name="Button">
                            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgButton} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-[9/span_4] content-stretch flex flex-col items-start justify-self-stretch relative row-1 self-start shrink-0" data-node-id="127:823" data-name="RIGHT: SECTION E - DRAWER / DETAIL TRANSAKSI PANEL">
              <div className="bg-white content-stretch flex flex-col items-start overflow-clip relative rounded-[12px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] shrink-0 w-full" data-node-id="127:824" data-name="Background+Shadow">
                <div className="bg-[rgba(231,232,233,0.6)] content-stretch flex items-start justify-between p-[16px] relative shrink-0 w-full" data-node-id="127:825" data-name="Overlay">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-[192.2px]" data-node-id="127:826" data-name="Container">
                    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="127:827" data-name="Container">
                      <div className="bg-[#a24f9d] h-[8px] relative rounded-[9999px] shrink-0 w-[7.34px]" data-node-id="127:828" data-name="Background" />
                      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#a24f9d] text-[11px] tracking-[0.55px] uppercase whitespace-nowrap" data-node-id="127:829">
                        <p className="leading-[14px] mb-0">DETAIL PENGALIHAN PESANAN</p>
                        <p className="leading-[14px]">PLATFORM</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-[25.667px] relative shrink-0 w-[19.667px]" data-node-id="127:832" data-name="Button">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgButton1} />
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[16px] items-start p-[16px] relative shrink-0 w-full" data-node-id="127:834" data-name="Container">
                  <div className="bg-[#f3f4f5] content-stretch flex flex-col gap-[5.5px] items-start p-[12px] relative rounded-[8px] shrink-0 w-full" data-node-id="127:835" data-name="Background">
                    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="127:836" data-name="Container">
                      <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="127:837" data-name="Container">
                        <div className="relative shrink-0 size-[13.333px]" data-node-id="127:838" data-name="Container">
                          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer8} />
                        </div>
                        <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#565e74] text-[12px] whitespace-nowrap" data-node-id="127:840">
                          <p className="leading-[16px]">Operator Kasir</p>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="127:841" data-name="Strong">
                        <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[12px] whitespace-nowrap" data-node-id="127:842">
                          <p className="leading-[16px]">Rina Oktaviani</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="127:843" data-name="Container">
                      <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="127:844" data-name="Container">
                        <div className="h-[13.333px] relative shrink-0 w-[9.333px]" data-node-id="127:845" data-name="Container">
                          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer9} />
                        </div>
                        <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#565e74] text-[12px] whitespace-nowrap" data-node-id="127:847">
                          <p className="leading-[16px]">Outlet Asal</p>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="127:848" data-name="Container">
                        <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[12px] whitespace-nowrap" data-node-id="127:849">
                          <p className="leading-[16px]">Outlet Pusat Cikutra</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="127:850" data-name="Container">
                      <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="127:851" data-name="Container">
                        <div className="relative shrink-0 size-[13.333px]" data-node-id="127:852" data-name="Container">
                          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer10} />
                        </div>
                        <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#565e74] text-[12px] whitespace-nowrap" data-node-id="127:854">
                          <p className="leading-[16px]">Waktu Dialihkan</p>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="127:855" data-name="Container">
                        <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Medium'] font-medium justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[12px] whitespace-nowrap" data-node-id="127:856">
                          <p className="leading-[16px]">24 Okt 2024, 14:10 WIB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:916" data-name="Container">
                    <div className="bg-[#e7e8e9] content-stretch flex gap-[8px] items-center justify-center py-[10px] relative rounded-[8px] shrink-0 w-full" data-node-id="127:922" data-name="Button">
                      <div className="relative shrink-0 size-[15px]" data-node-id="127:923" data-name="Container">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer11} />
                      </div>
                      <div className="content-stretch flex flex-col items-center relative shrink-0" data-node-id="127:925" data-name="Container">
                        <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[12px] text-center whitespace-nowrap" data-node-id="127:926">
                          <p className="leading-[16px]">Kirim Link ke WhatsApp Pelanggan</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[rgba(218,226,253,0.3)] content-stretch flex gap-[10px] items-start p-[8px] relative rounded-[8px] shrink-0 w-full" data-node-id="127:927" data-name="Overlay">
                    <div className="h-[17px] relative shrink-0 w-[15px]" data-node-id="127:928" data-name="Margin">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgMargin} />
                    </div>
                    <div className="h-[89.38px] relative shrink-0 w-[222.67px]" data-node-id="127:930" data-name="Container">
                      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:ExtraBold'] font-extrabold justify-center leading-[0] left-0 text-[#3f465c] text-[11px] top-[44.25px] whitespace-nowrap" data-node-id="127:931">
                        <p className="leading-[17.88px] mb-0">Sistem Non-Tunai / Log Pengalihan:</p>
                        <p className="font-['Plus_Jakarta_Sans:Bold'] font-bold leading-[17.88px] mb-0">Outlet beroperasi sebagai titik pengarah</p>
                        <p className="font-['Plus_Jakarta_Sans:Bold'] font-bold leading-[17.88px] mb-0">pesanan. Seluruh transaksi pembayaran</p>
                        <p className="font-['Plus_Jakarta_Sans:Bold'] font-bold leading-[17.88px] mb-0">diproses langsung oleh platform</p>
                        <p className="font-['Plus_Jakarta_Sans:Bold'] font-bold leading-[17.88px]">penyedia layanan.</p>
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
