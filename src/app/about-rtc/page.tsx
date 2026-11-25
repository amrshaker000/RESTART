import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Heart, BookOpen, Users, Compass, ArrowUpRight, Award, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'About RTC | Resala Training Center — RESTART',
  description: 'Learn about Resala Training Center (RTC), operating under Resala Charity Organization.',
};

export default function AboutRtcPage() {
  const trainingFields = [
    {
      category: 'Computer & Technology Courses',
      description: 'Web development, programming fundamentals, databases, IT systems, and graphic design tools.',
      color: 'bg-[#7CCBFF]',
    },
    {
      category: 'Language Tracks',
      description: 'Practical conversational English, German, and French designed for professional communication and career mobility.',
      color: 'bg-[#B794F4]',
    },
    {
      category: 'Human Development & Soft Skills',
      description: 'Public speaking, interview preparation, emotional intelligence, leadership, and career transition mindset.',
      color: 'bg-[#FF9F43]',
    },
  ];

  return (
    <div className="py-12 md:py-20 bg-grid-pattern min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="orange" className="mb-4">THE ORGANIZER</Badge>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#0B1F44] font-display">
            Resala Training Center
          </h1>
          <div className="text-sm font-bold text-[#FF9F43] uppercase tracking-widest mt-2">
            Operating under Resala Charity Organization
          </div>
          <p className="text-base sm:text-lg text-[#0B1F44]/80 mt-4 leading-relaxed font-medium">
            Empowering Egyptian youth, university graduates, and ambitious professionals with practical, accessible training to bridge the gap between academic education and modern market requirements.
          </p>
        </div>

        {/* Mission & Heritage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card variant="white" className="p-8">
            <div className="p-3 bg-[#7CCBFF] border-2 border-[#0B1F44] shadow-brutal-sm w-fit mb-4">
              <Compass className="w-6 h-6 text-[#0B1F44]" />
            </div>
            <h2 className="text-2xl font-black uppercase text-[#0B1F44] mb-3">Our Mission</h2>
            <p className="text-sm text-[#0B1F44]/80 leading-relaxed font-medium">
              RTC aims to democratize career growth. Through community-driven training programs, volunteer instructors, and practical syllabi, we cultivate the confidence and technical competencies required to succeed in competitive modern industries.
            </p>
          </Card>

          <Card variant="light-blue" className="p-8">
            <div className="p-3 bg-[#B794F4] border-2 border-[#0B1F44] shadow-brutal-sm w-fit mb-4">
              <Heart className="w-6 h-6 text-[#0B1F44]" />
            </div>
            <h2 className="text-2xl font-black uppercase text-[#0B1F44] mb-3">Community & Volunteer Spirit</h2>
            <p className="text-sm text-[#0B1F44]/80 leading-relaxed font-medium">
              Every course, event, and workshop at RTC thrives on the passionate dedication of volunteer professionals, organizers, and educators. This non-profit ethos ensures training remains focused purely on student impact and real skill acquisition.
            </p>
          </Card>
        </div>

        {/* Training Categories */}
        <div className="mb-16">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-[#0B1F44] bg-[#FF9F43] px-3 py-1 border-2 border-[#0B1F44] shadow-brutal-sm">
              Core Pillars
            </span>
            <h3 className="text-3xl font-black uppercase text-[#0B1F44] mt-3">
              Official RTC Training Fields
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trainingFields.map((field, idx) => (
              <Card key={idx} variant="white">
                <div className={`w-8 h-8 ${field.color} border-2 border-[#0B1F44] shadow-brutal-sm mb-4`} />
                <h4 className="text-lg font-black uppercase text-[#0B1F44] mb-2">{field.category}</h4>
                <p className="text-xs text-[#0B1F44]/80 leading-relaxed font-medium">{field.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Join CTA */}
        <Card variant="navy" className="p-10 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-black uppercase text-white mb-3 font-display">
            Become Part of the RTC Movement
          </h3>
          <p className="text-sm text-[#E2F0FF]/80 max-w-xl mx-auto mb-6 leading-relaxed font-medium">
            Whether you are looking to learn at our upcoming RESTART career event or want to join as an active volunteer to organize and make an impact.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/register">
              <Button variant="primary" size="md">
                Register for RESTART
              </Button>
            </Link>
            <Link href="/join-us">
              <Button variant="orange" size="md">
                Apply as Volunteer
              </Button>
            </Link>
          </div>
        </Card>

      </div>
    </div>
  );
}
