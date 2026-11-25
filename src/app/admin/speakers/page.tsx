'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Plus, Mic2, Edit, Trash2 } from 'lucide-react';

export default function SpeakersManagementPage() {
  const [speakers] = useState([
    { id: '1', name: 'Dr. Mohamed Helmy', title: 'Principal AI Architect', specialization: 'Artificial Intelligence', published: true },
    { id: '2', name: 'Eng. Yasmine Refaat', title: 'Senior Engineering Manager', specialization: 'Software Engineering', published: true },
    { id: '3', name: 'Tarek Ezzat', title: 'VP of Growth & Strategy', specialization: 'Business & Startups', published: false },
  ]);

  return (
    <div className="flex min-h-screen bg-[#E2F0FF]">
      <AdminSidebar role="super_admin" />
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="mb-6 flex items-center justify-between border-b-2 border-[#0B1F44] pb-4">
          <div>
            <span className="text-[11px] font-black uppercase text-[#0B1F44] bg-[#7CCBFF] px-2 py-0.5 border border-[#0B1F44]">
              BR & CONTENT
            </span>
            <h1 className="text-2xl sm:text-3xl font-black uppercase text-[#0B1F44] mt-1 font-display">
              Speakers Management
            </h1>
          </div>
          <Button variant="orange" size="md" className="flex items-center gap-1.5">
            <Plus className="w-4 h-4" />
            <span>Add New Speaker</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {speakers.map((spk) => (
            <Card key={spk.id} variant="white">
              <div className="flex justify-between items-start mb-3">
                <Badge variant={spk.published ? 'sky' : 'orange'}>
                  {spk.published ? 'Published' : 'Draft / Pending'}
                </Badge>
              </div>
              <h3 className="text-lg font-black uppercase text-[#0B1F44]">{spk.name}</h3>
              <div className="text-xs font-bold text-[#FF9F43] mt-1">{spk.title}</div>
              <div className="text-xs text-[#0B1F44]/60 font-mono mt-0.5">{spk.specialization}</div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
