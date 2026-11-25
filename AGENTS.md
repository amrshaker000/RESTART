# RESTART — AI Agent Instructions

> **Read this file first before working on any task.**

## Project Overview

**RESTART — NO GAME OVER** is a full-stack event platform for a Career Development Day organized by Resala Training Center (RTC), under Resala Charity Organization.

Event Date: **Friday, December 11, 2026**

## Technology Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Framer Motion
- **Backend**: Next.js Route Handlers, Supabase PostgreSQL
- **Auth**: Supabase Auth (cookie-based SSR)
- **Email**: Resend (server-side only)
- **Icons**: Lucide React
- **Hosting**: Vercel + Supabase

## Documentation

| Area | Location |
|---|---|
| Project Brief | `docs/project/PROJECT_BRIEF.md` |
| Event Context | `docs/project/EVENT_CONTEXT.md` |
| Brand Guidelines | `docs/branding/BRAND_GUIDELINES.md` |
| Design System | `docs/design-system/DESIGN_SYSTEM.md` |
| Database Schema | `docs/architecture/DATABASE_SCHEMA.md` |
| API Documentation | `docs/architecture/API_DOCUMENTATION.md` |
| Auth & RBAC | `docs/architecture/AUTHENTICATION_AND_RBAC.md` |
| Decisions Log | `docs/decisions/DECISIONS_LOG.md` |

## Development Rules

1. Read AGENTS.md before starting any task
2. Follow the brand identity — never invent a new visual style
3. Use existing components from `src/components/ui/`
4. Server Components by default; Client Components only for interactivity
5. Never expose secrets to browser (Supabase secret keys, Resend API keys)
6. Validate on server — never trust client-only validation
7. Don't invent data — no fake speakers, sponsors, or unconfirmed info
8. Update documentation after completing significant tasks

## Color Palette

| Color | HEX | Role |
|---|---|---|
| Navy | `#0B1F44` | Primary dark, borders, text |
| Sky Blue | `#7CCBFF` | Primary accent, buttons |
| Light Blue | `#E2F0FF` | Main backgrounds |
| Lavender | `#B794F4` | Secondary accent |
| Soft Orange | `#FF9F43` | Highlights |
| White | `#FFFFFF` | Neutral surface |

## Admin Roles

| Role | Access |
|---|---|
| Super Admin | Full system control |
| Admin | General event management |
| HR | Registrations, volunteers |
| BR | Speakers, sponsors |
| Organizing | Agenda, check-in, attendance |
| Media | Website content, assets |
