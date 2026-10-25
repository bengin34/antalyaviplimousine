// scripts/build-hotel-distances.mjs
/**
 * Generates src/hotel-distances.js — one-way driving km from Antalya Airport
 * (AYT) to each indexed hotel — by geocoding the hotel (Places Text Search) and
 * routing to it (Routes API computeRoutes).
 *
 * Incremental by default: only hotels missing a km are fetched, so re-running
 * after adding hotels to the index costs only the new ones. Existing rows — and
 * always checked:true rows — are preserved.
 *
 *   export GOOGLE_MAPS_API_KEY="AIza…"
 *   node scripts/build-hotel-distances.mjs            # gap-fill
 *   node scripts/build-hotel-distances.mjs --refresh  # re-pull all but checked
 *   node scripts/build-hotel-distances.mjs --only voyage-sorgun
 *
 * Writes src/hotel-distances.js, src/hotel-places.js and
 * scripts/hotel-distances.report.json.
 */
import { writeFile } from "node:fs/promises";
import { hotelIndex } from "../src/hotel-index.js";
import { routeCatalog } from "../src/routes.js";
import { slugsToProcess, applyResult, routeDestination, renderHotelDistancesFile, renderHotelPlacesFile, withPlaces } from "./lib/hotel-distances-merge.mjs";
import { distanceToleranceKm, isPlausibleHotelDistance } from "../src/hotel-distance-lookup.js";
import { hotelDistances as leanExisting } from "../src/hotel-distances.js";
import { hotelPlaces } from "../src/hotel-places.js";

// A gap-fill run must see the Place IDs it recorded last time, so the two
// generated files are read back as the single record they describe.
const existing = withPlaces(leanExisting, hotelPlaces);

const AYT = { lat: 36.898701, lng: 30.800545 };
const KEY = process.env.GOOGLE_MAPS_API_KEY || process.env.GOOGLE_PLACES_API_KEY;
if (!KEY) { console.error("Set GOOGLE_MAPS_API_KEY (or GOOGLE_PLACES_API_KEY)"); process.exit(1); }

const args = process.argv.slice(2);
const opts = {
  refresh: args.includes("--refresh"),
  only: args.includes("--only") ? args[args.indexOf("--only") + 1] : undefined,
};

// A hard search box around AYT, sized to how far the hotel's region sits from
// the airport. A same-name hotel resolves to the one at the right distance:
// "Artemis" in the 15 km antalya region can't match Kaş Artemis 185 km away,
// while a Kaş hotel (185 km region) still gets a box wide enough to include it.
// Centered on AYT with a generous floor so a whole region always fits.
function searchBox(hotel) {
  const regionKm = routeCatalog[hotel.region]?.distanceKm ?? 50;
  const halfKm = Math.max(regionKm * 1.6, 35);
  const latSpan = halfKm / 111;
  const lngSpan = halfKm / (111 * Math.cos((AYT.lat * Math.PI) / 180));
  return {
    low: { latitude: AYT.lat - latSpan, longitude: AYT.lng - lngSpan },
    high: { latitude: AYT.lat + latSpan, longitude: AYT.lng + lngSpan },
  };
}

async function geocode(hotel) {
  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": KEY,
      "X-Goog-FieldMask": "places.id,places.location,places.displayName",
    },
    body: JSON.stringify({
      textQuery: `${hotel.name}, ${hotel.district}, Antalya, Turkey`,
      locationRestriction: { rectangle: searchBox(hotel) },
    }),
  });
  if (!res.ok) throw new Error(`Places ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const json = await res.json();
  const place = json.places?.[0];
  if (!place) return null;
  return { place: place.id, lat: place.location.latitude, lng: place.location.longitude, matched: place.displayName?.text };
}

async function drive(destination) {
  const res = await fetch("https://routes.googleapis.com/directions/v2:computeRoutes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": KEY,
      "X-Goog-FieldMask": "routes.distanceMeters",
    },
    body: JSON.stringify({
      origin: { location: { latLng: { latitude: AYT.lat, longitude: AYT.lng } } },
      destination,
      travelMode: "DRIVE",
    }),
  });
  if (!res.ok) throw new Error(`Routes ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const json = await res.json();
  const meters = json.routes?.[0]?.distanceMeters;
  return Number.isFinite(meters) ? Math.round(meters / 1000) : null;
}

const bySlug = new Map(hotelIndex.map((h) => [h.slug, h]));
const todo = slugsToProcess(hotelIndex, existing, opts);
console.error(`Processing ${todo.length} of ${hotelIndex.length} hotels`);

let data = existing;
const report = [];
for (const slug of todo) {
  const hotel = bySlug.get(slug);
  let result = null, matched = null;
  try {
    const geo = hotel.placeId ? null : await geocode(hotel);
    if (hotel.placeId || geo) {
      const km = await drive(routeDestination(hotel, geo));
      const place = hotel.placeId ?? geo.place;
      if (km != null) {
        result = { km, place };
        matched = hotel.placeId ? hotel.name : geo.matched;
      }
    }
  } catch (err) {
    console.error(`  ${slug}: ${err.message}`);
  }
  data = applyResult(data, hotel, result);
  // An OUTLIER row is one the profit model will refuse to cost on until a
  // human confirms it — same tolerance, from the same module, so the report
  // and the runtime cannot drift apart. Review these and either correct the
  // hotel's district or flip `checked: true` on the row.
  const regionKm = routeCatalog[hotel.region]?.distanceKm ?? null;
  const dev = result && regionKm ? Math.round(((result.km - regionKm) / regionKm) * 100) : null;
  const outlier = result && regionKm != null && !isPlausibleHotelDistance(result.km, regionKm);
  report.push({ slug, name: hotel.name, district: hotel.district, region: hotel.region,
    km: result?.km ?? null, regionKm, deviationPct: dev,
    toleranceKm: regionKm == null ? null : Math.round(distanceToleranceKm(regionKm)), matched,
    flag: outlier ? "OUTLIER" : (result ? "" : "NO-MATCH") });
  await new Promise((r) => setTimeout(r, 120)); // gentle throttle
}

await writeFile(new URL("../src/hotel-distances.js", import.meta.url), renderHotelDistancesFile(data));
await writeFile(new URL("../src/hotel-places.js", import.meta.url), renderHotelPlacesFile(data));
await writeFile(new URL("./hotel-distances.report.json", import.meta.url), JSON.stringify(report, null, 2));
console.error(`Wrote ${Object.keys(data).length} rows. Outliers/no-match: ${report.filter((r) => r.flag).length}`);
