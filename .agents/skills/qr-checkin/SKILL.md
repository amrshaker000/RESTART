---
name: qr-checkin
description: Single-use QR admission and atomic concurrency-safe check-in function
---

# One-Time QR Check-In Skill

## Security Principles
- QR code contains a raw secure 32-byte crypto token.
- At check-in gate, scanner reads token and sends to `/api/admin/check-in`.
- Server hashes token with HMAC-SHA256.
- Database executes `redeem_ticket(p_qr_token_hash, p_staff_user_id)`.
- Query uses `SELECT ... FOR UPDATE` locking to guarantee atomic redemption.
- Two simultaneous scans will NEVER result in two valid entries.

## Outcome States
1. `valid` (Green): Ticket is active and unused. Mark status = 'used', set `checked_in_at = now()`.
2. `already_used` (Orange): Ticket was previously redeemed. Display original check-in timestamp. Reject entry.
3. `invalid` (Red): Token not found or revoked. Reject entry.
