# Antalya–Alanya hotel discovery

**Date:** 2026-09-02  
**Status:** Approved design, pending implementation planning

## Problem

The booking form uses a static hotel index. It currently contains 871 rows, but
the Side Sun Hotel example proves that the seed is not complete. The existing
`scripts/discover-hotels.mjs` does not close that gap reliably:

- it searches eight coarse rectangular zones rather than the continuous hotel
  belt;
- Nearby Search (New) returns at most 20 places per request and the script does
  not subdivide a saturated area;
- it searches the broad `lodging` type, which also admits apartments, hostels,
  guest houses, and similar accommodation outside the requested scope;
- its generated rows are not connected to the reviewed index; and
- treating Google Places names as a permanent bulk hotel catalogue conflicts
  with Google's restrictions on pre-fetching, caching, and storing Places
  content. Place IDs are exempt from those caching restrictions, but the other
  returned fields are not.

## Goal

Create a repeatable discovery job that produces a reviewable list of currently
operating classic hotels and resorts missing from the existing index throughout
the Antalya–Alanya tourism belt, including Alanya.

This is discovery only. Region assignment, distance-band assignment, pricing,
and promotion into `src/hotel-index.js` are separate later jobs.

## Scope

### Geography

The scan covers these continuous tourism corridors:

- Beldibi, Göynük, Kemer, Kiriş, Çamyuva, and Tekirova;
- Antalya centre, Konyaaltı, Lara, Kundu, and Aksu;
- Belek, Kadriye, and Boğazkent;
- Side, Kumköy, Evrenseki, Çolaklı, Sorgun, Titreyengöl, Manavgat,
  Kızılağaç, and Kızılot; and
- Okurcalar, İncekum, Avsallar, Türkler, Payallar, Konaklı, Alanya centre,
  Oba, Tosmur, Kestel, Mahmutlar, Kargıcak, and Demirtaş.

Kaş, Kalkan, Finike, Kumluca, Adrasan, inland Antalya, and areas east of
Demirtaş are outside this job.

### Establishments

Include only currently operating classic hotels and resorts:

- Google primary types: `hotel` and `resort_hotel`;
- Google business status: `OPERATIONAL`; and
- Ministry facility types/classes corresponding to hotels, resort hotels, and
  holiday villages with an active operating certificate.

Exclude apartment hotels, hostels, pensions, guest houses, villas, motels,
campgrounds, investment-only/not-yet-open facilities, temporarily closed
facilities, and permanently closed facilities.

### Non-goals

- Do not edit `src/hotel-index.js`, `src/hotels.js`, `src/hotel-distances.js`,
  route regions, distance bands, or prices.
- Do not call Routes API in this phase.
- Do not run discovery during build, tests, deployment, or CI.
- Do not create an admin UI in this phase.
- Do not claim mathematical completeness: Google Places is a ranked search
  service, not a bulk directory. Instead, report any residual saturated cells
  so coverage limitations are explicit.

## Sources and storage policy

### Canonical, persistent names

The Ministry of Culture and Tourism's “Bakanlık Belgeli ve Bakanlığa Başvurusu
Olan Tesisler” search is the canonical source for persistent facility names and
certificate metadata. The importer filters Antalya results to the agreed
facility and operating statuses. Persistent CSV/JSON candidate names must come
from this source or, later, an independently verified first-party hotel source.

The Ministry adapter must preserve source provenance and retrieval time. If the
site does not expose a stable machine-readable request, the adapter may consume
a manually downloaded export/snapshot kept under `docs/hotel-sources/`; it must
not silently fall back to scraping unrelated commercial listing sites.

### Google Places

Google Places is a coverage and current-status verifier, not the permanent name
source. The job may store Google Place IDs indefinitely. Other raw Places
fields—display name, formatted address, coordinates, primary type, and business
status—remain only in the local run checkpoint needed to finish/review the run,
are excluded from git, carry a retrieval timestamp, and are deleted by an
explicit cleanup command. Any UI or report that displays live Google content
must show the required Google Maps attribution.

The implementation plan must include a final check against the Google Maps
Platform terms applicable to the project's billing address. This specification
is an engineering control, not legal advice.

## Architecture

Keep network orchestration thin and move all deterministic decisions into a
pure, testable module.

### `scripts/lib/hotel-discovery.mjs`

Pure functions for:

- generating root cells from an explicit corridor configuration;
- splitting a saturated cell into four child cells;
- determining whether a result lies inside the configured corridor;
- normalising Turkish and international hotel names;
- comparing Place IDs, canonical names, and aliases;
- classifying records as known, missing, or possible duplicate; and
- calculating call counts and cost estimates.

This module performs no filesystem or network operations.

### `scripts/hotel-discovery-zones.mjs`

Human-readable geographic configuration for the tourism corridors. Root cells
tile the corridor with overlap. Each logical square is queried through the
smallest Nearby Search circle that fully contains it; results outside the
logical square/corridor are discarded after the response. This avoids holes
while allowing Google’s circle-only location restriction.

The configuration is discovery geography only. It must not assign pricing
regions or imply a future region mapping.

### `scripts/fetch-ministry-hotels.mjs`

Retrieves or parses the Ministry source, normalises its schema, applies the
agreed facility/status/geography filters, and writes a provenance-bearing
canonical snapshot under `docs/hotel-sources/`. Network access and parsing are
kept separate so saved fixtures can test the parser without calling the live
site.

### `scripts/discover-hotels.mjs`

CLI orchestrator that:

1. loads the canonical Ministry rows and the current hotel index;
2. loads known Google Place IDs from `src/hotel-distances.js`;
3. scans Google Places adaptively;
4. checkpoints after each completed request;
5. deduplicates Google results by Place ID;
6. matches Ministry rows and Google identities against the current index; and
7. writes the review artifacts and coverage report.

## Adaptive scan algorithm

1. Query a root cell once with `includedPrimaryTypes: ["hotel",
   "resort_hotel"]`, `maxResultCount: 20`, `includeFutureOpeningBusinesses:
   false`, and only the minimal Pro field mask required for identity, filtering,
   and review.
2. Retain only results inside the logical corridor and whose business status is
   `OPERATIONAL`.
3. If the API returned fewer than 20 results, mark the cell complete.
4. If the API returned exactly 20 results, treat the cell as saturated, split
   it into four children, and queue the children.
5. Continue until every cell is unsaturated, the minimum cell size is reached,
   or the request budget is exhausted.
6. A cell still returning 20 results at minimum size is recorded as residual
   saturation; it is never silently marked complete.

Overlapping cells are expected. Place ID deduplication makes overlap harmless
and improves boundary coverage.

## Matching and output classification

Matching proceeds from strongest to weakest evidence:

1. exact Google Place ID already present in `src/hotel-distances.js` → known;
2. exact normalised current name or alias → known;
3. unique high-confidence normalised Ministry/Google/current-index name match →
   known;
4. near match, multiple plausible matches, or conflicting identities → possible
   duplicate; and
5. active Ministry hotel with no current-index match → missing.

Fuzzy matching may only route a row to `possible-duplicates`; it must never
silently suppress a candidate as known. Thresholds are constants documented by
tests, not ad-hoc values embedded in the CLI.

Persistent outputs:

- `scripts/hotel-discovery/missing-hotels.json`
- `scripts/hotel-discovery/missing-hotels.csv`
- `scripts/hotel-discovery/possible-duplicates.json`
- `scripts/hotel-discovery/known-hotels.json`
- `scripts/hotel-discovery/google-unmatched-place-ids.json`
- `scripts/hotel-discovery/coverage-report.json`

The missing/known/duplicate files use Ministry names and source metadata.
`google-unmatched-place-ids.json` stores Place IDs and internal review state,
not copied Google names, addresses, or coordinates.

Transient raw Google data and checkpoints live below a gitignored
`scripts/hotel-discovery/.cache/` directory.

## CLI and spend controls

Commands exposed through `package.json`:

```text
npm run discover:hotels -- --dry-run
npm run discover:hotels -- --scan
npm run discover:hotels -- --resume
npm run discover:hotels -- --cleanup-cache
```

- `--dry-run` performs no API calls and prints root-cell count, the hard request
  limit, and list-price exposure.
- `--scan` starts a new run only after printing the same estimate.
- `--resume` continues the checkpoint without repeating completed cells.
- The default and maximum allowed request budget is 4,500 calls. Changing it
  requires a source-code/config change rather than an unbounded CLI value.
- Every HTTP attempt counts against the local conservative request counter,
  including retries and failures.
- Progress is printed at least every 100 calls and includes calls used/limit,
  unique places, missing candidates, saturated cells, and estimated price.

Nearby Search Pro currently has a monthly free usage cap of 5,000 requests and
a list price of USD 32 per 1,000 requests after the cap. The report must not
promise a zero charge because other project usage can consume that monthly cap.
It records both raw list-price exposure and the estimate supplied by the user’s
configured remaining-free-call input. Billing Console remains authoritative.

## Failure handling and resumability

- Authentication, authorization, or invalid-request errors stop immediately;
  continuing cannot repair them.
- HTTP 429 and transient 5xx responses use bounded exponential backoff with
  jitter. Each attempt consumes the local call budget.
- A cell is committed to the checkpoint only after its response is parsed and
  its children, if any, are durably queued.
- Atomic file replacement prevents a partial JSON write from corrupting the
  checkpoint or final reports.
- Ctrl-C leaves a resumable checkpoint and prints the resume command.
- Repeated permanent failure leaves the cell in `failedCells`; it is visible in
  `coverage-report.json` and makes the run incomplete.
- Reaching 4,500 calls stops cleanly. Remaining queued cells and residual
  saturation are reported; partial output is clearly labelled incomplete.

## Observability

`coverage-report.json` includes:

- run ID, start/end time, source retrieval time, and completion status;
- total attempts, successful calls, failed calls, and request limit;
- root, split, completed, failed, queued, and residually saturated cell counts;
- unique operational Place IDs discovered;
- known, missing, possible-duplicate, and unmatched-Place-ID counts; and
- raw list-price exposure plus the configured free-cap estimate.

The operator can independently verify traffic in Google Cloud Console under
**APIs & Services → Places API (New) → Metrics**, filtered to
`places.searchNearby`, and verify cost in **Billing → Reports**, filtered to the
`Places API Nearby Search Pro` SKU.

## Testing

Vitest coverage uses saved fixtures and no live API calls:

- root cells cover every declared corridor fixture point;
- child cells cover their parent logical square without gaps;
- a 19-result cell finishes and a 20-result cell subdivides;
- minimum-size saturation is reported, not discarded;
- overlapping results deduplicate by Place ID;
- only `hotel`/`resort_hotel` and `OPERATIONAL` records survive;
- Ministry parser includes active hotel/holiday-village rows and excludes the
  agreed out-of-scope types/statuses;
- exact Place ID and alias matches classify as known;
- fuzzy or ambiguous names classify only as possible duplicates;
- an unmatched active Ministry row classifies as missing;
- retries consume the budget and the 4,500 limit stops further requests;
- checkpoint resume does not repeat completed cells; and
- report totals reconcile with the classified output rows.

A manual smoke test may make one Nearby Search request with an explicit
`--max-calls-for-smoke 1` development-only guard. The full paid scan is an
operator action after tests and dry-run output are reviewed.

## Acceptance criteria

The discovery phase is complete when:

1. all declared corridor cells are complete, or every exception is explicitly
   present in failed/residually-saturated/queued coverage output;
2. no API call occurred during automated tests or normal builds;
3. only currently operating classic hotels/resorts are candidate rows;
4. every persistent hotel name has Ministry or independent first-party
   provenance;
5. Google-derived persistent data is limited to allowed Place IDs;
6. missing, known, possible-duplicate, and coverage artifacts reconcile; and
7. no production index, region, price, route, or distance file changed.

## Follow-on work

After a human reviews this discovery output:

1. assign accepted missing hotels to commercial regions and price bands;
2. generate/verify their airport driving distances;
3. merge accepted rows into the static index; and
4. run the existing index, distance, search, and pricing guards.

Those steps require their own design/plan and are not part of this feature.
