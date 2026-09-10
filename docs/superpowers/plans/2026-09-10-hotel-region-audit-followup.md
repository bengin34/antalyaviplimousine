# Hotel region audit follow-up

The previous session stopped after commit `aa52f6d`. Its handoff reported five
review findings but included only the stale-classification finding, not the
complete review. This follow-up independently checked the audit runner and
German hotel pages rather than assuming the missing findings.

## Changes

- Checkpoint results now carry a SHA-256 fingerprint of the classifier and
  address/name matching code, hotel name/aliases/region/source, stored Place ID,
  and route prices. Changed inputs invalidate old results automatically.
- Pending, failed, and non-ok results cannot retain `checked: true`. The runner
  revokes stale flags before fetching, including when a run is interrupted.
- The audit guard requires current successful checkpoint evidence for every
  checked hotel. Incomplete runs exit nonzero, and Places requests time out.
- German hotel descriptions, social metadata, Offer prices, and FAQ schema use
  the same indexed pricing region as the visible page. This fixes Utopia World
  (€95 → €90 Vito; €145 → €115 Sprinter) and Sentido Gold Island, Q Premium,
  and Kirman Arycanda (€95 → €70 Vito; €145 → €90 Sprinter).
- The hotel region typedef now includes Antalya, and generated distance-file
  instructions no longer suggest manually setting checked flags.

## Live verification

All 1,245 indexed hotels were fetched again with current rules on 2026-09-10.
The legacy checkpoint lacked fingerprints, so the pass included every bucket,
not just the 814 rows identified as stale in the handoff.

| Bucket | Before | After |
| --- | ---: | ---: |
| ok | 1,164 | 1,164 |
| fix | 3 | 3 |
| unresolved | 7 | 7 |
| identity | 71 | 71 |
| gone | 0 | 0 |

No hotel changed bucket. There were zero failures and zero pending rows.
The existing 81 reasoned allowlist entries remain unchanged; this pass does
not resolve those exceptions. A subsequent run used zero API calls.

Run `node scripts/audit-hotel-regions.mjs` with the existing Places API key to
resume after interruption. Avoid repeating `--redo` while resuming, since it
deliberately discards the selected bucket's results. Any matching-rule change
invalidates affected fingerprints and requires fresh evidence before the
audit guard passes again.

Validation: 615 tests passed across 49 files; TypeScript typecheck passed;
the public build completed. The four affected generated HTML files were
checked directly for their Vito and Sprinter structured Offer prices.
