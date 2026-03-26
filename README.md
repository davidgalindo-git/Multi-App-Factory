# Multi-App Factory
High-speed app generation for AI agents.

## Project Mission
Multi-App Factory is a specialized environment built for generating SaaS applications at high speed with AI agents such as `Cursor`, `Windsurf`, and `Replit`.

The factory takes a product brief and converts it into a deployable Next.js app, backed by Supabase (data + auth) and Stripe (subscriptions).

## The Chassis
This project reuses a proven SaaS architecture as an AI-first generation chassis.

We reuse the proven architecture as an AI-first generation chassis, with the core stack:

- Next.js (App Router, `14/15`-compatible)
- Supabase (Postgres + Auth)
- Stripe (subscriptions via webhooks)
- `shadcn/ui` (Tailwind-based UI primitives)

## AI Factory Workflow
The generation loop is intentionally simple and repeatable:

1. **Step A: Define PRD in `.cursorrules`**  
   Write the PRD, acceptance criteria, and constraints directly into `.cursorrules` so the agent has an authoritative spec.

2. **Step B: Use Cursor Composer to generate features into the chassis**  
   Open the repo in `Cursor`, start `Composer`, and attach your updated spec (including `.cursorrules`). The agent implements UI + server-side feature logic aligned to the existing architecture.

3. **Step C: Deploy instantly to Vercel**  
   Push/deploy to `Vercel`. With Supabase + Stripe environment variables configured, the generated app comes online immediately.

## Project Setup
Simplified setup for Supabase and Stripe so you can run the generation chassis locally and in deployment.

### Supabase
1. Rename `.env.local.example` to `.env.local`.
2. Start Supabase locally:
   ```bash
   pnpm supabase:start
   ```
3. Copy `service_role_key` output into `.env.local` as `SUPABASE_SERVICE_ROLE_KEY`.
4. Confirm `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set (printed by Supabase during startup/status).

Optional (production URL correctness):
- In your Supabase project, set the production URL in `auth > URL configuration`.
- In Vercel, set `NEXT_PUBLIC_SITE_URL` to the same value (Production environment variable).

### Stripe
1. Ensure Stripe **Test Mode** is enabled.
2. In Stripe dashboard, copy:
   - `Publishable key` -> `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `Secret key` -> `STRIPE_SECRET_KEY`
3. Start local webhook forwarding (endpoint must match the repo):
   ```bash
   stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
   ```
4. Copy the printed webhook signing secret (e.g. `whsec_...`) into `.env.local` as `STRIPE_WEBHOOK_SECRET`.

Optional (bootstrap products/pricing fixtures):
- Edit `utils/stripe/fixtures/stripe-fixtures.json`, then run:
  ```bash
  pnpm stripe:fixtures
  ```

### Run locally
```bash
pnpm install
pnpm dev
```

If you are testing webhooks locally, keep `stripe listen` running in a separate terminal while `pnpm dev` runs.
