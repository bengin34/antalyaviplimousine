/**
 * The commercial rule behind the two options on the B2B partner page.
 *
 * It lives here, beside `routes.js`, because both the React page and the
 * build verifier have to agree on it — and because the fare it is derived
 * from lives here too. Nothing stores an agency price; it is always the
 * published fare minus the discount, so a tariff change can never leave the
 * partner rates behind the way the old hand-written B2B table did.
 */

/** Per transfer, per vehicle, one way — deducted from the published fare. */
export const AGENCY_DISCOUNT_EUR = 10;

/**
 * What an agency pays us when it buys a journey and resells it under its own
 * name. When the guest simply rides in our vehicle, they pay the published
 * fare and nothing is deducted.
 */
export const agencyPrice = (publishedPrice) => publishedPrice - AGENCY_DISCOUNT_EUR;
