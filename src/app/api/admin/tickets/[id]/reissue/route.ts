import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase/admin';
import { generateSecureQRToken, hashQRToken } from '@/lib/security';
import { sendTicketEmail } from '@/lib/email';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = getServiceSupabase();

    // 1. Fetch current ticket & attendee info
    const { data: ticket, error: ticketErr } = await supabase
      .from('tickets')
      .select('id, ticket_code, ticket_status, qr_token_hash, registrations(id, full_name, email)')
      .eq('id', id)
      .single();

    if (ticketErr || !ticket) {
      return NextResponse.json({ error: 'Ticket not found.' }, { status: 404 });
    }

    const reg = ticket.registrations as any;
    if (!reg) {
      return NextResponse.json({ error: 'Associated registration not found.' }, { status: 404 });
    }

    // 2. Generate brand new secure token & revoke old token hash
    const newRawToken = generateSecureQRToken();
    const newHash = hashQRToken(newRawToken);

    // Update ticket with new hash and reset status to 'issued' if revoked
    const { error: updateErr } = await supabase
      .from('tickets')
      .update({
        qr_token_hash: newHash,
        ticket_status: 'issued',
        checked_in_at: null,
        checked_in_by: null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (updateErr) {
      return NextResponse.json({ error: 'Failed to update ticket.' }, { status: 500 });
    }

    // 3. Record issuance history (reissue)
    await supabase.from('ticket_issuances').insert({
      ticket_id: id,
      qr_token_hash: newHash,
      action: 'reissue',
    });

    // 4. Send fresh replacement ticket email
    await sendTicketEmail({
      ticketId: id,
      recipientEmail: reg.email,
      recipientName: reg.full_name,
      ticketCode: ticket.ticket_code,
      qrToken: newRawToken,
    });

    return NextResponse.json({
      success: true,
      message: 'Ticket successfully reissued. Old QR code has been revoked and new ticket emailed.',
      newTicketCode: ticket.ticket_code,
    });
  } catch (err: any) {
    console.error('[REISSUE] Error:', err);
    return NextResponse.json({ error: 'Internal error reissuing ticket.' }, { status: 500 });
  }
}
