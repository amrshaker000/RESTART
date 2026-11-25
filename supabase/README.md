# Database Documentation & Supabase Setup

This folder contains database migrations and setup instructions for the **RESTART** event platform.

## Supabase PostgreSQL Schema Overview

The database is built on Supabase PostgreSQL with full Row-Level Security (RLS), atomic concurrency-safe check-in, RBAC roles, and independent email outbox logging.

### Applying Migrations

1. Go to your Supabase Project Dashboard -> **SQL Editor**.
2. Open `supabase/migrations/001_initial_schema.sql`.
3. Copy the entire file contents and click **Run**.
4. Verify all tables, extensions, and RLS policies are created.

### Creating Initial Super Admin Account

1. In Supabase Dashboard -> **Authentication** -> **Users**, click **Add User** (Create User with email/password).
2. Note the generated `UUID` (e.g. `c7b...`).
3. Run this SQL query to give the user `super_admin` role:

```sql
INSERT INTO public.admin_profiles (user_id, full_name, email, role, is_active)
VALUES (
  'YOUR_USER_UUID_HERE',
  'Super Administrator',
  'admin@restart.resala.org',
  'super_admin',
  true
);
```

### Roles Supported

- `super_admin`: Complete access to all features, approvals, user management, and settings.
- `admin`: Operational management of registrations, tickets, check-in, agenda, and speakers.
- `hr`: Registration attendee lists, volunteer application reviews, and CSV exports.
- `br`: Speakers and sponsors relationship management.
- `organizing`: Agenda scheduling and mobile QR check-in scanning.
- `media`: Content and promotional banner editing.
