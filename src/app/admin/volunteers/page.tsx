'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { HeartHandshake, CheckCircle, XCircle } from 'lucide-react';

export default function VolunteersAdminPage() {
  const [volunteers, setVolunteers] = useState([
    { id: '1', name: 'Omar Youssef', email: 'omar.y@example.com', dept: 'Organizing & Logistics', status: 'new', date: '2026-11-23' },
    { id: '2', name: 'Mariam Adel', email: 'mariam.adel@example.com', dept: 'Media & Photography', status: 'under_review', date: '2026-11-22' },
    { id: '3', name: 'Karim Nabil', email: 'karim.nabil@example.com', dept: 'Technical & IT Support', status: 'accepted', date: '2026-11-21' },
  ]);

  const updateStatus = (id: string, status: string) => {
    setVolunteers((prev) => prev.map((v) => (v.id === id ? { ...v, status } : v)));
  };

  return (
    <div className="flex min-h-screen bg-[#E2F0FF]">
      <AdminSidebar role="super_admin" />
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="mb-6 border-b-2 border-[#0B1F44] pb-4">
          <span className="text-[11px] font-black uppercase text-[#0B1F44] bg-[#7CCBFF] px-2 py-0.5 border border-[#0B1F44]">
            HR RECRUITMENT
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase text-[#0B1F44] mt-1 font-display">
            Volunteer Applications
          </h1>
        </div>

        <div className="flex flex-col gap-4">
          {volunteers.map((vol) => (
            <Card key={vol.id} variant="white" className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-black text-[#0B1F44]">{vol.name}</h3>
                  <Badge variant="orange">{vol.dept}</Badge>
                </div>
                <div className="text-xs font-mono text-[#0B1F44]/70">{vol.email}</div>
                <div className="text-[11px] font-bold text-[#0B1F44]/50 mt-1">Applied: {vol.date}</div>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant={vol.status === 'accepted' ? 'sky' : 'lavender'}>{vol.status}</Badge>
                {vol.status !== 'accepted' && (
                  <Button variant="primary" size="sm" onClick={() => updateStatus(vol.id, 'accepted')}>
                    Accept
                  </Button>
                )}
                {vol.status !== 'rejected' && (
                  <Button variant="danger" size="sm" onClick={() => updateStatus(vol.id, 'rejected')}>
                    Reject
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
