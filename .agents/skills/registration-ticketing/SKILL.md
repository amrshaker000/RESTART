---
name: registration-ticketing
description: Reliable registration, secure QR token generation, and email outbox architecture
---

# Registration & Ticketing Skill

## Workflow
1. Client submits form (`full_name`, `email`, `phone`, `field`, `privacy_consent`).
2. Server validates 3-part name and email regex.
3. Check `site_settings` -> `is_registration_open`.
4. Idempotency: Reject duplicate `normalized_email`.
5. Insert registration into `registrations`.
6. Generate unique ticket code: `RESTART-2026-XXXXXX` (6 random alphanumeric).
7. Generate cryptographically secure random token (32-byte hex).
8. Store HMAC-SHA256 hash in `tickets.qr_token_hash`. The raw token is NEVER stored in database.
9. Queue ticket email in `email_outbox` table with idempotency key `ticket-email-[ticket_id]`.
10. Send ticket via Resend; if Resend key is missing or fails, registration is preserved and outbox is marked for retry.
