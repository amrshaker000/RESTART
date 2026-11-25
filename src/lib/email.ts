import { Resend } from 'resend';
import { getServiceSupabase } from './supabase/admin';

interface SendTicketEmailParams {
  ticketId: string;
  recipientEmail: string;
  recipientName: string;
  ticketCode: string;
  qrToken: string;
  eventDate?: string;
  venueName?: string;
}

/**
 * Send personalized ticket email using Resend with Idempotency Key & Outbox recording
 */
export async function sendTicketEmail(params: SendTicketEmailParams): Promise<{ success: boolean; error?: string }> {
  const { ticketId, recipientEmail, recipientName, ticketCode, qrToken, eventDate = 'Friday, December 11, 2026', venueName = 'Venue details will be announced soon' } = params;
  const supabase = getServiceSupabase();
  const idempotencyKey = `ticket-email-${ticketId}`;

  // 1. Record outbox entry in Supabase (Status: queued)
  const { data: outboxItem, error: outboxErr } = await supabase
    .from('email_outbox')
    .insert({
      ticket_id: ticketId,
      recipient_email: recipientEmail,
      recipient_name: recipientName,
      subject: 'Your RESTART Ticket Is Ready! – NO GAME OVER',
      idempotency_key: idempotencyKey,
      status: 'queued',
      attempts: 1,
      last_attempt_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (outboxErr && !outboxErr.message.includes('duplicate key')) {
    console.error('Failed to create email outbox entry:', outboxErr);
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey || resendApiKey.startsWith('re_your_')) {
    // If no real Resend key is configured, log graceful warning and mark outbox as pending
    console.warn('[EMAIL] RESEND_API_KEY not configured. Email recorded in outbox as pending.');
    await supabase.from('email_outbox').update({
      status: 'pending',
      error_message: 'RESEND_API_KEY is not configured yet. Ready for retry when key is provided.'
    }).eq('idempotency_key', idempotencyKey);

    return { success: false, error: 'Email delivery pending: Resend API key is not configured.' };
  }

  try {
    const resend = new Resend(resendApiKey);
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'RESTART Event <tickets@restart-event.com>';

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #E2F0FF; margin: 0; padding: 24px; color: #0B1F44; }
          .container { max-width: 580px; margin: 0 auto; background: #FFFFFF; border: 3px solid #0B1F44; box-shadow: 6px 6px 0px #0B1F44; border-radius: 4px; overflow: hidden; }
          .header { background: #0B1F44; color: #FFFFFF; padding: 24px; text-align: center; }
          .title { font-size: 28px; font-weight: 800; margin: 0; letter-spacing: 1px; }
          .subtitle { color: #7CCBFF; font-size: 14px; font-weight: 600; margin-top: 6px; }
          .body { padding: 32px 24px; }
          .ticket-card { border: 2px dashed #0B1F44; background: #E2F0FF; padding: 20px; margin: 24px 0; text-align: center; }
          .ticket-code { font-size: 22px; font-weight: 800; color: #0B1F44; letter-spacing: 2px; }
          .btn { display: inline-block; background: #7CCBFF; color: #0B1F44; font-weight: 700; text-decoration: none; padding: 14px 28px; border: 2px solid #0B1F44; box-shadow: 4px 4px 0px #0B1F44; margin-top: 16px; }
          .footer { font-size: 12px; color: #666; text-align: center; padding: 16px; border-top: 1px solid #E2F0FF; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="title">RESTART</h1>
            <div class="subtitle">NO GAME OVER • RTC CAREER DAY</div>
          </div>
          <div class="body">
            <h2>Welcome, ${recipientName}!</h2>
            <p>Your registration for <strong>RESTART</strong> has been officially confirmed.</p>
            <p>Your journey to the next level starts here. Please keep this email and ticket handy for event admission.</p>

            <div class="ticket-card">
              <div style="font-size: 12px; font-weight: bold; text-transform: uppercase; color: #0B1F44;">Official Admission Ticket</div>
              <div class="ticket-code">${ticketCode}</div>
              <p style="margin: 8px 0; font-size: 14px;"><strong>Date:</strong> ${eventDate}</p>
              <p style="margin: 4px 0; font-size: 14px;"><strong>Venue:</strong> ${venueName}</p>
            </div>

            <p style="font-size: 14px; line-height: 1.6;">
              <strong>Important Attendance Note:</strong><br>
              Every ticket includes a unique QR code that can only be redeemed once at the check-in gate.
            </p>

            <div style="text-align: center; margin-top: 24px;">
              <a href="${process.env.NEXT_PUBLIC_WHATSAPP_GROUP_URL || 'https://chat.whatsapp.com'}" class="btn">
                JOIN THE RESTART COMMUNITY
              </a>
            </div>
          </div>
          <div class="footer">
            Organized with pride by Resala Training Center (RTC) • Resala Charity Organization
          </div>
        </div>
      </body>
      </html>
    `;

    const { data: sendResult, error: sendErr } = await resend.emails.send({
      from: fromEmail,
      to: recipientEmail,
      subject: 'Your RESTART Ticket Is Ready! – NO GAME OVER',
      html: htmlContent,
      headers: {
        'X-Entity-Ref-ID': ticketId,
      },
    });

    if (sendErr) {
      console.error('[EMAIL] Resend send error:', sendErr);
      await supabase.from('email_outbox').update({
        status: 'failed',
        error_message: sendErr.message,
      }).eq('idempotency_key', idempotencyKey);

      await supabase.from('tickets').update({
        email_status: 'failed'
      }).eq('id', ticketId);

      return { success: false, error: sendErr.message };
    }

    // Success: mark sent
    await supabase.from('email_outbox').update({
      status: 'sent',
      resend_message_id: sendResult?.id,
      sent_at: new Date().toISOString(),
    }).eq('idempotency_key', idempotencyKey);

    await supabase.from('tickets').update({
      email_status: 'sent',
      emailed_at: new Date().toISOString(),
    }).eq('id', ticketId);

    return { success: true };
  } catch (err: any) {
    console.error('[EMAIL] Unexpected error sending email:', err);
    await supabase.from('email_outbox').update({
      status: 'failed',
      error_message: err.message || 'Unknown error',
    }).eq('idempotency_key', idempotencyKey);

    return { success: false, error: err.message };
  }
}
