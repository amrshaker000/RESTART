-- ============================================================================
-- RESTART EVENT PLATFORM - DATABASE SCHEMA MIGRATION
-- Production-Ready Schema with RBAC, Content Approvals, Ticket Security & Email Outbox
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. SITE SETTINGS
CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by UUID
);

-- Insert default site settings
INSERT INTO public.site_settings (key, value) VALUES
('event_info', '{
  "event_name": "RESTART",
  "slogan": "NO GAME OVER",
  "event_date": "2026-12-11",
  "event_time": "09:00 AM – 04:00 PM (Tentative)",
  "venue_name": "Venue details will be announced soon.",
  "venue_address": "Cairo, Egypt",
  "is_venue_confirmed": false,
  "is_registration_open": true,
  "registration_limit": 300,
  "contact_email": "restart@resala.org",
  "whatsapp_group_url": "https://chat.whatsapp.com/restart-event-2026",
  "facebook_url": "https://facebook.com/resala.rtc",
  "instagram_url": "https://instagram.com/resala.rtc"
}'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- 2. ADMIN PROFILES & ROLES
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'organizing',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT valid_role CHECK (role IN ('super_admin', 'admin', 'hr', 'br', 'organizing', 'media'))
);

-- 3. PERMISSIONS & ROLE PERMISSIONS
CREATE TABLE IF NOT EXISTS public.permissions (
  permission_key TEXT PRIMARY KEY,
  description TEXT NOT NULL
);

INSERT INTO public.permissions (permission_key, description) VALUES
('registrations.view', 'View attendee registrations'),
('registrations.export', 'Export attendee registrations to CSV'),
('tickets.manage', 'Reissue or resend attendee tickets'),
('checkin.scan', 'Scan and redeem QR tickets at check-in'),
('speakers.manage', 'Create and edit speakers'),
('sponsors.manage', 'Create and edit sponsors'),
('agenda.manage', 'Create and edit agenda sessions'),
('volunteers.view', 'View volunteer applications'),
('volunteers.manage', 'Review and update volunteer applications'),
('content.edit', 'Edit website content and visual assets'),
('content.publish', 'Approve and publish public-facing content'),
('users.manage', 'Manage administrative accounts and roles'),
('settings.manage', 'Manage event and website settings'),
('audit.view', 'View system audit logs')
ON CONFLICT (permission_key) DO NOTHING;

CREATE TABLE IF NOT EXISTS public.role_permissions (
  role TEXT NOT NULL,
  permission_key TEXT NOT NULL REFERENCES public.permissions(permission_key) ON DELETE CASCADE,
  PRIMARY KEY (role, permission_key)
);

-- Default Role Permission Mappings
INSERT INTO public.role_permissions (role, permission_key) VALUES
-- Super Admin (All permissions)
('super_admin', 'registrations.view'),
('super_admin', 'registrations.export'),
('super_admin', 'tickets.manage'),
('super_admin', 'checkin.scan'),
('super_admin', 'speakers.manage'),
('super_admin', 'sponsors.manage'),
('super_admin', 'agenda.manage'),
('super_admin', 'volunteers.view'),
('super_admin', 'volunteers.manage'),
('super_admin', 'content.edit'),
('super_admin', 'content.publish'),
('super_admin', 'users.manage'),
('super_admin', 'settings.manage'),
('super_admin', 'audit.view'),
-- Admin (General management)
('admin', 'registrations.view'),
('admin', 'registrations.export'),
('admin', 'tickets.manage'),
('admin', 'checkin.scan'),
('admin', 'speakers.manage'),
('admin', 'sponsors.manage'),
('admin', 'agenda.manage'),
('admin', 'volunteers.view'),
('admin', 'content.edit'),
-- HR (Registrations & Volunteers)
('hr', 'registrations.view'),
('hr', 'registrations.export'),
('hr', 'volunteers.view'),
('hr', 'volunteers.manage'),
-- BR (Speakers & Sponsors)
('br', 'speakers.manage'),
('br', 'sponsors.manage'),
-- Organizing (Agenda & Check-in)
('organizing', 'agenda.manage'),
('organizing', 'checkin.scan'),
('organizing', 'registrations.view'),
-- Media (Content & Media Assets)
('media', 'content.edit')
ON CONFLICT DO NOTHING;

-- 4. REGISTRATIONS TABLE
CREATE TABLE IF NOT EXISTS public.registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  normalized_email TEXT NOT NULL UNIQUE,
  phone TEXT,
  university TEXT,
  field_of_interest TEXT,
  additional_answers JSONB DEFAULT '{}'::jsonb,
  privacy_consent BOOLEAN NOT NULL DEFAULT false,
  registration_status TEXT NOT NULL DEFAULT 'confirmed',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT valid_registration_status CHECK (registration_status IN ('confirmed', 'waitlist', 'cancelled'))
);

CREATE INDEX IF NOT EXISTS idx_registrations_email ON public.registrations(normalized_email);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON public.registrations(created_at DESC);

-- 5. TICKETS TABLE
CREATE TABLE IF NOT EXISTS public.tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id UUID NOT NULL REFERENCES public.registrations(id) ON DELETE CASCADE,
  ticket_code TEXT NOT NULL UNIQUE,
  qr_token_hash TEXT NOT NULL UNIQUE,
  ticket_status TEXT NOT NULL DEFAULT 'issued',
  email_status TEXT NOT NULL DEFAULT 'pending',
  issued_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  emailed_at TIMESTAMPTZ,
  checked_in_at TIMESTAMPTZ,
  checked_in_by UUID REFERENCES public.admin_profiles(user_id),
  revoked_at TIMESTAMPTZ,
  revoked_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT valid_ticket_status CHECK (ticket_status IN ('issued', 'used', 'revoked')),
  CONSTRAINT valid_email_status CHECK (email_status IN ('pending', 'queued', 'sent', 'delivered', 'failed'))
);

CREATE INDEX IF NOT EXISTS idx_tickets_code ON public.tickets(ticket_code);
CREATE INDEX IF NOT EXISTS idx_tickets_qr_hash ON public.tickets(qr_token_hash);
CREATE INDEX IF NOT EXISTS idx_tickets_status ON public.tickets(ticket_status);

-- 6. TICKET ISSUANCE HISTORY (For Reissue Tracking)
CREATE TABLE IF NOT EXISTS public.ticket_issuances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID NOT NULL REFERENCES public.tickets(id) ON DELETE CASCADE,
  qr_token_hash TEXT NOT NULL,
  action TEXT NOT NULL DEFAULT 'initial',
  issued_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  revoked_at TIMESTAMPTZ,
  issued_by UUID REFERENCES public.admin_profiles(user_id),
  CONSTRAINT valid_issuance_action CHECK (action IN ('initial', 'reissue'))
);

-- 7. EMAIL OUTBOX & RETRY MECHANISM
CREATE TABLE IF NOT EXISTS public.email_outbox (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID NOT NULL REFERENCES public.tickets(id) ON DELETE CASCADE,
  recipient_email TEXT NOT NULL,
  recipient_name TEXT NOT NULL,
  subject TEXT NOT NULL,
  template TEXT NOT NULL DEFAULT 'ticket_confirmation',
  idempotency_key TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  attempts INTEGER NOT NULL DEFAULT 0,
  max_attempts INTEGER NOT NULL DEFAULT 3,
  last_attempt_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  error_message TEXT,
  resend_message_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT valid_email_outbox_status CHECK (status IN ('pending', 'queued', 'sending', 'sent', 'delivered', 'failed', 'cancelled'))
);

CREATE INDEX IF NOT EXISTS idx_email_outbox_status ON public.email_outbox(status);

-- 8. ROOMS TABLE
CREATE TABLE IF NOT EXISTS public.rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  capacity INTEGER,
  location_description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 9. SPEAKERS TABLE
CREATE TABLE IF NOT EXISTS public.speakers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  professional_title TEXT,
  bio TEXT,
  profile_image TEXT,
  specialization TEXT,
  session_title TEXT,
  social_links JSONB DEFAULT '{}'::jsonb,
  is_published BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 10. SPONSORS TABLE
CREATE TABLE IF NOT EXISTS public.sponsors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_name TEXT NOT NULL,
  logo TEXT,
  category TEXT NOT NULL DEFAULT 'partner',
  description TEXT,
  website_url TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 11. AGENDA ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.agenda_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  activity_type TEXT NOT NULL DEFAULT 'session',
  track TEXT,
  room_id UUID REFERENCES public.rooms(id) ON DELETE SET NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  event_date DATE NOT NULL DEFAULT '2026-12-11',
  is_published BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT valid_activity_type CHECK (activity_type IN ('session', 'workshop', 'coaching', 'career_consulting', 'interview', 'networking', 'break', 'registration'))
);

-- 12. AGENDA SPEAKERS JUNCTION TABLE
CREATE TABLE IF NOT EXISTS public.agenda_speakers (
  agenda_item_id UUID NOT NULL REFERENCES public.agenda_items(id) ON DELETE CASCADE,
  speaker_id UUID NOT NULL REFERENCES public.speakers(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'speaker',
  PRIMARY KEY (agenda_item_id, speaker_id)
);

-- 13. VOLUNTEER APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.volunteer_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  applicant_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  education_background TEXT,
  preferred_department TEXT,
  skills TEXT,
  availability TEXT,
  motivation TEXT,
  application_answers JSONB DEFAULT '{}'::jsonb,
  application_status TEXT NOT NULL DEFAULT 'new',
  internal_notes TEXT,
  reviewed_by UUID REFERENCES public.admin_profiles(user_id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT valid_volunteer_status CHECK (application_status IN ('new', 'under_review', 'contacted', 'accepted', 'rejected', 'completed'))
);

-- 14. CONTENT SUBMISSIONS (Approval Workflow: Draft -> Pending Approval -> Published)
CREATE TABLE IF NOT EXISTS public.content_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type TEXT NOT NULL, -- 'speaker', 'sponsor', 'agenda_item', 'site_content'
  record_id UUID NOT NULL,
  submitted_by UUID NOT NULL REFERENCES public.admin_profiles(user_id),
  status TEXT NOT NULL DEFAULT 'draft',
  submitted_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES public.admin_profiles(user_id),
  reviewed_at TIMESTAMPTZ,
  review_comment TEXT,
  content_snapshot JSONB NOT NULL,
  previous_snapshot JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT valid_submission_status CHECK (status IN ('draft', 'pending_approval', 'published', 'rejected', 'archived'))
);

-- 15. CHECK-IN LOGS
CREATE TABLE IF NOT EXISTS public.checkin_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID NOT NULL REFERENCES public.tickets(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  performed_by UUID REFERENCES public.admin_profiles(user_id),
  result TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 16. AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.admin_profiles(user_id),
  user_role TEXT,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 17. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_role TEXT,
  recipient_user_id UUID REFERENCES public.admin_profiles(user_id),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info',
  is_read BOOLEAN NOT NULL DEFAULT false,
  link TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================================
-- ATOMIC QR TICKET CHECK-IN FUNCTION (Concurrency Safe with SELECT FOR UPDATE)
-- ============================================================================
CREATE OR REPLACE FUNCTION public.redeem_ticket(
  p_qr_token_hash TEXT,
  p_staff_user_id UUID
)
RETURNS TABLE (
  result TEXT,
  ticket_id UUID,
  ticket_code TEXT,
  attendee_name TEXT,
  checked_in_at TIMESTAMPTZ,
  previous_checkin_at TIMESTAMPTZ
) AS $$
DECLARE
  v_ticket RECORD;
BEGIN
  -- Atomic locking: SELECT FOR UPDATE prevents two simultaneous scans
  SELECT 
    t.id, 
    t.ticket_code, 
    t.ticket_status, 
    t.checked_in_at, 
    r.full_name
  INTO v_ticket
  FROM public.tickets t
  JOIN public.registrations r ON r.id = t.registration_id
  WHERE t.qr_token_hash = p_qr_token_hash
  FOR UPDATE;

  -- 1. Check if ticket exists
  IF NOT FOUND THEN
    RETURN QUERY SELECT 'invalid'::TEXT, NULL::UUID, NULL::TEXT, NULL::TEXT, NULL::TIMESTAMPTZ, NULL::TIMESTAMPTZ;
    RETURN;
  END IF;

  -- 2. Check if ticket was revoked
  IF v_ticket.ticket_status = 'revoked' THEN
    RETURN QUERY SELECT 'revoked'::TEXT, v_ticket.id, v_ticket.ticket_code, v_ticket.full_name, NULL::TIMESTAMPTZ, NULL::TIMESTAMPTZ;
    RETURN;
  END IF;

  -- 3. Check if ticket was already used
  IF v_ticket.ticket_status = 'used' THEN
    -- Log duplicate scan attempt
    INSERT INTO public.checkin_logs (ticket_id, action, performed_by, result, metadata)
    VALUES (v_ticket.id, 'checkin_attempt', p_staff_user_id, 'already_used', jsonb_build_object('attempted_at', now()));

    RETURN QUERY SELECT 'already_used'::TEXT, v_ticket.id, v_ticket.ticket_code, v_ticket.full_name, NULL::TIMESTAMPTZ, v_ticket.checked_in_at;
    RETURN;
  END IF;

  -- 4. Atomically update ticket status from 'issued' to 'used'
  UPDATE public.tickets
  SET ticket_status = 'used',
      checked_in_at = now(),
      checked_in_by = p_staff_user_id,
      updated_at = now()
  WHERE id = v_ticket.id AND ticket_status = 'issued';

  -- If update did not affect 1 row, concurrent race condition happened
  IF NOT FOUND THEN
    RETURN QUERY SELECT 'already_used'::TEXT, v_ticket.id, v_ticket.ticket_code, v_ticket.full_name, NULL::TIMESTAMPTZ, v_ticket.checked_in_at;
    RETURN;
  END IF;

  -- 5. Log valid check-in
  INSERT INTO public.checkin_logs (ticket_id, action, performed_by, result, metadata)
  VALUES (v_ticket.id, 'checkin', p_staff_user_id, 'valid', jsonb_build_object('success_at', now()));

  -- Return success
  RETURN QUERY SELECT 'valid'::TEXT, v_ticket.id, v_ticket.ticket_code, v_ticket.full_name, now(), NULL::TIMESTAMPTZ;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_outbox ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.speakers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agenda_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checkin_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Public can read site_settings
CREATE POLICY "Public read site_settings" ON public.site_settings
  FOR SELECT TO anon, authenticated USING (true);

-- Public can read published speakers, sponsors, agenda, rooms
CREATE POLICY "Public read published speakers" ON public.speakers
  FOR SELECT TO anon, authenticated USING (is_published = true);

CREATE POLICY "Public read published sponsors" ON public.sponsors
  FOR SELECT TO anon, authenticated USING (is_published = true);

CREATE POLICY "Public read published agenda" ON public.agenda_items
  FOR SELECT TO anon, authenticated USING (is_published = true);

CREATE POLICY "Public read rooms" ON public.rooms
  FOR SELECT TO anon, authenticated USING (true);

-- Public can insert registration (via Service Role API or RPC)
CREATE POLICY "Allow public insert registrations" ON public.registrations
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Public can insert volunteer application
CREATE POLICY "Allow public insert volunteers" ON public.volunteer_applications
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Authenticated staff policies (Full access for active staff)
CREATE POLICY "Staff read admin_profiles" ON public.admin_profiles
  FOR SELECT TO authenticated USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM public.admin_profiles WHERE user_id = auth.uid() AND is_active = true
  ));

CREATE POLICY "Staff all registrations" ON public.registrations
  FOR ALL TO authenticated USING (EXISTS (
    SELECT 1 FROM public.admin_profiles WHERE user_id = auth.uid() AND is_active = true
  ));

CREATE POLICY "Staff all tickets" ON public.tickets
  FOR ALL TO authenticated USING (EXISTS (
    SELECT 1 FROM public.admin_profiles WHERE user_id = auth.uid() AND is_active = true
  ));

CREATE POLICY "Staff all speakers" ON public.speakers
  FOR ALL TO authenticated USING (EXISTS (
    SELECT 1 FROM public.admin_profiles WHERE user_id = auth.uid() AND is_active = true
  ));

CREATE POLICY "Staff all sponsors" ON public.sponsors
  FOR ALL TO authenticated USING (EXISTS (
    SELECT 1 FROM public.admin_profiles WHERE user_id = auth.uid() AND is_active = true
  ));

CREATE POLICY "Staff all agenda" ON public.agenda_items
  FOR ALL TO authenticated USING (EXISTS (
    SELECT 1 FROM public.admin_profiles WHERE user_id = auth.uid() AND is_active = true
  ));

CREATE POLICY "Staff all volunteers" ON public.volunteer_applications
  FOR ALL TO authenticated USING (EXISTS (
    SELECT 1 FROM public.admin_profiles WHERE user_id = auth.uid() AND is_active = true
  ));

CREATE POLICY "Staff all content_submissions" ON public.content_submissions
  FOR ALL TO authenticated USING (EXISTS (
    SELECT 1 FROM public.admin_profiles WHERE user_id = auth.uid() AND is_active = true
  ));

CREATE POLICY "Staff all audit_logs" ON public.audit_logs
  FOR ALL TO authenticated USING (EXISTS (
    SELECT 1 FROM public.admin_profiles WHERE user_id = auth.uid() AND is_active = true
  ));
