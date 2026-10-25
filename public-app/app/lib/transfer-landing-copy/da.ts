import type { TransferLandingCopy } from "../transfer-landing-copy";

/**
 * Danish charter traffic goes mainly to Side, Belek and Alanya, so the copy
 * keeps the comparison with the shared coach — the stretch where it collects
 * several hotels before yours — and the cash-on-arrival rule in front.
 *
 * Written by the team, not natively reviewed yet — flag any wording a Danish
 * reader would phrase differently before the next content pass.
 */
export const da: TransferLandingCopy = {
  heroHeading: (name) => `Antalya Lufthavn → ${name}: privat transfer`,
  heroCta: "Bestil transfer",
  heroTrust: [
    "Op til 7 personer",
    "Ingen forudbetaling",
    "Betaling direkte til chaufføren",
    "Fast samlet pris, ingen skjulte gebyrer",
    "Barnesæde gratis efter ønske",
    "Flysporing inkluderet",
  ],
  serviceHeading: (name) => `Din private transfer til ${name}`,
  aboutHeading: (name) => `Rejsemålet: ${name}`,
  ownGroup: (name) =>
    `Du rejser kun med dit eget selskab, direkte til hotellet i ${name}. Ingen fælles bus, ingen fremmede medpassagerer og ingen omveje til andre hoteller — den faste pris dækker hele bilen.`,
  arrivalHeading: "Din ankomst til Antalya Lufthavn",
  arrivalBody:
    "Når du har hentet din bagage, går du til Meet & Greet-området J / 777. Vores team i lufthavnen finder din bestilling og sætter dig sammen med chaufføren. Fordi vi følger flyet, flytter en forsinkelse afhentningen uden ekstra betaling.",
  returnHeading: "Returtransfer",
  returnBody: (name) =>
    `Vi arrangerer også turen tilbage fra ${name} til Antalya Lufthavn. Oplys flynummer og den ønskede afhentningstid, når du bestiller.`,
  privateHeading: "Privat, ikke fælles",
  privateBody: (name) =>
    `I bilen sidder kun du og dine medrejsende. Efter bestillingen får du en klar bekræftelse med rejseoplysninger og en direkte kontakt. På ankomstdagen følger vores team flyet; lander du tidligere eller senere, flytter vi mødet tilsvarende. Chaufføren kører dig og bagagen helt til hotellets reception eller til den privatadresse, du har oplyst i ${name}.`,
  priceBody:
    "Det viste beløb er en fast samlet pris for bilen, ikke pr. person. Der er ingen skjulte tillæg for flysporing, for den sædvanlige ventetid eller for barnesæder efter ønske. Du betaler kontant direkte til chaufføren ved turens start, så prisen er afklaret, før du kører.",
  vehicleHeading: "Bil, bagage og børn",
  vehicleBody:
    "En Mercedes Vito passer til op til seks passagerer med almindelig feriebagage; større selskaber kører i en Mercedes Sprinter med op til 12 pladser. Skriv ved bestillingen om stor bagage, en klapvogn eller de barnesæder, du har brug for, så tilpasser vi bilen til dit selskab.",
  wholeVehicle: "Pris for hele bilen",
  priceTrust: [
    "Ingen forudbetaling",
    "Betaling direkte til chaufføren",
    "Ingen skjulte gebyrer",
  ],
  hotelsEyebrow: "Til dit ophold",
  hotelsHeading: (name) => `Populære hoteller i ${name}`,
  hotelsBody: () => "Vi kører direkte til disse og til alle andre hoteller i området.",
  faq: [
    [
      "Hvor møder jeg transferteamet i Antalya Lufthavn?",
      "Når du har hentet bagagen, går du til Meet & Greet-området J / 777. Vores team finder din bestilling og følger dig til chaufføren.",
    ],
    [
      "Skal jeg betale transferen forud?",
      "Nej. Der kræves ingen forudbetaling. Du betaler den faste samlede pris direkte til chaufføren.",
    ],
    [
      "Er der barnesæde?",
      "Ja. Barnesæder er gratis efter ønske. Oplys antallet af børn og deres alder ved bestillingen.",
    ],
  ],
  regions: {
    antalya: {
      about: "Antalya med strandstrækningerne Lara og Kundu ligger kun få kilometer fra lufthavnen. Langs Lara-kysten ligger store temaresorts og byhoteller, mens Konyaaltı mod vest byder på stenstrand og en lang strandpromenade.",
      routeDetails: "Den korte tur fra Antalya Lufthavn følger kystvejen ved Lara eller går direkte ind i centrum. Selv på en kort strækning betaler den private bil sig: ingen venten på andre gæster, ingen mellemstop, og du stiger ud ved dit eget hotel.",
    },
    belek: {
      about: "Belek ligger øst for Antalya og er først og fremmest kendt for golfbanerne, de store all inclusive-resorts og de brede sandstrande. Hotellerne ligger spredt mellem Kadriye og kysten ved Serik, så den præcise hoteladresse hjælper ved bestillingen.",
      routeDetails: "Turen forlader Antalya Lufthavn ad D400 mod Serik og Belek. For familier, golfspillere og sene fly er den direkte private transfer det nemme valg, fordi du kommer frem til hotellet uden opsamlingsstop og uden at skifte bil.",
    },
    side: {
      about: "Side forener en historisk gammel bydel med lange sandstrande og store feriekomplekser. Ud over Side selv omfatter rejsemålet de populære hotelzoner Kumköy, Evrenseki, Çolaklı, Sorgun og Titreyengöl.",
      routeDetails: "Fra Antalya Lufthavn følger ruten kystvejen mod Manavgat og Side. Den private bil er især rar ved en sen ankomst: dit selskab kører direkte til det bestilte hotel uden at vente på gæster fra andre hoteller.",
    },
    kemer: {
      about: "Kemer ligger vest for Antalya mellem Taurusbjergene og Middelhavet. Området dækker centrale Kemer samt Beldibi, Göynük, Kiriş og Çamyuva — strandhoteller, en lystbådehavn og bjerge som kulisse.",
      routeDetails: "Den direkte tur følger kysten vest for Antalya. Chaufføren kører dig hele vejen til hotellet uden bilskift, hvilket betyder mest, når du rejser med børn, med sportsudstyr eller efter en aftenlanding.",
    },
    alanya: {
      about: "Alanya er et af de mest elskede rejsemål på den tyrkiske riviera og ligger betydeligt længere mod øst end resorterne omkring Antalya. Ved siden af centrum er Mahmutlar, Kestel, Avsallar, Türkler og Okurcalar de mest efterspurgte hotelområder.",
      routeDetails: "På en længere kysttur er den faste pris pr. bil, hvor værdien viser sig. Med en privat transfer rejser du med dit eget selskab og fortsætter fra landingen direkte til hotellets reception.",
    },
    kizilagac: {
      about: "Kızılağaç ligger øst for Manavgat og er kendt for rummelige strandresorts og rolige familieferier. Området grænser til Sorgun og Manavgat; mange hoteller ligger lidt væk fra hovedvejen, direkte ved havet.",
      routeDetails: "Fra Antalya Lufthavn kører du ad D400 mod Manavgat og videre til Kızılağaç. En privat bil sparer dig de ekstra hotelstop, som fælles transferer ofte laver netop på denne strækning.",
    },
    tekirova: {
      about: "Tekirova ligger syd for Kemer på kanten af nationalparken Olympos-Beydağları. Byen forener velplejede hotelområder med små bugter og ligger meget tæt på det antikke Phaselis.",
      routeDetails: "Turen går fra Antalya Lufthavn gennem Kemer videre til Tekirova. Beliggenheden ved kysten og afstanden gør den direkte transfer til det fornuftige valg: intet bilskift og ingen venten på andre gæster på vejen til hotellet.",
    },
  },
};
