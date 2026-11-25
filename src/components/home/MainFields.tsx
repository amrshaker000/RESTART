import React from 'react';
import { Card } from '@/components/ui/Card';
import { Code, Cpu, Database, ShieldAlert, Briefcase, Megaphone, Palette, Rocket } from 'lucide-react';

export function MainFields() {
  const fields = [
    { title: 'Programming & Software', icon: Code, desc: 'Web development, mobile apps, architecture & coding standards' },
    { title: 'Artificial Intelligence', icon: Cpu, desc: 'Machine learning, prompt engineering, generative models & workflows' },
    { title: 'Data Analysis', icon: Database, desc: 'Business intelligence, SQL, visualization, data-driven decisions' },
    { title: 'Cybersecurity', icon: ShieldAlert, desc: 'Network defense, ethical testing, digital identity & privacy' },
    { title: 'Business & Startups', icon: Briefcase, desc: 'Project management, product strategy, pitch decks & operations' },
    { title: 'Digital Marketing', icon: Megaphone, desc: 'Growth strategies, social media branding, analytics & SEO' },
    { title: 'Graphic & UI/UX Design', icon: Palette, desc: 'Visual identity, product design systems, user experience' },
    { title: 'Freelancing & Remote Work', icon: Rocket, desc: 'Finding global clients, pricing services, portfolio building' },
  ];

  return (
    <section className="py-20 bg-[#FFFFFF] border-y-3 border-[#0B1F44]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12 text-left">
          <span className="text-xs font-black uppercase tracking-widest text-[#0B1F44] bg-[#7CCBFF] px-3 py-1 border-2 border-[#0B1F44] shadow-brutal-sm">
            03 // Participating Fields
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0B1F44] mt-3">
            Explore Tomorrow’s Disciplines
          </h2>
          <p className="text-base sm:text-lg text-[#0B1F44]/80 mt-3 font-medium">
            Targeted tracks led by specialized practitioners to help you orient your career trajectory.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {fields.map((f, i) => {
            const Icon = f.icon;
            return (
              <Card key={i} variant="white" className="hover:bg-[#E2F0FF] transition-colors cursor-pointer group">
                <div className="p-3 bg-[#7CCBFF] border-2 border-[#0B1F44] shadow-brutal-sm w-fit mb-4 group-hover:bg-[#B794F4] transition-colors">
                  <Icon className="w-5 h-5 text-[#0B1F44]" />
                </div>
                <h4 className="text-base font-black uppercase text-[#0B1F44] mb-2">{f.title}</h4>
                <p className="text-xs text-[#0B1F44]/75 leading-relaxed font-medium">{f.desc}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
