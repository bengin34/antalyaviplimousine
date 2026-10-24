/**
 * The fare for a transfer between two hotels.
 *
 * The whole tariff is radial: `routeCatalog[region].prices` is what an airport
 * transfer to that region costs, and it covers the vehicle driving out loaded
 * and back empty. A hotel-to-hotel journey has no airport end, so the vehicle
 * drives out to the pick-up hotel empty, carries the guest on to the second
 * hotel, and comes home empty:
 *
 *   vehicle km = airport→A  +  A→B  +  B→airport
 *
 * Along one coast road that is 2 × the farther end's own distance to within a
 * kilometre or two: a Side-to-Alanya run ties the vehicle up for an Alanya
 * journey even though the guest is only carried 65 km. The fare is therefore
 * anchored on the published tariff of the farther END — not the destination,
 * which is what the site used to charge and which sells an Alanya-to-Side run
 * at Side's price, below the cost of driving it.
 *
 * Across the city the two strips are only joined by the road past the airport,
 * so the vehicle drives the radius twice over and the journey is genuinely
 * longer than either end's own. The kilometres beyond the anchor's journey are
 * the detour, charged at {@link DETOUR_EUR_PER_KM}.
 *
 * Plain JS so Deno (create-booking) and Node/Vite (the site, the tests) run
 * the same arithmetic: the browser quotes this fare and the server charges it.
 */
import { costFloorUnitPrice } from "./transfer-band-pricing.js";
import { betweenRegionsKm, REGION_AIRPORT_KM } from "./transfer-graph.js";

/**
 * What each kilometre of detour adds to the fare.
 *
 * 15 TRY a kilometre at 50 TRY to the euro — the profit model's own default
 * vehicle cost — driven out and back, so €0.60 for every kilometre the detour
 * adds to the one-way journey. That recovers the cost of the detour and
 * nothing beyond it. What margin a cross-region hop should carry on top is a
 * commercial decision rather than one the arithmetic can make, so it lives
 * here as a single number to raise.
 */
export const DETOUR_EUR_PER_KM = 0.6;

/**
 * The airport journey this hotel-to-hotel journey is worth: half the vehicle
 * km it takes, so an airport transfer's own 2 × distance comes back as its
 * distance.
 *
 * @param {string} pickupRegion
 * @param {string} dropoffRegion
 * @returns {number | null} km, or null when either region's distance is unknown
 */
export function journeyEquivalentOneWayKm(pickupRegion, dropoffRegion) {
  const pickupKm = REGION_AIRPORT_KM[pickupRegion];
  const dropoffKm = REGION_AIRPORT_KM[dropoffRegion];
  if (!(pickupKm > 0) || !(dropoffKm > 0)) return null;
  const between = betweenRegionsKm(pickupRegion, dropoffRegion);
  if (between === null) return null;
  // The vehicle has to reach the farther hotel and come home whatever route it
  // takes, so the journey is never shorter than that end's own airport
  // transfer. A coast-road hop and the two radial distances it connects are
  // separately estimated figures and disagree by a kilometre or two here and
  // there — Kemer to Tekirova is logged as 20 km between stops 25 km apart —
  // and without this the fare would quietly take the short side of that.
  return Math.max((pickupKm + between + dropoffKm) / 2, pickupKm, dropoffKm);
}

/**
 * The unit fare for one leg between two hotels, or null when it cannot be
 * priced and the operator has to quote it by hand.
 *
 * `tariffFor(region, vehicle)` supplies the published airport tariff, so an
 * admin price change moves this fare with it.
 *
 * @param {{
 *   pickupRegion: string,
 *   dropoffRegion: string,
 *   vehicle: string,
 *   tariffFor: (region: string, vehicle: string) => number | null | undefined,
 * }} journey
 * @returns {number | null}
 */
export function hotelToHotelUnitPrice({ pickupRegion, dropoffRegion, vehicle, tariffFor }) {
  const equivalentKm = journeyEquivalentOneWayKm(pickupRegion, dropoffRegion);
  if (equivalentKm === null) return null;

  // The anchor is the farther end's own tariff; when both ends sit the same
  // distance out, the dearer of the two, so the fare is never the cheaper of
  // two equally long journeys.
  const fartherKm = Math.max(REGION_AIRPORT_KM[pickupRegion], REGION_AIRPORT_KM[dropoffRegion]);
  const anchor = Math.max(
    ...[pickupRegion, dropoffRegion]
      .filter((region) => REGION_AIRPORT_KM[region] === fartherKm)
      .map((region) => Number(tariffFor(region, vehicle)))
      .filter((tariff) => Number.isFinite(tariff) && tariff > 0),
    0,
  );
  if (anchor <= 0) return null;

  // Whole euros, like every published tariff: the anchor is one of them, and
  // only the detour is added to it. The cost floor comes in €5 steps of its
  // own and wins outright when the anchor does not clear it.
  const detourKm = Math.max(0, equivalentKm - fartherKm);
  return Math.max(
    anchor + Math.ceil(DETOUR_EUR_PER_KM * detourKm),
    costFloorUnitPrice(equivalentKm) ?? 0,
  );
}
