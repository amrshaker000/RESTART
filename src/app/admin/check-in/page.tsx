import React from 'react';
import CheckInScanner from '@/components/admin/CheckInScanner';

export const metadata = {
  title: 'Gate Check-In | RESTART Staff Portal',
  description: 'Single-use QR code attendee admission and validation portal.',
};

export default function AdminCheckInPage() {
  return (
    <div className="min-h-screen bg-[#E2F0FF]">
      <CheckInScanner />
    </div>
  );
}
