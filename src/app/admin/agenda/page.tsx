'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Plus, Calendar, Clock, MapPin } from 'lucide-react';

export default function AgendaAdminPage() {
  const [sessions] = useState([
    { id: '1', title: 'Opening Keynote: Restart Your Professional Trajectory', time: '09:00 AM – 10:00 AM', room: 'Main Auditorium', type: 'session', published: true },
    { id: '2', title: 'Workshop: Full-Stack Roadmap in 2027', time: '10:30 AM – 12:00 PM', room: 'Lab A', type: 'workshop', published: true },
    { id: '3', title: '1-on-1 Mentorship & CV Clinic', time: '01:00 PM – 03:00 PM', room: 'Coaching Hall', type: 'coaching', published: true },
  ]);

  return (
    <div className="flex min-h-screen bg-[#E2F0FF]">
      <AdminSidebar role="super_admin" />
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="mb-6 flex items-center justify-between border-b-2 border-[#0B1F44] pb-4">
          <div>
            <span className="text-[11px] font-black uppercase text-[#0B1F44] bg-[#7CCBFF] px-2 py-0.5 border border-[#0B1F44]">
              ORGANIZING OPERATIONS
            </span>
            <h1 className="text-2xl sm:text-3xl font-black uppercase text-[#0B1F44] mt-1 font-display">
              Agenda & Sessions Schedule
            </h1>
          </div>
          <Button variant="orange" size="md" className="flex items-center gap-1.5">
            <Plus className="w-4 h-4" />
            <span>Schedule Session</span>
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          {sessions.map((s) => (
            <Card key={s.id} variant="white" className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="lavender">{s.type}</Badge>
                  <span className="text-xs font-mono font-bold text-[#FF9F43]">{s.time}</span>
                </div>
                <h3 className="text-base font-black uppercase text-[#0B1F44]">{s.title}</h3>
                <div className="text-xs font-bold text-[#0B1F44]/60 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{s.room}</span>
                </div>
              </div>
              <Badge variant="sky">Published</Badge>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
