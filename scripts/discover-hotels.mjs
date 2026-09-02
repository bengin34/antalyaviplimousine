// scripts/discover-hotels.mjs
/**
 * Discovers lodging in the Antalya tourist belt via Google Places (New)
 * searchNearby, then reports which ones are NOT already in the hotel index.
 *
 * The distance builder only geocodes hotels already listed; it cannot tell you
 * what is missing. This does the opposite: it sweeps the coast for lodging
 * Google knows about and diffs it against the 870-row index by slug.
 *
 * searchNearby returns at most 20 places per call and has no pagination, so the
 * belt is covered by a grid of small overlapping circles (radius > tileStep/√2)
 * and results are deduped by place id.
 *
 *   export GOOGLE_MAPS_API_KEY="AIza…"
 *   node scripts/discover-hotels.mjs --dry     # print tile/cost estimate only
 *   node scripts/discover-hotels.mjs           # sweep, write outputs
 *
 * Writes:
 *   src/hotel-index-discovered.js        — missing rows as [name, district] tuples
 *   scripts/discovered-hotels.report.json — every place found, with in-index flag
 */
import { writeFile } from "node:fs/promises";
import { hotelIndex, hotelSlug, districtRegions } from "../src/hotel-index.js";
import { hotelCatalog } from "../src/hotels.js";

const KEY = process.env.GOOGLE_MAPS_API_KEY || process.env.GOOGLE_PLACES_API_KEY;
if (!KEY) { console.error("Set GOOGLE_MAPS_API_KEY (or GOOGLE_PLACES_API_KEY)"); process.exit(1); }
const DRY = process.argv.includes("--dry");

const TILE_M = 1500;   // circle radius per tile; must exceed (step·111000)/√2 to leave no gap
const STEP = 0.019;    // ~2.1 km lat step → 1500 m radius overlaps

// Tourist belt zones: coastal strips only, not the whole province. Each row's
// `district` must exist in districtRegions so a missing row can later be
// appended to the index without an unmapped-district error.
const ZONES = [
  { district: "Konyaaltı",     box: [36.850, 30.560, 36.900, 30.700] }, // Konyaaltı beach
  { district: "Antalya merkez", box: [36.860, 30.700, 36.910, 30.760] }, // centre / old town
  { district: "Lara",          box: [36.840, 30.790, 36.880, 30.900] }, // Lara–Kundu
  { district: "Belek",         box: [36.830, 30.980, 36.880, 31.120] }, // Belek–Kadriye–Boğazkent
  { district: "Side",          box: [36.755, 31.280, 36.800, 31.430] }, // Side–Çolaklı–Sorgun
  { district: "Okurcalar",     box: [36.610, 31.560, 36.660, 31.720] }, // Okurcalar–Avsallar–İncekum
  { district: "Alanya merkez", box: [36.520, 31.940, 36.560, 32.080] }, // Alanya centre–Kestel–Mahmutlar
  { district: "Kemer merkez",  box: [36.480, 30.480, 36.660, 30.590] }, // Beldibi–Kemer–Tekirova
];

function tiles() {
  const out = [];
  for (const z of ZONES) {
    const [minLat, minLng, maxLat, maxLng] = z.box;
    // step longitude wider than latitude: a degree of lng is shorter this far north
    const lngStep = STEP / Math.cos((minLat * Math.PI) / 180);
    for (let lat = minLat; lat <= maxLat + 1e-9; lat += STEP)
      for (let lng = minLng; lng <= maxLng + 1e-9; lng += lngStep)
        out.push({ lat, lng, district: z.district });
  }
  return out;
}

async function nearby(t) {
  const res = await fetch("https://places.googleapis.com/v1/places:searchNearby", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": KEY,
      "X-Goog-FieldMask": "places.id,places.displayName,places.location,places.primaryTypeDisplayName",
    },
    body: JSON.stringify({
      includedTypes: ["lodging"],
      maxResultCount: 20,
      locationRestriction: { circle: { center: { latitude: t.lat, longitude: t.lng }, radius: TILE_M } },
    }),
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  const json = await res.json();
  return json.places ?? [];
}

const grid = tiles();
console.error(`${ZONES.length} zones → ${grid.length} tiles. searchNearby ≈ $32/1000 → ~$${(grid.length * 0.032).toFixed(2)}`);
if (DRY) process.exit(0);

// Existing names, normalised to the same slug the index uses, so a discovered
// hotel counts as "known" when its slug already appears anywhere in the index
// or the verified catalogue.
const known = new Set([
  ...hotelIndex.map((h) => h.slug),
  ...Object.values(hotelCatalog).map((h) => hotelSlug(h.name)),
]);

const found = new Map(); // place id → { name, district, lat, lng, type, slug }
for (const [i, t] of grid.entries()) {
  try {
    for (const p of await nearby(t)) {
      const name = p.displayName?.text;
      if (!name || found.has(p.id)) continue;
      found.set(p.id, {
        name,
        district: t.district,
        lat: p.location?.latitude,
        lng: p.location?.longitude,
        type: p.primaryTypeDisplayName?.text ?? null,
        slug: hotelSlug(name),
      });
    }
  } catch (err) {
    console.error(`  tile ${i} (${t.lat.toFixed(3)},${t.lng.toFixed(3)}): ${err.message}`);
  }
  if ((i + 1) % 25 === 0) console.error(`  ${i + 1}/${grid.length} tiles, ${found.size} places`);
  await new Promise((r) => setTimeout(r, 90));
}

const all = [...found.values()];
const missing = all.filter((p) => !known.has(p.slug));
// de-dupe missing by slug (two tiles, one hotel, different place ids can share a slug)
const missingBySlug = new Map(missing.map((p) => [p.slug, p]));
const rows = [...missingBySlug.values()].sort((a, b) => a.name.localeCompare(b.name));

const report = all
  .map((p) => ({ name: p.name, district: p.district, type: p.type, inIndex: known.has(p.slug) }))
  .sort((a, b) => a.name.localeCompare(b.name));

const file = `// Generated by scripts/discover-hotels.mjs — lodging found in the Antalya
// tourist belt via Google Places that is NOT yet in the hotel index. Unreviewed
// by definition: a maps sweep is not the operator's record. Kept SEPARATE from
// the index; promote rows into hotel-index only after a human check.
//
// district is the sweep zone the place fell in, not a verified address — good
// enough to pre-select a region, no more. Each district here exists in
// districtRegions, so a row can be moved into the index unchanged.
//
// @type {import("./hotel-index.js").HotelSeedRow[]}
export const discoveredHotels = [
${rows.map((p) => `  [${JSON.stringify(p.name)}, ${JSON.stringify(p.district)}],`).join("\n")}
];
`;
await writeFile(new URL("../src/hotel-index-discovered.js", import.meta.url), file);
await writeFile(new URL("./discovered-hotels.report.json", import.meta.url), JSON.stringify(report, null, 2));

const unmapped = rows.filter((p) => !districtRegions[p.district]);
console.error(`Found ${all.length} places, ${rows.length} missing from index → src/hotel-index-discovered.js`);
if (unmapped.length) console.error(`WARN: ${unmapped.length} rows have a district not in districtRegions`);
