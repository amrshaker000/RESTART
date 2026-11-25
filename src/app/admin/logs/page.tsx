'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Card } from '@/components/ui/Card';
import { FileText, Shield } from 'lucide-react';

export default function AuditLogsPage() {
  const [logs] = useState([
    { id: '1', action: 'CHECKIN_VALID', user: 'organizer_gate_1', entity: 'TICKET-RESTART-2026-F9A2B1', time: '10:14:22 AM' },
    { id: '2', action: 'TICKET_REISSUED', user: 'super_admin', entity: 'TICKET-RESTART-2026-89AF12', time: '09:45:11 AM' },
    { id: '3', action: 'CONTENT_APPROVED', user: 'super_admin', entity: 'SPEAKER-DR-HELMY', time: 'Yesterday' },
    { id: '4', action: 'REGISTRATION_CREATED', user: 'system_api', entity: 'REG-Ahmed-Ali', time: 'Yesterday' },
  ]);

  return (
    <div className="flex min-h-screen bg-[#E2F0FF]">
      <AdminSidebar role="super_admin" />
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="mb-6 border-b-2 border-[#0B1F44] pb-4">
          <span className="text-[11px] font-black uppercase text-[#0B1F44] bg-[#7CCBFF] px-2 py-0.5 border border-[#0B1F44]">
            SYSTEM SECURITY & ACCOUNTABILITY
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase text-[#0B1F44] mt-1 font-display">
            Immutable Audit Trail
          </h1>
        </div>

        <Card variant="white" className="p-0 overflow-hidden shadow-brutal">
          <table className="w-full text-left text-xs font-medium">
            <thead className="bg-[#0B1F44] text-white uppercase font-mono tracking-wider">
              <tr>
                <th className="p-3.5">Action</th>
                <th className="p-3.5">Operator</th>
                <th className="p-3.5">Target Entity</th>
                <th className="p-3.5">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0B1F44]/20 text-[#0B1F44]">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-[#E2F0FF]/40 font-mono">
                  <td className="p-3.5 font-bold text-[#0B1F44]">{log.action}</td>
                  <td className="p-3.5">{log.user}</td>
                  <td className="p-3.5 text-[#FF9F43]">{log.entity}</td>
                  <td className="p-3.5 text-[#0B1F44]/70">{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </main>
    </div>
  );
}
