'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Search, Download, Mail, RefreshCw, CheckCircle2, Ticket } from 'lucide-react';

export default function RegistrationsManagementPage() {
  const [search, setSearch] = useState('');

  // Sample registrations representing data fetched from Supabase
  const [registrations, setRegistrations] = useState([
    { id: '1', full_name: 'Ahmed Mohamed Ali', email: 'ahmed.ali@example.com', phone: '01012345678', field: 'Programming & Software', status: 'confirmed', ticketCode: 'RESTART-2026-F9A2B1', ticketStatus: 'issued', emailStatus: 'sent', date: '2026-11-20' },
    { id: '2', full_name: 'Sara Tarek Hassan', email: 'sara.tarek@example.com', phone: '01123456789', field: 'Data Analysis', status: 'confirmed', ticketCode: 'RESTART-2026-C4E8D7', ticketStatus: 'used', emailStatus: 'delivered', date: '2026-11-21' },
    { id: '3', full_name: 'Mahmoud Omar Khaled', email: 'mahmoud.omar@example.com', phone: '01234567890', field: 'Artificial Intelligence', status: 'confirmed', ticketCode: 'RESTART-2026-89AF12', ticketStatus: 'issued', emailStatus: 'failed', date: '2026-11-22' },
    { id: '4', full_name: 'Nour El-Din Mostafa', email: 'nour.mostafa@example.com', phone: '01543216789', field: 'Cybersecurity', status: 'confirmed', ticketCode: 'RESTART-2026-3B7D9E', ticketStatus: 'issued', emailStatus: 'sent', date: '2026-11-23' },
  ]);

  const filtered = registrations.filter(
    (r) =>
      r.full_name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      r.ticketCode.toLowerCase().includes(search.toLowerCase())
  );

  const exportCSV = () => {
    const headers = ['Full Name,Email,Phone,Field,Ticket Code,Ticket Status,Email Status,Date\n'];
    const rows = filtered.map(
      (r) => `"${r.full_name}","${r.email}","${r.phone}","${r.field}","${r.ticketCode}","${r.ticketStatus}","${r.emailStatus}","${r.date}"\n`
    );
    const blob = new Blob([...headers, ...rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RESTART_Registrations_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="flex min-h-screen bg-[#E2F0FF]">
      <AdminSidebar role="super_admin" />

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#0B1F44] pb-4">
          <div>
            <span className="text-[11px] font-black uppercase text-[#0B1F44] bg-[#7CCBFF] px-2 py-0.5 border border-[#0B1F44]">
              HR & OPERATIONS
            </span>
            <h1 className="text-2xl sm:text-3xl font-black uppercase text-[#0B1F44] mt-1 font-display">
              Attendee Registrations
            </h1>
          </div>

          <Button variant="orange" size="md" onClick={exportCSV} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </Button>
        </div>

        {/* Search Bar */}
        <Card variant="white" className="p-4 mb-6">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-3.5 text-[#0B1F44]/50" />
            <input
              placeholder="Search by attendee name, email, or ticket ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#E2F0FF] text-[#0B1F44] pl-9 pr-4 py-2 border-2 border-[#0B1F44] text-xs font-bold outline-none"
            />
          </div>
        </Card>

        {/* Table */}
        <Card variant="white" className="p-0 overflow-hidden shadow-brutal">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0B1F44] text-white uppercase tracking-wider font-mono">
                <tr>
                  <th className="p-3.5">Attendee</th>
                  <th className="p-3.5">Contact</th>
                  <th className="p-3.5">Field</th>
                  <th className="p-3.5">Ticket ID</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Email</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0B1F44]/20 font-medium text-[#0B1F44]">
                {filtered.map((reg) => (
                  <tr key={reg.id} className="hover:bg-[#E2F0FF]/50 transition-colors">
                    <td className="p-3.5 font-bold">{reg.full_name}</td>
                    <td className="p-3.5">
                      <div>{reg.email}</div>
                      <div className="text-[11px] text-[#0B1F44]/60 font-mono">{reg.phone}</div>
                    </td>
                    <td className="p-3.5">{reg.field}</td>
                    <td className="p-3.5 font-mono font-bold">{reg.ticketCode}</td>
                    <td className="p-3.5">
                      <span
                        className={`px-2 py-0.5 border text-[10px] font-black uppercase ${
                          reg.ticketStatus === 'used'
                            ? 'bg-[#FF9F43] text-[#0B1F44] border-[#0B1F44]'
                            : 'bg-[#27C93F] text-white border-[#0B1F44]'
                        }`}
                      >
                        {reg.ticketStatus}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`px-2 py-0.5 border text-[10px] font-black uppercase ${
                          reg.emailStatus === 'failed'
                            ? 'bg-[#FF5F56] text-white border-[#0B1F44]'
                            : 'bg-[#7CCBFF] text-[#0B1F44] border-[#0B1F44]'
                        }`}
                      >
                        {reg.emailStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
}
