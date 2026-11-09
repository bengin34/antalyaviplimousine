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
    bogazkent: {
      name: { nominative: "Boğazkent", direction: "Boğazkent", location: "Boğazkent", origin: "Boğazkent" },
      about: "Boğazkent ligger i distriktet Serik vid kusten mellan Belek och Side. Stora all inclusive-resorter ligger direkt vid en bred sandstrand, och Beleks golfbanor finns bara några minuter bort, vilket gör området till en lugn bas för både familjer och golfare.",
      routeDetails: "Från Antalya flygplats följer vägen D400 österut förbi Belek och viker sedan av mot kusten. Med cirka 48 km är det en av de kortare transferna på den här listan, och en privat bil tar dig från ankomsthallen till entrén på ditt resort utan stopp vid andra hotell.",
    },
    manavgat: {
      name: { nominative: "Manavgat", direction: "Manavgat", location: "Manavgat", origin: "Manavgat" },
      about: "Manavgat är en livlig stad vid floden med samma namn, öster om Side. Den är känd för sitt vattenfall, båtturer uppför floden och en veckomarknad, och fungerar som port till resorterna längs den här kuststräckan. Ange hotellets exakta adress vid bokningen, eftersom området är stort.",
      routeDetails: "Vägen går österut längs D400 från Antalya flygplats, cirka 75 km. Resan tar ungefär en timme, och en direkt privat transfer sparar dig de extra hotellstopp som en delad shuttle gör längs den här trafikerade kustvägen.",
    },
    bodrum: {
      name: { nominative: "Bodrum", direction: "Bodrum", location: "Bodrum", origin: "Bodrum" },
      about: "Bodrum ligger vid Egeiska kusten i provinsen Muğla och är berömt för sin korsfararborg, sin marina och sina vita hus i sluttningarna. Runt halvön finns livliga områden som Gümbet och Bitez, samt lugnare vikar vid Yalıkavak, Türkbükü och Gümüşlük.",
      routeDetails: "Med cirka 380 km är detta en av de längsta resorna vi erbjuder, och den tar fem till sex timmar med bekväma pauser. En privat bil gör dagen mycket enklare än kollektivtrafik: du åker när du har landat, stannar där du vill och kommer fram till ditt eget hotell på halvön. Ange hotell och landningstid vid bokningen så att vi kan planera resan.",
    },
    dalaman: {
      name: { nominative: "Dalaman", direction: "Dalaman", location: "Dalaman", origin: "Dalaman" },
      about: "Dalaman är porten till den lykiska och kariska kusten. Flygplatsen betjänar semesterorter som Sarıgerme och Göcek, och närliggande Dalyan är känt för flodens delta, klippgravarna i Kaunos och sköldpaddsstranden İztuzu.",
      routeDetails: "De 235 km från Antalya flygplats följer den slingrande lykiska kustvägen och tar cirka tre till tre och en halv timme. Ett fast pris per fordon gör en lång resa lätt att budgetera, och med en privat bil kan ditt sällskap stanna för en paus eller en måltid när ni vill.",
    },
    fethiye: {
      name: { nominative: "Fethiye", direction: "Fethiye", location: "Fethiye", origin: "Fethiye" },
      about: "Fethiye ligger vid en bred vik omgiven av furuklädda berg. Det är utgångspunkten för Ölüdeniz med sin blå lagun, för Çalışs stränder och nattliv och för de lugnare byarna Hisarönü och Kayaköy. Många gäster kommer också för att paraglida från Babadağ och för båtturer runt de tolv öarna.",
      routeDetails: "De 205 km från Antalya flygplats går längs den lykiska kusten via Kumluca, Kaş och Kalkan och tar ungefär två och en halv till tre timmar. Vägen är kurvig och naturskön. Med en privat transfer slipper du byta fordon i Fethiye, och föraren kör dig till ditt hotell i Ölüdeniz, Çalış eller Hisarönü.",
    },
    pamukkale: {
      name: { nominative: "Pamukkale", direction: "Pamukkale", location: "Pamukkale", origin: "Pamukkale" },
      about: "Pamukkale i provinsen Denizli är ett UNESCO-världsarv som är känt för sina vita travertinterrasser och varma termalbassänger. På kullen ovanför ligger den antika staden Hierapolis, med teater, nekropol och den antika poolen där besökare kan simma bland sjunkna kolonner.",
      routeDetails: "Vägen lämnar kusten och går cirka 245 km inåt landet över Taurusbergen och platån mot Denizli, vilket tar ungefär tre till tre och en halv timme. En privat bil passar den här resan väl: du slipper byta fordon, kan planera en rastpaus på vägen och kommer direkt fram till ditt hotell i Pamukkale eller Karahayıt.",
    },
    kapadokya: {
      name: { nominative: "Kappadokien", direction: "Kappadokien", location: "Kappadokien", origin: "Kappadokien" },
      about: "Kappadokien i centrala Anatolien är känt för sina älvskorstenar, klippkyrkor och underjordiska städer. Vid soluppgången stiger luftballonger över Göreme, Uçhisar och Ürgüp, och många gäster bor på ett hotell uthugget i klippan.",
      routeDetails: "Med cirka 540 km går resan från Medelhavet över Taurusbergen och den anatoliska högplatån och tar sju till åtta timmar med pauser. En privat transfer är det bekväma sättet: ditt sällskap reser tillsammans, föraren planerar rastpauserna med dig och kör dig fram till entrén till ditt grotthotell. Ange ditt flygnummer och hotell vid bokningen så att vi kan planera dagen.",
    },
  },
};
