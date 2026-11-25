import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase/admin';
import { normalizeEmail } from '@/lib/security';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { applicant_name, email, phone, education_background, preferred_department, skills, availability, motivation } = body;

    if (!applicant_name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
    }

    const supabase = getServiceSupabase();
    const normalized = normalizeEmail(email);

    const { data, error } = await supabase.from('volunteer_applications').insert({
      applicant_name: applicant_name.trim(),
      email: normalized,
      phone: phone ? String(phone).trim() : null,
      education_background: education_background || null,
      preferred_department: preferred_department || 'Organizing & Logistics',
      skills: skills || null,
      availability: availability || null,
      motivation: motivation || null,
      application_status: 'new',
    }).select().single();

    if (error) {
      console.error('[VOLUNTEER] Insert error:', error);
      return NextResponse.json({ error: 'Failed to record application.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (err: any) {
    return NextResponse.json({ error: 'Server error processing application.' }, { status: 500 });
  }
}
