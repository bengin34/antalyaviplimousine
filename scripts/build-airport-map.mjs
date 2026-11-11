/**
 * Builds public-app/app/lib/airport-map-data.json, the geometry behind the
 * interactive airport map. Nothing in it is drawn by hand:
 *
 * - Terminal floors and the things on them come from the airport's own floor
 *   plans, https://www.antalya-airport.aero/katplanlari/ (maps 2, 3, 4, 18, 27).
 *   Those are isometric drawings; `unproject` turns them back into a plan.
 * - The airport overview comes from OpenStreetMap (© OpenStreetMap
 *   contributors, ODbL).
 * - The Terminal 2 Meet & Greet row (police, then shelters A–G, left of the
 *   exit) is not on either source. Its order is from our own airport staff and
 *   its position is schematic; see MEET_AND_GREET below.
 *
 * Usage: node scripts/build-airport-map.mjs <capture-dir>
 * The capture dir is not committed. It holds:
 *   floors-flat.json  each katplanlari/i/map<N>.svg flattened to polylines
 *                     (path.getPointAtLength in a browser)
 *   live-<N>.json     map N's objects with their footprint polygons, read from
 *                     the floor-plan page's canvas scene
 *   dump.json         the page's own object list (names in Turkish and English)
 *   osm-geom.json     Overpass export of the airport (`out tags geom`)
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const captureDir = process.argv[2];
if (!captureDir) throw new Error("usage: node scripts/build-airport-map.mjs <capture-dir>");
const read = (name) => JSON.parse(readFileSync(join(captureDir, name), "utf8").replace(/^[^{[]*/, "").replace(/[^}\]]*$/, ""));

// The official drawings put the two floor axes at (1, -K) and (1, K) on screen.
const K = 0.638;
const SCALE = 0.1;
const unproject = ([x, y]) => [(x / 2 - y / (2 * K)) * SCALE, (x / 2 + y / (2 * K)) * SCALE];
const round = (n) => Math.round(n * 10) / 10;

/** Douglas–Peucker, so a flattened arc is tens of points and not hundreds. */
function simplify(points, tolerance) {
  if (points.length < 3) return points;
  const [a, b] = [points[0], points[points.length - 1]];
  const length = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const closed = length === 0;
  let worst = 0;
  let index = 0;
  for (let i = 1; i < points.length - 1; i++) {
    // A closed ring starts and ends on the same point; measure from that point instead of from a zero-length chord.
    const distance = closed
      ? Math.hypot(points[i][0] - a[0], points[i][1] - a[1])
      : Math.abs((b[0] - a[0]) * (a[1] - points[i][1]) - (a[0] - points[i][0]) * (b[1] - a[1])) / length;
    if (distance > worst) [worst, index] = [distance, i];
  }
  if (worst <= tolerance) return [a, b];
  return [...simplify(points.slice(0, index + 1), tolerance).slice(0, -1), ...simplify(points.slice(index), tolerance)];
}

/** Even-odd point-in-polygon test. */
function contains(ring, [x, z]) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, zi] = ring[i];
    const [xj, zj] = ring[j];
    if (zi > z !== zj > z && x < ((xj - xi) * (z - zi)) / (zj - zi) + xi) inside = !inside;
  }
  return inside;
}

/** What each object on the official plans is, by the sprite the airport draws it with. */
const SPRITE_KINDS = {
  1: "food", 3: "ticket", 25: "ticket", 4: "exchange", 5: "prayer", 6: "wc", 315: "wc", 312: "wc", 319: "wc",
  9: "info", 10: "carRental", 11: "gate", 12: "passport", 13: "escalator", 15: "escalator", 17: "escalator",
  18: "escalator", 19: "escalator", 29: "customs", 105: "dutyFree", 337: "dutyFree", 208: "elevator",
  209: "elevator", 212: "atm", 303: "belt", 304: "security", 333: "lostBaggage", 358: "sign", 359: "sign",
  360: "fastTrack", 375: "lounge", 376: "lounge",
  204: "arrow", 205: "arrow", 206: "arrow", 207: "arrow",
};
// Arrow sprites point along the floor axes: [dx, dz] in plan space.
const ARROW_DIRECTIONS = { 204: [0, -1], 205: [0, 1], 206: [1, 0], 207: [-1, 0] };
const SIGN_KEYS = {
  "Arrivals Gate A": "arrivalsGateA",
  "Arrivals Gate B": "arrivalsGateB",
  "Ground Floor Baggage Claim Escalators": "baggageEscalators",
  "Connection Corridor": "connectionCorridor",
  "Terminal 2 Extention Existing": "connectionCorridor",
  "Oversized Baggage": "oversizedBaggage",
};

function levelFromOfficialMap(mapId, floors, names) {
  const live = read(`live-${mapId}.json`).out;
  if (live.length !== names.length) throw new Error(`map ${mapId}: scene and object list differ`);

  const plates = floors[mapId].paths.flatMap((path) => {
    const rings = path.subs.filter((sub) => sub.length > 8).map((sub) => simplify(sub.map(unproject), 0.12));
    // A ring that starts inside the path's first ring is a hole in it (the pier's atrium).
    const holes = rings.slice(1).filter((ring) => contains(rings[0], ring[0]));
    return rings.filter((ring) => !holes.includes(ring)).map((points) => ({
      // The airport fills the landside hall (after customs) in blue-grey.
      kind: path.fill === "#dfe3ef" ? "landside" : "floor",
      points,
      ...(points === rings[0] && holes.length ? { holes } : {}),
    }));
  });

  const objects = [];
  live.forEach((object, i) => {
    const kind = SPRITE_KINDS[object.sprite];
    if (!kind) return;
    const name = names[i];
    let center;
    let size = [0, 0];
    if (object.poly) {
      // The polygon outlines a box seen from above-front. Its floor footprint is
      // spanned by the lower of the two leftmost corners, the lower of the two
      // rightmost corners, and the bottom corner.
      const byX = [...object.poly].sort((p, q) => p[0] - q[0]);
      const lower = (p, q) => (p[1] > q[1] ? p : q);
      const left = lower(byX[0], byX[1]);
      const right = lower(byX[byX.length - 1], byX[byX.length - 2]);
      const bottom = object.poly.reduce(lower);
      const corners = (kind === "belt" ? object.poly : [left, right, bottom]).map(unproject);
      const xs = corners.map((p) => p[0]);
      const zs = corners.map((p) => p[1]);
      size = [Math.max(...xs) - Math.min(...xs), Math.max(...zs) - Math.min(...zs)];
      center = kind === "belt"
        ? [(Math.max(...xs) + Math.min(...xs)) / 2, (Math.max(...zs) + Math.min(...zs)) / 2]
        : unproject([(left[0] + right[0]) / 2, (left[1] + right[1]) / 2]);
    } else {
      // Arrows have no footprint; their sprite is drawn about 100×58 px per unit of scale from the anchor.
      center = unproject([name.x + 100 * name.scale, name.y + 58 * name.scale]);
    }
    const entry = { kind, x: round(center[0]), z: round(center[1]) };
    if (kind === "belt") Object.assign(entry, { w: round(size[0]), d: round(size[1]), label: name.txt });
    if (kind === "gate") entry.label = name.txt;
    if (kind === "arrow") entry.dir = ARROW_DIRECTIONS[object.sprite];
    if (kind === "sign") {
      entry.key = SIGN_KEYS[name.en.trim()];
      if (!entry.key) return;
    }
    // On the T2 extension pier the airport labels the booth sprite "Security Check".
    if (kind === "passport" && /Security/.test(name.en)) entry.kind = "security";
    if (object.sprite === 376) entry.kind = "ftaExclusive";
    objects.push(entry);
  });

  // Centre the level on its floor so every level sits at the scene origin.
  const all = plates.flatMap((plate) => plate.points);
  const cx = (Math.min(...all.map((p) => p[0])) + Math.max(...all.map((p) => p[0]))) / 2;
  const cz = (Math.min(...all.map((p) => p[1])) + Math.max(...all.map((p) => p[1]))) / 2;
  const recentre = (points) => points.map(([x, z]) => [round(x - cx), round(z - cz)]);
  for (const plate of plates) {
    plate.points = recentre(plate.points);
    if (plate.holes) plate.holes = plate.holes.map(recentre);
  }
  for (const object of objects) Object.assign(object, { x: round(object.x - cx), z: round(object.z - cz) });
  return { source: `antalya-airport.aero/katplanlari #${mapId}`, plates, objects };
}

/**
 * The exit door is where the landside hall juts out of the building: the edge
 * of the landside plate farthest from the baggage hall (+z).
 */
function exitOf(level) {
  const points = level.plates.filter((plate) => plate.kind === "landside").flatMap((plate) => plate.points);
  const maxZ = Math.max(...points.map((p) => p[1]));
  const edge = points.filter((p) => maxZ - p[1] < 0.3);
  return { x: round((Math.min(...edge.map((p) => p[0])) + Math.max(...edge.map((p) => p[0]))) / 2), z: maxZ };
}

/**
 * Terminal 2 Meet & Greet, as our airport staff describe it: leaving the exit
 * it is on the left; first the police post, then shelters A to G. Walking out
 * of the door (+z), left is +x. Spacing and distance from the door are
 * schematic. shortcut: order and side are real, coordinates are not; replace
 * with surveyed positions if the airport publishes the forecourt.
 */
const MEET_AND_GREET = { firstOffset: 9, spacing: 5.5, distanceFromDoor: 7, stops: ["police", "A", "B", "C", "D", "E", "F", "G"] };

function meetAndGreet(exit) {
  return MEET_AND_GREET.stops.map((label, i) => ({
    kind: label === "police" ? "police" : "shelter",
    ...(label === "police" ? {} : { label }),
    x: round(exit.x + MEET_AND_GREET.firstOffset + i * MEET_AND_GREET.spacing),
    z: round(exit.z + MEET_AND_GREET.distanceFromDoor),
  }));
}

function overviewFromOsm() {
  const elements = read("osm-geom.json").elements;
  const [lat0, lon0] = [36.9065, 30.8015];
  const metres = ({ lat, lon }) => [(lon - lon0) * Math.cos((lat0 * Math.PI) / 180) * 111320, -(lat - lat0) * 110540];
  const inside = ([x, z]) => Math.abs(x) < 1000 && z > -1500 && z < 1450;
  const line = (way, tolerance) => simplify(way.geometry.map(metres), tolerance).map(([x, z]) => [Math.round(x), Math.round(z)]);
  /** Splits a line where it leaves the overview, so runways do not stretch the scene. */
  const clipped = (sparse) => {
    // Runways are two points kilometres apart, so add a point every 50 m before cutting.
    const points = sparse.flatMap((p, i) => {
      const next = sparse[i + 1];
      if (!next) return [p];
      const steps = Math.max(1, Math.ceil(Math.hypot(next[0] - p[0], next[1] - p[1]) / 50));
      return Array.from({ length: steps }, (_, k) => [Math.round(p[0] + ((next[0] - p[0]) * k) / steps), Math.round(p[1] + ((next[1] - p[1]) * k) / steps)]);
    });
    const runs = [[]];
    for (const p of points) (inside(p) ? runs[runs.length - 1].push(p) : runs.push([]));
    return runs.filter((run) => run.length > 1).map((run) => simplify(run, 1));
  };

  const ways = elements.filter((e) => e.type === "way" && e.geometry);
  const terminalNames = { "Dış Hatlar Terminali 1": "t1", "Dış Hatlar Terminali 2": "t2", "İç Hatlar Terminali": "domestic" };
  const majorRoads = new Set(["trunk", "trunk_link", "primary", "primary_link", "secondary", "tertiary", "unclassified"]);
  const overview = { terminals: [], buildings: [], parking: [], aprons: [], roads: [], serviceRoads: [], runways: [], taxiways: [], stops: [] };

  for (const way of ways) {
    const tags = way.tags ?? {};
    if (tags.aeroway === "terminal" && terminalNames[tags.name]) {
      overview.terminals.push({ id: terminalNames[tags.name], points: line(way, 2) });
    } else if (tags.aeroway === "runway") {
      overview.runways.push(...clipped(line(way, 2)));
    } else if (tags.aeroway === "taxiway") {
      overview.taxiways.push(...clipped(line(way, 4)));
    } else if (tags.aeroway === "apron") {
      const points = line(way, 5);
      if (points.every(inside)) overview.aprons.push(points);
    } else if (tags.amenity === "parking") {
      overview.parking.push(line(way, 3));
    } else if (tags.building) {
      const points = line(way, 2);
      if (points.length > 3 && points.every(inside)) overview.buildings.push(points);
    } else if (tags.highway === "service" && !tags.aeroway) {
      overview.serviceRoads.push(...clipped(line(way, 4)));
    } else if (majorRoads.has(tags.highway)) {
      overview.roads.push(...clipped(line(way, 3)));
    }
  }

  const stopKeys = {
    "Dış Hatlar Terminali 2": "busStopT2",
    "İç Hatlar ve Terminal 1 Transfer Aracı": "shuttleToT1",
    "Terminal 2 Transfer Aracı": "shuttleToT2",
  };
  for (const node of elements.filter((e) => e.type === "node")) {
    const key = stopKeys[node.tags?.name];
    if (key) overview.stops.push({ key, x: Math.round(metres(node)[0]), z: Math.round(metres(node)[1]) });
  }
  return overview;
}

const floors = read("floors-flat.json");
const namesByMap = Object.fromEntries(read("dump.json").map_list.map((map) => [map.id, typeof map.data === "string" ? JSON.parse(map.data) : map.data]));
const level = (mapId) => levelFromOfficialMap(mapId, floors, namesByMap[mapId]);

const t2Ground = level(3);
t2Ground.exit = exitOf(t2Ground);
t2Ground.objects.push(...meetAndGreet(t2Ground.exit));
const t1Ground = level(18);
t1Ground.exit = exitOf(t1Ground);

const data = {
  t2: { levels: { pier: level(4), extensionPier: level(27), ground: t2Ground } },
  t1: { levels: { pier: level(2), ground: t1Ground } },
  overview: overviewFromOsm(),
};

const target = fileURLToPath(new URL("../public-app/app/lib/airport-map-data.json", import.meta.url));
writeFileSync(target, `${JSON.stringify(data)}\n`);
console.log(`wrote ${target}`);
