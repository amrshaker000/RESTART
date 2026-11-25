// ==============================================================================
// RESTART EVENT PLATFORM - SHARED TYPES & INTERFACES
// ==============================================================================

export type AdminRole = 'super_admin' | 'admin' | 'hr' | 'br' | 'organizing' | 'media';

export type TicketStatus = 'issued' | 'used' | 'revoked';
export type EmailStatus = 'pending' | 'queued' | 'sent' | 'delivered' | 'failed';
export type ActivityType = 'session' | 'workshop' | 'coaching' | 'career_consulting' | 'interview' | 'networking' | 'break' | 'registration';
export type VolunteerStatus = 'new' | 'under_review' | 'contacted' | 'accepted' | 'rejected' | 'completed';
export type ContentStatus = 'draft' | 'pending_approval' | 'published' | 'rejected' | 'archived';

export interface SiteSettings {
  event_name: string;
  slogan: string;
  event_date: string;
  event_time: string;
  venue_name: string;
  venue_address: string;
  is_venue_confirmed: boolean;
  is_registration_open: boolean;
  registration_limit: number;
  contact_email: string;
  whatsapp_group_url: string;
  facebook_url?: string;
  instagram_url?: string;
}

export interface AdminProfile {
  user_id: string;
  full_name: string;
  email: string;
  role: AdminRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Registration {
  id: string;
  full_name: string;
  email: string;
  normalized_email: string;
  phone?: string;
  university?: string;
  field_of_interest?: string;
  additional_answers?: Record<string, any>;
  privacy_consent: boolean;
  registration_status: 'confirmed' | 'waitlist' | 'cancelled';
  created_at: string;
  updated_at: string;
  ticket?: Ticket;
}

export interface Ticket {
  id: string;
  registration_id: string;
  ticket_code: string;
  qr_token_hash: string;
  ticket_status: TicketStatus;
  email_status: EmailStatus;
  issued_at: string;
  emailed_at?: string;
  checked_in_at?: string;
  checked_in_by?: string;
  revoked_at?: string;
  revoked_reason?: string;
  created_at: string;
  updated_at: string;
  registration?: Registration;
}

export interface Speaker {
  id: string;
  full_name: string;
  professional_title?: string;
  bio?: string;
  profile_image?: string;
  specialization?: string;
  session_title?: string;
  social_links?: Record<string, string>;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Sponsor {
  id: string;
  organization_name: string;
  logo?: string;
  category: 'partner' | 'gold' | 'silver' | 'community';
  description?: string;
  website_url?: string;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Room {
  id: string;
  name: string;
  capacity?: number;
  location_description?: string;
  display_order: number;
}

export interface AgendaItem {
  id: string;
  title: string;
  description?: string;
  activity_type: ActivityType;
  track?: string;
  room_id?: string;
  room?: Room;
  start_time: string;
  end_time: string;
  event_date: string;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
  speakers?: Speaker[];
}

export interface VolunteerApplication {
  id: string;
  applicant_name: string;
  email: string;
  phone?: string;
  education_background?: string;
  preferred_department?: string;
  skills?: string;
  availability?: string;
  motivation?: string;
  application_answers?: Record<string, any>;
  application_status: VolunteerStatus;
  internal_notes?: string;
  reviewed_by?: string;
  reviewed_at?: string;
  created_at: string;
}

export interface CheckinResult {
  result: 'valid' | 'already_used' | 'invalid' | 'revoked';
  ticket_id?: string;
  ticket_code?: string;
  attendee_name?: string;
  checked_in_at?: string;
  previous_checkin_at?: string;
}
