import React from 'react';
import { Card } from '@/components/ui/Card';
import { MapPin, Calendar, Clock } from 'lucide-react';

export function VenueSection() {
  return (
    <section className="py-20 bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12 text-left">
          <span className="text-xs font-black uppercase tracking-widest text-[#0B1F44] bg-[#7CCBFF] px-3 py-1 border-2 border-[#0B1F44] shadow-brutal-sm">
            08 // Venue & Date
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0B1F44] mt-3">
            Location & Event Schedule
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="white" className="flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-[#7CCBFF] border-2 border-[#0B1F44] shadow-brutal-sm flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-[#0B1F44]" />
              </div>
              <h3 className="text-lg font-black uppercase text-[#0B1F44] mb-2">Event Date</h3>
              <p className="text-xl font-bold text-[#0B1F44]">Friday, December 11, 2026</p>
              <p className="text-xs text-[#0B1F44]/70 mt-1 font-medium">Confirmed official event day</p>
            </div>
          </Card>

          <Card variant="white" className="flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-[#B794F4] border-2 border-[#0B1F44] shadow-brutal-sm flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-[#0B1F44]" />
              </div>
              <h3 className="text-lg font-black uppercase text-[#0B1F44] mb-2">Time Window</h3>
              <p className="text-xl font-bold text-[#0B1F44]">09:00 AM – 04:00 PM</p>
              <p className="text-xs text-[#0B1F44]/70 mt-1 font-medium">Tentative schedule (Doors open at 08:30 AM)</p>
            </div>
          </Card>

          <Card variant="light-blue" className="flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-[#FF9F43] border-2 border-[#0B1F44] shadow-brutal-sm flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-[#0B1F44]" />
              </div>
              <h3 className="text-lg font-black uppercase text-[#0B1F44] mb-2">Venue Location</h3>
              <p className="text-base font-bold text-[#0B1F44]">
                Venue details will be announced soon.
              </p>
              <p className="text-xs text-[#0B1F44]/70 mt-2 font-medium">
                The exact hall and address in Cairo are being prepared. Registered attendees will receive directions and transit instructions via email.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
