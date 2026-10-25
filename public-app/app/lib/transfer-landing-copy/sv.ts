import type { TransferLandingCopy } from "../transfer-landing-copy";

/**
 * `routeCatalog` carries no Swedish route names, so every region states its
 * own; without that the Swedish pages would read "Antalya City".
 *
 * Written by the team, not natively reviewed yet — flag any wording a Swedish
 * reader would phrase differently before the next content pass.
 */
export const sv: TransferLandingCopy = {
  heroHeading: (name) => `Antalya flygplats → ${name}: privat transfer`,
  heroCta: "Boka transfer",
  heroTrust: [
    "Upp till 7 personer",
    "Ingen förskottsbetalning",
    "Betala direkt till föraren",
    "Fast totalpris, inga dolda avgifter",
    "Bilbarnstol utan kostnad på begäran",
    "Flygbevakning ingår",
  ],
  serviceHeading: (name) => `Din privata transfer till ${name}`,
  aboutHeading: (name) => `Resmålet: ${name}`,
  ownGroup: (name) =>
    `Du reser bara med ditt eget sällskap, direkt till hotellet i ${name}. Ingen delad buss, inga okända medpassagerare och inga omvägar till andra hotell — det fasta priset gäller hela fordonet.`,
  arrivalHeading: "Din ankomst till Antalya flygplats",
  arrivalBody:
    "När du har hämtat bagaget går du till Meet & Greet-området J / 777. Vårt team på flygplatsen hittar din bokning och lämnar över dig till föraren. Eftersom vi bevakar flyget flyttas upphämtningen vid förseningar utan extra kostnad.",
  returnHeading: "Returtransfer",
  returnBody: (name) =>
    `Vi ordnar även resan tillbaka från ${name} till Antalya flygplats. Ange flygnummer och önskad upphämtningstid när du bokar.`,
  privateHeading: "Privat, inte delad",
  privateBody: (name) =>
    `I bilen sitter bara du och dina medresenärer. Efter bokningen får du en tydlig bekräftelse med reseuppgifterna och en direktkontakt. På ankomstdagen följer vårt team flyget; landar du tidigare eller senare justerar vi mötet. Föraren kör dig och bagaget hela vägen till hotellreceptionen eller till den privata adress du angett i ${name}.`,
  priceBody:
    "Beloppet som visas är ett fast totalpris för fordonet, inte per person. Det finns inga dolda tillägg för flygbevakning, för vanlig väntetid eller för bilbarnstolar på begäran. Du betalar kontant direkt till föraren när resan börjar, så kostnaden är klar redan innan du åker.",
  vehicleHeading: "Fordon, bagage och barn",
  vehicleBody:
    "En Mercedes Vito passar upp till sex passagerare med normalt semesterbagage; större sällskap reser i en Mercedes Sprinter med upp till 12 platser. Berätta vid bokningen om skrymmande bagage, barnvagn eller vilka bilbarnstolar du behöver, så anpassar vi fordonet till ditt sällskap.",
  wholeVehicle: "Pris för hela fordonet",
  priceTrust: [
    "Ingen förskottsbetalning",
    "Betala direkt till föraren",
    "Inga dolda avgifter",
  ],
  hotelsEyebrow: "För ditt boende",
  hotelsHeading: (name) => `Populära hotell i ${name}`,
  hotelsBody: () => "Vi kör direkt till dessa och till alla andra hotell i området.",
  faq: [
    [
      "Var möter jag transferteamet på Antalya flygplats?",
      "När du har hämtat bagaget går du till Meet & Greet-området J / 777. Vårt team hittar din bokning och följer dig till föraren.",
    ],
    [
      "Måste jag betala transfern i förväg?",
      "Nej. Ingen förskottsbetalning krävs. Du betalar det fasta totalpriset direkt till föraren.",
    ],
    [
      "Finns bilbarnstol?",
      "Ja. Bilbarnstolar är kostnadsfria på begäran. Ange antal barn och deras ålder vid bokningen.",
    ],
  ],
  regions: {
    antalya: {
      name: { nominative: "Antalya centrum", direction: "Antalya centrum", location: "Antalya centrum", origin: "Antalya centrum" },
      about: "Antalya med strandstråken Lara och Kundu ligger bara några kilometer från flygplatsen. Längs Larakusten står stora temaresorter och stadshotell, medan Konyaaltı i väster erbjuder stenstrand och en lång strandpromenad.",
      routeDetails: "Den korta resan från Antalya flygplats går längs kustvägen vid Lara eller rakt in i centrum. Även på en kort sträcka lönar sig den privata bilen: ingen väntan på andra gäster, inga mellanstopp och du kliver ur vid ditt eget hotell.",
    },
    belek: {
      name: { nominative: "Belek", direction: "Belek", location: "Belek", origin: "Belek" },
      about: "Belek ligger öster om Antalya och är främst känt för sina golfbanor, stora all inclusive-resorter och breda sandstränder. Hotellen är utspridda mellan Kadriye och kusten vid Serik, så den exakta hotelladressen hjälper vid bokningen.",
      routeDetails: "Resan lämnar Antalya flygplats på D400 mot Serik och Belek. För familjer, golfare och sena flyg är den direkta privata transfern det enkla valet, eftersom du når boendet utan upphämtningsstopp och utan byte av fordon.",
    },
    side: {
      name: { nominative: "Side", direction: "Side", location: "Side", origin: "Side" },
      about: "Side förenar en historisk gammal stad med långa sandstränder och vidsträckta semesteranläggningar. Förutom Side självt omfattar resmålet de populära hotellzonerna Kumköy, Evrenseki, Çolaklı, Sorgun och Titreyengöl.",
      routeDetails: "Från Antalya flygplats följer vägen kusten mot Manavgat och Side. Den privata bilen är särskilt välkommen vid en sen ankomst: ditt sällskap åker direkt till den bokade anläggningen utan att vänta på andra hotellgäster.",
    },
    kemer: {
      name: { nominative: "Kemer", direction: "Kemer", location: "Kemer", origin: "Kemer" },
      about: "Kemer ligger väster om Antalya mellan Taurusbergen och Medelhavet. Området omfattar centrala Kemer tillsammans med Beldibi, Göynük, Kiriş och Çamyuva — strandhotell, en småbåtshamn och berg i bakgrunden.",
      routeDetails: "Den direkta resan följer kusten väster om Antalya. Föraren kör dig ända till hotellet utan fordonsbyte, vilket betyder mest när du reser med barn, med sportutrustning eller efter en kvällslandning.",
    },
    alanya: {
      name: { nominative: "Alanya", direction: "Alanya", location: "Alanya", origin: "Alanya" },
      about: "Alanya är ett av de mest omtyckta resmålen på turkiska rivieran och ligger betydligt längre österut än resorterna runt Antalya. Vid sidan av centrum är Mahmutlar, Kestel, Avsallar, Türkler och Okurcalar de mest efterfrågade hotellområdena.",
      routeDetails: "På en längre kustresa är det fasta priset per fordon som visar sitt värde. Med en privat transfer reser du med ditt eget sällskap och fortsätter från landningen direkt till hotellreceptionen.",
    },
    kizilagac: {
      name: { nominative: "Kızılağaç", direction: "Kızılağaç", location: "Kızılağaç", origin: "Kızılağaç" },
      about: "Kızılağaç ligger öster om Manavgat och är känt för rymliga strandresorter och lugna familjesemestrar. Området gränsar till Sorgun och Manavgat; många hotell ligger en bit från huvudvägen, direkt vid havet.",
      routeDetails: "Från Antalya flygplats tar du D400 mot Manavgat och fortsätter sedan till Kızılağaç. Ett privat fordon sparar dig de extra hotellstoppen som delade transferer ofta gör just på den här sträckan.",
    },
    tekirova: {
      name: { nominative: "Tekirova", direction: "Tekirova", location: "Tekirova", origin: "Tekirova" },
      about: "Tekirova ligger söder om Kemer, i kanten av nationalparken Olympos-Beydağları. Byn förenar välskötta hotellområden med små vikar och ligger mycket nära den antika platsen Phaselis.",
      routeDetails: "Resan går från Antalya flygplats via Kemer vidare till Tekirova. Läget vid kusten och avståndet gör den direkta transfern till det rimliga valet: inget fordonsbyte och ingen väntan på andra gäster på vägen till hotellet.",
    },
  },
};
