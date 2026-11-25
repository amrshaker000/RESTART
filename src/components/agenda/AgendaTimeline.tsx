'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { AgendaItem, ActivityType } from '@/types';
import { Clock, MapPin, User, Search, Filter, Calendar } from 'lucide-react';

interface AgendaTimelineProps {
  initialItems?: AgendaItem[];
}

export function AgendaTimeline({ initialItems = [] }: AgendaTimelineProps) {
  const [selectedTrack, setSelectedTrack] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const tracks = ['all', 'Software', 'AI & Data', 'Business & Growth', 'Career Coaching', 'Design'];
  const types = ['all', 'session', 'workshop', 'coaching', 'networking', 'break'];

  const filteredItems = initialItems.filter((item) => {
    const matchesTrack = selectedTrack === 'all' || (item.track && item.track.toLowerCase().includes(selectedTrack.toLowerCase()));
    const matchesType = selectedType === 'all' || item.activity_type === selectedType;
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTrack && matchesType && matchesSearch;
  });

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Search and Filters Bar */}
      <Card variant="white" className="p-4 md:p-6 shadow-brutal">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:max-w-xs relative">
            <Search className="w-4 h-4 absolute left-3 top-3.5 text-[#0B1F44]/50" />
            <input
              type="text"
              placeholder="Search sessions or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#E2F0FF] text-[#0B1F44] pl-9 pr-3 py-2 border-2 border-[#0B1F44] text-xs font-bold outline-none focus:border-[#7CCBFF]"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            <span className="text-xs font-black uppercase text-[#0B1F44]/60 mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Track:
            </span>
            {tracks.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTrack(t)}
                className={`px-3 py-1 text-xs font-black uppercase border-2 border-[#0B1F44] transition-all cursor-pointer ${
                  selectedTrack === t
                    ? 'bg-[#7CCBFF] text-[#0B1F44] shadow-brutal-sm'
                    : 'bg-white text-[#0B1F44] hover:bg-[#E2F0FF]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Schedule Items List */}
      {filteredItems.length === 0 ? (
        <Card variant="light-blue" className="text-center py-16 px-6 max-w-xl mx-auto">
          <Calendar className="w-12 h-12 text-[#0B1F44] mx-auto mb-3" />
          <h3 className="text-2xl font-black uppercase text-[#0B1F44] mb-2 font-display">
            The full agenda will be announced soon.
          </h3>
          <p className="text-xs md:text-sm text-[#0B1F44]/80 leading-relaxed font-medium">
            Our organizing team is locking in exact time slots, room assignments, and speaker sessions for December 11, 2026. Check back soon for the complete schedule.
          </p>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredItems.map((item) => (
            <Card key={item.id} variant="white" className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 hover:border-[#7CCBFF] transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Time Badge */}
                <div className="p-3 bg-[#E2F0FF] border-2 border-[#0B1F44] text-center shrink-0 w-32 shadow-brutal-sm">
                  <div className="text-xs font-mono font-bold text-[#FF9F43]">TIME</div>
                  <div className="text-sm font-black font-mono text-[#0B1F44]">
                    {new Date(item.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                {/* Details */}
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <Badge variant="lavender">{item.activity_type}</Badge>
                    {item.track && <Badge variant="sky">{item.track}</Badge>}
                  </div>
                  <h4 className="text-lg font-black uppercase text-[#0B1F44]">{item.title}</h4>
                  {item.description && (
                    <p className="text-xs text-[#0B1F44]/75 mt-1 max-w-xl leading-relaxed font-medium">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Room / Speaker */}
              <div className="flex items-center gap-4 text-xs font-bold text-[#0B1F44] border-t md:border-t-0 md:border-l border-[#0B1F44]/20 pt-3 md:pt-0 md:pl-6 shrink-0">
                {item.room?.name && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#FF9F43]" />
                    <span>{item.room.name}</span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
