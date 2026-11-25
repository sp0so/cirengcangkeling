import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { AppProvider } from './lib/context';
import SmoothScroll from './components/SmoothScroll';

export const metadata: Metadata = {
  title: 'Cireng Cangkeling — Sistem Informasi Manajemen & POS',
  description: 'Aplikasi Manajemen Operasional, Kasir POS, dan Inventaris Cireng Cangkeling',
  icons: {
    icon: '/logo-brand.png',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#FFF7ED] text-[#0B1C30]">
        <AppProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </AppProvider>
      </body>
    </html>
  );
}
