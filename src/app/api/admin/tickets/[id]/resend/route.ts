import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase/admin';
import { sendTicketEmail } from '@/lib/email';
import { generateSecureQRToken } from '@/lib/security';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = getServiceSupabase();

    const { data: ticket, error: ticketErr } = await supabase
      .from('tickets')
      .select('id, ticket_code, ticket_status, registrations(id, full_name, email)')
      .eq('id', id)
      .single();

    if (ticketErr || !ticket) {
      return NextResponse.json({ error: 'Ticket not found.' }, { status: 404 });
    }

    const reg = ticket.registrations as any;
    const token = generateSecureQRToken(); // Raw token for email

    await sendTicketEmail({
      ticketId: id,
      recipientEmail: reg.email,
      recipientName: reg.full_name,
      ticketCode: ticket.ticket_code,
      qrToken: token,
    });

    return NextResponse.json({
      success: true,
      message: `Ticket confirmation email queued for delivery to ${reg.email}.`,
    });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to resend ticket email.' }, { status: 500 });
  }
}
