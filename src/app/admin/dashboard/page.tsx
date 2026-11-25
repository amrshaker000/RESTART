'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Users, 
  Ticket, 
  QrCode, 
  CheckCircle2, 
  Mail, 
  HeartHandshake, 
  ArrowUpRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [role, setRole] = useState<'super_admin' | 'admin' | 'hr' | 'br' | 'organizing' | 'media'>('super_admin');
  const [stats, setStats] = useState({
    totalRegistrations: 142,
    ticketsIssued: 142,
    checkedInCount: 48,
    volunteersCount: 29,
    emailSent: 138,
    emailFailed: 4,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRole = localStorage.getItem('restart_admin_mock_role') as any;
      if (storedRole) setRole(storedRole);
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-[#E2F0FF]">
      <AdminSidebar role={role} />

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Top Bar */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#0B1F44] pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase bg-[#7CCBFF] px-2 py-0.5 border border-[#0B1F44]">
                EVENT MANAGEMENT SYSTEM
              </span>
              <Badge variant="orange">DEC 11, 2026</Badge>
            </div>
            <h1 className="text-3xl font-black uppercase text-[#0B1F44] mt-1 font-display">
              Operations Overview
            </h1>
          </div>

          {/* Role switcher for evaluation testing */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#0B1F44]/60">Preview Role:</span>
            <select
              value={role}
              onChange={(e) => {
                const r = e.target.value as any;
                setRole(r);
                localStorage.setItem('restart_admin_mock_role', r);
              }}
              className="text-xs font-bold bg-white border-2 border-[#0B1F44] p-1.5 shadow-brutal-sm outline-none"
            >
              <option value="super_admin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="hr">HR Team</option>
              <option value="br">BR Team</option>
              <option value="organizing">Organizing Team</option>
              <option value="media">Media Team</option>
            </select>
          </div>
        </div>

        {/* KPI CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <Card variant="white" className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase text-[#0B1F44]/60">Total Registrations</div>
              <div className="text-3xl font-black text-[#0B1F44] mt-1">{stats.totalRegistrations}</div>
              <div className="text-[11px] text-[#27C93F] font-bold mt-1">Confirmed Attendees</div>
            </div>
            <div className="p-3 bg-[#7CCBFF] border-2 border-[#0B1F44] shadow-brutal-sm">
              <Users className="w-6 h-6 text-[#0B1F44]" />
            </div>
          </Card>

          <Card variant="white" className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase text-[#0B1F44]/60">Checked-in Guests</div>
              <div className="text-3xl font-black text-[#0B1F44] mt-1">{stats.checkedInCount}</div>
              <div className="text-[11px] text-[#0B1F44]/70 font-bold mt-1">
                {Math.round((stats.checkedInCount / stats.totalRegistrations) * 100)}% Arrival Rate
              </div>
            </div>
            <div className="p-3 bg-[#27C93F] text-white border-2 border-[#0B1F44] shadow-brutal-sm">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </Card>

          <Card variant="white" className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase text-[#0B1F44]/60">Volunteer Applicants</div>
              <div className="text-3xl font-black text-[#0B1F44] mt-1">{stats.volunteersCount}</div>
              <div className="text-[11px] text-[#FF9F43] font-bold mt-1">HR Review Queue</div>
            </div>
            <div className="p-3 bg-[#B794F4] border-2 border-[#0B1F44] shadow-brutal-sm">
              <HeartHandshake className="w-6 h-6 text-[#0B1F44]" />
            </div>
          </Card>

          <Card variant="white" className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase text-[#0B1F44]/60">Email Delivery Rate</div>
              <div className="text-3xl font-black text-[#0B1F44] mt-1">{stats.emailSent}</div>
              <div className="text-[11px] text-[#0B1F44]/70 font-bold mt-1">
                {stats.emailFailed} pending/retry in outbox
              </div>
            </div>
            <div className="p-3 bg-[#FF9F43] border-2 border-[#0B1F44] shadow-brutal-sm">
              <Mail className="w-6 h-6 text-[#0B1F44]" />
            </div>
          </Card>
        </div>

        {/* QUICK SHORTCUTS & ACTION BARS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card variant="light-blue" className="lg:col-span-2 p-6">
            <h3 className="text-lg font-black uppercase text-[#0B1F44] mb-2 flex items-center gap-2">
              <QrCode className="w-5 h-5 text-[#FF9F43]" />
              <span>Event Day Live Admission Gate</span>
            </h3>
            <p className="text-xs text-[#0B1F44]/80 mb-5 leading-relaxed font-medium">
              Launch the single-use mobile camera QR validator. Verified with database-level atomic locking to prevent duplicate admission scans.
            </p>
            <Link href="/admin/check-in">
              <Button variant="primary" size="md" className="flex items-center gap-2">
                <span>Launch QR Check-In Scanner</span>
                <ArrowUpRight className="w-4 h-4 stroke-[3]" />
              </Button>
            </Link>
          </Card>

          <Card variant="white" className="p-6">
            <h3 className="text-lg font-black uppercase text-[#0B1F44] mb-2">
              Registration Cap
            </h3>
            <div className="space-y-2 mt-4">
              <div className="flex justify-between text-xs font-bold text-[#0B1F44]">
                <span>Confirmed ({stats.totalRegistrations})</span>
                <span>Max Target (300)</span>
              </div>
              <div className="w-full bg-[#E2F0FF] border-2 border-[#0B1F44] h-4 p-0.5">
                <div
                  className="bg-[#7CCBFF] h-full border-r border-[#0B1F44]"
                  style={{ width: `${(stats.totalRegistrations / 300) * 100}%` }}
                />
              </div>
              <div className="text-[11px] text-[#0B1F44]/70 font-medium pt-1">
                Capacity is running smoothly. {300 - stats.totalRegistrations} passes remaining.
              </div>
            </div>
          </Card>
        </div>

      </main>
    </div>
  );
}
