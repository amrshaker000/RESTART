import React from 'react';
import { Card } from '@/components/ui/Card';
import { Target, Users, Zap, ShieldCheck } from 'lucide-react';

export function EventOverview() {
  const pillars = [
    {
      icon: Target,
      title: 'Real Career Direction',
      description: 'Stop guessing your path. Discover genuine career trajectories based on market demands and your own natural strengths.',
      accent: 'bg-[#7CCBFF]',
    },
    {
      icon: Zap,
      title: 'Practical Hands-on Skills',
      description: 'Engage in focused workshops, CV audits, and simulated interviews led by industry veterans.',
      accent: 'bg-[#B794F4]',
    },
    {
      icon: Users,
      title: 'High-Value Connections',
      description: 'Build your professional network with peers, mentors, recruiters, and companies looking for ambitious talent.',
      accent: 'bg-[#FF9F43]',
    },
    {
      icon: ShieldCheck,
      title: 'Resala Training Heritage',
      description: 'Backed by RTC’s long-standing dedication to empowering youth with accessible, top-tier professional training.',
      accent: 'bg-[#FFFFFF]',
    },
  ];

  return (
    <section className="py-20 bg-[#FFFFFF] border-y-3 border-[#0B1F44]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <span className="text-xs font-black uppercase tracking-widest text-[#7CCBFF] bg-[#0B1F44] px-3 py-1">
            01 // What is RESTART?
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0B1F44] mt-3">
            Not just a conference. <br />
            A career progression checkpoint.
          </h2>
          <p className="text-base sm:text-lg text-[#0B1F44]/75 mt-4 leading-relaxed font-medium">
            Graduation or early career stages often feel overwhelming. RESTART is designed to turn uncertainty into a clear, actionable game plan. There is no &ldquo;game over&rdquo; — only your next level.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <Card key={idx} variant="light-blue" className="flex flex-col justify-between">
                <div>
                  <div className={`w-12 h-12 ${pillar.accent} border-2 border-[#0B1F44] shadow-brutal-sm flex items-center justify-center mb-5`}>
                    <Icon className="w-6 h-6 text-[#0B1F44]" />
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-wider text-[#0B1F44] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#0B1F44]/80 leading-relaxed font-medium">
                    {pillar.description}
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
