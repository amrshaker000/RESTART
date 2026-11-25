import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Compass, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function FinalCTA() {
  return (
    <section className="py-24 bg-[#0B1F44] text-white border-y-3 border-[#0B1F44] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FF9F43] text-[#0B1F44] font-black uppercase text-xs border-2 border-white shadow-brutal-sm mb-6">
          <Gamepad2 className="w-4 h-4" />
          <span>Checkpoint Ahead</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-6 font-display">
          Ready for your next level?
        </h2>

        <p className="text-lg sm:text-xl text-[#E2F0FF]/85 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
          Seats are limited to 200–300 attendees to ensure quality mentorship, genuine networking, and impactful sessions. Claim your official ticket now.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-5">
          <Link href="/register">
            <Button variant="primary" size="lg" className="flex items-center gap-2 text-base md:text-lg">
              <span>Register Now — Free Ticket</span>
              <ArrowUpRight className="w-5 h-5 stroke-[3]" />
            </Button>
          </Link>
          <Link href="/agenda">
            <Button variant="secondary" size="lg" className="flex items-center gap-2 text-base md:text-lg">
              <Compass className="w-5 h-5" />
              <span>Explore The Agenda</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
