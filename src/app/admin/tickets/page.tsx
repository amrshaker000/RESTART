'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { RefreshCw, Send, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function TicketsManagementPage() {
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const [tickets, setTickets] = useState([
    { id: 't-1', code: 'RESTART-2026-F9A2B1', name: 'Ahmed Mohamed Ali', email: 'ahmed.ali@example.com', status: 'issued', emailStatus: 'sent', scans: 0 },
    { id: 't-2', code: 'RESTART-2026-C4E8D7', name: 'Sara Tarek Hassan', email: 'sara.tarek@example.com', status: 'used', emailStatus: 'delivered', scans: 1 },
    { id: 't-3', code: 'RESTART-2026-89AF12', name: 'Mahmoud Omar Khaled', email: 'mahmoud.omar@example.com', status: 'issued', emailStatus: 'failed', scans: 0 },
  ]);

  const handleResend = (id: string, name: string) => {
    setActionMessage(`Resend email triggered for ${name}. Outbox delivery queued.`);
    setTimeout(() => setActionMessage(null), 4000);
  };

  const handleReissue = (id: string, name: string) => {
    setActionMessage(`Ticket reissued for ${name}. Old QR token revoked, new ticket code and QR generated.`);
    setTimeout(() => setActionMessage(null), 4000);
  };

  return (
    <div className="flex min-h-screen bg-[#E2F0FF]">
      <AdminSidebar role="super_admin" />

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="mb-6 border-b-2 border-[#0B1F44] pb-4">
          <span className="text-[11px] font-black uppercase text-[#0B1F44] bg-[#7CCBFF] px-2 py-0.5 border border-[#0B1F44]">
            TICKETING ARCHITECTURE
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase text-[#0B1F44] mt-1 font-display">
            Ticket Management & Reissue
          </h1>
        </div>

        {actionMessage && (
          <div className="mb-6 p-4 bg-[#E2F0FF] border-2 border-[#0B1F44] text-xs font-bold text-[#0B1F44] flex items-center gap-2 shadow-brutal-sm">
            <CheckCircle2 className="w-4 h-4 text-[#27C93F]" />
            <span>{actionMessage}</span>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {tickets.map((t) => (
            <Card key={t.id} variant="white" className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-base font-black text-[#0B1F44]">{t.code}</span>
                  <Badge variant={t.status === 'used' ? 'orange' : 'sky'}>{t.status}</Badge>
                </div>
                <div className="text-sm font-bold text-[#0B1F44]">{t.name}</div>
                <div className="text-xs text-[#0B1F44]/60 font-mono">{t.email}</div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleResend(t.id, t.name)}
                  className="flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Resend Email</span>
                </Button>

                <Button
                  variant="orange"
                  size="sm"
                  onClick={() => handleReissue(t.id, t.name)}
                  className="flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reissue (Revoke Old QR)</span>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
