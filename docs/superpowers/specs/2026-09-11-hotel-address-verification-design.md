# Hotel address verification

An indexed hotel must be priced on the region it is actually in. Today that
rests on a single piece of evidence — the text Google returns for its address —
and where that text is thin or the hotel cannot be identified, nothing catches
a wrong region. This design replaces the single source with three independent
ones and a rule for what to do when they disagree.

Supersedes the evidence model in
`docs/superpowers/specs/2026-09-10-hotel-region-audit-design.md`; the audit's
structure (checkpoint, buckets, input hashes, guard test) carries over
unchanged.

## Why

Two hotels were quoted on the wrong region and found by hand, not by the audit.
Tracing them exposed three holes, measured against the 2026-09-11 report
(1246 hotels: 1165 ok, 3 fix, 7 unresolved, 71 identity).

**An ilçe name is accepted as belde evidence.** `ADDRESS_REGION_TERMS` in
`scripts/lib/hotel-region-matching.mjs` lists `manavgat` among `side`'s terms
and `kemer` among `kemer`'s. Both ilçeler span two price regions — Manavgat
holds Side (€50) and Kızılağaç (€70), Kemer holds Kemer (€55) and Tekirova
(€75) — so an address naming only the ilçe cannot tell the cheap belde from the
dear one. **72 rows are `ok` on exactly that evidence** (52 kemer, 20 manavgat),
every one of them on the cheap side. Two are demonstrably wrong: Caner Mountain
Hotel sits 74 km out in a region whose verified hotels span 44–68 km, and La
Benata Hotel 90 km where Side spans 55–71 km. The skill's own rule already
forbids this ("Never add a term that spans two price regions"); it was never
enforced in code. Kaş and Kumluca also appear as their own belde terms but each
ilçe holds a single price region, so they are unaffected.

**A failed identity check discards good location evidence.** 74 rows have no
address evidence at all because the Place could not be identified: 44 on name,
18 on type, 5 on status, 7 unresolved. Type and status say nothing about where a
place is — a pansiyon listed as a restaurant, or flagged temporarily closed,
still sits where it sits. Those 23 rows are unverified only because the gate is
stricter than the question being asked.

**The coordinate is fetched and thrown away.** `scripts/lib/hotel-discovery-pilot.mjs:160`
requests `places.location` and never reads it; `scripts/audit-hotel-regions.mjs:99`
does not request it at all. A coordinate is independent of both failure modes
above — it does not care how Google phrases an address or whether the name
matches. The ministry dataset (`scripts/hotel-discovery-pilot/unverified-ministry.json`,
456 records) was considered as a second source and rejected: it carries ilçe
only, no belde and no address, so it reproduces the weakness it would have to
fix.

## Evidence model

Three sources, each resolving to a pricing region or to nothing.

| # | Evidence | Source | Blind where |
|---|---|---|---|
| 1 | Belde name in address components | Places `addressComponents` | Address names only the ilçe |
| 2 | Coordinate snapped to nearest belde reference point | Places `location` | Place ID points at the wrong business |
| 3 | AYT driving km inside the region's band | `src/hotel-distances.js`, already stored | Regions with a wide km spread (antalya: 3–60 km) |

**A row is `ok` when at least two sources name the same region.** One source
alone never confirms, so no single source's error can price a hotel by itself.

When the sources conflict, or only one speaks, the candidate set is the union of
the regions they name and the hotel is written to **the dearest candidate**,
then reported. Bounding candidates by what the evidence actually named is what
keeps this from pricing an unidentifiable pension at Kaş rates; with no evidence
at all the row stays where the index put it and is reported as such.

### Source 1 — belde name

`manavgat` is removed from `side`'s term list and `kemer` from `kemer`'s. An
address resolving only to an ilçe yields no source-1 region. The ilçe gate (the
third tuple element) is unchanged and still scopes belde terms to their ilçe.

### Source 2 — coordinate

The audit's field mask gains `location`. Belde reference points are **our own
data**, hand-written once into a new table in `scripts/lib/hotel-region-matching.mjs`:
one coordinate per pricing region, placed at the centre of that belde's hotel
strip. A coordinate resolves to the region whose reference point is nearest.

Because the Antalya coast is effectively linear and the regions are contiguous
segments of it, nearest-point assignment is sufficient; polygons are not worth
their maintenance cost. A coordinate whose nearest reference point is further
than 15 km yields no source-2 region rather than a bad one.

### Source 3 — km band

Each region's band is the 5th–95th percentile of stored km across hotels whose
**sources 1 and 2 agree** — never the whole index, so a misassigned hotel cannot
widen the band that would have caught it. Bands are recomputed by the audit and
written to the checkpoint as derived values. A hotel inside exactly one region's
band (±2 km tolerance) yields that region; inside several or none, nothing.

Measured today, bands separate cleanly where it matters: bogazkent 41–44 against
belek 26–42, tekirova 75–78 against kemer 44–68, kizilagac 80–88 against side
55–71. `antalya` spans 3–60 km and contributes little there, which is acceptable
since every district inside it carries the same price.

## Identity gate

`type` and `status` mismatches stop invalidating sources 1 and 2. They are
recorded on the row as notes and surface in the report, but a hotel is no longer
unverified for being listed under an unusual category or flagged closed.

A `name` mismatch still invalidates sources 1 and 2, because there the Place may
genuinely describe a different business. Such a row falls to source 3 alone,
which by the two-source rule cannot confirm it, so it takes the dearest-candidate
path and is reported.

`LODGING_PLACE_TYPES` and `STRICT_HOTEL_TYPES` remain, now feeding the report
rather than the pass/fail decision. `gone` (permanently closed) is unchanged and
still an operator decision.

## Persistence

`scripts/audit-hotel-regions.mjs:58` refuses to write raw Places content to
disk, `location` included. That guard stays exactly as it is. Coordinates are
fetched, resolved in memory, and discarded; the checkpoint gains only derived
values, alongside the existing `derivedRegion` and `matchedTerm`:

- `addressRegion` — source 1 result, or null
- `locationRegion` — source 2 result, or null
- `bandRegion` — source 3 result, or null
- `agreeingSources` — how many named the winning region
- `candidateRegions` — the union, when the dearest-candidate rule fired

The existing `inputHash` extends to cover the reference-point table and the band
definition, so changing either invalidates affected rows automatically, as
changing the matching rules already does.

## Guard test

`src/hotel-region-audit.test.js` gains two checks alongside the existing
`checked`/hash one, both running with no API calls so CI catches a regression
without network:

- every indexed hotel's km falls inside its region's band, or its slug is
  allowlisted with a reason and a date
- every row marked `ok` records `agreeingSources >= 2`

`UNAUDITED_HOTEL_SLUGS` keeps its shape and its one-line-reason discipline.

## Expected effect

A full pass is expected to move **Caner Mountain Hotel** to tekirova and **La
Benata Hotel** to kizilagac (+€20 per vehicle each), and to flag **Throne
Nilbahir Resort & Spa** for research — 93 km, outside every band, priced as side
(€50) where its distance suggests alanya_bati (€70). The remaining 70 ilçe-evidence
rows are expected to confirm in place on sources 2 and 3, so this is not a
broad price rise. Roughly 23 rows currently failing on type or status should
become verified, and the exemption list should shrink substantially.

These are predictions from the current report, not commitments; the plan treats
the real numbers from the first full pass as the outcome to review.

## Out of scope

Verified rows do not expire. A checkpoint row carries no date, so a hotel that
rebrands or moves keeps its verdict until the rules change. Nothing schedules
the audit either. Both are real gaps and neither caused the wrong prices found
here, so they belong to their own piece of work.

## Testing

Unit tests in `scripts/lib/hotel-region-matching.test.mjs` cover: an ilçe-only
address yielding no source-1 region; a coordinate snapping to the nearest belde
and yielding nothing beyond 15 km; band membership at the edges and with the ±2
km tolerance; the two-source rule confirming and refusing; and the
dearest-candidate rule on a conflict and on a single source.

A fixture-driven test in `src/hotel-region-audit.test.js` replays the three
known cases — Orange County Belek, Caner Mountain, La Benata — through the
resolver and asserts the region each lands on, so the regression that started
this work stays caught.
