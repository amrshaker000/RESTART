import React from 'react';
import { RegistrationForm } from '@/components/registration/RegistrationForm';
import { Badge } from '@/components/ui/Badge';
import { Calendar, MapPin, Gamepad2, Ticket, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Register for RESTART 2026 | Admission Ticket',
  description: 'Register for the official RESTART Career Development Day. Get your unique QR event admission pass.',
};

export default function RegisterPage() {
  return (
    <div className="py-12 md:py-20 bg-grid-pattern min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge variant="orange" className="flex items-center gap-1.5">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>OFFICIAL REGISTRATION</span>
            </Badge>
            <Badge variant="sky">LIMITED TO 300 PASSES</Badge>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#0B1F44] font-display">
            Register for RESTART
          </h1>

          <p className="text-lg text-[#0B1F44]/80 mt-3 font-medium">
            Join us on Friday, December 11, 2026. Every approved registration receives a personalized digital pass with an individual QR check-in code.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs sm:text-sm font-bold text-[#0B1F44]">
            <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 border-2 border-[#0B1F44] shadow-brutal-sm">
              <Calendar className="w-4 h-4 text-[#FF9F43]" />
              Friday, Dec 11, 2026
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 border-2 border-[#0B1F44] shadow-brutal-sm">
              <MapPin className="w-4 h-4 text-[#FF9F43]" />
              Cairo, Egypt (Venue announced soon)
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 border-2 border-[#0B1F44] shadow-brutal-sm">
              <Ticket className="w-4 h-4 text-[#7CCBFF]" />
              100% Free Admission
            </span>
          </div>
        </div>

        {/* The Registration Form */}
        <RegistrationForm />

        {/* Registration Instructions / FAQ */}
        <div className="max-w-2xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-[#0B1F44]/80">
          <div className="p-4 bg-white border-2 border-[#0B1F44] shadow-brutal-sm">
            <div className="font-bold uppercase text-[#0B1F44] mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#27C93F]" />
              Single-Use Admission
            </div>
            Your QR code will be scanned at the entrance gate. It is valid for exactly one check-in.
          </div>
          <div className="p-4 bg-white border-2 border-[#0B1F44] shadow-brutal-sm">
            <div className="font-bold uppercase text-[#0B1F44] mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#27C93F]" />
              Instant Email Delivery
            </div>
            Your ticket will be delivered directly to your inbox and will also be displayed on screen.
          </div>
        </div>

      </div>
    </div>
  );
}
