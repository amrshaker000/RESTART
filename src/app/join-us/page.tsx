'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Heart, CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

export default function JoinUsPage() {
  const [formData, setFormData] = useState({
    applicant_name: '',
    email: '',
    phone: '',
    education_background: '',
    preferred_department: 'Organizing & Logistics',
    skills: '',
    availability: 'Fridays & Weekends',
    motivation: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const departments = [
    'Organizing & Logistics',
    'Media, Photography & Video',
    'Public Relations & Speakers (BR)',
    'Human Resources (HR)',
    'Technical & IT Support',
    'Content & Social Media',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.applicant_name.trim() || !formData.email.trim()) {
      setError('Please provide your name and email address.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to submit application.');
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
    } catch (err) {
      setError('Network error submitting volunteer form.');
      setLoading(false);
    }
  };

  return (
    <div className="py-12 md:py-20 bg-grid-pattern min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="lavender" className="mb-4">VOLUNTEER RECRUITMENT</Badge>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#0B1F44] font-display">
            Join the RTC Team
          </h1>
          <p className="text-base sm:text-lg text-[#0B1F44]/80 mt-3 font-medium">
            Be the driving force behind RESTART and future RTC educational initiatives. Build real leadership, project management, and teamwork experience.
          </p>
        </div>

        {success ? (
          <Card variant="light-blue" className="text-center py-16 px-6 max-w-xl mx-auto shadow-brutal-lg">
            <div className="w-16 h-16 bg-[#27C93F] text-white border-2 border-[#0B1F44] shadow-brutal mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 stroke-[3]" />
            </div>
            <h2 className="text-3xl font-black uppercase text-[#0B1F44] mb-2 font-display">
              Application Received!
            </h2>
            <p className="text-sm text-[#0B1F44]/80 max-w-md mx-auto leading-relaxed font-medium">
              Thank you for stepping up to make an impact. The RTC HR team will review your application and reach out to you via email or phone regarding the interview schedule.
            </p>
          </Card>
        ) : (
          <Card variant="white" className="p-6 md:p-8 shadow-brutal-lg max-w-2xl mx-auto">
            <div className="mb-6 pb-4 border-b-2 border-[#0B1F44]/20">
              <h2 className="text-2xl font-black uppercase text-[#0B1F44]">
                Volunteer Application Form
              </h2>
              <p className="text-xs text-[#0B1F44]/70 mt-1 font-medium">
                Note: This application is for joining the organizing team, separate from attendee registration.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-[#FFECEC] border-2 border-[#FF5F56] text-[#0B1F44] text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#FF5F56]" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
              <Input
                label="Full Name"
                placeholder="Ahmed Mohamed"
                required
                value={formData.applicant_name}
                onChange={(e) => setFormData({ ...formData, applicant_name: e.target.value })}
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="name@example.com"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

              <Input
                label="Phone Number"
                type="tel"
                placeholder="010XXXXXXXX"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />

              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-black uppercase tracking-wider text-[#0B1F44]">
                  Preferred Volunteer Department
                </label>
                <select
                  value={formData.preferred_department}
                  onChange={(e) => setFormData({ ...formData, preferred_department: e.target.value })}
                  className="w-full bg-[#FFFFFF] text-[#0B1F44] px-4 py-3 border-2 border-[#0B1F44] shadow-brutal-sm font-bold text-sm outline-none"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                label="Education / Current Status"
                placeholder="e.g. Faculty of Engineering / 3rd year"
                value={formData.education_background}
                onChange={(e) => setFormData({ ...formData, education_background: e.target.value })}
              />

              <Input
                label="Key Skills"
                placeholder="e.g. Graphic design, Event organizing, Photography"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              />

              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-black uppercase tracking-wider text-[#0B1F44]">
                  Why do you want to volunteer with RTC?
                </label>
                <textarea
                  rows={3}
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  placeholder="Share a brief note about what motivates you to contribute..."
                  className="w-full bg-[#FFFFFF] text-[#0B1F44] px-4 py-3 border-2 border-[#0B1F44] shadow-brutal-sm font-medium text-sm outline-none focus:border-[#7CCBFF]"
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={loading}
                  className="flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting Application...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Volunteer Application</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Card>
        )}

      </div>
    </div>
  );
}
