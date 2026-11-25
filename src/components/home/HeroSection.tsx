'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Calendar, Sparkles, Gamepad2, Compass } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { WindowFrame } from '@/components/ui/WindowFrame';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-8 pb-20 md:pt-16 md:pb-28 bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="orange" className="flex items-center gap-1.5">
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>NO GAME OVER</span>
              </Badge>
              <Badge variant="lavender" className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>FRIDAY, DEC 11, 2026</span>
              </Badge>
              <Badge variant="white">CAREER DEVELOPMENT DAY</Badge>
            </div>

            {/* Display Headline */}
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#0B1F44] leading-[0.95] font-display">
                YOUR NEXT LEVEL <br />
                <span className="text-[#7CCBFF] drop-shadow-[4px_4px_0px_#0B1F44]">STARTS HERE.</span>
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-[#0B1F44]/90 mt-2 font-arabic" dir="rtl">
                خطوتك الجاية في مسارك المهني بتبدأ من هنا.
              </p>
            </div>

            {/* Descriptive Body Text */}
            <p className="text-base sm:text-lg text-[#0B1F44]/80 max-w-xl leading-relaxed font-medium">
              An experience designed to help you discover your career direction, develop practical skills, and connect with people who can shape your professional journey.
            </p>
            <p className="text-sm sm:text-base text-[#0B1F44]/75 max-w-xl leading-relaxed font-medium font-arabic" dir="rtl">
              يوم متكامل للتوجيه والتطوير المهني، يجمعك بخبراء ومتخصصين ويساعدك تكتشف فرصًا ومسارات جديدة لمستقبلك.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link href="/register">
                <Button variant="primary" size="lg" className="flex items-center gap-2.5 text-base md:text-lg">
                  <span>Register Now</span>
                  <ArrowUpRight className="w-5 h-5 stroke-[3]" />
                </Button>
              </Link>
              <Link href="/agenda">
                <Button variant="secondary" size="lg" className="flex items-center gap-2.5 text-base md:text-lg">
                  <Compass className="w-5 h-5" />
                  <span>Explore Agenda</span>
                </Button>
              </Link>
            </div>

            {/* Quick Micro-stats */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t-2 border-[#0B1F44]/20 max-w-lg">
              <div className="p-3 bg-white border-2 border-[#0B1F44] shadow-brutal-sm">
                <div className="text-xl md:text-2xl font-black text-[#0B1F44]">200-300</div>
                <div className="text-[11px] font-bold uppercase text-[#0B1F44]/70">Attendees</div>
              </div>
              <div className="p-3 bg-[#E2F0FF] border-2 border-[#0B1F44] shadow-brutal-sm">
                <div className="text-xl md:text-2xl font-black text-[#0B1F44]">6 Levels</div>
                <div className="text-[11px] font-bold uppercase text-[#0B1F44]/70">Career Journey</div>
              </div>
              <div className="p-3 bg-[#B794F4] border-2 border-[#0B1F44] shadow-brutal-sm">
                <div className="text-xl md:text-2xl font-black text-[#0B1F44]">10+ Tracks</div>
                <div className="text-[11px] font-bold uppercase text-[#0B1F44]/70">Hands-on</div>
              </div>
            </div>
          </div>

          {/* Right Column: Neo-Brutalist Window Frame with Logo */}
          <div className="lg:col-span-5 relative">
            <WindowFrame title="RESTART_SYS_V2.0.EXE">
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <div className="relative w-full max-w-[340px] aspect-square my-4 transition-transform hover:scale-105 duration-300">
                  <Image
                    src="/brand-assets/logos/primary-logo.png"
                    alt="RESTART — NO GAME OVER"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>

                <div className="w-full bg-[#E2F0FF] border-2 border-[#0B1F44] p-4 text-left shadow-brutal-sm mt-4">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-[#0B1F44]">
                    <span>STATUS: ACTIVE</span>
                    <span className="text-[#FF9F43] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      REGISTRATION OPEN
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-[#0B1F44]/80 font-medium">
                    Organized by <strong>Resala Training Center (RTC)</strong>
                  </div>
                </div>
              </div>
            </WindowFrame>
          </div>

        </div>
      </div>
    </section>
  );
}
