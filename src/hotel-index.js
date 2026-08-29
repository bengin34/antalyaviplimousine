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
 * The seed was compiled from public hotel listings in August 2026. Listing
 * sites disagree about where one belde ends and the next begins, so a row's
 * district is a strong hint, not a land-registry fact. That only matters at a
 * price boundary — see `priceBoundaryDistricts` — because filing a hotel under
 * the wrong district inside one region quotes exactly the same price.
 *
 * Where a district could defensibly belong to either of two regions and those
 * two prices differ sharply, it is filed under the dearer one. The quoted
 * price is a fixed commitment for the whole vehicle, so an under-quote is a
 * loss carried on every single transfer to that hotel for as long as the row
 * stays wrong, while an over-quote costs at most the one booking that walks
 * away. The two are not symmetric, so the tie is broken towards the dearer
 * region and a corrected row can always bring the price down later.
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
  // Okurcalar is administratively Alanya but sits roughly 30 km short of it,
  // so it could be argued into Manavgat/Kızılağaç. It stays on the dearer
  // side, per the rule above. ALANYA_PRICING_PLAN.md would settle it properly
  // at €65 once the five Alanya sub-regions exist.
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
  ["Kervansaray Kundu", "Kundu", ["Kervansaray Lara"]],
  ["Grand Park Lara", "Lara"],
  ["Trendy Lara Hotel", "Lara"],

  // --- Belek, Kadriye, Serik ----------------------------------------------
  ["Rixos Premium Belek", "Belek"],
  ["Rixos Park Belek", "Belek"],
  ["Regnum Carya", "Kadriye"],
  ["Maxx Royal Belek", "Belek", ["Maxx Royal Belek Golf Resort"]],
  ["Gloria Golf Resort", "Belek"],
  ["Gloria Verde Resort", "Belek"],
  ["Gloria Serenity Resort", "Belek"],
  ["Cornelia Diamond Golf Resort & Spa", "Belek"],
  ["Cornelia De Luxe Resort", "Belek"],
  ["Titanic Deluxe Golf Belek", "Belek"],
  ["Kaya Palazzo Golf Resort", "Belek"],
  ["Kaya Belek Hotel", "Belek"],
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
  ["Alva Donna Exclusive Hotel & Spa", "Belek"],
  ["Selectum Luxury Resort Belek", "Belek"],
  ["Selectum Family Resort Belek", "Belek"],
  ["Maritim Pine Beach Resort", "Belek"],
  ["Crystal Tat Beach Golf Resort & Spa", "Belek"],
  ["Crystal Family Resort & Spa", "Belek"],
  ["Belconti Resort Hotel", "Belek"],
  ["Granada Luxury Belek", "Belek"],
  ["Kirman Belazur Resort & Spa", "Belek"],
  ["Ethno Belek Hotel", "Belek"],
  ["Port Nature Luxury Resort", "Belek"],
  ["Novia Dionis Resort & Spa", "Belek"],
  ["Belek Beach Resort Hotel", "Belek"],
  ["The Land of Legends", "Kadriye", ["The Land of Legends Kingdom Hotel", "Legends", "Land of Legends Nickelodeon"]],
  ["Megasaray Club Belek", "Kadriye"],
  ["Innvista Hotel Belek", "Kadriye"],
  ["Cullinan Belek", "Kadriye"],
  ["Belek Diamonds Hotel", "Kadriye"],
  ["Dionisus Hotel & Spa Belek", "Kadriye"],
  ["Sarp Hotel Kadriye", "Kadriye"],
  ["TUI Magic Life Belek", "Kadriye"],
  ["Fun & Sun Smart River Resort", "Kadriye"],

  // --- Boğazkent -----------------------------------------------------------
  ["Crystal Waterworld Resort & Spa", "Boğazkent"],
  ["Aydinbey Famous Resort", "Boğazkent"],
  // Its own address reads Belek, TripAdvisor files it under Boğazkent. Split
  // evidence across a price boundary goes to the dearer side.
  ["Sherwood Dreams Resort", "Boğazkent"],

  // --- Side, Kumköy, Evrenseki, Gündoğdu ----------------------------------
  ["Barut Acanthus & Cennet", "Side"],
  ["Side Star Elegance", "Side"],
  ["Side Star Beach", "Side"],
  ["Robinson Club Side", "Side"],
  ["Crystal Sunset Luxury Resort", "Side"],
  ["Arum Barut Collection", "Kumköy"],
  ["Barut Hemera", "Kumköy"],
  ["Sunis Kumköy Beach Resort", "Kumköy"],
  ["Sunis Elita Beach Resort", "Kumköy"],
  ["Sunprime C-Lounge", "Kumköy"],
  ["Hotel Terrace Beach Resort", "Kumköy"],
  ["Narcia Resort Side", "Kumköy"],
  ["Side Village Hotel", "Kumköy"],
  ["Castival Hotel", "Kumköy"],
  ["The Sense Deluxe Hotel", "Kumköy"],
  ["Trendy Verbena Beach Hotel", "Kumköy"],
  ["Seaden Quality Resort & Spa", "Kumköy"],
  ["Royal Dragon Hotel", "Evrenseki"],
  ["Sunis Evren Beach Resort", "Evrenseki"],
  ["Q Spa Resort", "Evrenseki"],
  ["Adalya Grand Art Side", "Evrenseki"],
  ["Adalya Resort & Spa", "Evrenseki"],
  ["Adalya Ocean Hotel", "Evrenseki"],
  ["Side Premium Hotel", "Evrenseki"],
  ["Side Crown Palace", "Evrenseki"],
  ["Royal Taj Mahal Hotel", "Evrenseki"],
  ["Seher Resort & Spa", "Evrenseki"],
  ["Seher Sun Beach", "Evrenseki"],
  ["Sultan of Side", "Evrenseki"],
  ["Side Sunport Hotel & Spa", "Evrenseki"],
  ["Miramare Queen Resort", "Evrenseki"],
  ["Side Star Resort", "Gündoğdu"],
  ["Trendy Aspendos Beach", "Gündoğdu"],
  ["TUI Magic Life Jacaranda", "Gündoğdu"],
  ["Terrace Elite Resort", "Gündoğdu"],
  ["Novum Garden Side Hotel", "Gündoğdu"],
  ["Crystal Palace Luxury Resort", "Gündoğdu"],
  ["Side Orange Paradise Hotel", "Gündoğdu"],

  // --- Sorgun and Titreyengöl ---------------------------------------------
  ["Voyage Sorgun", "Sorgun"],
  ["Ali Bey Resort Sorgun", "Sorgun"],
  ["Turquoise Resort Hotel & Spa", "Sorgun"],
  ["Melas Resort Hotel", "Sorgun"],
  ["Otium Hotel Seven Seas", "Sorgun", ["Seven Seas Hotel Blue"]],
  ["Otium Family Eco Club", "Sorgun"],
  ["Side Moon Palace Hotel", "Sorgun"],
  ["AQI Pegasos World", "Sorgun"],
  ["Megasaray Resort Side", "Sorgun"],
  ["Side Prenses Resort", "Titreyengöl"],
  ["Defne Defnem", "Titreyengöl"],
  ["Water Side Resort & Spa", "Titreyengöl"],
  ["Kaya Side", "Titreyengöl"],
  ["TUI Blue Side Family Resort", "Titreyengöl"],
  ["Lago Hotel", "Titreyengöl"],
  ["Monachus Hotel & Spa", "Titreyengöl"],
  ["La Vita Hotels", "Titreyengöl"],
  ["Asteria Collection Side", "Titreyengöl"],
  ["Marvida Family Eco Side", "Titreyengöl"],

  // --- Çolaklı --------------------------------------------------------------
  ["Alba Resort Hotel", "Çolaklı"],
  ["Alba Royal Hotel", "Çolaklı"],
  ["Alba Queen Hotel", "Çolaklı"],
  ["Aydinbey King's Palace", "Çolaklı"],
  ["Kirman Sidemarin Beach & Spa", "Çolaklı"],
  ["Von Resort Golden Coast", "Çolaklı"],
  ["Royal Alhambra Palace", "Çolaklı"],
  ["Mary Palace Resort & Spa", "Çolaklı"],
  ["Hane Sun Elite Hotel", "Çolaklı"],
  ["Sentido Kamelya Fulya", "Çolaklı", ["Kamelya Collection"]],
  ["Victory Resort Hotel", "Çolaklı"],
  ["Sural Garden Hotel", "Çolaklı"],

  // --- Kızılot and Kızılağaç ----------------------------------------------
  ["Sunmelia Beach Resort & Spa", "Kızılot"],
  ["Adalya Ocean Deluxe", "Kızılot"],
  ["Seaden Sea Planet Resort & Spa", "Kızılot"],
  ["Crystal Admiral Resort & Spa", "Kızılot"],
  ["Flora Garden Beach", "Kızılot"],
  ["Alarcha Hotels & Resort", "Kızılot"],
  ["Osay Magic Garden", "Kızılot"],
  ["Esmeralda Butik Otel", "Kızılot"],
  ["Selge Beach Resort & Spa", "Kızılağaç"],
  ["Seaden Sea World Resort & Spa", "Kızılağaç"],
  ["Asteria Bloom Side", "Kızılağaç"],
  ["Sultan of Dreams Hotel & Spa", "Kızılağaç"],

  // --- Kemer, Göynük, Beldibi, Kiriş, Çamyuva -----------------------------
  ["Club Med Palmiye", "Kemer"],
  ["Orange County Resort Hotel Kemer", "Kemer"],
  ["Crystal Aura Beach Resort & Spa", "Kemer"],
  ["Crystal De Luxe Resort & Spa", "Kemer"],
  ["Kemer Barut Collection", "Kemer"],
  ["Grand Park Kemer", "Kemer"],
  ["Seven Seas Hotel Life Kemer", "Kemer"],
  ["Viking Star Hotel", "Kemer"],
  ["Rixos Sungate", "Beldibi"],
  ["Rixos Beldibi", "Beldibi"],
  ["Crystal Flora Beach Resort", "Beldibi"],
  ["Sealife Buket Resort & Beach", "Beldibi"],
  ["Alva Donna World Palace", "Beldibi"],
  ["Juju Premier Palace", "Beldibi"],
  ["Nirvana Mediterranean Excellence", "Beldibi"],
  ["Corendon Playa Kemer", "Beldibi"],
  ["The Grand Ring Hotel", "Beldibi"],
  ["Champion Holiday Village", "Beldibi"],
  ["Aydinbey Siu Collection", "Beldibi"],
  ["Sherwood Exclusive Kemer", "Göynük"],
  ["Queen's Park Le Jardin", "Göynük"],
  ["Ulusoy Kemer Holiday Club", "Göynük"],
  ["Mirage Park Resort", "Göynük"],
  ["Imperial Sunland Resort", "Göynük"],
  ["Maxx Royal Kemer Resort", "Kiriş"],
  ["Limak Limra Hotel & Resort", "Kiriş"],
  ["Aleria Belport Beach Hotel", "Çamyuva"],

  // --- Tekirova ------------------------------------------------------------
  ["Rixos Premium Tekirova", "Tekirova"],
  ["Amara Dolce Vita Luxury", "Tekirova"],
  ["Nirvana Dolce Vita", "Tekirova"],
  ["Marti Myra", "Tekirova"],
  ["Club Hotel Phaselis Rose", "Tekirova", ["Phaselis Rose Hotel"]],
  ["Queen's Park Tekirova", "Tekirova"],
  ["Mövenpick Resort Tekirova", "Tekirova"],
  ["Güral Premier Tekirova", "Tekirova"],
  ["Rai Premium Tekirova", "Tekirova"],
  ["Le Marden Hotel Spa", "Tekirova"],

  // --- Alanya and its western resort strip ---------------------------------
  ["Kirman Leodikya Resort", "Okurcalar"],
  ["Aydinbey Gold Dreams", "Okurcalar"],
  ["Justiniano Deluxe Resort", "Okurcalar"],
  ["Sidera Kirman Premium", "Okurcalar"],
  ["Orange County Alanya", "Okurcalar"],
  ["Alaiye Resort & Spa", "Avsallar"],
  ["Numa Bay Exclusive", "Avsallar"],
  ["Granada Luxury Beach", "Avsallar"],
  ["Bera Alanya Hotel", "Avsallar"],
  ["Azura Deluxe Resort & Spa", "Avsallar"],
  ["Rubi Platinum Spa Resort", "Avsallar"],
  ["Otel İncekum Su", "İncekum"],
  ["Utopia World Hotel", "Türkler"],
  ["Delphin Botanik Platinum", "Türkler"],
  ["Sirius Deluxe Hotel", "Türkler"],
  ["Long Beach Resort Hotel", "Konaklı"],
  ["Alan Xafira Deluxe Resort", "Konaklı"],
  ["Kahya Resort Aqua & Spa", "Konaklı"],
  ["The Antik Hotel", "Konaklı"],
  ["Asia Beach Resort & Spa", "Alanya merkez"],
  ["Klas More Beach Hotel", "Mahmutlar"],
  ["Sey Beach Hotel & Spa", "Kestel"],
  ["Goldcity Hotel", "Kargıcak"],
  ["Lumos Deluxe Resort Hotel", "Kargıcak"],
];

/**
 * Districts that border a district sold as a different region. A hotel filed
 * in the wrong one of these is quoted the wrong price, so these are where
 * checking the list actually pays; everywhere else a district mix-up is
 * invisible in the quote.
 *
 * @type {readonly string[]}
 */
export const priceBoundaryDistricts = Object.freeze([
  "Kundu", "Aksu",           // antalya €35 ↔ belek €40
  "Belek", "Boğazkent",      // belek €40 ↔ bogazkent €45 ↔ side €50
  "Çolaklı", "Kızılot",      // side €50 ↔ kizilagac €60
  "Kızılağaç", "Okurcalar",  // kizilagac €60 ↔ alanya €95
  "Çamyuva", "Tekirova",     // kemer €55 ↔ tekirova €75
]);

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
