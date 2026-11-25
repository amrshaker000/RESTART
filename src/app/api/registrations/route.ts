import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase/admin';
import { generateTicketCode, generateSecureQRToken, hashQRToken, normalizeEmail } from '@/lib/security';
import { sendTicketEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { full_name, email, phone, university, field_of_interest, privacy_consent } = body;

    // 1. Validate full name (minimum three words / parts per spec)
    if (!full_name || typeof full_name !== 'string') {
      return NextResponse.json({ error: 'Full name is required.' }, { status: 400 });
    }

    const trimmedName = full_name.trim();
    const nameParts = trimmedName.split(/\s+/);
    if (nameParts.length < 3) {
      return NextResponse.json({ 
        error: 'Please enter your full three-part name (e.g. First Middle Last).' 
      }, { status: 400 });
    }

    // 2. Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Valid email address is required.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const normalized = normalizeEmail(email);
    if (!emailRegex.test(normalized)) {
      return NextResponse.json({ error: 'Please enter a valid email format.' }, { status: 400 });
    }

    // 3. Validate privacy consent
    if (!privacy_consent) {
      return NextResponse.json({ error: 'You must agree to the event registration terms and privacy notice.' }, { status: 400 });
    }

    const supabase = getServiceSupabase();

    // 4. Check if registration is open in site_settings
    const { data: settingData } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'event_info')
      .single();

    if (settingData?.value?.is_registration_open === false) {
      return NextResponse.json({ 
        error: 'Registration is currently closed or capacity has been reached. Please check back later.' 
      }, { status: 403 });
    }

    // 5. Duplicate Email Check (Strict Idempotency)
    const { data: existingReg } = await supabase
      .from('registrations')
      .select('id, full_name, email')
      .eq('normalized_email', normalized)
      .maybeSingle();

    if (existingReg) {
      return NextResponse.json({ 
        error: 'This email is already registered for RESTART. Please check your inbox for your ticket or contact staff at the event desk.',
        isDuplicate: true,
      }, { status: 409 });
    }

    // 6. Create Registration record
    const { data: newReg, error: regError } = await supabase
      .from('registrations')
      .insert({
        full_name: trimmedName,
        email: normalized,
        normalized_email: normalized,
        phone: phone ? String(phone).trim() : null,
        university: university ? String(university).trim() : null,
        field_of_interest: field_of_interest ? String(field_of_interest).trim() : null,
        privacy_consent: true,
        registration_status: 'confirmed',
      })
      .select()
      .single();

    if (regError) {
      console.error('[REGISTRATION] Insert error:', regError);
      return NextResponse.json({ error: 'Registration database error. Please try again.' }, { status: 500 });
    }

    // 7. Generate Ticket and Secure QR Token
    const ticketCode = generateTicketCode();
    const rawQRToken = generateSecureQRToken();
    const tokenHash = hashQRToken(rawQRToken);

    const { data: newTicket, error: ticketError } = await supabase
      .from('tickets')
      .insert({
        registration_id: newReg.id,
        ticket_code: ticketCode,
        qr_token_hash: tokenHash,
        ticket_status: 'issued',
        email_status: 'pending',
      })
      .select()
      .single();

    if (ticketError) {
      console.error('[TICKET] Creation error:', ticketError);
      return NextResponse.json({ error: 'Ticket generation error. Please contact event support.' }, { status: 500 });
    }

    // 8. Record initial issuance in history
    await supabase.from('ticket_issuances').insert({
      ticket_id: newTicket.id,
      qr_token_hash: tokenHash,
      action: 'initial',
    });

    // 9. Send Ticket Email via Outbox (Background non-blocking so registration is never lost)
    sendTicketEmail({
      ticketId: newTicket.id,
      recipientEmail: normalized,
      recipientName: trimmedName,
      ticketCode: ticketCode,
      qrToken: rawQRToken,
    }).catch((err) => {
      console.error('[EMAIL] Async outbox error:', err);
    });

    // 10. Return success with ticket info and QR raw token for immediate ticket preview
    return NextResponse.json({
      success: true,
      registrationId: newReg.id,
      attendeeName: trimmedName,
      email: normalized,
      ticketCode: ticketCode,
      qrToken: rawQRToken,
      issuedAt: newTicket.issued_at,
    });
  } catch (err: any) {
    console.error('[REGISTRATION] Unexpected API error:', err);
    return NextResponse.json({ error: 'Internal server error while processing registration.' }, { status: 500 });
  }
}
