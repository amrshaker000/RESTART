# Project Status — RESTART

Last Updated: 2026-11-25

## Implementation Status Overview

All core phases have been built and verified with the latest stable **Next.js 16 (App Router)** and TypeScript:

| Phase | Description | Status |
|---|---|---|
| **Phase 00** | Documentation, Knowledge Base & Skills | ✅ Complete |
| **Phase 01** | Foundation & Neo-Brutalist Design Tokens | ✅ Complete |
| **Phase 02** | Public Website & All Sections | ✅ Complete |
| **Phase 03** | Attendee Registration & Validation System | ✅ Complete |
| **Phase 04** | Automated Unique Ticketing & Email Outbox | ✅ Complete |
| **Phase 05** | One-Time QR Check-in & Atomic Concurrency Gate | ✅ Complete |
| **Phase 06** | Interactive Agenda, About RTC, Volunteer Recruitment | ✅ Complete |
| **Phase 07** | Admin Dashboard with 6 RBAC Roles & Approvals | ✅ Complete |
| **Phase 08** | Production Build Verification (`npm run build`) | ✅ Passed (25/25 routes) |

---

## Route Inventory

### Public Pages
- `/` — Homepage with Neo-Brutalist Hero, Overview, Career Journey (6 levels), Fields, Activities, dynamic Speakers/Sponsors, Organizer RTC, Venue status, and Final CTA.
- `/register` — Full three-part name validation, duplicate email protection, privacy consent.
- `/register/success` — Registration confirmed banner, personalized admission ticket with live QR code, download/print button, and WhatsApp community CTA.
- `/agenda` — Interactive schedule with Timeline view, track filters, search, and dynamic session loading.
- `/about-rtc` — RTC Resala Training Center mission, training categories (Computer, Languages, Human Development).
- `/join-us` — Volunteer recruitment form with department selection and application logging.

### API Endpoints
- `POST /api/registrations` — Server validation, duplicate check, unique ticket code generation, crypto QR token generation, HMAC-SHA256 hashing, email outbox queuing.
- `POST /api/admin/check-in` — Concurrency-safe atomic check-in execution (Valid, Already Used, Invalid).
- `POST /api/admin/tickets/[id]/resend` — Queues fresh ticket email in outbox.
- `POST /api/admin/tickets/[id]/reissue` — Revokes old QR token hash, issues new token, and triggers ticket email.
- `POST /api/volunteers` — Volunteer application submission handler.

### Admin Portal & RBAC
- `/admin/login` — Staff authentication.
- `/admin/dashboard` — Live operational KPIs (registrations, check-in rate, volunteers, email outbox stats).
- `/admin/check-in` — Mobile camera QR scanner with `html5-qrcode`, manual code fallback, and audio/visual states.
- `/admin/registrations` — Search, filter, and CSV export.
- `/admin/tickets` — Ticket status management, email resend, and token reissue.
- `/admin/approvals` — Content publishing workflow (Draft → Pending Approval → Published).
- `/admin/users` — Staff RBAC role assignments (`super_admin`, `admin`, `hr`, `br`, `organizing`, `media`).
- `/admin/agenda` — Session scheduling.
- `/admin/speakers` — Speaker catalog.
- `/admin/sponsors` — Sponsor management.
- `/admin/volunteers` — Volunteer applicant tracking & review.
- `/admin/logs` — Immutable audit trail.
- `/admin/settings` — Event date, venue status, registration toggle, WhatsApp link.
