'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AdminRole } from '@/types';
import { 
  LayoutDashboard, 
  Users, 
  Ticket, 
  QrCode, 
  Mic2, 
  Handshake, 
  Calendar, 
  HeartHandshake, 
  CheckSquare, 
  ShieldCheck, 
  FileText, 
  Settings,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  role?: AdminRole;
}

export function AdminSidebar({ role = 'super_admin' }: SidebarProps) {
  const pathname = usePathname();

  const allModules = [
    { label: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard, roles: ['super_admin', 'admin', 'hr', 'br', 'organizing', 'media'] },
    { label: 'Registrations', href: '/admin/registrations', icon: Users, roles: ['super_admin', 'admin', 'hr', 'organizing'] },
    { label: 'Tickets', href: '/admin/tickets', icon: Ticket, roles: ['super_admin', 'admin'] },
    { label: 'QR Check-In', href: '/admin/check-in', icon: QrCode, roles: ['super_admin', 'admin', 'organizing'] },
    { label: 'Speakers', href: '/admin/speakers', icon: Mic2, roles: ['super_admin', 'admin', 'br'] },
    { label: 'Sponsors', href: '/admin/sponsors', icon: Handshake, roles: ['super_admin', 'admin', 'br'] },
    { label: 'Agenda', href: '/admin/agenda', icon: Calendar, roles: ['super_admin', 'admin', 'organizing'] },
    { label: 'Volunteers', href: '/admin/volunteers', icon: HeartHandshake, roles: ['super_admin', 'admin', 'hr'] },
    { label: 'Approvals', href: '/admin/approvals', icon: CheckSquare, roles: ['super_admin', 'media'] },
    { label: 'Users & Roles', href: '/admin/users', icon: ShieldCheck, roles: ['super_admin'] },
    { label: 'Audit Logs', href: '/admin/logs', icon: FileText, roles: ['super_admin'] },
    { label: 'Settings', href: '/admin/settings', icon: Settings, roles: ['super_admin'] },
  ];

  const visibleModules = allModules.filter((m) => m.roles.includes(role));

  return (
    <aside className="w-64 bg-[#FFFFFF] border-r-3 border-[#0B1F44] min-h-screen flex flex-col justify-between shrink-0">
      <div>
        {/* Sidebar Header */}
        <div className="p-5 border-b-2 border-[#0B1F44] bg-[#0B1F44] text-white">
          <div className="text-xl font-black tracking-wider font-display">RESTART</div>
          <div className="text-[10px] text-[#7CCBFF] font-bold uppercase tracking-widest flex items-center justify-between mt-0.5">
            <span>Management Hub</span>
            <span className="bg-[#FF9F43] text-[#0B1F44] px-1.5 py-0.2 rounded-none font-mono">
              {role}
            </span>
          </div>
        </div>

        {/* Navigation Modules */}
        <nav className="p-3 flex flex-col gap-1">
          {visibleModules.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 text-xs font-black uppercase tracking-wider transition-all border-2 ${
                  isActive
                    ? 'bg-[#7CCBFF] text-[#0B1F44] border-[#0B1F44] shadow-brutal-sm'
                    : 'bg-transparent text-[#0B1F44] border-transparent hover:border-[#0B1F44] hover:bg-[#E2F0FF]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0 stroke-[2.5]" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className="p-4 border-t-2 border-[#0B1F44] bg-[#E2F0FF]">
        <Link
          href="/"
          className="flex items-center justify-between text-xs font-black uppercase text-[#0B1F44] hover:text-[#FF5F56] transition-colors"
        >
          <span>Exit to Website</span>
          <LogOut className="w-4 h-4" />
        </Link>
      </div>
    </aside>
  );
}
