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
    bogazkent: {
      name: { nominative: "Boğazkent", direction: "Boğazkent", location: "Boğazkent", origin: "Boğazkent" },
      about: "Boğazkent ligt in het district Serik aan de kust tussen Belek en Side. Grote all-inclusive resorts staan direct aan een breed zandstrand en de golfbanen van Belek liggen op enkele minuten afstand, waardoor het gebied een rustige uitvalsbasis is voor gezinnen en golfers.",
      routeDetails: "Vanaf de luchthaven van Antalya volgt de route de D400 oostwaarts langs Belek en buigt daarna af naar de kust. Met ongeveer 48 km is dit een van de kortere transfers van deze lijst, en een privéauto brengt u van de aankomsthal tot de ingang van uw resort, zonder stops bij andere hotels.",
    },
    manavgat: {
      name: { nominative: "Manavgat", direction: "Manavgat", location: "Manavgat", origin: "Manavgat" },
      about: "Manavgat is een levendige stad aan de gelijknamige rivier, oostelijk van Side. Het staat bekend om de waterval, boottochten over de rivier en een wekelijkse markt, en is de toegangspoort tot de resorts langs dit stuk kust. Geef ons bij het boeken het exacte adres van uw hotel door, want het gebied is groot.",
      routeDetails: "De route loopt vanaf de luchthaven van Antalya zo’n 75 km oostwaarts over de D400. De rit duurt ongeveer een uur, en een rechtstreekse privétransfer bespaart u de extra hotelstops die een gedeelde shuttle maakt op deze drukke kustweg.",
    },
    bodrum: {
      name: { nominative: "Bodrum", direction: "Bodrum", location: "Bodrum", origin: "Bodrum" },
      about: "Bodrum ligt aan de Egeïsche kust in de provincie Muğla en staat bekend om het kruisvaderskasteel, de jachthaven en de witte huizen op de heuvels. Rond het schiereiland vindt u levendige wijken zoals Gümbet en Bitez, en rustigere baaien bij Yalıkavak, Türkbükü en Gümüşlük.",
      routeDetails: "Met ongeveer 380 km is dit een van de langste ritten die we aanbieden, en met comfortabele pauzes duurt het vijf tot zes uur. Een privéauto maakt de dag een stuk makkelijker dan het openbaar vervoer: u vertrekt zodra u geland bent, stopt waar u wilt en komt aan bij uw eigen hotel op het schiereiland. Geef ons bij het boeken uw hotel en landingstijd door, zodat we de rit kunnen plannen.",
    },
    dalaman: {
      name: { nominative: "Dalaman", direction: "Dalaman", location: "Dalaman", origin: "Dalaman" },
      about: "Dalaman is de toegangspoort tot de Lycische en Karische kust. De luchthaven bedient resorts als Sarıgerme en Göcek, en het nabijgelegen Dalyan staat bekend om de riviermonding, de rotsgraven van Kaunos en het schildpaddenstrand van İztuzu.",
      routeDetails: "De 235 km vanaf de luchthaven van Antalya volgen de bochtige Lycische kustweg en duren ongeveer drie tot drieënhalf uur. Een vaste prijs per voertuig maakt een lange rit goed te begroten, en met een privéauto kan uw gezelschap stoppen voor een pauze of een maaltijd wanneer u wilt.",
    },
    fethiye: {
      name: { nominative: "Fethiye", direction: "Fethiye", location: "Fethiye", origin: "Fethiye" },
      about: "Fethiye ligt aan een brede baai, omringd door met dennen begroeide bergen. Het is de uitvalsbasis voor Ölüdeniz met zijn blauwe lagune, voor de stranden en het uitgaansleven van Çalış en voor de rustigere dorpen Hisarönü en Kayaköy. Veel gasten komen ook voor het paragliden vanaf de Babadağ en voor boottochten langs de twaalf eilanden.",
      routeDetails: "De 205 km vanaf de luchthaven van Antalya lopen langs de Lycische kust via Kumluca, Kaş en Kalkan en duren ongeveer tweeënhalf tot drie uur. De weg is bochtig en schilderachtig. Met een privétransfer hoeft u in Fethiye niet over te stappen, en de chauffeur brengt u naar uw hotel in Ölüdeniz, Çalış of Hisarönü.",
    },
    pamukkale: {
      name: { nominative: "Pamukkale", direction: "Pamukkale", location: "Pamukkale", origin: "Pamukkale" },
      about: "Pamukkale, in de provincie Denizli, is een UNESCO-werelderfgoed dat bekend is om de witte travertijnterrassen en warme thermale baden. Op de heuvel erboven staat de antieke stad Hierapolis, met een theater, een necropolis en het antieke bad waarin bezoekers tussen gezonken zuilen kunnen zwemmen.",
      routeDetails: "De route verlaat de kust en loopt zo’n 245 km landinwaarts over het Taurusgebergte en het plateau richting Denizli, wat ongeveer drie tot drieënhalf uur duurt. Een privéauto past goed bij deze rit: u hoeft niet over te stappen, u kunt onderweg een pauze inplannen en u komt rechtstreeks aan bij uw hotel in Pamukkale of Karahayıt.",
    },
    kapadokya: {
      name: { nominative: "Cappadocië", direction: "Cappadocië", location: "Cappadocië", origin: "Cappadocië" },
      about: "Cappadocië, in Centraal-Anatolië, staat bekend om de schoorsteenrotsen, de uit rots uitgehouwen kerken en de ondergrondse steden. Bij zonsopgang stijgen heteluchtballonnen op boven Göreme, Uçhisar en Ürgüp, en veel gasten overnachten in een hotel dat in de rots is uitgehouwen.",
      routeDetails: "Met ongeveer 540 km voert de reis van de Middellandse Zee over het Taurusgebergte en het Anatolische plateau en duurt zeven tot acht uur, inclusief pauzes. Een privétransfer is daarvoor de comfortabele manier: uw gezelschap reist samen, de chauffeur plant de pauzes samen met u en brengt u tot de ingang van uw grothotel. Geef ons bij het boeken uw vluchtnummer en hotel door, zodat we de dag kunnen plannen.",
    },
  },
};
