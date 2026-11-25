import React from 'react';
import { Card } from '@/components/ui/Card';
import { Compass, BookOpen, Wrench, UserCheck, Share2, Award } from 'lucide-react';

export function CareerJourney() {
  const levels = [
    {
      level: '01',
      title: 'DISCOVER',
      subtitle: 'Map your territory',
      description: 'Explore the high-growth fields in today’s modern job market and locate where your potential thrives.',
      icon: Compass,
      color: 'bg-[#7CCBFF]',
    },
    {
      level: '02',
      title: 'LEARN',
      subtitle: 'Acquire knowledge',
      description: 'Attend focused keynotes and industry sessions that cut through fluff with practical insights.',
      icon: BookOpen,
      color: 'bg-[#FFFFFF]',
    },
    {
      level: '03',
      title: 'PRACTICE',
      subtitle: 'Forge your skills',
      description: 'Participate in hands-on workshops and real case simulations to test your abilities.',
      icon: Wrench,
      color: 'bg-[#B794F4]',
    },
    {
      level: '04',
      title: 'GET GUIDED',
      subtitle: 'Unlock 1-on-1 mentorship',
      description: 'Sit with senior practitioners for personalized CV reviews and career consulting.',
      icon: UserCheck,
      color: 'bg-[#FF9F43]',
    },
    {
      level: '05',
      title: 'CONNECT',
      subtitle: 'Form your guild',
      description: 'Network with fellow early-career professionals, recruiters, and community leaders.',
      icon: Share2,
      color: 'bg-[#7CCBFF]',
    },
    {
      level: '06',
      title: 'LEVEL UP',
      subtitle: 'Execute your roadmap',
      description: 'Leave with a concrete action plan, verified certificate, and access to the RTC alumni network.',
      icon: Award,
      color: 'bg-[#0B1F44] text-white',
    },
  ];

  return (
    <section className="py-24 bg-grid-pattern relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-[#0B1F44] bg-[#B794F4] px-3 py-1 border-2 border-[#0B1F44] shadow-brutal-sm">
            02 // The Career Progression
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0B1F44] mt-4">
            Six Levels. One Purpose.
          </h2>
          <p className="text-base sm:text-lg text-[#0B1F44]/80 mt-3 font-medium">
            Every checkpoint in RESTART is designed to give you momentum. Choose your mission and conquer each level.
          </p>
        </div>

        {/* Level Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {levels.map((lvl) => {
            const Icon = lvl.icon;
            const isDark = lvl.level === '06';

            return (
              <Card
                key={lvl.level}
                variant={isDark ? 'navy' : 'white'}
                className="flex flex-col justify-between group hover:-translate-y-1 transition-transform"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-black text-[#FF9F43]">
                      LVL {lvl.level}
                    </span>
                    <div className={`p-2.5 border-2 border-[#0B1F44] shadow-brutal-sm ${lvl.color}`}>
                      <Icon className={`w-5 h-5 ${isDark ? 'text-white' : 'text-[#0B1F44]'}`} />
                    </div>
                  </div>
                  <h3 className={`text-xl font-black uppercase tracking-wider mb-1 ${isDark ? 'text-white' : 'text-[#0B1F44]'}`}>
                    {lvl.title}
                  </h3>
                  <div className={`text-xs font-bold uppercase tracking-wider mb-3 ${isDark ? 'text-[#7CCBFF]' : 'text-[#FF9F43]'}`}>
                    {lvl.subtitle}
                  </div>
                  <p className={`text-sm leading-relaxed font-medium ${isDark ? 'text-white/80' : 'text-[#0B1F44]/80'}`}>
                    {lvl.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
