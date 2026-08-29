/**
 * Static accommodation index for the booking form.
 *
 * Guests know the name of their hotel; they almost never know which pricing
 * region it belongs to. This index maps a hotel name onto one of the region
 * slugs in `routes.js`, so the form can pre-select the region — and therefore
 * show a price — from the one thing the guest actually knows.
 *
 * The index is deliberately static: it is baked into the client bundle at
 * build time, so hotel search and the resulting quote stay synchronous and
 * cost nothing per visitor.
 *
 * `status` records how much a row can be trusted. Rows marked `draft` are a
 * research seed and must be checked against the operator's own records before
 * they are treated as authoritative — see `scripts/hotel-index-review.mjs`.
 * The booking form therefore treats an index hit as a *pre-selection* the
 * guest can still change, never as a locked value.
 */
import { hotelCatalog } from "./hotels.js";

/** @typedef {import("./hotels.js").HotelRegionSlug | "antalya"} IndexRegionSlug */
/** @typedef {[name: string, region: IndexRegionSlug, district: string, aliases?: string[]]} HotelSeedRow */

/**
 * Turkish-aware slug for a hotel name. Kept in step with the hand-written
 * slugs in `hotels.js`; `hotel-index.test.js` asserts the two agree.
 */
export const hotelSlug = (name) =>
  String(name)
    .replace(/ı/g, "i").replace(/İ/g, "i").replace(/ğ/g, "g").replace(/Ğ/g, "g")
    .replace(/ş/g, "s").replace(/Ş/g, "s").replace(/ç/g, "c").replace(/Ç/g, "c")
    .replace(/ö/g, "o").replace(/Ö/g, "o").replace(/ü/g, "u").replace(/Ü/g, "u")
    .normalize("NFD").replace(/\p{M}+/gu, "")
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** @type {HotelSeedRow[]} */
const seedRows = [
  // --- Antalya city, Lara, Kundu, Konyaaltı -------------------------------
  ["Delphin Imperial Lara", "antalya", "Lara"],
  ["Delphin Palace", "antalya", "Lara"],
  ["Delphin BE Grand Resort", "antalya", "Lara"],
  ["Delphin Diva Premiere", "antalya", "Lara"],
  ["Titanic Beach Lara", "antalya", "Kundu"],
  ["Titanic Mardan Palace", "antalya", "Kundu", ["Mardan Palace"]],
  ["Concorde De Luxe Resort", "antalya", "Lara"],
  ["Royal Wings Hotel", "antalya", "Lara"],
  ["Royal Holiday Palace", "antalya", "Kundu"],
  ["Royal Seginus", "antalya", "Lara"],
  ["Miracle Resort Hotel", "antalya", "Lara"],
  ["Baia Lara Hotel", "antalya", "Lara"],
  ["Adalya Elite Lara", "antalya", "Lara"],
  ["Limak Lara De Luxe Hotel", "antalya", "Lara"],
  ["IC Hotels Green Palace", "antalya", "Kundu"],
  ["IC Hotels Residence", "antalya", "Kundu"],
  ["Sherwood Exclusive Lara", "antalya", "Lara", ["Sherwood Breezes Resort"]],
  ["Lara Barut Collection", "antalya", "Lara", ["Barut Lara"]],
  ["Fame Residence Lara", "antalya", "Lara"],
  ["Rixos Downtown Antalya", "antalya", "Konyaaltı"],
  ["Akra Hotel", "antalya", "Antalya merkez", ["Akra Barut"]],
  ["Porto Bello Hotel Resort & Spa", "antalya", "Konyaaltı"],
  ["Hotel Su & Aqualand", "antalya", "Konyaaltı", ["Hotel SU"]],
  ["Crowne Plaza Antalya", "antalya", "Konyaaltı"],
  ["Ramada Plaza Antalya", "antalya", "Antalya merkez"],
  ["WOW Kremlin Palace", "antalya", "Kundu", ["Kremlin Palace"]],
  ["WOW Topkapi Palace", "antalya", "Kundu", ["Topkapi Palace"]],
  ["Venezia Palace Deluxe Resort", "antalya", "Kundu"],
  ["Aska Lara Resort & Spa", "antalya", "Lara"],
  ["Melas Lara Hotel", "antalya", "Lara"],
  ["Nirvana Cosmopolitan Hotel", "antalya", "Lara"],
  ["Kervansaray Lara", "antalya", "Lara"],
  ["Grand Park Lara", "antalya", "Lara"],
  ["Trendy Lara Hotel", "antalya", "Lara"],

  // --- Belek, Kadriye, Serik ----------------------------------------------
  ["Rixos Premium Belek", "belek", "Belek"],
  ["Regnum Carya", "belek", "Kadriye"],
  ["Maxx Royal Belek", "belek", "Belek", ["Maxx Royal Belek Golf Resort"]],
  ["Gloria Golf Resort", "belek", "Belek"],
  ["Gloria Verde Resort", "belek", "Belek"],
  ["Gloria Serenity Resort", "belek", "Belek"],
  ["Cornelia Diamond Golf Resort & Spa", "belek", "Belek"],
  ["Cornelia De Luxe Resort", "belek", "Belek"],
  ["Titanic Deluxe Golf Belek", "belek", "Belek"],
  ["Kaya Palazzo Golf Resort", "belek", "Belek"],
  ["Ela Excellence Resort Belek", "belek", "Belek", ["Ela Quality Resort"]],
  ["Susesi Luxury Resort", "belek", "Belek"],
  ["Sueno Hotels Deluxe Belek", "belek", "Belek"],
  ["Sueno Hotels Golf Belek", "belek", "Belek"],
  ["Voyage Belek Golf & Spa", "belek", "Belek"],
  ["Calista Luxury Resort", "belek", "Belek"],
  ["IC Hotels Santai Family Resort", "belek", "Belek"],
  ["Adam & Eve Hotels", "belek", "Belek"],
  ["Papillon Zeugma Relaxury", "belek", "Belek"],
  ["Papillon Ayscha Resort", "belek", "Belek"],
  ["Papillon Belvil Resort", "belek", "Belek"],
  ["Limak Atlantis De Luxe Hotel", "belek", "Belek"],
  ["Limak Arcadia Sport Resort", "belek", "Belek"],
  ["Robinson Club Nobilis", "belek", "Belek"],
  ["Spice Hotel & Spa", "belek", "Belek"],
  ["Xanadu Resort Hotel", "belek", "Belek"],
  ["Bellis Deluxe Hotel", "belek", "Belek"],
  ["Sirene Belek Hotel", "belek", "Belek"],
  ["The Land of Legends", "belek", "Kadriye", ["The Land of Legends Kingdom Hotel", "Legends"]],
  ["Alva Donna Exclusive Hotel & Spa", "belek", "Belek"],
  ["Selectum Luxury Resort Belek", "belek", "Belek"],
  ["Maritim Pine Beach Resort", "belek", "Belek"],
  ["Crystal Tat Beach Golf Resort & Spa", "belek", "Belek"],
  ["Crystal Family Resort & Spa", "belek", "Belek"],
  ["Belconti Resort Hotel", "belek", "Belek"],
  ["Sherwood Dreams Resort", "belek", "Belek"],
  ["Aydinbey Famous Resort", "belek", "Belek"],
  ["Granada Luxury Belek", "belek", "Belek"],
  ["Kirman Belazur Resort & Spa", "belek", "Belek"],

  // --- Boğazkent -----------------------------------------------------------
  ["Crystal Waterworld Resort & Spa", "bogazkent", "Boğazkent"],

  // --- Side, Kumköy, Evrenseki, Çolaklı, Sorgun, Titreyengöl ---------------
  ["Arum Barut Collection", "side", "Kumköy"],
  ["Barut Hemera", "side", "Kumköy"],
  ["Barut Acanthus & Cennet", "side", "Side"],
  ["Side Star Resort", "side", "Gündoğdu"],
  ["Side Star Elegance", "side", "Side"],
  ["Side Star Beach", "side", "Side"],
  ["Royal Dragon Hotel", "side", "Evrenseki"],
  ["Voyage Sorgun", "side", "Sorgun"],
  ["Ali Bey Resort Sorgun", "side", "Sorgun"],
  ["Sunis Kumköy Beach Resort", "side", "Kumköy"],
  ["Sunis Elita Beach Resort", "side", "Kumköy"],
  ["Sunis Evren Beach Resort", "side", "Evrenseki"],
  ["Robinson Club Side", "side", "Side"],
  ["Crystal Sunset Luxury Resort", "side", "Side"],
  ["Crystal Palace Luxury Resort", "side", "Side"],
  ["Alba Resort Hotel", "side", "Çolaklı"],
  ["Alba Royal Hotel", "side", "Çolaklı"],
  ["Aydinbey King's Palace", "side", "Çolaklı"],
  ["Kirman Sidemarin Beach & Spa", "side", "Çolaklı"],
  ["Sunprime C-Lounge", "side", "Kumköy"],
  ["Side Prenses Resort", "side", "Titreyengöl"],
  ["Turquoise Resort Hotel & Spa", "side", "Sorgun"],
  ["Defne Defnem", "side", "Titreyengöl"],
  ["Von Resort Golden Coast", "side", "Çolaklı"],
  ["Melas Resort Hotel", "side", "Sorgun"],

  // --- Kemer, Göynük, Beldibi, Kiriş --------------------------------------
  ["Rixos Sungate", "kemer", "Beldibi"],
  ["Rixos Beldibi", "kemer", "Beldibi"],
  ["Maxx Royal Kemer Resort", "kemer", "Kiriş"],
  ["Club Med Palmiye", "kemer", "Kemer"],
  ["Nirvana Dolce Vita", "kemer", "Beldibi"],
  ["Orange County Resort Hotel Kemer", "kemer", "Kemer"],
  ["Crystal Aura Beach Resort & Spa", "kemer", "Kemer"],
  ["Crystal De Luxe Resort & Spa", "kemer", "Kemer"],
  ["Crystal Flora Beach Resort", "kemer", "Beldibi"],
  ["Kemer Barut Collection", "kemer", "Kemer"],
  ["Limak Limra Hotel & Resort", "kemer", "Kiriş"],
  ["Sherwood Exclusive Kemer", "kemer", "Göynük"],
  ["Alva Donna World Palace", "kemer", "Beldibi"],
  ["Queen's Park Le Jardin", "kemer", "Göynük"],
  ["Grand Park Kemer", "kemer", "Kemer"],
  ["Ulusoy Kemer Holiday Club", "kemer", "Göynük"],
  ["Mirage Park Resort", "kemer", "Göynük"],
  ["Sealife Buket Resort & Beach", "kemer", "Beldibi"],

  // --- Tekirova ------------------------------------------------------------
  ["Rixos Premium Tekirova", "tekirova", "Tekirova"],
  ["Amara Dolce Vita Luxury", "tekirova", "Tekirova"],
  ["Marti Myra", "tekirova", "Tekirova"],
  ["Phaselis Rose Hotel", "tekirova", "Tekirova"],
  ["Queen's Park Tekirova", "tekirova", "Tekirova"],

  // --- Alanya and its western resort strip ---------------------------------
  ["Kirman Leodikya Resort", "alanya", "Okurcalar"],
  ["Aydinbey Gold Dreams", "alanya", "Okurcalar"],
  ["Justiniano Deluxe Resort", "alanya", "Okurcalar"],
  ["Utopia World Hotel", "alanya", "Türkler"],
  ["Long Beach Resort Hotel", "alanya", "Konaklı"],
  ["Delphin Botanik Platinum", "alanya", "Türkler"],
  ["Alaiye Resort & Spa", "alanya", "Avsallar"],
  ["Rubi Platinum Spa Resort", "alanya", "Alanya merkez"],
  ["Asia Beach Resort & Spa", "alanya", "Alanya merkez"],
  ["Goldcity Hotel", "alanya", "Kargıcak"],
  ["Numa Bay Exclusive", "alanya", "Avsallar"],
  ["Granada Luxury Beach", "alanya", "Avsallar"],
  ["Bera Alanya Hotel", "alanya", "Avsallar"],
  ["Alan Xafira Deluxe Resort", "alanya", "Konaklı"],
  ["Kahya Resort Aqua & Spa", "alanya", "Konaklı"],
];

/**
 * Slugs whose region has been confirmed against the operator's own records.
 * The German landing-page catalogue is hand-written per hotel, so every entry
 * there counts as confirmed; everything else stays a draft until reviewed.
 */
const verifiedSlugs = new Set(Object.keys(hotelCatalog));

/** @typedef {{ slug: string, name: string, region: IndexRegionSlug, district: string, aliases: readonly string[], status: "verified" | "draft" }} IndexedHotel */

/** @type {readonly IndexedHotel[]} */
export const hotelIndex = Object.freeze(
  seedRows.map(([name, region, district, aliases = []]) => {
    const slug = hotelSlug(name);
    return Object.freeze({
      slug, name, region, district,
      aliases: Object.freeze([...aliases]),
      status: verifiedSlugs.has(slug) ? "verified" : "draft",
    });
  }),
);

export const indexedHotelBySlug = (slug) => hotelIndex.find((hotel) => hotel.slug === slug) ?? null;

export const indexedHotelsForRegion = (region) => hotelIndex.filter((hotel) => hotel.region === region);
