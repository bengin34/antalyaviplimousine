/**
 * The road network between the pricing regions, and the driving distance over
 * it. Plain JS with no imports so Deno (the create-booking edge function) and
 * Node/Vite (the site, the tests) load the same file: a hotel-to-hotel fare is
 * quoted in the browser and charged on the server, and the two have to agree
 * on how far apart two regions are.
 *
 * `src/routes.js` adds the airport's own radial distance to every region and
 * exports the pair as `routeEdges`.
 */

/**
 * Region-to-region road distances in km, one entry per adjacent pair.
 *
 * The eastern strip (Belek out to Demirtaş) and the western one (Antalya out
 * to Kaş) are each a chain along the coast road and are not joined to each
 * other here: a journey between them runs past the airport, which the airport
 * edges express already. A pair with a real short cut that neither the chain
 * nor the airport describes — Belek to Kemer over the ring road, say — is
 * overstated until it is added here, so the fare for it is cautious rather
 * than wrong in our favour.
 */
export const REGIONAL_CONNECTIONS = Object.freeze([
  ["belek", "bogazkent", 10],
  ["bogazkent", "side", 25],
  ["side", "manavgat", 10],
  ["manavgat", "kizilagac", 15],
  ["kizilagac", "alanya", 45],
  ["kizilagac", "alanya_bati", 20],
  ["alanya_bati", "alanya_merkez", 20],
  ["alanya_merkez", "alanya_dogu", 13],
  ["alanya_dogu", "kargicak", 12],
  ["kargicak", "demirtas", 20],
  ["antalya", "kemer", 45],
  ["kemer", "tekirova", 20],
  ["tekirova", "kumluca", 30],
  ["kumluca", "kas", 95],
  ["kas", "fethiye", 110],
  ["tekirova", "fethiye", 155],
  ["fethiye", "dalaman", 50],
  ["dalaman", "bodrum", 200],
  ["antalya", "pamukkale", 235],
  ["pamukkale", "bodrum", 250],
  ["manavgat", "kapadokya", 500],
].map((edge) => Object.freeze(edge)));

/**
 * One-way km from Antalya Airport to each pricing region — the radial half of
 * the network, and the distance every airport tariff is set from.
 *
 * It repeats `routeCatalog[region].distanceKm` because the edge function
 * cannot import the catalogue, and `transfer-graph.test.js` fails the build if
 * the two ever disagree. Reading it from the `routes` table instead would make
 * the fare between two regions depend on which rows happened to come back: a
 * single missing row reroutes a coast-road hop past the airport and overprices
 * it by tens of euros. The geometry is fixed; only the money is live.
 */
export const REGION_AIRPORT_KM = Object.freeze({
  antalya: 15,
  belek: 45,
  side: 65,
  kemer: 50,
  alanya: 125,
  alanya_bati: 105,
  alanya_merkez: 125,
  alanya_dogu: 138,
  kargicak: 150,
  demirtas: 170,
  bogazkent: 48,
  manavgat: 75,
  kizilagac: 85,
  tekirova: 75,
  kumluca: 90,
  kas: 185,
  bodrum: 380,
  dalaman: 235,
  fethiye: 205,
  pamukkale: 245,
  kapadokya: 540,
});

const AIRPORT = "airport";

/**
 * Shortest driving distance between two pricing regions, in km.
 *
 * The graph is the regional connections plus each region's own distance to the
 * airport, so the airport is a transit point like any other junction — which
 * is what makes an Alanya-to-Kemer journey come out as the drive in and back
 * out again. Every edge is a real road, and only the roads listed are
 * available, so the answer is never shorter than the real drive.
 *
 * @param {string} fromRegion
 * @param {string} toRegion
 * @returns {number | null} km, or null when either region has no airport distance
 */
export function betweenRegionsKm(fromRegion, toRegion) {
  const regionKm = REGION_AIRPORT_KM;
  if (!(regionKm[fromRegion] > 0) || !(regionKm[toRegion] > 0)) return null;
  if (fromRegion === toRegion) return 0;

  const neighbours = new Map([[AIRPORT, []]]);
  const link = (from, to, km) => {
    if (!neighbours.has(from)) neighbours.set(from, []);
    neighbours.get(from).push([to, km]);
  };
  for (const [region, km] of Object.entries(regionKm)) {
    if (!(km > 0)) continue;
    link(AIRPORT, region, km);
    link(region, AIRPORT, km);
  }
  for (const [from, to, km] of REGIONAL_CONNECTIONS) {
    if (!(regionKm[from] > 0) || !(regionKm[to] > 0)) continue;
    link(from, to, km);
    link(to, from, km);
  }

  // Dijkstra over a graph of a couple of dozen nodes: a linear scan for the
  // nearest unvisited node is cheaper than maintaining a heap.
  const distances = new Map([[fromRegion, 0]]);
  const visited = new Set();
  for (;;) {
    let current = null;
    let currentKm = Infinity;
    for (const [node, km] of distances) {
      if (!visited.has(node) && km < currentKm) {
        current = node;
        currentKm = km;
      }
    }
    if (current === null) return null;
    if (current === toRegion) return currentKm;
    visited.add(current);
    for (const [neighbour, km] of neighbours.get(current) ?? []) {
      const candidate = currentKm + km;
      if (candidate < (distances.get(neighbour) ?? Infinity)) distances.set(neighbour, candidate);
    }
  }
}
