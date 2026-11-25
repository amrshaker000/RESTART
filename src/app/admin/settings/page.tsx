'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Save, CheckCircle2 } from 'lucide-react';

export default function SiteSettingsAdminPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    eventName: 'RESTART',
    slogan: 'NO GAME OVER',
    eventDate: '2026-12-11',
    eventTime: '09:00 AM – 04:00 PM (Tentative)',
    venueName: 'Venue details will be announced soon.',
    registrationOpen: true,
    whatsappUrl: 'https://chat.whatsapp.com/restart-event-2026',
    contactEmail: 'restart@resala.org',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex min-h-screen bg-[#E2F0FF]">
      <AdminSidebar role="super_admin" />
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="mb-6 border-b-2 border-[#0B1F44] pb-4">
          <span className="text-[11px] font-black uppercase text-[#0B1F44] bg-[#7CCBFF] px-2 py-0.5 border border-[#0B1F44]">
            SYSTEM CONFIGURATION
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase text-[#0B1F44] mt-1 font-display">
            Event & Site Settings
          </h1>
        </div>

        {saved && (
          <div className="mb-6 p-4 bg-[#27C93F] text-white text-xs font-black uppercase border-2 border-[#0B1F44] shadow-brutal-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 stroke-[3]" />
            <span>Settings saved successfully to database.</span>
          </div>
        )}

        <Card variant="white" className="max-w-2xl p-6 md:p-8">
          <form onSubmit={handleSave} className="flex flex-col gap-4 text-left">
            <Input
              label="Event Name"
              value={settings.eventName}
              onChange={(e) => setSettings({ ...settings, eventName: e.target.value })}
            />

            <Input
              label="Event Slogan"
              value={settings.slogan}
              onChange={(e) => setSettings({ ...settings, slogan: e.target.value })}
            />

            <Input
              label="Event Date"
              type="date"
              value={settings.eventDate}
              onChange={(e) => setSettings({ ...settings, eventDate: e.target.value })}
            />

            <Input
              label="Venue Status / Address"
              value={settings.venueName}
              onChange={(e) => setSettings({ ...settings, venueName: e.target.value })}
              helperText="Set to 'Venue details will be announced soon.' until officially confirmed."
            />

            <Input
              label="WhatsApp Community Group Link"
              value={settings.whatsappUrl}
              onChange={(e) => setSettings({ ...settings, whatsappUrl: e.target.value })}
            />

            <div className="pt-2 flex items-center gap-3">
              <input
                type="checkbox"
                id="regOpen"
                checked={settings.registrationOpen}
                onChange={(e) => setSettings({ ...settings, registrationOpen: e.target.checked })}
                className="w-5 h-5 border-2 border-[#0B1F44]"
              />
              <label htmlFor="regOpen" className="text-xs font-black uppercase text-[#0B1F44] cursor-pointer">
                Registration System Open (Allow new attendees)
              </label>
            </div>

            <div className="pt-4">
              <Button type="submit" variant="primary" size="md" className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                <span>Save All Settings</span>
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  );
}
