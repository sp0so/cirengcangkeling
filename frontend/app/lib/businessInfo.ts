export const businessInfo = {
  name: 'Cireng Cangkeling',
  outletName: 'Cireng Cangkeling',
  address: 'Jalan Parangtritis 55188 Panggungharjo, Special Region of Yogyakarta',
  hours: '10:00-21:00 WIB',
  slogan: 'YANG KAMU INGIN, KITA ADAIN!',
} as const;

export const formatOutletCopy = (copy: string) =>
  copy.replace(/\b(?:outlet\s+)?gerai\b/gi, 'OUTLET');
