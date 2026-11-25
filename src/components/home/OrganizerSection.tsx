import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Heart, BookOpen, Users, ArrowUpRight } from 'lucide-react';

export function OrganizerSection() {
  return (
    <section className="py-20 bg-[#FFFFFF] border-y-3 border-[#0B1F44]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 flex flex-col gap-5 text-left">
            <span className="text-xs font-black uppercase tracking-widest text-[#0B1F44] bg-[#FF9F43] px-3 py-1 border-2 border-[#0B1F44] shadow-brutal-sm w-fit">
              07 // The Organizer
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0B1F44]">
              Resala Training Center (RTC)
            </h2>
            <div className="text-sm font-bold text-[#FF9F43] uppercase tracking-wider">
              Operating under Resala Charity Organization
            </div>

            <p className="text-base text-[#0B1F44]/80 leading-relaxed font-medium">
              RTC is a leading non-profit educational and vocational training center committed to empowering young adults, graduates, and professionals across Egypt with real-world skills.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
              <div className="p-4 bg-[#E2F0FF] border-2 border-[#0B1F44] shadow-brutal-sm">
                <BookOpen className="w-5 h-5 text-[#0B1F44] mb-2" />
                <div className="text-sm font-black text-[#0B1F44]">Computer Courses</div>
                <div className="text-xs text-[#0B1F44]/70 mt-1 font-medium">Programming, Web, Office, IT</div>
              </div>
              <div className="p-4 bg-[#B794F4] border-2 border-[#0B1F44] shadow-brutal-sm">
                <Users className="w-5 h-5 text-[#0B1F44] mb-2" />
                <div className="text-sm font-black text-[#0B1F44]">Language Tracks</div>
                <div className="text-xs text-[#0B1F44]/70 mt-1 font-medium">English, German, French</div>
              </div>
              <div className="p-4 bg-[#7CCBFF] border-2 border-[#0B1F44] shadow-brutal-sm">
                <Heart className="w-5 h-5 text-[#0B1F44] mb-2" />
                <div className="text-sm font-black text-[#0B1F44]">Human Development</div>
                <div className="text-xs text-[#0B1F44]/70 mt-1 font-medium">Soft skills, Leadership, Mindset</div>
              </div>
            </div>

            <div className="pt-4">
              <Link href="/about-rtc">
                <Button variant="secondary" size="md" className="flex items-center gap-2">
                  <span>Learn More About RTC</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Card variant="light-blue" className="p-8">
              <div className="text-xs font-mono font-bold text-[#0B1F44] uppercase mb-4 tracking-wider">
                ORGANIZATIONAL IDENTITY
              </div>
              <div className="border-2 border-[#0B1F44] bg-white p-6 shadow-brutal-sm mb-6 text-center">
                <div className="text-4xl font-black text-[#0B1F44] tracking-wider font-display">
                  RTC
                </div>
                <div className="text-xs font-bold text-[#FF9F43] tracking-widest mt-1">
                  RESALA TRAINING CENTER
                </div>
              </div>
              <p className="text-xs text-[#0B1F44]/80 leading-relaxed font-medium">
                RESTART is RTC&apos;s flagship annual career development initiative, bringing together students, career switchers, and industry specialists for an unmissable day of growth.
              </p>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}
