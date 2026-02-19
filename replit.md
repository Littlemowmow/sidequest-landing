# SideQuest Landing Page

## Overview

SideQuest is a pre-launch landing page for a college-focused group trip planning app. The app solves the problem of trip ideas dying in group chats by providing tools for destination voting, budget alignment, expense splitting, and shared itineraries. The landing page collects waitlist signups with referral tracking, showcases the app's value proposition through visual phone mockups and an interactive demo simulation. Positioning: "Built by college students, for college students" (University of Michigan). iOS-first launch, Spring 2026.

The project is a full-stack TypeScript application with a React frontend and Express backend, using PostgreSQL for waitlist data storage.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework:** React 18 with TypeScript, bundled by Vite
- **Routing:** Wouter (lightweight client-side router) with routes: Home (`/`), Demo (`/demo`), Designs (`/designs`), Quick Poll (`/poll`, `/poll/:shareCode`), and a 404 catch-all
- **Styling:** Tailwind CSS v4 (using `@tailwindcss/vite` plugin) with CSS variables for theming. The design system uses shadcn/ui components (new-york style) built on Radix UI primitives
- **Fonts:** Outfit (display/headlines) and Inter (body text), loaded from Google Fonts
- **Animations:** Framer Motion for scroll animations, parallax effects, and interactive transitions
- **State Management:** TanStack React Query for server state; local React state for UI
- **Component Structure:** 
  - `client/src/components/ui/` — Reusable shadcn/ui primitives (buttons, cards, dialogs, etc.)
  - `client/src/components/landing/` — Page-specific sections (Hero, ProblemSection, FeaturesSection with phone mockups, ContentSection as Launch Cities grid, ComparisonSection, WaitlistSection, FAQSection, Footer, SocialProofSection marquee)
  - `client/src/components/layout/` — Layout components (Navbar)
- **Path aliases:** `@/` maps to `client/src/`, `@shared/` maps to `shared/`

### Backend
- **Framework:** Express.js running on Node.js with TypeScript (compiled via tsx)
- **Server setup:** HTTP server created with `createServer`, supports both development (Vite dev server middleware with HMR) and production (static file serving from `dist/public`)
- **API routes:** REST API under `/api/` prefix:
  - `POST /api/waitlist` — Submit email to waitlist with optional destination, travel date, university, and referral tracking. Generates a unique referral code per user.
  - `GET /api/waitlist/count` — Returns total waitlist signup count
  - `POST /api/polls` — Create a new quick poll with question, options, category, and creator name. Returns a unique share code.
  - `GET /api/polls/:shareCode` — Get poll details and vote counts (voter names excluded for privacy)
  - `POST /api/polls/:shareCode/vote` — Cast a vote on a poll (one vote per name enforced via DB unique constraint)
- **Input validation:** Zod schemas (generated from Drizzle schema via `drizzle-zod`) validate all API inputs

### Database
- **Database:** PostgreSQL, connected via `pg` Pool
- **ORM:** Drizzle ORM with PostgreSQL dialect
- **Schema location:** `shared/schema.ts` — shared between frontend and backend
- **Schema:** Three tables:
  - `waitlist_entries`: id, email (unique), destination, travel_date, travel_type, university, referral_code, referred_by, created_at
  - `polls`: id, share_code (unique), question, options (text array), category, created_by, created_at
  - `poll_votes`: id, poll_id (FK to polls with cascade delete), option_index, voter_name, created_at. Unique constraint on (poll_id, voter_name)
- **Migrations:** Managed via `drizzle-kit push` (schema push approach, not migration files)
- **Storage pattern:** `server/storage.ts` implements an `IStorage` interface with a `DatabaseStorage` class, making it straightforward to swap implementations

### Build System
- **Development:** `tsx server/index.ts` runs the server which sets up Vite dev middleware for HMR
- **Production build:** Custom build script (`script/build.ts`) that runs Vite build for client assets and esbuild for server code, outputting to `dist/`
- **The server bundle** is output as `dist/index.cjs` (CommonJS) with select dependencies bundled for faster cold starts

### Key Design Decisions
- **Shared schema:** The `shared/` directory contains Zod schemas and TypeScript types used by both frontend and backend, ensuring type safety across the stack
- **No authentication:** This is a pre-launch landing page; no user auth system exists. The waitlist is the primary conversion mechanism
- **Referral system:** Each waitlist signup generates a unique referral code. Users can share `?ref=CODE` URLs to track referrals
- **Dark theme:** Black background (hsl(0 0% 4%)) with white text, dark cards (white/5-10 opacity), orange (#F97316) as primary accent, cool blue accent for contrast. CSS variables define the theme in `client/src/index.css`
- **Narrative arc:** Hero (aspirational + gut punch) → Marquee (college trips) → Problem (iMessage demo) → Solution (phone mockups) → Comparison → Launch Cities → FAQ → Waitlist
- **Target audience:** College students, specifically positioned around University of Michigan origin story
- **CTA language:** "Claim Your Spot" used consistently across hero, waitlist, and mobile nav

## External Dependencies

- **PostgreSQL** — Primary database, connected via `DATABASE_URL` environment variable (required)
- **Google Fonts** — Outfit and Inter font families loaded via CDN
- **Unsplash** — External images used in demo page for destination cards
- **Pravatar** — Mock avatar images used in demo simulation (`i.pravatar.cc`)
- **canvas-confetti** — Client-side confetti animation library used in the demo flow
- **Resend** — Email service for sending waitlist confirmation emails (via Replit connector integration). Connected through `server/resend.ts` and `server/email.ts`
- **No external auth providers** — The app is self-contained with no user authentication