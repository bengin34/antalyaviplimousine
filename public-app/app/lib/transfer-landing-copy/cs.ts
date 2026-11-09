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
    bogazkent: {
      about: "Boğazkent leží v okrese Serik na pobřeží mezi Belekem a Side. Velké all inclusive resorty stojí přímo u široké písečné pláže a golfová hřiště v Beleku jsou jen pár minut daleko, takže je oblast klidným zázemím pro rodiny i golfisty.",
      routeDetails: "Z letiště Antalya vede trasa po silnici D400 na východ kolem Beleku a poté odbočuje k pobřeží. S 48 km je to jeden z kratších transferů v tomto seznamu a privátní vůz vás doveze z příletové haly až k vjezdu do resortu bez zastávek u jiných hotelů.",
    },
    manavgat: {
      about: "Manavgat je rušné město na stejnojmenné řece východně od Side. Je známé vodopádem, projížďkami lodí po řece a týdenním trhem a slouží jako brána k resortům na tomto úseku pobřeží. Při rezervaci nám prosím sdělte přesnou adresu hotelu, protože oblast je rozlehlá.",
      routeDetails: "Trasa vede z letiště Antalya po silnici D400 na východ a měří asi 75 km. Jízda trvá zhruba hodinu a přímý privátní transfer vám ušetří zastávky u dalších hotelů, které sdílený shuttle na této rušné pobřežní silnici dělá.",
    },
    bodrum: {
      about: "Bodrum leží na egejském pobřeží v provincii Muğla a je proslulé hradem křižáků, marínou a bílými domy na svazích kopců. Na poloostrově najdete rušné čtvrti jako Gümbet a Bitez i klidnější zátoky Yalıkavak, Türkbükü a Gümüşlük.",
      routeDetails: "Zhruba 380 km je jedna z nejdelších tras, které nabízíme; s pohodlnými přestávkami trvá pět až šest hodin. Privátní vůz je mnohem pohodlnější než veřejná doprava: vyrazíte hned po přistání, zastavíte, kde chcete, a dojedete k vlastnímu hotelu na poloostrově. Při rezervaci nám sdělte hotel a čas přistání, abychom cestu mohli naplánovat.",
    },
    dalaman: {
      about: "Dalaman je brána na lykijské a karijské pobřeží. Letiště obsluhuje resorty jako Sarıgerme a Göcek a nedaleký Dalyan je známý říční deltou, skalními hrobkami v Kaunosu a želví pláží İztuzu.",
      routeDetails: "Z letiště Antalya vede 235 km klikatou lykijskou pobřežní silnicí a jízda trvá zhruba tři až tři a půl hodiny. Pevná cena za vozidlo usnadňuje plánování rozpočtu na dlouhou cestu a privátní vůz vaší skupině dovolí zastavit na odpočinek nebo jídlo, kdykoli budete chtít.",
    },
    fethiye: {
      about: "Fethiye leží na široké zátoce obklopené borovicemi porostlými horami. Je výchozím bodem pro Ölüdeniz s modrou lagunou, pro pláže a noční život v Çalış i pro klidnější vesnice Hisarönü a Kayaköy. Mnoho hostů sem jezdí také za paraglidingem z hory Babadağ a za lodními výlety kolem dvanácti ostrovů.",
      routeDetails: "205 km z letiště Antalya vede podél lykijského pobřeží přes Kumluci, Kaş a Kalkan a trvá asi dvě a půl až tři hodiny. Silnice je klikatá a malebná. S privátním transferem ve Fethiye nepřestupujete a řidič vás doveze k hotelu v Ölüdenizu, v oblasti Çalış nebo v Hisarönü.",
    },
    pamukkale: {
      about: "Pamukkale v provincii Denizli je zapsáno na seznamu světového dědictví UNESCO a proslulé bílými travertinovými terasami a teplými termálními jezírky. Na kopci nad nimi stojí antické město Hierapolis s divadlem, nekropolí a antickým bazénem, kde se dá plavat mezi potopenými sloupy.",
      routeDetails: "Trasa opouští pobřeží a vede asi 245 km do vnitrozemí přes pohoří Taurus a náhorní plošinu směrem k Denizli, což zabere zhruba tři až tři a půl hodiny. Privátní vůz se na tuto cestu hodí: nepřestupujete, můžete si naplánovat přestávku a dojedete přímo k hotelu v Pamukkale nebo v Karahayıtu.",
    },
    kapadokya: {
      about: "Kappadokie ve středním Anatolii je známá pohádkovými komíny, skalními kostely a podzemními městy. Za východu slunce stoupají horkovzdušné balony nad Göreme, Uçhisarem a Ürgüpem a mnoho hostů bydlí v hotelu vytesaném do skály.",
      routeDetails: "Zhruba 540 km vede od Středozemního moře přes pohoří Taurus a anatolskou náhorní plošinu a s přestávkami trvá sedm až osm hodin. Privátní transfer je nejpohodlnější způsob: vaše skupina cestuje pohromadě, řidič s vámi plánuje zastávky a doveze vás před vchod do jeskynního hotelu. Při rezervaci nám sdělte číslo letu a hotel, abychom den mohli naplánovat.",
    },
  },
};
