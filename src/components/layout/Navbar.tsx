'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Agenda', href: '/agenda' },
    { label: 'About RTC', href: '/about-rtc' },
    { label: 'Volunteer', href: '/join-us' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FFFFFF] border-b-3 border-[#0B1F44] shadow-brutal-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-102">
            <div className="relative w-44 h-12 md:w-52 md:h-14">
              <Image
                src="/brand-assets/logos/banner-logo.png"
                alt="RESTART — NO GAME OVER"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-black uppercase tracking-wider text-[#0B1F44] hover:text-[#7CCBFF] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#0B1F44] hover:after:w-full after:transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/register">
              <Button variant="primary" size="md" className="flex items-center gap-2">
                <span>Register Now</span>
                <ArrowUpRight className="w-4 h-4 stroke-[3]" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border-2 border-[#0B1F44] bg-[#7CCBFF] text-[#0B1F44] shadow-brutal-sm"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 stroke-[3]" /> : <Menu className="w-6 h-6 stroke-[3]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-[#0B1F44] bg-[#E2F0FF] p-6 shadow-brutal-lg">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-black uppercase tracking-wider text-[#0B1F44] py-2 border-b border-[#0B1F44]/20"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="lg" fullWidth className="flex items-center justify-center gap-2">
                  <span>Register Now</span>
                  <ArrowUpRight className="w-5 h-5 stroke-[3]" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
