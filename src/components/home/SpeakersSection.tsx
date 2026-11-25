import React from 'react';
import { Card } from '@/components/ui/Card';
import { Sparkles, Megaphone } from 'lucide-react';
import { Speaker } from '@/types';

interface SpeakersSectionProps {
  speakers?: Speaker[];
}

export function SpeakersSection({ speakers = [] }: SpeakersSectionProps) {
  const publishedSpeakers = speakers.filter((s) => s.is_published);

  return (
    <section className="py-20 bg-[#FFFFFF] border-y-3 border-[#0B1F44]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12 text-left">
          <span className="text-xs font-black uppercase tracking-widest text-[#0B1F44] bg-[#7CCBFF] px-3 py-1 border-2 border-[#0B1F44] shadow-brutal-sm">
            05 // Speakers & Mentors
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0B1F44] mt-3">
            Voices of Industry
          </h2>
          <p className="text-base sm:text-lg text-[#0B1F44]/80 mt-3 font-medium">
            Learn directly from seasoned specialists across software, business, AI, and creative technology.
          </p>
        </div>

        {publishedSpeakers.length === 0 ? (
          /* Graceful Pending Announcement per requirement - no fake speakers */
          <Card variant="light-blue" className="text-center py-12 px-6 max-w-2xl mx-auto">
            <div className="w-14 h-14 bg-[#7CCBFF] border-2 border-[#0B1F44] shadow-brutal mx-auto flex items-center justify-center mb-4">
              <Megaphone className="w-7 h-7 text-[#0B1F44]" />
            </div>
            <h3 className="text-2xl font-black uppercase text-[#0B1F44] mb-2">
              Speaker announcements are coming soon.
            </h3>
            <p className="text-sm text-[#0B1F44]/80 max-w-md mx-auto leading-relaxed font-medium">
              We are finalizing an exceptional lineup of industry leaders and mentors. Confirmed speakers will be unveiled progressively.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B1F44] bg-[#FFFFFF] px-3 py-1.5 border-2 border-[#0B1F44] shadow-brutal-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#FF9F43]" />
              Official Lineup in Review
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {publishedSpeakers.map((speaker) => (
              <Card key={speaker.id} variant="white">
                <div className="w-full aspect-square bg-[#E2F0FF] border-2 border-[#0B1F44] shadow-brutal-sm mb-4 relative overflow-hidden">
                  {speaker.profile_image ? (
                    <img src={speaker.profile_image} alt={speaker.full_name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-3xl text-[#0B1F44]/40">
                      {speaker.full_name[0]}
                    </div>
                  )}
                </div>
                <h4 className="text-lg font-black uppercase text-[#0B1F44]">{speaker.full_name}</h4>
                <div className="text-xs font-bold text-[#FF9F43] uppercase mb-2">{speaker.professional_title}</div>
                {speaker.session_title && (
                  <p className="text-xs text-[#0B1F44]/80 italic border-t border-[#0B1F44]/20 pt-2 font-medium">
                    &ldquo;{speaker.session_title}&rdquo;
                  </p>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
