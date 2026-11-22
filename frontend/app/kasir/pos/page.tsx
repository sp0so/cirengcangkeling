'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppShell from '../../components/AppShell';
import { useApp } from '../../lib/context';

const imgCirengRujakOriginal = "/figma/9b2f3f9fc7cb73f2f581eb33bc35033fca2efd89.png";
const imgCirengPedasJeletot = "/figma/078a4b8feddf4b35797f74c6f321158cbdea2cde.png";
const imgCirengKejuMeltedMozzarella = "/figma/e849c57313a32cd53f87d89d03ce0a80fdcd261c.png";
const imgCirengKuahSeblak = "/figma/58490d9e874c87dbcf7dcb015f907380154007c1.png";
const imgCirengGorengMatangBox = "/figma/9f24403fce0435826fcd7c7d13969110b3b888d2.png";
const imgPaketBundlingBesek = "/figma/baf5e8b3d826e24305be9995e739c3c75a1a1b89.png";
const imgImage5 = "/figma/cdcc004194fc85647526629fb6822fd54bbd911e.png";
const imgContainer = "/figma/8530dace73331944f80397dc867fbe4fdce5339b.svg";
const imgContainer1 = "/figma/37ea56d0852eb3a6d873d8911b834a512fb9eff4.svg";
const imgContainer2 = "/figma/f03dd2046a786a33330c805c230bcb502c119367.svg";
const imgContainer3 = "/figma/a27904bfabef7ea1a57b3654cf876b775fea6099.svg";
const imgContainer4 = "/figma/84aa3e72493d4048d7449a3bfa2e89941dfca31f.svg";
const imgContainer5 = "/figma/0796a7a1ec512a934ab415d54cf8b5c178665d20.svg";
const imgContainer6 = "/figma/5707bf71d2457ec9403793fe8263d92a085a2da1.svg";
const imgContainer7 = "/figma/a666407a75f9d8e1d5c57513c68f5d0b31cb9cc3.svg";
const imgContainer8 = "/figma/c651ae7b4f25ee4146a9a338fab2668a478c5fe0.svg";
const imgContainer9 = "/figma/68fdd9d55cffcd472b3c226b9cb2b7bf6758b7c5.svg";
const imgContainer10 = "/figma/e8308ebb56616aba2a94bd15a93744687b1fb14a.svg";
const imgContainer11 = "/figma/c07229df91955a866988da0b562c775c5e56876c.svg";
const imgContainer12 = "/figma/036179cdf0faa85aac02da6df0fd50d1e2a91dbe.svg";
const imgContainer13 = "/figma/665f402bde387cb12a98343e2c96b71306628e34.svg";
const imgContainer14 = "/figma/b0f6afec0719430df22696c1b3f5b73d8072d1b2.svg";
const imgIcon = "/figma/adf5a3c5e7011966580c9d7fa4d8902633bcccf9.svg";
const imgContainer15 = "/figma/b90974d71b62dfdff99f44ccfb99e91351855b85.svg";
const imgContainer16 = "/figma/fd5d3085134aaae58dc530c304082fdcce372ba1.svg";
const imgContainer17 = "/figma/5668d7bcd6a21e2ff965092e60ad48d0a1c91560.svg";
const imgContainer18 = "/figma/87d18b5bf80bc048e66f8d00280e0ff37738e386.svg";
const imgContainer19 = "/figma/be8368c0ef82e806d3593eb13398fcf283edc487.svg";
const imgContainer20 = "/figma/8ba326378104e0eb1dda21e13e0156132e320f42.svg";

export default function PosKasirPage() {
  const { products, currentUser, addToCart } = useApp();
  const [activeCategory, setActiveCategory] = useState<'all' | 'frozen' | 'ready' | 'besek'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <AppShell>
      <div className="w-full font-sans max-w-[1280px] mx-auto min-h-screen relative pb-16">
        <div className="relative min-h-[1134px] w-full">
          <div className="absolute bg-white border border-[#edeeef] border-solid drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[119px] left-[24px] rounded-[16px] top-[24px] w-[944px]" data-node-id="127:2164" data-name="Top Operational & Channel Navigation Strip">
            <div className="absolute h-[85px] left-[16px] top-[16px] w-[426.47px]" data-node-id="127:2165" data-name="Container">
              <div className="absolute h-[33px] left-0 top-0 w-[426.47px]" data-node-id="127:2173" data-name="Heading 1">
                <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] left-0 text-[#191c1d] text-[24px] top-[16.5px] tracking-[-0.6px] whitespace-nowrap" data-node-id="127:2174">
                  <p className="leading-[33px]">{`Katalog Produk & Saluran Pemesanan`}</p>
                </div>
              </div>
              <div className="absolute h-[48px] left-0 top-[37px] w-[426.47px]" data-node-id="127:2175" data-name="Container">
                <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] left-0 text-[#565e74] text-[16px] top-[24px] whitespace-nowrap" data-node-id="127:2176">
                  <p className="leading-[24px] mb-0">Kelola katalog, pantau ketersediaan produk, dan arahkan</p>
                  <p className="leading-[24px]">pemesanan pelanggan ke channel online resmi.</p>
                </div>
              </div>
            </div>
            <div className="absolute h-[84px] left-[500.11px] top-[16.5px] w-[425.89px]" data-node-id="127:2177" data-name="Quick Shift Status & Online Channels">
              <div className="absolute bg-[rgba(238,77,45,0.1)] h-[36px] left-[302.89px] rounded-[9999px] top-[-7.5px] w-[101.277px]" data-node-id="127:2182" data-name="Link">
                <div className="absolute h-[13.333px] left-[12px] top-[11.33px] w-[10.667px]" data-node-id="127:2183" data-name="Container">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer} />
                </div>
                <div className="absolute h-[24px] left-[28.67px] top-[6px] w-[60.61px]" data-node-id="127:2185" data-name="Container">
                  <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] left-0 text-[#ee4d2d] text-[16px] top-[12px] whitespace-nowrap" data-node-id="127:2186">
                    <p className="leading-[24px]">Shopee</p>
                  </div>
                </div>
              </div>
              <div className="absolute bg-[#f94e2e] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[36px] left-[142.89px] rounded-[9999px] top-[-7.5px] w-[144.743px]" data-node-id="127:2187" data-name="Link">
                <div className="absolute h-[12px] left-[12px] top-[12px] w-[13.333px]" data-node-id="127:2188" data-name="Container">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer1} />
                </div>
                <div className="absolute h-[24px] left-[31.33px] top-[6px] w-[101.41px]" data-node-id="127:2190" data-name="Container">
                  <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] left-0 text-[16px] text-white top-[12px] whitespace-nowrap" data-node-id="127:2191">
                    <p className="leading-[24px]">ShopeeFood</p>
                  </div>
                </div>
              </div>
              <div className="absolute bg-[#d02428] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[36px] left-[154.41px] rounded-[9999px] top-[48.5px] w-[107.493px]" data-node-id="127:2192" data-name="Link">
                <div className="absolute h-[9.333px] left-[12px] top-[13.33px] w-[13.333px]" data-node-id="127:2193" data-name="Container">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer2} />
                </div>
                <div className="absolute h-[24px] left-[31.33px] top-[6px] w-[64.16px]" data-node-id="127:2195" data-name="Container">
                  <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] left-0 text-[16px] text-white top-[12px] whitespace-nowrap" data-node-id="127:2196">
                    <p className="leading-[24px]">GoFood</p>
                  </div>
                </div>
              </div>
              <div className="absolute bg-[#008438] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[36px] left-[277.56px] rounded-[9999px] top-[48.5px] w-[125.993px]" data-node-id="127:2197" data-name="Link">
                <div className="absolute left-[12px] size-[13.333px] top-[11.33px]" data-node-id="127:2198" data-name="Container">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer3} />
                </div>
                <div className="absolute h-[24px] left-[31.33px] top-[6px] w-[82.66px]" data-node-id="127:2200" data-name="Container">
                  <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] left-0 text-[16px] text-white top-[12px] whitespace-nowrap" data-node-id="127:2201">
                    <p className="leading-[24px]">WhatsApp</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bg-white border border-[#edeeef] border-solid drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[69px] left-[24px] rounded-[16px] top-[159px] w-[944px]" data-node-id="127:2202" data-name="Search & Minimalist Filter">
            <div className="absolute h-[43px] left-[12px] top-[12px] w-[384px]" data-node-id="127:2203" data-name="Container">
              <div className="absolute bg-[#f3f4f5] h-[43px] left-0 overflow-clip rounded-[12px] top-0 w-[384px]" data-node-id="127:2204" data-name="Input">
                <div className="absolute h-[20px] left-[44px] overflow-clip top-[11px] w-[324px]" data-node-id="127:2205" data-name="Container">
                  <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] left-0 text-[#565e74] text-[16px] top-[10px] whitespace-nowrap" data-node-id="127:2206">
                    <p className="leading-[normal]">Cari varian cireng atau SKU...</p>
                  </div>
                </div>
              </div>
              <div className="absolute h-[19.545px] left-[14px] top-[11.73px] w-[15px]" data-node-id="127:2207" data-name="Container">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer4} />
              </div>
            </div>
            <div className="absolute h-[30px] left-[508.25px] overflow-auto top-[18.5px] w-[421.75px]" data-node-id="127:2209" data-name="Clean Filter Pills">
              <div className="absolute bg-[#a24f9d] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[30px] left-0 rounded-[8px] top-0 w-[81.31px]" data-node-id="127:2210" data-name="Button">
                <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Medium'] font-medium justify-center leading-[0] left-[40.66px] text-[12px] text-center text-white top-[15px] whitespace-nowrap" data-node-id="127:2211">
                  <p className="leading-[18px]">Semua (8)</p>
                </div>
              </div>
              <div className="absolute bg-[#f3f4f5] h-[30px] left-[89.31px] rounded-[8px] top-0 w-[103.66px]" data-node-id="127:2212" data-name="Button">
                <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Medium'] font-medium justify-center leading-[0] left-[51.83px] text-[#565e74] text-[12px] text-center top-[15px] whitespace-nowrap" data-node-id="127:2213">
                  <p className="leading-[18px]">Frozen Vakum</p>
                </div>
              </div>
              <div className="absolute bg-[#f3f4f5] h-[30px] left-[200.97px] rounded-[8px] top-0 w-[117.94px]" data-node-id="127:2214" data-name="Button">
                <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Medium'] font-medium justify-center leading-[0] left-[58.97px] text-[#565e74] text-[12px] text-center top-[15px] whitespace-nowrap" data-node-id="127:2215">
                  <p className="leading-[18px]">Siap Saji Goreng</p>
                </div>
              </div>
              <div className="absolute bg-[#f3f4f5] h-[30px] left-[326.91px] rounded-[8px] top-0 w-[94.84px]" data-node-id="127:2216" data-name="Button">
                <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Medium'] font-medium justify-center leading-[0] left-[47.42px] text-[#565e74] text-[12px] text-center top-[15px] whitespace-nowrap" data-node-id="127:2217">
                  <p className="leading-[18px]">Paket Besek</p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute drop-shadow-[0px_4px_2px_rgba(0,0,0,0.25)] gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[_776px] left-[24px] top-[244px] w-[944px]" data-node-id="127:2218" data-name="MAIN 2-COLUMN: PRODUCT CARDS + ONLINE CHANNEL SUMMARY">
            <div className="col-[1/span_8] gap-x-[20px] gap-y-[20px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[__345.50px_345.50px] justify-self-stretch relative row-1 self-start shrink-0" data-node-id="127:2219" data-name="Product Catalog Grid (8 Cols)">
              <div className="bg-white border border-[#edeeef] border-solid col-1 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[319.5px] justify-self-stretch relative rounded-[16px] row-1 shrink-0" data-node-id="127:2220" data-name="Product 1">
                <div className="absolute h-[226.5px] left-[16px] top-[16px] w-[160.667px]" data-node-id="127:2221" data-name="Container">
                  <div className="absolute bg-[#f3f4f5] h-[160px] left-0 overflow-clip rounded-[12px] top-0 w-[160.667px]" data-node-id="127:2222" data-name="Background">
                    <div className="absolute h-[160px] left-0 top-0 w-[160.667px]" data-node-id="127:2223" data-name="Cireng Rujak Original">
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <img alt="" className="absolute h-full left-[-67.81%] max-w-none top-0 w-[199.17%]" src={imgCirengRujakOriginal} />
                      </div>
                    </div>
                  </div>
                  <div className="absolute h-[32.5px] left-0 overflow-clip top-[162px] w-[160.667px]" data-node-id="127:2224" data-name="Heading 3">
                    <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] left-0 text-[#191c1d] text-[15px] top-[20.5px] whitespace-nowrap" data-node-id="127:2225">
                      <p className="leading-[22.5px]">Cireng Rujak Original</p>
                    </div>
                  </div>
                  <div className="absolute h-[30px] left-0 top-[196.5px] w-[160.667px]" data-node-id="127:2228" data-name="Container">
                    <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] left-0 text-[#a24f9d] text-[16px] top-[18px] whitespace-nowrap" data-node-id="127:2229">
                      <p className="leading-[24px]">Rp 15.000</p>
                    </div>
                  </div>
                </div>
                <div className="absolute h-[59px] left-[16px] top-[242.5px] w-[160.667px]" data-node-id="127:2230" data-name="Margin">
                  <div className="absolute border-[#edeeef] border-solid border-t h-[43px] left-0 top-[16px] w-[160.667px]" data-node-id="127:2231" data-name="HorizontalBorder">
                    <div className="absolute bg-[#a24f9d] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[30px] left-0 rounded-[8px] top-[12px] w-[160.667px]" data-node-id="127:2232" data-name="Link">
                      <div className="absolute h-[13.333px] left-[26.19px] top-[8.33px] w-[10.667px]" data-node-id="127:2233" data-name="Container">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer5} />
                      </div>
                      <div className="absolute h-[18px] left-[42.85px] top-[6px] w-[91.63px]" data-node-id="127:2235" data-name="Container">
                        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Medium'] font-medium justify-center leading-[0] left-[45.81px] text-[12px] text-center text-white top-[9px] whitespace-nowrap" data-node-id="127:2236">
                          <p className="leading-[18px]">Pesan Sekarang</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-[#edeeef] border-solid col-2 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[319.5px] justify-self-stretch relative rounded-[16px] row-1 shrink-0" data-node-id="127:2237" data-name="Product 2">
                <div className="absolute h-[226.5px] left-[16px] top-[16px] w-[160.667px]" data-node-id="127:2238" data-name="Container">
                  <div className="absolute bg-[#f3f4f5] h-[160px] left-0 overflow-clip rounded-[12px] top-0 w-[160.667px]" data-node-id="127:2239" data-name="Background">
                    <div className="absolute h-[160px] left-0 top-0 w-[160.667px]" data-node-id="127:2240" data-name="Cireng Pedas Jeletot">
                      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgCirengPedasJeletot} />
                    </div>
                  </div>
                  <div className="absolute h-[32.5px] left-0 overflow-clip top-[162px] w-[160.667px]" data-node-id="127:2241" data-name="Heading 3">
                    <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] left-0 text-[#191c1d] text-[15px] top-[20.5px] whitespace-nowrap" data-node-id="127:2242">
                      <p className="leading-[22.5px]">Cireng Pedas Jeletot</p>
                    </div>
                  </div>
                  <div className="absolute h-[30px] left-0 top-[196.5px] w-[160.667px]" data-node-id="127:2245" data-name="Container">
                    <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] left-0 text-[#a24f9d] text-[16px] top-[18px] whitespace-nowrap" data-node-id="127:2246">
                      <p className="leading-[24px]">Rp 18.000</p>
                    </div>
                  </div>
                </div>
                <div className="absolute h-[59px] left-[16px] top-[242.5px] w-[160.667px]" data-node-id="127:2247" data-name="Margin">
                  <div className="absolute border-[#edeeef] border-solid border-t h-[43px] left-0 top-[16px] w-[160.667px]" data-node-id="127:2248" data-name="HorizontalBorder">
                    <div className="absolute bg-[#a24f9d] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[30px] left-0 rounded-[8px] top-[12px] w-[160.667px]" data-node-id="127:2249" data-name="Link">
                      <div className="absolute h-[13.333px] left-[26.19px] top-[8.33px] w-[10.667px]" data-node-id="127:2250" data-name="Container">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer5} />
                      </div>
                      <div className="absolute h-[18px] left-[42.85px] top-[6px] w-[91.63px]" data-node-id="127:2252" data-name="Container">
                        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Medium'] font-medium justify-center leading-[0] left-[45.81px] text-[12px] text-center text-white top-[9px] whitespace-nowrap" data-node-id="127:2253">
                          <p className="leading-[18px]">Pesan Sekarang</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-[#edeeef] border-solid col-3 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[319.5px] justify-self-stretch relative rounded-[16px] row-1 shrink-0" data-node-id="127:2254" data-name="Product 3">
                <div className="absolute h-[226.5px] left-[16px] top-[16px] w-[160.667px]" data-node-id="127:2255" data-name="Container">
                  <div className="absolute bg-[#f3f4f5] h-[160px] left-0 overflow-clip rounded-[12px] top-0 w-[160.667px]" data-node-id="127:2256" data-name="Background">
                    <div className="absolute h-[160px] left-0 top-0 w-[160.667px]" data-node-id="127:2257" data-name="Cireng Keju Melted Mozzarella">
                      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgCirengKejuMeltedMozzarella} />
                    </div>
                  </div>
                  <div className="absolute h-[32.5px] left-0 overflow-clip top-[162px] w-[160.667px]" data-node-id="127:2258" data-name="Heading 3">
                    <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] left-0 text-[#191c1d] text-[15px] top-[20.5px] w-[140.57px]" data-node-id="127:2259">
                      <p className="leading-[22.5px]">Cireng Mozzarella…</p>
                    </div>
                  </div>
                  <div className="absolute h-[30px] left-0 top-[196.5px] w-[160.667px]" data-node-id="127:2262" data-name="Container">
                    <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] left-0 text-[#a24f9d] text-[16px] top-[18px] whitespace-nowrap" data-node-id="127:2263">
                      <p className="leading-[24px]">Rp 22.000</p>
                    </div>
                  </div>
                </div>
                <div className="absolute h-[59px] left-[16px] top-[242.5px] w-[160.667px]" data-node-id="127:2264" data-name="Margin">
                  <div className="absolute border-[#edeeef] border-solid border-t h-[43px] left-0 top-[16px] w-[160.667px]" data-node-id="127:2265" data-name="HorizontalBorder">
                    <div className="absolute bg-[#a24f9d] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[30px] left-0 rounded-[8px] top-[12px] w-[160.667px]" data-node-id="127:2266" data-name="Link">
                      <div className="absolute h-[13.333px] left-[26.19px] top-[8.33px] w-[10.667px]" data-node-id="127:2267" data-name="Container">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer5} />
                      </div>
                      <div className="absolute h-[18px] left-[42.85px] top-[6px] w-[91.63px]" data-node-id="127:2269" data-name="Container">
                        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Medium'] font-medium justify-center leading-[0] left-[45.81px] text-[12px] text-center text-white top-[9px] whitespace-nowrap" data-node-id="127:2270">
                          <p className="leading-[18px]">Pesan Sekarang</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-[#edeeef] border-solid col-1 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[319.5px] justify-self-stretch relative rounded-[16px] row-2 shrink-0" data-node-id="127:2271" data-name="Product 4">
                <div className="absolute h-[226.5px] left-[16px] top-[16px] w-[160.667px]" data-node-id="127:2272" data-name="Container">
                  <div className="absolute bg-[#f3f4f5] h-[160px] left-0 overflow-clip rounded-[12px] top-0 w-[160.667px]" data-node-id="127:2273" data-name="Background">
                    <div className="absolute h-[160px] left-0 top-0 w-[160.667px]" data-node-id="127:2274" data-name="Cireng Kuah Seblak">
                      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgCirengKuahSeblak} />
                    </div>
                  </div>
                  <div className="absolute h-[32.5px] left-0 overflow-clip top-[162px] w-[160.667px]" data-node-id="127:2275" data-name="Heading 3">
                    <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] left-0 text-[#191c1d] text-[15px] top-[20.5px] w-[152.67px]" data-node-id="127:2276">
                      <p className="leading-[22.5px]">Cireng Kuah Seblak…</p>
                    </div>
                  </div>
                  <div className="absolute h-[30px] left-0 top-[196.5px] w-[160.667px]" data-node-id="127:2279" data-name="Container">
                    <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] left-0 text-[#a24f9d] text-[16px] top-[18px] whitespace-nowrap" data-node-id="127:2280">
                      <p className="leading-[24px]">Rp 19.000</p>
                    </div>
                  </div>
                </div>
                <div className="absolute h-[59px] left-[16px] top-[242.5px] w-[160.667px]" data-node-id="127:2281" data-name="Margin">
                  <div className="absolute border-[#edeeef] border-solid border-t h-[43px] left-0 top-[16px] w-[160.667px]" data-node-id="127:2282" data-name="HorizontalBorder">
                    <div className="absolute bg-[#a24f9d] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[30px] left-0 rounded-[8px] top-[12px] w-[160.667px]" data-node-id="127:2283" data-name="Link">
                      <div className="absolute h-[13.333px] left-[26.19px] top-[8.33px] w-[10.667px]" data-node-id="127:2284" data-name="Container">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer5} />
                      </div>
                      <div className="absolute h-[18px] left-[42.85px] top-[6px] w-[91.63px]" data-node-id="127:2286" data-name="Container">
                        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Medium'] font-medium justify-center leading-[0] left-[45.81px] text-[12px] text-center text-white top-[9px] whitespace-nowrap" data-node-id="127:2287">
                          <p className="leading-[18px]">Pesan Sekarang</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-[#edeeef] border-solid col-2 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[319.5px] justify-self-stretch relative rounded-[16px] row-2 shrink-0" data-node-id="127:2288" data-name="Product 5">
                <div className="absolute h-[226.5px] left-[16px] top-[16px] w-[160.667px]" data-node-id="127:2289" data-name="Container">
                  <div className="absolute bg-[#f3f4f5] h-[160px] left-0 overflow-clip rounded-[12px] top-0 w-[160.667px]" data-node-id="127:2290" data-name="Background">
                    <div className="absolute h-[160px] left-0 top-0 w-[160.667px]" data-node-id="127:2291" data-name="Cireng Goreng Matang Box">
                      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgCirengGorengMatangBox} />
                    </div>
                  </div>
                  <div className="absolute h-[32.5px] left-0 overflow-clip top-[162px] w-[160.667px]" data-node-id="127:2292" data-name="Heading 3">
                    <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] left-0 text-[#191c1d] text-[15px] top-[20.5px] w-[118.58px]" data-node-id="127:2293">
                      <p className="leading-[22.5px]">Cireng Goreng…</p>
                    </div>
                  </div>
                  <div className="absolute h-[30px] left-0 top-[196.5px] w-[160.667px]" data-node-id="127:2296" data-name="Container">
                    <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] left-0 text-[#a24f9d] text-[16px] top-[18px] whitespace-nowrap" data-node-id="127:2297">
                      <p className="leading-[24px]">Rp 20.000</p>
                    </div>
                  </div>
                </div>
                <div className="absolute h-[59px] left-[16px] top-[242.5px] w-[160.667px]" data-node-id="127:2298" data-name="Margin">
                  <div className="absolute border-[#edeeef] border-solid border-t h-[43px] left-0 top-[16px] w-[160.667px]" data-node-id="127:2299" data-name="HorizontalBorder">
                    <div className="absolute bg-[#a24f9d] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[30px] left-0 rounded-[8px] top-[12px] w-[160.667px]" data-node-id="127:2300" data-name="Link">
                      <div className="absolute h-[13.333px] left-[26.19px] top-[8.33px] w-[10.667px]" data-node-id="127:2301" data-name="Container">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer5} />
                      </div>
                      <div className="absolute h-[18px] left-[42.85px] top-[6px] w-[91.63px]" data-node-id="127:2303" data-name="Container">
                        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Medium'] font-medium justify-center leading-[0] left-[45.81px] text-[12px] text-center text-white top-[9px] whitespace-nowrap" data-node-id="127:2304">
                          <p className="leading-[18px]">Pesan Sekarang</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-[#edeeef] border-solid col-3 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[319.5px] justify-self-stretch relative rounded-[16px] row-2 shrink-0" data-node-id="127:2305" data-name="Product 6">
                <div className="absolute h-[226.5px] left-[16px] top-[16px] w-[160.667px]" data-node-id="127:2306" data-name="Container">
                  <div className="absolute bg-[#f3f4f5] h-[160px] left-0 overflow-clip rounded-[12px] top-0 w-[160.667px]" data-node-id="127:2307" data-name="Background">
                    <div className="absolute h-[160px] left-0 top-0 w-[160.667px]" data-node-id="127:2308" data-name="Paket Bundling Besek">
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <img alt="" className="absolute h-full left-[-41.37%] max-w-none top-0 w-[182.75%]" src={imgPaketBundlingBesek} />
                      </div>
                    </div>
                  </div>
                  <div className="absolute h-[32.5px] left-0 overflow-clip top-[162px] w-[160.667px]" data-node-id="127:2309" data-name="Heading 3">
                    <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] left-0 text-[#191c1d] text-[15px] top-[20.5px] whitespace-nowrap" data-node-id="127:2310">
                      <p className="leading-[22.5px]">Paket Bundling Besek</p>
                    </div>
                  </div>
                  <div className="absolute h-[30px] left-0 top-[196.5px] w-[160.667px]" data-node-id="127:2313" data-name="Container">
                    <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] left-0 text-[#a24f9d] text-[16px] top-[18px] whitespace-nowrap" data-node-id="127:2314">
                      <p className="leading-[24px]">Rp 52.000</p>
                    </div>
                  </div>
                </div>
                <div className="absolute h-[59px] left-[16px] top-[242.5px] w-[160.667px]" data-node-id="127:2315" data-name="Margin">
                  <div className="absolute border-[#edeeef] border-solid border-t h-[43px] left-0 top-[16px] w-[160.667px]" data-node-id="127:2316" data-name="HorizontalBorder">
                    <div className="absolute bg-[#a24f9d] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[30px] left-0 rounded-[8px] top-[12px] w-[160.667px]" data-node-id="127:2317" data-name="Link">
                      <div className="absolute h-[13.333px] left-[26.19px] top-[8.33px] w-[10.667px]" data-node-id="127:2318" data-name="Container">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer5} />
                      </div>
                      <div className="absolute h-[18px] left-[42.85px] top-[6px] w-[91.63px]" data-node-id="127:2320" data-name="Container">
                        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Medium'] font-medium justify-center leading-[0] left-[45.81px] text-[12px] text-center text-white top-[9px] whitespace-nowrap" data-node-id="127:2321">
                          <p className="leading-[18px]">Pesan Sekarang</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-[9/span_4] h-[546px] justify-self-stretch relative row-1 self-start shrink-0" data-node-id="127:2322" data-name="Right Sidebar: Integration & Outlet Guide (4 Cols)">
              <div className="absolute bg-white border border-[#edeeef] border-solid drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[312px] left-0 rounded-[16px] top-0 w-[304px]" data-node-id="127:2323" data-name="Store Channel Status Card">
                <div className="absolute border-[#edeeef] border-b border-solid h-[41px] left-[20px] top-[20px] w-[262px]" data-node-id="127:2324" data-name="HorizontalBorder">
                  <div className="absolute h-[24px] left-0 top-[2px] w-[190.3px]" data-node-id="127:2325" data-name="Container">
                    <div className="absolute h-[19.167px] left-0 top-[2.42px] w-[20px]" data-node-id="127:2326" data-name="Container">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer6} />
                    </div>
                    <div className="absolute h-[24px] left-[28px] top-0 w-[162.3px]" data-node-id="127:2328" data-name="Heading 2">
                      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] left-0 text-[#191c1d] text-[16px] top-[12px] whitespace-nowrap" data-node-id="127:2329">
                        <p className="leading-[24px]">Integrasi Toko Online</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bg-[#7ffc97] h-[28px] left-[204.23px] rounded-[9999px] top-0 w-[57.77px]" data-node-id="127:2330" data-name="Background">
                    <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] left-[10px] text-[#005320] text-[16px] top-[14px] whitespace-nowrap" data-node-id="127:2331">
                      <p className="leading-[24px]">Aktif</p>
                    </div>
                  </div>
                </div>
                <div className="absolute h-[213px] left-[20px] top-[77px] w-[262px]" data-node-id="127:2332" data-name="Container">
                  <div className="absolute bg-[#f3f4f5] h-[58px] left-0 rounded-[12px] top-0 w-[262px]" data-node-id="127:2333" data-name="ShopeeFood Status">
                    <div className="absolute h-[32px] left-[12px] top-[13px] w-[170.02px]" data-node-id="127:2334" data-name="Container">
                      <div className="absolute bg-[#f94e2e] left-0 rounded-[8px] size-[32px] top-0" data-node-id="127:2335" data-name="Background">
                        <div className="absolute h-[13.5px] left-[8.5px] top-[9.25px] w-[15px]" data-node-id="127:2336" data-name="Container">
                          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer7} />
                        </div>
                      </div>
                      <div className="absolute h-[32px] left-[42px] top-0 w-[128.02px]" data-node-id="127:2338" data-name="Container">
                        <div className="absolute h-[16px] left-0 top-0 w-[128.02px]" data-node-id="127:2339" data-name="Container">
                          <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] left-0 text-[#191c1d] text-[12px] top-[8px] whitespace-nowrap" data-node-id="127:2340">
                            <p className="leading-[16px]">ShopeeFood</p>
                          </div>
                        </div>
                        <div className="absolute h-[17px] left-0 top-[15px] w-[128.02px]" data-node-id="127:2341" data-name="Container">
                          <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] left-0 text-[#565e74] text-[11px] top-[8.5px] whitespace-nowrap" data-node-id="127:2342">
                            <p className="leading-[16.5px]">Cireng Cangkeling Pusat</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bg-white border border-[#edeeef] border-solid drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[34px] left-[188.94px] rounded-[6px] top-[12px] w-[61.06px]" data-node-id="127:2343" data-name="Link">
                      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] left-[10px] text-[#f94e2e] text-[16px] top-[16px] whitespace-nowrap" data-node-id="127:2344">
                        <p className="leading-[24px]">Buka</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bg-[#f3f4f5] h-[73px] left-0 rounded-[12px] top-[70px] w-[262px]" data-node-id="127:2345" data-name="GoFood Status">
                    <div className="absolute h-[49px] left-[12px] top-[12px] w-[138.72px]" data-node-id="127:2346" data-name="Container">
                      <div className="absolute bg-[#d02428] left-0 rounded-[8px] size-[32px] top-[8.5px]" data-node-id="127:2347" data-name="Background">
                        <div className="absolute h-[10.5px] left-[8.5px] top-[10.75px] w-[15px]" data-node-id="127:2348" data-name="Container">
                          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer8} />
                        </div>
                      </div>
                      <div className="absolute h-[49px] left-[42px] top-0 w-[96.72px]" data-node-id="127:2350" data-name="Container">
                        <div className="absolute h-[16px] left-0 top-0 w-[96.72px]" data-node-id="127:2351" data-name="Container">
                          <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] left-0 text-[#191c1d] text-[12px] top-[8px] whitespace-nowrap" data-node-id="127:2352">
                            <p className="leading-[16px]">GoFood</p>
                          </div>
                        </div>
                        <div className="absolute h-[33.75px] left-0 top-[15.25px] w-[96.72px]" data-node-id="127:2353" data-name="Container">
                          <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] left-0 text-[#565e74] text-[11px] top-[16.5px] whitespace-nowrap" data-node-id="127:2354">
                            <p className="leading-[16.5px] mb-0">Cireng Cangkeling</p>
                            <p className="leading-[16.5px]">Official</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bg-white border border-[#edeeef] border-solid drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[34px] left-[188.94px] rounded-[6px] top-[19.5px] w-[61.06px]" data-node-id="127:2355" data-name="Link">
                      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] left-[10px] text-[#d02428] text-[16px] top-[16px] whitespace-nowrap" data-node-id="127:2356">
                        <p className="leading-[24px]">Buka</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bg-[#f3f4f5] h-[58px] left-0 rounded-[12px] top-[155px] w-[262px]" data-node-id="127:2357" data-name="Shopee Mall / Official Shop">
                    <div className="absolute h-[32px] left-[12px] top-[13px] w-[153.34px]" data-node-id="127:2358" data-name="Container">
                      <div className="absolute bg-[#ee4d2d] left-0 rounded-[8px] size-[32px] top-0" data-node-id="127:2359" data-name="Background">
                        <div className="absolute h-[15px] left-[10px] top-[8.5px] w-[12px]" data-node-id="127:2360" data-name="Container">
                          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer9} />
                        </div>
                      </div>
                      <div className="absolute h-[32px] left-[42px] top-0 w-[111.34px]" data-node-id="127:2362" data-name="Container">
                        <div className="absolute h-[16px] left-0 top-0 w-[111.34px]" data-node-id="127:2363" data-name="Container">
                          <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] left-0 text-[#191c1d] text-[12px] top-[8px] whitespace-nowrap" data-node-id="127:2364">
                            <p className="leading-[16px]">Shopee Official</p>
                          </div>
                        </div>
                        <div className="absolute h-[17px] left-0 top-[15px] w-[111.34px]" data-node-id="127:2365" data-name="Container">
                          <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] left-0 text-[#565e74] text-[11px] top-[8.5px] whitespace-nowrap" data-node-id="127:2366">
                            <p className="leading-[16.5px]">{`Paket Frozen & Besek`}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bg-white border border-[#edeeef] border-solid drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[34px] left-[188.94px] rounded-[6px] top-[12px] w-[61.06px]" data-node-id="127:2367" data-name="Link">
                      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] left-[10px] text-[#ee4d2d] text-[16px] top-[16px] whitespace-nowrap" data-node-id="127:2368">
                        <p className="leading-[24px]">Buka</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bg-[rgba(255,218,214,0.3)] border border-[rgba(230,189,184,0.4)] border-solid h-[214px] left-0 rounded-[16px] top-[332px] w-[304px]" data-node-id="127:2379" data-name="Cashier SOP Notice">
                <div className="absolute h-[16px] left-[16px] top-[16px] w-[270px]" data-node-id="127:2380" data-name="Container">
                  <div className="absolute left-0 size-[15px] top-[0.5px]" data-node-id="127:2381" data-name="Container">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer10} />
                  </div>
                  <div className="absolute h-[16px] left-[23px] top-0 w-[155.59px]" data-node-id="127:2383" data-name="Container">
                    <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] left-0 text-[#a24f9d] text-[12px] top-[8px] whitespace-nowrap" data-node-id="127:2384">
                      <p className="leading-[16px]">Petunjuk Operasional Kasir</p>
                    </div>
                  </div>
                </div>
                <div className="[word-break:break-word] absolute h-[156px] leading-[0] left-[16px] text-[#565e74] text-[12px] top-[40px] w-[270px] whitespace-nowrap" data-node-id="127:2385" data-name="List">
                  <div className="absolute h-[36px] left-[16px] top-0 w-[254px]" data-node-id="127:2386" data-name="Item">
                    <div className="-translate-y-1/2 absolute flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center left-0 top-[9px]" data-node-id="127:2387">
                      <p className="leading-[18px]">{` `}</p>
                    </div>
                    <div className="-translate-y-1/2 absolute flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center left-0 top-[8.5px]" data-node-id="127:2388">
                      <p className="leading-[18px]">{`Halaman ini difokuskan sebagai `}</p>
                    </div>
                    <div className="absolute font-['Plus_Jakarta_Sans:Bold'] font-bold h-[33px] left-0 top-px w-[235.22px]" data-node-id="127:2389" data-name="Strong">
                      <div className="-translate-y-1/2 absolute flex flex-col justify-center left-[179.23px] top-[7.5px]" data-node-id="127:2390">
                        <p className="leading-[18px]">{`katalog &`}</p>
                      </div>
                      <div className="-translate-y-1/2 absolute flex flex-col justify-center left-0 top-[25.5px]" data-node-id="127:2391">
                        <p className="leading-[18px]">rujukan pemesanan resmi</p>
                      </div>
                    </div>
                    <div className="-translate-y-1/2 absolute flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center left-[147.3px] top-[26.5px]" data-node-id="127:2392">
                      <p className="leading-[18px]">.</p>
                    </div>
                  </div>
                  <div className="absolute font-['Plus_Jakarta_Sans:Regular'] font-normal h-[54px] left-[16px] top-[42px] w-[254px]" data-node-id="127:2393" data-name="Item">
                    <div className="-translate-y-1/2 absolute flex flex-col justify-center left-0 top-[9px]" data-node-id="127:2394">
                      <p className="leading-[18px]">{` `}</p>
                    </div>
                    <div className="-translate-y-1/2 absolute flex flex-col justify-center left-0 top-[26.5px]" data-node-id="127:2395">
                      <p className="leading-[18px] mb-0">Pesanan diselesaikan melalui aplikasi</p>
                      <p className="leading-[18px] mb-0">delivery online (GoFood / ShopeeFood) atau</p>
                      <p className="leading-[18px]">kurir WhatsApp.</p>
                    </div>
                  </div>
                  <div className="absolute font-['Plus_Jakarta_Sans:Regular'] font-normal h-[54px] left-[16px] top-[102px] w-[254px]" data-node-id="127:2396" data-name="Item">
                    <div className="-translate-y-1/2 absolute flex flex-col justify-center left-0 top-[9px]" data-node-id="127:2397">
                      <p className="leading-[18px]">{` `}</p>
                    </div>
                    <div className="-translate-y-1/2 absolute flex flex-col justify-center left-0 top-[26.5px]" data-node-id="127:2398">
                      <p className="leading-[18px] mb-0">Arahkan pelanggan langsung ke saluran</p>
                      <p className="leading-[18px] mb-0">pemesanan online resmi tanpa transaksi</p>
                      <p className="leading-[18px]">tunai di kasir fisik.</p>
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
