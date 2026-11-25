import React from 'react';
import { Card } from '@/components/ui/Card';
import { MessageSquare, Wrench, UserCheck, FileText, Compass, Users2, Network, Store } from 'lucide-react';

export function ActivitiesSection() {
  const activities = [
    { title: 'Expert Sessions', icon: MessageSquare, badge: 'Main Stage', desc: 'Keynotes and panel debates on navigating current market realities.' },
    { title: 'Interactive Workshops', icon: Wrench, badge: 'Labs', desc: 'Small-group technical and professional skill workshops with immediate practice.' },
    { title: 'One-to-One Coaching', icon: UserCheck, badge: 'Mentorship', desc: 'Private 15-minute consultations with seasoned domain leaders.' },
    { title: 'Live CV Reviews', icon: FileText, badge: 'Audit', desc: 'Constructive feedback on your resume and LinkedIn presence.' },
    { title: 'Career Consulting', icon: Compass, badge: 'Guidance', desc: 'Strategic career planning sessions to align with hiring trends.' },
    { title: 'Mock Interviews', icon: Users2, badge: 'Simulation', desc: 'Practice answering tough interview questions with HR professionals.' },
    { title: 'Open Networking', icon: Network, badge: 'Community', desc: 'Dedicated networking hours to exchange contacts with peers and mentors.' },
    { title: 'Partner & Sponsor Booths', icon: Store, badge: 'Exhibition', desc: 'Meet companies, explore open opportunities, and discover initiatives.' },
  ];

  return (
    <section className="py-20 bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12 text-left">
          <span className="text-xs font-black uppercase tracking-widest text-[#0B1F44] bg-[#FF9F43] px-3 py-1 border-2 border-[#0B1F44] shadow-brutal-sm">
            04 // Event Activities
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0B1F44] mt-3">
            What Happens on Event Day?
          </h2>
          <p className="text-base sm:text-lg text-[#0B1F44]/80 mt-3 font-medium">
            A packed 7-hour schedule designed with high-density learning and real interaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((act, idx) => {
            const Icon = act.icon;
            return (
              <Card key={idx} variant="white" className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 bg-[#E2F0FF] border-2 border-[#0B1F44] shadow-brutal-sm">
                      <Icon className="w-5 h-5 text-[#0B1F44]" />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-wider bg-[#B794F4] text-[#0B1F44] px-2 py-0.5 border border-[#0B1F44]">
                      {act.badge}
                    </span>
                  </div>
                  <h4 className="text-lg font-black uppercase text-[#0B1F44] mb-2">{act.title}</h4>
                  <p className="text-xs text-[#0B1F44]/75 leading-relaxed font-medium">{act.desc}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
