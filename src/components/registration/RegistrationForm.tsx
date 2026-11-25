'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { ArrowRight, AlertCircle, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';

export function RegistrationForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    university: '',
    field_of_interest: 'Programming & Software',
    privacy_consent: true,
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fieldsList = [
    'Programming & Software',
    'Artificial Intelligence',
    'Data Analysis',
    'Cybersecurity',
    'Business & Startups',
    'Digital Marketing',
    'Graphic & UI/UX Design',
    'Freelancing & Remote Work',
    'Other / Still Exploring',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Client-side quick validation
    const nameParts = formData.full_name.trim().split(/\s+/);
    if (nameParts.length < 3) {
      setErrorMessage('Please enter your full three-part name (First Middle Last).');
      return;
    }

    if (!formData.email || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!formData.privacy_consent) {
      setErrorMessage('You must accept the event terms to proceed.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || 'Failed to submit registration. Please try again.');
        setLoading(false);
        return;
      }

      // Store ticket info temporarily in sessionStorage for instant ticket rendering on success page
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('restart_ticket_data', JSON.stringify(data));
      }

      // Redirect to success confirmation page
      router.push('/register/success');
    } catch (err: any) {
      setErrorMessage('Network error occurred. Please check your connection and try again.');
      setLoading(false);
    }
  };

  return (
    <Card variant="white" className="p-6 md:p-8 shadow-brutal-lg max-w-2xl mx-auto">
      <div className="mb-6 pb-4 border-b-2 border-[#0B1F44]/20">
        <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#0B1F44]">
          Claim Your Admission Pass
        </h2>
        <p className="text-sm text-[#0B1F44]/75 mt-1 font-medium">
          Fill in your details below to generate your unique, personalized QR ticket.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 bg-[#FFECEC] border-2 border-[#FF5F56] text-[#0B1F44] text-sm font-bold flex items-start gap-3 shadow-brutal-sm">
          <AlertCircle className="w-5 h-5 text-[#FF5F56] shrink-0 mt-0.5" />
          <div>{errorMessage}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Full Three-part Name */}
        <Input
          label="Full Name (Three-part name)"
          placeholder="e.g. Ahmed Mohamed Ali"
          required
          value={formData.full_name}
          onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
          helperText="Minimum 3 names for official ticket printing and badge verification."
        />

        {/* Email Address */}
        <Input
          label="Email Address"
          type="email"
          placeholder="name@example.com"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          helperText="Your personalized QR admission ticket will be sent to this email."
        />

        {/* Phone Number (Optional) */}
        <Input
          label="Phone Number (Optional)"
          type="tel"
          placeholder="010XXXXXXXX"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          helperText="For event SMS updates and WhatsApp broadcast."
        />

        {/* University / Organization */}
        <Input
          label="University or Current Company (Optional)"
          placeholder="e.g. Cairo University or Freelance"
          value={formData.university}
          onChange={(e) => setFormData({ ...formData, university: e.target.value })}
        />

        {/* Field of Interest */}
        <div className="flex flex-col gap-1.5 text-left">
          <label className="text-xs md:text-sm font-extrabold uppercase tracking-wider text-[#0B1F44]">
            Primary Field of Interest
          </label>
          <select
            value={formData.field_of_interest}
            onChange={(e) => setFormData({ ...formData, field_of_interest: e.target.value })}
            className="w-full bg-[#FFFFFF] text-[#0B1F44] px-4 py-3 border-2 md:border-3 border-[#0B1F44] shadow-brutal-sm font-bold text-sm md:text-base outline-none focus:border-[#7CCBFF]"
          >
            {fieldsList.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        {/* Privacy Consent Checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={formData.privacy_consent}
              onChange={(e) => setFormData({ ...formData, privacy_consent: e.target.checked })}
              className="w-5 h-5 mt-0.5 border-2 border-[#0B1F44] text-[#7CCBFF] rounded-none focus:ring-0 cursor-pointer"
            />
            <span className="text-xs text-[#0B1F44]/80 leading-relaxed font-medium">
              I agree to receive event communications from RESTART and RTC. I understand that my ticket QR code is single-use and non-transferable.
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={loading}
            className="flex items-center justify-center gap-2 py-4 text-base md:text-lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating Your Ticket...</span>
              </>
            ) : (
              <>
                <span>Complete Registration & Get Ticket</span>
                <ArrowRight className="w-5 h-5 stroke-[3]" />
              </>
            )}
          </Button>
        </div>

        {/* Security badge note */}
        <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#0B1F44]/60 pt-2">
          <ShieldCheck className="w-4 h-4 text-[#27C93F]" />
          <span>One-time secure QR admission ticket generated automatically.</span>
        </div>
      </form>
    </Card>
  );
}
