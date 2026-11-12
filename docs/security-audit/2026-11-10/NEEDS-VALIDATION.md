# Needs validation / unvalidated candidates

No record carries the `needs_validation` verdict: no fresh verifier ran for these, so they are candidates in the coverage ledger, not findings.

1. **vip/admin-users-seeded-from-open-signup** (MEN-243). Blocker: dashboard facts. Owner check: `admin_users` joined to `auth.users` contains only intended operators; email signup disabled in the Supabase Auth settings.
2. **vip/checkout-token-overwrite-unauth** (MEN-246). Blocker: whether iyzico still accepts an older checkout token after a newer one is issued; needs iyzico sandbox, not allowed in this run.
3. **vip/no-rate-limit-public-endpoints** (MEN-245). Blocker: Supabase/edge rate limits and the Resend / RapidAPI quotas live in dashboards.
4. **vip/admin-csv-formula-injection** (MEN-244). Blocker: confirm `row.passenger` is raw `customer_name` and how Excel opens the `;`-separated BOM file; needs a sandboxed local test.
5. **vip/forged-payment-success-ga4-purchase** (MEN-246). Blocker: whether gtag fires without consent and whether Ads imports `purchase`.
