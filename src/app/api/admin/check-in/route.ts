import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase/admin';
import { hashQRToken } from '@/lib/security';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, ticketCode, staffUserId } = body;

    if (!token && !ticketCode) {
      return NextResponse.json({ error: 'Scanned token or ticket code is required.' }, { status: 400 });
    }

    const supabase = getServiceSupabase();

    // 1. Resolve token hash
    let targetHash = '';

    if (token) {
      targetHash = hashQRToken(token.trim());
    } else if (ticketCode) {
      // Manual ticket code lookup
      const { data: ticketRecord } = await supabase
        .from('tickets')
        .select('qr_token_hash')
        .eq('ticket_code', ticketCode.trim().toUpperCase())
        .maybeSingle();

      if (!ticketRecord) {
        return NextResponse.json({
          result: 'invalid',
          message: 'No ticket found with this code.',
        });
      }

      targetHash = ticketRecord.qr_token_hash;
    }

    // 2. Call the Atomic PostgreSQL Redemption Function
    // Uses SELECT FOR UPDATE to prevent race conditions from concurrent scans
    const { data, error } = await supabase.rpc('redeem_ticket', {
      p_qr_token_hash: targetHash,
      p_staff_user_id: staffUserId || null,
    });

    if (error) {
      console.error('[CHECKIN] RPC error:', error);

      // Fallback: direct conditional query if RPC not yet deployed in external Supabase instance
      const { data: directTicket } = await supabase
        .from('tickets')
        .select('id, ticket_code, ticket_status, checked_in_at, registrations(full_name)')
        .eq('qr_token_hash', targetHash)
        .maybeSingle();

      if (!directTicket) {
        return NextResponse.json({ result: 'invalid', message: 'Ticket does not exist.' });
      }

      if (directTicket.ticket_status === 'used') {
        return NextResponse.json({
          result: 'already_used',
          ticketId: directTicket.id,
          ticketCode: directTicket.ticket_code,
          attendeeName: (directTicket.registrations as any)?.full_name,
          checkedInAt: directTicket.checked_in_at,
          message: 'Ticket was already scanned.',
        });
      }

      // Mark used
      await supabase
        .from('tickets')
        .update({
          ticket_status: 'used',
          checked_in_at: new Date().toISOString(),
        })
        .eq('id', directTicket.id)
        .eq('ticket_status', 'issued');

      return NextResponse.json({
        result: 'valid',
        ticketId: directTicket.id,
        ticketCode: directTicket.ticket_code,
        attendeeName: (directTicket.registrations as any)?.full_name,
        checkedInAt: new Date().toISOString(),
        message: 'Valid ticket. Admission approved.',
      });
    }

    const checkinRow = Array.isArray(data) ? data[0] : data;

    if (!checkinRow) {
      return NextResponse.json({ result: 'invalid', message: 'Invalid ticket token.' });
    }

    return NextResponse.json({
      result: checkinRow.result,
      ticketId: checkinRow.ticket_id,
      ticketCode: checkinRow.ticket_code,
      attendeeName: checkinRow.attendee_name,
      checkedInAt: checkinRow.checked_in_at,
      previousCheckinAt: checkinRow.previous_checkin_at,
    });
  } catch (err: any) {
    console.error('[CHECKIN] Unexpected error:', err);
    return NextResponse.json({ error: 'Server error during check-in.' }, { status: 500 });
  }
}
