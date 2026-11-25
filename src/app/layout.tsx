import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'RESTART 2026 | NO GAME OVER — Career Development Day',
  description: 'An interactive career development day organized by Resala Training Center (RTC) under Resala Charity Organization. Friday, December 11, 2026.',
  keywords: ['RESTART', 'Career Development', 'RTC', 'Resala', 'Workshops', 'Jobs', 'Coaching'],
  openGraph: {
    title: 'RESTART 2026 | NO GAME OVER',
    description: 'An interactive career development day organized by Resala Training Center (RTC). Your next level starts here.',
    images: ['/brand-assets/logos/primary-logo.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-[#E2F0FF] text-[#0B1F44] antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
