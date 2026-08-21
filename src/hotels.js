/** @typedef {"belek" | "side" | "kemer" | "alanya" | "kizilagac" | "tekirova"} HotelRegionSlug */
/** @typedef {{ slug: string, name: string, regionSlug: HotelRegionSlug, locationCopy: string }} Hotel */

/** @type {Record<string, Hotel>} */
export const hotelCatalog = Object.freeze({
  "rixos-premium-belek": { slug: "rixos-premium-belek", name: "Rixos Premium Belek", regionSlug: "belek", locationCopy: "Das Resort liegt am Strand von Belek, zwischen Kadriye und dem Belek Beach Park." },
  "the-land-of-legends": { slug: "the-land-of-legends", name: "The Land of Legends", regionSlug: "belek", locationCopy: "Das Hotel liegt in Kadriye, im Belek-Gebiet nahe dem Freizeit- und Einkaufsareal." },
  "maxx-royal-belek": { slug: "maxx-royal-belek", name: "Maxx Royal Belek", regionSlug: "belek", locationCopy: "Das Resort befindet sich an der Küste von Belek, in der Hotelzone südlich des Ortszentrums." },
  "regnum-carya": { slug: "regnum-carya", name: "Regnum Carya", regionSlug: "belek", locationCopy: "Das Hotel liegt im Bereich Kadriye in Belek, nahe der Golf- und Resortanlagen." },
  "gloria-golf-resort": { slug: "gloria-golf-resort", name: "Gloria Golf Resort", regionSlug: "belek", locationCopy: "Das Resort liegt im Belek-Gebiet bei Serik, in der Nähe der Golfanlagen und der Küste." },
  "arum-barut-collection": { slug: "arum-barut-collection", name: "Arum Barut Collection", regionSlug: "side", locationCopy: "Das Hotel liegt in Kumköy, einem Strand- und Hotelviertel westlich von Side." },
  "side-star-resort": { slug: "side-star-resort", name: "Side Star Resort", regionSlug: "side", locationCopy: "Das Resort befindet sich in Gündoğdu, im westlichen Hotelgebiet von Side." },
  "royal-dragon-hotel": { slug: "royal-dragon-hotel", name: "Royal Dragon Hotel", regionSlug: "side", locationCopy: "Das Hotel liegt in Evrenseki, einem beliebten Strandviertel westlich der Altstadt von Side." },
  "barut-hemera": { slug: "barut-hemera", name: "Barut Hemera", regionSlug: "side", locationCopy: "Das Resort liegt im Bereich Kumköy, nahe der Strandpromenade von Side." },
  "voyage-sorgun": { slug: "voyage-sorgun", name: "Voyage Sorgun", regionSlug: "side", locationCopy: "Das Resort liegt in Sorgun, östlich von Side zwischen Pinienwald und Küste." },
});

export const hotelBySlug = (slug) => hotelCatalog[slug] ?? null;

export const hotelsForRegion = (regionSlug) =>
  Object.values(hotelCatalog).filter((hotel) => hotel.regionSlug === regionSlug);

export const hotelPaths = Object.freeze(
  Object.keys(hotelCatalog).map((slug) => `/de/hotels/${slug}/`),
);
