/** @typedef {"belek" | "side" | "kemer" | "alanya" | "kizilagac" | "tekirova"} HotelRegionSlug */
/** @typedef {{ slug: string, name: string, regionSlug: HotelRegionSlug, locationCopy: string }} Hotel */

/** @type {Record<string, Hotel>} */
export const hotelCatalog = Object.freeze({
  // Belek
  "rixos-premium-belek": { slug: "rixos-premium-belek", name: "Rixos Premium Belek", regionSlug: "belek", locationCopy: "Das Resort liegt am Strand von Belek, zwischen Kadriye und dem Belek Beach Park." },
  "the-land-of-legends": { slug: "the-land-of-legends", name: "The Land of Legends", regionSlug: "belek", locationCopy: "Das Hotel liegt in Kadriye, im Belek-Gebiet nahe dem Freizeit- und Einkaufsareal." },
  "maxx-royal-belek": { slug: "maxx-royal-belek", name: "Maxx Royal Belek", regionSlug: "belek", locationCopy: "Das Resort befindet sich an der Küste von Belek, in der Hotelzone südlich des Ortszentrums." },
  "regnum-carya": { slug: "regnum-carya", name: "Regnum Carya", regionSlug: "belek", locationCopy: "Das Hotel liegt im Bereich Kadriye in Belek, nahe der Golf- und Resortanlagen." },
  "gloria-golf-resort": { slug: "gloria-golf-resort", name: "Gloria Golf Resort", regionSlug: "belek", locationCopy: "Das Resort liegt im Belek-Gebiet bei Serik, in der Nähe der Golfanlagen und der Küste." },
  "cornelia-diamond-golf-resort": { slug: "cornelia-diamond-golf-resort", name: "Cornelia Diamond Golf Resort & Spa", regionSlug: "belek", locationCopy: "Das Resort liegt in Belek, unmittelbar an einer der renommierten Golfanlagen der Region und nahe der Küste." },
  "ic-hotels-santai": { slug: "ic-hotels-santai", name: "IC Hotels Santai Family Resort", regionSlug: "belek", locationCopy: "Das Familienresort befindet sich in Belek, südlich der D400 in der Küstenhotelzone nahe Kadriye." },
  // Side
  "arum-barut-collection": { slug: "arum-barut-collection", name: "Arum Barut Collection", regionSlug: "side", locationCopy: "Das Hotel liegt in Kumköy, einem Strand- und Hotelviertel westlich von Side." },
  "side-star-resort": { slug: "side-star-resort", name: "Side Star Resort", regionSlug: "side", locationCopy: "Das Resort befindet sich in Gündoğdu, im westlichen Hotelgebiet von Side." },
  "royal-dragon-hotel": { slug: "royal-dragon-hotel", name: "Royal Dragon Hotel", regionSlug: "side", locationCopy: "Das Hotel liegt in Evrenseki, einem beliebten Strandviertel westlich der Altstadt von Side." },
  "barut-hemera": { slug: "barut-hemera", name: "Barut Hemera", regionSlug: "side", locationCopy: "Das Resort liegt im Bereich Kumköy, nahe der Strandpromenade von Side." },
  "voyage-sorgun": { slug: "voyage-sorgun", name: "Voyage Sorgun", regionSlug: "side", locationCopy: "Das Resort liegt in Sorgun, östlich von Side zwischen Pinienwald und Küste." },
  "sentido-flora-garden": { slug: "sentido-flora-garden", name: "Sentido Flora Garden", regionSlug: "side", locationCopy: "Das Hotel befindet sich in Çolaklı, einem Küstenort westlich von Side mit langen Sandstränden." },
  "crystal-sunset-luxury-resort": { slug: "crystal-sunset-luxury-resort", name: "Crystal Sunset Luxury Resort & Spa", regionSlug: "side", locationCopy: "Das Resort liegt in Gündoğdu, im westlichen Strandabschnitt des Side-Gebiets." },
  // Kemer
  "rixos-premium-kemer": { slug: "rixos-premium-kemer", name: "Rixos Premium Kemer", regionSlug: "kemer", locationCopy: "Das Resort liegt in Göynük, einem Strandort unmittelbar westlich des Ortskerns von Kemer, umgeben von Pinienwäldern." },
  "maxx-royal-kemer": { slug: "maxx-royal-kemer", name: "Maxx Royal Kemer Resort", regionSlug: "kemer", locationCopy: "Das Resort befindet sich in Kiriş, einem Küstenabschnitt nördlich des Ortskerns von Kemer am Fuß des Taurus-Gebirges." },
  "orange-county-resort-kemer": { slug: "orange-county-resort-kemer", name: "Orange County Resort Hotel Kemer", regionSlug: "kemer", locationCopy: "Das Hotel liegt in Beldibi, am nördlichen Eingang der Kemerer Küste, nahe der Felsklippen am Mittelmeer." },
  "paloma-pasha-resort": { slug: "paloma-pasha-resort", name: "Paloma Pasha Resort", regionSlug: "kemer", locationCopy: "Das Resort befindet sich in Göynük, an der Küste zwischen der Strandpromenade und der Bucht westlich von Kemer." },
  "club-hotel-phaselis-rose": { slug: "club-hotel-phaselis-rose", name: "Club Hotel Phaselis Rose", regionSlug: "kemer", locationCopy: "Das Hotel liegt in Çamyuva, zwischen dem Kemer-Stadtzentrum und der antiken Stätte Phaselis an einer ruhigen Küstenbucht." },
  // Alanya
  "utopia-world-hotel": { slug: "utopia-world-hotel", name: "Utopia World Hotel", regionSlug: "alanya", locationCopy: "Das Hotel liegt in Konaklı, einem langen Sandstrandabschnitt westlich des Alanya-Zentrums." },
  "sentido-gold-island": { slug: "sentido-gold-island", name: "Sentido Gold Island Hotel", regionSlug: "alanya", locationCopy: "Das Resort liegt im Alanya-Zentrum, nahe dem Kleopatra-Strand und dem Alanya-Hafen." },
  "q-premium-resort": { slug: "q-premium-resort", name: "Q Premium Resort Hotel Alanya", regionSlug: "alanya", locationCopy: "Das Hotel befindet sich in Konaklı, westlich des Alanya-Zentrums, direkt am Sandstrand gelegen." },
  "kirman-arycanda": { slug: "kirman-arycanda", name: "Kirman Arycanda De Luxe", regionSlug: "alanya", locationCopy: "Das Resort liegt in Konaklı, einem Küstengebiet mit langen Stränden westlich des Alanya-Zentrums." },
  "delphin-diva": { slug: "delphin-diva", name: "Delphin Diva Premiere", regionSlug: "alanya", locationCopy: "Das Hotel befindet sich in Avsallar, einem ruhigen Strandort westlich von Alanya inmitten von Pinien- und Eukalyptuswäldern." },
  // Tekirova
  "rixos-premium-tekirova": { slug: "rixos-premium-tekirova", name: "Rixos Premium Tekirova", regionSlug: "tekirova", locationCopy: "Das Resort befindet sich in Tekirova, am Fuße des Taurus-Gebirges, umgeben von Pinienwäldern und dem türkisblauen Mittelmeer." },
  "amara-prestige": { slug: "amara-prestige", name: "Amara Prestige Hotel", regionSlug: "tekirova", locationCopy: "Das Hotel liegt in Tekirova, direkt am Mittelmeer zwischen dem Naturschutzgebiet Olympos und der antiken Stätte Phaselis." },
});

export const hotelBySlug = (slug) => hotelCatalog[slug] ?? null;

export const hotelsForRegion = (regionSlug) =>
  Object.values(hotelCatalog).filter((hotel) => hotel.regionSlug === regionSlug);

export const hotelPaths = Object.freeze(
  Object.keys(hotelCatalog).map((slug) => `/de/hotels/${slug}/`),
);
