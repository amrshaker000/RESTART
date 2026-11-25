import React from 'react';
import { Card } from '@/components/ui/Card';
import { Handshake } from 'lucide-react';
import { Sponsor } from '@/types';

interface SponsorsSectionProps {
  sponsors?: Sponsor[];
}

export function SponsorsSection({ sponsors = [] }: SponsorsSectionProps) {
  const publishedSponsors = sponsors.filter((s) => s.is_published);

  return (
    <section className="py-20 bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12 text-left">
          <span className="text-xs font-black uppercase tracking-widest text-[#0B1F44] bg-[#B794F4] px-3 py-1 border-2 border-[#0B1F44] shadow-brutal-sm">
            06 // Sponsors & Community Partners
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0B1F44] mt-3">
            Powered by Ecosystem Allies
          </h2>
          <p className="text-base sm:text-lg text-[#0B1F44]/80 mt-3 font-medium">
            Organizations dedicated to fostering talent, skills, and community growth.
          </p>
        </div>

        {publishedSponsors.length === 0 ? (
          /* Graceful Pending Announcement - no fake placeholder sponsor logos */
          <Card variant="white" className="text-center py-12 px-6 max-w-xl mx-auto">
            <div className="w-14 h-14 bg-[#B794F4] border-2 border-[#0B1F44] shadow-brutal mx-auto flex items-center justify-center mb-4">
              <Handshake className="w-7 h-7 text-[#0B1F44]" />
            </div>
            <h3 className="text-2xl font-black uppercase text-[#0B1F44] mb-2">
              Sponsors & Partners Coming Soon
            </h3>
            <p className="text-sm text-[#0B1F44]/80 max-w-md mx-auto leading-relaxed font-medium">
              Official partner and sponsorship agreements are currently being confirmed. All approved organizations will be listed here.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {publishedSponsors.map((s) => (
              <Card key={s.id} variant="white" className="flex items-center justify-center p-6 h-28">
                {s.logo ? (
                  <img src={s.logo} alt={s.organization_name} className="max-h-12 object-contain" />
                ) : (
                  <span className="font-bold text-sm text-[#0B1F44]">{s.organization_name}</span>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
