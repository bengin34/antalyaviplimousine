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
 * sites disagree about where one belde ends and the next begins — and, as the
 * September 2026 region audit showed, sometimes file a hotel in the wrong town
 * altogether (Delphin Diva Premiere sold as Avsallar, its address in Lara;
 * Dantel Pansiyon on the Antalya-city listing, its address in Kaş). A row's
 * district is therefore a hint, not a land-registry fact, anywhere in the list.
 *
 * Every row is now verified against Google Places address data by
 * `scripts/audit-hotel-regions.mjs`, which writes `checked: true` into
 * `hotel-distances.js` once the Place ID names the hotel and its address agrees
 * with the region here. `src/hotel-region-audit.test.js` fails for any row that
 * is neither checked nor allowlisted with a reason, so a new hotel cannot enter
 * unverified — see `.claude/skills/hotel-region-audit` for the correction loop.
 *
 * Not every row's region comes from its district: the seed rows below and in
 * `hotel-index-antalya-city.js` derive it via `districtRegions`, while the
 * generated `discoveredHotelRows` carry their own `region` and only a coarse
 * ilçe as district.
 *
 * Where a district could defensibly belong to either of two regions and those
 * two prices differ sharply, it is filed under the dearer one. The quoted
 * price is a fixed commitment for the whole vehicle, so an under-quote is a
 * loss carried on every single transfer to that hotel for as long as the row
 * stays wrong, while an over-quote costs at most the one booking that walks
 * away. The two are not symmetric, so the tie is broken towards the dearer
 * region and a corrected row can always bring the price down later.
 *
 * `status` records whether the operator's own German catalogue names the hotel
 * (`verified`) or not (`draft`). It says nothing about the region: that trust
 * lives in the audit's `checked` flag described above. The booking form treats
 * an index hit as a *pre-selection* the guest can still change, never as a
 * locked value.
 */
import { antalyaCitySeedRows } from "./hotel-index-antalya-city.js";
import { discoveredHotelRows } from "./hotel-index-discovered.js";
import { hotelCatalog } from "./hotels.js";

/** @typedef {keyof typeof import("./routes.js").routeCatalog} IndexRegionSlug */
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
  // Kumluca/Adrasan — €120 Vito
  "Kumluca": "kumluca",
  "Adrasan": "kumluca",
  // Kaş — €170 Vito
  "Kaş": "kas",
  // Batı Alanya — €70 Vito
  "Okurcalar": "alanya_bati",
  "İncekum": "alanya_bati",
  "Avsallar": "alanya_bati",
  "Türkler": "alanya_bati",
  "Payallar": "alanya_bati",
  "Konaklı": "alanya_bati",
  // Alanya merkez — €75 Vito
  "Alanya merkez": "alanya_merkez",
  "Oba": "alanya_merkez",
  "Tosmur": "alanya_merkez",
  // Doğu Alanya — €80 Vito
  "Kestel": "alanya_dogu",
  "Mahmutlar": "alanya_dogu",
  // Kargıcak — €90 Vito
  "Kargıcak": "kargicak",
  // Demirtaş — €100 Vito
  "Demirtaş": "demirtas",
});

/** @type {HotelSeedRow[]} */
const seedRows = [
  // --- Antalya city, Lara, Kundu, Konyaaltı -------------------------------
  ["Delphin Imperial Lara", "Lara"],
  ["Delphin Palace", "Lara"],
  ["Delphin BE Grand Resort", "Lara"],
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
  // Seed said Avsallar; its own address is Aksu (audit 2026-09, €35/vehicle) —
  // this is the Lara/Kundu Delphin Diva, not an Alanya hotel of the same name.
  ["Delphin Diva Premiere", "Aksu"],
  // Seed said Kadriye; its own address is Antalya merkez, in Muratpaşa
  // (audit 2026-09, €5/vehicle).
  ["Fun & Sun Smart River Resort", "Antalya merkez"],

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
  // Google lists it as "Dobedan Exclusive Hotel Belek" (rebrand or spelling; region audit 2026-09).
  ["Selectum Luxury Resort Belek", "Belek"],
  ["Selectum Family Resort Belek", "Belek"],
  ["Maritim Pine Beach Resort", "Belek"],
  ["Crystal Tat Beach Golf Resort & Spa", "Belek"],
  ["Belconti Resort Hotel", "Belek"],
  ["Granada Luxury Belek", "Belek"],
  ["Ethno Belek Hotel", "Belek"],
  ["Novia Dionis Resort & Spa", "Belek"],
  ["The Land of Legends", "Kadriye", ["The Land of Legends Kingdom Hotel", "Legends", "Land of Legends Nickelodeon"]],
  ["Megasaray Club Belek", "Kadriye"],
  ["Innvista Hotel Belek", "Kadriye"],
  ["Cullinan Belek", "Kadriye"],
  ["Belek Diamonds Hotel", "Kadriye"],
  ["Dionisus Hotel & Spa Belek", "Kadriye"],
  ["Sarp Hotel Kadriye", "Kadriye"],
  ["TUI Magic Life Belek", "Kadriye"],
  // Seed said Antalya merkez; its own address is Kadriye (audit 2026-09,
  // €5/vehicle).
  ["Demirci Hotel", "Kadriye"],
  // Seed said Antalya merkez; its own address is Belek (audit 2026-09,
  // €5/vehicle).
  ["Eden Nest Exclusive Hotel", "Belek"],

  // --- Boğazkent -----------------------------------------------------------
  // Sold as Belek, but its own address is Boğazkent (audit 2026-09, €5/vehicle).
  ["Alva Donna Exclusive Hotel & Spa", "Boğazkent", ["Dobedan Exclusive Hotel Belek"]],
  ["Crystal Waterworld Resort & Spa", "Boğazkent"],
  ["Aydinbey Famous Resort", "Boğazkent"],
  // Its own address reads Belek, TripAdvisor files it under Boğazkent. Split
  // evidence across a price boundary goes to the dearer side.
  ["Sherwood Dreams Resort", "Boğazkent"],
  // Sold as "Belek" by the booking sites the seed came from, but its own
  // address is Boğazkent, Serik — 8 km east of Belek, across the price line.
  ["Kirman Belazur Resort & Spa", "Boğazkent"],
  // All three were seeded as Belek, but their own addresses are Boğazkent
  // (audit 2026-09, €5/vehicle each).
  // Its name says Belek and it was quoted as Belek, but its own address is
  // Boğazkent, Serik — across the price line (audit 2026-09, €5/vehicle).
  ["Orange County Resort Hotel Belek", "Boğazkent", ["Orange County Belek"]],
  ["Crystal Family Resort & Spa", "Boğazkent"],
  ["Port Nature Luxury Resort", "Boğazkent"],
  ["Belek Beach Resort Hotel", "Boğazkent"],

  // --- Side, Kumköy, Evrenseki, Gündoğdu ----------------------------------
  ["Barut Acanthus & Cennet", "Side"],
  ["Side Star Elegance", "Side"],
  ["Side Star Beach", "Side"],
  ["Robinson Club Side", "Side"],
  ["Crystal Sunset Luxury Resort & Spa", "Gündoğdu"],
  ["Arum Barut Collection", "Kumköy"],
  ["Barut Hemera", "Kumköy"],
  ["Cesars Resort", "Kumköy", ["Sezar Resort", "Cesar Side", "Cesars Side", "Sezar Side"]],
  ["Sunis Kumköy Beach Resort", "Kumköy"],
  ["Sunprime C-Lounge", "Tosmur"],
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
  // Google lists it as "Marvida Family Eco" (rebrand or spelling; region audit 2026-09).
  ["Otium Family Eco Club", "Sorgun", ["Marvida Family Eco"]],
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
  ["Adalya Ocean Deluxe", "Evrenseki"],
  ["Seaden Sea Planet Resort & Spa", "Kızılot"],
  ["Crystal Admiral Resort & Spa", "Kızılot"],
  ["Alarcha Hotels & Resort", "Okurcalar"],
  ["Osay Magic Garden", "Kızılot"],
  ["Esmeralda Butik Otel", "Kızılot"],
  ["Selge Beach Resort & Spa", "Kızılağaç"],
  ["Seaden Sea World Resort & Spa", "Kızılağaç"],
  ["Seaden De Mar Resort & Spa", "Kızılağaç"],
  ["Asteria Bloom Side", "Kızılağaç"],
  ["Sultan of Dreams Hotel & Spa", "Kızılağaç"],
  // Seed said Kumköy; its own address is Kızılağaç (audit 2026-09,
  // €20/vehicle).
  ["Sunis Elita Beach Resort", "Kızılağaç"],
  // Came off the Antalya city listing filed under Manavgat; its own address is
  // Kızılağaç, not Manavgat centre (audit 2026-09, €20/vehicle).
  ["Otium Family Club Marine Beach Otel", "Kızılağaç"],
  // Sold as Çolaklı, and Google names it "Flora Garden Beach Hotel" at a
  // Kızılağaç address, east of Side across the price line (audit 2026-09,
  // €20/vehicle).
  ["Sentido Flora Garden", "Kızılağaç"],

  // --- Kemer, Göynük, Beldibi, Kiriş, Çamyuva -----------------------------
  // The former Amara Club Marine in Göynük, not the Tekirova Amara; its address is Kemer (audit 2026-09, €20/vehicle).
  ["Amara Prestige Hotel", "Göynük", ["Crystal Prestige Elite Hotel"]],
  // Monna Roza Family Suit is in Kemer, not Antalya city (audit 2026-09, €20/vehicle).
  ["Monna Roza Family Suit", "Kemer"],
  // Hotel Deja Vu is in Kemer, not Antalya city (audit 2026-09, €20/vehicle).
  ["Deja Vu Hotel", "Kemer"],
  // Google finds Akın Apart & Hotel in Çamyuva, not Antalya city (audit 2026-09, €20/vehicle).
  ["Akın Apart&Hotel", "Çamyuva"],
  ["Club Med Palmiye", "Kemer"],
  ["Orange County Resort Hotel Kemer", "Beldibi"],
  ["Crystal Aura Beach Resort & Spa", "Kemer"],
  ["Crystal De Luxe Resort & Spa", "Kemer"],
  ["Kemer Barut Collection", "Kemer"],
  // Google lists it as "Corendon Playa Kemer" (rebrand or spelling; region audit 2026-09).
  ["Grand Park Kemer", "Kemer", ["Corendon Playa Kemer"]],
  ["Seven Seas Hotel Life Kemer", "Kemer"],
  ["Viking Star Hotel", "Kemer"],
  ["Rixos Sungate", "Beldibi"],
  ["Rixos Beldibi", "Beldibi"],
  ["Crystal Flora Beach Resort", "Beldibi"],
  ["Sealife Buket Resort & Beach", "Okurcalar"],
  // Google lists it as "Dobedan World Palace Kemer" (rebrand or spelling; region audit 2026-09).
  ["Alva Donna World Palace", "Beldibi", ["Dobedan World Palace Kemer"]],
  ["Juju Premier Palace", "Beldibi"],
  ["Nirvana Mediterranean Excellence", "Beldibi"],
  ["Corendon Playa Kemer", "Beldibi"],
  ["The Grand Ring Hotel", "Beldibi"],
  ["Champion Holiday Village", "Beldibi"],
  ["Aydinbey Siu Collection", "Beldibi"],
  ["Paloma Pasha Resort", "Göynük"],
  ["Sherwood Exclusive Kemer", "Göynük"],
  ["Queen's Park Le Jardin", "Göynük"],
  ["Ulusoy Kemer Holiday Club", "Göynük"],
  ["Mirage Park Resort", "Göynük"],
  ["Imperial Sunland Resort", "Göynük"],
  ["Maxx Royal Kemer Resort", "Kiriş"],
  ["Limak Limra Hotel & Resort", "Kiriş"],
  ["Aleria Belport Beach Hotel", "Çamyuva"],
  // Seeded as Antalya merkez off the city listing, but their own addresses
  // are in Kemer and its beldes (audit 2026-09, €20/vehicle each).
  ["Caner Mountain Hotel", "Kemer"],
  ["Dg Hotels Rose Resort", "Kemer"],
  ["Güler Butık Hotel", "Beldibi"],
  ["Hotel Gold Stone", "Beldibi"],
  ["Melodi Hotel", "Beldibi"],
  ["Peker Otel", "Göynük"],

  // --- Tekirova ------------------------------------------------------------
  ["Rixos Premium Tekirova", "Tekirova"],
  // Google lists it as "Crystal Prestige Elite Hotel" (rebrand or spelling; region audit 2026-09).
  ["Amara Dolce Vita Luxury", "Tekirova"],
  ["Nirvana Dolce Vita", "Tekirova"],
  ["Marti Myra", "Tekirova"],
  ["Queen's Park Tekirova", "Tekirova"],
  ["Mövenpick Resort Tekirova", "Tekirova"],
  ["Güral Premier Tekirova", "Tekirova"],
  ["Rai Premium Tekirova", "Tekirova"],
  ["Le Marden Hotel Spa", "Tekirova"],
  // Seed said Çamyuva; its own address is Tekirova (audit 2026-09,
  // €20/vehicle).
  ["Club Hotel Phaselis Rose", "Tekirova", ["Phaselis Rose Hotel"]],
  // Named for Kemer and seeded in Göynük, but the only Rixos Premium on this
  // coast is the Tekirova one, and Google resolves the name there
  // (audit 2026-09, €20/vehicle).
  ["Rixos Premium Kemer", "Tekirova"],

  // --- Alanya and its western resort strip ---------------------------------
  // Apart Arsi Sweet Suite sits in Güller Pınarı, Alanya, not Antalya city (audit 2026-09, €40/vehicle).
  ["Arsi Sweet Suite Hotel", "Alanya merkez"],
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
  ["Delphin Botanik Platinum", "Türkler"],
  ["Sirius Deluxe Hotel", "Türkler"],
  // Seed said Alanya merkez; Google names it "Gold Island Selected" at a
  // Türkler address, west of the centre (audit 2026-09, €5/vehicle).
  ["Sentido Gold Island Hotel", "Türkler"],
  ["Long Beach Resort Hotel", "Konaklı"],
  ["Q Premium Resort Hotel Alanya", "Konaklı"],
  ["Kirman Arycanda De Luxe", "Konaklı"],
  ["Alan Xafira Deluxe Resort", "Konaklı"],
  ["Kahya Resort Aqua & Spa", "Konaklı"],
  // Google lists it as "Antique Hotel" (rebrand or spelling; region audit 2026-09).
  ["The Antik Hotel", "Konaklı", ["Antique Hotel"]],
  ["Asia Beach Resort & Spa", "Alanya merkez"],
  ["Klas More Beach Hotel", "Mahmutlar"],
  ["Sey Beach Hotel & Spa", "Kestel"],
  ["Goldcity Hotel", "Kargıcak"],
  ["Lumos Deluxe Resort Hotel", "Kargıcak"],
  // Seed said Konaklı; its own address is Kargıcak, east of Alanya
  // (audit 2026-09, €20/vehicle).
  ["Utopia World Hotel", "Kargıcak"],
];

/**
 * Districts that border a district sold as a different region. A hotel filed
 * in the wrong one of these is quoted the wrong price with no other symptom,
 * so `scripts/hotel-index-review.mjs` walks these first. It is a review
 * priority list, not a bound on the risk: the 2026-09 audit moved hotels
 * between regions that share no border here (Avsallar → Aksu, Konaklı →
 * Kargıcak, Antalya merkez → Kaş), and the address audit above is what
 * actually catches those.
 *
 * @type {readonly string[]}
 */
export const priceBoundaryDistricts = Object.freeze([
  "Çamyuva", "Tekirova",     // kemer €55 ↔ tekirova €75 — the widest gap left
  "Kundu", "Aksu",           // antalya €35 ↔ belek €40
  "Belek", "Boğazkent",      // belek €40 ↔ bogazkent €45 ↔ side €50
  "Çolaklı", "Kızılot",      // side €50 ↔ kizilagac €60
  "Kızılağaç", "Okurcalar",  // kizilagac €60 ↔ alanya_bati €70
]);

/**
 * Hotels confirmed against the operator's own records. The German landing
 * catalogue is hand-written per hotel — its copy names the district — so every
 * entry there counts as confirmed; everything else stays a draft until
 * reviewed. Matched on the hotel's name, because that catalogue keeps its own
 * hand-written slugs and they do not always follow `hotelSlug`.
 */
const verifiedSlugs = new Set(Object.values(hotelCatalog).map((hotel) => hotelSlug(hotel.name)));

/** @typedef {{ slug: string, name: string, region: IndexRegionSlug, district: string, aliases: readonly string[], status: "verified" | "draft", regionSource: "district" | "discovery", placeId?: string }} IndexedHotel */

/** @type {readonly IndexedHotel[]} */
export const hotelIndex = Object.freeze(
  [...seedRows, ...antalyaCitySeedRows].map(([name, district, aliases = []]) => {
    const slug = hotelSlug(name);
    const region = districtRegions[district];
    if (!region) throw new Error(`Hotel "${name}" sits in unmapped district "${district}"`);
    return Object.freeze({
      slug, name, region, district,
      aliases: Object.freeze([...aliases]),
      status: verifiedSlugs.has(slug) ? "verified" : "draft",
      regionSource: "district",
    });
  }).concat(discoveredHotelRows.map(({ name, district, region, placeId, aliases = [] }) => Object.freeze({
    slug: hotelSlug(name),
    name,
    region,
    district,
    aliases: Object.freeze([...aliases]),
    status: "draft",
    regionSource: "discovery",
    placeId,
  }))),
);

export const indexedHotelBySlug = (slug) => hotelIndex.find((hotel) => hotel.slug === slug) ?? null;

export const indexedHotelsForRegion = (region) => hotelIndex.filter((hotel) => hotel.region === region);
