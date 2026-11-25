import React from 'react';
import { AgendaTimeline } from '@/components/agenda/AgendaTimeline';
import { Badge } from '@/components/ui/Badge';
import { Calendar, Compass } from 'lucide-react';
import { getServiceSupabase } from '@/lib/supabase/admin';
import { AgendaItem } from '@/types';

export const metadata = {
  title: 'Event Agenda & Schedule | RESTART 2026',
  description: 'Explore the complete timeline, tracks, workshops, and coaching sessions for RESTART.',
};

export default async function AgendaPage() {
  let agendaItems: AgendaItem[] = [];

  try {
    const supabase = getServiceSupabase();
    const { data } = await supabase
      .from('agenda_items')
      .select('*, room:rooms(*)')
      .eq('is_published', true)
      .order('start_time', { ascending: true });

    agendaItems = (data as AgendaItem[]) || [];
  } catch (err) {
    console.error('Error fetching agenda:', err);
  }

  return (
    <div className="py-12 md:py-20 bg-grid-pattern min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge variant="orange" className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>OFFICIAL PROGRAM</span>
            </Badge>
            <Badge variant="sky">FRIDAY, DEC 11, 2026</Badge>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#0B1F44] font-display">
            Interactive Agenda
          </h1>

          <p className="text-lg text-[#0B1F44]/80 mt-3 font-medium">
            Plan your day. Filter by tracks, discover workshops, and secure your time for personalized 1-on-1 career coaching.
          </p>
        </div>

        {/* Timeline Component */}
        <AgendaTimeline initialItems={agendaItems} />

      </div>
    </div>
  );
}
