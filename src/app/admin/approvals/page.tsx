'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Check, X, Clock, FileCheck } from 'lucide-react';

export default function ApprovalsManagementPage() {
  const [submissions, setSubmissions] = useState([
    {
      id: 'sub-1',
      type: 'speaker',
      title: 'Dr. Mohamed Helmy (Keynote: AI in Career Growth)',
      submittedBy: 'BR Lead',
      date: '2026-11-24',
      status: 'pending_approval',
      description: 'Profile photo, biography, and session abstract prepared for public listing.',
    },
    {
      id: 'sub-2',
      type: 'agenda_item',
      title: 'Workshop: Resume Optimization & ATS Screening',
      submittedBy: 'Organizing Team',
      date: '2026-11-23',
      status: 'pending_approval',
      description: 'Room 2, 11:30 AM – 01:00 PM slot assignment.',
    },
  ]);

  const handleAction = (id: string, action: 'approve' | 'reject') => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: action === 'approve' ? 'published' : 'rejected' } : s))
    );
  };

  return (
    <div className="flex min-h-screen bg-[#E2F0FF]">
      <AdminSidebar role="super_admin" />

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="mb-6 border-b-2 border-[#0B1F44] pb-4">
          <span className="text-[11px] font-black uppercase text-[#0B1F44] bg-[#FF9F43] px-2 py-0.5 border border-[#0B1F44]">
            GOVERNANCE & AUDIT
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase text-[#0B1F44] mt-1 font-display">
            Content Approval Center
          </h1>
          <p className="text-xs text-[#0B1F44]/75 mt-1 font-medium">
            Draft → Pending Approval → Published. Only approved submissions appear on the public website.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {submissions.map((sub) => (
            <Card key={sub.id} variant="white" className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <Badge variant="orange">{sub.type}</Badge>
                  <span className="text-xs font-mono text-[#0B1F44]/60">Submitted by {sub.submittedBy}</span>
                </div>
                <Badge variant={sub.status === 'published' ? 'sky' : 'lavender'}>{sub.status}</Badge>
              </div>

              <h3 className="text-lg font-black uppercase text-[#0B1F44] mb-2">{sub.title}</h3>
              <p className="text-xs text-[#0B1F44]/80 leading-relaxed mb-5 font-medium">{sub.description}</p>

              {sub.status === 'pending_approval' && (
                <div className="flex items-center gap-3 pt-3 border-t border-[#0B1F44]/15">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleAction(sub.id, 'approve')}
                    className="flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Approve & Publish to Site</span>
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleAction(sub.id, 'reject')}
                    className="flex items-center gap-1.5"
                  >
                    <X className="w-4 h-4" />
                    <span>Request Changes / Reject</span>
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
