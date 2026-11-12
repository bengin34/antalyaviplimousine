# Security audit — Antalya VIP (MEN-218)

**Run status: INCOMPLETE** (`session_time_limit_candidates_unvalidated`). Profile `quick`, scope: whole repo, source-only. **Partial coverage.** No prior ledger exists for this repo.

Candidate validation is incomplete: 6 hunter candidates were NOT independently validated (units in `coverage-ledger.json` with status `candidate`, fingerprints below). No final coverage critic ran. Reconnaissance was done by the parent, not by agents. 3 hunters + 1 verifier ran (budget 12). No target code was executed (no OS sandbox with all four controls); `npm audit` and git-history greps are our own read-only checks.

## Counts

| critical | high | medium | low | info | needs_validation | rejected | unvalidated candidates |
|---|---|---|---|---|---|---|---|
| 0 | 0 | 1 | 0 | 0 | 0 | 0 (see below) | 6 |

## Confirmed
- **vip/server-price-region-hotel-mismatch** (medium): arrival / hotel-to-hotel card price comes from the client region, not the hotel. `create-booking/index.ts:148,251,417,425`, `transfer-price.ts:42`. Not fixed here (changes who may pay by card; `resolveHotelRegion` looseness unchecked). Follow-up **MEN-242**.

## Unvalidated candidates (follow-up issues, Backlog)
| fingerprint | where | issue |
|---|---|---|
| vip/admin-users-seeded-from-open-signup | `20260916090000_restrict_authenticated_to_admins.sql:51-54` | MEN-243 (Engin: dashboard/SQL check) |
| vip/admin-csv-formula-injection | `admin/react/lib/ledger-csv.ts:17-21` | MEN-244 |
| vip/no-rate-limit-public-endpoints | `create-booking`, `verify-flight`, `site_events` | MEN-245 (fixed; Engin: check Resend cap + Supabase Auth/API limits in dashboards) |
| vip/checkout-token-overwrite-unauth | `create-iyzico-checkout/index.ts:161-168` | MEN-246 |
| vip/forged-payment-success-ga4-purchase | `BookingForm.tsx:384-393` | MEN-246 |

## Reviewed and clean (source evidence, not proof)
- Paid-status forgery: `iyzico-callback/index.ts:63-115` needs stored token, HMAC signature, basket/conversation binding, EUR amount equal to DB price, and `status='pending'` guard (replay, MEN-194).
- Client price: never read; always recomputed from `routes`/rate tables.
- RLS: every table RLS-enabled; anon has no PII read; `bookings` anon policies dropped in `003_configure_iyzico.sql:18-19`; SECURITY DEFINER functions guarded; `admin_users` not writable by users.
- XSS: no `dangerouslySetInnerHTML`; legacy `innerHTML` sinks take static/translation text; admin popup HTML escaped (`BudgetPage.tsx:44-56`).
- No open redirect (`iyzico-callback` redirects only to `PUBLIC_SITE_URL`); `target=_blank` uses `rel`.
- Secrets: no tracked `.env`/key files other than `.env.example`; no private keys, `sk_*` keys, or service-role JWT assignments in git history. JWTs in old built bundles are Supabase anon keys (public by design). No rotation needed.
- Supply chain: `deploy.yml` triggers on push/dispatch only, minimal permissions, actions version-pinned (not SHA-pinned: hardening only).

## Rejected / informational (no boundary result)
- Missing CSP/security headers: GitHub Pages cannot set headers; no reachable XSS sink (anti-pattern 1).
- `zod <4.6.6` DoS (`npm audit`, high): used only for client-side form validation, self-impact only. Bump when convenient.
- CORS `*` on edge functions: no cookies or ambient credentials.
- Admin session in localStorage on the same origin as the public site: hardening only, no XSS found.
- Stale anon default grants on price tables: blocked by RLS.
