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
    bogazkent: {
      about: "Boğazkent liegt im Bezirk Serik an der Küste zwischen Belek und Side. Große All-inclusive-Resorts stehen direkt an einem breiten Sandstrand, und die Golfplätze von Belek sind nur wenige Minuten entfernt – ein ruhiger Standort für Familien und Golfer gleichermaßen.",
      routeDetails: "Vom Flughafen Antalya folgt die Strecke der D400 nach Osten an Belek vorbei und biegt dann zur Küste ab. Mit rund 48 km ist dies einer der kürzeren Transfers dieser Liste, und ein privates Fahrzeug bringt Sie vom Ankunftsbereich bis vor den Eingang Ihres Resorts, ohne Stopps an anderen Hotels.",
    },
    manavgat: {
      about: "Manavgat ist eine lebhafte Stadt am gleichnamigen Fluss, östlich von Side. Bekannt ist sie für ihren Wasserfall, Bootsfahrten auf dem Fluss und einen Wochenmarkt; zugleich ist sie das Tor zu den Resorts an diesem Küstenabschnitt. Bitte nennen Sie uns bei der Buchung die genaue Hoteladresse, da das Gebiet weitläufig ist.",
      routeDetails: "Die Strecke führt vom Flughafen Antalya rund 75 km auf der D400 nach Osten. Die Fahrt dauert etwa eine Stunde, und ein direkter Privattransfer erspart Ihnen die zusätzlichen Hotelstopps, die ein Sammeltransfer auf dieser stark befahrenen Küstenstraße einlegt.",
    },
    bodrum: {
      about: "Bodrum liegt an der Ägäisküste in der Provinz Muğla und ist berühmt für seine Johanniterburg, den Yachthafen und die weißen Häuser an den Hängen. Rund um die Halbinsel finden Sie lebhafte Viertel wie Gümbet und Bitez sowie ruhigere Buchten bei Yalıkavak, Türkbükü und Gümüşlük.",
      routeDetails: "Mit etwa 380 km ist dies eine der längsten Fahrten in unserem Angebot; sie dauert fünf bis sechs Stunden mit angenehmen Pausen. Ein privates Fahrzeug macht den Tag deutlich leichter als öffentliche Verkehrsmittel: Sie fahren los, sobald Sie gelandet sind, halten an, wo Sie möchten, und kommen direkt an Ihrem Hotel auf der Halbinsel an. Nennen Sie uns bei der Buchung Ihr Hotel und Ihre Landezeit, damit wir die Fahrt planen können.",
    },
    dalaman: {
      about: "Dalaman ist das Tor zur lykischen und karischen Küste. Der Flughafen bedient Urlaubsorte wie Sarıgerme und Göcek, und das nahe Dalyan ist bekannt für sein Flussdelta, die Felsgräber von Kaunos und den Schildkrötenstrand von İztuzu.",
      routeDetails: "Die 235 km vom Flughafen Antalya folgen der kurvenreichen lykischen Küstenstraße und dauern etwa drei bis dreieinhalb Stunden. Ein fester Preis pro Fahrzeug macht die lange Strecke gut kalkulierbar, und mit einem privaten Fahrzeug kann Ihre Gruppe jederzeit für eine Pause oder eine Mahlzeit anhalten.",
    },
    fethiye: {
      about: "Fethiye liegt an einer weiten Bucht, umgeben von kiefernbewachsenen Bergen. Der Ort ist Ausgangspunkt für Ölüdeniz mit seiner blauen Lagune, für die Strände und das Nachtleben von Çalış und für die ruhigeren Dörfer Hisarönü und Kayaköy. Viele Gäste kommen auch zum Gleitschirmfliegen vom Babadağ und für Bootsausflüge zu den zwölf Inseln.",
      routeDetails: "Die 205 km vom Flughafen Antalya führen an der lykischen Küste entlang über Kumluca, Kaş und Kalkan und dauern etwa zweieinhalb bis drei Stunden. Die Straße ist kurvenreich und landschaftlich schön. Mit einem Privattransfer müssen Sie in Fethiye nicht umsteigen, und der Fahrer bringt Sie zu Ihrem Hotel in Ölüdeniz, Çalış oder Hisarönü.",
    },
    pamukkale: {
      about: "Pamukkale in der Provinz Denizli ist UNESCO-Welterbe und bekannt für seine weißen Travertinterrassen und warmen Thermalbecken. Auf dem Hügel darüber liegt die antike Stadt Hierapolis mit Theater, Nekropole und dem antiken Becken, in dem Besucher zwischen versunkenen Säulen schwimmen können.",
      routeDetails: "Die Strecke verlässt die Küste und führt rund 245 km durch das Landesinnere, über das Taurusgebirge und die Hochebene in Richtung Denizli; das dauert etwa drei bis dreieinhalb Stunden. Ein privates Fahrzeug passt gut zu dieser Fahrt: Sie müssen nicht umsteigen, können unterwegs eine Pause einplanen und erreichen Ihr Hotel in Pamukkale oder Karahayıt direkt.",
    },
    kapadokya: {
      about: "Kappadokien in Zentralanatolien ist bekannt für seine Feenkamine, Felsenkirchen und unterirdischen Städte. Bei Sonnenaufgang steigen Heißluftballons über Göreme, Uçhisar und Ürgüp auf, und viele Gäste übernachten in einem in den Fels gehauenen Hotel.",
      routeDetails: "Mit rund 540 km führt die Fahrt vom Mittelmeer über das Taurusgebirge und die anatolische Hochebene und dauert mit Pausen sieben bis acht Stunden. Ein Privattransfer ist dafür die bequeme Lösung: Ihre Gruppe reist zusammen, der Fahrer plant die Pausen mit Ihnen und bringt Sie bis vor den Eingang Ihres Höhlenhotels. Nennen Sie uns bei der Buchung Ihre Flugnummer und Ihr Hotel, damit wir den Tag planen können.",
    },
  },
};
