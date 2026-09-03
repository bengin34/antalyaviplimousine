const METRES_PER_LAT_DEGREE = 111_320;

export const CORRIDOR_RECTS = Object.freeze([
  { id: "kemer", south: 36.45, west: 30.40, north: 36.78, east: 30.68 },
  { id: "antalya", south: 36.80, west: 30.50, north: 36.97, east: 30.99 },
  { id: "belek", south: 36.78, west: 30.97, north: 36.92, east: 31.25 },
  { id: "side", south: 36.68, west: 31.20, north: 36.86, east: 31.65 },
  { id: "alanya-west", south: 36.55, west: 31.55, north: 36.72, east: 31.98 },
  { id: "alanya-east", south: 36.35, west: 31.90, north: 36.62, east: 32.30 },
]);

const DISTRICTS = new Set(["kemer", "konyaalti", "muratpasa", "aksu", "serik", "manavgat", "alanya"]);
const DOCUMENTS = new Set(["turizm isletmesi belgesi", "basit konaklama"]);
const FACILITY_TYPES = new Set(["otel", "hotel", "butik otel", "tatil koyu"]);
const PLACE_TYPES = new Set(["hotel", "resort_hotel"]);

export function foldTurkish(value) {
  return String(value ?? "")
    .replace(/İ/g, "I").replace(/ı/g, "i")
    .normalize("NFD").replace(/\p{M}+/gu, "")
    .toLowerCase().replace(/ğ/g, "g").replace(/ş/g, "s")
    .replace(/ç/g, "c").replace(/ö/g, "o").replace(/ü/g, "u")
    .replace(/&/g, " ").replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
}

const GENERIC_HOTEL_WORDS = new Set(["hotel", "hotels", "otel", "resort", "spa", "the"]);
export function hotelNameKey(value) {
  return foldTurkish(value).split(" ").filter((word) => word && !GENERIC_HOTEL_WORDS.has(word)).join(" ");
}

export function findPossibleCurrentMatch(candidate, currentHotels, threshold = 0.75) {
  const left = new Set(hotelNameKey(candidate.name).split(" ").filter(Boolean));
  if (left.size < 2) return null;
  let best = null;
  for (const hotel of currentHotels) {
    for (const name of [hotel.name, ...(hotel.aliases ?? [])]) {
      const right = new Set(hotelNameKey(name).split(" ").filter(Boolean));
      let shared = 0;
      for (const token of left) if (right.has(token)) shared += 1;
      const score = 2 * shared / (left.size + right.size || 1);
      if (shared >= 2 && score >= threshold && (!best || score > best.score)) {
        best = { slug: hotel.slug, name: hotel.name, score };
      }
    }
  }
  return best;
}

export function extractMinistryRows(html) {
  const marker = "var jsondata =";
  const markerAt = html.indexOf(marker);
  if (markerAt < 0) throw new Error("Ministry jsondata marker not found");
  const start = html.indexOf("[", markerAt + marker.length);
  const end = html.indexOf("];Sys.Application.add_init", start);
  if (start < 0 || end < 0) throw new Error("Ministry jsondata boundary not found");
  return JSON.parse(html.slice(start, end + 1));
}

export function filterMinistryHotels(rows) {
  return rows
    .filter((row) => foldTurkish(row.sehir) === "antalya")
    .filter((row) => DISTRICTS.has(foldTurkish(row.ilce)))
    .filter((row) => DOCUMENTS.has(foldTurkish(row.belgeTuru)))
    .filter((row) => FACILITY_TYPES.has(foldTurkish(row.tesisTuru)))
    .filter((row) => !/(^| )(apart|apartment|aparthotel)( |$)/.test(foldTurkish(row.tesisAdi)))
    .map((row) => ({
      certificateNo: String(row.belgeNo),
      name: String(row.tesisAdi).trim(),
      documentType: String(row.belgeTuru),
      facilityType: String(row.tesisTuru),
      facilityClass: row.tesisSinifi || null,
      city: String(row.sehir),
      district: String(row.ilce),
    }))
    .sort((a, b) => a.name.localeCompare(b.name, "tr"));
}

function zoneCells(rect, sizeM) {
  const cells = [];
  const latStep = sizeM / METRES_PER_LAT_DEGREE;
  for (let south = rect.south, row = 0; south < rect.north; south += latStep, row += 1) {
    const north = Math.min(rect.north, south + latStep);
    const middleLat = (south + north) / 2;
    const lngStep = sizeM / (METRES_PER_LAT_DEGREE * Math.cos(middleLat * Math.PI / 180));
    for (let west = rect.west, col = 0; west < rect.east; west += lngStep, col += 1) {
      cells.push({
        id: `${rect.id}:${row}:${col}`,
        zoneId: rect.id,
        south,
        west,
        north,
        east: Math.min(rect.east, west + lngStep),
        sizeM,
        depth: 0,
      });
    }
  }
  return cells;
}

export function buildRootCells(sizeM = 2000) {
  const zones = CORRIDOR_RECTS.map((rect) => zoneCells(rect, sizeM));
  const cells = [];
  const largest = Math.max(...zones.map((zone) => zone.length));
  for (let index = 0; index < largest; index += 1) {
    for (const zone of zones) if (zone[index]) cells.push(zone[index]);
  }
  return cells;
}

export function selectRootCells(cells, rootOffset = 0) {
  if (!Number.isInteger(rootOffset) || rootOffset < 0 || rootOffset > cells.length) {
    throw new Error(`rootOffset must be an integer from 0 to ${cells.length}`);
  }
  return cells.slice(rootOffset);
}

// Batch 1 only logged aggregate progress every 25 calls. These index ranges
// are the blocks whose queue count proved that no root in the block saturated.
const BATCH_ONE_UNSATURATED_RANGES = [[0, 99], [125, 174], [350, 374], [600, 624], [875, 899]];
export function selectBatchOneRecoveryRoots(cells) {
  return cells.slice(0, 1000).filter((_, index) =>
    !BATCH_ONE_UNSATURATED_RANGES.some(([start, end]) => index >= start && index <= end));
}

export function splitCell(cell) {
  const midLat = (cell.south + cell.north) / 2;
  const midLng = (cell.west + cell.east) / 2;
  return [
    [cell.south, cell.west, midLat, midLng],
    [cell.south, midLng, midLat, cell.east],
    [midLat, cell.west, cell.north, midLng],
    [midLat, midLng, cell.north, cell.east],
  ].map(([south, west, north, east], index) => ({
    ...cell,
    id: `${cell.id}.${index}`,
    south,
    west,
    north,
    east,
    sizeM: cell.sizeM / 2,
    depth: cell.depth + 1,
  }));
}

export function circleForCell(cell) {
  const latitude = (cell.south + cell.north) / 2;
  const longitude = (cell.west + cell.east) / 2;
  const northM = (cell.north - latitude) * METRES_PER_LAT_DEGREE;
  const eastM = (cell.east - longitude) * METRES_PER_LAT_DEGREE * Math.cos(latitude * Math.PI / 180);
  return { center: { latitude, longitude }, radius: Math.ceil(Math.hypot(northM, eastM)) + 5 };
}

export function buildNearbyRequest(cell, key) {
  return {
    url: "https://places.googleapis.com/v1/places:searchNearby",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask": "places.id,places.displayName,places.location,places.primaryType,places.businessStatus",
    },
    body: {
      includedPrimaryTypes: ["hotel", "resort_hotel"],
      maxResultCount: 20,
      includeFutureOpeningBusinesses: false,
      rankPreference: "DISTANCE",
      languageCode: "tr",
      regionCode: "TR",
      locationRestriction: { circle: circleForCell(cell) },
    },
  };
}

const inCell = (latitude, longitude, cell) =>
  latitude >= cell.south && latitude <= cell.north && longitude >= cell.west && longitude <= cell.east;

export function processPlaces(places, cell, { ministryRows, currentHotels }) {
  const ministryByKey = new Map();
  for (const row of ministryRows) {
    const key = hotelNameKey(row.name);
    ministryByKey.set(key, [...(ministryByKey.get(key) ?? []), row.certificateNo]);
  }
  const currentByKey = new Map();
  for (const hotel of currentHotels) {
    for (const name of [hotel.name, ...(hotel.aliases ?? [])]) currentByKey.set(hotelNameKey(name), hotel.slug);
  }

  const reduced = [];
  for (const place of places) {
    const latitude = place.location?.latitude;
    const longitude = place.location?.longitude;
    if (!place.id || !PLACE_TYPES.has(place.primaryType) || !Number.isFinite(latitude) || !Number.isFinite(longitude)) continue;
    if (!inCell(latitude, longitude, cell)) continue;
    const key = hotelNameKey(place.displayName?.text);
    reduced.push({
      placeId: place.id,
      ministryCertificateNos: [...(ministryByKey.get(key) ?? [])],
      currentSlugs: currentByKey.has(key) ? [currentByKey.get(key)] : [],
      operationalConfirmed: place.businessStatus === "OPERATIONAL",
    });
  }
  return reduced;
}

function mergeEvidence(target, rows) {
  for (const row of rows) {
    const previous = target.get(row.placeId);
    if (!previous) {
      target.set(row.placeId, row);
      continue;
    }
    target.set(row.placeId, {
      placeId: row.placeId,
      ministryCertificateNos: [...new Set([...previous.ministryCertificateNos, ...row.ministryCertificateNos])],
      currentSlugs: [...new Set([...previous.currentSlugs, ...row.currentSlugs])],
      operationalConfirmed: previous.operationalConfirmed || row.operationalConfirmed,
    });
  }
}

export async function runAdaptiveScan({
  maxCalls = 1000,
  rootCells = buildRootCells(),
  initialState = null,
  search,
  context,
  onProgress = () => {},
  onCheckpoint = async () => {},
}) {
  const queue = [...(initialState?.queue ?? rootCells)];
  const evidenceByPlaceId = new Map((initialState?.evidence ?? []).map((row) => [row.placeId, row]));
  const failedCells = [...(initialState?.failedCells ?? [])];
  const residualSaturation = [...(initialState?.residualSaturation ?? [])];
  let attempts = initialState?.attempts ?? 0;
  let completedCells = initialState?.completedCells ?? 0;

  const snapshot = () => ({
    schemaVersion: 1,
    attempts,
    maxCalls,
    completedCells,
    queue: [...queue],
    evidence: [...evidenceByPlaceId.values()],
    failedCells: [...failedCells],
    residualSaturation: [...residualSaturation],
    complete: queue.length === 0 && failedCells.length === 0 && residualSaturation.length === 0,
  });

  while (queue.length > 0 && attempts < maxCalls) {
    const cell = queue.shift();
    attempts += 1;
    try {
      const places = await search(cell, attempts);
      mergeEvidence(evidenceByPlaceId, processPlaces(places, cell, context));
      completedCells += 1;
      if (places.length === 20) {
        if (cell.sizeM > 250) queue.push(...splitCell(cell));
        else residualSaturation.push(cell.id);
      }
    } catch (error) {
      if (error?.fatal) throw error;
      failedCells.push({ cellId: cell.id, message: String(error?.message ?? error).slice(0, 300) });
    }
    await onCheckpoint(snapshot());
    if (attempts === 1 || attempts % 25 === 0 || attempts === maxCalls) {
      onProgress({ attempts, maxCalls, queue: queue.length, uniquePlaces: evidenceByPlaceId.size, failed: failedCells.length });
    }
  }

  return snapshot();
}

export function classifyMinistryHotels({ ministryRows, currentHotels, evidence }) {
  const currentKeys = new Set();
  for (const hotel of currentHotels) {
    currentKeys.add(hotelNameKey(hotel.name));
    for (const alias of hotel.aliases ?? []) currentKeys.add(hotelNameKey(alias));
  }
  const evidenceByCertificate = new Map();
  for (const row of evidence) {
    for (const certificateNo of row.ministryCertificateNos) {
      evidenceByCertificate.set(certificateNo, [...(evidenceByCertificate.get(certificateNo) ?? []), row]);
    }
  }

  const result = { known: [], missing: [], unverifiedMinistry: [], statusConflicts: [], googleUnmatchedPlaceIds: [] };
  for (const hotel of ministryRows) {
    if (currentKeys.has(hotelNameKey(hotel.name))) {
      result.known.push({ ...hotel, reason: "current-name" });
      continue;
    }
    const matches = evidenceByCertificate.get(hotel.certificateNo) ?? [];
    if (matches.length !== 1) {
      result.unverifiedMinistry.push({ ...hotel, reason: matches.length ? "multiple-google-identities" : "google-unverified" });
      continue;
    }
    const match = matches[0];
    if (match.operationalConfirmed) result.missing.push({ ...hotel, placeId: match.placeId, reason: "operational-confirmed" });
    else result.statusConflicts.push({ ...hotel, placeId: match.placeId, reason: "google-not-operational" });
  }
  result.googleUnmatchedPlaceIds = evidence
    .filter((row) => row.operationalConfirmed && row.ministryCertificateNos.length === 0 && row.currentSlugs.length === 0)
    .map((row) => ({ placeId: row.placeId, reason: "google-only-place-id" }));
  return result;
}

export function mergeHotelClassifications(batches) {
  const buckets = [
    ["unverifiedMinistry", 0],
    ["statusConflicts", 1],
    ["missing", 2],
    ["possibleDuplicates", 3],
    ["known", 4],
  ];
  const selected = new Map();
  for (const batch of batches) {
    for (const [bucket, priority] of buckets) {
      for (const row of batch[bucket] ?? []) {
        const previous = selected.get(row.certificateNo);
        if (!previous || priority > previous.priority) {
          selected.set(row.certificateNo, { bucket, priority, row });
        } else if (priority === previous.priority && bucket === previous.bucket) {
          selected.set(row.certificateNo, { bucket, priority, row: { ...previous.row, ...row } });
        }
      }
    }
  }
  const merged = {
    known: [],
    possibleDuplicates: [],
    missing: [],
    statusConflicts: [],
    unverifiedMinistry: [],
  };
  for (const { bucket, row } of selected.values()) merged[bucket].push(row);
  for (const rows of Object.values(merged)) rows.sort((a, b) => a.name.localeCompare(b.name, "tr"));
  return merged;
}
