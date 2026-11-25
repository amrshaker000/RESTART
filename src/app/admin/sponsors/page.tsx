'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Plus, Handshake } from 'lucide-react';

export default function SponsorsManagementPage() {
  const [sponsors] = useState([
    { id: '1', name: 'Tech Ecosystem Partner', category: 'gold', published: true },
    { id: '2', name: 'Career Academy Hub', category: 'silver', published: true },
  ]);

  return (
    <div className="flex min-h-screen bg-[#E2F0FF]">
      <AdminSidebar role="super_admin" />
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="mb-6 flex items-center justify-between border-b-2 border-[#0B1F44] pb-4">
          <div>
            <span className="text-[11px] font-black uppercase text-[#0B1F44] bg-[#7CCBFF] px-2 py-0.5 border border-[#0B1F44]">
              BR & PARTNERSHIPS
            </span>
            <h1 className="text-2xl sm:text-3xl font-black uppercase text-[#0B1F44] mt-1 font-display">
              Sponsors Management
            </h1>
          </div>
          <Button variant="orange" size="md" className="flex items-center gap-1.5">
            <Plus className="w-4 h-4" />
            <span>Add Partner / Sponsor</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {sponsors.map((sp) => (
            <Card key={sp.id} variant="white">
              <div className="flex justify-between items-start mb-3">
                <Badge variant="sky">{sp.category} sponsor</Badge>
                <Badge variant="orange">{sp.published ? 'Live' : 'Draft'}</Badge>
              </div>
              <h3 className="text-lg font-black uppercase text-[#0B1F44]">{sp.name}</h3>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
