import type { TransferLandingCopy } from "../transfer-landing-copy";

/**
 * Czech declines place names after a preposition, and the catalogue holds one
 * nominative form per route ("Side", "Kızılağaç"), so the sentences name the
 * destination as "oblast <jméno>" — the region of X. That reads naturally for
 * every route and avoids inventing a genitive for Turkish names that Czech has
 * no settled form for.
 *
 * Written by the team, not natively reviewed yet — flag any wording a Czech
 * reader would phrase differently before the next content pass.
 */
export const cs: TransferLandingCopy = {
  heroHeading: (name) => `Letiště Antalya → ${name}: privátní transfer`,
  heroCta: "Rezervovat transfer",
  heroTrust: [
    "Až 7 osob",
    "Bez platby předem",
    "Platba přímo řidiči",
    "Pevná celková cena, bez skrytých poplatků",
    "Dětská sedačka zdarma na vyžádání",
    "Monitorování letu v ceně",
  ],
  serviceHeading: (name) => `Váš privátní transfer do oblasti ${name}`,
  aboutHeading: (name) => `Vaše destinace: ${name}`,
  ownGroup: (name) =>
    `Jedete pouze se svou skupinou, přímo k hotelu v oblasti ${name}. Žádný sdílený autobus, žádní cizí spolucestující a žádné zajížďky k jiným hotelům — pevná cena platí za celé vozidlo.`,
  arrivalHeading: "Váš přílet na letiště Antalya",
  arrivalBody:
    "Po vyzvednutí zavazadel přejděte do zóny Meet & Greet J / 777. Náš tým na letišti najde vaši rezervaci a předá vás řidiči. Protože váš let sledujeme, zpoždění posune vyzvednutí bez příplatku.",
  returnHeading: "Transfer zpět",
  returnBody: (name) =>
    `Zpětnou cestu z oblasti ${name} na letiště Antalya zajistíme stejně. Při rezervaci nám napište číslo letu a požadovaný čas vyzvednutí.`,
  privateHeading: "Privátně, ne sdíleně",
  privateBody: (name) =>
    `Ve vozidle jste pouze vy a vaši spolucestující. Po rezervaci dostanete jasné potvrzení s údaji o cestě a přímým kontaktem. V den příletu náš tým sleduje váš let; při dřívějším nebo pozdějším přistání předání odpovídajícím způsobem posuneme. Řidič vás se zavazadly doveze až k recepci hotelu nebo na privátní adresu, kterou jste v oblasti ${name} uvedli.`,
  priceBody:
    "Uvedená částka je pevná celková cena za vozidlo, nikoli za osobu. Neúčtujeme skryté příplatky za monitorování letu, za běžnou dobu čekání ani za dětské sedačky na vyžádání. Platíte v hotovosti přímo řidiči na začátku jízdy, takže cenu znáte ještě před odjezdem.",
  vehicleHeading: "Vozidlo, zavazadla a děti",
  vehicleBody:
    "Mercedes Vito se hodí až pro šest cestujících s běžnými dovolenkovými zavazadly; větší skupiny jedou v Mercedesu Sprinter s až 12 místy. Při rezervaci nám napište o nadměrných zavazadlech, kočárku nebo potřebných dětských sedačkách a vozidlo vybereme podle vaší skupiny.",
  wholeVehicle: "Cena za celé vozidlo",
  priceTrust: [
    "Bez platby předem",
    "Platba přímo řidiči",
    "Bez skrytých poplatků",
  ],
  hotelsEyebrow: "Pro váš pobyt",
  hotelsHeading: (name) => `Oblíbené hotely v oblasti ${name}`,
  hotelsBody: () => "Jezdíme přímo k těmto i ke všem dalším hotelům v oblasti.",
  faq: [
    [
      "Kde na letišti Antalya najdu transferový tým?",
      "Po vyzvednutí zavazadel přejděte do zóny Meet & Greet J / 777. Náš tým najde vaši rezervaci a doprovodí vás k řidiči.",
    ],
    [
      "Musím transfer zaplatit předem?",
      "Ne. Platba předem se nevyžaduje. Pevnou celkovou cenu zaplatíte přímo řidiči.",
    ],
    [
      "Je k dispozici dětská sedačka?",
      "Ano. Dětské sedačky poskytujeme na vyžádání zdarma. Při rezervaci uveďte počet dětí a jejich věk.",
    ],
  ],
  regions: {
    antalya: {
      about: "Antalya s plážovými čtvrtěmi Lara a Kundu leží jen několik kilometrů od letiště. Pobřeží v Laře lemují velké tematické resorty a městské hotely, zatímco Konyaaltı na západě nabízí oblázkovou pláž a dlouhou promenádu u moře.",
      routeDetails: "Krátká jízda z letiště Antalya vede pobřežní silnicí přes Laru nebo přímo do centra. I na tak krátkém úseku se privátní vůz vyplatí: žádné čekání na další cestující, žádné mezizastávky a vystupujete u svého hotelu.",
    },
    belek: {
      about: "Belek leží východně od Antalye a je známý především golfovými hřišti, velkými all inclusive resorty a širokými písečnými plážemi. Hotely se rozprostírají mezi Kadriye a pobřežím u Seriku, proto při rezervaci pomůže přesná adresa hotelu.",
      routeDetails: "Cesta opouští letiště Antalya po silnici D400 směrem na Serik a Belek. Pro rodiny, golfisty i pozdní lety je přímý privátní transfer snadná volba: k ubytování dojedete bez svozových zastávek a bez přestupu.",
    },
    side: {
      about: "Side spojuje historické staré město s dlouhými písečnými plážemi a rozsáhlými dovolenkovými komplexy. Kromě samotného Side patří k destinaci i oblíbené hotelové zóny Kumköy, Evrenseki, Çolaklı, Sorgun a Titreyengöl.",
      routeDetails: "Z letiště Antalya vede trasa pobřežní silnicí směrem na Manavgat a Side. Privátní vůz oceníte hlavně při pozdním příletu: vaše skupina jede přímo do rezervovaného resortu a nečeká na hosty jiných hotelů.",
    },
    kemer: {
      about: "Kemer se rozkládá západně od Antalye mezi pohořím Taurus a Středozemním mořem. Oblast zahrnuje centrum Kemeru i Beldibi, Göynük, Kiriş a Çamyuvu — plážové hotely, marínu a horské pozadí.",
      routeDetails: "Přímá jízda sleduje pobřeží západně od Antalye. Řidič vás doveze k hotelu bez přestupu, což se nejvíc projeví při cestě s dětmi, se sportovním vybavením nebo po večerním přistání.",
    },
    alanya: {
      about: "Alanya je jednou z nejoblíbenějších destinací Turecké riviéry a leží výrazně dál na východ než resorty okolo Antalye. Vedle centra se nejčastěji poptávají hotelové oblasti Mahmutlar, Kestel, Avsallar, Türkler a Okurcalar.",
      routeDetails: "Na delší jízdě po pobřeží se pevná cena za vozidlo vyplatí nejvíc. S privátním transferem jedete jen se svou skupinou a od přistání pokračujete přímo k recepci hotelu.",
    },
    kizilagac: {
      about: "Kızılağaç leží východně od Manavgatu a je známý prostornými plážovými resorty a klidnou rodinnou dovolenou. Okolí hraničí se Sorgunem a Manavgatem; mnoho hotelů stojí trochu mimo hlavní silnici, přímo u moře.",
      routeDetails: "Z letiště Antalya se jede po silnici D400 směrem na Manavgat a dál do Kızılağaçe. Privátní vozidlo vám ušetří zastávky u cizích hotelů, pro sdílené transfery na tomto úseku typické.",
    },
    tekirova: {
      about: "Tekirova leží jižně od Kemeru na okraji národního parku Olympos-Beydağları. Spojuje udržované hotelové areály s malými zátokami a je velmi blízko antické lokalitě Phaselis.",
      routeDetails: "Trasa vede z letiště Antalya přes Kemer dál do Tekirovy. Poloha u pobřeží a vzdálenost dělají z přímého transferu rozumnou volbu: bez přestupu a bez čekání na další hosty až k hotelu.",
    },
  },
};
