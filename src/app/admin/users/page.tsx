'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { ShieldCheck, UserPlus, Trash2 } from 'lucide-react';
import { AdminRole } from '@/types';

export default function UsersManagementPage() {
  const [users, setUsers] = useState([
    { id: 'u-1', name: 'Super Admin Lead', email: 'admin@restart.resala.org', role: 'super_admin' as AdminRole, active: true },
    { id: 'u-2', name: 'HR Lead Organizer', email: 'hr@restart.resala.org', role: 'hr' as AdminRole, active: true },
    { id: 'u-3', name: 'BR Coordinator', email: 'br@restart.resala.org', role: 'br' as AdminRole, active: true },
    { id: 'u-4', name: 'Gate Staff 01', email: 'organizing1@restart.resala.org', role: 'organizing' as AdminRole, active: true },
    { id: 'u-5', name: 'Media Officer', email: 'media@restart.resala.org', role: 'media' as AdminRole, active: true },
  ]);

  return (
    <div className="flex min-h-screen bg-[#E2F0FF]">
      <AdminSidebar role="super_admin" />

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="mb-6 border-b-2 border-[#0B1F44] pb-4">
          <span className="text-[11px] font-black uppercase text-[#0B1F44] bg-[#7CCBFF] px-2 py-0.5 border border-[#0B1F44]">
            ROLE-BASED ACCESS CONTROL (RBAC)
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase text-[#0B1F44] mt-1 font-display">
            Staff & Role Management
          </h1>
          <p className="text-xs text-[#0B1F44]/75 mt-1 font-medium">
            Manage administrative user permissions across Super Admin, Admin, HR, BR, Organizing, and Media teams.
          </p>
        </div>

        <Card variant="white" className="p-0 overflow-hidden shadow-brutal">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B1F44] text-white uppercase tracking-wider font-mono">
              <tr>
                <th className="p-3.5">Staff Name</th>
                <th className="p-3.5">Email</th>
                <th className="p-3.5">Role</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0B1F44]/20 font-medium text-[#0B1F44]">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-[#E2F0FF]/50">
                  <td className="p-3.5 font-bold">{u.name}</td>
                  <td className="p-3.5 font-mono">{u.email}</td>
                  <td className="p-3.5">
                    <Badge variant={u.role === 'super_admin' ? 'orange' : 'sky'}>
                      {u.role}
                    </Badge>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 bg-[#27C93F] text-white text-[10px] font-black uppercase">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </main>
    </div>
  );
}
