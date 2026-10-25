import type { TransferLandingCopy } from "../transfer-landing-copy";

/**
 * Hungarian marks direction with a suffix rather than a preposition, so the
 * sentences here carry no preposition at all and every region states its own
 * -ba/-ban/-ból forms. The catalogue name is the nominative only.
 *
 * Written by the team, not natively reviewed yet — flag any wording a
 * Hungarian reader would phrase differently before the next content pass.
 */
export const hu: TransferLandingCopy = {
  heroHeading: (name) => `Antalya repülőtér → ${name}: privát transzfer`,
  heroCta: "Transzfer rendelése",
  heroTrust: [
    "Legfeljebb 7 személy",
    "Előre fizetés nélkül",
    "Fizetés közvetlenül a sofőrnek",
    "Fix végösszeg, rejtett költségek nélkül",
    "Gyerekülés kérésre díjmentesen",
    "Repülőjárat követése az árban",
  ],
  serviceHeading: (name) => `Privát transzfer ${name}`,
  aboutHeading: (name) => `Az úti cél: ${name}`,
  ownGroup: (name) =>
    `Csak a saját társaságával utazik, egyenesen a ${name} lévő szállodájához. Nincs gyűjtőbusz, nincsenek idegen utasok és nincsenek kitérők más szállodákhoz — a fix ár a teljes járműre érvényes.`,
  arrivalHeading: "Megérkezés az antalyai repülőtérre",
  arrivalBody:
    "Miután felvette a csomagjait, menjen a Meet & Greet J / 777 zónához. Repülőtéri csapatunk megtalálja a foglalását, és átadja Önt a sofőrnek. A járatot követjük, így késés esetén a felvétel ideje felárasztás nélkül csúszik.",
  returnHeading: "Visszaút",
  returnBody: (name) =>
    `A visszautat ${name} az antalyai repülőtérre ugyanígy megszervezzük. Foglaláskor adja meg a járatszámot és a kért felvételi időt.`,
  privateHeading: "Privát, nem gyűjtő",
  privateBody: (name) =>
    `A járműben csak Ön és az útitársai utaznak. A foglalás után világos visszaigazolást kap az utazás adataival és egy közvetlen kapcsolattartóval. Az érkezés napján csapatunk követi a járatot; ha korábban vagy később landol, ennek megfelelően mozdítjuk a találkozást. A sofőr a csomagokkal együtt a szálloda recepciójáig vagy a ${name} megadott privát címig viszi Önt.`,
  priceBody:
    "A feltüntetett összeg fix végösszeg a járműre, nem személyenkénti ár. Nincs rejtett felár a járatkövetésért, a szokásos várakozási időért vagy a kérésre biztosított gyerekülésekért. Készpénzben közvetlenül a sofőrnek fizet az út elején, így a költség már indulás előtt rendezett.",
  vehicleHeading: "Jármű, csomag és gyerekek",
  vehicleBody:
    "A Mercedes Vito legfeljebb hat utasnak felel meg szokásos nyaralási csomaggal; a nagyobb társaságok Mercedes Sprinterrel utaznak, legfeljebb 12 hellyel. Foglaláskor írja meg, ha túlméretes csomag, babakocsi vagy gyerekülés kell, és a járművet a társaságához igazítjuk.",
  wholeVehicle: "A teljes jármű ára",
  priceTrust: [
    "Előre fizetés nélkül",
    "Fizetés közvetlenül a sofőrnek",
    "Rejtett költségek nélkül",
  ],
  hotelsEyebrow: "A szállásához",
  hotelsHeading: (name) => `Népszerű szállodák ${name}`,
  hotelsBody: () => "Ezekhez és a környék bármely más szállodájához közvetlenül visszük.",
  faq: [
    [
      "Hol találom a transzfercsapatot az antalyai repülőtéren?",
      "A csomagfelvétel után menjen a Meet & Greet J / 777 zónához. Csapatunk megtalálja a foglalását, és a sofőrhöz vezeti Önt.",
    ],
    [
      "Előre ki kell fizetnem a transzfert?",
      "Nem. Előre fizetésre nincs szükség. A fix végösszeget közvetlenül a sofőrnek fizeti.",
    ],
    [
      "Van gyerekülés?",
      "Igen. A gyerekülést kérésre díjmentesen biztosítjuk. Foglaláskor adja meg a gyerekek számát és életkorát.",
    ],
  ],
  regions: {
    antalya: {
      name: { nominative: "Antalya belváros", direction: "Antalya belvárosába", location: "Antalya belvárosában", origin: "Antalya belvárosából" },
      about: "Antalya a larai és kundui tengerparti sávval mindössze néhány kilométerre fekszik a repülőtértől. A larai part mentén nagy tematikus üdülők és városi hotelek sorakoznak, míg a nyugati Konyaaltı kavicsos strandot és hosszú tengerparti sétányt kínál.",
      routeDetails: "A repülőtérről induló rövid út a larai tengerparti úton vagy egyenesen a városközpontba vezet. Rövid szakaszon is megtérül a privát autó: nem kell más utasokra várni, nincs közbenső megállás, és a saját szállodája elé érkezik.",
    },
    belek: {
      name: { nominative: "Belek", direction: "Belekbe", location: "Belekben", origin: "Belekből" },
      about: "Belek Antalyától keletre fekszik, és elsősorban golfpályáiról, nagy all inclusive üdülőiről és széles homokos strandjairól ismert. A szállodák Kadriye és a Serik melletti partszakasz között szóródnak szét, ezért foglaláskor jól jön a szálloda pontos címe.",
      routeDetails: "Az út a repülőtérről a D400-as úton indul Serik és Belek felé. Családoknak, golfozóknak és késői járatoknak a közvetlen privát transzfer a kényelmes választás, mert gyűjtőmegállók és átszállás nélkül érkezik a szállásra.",
    },
    side: {
      name: { nominative: "Side", direction: "Side-ba", location: "Side-ban", origin: "Side-ból" },
      about: "Side egy történelmi óvárost köt össze hosszú homokos strandokkal és kiterjedt üdülőkomplexumokkal. Side mellett a célterülethez tartoznak a kedvelt hotelzónák: Kumköy, Evrenseki, Çolaklı, Sorgun és Titreyengöl.",
      routeDetails: "A repülőtérről az út a tengerparti úton vezet Manavgat és Side irányába. A privát autó különösen késői érkezéskor jön jól: a társasága egyenesen a lefoglalt üdülőbe tart, és nem vár más szállodák vendégeire.",
    },
    kemer: {
      name: { nominative: "Kemer", direction: "Kemerbe", location: "Kemerben", origin: "Kemerből" },
      about: "Kemer Antalyától nyugatra, a Taurus-hegység és a Földközi-tenger között fekszik. A terület Kemer központját, valamint Beldibit, Göynüköt, Kirişt és Çamyuvát foglalja magában — strandhotelek, egy jachtkikötő és hegyi háttér.",
      routeDetails: "A közvetlen út a partvonalat követi Antalyától nyugatra. A sofőr átszállás nélkül visz a szállodáig, ami gyerekekkel, sporteszközökkel vagy esti leszállás után számít a legtöbbet.",
    },
    alanya: {
      name: { nominative: "Alanya", direction: "Alanyába", location: "Alanyában", origin: "Alanyából" },
      about: "Alanya a Török Riviéra egyik legkedveltebb célpontja, és jelentősen keletebbre fekszik, mint az Antalya körüli üdülőhelyek. A központ mellett Mahmutlar, Kestel, Avsallar, Türkler és Okurcalar a leggyakrabban kért hotelterületek.",
      routeDetails: "Hosszabb tengerparti úton mutatja meg az értékét a járműre szabott fix ár. Privát transzferrel csak a saját társaságával utazik, és a leszállástól egyenesen a szálloda recepciójáig megy.",
    },
    kizilagac: {
      name: { nominative: "Kızılağaç", direction: "Kızılağaçba", location: "Kızılağaçban", origin: "Kızılağaçból" },
      about: "Kızılağaç Manavgattól keletre fekszik, és tágas tengerparti üdülőiről, valamint csendes családi nyaralásairól ismert. A környék Sorgunnal és Manavgattal határos; sok szálloda kicsit a főúttól beljebb, közvetlenül a tengernél áll.",
      routeDetails: "A repülőtérről a D400-as úton Manavgat felé, majd onnan Kızılağaç irányába megy az út. A privát jármű megkíméli a más szállodáknál tett extra megállóktól, amelyek épp ezen a szakaszon szokásosak a gyűjtőtranszfereknél.",
    },
    tekirova: {
      name: { nominative: "Tekirova", direction: "Tekirovába", location: "Tekirovában", origin: "Tekirovából" },
      about: "Tekirova Kemertől délre, az Olympos-Beydağları nemzeti park szélén fekszik. Gondozott hotelterületeket köt össze kis öblökkel, és egészen közel van az ókori Phaselis romjaihoz.",
      routeDetails: "Az út a repülőtérről Kemeren át vezet tovább Tekirova felé. A tengerparti elhelyezkedés és a távolság miatt a közvetlen transzfer az értelmes választás: átszállás nélkül és más vendégekre való várakozás nélkül a szállodáig.",
    },
  },
};
