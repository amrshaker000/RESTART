# System Architecture — RESTART

## Stack

```
┌──────────────────────────┐
│     Vercel (Hosting)      │
├──────────────────────────┤
│  Next.js 16 (App Router) │
│  ┌────────┬─────────┐    │
│  │ Public │  Admin   │    │
│  │ Pages  │  Pages   │    │
│  └────────┴─────────┘    │
│  ┌──────────────────┐    │
│  │   API Routes     │    │
│  │ /api/registrations│    │
│  │ /api/admin/*      │    │
│  └──────────────────┘    │
├──────────────────────────┤
│    Supabase (Backend)     │
│  ┌────────┬─────────┐    │
│  │  Auth  │   DB    │    │
│  │(SSR    │(Postgres)│    │
│  │cookies)│  + RLS  │    │
│  └────────┴─────────┘    │
│  ┌──────────────────┐    │
│  │    Storage       │    │
│  │  (Images/PDFs)   │    │
│  └──────────────────┘    │
├──────────────────────────┤
│     Resend (Email)        │
│  Server-side only         │
│  Idempotency keys         │
│  Webhook delivery status  │
└──────────────────────────┘
```

## Route Structure

### Public
- `/` — Home
- `/register` — Registration form
- `/register/success` — Confirmation + WhatsApp CTA
- `/agenda` — Interactive agenda
- `/about-rtc` — About RTC
- `/join-us` — Volunteer recruitment

### Admin
- `/admin/login` — Authentication
- `/admin/dashboard` — Overview
- `/admin/registrations` — Registration management
- `/admin/tickets` — Ticket management
- `/admin/check-in` — QR scanner
- `/admin/agenda` — Agenda CRUD
- `/admin/speakers` — Speaker management
- `/admin/sponsors` — Sponsor management
- `/admin/volunteers` — Volunteer applications
- `/admin/content` — Website content
- `/admin/approvals` — Content approval
- `/admin/users` — User management
- `/admin/logs` — Audit logs
- `/admin/settings` — Site settings

## Key Workflows

1. **Registration → Ticket → Email**: Atomic registration, independent email outbox
2. **QR Check-in**: Atomic database function, single-use enforcement
3. **Content Approval**: Draft → Pending → Published (Super Admin approves)
4. **RBAC**: 6 roles, database-level enforcement via RLS
