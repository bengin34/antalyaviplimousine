import type { TransferLandingCopy } from "../transfer-landing-copy";

/**
 * Moved out of TransferPage.tsx unchanged. These pages already rank and
 * convert, so the wording is deliberately identical — only its location
 * changed, so the other languages can follow the same shape.
 */
export const de: TransferLandingCopy = {
  heroHeading: (name) => `Flughafen Antalya → ${name} Privattransfer`,
  heroCta: "Jetzt Transfer buchen",
  heroTrust: [
    "Bis zu 7 Personen",
    "Keine Vorauszahlung erforderlich",
    "Zahlung direkt beim Fahrer",
    "Fester Gesamtpreis ohne versteckte Gebühren",
    "Kostenloser Kindersitz auf Anfrage",
    "Flugüberwachung inklusive",
  ],
  serviceHeading: (name) => `Ihr privater Transfer nach ${name}`,
  aboutHeading: (name) => `Über ${name}`,
  ownGroup: (name) =>
    `Sie reisen ausschließlich mit Ihrer eigenen Gruppe direkt zu Ihrem Hotel in ${name}. Kein Shuttle, keine fremden Fahrgäste und keine unnötigen Zwischenstopps – der feste Preis gilt für das gesamte Fahrzeug.`,
  arrivalHeading: "Ihre Ankunft am Flughafen Antalya",
  arrivalBody:
    "Nachdem Sie Ihr Gepäck abgeholt haben, gehen Sie bitte zum Meet & Greet Bereich J / 777. Unser Flughafen-Team findet Ihre Buchung und bringt Sie mit Ihrem Fahrer zusammen. Dank Flugüberwachung passen wir die Abholung bei einer Verspätung ohne Aufpreis an.",
  returnHeading: "Hin- und Rücktransfer",
  returnBody: (name) =>
    `Gern organisieren wir auch Ihren Rücktransfer von ${name} zum Flughafen Antalya. Teilen Sie uns bei der Buchung Ihre Flugnummer und gewünschte Abholzeit mit.`,
  privateHeading: "Privat statt Sammeltransfer",
  privateBody: (name) =>
    `Bei diesem Transfer reisen nur Sie und Ihre Mitreisenden im Fahrzeug. Nach der Reservierung erhalten Sie eine klare Bestätigung mit Reisedaten und Kontaktmöglichkeit. Am Ankunftstag verfolgt unser Team Ihren Flug; bei einer früheren oder späteren Landung stimmen wir die Übergabe entsprechend ab. Der Fahrer bringt Sie mit Gepäck direkt zur Rezeption oder zur angegebenen Privatadresse in ${name}.`,
  priceBody:
    "Der ausgewiesene Betrag ist ein fester Gesamtpreis für das Fahrzeug, nicht pro Person. Es gibt keine versteckten Zuschläge für die Flugüberwachung, die übliche Wartezeit oder Kindersitze auf Anfrage. Bezahlt wird bar direkt beim Fahrer, zu Beginn der Fahrt. Damit kennen Sie die Kosten schon vor der Anreise und können entspannt starten.",
  vehicleHeading: "Fahrzeug, Gepäck und Kinder",
  vehicleBody:
    "Der Mercedes Vito eignet sich für bis zu sechs Personen mit normalem Reisegepäck; für größere Gruppen steht ein Mercedes Sprinter mit bis zu 12 Plätzen zur Verfügung. Teilen Sie uns Sondergepäck, einen Kinderwagen oder die benötigten Kindersitze bitte bei der Buchung mit. So planen wir Ihr Fahrzeug passend zu Ihrer Reisegruppe.",
  wholeVehicle: "Preis für das gesamte Fahrzeug",
  priceTrust: [
    "Keine Vorauszahlung erforderlich",
    "Zahlung direkt beim Fahrer",
    "Keine versteckten Gebühren",
  ],
  hotelsEyebrow: "Für Ihre Unterkunft",
  hotelsHeading: (name) => `Beliebte Hotels in ${name}`,
  hotelsBody: () => "Wir fahren direkt zu diesen und weiteren Hotels in der Region.",
  faq: [
    [
      "Wo treffe ich das Transfer-Team am Flughafen Antalya?",
      "Nachdem Sie Ihr Gepäck abgeholt haben, gehen Sie bitte zum Meet & Greet Bereich J / 777. Unser Flughafen-Team findet Ihre Buchung und bringt Sie mit Ihrem Fahrer zusammen.",
    ],
    [
      "Muss ich den Transfer im Voraus bezahlen?",
      "Nein. Eine Vorauszahlung ist nicht erforderlich. Sie zahlen den festen Gesamtpreis direkt beim Fahrer.",
    ],
    [
      "Ist ein Kindersitz verfügbar?",
      "Ja. Kindersitze stellen wir auf Wunsch kostenlos bereit. Bitte geben Sie Alter und Anzahl der Kinder bei der Buchung an.",
    ],
  ],
  regions: {
    antalya: {
      about: "Antalya-Stadt mit den Strandzonen Lara und Kundu liegt nur wenige Kilometer vom Flughafen entfernt. Entlang der Lara-Küste reihen sich große Themenresorts und Stadthotels, während Konyaaltı im Westen mit Kiesstrand und Promenade punktet.",
      routeDetails: "Die kurze Fahrt vom Flughafen Antalya führt über die Lara-Küstenstraße oder direkt ins Stadtzentrum. Auch auf dieser kurzen Strecke lohnt sich ein privater Transfer: kein Warten auf andere Gäste, kein Umstieg, direkte Ankunft an Ihrem Hotel.",
    },
    belek: {
      about: "Belek liegt östlich von Antalya und ist besonders für Golfplätze, große All-inclusive-Resorts und breite Sandstrände bekannt. Die Hotelanlagen verteilen sich zwischen Kadriye und der Küste bei Serik; deshalb ist die genaue Hoteladresse bei der Reservierung hilfreich.",
      routeDetails: "Die Fahrt führt vom Flughafen Antalya über die D400 in Richtung Serik und Belek. Für Familien, Golfer und Gäste mit spätem Flug ist der direkte Privattransfer praktisch, weil Sie ohne Sammelstopps oder Umstieg direkt an Ihrer Unterkunft ankommen.",
    },
    side: {
      about: "Side verbindet eine historische Altstadt mit langen Sandstränden und weitläufigen Ferienanlagen. Zum Urlaubsort gehören neben Side auch die beliebten Hotelzonen Kumköy, Evrenseki, Çolaklı, Sorgun und Titreyengöl.",
      routeDetails: "Vom Flughafen Antalya führt die Strecke über die Küstenstraße in Richtung Manavgat und Side. Besonders bei einer späten Ankunft ist ein privates Fahrzeug angenehm: Ihre Reisegruppe fährt direkt zum gebuchten Resort, ohne auf andere Hotelgäste zu warten.",
    },
    kemer: {
      about: "Kemer liegt westlich von Antalya zwischen dem Taurusgebirge und dem Mittelmeer. Die Region umfasst Kemer Zentrum sowie Beldibi, Göynük, Kiriş und Çamyuva – Orte mit Strandhotels, Jachthafen und Bergkulisse.",
      routeDetails: "Die direkte Fahrt folgt der Küste westlich von Antalya. Ihr Fahrer bringt Sie ohne Umstieg zu Ihrem Hotel; das ist besonders bequem, wenn Sie mit Kindern, Sportgepäck oder nach einer Abendlandung anreisen.",
    },
    alanya: {
      about: "Alanya ist eines der beliebtesten Ferienziele an der türkischen Riviera und liegt deutlich weiter östlich als die Resorts um Antalya. Neben dem Zentrum gehören Mahmutlar, Kestel, Avsallar, Türkler und Okurcalar zu den häufig angefragten Hotelgebieten.",
      routeDetails: "Die längere Küstenfahrt macht einen festen Fahrzeugpreis besonders transparent. Mit einem Privattransfer reisen Sie direkt mit Ihrer eigenen Gruppe und können nach der Landung entspannt bis vor die Rezeption Ihres Hotels weiterfahren.",
    },
    kizilagac: {
      about: "Kızılağaç liegt östlich von Manavgat und ist für weitläufige Strandresorts und ruhige Familienferien bekannt. Die Gegend grenzt an Sorgun und Manavgat; viele Hotels liegen etwas abseits der Hauptstraße direkt am Meer.",
      routeDetails: "Vom Flughafen Antalya fahren Sie über die D400 in Richtung Manavgat und anschließend weiter nach Kızılağaç. Ein privates Fahrzeug erspart die zusätzlichen Hotelstopps, die bei Sammeltransfers gerade auf dieser Strecke üblich sein können.",
    },
    tekirova: {
      about: "Tekirova liegt südlich von Kemer am Rand des Olympos-Beydağları-Nationalparks. Der Ort verbindet gepflegte Resortanlagen mit kleinen Buchten und liegt nahe der antiken Stätte Phaselis.",
      routeDetails: "Die Fahrt führt vom Flughafen Antalya über Kemer weiter nach Tekirova. Die Küstenlage und die Entfernung machen einen direkten Transfer sinnvoll: Sie fahren ohne Umstieg und ohne Wartezeit auf andere Gäste bis zu Ihrem Hotel.",
    },
  },
};
