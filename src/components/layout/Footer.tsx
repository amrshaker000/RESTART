import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Heart, Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0B1F44] text-[#FFFFFF] border-t-3 border-[#0B1F44] mt-24">
      {/* Top Banner with Ticker / Slogan */}
      <div className="bg-[#7CCBFF] text-[#0B1F44] py-3 px-4 border-b-3 border-[#0B1F44] overflow-hidden whitespace-nowrap">
        <div className="flex items-center justify-around font-black uppercase tracking-widest text-xs md:text-sm">
          <span>🎮 NO GAME OVER</span>
          <span className="hidden sm:inline">•</span>
          <span>🚀 CAREER DEVELOPMENT DAY</span>
          <span className="hidden sm:inline">•</span>
          <span>⚡ FRIDAY, DECEMBER 11, 2026</span>
          <span className="hidden sm:inline">•</span>
          <span>🏆 RTC RESALA</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Col 1: Brand & Logos */}
          <div className="md:col-span-2 flex flex-col gap-5">
            <div className="relative w-56 h-14">
              <Image
                src="/brand-assets/logos/dark-banner-logo.png"
                alt="RESTART NO GAME OVER"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-sm text-[#E2F0FF]/80 max-w-md leading-relaxed font-medium">
              An immersive career development experience organized by Resala Training Center (RTC) under Resala Charity Organization. Designed to guide, inspire, and elevate early-career professionals and graduates to their next level.
            </p>
            <div className="flex flex-col gap-2 pt-2 text-xs text-[#7CCBFF] font-mono">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#FF9F43]" />
                <span>Friday, December 11, 2026 • 09:00 AM – 04:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#FF9F43]" />
                <span>Venue details will be announced soon.</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-black uppercase tracking-widest text-[#7CCBFF] border-b-2 border-[#7CCBFF] pb-1 w-fit">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm font-bold">
              <li>
                <Link href="/" className="hover:text-[#7CCBFF] transition-colors">Home Page</Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-[#7CCBFF] transition-colors">Attendee Registration</Link>
              </li>
              <li>
                <Link href="/agenda" className="hover:text-[#7CCBFF] transition-colors">Event Agenda</Link>
              </li>
              <li>
                <Link href="/about-rtc" className="hover:text-[#7CCBFF] transition-colors">About RTC Resala</Link>
              </li>
              <li>
                <Link href="/join-us" className="hover:text-[#7CCBFF] transition-colors">Volunteer Recruitment</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Community & Social */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-black uppercase tracking-widest text-[#FF9F43] border-b-2 border-[#FF9F43] pb-1 w-fit">
              RTC Community
            </h4>
            <p className="text-xs text-[#E2F0FF]/80 leading-relaxed font-medium">
              Join hundreds of career explorers on the official WhatsApp community group.
            </p>
            <a
              href={process.env.NEXT_PUBLIC_WHATSAPP_GROUP_URL || "https://chat.whatsapp.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-bold uppercase text-xs px-4 py-2.5 bg-[#FF9F43] text-[#0B1F44] border-2 border-[#FFFFFF] shadow-brutal-sm hover:bg-[#FFAF60] transition-colors"
            >
              WhatsApp Group
            </a>
            <div className="pt-3">
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-1.5 text-xs text-[#E2F0FF]/40 hover:text-[#7CCBFF] transition-colors"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Staff Portal</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E2F0FF]/60 gap-4">
          <p>© 2026 RESTART. Organized with <Heart className="w-3 h-3 text-[#FF5F56] inline mx-1 fill-current" /> by Resala Training Center (RTC).</p>
          <p className="font-mono text-white/40">NO GAME OVER • ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </footer>
  );
}
