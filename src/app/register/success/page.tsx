'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { generateQRCodeDataUrl } from '@/lib/ticket-generator';
import { CheckCircle2, MessageSquare, Download, Calendar, MapPin, Ticket as TicketIcon } from 'lucide-react';

export default function RegistrationSuccessPage() {
  const [ticketData, setTicketData] = useState<any>(null);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('restart_ticket_data');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setTicketData(parsed);

          if (parsed.qrToken) {
            generateQRCodeDataUrl(parsed.qrToken).then(setQrCodeDataUrl);
          }
        } catch (e) {
          console.error('Error parsing ticket data:', e);
        }
      }
    }
  }, []);

  const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_GROUP_URL || 'https://chat.whatsapp.com/restart-event-2026';

  return (
    <div className="py-12 md:py-20 bg-grid-pattern min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Success Header Banner */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#27C93F] text-white font-black uppercase text-xs border-2 border-[#0B1F44] shadow-brutal-sm mb-6">
          <CheckCircle2 className="w-4 h-4" />
          <span>OFFICIALLY REGISTERED</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#0B1F44] mb-3 font-display">
          Registration Successful!
        </h1>

        <p className="text-lg sm:text-xl text-[#0B1F44]/80 max-w-xl mx-auto font-medium">
          Welcome aboard, <strong>{ticketData?.attendeeName || 'Attendee'}</strong>! You are officially confirmed for RESTART.
        </p>

        {/* TWO PRIMARY ACTIONS CONTAINER */}
        <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
          {/* Action 1: Check Email */}
          <Card variant="white" className="flex flex-col justify-between">
            <div>
              <Badge variant="sky" className="mb-3">STEP 01</Badge>
              <h3 className="text-lg font-black uppercase text-[#0B1F44] mb-2">Check Your Email</h3>
              <p className="text-xs text-[#0B1F44]/80 leading-relaxed font-medium">
                We have sent your official admission ticket to:
                <br />
                <strong className="text-[#0B1F44] font-mono break-all text-sm">
                  {ticketData?.email || 'your email'}
                </strong>
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#0B1F44]/20 text-xs font-bold text-[#FF9F43]">
              Bring this QR code on event day for admission.
            </div>
          </Card>

          {/* Action 2: WhatsApp Community */}
          <Card variant="lavender" className="flex flex-col justify-between">
            <div>
              <Badge variant="orange" className="mb-3">STEP 02 // ESSENTIAL</Badge>
              <h3 className="text-lg font-black uppercase text-[#0B1F44] mb-2">Join RTC Community</h3>
              <p className="text-xs text-[#0B1F44]/80 leading-relaxed font-medium">
                Connect with speakers, receive transport instructions, and meet fellow attendees on the official WhatsApp group.
              </p>
            </div>
            <div className="mt-4">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="orange" size="md" fullWidth className="flex items-center justify-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Join WhatsApp Community</span>
                </Button>
              </a>
            </div>
          </Card>
        </div>

        {/* OFFICIAL PERSONALIZED TICKET CARD PREVIEW */}
        <div className="max-w-xl mx-auto my-12 text-left">
          <div className="text-xs font-black uppercase tracking-wider text-[#0B1F44] mb-3 flex items-center justify-between">
            <span>OFFICIAL ADMISSION TICKET</span>
            <span className="font-mono text-[#0B1F44]/70">SINGLE-USE PASS</span>
          </div>

          <div className="border-3 border-[#0B1F44] bg-[#FFFFFF] shadow-brutal-lg overflow-hidden">
            {/* Ticket Header */}
            <div className="bg-[#0B1F44] text-white px-6 py-4 flex items-center justify-between">
              <div>
                <div className="text-2xl font-black tracking-wider font-display">RESTART</div>
                <div className="text-[10px] text-[#7CCBFF] font-bold tracking-widest uppercase">
                  NO GAME OVER • RTC CAREER DAY
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono font-bold text-[#FF9F43]">TICKET ID</div>
                <div className="text-sm font-mono font-black tracking-wider">
                  {ticketData?.ticketCode || 'RESTART-2026-TICKET'}
                </div>
              </div>
            </div>

            {/* Ticket Body with QR */}
            <div className="p-6 bg-grid-pattern flex flex-col sm:flex-row items-center gap-6">
              {/* QR Code Container */}
              <div className="bg-white p-3 border-2 border-[#0B1F44] shadow-brutal-sm shrink-0">
                {qrCodeDataUrl ? (
                  <img
                    src={qrCodeDataUrl}
                    alt="Admission QR Code"
                    className="w-36 h-36 object-contain"
                  />
                ) : (
                  <div className="w-36 h-36 bg-[#E2F0FF] flex items-center justify-center text-xs font-bold text-[#0B1F44]/40">
                    Generating QR...
                  </div>
                )}
                <div className="text-[9px] font-mono text-center font-bold text-[#0B1F44] mt-1">
                  OFFICIAL ADMISSION QR
                </div>
              </div>

              {/* Attendee Details */}
              <div className="flex-1 text-left flex flex-col gap-2.5">
                <div>
                  <div className="text-[11px] font-bold uppercase text-[#0B1F44]/60">Attendee Name</div>
                  <div className="text-xl font-black text-[#0B1F44]">
                    {ticketData?.attendeeName || 'Registered Attendee'}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-medium text-[#0B1F44]">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#0B1F44]/60 block">Event Date</span>
                    <span className="font-bold">Dec 11, 2026</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#0B1F44]/60 block">Gate Time</span>
                    <span className="font-bold">08:30 AM</span>
                  </div>
                </div>

                <div className="text-xs text-[#0B1F44]/75 border-t border-[#0B1F44]/20 pt-2 font-medium">
                  Organized by <strong>Resala Training Center (RTC)</strong>
                </div>
              </div>
            </div>

            {/* Ticket Stub Footer */}
            <div className="bg-[#E2F0FF] px-6 py-2.5 border-t-2 border-dashed border-[#0B1F44] flex items-center justify-between text-xs font-bold text-[#0B1F44]">
              <span>ONE-TIME SCAN REQUIRED AT GATE</span>
              <button
                onClick={() => window.print()}
                className="hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print / Save Ticket</span>
              </button>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8">
          <Link href="/">
            <Button variant="secondary" size="md">
              Return to Home Page
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
