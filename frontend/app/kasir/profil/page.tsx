'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppShell from '../../components/AppShell';
import { useApp } from '../../lib/context';

const imgAb6AXuDmNNqbskjdFfnGuTfEzN1XJuq2O6AN1WQcUxtPg65FevlGcEuqjaEz32CDmq6Mm3Zc9AfGjNsKwJmltT6Z5BuaFuf36Ic5Ikoy96PJlkXhBvxcDMfwxZvc7CYi3Oehq0LCyhdM0ToUoELnM1Gzx29LQlItj6ZdBjj1Rek2JSvVibt26QMyFE7WCk0FLbZczTs4YrysFiOs1HjPdXv54OX4Xepw6FXzZ7L0 = "/figma/a01b110d9071990f24cb5e0b4776ee6239fc8d89.png";
const imgImage8 = "/figma/cdcc004194fc85647526629fb6822fd54bbd911e.png";
const imgContainer = "/figma/6501d92238bbf7008afcc640c16699a23ffecf15.svg";
const imgContainer1 = "/figma/1c918f76b3048a6d7765ee916c42f57ca5601b19.svg";
const imgContainer2 = "/figma/4d356d8908ca6234f0d16791f67c826f86812133.svg";
const imgContainer3 = "/figma/fdb6b749f3276e9264faf5cbb7b1cf7837ec3685.svg";
const imgContainer4 = "/figma/ed2f7cf0ddc8f021a3ac0dbed79f53957194313b.svg";
const imgContainer5 = "/figma/30769e7b706731432573f4b968ea4c97556e1792.svg";
const imgContainer6 = "/figma/64b5f71b66f3e2c9279a911463210409eb41275b.svg";
const imgContainer7 = "/figma/e1c1abd25753530bfa4ac1b4bb762dee5d3c40ab.svg";
const imgContainer8 = "/figma/e9a30cd51a735cc9994c30471a28f41ef0f5d116.svg";
const imgIcon = "/figma/e7a145b632fe563b8d81468d09396ab184bf69e5.svg";
const imgContainer9 = "/figma/490d61db9b2e5e97b6dc3f84e5c8ea2241077d80.svg";
const imgIcon1 = "/figma/9fd54137f775078b39cfede920a2188700ce8573.svg";
const imgContainer10 = "/figma/b4fcd4d49b1b493fe2c9af66a15bd361f01b6d68.svg";
const imgIcon2 = "/figma/cff66f508b4de6a189fe72f1d144de57c5966340.svg";
const imgIcon3 = "/figma/b075d1477652d6fca9eef5eda555acbc2d6972ba.svg";
const imgContainer11 = "/figma/4df20d623c1d9c905134eb1d76828109d889cdf1.svg";
const imgContainer12 = "/figma/574c32b382ec9f562e46fcff8df1aefc65860acb.svg";
const imgMargin = "/figma/4c37939aa52c248df6b95579ad8b69e3954ce814.svg";
const imgContainer13 = "/figma/7930ae15e06e2c03ac3f87420c917f1625c2c563.svg";
const imgContainer14 = "/figma/d36910b612ec88411fea347e2d7d58e42fccfc3e.svg";
const imgContainer15 = "/figma/78fe0751a96dd96fcb3850f5e22016336f70d083.svg";
const imgMargin1 = "/figma/9ee4c3e62f206e88ab45485d8366440546255620.svg";
const imgContainer16 = "/figma/ca1e2f177e7006b7df7b810d699674c7d1ffc185.svg";
const imgMargin2 = "/figma/22b8c060e56387bf2e3b4e235ed03bdd95bc63de.svg";
const imgContainer17 = "/figma/ef4f390f1dedd7b6ebf1eed81f6a18848fcab2a5.svg";
const imgContainer18 = "/figma/ddfe4df0f8e77c179316a18e3b88f1a94b681dff.svg";
const imgContainer19 = "/figma/14b304e6a42d86ac9a19bd156fa1f4cdf4c79d23.svg";
const imgContainer20 = "/figma/5c6c56e8ce3dadf316a87b4632a674e5532d93f2.svg";
const imgContainer21 = "/figma/aa4c62235f24e2df24d347f78c51383ea4f6d686.svg";
const imgIcon4 = "/figma/699b68aa1c138d2536939f0c6c6860addcf4b52a.svg";
const imgContainer22 = "/figma/c3a21ad582b11e779d06e75207e46a4bad90c4a9.svg";
const imgContainer23 = "/figma/820b1414d5fe705e753c49c03d0eda32b4573807.svg";
const imgContainer24 = "/figma/274e45ee4d425336baf7dbab482383a7f0b5d366.svg";
const imgContainer25 = "/figma/9edaffdd891e367489261334740a08b54cc99ca7.svg";
const imgContainer26 = "/figma/eab4f9ff14f5d07be2bb050f8bd121662363c70c.svg";
const imgContainer27 = "/figma/c12ca9f491074be66600e815040d224fc5201899.svg";

export default function ProfilKasirPage() {
  const { currentUser, activeShift } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [pinCurrent, setPinCurrent] = useState('');
  const [pinNew, setPinNew] = useState('');
  const [pinConfirm, setPinConfirm] = useState('');

  return (
    <AppShell>
      <div className="w-full font-sans max-w-[1280px] mx-auto pb-16">
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:35" data-name="Container">
          <div className="content-stretch drop-shadow-[0px_4px_2px_rgba(0,0,0,0.25)] flex items-center justify-between pb-[16px] pt-[24px] px-[24px] relative shrink-0 w-full" data-node-id="127:36" data-name="Top Bar / Breadcrumb Section">
            <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[635.63px]" data-node-id="127:37" data-name="Container">
              <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-node-id="127:38" data-name="Container">
                <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="127:39" data-name="Container">
                  <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[11px] text-black tracking-[0.55px] uppercase whitespace-nowrap" data-node-id="127:40">
                    <p className="leading-[14px]">AKUN</p>
                  </div>
                </div>
                <div className="h-[7px] relative shrink-0 w-[4.317px]" data-node-id="127:41" data-name="Container">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer} />
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="127:43" data-name="Container">
                  <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#a24f9d] text-[11px] tracking-[0.275px] whitespace-nowrap" data-node-id="127:44">
                    <p className="leading-[14px]">Profil Saya</p>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:45" data-name="Heading 1">
                <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[24px] text-black tracking-[-0.6px] whitespace-nowrap" data-node-id="127:46">
                  <p className="leading-[32px]">Profil Kasir</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start max-w-[672px] relative shrink-0 w-full" data-node-id="127:47" data-name="Container">
                <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#5c403c] text-[14px] whitespace-nowrap" data-node-id="127:48">
                  <p className="leading-[20px] mb-0">Kelola informasi data diri, PIN otorisasi kasir, dan pantau status shift operasional Anda secara real-</p>
                  <p className="leading-[20px]">time.</p>
                </div>
              </div>
            </div>
            <div className="bg-[#a24f9d] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-[12.01px] items-center p-[8px] relative rounded-[12px] shrink-0" data-node-id="127:49" data-name="Live Telemetry Status Pill">
              <div className="bg-[#f3f4f5] content-stretch flex gap-[8px] items-center px-[12px] py-[6px] relative rounded-[8px] shrink-0" data-node-id="127:50" data-name="Background">
                <div className="bg-[#008438] h-[10px] relative rounded-[9999px] shrink-0 w-[9.63px]" data-node-id="127:51" data-name="Background" />
                <div className="content-stretch flex flex-col items-start pr-[39.33px] relative shrink-0" data-node-id="127:52" data-name="Container">
                  <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#00682b] text-[11px] whitespace-nowrap" data-node-id="127:53">
                    <p className="leading-[14px] mb-0">SISTEM POS</p>
                    <p className="leading-[14px]">ONLINE</p>
                  </div>
                </div>
              </div>
              <div className="h-[47px] relative shrink-0 w-[108.09px]" data-node-id="127:54" data-name="Container">
                <div className="absolute content-stretch flex flex-col items-end left-0 pb-[0.75px] right-[8px] top-[-0.75px]" data-node-id="127:55" data-name="Container">
                  <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[11px] text-right text-white whitespace-nowrap" data-node-id="127:56">
                    <p className="leading-[16.5px] mb-0">Sinkronisasi</p>
                    <p className="leading-[16.5px]">Terakhir</p>
                  </div>
                </div>
                <div className="absolute content-stretch flex flex-col items-end left-0 right-[8px] top-[33px]" data-node-id="127:57" data-name="Container">
                  <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[11px] text-right text-white whitespace-nowrap" data-node-id="127:58">
                    <p className="leading-[14px]">14:02:18 WIB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="drop-shadow-[0px_4px_2px_rgba(0,0,0,0.25)] gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[_1206.50px] pb-[32px] px-[24px] relative shrink-0 w-full" data-node-id="127:59" data-name="Content Layout: 2 Columns">
            <div className="col-[1/span_4] content-stretch flex flex-col gap-[16px] items-start justify-self-stretch relative row-1 self-start shrink-0" data-node-id="127:60" data-name="KOLOM KIRI (Kartu Identitas Kasir & Keamanan) - Span 4/12">
              <div className="bg-white h-[397px] overflow-clip relative rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 w-full" data-node-id="127:61" data-name="1. Identity Card">
                <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] left-[calc(50%-0.02px)] text-[18px] text-center text-white top-[152px] tracking-[-0.45px] whitespace-nowrap" data-node-id="127:62">
                  <p className="leading-[24px]">Rina Oktaviani</p>
                </div>
                <div className="absolute content-stretch flex flex-col items-start left-[35.25px] pb-[16px] pt-[8px] top-[164px]" data-node-id="127:63" data-name="Margin">
                  <div className="content-center flex flex-wrap gap-[6px] items-center justify-center relative shrink-0" data-node-id="127:64" data-name="Container">
                    <div className="bg-[#ffdad6] content-stretch flex flex-col items-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0" data-node-id="127:65" data-name="Background">
                      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#a24f9d] text-[11px] text-center tracking-[0.275px] whitespace-nowrap" data-node-id="127:66">
                        <p className="leading-[14px]">ROLE: KASIR</p>
                      </div>
                    </div>
                    <div className="bg-[#7ffc97] content-stretch flex gap-[4px] items-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0" data-node-id="127:67" data-name="Background">
                      <div className="bg-[#00682b] relative rounded-[9999px] shrink-0 size-[6px]" data-node-id="127:68" data-name="Background" />
                      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#005320] text-[11px] text-center whitespace-nowrap" data-node-id="127:69">
                        <p className="leading-[14px]">Aktif • Terverifikasi</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute content-stretch flex flex-col h-[17px] items-start left-[24px] pb-[16px] right-[24.01px] top-[206px]" data-node-id="127:70" data-name="Divider line using subtle background container:margin">
                  <div className="bg-[#edeeef] h-px relative shrink-0 w-full" data-node-id="127:71" data-name="Divider line using subtle background container" />
                </div>
                <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-[24px] right-[24.01px] top-[223px]" data-node-id="127:72" data-name="Identity Metadata Details">
                  <div className="bg-[#f3f4f5] content-stretch flex items-center justify-between p-[10px] relative rounded-[8px] shrink-0 w-full" data-node-id="127:73" data-name="Background">
                    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-node-id="127:74" data-name="Container">
                      <div className="relative shrink-0 size-[15px]" data-node-id="127:75" data-name="Container">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer1} />
                      </div>
                      <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="127:77" data-name="Container">
                        <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[12px] text-black whitespace-nowrap" data-node-id="127:78">
                          <p className="leading-[16px]">ID Karyawan</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="127:79" data-name="Container">
                      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[12px] text-black whitespace-nowrap" data-node-id="127:80">
                        <p className="leading-[16px]">KSR-CKT-004</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#f3f4f5] content-stretch flex flex-col gap-[4px] items-start p-[10px] relative rounded-[8px] shrink-0 w-full" data-node-id="127:81" data-name="Background">
                    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-node-id="127:82" data-name="Container">
                      <div className="h-[13.5px] relative shrink-0 w-[15.07px]" data-node-id="127:83" data-name="Container">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer2} />
                      </div>
                      <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="127:85" data-name="Container">
                        <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[12px] text-black whitespace-nowrap" data-node-id="127:86">
                          <p className="leading-[16px]">Outlet Penugasan</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start pl-[24px] relative shrink-0 w-full" data-node-id="127:87" data-name="Container">
                      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[12px] text-black w-full" data-node-id="127:88">
                        <p className="leading-[16px]">Outlet Pusat (Cikutra, Bandung)</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#f3f4f5] content-stretch flex items-center justify-between p-[10px] relative rounded-[8px] shrink-0 w-full" data-node-id="127:89" data-name="Background">
                    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-node-id="127:90" data-name="Container">
                      <div className="h-[15px] relative shrink-0 w-[13.5px]" data-node-id="127:91" data-name="Container">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer3} />
                      </div>
                      <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="127:93" data-name="Container">
                        <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[12px] text-black whitespace-nowrap" data-node-id="127:94">
                          <p className="leading-[16px]">Bergabung Sejak</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="127:95" data-name="Container">
                      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[12px] text-black whitespace-nowrap" data-node-id="127:96">
                        <p className="leading-[16px]">15 Januari 2023</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bg-[#a24f9d] h-[6px] left-0 right-[0.01px] top-0" data-node-id="127:97" data-name="Subtle crimson top accent strip" />
                <div className="absolute content-stretch flex flex-col items-start left-[101.33px] pb-[12px] pt-[8px] top-[24px]" data-node-id="127:98" data-name="Avatar with Badge:margin">
                  <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="127:99" data-name="Avatar with Badge">
                    <div className="bg-[#edeeef] content-stretch flex items-center justify-center overflow-clip relative rounded-[9999px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] shrink-0 size-[96px]" data-node-id="127:100" data-name="Background+Shadow">
                      <div className="flex-[1_0_0] h-full min-w-px relative" data-node-id="127:101" data-name="AB6AXuDmNNqbskjdFfnGUTfEZ-n1xJuq2_O6aN1wQcUxtPG65FevlGcEuqjaEZ32CDmq6Mm3ZC9AfGjNsKwJMLT-t6z5BUA-FUF-36IC5Ikoy96PJlkXhBvxcDMfwxZvc7cYI3oehq0lCyhdM0To_UoELnM1Gzx29lQlITJ6ZdBJJ1Rek2JSvVIBT26qMyF_e7WCk0FLbZCZTs4YRYSFiOS1hjPDXv54oX4Xepw6FXzZ7L0">
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                          <img alt="" className="absolute h-[179.02%] left-0 max-w-none top-[-39.51%] w-full" src={imgAb6AXuDmNNqbskjdFfnGuTfEzN1XJuq2O6AN1WQcUxtPg65FevlGcEuqjaEz32CDmq6Mm3Zc9AfGjNsKwJmltT6Z5BuaFuf36Ic5Ikoy96PJlkXhBvxcDMfwxZvc7CYi3Oehq0LCyhdM0ToUoELnM1Gzx29LQlItj6ZdBjj1Rek2JSvVibt26QMyFE7WCk0FLbZczTs4YrysFiOs1HjPdXv54OX4Xepw6FXzZ7L0} />
                        </div>
                      </div>
                    </div>
                    <div className="absolute bg-white bottom-0 content-stretch flex items-center justify-center right-0 rounded-[9999px] size-[24px]" data-node-id="127:102" data-name="Background">
                      <div className="absolute bg-[rgba(255,255,255,0)] bottom-0 right-0 rounded-[9999px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] size-[24px]" data-node-id="127:103" data-name="Overlay+Shadow" />
                      <div className="bg-[#008438] relative rounded-[9999px] shrink-0 size-[14px]" data-node-id="127:104" data-name="Background" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#a24f9d] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-[12px] items-start p-[24px] relative rounded-[12px] shrink-0 w-full" data-node-id="127:105" data-name="2. Info Shift Hari Ini Widget">
                <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="127:106" data-name="Container">
                  <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-node-id="127:107" data-name="Container">
                    <div className="bg-white content-stretch flex h-[32px] items-center justify-center relative rounded-[8px] shrink-0 w-[26.66px]" data-node-id="127:108" data-name="Background">
                      <div className="relative shrink-0 size-[16.667px]" data-node-id="127:109" data-name="Container">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer4} />
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start pr-[17.56px] relative shrink-0" data-node-id="127:111" data-name="Heading 3">
                      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[16px] text-white whitespace-nowrap" data-node-id="127:112">
                        <p className="leading-[22px] mb-0">Shift</p>
                        <p className="leading-[22px]">Operasional</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#7ffc97] content-stretch flex flex-col items-start pl-[8px] pr-[39.77px] py-[2px] relative rounded-[4px] shrink-0" data-node-id="127:113" data-name="Background">
                    <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#005320] text-[11px] whitespace-nowrap" data-node-id="127:114">
                      <p className="leading-[14px] mb-0">SEDANG</p>
                      <p className="leading-[14px]">BERJALAN</p>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-node-id="127:115" data-name="Container">
                  <div className="bg-[#f3f4f5] content-stretch flex flex-col gap-[4px] items-start p-[12px] relative rounded-[8px] shrink-0 w-full" data-node-id="127:116" data-name="Background">
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:117" data-name="Container">
                      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-[#a24f9d] text-[11px] uppercase w-full" data-node-id="127:118">
                        <p className="leading-[14px]">JADWAL SHIFT HARI INI</p>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="127:119" data-name="Container">
                      <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="127:120" data-name="Container">
                        <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#a24f9d] text-[14px] whitespace-nowrap" data-node-id="127:121">
                          <p className="leading-[20px]">Shift 1 Pagi</p>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="127:122" data-name="Container">
                        <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#a24f9d] text-[12px] whitespace-nowrap" data-node-id="127:123">
                          <p className="leading-[16px]">08:00 - 16:00 WIB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[8px] items-start justify-center relative shrink-0 w-full" data-node-id="127:124" data-name="Container">
                    <div className="bg-[#f3f4f5] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px pb-[26px] pt-[10px] px-[10px] relative rounded-[8px]" data-node-id="127:125" data-name="Background">
                      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:126" data-name="Container">
                        <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#a24f9d] text-[11px] w-full" data-node-id="127:127">
                          <p className="leading-[14px]">Stasiun POS</p>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col items-start pt-[2px] relative shrink-0 w-full" data-node-id="127:128" data-name="Margin">
                        <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-node-id="127:129" data-name="Container">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#a24f9d] text-[12px] w-full" data-node-id="127:130">
                            <p className="leading-[16px]">Pos 01 (Depan)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#f3f4f5] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px p-[10px] relative rounded-[8px]" data-node-id="127:131" data-name="Background">
                      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:132" data-name="Container">
                        <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#a24f9d] text-[11px] w-full" data-node-id="127:133">
                          <p className="leading-[14px]">Jam Presensi</p>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col items-start pt-[2px] relative shrink-0 w-full" data-node-id="127:134" data-name="Margin">
                        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:135" data-name="Container">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#a24f9d] text-[12px] w-full" data-node-id="127:136">
                            <p className="leading-[16px] mb-0">07:52 WIB</p>
                            <p className="leading-[16px]">(Tepat)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white content-stretch flex items-center justify-between p-[12px] relative rounded-[8px] shrink-0 w-full" data-node-id="127:137" data-name="Overlay">
                    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-node-id="127:138" data-name="Container">
                      <div className="h-[18.333px] relative shrink-0 w-[16.5px]" data-node-id="127:139" data-name="Container">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer5} />
                      </div>
                      <div className="content-stretch flex flex-col items-start relative shrink-0 w-[84.02px]" data-node-id="127:141" data-name="Container">
                        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:142" data-name="Container">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#a24f9d] text-[11px] whitespace-nowrap" data-node-id="127:143">
                            <p className="leading-[14px]">Shift Berjalan</p>
                          </div>
                        </div>
                        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:144" data-name="Container">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#a24f9d] text-[12px] whitespace-nowrap" data-node-id="127:145">
                            <p className="leading-[16px]">Total Transaksi</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="127:146" data-name="Container">
                      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#a24f9d] text-[18px] whitespace-nowrap" data-node-id="127:147">
                        <p className="leading-[24px]">24 Nota</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[4px] items-start pt-[4px] relative shrink-0 w-full" data-node-id="127:148" data-name="Shift Mini Stat Bar SVG">
                  <div className="content-stretch flex h-[14px] items-start justify-between pr-[0.01px] relative shrink-0 w-full" data-node-id="127:149" data-name="Container">
                    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-node-id="127:150" data-name="Container">
                      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#a24f9d] text-[11px] whitespace-nowrap" data-node-id="127:151">
                        <p className="leading-[14px]">Waktu Shift Berlalu</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-node-id="127:152" data-name="Container">
                      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#a24f9d] text-[11px] whitespace-nowrap" data-node-id="127:153">
                        <p className="leading-[14px]">6 Jam / 8 Jam (75%)</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#1c4268] h-[8px] overflow-clip relative rounded-[9999px] shrink-0 w-full" data-node-id="127:154" data-name="Background">
                    <div className="absolute bg-[#a24f9d] inset-[0_25.01%_0_0] rounded-[9999px]" data-node-id="127:155" data-name="Background" />
                  </div>
                </div>
              </div>
              <div className="bg-white content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-[8px] items-start p-[16px] relative rounded-[12px] shrink-0 w-full" data-node-id="127:156" data-name="3. Action Danger Zone">
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:157" data-name="Container">
                  <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[11px] text-white tracking-[0.55px] uppercase w-full" data-node-id="127:158">
                    <p className="leading-[14px]">TINDAKAN SESI</p>
                  </div>
                </div>
                <div className="bg-[#ffdad6] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-[8px] items-center justify-center px-[16px] py-[12px] relative rounded-[12px] shrink-0 w-full" data-node-id="127:159" data-name="Button">
                  <div className="relative shrink-0 size-[15px]" data-node-id="127:160" data-name="Container">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer6} />
                  </div>
                  <div className="content-stretch flex flex-col items-center relative shrink-0" data-node-id="127:162" data-name="Container">
                    <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#93000a] text-[14px] text-center whitespace-nowrap" data-node-id="127:163">
                      <p className="leading-[20px]">Logout / Keluar Akun Kasir</p>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-node-id="127:164" data-name="Container">
                  <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[12px] text-center text-white whitespace-nowrap" data-node-id="127:165">
                    <p className="leading-[16px] mb-0">Pastikan laci kasir telah direkap sebelum</p>
                    <p className="leading-[16px]">menutup sesi.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-[5/span_8] content-stretch flex flex-col gap-[24px] items-start justify-self-stretch relative row-1 self-start shrink-0" data-node-id="127:166" data-name="KOLOM KANAN (Pengaturan Data Diri, Keamanan & RBAC) - Span 8/12">
              <div className="bg-white content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-[16px] items-start p-[24px] relative rounded-[12px] shrink-0 w-full" data-node-id="127:167" data-name="1. Form Informasi Data Diri">
                <div className="content-stretch flex items-center justify-between pb-[8px] relative shrink-0 w-full" data-node-id="127:168" data-name="Container">
                  <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-node-id="127:169" data-name="Container">
                    <div className="bg-[#ffdad6] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[40px]" data-node-id="127:170" data-name="Background">
                      <div className="h-[17px] relative shrink-0 w-[19px]" data-node-id="127:171" data-name="Container">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer7} />
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[309.36px]" data-node-id="127:173" data-name="Container">
                      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:174" data-name="Heading 3">
                        <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[18px] text-black whitespace-nowrap" data-node-id="127:175">
                          <p className="leading-[24px]">Data Pribadi Kasir</p>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:176" data-name="Container">
                        <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[12px] text-black whitespace-nowrap" data-node-id="127:177">
                          <p className="leading-[16px]">Perbarui informasi kontak dan identitas akun kerja Anda</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="127:178" data-name="Container">
                    <div className="relative shrink-0 size-[13.333px]" data-node-id="127:179" data-name="Container">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer8} />
                    </div>
                    <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[11px] text-black whitespace-nowrap" data-node-id="127:181">
                      <p className="leading-[14px]">Data Tersinkron</p>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-node-id="127:182" data-name="Form">
                  <div className="gap-x-[12px] gap-y-[12px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[__62px_62px] relative shrink-0 w-full" data-node-id="127:183" data-name="Container">
                    <div className="col-1 content-stretch flex flex-col gap-[6px] items-start justify-self-stretch relative row-1 self-start shrink-0" data-node-id="127:184" data-name="Field 1: Nama Lengkap">
                      <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="127:185" data-name="Label">
                        <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="127:186" data-name="Container">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[12px] text-white whitespace-nowrap" data-node-id="127:187">
                            <p className="leading-[16px]">Nama Lengkap</p>
                          </div>
                        </div>
                        <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="127:188" data-name="Container">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#a24f9d] text-[12px] whitespace-nowrap" data-node-id="127:189">
                            <p className="leading-[16px]">*Wajib</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="127:190" data-name="Container">
                        <div className="bg-[#7d8d9e] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip pl-[40px] pr-[12px] py-[10px] relative rounded-[8px]" data-node-id="127:191" data-name="Input">
                          <div className="content-stretch flex flex-col items-start overflow-auto relative shrink-0 w-full" data-node-id="127:192" data-name="Container">
                            <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-white w-full" data-node-id="127:193">
                              <p className="leading-[20px]">Rina Oktaviani</p>
                            </div>
                          </div>
                        </div>
                        <div className="absolute left-[15.33px] size-[13.333px] top-[13.33px]" data-node-id="127:194" data-name="Icon">
                          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
                        </div>
                      </div>
                    </div>
                    <div className="col-2 content-stretch flex flex-col gap-[6px] items-start justify-self-stretch relative row-1 self-start shrink-0" data-node-id="127:195" data-name="Field 2: Username (Locked)">
                      <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="127:196" data-name="Label">
                        <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="127:197" data-name="Container">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[12px] text-white whitespace-nowrap" data-node-id="127:198">
                            <p className="leading-[16px]">Username Kasir</p>
                          </div>
                        </div>
                        <div className="content-stretch flex gap-[1.99px] items-center relative shrink-0" data-node-id="127:199" data-name="Container">
                          <div className="h-[12.25px] relative shrink-0 w-[9.333px]" data-node-id="127:200" data-name="Container">
                            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer9} />
                          </div>
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[11px] text-white whitespace-nowrap" data-node-id="127:202">
                            <p className="leading-[14px]">Terkunci</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="127:203" data-name="Container">
                        <div className="absolute left-[13.67px] size-[16.667px] top-[11.67px]" data-node-id="127:204" data-name="Icon">
                          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon1} />
                        </div>
                        <div className="bg-[#7d8d9e] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px opacity-80 overflow-clip px-[40px] py-[10px] relative rounded-[8px]" data-node-id="127:205" data-name="Input">
                          <div className="content-stretch flex flex-col items-start overflow-auto relative shrink-0 w-full" data-node-id="127:206" data-name="Container">
                            <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-white w-full" data-node-id="127:207">
                              <p className="leading-[20px]">rina.cangkeling</p>
                            </div>
                          </div>
                        </div>
                        <div className="absolute h-[15px] right-[12px] top-[11px] w-[12px]" data-node-id="127:208" data-name="Container">
                          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer10} />
                        </div>
                      </div>
                    </div>
                    <div className="col-1 content-stretch flex flex-col gap-[6px] items-start justify-self-stretch relative row-2 self-start shrink-0" data-node-id="127:210" data-name="Field 3: No. WhatsApp / Telepon">
                      <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="127:211" data-name="Label">
                        <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="127:212" data-name="Container">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[12px] text-white whitespace-nowrap" data-node-id="127:213">
                            <p className="leading-[16px]">Nomor WhatsApp / HP</p>
                          </div>
                        </div>
                        <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="127:214" data-name="Container">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#a24f9d] text-[12px] whitespace-nowrap" data-node-id="127:215">
                            <p className="leading-[16px]">*Aktif</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="127:216" data-name="Container">
                        <div className="bg-[#7d8d9e] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip pl-[40px] pr-[12px] py-[10px] relative rounded-[8px]" data-node-id="127:217" data-name="Input">
                          <div className="content-stretch flex flex-col items-start overflow-auto relative shrink-0 w-full" data-node-id="127:218" data-name="Container">
                            <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-white w-full" data-node-id="127:219">
                              <p className="leading-[20px]">0812-3456-7890</p>
                            </div>
                          </div>
                        </div>
                        <div className="absolute left-[14.5px] size-[15px] top-[12.5px]" data-node-id="127:220" data-name="Icon">
                          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon2} />
                        </div>
                      </div>
                    </div>
                    <div className="col-2 content-stretch flex flex-col gap-[6px] items-start justify-self-stretch relative row-2 self-start shrink-0" data-node-id="127:221" data-name="Field 4: Email Kasir">
                      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:222" data-name="Label">
                        <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[12px] text-white w-full" data-node-id="127:223">
                          <p className="leading-[16px]">Email Operasional</p>
                        </div>
                      </div>
                      <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="127:224" data-name="Container">
                        <div className="bg-[#7d8d9e] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip pl-[40px] pr-[12px] py-[10px] relative rounded-[8px]" data-node-id="127:225" data-name="Input">
                          <div className="content-stretch flex flex-col items-start overflow-auto relative shrink-0 w-full" data-node-id="127:226" data-name="Container">
                            <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-white w-full" data-node-id="127:227">
                              <p className="leading-[20px]">rina.kasir@cirengcangkeling.com</p>
                            </div>
                          </div>
                        </div>
                        <div className="absolute h-[13.333px] left-[13.67px] top-[13.33px] w-[16.667px]" data-node-id="127:228" data-name="Icon">
                          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon3} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[11.99px] items-center justify-end pt-[8px] relative shrink-0 w-full" data-node-id="127:229" data-name="Bottom Action">
                    <div className="content-stretch flex flex-col items-center justify-center px-[16px] py-[10px] relative rounded-[8px] shrink-0" data-node-id="127:230" data-name="Button">
                      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-[12px] text-center text-white whitespace-nowrap" data-node-id="127:231">
                        <p className="leading-[16px]">Batal</p>
                      </div>
                    </div>
                    <div className="bg-[#a24f9d] content-stretch flex gap-[8px] items-center px-[24px] py-[10px] relative rounded-[8px] shrink-0" data-node-id="127:232" data-name="Button">
                      <div className="absolute bg-[rgba(143,66,66,0)] inset-[0_-0.5px_0_0] rounded-[8px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]" data-node-id="127:233" data-name="Button:shadow" />
                      <div className="relative shrink-0 size-[13.5px]" data-node-id="127:234" data-name="Container">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer11} />
                      </div>
                      <div className="content-stretch flex flex-col items-center relative shrink-0" data-node-id="127:236" data-name="Container">
                        <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[14px] text-center text-white whitespace-nowrap" data-node-id="127:237">
                          <p className="leading-[20px]">Simpan Perubahan Profil</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-[16px] items-start p-[24px] relative rounded-[12px] shrink-0 w-full" data-node-id="127:238" data-name="2. Form Keamanan & PIN Otorisasi Transaksi">
                <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-node-id="127:239" data-name="Container">
                  <div className="bg-[#dae2fd] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[40px]" data-node-id="127:240" data-name="Background">
                    <div className="h-[16px] relative shrink-0 w-[20px]" data-node-id="127:241" data-name="Container">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer12} />
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-[379.75px]" data-node-id="127:243" data-name="Container">
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:244" data-name="Heading 3">
                      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[18px] text-white whitespace-nowrap" data-node-id="127:245">
                        <p className="leading-[24px]">PIN Otorisasi Kasir (6 Digit)</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:246" data-name="Container">
                      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[12px] text-white whitespace-nowrap" data-node-id="127:247">
                        <p className="leading-[16px]">Proteksi akses brankas kasir, void struk, dan serah terima shift harian</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#f3f4f5] content-stretch flex gap-[8px] items-start p-[12px] relative rounded-[12px] shrink-0 w-full" data-node-id="127:248" data-name="Info Callout Banner">
                  <div className="h-[20.333px] relative shrink-0 w-[18.333px]" data-node-id="127:249" data-name="Margin">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgMargin} />
                  </div>
                  <div className="content-stretch flex flex-col items-start pr-[6.56px] relative shrink-0" data-node-id="127:251" data-name="Container">
                    <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#5c403c] text-[12px] whitespace-nowrap" data-node-id="127:252">
                      <p className="mb-0">
                        <span className="leading-[19.5px]">Keamanan Kasir:</span>
                        <span className="[word-break:break-word] font-['Plus_Jakarta_Sans:Regular'] font-normal leading-[19.5px]">{` PIN Kasir 6-digit digunakan secara mandiri untuk membuka laci kasir (cash`}</span>
                      </p>
                      <p className="font-['Plus_Jakarta_Sans:Regular'] font-normal leading-[19.5px] mb-0">drawer) manual, melakukan pembatalan item pada antrian nota, dan validasi absensi shift.</p>
                      <p className="font-['Plus_Jakarta_Sans:Regular'] font-normal leading-[19.5px]">Jangan berikan kombinasi ini kepada pihak luar.</p>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-node-id="127:253" data-name="Form">
                  <div className="content-stretch flex gap-[12px] items-start justify-center relative shrink-0 w-full" data-node-id="127:254" data-name="Container">
                    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative" data-node-id="127:255" data-name="Current PIN">
                      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:256" data-name="Label">
                        <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[12px] text-white w-full" data-node-id="127:257">
                          <p className="leading-[16px]">PIN Saat Ini</p>
                        </div>
                      </div>
                      <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="127:258" data-name="Container">
                        <div className="bg-[#f3f4f5] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip pb-[12px] pt-[11px] px-[12px] relative rounded-[8px]" data-node-id="127:259" data-name="Input">
                          <div className="content-stretch flex flex-col items-center overflow-clip relative shrink-0 w-full" data-node-id="127:260" data-name="Container">
                            <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#9ca3af] text-[16px] text-center tracking-[1.6px] whitespace-nowrap" data-node-id="127:261">
                              <p className="leading-[normal]">••••••</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative" data-node-id="127:262" data-name="New PIN">
                      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:263" data-name="Label">
                        <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[12px] text-white w-full" data-node-id="127:264">
                          <p className="leading-[16px]">PIN Baru (6 Digit)</p>
                        </div>
                      </div>
                      <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="127:265" data-name="Container">
                        <div className="bg-[#f3f4f5] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip pb-[12px] pt-[11px] px-[12px] relative rounded-[8px]" data-node-id="127:266" data-name="Input">
                          <div className="content-stretch flex flex-col items-center overflow-clip relative shrink-0 w-full" data-node-id="127:267" data-name="Container">
                            <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#9ca3af] text-[16px] text-center tracking-[1.6px] whitespace-nowrap" data-node-id="127:268">
                              <p className="leading-[normal]">Ketik 6 angka</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative" data-node-id="127:269" data-name="Confirm PIN">
                      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:270" data-name="Label">
                        <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[12px] text-white w-full" data-node-id="127:271">
                          <p className="leading-[16px]">Konfirmasi PIN Baru</p>
                        </div>
                      </div>
                      <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="127:272" data-name="Container">
                        <div className="bg-[#f3f4f5] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip pb-[12px] pt-[11px] px-[12px] relative rounded-[8px]" data-node-id="127:273" data-name="Input">
                          <div className="content-stretch flex flex-col items-center overflow-clip relative shrink-0 w-full" data-node-id="127:274" data-name="Container">
                            <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#9ca3af] text-[16px] text-center tracking-[1.6px] whitespace-nowrap" data-node-id="127:275">
                              <p className="leading-[normal]">Ulangi 6 angka</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex items-center pt-[4px] relative shrink-0 w-full" data-node-id="127:276" data-name="Bottom Button">
                    <div className="content-stretch flex flex-col items-start mr-[-0.001px] relative shrink-0" data-node-id="127:277" data-name="Container">
                      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[11px] text-white whitespace-nowrap" data-node-id="127:278">
                        <p className="leading-[14px]">Kombinasi harus berupa 6 digit angka numerik.</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-w-[184.97999572753906px] pl-[141.391px] relative" data-node-id="127:279" data-name="Button:margin">
                      <div className="bg-[#a24f9d] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-[8px] items-center px-[20px] py-[10px] relative rounded-[8px] shrink-0" data-node-id="127:280" data-name="Button">
                        <div className="h-[9px] relative shrink-0 w-[17.25px]" data-node-id="127:281" data-name="Container">
                          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer13} />
                        </div>
                        <div className="content-stretch flex flex-col items-center relative shrink-0" data-node-id="127:283" data-name="Container">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[14px] text-center text-white whitespace-nowrap" data-node-id="127:284">
                            <p className="leading-[20px]">Perbarui PIN Kasir</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-[16px] items-start p-[24px] relative rounded-[12px] shrink-0 w-full" data-node-id="127:285" data-name="3. Ringkasan Hak Akses Kasir (RBAC Clarification)">
                <div className="content-stretch flex items-center justify-between pb-[4px] relative shrink-0 w-full" data-node-id="127:286" data-name="Container">
                  <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-node-id="127:287" data-name="Container">
                    <div className="bg-[#a24f9d] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[40px]" data-node-id="127:288" data-name="Background">
                      <div className="h-[20px] relative shrink-0 w-[16px]" data-node-id="127:289" data-name="Container">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer14} />
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[337.2px]" data-node-id="127:291" data-name="Container">
                      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:292" data-name="Heading 3">
                        <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[18px] text-white whitespace-nowrap" data-node-id="127:293">
                          <p className="leading-[24px]">{`Hak Akses & Batasan Peran`}</p>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:294" data-name="Container">
                        <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[12px] text-white whitespace-nowrap" data-node-id="127:295">
                          <p className="leading-[16px]">Ketentuan hak operasi akun kasir cabang Cireng Cangkeling</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#a24f9d] content-stretch flex flex-col items-start px-[10px] py-[4px] relative rounded-[4px] shrink-0" data-node-id="127:296" data-name="Background">
                    <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-[11px] text-white whitespace-nowrap" data-node-id="127:297">
                      <p className="leading-[14px]">Role: Kasir Toko</p>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex gap-[12px] items-start justify-center relative shrink-0 w-full" data-node-id="127:298" data-name="Permission Matrix List">
                  <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px pb-[80px] relative" data-node-id="127:299" data-name="Granted Permissions">
                    <div className="content-stretch flex gap-[6px] items-center pb-[4px] relative shrink-0 w-full" data-node-id="127:300" data-name="Container">
                      <div className="relative shrink-0 size-[15px]" data-node-id="127:301" data-name="Container">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer15} />
                      </div>
                      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#00682b] text-[11px] tracking-[0.55px] uppercase whitespace-nowrap" data-node-id="127:303">
                        <p className="leading-[14px]">IZIN OPERASIONAL AKTIF</p>
                      </div>
                    </div>
                    <div className="bg-[#f3f4f5] content-stretch flex gap-[10px] items-start p-[12px] relative rounded-[8px] shrink-0 w-full" data-node-id="127:304" data-name="Background">
                      <div className="h-[17px] relative shrink-0 w-[15px]" data-node-id="127:305" data-name="Margin">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgMargin1} />
                      </div>
                      <div className="content-stretch flex flex-col items-start relative shrink-0 w-[187.2px]" data-node-id="127:307" data-name="Container">
                        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:308" data-name="Container">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#a24f9d] text-[12px] whitespace-nowrap" data-node-id="127:309">
                            <p className="leading-[16px]">{`Membuka Transaksi POS & Struk`}</p>
                          </div>
                        </div>
                        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:310" data-name="Container">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#a24f9d] text-[12px] whitespace-nowrap" data-node-id="127:311">
                            <p className="leading-[16px] mb-0">Dapat memproses pesanan dan</p>
                            <p className="leading-[16px]">mencetak receipt pelanggan.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#f3f4f5] content-stretch flex gap-[10px] items-start p-[12px] relative rounded-[8px] shrink-0 w-full" data-node-id="127:312" data-name="Background">
                      <div className="h-[17px] relative shrink-0 w-[15px]" data-node-id="127:313" data-name="Margin">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgMargin1} />
                      </div>
                      <div className="content-stretch flex flex-col items-start relative shrink-0 w-[182.11px]" data-node-id="127:315" data-name="Container">
                        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:316" data-name="Container">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#a24f9d] text-[12px] whitespace-nowrap" data-node-id="127:317">
                            <p className="leading-[16px]">Riwayat Transaksi Shift Berjalan</p>
                          </div>
                        </div>
                        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:318" data-name="Container">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#a24f9d] text-[12px] whitespace-nowrap" data-node-id="127:319">
                            <p className="leading-[16px] mb-0">{`Melihat & mencetak ulang nota`}</p>
                            <p className="leading-[16px]">penjualan shift saat ini.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#f3f4f5] content-stretch flex gap-[10px] items-start p-[12px] relative rounded-[8px] shrink-0 w-full" data-node-id="127:320" data-name="Background">
                      <div className="h-[17px] relative shrink-0 w-[15px]" data-node-id="127:321" data-name="Margin">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgMargin1} />
                      </div>
                      <div className="content-stretch flex flex-col items-start relative shrink-0 w-[224.65px]" data-node-id="127:323" data-name="Container">
                        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:324" data-name="Container">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#a24f9d] text-[12px] whitespace-nowrap" data-node-id="127:325">
                            <p className="leading-[16px]">Memantau Ketersediaan Stok</p>
                          </div>
                        </div>
                        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:326" data-name="Container">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#a24f9d] text-[12px] whitespace-nowrap" data-node-id="127:327">
                            <p className="leading-[16px] mb-0">{`Melihat jumlah stok cireng & frozen food`}</p>
                            <p className="leading-[16px]">yang siap dijual.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative" data-node-id="127:328" data-name="Restricted Permissions (Owner Only)">
                    <div className="content-stretch flex gap-[6px] items-center pb-[4px] relative shrink-0 w-full" data-node-id="127:329" data-name="Container">
                      <div className="h-[15.75px] relative shrink-0 w-[12px]" data-node-id="127:330" data-name="Container">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer16} />
                      </div>
                      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#a24f9d] text-[11px] tracking-[0.55px] uppercase whitespace-nowrap" data-node-id="127:332">
                        <p className="leading-[14px]">AKSES DIBATASI (KHUSUS OWNER)</p>
                      </div>
                    </div>
                    <div className="bg-[rgba(255,218,214,0.3)] content-stretch flex gap-[10px] items-start p-[12px] relative rounded-[8px] shrink-0 w-full" data-node-id="127:333" data-name="Overlay">
                      <div className="h-[17px] relative shrink-0 w-[15px]" data-node-id="127:334" data-name="Margin">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgMargin2} />
                      </div>
                      <div className="content-stretch flex flex-col items-start relative shrink-0 w-[202.33px]" data-node-id="127:336" data-name="Container">
                        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:337" data-name="Container">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#a24f9d] text-[12px] whitespace-nowrap" data-node-id="127:338">
                            <p className="leading-[16px]">{`Ubah Harga Produk & HPP Master`}</p>
                          </div>
                        </div>
                        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:339" data-name="Container">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#a24f9d] text-[12px] whitespace-nowrap" data-node-id="127:340">
                            <p className="leading-[16px] mb-0">Penyesuaian nominal jual hanya oleh</p>
                            <p className="leading-[16px]">Kang Asep (Owner).</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[rgba(255,218,214,0.3)] content-stretch flex gap-[10px] items-start p-[12px] relative rounded-[8px] shrink-0 w-full" data-node-id="127:341" data-name="Overlay">
                      <div className="h-[17px] relative shrink-0 w-[15px]" data-node-id="127:342" data-name="Margin">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgMargin2} />
                      </div>
                      <div className="content-stretch flex flex-col items-start relative shrink-0 w-[209.76px]" data-node-id="127:344" data-name="Container">
                        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:345" data-name="Container">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#a24f9d] text-[12px] whitespace-nowrap" data-node-id="127:346">
                            <p className="leading-[16px]">Audit Stok Gudang Bahan Baku</p>
                          </div>
                        </div>
                        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:347" data-name="Container">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#a24f9d] text-[12px] whitespace-nowrap" data-node-id="127:348">
                            <p className="leading-[16px] mb-0">Input tepung tapioka, minyak, bumbu</p>
                            <p className="leading-[16px]">diatur Kepala Dapur/Owner.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[rgba(255,218,214,0.3)] content-stretch flex gap-[10px] items-start p-[12px] relative rounded-[8px] shrink-0 w-full" data-node-id="127:349" data-name="Overlay">
                      <div className="h-[17px] relative shrink-0 w-[15px]" data-node-id="127:350" data-name="Margin">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgMargin2} />
                      </div>
                      <div className="content-stretch flex flex-col items-start relative shrink-0 w-[195.62px]" data-node-id="127:352" data-name="Container">
                        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:353" data-name="Container">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#a24f9d] text-[12px] whitespace-nowrap" data-node-id="127:354">
                            <p className="leading-[16px]">{`Laporan Keuangan & Margin Laba`}</p>
                          </div>
                        </div>
                        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:355" data-name="Container">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#a24f9d] text-[12px] whitespace-nowrap" data-node-id="127:356">
                            <p className="leading-[16px] mb-0">Kasir hanya memiliki akses rekapan</p>
                            <p className="leading-[16px]">omzet kas kecil shift.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[rgba(255,218,214,0.3)] content-stretch flex gap-[10px] items-start p-[12px] relative rounded-[8px] shrink-0 w-full" data-node-id="127:357" data-name="Overlay">
                      <div className="h-[17px] relative shrink-0 w-[15px]" data-node-id="127:358" data-name="Margin">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgMargin2} />
                      </div>
                      <div className="content-stretch flex flex-col items-start relative shrink-0 w-[188.86px]" data-node-id="127:360" data-name="Container">
                        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:361" data-name="Container">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#a24f9d] text-[12px] whitespace-nowrap" data-node-id="127:362">
                            <p className="leading-[16px]">{`Kelola Akun & Penugasan Staf`}</p>
                          </div>
                        </div>
                        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="127:363" data-name="Container">
                          <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#a24f9d] text-[12px] whitespace-nowrap" data-node-id="127:364">
                            <p className="leading-[16px] mb-0">{`Manajemen shift & password user`}</p>
                            <p className="leading-[16px]">dilakukan secara terpusat.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#a24f9d] content-stretch flex items-center justify-between p-[14px] relative rounded-[12px] shrink-0 w-full" data-node-id="127:365" data-name="RBAC Escalation Notice">
                  <div className="content-stretch flex gap-[10px] items-center relative shrink-0" data-node-id="127:366" data-name="Container">
                    <div className="bg-[#a24f9d] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[32px]" data-node-id="127:367" data-name="Background">
                      <div className="h-[13.5px] relative shrink-0 w-[15px]" data-node-id="127:368" data-name="Container">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer17} />
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start pr-[27.99px] relative shrink-0" data-node-id="127:370" data-name="Container">
                      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[12px] text-white whitespace-nowrap" data-node-id="127:371">
                        <p className="leading-[16px] mb-0">Jika memerlukan perubahan hak akses atau pembukaan laci</p>
                        <p>
                          <span className="leading-[16px]">{`darurat, silakan hubungi `}</span>
                          <span className="[word-break:break-word] font-['Plus_Jakarta_Sans:Bold'] font-bold leading-[16px]">Kang Asep Sunandar (Owner)</span>
                          <span className="leading-[16px]">.</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-[6px] items-center justify-center px-[12px] py-[6px] relative rounded-[8px] shrink-0" data-node-id="127:372" data-name="Button">
                    <div className="relative shrink-0 size-[13.333px]" data-node-id="127:373" data-name="Container">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer18} />
                    </div>
                    <div className="content-stretch flex flex-col items-center relative shrink-0" data-node-id="127:375" data-name="Container">
                      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[11px] text-center text-white whitespace-nowrap" data-node-id="127:376">
                        <p className="leading-[14px]">Hubungi Owner</p>
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
