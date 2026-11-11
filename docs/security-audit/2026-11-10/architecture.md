# Architecture (Antalya VIP, `1d4d7287`)

- Public site: static HTML (`index.html`, localized dirs, `src/main.js`) + React Router app (`public-app/`), built to `dist/`, hosted on GitHub Pages (`public/CNAME`). Pages cannot set response headers.
- Admin SPA: `admin/`, `admin/react/`, same origin. Real gate = Supabase Auth + RLS (`is_admin()` over `admin_users`); the client check is UX only.
- Supabase: tables with RLS in `supabase/migrations/`; anon can only read price tables and insert allow-listed `site_events`. Bookings are created by the service role inside `create-booking`.
- Edge functions: `create-booking` (server-side price), `create-iyzico-checkout`, `iyzico-callback` (`verify_jwt=false`; token + HMAC + amount + pending-guard), `verify-flight` (quota RPC, service role only).
- Third parties: GA4/Google tag (consent-gated), iyzico hosted checkout (redirect), Resend (operator email), RapidAPI (flights).
- Principals: anonymous visitor (public anon key), authenticated non-admin (signup), admin operator.
