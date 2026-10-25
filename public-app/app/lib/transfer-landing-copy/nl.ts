import type { TransferLandingCopy } from "../transfer-landing-copy";

/**
 * `routeCatalog` has no Dutch route names, so each region names its own place;
 * otherwise the Dutch pages would fall back to "Antalya City".
 *
 * Written by the team, not natively reviewed yet — flag any wording a Dutch
 * reader would phrase differently before the next content pass.
 */
export const nl: TransferLandingCopy = {
  heroHeading: (name) => `Luchthaven Antalya → ${name}: privétransfer`,
  heroCta: "Transfer boeken",
  heroTrust: [
    "Tot 7 personen",
    "Geen vooruitbetaling",
    "Betaling direct aan de chauffeur",
    "Vaste totaalprijs, geen verborgen kosten",
    "Kinderzitje gratis op aanvraag",
    "Vluchtmonitoring inbegrepen",
  ],
  serviceHeading: (name) => `Uw privétransfer naar ${name}`,
  aboutHeading: (name) => `Over ${name}`,
  ownGroup: (name) =>
    `U reist alleen met uw eigen gezelschap, rechtstreeks naar uw hotel in ${name}. Geen pendelbus, geen onbekende medepassagiers en geen omwegen langs andere hotels — de vaste prijs geldt voor het hele voertuig.`,
  arrivalHeading: "Aankomst op de luchthaven van Antalya",
  arrivalBody:
    "Zodra u uw bagage hebt opgehaald, loopt u naar de Meet & Greet-zone J / 777. Ons luchthaventeam vindt uw boeking en brengt u bij uw chauffeur. Omdat wij uw vlucht volgen, schuift de ophaaltijd bij vertraging mee zonder extra kosten.",
  returnHeading: "Retourtransfer",
  returnBody: (name) =>
    `Ook de terugrit van ${name} naar de luchthaven van Antalya regelen wij. Geef bij het boeken uw vluchtnummer en de gewenste ophaaltijd door.`,
  privateHeading: "Privé, niet gedeeld",
  privateBody: (name) =>
    `Alleen u en uw reisgenoten zitten in de auto. Na de boeking ontvangt u een duidelijke bevestiging met uw reisgegevens en een direct contact. Op de dag van aankomst volgt ons team uw vlucht; landt u eerder of later, dan passen wij de ontvangst daarop aan. Uw chauffeur brengt u met uw bagage tot de receptie of tot het privéadres dat u in ${name} hebt opgegeven.`,
  priceBody:
    "Het genoemde bedrag is een vaste totaalprijs voor het voertuig, niet per persoon. Er zijn geen verborgen toeslagen voor vluchtmonitoring, de gebruikelijke wachttijd of kinderzitjes op aanvraag. U betaalt contant en direct aan de chauffeur bij het begin van de rit, dus de kosten staan al vast voordat u vertrekt.",
  vehicleHeading: "Voertuig, bagage en kinderen",
  vehicleBody:
    "De Mercedes Vito is geschikt voor maximaal zes personen met normale vakantiebagage; grotere gezelschappen reizen in een Mercedes Sprinter met tot 12 zitplaatsen. Meld bij het boeken buitenmaatse bagage, een buggy of de kinderzitjes die u nodig hebt, dan stemmen wij het voertuig af op uw gezelschap.",
  wholeVehicle: "Prijs voor het hele voertuig",
  priceTrust: [
    "Geen vooruitbetaling",
    "Betaling direct aan de chauffeur",
    "Geen verborgen kosten",
  ],
  hotelsEyebrow: "Voor uw verblijf",
  hotelsHeading: (name) => `Populaire hotels in ${name}`,
  hotelsBody: () => "Wij rijden rechtstreeks naar deze en naar alle andere hotels in de regio.",
  faq: [
    [
      "Waar ontmoet ik het transferteam op de luchthaven van Antalya?",
      "Nadat u uw bagage hebt opgehaald, gaat u naar de Meet & Greet-zone J / 777. Ons team vindt uw boeking en brengt u bij uw chauffeur.",
    ],
    [
      "Moet ik de transfer vooraf betalen?",
      "Nee. Vooruitbetaling is niet nodig. U betaalt de vaste totaalprijs direct aan de chauffeur.",
    ],
    [
      "Is er een kinderzitje beschikbaar?",
      "Ja. Kinderzitjes zijn gratis op aanvraag. Geef bij het boeken het aantal kinderen en hun leeftijd door.",
    ],
  ],
  regions: {
    antalya: {
      name: { nominative: "Antalya-stad", direction: "Antalya", location: "Antalya", origin: "Antalya" },
      about: "Antalya met de strandstroken Lara en Kundu ligt op slechts enkele kilometers van de luchthaven. Langs de kust van Lara staan grote themaresorts en stadshotels, terwijl Konyaaltı in het westen een kiezelstrand en een lange boulevard biedt.",
      routeDetails: "De korte rit van de luchthaven van Antalya loopt over de kustweg langs Lara of rechtstreeks naar het centrum. Zelfs op zo’n kort traject betaalt een privéauto zich terug: geen wachten op andere gasten, geen tussenstops en u stapt uit bij uw eigen hotel.",
    },
    belek: {
      name: { nominative: "Belek", direction: "Belek", location: "Belek", origin: "Belek" },
      about: "Belek ligt oostelijk van Antalya en staat vooral bekend om de golfbanen, de grote all-inclusive resorts en de brede zandstranden. De hotels liggen verspreid tussen Kadriye en de kust bij Serik, waardoor het exacte hoteladres bij het boeken helpt.",
      routeDetails: "De rit verlaat de luchthaven van Antalya via de D400 richting Serik en Belek. Voor gezinnen, golfers en late vluchten is de directe privétransfer de eenvoudige keuze: u bereikt uw accommodatie zonder ophaalstops en zonder overstap.",
    },
    side: {
      name: { nominative: "Side", direction: "Side", location: "Side", origin: "Side" },
      about: "Side combineert een historisch oud centrum met lange zandstranden en uitgestrekte vakantiecomplexen. Naast Side zelf omvat de bestemming de populaire hotelzones Kumköy, Evrenseki, Çolaklı, Sorgun en Titreyengöl.",
      routeDetails: "Vanaf de luchthaven van Antalya volgt de route de kustweg richting Manavgat en Side. Bij een late aankomst is een privéauto extra welkom: uw gezelschap rijdt direct naar het geboekte resort, zonder te wachten op gasten van andere hotels.",
    },
    kemer: {
      name: { nominative: "Kemer", direction: "Kemer", location: "Kemer", origin: "Kemer" },
      about: "Kemer ligt westelijk van Antalya tussen het Taurusgebergte en de Middellandse Zee. Het gebied omvat het centrum van Kemer en daarnaast Beldibi, Göynük, Kiriş en Çamyuva — strandhotels, een jachthaven en bergen als decor.",
      routeDetails: "De directe rit volgt de kust westelijk van Antalya. Uw chauffeur brengt u zonder overstap tot aan het hotel, wat het meest uitmaakt als u met kinderen reist, sportuitrusting meeneemt of ’s avonds landt.",
    },
    alanya: {
      name: { nominative: "Alanya", direction: "Alanya", location: "Alanya", origin: "Alanya" },
      about: "Alanya is een van de meest geliefde bestemmingen aan de Turkse Rivièra en ligt duidelijk verder oostelijk dan de resorts rond Antalya. Naast het centrum zijn Mahmutlar, Kestel, Avsallar, Türkler en Okurcalar de meestgevraagde hotelgebieden.",
      routeDetails: "Op een langere kustrit komt de vaste prijs per voertuig het best tot zijn recht. Met een privétransfer reist u met uw eigen gezelschap en rijdt u van de landing meteen door naar de receptie van uw hotel.",
    },
    kizilagac: {
      name: { nominative: "Kızılağaç", direction: "Kızılağaç", location: "Kızılağaç", origin: "Kızılağaç" },
      about: "Kızılağaç ligt oostelijk van Manavgat en staat bekend om ruime strandresorts en rustige gezinsvakanties. Het gebied grenst aan Sorgun en Manavgat; veel hotels liggen iets van de hoofdweg af, direct aan de zee.",
      routeDetails: "Van de luchthaven van Antalya rijdt u over de D400 richting Manavgat en verder naar Kızılağaç. Een privévoertuig scheelt u de extra hotelstops die gedeelde transfers juist op dit traject vaak maken.",
    },
    tekirova: {
      name: { nominative: "Tekirova", direction: "Tekirova", location: "Tekirova", origin: "Tekirova" },
      about: "Tekirova ligt zuidelijk van Kemer, aan de rand van het nationale park Olympos-Beydağları. Het dorp combineert goed onderhouden hotelterreinen met kleine baaien en ligt dicht bij de antieke site Phaselis.",
      routeDetails: "De rit loopt van de luchthaven van Antalya via Kemer verder naar Tekirova. De ligging aan de kust en de afstand maken een directe transfer logisch: geen overstap en geen wachten op andere gasten onderweg naar uw hotel.",
    },
  },
};
