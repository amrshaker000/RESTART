import crypto from 'crypto';

const SALT = process.env.QR_SECRET_SALT || 'restart_2026_default_salt_key';

/**
 * Generate a unique public Ticket Code in the official format:
 * RESTART-2026-XXXXXX (6 alphanumeric random chars)
 */
export function generateTicketCode(): string {
  const randomChars = crypto.randomBytes(4).toString('hex').toUpperCase().slice(0, 6);
  return `RESTART-2026-${randomChars}`;
}

/**
 * Generate a cryptographically secure random token to be embedded in the QR Code.
 * This token is ONLY sent to the attendee in the ticket.
 */
export function generateSecureQRToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Create a secure SHA-256 hash of the QR token to store in the database.
 * The raw token is NEVER stored in the database.
 */
export function hashQRToken(rawToken: string): string {
  return crypto.createHmac('sha256', SALT).update(rawToken.trim()).digest('hex');
}

/**
 * Normalize an email address for duplicate checking (lowercase, trim).
 */
export function normalizeEmail(email: string): string {
  return email.toLowerCase().trim();
}
