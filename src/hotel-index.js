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
 * A hotel's region is not stored per hotel: it is looked up from the district
 * (belde/mahalle) the hotel sits in, via `districtRegions`. Pricing regions are
 * geographic, so "which region is Çolaklı sold as" is one decision that should
 * settle every hotel there at once — and correcting a whole area is then a
 * one-line change instead of an edit per hotel.
 *
 * `status` records how much a row can be trusted. Rows marked `draft` are a
 * research seed and must be checked against the operator's own records before
 * they are treated as authoritative — see `scripts/hotel-index-review.mjs`.
 * The booking form therefore treats an index hit as a *pre-selection* the
 * guest can still change, never as a locked value.
 */
import { hotelCatalog } from "./hotels.js";

/** @typedef {import("./hotels.js").HotelRegionSlug | "antalya"} IndexRegionSlug */
/** @typedef {[name: string, district: string, aliases?: string[]]} HotelSeedRow */

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

/**
 * Which pricing region each district is sold as. This is a commercial
 * decision, not a geographic one — the boundary cases (Çolaklı, Sorgun,
 * Titreyengöl, Okurcalar) are exactly where the two disagree — so every
 * district is listed explicitly rather than derived from coordinates.
 *
 * Districts with no hotels indexed yet are listed too, so adding one later
 * is a single row in `seedRows`.
 *
 * @type {Readonly<Record<string, IndexRegionSlug>>}
 */
export const districtRegions = Object.freeze({
  // Antalya — €35 Vito
  "Antalya merkez": "antalya",
  "Konyaaltı": "antalya",
  "Lara": "antalya",
  "Kundu": "antalya",
  "Aksu": "antalya",
  // Belek — €40 Vito
  "Belek": "belek",
  "Kadriye": "belek",
  "Serik": "belek",
  // Boğazkent — €45 Vito
  "Boğazkent": "bogazkent",
  // Side — €50 Vito
  "Side": "side",
  "Kumköy": "side",
  "Gündoğdu": "side",
  "Evrenseki": "side",
  "Sorgun": "side",
  "Titreyengöl": "side",
  "Çolaklı": "side",
  // Manavgat — €50 Vito
  "Manavgat": "manavgat",
  // Manavgat/Kızılağaç — €60 Vito
  "Kızılağaç": "kizilagac",
  "Kızılot": "kizilagac",
  // Kemer — €55 Vito
  "Kemer": "kemer",
  "Beldibi": "kemer",
  "Göynük": "kemer",
  "Kiriş": "kemer",
  "Çamyuva": "kemer",
  // Tekirova — €75 Vito
  "Tekirova": "tekirova",
  // Alanya — €95 Vito
  "Okurcalar": "alanya",
  "İncekum": "alanya",
  "Avsallar": "alanya",
  "Türkler": "alanya",
  "Payallar": "alanya",
  "Konaklı": "alanya",
  "Alanya merkez": "alanya",
  "Oba": "alanya",
  "Tosmur": "alanya",
  "Kestel": "alanya",
  "Mahmutlar": "alanya",
  "Kargıcak": "alanya",
});

/** @type {HotelSeedRow[]} */
const seedRows = [
  // --- Antalya city, Lara, Kundu, Konyaaltı -------------------------------
  ["Delphin Imperial Lara", "Lara"],
  ["Delphin Palace", "Lara"],
  ["Delphin BE Grand Resort", "Lara"],
  ["Delphin Diva Premiere", "Lara"],
  ["Titanic Beach Lara", "Kundu"],
  ["Titanic Mardan Palace", "Kundu", ["Mardan Palace"]],
  ["Concorde De Luxe Resort", "Lara"],
  ["Royal Wings Hotel", "Lara"],
  ["Royal Holiday Palace", "Kundu"],
  ["Royal Seginus", "Lara"],
  ["Miracle Resort Hotel", "Lara"],
  ["Baia Lara Hotel", "Lara"],
  ["Adalya Elite Lara", "Lara"],
  ["Limak Lara De Luxe Hotel", "Lara"],
  ["IC Hotels Green Palace", "Kundu"],
  ["IC Hotels Residence", "Kundu"],
  ["Sherwood Exclusive Lara", "Lara", ["Sherwood Breezes Resort"]],
  ["Lara Barut Collection", "Lara", ["Barut Lara"]],
  ["Fame Residence Lara", "Lara"],
  ["Rixos Downtown Antalya", "Konyaaltı"],
  ["Akra Hotel", "Antalya merkez", ["Akra Barut"]],
  ["Porto Bello Hotel Resort & Spa", "Konyaaltı"],
  ["Hotel Su & Aqualand", "Konyaaltı", ["Hotel SU"]],
  ["Crowne Plaza Antalya", "Konyaaltı"],
  ["Ramada Plaza Antalya", "Antalya merkez"],
  ["WOW Kremlin Palace", "Kundu", ["Kremlin Palace"]],
  ["WOW Topkapi Palace", "Kundu", ["Topkapi Palace"]],
  ["Venezia Palace Deluxe Resort", "Kundu"],
  ["Aska Lara Resort & Spa", "Lara"],
  ["Melas Lara Hotel", "Lara"],
  ["Nirvana Cosmopolitan Hotel", "Lara"],
  ["Kervansaray Lara", "Lara"],
  ["Grand Park Lara", "Lara"],
  ["Trendy Lara Hotel", "Lara"],

  // --- Belek, Kadriye, Serik ----------------------------------------------
  ["Rixos Premium Belek", "Belek"],
  ["Regnum Carya", "Kadriye"],
  ["Maxx Royal Belek", "Belek", ["Maxx Royal Belek Golf Resort"]],
  ["Gloria Golf Resort", "Belek"],
  ["Gloria Verde Resort", "Belek"],
  ["Gloria Serenity Resort", "Belek"],
  ["Cornelia Diamond Golf Resort & Spa", "Belek"],
  ["Cornelia De Luxe Resort", "Belek"],
  ["Titanic Deluxe Golf Belek", "Belek"],
  ["Kaya Palazzo Golf Resort", "Belek"],
  ["Ela Excellence Resort Belek", "Belek", ["Ela Quality Resort"]],
  ["Susesi Luxury Resort", "Belek"],
  ["Sueno Hotels Deluxe Belek", "Belek"],
  ["Sueno Hotels Golf Belek", "Belek"],
  ["Voyage Belek Golf & Spa", "Belek"],
  ["Calista Luxury Resort", "Belek"],
  ["IC Hotels Santai Family Resort", "Belek"],
  ["Adam & Eve Hotels", "Belek"],
  ["Papillon Zeugma Relaxury", "Belek"],
  ["Papillon Ayscha Resort", "Belek"],
  ["Papillon Belvil Resort", "Belek"],
  ["Limak Atlantis De Luxe Hotel", "Belek"],
  ["Limak Arcadia Sport Resort", "Belek"],
  ["Robinson Club Nobilis", "Belek"],
  ["Spice Hotel & Spa", "Belek"],
  ["Xanadu Resort Hotel", "Belek"],
  ["Bellis Deluxe Hotel", "Belek"],
  ["Sirene Belek Hotel", "Belek"],
  ["The Land of Legends", "Kadriye", ["The Land of Legends Kingdom Hotel", "Legends"]],
  ["Alva Donna Exclusive Hotel & Spa", "Belek"],
  ["Selectum Luxury Resort Belek", "Belek"],
  ["Maritim Pine Beach Resort", "Belek"],
  ["Crystal Tat Beach Golf Resort & Spa", "Belek"],
  ["Crystal Family Resort & Spa", "Belek"],
  ["Belconti Resort Hotel", "Belek"],
  ["Sherwood Dreams Resort", "Belek"],
  ["Aydinbey Famous Resort", "Belek"],
  ["Granada Luxury Belek", "Belek"],
  ["Kirman Belazur Resort & Spa", "Belek"],

  // --- Boğazkent -----------------------------------------------------------
  ["Crystal Waterworld Resort & Spa", "Boğazkent"],

  // --- Side, Kumköy, Evrenseki, Çolaklı, Sorgun, Titreyengöl ---------------
  ["Arum Barut Collection", "Kumköy"],
  ["Barut Hemera", "Kumköy"],
  ["Barut Acanthus & Cennet", "Side"],
  ["Side Star Resort", "Gündoğdu"],
  ["Side Star Elegance", "Side"],
  ["Side Star Beach", "Side"],
  ["Royal Dragon Hotel", "Evrenseki"],
  ["Voyage Sorgun", "Sorgun"],
  ["Ali Bey Resort Sorgun", "Sorgun"],
  ["Sunis Kumköy Beach Resort", "Kumköy"],
  ["Sunis Elita Beach Resort", "Kumköy"],
  ["Sunis Evren Beach Resort", "Evrenseki"],
  ["Robinson Club Side", "Side"],
  ["Crystal Sunset Luxury Resort", "Side"],
  ["Crystal Palace Luxury Resort", "Side"],
  ["Alba Resort Hotel", "Çolaklı"],
  ["Alba Royal Hotel", "Çolaklı"],
  ["Aydinbey King's Palace", "Çolaklı"],
  ["Kirman Sidemarin Beach & Spa", "Çolaklı"],
  ["Sunprime C-Lounge", "Kumköy"],
  ["Side Prenses Resort", "Titreyengöl"],
  ["Turquoise Resort Hotel & Spa", "Sorgun"],
  ["Defne Defnem", "Titreyengöl"],
  ["Von Resort Golden Coast", "Çolaklı"],
  ["Melas Resort Hotel", "Sorgun"],

  // --- Kızılot and Kızılağaç ----------------------------------------------
  ["Sunmelia Beach Resort & Spa", "Kızılot"],
  ["Adalya Ocean Deluxe", "Kızılot"],
  ["Seaden Sea Planet Resort & Spa", "Kızılağaç"],
  ["Trendy Verbena Beach Hotel", "Kızılağaç"],
  ["Kirman Arycanda De Luxe", "Kızılağaç"],
  ["Royal Alhambra Palace", "Kızılağaç"],
  ["Side Royal Paradise", "Kızılağaç"],
  ["Turan Prince World", "Kızılağaç"],

  // --- Kemer, Göynük, Beldibi, Kiriş --------------------------------------
  ["Rixos Sungate", "Beldibi"],
  ["Rixos Beldibi", "Beldibi"],
  ["Maxx Royal Kemer Resort", "Kiriş"],
  ["Club Med Palmiye", "Kemer"],
  ["Nirvana Dolce Vita", "Beldibi"],
  ["Orange County Resort Hotel Kemer", "Kemer"],
  ["Crystal Aura Beach Resort & Spa", "Kemer"],
  ["Crystal De Luxe Resort & Spa", "Kemer"],
  ["Crystal Flora Beach Resort", "Beldibi"],
  ["Kemer Barut Collection", "Kemer"],
  ["Limak Limra Hotel & Resort", "Kiriş"],
  ["Sherwood Exclusive Kemer", "Göynük"],
  ["Alva Donna World Palace", "Beldibi"],
  ["Queen's Park Le Jardin", "Göynük"],
  ["Grand Park Kemer", "Kemer"],
  ["Ulusoy Kemer Holiday Club", "Göynük"],
  ["Mirage Park Resort", "Göynük"],
  ["Sealife Buket Resort & Beach", "Beldibi"],

  // --- Tekirova ------------------------------------------------------------
  ["Rixos Premium Tekirova", "Tekirova"],
  ["Amara Dolce Vita Luxury", "Tekirova"],
  ["Marti Myra", "Tekirova"],
  ["Phaselis Rose Hotel", "Tekirova"],
  ["Queen's Park Tekirova", "Tekirova"],

  // --- Alanya and its western resort strip ---------------------------------
  ["Kirman Leodikya Resort", "Okurcalar"],
  ["Aydinbey Gold Dreams", "Okurcalar"],
  ["Justiniano Deluxe Resort", "Okurcalar"],
  ["Utopia World Hotel", "Türkler"],
  ["Long Beach Resort Hotel", "Konaklı"],
  ["Delphin Botanik Platinum", "Türkler"],
  ["Alaiye Resort & Spa", "Avsallar"],
  ["Rubi Platinum Spa Resort", "Alanya merkez"],
  ["Asia Beach Resort & Spa", "Alanya merkez"],
  ["Goldcity Hotel", "Kargıcak"],
  ["Numa Bay Exclusive", "Avsallar"],
  ["Granada Luxury Beach", "Avsallar"],
  ["Bera Alanya Hotel", "Avsallar"],
  ["Alan Xafira Deluxe Resort", "Konaklı"],
  ["Kahya Resort Aqua & Spa", "Konaklı"],
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
  seedRows.map(([name, district, aliases = []]) => {
    const slug = hotelSlug(name);
    const region = districtRegions[district];
    if (!region) throw new Error(`Hotel "${name}" sits in unmapped district "${district}"`);
    return Object.freeze({
      slug, name, region, district,
      aliases: Object.freeze([...aliases]),
      status: verifiedSlugs.has(slug) ? "verified" : "draft",
    });
  }),
);

export const indexedHotelBySlug = (slug) => hotelIndex.find((hotel) => hotel.slug === slug) ?? null;

export const indexedHotelsForRegion = (region) => hotelIndex.filter((hotel) => hotel.region === region);
