import "./consent.js";
import { resolvePriceTokens, routeData } from "./prices.js";
import { parsePhoneNumberFromString } from "libphonenumber-js/max";
import fallbackChauffeurPhoto from "../assets/optimized/chauffeur-arrival.jpg?url";
import fallbackInteriorPhoto from "../assets/optimized/executive-interior.jpg?url";
import fallbackHeroPhoto from "../assets/optimized/antalya-coastline-hero.jpg?url";

const vehiclePhotoModules = import.meta.glob(
  "../assets/optimized/images/*.webp",
  {
    eager: true,
    import: "default",
    query: "?url",
  },
);

const customerPhotoModules = import.meta.glob(
  "../assets/optimized/customers/*.jpg",
  {
    eager: true,
    import: "default",
    query: "?url",
  },
);

const translations = {
  de: {
    navFleet: "Fahrzeuge",
    navService: "Service",
    navRoutes: "Strecken",
    navReviews: "Bewertungen",
    navContact: "Kontakt",
    bookNow: "Jetzt buchen",
    alwaysAvailable: "24 Stunden, jeden Tag erreichbar",
    heroEyebrow: "Privater Chauffeurservice · Antalya",
    heroTitle: "Premium Flughafentransfers<br />in Antalya",
    heroSubtitle:
      "Private Transfers mit Chauffeur vom Flughafen Antalya nach Belek, Side, Kemer und Alanya.",
    campaignBadge: "Online Spezial",
    campaignDiscount: "Sonderpreis",
    campaignScope: "auf alle Transferpreise",
    campaignApplied: "Online-Sonderpreis angewendet",
    onlineDiscountShort: "Online-Sonderpreis",
    discountPricesShown: "Online-Sonderpreise werden angezeigt",
    bookTransfer: "Transfer buchen",
    instantQuote: "Sofortpreis erhalten",
    googleRated: "Google-Bewertung",
    trustedGuests: "Von über 2.500 Gästen gebucht",
    discover: "Entdecken",
    privateJourney: "Ihre private Reise",
    quoteTitle: "Wohin dürfen wir Sie bringen?",
    pickup: "Abholung",
    destination: "Zielort",
    date: "Datum",
    tripType: "Fahrtart",
    oneWay: "Einfache Fahrt",
    roundTrip: "Hin- und Rückfahrt",
    roundTripHint:
      "Bei Hin- und Rückfahrt erfolgt die Rückfahrt auf derselben Strecke in umgekehrter Richtung.",
    returnDate: "Rückfahrtdatum",
    returnPickupTime: "Abholzeit der Rückfahrt",
    returnFlightNumber: "Rückflugnummer",
    arrivalDate: "Ankunftsdatum",
    arrivalFlightTime: "Ankunftszeit des Fluges",
    arrivalFlightNumber: "Ankunftsflugnummer",
    roundTripPriceNote: "Hin- und Rückfahrt · 2 Fahrten",
    guests: "Gäste",
    airportOption: "Flughafen Antalya (AYT)",
    hotelOption: "Hotel",
    privateAddressOption: "Privatadresse",
    pickupAddress: "Vollständige Abholadresse",
    pickupAddressPlaceholder: "Hotelname, Straße, Hausnummer und Stadtteil",
    dropoffAddress: "Vollständige Zieladresse",
    dropoffAddressPlaceholder: "Hotelname, Straße, Hausnummer und Stadtteil",
    dropoffAddressRequired:
      "Die Zieladresse muss zwischen 6 und 160 Zeichen lang sein.",
    customDestinationPrice:
      "Der Preis wird nach Prüfung der Zieladresse bestätigt.",
    selectDestination: "Ziel auswählen",
    airportReturnPrice:
      "Der Preis wird nach Prüfung des Hotels oder der Abholadresse bestätigt.",
    oneGuest: "1 Gast",
    twoGuests: "2 Gäste",
    threeGuests: "3 Gäste",
    fourGuests: "4 Gäste",
    fiveGuests: "5 Gäste",
    sixGuests: "6 Gäste",
    sevenGuests: "7 Gäste",
    viewQuote: "Preis anzeigen",
    flightTracking: "Flugverfolgung in Echtzeit",
    fixedPrice: "Garantierter Festpreis",
    meetGreet: "Persönlicher Empfang",
    speakingDrivers: "Deutsch & Englisch sprechend",
    tbLicensed: "TÜRSAB-zertifiziert",
    tbFlightTracking: "Flugverfolgung",
    tbFixedPrice: "Festpreisgarantie",
    tb247Concierge: "24/7 Concierge",
    tbChildSeats: "Kindersitze inklusive",
    welcomeEyebrow: "Willkommen auf höchstem Niveau",
    welcomeTitle: "Stilvoll reisen.<br />Entspannt ankommen.",
    welcomeBody:
      "Nachdem Sie Ihr Gepäck abgeholt haben, gehen Sie bitte zum Meet & Greet Bereich J / 777. Unser Flughafen-Team findet Ihre Buchung, hilft bei Bedarf mit dem Gepäck und bringt Sie mit Ihrem Fahrer zusammen.",
    ourStandards: "Unsere Servicestandards",
    concierge: "Concierge-Service",
    guestsWelcomed: "Begrüßte Gäste",
    guestRating: "Durchschnittliche Bewertung",
    privateTransfers: "Private Transfers",
    fleetEyebrow: "Unsere Flotte",
    fleetTitle: "Ihr privater Raum,<br />vollendet bis ins Detail.",
    fleetIntro:
      "Reisen Sie komfortabel mit großzügigem Platz für Familie, Golfgepäck und Koffer.",
    fleetVclassClass: "Business · First Class",
    fleetVclassDescription:
      "Großzügiger VIP-Transport für größere Gruppen mit viel Platz für Passagiere und Gepäck.",
    fleetVitoClass: "VIP · Grand Touring",
    fleetVitoDescription:
      "Eine komfortable Privatkabine für Familien und kleine Gruppen.",
    signatureFleet: "Signature Flotte",
    passengers: "Passagiere",
    suitcases: "Koffer",
    luggageLabel: "Großes Gepäck",
    capacitySwitchedSprinter:
      "Passagiere und Gepäck übersteigen den Vito — auf Mercedes Sprinter umgestellt.",
    capacityNoVehicle:
      "So viele Passagiere und Gepäck übersteigen unsere Fahrzeuge. Bitte kontaktieren Sie uns per WhatsApp.",
    leatherSeats: "Premium-Ledersitze",
    wifi: "Kostenloses WLAN",
    water: "Gekühltes Mineralwasser",
    childSeats: "Kindersitze auf Wunsch",
    television: "Fernseher im Fahrzeug",
    coldDrinks: "Kalte Getränke",
    snacks: "Snacks",
    nameSignGreeting: "Persönlicher Empfang bei der Ankunft",
    reserveVehicle: "Fahrzeug reservieren",
    insideVclass: "Im Sprinter Interieur",
    interiorTitle: "Eine private Lounge zwischen<br />Flughafen und Hotel.",
    serviceEyebrow: "Der Antalya VIP Standard",
    serviceTitle: "Mehr als ein Transfer.<br />Ein besonderer Empfang.",
    serviceIntro:
      "Aufmerksamkeit auf Hotelniveau, erfahrene lokale Chauffeure und absolute Sicherheit vom Flughafen bis zum Resort.",
    trackingTitle: "Flugverfolgung",
    trackingBody:
      "Wir verfolgen Ihren Flug in Echtzeit und passen die Abholung automatisch und kostenlos an.",
    chauffeurTitle: "Professionelle Chauffeure",
    chauffeurBody:
      "Stets gepflegt, diskret und ausgewählt für Ortskenntnis und höchsten Servicestandard.",
    greetTitle: "Meet & Greet",
    greetBody:
      "Nachdem Sie Ihr Gepäck abgeholt haben, gehen Sie bitte zum Meet & Greet Bereich J / 777. Unser Flughafen-Team findet Ihre Buchung und bringt Sie mit Ihrem Fahrer zusammen.",
    supportTitle: "24/7 Concierge",
    supportBody:
      "Vor, während und nach Ihrer Reise ist immer ein persönlicher Ansprechpartner erreichbar.",
    priceTitle: "Festpreise",
    priceBody:
      "Der bestätigte Preis ist der Endpreis. Wartezeit, Parken und Flugverspätungen sind inklusive.",
    familyTitle: "Für Familien",
    familyBody:
      "Passende Kindersitze, großzügige Innenräume und geduldige Hilfe für eine entspannte Ankunft.",
    routesEyebrow: "Unsere beliebtesten Fahrten",
    routesTitle: "Vom Flughafen Antalya<br />an die Türkische Riviera.",
    routesIntro:
      "Alle Preise gelten pro Fahrzeug, nie pro Person. Kostenlose Wartezeit ist inklusive.",
    golfFavourite: "Golf-Favorit",
    from: "Ab",
    reviewsEyebrow: "Gästebewertungen",
    reviewsTitle: "Service, der lange<br />in Erinnerung bleibt.",
    googleReviews: "Basierend auf 387 verifizierten Google-Bewertungen",
    reviewOne:
      "„Unser Fahrer wartete trotz 90 Minuten Flugverspätung. Das Fahrzeug war makellos, angenehm kühl und bereits mit beiden Kindersitzen ausgestattet. Genau der Empfang, den unsere Familie brauchte.“",
    reviewTwo:
      "„Vom ersten WhatsApp-Kontakt bis zur Ankunft in Belek absolut erstklassig. Pünktlich, diskret und sehr professionell. Auch unsere Golftaschen hatten bequem Platz.“",
    reviewThree:
      "„Das fühlte sich wie der Chauffeurservice eines Hotels an, nicht wie ein Flughafentaxi. Klare Kommunikation, ein makelloses Fahrzeug und ein aufrichtig höflicher Fahrer.“",
    trustedBy: "Gebucht von Gästen führender Resorts in Antalya",
    faqEyebrow: "Häufig gefragt",
    faqTitle: "Vor Ihrer Reise.",
    faqCatArrival: "Ankunft & Transfer",
    faqCatPayment: "Zahlung & Preis",
    faqCatVehicle: "Fahrzeug & Gepäck",
    faqReminder: "Bitte lesen Sie vor Ihrer Reise den FAQ-Bereich auf unserer Website.",
    viewFaq: "FAQ ansehen",
    faqIntro:
      "Alles, was Sie über Ihren privaten Flughafentransfer in Antalya wissen müssen.",
    askQuestion: "Frage stellen",
    faqOneQ: "Was passiert bei einer Flugverspätung?",
    faqOneA:
      "Sie müssen nichts unternehmen. Wir verfolgen Ihren Flug in Echtzeit und passen Ihre Abholzeit automatisch an. Verspätungen der Fluggesellschaft berechnen wir nie – Ihr Chauffeur ist da, wann immer Sie landen, und die ersten 90 Minuten nach der Landung sind immer inklusive.",
    faqTwoQ:
      "Ich komme mit einem internationalen Flug an. Wie läuft die Abholung ab?",
    faqTwoA:
      "Nach Passkontrolle und Gepäckausgabe folgen Sie den übrigen Passagieren in den Meet & Greet Bereich und kommen zu unserem Schalter J / 777. Nennen Sie unseren Mitarbeitern einfach Ihren Namen – das genügt. Unser Team informiert sofort Ihren Chauffeur; er fährt in den Flughafen ein und steht am Abholpunkt bereit, während unser Mitarbeiter Sie zum Fahrzeug begleitet. Der gesamte Ablauf dauert etwa 7–8 Minuten.",
    faqSixQ:
      "Ich komme mit einem Inlandsflug an. Wo finde ich meinen Chauffeur?",
    faqSixA:
      "Der Meet & Greet Bereich steht ausschließlich internationalen Ankünften zur Verfügung. Inlandsgäste betreuen wir deshalb anders: Wir senden Ihnen vor dem Transfer die Telefonnummer Ihres Chauffeurs. Geben Sie ihm nach der Landung kurz Bescheid – er holt Sie in der Ankunftshalle ab.",
    faqSevenQ: "Was tue ich, wenn am Schalter J / 777 niemand ist?",
    faqSevenA:
      "An unserem Schalter sind durchgehend zwei Mitarbeiter im Einsatz, deren einzige Aufgabe es ist, ankommende Gäste zu ihrem Fahrzeug zu begleiten. Ist der Schalter kurz unbesetzt, begleitet ein Kollege gerade den Gast vor Ihnen – jede Begleitung dauert etwa 7–8 Minuten. Bitte warten Sie rund 10 Minuten. Ist bis dahin niemand zurück, schreiben Sie uns über WhatsApp: Wir informieren Ihren Chauffeur umgehend, lassen ihn am nächstgelegenen Punkt halten und führen Sie ohne weiteres Warten direkt zu Ihrem Wagen.",
    faqEightQ:
      "Was gilt, wenn ich länger als 90 Minuten für den Weg aus dem Flughafen brauche?",
    faqEightA:
      "Die ersten 90 Minuten nach der Landung sind kostenfrei enthalten – deutlich mehr, als Passkontrolle, Gepäck und Zoll benötigen – und dieses Zeitfenster verschiebt sich bei Flugverspätungen automatisch. Nur wenn Sie aus Gründen, die nicht mit Ihrem Flug zusammenhängen, länger im Terminal bleiben, kommt ein Parkkostenbeitrag von 5 € je weitere Stunde hinzu. In der Praxis kommt das so gut wie nie vor: Nahezu alle unsere Gäste sind längst vorher unterwegs.",
    faqNineQ: "Wie bezahle ich?",
    faqNineA:
      "Sie bezahlen Ihrem Chauffeur zu Beginn der Fahrt bar – Kartenzahlung ist nicht möglich. Die Preise sind in Euro (EUR) festgelegt: Der Festbetrag entspricht genau dem, was Sie bei der Buchung gesehen haben – pro Fahrzeug, inklusive aller Flughafen- und Parkgebühren, ohne spätere Zusätze. Möchten Sie lieber in US-Dollar oder Türkischer Lira zahlen? Schreiben Sie uns vorab über WhatsApp für einen separaten Preis, da der Wechselkurs abweicht. Ihr Chauffeur begrüßt Sie, verlädt Ihr Gepäck und montiert die gewünschten Kindersitze; nach der Zahlung beginnt Ihre Fahrt.",
    faqTenQ: "Wie halte ich beim Rücktransfer Kontakt?",
    faqTenA:
      "Sobald Sie Datum und Uhrzeit Ihrer Rückfahrt per WhatsApp mit unserem Team bestätigt haben, teilen wir Ihnen einige Stunden vor dem Transfer Ihr Fahrzeug zu und senden Ihnen Fotos davon über WhatsApp – auf Wunsch auch die Telefonnummer Ihres Chauffeurs. Erreicht Ihr Chauffeur das Hotel, informiert er die Rezeption, die Ihr Zimmer benachrichtigt, sobald der Wagen bereitsteht. Unsere Chauffeure rufen Gäste nie direkt an: Die gesamte Kommunikation läuft über unsere zentrale WhatsApp-Betreuung, sodass Sie immer genau wissen, mit wem Sie sprechen.",
    faqThreeQ: "Sind Kindersitze verfügbar?",
    faqThreeA:
      "Ja. Babyschalen, Kindersitze und Sitzerhöhungen sind bei Vorbestellung kostenlos verfügbar.",
    faqFourQ: "Können Golfbags und großes Gepäck transportiert werden?",
    faqFourA:
      "Ja. Sprinter und Vito sind ideal für Golfgruppen. Teilen Sie uns Ihr Gepäck mit und wir planen das passende Fahrzeug.",
    faqFiveQ: "Ist der angezeigte Preis endgültig?",
    faqFiveA:
      "Ja. Der Preis aus Ihrer Buchung ist der Betrag, den Sie Ihrem Chauffeur bar übergeben – pro Fahrzeug, inklusive aller Flughafengebühren, Parkkosten und der ersten 90 Minuten Wartezeit. Es gibt keine versteckten Kosten.",
    contactEyebrow: "Ihre Reise beginnt hier",
    contactTitle: "Außergewöhnlich gut<br />in Antalya ankommen.",
    contactBody:
      "Buchen Sie in weniger als zwei Minuten online oder sprechen Sie direkt mit unserem 24/7 Concierge-Team.",
    whatsappUs: "WhatsApp",
    replyMinutes: "Antwort meist in wenigen Minuten",
    callUs: "24/7 anrufen",
    emailUs: "Concierge E-Mail",
    replyHour: "Antwort innerhalb einer Stunde",
    fromAirport: "Ab Flughafen Antalya",
    perVehicle: "pro Fahrzeug · Festpreis",
    footerTagline:
      "Private Chauffeurservices an der gesamten Türkischen Riviera.",
    explore: "Entdecken",
    information: "Information",
    licensed: "Lizenzierter privater Transferanbieter · TÜRSAB-konform",
    quoteReady: "Ihr privater Transfer",
    vehicle: "Fahrzeug",
    journeyTime: "Fahrzeit",
    totalFixed: "Gesamtpreis",
    quoteIncludes:
      "Inklusive Meet & Greet, Flugverfolgung, Parken, 90 Minuten Wartezeit und Mineralwasser.",
    confirmWhatsapp: "Über WhatsApp bestätigen",
    chatWithUs: "Mit uns chatten",
    bookNowCta: "Jetzt buchen",
    backToQuote: "Zurück",
    yourDetails: "Ihre Daten",
    fullName: "Vollständiger Name",
    emailLabel: "E-Mail",
    phoneLabel: "Telefon / WhatsApp",
    flightNumber: "Flugnummer",
    flightArrivalTime: "Ankunftszeit",
    notesLabel: "Besondere Wünsche",
    confirmBooking: "Buchung bestätigen",
    bookingConfirmed: "Buchung bestätigt",
    referenceLabel: "Referenz",
    weWillContact:
      "Ihre Buchungsanfrage wurde gesendet. Wir melden uns innerhalb von 30 Minuten.",
    paymentError: "Zahlung fehlgeschlagen. Bitte erneut versuchen.",
  },
  tr: {
    navFleet: "Araçlar",
    navService: "Hizmetler",
    navRoutes: "Rotalar",
    navReviews: "Yorumlar",
    navContact: "İletişim",
    bookNow: "Hemen rezervasyon",
    alwaysAvailable: "Her gün 24 saat hizmetinizdeyiz",
    heroEyebrow: "Özel şoför hizmeti · Antalya",
    heroTitle: "Antalya'da Premium<br />Havalimanı Transferi",
    heroSubtitle:
      "Antalya Havalimanı'ndan Belek, Side, Kemer ve Alanya'ya özel şoförlü transfer.",
    campaignBadge: "Online'a özel",
    campaignDiscount: "Özel fiyat",
    campaignScope: "tüm transfer fiyatlarında",
    campaignApplied: "Online'a özel fiyat uygulanmıştır",
    onlineDiscountShort: "Online özel fiyat",
    discountPricesShown: "Online'a özel fiyatlar gösteriliyor",
    bookTransfer: "Transferinizi ayırtın",
    instantQuote: "Anında fiyat alın",
    googleRated: "Google puanı",
    trustedGuests: "2.500'den fazla misafirin tercihi",
    discover: "Keşfedin",
    privateJourney: "Size özel yolculuk",
    quoteTitle: "Sizi nereye götürelim?",
    pickup: "Alış noktası",
    destination: "Varış noktası",
    date: "Tarih",
    tripType: "Yolculuk türü",
    oneWay: "Tek yön",
    roundTrip: "Gidiş–dönüş",
    roundTripHint:
      "Gidiş–dönüş rezervasyonunda dönüş, aynı rotanın ters yönünde gerçekleşir.",
    returnDate: "Dönüş tarihi",
    returnPickupTime: "Dönüş alış saati",
    returnFlightNumber: "Dönüş uçuş numarası",
    arrivalDate: "Geliş tarihi",
    arrivalFlightTime: "Geliş uçuş saati",
    arrivalFlightNumber: "Geliş uçuş numarası",
    roundTripPriceNote: "gidiş–dönüş · 2 yolculuk",
    guests: "Misafir",
    airportOption: "Antalya Havalimanı (AYT)",
    hotelOption: "Otel",
    privateAddressOption: "Özel adres",
    pickupAddress: "Tam alış adresi",
    pickupAddressPlaceholder: "Otel adı, cadde, bina numarası ve ilçe",
    dropoffAddress: "Tam varış adresi",
    dropoffAddressPlaceholder: "Otel adı, cadde, bina numarası ve ilçe",
    dropoffAddressRequired: "Varış adresi 6–160 karakter arasında olmalıdır.",
    customDestinationPrice:
      "Fiyat, varış adresi kontrol edildikten sonra teyit edilecektir.",
    selectDestination: "Varış noktası seçin",
    airportReturnPrice:
      "Fiyat, otel veya alış adresi kontrol edildikten sonra teyit edilecektir.",
    oneGuest: "1 misafir",
    twoGuests: "2 misafir",
    threeGuests: "3 misafir",
    fourGuests: "4 misafir",
    fiveGuests: "5 misafir",
    sixGuests: "6 misafir",
    sevenGuests: "7 misafir",
    viewQuote: "Fiyatı görüntüle",
    flightTracking: "Gerçek zamanlı uçuş takibi",
    fixedPrice: "Sabit fiyat garantisi",
    meetGreet: "Kişisel karşılama",
    speakingDrivers: "İngilizce ve Almanca konuşan şoförler",
    tbLicensed: "TÜRSAB Lisanslı",
    tbFlightTracking: "Uçuş Takibi",
    tbFixedPrice: "Sabit Fiyat",
    tb247Concierge: "7/24 Concierge",
    tbChildSeats: "Çocuk Koltuğu Dahil",
    welcomeEyebrow: "Daha iyi bir karşılamaya hoş geldiniz",
    welcomeTitle: "Zarafetle seyahat edin.<br />Rahatça varın.",
    welcomeBody:
      "Uçağınız indiği andan itibaren her ayrıntı düşünülür. Şoförünüz gelen yolcu salonunda bekler, bagajınızla ilgilenir ve sizi özenle hazırlanmış özel aracınıza götürür.",
    ourStandards: "Hizmet standartlarımız",
    concierge: "Concierge desteği",
    guestsWelcomed: "Karşılanan misafir",
    guestRating: "Ortalama misafir puanı",
    privateTransfers: "Özel transfer",
    fleetEyebrow: "Araç filomuz",
    fleetTitle: "Size özel alan,<br />her ayrıntıda kusursuz.",
    fleetIntro:
      "Aileniz, golf ekipmanınız ve bagajınız için geniş alan sunan sessiz bir konforla seyahat edin.",
    fleetVclassClass: "Business · First Class",
    fleetVclassDescription:
      "Kalabalık gruplar için geniş yolcu ve bagaj alanı sunan VIP ulaşım.",
    fleetVitoClass: "VIP · Grand Touring",
    fleetVitoDescription:
      "Aileler ve küçük gruplar için konforlu ve özel bir kabin.",
    signatureFleet: "Seçkin filo",
    passengers: "yolcu",
    suitcases: "bavul",
    luggageLabel: "Büyük bavul",
    capacitySwitchedSprinter:
      "Yolcu ve bagajınız Vito kapasitesini aşıyor — Mercedes Sprinter'a geçildi.",
    capacityNoVehicle:
      "Bu kadar yolcu ve bavul araçlarımızın kapasitesini aşıyor. Lütfen WhatsApp'tan bize ulaşın.",
    leatherSeats: "Premium deri koltuklar",
    wifi: "Ücretsiz WiFi",
    water: "Soğuk şişe su",
    childSeats: "Talep üzerine çocuk koltuğu",
    television: "Araç içi televizyon",
    coldDrinks: "Soğuk içecekler",
    snacks: "Atıştırmalıklar",
    nameSignGreeting: "Gelişte kişisel karşılama",
    reserveVehicle: "Bu aracı ayırtın",
    insideVclass: "Sprinter'ın içinde",
    interiorTitle:
      "Havalimanı ile oteliniz arasında<br />size özel bir lounge.",
    serviceEyebrow: "Antalya VIP standardı",
    serviceTitle: "Transferden fazlası.<br />Özenli bir karşılama.",
    serviceIntro:
      "Havalimanından otele kadar beş yıldızlı ilgi, deneyimli yerel şoförler ve tam huzur.",
    trackingTitle: "Uçuş takibi",
    trackingBody:
      "Uçuşunuzu gerçek zamanlı takip eder, alış saatinizi hiçbir ek ücret olmadan otomatik olarak ayarlarız.",
    chauffeurTitle: "Profesyonel şoförler",
    chauffeurBody:
      "Bakımlı, gizliliğe önem veren ve yerel bilgisi ile hizmet kalitesi için seçilmiş profesyoneller.",
    greetTitle: "Karşılama hizmeti",
    greetBody:
      "Şoförünüz sizi gelen yolcu salonunda karşılar ve bagajınıza yardımcı olur.",
    supportTitle: "7/24 concierge",
    supportBody:
      "Yolculuğunuzdan önce, yolculuk sırasında ve sonrasında telefon veya WhatsApp üzerinden gerçek bir kişiye ulaşabilirsiniz.",
    priceTitle: "Sabit fiyatlar",
    priceBody:
      "Onaylanan fiyat ödeyeceğiniz nihai fiyattır. Bekleme, otopark ve uçuş gecikmeleri dahildir.",
    familyTitle: "Ailelere hazır",
    familyBody:
      "Yaşa uygun çocuk koltukları, geniş kabinler ve rahat bir aile karşılaması için özenli destek.",
    routesEyebrow: "En çok tercih edilen yolculuklar",
    routesTitle: "Antalya Havalimanı'ndan<br />Türk Rivierası'na.",
    routesIntro:
      "Tüm fiyatlar kişi başı değil, araç başıdır ve ücretsiz bekleme süresi dahildir.",
    golfFavourite: "Golf misafirlerinin favorisi",
    from: "Başlangıç",
    reviewsEyebrow: "Misafir yorumları",
    reviewsTitle: "Varıştan sonra da<br />hatırlanan hizmet.",
    googleReviews: "Doğrulanmış 387 Google yorumuna göre",
    reviewOne:
      "“Uçağımız 90 dakika gecikmesine rağmen şoförümüz bizi bekliyordu. Aracımız kusursuz, serin ve iki çocuk koltuğu da hazırdı. Ailemizin tam olarak ihtiyaç duyduğu karşılamaydı.”",
    reviewTwo:
      "“İlk WhatsApp görüşmesinden Belek'e varışımıza kadar her şey birinci sınıftı. Dakik, gizliliğe önem veren ve son derece profesyonel. Golf çantalarımız da rahatça sığdı.”",
    reviewThree:
      "“Bu bir havalimanı taksisinden çok beş yıldızlı otel şoför hizmeti gibiydi. Net iletişim, tertemiz araç ve gerçekten nazik bir şoför.”",
    trustedBy: "Antalya'nın önde gelen resort misafirlerinin tercihi",
    faqEyebrow: "Sık sorulanlar",
    faqTitle: "Seyahatinizden önce.",
    faqCatArrival: "Karşılama & Transfer",
    faqCatPayment: "Ödeme & Fiyat",
    faqCatVehicle: "Araç & Bagaj",
    faqReminder: "Seyahatinizden önce lütfen sitemizdeki SSS bölümünü inceleyin.",
    viewFaq: "SSS'yi görüntüle",
    faqIntro:
      "Antalya'daki özel havalimanı transferiniz hakkında bilmeniz gereken her şey.",
    askQuestion: "Bize sorun",
    faqOneQ: "Uçuşum gecikirse ne olur?",
    faqOneA:
      "Sizin yapmanız gereken hiçbir şey yok. Uçuşunuzu canlı takip eder, alış saatinizi otomatik olarak güncelleriz. Uçuş kaynaklı gecikmeler için hiçbir ek ücret alınmaz; ne zaman inerseniz inin şoförünüz sizi bekliyor olur ve inişten sonraki ilk 90 dakika her zaman fiyata dahildir.",
    faqTwoQ: "Dış hat uçuşuyla geliyorum, karşılama nasıl işliyor?",
    faqTwoA:
      "Pasaport kontrolü ve bagajınızı aldıktan sonra tüm yolcuların yöneldiği Karşılama (Meet & Greet) alanına ilerleyin ve J / 777 numaralı kontuarımıza gelin. Personelimize adınızı söylemeniz yeterli. Personelimiz aynı anda şoförünüzü bilgilendirir; şoförünüz havalimanına giriş yapıp karşılama noktasındaki yerini alır, siz de personelimiz eşliğinde aracınıza ilerlersiniz. Tüm süreç ortalama 7-8 dakika sürer.",
    faqSixQ: "Yurt içi uçuşla geliyorum, şoförümü nasıl bulacağım?",
    faqSixA:
      "Karşılama (Meet & Greet) alanı yalnızca dış hat yolcuları içindir; iç hatlarda böyle bir alan bulunmaz. Bu nedenle iç hat misafirlerimize transferden önce şoförlerinin telefon numarasını iletiriz. İndiğinizde kendisine kısaca haber vermeniz yeterli; şoförünüz sizi yolcu karşılama bölümünden alır.",
    faqSevenQ: "J / 777 kontuarında görevli yoksa ne yapmalıyım?",
    faqSevenA:
      "Kontuarımızda sürekli iki personelimiz görev yapar ve tek işleri gelen misafirleri araçlarına yönlendirmektir. Kontuarı bir an boş bulursanız bu, personelimizin sizden hemen önce gelen misafiri aracına götürdüğü anlamına gelir; her yönlendirme yaklaşık 7-8 dakika sürer. Lütfen yaklaşık 10 dakika bekleyin. Bu sürenin sonunda hâlâ kimse dönmediyse WhatsApp hattımızdan bize yazın: şoförünüzü anında bilgilendirir, en yakın noktaya park etmesini sağlar ve sizi hiç bekletmeden doğrudan aracınıza ulaştırırız.",
    faqEightQ: "Havalimanından çıkmam 90 dakikadan uzun sürerse ne olur?",
    faqEightA:
      "Uçağınız indikten sonraki ilk 90 dakika ücretsiz olarak fiyata dahildir; pasaport, bagaj ve gümrük için fazlasıyla yeterli bir süredir ve uçuş gecikmelerinde bu süre otomatik olarak kayar. Yalnızca uçuşunuzla ilgisi olmayan bir nedenle terminalde 90 dakikadan uzun kalırsanız, aracınızın otoparkta geçirdiği her ek saat için 5 € otopark katkı bedeli eklenir. Uygulamada bu neredeyse hiç yaşanmaz; misafirlerimizin tamamına yakını bu sürenin çok öncesinde yola çıkar.",
    faqNineQ: "Ödemeyi nasıl yapıyorum?",
    faqNineA:
      "Ödemenizi yolculuğun başında, doğrudan şoförünüze nakit olarak yaparsınız; kart geçmez. Fiyatlar euro (EUR) üzerinden belirlenir: ödeyeceğiniz sabit tutar, rezervasyonda gördüğünüz tutarın aynısıdır – araç başına, tüm havalimanı ve otopark ücretleri dahil, sonradan eklenen kalem yok. Amerikan doları veya Türk lirasıyla ödemek isterseniz, kur farklı olduğundan ayrı bir fiyat için önceden WhatsApp'tan bize yazın. Şoförünüz sizi karşılar, bagajlarınızı yükler, talep ettiyseniz çocuk koltuklarını hazırlar; ödemenizin ardından yolculuğunuz başlar.",
    faqTenQ: "Dönüş transferimde iletişimi nasıl kuracağım?",
    faqTenA:
      "Dönüş gün ve saatinizi ekibimizle WhatsApp üzerinden teyit ettikten sonra, transferinize saatler kala aracınızı belirler ve size WhatsApp'tan aracın fotoğraflarını gönderiririz; dilerseniz şoförünüzün telefon numarasını da paylaşırız. Şoförünüz belirlenen saatte otelinize ulaştığında resepsiyona haber verir, resepsiyon da odanıza aracınızın hazır olduğunu bildirir. Şoförlerimiz misafirlerimizi doğrudan aramaz; tüm iletişim tek bir noktadan, WhatsApp müşteri destek hattımız üzerinden yürür. Böylece kiminle konuştuğunuzdan her zaman emin olursunuz.",
    faqThreeQ: "Çocuk koltuğu var mı?",
    faqThreeA:
      "Evet. Bebek koltuğu, çocuk koltuğu ve yükseltici koltuk rezervasyon sırasında ücretsiz olarak talep edilebilir.",
    faqFourQ: "Golf çantası ve büyük bagaj taşıyor musunuz?",
    faqFourA:
      "Evet. Sprinter ve Vito araçlarımız golf grupları için idealdir. Bagaj bilgilerinizi paylaşın, uygun aracı planlayalım.",
    faqFiveQ: "Verilen fiyat kesin mi?",
    faqFiveA:
      "Evet. Rezervasyonda gördüğünüz tutar, yolculuğun başında şoförünüze nakit ödeyeceğiniz tutardır: araç başına; tüm havalimanı ücretleri, otopark ve inişten sonraki ilk 90 dakikalık bekleme dahil. Gizli ücret yoktur.",
    contactEyebrow: "Yolculuğunuz burada başlar",
    contactTitle: "Antalya'ya ayrıcalıklı<br />bir şekilde varın.",
    contactBody:
      "İki dakikadan kısa sürede online rezervasyon yapın veya 7/24 concierge ekibimizle doğrudan görüşün.",
    whatsappUs: "WhatsApp'tan yazın",
    replyMinutes: "Genellikle birkaç dakika içinde yanıt veririz",
    callUs: "7/24 arayın",
    emailUs: "Concierge e-postası",
    replyHour: "Bir saat içinde yanıt",
    fromAirport: "Antalya Havalimanı'ndan",
    perVehicle: "araç başı · sabit fiyat",
    footerTagline: "Türk Rivierası genelinde özel şoför hizmetleri.",
    explore: "Keşfedin",
    information: "Bilgi",
    licensed: "Lisanslı özel transfer işletmesi · TÜRSAB standartlarına uygun",
    quoteReady: "Size özel transfer",
    vehicle: "Araç",
    journeyTime: "Yolculuk süresi",
    totalFixed: "Toplam sabit fiyat",
    quoteIncludes:
      "Karşılama, uçuş takibi, otopark, 90 dakika bekleme ve şişe su dahildir.",
    confirmWhatsapp: "WhatsApp ile onaylayın",
    chatWithUs: "Bize yazın",
    bookNowCta: "Rezervasyon yap",
    backToQuote: "Geri",
    yourDetails: "Bilgileriniz",
    fullName: "Ad Soyad",
    emailLabel: "E-posta",
    phoneLabel: "Telefon / WhatsApp",
    flightNumber: "Uçuş numarası",
    flightArrivalTime: "Varış saati",
    notesLabel: "Özel istekler",
    confirmBooking: "Rezervasyonu onayla",
    bookingConfirmed: "Rezervasyon Onaylandı",
    referenceLabel: "Referans",
    weWillContact:
      "Rezervasyon talebiniz gönderildi. 30 dakika içinde sizinle iletişime geçeceğiz.",
    paymentError: "Ödeme başarısız. Lütfen tekrar deneyin.",
  },
  ru: {
    navFleet: "Автопарк",
    navService: "Сервис",
    navRoutes: "Маршруты",
    navReviews: "Отзывы",
    navContact: "Контакты",
    bookNow: "Забронировать",
    alwaysAvailable: "Мы на связи круглосуточно, каждый день",
    heroEyebrow: "Персональный шофёр · Анталья",
    heroTitle: "Премиальный трансфер<br />из аэропорта Антальи",
    heroSubtitle:
      "Индивидуальные трансферы с водителем из аэропорта Антальи в Белек, Сиде, Кемер и Аланью.",
    campaignBadge: "Онлайн-акция",
    campaignDiscount: "спеццена",
    campaignScope: "на все трансферы",
    campaignApplied: "Применена специальная онлайн-цена",
    onlineDiscountShort: "Онлайн-спеццена",
    discountPricesShown: "Показаны специальные онлайн-цены",
    bookTransfer: "Забронировать трансфер",
    instantQuote: "Узнать цену",
    googleRated: "Рейтинг Google",
    trustedGuests: "Нам доверяют более 2 500 гостей",
    discover: "Подробнее",
    privateJourney: "Ваша частная поездка",
    quoteTitle: "Куда вас отвезти?",
    pickup: "Место встречи",
    destination: "Направление",
    date: "Дата",
    tripType: "Тип поездки",
    oneWay: "В одну сторону",
    roundTrip: "Туда и обратно",
    roundTripHint:
      "Обратная поездка проходит по тому же маршруту в обратном направлении.",
    returnDate: "Дата возвращения",
    returnPickupTime: "Время подачи на обратный путь",
    returnFlightNumber: "Номер обратного рейса",
    arrivalDate: "Дата прибытия",
    arrivalFlightTime: "Время прибытия рейса",
    arrivalFlightNumber: "Номер рейса прибытия",
    roundTripPriceNote: "туда и обратно · 2 поездки",
    guests: "Гости",
    airportOption: "Аэропорт Антальи (AYT)",
    hotelOption: "Отель",
    privateAddressOption: "Частный адрес",
    pickupAddress: "Полный адрес подачи",
    pickupAddressPlaceholder: "Название отеля, улица, номер дома и район",
    dropoffAddress: "Полный адрес назначения",
    dropoffAddressPlaceholder: "Название отеля, улица, номер дома и район",
    dropoffAddressRequired:
      "Адрес назначения должен содержать от 6 до 160 символов.",
    customDestinationPrice:
      "Цена будет подтверждена после проверки адреса назначения.",
    selectDestination: "Выберите направление",
    airportReturnPrice:
      "Цена будет подтверждена после проверки отеля или адреса подачи.",
    oneGuest: "1 гость",
    twoGuests: "2 гостя",
    threeGuests: "3 гостя",
    fourGuests: "4 гостя",
    fiveGuests: "5 гостей",
    sixGuests: "6 гостей",
    sevenGuests: "7 гостей",
    viewQuote: "Показать цену",
    flightTracking: "Отслеживание рейса",
    fixedPrice: "Гарантия фиксированной цены",
    meetGreet: "Персональная встреча",
    speakingDrivers: "Водители говорят на английском и немецком",
    tbLicensed: "Лицензия TÜRSAB",
    tbFlightTracking: "Отслеживание рейса",
    tbFixedPrice: "Фиксированная цена",
    tb247Concierge: "Консьерж 24/7",
    tbChildSeats: "Детские кресла в комплекте",
    welcomeEyebrow: "Добро пожаловать на новый уровень сервиса",
    welcomeTitle: "Путешествуйте красиво.<br />Прибывайте без забот.",
    welcomeBody:
      "С момента посадки вашего самолёта мы продумываем каждую деталь. Шофёр встретит вас в зале прилёта, поможет с багажом и проводит к подготовленному автомобилю.",
    ourStandards: "Наши стандарты сервиса",
    concierge: "Поддержка консьержа",
    guestsWelcomed: "Встреченных гостей",
    guestRating: "Средняя оценка гостей",
    privateTransfers: "Частные трансферы",
    fleetEyebrow: "Наш автопарк",
    fleetTitle: "Ваше личное пространство,<br />безупречное в деталях.",
    fleetIntro:
      "Путешествуйте в тишине и комфорте: достаточно места для семьи, багажа и оборудования для гольфа.",
    fleetVclassClass: "Business · First Class",
    fleetVclassDescription:
      "Эталон комфортных групповых поездок: просторный, исключительно тихий салон и всё необходимое для беззаботного прибытия.",
    fleetVitoClass: "VIP · Grand Touring",
    fleetVitoDescription:
      "Просторный частный салон для больших семей, групп игроков в гольф и гостей с объёмным багажом.",
    signatureFleet: "Фирменный автопарк",
    passengers: "пассажиров",
    suitcases: "чемоданов",
    luggageLabel: "Крупный багаж",
    capacitySwitchedSprinter:
      "Пассажиры и багаж превышают вместимость Vito — выбран Mercedes Sprinter.",
    capacityNoVehicle:
      "Столько пассажиров и багажа превышает вместимость наших автомобилей. Напишите нам в WhatsApp.",
    leatherSeats: "Премиальные кожаные сиденья",
    wifi: "Бесплатный WiFi",
    water: "Охлаждённая вода",
    childSeats: "Детские кресла по запросу",
    television: "Телевизор в автомобиле",
    coldDrinks: "Холодные напитки",
    snacks: "Закуски",
    nameSignGreeting: "Личная встреча в зале прилёта",
    reserveVehicle: "Забронировать автомобиль",
    insideVclass: "Салон Sprinter",
    interiorTitle: "Персональный лаунж<br />между аэропортом и отелем.",
    serviceEyebrow: "Стандарт Antalya VIP",
    serviceTitle: "Больше, чем трансфер.<br />Продуманная встреча.",
    serviceIntro:
      "Внимание уровня пятизвёздочного отеля, опытные местные шофёры и спокойствие от аэропорта до курорта.",
    trackingTitle: "Отслеживание рейса",
    trackingBody:
      "Мы отслеживаем ваш рейс в реальном времени и автоматически корректируем время встречи без доплаты.",
    chauffeurTitle: "Профессиональные шофёры",
    chauffeurBody:
      "Безупречный внешний вид, деликатность, знание региона и высокие стандарты обслуживания.",
    greetTitle: "Встреча в аэропорту",
    greetBody:
      "Шофёр встретит вас в зале прилёта и поможет с багажом.",
    supportTitle: "Консьерж 24/7",
    supportBody:
      "До, во время и после поездки вам всегда ответит человек по телефону или в WhatsApp.",
    priceTitle: "Фиксированные цены",
    priceBody:
      "Подтверждённая цена является окончательной. Ожидание, парковка и задержка рейса уже включены.",
    familyTitle: "Для всей семьи",
    familyBody:
      "Детские кресла по возрасту, просторный салон и внимательная помощь для спокойного семейного приезда.",
    routesEyebrow: "Самые популярные поездки",
    routesTitle: "Из аэропорта Антальи<br />на Турецкую Ривьеру.",
    routesIntro:
      "Все цены указаны за автомобиль, а не за пассажира. Бесплатное ожидание включено.",
    golfFavourite: "Выбор игроков в гольф",
    from: "От",
    reviewsEyebrow: "Отзывы гостей",
    reviewsTitle: "Сервис, который помнят<br />после прибытия.",
    googleReviews: "На основе 387 подтверждённых отзывов Google",
    reviewOne:
      "«Несмотря на задержку рейса на 90 минут, водитель ждал нас. Автомобиль был безупречно чистым и прохладным, а оба детских кресла уже были установлены. Именно такая встреча была нужна нашей семье».",
    reviewTwo:
      "«От первого сообщения в WhatsApp до прибытия в Белек всё было на высшем уровне. Пунктуально, деликатно и очень профессионально. Наши сумки для гольфа легко поместились».",
    reviewThree:
      "«Это было похоже на трансфер от пятизвёздочного отеля, а не на такси из аэропорта. Чёткая связь, безупречный автомобиль и по-настоящему вежливый водитель».",
    trustedBy: "Нам доверяют гости ведущих курортов Антальи",
    faqEyebrow: "Частые вопросы",
    faqTitle: "Перед поездкой.",
    faqCatArrival: "Встреча и трансфер",
    faqCatPayment: "Оплата и цена",
    faqCatVehicle: "Автомобиль и багаж",
    faqReminder: "Перед поездкой ознакомьтесь с разделом вопросов и ответов на нашем сайте.",
    viewFaq: "Открыть FAQ",
    faqIntro: "Всё, что нужно знать о частном трансфере из аэропорта Антальи.",
    askQuestion: "Задать вопрос",
    faqOneQ: "Что произойдёт, если мой рейс задержится?",
    faqOneA:
      "От вас ничего не требуется. Мы отслеживаем ваш рейс в режиме реального времени и автоматически корректируем время подачи автомобиля. Задержки по вине авиакомпании никогда не оплачиваются дополнительно — водитель встретит вас в любое время прилёта, а первые 90 минут после посадки всегда включены в стоимость.",
    faqTwoQ: "Я прилетаю международным рейсом. Как проходит встреча?",
    faqTwoA:
      "После паспортного контроля и получения багажа следуйте вместе с другими пассажирами в зону встречи Meet & Greet и подойдите к нашей стойке J / 777. Просто назовите сотруднику своё имя — этого достаточно. Наша команда сразу сообщает водителю; он въезжает на территорию аэропорта и подаёт машину к месту посадки, а сотрудник в это время провожает вас к автомобилю. Вся процедура занимает около 7–8 минут.",
    faqSixQ: "Я прилетаю внутренним рейсом. Где найти водителя?",
    faqSixA:
      "Зона встречи Meet & Greet работает только для международных рейсов, поэтому гостей внутренних рейсов мы сопровождаем иначе: перед трансфером мы присылаем вам номер телефона водителя. После посадки просто сообщите ему об этом — он встретит вас в зале прилёта.",
    faqSevenQ: "Что делать, если у стойки J / 777 никого нет?",
    faqSevenA:
      "На стойке постоянно дежурят два наших сотрудника, и их единственная задача — проводить прибывающих гостей к автомобилю. Если стойка на минуту пуста, значит коллега сопровождает гостя, прилетевшего прямо перед вами: каждое сопровождение занимает около 7–8 минут. Пожалуйста, подождите примерно 10 минут. Если за это время никто не вернулся, напишите нам в WhatsApp: мы немедленно свяжемся с водителем, он подъедет к ближайшей точке, и мы проводим вас прямо к машине без дальнейшего ожидания.",
    faqEightQ:
      "Что будет, если мне понадобится больше 90 минут, чтобы выйти из аэропорта?",
    faqEightA:
      "Первые 90 минут после посадки включены в стоимость — этого с запасом хватает на паспортный контроль, багаж и таможню, а при задержке рейса отсчёт сдвигается автоматически. Только если вы задержитесь в терминале дольше по причинам, не связанным с рейсом, добавляется парковочный сбор 5 € за каждый дополнительный час. На практике это почти не случается: подавляющее большинство гостей выезжает задолго до этого.",
    faqNineQ: "Как проходит оплата?",
    faqNineA:
      "Вы оплачиваете поездку водителю наличными в начале трансфера — карты не принимаются. Цены установлены в евро (EUR): фиксированная сумма в точности соответствует той, что вы видели при бронировании, — за автомобиль, со всеми аэропортовыми и парковочными сборами, без доплат впоследствии. Хотите оплатить в долларах США или турецких лирах? Напишите нам заранее в WhatsApp, чтобы получить отдельную цену, так как курс отличается. Водитель встречает вас, загружает багаж и устанавливает заказанные детские кресла; после оплаты начинается ваша поездка.",
    faqTenQ: "Как поддерживать связь при обратном трансфере?",
    faqTenA:
      "После того как вы подтвердите дату и время обратной поездки нашей команде в WhatsApp, мы за несколько часов до трансфера назначаем автомобиль и присылаем вам его фотографии в WhatsApp — при желании также номер телефона водителя. Когда водитель приезжает в отель, он сообщает на стойку регистрации, а та передаёт в ваш номер, что машина подана. Наши водители никогда не звонят гостям напрямую: всё общение идёт через единую линию поддержки в WhatsApp, поэтому вы всегда точно знаете, с кем разговариваете.",
    faqThreeQ: "Есть ли детские кресла?",
    faqThreeA:
      "Да. Автолюльки, детские кресла и бустеры предоставляются бесплатно по запросу при бронировании.",
    faqFourQ: "Можно ли взять сумки для гольфа и крупный багаж?",
    faqFourA:
      "Да. Sprinter и Vito идеально подходят для групп игроков в гольф. Сообщите объём багажа, и мы подберём автомобиль.",
    faqFiveQ: "Указанная цена окончательная?",
    faqFiveA:
      "Да. Цена, которую вы видите при бронировании, — это сумма, которую вы передаёте водителю наличными: за автомобиль, включая все аэропортовые сборы, парковку и первые 90 минут ожидания. Скрытых платежей нет.",
    contactEyebrow: "Ваше путешествие начинается здесь",
    contactTitle: "Прибудьте в Анталью<br />исключительно комфортно.",
    contactBody:
      "Забронируйте онлайн менее чем за две минуты или свяжитесь с нашей службой консьержа 24/7.",
    whatsappUs: "Написать в WhatsApp",
    replyMinutes: "Обычно отвечаем за несколько минут",
    callUs: "Позвонить 24/7",
    emailUs: "Написать консьержу",
    replyHour: "Ответ в течение часа",
    fromAirport: "Из аэропорта Антальи",
    perVehicle: "за автомобиль · фиксированная цена",
    footerTagline: "Частные услуги шофёра по всей Турецкой Ривьере.",
    explore: "Разделы",
    information: "Информация",
    licensed:
      "Лицензированный оператор частных трансферов · Соответствует требованиям TÜRSAB",
    quoteReady: "Ваш частный трансфер",
    vehicle: "Автомобиль",
    journeyTime: "Время в пути",
    totalFixed: "Итоговая цена",
    quoteIncludes:
      "Включены встреча, отслеживание рейса, парковка, 90 минут ожидания и питьевая вода.",
    confirmWhatsapp: "Подтвердить в WhatsApp",
    chatWithUs: "Написать нам",
    bookNowCta: "Забронировать",
    backToQuote: "Назад",
    yourDetails: "Ваши данные",
    fullName: "Имя и фамилия",
    emailLabel: "Эл. почта",
    phoneLabel: "Телефон / WhatsApp",
    flightNumber: "Номер рейса",
    flightArrivalTime: "Время прилёта",
    notesLabel: "Особые пожелания",
    confirmBooking: "Подтвердить бронирование",
    bookingConfirmed: "Бронирование подтверждено",
    referenceLabel: "Референс",
    weWillContact:
      "Ваш запрос на бронирование отправлен. Мы свяжемся с вами в течение 30 минут.",
    paymentError: "Оплата не прошла. Попробуйте ещё раз.",
  },
  cs: {
    navFleet: "Vozový park",
    navService: "Služby",
    navRoutes: "Trasy",
    navReviews: "Recenze",
    navContact: "Kontakt",
    bookNow: "Rezervovat",
    alwaysAvailable: "Dostupní 24 hodin denně",
    heroEyebrow: "Soukromá šoférská služba · Antalya",
    campaignBadge: "Online akce",
    campaignDiscount: "Speciální cena",
    campaignScope: "ze všech cen transferů",
    heroTitle: "Prémiové letištní<br />transfery v Antalyi",
    heroSubtitle:
      "Soukromé transfery se šoférem z letiště Antalya do Beleku, Side, Kemeru a Alanye.",
    bookTransfer: "Rezervovat transfer",
    instantQuote: "Okamžitá nabídka",
    googleRated: "Hodnocení Google",
    trustedGuests: "Důvěryhodné u 2 500+ hostů",
    discover: "Objevit",
    tbLicensed: "Licence TÜRSAB",
    tbFlightTracking: "Sledování letů",
    tbFixedPrice: "Pevné ceny",
    tb247Concierge: "Recepce 24/7",
    tbChildSeats: "Dětské sedačky v ceně",
    privateJourney: "Váš soukromý výlet",
    tripType: "Typ cesty",
    oneWay: "Jednosměrně",
    roundTrip: "Tam a zpět",
    roundTripHint:
      "U zpáteční cesty následuje zpáteční trasa stejnou cestou v opačném směru.",
    pickup: "Místo vyzvednutí",
    airportOption: "Letiště Antalya (AYT)",
    hotelOption: "Hotel",
    privateAddressOption: "Soukromá adresa",
    destination: "Cíl",
    selectDestination: "Vyberte cíl",
    vehicle: "Vozidlo",
    guests: "Hosté",
    arrivalDate: "Datum příjezdu",
    arrivalFlightTime: "Čas příjezdu letu",
    chooseTime: "Vyberte čas",
    arrivalFlightNumber: "Číslo příletového letu",
    returnDate: "Datum návratu",
    returnPickupTime: "Čas vyzvednutí při návratu",
    returnFlightNumber: "Číslo zpátečního letu",
    pickupAddress: "Úplná adresa vyzvednutí",
    dropoffAddress: "Úplná adresa vysazení",
    luggageLabel: "Velká zavazadla",
    hotelNameLabel: "Název hotelu",
    childSeatLabel: "Dětské sedačky",
    childSeatNone: "Bez dětské sedačky",
    oneChildSeat: "1 dětská sedačka",
    twoChildSeats: "2 dětské sedačky",
    threeChildSeats: "3 dětské sedačky",
    fourChildSeats: "4 dětské sedačky",
    fullName: "Celé jméno",
    phoneLabel: "Telefon / WhatsApp",
    emailLabel: "E-mail",
    paymentMethod: "Zvolte způsob platby",
    cashPayment: "Platba ve vozidle",
    recommended: "Doporučeno",
    cashPaymentDescription:
      "Žádná platba online předem. Pevnou částku předáte řidiči v hotovosti na začátku jízdy.",
    quoteIncludes:
      "Zahrnuje přivítání, sledování letu, parkování, 90 minut čekání a balenou vodu.",
    confirmCashBooking: "Potvrdit rezervaci — platba ve vozidle",
    flightTracking: "Sledování letů v reálném čase",
    fixedPrice: "Garance pevné ceny",
    meetGreet: "Osobní uvítání",
    speakingDrivers: "Anglicky a německy mluvící",
    fromAirport: "Z letiště Antalya",
    campaignApplied: "Byla použita speciální online cena",
    welcomeEyebrow: "Vítejte na lepším příjezdu",
    welcomeTitle: "Cestujte krásně.<br />Přijíždějte bez starostí.",
    welcomeBody:
      "Od okamžiku přistání letadla je každý detail promyšlen. Váš šofér čeká uvnitř příletové haly, postará se o zavazadla a doprovodí vás k pečlivě připravenému soukromému vozidlu.",
    ourStandards: "Naše standardy služeb",
    concierge: "Podpora recepce",
    guestsWelcomed: "Přivítaných hostů",
    guestRating: "Průměrné hodnocení hostů",
    privateTransfers: "Soukromé transfery",
    fleetEyebrow: "Vozový park",
    fleetTitle: "Váš soukromý prostor,<br />vyladěný do každého detailu.",
    fleetIntro:
      "Cestujte v tiché pohodlí s dostatkem místa pro rodinu, golfové vybavení a zavazadla.",
    signatureFleet: "Prémiový vozový park",
    fleetVclassClass: "Business · První třída",
    fleetVclassDescription:
      "Prostorný VIP transport pro větší skupiny s dostatkem místa pro cestující i zavazadla.",
    passengers: "cestujících",
    suitcases: "kufrů",
    television: "TV ve vozidle",
    coldDrinks: "Studené nápoje",
    snacks: "Občerstvení",
    childSeats: "Dětská sedačka k dispozici",
    wifi: "Bezplatné WiFi",
    nameSignGreeting: "Osobní uvítání při příletu",
    reserveVehicle: "Rezervovat vozidlo",
    insideVclass: "Interiér Sprinteru",
    interiorTitle: "Soukromý salon mezi<br />letištěm a vaším hotelem.",
    serviceEyebrow: "Standard Antalya VIP",
    serviceTitle: "Víc než transfer.<br />Uvítání s péčí.",
    serviceIntro:
      "Pozornost na úrovni hotelu, zkušení místní šoféři a naprostý klid od vzletu až po resort.",
    trackingTitle: "Sledování letů",
    trackingBody:
      "Monitorujeme váš let v reálném čase a automaticky upravujeme čas vyzvednutí, bez příplatku.",
    chauffeurTitle: "Profesionální šoféři",
    chauffeurBody:
      "Bezchybně upravení, diskrétní a vybíraní pro místní znalosti a standardy služeb.",
    greetTitle: "Uvítání",
    greetBody:
      "Váš šofér vás přivítá v příletové hale a pomůže se zavazadly.",
    supportTitle: "Recepce 24/7",
    supportBody:
      "Skutečná osoba je vždy dostupná telefonicky nebo přes WhatsApp před, během a po cestě.",
    priceTitle: "Pevné ceny",
    priceBody:
      "Potvrzená cena je cena, kterou zaplatíte. Čekání, parkování a zpoždění letu jsou zahrnuty.",
    familyTitle: "Přátelské pro rodiny",
    familyBody:
      "Věkově vhodné dětské sedačky, prostorné kabiny a trpělivá pomoc pro klidný rodinný příjezd.",
    routesEyebrow: "Nejžádanější trasy",
    routesTitle: "Z letiště Antalya<br />na tureckou riviéru.",
    routesIntro:
      "Všechny ceny jsou za vozidlo, nikdy za cestujícího, se zahrnutým čekáním zdarma.",
    discountPricesShown: "Zobrazeny online speciální ceny",
    golfFavourite: "Oblíbené pro golf",
    onlineDiscountShort: "Online speciál",
    reviewsEyebrow: "Recenze hostů",
    reviewsTitle: "Služba, na kterou se<br />nezapomíná ani po příjezdu.",
    googleReviews: "Na základě 387 ověřených recenzí Google",
    trustedBy: "Oblíbené u hostů předních antalyských resortů",
    faqEyebrow: "Často kladené dotazy",
    faqTitle: "Před vaší cestou.",
    faqCatArrival: "Vyzvednutí a transfer",
    faqCatPayment: "Platba a cena",
    faqCatVehicle: "Vozidlo a zavazadla",
    faqReminder: "Před cestou si prosím přečtěte sekci častých dotazů na našem webu.",
    viewFaq: "Zobrazit FAQ",
    faqIntro:
      "Vše, co potřebujete vědět o svém soukromém transferu z letiště Antalya.",
    askQuestion: "Zeptejte se nás",
    faqOneQ: "Co se stane, když má můj let zpoždění?",
    faqOneA:
      "Nemusíte dělat vůbec nic. Váš let sledujeme v reálném čase a čas vyzvednutí upravíme automaticky. Zpoždění způsobená leteckou společností nikdy neúčtujeme – řidič na vás počká, ať přistanete kdykoli, a prvních 90 minut po přistání je vždy v ceně.",
    faqTwoQ: "Přilétám mezinárodním letem. Jak vyzvednutí probíhá?",
    faqTwoA:
      "Po pasové kontrole a výdeji zavazadel se vydejte s ostatními cestujícími do zóny Meet & Greet a přijďte k naší přepážce J / 777. Stačí říct našemu pracovníkovi své jméno. Náš tým okamžitě informuje řidiče; ten vjede na letiště a přistaví vůz na místo pro vyzvednutí, zatímco vás náš pracovník doprovodí k autu. Celý proces trvá přibližně 7–8 minut.",
    faqSixQ: "Přilétám vnitrostátním letem. Kde najdu svého řidiče?",
    faqSixA:
      "Zóna Meet & Greet slouží pouze mezinárodním příletům, proto se o hosty z vnitrostátních letů staráme jinak: před transferem vám pošleme telefonní číslo řidiče. Po přistání mu stačí dát vědět a vyzvedne vás v příletové hale.",
    faqSevenQ: "Co mám dělat, když u přepážky J / 777 nikdo není?",
    faqSevenA:
      "U přepážky trvale slouží dva naši pracovníci a jejich jediným úkolem je doprovodit přilétající hosty k vozu. Pokud je přepážka na chvíli prázdná, znamená to, že kolega právě doprovází hosta, který přiletěl těsně před vámi – každý doprovod trvá asi 7–8 minut. Počkejte prosím zhruba 10 minut. Pokud se do té doby nikdo nevrátí, napište nám na WhatsApp: okamžitě informujeme vašeho řidiče, necháme ho zastavit na nejbližším místě a dovedeme vás rovnou k vozu bez dalšího čekání.",
    faqEightQ: "Co když budu potřebovat na odchod z letiště více než 90 minut?",
    faqEightA:
      "Prvních 90 minut po přistání je zdarma v ceně – s rezervou více, než vyžaduje pasová kontrola, zavazadla a celní odbavení – a při zpoždění letu se tento interval automaticky posouvá. Pouze pokud vás v terminálu zdrží něco, co s letem nesouvisí, připočítáváme příspěvek na parkování 5 € za každou další hodinu. V praxi k tomu téměř nikdy nedojde: naprostá většina hostů je na cestě dávno předtím.",
    faqNineQ: "Jak probíhá platba?",
    faqNineA:
      "Řidiči platíte v hotovosti na začátku jízdy – karty nepřijímáme. Ceny jsou stanoveny v eurech (EUR): pevná částka přesně odpovídá té, kterou jste viděli při rezervaci – za vozidlo, včetně všech letištních a parkovacích poplatků, bez dodatečných položek. Chcete raději platit v amerických dolarech nebo tureckých lirách? Napište nám předem na WhatsApp pro samostatnou cenu, protože kurz se liší. Řidič vás přivítá, naloží zavazadla a připraví objednané dětské sedačky; po zaplacení vaše cesta začíná.",
    faqTenQ: "Jak zůstanu ve spojení při zpátečním transferu?",
    faqTenA:
      "Jakmile s naším týmem potvrdíte datum a čas zpáteční cesty přes WhatsApp, několik hodin před transferem přidělíme vozidlo a pošleme vám jeho fotografie na WhatsApp – na přání i telefonní číslo řidiče. Když řidič dorazí k hotelu, oznámí to recepci, která dá vědět na váš pokoj, že vůz je připraven. Naši řidiči hostům nikdy nevolají přímo: veškerá komunikace probíhá přes jedinou zákaznickou linku na WhatsAppu, takže vždy víte, s kým mluvíte.",
    faqThreeQ: "Jsou k dispozici dětské sedačky?",
    faqThreeA:
      "Ano. Sedačky pro kojence, batolata i posilovací sedačky jsou k dispozici zdarma při objednávce.",
    faqFourQ: "Přepravíte golfové tašky a velká zavazadla?",
    faqFourA:
      "Ano. Naše vozidla Sprinter a Vito jsou ideální pro golfové skupiny. Sdělte nám detaily o zavazadlech a přidělíme správné vozidlo.",
    faqFiveQ: "Je nabízená cena konečná?",
    faqFiveA:
      "Ano. Cena, kterou vidíte při rezervaci, je částka, kterou předáte řidiči v hotovosti – za vozidlo, včetně všech letištních poplatků, parkování a prvních 90 minut čekání. Žádné skryté poplatky.",
    contactEyebrow: "Vaše cesta začíná zde",
    contactTitle: "Přijeďte do Antalye<br />výjimečně dobře.",
    contactBody:
      "Rezervujte online za méně než dvě minuty nebo mluvte přímo s naším týmem recepce 24/7.",
    whatsappUs: "Napište nám na WhatsApp",
    replyMinutes: "Obvykle odpovídáme do několika minut",
    callUs: "Volejte nás 24/7",
    emailUs: "E-mail recepce",
    replyHour: "Odpovídáme do jedné hodiny",
    footerTagline: "Soukromé šoférské služby na turecké riviéře.",
    explore: "Prozkoumat",
    information: "Informace",
    licensed: "Licencovaný soukromý přepravce · v souladu s TÜRSAB",
    bookingConfirmed: "Rezervace potvrzena",
    referenceLabel: "Reference",
    weWillContact:
      "Vaše žádost o rezervaci byla odeslána. Kontaktujeme vás do 30 minut.",
    chatWithUs: "Napište nám",
    pickupAddressPlaceholder: "Název hotelu, ulice, číslo budovy a čtvrť",
    dropoffAddressPlaceholder: "Název hotelu, ulice, číslo budovy a čtvrť",
    hotelNamePlaceholder: "Název hotelu nebo ubytování",
    requestQuote: "Požádat o cenovou nabídku",
    cashConfirmation:
      "Vaše rezervace je potvrzena. Pevnou částku předáte řidiči v hotovosti na začátku jízdy.",
    bookingError:
      "Vaši rezervaci se nepodařilo dokončit. Zkuste to prosím znovu.",
    formIncomplete: "Prosím vyplňte zvýrazněná pole.",
    requiredField: "Toto pole je povinné.",
    destinationRequired: "Prosím vyberte cíl.",
    dateInvalid: "Prosím vyberte dnešní nebo budoucí datum.",
    emailInvalid: "Prosím zadejte platnou e-mailovou adresu.",
    nameInvalid: "Prosím zadejte platné celé jméno.",
    phoneInvalid:
      "Prosím zadejte platné číslo včetně předvolby země (například +420).",
    flightInvalid: "Prosím zadejte platné číslo letu.",
    pickupAddressRequired: "Adresa vyzvednutí musí mít 6 až 160 znaků.",
    dropoffAddressRequired: "Adresa vysazení musí mít 6 až 160 znaků.",
    addressesMustDiffer: "Adresy vyzvednutí a vysazení musí být různé.",
    customDestinationPrice: "Cena bude potvrzena po ověření adresy vysazení.",
    hotelNameRequired: "Prosím zadejte název hotelu.",
    roundTripPriceNote: "zpáteční · 2 cesty",
    returnDateRequired: "Prosím vyberte datum návratu.",
    returnDateInvalid: "Prosím vyberte datum návratu nejdříve v den odjezdu.",
    returnTimeRequired: "Prosím vyberte čas vyzvednutí při návratu.",
    dailyChauffeur: "Denní vozidlo + šofér",
    days: "dní",
    dailyChauffeurHint:
      "Pronajměte si soukromé vozidlo a šoféra na celý den bez limitu kilometrů nebo hodin. Pohonné hmoty se platí zvlášť.",
    serviceStartDate: "První den služby",
    serviceEndDate: "Poslední den služby",
    dailyPickupTime: "Čas začátku služby",
    dailyPickupTimeRequired: "Prosím vyberte denní čas začátku služby.",
    serviceEndDateRequired: "Prosím vyberte poslední den služby.",
    servicePeriodInvalid: "Prosím vyberte období od 1 do 30 dní.",
    arrivalFlightTimeOptional: "Čas příjezdu letu (nepovinné)",
    arrivalFlightNumberOptional: "Číslo příletového letu (nepovinné)",
    servicePrice: "Cena služby",
    fuelExcludedShort: "pohonné hmoty nezahrnuty",
    fuelExcludedDetail:
      "Pohonné hmoty nejsou zahrnuty a platí se zvlášť podle spotřeby.",
    departureFlightDate: "Datum odletového letu (nepovinné)",
    departureFlightTime: "Čas odletového letu",
    departureFlightNumber: "Číslo odletového letu",
    departureFlightDateRequired: "Prosím vyberte datum odletového letu.",
    departureFlightDateInvalid:
      "Datum odletového letu nesmí být dříve než začátek služby.",
    dailyQuoteIncludes:
      "Zahrnuje vybrané vozidlo a šoféra bez limitu kilometrů nebo hodin. Pohonné hmoty jsou vyloučeny.",
    reviewAndConfirm: "Přezkoumat a potvrdit",
    fuelTermsTitle: "Důležité informace o pohonných hmotách",
    fuelTermsBody:
      "Denní poplatek €150 za službu zahrnuje vozidlo a šoféra. Pohonné hmoty nejsou zahrnuty. Skutečné náklady na pohonné hmoty zaplatíte zvlášť podle spotřeby.",
    fuelTermsCheckbox:
      "Chápu, že pohonné hmoty jsou vyloučeny a budou placeny zvlášť podle spotřeby.",
    cancel: "Zrušit",
    close: "Zavřít",
    understandAndConfirm: "Chápu a potvrzuji",
    dailyCashConfirmation:
      "Váš denní pronájem šoféra je potvrzen. Cena služby nezahrnuje pohonné hmoty, které se platí zvlášť podle spotřeby.",
    stepRoute: "Trasa",
    stepDetails: "Podrobnosti",
    stepContact: "Kontakt",
    continue: "Pokračovat",
    back: "Zpět",
    reserveForPrice: "Rezervovat",
    perVehicleNoteVito: "Na vozidlo — ne na osobu · Až 6 cestujících",
    perVehicleNoteSprinter: "Na vozidlo — ne na osobu · Až 12 cestujících",
    perVehicle: "pevná cena · na vozidlo",
    capacitySwitchedSprinter:
      "Počet cestujících a zavazadel přesahuje kapacitu Vito — přepnuto na Mercedes Sprinter.",
  },

  pl: {
    navFleet: "Pojazdy",
    navService: "Usługi",
    navRoutes: "Trasy",
    navReviews: "Opinie",
    navContact: "Kontakt",
    bookNow: "Zarezerwuj",
    alwaysAvailable: "Do Twojej dyspozycji 24 godziny na dobę",
    heroEyebrow: "Prywatny serwis szoferski · Antalya",
    heroTitle: "Transfery lotniskowe premium<br />w Antalyi",
    heroSubtitle:
      "Prywatne transfery z szoferem z lotniska Antalya do Belek, Side, Kemer i Alanyi.",
    bookTransfer: "Zarezerwuj transfer",
    instantQuote: "Sprawdź cenę",
    googleRated: "Ocena Google",
    trustedGuests: "Zaufało nam ponad 2 500 gości",
    discover: "Odkryj",
    privateJourney: "Twoja prywatna podróż",
    quoteTitle: "Dokąd Cię zawieziemy?",
    pickup: "Miejsce odbioru",
    destination: "Cel podróży",
    date: "Data",
    guests: "Goście",
    airportOption: "Lotnisko Antalya (AYT)",
    hotelOption: "Hotel",
    privateAddressOption: "Adres prywatny",
    pickupAddress: "Pełny adres odbioru",
    pickupAddressPlaceholder: "Nazwa hotelu, ulica, numer budynku i dzielnica",
    dropoffAddress: "Pełny adres docelowy",
    dropoffAddressPlaceholder: "Nazwa hotelu, ulica, numer budynku i dzielnica",
    selectDestination: "Wybierz cel",
    airportReturnPrice:
      "Cena zostanie potwierdzona po sprawdzeniu hotelu lub adresu odbioru.",
    oneGuest: "1 gość",
    twoGuests: "2 gości",
    threeGuests: "3 gości",
    fourGuests: "4 gości",
    fiveGuests: "5 gości",
    sixGuests: "6 gości",
    sevenGuests: "7 gości",
    viewQuote: "Pokaż cenę",
    flightTracking: "Śledzenie lotu w czasie rzeczywistym",
    fixedPrice: "Gwarantowana stała cena",
    meetGreet: "Osobiste powitanie",
    speakingDrivers: "Kierowcy mówiący po angielsku i niemiecku",
    tbLicensed: "Licencja TÜRSAB",
    tbFlightTracking: "Śledzenie lotu",
    tbFixedPrice: "Stała cena",
    tb247Concierge: "Concierge 24/7",
    tbChildSeats: "Foteliki w cenie",
    welcomeEyebrow: "Witamy na najwyższym poziomie",
    welcomeTitle: "Podróżuj z klasą.<br />Przyjeżdżaj spokojnie.",
    welcomeBody:
      "Od chwili lądowania każdy szczegół jest dopracowany. Szofer czeka w hali przylotów, zajmuje się bagażem i odprowadza Cię do starannie przygotowanego pojazdu.",
    ourStandards: "Nasze standardy usług",
    concierge: "Usługi concierge",
    guestsWelcomed: "Powitanych gości",
    guestRating: "Średnia ocena gości",
    privateTransfers: "Prywatne transfery",
    fleetEyebrow: "Nasza flota",
    fleetTitle: "Twoja prywatna przestrzeń,<br />doskonała w każdym detalu.",
    fleetIntro:
      "Podróżuj komfortowo z obszernym miejscem dla rodziny, sprzętu golfowego i walizek.",
    fleetVclassClass: "Business · First Class",
    fleetVclassDescription:
      "Wzorzec eleganckiej podróży grupowej: przestronny, wyjątkowo cichy i wyposażony dla bezproblemowego przybycia.",
    fleetVitoClass: "VIP · Grand Touring",
    fleetVitoDescription:
      "Obszerna prywatna kabina dla większych rodzin, grup golfowych i gości z obfitym bagażem.",
    signatureFleet: "Flota Signature",
    passengers: "pasażerów",
    suitcases: "walizek",
    luggageLabel: "Duży bagaż",
    capacitySwitchedSprinter:
      "Pasażerowie i bagaż przekraczają Vito — przełączono na Mercedes Sprinter.",
    capacityNoVehicle:
      "Tylu pasażerów i bagażu przekracza nasze pojazdy. Skontaktuj się z nami na WhatsApp.",
    leatherSeats: "Skórzane fotele premium",
    wifi: "Bezpłatne WiFi",
    water: "Schłodzona woda mineralna",
    childSeats: "Foteliki dziecięce na życzenie",
    television: "Telewizor w pojeździe",
    coldDrinks: "Zimne napoje",
    snacks: "Przekąski",
    nameSignGreeting: "Osobiste powitanie po przylocie",
    reserveVehicle: "Zarezerwuj pojazd",
    insideVclass: "Wnętrze Sprinter",
    interiorTitle: "Prywatny salon<br />między lotniskiem a hotelem.",
    serviceEyebrow: "Standard Antalya VIP",
    serviceTitle: "Więcej niż transfer.<br />Wyjątkowe powitanie.",
    serviceIntro:
      "Uwaga na poziomie pięciogwiazdkowego hotelu, doświadczeni lokalni szoferzy i pełen spokój od lotniska po resort.",
    trackingTitle: "Śledzenie lotu",
    trackingBody:
      "Śledzimy Twój lot w czasie rzeczywistym i automatycznie dostosowujemy godzinę odbioru bez dodatkowych opłat.",
    chauffeurTitle: "Profesjonalni szoferzy",
    chauffeurBody:
      "Zawsze zadbani, dyskretni, wybrani za znajomość terenu i najwyższe standardy obsługi.",
    greetTitle: "Meet & Greet",
    greetBody:
      "Szofer wita Cię w hali przylotów i pomaga z bagażem.",
    supportTitle: "Concierge 24/7",
    supportBody:
      "Przed, w trakcie i po podróży zawsze możesz skontaktować się z nami telefonicznie lub przez WhatsApp.",
    priceTitle: "Stałe ceny",
    priceBody:
      "Potwierdzona cena jest ceną ostateczną. Czas oczekiwania, parking i opóźnienia lotów są wliczone.",
    familyTitle: "Dla rodzin",
    familyBody:
      "Odpowiednie foteliki dziecięce, obszerne kabiny i cierpliwa pomoc dla spokojnego przybycia z rodziną.",
    routesEyebrow: "Nasze najpopularniejsze trasy",
    routesTitle: "Z lotniska Antalya<br />na Turecką Riwierę.",
    routesIntro:
      "Wszystkie ceny dotyczą pojazdu, nie osoby. Bezpłatny czas oczekiwania jest wliczony.",
    golfFavourite: "Ulubieniec golfistów",
    from: "Od",
    reviewsEyebrow: "Opinie gości",
    reviewsTitle: "Usługa, która<br />zostaje w pamięci.",
    googleReviews: "Na podstawie 387 zweryfikowanych opinii Google",
    reviewOne:
      "„Nasz kierowca czekał mimo 90-minutowego opóźnienia. Pojazd był nieskazitelny, przyjemnie chłodny i wyposażony już w oba foteliki. Dokładnie takie powitanie potrzebowała nasza rodzina.”",
    reviewTwo:
      "„Od pierwszego kontaktu WhatsApp po przyjazd do Belek wszystko było absolutnie pierwszorzędne. Punktualnie, dyskretnie i bardzo profesjonalnie. Torby golfowe bez problemu się zmieściły.”",
    reviewThree:
      "„To było jak serwis szoferski hotelu, a nie taksówka na lotnisku. Jasna komunikacja, nieskazitelny pojazd i naprawdę uprzejmy kierowca.”",
    trustedBy: "Wybór gości czołowych resortów w Antalyi",
    faqEyebrow: "Często zadawane pytania",
    faqTitle: "Przed Twoją podróżą.",
    faqCatArrival: "Odbiór i transfer",
    faqCatPayment: "Płatność i cena",
    faqCatVehicle: "Pojazd i bagaż",
    faqReminder: "Przed podróżą zapoznaj się z sekcją FAQ na naszej stronie.",
    viewFaq: "Zobacz FAQ",
    faqIntro:
      "Wszystko, co musisz wiedzieć o prywatnym transferze z lotniska w Antalyi.",
    askQuestion: "Zadaj pytanie",
    faqOneQ: "Co się stanie, jeśli mój lot się opóźni?",
    faqOneA:
      "Nie musisz nic robić. Śledzimy Twój lot na bieżąco i automatycznie dostosowujemy godzinę odbioru. Za opóźnienia linii lotniczych nigdy nie pobieramy dopłat – kierowca czeka bez względu na godzinę lądowania, a pierwsze 90 minut po wylądowaniu zawsze jest wliczone w cenę.",
    faqTwoQ: "Przylatuję lotem międzynarodowym. Jak wygląda odbiór?",
    faqTwoA:
      "Po kontroli paszportowej i odbiorze bagażu udaj się razem z innymi pasażerami do strefy Meet & Greet i podejdź do naszego stanowiska J / 777. Wystarczy podać naszemu pracownikowi swoje nazwisko. Nasz zespół natychmiast powiadamia kierowcę; wjeżdża on na teren lotniska i podjeżdża w miejsce odbioru, a nasz pracownik odprowadza Cię do samochodu. Cały proces trwa około 7–8 minut.",
    faqSixQ: "Przylatuję lotem krajowym. Gdzie znajdę kierowcę?",
    faqSixA:
      "Strefa Meet & Greet obsługuje wyłącznie przyloty międzynarodowe, dlatego gośćmi lotów krajowych zajmujemy się inaczej: przed transferem wysyłamy Ci numer telefonu kierowcy. Po wylądowaniu wystarczy dać mu znać – odbierze Cię w hali przylotów.",
    faqSevenQ: "Co zrobić, jeśli przy stanowisku J / 777 nikogo nie ma?",
    faqSevenA:
      "Przy stanowisku stale dyżurują dwie osoby z naszego zespołu, a ich jedynym zadaniem jest odprowadzanie przybywających gości do samochodów. Jeśli zastaniesz stanowisko na moment puste, oznacza to, że kolega odprowadza właśnie gościa, który przyleciał tuż przed Tobą – każde odprowadzenie trwa około 7–8 minut. Poczekaj proszę około 10 minut. Jeśli w tym czasie nikt nie wróci, napisz do nas na WhatsAppie: natychmiast powiadomimy kierowcę, poprosimy go o podjechanie w najbliższe miejsce i zaprowadzimy Cię prosto do auta bez dalszego czekania.",
    faqEightQ: "Co, jeśli wyjście z lotniska zajmie mi więcej niż 90 minut?",
    faqEightA:
      "Pierwsze 90 minut po wylądowaniu jest wliczone w cenę – z zapasem wystarcza na kontrolę paszportową, bagaż i odprawę celną – a przy opóźnieniu lotu okno to przesuwa się automatycznie. Dopiero jeśli coś niezwiązanego z lotem zatrzyma Cię w terminalu dłużej, doliczamy 5 € dopłaty parkingowej za każdą kolejną godzinę. W praktyce zdarza się to niezwykle rzadko: niemal wszyscy nasi goście są w drodze na długo przed upływem tego czasu.",
    faqNineQ: "Jak wygląda płatność?",
    faqNineA:
      "Płacisz kierowcy gotówką na początku podróży – nie przyjmujemy kart. Ceny są ustalane w euro (EUR): stała kwota jest dokładnie taka, jaką widziałeś przy rezerwacji – za pojazd, ze wszystkimi opłatami lotniskowymi i parkingowymi, bez późniejszych dopłat. Wolisz zapłacić w dolarach amerykańskich lub lirach tureckich? Napisz do nas wcześniej na WhatsAppie po osobną wycenę, ponieważ kurs się różni. Kierowca wita Cię, ładuje bagaże i montuje zamówione foteliki dziecięce; po uregulowaniu płatności rozpoczyna się podróż.",
    faqTenQ: "Jak utrzymać kontakt przy transferze powrotnym?",
    faqTenA:
      "Gdy potwierdzisz naszemu zespołowi datę i godzinę powrotu przez WhatsApp, na kilka godzin przed transferem przydzielamy pojazd i wysyłamy Ci jego zdjęcia na WhatsAppie – a jeśli chcesz, także numer telefonu kierowcy. Gdy kierowca dotrze do hotelu, informuje recepcję, która przekazuje do Twojego pokoju, że samochód czeka. Nasi kierowcy nigdy nie dzwonią do gości bezpośrednio: cała komunikacja przechodzi przez jedną linię wsparcia na WhatsAppie, więc zawsze wiesz dokładnie, z kim rozmawiasz.",
    faqThreeQ: "Czy dostępne są foteliki dziecięce?",
    faqThreeA:
      "Tak. Nosidełka, foteliki i podkładki są dostępne bezpłatnie przy wcześniejszej rezerwacji.",
    faqFourQ: "Czy można przewieźć torby golfowe i duży bagaż?",
    faqFourA:
      "Tak. Sprinter i Vito są idealne dla grup golfowych. Podaj informacje o bagażu, a zaplanujemy odpowiedni pojazd.",
    faqFiveQ: "Czy podana cena jest ostateczna?",
    faqFiveA:
      "Tak. Cena, którą widzisz przy rezerwacji, to kwota, którą przekazujesz kierowcy gotówką – za pojazd, ze wszystkimi opłatami lotniskowymi, parkingiem i pierwszymi 90 minutami oczekiwania. Nie ma żadnych ukrytych opłat.",
    contactEyebrow: "Twoja podróż zaczyna się tutaj",
    contactTitle: "Przybądź do Antalyi<br />wyjątkowo komfortowo.",
    contactBody:
      "Zarezerwuj online w mniej niż dwie minuty lub skontaktuj się bezpośrednio z naszym concierge 24/7.",
    whatsappUs: "WhatsApp",
    replyMinutes: "Odpowiedź zwykle w kilka minut",
    callUs: "Zadzwoń 24/7",
    emailUs: "E-mail do concierge",
    replyHour: "Odpowiedź w ciągu godziny",
    fromAirport: "Z lotniska Antalya",
    perVehicle: "za pojazd · stała cena",
    footerTagline: "Prywatne usługi szoferskie na całej Tureckiej Riwierze.",
    explore: "Odkryj",
    information: "Informacje",
    licensed: "Licencjonowany prywatny przewoźnik · Zgodny z TÜRSAB",
    quoteReady: "Twój prywatny transfer",
    vehicle: "Pojazd",
    journeyTime: "Czas podróży",
    totalFixed: "Cena łączna",
    quoteIncludes:
      "Obejmuje powitanie, śledzenie lotu, parking, 90 minut oczekiwania i wodę butelkowaną.",
    confirmWhatsapp: "Potwierdź przez WhatsApp",
    chatWithUs: "Napisz do nas",
    bookNowCta: "Zarezerwuj",
    backToQuote: "Wstecz",
    yourDetails: "Twoje dane",
    fullName: "Imię i nazwisko",
    emailLabel: "E-mail",
    phoneLabel: "Telefon / WhatsApp",
    flightNumber: "Numer lotu",
    flightArrivalTime: "Godzina przylotu",
    notesLabel: "Specjalne życzenia",
    confirmBooking: "Potwierdź rezerwację",
    bookingConfirmed: "Rezerwacja potwierdzona",
    referenceLabel: "Numer referencyjny",
    weWillContact:
      "Twoje zgłoszenie rezerwacji zostało wysłane. Skontaktujemy się w ciągu 30 minut.",
    paymentError: "Płatność nie powiodła się. Spróbuj ponownie.",
  },
  nl: {
    navFleet: "Voertuigen",
    navService: "Service",
    navRoutes: "Routes",
    navReviews: "Reviews",
    navContact: "Contact",
    bookNow: "Nu boeken",
    alwaysAvailable: "24 uur per dag, elke dag bereikbaar",
    heroEyebrow: "Privé chauffeurservice · Antalya",
    heroTitle: "Premium luchthavenstransfers<br />in Antalya",
    heroSubtitle:
      "Privé transfers met chauffeur van Antalya Luchthaven naar Belek, Side, Kemer en Alanya.",
    bookTransfer: "Transfer boeken",
    instantQuote: "Direct prijs ontvangen",
    googleRated: "Google-beoordeling",
    trustedGuests: "Vertrouwd door meer dan 2.500 gasten",
    discover: "Ontdekken",
    privateJourney: "Uw privéreis",
    quoteTitle: "Waar mogen wij u naartoe brengen?",
    pickup: "Ophaallocatie",
    destination: "Bestemming",
    date: "Datum",
    guests: "Gasten",
    airportOption: "Luchthaven Antalya (AYT)",
    hotelOption: "Hotel",
    privateAddressOption: "Privéadres",
    pickupAddress: "Volledig ophaaladres",
    pickupAddressPlaceholder: "Hotelnaam, straat, huisnummer en wijk",
    dropoffAddress: "Volledig bestemmingsadres",
    dropoffAddressPlaceholder: "Hotelnaam, straat, huisnummer en wijk",
    selectDestination: "Kies bestemming",
    airportReturnPrice:
      "De prijs wordt bevestigd nadat het hotel of ophaaladres is gecontroleerd.",
    oneGuest: "1 gast",
    twoGuests: "2 gasten",
    threeGuests: "3 gasten",
    fourGuests: "4 gasten",
    fiveGuests: "5 gasten",
    sixGuests: "6 gasten",
    sevenGuests: "7 gasten",
    viewQuote: "Prijs bekijken",
    flightTracking: "Realtime vluchtvolgend",
    fixedPrice: "Gegarandeerde vaste prijs",
    meetGreet: "Persoonlijk welkom",
    speakingDrivers: "Chauffeurs die Engels en Duits spreken",
    tbLicensed: "TÜRSAB Erkend",
    tbFlightTracking: "Vluchttracking",
    tbFixedPrice: "Vaste prijs",
    tb247Concierge: "Concierge 24/7",
    tbChildSeats: "Kinderzitjes inbegrepen",
    welcomeEyebrow: "Welkom op het hoogste niveau",
    welcomeTitle: "Stijlvol reizen.<br />Ontspannen aankomen.",
    welcomeBody:
      "Vanaf uw landing is elk detail geregeld. Uw chauffeur wacht in de aankomsthal, zorgt voor uw bagage en begeleidt u naar uw zorgvuldig voorbereide privévoertuig.",
    ourStandards: "Onze servicestandaarden",
    concierge: "Conciërgeservice",
    guestsWelcomed: "Verwelkomde gasten",
    guestRating: "Gemiddelde gastbeoordeling",
    privateTransfers: "Privétransfers",
    fleetEyebrow: "Onze vloot",
    fleetTitle: "Uw privéruimte,<br />perfect tot in elk detail.",
    fleetIntro:
      "Reis comfortabel met ruimte voor familie, golfbagage en koffers.",
    fleetVclassClass: "Business · First Class",
    fleetVclassDescription:
      "De maatstaf voor verfijnde groepsreizen: ruim, uitzonderlijk stil en uitgerust voor een probleemloze aankomst.",
    fleetVitoClass: "VIP · Grand Touring",
    fleetVitoDescription:
      "Een ruime privécabine voor grotere families, golfgroepen en gasten met veel bagage.",
    signatureFleet: "Signature vloot",
    passengers: "passagiers",
    suitcases: "koffers",
    luggageLabel: "Grote bagage",
    capacitySwitchedSprinter:
      "Passagiers en bagage overschrijden de Vito — overgeschakeld naar Mercedes Sprinter.",
    capacityNoVehicle:
      "Zoveel passagiers en bagage overschrijdt onze voertuigen. Neem contact op via WhatsApp.",
    leatherSeats: "Premium leren stoelen",
    wifi: "Gratis WiFi",
    water: "Gekoeld mineraalwater",
    childSeats: "Kinderzitjes op verzoek",
    television: "Televisie in het voertuig",
    coldDrinks: "Koude dranken",
    snacks: "Snacks",
    nameSignGreeting: "Persoonlijke ontvangst bij aankomst",
    reserveVehicle: "Voertuig reserveren",
    insideVclass: "In het Sprinter interieur",
    interiorTitle: "Een privélounge<br />tussen luchthaven en hotel.",
    serviceEyebrow: "De Antalya VIP-standaard",
    serviceTitle: "Meer dan een transfer.<br />Een bijzonder welkom.",
    serviceIntro:
      "Aandacht op hotelniveau, ervaren lokale chauffeurs en absolute gemoedsrust van luchthaven tot resort.",
    trackingTitle: "Vluchttracking",
    trackingBody:
      "We volgen uw vlucht in realtime en passen de ophaalafspraak automatisch en kosteloos aan.",
    chauffeurTitle: "Professionele chauffeurs",
    chauffeurBody:
      "Altijd verzorgd, discreet en geselecteerd op lokale kennis en hoogste servicestandaard.",
    greetTitle: "Meet & Greet",
    greetBody:
      "Uw chauffeur verwelkomt u in de aankomsthal en helpt met uw bagage.",
    supportTitle: "24/7 Conciërge",
    supportBody:
      "Voor, tijdens en na uw reis is er altijd iemand bereikbaar per telefoon of WhatsApp.",
    priceTitle: "Vaste prijzen",
    priceBody:
      "De bevestigde prijs is de definitieve prijs. Wachttijd, parkeren en vluchtvertragingen zijn inbegrepen.",
    familyTitle: "Voor gezinnen",
    familyBody:
      "Passende kinderzitjes, ruime interieurs en geduldige hulp voor een ontspannen familieaankomst.",
    routesEyebrow: "Onze populairste ritten",
    routesTitle: "Van Antalya Luchthaven<br />naar de Turkse Rivièra.",
    routesIntro:
      "Alle prijzen zijn per voertuig, nooit per persoon. Gratis wachttijd is inbegrepen.",
    golfFavourite: "Golfliefhebbersfavoriet",
    from: "Vanaf",
    reviewsEyebrow: "Gastbeoordelingen",
    reviewsTitle: "Service die lang<br />bijblijft.",
    googleReviews: "Gebaseerd op 387 geverifieerde Google-beoordelingen",
    reviewOne:
      "„Onze chauffeur wachtte ondanks 90 minuten vertraging. Het voertuig was onberispelijk, aangenaam koel en al uitgerust met beide kinderzitjes. Precies de ontvangst die onze familie nodig had.”",
    reviewTwo:
      "„Van het eerste WhatsApp-contact tot aankomst in Belek absoluut eersteklas. Punctueel, discreet en zeer professioneel. Ook onze golftassen pasten er gemakkelijk in.”",
    reviewThree:
      "„Dit voelde als een chauffeurservice van een hotel, niet als een luchthaventaxi. Duidelijke communicatie, een onberispelijk voertuig en een oprecht beleefde chauffeur.”",
    trustedBy: "Vertrouwd door gasten van toonaangevende resorts in Antalya",
    faqEyebrow: "Veelgestelde vragen",
    faqTitle: "Vóór uw reis.",
    faqCatArrival: "Aankomst & transfer",
    faqCatPayment: "Betaling & prijs",
    faqCatVehicle: "Voertuig & bagage",
    faqReminder: "Lees vóór uw reis het FAQ-gedeelte op onze website.",
    viewFaq: "FAQ bekijken",
    faqIntro:
      "Alles wat u moet weten over uw privétransfer van de luchthaven Antalya.",
    askQuestion: "Stel een vraag",
    faqOneQ: "Wat gebeurt er bij een vluchtvertraging?",
    faqOneA:
      "U hoeft niets te doen. Wij volgen uw vlucht live en passen uw ophaaltijd automatisch aan. Vertragingen van de luchtvaartmaatschappij brengen wij nooit in rekening – uw chauffeur staat er, hoe laat u ook landt, en de eerste 90 minuten na de landing zijn altijd inbegrepen.",
    faqTwoQ:
      "Ik kom aan met een internationale vlucht. Hoe verloopt de ontvangst?",
    faqTwoA:
      "Loop na de paspoortcontrole en bagageafhandeling met de andere passagiers mee naar de Meet & Greet-zone en kom naar onze balie J / 777. Geef onze medewerker eenvoudig uw naam door – dat volstaat. Ons team waarschuwt meteen uw chauffeur; hij rijdt het luchthaventerrein op en staat klaar op het ophaalpunt, terwijl onze medewerker u naar de auto begeleidt. Het hele proces duurt ongeveer 7–8 minuten.",
    faqSixQ:
      "Ik kom aan met een binnenlandse vlucht. Waar vind ik mijn chauffeur?",
    faqSixA:
      "De Meet & Greet-zone is uitsluitend voor internationale aankomsten. Gasten van binnenlandse vluchten begeleiden wij daarom anders: wij sturen u vóór de transfer het telefoonnummer van uw chauffeur. Laat het hem na de landing kort weten – hij haalt u op in de aankomsthal.",
    faqSevenQ: "Wat als er niemand bij balie J / 777 staat?",
    faqSevenA:
      "Bij onze balie zijn permanent twee medewerkers aanwezig; hun enige taak is aankomende gasten naar hun voertuig te begeleiden. Treft u de balie even onbemand aan, dan begeleidt een collega net de gast die vlak vóór u aankwam – elke begeleiding duurt ongeveer 7–8 minuten. Wacht dan alstublieft zo'n 10 minuten. Is er daarna nog niemand terug, stuur ons dan een bericht via WhatsApp: wij informeren uw chauffeur direct, laten hem op het dichtstbijzijnde punt stoppen en begeleiden u zonder verder wachten rechtstreeks naar uw auto.",
    faqEightQ:
      "Wat als ik meer dan 90 minuten nodig heb om de luchthaven te verlaten?",
    faqEightA:
      "De eerste 90 minuten na de landing zijn kosteloos inbegrepen – ruim meer dan paspoortcontrole, bagage en douane vragen – en dit tijdvenster schuift automatisch mee bij vertraging. Alleen wanneer iets dat losstaat van uw vlucht u langer in de terminal houdt, komt er een parkeerbijdrage van € 5 per extra uur bij. In de praktijk gebeurt dat vrijwel nooit: bijna al onze gasten zijn ruim daarvoor onderweg.",
    faqNineQ: "Hoe betaal ik?",
    faqNineA:
      "U betaalt uw chauffeur contant aan het begin van de rit – kaarten accepteren we niet. De prijzen zijn vastgesteld in euro's (EUR): het vaste bedrag is precies wat u bij het boeken zag – per voertuig, inclusief alle luchthaven- en parkeerkosten, zonder latere toeslagen. Wilt u liever in Amerikaanse dollars of Turkse lira betalen? Stuur ons vooraf een bericht via WhatsApp voor een aparte prijs, aangezien de wisselkoers verschilt. Uw chauffeur verwelkomt u, laadt uw bagage in en plaatst de gevraagde kinderzitjes; na de betaling begint uw rit.",
    faqTenQ: "Hoe houd ik contact voor de terugtransfer?",
    faqTenA:
      "Zodra u datum en tijd van uw terugreis via WhatsApp met ons team hebt bevestigd, wijzen wij enkele uren vóór de transfer uw voertuig toe en sturen wij u foto's ervan via WhatsApp – desgewenst ook het telefoonnummer van uw chauffeur. Zodra uw chauffeur bij het hotel is, meldt hij zich bij de receptie, die uw kamer laat weten dat de auto klaarstaat. Onze chauffeurs bellen gasten nooit rechtstreeks: alle contact loopt via onze centrale WhatsApp-supportlijn, zodat u altijd precies weet met wie u spreekt.",
    faqThreeQ: "Zijn kinderzitjes beschikbaar?",
    faqThreeA:
      "Ja. Babyschalen, kinderzitjes en zitverhogers zijn bij vooraf boeken gratis beschikbaar.",
    faqFourQ: "Kunnen golfbags en groot bagage worden vervoerd?",
    faqFourA:
      "Ja. Sprinter en Vito zijn ideaal voor golfgroepen. Geef uw bagage op en wij plannen het juiste voertuig.",
    faqFiveQ: "Is de getoonde prijs definitief?",
    faqFiveA:
      "Ja. De prijs die u bij het boeken ziet, is het bedrag dat u contant aan uw chauffeur geeft – per voertuig, inclusief alle luchthavenkosten, parkeren en de eerste 90 minuten wachttijd. Er zijn geen verborgen kosten.",
    contactEyebrow: "Uw reis begint hier",
    contactTitle: "Buitengewoon goed<br />aankomen in Antalya.",
    contactBody:
      "Boek online in minder dan twee minuten of spreek direct met ons 24/7 conciërgeteam.",
    whatsappUs: "WhatsApp",
    replyMinutes: "Antwoord meestal binnen enkele minuten",
    callUs: "24/7 bellen",
    emailUs: "Conciërge e-mail",
    replyHour: "Antwoord binnen een uur",
    fromAirport: "Vanaf Antalya Luchthaven",
    perVehicle: "per voertuig · vaste prijs",
    footerTagline: "Privé chauffeurservices aan de hele Turkse Rivièra.",
    explore: "Ontdekken",
    information: "Informatie",
    licensed: "Erkende privé-transferaanbieder · TÜRSAB-conform",
    quoteReady: "Uw privétransfer",
    vehicle: "Voertuig",
    journeyTime: "Reistijd",
    totalFixed: "Totaalprijs",
    quoteIncludes:
      "Inclusief meet & greet, vluchtvolging, parkeren, 90 minuten wachttijd en flesje water.",
    confirmWhatsapp: "Bevestigen via WhatsApp",
    chatWithUs: "Chat met ons",
    bookNowCta: "Nu boeken",
    backToQuote: "Terug",
    yourDetails: "Uw gegevens",
    fullName: "Volledige naam",
    emailLabel: "E-mail",
    phoneLabel: "Telefoon / WhatsApp",
    flightNumber: "Vluchtnummer",
    flightArrivalTime: "Aankomsttijd",
    notesLabel: "Speciale wensen",
    confirmBooking: "Boeking bevestigen",
    bookingConfirmed: "Boeking bevestigd",
    referenceLabel: "Referentie",
    weWillContact:
      "Uw boekingsaanvraag is verzonden. We nemen binnen 30 minuten contact op.",
    paymentError: "Betaling mislukt. Probeer het opnieuw.",
  },
  uk: {
    navFleet: "Автопарк",
    navService: "Сервіс",
    navRoutes: "Маршрути",
    navReviews: "Відгуки",
    navContact: "Контакти",
    bookNow: "Забронювати",
    alwaysAvailable: "На зв'язку цілодобово, щодня",
    heroEyebrow: "Приватний шофер · Анталья",
    heroTitle: "Преміальний трансфер<br />з аеропорту Анталії",
    heroSubtitle:
      "Приватні трансфери з водієм з аеропорту Анталії до Белека, Сіде, Кемера та Аланії.",
    bookTransfer: "Замовити трансфер",
    instantQuote: "Дізнатися ціну",
    googleRated: "Рейтинг Google",
    trustedGuests: "Нам довіряють понад 2 500 гостей",
    discover: "Детальніше",
    privateJourney: "Ваша приватна поїздка",
    quoteTitle: "Куди вас відвезти?",
    pickup: "Місце зустрічі",
    destination: "Напрямок",
    date: "Дата",
    guests: "Гості",
    airportOption: "Аеропорт Анталії (AYT)",
    hotelOption: "Готель",
    privateAddressOption: "Приватна адреса",
    pickupAddress: "Повна адреса подачі",
    pickupAddressPlaceholder: "Назва готелю, вулиця, номер будинку та район",
    dropoffAddress: "Повна адреса призначення",
    dropoffAddressPlaceholder: "Назва готелю, вулиця, номер будинку та район",
    selectDestination: "Оберіть напрямок",
    airportReturnPrice:
      "Ціну буде підтверджено після перевірки готелю або адреси подачі.",
    oneGuest: "1 гість",
    twoGuests: "2 гості",
    threeGuests: "3 гості",
    fourGuests: "4 гості",
    fiveGuests: "5 гостей",
    sixGuests: "6 гостей",
    sevenGuests: "7 гостей",
    viewQuote: "Показати ціну",
    flightTracking: "Відстеження рейсу в реальному часі",
    fixedPrice: "Гарантія фіксованої ціни",
    meetGreet: "Особиста зустріч",
    speakingDrivers: "Водії розмовляють англійською та німецькою",
    tbLicensed: "Ліцензія TÜRSAB",
    tbFlightTracking: "Відстеження рейсу",
    tbFixedPrice: "Фіксована ціна",
    tb247Concierge: "Консьєрж 24/7",
    tbChildSeats: "Дитячі крісла в комплекті",
    welcomeEyebrow: "Ласкаво просимо на найвищий рівень",
    welcomeTitle: "Подорожуйте стильно.<br />Прибувайте спокійно.",
    welcomeBody:
      "З моменту посадки вашого літака кожна деталь продумана. Шофер чекає на вас у залі прильоту, піклується про багаж і супроводжує вас до підготовленого автомобіля.",
    ourStandards: "Наші стандарти сервісу",
    concierge: "Підтримка консьєржа",
    guestsWelcomed: "Зустрінутих гостей",
    guestRating: "Середня оцінка гостей",
    privateTransfers: "Приватні трансфери",
    fleetEyebrow: "Наш автопарк",
    fleetTitle: "Ваш особистий простір,<br />бездоганний у деталях.",
    fleetIntro:
      "Подорожуйте в тиші та комфорті з місцем для сім'ї, багажу та обладнання для гольфу.",
    fleetVclassClass: "Business · First Class",
    fleetVclassDescription:
      "Еталон комфортних групових поїздок: просторий, надзвичайно тихий та оснащений для бездоганного прибуття.",
    fleetVitoClass: "VIP · Grand Touring",
    fleetVitoDescription:
      "Просторий приватний салон для великих сімей, груп гравців у гольф та гостей з об'ємним багажем.",
    signatureFleet: "Фірмовий автопарк",
    passengers: "пасажирів",
    suitcases: "валіз",
    luggageLabel: "Великий багаж",
    capacitySwitchedSprinter:
      "Пасажири та багаж перевищують Vito — обрано Mercedes Sprinter.",
    capacityNoVehicle:
      "Стільки пасажирів і багажу перевищує наші автомобілі. Напишіть нам у WhatsApp.",
    leatherSeats: "Преміальні шкіряні сидіння",
    wifi: "Безкоштовний WiFi",
    water: "Охолоджена вода",
    childSeats: "Дитячі крісла на запит",
    television: "Телевізор в автомобілі",
    coldDrinks: "Холодні напої",
    snacks: "Закуски",
    nameSignGreeting: "Особиста зустріч у залі прильоту",
    reserveVehicle: "Забронювати автомобіль",
    insideVclass: "Салон Sprinter",
    interiorTitle: "Приватний лаунж<br />між аеропортом і готелем.",
    serviceEyebrow: "Стандарт Antalya VIP",
    serviceTitle: "Більше ніж трансфер.<br />Продумана зустріч.",
    serviceIntro:
      "Увага рівня п'ятизіркового готелю, досвідчені місцеві шофери та спокій від аеропорту до курорту.",
    trackingTitle: "Відстеження рейсу",
    trackingBody:
      "Ми відстежуємо ваш рейс у реальному часі та автоматично коригуємо час зустрічі без доплати.",
    chauffeurTitle: "Професійні шофери",
    chauffeurBody:
      "Завжди бездоганний вигляд, делікатність, знання регіону та найвищі стандарти обслуговування.",
    greetTitle: "Зустріч в аеропорту",
    greetBody:
      "Шофер зустріне вас у залі прильоту та допоможе з багажем.",
    supportTitle: "Консьєрж 24/7",
    supportBody:
      "До, під час і після поїздки вам завжди відповість людина по телефону або в WhatsApp.",
    priceTitle: "Фіксовані ціни",
    priceBody:
      "Підтверджена ціна є остаточною. Очікування, паркування та затримки рейсів вже включені.",
    familyTitle: "Для всієї родини",
    familyBody:
      "Дитячі крісла за віком, просторий салон та уважна допомога для спокійного сімейного прибуття.",
    routesEyebrow: "Найпопулярніші поїздки",
    routesTitle: "З аеропорту Анталії<br />на Турецьку Рив'єру.",
    routesIntro:
      "Всі ціни вказані за автомобіль, а не за пасажира. Безкоштовне очікування включено.",
    golfFavourite: "Вибір гравців у гольф",
    from: "Від",
    reviewsEyebrow: "Відгуки гостей",
    reviewsTitle: "Сервіс, який пам'ятають<br />після прибуття.",
    googleReviews: "На основі 387 підтверджених відгуків Google",
    reviewOne:
      "«Незважаючи на затримку рейсу на 90 хвилин, водій чекав на нас. Автомобіль був бездоганно чистим та прохолодним, а обидва дитячі крісла вже були встановлені. Саме така зустріч потрібна нашій родині».",
    reviewTwo:
      "«Від першого повідомлення в WhatsApp до прибуття в Белек все було на найвищому рівні. Пунктуально, делікатно і дуже професійно. Наші сумки для гольфу легко помістилися».",
    reviewThree:
      "«Це нагадувало трансфер від п'ятизіркового готелю, а не таксі з аеропорту. Чіткий зв'язок, бездоганний автомобіль та по-справжньому ввічливий водій».",
    trustedBy: "Нам довіряють гості провідних курортів Анталії",
    faqEyebrow: "Часті запитання",
    faqTitle: "Перед поїздкою.",
    faqCatArrival: "Зустріч і трансфер",
    faqCatPayment: "Оплата й ціна",
    faqCatVehicle: "Автомобіль і багаж",
    faqReminder: "Перед поїздкою ознайомтеся з розділом поширених запитань на нашому сайті.",
    viewFaq: "Переглянути FAQ",
    faqIntro:
      "Все, що потрібно знати про приватний трансфер з аеропорту Анталії.",
    askQuestion: "Поставити запитання",
    faqOneQ: "Що станеться, якщо мій рейс затримається?",
    faqOneA:
      "Від вас нічого не потрібно. Ми стежимо за вашим рейсом у реальному часі й автоматично коригуємо час подачі автомобіля. За затримки авіакомпанії ми ніколи не беремо доплат — водій зустріне вас о будь-якій годині, а перші 90 хвилин після посадки завжди включені у вартість.",
    faqTwoQ: "Я прилітаю міжнародним рейсом. Як відбувається зустріч?",
    faqTwoA:
      "Після паспортного контролю та отримання багажу прямуйте разом з іншими пасажирами до зони зустрічі Meet & Greet і підійдіть до нашої стійки J / 777. Достатньо назвати нашому працівникові своє ім'я. Наша команда одразу повідомляє водія; він в'їжджає на територію аеропорту та подає автомобіль до місця посадки, а працівник тим часом проводжає вас до авто. Уся процедура триває близько 7–8 хвилин.",
    faqSixQ: "Я прилітаю внутрішнім рейсом. Де знайти водія?",
    faqSixA:
      "Зона Meet & Greet працює лише для міжнародних прильотів, тому гостей внутрішніх рейсів ми супроводжуємо інакше: перед трансфером надсилаємо вам номер телефону водія. Після посадки просто повідомте йому — він зустріне вас у залі прильотів.",
    faqSevenQ: "Що робити, якщо біля стійки J / 777 нікого немає?",
    faqSevenA:
      "На стійці постійно чергують двоє наших працівників, і їхнє єдине завдання — провести гостей до автомобіля. Якщо стійка на мить порожня, це означає, що колега саме супроводжує гостя, який прилетів перед вами: кожен супровід триває близько 7–8 хвилин. Будь ласка, зачекайте приблизно 10 хвилин. Якщо за цей час ніхто не повернувся, напишіть нам у WhatsApp: ми негайно повідомимо водія, він під'їде до найближчої точки, і ми проведемо вас просто до авто без подальшого очікування.",
    faqEightQ:
      "Що буде, якщо мені знадобиться більше ніж 90 хвилин, щоб вийти з аеропорту?",
    faqEightA:
      "Перші 90 хвилин після посадки включені у вартість — цього з запасом вистачає на паспортний контроль, багаж і митницю, а в разі затримки рейсу відлік зміщується автоматично. Лише якщо ви затримаєтеся в терміналі довше з причин, не пов'язаних із рейсом, додається паркувальний внесок 5 € за кожну додаткову годину. На практиці це трапляється майже ніколи: переважна більшість гостей вирушає задовго до цього.",
    faqNineQ: "Як відбувається оплата?",
    faqNineA:
      "Ви розраховуєтеся з водієм готівкою на початку поїздки — картки не приймаються. Ціни встановлені в євро (EUR): фіксована сума точно відповідає тій, яку ви бачили під час бронювання, — за автомобіль, з усіма аеропортовими та паркувальними зборами, без подальших доплат. Бажаєте сплатити в доларах США чи турецьких лірах? Напишіть нам заздалегідь у WhatsApp, щоб отримати окрему ціну, оскільки курс відрізняється. Водій зустрічає вас, завантажує багаж і встановлює замовлені дитячі крісла; після оплати ваша поїздка починається.",
    faqTenQ: "Як підтримувати зв'язок під час зворотного трансферу?",
    faqTenA:
      "Щойно ви підтвердите дату й час зворотної поїздки нашій команді у WhatsApp, за кілька годин до трансферу ми призначаємо автомобіль і надсилаємо вам його фотографії у WhatsApp — за бажанням також номер телефону водія. Коли водій приїжджає до готелю, він повідомляє рецепцію, а вона передає у ваш номер, що авто подано. Наші водії ніколи не телефонують гостям напряму: усе спілкування відбувається через єдину лінію підтримки у WhatsApp, тож ви завжди точно знаєте, з ким розмовляєте.",
    faqThreeQ: "Чи є дитячі крісла?",
    faqThreeA:
      "Так. Автолюльки, дитячі крісла та бустери надаються безкоштовно на запит при бронюванні.",
    faqFourQ: "Чи можна перевезти сумки для гольфу та великий багаж?",
    faqFourA:
      "Так. Sprinter і Vito ідеально підходять для груп гравців у гольф. Повідомте об'єм багажу і ми підберемо автомобіль.",
    faqFiveQ: "Вказана ціна є остаточною?",
    faqFiveA:
      "Так. Ціна, яку ви бачите під час бронювання, — це сума, яку ви передаєте водієві готівкою: за автомобіль, з усіма аеропортовими зборами, паркуванням і першими 90 хвилинами очікування. Прихованих платежів немає.",
    contactEyebrow: "Ваша подорож починається тут",
    contactTitle: "Прибудьте в Анталью<br />надзвичайно комфортно.",
    contactBody:
      "Забронюйте онлайн менш ніж за дві хвилини або зв'яжіться з нашою службою консьєржа 24/7.",
    whatsappUs: "Написати в WhatsApp",
    replyMinutes: "Зазвичай відповідаємо за кілька хвилин",
    callUs: "Зателефонувати 24/7",
    emailUs: "Написати консьєржу",
    replyHour: "Відповідь протягом години",
    fromAirport: "З аеропорту Анталії",
    perVehicle: "за автомобіль · фіксована ціна",
    footerTagline: "Приватні послуги шофера по всій Турецькій Рив'єрі.",
    explore: "Розділи",
    information: "Інформація",
    licensed:
      "Ліцензований оператор приватних трансферів · Відповідає вимогам TÜRSAB",
    quoteReady: "Ваш приватний трансфер",
    vehicle: "Автомобіль",
    journeyTime: "Час у дорозі",
    totalFixed: "Підсумкова ціна",
    quoteIncludes:
      "Включено зустріч, відстеження рейсу, паркування, 90 хвилин очікування та питну воду.",
    confirmWhatsapp: "Підтвердити в WhatsApp",
    chatWithUs: "Написати нам",
    bookNowCta: "Забронювати",
    backToQuote: "Назад",
    yourDetails: "Ваші дані",
    fullName: "Ім'я та прізвище",
    emailLabel: "Ел. пошта",
    phoneLabel: "Телефон / WhatsApp",
    flightNumber: "Номер рейсу",
    flightArrivalTime: "Час прильоту",
    notesLabel: "Особливі побажання",
    confirmBooking: "Підтвердити бронювання",
    bookingConfirmed: "Бронювання підтверджено",
    referenceLabel: "Референс",
    weWillContact:
      "Ваш запит на бронювання надіслано. Ми зв'яжемося з вами протягом 30 хвилин.",
    paymentError: "Оплата не пройшла. Спробуйте ще раз.",
  },
  ur: {
    navFleet: "گاڑیاں",
    navService: "خدمات",
    navRoutes: "راستے",
    navReviews: "جائزے",
    navContact: "رابطہ",
    bookNow: "ابھی بک کریں",
    alwaysAvailable: "24 گھنٹے، ہر روز دستیاب",
    heroEyebrow: "نجی شوفر سروس · انطالیہ",
    campaignBadge: "آن لائن خصوصی",
    campaignDiscount: "خصوصی قیمت",
    campaignScope: "تمام ٹرانسفر قیمتوں پر",
    heroTitle: "انطالیہ میں پریمیم<br />ایئرپورٹ ٹرانسفر",
    heroSubtitle:
      "انطالیہ ایئرپورٹ سے بیلک، سیدے، کیمر اور الانیا تک نجی شوفر سروس۔",
    bookTransfer: "ٹرانسفر بک کریں",
    instantQuote: "فوری قیمت جانیں",
    googleRated: "گوگل ریٹڈ",
    trustedGuests: "2,500+ مسافروں کا اعتماد",
    discover: "دریافت کریں",
    tbLicensed: "TÜRSAB لائسنس یافتہ",
    tbFlightTracking: "فلائٹ ٹریکنگ",
    tbFixedPrice: "مقررہ قیمت",
    tb247Concierge: "24/7 کنسیرج",
    tbChildSeats: "بچوں کی نشستیں شامل",
    privateJourney: "آپ کا نجی سفر",
    tripType: "سفر کی قسم",
    oneWay: "ایک طرفہ",
    roundTrip: "آنا جانا",
    roundTripHint: "واپسی کا سفر اسی راستے سے ہوگا۔",
    pickup: "پک اپ",
    airportOption: "انطالیہ ایئرپورٹ (AYT)",
    hotelOption: "ہوٹل",
    privateAddressOption: "نجی پتہ",
    destination: "منزل",
    selectDestination: "منزل منتخب کریں",
    vehicle: "گاڑی",
    guests: "مسافر",
    arrivalDate: "آمد کی تاریخ",
    arrivalFlightTime: "فلائٹ آمد کا وقت",
    chooseTime: "وقت منتخب کریں",
    arrivalFlightNumber: "آمد کا فلائٹ نمبر",
    returnDate: "واپسی کی تاریخ",
    returnPickupTime: "واپسی کا پک اپ وقت",
    returnFlightNumber: "واپسی کا فلائٹ نمبر",
    pickupAddress: "پک اپ کا مکمل پتہ",
    dropoffAddress: "ڈراپ آف کا مکمل پتہ",
    luggageLabel: "بڑا سامان",
    hotelNameLabel: "ہوٹل کا نام",
    childSeatLabel: "بچوں کی نشستیں",
    childSeatNone: "کوئی بچوں کی نشست نہیں",
    oneChildSeat: "1 بچوں کی نشست",
    twoChildSeats: "2 بچوں کی نشستیں",
    threeChildSeats: "3 بچوں کی نشستیں",
    fourChildSeats: "4 بچوں کی نشستیں",
    fullName: "پورا نام",
    phoneLabel: "فون / واٹس ایپ",
    emailLabel: "ای میل",
    paymentMethod: "ادائیگی کا طریقہ منتخب کریں",
    cashPayment: "گاڑی میں ادائیگی",
    recommended: "تجویز کردہ",
    cashPaymentDescription:
      "آن لائن پیشگی ادائیگی نہیں۔ مقررہ رقم آپ سفر کے آغاز پر ڈرائیور کو نقد ادا کرتے ہیں۔",
    quoteIncludes:
      "استقبال، فلائٹ ٹریکنگ، پارکنگ، 90 منٹ انتظار اور بوتل بند پانی شامل ہے۔",
    confirmCashBooking: "بکنگ کی تصدیق کریں — گاڑی میں ادا کریں",
    flightTracking: "حقیقی وقت کی فلائٹ ٹریکنگ",
    fixedPrice: "مقررہ قیمت کی ضمانت",
    meetGreet: "ذاتی میٹ اینڈ گریٹ",
    speakingDrivers: "انگریزی اور جرمن بولنے والے",
    fromAirport: "انطالیہ ایئرپورٹ سے",
    campaignApplied: "آن لائن خصوصی قیمت لاگو ہو گئی",
    welcomeEyebrow: "ایک بہتر آمد میں خوش آمدید",
    welcomeTitle: "خوبصورتی سے سفر کریں۔<br />آسانی سے پہنچیں۔",
    welcomeBody:
      "آپ کی فلائٹ لینڈ ہونے کے لمحے سے ہر تفصیل کا خیال رکھا جاتا ہے۔ آپ کا شوفر آمد پر انتظار کرتا ہے، آپ کا سامان اٹھاتا ہے اور آپ کو ایک بے عیب نجی گاڑی تک لے جاتا ہے۔",
    ourStandards: "ہمارے سروس معیارات",
    concierge: "کنسیرج سپورٹ",
    guestsWelcomed: "مسافروں کا استقبال",
    guestRating: "اوسط مسافر ریٹنگ",
    privateTransfers: "نجی ٹرانسفر",
    fleetEyebrow: "گاڑیاں",
    fleetTitle: "آپ کی نجی جگہ،<br />ہر تفصیل میں بہترین۔",
    fleetIntro:
      "اپنے خاندان، گولف کا سامان اور سامان کے لیے کافی جگہ کے ساتھ پرسکون آرام سے سفر کریں۔",
    signatureFleet: "سگنیچر فلیٹ",
    fleetVclassClass: "بزنس · فرسٹ کلاس",
    fleetVclassDescription:
      "بڑے گروپوں کے لیے کشادہ VIP ٹرانسپورٹ، مسافروں اور سامان کے لیے وافر جگہ کے ساتھ۔",
    passengers: "مسافر",
    suitcases: "سوٹ کیس",
    television: "گاڑی میں ٹیلی ویژن",
    coldDrinks: "ٹھنڈے مشروبات",
    snacks: "اسنیکس",
    childSeats: "بچوں کی نشست دستیاب",
    wifi: "مجانی WiFi",
    nameSignGreeting: "آمد پر ذاتی استقبال",
    reserveVehicle: "یہ گاڑی بک کریں",
    insideVclass: "اسپرنٹر کے اندر",
    interiorTitle: "ایئرپورٹ اور آپ کے ہوٹل کے<br />درمیان ایک نجی لاؤنج۔",
    serviceEyebrow: "انطالیہ VIP معیار",
    serviceTitle: "صرف ٹرانسفر سے بڑھ کر۔<br />ایک سوچا سمجھا خیرمقدم۔",
    serviceIntro:
      "ہوٹل جیسی توجہ، تجربہ کار مقامی شوفر اور رن وے سے ریزورٹ تک مکمل سکون۔",
    trackingTitle: "فلائٹ ٹریکنگ",
    trackingBody:
      "ہم آپ کی فلائٹ کو حقیقی وقت میں مانیٹر کرتے ہیں اور آپ کا پک اپ خودکار طور پر ایڈجسٹ کرتے ہیں، بغیر کسی اضافی چارج کے۔",
    chauffeurTitle: "پیشہ ور شوفر",
    chauffeurBody:
      "بے داغ پیش کردہ، سمجھدار اور اپنی مقامی معلومات اور سروس معیارات کے لیے منتخب۔",
    greetTitle: "میٹ اینڈ گریٹ",
    greetBody:
      "آپ کا شوفر آمد پر آپ کا استقبال کرے گا اور سامان میں مدد کرے گا۔",
    supportTitle: "24/7 کنسیرج",
    supportBody:
      "آپ کے سفر سے پہلے، دوران اور بعد میں ایک حقیقی شخص فون یا واٹس ایپ پر ہمیشہ دستیاب ہے۔",
    priceTitle: "مقررہ قیمتیں",
    priceBody:
      "تصدیق شدہ قیمت وہی ہے جو آپ ادا کرتے ہیں۔ انتظار کا وقت، پارکنگ اور فلائٹ میں تاخیر شامل ہے۔",
    familyTitle: "خاندان کے لیے تیار",
    familyBody:
      "عمر کے مطابق بچوں کی نشستیں، کشادہ کیبن اور پرسکون خاندانی آمد کے لیے صبر مند مدد۔",
    routesEyebrow: "ہمارے سب سے مطلوب سفر",
    routesTitle: "انطالیہ ایئرپورٹ سے<br />ترکی ریویرا تک۔",
    routesIntro:
      "تمام قیمتیں فی گاڑی ہیں، فی مسافر نہیں، مجانی انتظار کا وقت شامل ہے۔",
    discountPricesShown: "آن لائن خصوصی قیمتیں دکھائی جا رہی ہیں",
    golfFavourite: "گولف کا پسندیدہ",
    onlineDiscountShort: "آن لائن خصوصی قیمت",
    reviewsEyebrow: "مسافروں کے جائزے",
    reviewsTitle: "آمد کے بعد بھی یاد رہنے<br />والی سروس۔",
    googleReviews: "387 تصدیق شدہ گوگل جائزوں پر مبنی",
    trustedBy: "انطالیہ کے معروف ریزورٹس کے مسافروں کا اعتماد",
    faqEyebrow: "اکثر پوچھے گئے سوالات",
    faqTitle: "سفر سے پہلے۔",
    faqCatArrival: "آمد اور ٹرانسفر",
    faqCatPayment: "ادائیگی اور قیمت",
    faqCatVehicle: "گاڑی اور سامان",
    faqReminder: "اپنے سفر سے پہلے براہِ کرم ہماری ویب سائٹ کا FAQ سیکشن ملاحظہ کریں۔",
    viewFaq: "FAQ دیکھیں",
    faqIntro:
      "اپنے نجی انطالیہ ایئرپورٹ ٹرانسفر کے بارے میں آپ کو جو کچھ جاننا ضروری ہے۔",
    askQuestion: "ہم سے سوال پوچھیں",
    faqOneQ: "اگر میری پرواز میں تاخیر ہو جائے تو کیا ہوگا؟",
    faqOneA:
      "آپ کو کچھ کرنے کی ضرورت نہیں۔ ہم آپ کی پرواز کو حقیقی وقت میں ٹریک کرتے ہیں اور پک اپ کا وقت خودکار طور پر ایڈجسٹ کر دیتے ہیں۔ ایئر لائن کی وجہ سے ہونے والی تاخیر پر کبھی کوئی اضافی چارج نہیں لیا جاتا — آپ جب بھی لینڈ کریں، آپ کا ڈرائیور موجود ہوگا، اور لینڈنگ کے بعد پہلے 90 منٹ ہمیشہ قیمت میں شامل ہیں۔",
    faqTwoQ: "میں بین الاقوامی پرواز سے آ رہا ہوں، استقبال کیسے ہوتا ہے؟",
    faqTwoA:
      "پاسپورٹ کنٹرول اور سامان وصول کرنے کے بعد دیگر مسافروں کے ساتھ Meet & Greet ایریا کی طرف بڑھیں اور ہمارے کاؤنٹر J / 777 پر آئیں۔ ہمارے عملے کو صرف اپنا نام بتائیں — کم رش کے اوقات میں آپ کو اپنے نام کا سائن بورڈ بھی نظر آئے گا، جبکہ مصروف اوقات میں نام بتانا ہی کافی ہے۔ ہماری ٹیم فوراً آپ کے ڈرائیور کو اطلاع دیتی ہے؛ وہ ایئرپورٹ میں داخل ہو کر پک اپ پوائنٹ پر گاڑی لے آتا ہے اور اسی دوران ہمارا عملہ آپ کو گاڑی تک پہنچاتا ہے۔ پورا عمل تقریباً 7 سے 8 منٹ لیتا ہے۔",
    faqSixQ:
      "میں ملکی (ڈومیسٹک) پرواز سے آ رہا ہوں، اپنے ڈرائیور کو کہاں تلاش کروں؟",
    faqSixA:
      "Meet & Greet ایریا صرف بین الاقوامی آمد کے لیے ہے، اس لیے ڈومیسٹک مہمانوں کا انتظام مختلف ہے: ہم ٹرانسفر سے پہلے آپ کو ڈرائیور کا فون نمبر بھیج دیتے ہیں۔ لینڈ کرنے کے بعد انہیں مختصر اطلاع دیں — وہ آپ کو ارائیول ہال سے وصول کریں گے۔",
    faqSevenQ: "اگر کاؤنٹر J / 777 پر کوئی موجود نہ ہو تو کیا کروں؟",
    faqSevenA:
      "ہمارے کاؤنٹر پر مستقل طور پر دو اہلکار موجود رہتے ہیں اور ان کا واحد کام آنے والے مہمانوں کو ان کی گاڑی تک پہنچانا ہے۔ اگر کاؤنٹر لمحہ بھر کے لیے خالی ملے تو اس کا مطلب ہے کہ ساتھی اہلکار آپ سے پہلے آنے والے مہمان کو گاڑی تک لے گیا ہے — ہر مہمان کو پہنچانے میں تقریباً 7 سے 8 منٹ لگتے ہیں۔ براہِ کرم تقریباً 10 منٹ انتظار کریں۔ اگر اس دوران بھی کوئی واپس نہ آئے تو ہمیں WhatsApp پر پیغام دیں: ہم فوراً آپ کے ڈرائیور کو اطلاع دیں گے، اسے قریب ترین مقام پر کھڑا کروائیں گے اور آپ کو مزید انتظار کے بغیر سیدھا گاڑی تک پہنچا دیں گے۔",
    faqEightQ:
      "اگر مجھے ایئرپورٹ سے نکلنے میں 90 منٹ سے زیادہ لگ جائیں تو کیا ہوگا؟",
    faqEightA:
      "طیارے کی لینڈنگ کے بعد پہلے 90 منٹ مفت شامل ہیں — پاسپورٹ کنٹرول، سامان اور کسٹم کے لیے یہ وقت بخوبی کافی ہے، اور پرواز میں تاخیر کی صورت میں یہ دورانیہ خودکار طور پر آگے کھسک جاتا ہے۔ صرف اس صورت میں جب پرواز سے غیر متعلق کوئی وجہ آپ کو ٹرمینل میں زیادہ دیر روکے، ہر اضافی گھنٹے کے لیے 5 یورو پارکنگ چارج شامل کیا جاتا ہے۔ عملی طور پر ایسا تقریباً کبھی نہیں ہوتا؛ ہمارے تقریباً تمام مہمان اس سے کہیں پہلے روانہ ہو چکے ہوتے ہیں۔",
    faqNineQ: "ادائیگی کیسے کی جاتی ہے؟",
    faqNineA:
      "آپ سفر کے آغاز پر اپنے ڈرائیور کو نقد ادائیگی کرتے ہیں — ہم کارڈ قبول نہیں کرتے۔ قیمتیں یورو (EUR) میں مقرر ہیں: مقررہ رقم بالکل وہی ہے جو بکنگ کے وقت آپ نے دیکھی تھی — فی گاڑی، تمام ایئرپورٹ اور پارکنگ فیس سمیت، بعد میں کچھ شامل نہیں ہوتا۔ اگر آپ امریکی ڈالر یا ترک لیرا میں ادائیگی کرنا چاہیں تو پہلے سے WhatsApp پر ہمیں پیغام بھیجیں تاکہ الگ قیمت دی جا سکے، کیونکہ شرحِ تبادلہ مختلف ہوتی ہے۔ آپ کا ڈرائیور آپ کا استقبال کرتا ہے، سامان گاڑی میں رکھتا ہے اور درخواست کردہ چائلڈ سیٹس لگاتا ہے؛ ادائیگی کے بعد آپ کا سفر شروع ہو جاتا ہے۔",
    faqTenQ: "واپسی کے ٹرانسفر کے لیے رابطہ کیسے رہے گا؟",
    faqTenA:
      "جب آپ WhatsApp پر ہماری ٹیم کے ساتھ واپسی کی تاریخ اور وقت کی تصدیق کر دیتے ہیں، تو ہم ٹرانسفر سے چند گھنٹے پہلے آپ کی گاڑی مقرر کرتے ہیں اور WhatsApp پر اس کی تصاویر بھیجتے ہیں — آپ چاہیں تو ڈرائیور کا فون نمبر بھی۔ ڈرائیور ہوٹل پہنچ کر استقبالیہ کو اطلاع دیتا ہے، اور استقبالیہ آپ کے کمرے میں بتا دیتا ہے کہ گاڑی تیار ہے۔ ہمارے ڈرائیور مہمانوں کو براہِ راست فون نہیں کرتے: تمام رابطہ ہماری واحد WhatsApp سپورٹ لائن کے ذریعے ہوتا ہے، تاکہ آپ کو ہمیشہ معلوم ہو کہ آپ کس سے بات کر رہے ہیں۔",
    faqThreeQ: "کیا بچوں کی نشستیں دستیاب ہیں؟",
    faqThreeA:
      "ہاں۔ بکنگ کے وقت درخواست کرنے پر شیر خوار، چھوٹے بچوں اور بوسٹر نشستیں مجانی دستیاب ہیں۔",
    faqFourQ: "کیا آپ گولف بیگ اور بڑا سامان لے جا سکتے ہیں؟",
    faqFourA:
      "ہاں۔ ہماری اسپرنٹر اور ویٹو گاڑیاں گولف گروپوں کے لیے موزوں ہیں۔ ہمیں اپنے سامان کی تفصیلات بتائیں اور ہم صحیح گاڑی مختص کریں گے۔",
    faqFiveQ: "کیا دی گئی قیمت حتمی ہے؟",
    faqFiveA:
      "جی ہاں۔ بکنگ کے وقت نظر آنے والی قیمت ہی وہ رقم ہے جو آپ ڈرائیور کو نقد دیتے ہیں — فی گاڑی، تمام ایئرپورٹ فیس، پارکنگ اور لینڈنگ کے بعد پہلے 90 منٹ کے انتظار سمیت۔ کوئی پوشیدہ چارجز نہیں۔",
    contactEyebrow: "آپ کا سفر یہاں سے شروع ہوتا ہے",
    contactTitle: "انطالیہ میں<br />شاندار طریقے سے پہنچیں۔",
    contactBody:
      "دو منٹ سے کم میں آن لائن بک کریں یا ہماری 24/7 کنسیرج ٹیم سے براہ راست بات کریں۔",
    whatsappUs: "واٹس ایپ کریں",
    replyMinutes: "عام طور پر منٹوں میں جواب دیتے ہیں",
    callUs: "24/7 کال کریں",
    emailUs: "کنسیرج کو ای میل کریں",
    replyHour: "ایک گھنٹے کے اندر جواب دیتے ہیں",
    footerTagline: "ترکی ریویرا میں نجی شوفر خدمات۔",
    explore: "دریافت کریں",
    information: "معلومات",
    licensed: "لائسنس یافتہ نجی ٹرانسفر آپریٹر · TÜRSAB تعمیل",
    bookingConfirmed: "بکنگ کی تصدیق ہو گئی",
    referenceLabel: "حوالہ",
    weWillContact:
      "آپ کی بکنگ کی درخواست بھیج دی گئی۔ ہم 30 منٹ کے اندر آپ سے رابطہ کریں گے۔",
    chatWithUs: "ہم سے چیٹ کریں",
    pickupAddressPlaceholder: "ہوٹل کا نام، گلی، عمارت نمبر اور علاقہ",
    dropoffAddressPlaceholder: "ہوٹل کا نام، گلی، عمارت نمبر اور علاقہ",
    hotelNamePlaceholder: "ہوٹل یا رہائش کا نام",
    requestQuote: "قیمت کا اندازہ لگائیں",
    cashConfirmation:
      "آپ کی بکنگ کی تصدیق ہو گئی۔ مقررہ کل رقم آپ سفر کے آغاز پر ڈرائیور کو نقد ادا کریں گے۔",
    bookingError: "آپ کی بکنگ مکمل نہیں ہو سکی۔ براہ کرم دوبارہ کوشش کریں۔",
    formIncomplete: "براہ کرم نمایاں شدہ خانے مکمل کریں۔",
    requiredField: "یہ خانہ ضروری ہے۔",
    destinationRequired: "براہ کرم ایک منزل منتخب کریں۔",
    dateInvalid: "براہ کرم آج یا مستقبل کی تاریخ منتخب کریں۔",
    emailInvalid: "براہ کرم ایک درست ای میل پتہ درج کریں۔",
    nameInvalid: "براہ کرم ایک درست پورا نام درج کریں۔",
    phoneInvalid:
      "براہ کرم ملک کوڈ کے ساتھ ایک درست نمبر درج کریں (مثال کے طور پر +92)۔",
    flightInvalid: "براہ کرم ایک درست فلائٹ نمبر درج کریں۔",
    pickupAddressRequired: "پک اپ کا پتہ 6 سے 160 حروف کے درمیان ہونا چاہیے۔",
    dropoffAddressRequired:
      "ڈراپ آف کا پتہ 6 سے 160 حروف کے درمیان ہونا چاہیے۔",
    addressesMustDiffer: "پک اپ اور ڈراپ آف کے پتے مختلف ہونے چاہئیں۔",
    customDestinationPrice:
      "ڈراپ آف پتہ جانچنے کے بعد قیمت کی تصدیق کی جائے گی۔",
    hotelNameRequired: "براہ کرم ہوٹل کا نام درج کریں۔",
    roundTripPriceNote: "آنا جانا · 2 سفر",
    returnDateRequired: "براہ کرم واپسی کی تاریخ منتخب کریں۔",
    returnDateInvalid:
      "براہ کرم جانے کے سفر پر یا اس کے بعد کی واپسی کی تاریخ منتخب کریں۔",
    returnTimeRequired: "براہ کرم واپسی کا پک اپ وقت منتخب کریں۔",
    dailyChauffeur: "روزانہ گاڑی + شوفر",
    days: "دن",
    dailyChauffeurHint:
      "بغیر کلومیٹر یا گھنٹے کی حد کے روزانہ کی بنیاد پر نجی گاڑی اور شوفر کرایہ پر لیں۔ ایندھن الگ ادا کیا جاتا ہے۔",
    serviceStartDate: "پہلی سروس کا دن",
    serviceEndDate: "آخری سروس کا دن",
    dailyPickupTime: "سروس شروع ہونے کا وقت",
    dailyPickupTimeRequired:
      "براہ کرم روزانہ سروس شروع ہونے کا وقت منتخب کریں۔",
    serviceEndDateRequired: "براہ کرم آخری سروس کا دن منتخب کریں۔",
    servicePeriodInvalid: "براہ کرم 1 سے 30 دن کے درمیان مدت منتخب کریں۔",
    arrivalFlightTimeOptional: "آمد کا فلائٹ وقت (اختیاری)",
    arrivalFlightNumberOptional: "آمد کا فلائٹ نمبر (اختیاری)",
    servicePrice: "سروس قیمت",
    fuelExcludedShort: "ایندھن شامل نہیں",
    fuelExcludedDetail:
      "ایندھن شامل نہیں ہے اور استعمال کے مطابق الگ ادا کیا جاتا ہے۔",
    departureFlightDate: "روانگی کی فلائٹ کی تاریخ",
    departureFlightTime: "روانگی کی فلائٹ کا وقت",
    departureFlightNumber: "روانگی کا فلائٹ نمبر",
    departureFlightDateRequired:
      "براہ کرم روانگی کی فلائٹ کی تاریخ منتخب کریں۔",
    departureFlightDateInvalid: "براہ کرم آج یا مستقبل کی تاریخ منتخب کریں۔",
    dailyQuoteIncludes:
      "بغیر کلومیٹر یا گھنٹے کی حد کے روزانہ شوفر سروس شامل ہے۔ ایندھن الگ ادا کیا جاتا ہے۔",
    reviewAndConfirm: "جائزہ لیں اور تصدیق کریں",
    fuelTermsTitle: "ایندھن کی شرائط",
    fuelTermsBody:
      "روزانہ شوفر سروس کے لیے، ایندھن کی لاگت شامل نہیں ہے۔ آپ ڈرائیور کو براہ راست استعمال شدہ ایندھن کی ادائیگی کریں گے۔",
    fuelTermsCheckbox: "میں سمجھتا/سمجھتی ہوں کہ ایندھن الگ ادا کیا جائے گا",
    cancel: "منسوخ کریں",
    close: "بند کریں",
    understandAndConfirm: "سمجھ گیا، تصدیق کریں",
    dailyCashConfirmation:
      "آپ کی روزانہ شوفر سروس کی بکنگ کی تصدیق ہو گئی۔ ہر دن کے اختتام پر اپنے ڈرائیور کو ادا کریں۔",
    quoteTitle: "آپ کا کوٹ",
    date: "تاریخ",
    airportReturnPrice: "ایئرپورٹ واپسی قیمت",
    oneGuest: "1 مسافر",
    twoGuests: "2 مسافر",
    threeGuests: "3 مسافر",
    fourGuests: "4 مسافر",
    fiveGuests: "5 مسافر",
    sixGuests: "6 مسافر",
    sevenGuests: "7 مسافر",
    viewQuote: "کوٹ دیکھیں",
    fleetVitoClass: "پریمیم · VIP",
    fleetVitoDescription:
      "چھوٹے گروپوں کے لیے ایگزیکٹو VIP ٹرانسپورٹ، کشادہ اندرونی حصے اور پریمیم آرام کے ساتھ۔",
    capacitySwitchedSprinter:
      "8 یا اس سے زیادہ مسافروں کے لیے اسپرنٹر خودکار طور پر منتخب ہو گیا",
    capacityNoVehicle: "موجودہ مسافروں کے لیے کوئی گاڑی دستیاب نہیں",
    leatherSeats: "چمڑے کی نشستیں",
    water: "پانی",
    from: "سے",
    reviewOne:
      "ویٹو ڈرائیور وقت پر تھے، بہترین گاڑی، ہر چیز بہت اچھی طرح منظم تھی۔",
    reviewTwo:
      "شاندار سروس! ڈرائیور وقت پر تھا، گاڑی بالکل صاف تھی، اور سفر بہت آرام دہ تھا۔",
    reviewThree:
      "بہترین ٹرانسفر سروس جو ہم نے انطالیہ میں استعمال کی ہے۔ انتہائی پیشہ ورانہ اور قابل اعتماد۔",
    perVehicle: "فی گاڑی",
    quoteReady: "آپ کا کوٹ تیار ہے",
    journeyTime: "سفر کا وقت",
    totalFixed: "کل مقررہ",
    confirmWhatsapp: "واٹس ایپ سے تصدیق کریں",
    bookNowCta: "ابھی بک کریں",
    backToQuote: "کوٹ پر واپس جائیں",
    yourDetails: "آپ کی تفصیلات",
    flightNumber: "فلائٹ نمبر",
    flightArrivalTime: "فلائٹ آمد کا وقت",
    notesLabel: "نوٹس",
    confirmBooking: "بکنگ کی تصدیق کریں",
    paymentError: "ادائیگی کی خرابی۔ براہ کرم دوبارہ کوشش کریں۔",
    stepRoute: "راستہ",
    stepDetails: "تفصیلات",
    stepContact: "رابطہ",
    continue: "جاری رکھیں",
    back: "پیچھے",
    reserveForPrice: "بک کریں",
    perVehicleNoteVito: "فی گاڑی — فی شخص نہیں · زیادہ سے زیادہ 6 مسافر",
    perVehicleNoteSprinter: "فی گاڑی — فی شخص نہیں · زیادہ سے زیادہ 12 مسافر",
  },
  fr: {
    navFleet: "Véhicules",
    navService: "Service",
    navRoutes: "Itinéraires",
    navReviews: "Avis",
    navContact: "Contact",
    bookNow: "Réserver",
    alwaysAvailable: "Disponible 24h/24, 7j/7",
    heroEyebrow: "Service chauffeur privé · Antalya",
    heroTitle: "Transferts aéroport premium<br />à Antalya",
    heroSubtitle:
      "Transferts privés avec chauffeur depuis l'aéroport d'Antalya vers Belek, Side, Kemer et Alanya.",
    bookTransfer: "Réserver un transfert",
    instantQuote: "Obtenir un devis",
    googleRated: "Note Google",
    trustedGuests: "Approuvé par plus de 2 500 clients",
    discover: "Découvrir",
    privateJourney: "Votre voyage privé",
    quoteTitle: "Où souhaitez-vous aller ?",
    pickup: "Lieu de prise en charge",
    destination: "Destination",
    date: "Date",
    guests: "Passagers",
    airportOption: "Aéroport d’Antalya (AYT)",
    hotelOption: "Hôtel",
    privateAddressOption: "Adresse privée",
    pickupAddress: "Adresse complète de prise en charge",
    pickupAddressPlaceholder: "Nom de l'hôtel, rue, numéro et quartier",
    dropoffAddress: "Adresse complète de destination",
    dropoffAddressPlaceholder: "Nom de l'hôtel, rue, numéro et quartier",
    selectDestination: "Choisir une destination",
    airportReturnPrice:
      "Le prix sera confirmé après vérification de l’hôtel ou de l’adresse de prise en charge.",
    oneGuest: "1 passager",
    twoGuests: "2 passagers",
    threeGuests: "3 passagers",
    fourGuests: "4 passagers",
    fiveGuests: "5 passagers",
    sixGuests: "6 passagers",
    sevenGuests: "7 passagers",
    viewQuote: "Voir le tarif",
    flightTracking: "Suivi de vol en temps réel",
    fixedPrice: "Prix fixe garanti",
    meetGreet: "Accueil personnalisé",
    speakingDrivers: "Chauffeurs parlant anglais et allemand",
    tbLicensed: "Agréé TÜRSAB",
    tbFlightTracking: "Suivi de vol",
    tbFixedPrice: "Prix fixe",
    tb247Concierge: "Conciergerie 24/7",
    tbChildSeats: "Sièges enfants inclus",
    welcomeEyebrow: "Bienvenue au plus haut niveau",
    welcomeTitle: "Voyager avec élégance.<br />Arriver sereinement.",
    welcomeBody:
      "Dès votre atterrissage, chaque détail est organisé. Votre chauffeur vous attend dans le hall des arrivées, s'occupe de vos bagages et vous accompagne jusqu'à votre véhicule privé soigneusement préparé.",
    ourStandards: "Nos standards de service",
    concierge: "Service conciergerie",
    guestsWelcomed: "Clients accueillis",
    guestRating: "Note moyenne des clients",
    privateTransfers: "Transferts privés",
    fleetEyebrow: "Notre flotte",
    fleetTitle: "Votre espace privé,<br />parfait dans les moindres détails.",
    fleetIntro:
      "Voyagez confortablement avec suffisamment d'espace pour la famille, les équipements de golf et les valises.",
    fleetVclassClass: "Business · First Class",
    fleetVclassDescription:
      "La référence des voyages de groupe raffinés : spacieux, exceptionnellement silencieux et équipé pour une arrivée sans tracas.",
    fleetVitoClass: "VIP · Grand Touring",
    fleetVitoDescription:
      "Un vaste habitacle privé pour les grandes familles, les groupes de golf et les voyageurs avec beaucoup de bagages.",
    signatureFleet: "Flotte Signature",
    passengers: "passagers",
    suitcases: "valises",
    luggageLabel: "Gros bagages",
    capacitySwitchedSprinter:
      "Passagers et bagages dépassent le Vito — passage au Mercedes Sprinter.",
    capacityNoVehicle:
      "Autant de passagers et de bagages dépasse nos véhicules. Contactez-nous sur WhatsApp.",
    leatherSeats: "Sièges en cuir premium",
    wifi: "WiFi gratuit",
    water: "Eau minérale fraîche",
    childSeats: "Sièges enfants sur demande",
    television: "Télévision à bord",
    coldDrinks: "Boissons fraîches",
    snacks: "En-cas",
    nameSignGreeting: "Accueil personnalisé à l'arrivée",
    reserveVehicle: "Réserver ce véhicule",
    insideVclass: "Intérieur Sprinter",
    interiorTitle: "Un salon privé<br />entre l'aéroport et l'hôtel.",
    serviceEyebrow: "La norme Antalya VIP",
    serviceTitle: "Plus qu'un transfert.<br />Un accueil d'exception.",
    serviceIntro:
      "Une attention digne d'un hôtel cinq étoiles, des chauffeurs locaux expérimentés et une tranquillité absolue de l'aéroport jusqu'au resort.",
    trackingTitle: "Suivi de vol",
    trackingBody:
      "Nous suivons votre vol en temps réel et ajustons automatiquement l'heure de prise en charge, sans frais supplémentaires.",
    chauffeurTitle: "Chauffeurs professionnels",
    chauffeurBody:
      "Toujours soignés, discrets et sélectionnés pour leur connaissance locale et leurs standards de service irréprochables.",
    greetTitle: "Accueil Meet & Greet",
    greetBody:
      "Après avoir récupéré vos bagages, rendez-vous dans la zone Meet & Greet J / 777. Notre équipe à l'aéroport identifiera votre réservation et vous mettra en contact avec votre chauffeur.",
    supportTitle: "Conciergerie 24/7",
    supportBody:
      "Avant, pendant et après votre voyage, une personne est toujours disponible par téléphone ou WhatsApp.",
    priceTitle: "Prix fixes",
    priceBody:
      "Le prix confirmé est le prix définitif. L'attente, le parking et les retards de vol sont inclus.",
    familyTitle: "Pour les familles",
    familyBody:
      "Sièges enfants adaptés, habitacles spacieux et aide patiente pour une arrivée familiale sereine.",
    routesEyebrow: "Nos trajets les plus populaires",
    routesTitle: "De l'aéroport d'Antalya<br />vers la Riviera turque.",
    routesIntro:
      "Tous les prix sont par véhicule, jamais par personne. L'attente gratuite est incluse.",
    golfFavourite: "Favori des golfeurs",
    from: "À partir de",
    reviewsEyebrow: "Avis clients",
    reviewsTitle: "Un service dont on<br />se souvient longtemps.",
    googleReviews: "Basé sur 387 avis Google vérifiés",
    reviewOne:
      "« Notre chauffeur a attendu malgré 90 minutes de retard. Le véhicule était impeccable, agréablement frais et déjà équipé des deux sièges enfants. Exactement l'accueil dont notre famille avait besoin. »",
    reviewTwo:
      "« Du premier contact WhatsApp à notre arrivée à Belek, absolument irréprochable. Ponctuel, discret et très professionnel. Nos sacs de golf ont aussi tenu sans problème. »",
    reviewThree:
      "« C'était comme un service de chauffeur d'hôtel, pas un taxi d'aéroport. Communication claire, véhicule impeccable et chauffeur sincèrement courtois. »",
    trustedBy: "Recommandé par les clients des meilleurs resorts d'Antalya",
    faqEyebrow: "Questions fréquentes",
    faqTitle: "Avant votre voyage.",
    faqCatArrival: "Arrivée & transfert",
    faqCatPayment: "Paiement & prix",
    faqCatVehicle: "Véhicule & bagages",
    faqReminder: "Avant votre voyage, veuillez consulter la section FAQ de notre site.",
    viewFaq: "Voir la FAQ",
    faqIntro:
      "Tout ce que vous devez savoir sur votre transfert privé depuis l'aéroport d'Antalya.",
    askQuestion: "Poser une question",
    faqOneQ: "Que se passe-t-il en cas de retard de vol ?",
    faqOneA:
      "Vous n'avez rien à faire. Nous suivons votre vol en temps réel et ajustons automatiquement l'heure de prise en charge. Les retards imputables à la compagnie aérienne ne sont jamais facturés : votre chauffeur est présent quelle que soit l'heure d'atterrissage, et les 90 premières minutes après l'atterrissage sont toujours comprises.",
    faqTwoQ:
      "J'arrive sur un vol international. Comment se déroule l'accueil ?",
    faqTwoA:
      "Après le contrôle des passeports et la récupération des bagages, suivez les autres passagers jusqu'à la zone Meet & Greet et présentez-vous à notre comptoir J / 777. Il suffit d'indiquer votre nom à notre personnel : aux heures calmes, vous verrez également votre panonceau nominatif, et aux heures de pointe, votre nom suffit. Notre équipe prévient immédiatement votre chauffeur ; il entre dans l'aéroport et se place au point de prise en charge pendant que notre personnel vous accompagne jusqu'au véhicule. L'ensemble prend environ 7 à 8 minutes.",
    faqSixQ: "J'arrive sur un vol intérieur. Où trouver mon chauffeur ?",
    faqSixA:
      "La zone Meet & Greet est réservée aux arrivées internationales ; les clients des vols intérieurs sont donc accueillis différemment : nous vous transmettons le numéro de téléphone de votre chauffeur avant le transfert. Prévenez-le simplement après l'atterrissage, il vous retrouvera dans le hall des arrivées.",
    faqSevenQ: "Que faire si personne ne se trouve au comptoir J / 777 ?",
    faqSevenA:
      "Deux membres de notre équipe sont en permanence au comptoir et leur seule mission est d'accompagner les clients jusqu'à leur véhicule. Si vous trouvez le comptoir momentanément vide, c'est qu'un collègue accompagne le client arrivé juste avant vous : chaque accompagnement dure environ 7 à 8 minutes. Patientez environ 10 minutes. Si personne n'est revenu d'ici là, écrivez-nous sur WhatsApp : nous prévenons immédiatement votre chauffeur, le faisons stationner au point le plus proche et vous guidons directement vers votre voiture, sans attente supplémentaire.",
    faqEightQ:
      "Que se passe-t-il s'il me faut plus de 90 minutes pour sortir de l'aéroport ?",
    faqEightA:
      "Les 90 premières minutes après l'atterrissage sont incluses sans frais — largement plus que ne demandent le contrôle des passeports, les bagages et la douane — et ce délai se décale automatiquement en cas de retard de vol. Ce n'est que si un motif sans lien avec votre vol vous retient plus longtemps dans le terminal qu'une participation au stationnement de 5 € par heure supplémentaire s'ajoute. Dans les faits, cela n'arrive pour ainsi dire jamais : la quasi-totalité de nos clients est sur la route bien avant.",
    faqNineQ: "Comment se déroule le paiement ?",
    faqNineA:
      "Vous réglez votre chauffeur en espèces au début du trajet – nous n'acceptons pas les cartes. Les prix sont fixés en euros (EUR) : le montant fixe correspond exactement à celui affiché lors de la réservation – par véhicule, tous frais d'aéroport et de stationnement compris, sans supplément ultérieur. Vous préférez payer en dollars américains ou en livres turques ? Écrivez-nous au préalable sur WhatsApp pour obtenir un tarif distinct, car le taux de change diffère. Votre chauffeur vous accueille, charge vos bagages et installe les sièges enfant demandés ; une fois le paiement réglé, votre trajet commence.",
    faqTenQ: "Comment rester en contact pour le transfert retour ?",
    faqTenA:
      "Une fois la date et l'heure de votre retour confirmées avec notre équipe sur WhatsApp, nous attribuons votre véhicule quelques heures avant le transfert et vous en envoyons les photos sur WhatsApp — ainsi que le numéro de votre chauffeur si vous le souhaitez. À son arrivée à l'hôtel, votre chauffeur prévient la réception, qui informe votre chambre que la voiture est prête. Nos chauffeurs n'appellent jamais directement les clients : tous les échanges passent par notre ligne d'assistance WhatsApp unique, afin que vous sachiez toujours exactement à qui vous parlez.",
    faqThreeQ: "Des sièges enfants sont-ils disponibles ?",
    faqThreeA:
      "Oui. Coques bébé, sièges enfants et rehausseurs sont disponibles gratuitement sur réservation.",
    faqFourQ:
      "Pouvez-vous transporter des sacs de golf et des bagages volumineux ?",
    faqFourA:
      "Oui. Le Sprinter et le Vito sont idéaux pour les groupes de golfeurs. Précisez vos bagages et nous planifions le véhicule adapté.",
    faqFiveQ: "Le prix affiché est-il définitif ?",
    faqFiveA:
      "Oui. Le prix affiché à la réservation est le montant que vous remettez en espèces à votre chauffeur : par véhicule, tous frais d'aéroport, stationnement et 90 premières minutes d'attente compris. Aucun frais caché.",
    contactEyebrow: "Votre voyage commence ici",
    contactTitle: "Arriver à Antalya<br />de manière exceptionnelle.",
    contactBody:
      "Réservez en ligne en moins de deux minutes ou parlez directement avec notre équipe de conciergerie 24/7.",
    whatsappUs: "WhatsApp",
    replyMinutes: "Réponse généralement en quelques minutes",
    callUs: "Appeler 24/7",
    emailUs: "E-mail conciergerie",
    replyHour: "Réponse en moins d'une heure",
    fromAirport: "Depuis l'aéroport d'Antalya",
    perVehicle: "par véhicule · prix fixe",
    footerTagline: "Services de chauffeur privé sur toute la Riviera turque.",
    explore: "Découvrir",
    information: "Informations",
    licensed: "Prestataire de transferts privés agréé · Conforme TÜRSAB",
    quoteReady: "Votre transfert privé",
    vehicle: "Véhicule",
    journeyTime: "Durée du trajet",
    totalFixed: "Prix total",
    quoteIncludes:
      "Inclus : accueil, suivi de vol, parking, 90 minutes d'attente et eau minérale.",
    confirmWhatsapp: "Confirmer via WhatsApp",
    chatWithUs: "Nous contacter",
    bookNowCta: "Réserver maintenant",
    backToQuote: "Retour",
    yourDetails: "Vos coordonnées",
    fullName: "Nom complet",
    emailLabel: "E-mail",
    phoneLabel: "Téléphone / WhatsApp",
    flightNumber: "Numéro de vol",
    flightArrivalTime: "Heure d'arrivée",
    notesLabel: "Demandes spéciales",
    confirmBooking: "Confirmer la réservation",
    bookingConfirmed: "Réservation confirmée",
    referenceLabel: "Référence",
    weWillContact:
      "Votre demande de réservation a été envoyée. Nous vous contactons dans les 30 minutes.",
    paymentError: "Paiement échoué. Veuillez réessayer.",
  },
  sv: {
    navFleet: "Fordon",
    navService: "Service",
    navRoutes: "Rutter",
    navReviews: "Recensioner",
    navContact: "Kontakt",
    bookNow: "Boka nu",
    alwaysAvailable: "Tillgänglig 24 timmar om dygnet",
    heroEyebrow: "Privat chaufförstjänst · Antalya",
    heroTitle: "Premium flygplatstransfers<br />i Antalya",
    heroSubtitle:
      "Privata transfers med chaufför från Antalya flygplats till Belek, Side, Kemer och Alanya.",
    bookTransfer: "Boka transfer",
    instantQuote: "Få pris direkt",
    googleRated: "Google-betyg",
    trustedGuests: "Anlitad av över 2 500 gäster",
    discover: "Utforska",
    privateJourney: "Din privata resa",
    quoteTitle: "Vart vill du åka?",
    pickup: "Hämtplats",
    destination: "Destination",
    date: "Datum",
    guests: "Gäster",
    airportOption: "Antalya flygplats (AYT)",
    hotelOption: "Hotell",
    privateAddressOption: "Privat adress",
    pickupAddress: "Fullständig hämtningsadress",
    pickupAddressPlaceholder: "Hotellnamn, gata, husnummer och område",
    dropoffAddress: "Fullständig destinationsadress",
    dropoffAddressPlaceholder: "Hotellnamn, gata, husnummer och område",
    selectDestination: "Välj destination",
    airportReturnPrice:
      "Priset bekräftas efter att hotellet eller hämtningsadressen har kontrollerats.",
    oneGuest: "1 gäst",
    twoGuests: "2 gäster",
    threeGuests: "3 gäster",
    fourGuests: "4 gäster",
    fiveGuests: "5 gäster",
    sixGuests: "6 gäster",
    sevenGuests: "7 gäster",
    viewQuote: "Visa pris",
    flightTracking: "Flygspårning i realtid",
    fixedPrice: "Garanterat fast pris",
    meetGreet: "Personlig välkomst",
    speakingDrivers: "Chaufförer som talar engelska och tyska",
    tbLicensed: "TÜRSAB-licensierad",
    tbFlightTracking: "Flygspårning",
    tbFixedPrice: "Fast pris",
    tb247Concierge: "Concierge dygnet runt",
    tbChildSeats: "Bilbarnstolar ingår",
    welcomeEyebrow: "Välkommen till högsta nivå",
    welcomeTitle: "Res med stil.<br />Anländ avslappnad.",
    welcomeBody:
      "Från det ögonblick ditt plan landar är varje detalj ordnad. Din chaufför väntar i ankomsthallen, tar hand om ditt bagage och eskorterar dig till ditt noggrant förberedda fordon.",
    ourStandards: "Våra servicestandarder",
    concierge: "Concierge-service",
    guestsWelcomed: "Välkomnade gäster",
    guestRating: "Genomsnittligt gästbetyg",
    privateTransfers: "Privata transfers",
    fleetEyebrow: "Vår flotta",
    fleetTitle: "Ditt privata utrymme,<br />perfekt i varje detalj.",
    fleetIntro:
      "Res bekvämt med gott om plats för familjen, golfbagaget och resväskorna.",
    fleetVclassClass: "Business · First Class",
    fleetVclassDescription:
      "Riktmärket för sofistikerade gruppresor: rymlig, exceptionellt tyst och utrustad för en smidig ankomst.",
    fleetVitoClass: "VIP · Grand Touring",
    fleetVitoDescription:
      "En rymlig privat kabin för större familjer, golfsällskap och gäster med mycket bagage.",
    signatureFleet: "Signature-flotta",
    passengers: "passagerare",
    suitcases: "resväskor",
    luggageLabel: "Stort bagage",
    capacitySwitchedSprinter:
      "Passagerare och bagage överstiger Vito — bytte till Mercedes Sprinter.",
    capacityNoVehicle:
      "Så många passagerare och bagage överstiger våra fordon. Kontakta oss på WhatsApp.",
    leatherSeats: "Premium läderstolar",
    wifi: "Gratis WiFi",
    water: "Kylt mineralvatten",
    childSeats: "Bilbarnstolar på begäran",
    television: "TV i fordonet",
    coldDrinks: "Kalla drycker",
    snacks: "Snacks",
    nameSignGreeting: "Personligt välkomnande vid ankomst",
    reserveVehicle: "Boka fordon",
    insideVclass: "Sprinter interiör",
    interiorTitle: "En privat lounge<br />mellan flygplatsen och hotellet.",
    serviceEyebrow: "Antalya VIP-standarden",
    serviceTitle: "Mer än en transfer.<br />Ett exceptionellt välkomnande.",
    serviceIntro:
      "Uppmärksamhet på hotellnivå, erfarna lokala chaufförer och fullständigt lugn från flygplats till resort.",
    trackingTitle: "Flygspårning",
    trackingBody:
      "Vi spårar din flyg i realtid och anpassar automatiskt hämtningstiden utan extra kostnad.",
    chauffeurTitle: "Professionella chaufförer",
    chauffeurBody:
      "Alltid välvårdade, diskreta och utvalda för lokal kunskap och högsta servicestandard.",
    greetTitle: "Meet & Greet",
    greetBody:
      "Din chaufför välkomnar dig i ankomsthallen och hjälper med bagaget.",
    supportTitle: "Concierge 24/7",
    supportBody:
      "Före, under och efter din resa finns alltid någon tillgänglig per telefon eller WhatsApp.",
    priceTitle: "Fasta priser",
    priceBody:
      "Det bekräftade priset är slutpriset. Väntetid, parkering och flygförseningar ingår.",
    familyTitle: "För familjer",
    familyBody:
      "Lämpliga bilbarnstolar, rymliga interiörer och tålmodig hjälp för en avslappnad familjeankomst.",
    routesEyebrow: "Våra populäraste rutter",
    routesTitle: "Från Antalya flygplats<br />till Turkiska Rivieran.",
    routesIntro:
      "Alla priser gäller per fordon, aldrig per person. Gratis väntetid ingår.",
    golfFavourite: "Golfarnas favorit",
    from: "Från",
    reviewsEyebrow: "Gästrecensioner",
    reviewsTitle: "Service som minns<br />länge efter ankomsten.",
    googleReviews: "Baserat på 387 verifierade Google-recensioner",
    reviewOne:
      "„Vår chaufför väntade trots 90 minuters försening. Fordonet var makulöst, behagligt svalt och redan utrustat med båda barnstolarna. Precis det välkomnande vår familj behövde.”",
    reviewTwo:
      "„Från första WhatsApp-kontakten till ankomst i Belek absolut förstklassigt. Punktlig, diskret och mycket professionell. Våra golfbagar fick också plats utan problem.”",
    reviewThree:
      "„Det kändes som en chaufförstjänst från ett hotell, inte en flygplatstaxibil. Tydlig kommunikation, ett makulöst fordon och en genuint artig chaufför.”",
    trustedBy: "Anlitad av gäster på ledande resorts i Antalya",
    faqEyebrow: "Vanliga frågor",
    faqTitle: "Innan din resa.",
    faqCatArrival: "Ankomst & transfer",
    faqCatPayment: "Betalning & pris",
    faqCatVehicle: "Fordon & bagage",
    faqReminder: "Läs gärna FAQ-avsnittet på vår webbplats innan din resa.",
    viewFaq: "Visa FAQ",
    faqIntro:
      "Allt du behöver veta om din privata transfer från Antalya flygplats.",
    askQuestion: "Ställ en fråga",
    faqOneQ: "Vad händer vid en flygförsening?",
    faqOneA:
      "Du behöver inte göra något. Vi följer ditt flyg i realtid och justerar upphämtningstiden automatiskt. Förseningar som beror på flygbolaget debiteras aldrig – din chaufför är på plats oavsett när du landar, och de första 90 minuterna efter landning ingår alltid.",
    faqTwoQ: "Jag kommer med ett utrikesflyg. Hur går upphämtningen till?",
    faqTwoA:
      "Efter passkontroll och bagageutlämning följer du med övriga passagerare till Meet & Greet-området och kommer till vår disk J / 777. Det räcker att du uppger ditt namn för vår personal. Vårt team meddelar din chaufför direkt; han kör in på flygplatsen och står vid upphämtningsplatsen medan vår personal följer dig till bilen. Hela processen tar ungefär 7–8 minuter.",
    faqSixQ: "Jag kommer med ett inrikesflyg. Var hittar jag min chaufför?",
    faqSixA:
      "Meet & Greet-området är endast till för utrikes ankomster, så gäster på inrikesflyg tas emot på ett annat sätt: vi skickar dig chaufförens telefonnummer före transfern. Hör bara av dig till honom när du landat – han möter dig i ankomsthallen.",
    faqSevenQ: "Vad gör jag om ingen finns vid disk J / 777?",
    faqSevenA:
      "Två av våra medarbetare tjänstgör alltid vid disken och deras enda uppgift är att följa ankommande gäster till bilen. Om disken står tom ett ögonblick betyder det att en kollega just följer gästen som anlände strax före dig – varje följe tar cirka 7–8 minuter. Vänta gärna omkring 10 minuter. Om ingen är tillbaka då, skriv till oss på WhatsApp: vi meddelar din chaufför omedelbart, låter honom stanna vid närmaste plats och leder dig direkt till bilen utan mer väntan.",
    faqEightQ:
      "Vad händer om jag behöver mer än 90 minuter för att lämna flygplatsen?",
    faqEightA:
      "De första 90 minuterna efter landning ingår utan kostnad – gott och väl mer än vad passkontroll, bagage och tull kräver – och tidsfönstret förskjuts automatiskt vid flygförsening. Endast om något som inte har med flyget att göra håller kvar dig längre i terminalen tillkommer ett parkeringsbidrag på 5 € för varje ytterligare timme. I praktiken händer det nästan aldrig: så gott som alla våra gäster är på väg långt innan dess.",
    faqNineQ: "Hur betalar jag?",
    faqNineA:
      "Du betalar din chaufför kontant i början av resan – vi tar inte kort. Priserna anges i euro (EUR): det fasta beloppet är exakt det du såg vid bokningen – per fordon, med alla flygplats- och parkeringsavgifter inkluderade, utan tillägg i efterhand. Vill du hellre betala i amerikanska dollar eller turkiska lira? Skriv till oss i förväg på WhatsApp för ett separat pris, eftersom växelkursen skiljer sig. Chauffören välkomnar dig, lastar bagaget och monterar de bilbarnstolar du beställt; när betalningen är klar börjar din resa.",
    faqTenQ: "Hur håller jag kontakten inför hemtransfern?",
    faqTenA:
      "När du har bekräftat datum och tid för hemresan med vårt team på WhatsApp tilldelar vi ditt fordon några timmar före transfern och skickar bilder på det via WhatsApp – och chaufförens telefonnummer om du vill ha det. När chauffören kommer till hotellet meddelar han receptionen, som ringer upp ditt rum och berättar att bilen står redo. Våra chaufförer ringer aldrig gästerna direkt: all kontakt går via vår enda WhatsApp-supportlinje, så du vet alltid exakt vem du talar med.",
    faqThreeQ: "Finns det bilbarnstolar?",
    faqThreeA:
      "Ja. Babyskydd, barnstolar och bälteskuddar finns tillgängliga utan extra kostnad vid förbeställning.",
    faqFourQ: "Kan golfbagar och stort bagage transporteras?",
    faqFourA:
      "Ja. Sprinter och Vito är idealiska för golfsällskap. Meddela oss om ditt bagage så planerar vi rätt fordon.",
    faqFiveQ: "Är det visade priset slutgiltigt?",
    faqFiveA:
      "Ja. Priset du ser vid bokningen är beloppet du lämnar kontant till chauffören – per fordon, inklusive alla flygplatsavgifter, parkering och de första 90 minuternas väntetid. Inga dolda avgifter.",
    contactEyebrow: "Din resa börjar här",
    contactTitle: "Anländ till Antalya<br />på ett exceptionellt sätt.",
    contactBody:
      "Boka online på under två minuter eller prata direkt med vårt concierge-team dygnet runt.",
    whatsappUs: "WhatsApp",
    replyMinutes: "Svar vanligtvis inom några minuter",
    callUs: "Ring 24/7",
    emailUs: "Concierge e-post",
    replyHour: "Svar inom en timme",
    fromAirport: "Från Antalya flygplats",
    perVehicle: "per fordon · fast pris",
    footerTagline: "Privata chaufförstjänster längs hela Turkiska Rivieran.",
    explore: "Utforska",
    information: "Information",
    licensed: "Licensierad privat transferoperatör · TÜRSAB-kompatibel",
    quoteReady: "Din privata transfer",
    vehicle: "Fordon",
    journeyTime: "Restid",
    totalFixed: "Totalt pris",
    quoteIncludes:
      "Inkluderar möte, flygbevakning, parkering, 90 minuters väntetid och vatten på flaska.",
    confirmWhatsapp: "Bekräfta via WhatsApp",
    chatWithUs: "Chatta med oss",
    bookNowCta: "Boka nu",
    backToQuote: "Tillbaka",
    yourDetails: "Dina uppgifter",
    fullName: "Fullständigt namn",
    emailLabel: "E-post",
    phoneLabel: "Telefon / WhatsApp",
    flightNumber: "Flygnummer",
    flightArrivalTime: "Ankomsttid",
    notesLabel: "Särskilda önskemål",
    confirmBooking: "Bekräfta bokning",
    bookingConfirmed: "Bokning bekräftad",
    referenceLabel: "Referensnummer",
    weWillContact:
      "Din bokningsförfrågan har skickats. Vi kontaktar dig inom 30 minuter.",
    paymentError: "Betalning misslyckades. Försök igen.",
  },
  ja: {
    navFleet: "車両",
    navService: "サービス",
    navRoutes: "ルート",
    navReviews: "口コミ",
    navContact: "お問い合わせ",
    bookNow: "今すぐ予約",
    alwaysAvailable: "年中無休・24時間対応",
    heroEyebrow: "プライベートショーファーサービス · アンタルヤ",
    heroTitle: "アンタルヤ空港からの<br />プレミアム送迎サービス",
    heroSubtitle:
      "アンタルヤ空港からベレック、シデ、ケメル、アランヤへ専属ショーファー付きプライベート送迎。",
    bookTransfer: "送迎を予約する",
    instantQuote: "料金を確認する",
    googleRated: "Google評価",
    trustedGuests: "2,500名以上のお客様にご利用いただいています",
    discover: "詳しく見る",
    privateJourney: "あなただけのプライベートな旅",
    quoteTitle: "目的地をお知らせください",
    pickup: "お迎え場所",
    destination: "目的地",
    date: "日付",
    guests: "ご利用人数",
    airportOption: "アンタルヤ空港 (AYT)",
    hotelOption: "ホテル",
    privateAddressOption: "個人住所",
    pickupAddress: "お迎え先の詳しい住所",
    pickupAddressPlaceholder: "ホテル名、通り、建物番号、地区",
    dropoffAddress: "目的地の詳しい住所",
    dropoffAddressPlaceholder: "ホテル名、通り、建物番号、地区",
    selectDestination: "目的地を選択",
    airportReturnPrice:
      "ホテルまたはお迎え先住所の確認後に料金をご案内します。",
    oneGuest: "1名",
    twoGuests: "2名",
    threeGuests: "3名",
    fourGuests: "4名",
    fiveGuests: "5名",
    sixGuests: "6名",
    sevenGuests: "7名",
    viewQuote: "料金を見る",
    flightTracking: "リアルタイムフライト追跡",
    fixedPrice: "料金固定保証",
    meetGreet: "ミート＆グリートサービス",
    speakingDrivers: "英語・ドイツ語対応ショーファー",
    tbLicensed: "TÜRSAB認可",
    tbFlightTracking: "フライト追跡",
    tbFixedPrice: "固定料金",
    tb247Concierge: "24時間コンシェルジュ",
    tbChildSeats: "チャイルドシート込み",
    welcomeEyebrow: "最高水準のサービスへようこそ",
    welcomeTitle: "上質な旅を。<br />安心してご到着を。",
    welcomeBody:
      "着陸の瞬間から、すべての細部が整っています。ショーファーが到着ロビーでお待ちし、お荷物をお預かりして、丁寧に準備された専用車両へとご案内します。",
    ourStandards: "私たちのサービス基準",
    concierge: "コンシェルジュサービス",
    guestsWelcomed: "お迎えしたゲスト数",
    guestRating: "ゲスト平均評価",
    privateTransfers: "プライベート送迎",
    fleetEyebrow: "車両ラインナップ",
    fleetTitle: "あなただけのプライベート空間。<br />細部まで完璧に。",
    fleetIntro:
      "ご家族、ゴルフ用具、荷物のための十分なスペースを備えた快適な移動をお楽しみください。",
    fleetVclassClass: "ビジネス · ファーストクラス",
    fleetVclassDescription:
      "洗練されたグループ旅行の基準。広々とした車内、卓越した静粛性、シームレスなご到着のための装備が揃っています。",
    fleetVitoClass: "VIP · グランドツーリング",
    fleetVitoDescription:
      "大家族、ゴルフグループ、大量の荷物をお持ちのゲストのための広々としたプライベートキャビン。",
    signatureFleet: "シグネチャーフリート",
    passengers: "名",
    suitcases: "個のスーツケース",
    luggageLabel: "大型荷物",
    capacitySwitchedSprinter:
      "乗客と荷物がVitoの容量を超えています — メルセデス・スプリンターに変更しました。",
    capacityNoVehicle:
      "この人数と荷物は当社の車両を超えています。WhatsAppでお問い合わせください。",
    leatherSeats: "プレミアムレザーシート",
    wifi: "無料WiFi",
    water: "冷えたミネラルウォーター",
    childSeats: "チャイルドシート（ご要望に応じて）",
    television: "車内テレビ",
    coldDrinks: "冷たいお飲み物",
    snacks: "スナック",
    nameSignGreeting: "到着ロビーでのお出迎え",
    reserveVehicle: "この車両を予約する",
    insideVclass: "Sprinterインテリア",
    interiorTitle: "空港とホテルの間の<br />プライベートラウンジ。",
    serviceEyebrow: "Antalya VIPスタンダード",
    serviceTitle: "送迎以上のもの。<br />特別なお出迎え。",
    serviceIntro:
      "5つ星ホテルレベルのアテンション、経験豊富な地元ショーファー、空港からリゾートまでの完全な安心感。",
    trackingTitle: "フライト追跡",
    trackingBody:
      "フライトをリアルタイムで追跡し、追加料金なしでお迎え時間を自動的に調整します。",
    chauffeurTitle: "プロフェッショナルショーファー",
    chauffeurBody:
      "常に清潔感があり、思いやりがあり、地元知識と最高のサービス基準のために厳選されています。",
    greetTitle: "ミート＆グリート",
    greetBody:
      "ショーファーが到着ロビーでお出迎えし、お荷物をお手伝いします。",
    supportTitle: "24/7コンシェルジュ",
    supportBody:
      "旅の前・中・後、いつでも電話またはWhatsAppでご対応いたします。",
    priceTitle: "料金固定",
    priceBody:
      "確認された料金が最終料金です。待機時間、駐車料金、フライト遅延はすべて含まれています。",
    familyTitle: "ご家族向け",
    familyBody:
      "年齢に合ったチャイルドシート、広々とした車内、ご家族の安心到着のための丁寧なサポート。",
    routesEyebrow: "人気のルート",
    routesTitle: "アンタルヤ空港から<br />トルコリビエラへ。",
    routesIntro:
      "すべての料金は車両ごと（お一人様ではありません）。無料待機時間込み。",
    golfFavourite: "ゴルファーに人気",
    from: "から",
    reviewsEyebrow: "お客様の声",
    reviewsTitle: "到着後も語り継がれる<br />サービス。",
    googleReviews: "387件のGoogle認証レビューに基づく",
    reviewOne:
      "「90分のフライト遅延にもかかわらず、ドライバーは待ってくれました。車両は完璧に清潔で心地よく冷えており、チャイルドシートも両方設置済みでした。家族が必要としていたまさにそのお出迎えでした。」",
    reviewTwo:
      "「最初のWhatsAppのやり取りからベレックへの到着まで、すべてが最高でした。時間通り、控えめで、とてもプロフェッショナル。ゴルフバッグも余裕で収まりました。」",
    reviewThree:
      "「空港タクシーではなく、ホテルのショーファーサービスのようでした。明確なコミュニケーション、完璧な車両、そして心から礼儀正しいドライバー。」",
    trustedBy: "アンタルヤの一流リゾートのゲストにご利用いただいています",
    faqEyebrow: "よくある質問",
    faqTitle: "ご旅行の前に。",
    faqCatArrival: "到着・送迎",
    faqCatPayment: "お支払い・料金",
    faqCatVehicle: "車両・お手荷物",
    faqReminder: "ご旅行の前に、当サイトのFAQをご確認ください。",
    viewFaq: "FAQを見る",
    faqIntro:
      "アンタルヤ空港からのプライベート送迎について知っておくべきこと。",
    askQuestion: "質問する",
    faqOneQ: "フライトが遅延した場合はどうなりますか？",
    faqOneA:
      "お客様に必要な手続きはございません。フライトをリアルタイムで追跡し、お迎え時刻を自動的に調整いたします。航空会社都合の遅延に追加料金は一切かかりません。到着が何時になってもドライバーがお待ちしており、着陸後最初の90分は常に料金に含まれています。",
    faqTwoQ: "国際線で到着します。お迎えの流れを教えてください。",
    faqTwoA:
      "入国審査と手荷物の受け取りを終えられたら、ほかのお客様と同じくミート＆グリートエリアへお進みいただき、当社カウンター J / 777 へお越しください。スタッフにお名前をお伝えいただくだけで結構です。スタッフがただちにドライバーへ連絡し、ドライバーは空港に入って乗車地点に車をつけます。その間、スタッフがお客様を車までご案内いたします。所要時間はおよそ7〜8分です。",
    faqSixQ: "国内線で到着します。ドライバーはどこで見つけられますか？",
    faqSixA:
      "ミート＆グリートエリアは国際線到着のお客様専用のため、国内線でお越しのお客様は別のご案内となります。送迎の前にドライバーの電話番号をお送りしますので、到着後に一言ご連絡ください。到着ロビーでお迎えいたします。",
    faqSevenQ: "カウンター J / 777 に誰もいない場合はどうすればよいですか？",
    faqSevenA:
      "カウンターには常時2名のスタッフが常駐しており、到着されたお客様を車までご案内することだけを担当しています。カウンターが一時的に空いている場合は、直前に到着されたお客様をご案内している最中です。1組あたりのご案内には約7〜8分かかります。10分ほどお待ちください。それでも誰も戻らない場合は、WhatsApp でご連絡ください。ただちにドライバーへ連絡し、最寄りの場所に車をつけさせて、お待たせすることなく車まで直接ご案内いたします。",
    faqEightQ: "空港を出るまでに90分以上かかった場合はどうなりますか？",
    faqEightA:
      "着陸後最初の90分は無料で料金に含まれています。入国審査・手荷物・税関には十分すぎる時間で、フライトが遅延した場合はこの時間も自動的にずれます。フライトと関係のない事情でターミナル内に90分を超えて留まられた場合のみ、追加1時間ごとに5ユーロの駐車協力金を申し受けます。実際にはほとんど発生いたしません。ほぼすべてのお客様がそれよりずっと早くご出発になっています。",
    faqNineQ: "支払い方法を教えてください。",
    faqNineA:
      "ご乗車時に、ドライバーへ現金でお支払いいただきます（カードはご利用いただけません）。料金はユーロ（EUR）建てで、ご予約時にご覧いただいた定額と同額です。車両単位、空港料金・駐車料金込みで、後からの追加はございません。米ドルまたはトルコリラでのお支払いをご希望の場合は、為替レートが異なるため、事前にWhatsAppでご連絡いただき、別途お見積りをお受け取りください。ドライバーがお出迎えし、お荷物を積み込み、ご希望のチャイルドシートを設置いたします。お支払いののち、ご出発となります。",
    faqTenQ: "復路の送迎ではどのように連絡を取りますか？",
    faqTenA:
      "WhatsApp で復路の日時をご確定いただいた後、送迎の数時間前に車両を手配し、WhatsApp で車両の写真をお送りします。ご希望であればドライバーの電話番号もお伝えします。ドライバーがホテルに到着するとフロントへ伝え、フロントからお部屋へ車の準備が整った旨をご連絡いたします。ドライバーがお客様に直接お電話することはありません。ご連絡はすべて WhatsApp のカスタマーサポート窓口に一本化されていますので、どなたとやり取りしているか常に明確です。",
    faqThreeQ: "チャイルドシートはありますか？",
    faqThreeA:
      "はい。乳幼児用、チャイルドシート、ジュニアシートは予約時にご要望いただければ無料でご用意します。",
    faqFourQ: "ゴルフバッグや大きな荷物は運べますか？",
    faqFourA:
      "はい。SprinterとVitoはゴルフグループに最適です。荷物の詳細をお知らせいただければ、適切な車両をご手配します。",
    faqFiveQ: "表示された料金は確定ですか？",
    faqFiveA:
      "はい。ご予約時にご覧いただいた金額を、そのままドライバーへ現金でお支払いいただきます。車両単位で、空港諸費用・駐車料金・着陸後90分までの待機時間がすべて含まれ、隠れた費用はありません。",
    contactEyebrow: "旅はここから始まります",
    contactTitle: "アンタルヤへ<br />格別の到着を。",
    contactBody:
      "2分以内にオンライン予約、または24/7コンシェルジュチームに直接お問い合わせください。",
    whatsappUs: "WhatsApp",
    replyMinutes: "通常数分以内に返信",
    callUs: "24/7電話",
    emailUs: "コンシェルジュメール",
    replyHour: "1時間以内に返信",
    fromAirport: "アンタルヤ空港から",
    perVehicle: "車両ごと · 固定料金",
    footerTagline: "トルコリビエラ全域のプライベートショーファーサービス。",
    explore: "探索する",
    information: "情報",
    licensed: "認定プライベート送迎事業者 · TÜRSAB準拠",
    quoteReady: "あなたのプライベート送迎",
    vehicle: "車両",
    journeyTime: "所要時間",
    totalFixed: "合計料金",
    quoteIncludes: "お出迎え、フライト追跡、駐車料金、90分の待機、ボトル入りの水が含まれます。",
    confirmWhatsapp: "WhatsAppで確認する",
    chatWithUs: "チャットする",
    bookNowCta: "今すぐ予約",
    backToQuote: "戻る",
    yourDetails: "お客様情報",
    fullName: "氏名",
    emailLabel: "メールアドレス",
    phoneLabel: "電話 / WhatsApp",
    flightNumber: "フライト番号",
    flightArrivalTime: "到着時刻",
    notesLabel: "特別なご要望",
    confirmBooking: "予約を確定する",
    bookingConfirmed: "予約確定",
    referenceLabel: "予約番号",
    weWillContact: "予約リクエストを送信しました。30分以内にご連絡いたします。",
    paymentError: "お支払いに失敗しました。もう一度お試しください。",
  },
  ko: {
    navFleet: "차량",
    navService: "서비스",
    navRoutes: "노선",
    navReviews: "리뷰",
    navContact: "문의",
    bookNow: "지금 예약",
    alwaysAvailable: "연중무휴 24시간 운영",
    heroEyebrow: "프라이빗 쇼퍼 서비스 · 안탈리아",
    heroTitle: "안탈리아 공항에서<br />프리미엄 공항 픽업 서비스",
    heroSubtitle:
      "안탈리아 공항에서 벨렉, 시데, 케메르, 알란야까지 전담 쇼퍼와 함께하는 프라이빗 이동.",
    bookTransfer: "셔틀 예약하기",
    instantQuote: "요금 확인하기",
    googleRated: "Google 평점",
    trustedGuests: "2,500명 이상의 고객이 이용했습니다",
    discover: "자세히 보기",
    privateJourney: "나만의 프라이빗 여행",
    quoteTitle: "어디로 모셔다 드릴까요?",
    pickup: "픽업 장소",
    destination: "목적지",
    date: "날짜",
    guests: "인원",
    airportOption: "안탈리아 공항 (AYT)",
    hotelOption: "호텔",
    privateAddressOption: "개인 주소",
    pickupAddress: "전체 픽업 주소",
    pickupAddressPlaceholder: "호텔명, 도로명, 건물 번호 및 지역",
    dropoffAddress: "전체 목적지 주소",
    dropoffAddressPlaceholder: "호텔명, 도로명, 건물 번호 및 지역",
    selectDestination: "목적지 선택",
    airportReturnPrice:
      "호텔 또는 픽업 주소를 확인한 후 요금을 안내해 드립니다.",
    oneGuest: "1명",
    twoGuests: "2명",
    threeGuests: "3명",
    fourGuests: "4명",
    fiveGuests: "5명",
    sixGuests: "6명",
    sevenGuests: "7명",
    viewQuote: "요금 보기",
    flightTracking: "실시간 항공편 추적",
    fixedPrice: "고정 요금 보장",
    meetGreet: "미트 앤 그리트 서비스",
    speakingDrivers: "영어·독일어 가능 쇼퍼",
    tbLicensed: "TÜRSAB 인증",
    tbFlightTracking: "항공편 추적",
    tbFixedPrice: "고정 요금",
    tb247Concierge: "24/7 컨시어지",
    tbChildSeats: "카시트 포함",
    welcomeEyebrow: "최고 수준의 서비스에 오신 것을 환영합니다",
    welcomeTitle: "품격 있게 이동하세요.<br />편안하게 도착하세요.",
    welcomeBody:
      "착륙하는 순간부터 모든 세부 사항이 준비되어 있습니다. 쇼퍼가 도착 로비에서 기다리며 수하물을 챙기고 세심하게 준비된 전용 차량으로 안내해 드립니다.",
    ourStandards: "저희 서비스 기준",
    concierge: "컨시어지 서비스",
    guestsWelcomed: "환영한 고객 수",
    guestRating: "평균 고객 평점",
    privateTransfers: "프라이빗 이동",
    fleetEyebrow: "차량 라인업",
    fleetTitle: "나만의 프라이빗 공간,<br />세부 사항까지 완벽하게.",
    fleetIntro:
      "가족, 골프 장비, 여행 가방을 위한 충분한 공간을 갖춘 편안한 이동을 경험하세요.",
    fleetVclassClass: "비즈니스 · 퍼스트클래스",
    fleetVclassDescription:
      "정교한 그룹 여행의 기준. 넓고, 탁월하게 조용하며, 원활한 도착을 위한 장비를 갖추고 있습니다.",
    fleetVitoClass: "VIP · 그랜드 투어링",
    fleetVitoDescription:
      "대가족, 골프 그룹, 짐이 많은 고객을 위한 넓은 프라이빗 캐빈.",
    signatureFleet: "시그니처 플릿",
    passengers: "명",
    suitcases: "개의 캐리어",
    luggageLabel: "대형 수하물",
    capacitySwitchedSprinter:
      "승객과 수하물이 비토 용량을 초과합니다 — 메르세데스 스프린터로 변경되었습니다.",
    capacityNoVehicle:
      "이 인원과 수하물은 차량 용량을 초과합니다. WhatsApp으로 문의해 주세요.",
    leatherSeats: "프리미엄 가죽 시트",
    wifi: "무료 WiFi",
    water: "시원한 생수",
    childSeats: "요청 시 카시트 제공",
    television: "차량 내 TV",
    coldDrinks: "차가운 음료",
    snacks: "스낵",
    nameSignGreeting: "도착 로비에서의 개인 영접",
    reserveVehicle: "이 차량 예약하기",
    insideVclass: "Sprinter 인테리어",
    interiorTitle: "공항과 호텔 사이의<br />프라이빗 라운지.",
    serviceEyebrow: "Antalya VIP 기준",
    serviceTitle: "단순한 이동 그 이상.<br />특별한 환영.",
    serviceIntro:
      "5성급 호텔 수준의 세심한 배려, 경험 풍부한 현지 쇼퍼, 공항에서 리조트까지 완전한 안심.",
    trackingTitle: "항공편 추적",
    trackingBody:
      "항공편을 실시간으로 추적하여 추가 비용 없이 픽업 시간을 자동으로 조정합니다.",
    chauffeurTitle: "전문 쇼퍼",
    chauffeurBody:
      "항상 단정하고 신중하며, 현지 지식과 최고 서비스 기준으로 선별된 전문가들입니다.",
    greetTitle: "미트 앤 그리트",
    greetBody:
      "쇼퍼가 도착 로비에서 환영하며 수하물을 도와드립니다.",
    supportTitle: "24/7 컨시어지",
    supportBody:
      "여행 전, 중, 후 언제든지 전화 또는 WhatsApp으로 담당자와 연결됩니다.",
    priceTitle: "고정 요금",
    priceBody:
      "확인된 요금이 최종 요금입니다. 대기 시간, 주차비, 항공편 지연이 모두 포함됩니다.",
    familyTitle: "가족을 위한",
    familyBody:
      "연령에 맞는 카시트, 넓은 실내, 편안한 가족 도착을 위한 세심한 도움.",
    routesEyebrow: "인기 노선",
    routesTitle: "안탈리아 공항에서<br />터키 리비에라까지.",
    routesIntro:
      "모든 요금은 차량 기준(1인 기준 아님)입니다. 무료 대기 시간 포함.",
    golfFavourite: "골퍼들의 인기 선택",
    from: "부터",
    reviewsEyebrow: "고객 후기",
    reviewsTitle: "도착 후에도 오래 기억되는<br />서비스.",
    googleReviews: "387건의 Google 인증 리뷰 기준",
    reviewOne:
      '"90분 지연에도 불구하고 기사님이 기다려 주셨습니다. 차량은 완벽하게 청결하고 시원했으며 카시트 두 개도 이미 설치되어 있었습니다. 저희 가족에게 꼭 필요한 환영이었습니다."',
    reviewTwo:
      '"첫 WhatsApp 연락부터 벨렉 도착까지 모든 것이 최고였습니다. 시간 엄수, 세심함, 매우 전문적. 골프백도 여유롭게 들어갔습니다."',
    reviewThree:
      '"공항 택시가 아닌 호텔 쇼퍼 서비스 같았습니다. 명확한 소통, 완벽한 차량, 진심으로 예의 바른 기사님."',
    trustedBy: "안탈리아 주요 리조트 고객들이 선택했습니다",
    faqEyebrow: "자주 묻는 질문",
    faqTitle: "여행 전에.",
    faqCatArrival: "도착 및 이동",
    faqCatPayment: "결제 및 요금",
    faqCatVehicle: "차량 및 수하물",
    faqReminder: "여행 전에 저희 웹사이트의 FAQ를 확인해 주세요.",
    viewFaq: "FAQ 보기",
    faqIntro: "안탈리아 공항 프라이빗 픽업에 대해 알아야 할 모든 것.",
    askQuestion: "질문하기",
    faqOneQ: "항공편이 지연되면 어떻게 되나요?",
    faqOneA:
      "고객님께서 하실 일은 없습니다. 항공편을 실시간으로 추적해 픽업 시간을 자동으로 조정합니다. 항공사 사정으로 인한 지연에는 추가 요금이 전혀 없으며, 언제 도착하시든 기사가 대기하고 있습니다. 착륙 후 첫 90분은 언제나 요금에 포함됩니다.",
    faqTwoQ: "국제선으로 도착합니다. 미팅 절차는 어떻게 되나요?",
    faqTwoA:
      "입국 심사와 수하물 수령을 마치신 후 다른 승객들과 함께 미트 앤 그리트(Meet & Greet) 구역으로 이동하셔서 저희 J / 777 카운터로 오십시오. 직원에게 성함만 말씀해 주시면 됩니다. 한산한 시간대에는 성함이 적힌 안내판도 준비되어 있으며, 혼잡한 시간대에는 성함을 말씀해 주시는 것으로 충분합니다. 직원이 즉시 기사에게 연락하면 기사는 공항으로 진입해 픽업 지점에 차를 대고, 그동안 직원이 고객님을 차량까지 안내해 드립니다. 전체 과정은 약 7~8분 소요됩니다.",
    faqSixQ: "국내선으로 도착합니다. 기사를 어디에서 만나나요?",
    faqSixA:
      "미트 앤 그리트 구역은 국제선 도착 승객만을 위한 공간이므로 국내선 고객님은 다른 방식으로 안내해 드립니다. 출발 전에 기사 연락처를 보내 드리니, 도착하신 후 간단히 알려 주시면 기사가 도착 로비에서 모시겠습니다.",
    faqSevenQ: "J / 777 카운터에 아무도 없으면 어떻게 해야 하나요?",
    faqSevenA:
      "카운터에는 항상 두 명의 직원이 상주하며, 도착하신 고객님을 차량까지 안내하는 것이 유일한 업무입니다. 카운터가 잠시 비어 있다면 직전에 도착한 고객을 안내 중이라는 뜻이며, 한 번 안내에 약 7~8분이 소요됩니다. 10분 정도 기다려 주십시오. 그때까지 아무도 돌아오지 않으면 WhatsApp으로 메시지를 보내 주십시오. 즉시 기사에게 연락해 가장 가까운 지점에 차를 대도록 하고, 더 기다리실 필요 없이 차량까지 바로 안내해 드리겠습니다.",
    faqEightQ: "공항을 나오는 데 90분 이상 걸리면 어떻게 되나요?",
    faqEightA:
      "착륙 후 첫 90분은 무료로 포함되어 있습니다. 입국 심사와 수하물, 세관 절차에 충분하고도 남는 시간이며, 항공편이 지연되면 이 시간도 자동으로 조정됩니다. 항공편과 무관한 사유로 터미널에 90분을 넘겨 머무르시는 경우에만 추가 1시간마다 5유로의 주차 비용이 더해집니다. 실제로는 거의 발생하지 않으며, 대부분의 고객님은 그보다 훨씬 이전에 출발하십니다.",
    faqNineQ: "결제는 어떻게 하나요?",
    faqNineA:
      "출발할 때 기사에게 현금으로 결제하십니다(카드는 받지 않습니다). 요금은 유로(EUR) 기준이며, 예약 시 확인하신 고정 금액과 동일합니다. 차량 단위로 모든 공항 및 주차 비용이 포함되어 있고 이후 추가되는 항목은 없습니다. 미국 달러나 터키 리라로 결제를 원하시면 환율이 다르므로 미리 WhatsApp으로 연락 주시면 별도의 금액을 안내해 드립니다. 기사가 고객님을 맞이해 짐을 싣고 요청하신 카시트를 장착해 드리며, 결제가 끝나면 여정이 시작됩니다.",
    faqTenQ: "돌아가는 차량과는 어떻게 연락하나요?",
    faqTenA:
      "WhatsApp으로 저희 팀과 복귀 날짜와 시간을 확정하시면, 이동 몇 시간 전에 차량을 배정하고 WhatsApp으로 차량 사진을 보내 드립니다. 원하시면 기사 연락처도 함께 전달해 드립니다. 기사가 호텔에 도착하면 프런트에 알리고, 프런트에서 객실로 차량이 준비되었음을 안내해 드립니다. 저희 기사는 고객님께 직접 전화하지 않으며, 모든 연락은 WhatsApp 고객지원 창구 한 곳을 통해 이루어집니다. 그래서 누구와 대화하고 있는지 항상 분명합니다.",
    faqThreeQ: "카시트를 이용할 수 있나요?",
    faqThreeA:
      "네. 신생아용 카시트, 아동용 카시트, 부스터 시트는 예약 시 요청하시면 무료로 제공됩니다.",
    faqFourQ: "골프백과 대형 수하물도 운반할 수 있나요?",
    faqFourA:
      "네. Sprinter와 Vito는 골프 그룹에 이상적입니다. 수하물 정보를 알려주시면 적합한 차량을 준비합니다.",
    faqFiveQ: "표시된 요금이 최종 요금인가요?",
    faqFiveA:
      "네. 예약 시 확인하신 금액을 그대로 기사에게 현금으로 전달하시면 됩니다. 차량 단위이며 모든 공항 비용, 주차료, 착륙 후 첫 90분의 대기 시간이 포함되어 있습니다. 숨겨진 요금은 없습니다.",
    contactEyebrow: "여행은 여기서 시작됩니다",
    contactTitle: "안탈리아에<br />특별하게 도착하세요.",
    contactBody:
      "2분 이내에 온라인 예약하거나 24/7 컨시어지 팀에 직접 문의하세요.",
    whatsappUs: "WhatsApp",
    replyMinutes: "보통 몇 분 내로 답변",
    callUs: "24/7 전화",
    emailUs: "컨시어지 이메일",
    replyHour: "1시간 내 답변",
    fromAirport: "안탈리아 공항에서",
    perVehicle: "차량 기준 · 고정 요금",
    footerTagline: "터키 리비에라 전역의 프라이빗 쇼퍼 서비스.",
    explore: "탐색",
    information: "정보",
    licensed: "인증된 프라이빗 이동 사업자 · TÜRSAB 준수",
    quoteReady: "나의 프라이빗 이동",
    vehicle: "차량",
    journeyTime: "소요 시간",
    totalFixed: "총 요금",
    quoteIncludes: "미팅 서비스, 항공편 추적, 주차, 90분 대기, 생수가 포함됩니다.",
    confirmWhatsapp: "WhatsApp으로 확인하기",
    chatWithUs: "채팅하기",
    bookNowCta: "지금 예약",
    backToQuote: "뒤로",
    yourDetails: "고객 정보",
    fullName: "성명",
    emailLabel: "이메일",
    phoneLabel: "전화 / WhatsApp",
    flightNumber: "항공편 번호",
    flightArrivalTime: "도착 시간",
    notesLabel: "특별 요청",
    confirmBooking: "예약 확정하기",
    bookingConfirmed: "예약 확정",
    referenceLabel: "예약 번호",
    weWillContact: "예약 요청이 전송되었습니다. 30분 내로 연락드리겠습니다.",
    paymentError: "결제에 실패했습니다. 다시 시도해 주세요.",
  },
  ar: {
    navFleet: "أسطولنا",
    navService: "الخدمات",
    navRoutes: "الوجهات",
    navReviews: "التقييمات",
    navContact: "اتصل بنا",
    bookNow: "احجز الآن",
    alwaysAvailable: "متاحون على مدار الساعة، كل يوم",
    heroEyebrow: "خدمة سائق خاص · أنطاليا",
    heroTitle: "خدمة نقل فاخرة من المطار<br />في أنطاليا",
    heroSubtitle:
      "خدمة نقل خاصة مع سائق من مطار أنطاليا إلى بيليك وسيده وكيمر وألانيا.",
    campaignBadge: "عرض الحجز عبر الإنترنت",
    campaignDiscount: "سعر خاص",
    campaignScope: "على جميع أسعار النقل",
    campaignApplied: "تم تطبيق السعر الخاص عبر الإنترنت",
    onlineDiscountShort: "سعر خاص عبر الإنترنت",
    discountPricesShown: "الأسعار المعروضة هي أسعار خاصة عبر الإنترنت",
    bookTransfer: "احجز خدمة النقل",
    instantQuote: "احصل على السعر فوراً",
    googleRated: "تقييم Google",
    trustedGuests: "اختيار أكثر من 2,500 ضيف",
    discover: "اكتشف المزيد",
    privateJourney: "رحلتك الخاصة",
    quoteTitle: "إلى أين نوصلك؟",
    pickup: "مكان الاستقبال",
    destination: "الوجهة",
    date: "التاريخ",
    tripType: "نوع الرحلة",
    oneWay: "ذهاب فقط",
    roundTrip: "ذهاب وعودة",
    roundTripHint:
      "في رحلة الذهاب والعودة، تكون رحلة العودة على المسار نفسه بالاتجاه المعاكس.",
    returnDate: "تاريخ العودة",
    returnPickupTime: "وقت الاستقبال للعودة",
    returnFlightNumber: "رقم رحلة العودة",
    arrivalDate: "تاريخ الوصول",
    arrivalFlightTime: "وقت وصول الرحلة",
    arrivalFlightNumber: "رقم رحلة الوصول",
    roundTripPriceNote: "ذهاب وعودة · رحلتان",
    guests: "الركاب",
    airportOption: "مطار أنطاليا (AYT)",
    hotelOption: "فندق",
    privateAddressOption: "عنوان خاص",
    pickupAddress: "عنوان الاستقبال الكامل",
    pickupAddressPlaceholder: "اسم الفندق، الشارع، رقم المبنى والمنطقة",
    dropoffAddress: "عنوان الوصول الكامل",
    dropoffAddressPlaceholder: "اسم الفندق، الشارع، رقم المبنى والمنطقة",
    dropoffAddressRequired: "يجب أن يتراوح عنوان الوصول بين 6 و160 حرفاً.",
    customDestinationPrice: "سيتم تأكيد السعر بعد مراجعة عنوان الوصول.",
    selectDestination: "اختر الوجهة",
    airportReturnPrice:
      "سيتم تأكيد السعر بعد مراجعة الفندق أو عنوان الاستقبال.",
    oneGuest: "راكب واحد",
    twoGuests: "راكبان",
    threeGuests: "3 ركاب",
    fourGuests: "4 ركاب",
    fiveGuests: "5 ركاب",
    sixGuests: "6 ركاب",
    sevenGuests: "7 ركاب",
    viewQuote: "عرض السعر",
    flightTracking: "تتبع الرحلة مباشرة",
    fixedPrice: "سعر ثابت مضمون",
    meetGreet: "استقبال شخصي",
    speakingDrivers: "سائقون يتحدثون الإنجليزية والألمانية",
    tbLicensed: "مرخصون من TÜRSAB",
    tbFlightTracking: "تتبع الرحلات",
    tbFixedPrice: "سعر ثابت",
    tb247Concierge: "كونسيرج 24/7",
    tbChildSeats: "مقاعد أطفال مشمولة",
    welcomeEyebrow: "مرحباً بك في مستوى أرقى من الخدمة",
    welcomeTitle: "سافر بأناقة.<br />وصل براحة.",
    welcomeBody:
      "منذ لحظة هبوطك، نعتني بكل التفاصيل. ينتظرك سائقك في صالة الوصول، ويساعدك في الأمتعة، ويرافقك إلى سيارتك الخاصة المجهزة بعناية.",
    ourStandards: "معايير خدمتنا",
    concierge: "خدمة الكونسيرج",
    guestsWelcomed: "الضيوف الذين استقبلناهم",
    guestRating: "متوسط تقييم الضيوف",
    privateTransfers: "رحلات نقل خاصة",
    fleetEyebrow: "أسطولنا",
    fleetTitle: "مساحتك الخاصة،<br />مصممة بأدق التفاصيل.",
    fleetIntro: "سافر براحة مع مساحة واسعة للعائلة وحقائب الغولف والأمتعة.",
    fleetVclassClass: "درجة رجال الأعمال · الدرجة الأولى",
    fleetVclassDescription:
      "وسيلة نقل VIP رحبة للمجموعات الكبيرة، مع مساحة واسعة للركاب والأمتعة.",
    fleetVitoClass: "VIP · جراند تورينغ",
    fleetVitoDescription: "مقصورة خاصة ومريحة للعائلات والمجموعات الصغيرة.",
    signatureFleet: "الأسطول المميز",
    passengers: "ركاب",
    suitcases: "حقائب",
    luggageLabel: "أمتعة كبيرة",
    capacitySwitchedSprinter:
      "عدد الركاب والأمتعة يتجاوز سعة Vito — تم التبديل إلى Mercedes Sprinter.",
    capacityNoVehicle:
      "هذا العدد من الركاب والأمتعة يتجاوز سعة مركباتنا. يرجى التواصل معنا عبر WhatsApp.",
    leatherSeats: "مقاعد جلدية فاخرة",
    wifi: "واي فاي مجاني",
    water: "مياه معدنية باردة",
    childSeats: "مقاعد أطفال عند الطلب",
    television: "تلفاز داخل السيارة",
    coldDrinks: "مشروبات باردة",
    snacks: "وجبات خفيفة",
    nameSignGreeting: "استقبال شخصي عند الوصول",
    reserveVehicle: "احجز هذه السيارة",
    insideVclass: "مقصورة Sprinter الداخلية",
    interiorTitle: "صالة خاصة بين<br />المطار والفندق.",
    serviceEyebrow: "معيار Antalya VIP",
    serviceTitle: "أكثر من مجرد نقل.<br />إنه ترحيب استثنائي.",
    serviceIntro:
      "عناية بمستوى الفنادق الفاخرة، وسائقون محليون ذوو خبرة، وراحة تامة من المطار إلى المنتجع.",
    trackingTitle: "تتبع الرحلة",
    trackingBody:
      "نتابع رحلتك مباشرة ونعدّل وقت الاستقبال تلقائياً من دون أي تكلفة إضافية.",
    chauffeurTitle: "سائقون محترفون",
    chauffeurBody:
      "سائقون أنيقون وكتومون دائماً، تم اختيارهم لمعرفتهم المحلية والتزامهم بأعلى معايير الخدمة.",
    greetTitle: "الاستقبال والترحيب",
    greetBody:
      "يستقبلك سائقك في صالة الوصول ويساعدك في حمل الأمتعة.",
    supportTitle: "كونسيرج 24/7",
    supportBody:
      "قبل رحلتك وأثناءها وبعدها، يمكنك دائماً التواصل مع شخص حقيقي عبر الهاتف أو WhatsApp.",
    priceTitle: "أسعار ثابتة",
    priceBody:
      "السعر المؤكد هو السعر النهائي. يشمل وقت الانتظار ومواقف السيارات وتأخير الرحلات.",
    familyTitle: "مناسب للعائلات",
    familyBody:
      "مقاعد أطفال مناسبة للأعمار، ومساحات داخلية واسعة، ومساعدة هادئة لوصول عائلي مريح.",
    routesEyebrow: "رحلاتنا الأكثر طلباً",
    routesTitle: "من مطار أنطاليا<br />إلى الريفييرا التركية.",
    routesIntro: "جميع الأسعار للسيارة وليس للشخص، وتشمل وقت انتظار مجاني.",
    golfFavourite: "المفضل لدى لاعبي الغولف",
    from: "ابتداءً من",
    reviewsEyebrow: "آراء الضيوف",
    reviewsTitle: "خدمة تبقى في الذاكرة<br />بعد الوصول.",
    googleReviews: "استناداً إلى 387 تقييماً موثقاً على Google",
    reviewOne:
      '"انتظرنا السائق رغم تأخر الرحلة 90 دقيقة. كانت السيارة نظيفة تماماً وباردة، ومقعدا الأطفال مجهزين مسبقاً. كان هذا بالضبط ما احتاجته عائلتنا عند الوصول."',
    reviewTwo:
      '"من أول تواصل عبر WhatsApp حتى وصولنا إلى بيليك، كانت الخدمة ممتازة. التزام بالمواعيد واحترافية عالية، مع مساحة مريحة لحقائب الغولف."',
    reviewThree:
      '"شعرنا وكأنها خدمة سائق فندق فاخر وليست سيارة أجرة من المطار. تواصل واضح، وسيارة مثالية، وسائق مهذب بصدق."',
    trustedBy: "موثوق من ضيوف أبرز منتجعات أنطاليا",
    faqEyebrow: "الأسئلة الشائعة",
    faqTitle: "قبل رحلتك.",
    faqCatArrival: "الوصول والنقل",
    faqCatPayment: "الدفع والسعر",
    faqCatVehicle: "المركبة والأمتعة",
    faqReminder: "قبل رحلتك، يُرجى الاطلاع على قسم الأسئلة الشائعة على موقعنا.",
    viewFaq: "عرض الأسئلة الشائعة",
    faqIntro: "كل ما تحتاج إلى معرفته عن خدمة النقل الخاصة من مطار أنطاليا.",
    askQuestion: "اطرح سؤالاً",
    faqOneQ: "ماذا يحدث إذا تأخرت رحلتي؟",
    faqOneA:
      "لا يتطلب الأمر منك شيئًا. نتابع رحلتك لحظة بلحظة ونعدّل موعد الاستقبال تلقائيًا. لا نفرض أي رسوم إضافية على التأخيرات الناتجة عن شركة الطيران؛ سائقك في انتظارك مهما كان وقت الهبوط، وأول 90 دقيقة بعد الهبوط مشمولة دائمًا في السعر.",
    faqTwoQ: "سأصل على رحلة دولية. كيف تتم عملية الاستقبال؟",
    faqTwoA:
      "بعد إنهاء إجراءات الجوازات واستلام الأمتعة، توجّه مع بقية المسافرين إلى منطقة الاستقبال Meet & Greet وتعال إلى مكتبنا رقم J / 777. يكفي أن تذكر اسمك لموظفينا. يبلّغ فريقنا سائقك على الفور، فيدخل إلى المطار ويقف في نقطة الاستقبال، بينما يرافقك موظفنا إلى السيارة. تستغرق العملية كاملة نحو 7 إلى 8 دقائق.",
    faqSixQ: "سأصل على رحلة داخلية. أين أجد سائقي؟",
    faqSixA:
      "منطقة الاستقبال Meet & Greet مخصصة للرحلات الدولية فقط، لذلك نتعامل مع ضيوف الرحلات الداخلية بطريقة مختلفة: نرسل إليك رقم هاتف السائق قبل موعد النقل. ما عليك سوى إبلاغه بعد الهبوط، وسيستقبلك في صالة القدوم.",
    faqSevenQ: "ماذا أفعل إذا لم يكن أحد في المكتب J / 777؟",
    faqSevenA:
      "يعمل في المكتب موظفان بشكل دائم، ومهمتهما الوحيدة هي مرافقة الضيوف القادمين إلى سياراتهم. إذا وجدت المكتب خاليًا للحظات، فهذا يعني أن أحد الزملاء يرافق الضيف الذي وصل قبلك مباشرة؛ إذ تستغرق كل مرافقة نحو 7 إلى 8 دقائق. يرجى الانتظار نحو 10 دقائق. وإذا لم يعد أحد خلال هذه المدة، راسلنا عبر WhatsApp: سنبلغ سائقك فورًا ونطلب منه التوقف في أقرب نقطة، ونرشدك مباشرة إلى سيارتك دون مزيد من الانتظار.",
    faqEightQ: "ماذا لو احتجت إلى أكثر من 90 دقيقة للخروج من المطار؟",
    faqEightA:
      "أول 90 دقيقة بعد هبوط الطائرة مشمولة مجانًا، وهي مدة تزيد عمّا تتطلبه إجراءات الجوازات والأمتعة والجمارك، وتتحرك تلقائيًا مع أي تأخير في الرحلة. وفقط إذا أبقاك داخل الصالة سبب لا علاقة له برحلتك مدة أطول، تُضاف مساهمة وقوف بقيمة 5 يورو عن كل ساعة إضافية. عمليًا لا يحدث ذلك تقريبًا؛ فجميع ضيوفنا تقريبًا ينطلقون قبل ذلك بكثير.",
    faqNineQ: "كيف تتم عملية الدفع؟",
    faqNineA:
      "تدفع لسائقك نقدًا في بداية الرحلة — لا نقبل البطاقات. الأسعار محددة باليورو (EUR): المبلغ الثابت هو نفسه تمامًا الذي رأيته عند الحجز، لكل مركبة، شاملًا جميع رسوم المطار والوقوف، دون أي إضافات لاحقة. هل تفضّل الدفع بالدولار الأمريكي أو الليرة التركية؟ راسِلنا مسبقًا عبر واتساب للحصول على سعر منفصل، لأن سعر الصرف يختلف. يستقبلك السائق ويحمّل أمتعتك ويركّب مقاعد الأطفال التي طلبتها، وبعد إتمام الدفع تبدأ رحلتك.",
    faqTenQ: "كيف أبقى على تواصل في رحلة العودة؟",
    faqTenA:
      "بعد تأكيد تاريخ العودة وموعدها مع فريقنا عبر WhatsApp، نخصص مركبتك قبل الموعد بساعات ونرسل إليك صورها عبر WhatsApp، ورقم هاتف السائق أيضًا إذا رغبت. وعند وصول السائق إلى الفندق يُبلغ الاستقبال، ويقوم الاستقبال بإخطار غرفتك بأن السيارة جاهزة. لا يتصل سائقونا بالضيوف مباشرة أبدًا: يمر التواصل كله عبر خط دعم العملاء الوحيد على WhatsApp، لتعرف دائمًا بالضبط مع من تتحدث.",
    faqThreeQ: "هل تتوفر مقاعد للأطفال؟",
    faqThreeA:
      "نعم. تتوفر مقاعد للرضع والأطفال والمقاعد المعززة مجاناً عند طلبها أثناء الحجز.",
    faqFourQ: "هل يمكن نقل حقائب الغولف والأمتعة الكبيرة؟",
    faqFourA:
      "نعم. سيارات Sprinter وVito مناسبة لمجموعات الغولف. أخبرنا بأمتعتك لنجهز السيارة المناسبة.",
    faqFiveQ: "هل السعر المعروض نهائي؟",
    faqFiveA:
      "نعم. السعر الذي تراه عند الحجز هو المبلغ الذي تسلّمه للسائق نقدًا: لكل مركبة، شاملًا جميع رسوم المطار والوقوف وأول 90 دقيقة من الانتظار. لا توجد رسوم خفية.",
    contactEyebrow: "رحلتك تبدأ هنا",
    contactTitle: "ابدأ وصولك إلى أنطاليا<br />بطريقة استثنائية.",
    contactBody:
      "احجز عبر الإنترنت خلال دقيقتين، أو تحدث مباشرة إلى فريق الكونسيرج 24/7.",
    whatsappUs: "تواصل عبر WhatsApp",
    replyMinutes: "نرد عادةً خلال دقائق",
    callUs: "اتصل بنا 24/7",
    emailUs: "بريد الكونسيرج",
    replyHour: "نرد خلال ساعة",
    fromAirport: "من مطار أنطاليا",
    perVehicle: "لكل سيارة · سعر ثابت",
    footerTagline: "خدمة سائق خاص في أنحاء الريفييرا التركية.",
    explore: "استكشف",
    information: "معلومات",
    licensed: "مزود نقل خاص مرخص · متوافق مع TÜRSAB",
    quoteReady: "رحلتك الخاصة",
    vehicle: "السيارة",
    journeyTime: "مدة الرحلة",
    totalFixed: "الإجمالي الثابت",
    quoteIncludes:
      "يشمل الاستقبال وتتبع الرحلة ووقوف السيارة و90 دقيقة انتظار ومياه معبأة.",
    confirmWhatsapp: "التأكيد عبر WhatsApp",
    chatWithUs: "تحدث معنا",
    bookNowCta: "احجز الآن",
    backToQuote: "رجوع",
    yourDetails: "بياناتك",
    fullName: "الاسم الكامل",
    emailLabel: "البريد الإلكتروني",
    phoneLabel: "الهاتف / WhatsApp",
    flightNumber: "رقم الرحلة",
    flightArrivalTime: "وقت الوصول",
    notesLabel: "طلبات خاصة",
    confirmBooking: "تأكيد الحجز",
    bookingConfirmed: "تم تأكيد الحجز",
    referenceLabel: "الرقم المرجعي",
    weWillContact: "تم إرسال طلب حجزك. سنتواصل معك خلال 30 دقيقة.",
    paymentError: "تعذر إتمام الدفع. يرجى المحاولة مرة أخرى.",
  },
};

const paymentTranslations = {
  en: {
    paymentMethod: "Choose payment method",
    cashPayment: "Pay in the vehicle",
    recommended: "Recommended",
    cashPaymentDescription:
      "No online prepayment. You pay the fixed total to your driver in cash at the start of the journey.",
    confirmCashBooking: "Confirm booking — pay in vehicle",
    perVehicleNote: "Per vehicle — not per person · Up to 7 passengers",
    meetGreetNote: "Airport Meet &amp; Greet · Meeting point J / 777",
    stepRoute: "Route",
    stepDetails: "Details",
    stepContact: "Contact",
    reserveForPrice: "Reserve",
    continue: "Continue",
    back: "Back",
    perVehicleNoteVito: "Per vehicle — not per person · Up to 6 passengers",
    perVehicleNoteSprinter:
      "Per vehicle — not per person · Up to 12 passengers",
    perVehicle: "fixed · per vehicle",
    requestQuote: "Request a price quote",
    cashConfirmation:
      "Your booking is confirmed. You pay the fixed total to your driver in cash at the start of the journey.",
    bookingError: "Your booking could not be completed. Please try again.",
    chooseTime: "Choose time",
    formIncomplete: "Please complete the highlighted fields.",
    requiredField: "This field is required.",
    destinationRequired: "Please select a destination.",
    dateInvalid: "Please choose today or a future date.",
    emailInvalid: "Please enter a valid email address.",
    nameInvalid: "Please enter a valid full name.",
    phoneInvalid:
      "Please enter a valid number including the country code (for example +49).",
    flightInvalid: "Please enter a valid flight number.",
    pickupAddressRequired:
      "The pick-up address must be between 6 and 160 characters.",
    dropoffAddress: "Full drop-off address",
    dropoffAddressPlaceholder:
      "Hotel name, street, building number and district",
    dropoffAddressRequired:
      "The drop-off address must be between 6 and 160 characters.",
    addressesMustDiffer: "Pick-up and drop-off addresses must be different.",
    customDestinationPrice:
      "The price will be confirmed after we check the drop-off address.",
    hotelNameLabel: "Hotel name",
    hotelNamePlaceholder: "Hotel or accommodation name",
    hotelNameRequired: "Please enter the hotel name.",
    childSeatLabel: "Child seats",
    childSeatNone: "No child seat",
    oneChildSeat: "1 child seat",
    twoChildSeats: "2 child seats",
    threeChildSeats: "3 child seats",
    fourChildSeats: "4 child seats",
  },
  de: {
    paymentMethod: "Zahlungsart wählen",
    cashPayment: "Im Fahrzeug bezahlen",
    recommended: "Empfohlen",
    cashPaymentDescription:
      "Keine Online-Vorauszahlung. Den Festpreis zahlen Sie zu Beginn der Fahrt bar an Ihren Chauffeur.",
    confirmCashBooking: "Buchung bestätigen — im Fahrzeug zahlen",
    perVehicleNote: "Pro Fahrzeug — nicht pro Person · Bis zu 7 Personen",
    meetGreetNote: "Airport Meet &amp; Greet · Treffpunkt J / 777",
    stepRoute: "Route",
    stepDetails: "Details",
    stepContact: "Kontakt",
    continue: "Weiter",
    back: "Zurück",
    reserveForPrice: "Reservieren",
    perVehicleNoteVito: "Pro Fahrzeug — nicht pro Person · Bis zu 6 Personen",
    perVehicleNoteSprinter:
      "Pro Fahrzeug — nicht pro Person · Bis zu 12 Personen",
    requestQuote: "Preisangebot anfordern",
    cashConfirmation:
      "Ihre Buchung ist bestätigt. Den Festpreis zahlen Sie zu Beginn der Fahrt bar an Ihren Chauffeur.",
    bookingError:
      "Ihre Buchung konnte nicht abgeschlossen werden. Bitte versuchen Sie es erneut.",
    chooseTime: "Uhrzeit wählen",
    formIncomplete: "Bitte füllen Sie die markierten Felder aus.",
    requiredField: "Dieses Feld ist erforderlich.",
    destinationRequired: "Bitte wählen Sie ein Ziel.",
    dateInvalid: "Bitte wählen Sie heute oder ein zukünftiges Datum.",
    emailInvalid: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    nameInvalid: "Bitte geben Sie einen gültigen vollständigen Namen ein.",
    phoneInvalid:
      "Bitte geben Sie eine gültige Nummer mit Ländervorwahl ein (zum Beispiel +49).",
    flightInvalid: "Bitte geben Sie eine gültige Flugnummer ein.",
    pickupAddressRequired:
      "Die Abholadresse muss zwischen 6 und 160 Zeichen lang sein.",
    dropoffAddressRequired:
      "Die Zieladresse muss zwischen 6 und 160 Zeichen lang sein.",
    addressesMustDiffer: "Abhol- und Zieladresse müssen unterschiedlich sein.",
    customDestinationPrice:
      "Der Preis wird nach Prüfung der Zieladresse bestätigt.",
    hotelNameLabel: "Hotelname",
    hotelNamePlaceholder: "Hotel- oder Unterkunftsname",
    hotelNameRequired: "Bitte geben Sie den Hotelnamen ein.",
    childSeatLabel: "Kindersitze",
    childSeatNone: "Kein Kindersitz",
    oneChildSeat: "1 Kindersitz",
    twoChildSeats: "2 Kindersitze",
    threeChildSeats: "3 Kindersitze",
    fourChildSeats: "4 Kindersitze",
  },
  tr: {
    paymentMethod: "Ödeme yöntemini seçin",
    cashPayment: "Araçta öde",
    recommended: "Önerilen",
    cashPaymentDescription:
      "Online ön ödeme yok. Sabit tutarı yolculuğun başında şoförünüze nakit olarak ödersiniz.",
    confirmCashBooking: "Rezervasyonu onayla — araçta öde",
    perVehicleNote: "Araç başına — kişi başına değil · 7 yolcuya kadar",
    meetGreetNote: "Havalimanı Karşılama · Buluşma noktası J / 777",
    stepRoute: "Rota",
    stepDetails: "Detaylar",
    stepContact: "İletişim",
    continue: "Devam",
    back: "Geri",
    reserveForPrice: "Rezerve et",
    perVehicleNoteVito: "Araç başına — kişi başına değil · 6 yolcuya kadar",
    perVehicleNoteSprinter:
      "Araç başına — kişi başına değil · 12 yolcuya kadar",
    requestQuote: "Fiyat teklifi al",
    cashConfirmation:
      "Rezervasyonunuz onaylandı. Sabit toplam tutarı yolculuğun başında şoförünüze nakit olarak ödersiniz.",
    bookingError: "Rezervasyonunuz tamamlanamadı. Lütfen tekrar deneyin.",
    chooseTime: "Saat seçin",
    formIncomplete: "Lütfen işaretli alanları doldurun.",
    requiredField: "Bu alan zorunludur.",
    destinationRequired: "Lütfen bir varış noktası seçin.",
    dateInvalid: "Lütfen bugünü veya gelecekteki bir tarihi seçin.",
    emailInvalid: "Lütfen geçerli bir e-posta adresi girin.",
    nameInvalid: "Lütfen geçerli bir ad soyad girin.",
    phoneInvalid:
      "Lütfen ülke koduyla birlikte geçerli bir numara girin (örneğin +49).",
    flightInvalid: "Lütfen geçerli bir uçuş numarası girin.",
    pickupAddressRequired: "Alış adresi 6–160 karakter arasında olmalıdır.",
    dropoffAddressRequired: "Varış adresi 6–160 karakter arasında olmalıdır.",
    addressesMustDiffer: "Alış ve varış adresleri farklı olmalıdır.",
    customDestinationPrice:
      "Fiyat, varış adresi kontrol edildikten sonra teyit edilecektir.",
    hotelNameLabel: "Otel ismi",
    hotelNamePlaceholder: "Otel veya konaklama adı",
    hotelNameRequired: "Lütfen otel ismini girin.",
    childSeatLabel: "Çocuk koltuğu",
    childSeatNone: "Çocuk koltuğu istemiyorum",
    oneChildSeat: "1 çocuk koltuğu",
    twoChildSeats: "2 çocuk koltuğu",
    threeChildSeats: "3 çocuk koltuğu",
    fourChildSeats: "4 çocuk koltuğu",
  },
  ru: {
    paymentMethod: "Выберите способ оплаты",
    cashPayment: "Оплата в автомобиле",
    recommended: "Рекомендуем",
    cashPaymentDescription:
      "Без предоплаты онлайн. Фиксированную сумму вы передаёте водителю наличными в начале поездки.",
    confirmCashBooking: "Подтвердить — оплата в автомобиле",
    perVehicleNote: "За автомобиль — не за человека · До 7 пассажиров",
    meetGreetNote: "Встреча в аэропорту · Пункт встречи J / 777",
    stepRoute: "Маршрут",
    stepDetails: "Детали",
    stepContact: "Контакты",
    continue: "Продолжить",
    back: "Назад",
    reserveForPrice: "Забронировать",
    perVehicleNoteVito: "За автомобиль — не за человека · До 6 пассажиров",
    perVehicleNoteSprinter: "За автомобиль — не за человека · До 12 пассажиров",
    requestQuote: "Запросить расчёт",
    cashConfirmation:
      "Ваше бронирование подтверждено. Фиксированную сумму вы передадите водителю наличными в начале поездки.",
    bookingError: "Не удалось завершить бронирование. Попробуйте ещё раз.",
    chooseTime: "Выберите время",
    formIncomplete: "Заполните выделенные поля.",
    requiredField: "Это поле обязательно.",
    destinationRequired: "Выберите направление.",
    dateInvalid: "Выберите сегодняшнюю или будущую дату.",
    emailInvalid: "Введите действительный адрес электронной почты.",
    nameInvalid: "Введите действительное полное имя.",
    phoneInvalid:
      "Введите действительный номер с кодом страны (например, +49).",
    flightInvalid: "Введите действительный номер рейса.",
    pickupAddressRequired:
      "Адрес подачи должен содержать от 6 до 160 символов.",
    dropoffAddressRequired:
      "Адрес назначения должен содержать от 6 до 160 символов.",
    addressesMustDiffer: "Адреса подачи и назначения должны отличаться.",
    customDestinationPrice:
      "Цена будет подтверждена после проверки адреса назначения.",
    hotelNameLabel: "Название отеля",
    hotelNamePlaceholder: "Название отеля или места проживания",
    hotelNameRequired: "Введите название отеля.",
    childSeatLabel: "Детские кресла",
    childSeatNone: "Без детского кресла",
    oneChildSeat: "1 детское кресло",
    twoChildSeats: "2 детских кресла",
    threeChildSeats: "3 детских кресла",
    fourChildSeats: "4 детских кресла",
  },
  pl: {
    paymentMethod: "Wybierz metodę płatności",
    cashPayment: "Zapłać w pojeździe",
    recommended: "Polecane",
    cashPaymentDescription:
      "Bez przedpłaty online. Stałą kwotę przekazujesz kierowcy gotówką na początku podróży.",
    confirmCashBooking: "Potwierdź — zapłać w pojeździe",
    stepRoute: "Trasa",
    stepDetails: "Szczegóły",
    stepContact: "Kontakt",
    continue: "Dalej",
    back: "Wstecz",
    reserveForPrice: "Zarezerwuj",
    perVehicleNoteVito: "Za pojazd — nie za osobę · Do 6 pasażerów",
    perVehicleNoteSprinter: "Za pojazd — nie za osobę · Do 12 pasażerów",
    requestQuote: "Poproś o wycenę",
    cashConfirmation:
      "Twoja rezerwacja jest potwierdzona. Stałą kwotę przekażesz kierowcy gotówką na początku podróży.",
    bookingError: "Nie udało się dokończyć rezerwacji. Spróbuj ponownie.",
    chooseTime: "Wybierz godzinę",
    formIncomplete: "Uzupełnij zaznaczone pola.",
    requiredField: "To pole jest wymagane.",
    destinationRequired: "Wybierz cel podróży.",
    dateInvalid: "Wybierz dzisiejszą lub przyszłą datę.",
    emailInvalid: "Wprowadź prawidłowy adres e-mail.",
    nameInvalid: "Wprowadź prawidłowe imię i nazwisko.",
    phoneInvalid: "Wprowadź prawidłowy numer z kodem kraju (na przykład +49).",
    flightInvalid: "Wprowadź prawidłowy numer lotu.",
    pickupAddressRequired: "Adres odbioru musi mieć od 6 do 160 znaków.",
    dropoffAddressRequired: "Adres docelowy musi mieć od 6 do 160 znaków.",
    addressesMustDiffer: "Adres odbioru i adres docelowy muszą być różne.",
    customDestinationPrice:
      "Cena zostanie potwierdzona po sprawdzeniu adresu docelowego.",
    hotelNameLabel: "Nazwa hotelu",
    hotelNamePlaceholder: "Nazwa hotelu lub zakwaterowania",
    hotelNameRequired: "Wprowadź nazwę hotelu.",
    childSeatLabel: "Foteliki dziecięce",
    childSeatNone: "Bez fotelika dziecięcego",
    oneChildSeat: "1 fotelik dziecięcy",
    twoChildSeats: "2 foteliki dziecięce",
    threeChildSeats: "3 foteliki dziecięce",
    fourChildSeats: "4 foteliki dziecięce",
  },
  nl: {
    paymentMethod: "Kies betaalmethode",
    cashPayment: "Betaal in het voertuig",
    recommended: "Aanbevolen",
    cashPaymentDescription:
      "Geen online vooruitbetaling. U betaalt het vaste bedrag contant aan uw chauffeur bij aanvang van de rit.",
    confirmCashBooking: "Bevestig — betaal in het voertuig",
    stepRoute: "Route",
    stepDetails: "Details",
    stepContact: "Contact",
    continue: "Verder",
    back: "Terug",
    reserveForPrice: "Reserveren",
    perVehicleNoteVito: "Per voertuig — niet per persoon · Tot 6 passagiers",
    perVehicleNoteSprinter:
      "Per voertuig — niet per persoon · Tot 12 passagiers",
    requestQuote: "Prijsopgave aanvragen",
    cashConfirmation:
      "Uw boeking is bevestigd. U betaalt het vaste bedrag contant aan uw chauffeur bij aanvang van de rit.",
    bookingError: "Uw boeking kon niet worden voltooid. Probeer het opnieuw.",
    chooseTime: "Kies tijd",
    formIncomplete: "Vul de gemarkeerde velden in.",
    requiredField: "Dit veld is verplicht.",
    destinationRequired: "Kies een bestemming.",
    dateInvalid: "Kies vandaag of een toekomstige datum.",
    emailInvalid: "Voer een geldig e-mailadres in.",
    nameInvalid: "Voer een geldige volledige naam in.",
    phoneInvalid: "Voer een geldig nummer met landcode in (bijvoorbeeld +49).",
    flightInvalid: "Voer een geldig vluchtnummer in.",
    pickupAddressRequired:
      "Het ophaaladres moet tussen 6 en 160 tekens lang zijn.",
    dropoffAddressRequired:
      "Het bestemmingsadres moet tussen 6 en 160 tekens lang zijn.",
    addressesMustDiffer: "Het ophaal- en bestemmingsadres moeten verschillen.",
    customDestinationPrice:
      "De prijs wordt bevestigd na controle van het bestemmingsadres.",
    hotelNameLabel: "Hotelnaam",
    hotelNamePlaceholder: "Naam van hotel of accommodatie",
    hotelNameRequired: "Voer de hotelnaam in.",
    childSeatLabel: "Kinderzitjes",
    childSeatNone: "Geen kinderzitje",
    oneChildSeat: "1 kinderzitje",
    twoChildSeats: "2 kinderzitjes",
    threeChildSeats: "3 kinderzitjes",
    fourChildSeats: "4 kinderzitjes",
  },
  uk: {
    paymentMethod: "Оберіть спосіб оплати",
    cashPayment: "Оплата в автомобілі",
    recommended: "Рекомендуємо",
    cashPaymentDescription:
      "Без онлайн-передоплати. Фіксовану суму ви передаєте водієві готівкою на початку поїздки.",
    confirmCashBooking: "Підтвердити — оплата в автомобілі",
    stepRoute: "Маршрут",
    stepDetails: "Деталі",
    stepContact: "Контакт",
    continue: "Продовжити",
    back: "Назад",
    reserveForPrice: "Забронювати",
    perVehicleNoteVito: "За автомобіль — не за особу · До 6 пасажирів",
    perVehicleNoteSprinter: "За автомобіль — не за особу · До 12 пасажирів",
    requestQuote: "Запросити розрахунок",
    cashConfirmation:
      "Ваше бронювання підтверджено. Фіксовану суму ви передасте водієві готівкою на початку поїздки.",
    bookingError: "Не вдалося завершити бронювання. Спробуйте ще раз.",
    chooseTime: "Оберіть час",
    formIncomplete: "Заповніть виділені поля.",
    requiredField: "Це поле обов'язкове.",
    destinationRequired: "Оберіть напрямок.",
    dateInvalid: "Оберіть сьогоднішню або майбутню дату.",
    emailInvalid: "Введіть дійсну електронну адресу.",
    nameInvalid: "Введіть дійсне повне ім'я.",
    phoneInvalid: "Введіть дійсний номер із кодом країни (наприклад, +49).",
    flightInvalid: "Введіть дійсний номер рейсу.",
    pickupAddressRequired: "Адреса подачі має містити від 6 до 160 символів.",
    dropoffAddressRequired:
      "Адреса призначення має містити від 6 до 160 символів.",
    addressesMustDiffer: "Адреси подачі та призначення мають відрізнятися.",
    customDestinationPrice:
      "Ціна буде підтверджена після перевірки адреси призначення.",
    hotelNameLabel: "Назва готелю",
    hotelNamePlaceholder: "Назва готелю або місця проживання",
    hotelNameRequired: "Введіть назву готелю.",
    childSeatLabel: "Дитячі крісла",
    childSeatNone: "Без дитячого крісла",
    oneChildSeat: "1 дитяче крісло",
    twoChildSeats: "2 дитячі крісла",
    threeChildSeats: "3 дитячі крісла",
    fourChildSeats: "4 дитячі крісла",
  },
  fr: {
    paymentMethod: "Choisissez le mode de paiement",
    cashPayment: "Payer dans le véhicule",
    recommended: "Recommandé",
    cashPaymentDescription:
      "Aucun prépaiement en ligne. Vous réglez le prix fixe en espèces à votre chauffeur au début du trajet.",
    confirmCashBooking: "Confirmer — payer dans le véhicule",
    stepRoute: "Trajet",
    stepDetails: "Détails",
    stepContact: "Contact",
    continue: "Continuer",
    back: "Retour",
    reserveForPrice: "Réserver",
    perVehicleNoteVito: "Par véhicule — non par personne · Jusqu'à 6 passagers",
    perVehicleNoteSprinter:
      "Par véhicule — non par personne · Jusqu'à 12 passagers",
    requestQuote: "Demander un devis",
    cashConfirmation:
      "Votre réservation est confirmée. Vous réglerez le prix fixe en espèces à votre chauffeur au début du trajet.",
    bookingError:
      "Votre réservation n'a pas pu être finalisée. Veuillez réessayer.",
    chooseTime: "Choisir l'heure",
    formIncomplete: "Veuillez compléter les champs indiqués.",
    requiredField: "Ce champ est obligatoire.",
    destinationRequired: "Veuillez choisir une destination.",
    dateInvalid: "Veuillez choisir aujourd'hui ou une date future.",
    emailInvalid: "Veuillez saisir une adresse e-mail valide.",
    nameInvalid: "Veuillez saisir un nom complet valide.",
    phoneInvalid:
      "Saisissez un numéro valide avec l’indicatif du pays (par exemple +49).",
    flightInvalid: "Veuillez saisir un numéro de vol valide.",
    pickupAddressRequired:
      "L'adresse de prise en charge doit contenir entre 6 et 160 caractères.",
    dropoffAddressRequired:
      "L'adresse de destination doit contenir entre 6 et 160 caractères.",
    addressesMustDiffer:
      "Les adresses de prise en charge et de destination doivent être différentes.",
    customDestinationPrice:
      "Le prix sera confirmé après vérification de l'adresse de destination.",
    hotelNameLabel: "Nom de l'hôtel",
    hotelNamePlaceholder: "Nom de l'hôtel ou de l'hébergement",
    hotelNameRequired: "Veuillez saisir le nom de l'hôtel.",
    childSeatLabel: "Sièges enfant",
    childSeatNone: "Aucun siège enfant",
    oneChildSeat: "1 siège enfant",
    twoChildSeats: "2 sièges enfant",
    threeChildSeats: "3 sièges enfant",
    fourChildSeats: "4 sièges enfant",
  },
  sv: {
    paymentMethod: "Välj betalningsmetod",
    cashPayment: "Betala i fordonet",
    recommended: "Rekommenderas",
    cashPaymentDescription:
      "Ingen förskottsbetalning online. Du betalar det fasta beloppet kontant till chauffören när resan börjar.",
    confirmCashBooking: "Bekräfta — betala i fordonet",
    stepRoute: "Rutt",
    stepDetails: "Detaljer",
    stepContact: "Kontakt",
    continue: "Fortsätt",
    back: "Tillbaka",
    reserveForPrice: "Boka",
    perVehicleNoteVito: "Per fordon — inte per person · Upp till 6 passagerare",
    perVehicleNoteSprinter:
      "Per fordon — inte per person · Upp till 12 passagerare",
    requestQuote: "Begär prisuppgift",
    cashConfirmation:
      "Din bokning är bekräftad. Du betalar det fasta beloppet kontant till chauffören när resan börjar.",
    bookingError: "Bokningen kunde inte slutföras. Försök igen.",
    chooseTime: "Välj tid",
    formIncomplete: "Fyll i de markerade fälten.",
    requiredField: "Detta fält är obligatoriskt.",
    destinationRequired: "Välj en destination.",
    dateInvalid: "Välj dagens datum eller ett framtida datum.",
    emailInvalid: "Ange en giltig e-postadress.",
    nameInvalid: "Ange ett giltigt fullständigt namn.",
    phoneInvalid: "Ange ett giltigt nummer med landskod (till exempel +49).",
    flightInvalid: "Ange ett giltigt flightnummer.",
    pickupAddressRequired:
      "Hämtningsadressen måste vara mellan 6 och 160 tecken.",
    dropoffAddressRequired:
      "Destinationsadressen måste vara mellan 6 och 160 tecken.",
    addressesMustDiffer:
      "Hämtnings- och destinationsadressen måste vara olika.",
    customDestinationPrice:
      "Priset bekräftas efter att destinationsadressen kontrollerats.",
    hotelNameLabel: "Hotellnamn",
    hotelNamePlaceholder: "Hotell- eller boendenamn",
    hotelNameRequired: "Ange hotellnamnet.",
    childSeatLabel: "Barnstolar",
    childSeatNone: "Ingen barnstol",
    oneChildSeat: "1 barnstol",
    twoChildSeats: "2 barnstolar",
    threeChildSeats: "3 barnstolar",
    fourChildSeats: "4 barnstolar",
  },
  ja: {
    paymentMethod: "お支払い方法を選択",
    cashPayment: "車内で支払う",
    recommended: "おすすめ",
    cashPaymentDescription: "オンラインでの事前決済はありません。定額料金はご乗車時にドライバーへ現金でお支払いいただきます。",
    confirmCashBooking: "予約確定 — 車内払い",
    stepRoute: "ルート",
    stepDetails: "詳細",
    stepContact: "連絡先",
    continue: "続ける",
    back: "戻る",
    reserveForPrice: "予約する",
    perVehicleNoteVito: "1台あたり — 1人あたりではありません · 最大6名",
    perVehicleNoteSprinter: "1台あたり — 1人あたりではありません · 最大12名",
    requestQuote: "見積もりを依頼",
    cashConfirmation: "ご予約が確定しました。定額料金はご乗車時にドライバーへ現金でお支払いください。",
    bookingError: "予約を完了できませんでした。もう一度お試しください。",
    chooseTime: "時間を選択",
    formIncomplete: "表示された必須項目を入力してください。",
    requiredField: "この項目は必須です。",
    destinationRequired: "目的地を選択してください。",
    dateInvalid: "今日または今後の日付を選択してください。",
    emailInvalid: "有効なメールアドレスを入力してください。",
    nameInvalid: "有効な氏名を入力してください。",
    phoneInvalid: "国番号を含む有効な電話番号を入力してください（例：+49）。",
    flightInvalid: "有効なフライト番号を入力してください。",
    pickupAddressRequired:
      "お迎え先の住所は6文字以上160文字以内で入力してください。",
    dropoffAddressRequired:
      "目的地の住所は6文字以上160文字以内で入力してください。",
    addressesMustDiffer: "お迎え先と目的地には異なる住所を入力してください。",
    customDestinationPrice: "目的地の住所を確認後、料金をご案内いたします。",
    hotelNameLabel: "ホテル名",
    hotelNamePlaceholder: "ホテルまたは宿泊施設名",
    hotelNameRequired: "ホテル名を入力してください。",
    childSeatLabel: "チャイルドシート",
    childSeatNone: "チャイルドシート不要",
    oneChildSeat: "チャイルドシート 1台",
    twoChildSeats: "チャイルドシート 2台",
    threeChildSeats: "チャイルドシート 3台",
    fourChildSeats: "チャイルドシート 4台",
  },
  ko: {
    paymentMethod: "결제 방법 선택",
    cashPayment: "차량에서 결제",
    recommended: "추천",
    cashPaymentDescription: "온라인 선결제가 없습니다. 고정 요금은 출발할 때 기사에게 현금으로 결제하시면 됩니다.",
    confirmCashBooking: "예약 확정 — 차량에서 결제",
    stepRoute: "경로",
    stepDetails: "세부 정보",
    stepContact: "연락처",
    continue: "계속",
    back: "뒤로",
    reserveForPrice: "예약하기",
    perVehicleNoteVito: "차량 기준 — 1인 기준 아님 · 최대 6명",
    perVehicleNoteSprinter: "차량 기준 — 1인 기준 아님 · 최대 12명",
    requestQuote: "견적 요청",
    cashConfirmation: "예약이 확정되었습니다. 고정 요금은 출발할 때 기사에게 현금으로 결제해 주십시오.",
    bookingError: "예약을 완료하지 못했습니다. 다시 시도해 주세요.",
    chooseTime: "시간 선택",
    formIncomplete: "표시된 필수 항목을 입력해 주세요.",
    requiredField: "필수 입력 항목입니다.",
    destinationRequired: "목적지를 선택해 주세요.",
    dateInvalid: "오늘 또는 이후 날짜를 선택해 주세요.",
    emailInvalid: "올바른 이메일 주소를 입력해 주세요.",
    nameInvalid: "올바른 전체 이름을 입력해 주세요.",
    phoneInvalid: "국가 코드를 포함한 올바른 번호를 입력해 주세요(예: +49).",
    flightInvalid: "올바른 항공편 번호를 입력해 주세요.",
    pickupAddressRequired: "픽업 주소는 6자 이상 160자 이하로 입력해 주세요.",
    dropoffAddressRequired:
      "목적지 주소는 6자 이상 160자 이하로 입력해 주세요.",
    addressesMustDiffer: "픽업 주소와 목적지 주소는 달라야 합니다.",
    customDestinationPrice: "목적지 주소 확인 후 가격이 확정됩니다.",
    hotelNameLabel: "호텔명",
    hotelNamePlaceholder: "호텔 또는 숙소 이름",
    hotelNameRequired: "호텔명을 입력해 주세요.",
    childSeatLabel: "어린이 좌석",
    childSeatNone: "어린이 좌석 없음",
    oneChildSeat: "어린이 좌석 1개",
    twoChildSeats: "어린이 좌석 2개",
    threeChildSeats: "어린이 좌석 3개",
    fourChildSeats: "어린이 좌석 4개",
  },
  ar: {
    paymentMethod: "اختر طريقة الدفع",
    cashPayment: "الدفع داخل السيارة",
    recommended: "موصى به",
    cashPaymentDescription:
      "لا دفع مسبق عبر الإنترنت. تدفع السعر الثابت نقدًا لسائقك في بداية الرحلة.",
    confirmCashBooking: "تأكيد الحجز — الدفع داخل السيارة",
    stepRoute: "المسار",
    stepDetails: "التفاصيل",
    stepContact: "التواصل",
    continue: "متابعة",
    back: "رجوع",
    reserveForPrice: "احجز",
    perVehicleNoteVito: "لكل سيارة — لا للفرد · حتى 6 ركاب",
    perVehicleNoteSprinter: "لكل سيارة — لا للفرد · حتى 12 راكباً",
    requestQuote: "طلب عرض سعر",
    cashConfirmation:
      "تم تأكيد حجزك. تدفع المبلغ الثابت نقدًا لسائقك في بداية الرحلة.",
    bookingError: "تعذر إكمال حجزك. يرجى المحاولة مرة أخرى.",
    chooseTime: "اختر الوقت",
    formIncomplete: "يرجى إكمال الحقول المحددة.",
    requiredField: "هذا الحقل مطلوب.",
    destinationRequired: "يرجى اختيار وجهة.",
    dateInvalid: "يرجى اختيار تاريخ اليوم أو تاريخ لاحق.",
    emailInvalid: "يرجى إدخال بريد إلكتروني صالح.",
    nameInvalid: "يرجى إدخال الاسم الكامل بشكل صحيح.",
    phoneInvalid: "يرجى إدخال رقم صالح مع رمز الدولة (مثلاً +49).",
    flightInvalid: "يرجى إدخال رقم رحلة صالح.",
    pickupAddressRequired: "يجب أن يتراوح عنوان الاستقبال بين 6 و160 حرفاً.",
    dropoffAddressRequired: "يجب أن يتراوح عنوان الوصول بين 6 و160 حرفاً.",
    addressesMustDiffer: "يجب أن يختلف عنوان الاستقبال عن عنوان الوصول.",
    customDestinationPrice: "سيتم تأكيد السعر بعد مراجعة عنوان الوصول.",
    hotelNameLabel: "اسم الفندق",
    hotelNamePlaceholder: "اسم الفندق أو مكان الإقامة",
    hotelNameRequired: "يرجى إدخال اسم الفندق.",
    childSeatLabel: "مقاعد الأطفال",
    childSeatNone: "من دون مقعد أطفال",
    oneChildSeat: "مقعد أطفال واحد",
    twoChildSeats: "مقعدا أطفال",
    threeChildSeats: "3 مقاعد أطفال",
    fourChildSeats: "4 مقاعد أطفال",
  },
};

const tripTranslations = {
  en: {
    tripType: "Journey type",
    oneWay: "One way",
    roundTrip: "Round trip",
    roundTripHint:
      "For a round trip, the return follows the same route in reverse.",
    returnDate: "Return date",
    returnPickupTime: "Return pick-up time",
    returnFlightNumber: "Return flight number",
    arrivalDate: "Arrival date",
    arrivalFlightTime: "Flight arrival time",
    arrivalFlightNumber: "Arrival flight number",
    roundTripPriceNote: "round trip · 2 journeys",
    returnDateRequired: "Please choose a return date.",
    returnDateInvalid:
      "Please choose a return date on or after the outward journey.",
    returnTimeRequired: "Please choose the return pick-up time.",
    dailyChauffeur: "Daily vehicle + chauffeur",
    days: "days",
    dailyChauffeurHint:
      "Hire a private vehicle and chauffeur by the day with no kilometre or hour limit. Fuel is paid separately.",
    serviceStartDate: "First service day",
    serviceEndDate: "Last service day",
    dailyPickupTime: "Service start time",
    dailyPickupTimeRequired: "Please select the daily service start time.",
    serviceEndDateRequired: "Please select the last service day.",
    servicePeriodInvalid: "Please select a period between 1 and 30 days.",
    arrivalFlightTimeOptional: "Arrival flight time (optional)",
    arrivalFlightNumberOptional: "Arrival flight number (optional)",
    servicePrice: "Service price",
    fuelExcludedShort: "fuel excluded",
    fuelExcludedDetail:
      "Fuel is not included and is paid separately according to use.",
    departureFlightDate: "Departure flight date (optional)",
    departureFlightTime: "Departure flight time",
    departureFlightNumber: "Departure flight number",
    departureFlightDateRequired: "Please select the departure flight date.",
    departureFlightDateInvalid:
      "Departure flight date cannot be before the service starts.",
    dailyQuoteIncludes:
      "Includes the selected vehicle and chauffeur with no kilometre or hour limit. Fuel is excluded.",
    reviewAndConfirm: "Review and confirm",
    fuelTermsTitle: "Important information about fuel",
    fuelTermsBody:
      "The daily €150 service fee includes the vehicle and chauffeur. Fuel is not included. You will pay the actual fuel cost separately according to use.",
    fuelTermsCheckbox:
      "I understand that fuel is excluded and will be paid separately based on use.",
    cancel: "Cancel",
    close: "Close",
    understandAndConfirm: "I understand and confirm",
    dailyCashConfirmation:
      "Your daily chauffeur hire is confirmed. The service price excludes fuel, which is paid separately based on use.",
  },
  de: {
    tripType: "Fahrtart",
    oneWay: "Einfache Fahrt",
    roundTrip: "Hin- und Rückfahrt",
    roundTripHint:
      "Bei Hin- und Rückfahrt erfolgt die Rückfahrt auf derselben Strecke in umgekehrter Richtung.",
    returnDate: "Rückfahrtdatum",
    returnPickupTime: "Abholzeit der Rückfahrt",
    returnFlightNumber: "Rückflugnummer",
    arrivalDate: "Ankunftsdatum",
    arrivalFlightTime: "Ankunftszeit des Fluges",
    arrivalFlightNumber: "Ankunftsflugnummer",
    roundTripPriceNote: "Hin- und Rückfahrt · 2 Fahrten",
    returnDateRequired: "Bitte wählen Sie ein Rückfahrtdatum.",
    returnDateInvalid:
      "Bitte wählen Sie ein Rückfahrtdatum am oder nach dem Datum der Hinfahrt.",
    returnTimeRequired: "Bitte wählen Sie die Abholzeit für die Rückfahrt.",
    dailyChauffeur: "Fahrzeug + Chauffeur pro Tag",
    days: "Tage",
    dailyChauffeurHint:
      "Mieten Sie Fahrzeug und Chauffeur tageweise ohne Kilometer- oder Stundenlimit. Kraftstoff wird separat bezahlt.",
    serviceStartDate: "Erster Servicetag",
    serviceEndDate: "Letzter Servicetag",
    dailyPickupTime: "Startzeit des Services",
    dailyPickupTimeRequired: "Bitte wählen Sie die tägliche Startzeit.",
    serviceEndDateRequired: "Bitte wählen Sie den letzten Servicetag.",
    servicePeriodInvalid: "Bitte wählen Sie einen Zeitraum von 1 bis 30 Tagen.",
    arrivalFlightTimeOptional: "Ankunftszeit (optional)",
    arrivalFlightNumberOptional: "Ankunftsflugnummer (optional)",
    servicePrice: "Servicepreis",
    fuelExcludedShort: "Kraftstoff nicht inbegriffen",
    fuelExcludedDetail:
      "Kraftstoff ist nicht enthalten und wird je nach Verbrauch separat bezahlt.",
    departureFlightDate: "Abflugdatum (optional)",
    departureFlightTime: "Abflugzeit",
    departureFlightNumber: "Abflugnummer",
    departureFlightDateRequired: "Bitte wählen Sie das Abflugdatum.",
    departureFlightDateInvalid:
      "Das Abflugdatum darf nicht vor Servicebeginn liegen.",
    dailyQuoteIncludes:
      "Inklusive Fahrzeug und Chauffeur ohne Kilometer- oder Stundenlimit. Kraftstoff ist nicht enthalten.",
    reviewAndConfirm: "Prüfen und bestätigen",
    fuelTermsTitle: "Wichtige Information zum Kraftstoff",
    fuelTermsBody:
      "Die Tagesgebühr von 150 € beinhaltet Fahrzeug und Chauffeur. Kraftstoff ist nicht enthalten und wird nach tatsächlichem Verbrauch separat bezahlt.",
    fuelTermsCheckbox:
      "Ich verstehe, dass Kraftstoff nicht enthalten ist und nach Verbrauch separat bezahlt wird.",
    cancel: "Abbrechen",
    close: "Schließen",
    understandAndConfirm: "Verstanden und bestätigen",
    dailyCashConfirmation:
      "Ihre tägliche Chauffeurbuchung ist bestätigt. Kraftstoff ist nicht enthalten und wird nach Verbrauch separat bezahlt.",
  },
  tr: {
    tripType: "Yolculuk türü",
    oneWay: "Tek yön",
    roundTrip: "Gidiş–dönüş",
    roundTripHint:
      "Gidiş–dönüş rezervasyonunda dönüş, aynı rotanın ters yönünde gerçekleşir.",
    returnDate: "Dönüş tarihi",
    returnPickupTime: "Dönüş alış saati",
    returnFlightNumber: "Dönüş uçuş numarası",
    arrivalDate: "Geliş tarihi",
    arrivalFlightTime: "Geliş uçuş saati",
    arrivalFlightNumber: "Geliş uçuş numarası",
    roundTripPriceNote: "gidiş–dönüş · 2 yolculuk",
    returnDateRequired: "Lütfen dönüş tarihini seçin.",
    returnDateInvalid:
      "Lütfen gidiş tarihiyle aynı veya daha sonraki bir dönüş tarihi seçin.",
    returnTimeRequired: "Lütfen dönüş için alış saatini seçin.",
    dailyChauffeur: "Günlük araç + şoför",
    days: "gün",
    dailyChauffeurHint:
      "Özel araç ve şoförü kilometre ve saat sınırı olmadan günlük kiralayın. Yakıt ayrıca ödenir.",
    serviceStartDate: "İlk hizmet günü",
    serviceEndDate: "Son hizmet günü",
    dailyPickupTime: "Hizmet başlangıç saati",
    dailyPickupTimeRequired: "Lütfen günlük hizmet başlangıç saatini seçin.",
    serviceEndDateRequired: "Lütfen son hizmet gününü seçin.",
    servicePeriodInvalid: "Lütfen 1 ile 30 gün arasında bir süre seçin.",
    arrivalFlightTimeOptional: "Geliş uçuş saati (isteğe bağlı)",
    arrivalFlightNumberOptional: "Geliş uçuş numarası (isteğe bağlı)",
    servicePrice: "Hizmet bedeli",
    fuelExcludedShort: "yakıt hariç",
    fuelExcludedDetail: "Yakıt dahil değildir ve kullanıma göre ayrıca ödenir.",
    departureFlightDate: "Dönüş uçuş tarihi (isteğe bağlı)",
    departureFlightTime: "Dönüş uçuş saati",
    departureFlightNumber: "Dönüş uçuş numarası",
    departureFlightDateRequired: "Lütfen dönüş uçuş tarihini seçin.",
    departureFlightDateInvalid:
      "Dönüş uçuş tarihi hizmet başlangıcından önce olamaz.",
    dailyQuoteIncludes:
      "Seçilen araç ve şoför, kilometre ve saat sınırı olmadan dahildir. Yakıt hariçtir.",
    reviewAndConfirm: "İncele ve onayla",
    fuelTermsTitle: "Yakıt ücreti hakkında önemli bilgi",
    fuelTermsBody:
      "Günlük €150 hizmet bedeline araç ve şoför dahildir. Yakıt ücreti dahil değildir. Gerçekleşen yakıt masrafını kullanıma göre ayrıca ödeyeceksiniz.",
    fuelTermsCheckbox:
      "Yakıtın dahil olmadığını ve kullanıma göre ayrıca ödeneceğini anladım.",
    cancel: "Vazgeç",
    close: "Kapat",
    understandAndConfirm: "Anladım ve onaylıyorum",
    dailyCashConfirmation:
      "Günlük araç ve şoför rezervasyonunuz onaylandı. Hizmet bedeline yakıt dahil değildir; yakıt kullanıma göre ayrıca ödenir.",
  },
  ru: {
    tripType: "Тип поездки",
    oneWay: "В одну сторону",
    roundTrip: "Туда и обратно",
    roundTripHint:
      "Обратная поездка проходит по тому же маршруту в обратном направлении.",
    returnDate: "Дата возвращения",
    returnPickupTime: "Время подачи на обратный путь",
    returnFlightNumber: "Номер обратного рейса",
    arrivalDate: "Дата прибытия",
    arrivalFlightTime: "Время прибытия рейса",
    arrivalFlightNumber: "Номер рейса прибытия",
    roundTripPriceNote: "туда и обратно · 2 поездки",
    returnDateRequired: "Выберите дату возвращения.",
    returnDateInvalid:
      "Дата возвращения должна совпадать с датой поездки туда или быть позже.",
    returnTimeRequired: "Выберите время подачи на обратный путь.",
  },
  ar: {
    tripType: "نوع الرحلة",
    oneWay: "ذهاب فقط",
    roundTrip: "ذهاب وعودة",
    roundTripHint:
      "في رحلة الذهاب والعودة، تكون رحلة العودة على المسار نفسه بالاتجاه المعاكس.",
    returnDate: "تاريخ العودة",
    returnPickupTime: "وقت الاستقبال للعودة",
    returnFlightNumber: "رقم رحلة العودة",
    arrivalDate: "تاريخ الوصول",
    arrivalFlightTime: "وقت وصول الرحلة",
    arrivalFlightNumber: "رقم رحلة الوصول",
    roundTripPriceNote: "ذهاب وعودة · رحلتان",
    returnDateRequired: "يرجى اختيار تاريخ العودة.",
    returnDateInvalid:
      "يرجى اختيار تاريخ عودة يوافق تاريخ الذهاب أو يأتي بعده.",
    returnTimeRequired: "يرجى اختيار وقت الاستقبال للعودة.",
  },
};

Object.entries(paymentTranslations).forEach(([language, copy]) => {
  translations[language] = { ...(translations[language] || {}), ...copy };
});

Object.keys(translations).forEach((language) => {
  translations[language] = {
    ...tripTranslations.en,
    ...translations[language],
    ...(tripTranslations[language] || {}),
  };
});

const fleetData = {
  sprinter: {
    classKey: "fleetVclassClass",
    className: "Business · First Class",
    name: "Mercedes Sprinter",
    shortName: "Sprinter",
    descriptionKey: "fleetVclassDescription",
    description:
      "Spacious VIP transport for larger groups, with generous room for passengers and luggage.",
    guests: "13",
    bags: "12",
    maxUnits: 25,
  },
  vito: {
    classKey: "fleetVitoClass",
    className: "VIP · Grand Touring",
    name: "Mercedes Vito",
    shortName: "Vito",
    descriptionKey: "fleetVitoDescription",
    description:
      "A refined private cabin for families and small groups travelling in comfort.",
    guests: "8",
    bags: "6",
    maxUnits: 11,
  },
};

const fallbackFleetPhotos = [
  {
    src: fallbackChauffeurPhoto,
    alt: "Professional chauffeur opening a luxury black executive van",
    caption: "Chauffeur arrival",
    vehicle: "all",
  },
  {
    src: fallbackInteriorPhoto,
    alt: "Cream leather executive seating inside a luxury passenger van",
    caption: "VIP interior",
    vehicle: "all",
  },
  {
    src: fallbackHeroPhoto,
    alt: "Luxury black executive van driving along Antalya's coastline",
    caption: "Exterior",
    vehicle: "all",
  },
];

const getPhotoCaption = (fileName) => {
  const normalized = fileName.toLowerCase();
  if (normalized.includes("customer")) return "Happy customer";
  if (normalized.includes("interior") || normalized.includes("lounge"))
    return "VIP interior";
  if (normalized.includes("cabin") || normalized.includes("seat"))
    return "Passenger cabin";
  if (
    normalized.includes("arrival") ||
    normalized.includes("chauffeur") ||
    normalized.includes("driver")
  )
    return "Chauffeur arrival";
  if (
    normalized.includes("exterior") ||
    normalized.includes("front") ||
    normalized.includes("side")
  )
    return "Exterior";
  return "Our vehicle";
};

const getPhotoVehicle = (fileName) => {
  const normalized = fileName.toLowerCase();
  if (normalized.includes("sprinter")) return "sprinter";
  if (normalized.includes("vito")) return "vito";
  return "all";
};

const customerPhotos = Object.entries(customerPhotoModules)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
  .map(([path, src]) => ({
    src,
    caption: "Happy customer",
    vehicle: "all",
    alt: "Satisfied customer with Antalya VIP Tourism transfer service",
    isCustomer: true,
  }));

const vehiclePhotos = Object.entries(vehiclePhotoModules)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
  .map(([path, src]) => {
    const fileName = path.split("/").pop() || "vehicle";
    const caption = getPhotoCaption(fileName);
    return {
      src,
      caption,
      vehicle: getPhotoVehicle(fileName),
      alt: `${caption} photo from Antalya VIP Tourism fleet`,
    };
  });

const fleetPhotos = (() => {
  const mixed = [...vehiclePhotos];
  const step = mixed.length / (customerPhotos.length + 1);
  customerPhotos.forEach((photo, i) => {
    mixed.splice(Math.round(step * (i + 1)) + i, 0, photo);
  });
  return mixed;
})();

let activeFleetPhotoIndex = 0;
let activeFleetPhotos = fleetPhotos.length ? fleetPhotos : fallbackFleetPhotos;

const fleetCarousel = document.querySelector(".fleet-carousel");
const fleetCarouselImage = document.querySelector("#fleet-carousel-image");
const fleetCarouselCaption = document.querySelector("#fleet-carousel-caption");
const fleetCarouselDots = document.querySelector("#fleet-carousel-dots");
const fleetCarouselPrev = document.querySelector("#fleet-carousel-prev");
const fleetCarouselNext = document.querySelector("#fleet-carousel-next");

const getPhotosForFleet = (fleetKey) => {
  if (!fleetPhotos.length) return fallbackFleetPhotos;
  const vehiclePhotos = fleetPhotos.filter(
    (photo) => photo.vehicle === fleetKey || photo.vehicle === "all",
  );
  return vehiclePhotos.length ? vehiclePhotos : fleetPhotos;
};

const renderFleetCarouselDots = () => {
  if (!fleetCarouselDots) return;
  fleetCarouselDots.innerHTML = "";
  activeFleetPhotos.forEach((photo, index) => {
    const dot = document.createElement("button");
    dot.className = "fleet-carousel-dot";
    dot.type = "button";
    dot.setAttribute(
      "aria-label",
      `Show ${photo.caption.toLowerCase()} photo ${index + 1}`,
    );
    dot.setAttribute("aria-current", String(index === activeFleetPhotoIndex));
    dot.classList.toggle("active", index === activeFleetPhotoIndex);
    dot.addEventListener("click", () => updateFleetCarousel(index));
    fleetCarouselDots.appendChild(dot);
  });
};

const updateFleetCarousel = (nextIndex) => {
  if (!fleetCarouselImage || !fleetCarouselCaption) return;
  const totalPhotos = activeFleetPhotos.length;
  if (!totalPhotos) return;
  activeFleetPhotoIndex = (nextIndex + totalPhotos) % totalPhotos;
  const photo = activeFleetPhotos[activeFleetPhotoIndex];

  fleetCarousel?.classList.add("is-changing");
  window.setTimeout(() => {
    fleetCarouselImage.src = photo.src;
    fleetCarouselImage.alt = photo.alt;
    fleetCarouselCaption.textContent = photo.caption;
    fleetCarouselImage.classList.toggle("is-customer", !!photo.isCustomer);
    renderFleetCarouselDots();
    fleetCarousel?.classList.remove("is-changing");
  }, 120);
};

const syncFleetCarouselForVehicle = (fleetKey) => {
  activeFleetPhotos = getPhotosForFleet(fleetKey);
  activeFleetPhotoIndex = 0;
  updateFleetCarousel(0);
};

const formatEuroAmount = (price) => {
  const value = Number(price);
  if (!Number.isFinite(value)) return "€0";
  return `€${Number.isInteger(value) ? value.toFixed(0) : value.toFixed(2)}`;
};

const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");
const quoteModal = document.querySelector("#quote-modal");
const pickupSelect = document.querySelector("#pickup");
const pickupAddressRow = document.querySelector("#pickup-address-row");
const pickupAddressInput = document.querySelector("#pickup-address");
const dropoffAddressRow = document.querySelector("#dropoff-address-row");
const dropoffAddressInput = document.querySelector("#dropoff-address");
const hotelNameInput = document.querySelector("#hotel-name");
const childSeatsSelect = document.querySelector("#child-seats");
const destinationSelect = document.querySelector("#destination");
const airportDestinationOption = destinationSelect?.querySelector(
  'option[value="airport"]',
);
const vehicleSelect = document.querySelector("#vehicle-type");
const guestsSelect = document.querySelector("#guests");
const luggageSelect = document.querySelector("#luggage");
const capacityNote = document.querySelector("#capacity-note");
const travelDate = document.querySelector("#travel-date");
const tripTypeInputs = document.querySelectorAll('input[name="tripType"]');
const returnJourneyRow = document.querySelector("#return-journey-row");
const returnDateInput = document.querySelector("#return-date");
const returnPickupTimeInput = document.querySelector("#return-pickup-time");
const returnFlightNumberInput = document.querySelector("#return-flight-number");
const quoteForm = document.querySelector("#quote-form");
const paymentErrorMessage = document.querySelector("#payment-error-message");
const confirmationMessage = document.querySelector(".confirmed-msg");
const nameInput = document.querySelector("#customer-name");
const phoneInput = document.querySelector("#customer-phone");
const emailInput = document.querySelector("#customer-email");
const flightNumberInput = document.querySelector("#flight-number");
const arrivalTimeInput = document.querySelector("#flight-arrival-time");
const arrivalTimeControl = arrivalTimeInput?.closest(".time-field-control");
const arrivalTimeValue =
  arrivalTimeControl?.querySelector(".time-picker-value");
const returnTimeControl = returnPickupTimeInput?.closest(".time-field-control");
const returnTimeValue = returnTimeControl?.querySelector(".time-picker-value");

const setHeaderState = () => {
  header.classList.toggle("scrolled", window.scrollY > 40);
};

const closeMenu = () => {
  menuButton.setAttribute("aria-expanded", "false");
  mobileMenu.classList.remove("open");
  mobileMenu.setAttribute("aria-hidden", "true");
  document.body.classList.remove("menu-open");
};

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  mobileMenu.classList.toggle("open", !isOpen);
  mobileMenu.setAttribute("aria-hidden", String(isOpen));
  document.body.classList.toggle("menu-open", !isOpen);
});

mobileMenu
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", closeMenu));

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();

const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString()
  .split("T")[0];
travelDate.min = localToday;
travelDate.value = localToday;
returnDateInput.min = localToday;

const openNativeDatePicker = (input) => {
  if (typeof input.showPicker !== "function") return;

  try {
    input.showPicker();
  } catch {
    input.focus();
  }
};

travelDate.addEventListener("click", () => openNativeDatePicker(travelDate));
travelDate.closest(".field-control")?.addEventListener("click", (event) => {
  if (event.target === travelDate) return;
  travelDate.focus();
  openNativeDatePicker(travelDate);
});

returnDateInput.addEventListener("click", () =>
  openNativeDatePicker(returnDateInput),
);
returnDateInput
  .closest(".field-control")
  ?.addEventListener("click", (event) => {
    if (event.target === returnDateInput) return;
    returnDateInput.focus();
    openNativeDatePicker(returnDateInput);
  });

travelDate.addEventListener("change", () => {
  returnDateInput.min = travelDate.value || localToday;
  if (returnDateInput.value && returnDateInput.value < returnDateInput.min) {
    returnDateInput.value = returnDateInput.min;
  }
});

const updateFleet = (fleetKey) => {
  const selected = fleetData[fleetKey];
  const language = document.documentElement.lang;
  const fleetClass = document.querySelector("#fleet-class");
  const fleetDescription = document.querySelector("#fleet-description");

  fleetClass.dataset.i18n = selected.classKey;
  fleetClass.dataset.original = selected.className;
  fleetDescription.dataset.i18n = selected.descriptionKey;
  fleetDescription.dataset.original = selected.description;
  fleetClass.innerHTML =
    translations[language]?.[selected.classKey] || selected.className;
  fleetDescription.innerHTML =
    translations[language]?.[selected.descriptionKey] || selected.description;
  document.querySelector("#fleet-name").textContent = selected.name;
  document.querySelector("#fleet-badge-name").textContent = selected.shortName;
  document.querySelector("#fleet-guests").textContent = selected.guests;
  document.querySelector("#fleet-bags").textContent = selected.bags;
  syncFleetCarouselForVehicle(fleetKey);
};

document.querySelectorAll(".fleet-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document
      .querySelectorAll(".fleet-tab")
      .forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    updateFleet(tab.dataset.fleet);
    vehicleSelect.value = tab.dataset.fleet;
    updateGuestCapacity();
    if (destinationSelect.value) updateInlinePrice(destinationSelect.value);
  });
});

fleetCarouselPrev?.addEventListener("click", () =>
  updateFleetCarousel(activeFleetPhotoIndex - 1),
);
fleetCarouselNext?.addEventListener("click", () =>
  updateFleetCarousel(activeFleetPhotoIndex + 1),
);

let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;
const handleSwipe = () => {
  const diffX = touchStartX - touchEndX;
  const diffY = touchStartY - touchEndY;
  const threshold = 50;
  if (Math.abs(diffX) > threshold && Math.abs(diffX) > Math.abs(diffY)) {
    if (diffX > 0) {
      updateFleetCarousel(activeFleetPhotoIndex + 1);
    } else {
      updateFleetCarousel(activeFleetPhotoIndex - 1);
    }
  }
};
fleetCarousel?.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.changedTouches[0].clientX;
    touchStartY = e.changedTouches[0].clientY;
  },
  { passive: true },
);
fleetCarousel?.addEventListener(
  "touchend",
  (e) => {
    touchEndX = e.changedTouches[0].clientX;
    touchEndY = e.changedTouches[0].clientY;
    handleSwipe();
  },
  { passive: true },
);

syncFleetCarouselForVehicle(
  document.querySelector(".fleet-tab.active")?.dataset.fleet || "sprinter",
);

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const isOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item").forEach((faq) => {
      faq.classList.remove("open");
      faq.querySelector("button").setAttribute("aria-expanded", "false");
    });
    if (!isOpen) {
      item.classList.add("open");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

let currentQuoteData = {};

const priceDisplay = document.querySelector("#booking-price-display");
const getSelectedTripType = () =>
  document.querySelector('input[name="tripType"]:checked')?.value || "one_way";
const isRoundTrip = () => getSelectedTripType() === "round_trip";

// Vehicle order cheapest → largest. Combined capacity: a guest needs a seat,
// a large bag only needs boot space. So each vehicle has a seat cap (guests)
// and a combined unit cap (guests + big bags). Vito boundary = 6 pax + 5 bags.
const VEHICLE_ORDER = ["vito", "sprinter"];

// English lives in the HTML defaults, so `translations` has no `en` entry.
const capacityFallback = {
  capacitySwitchedSprinter:
    "Your party and luggage exceed the Vito — switched to the Mercedes Sprinter.",
  capacityNoVehicle:
    "This many passengers and bags exceed our vehicles. Please contact us on WhatsApp.",
};

const vehicleFits = (key, guests, luggage) => {
  const spec = fleetData[key];
  if (!spec) return false;
  const seats = Number(spec.guests) || 0;
  const units = Number(spec.maxUnits) || seats;
  return guests <= seats && guests + luggage <= units;
};

const setCapacityNote = (state) => {
  if (!capacityNote) return;
  if (!state) {
    capacityNote.hidden = true;
    capacityNote.textContent = "";
    capacityNote.removeAttribute("data-i18n");
    return;
  }
  const lang = document.documentElement.lang;
  const key =
    state === "none" ? "capacityNoVehicle" : "capacitySwitchedSprinter";
  capacityNote.dataset.i18n = key;
  capacityNote.textContent = translations[lang]?.[key] || capacityFallback[key];
  capacityNote.hidden = false;
  capacityNote.classList.toggle("capacity-note-error", state === "none");
};

const updateGuestCapacity = () => {
  const guests = Number(guestsSelect.value) || 1;
  const luggage = Number(luggageSelect?.value) || 0;

  Array.from(vehicleSelect.options).forEach((option) => {
    option.disabled = !vehicleFits(option.value, guests, luggage);
  });

  if (vehicleFits(vehicleSelect.value, guests, luggage)) {
    setCapacityNote(null);
    return;
  }

  const fit = VEHICLE_ORDER.find((key) => vehicleFits(key, guests, luggage));
  if (fit) {
    vehicleSelect.value = fit;
    setCapacityNote("switched");
    if (destinationSelect.value) updateInlinePrice(destinationSelect.value);
  } else {
    setCapacityNote("none");
  }
};

const updateInlinePrice = (routeKey, vehicleKey = vehicleSelect.value) => {
  const route = routeData[routeKey];
  const journeyCount = isRoundTrip() ? 2 : 1;
  const routeArrow = isRoundTrip() ? "⇄" : "→";
  const basePrice = route?.prices[vehicleKey];
  const baseOriginalPrice = route?.originalPrices?.[vehicleKey];
  const price = basePrice ? basePrice * journeyCount : 0;
  const originalPrice = baseOriginalPrice
    ? baseOriginalPrice * journeyCount
    : 0;
  currentQuoteData = {
    pickup: pickupSelect.value,
    destination: routeKey,
    vehicle: vehicleKey,
    price: price || 0,
    originalPrice: originalPrice || 0,
    tripType: getSelectedTripType(),
    journeyCount,
  };

  if (routeKey === "airport" && priceDisplay) {
    const language = document.documentElement.lang;
    const pickupName =
      pickupSelect.options[pickupSelect.selectedIndex]?.textContent.trim() ||
      pickupSelect.value;
    const airportName =
      airportDestinationOption?.textContent.trim() || "Antalya Airport (AYT)";
    const priceNote =
      translations[language]?.airportReturnPrice ||
      "The price will be confirmed after we check the hotel or pick-up address.";
    priceDisplay.innerHTML = `
      <span class="price-display-route">${pickupName} ${routeArrow} ${airportName}</span>
      <span class="price-display-note">${priceNote}</span>
    `;
    priceDisplay.classList.add("visible");
    return;
  }

  if (routeKey === "private_address" && priceDisplay) {
    const language = document.documentElement.lang;
    const pickupName =
      pickupSelect.options[pickupSelect.selectedIndex]?.textContent.trim() ||
      pickupSelect.value;
    const destLabel =
      destinationSelect.options[
        destinationSelect.selectedIndex
      ]?.textContent.trim() || "Private address";
    const priceNote =
      translations[language]?.customDestinationPrice ||
      "The price will be confirmed after we check the drop-off address.";
    priceDisplay.innerHTML = `
      <span class="price-display-route">${pickupName} ${routeArrow} ${destLabel}</span>
      <span class="price-display-note">${priceNote}</span>
    `;
    priceDisplay.classList.add("visible");
    return;
  }

  if (!route || !price || !priceDisplay) {
    priceDisplay?.classList.remove("visible");
    if (priceDisplay) priceDisplay.innerHTML = "";
    return;
  }
  const language = document.documentElement.lang;
  const vehicleName = fleetData[vehicleKey]?.name || vehicleKey;
  const fixedPriceNote =
    translations[language]?.perVehicle || "fixed · per vehicle";
  const priceNote = isRoundTrip()
    ? `${translations[language]?.roundTripPriceNote || tripTranslations.en.roundTripPriceNote} · ${fixedPriceNote}`
    : fixedPriceNote;
  priceDisplay.innerHTML = `
    <span class="price-display-route">AYT ${routeArrow} ${route.name}</span>
    <span class="price-display-prices">
      <strong class="price-display-amount">${formatEuroAmount(price)}</strong>
    </span>
    <span class="price-display-note">${vehicleName} · ${priceNote}</span>
  `;
  priceDisplay.classList.add("visible");
};

const updateTripTypeUI = () => {
  const roundTrip = isRoundTrip();
  returnJourneyRow.hidden = !roundTrip;
  returnJourneyRow.setAttribute("aria-hidden", String(!roundTrip));
  returnDateInput.required = roundTrip;
  returnPickupTimeInput.required = roundTrip;

  if (roundTrip) {
    returnDateInput.min = travelDate.value || localToday;
    if (!returnDateInput.value || returnDateInput.value < returnDateInput.min) {
      returnDateInput.value = returnDateInput.min;
    }
  } else {
    [returnDateInput, returnPickupTimeInput, returnFlightNumberInput].forEach(
      (input) => {
        input.value = "";
        const field = input.closest(".booking-field");
        field?.classList.remove("has-error");
        input.removeAttribute("aria-invalid");
        input.removeAttribute("aria-describedby");
        field?.querySelector(".field-error-message")?.remove();
      },
    );
    returnTimeControl.classList.remove("has-value");
    returnTimeValue.dataset.i18n = "chooseTime";
    returnTimeValue.textContent =
      translations[document.documentElement.lang]?.chooseTime ||
      paymentTranslations.en.chooseTime;
  }

  if (destinationSelect.value) updateInlinePrice(destinationSelect.value);
};

const updateDestinationAvailability = () => {
  if (!airportDestinationOption) return;

  const canSelectAirport = pickupSelect.value !== "airport";
  airportDestinationOption.disabled = !canSelectAirport;

  if (!canSelectAirport && destinationSelect.value === "airport") {
    destinationSelect.value = "";
    currentQuoteData = {};
    priceDisplay?.classList.remove("visible");
    if (priceDisplay) priceDisplay.innerHTML = "";
  }
};

const updatePickupAddress = () => {
  const needsAddress = pickupSelect.value === "private_address";
  pickupAddressRow.hidden = !needsAddress;
  pickupAddressInput.required = needsAddress;
  pickupAddressInput.setAttribute("aria-required", String(needsAddress));
  if (!needsAddress) {
    pickupAddressInput.value = "";
    const addressField = pickupAddressInput.closest(".booking-field");
    addressField?.classList.remove("has-error");
    pickupAddressInput.removeAttribute("aria-invalid");
    pickupAddressInput.removeAttribute("aria-describedby");
    addressField?.querySelector(".field-error-message")?.remove();
  }
};

const updateDropoffAddress = () => {
  const needsAddress = destinationSelect.value === "private_address";
  if (dropoffAddressRow) {
    dropoffAddressRow.hidden = !needsAddress;
    dropoffAddressInput.required = needsAddress;
    dropoffAddressInput.setAttribute("aria-required", String(needsAddress));
    if (!needsAddress) {
      dropoffAddressInput.value = "";
      const addressField = dropoffAddressInput.closest(".booking-field");
      addressField?.classList.remove("has-error");
      dropoffAddressInput.removeAttribute("aria-invalid");
      dropoffAddressInput.removeAttribute("aria-describedby");
      addressField?.querySelector(".field-error-message")?.remove();
    }
  }
};

const updateHotelRequirement = () => {
  const needsHotel =
    pickupSelect.value === "hotel" ||
    destinationSelect.value !== "private_address";
  hotelNameInput.required = needsHotel;
  hotelNameInput.setAttribute("aria-required", String(needsHotel));

  if (!needsHotel) {
    const hotelField = hotelNameInput.closest(".booking-field");
    hotelField?.classList.remove("has-error");
    hotelNameInput.removeAttribute("aria-invalid");
    hotelNameInput.removeAttribute("aria-describedby");
    hotelField?.querySelector(".field-error-message")?.remove();
  }
};

pickupSelect.addEventListener("change", () => {
  updatePickupAddress();
  updateDestinationAvailability();
  updateHotelRequirement();
  if (destinationSelect.value) updateInlinePrice(destinationSelect.value);
});

destinationSelect.addEventListener("change", () => {
  updateDropoffAddress();
  updateHotelRequirement();
  if (destinationSelect.value) {
    const routeName =
      routeData[destinationSelect.value]?.name || destinationSelect.value;
    const price =
      (routeData[destinationSelect.value]?.prices[vehicleSelect.value] || 0) *
      (isRoundTrip() ? 2 : 1);

    gtag("event", "view_item", {
      trip_type: getSelectedTripType(),
      items: [
        {
          item_id: destinationSelect.value,
          item_name: `Transfer to ${routeName}`,
          price: price,
        },
      ],
    });

    updateInlinePrice(destinationSelect.value);
  }
});

vehicleSelect.addEventListener("change", () => {
  updateGuestCapacity();
  if (destinationSelect.value) updateInlinePrice(destinationSelect.value);
  if (vehicleSelect.value) {
    gtag?.("event", "vehicle_selected", {
      vehicle: vehicleSelect.value,
      route: destinationSelect.value || null,
    });
  }
});

guestsSelect.addEventListener("change", updateGuestCapacity);
luggageSelect?.addEventListener("change", updateGuestCapacity);
tripTypeInputs.forEach((input) =>
  input.addEventListener("change", updateTripTypeUI),
);

updateGuestCapacity();
updatePickupAddress();
updateDropoffAddress();
updateDestinationAvailability();
updateHotelRequirement();
updateTripTypeUI();
if (destinationSelect.value) updateInlinePrice(destinationSelect.value);

const normalizeWhitespace = (value) => value.trim().replace(/\s+/g, " ");
const allowedPhoneCharacters = /[^\d+()\s.-]/g;
const flightNumberCharacters = /[^a-z0-9 -]/gi;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const flightNumberPattern = /^[a-z0-9][a-z0-9 -]{1,11}$/i;

const isValidName = (value) => {
  const normalized = normalizeWhitespace(value);
  const letterCount = normalized.match(/\p{L}/gu)?.length || 0;
  return (
    normalized.length >= 2 &&
    normalized.length <= 80 &&
    letterCount >= 2 &&
    !/\d/u.test(normalized)
  );
};

const isValidPhone = (value) => {
  const normalized = normalizeWhitespace(value);
  const digits = normalized.replace(/\D/g, "");
  const hasValidGeneralFormat =
    digits.length >= 7 &&
    digits.length <= 15 &&
    /^[+]?[\d\s().-]+$/.test(normalized) &&
    !/(?!^)\+/.test(normalized);

  if (!hasValidGeneralFormat) return false;

  const internationalNumber = normalized.replace(/^00/, "+");
  if (!internationalNumber.startsWith("+")) return false;

  return Boolean(parsePhoneNumberFromString(internationalNumber)?.isValid());
};

const isValidEmail = (value) => {
  const normalized = value.trim();
  return normalized.length <= 120 && emailPattern.test(normalized);
};

const isValidTravelDate = (value) => {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && value >= localToday;
};

const isValidFlightNumber = (value) => {
  const normalized = normalizeWhitespace(value);
  if (!normalized) return true;
  const alphanumericCount = normalized.replace(/[^a-z0-9]/gi, "").length;
  return (
    normalized.length >= 2 &&
    normalized.length <= 12 &&
    alphanumericCount >= 2 &&
    flightNumberPattern.test(normalized)
  );
};

const isValidHotelName = (value) => {
  const normalized = normalizeWhitespace(value);
  const letterCount = normalized.match(/\p{L}/gu)?.length || 0;
  return normalized.length >= 2 && normalized.length <= 120 && letterCount >= 2;
};

let _bookingStartedFired = false;
const _fireBookingStarted = () => {
  if (_bookingStartedFired) return;
  _bookingStartedFired = true;
  gtag?.("event", "booking_started", {
    route: destinationSelect.value || null,
    language: document.documentElement.lang || "en",
  });
};
nameInput?.addEventListener("focus", _fireBookingStarted, { once: true });

phoneInput.addEventListener("input", () => {
  const sanitized = phoneInput.value
    .replace(allowedPhoneCharacters, "")
    .replace(/(?!^)\+/g, "");
  if (phoneInput.value !== sanitized) phoneInput.value = sanitized;
});

flightNumberInput.addEventListener("input", () => {
  const sanitized = flightNumberInput.value
    .replace(flightNumberCharacters, "")
    .toUpperCase();
  if (flightNumberInput.value !== sanitized)
    flightNumberInput.value = sanitized;
});

returnFlightNumberInput.addEventListener("input", () => {
  const sanitized = returnFlightNumberInput.value
    .replace(flightNumberCharacters, "")
    .toUpperCase();
  if (returnFlightNumberInput.value !== sanitized) {
    returnFlightNumberInput.value = sanitized;
  }
});

const clearFieldError = (input) => {
  const field = input.closest(".booking-field");
  if (!field) return;
  field.classList.remove("has-error");
  input.removeAttribute("aria-invalid");
  input.removeAttribute("aria-describedby");
  field.querySelector(".field-error-message")?.remove();
};

const showFieldError = (input, message) => {
  const field = input.closest(".booking-field");
  if (!field) return;
  clearFieldError(input);
  field.classList.add("has-error");
  input.setAttribute("aria-invalid", "true");
  const error = document.createElement("span");
  error.className = "field-error-message";
  error.id = `${input.id}-error`;
  error.textContent = message;
  input.setAttribute("aria-describedby", error.id);
  field.append(error);
};

const validateBookingForm = () => {
  const language = document.documentElement.lang || "en";
  const copy = translations[language] || paymentTranslations.en;
  nameInput.value = normalizeWhitespace(nameInput.value);
  phoneInput.value = normalizeWhitespace(phoneInput.value);
  emailInput.value = emailInput.value.trim();
  flightNumberInput.value = normalizeWhitespace(
    flightNumberInput.value,
  ).toUpperCase();
  returnFlightNumberInput.value = normalizeWhitespace(
    returnFlightNumberInput.value,
  ).toUpperCase();
  hotelNameInput.value = normalizeWhitespace(hotelNameInput.value);

  const fields = [
    destinationSelect,
    travelDate,
    returnDateInput,
    returnPickupTimeInput,
    returnFlightNumberInput,
    pickupAddressInput,
    dropoffAddressInput,
    hotelNameInput,
    nameInput,
    phoneInput,
    emailInput,
    flightNumberInput,
  ];
  fields.forEach(clearFieldError);

  const errors = [];
  if (!destinationSelect.value) {
    errors.push([destinationSelect, copy.destinationRequired]);
  }
  if (!travelDate.value) {
    errors.push([travelDate, copy.requiredField]);
  } else if (!isValidTravelDate(travelDate.value)) {
    errors.push([travelDate, copy.dateInvalid]);
  }
  if (isRoundTrip()) {
    if (!returnDateInput.value) {
      errors.push([
        returnDateInput,
        copy.returnDateRequired || tripTranslations.en.returnDateRequired,
      ]);
    } else if (
      !isValidTravelDate(returnDateInput.value) ||
      returnDateInput.value < travelDate.value
    ) {
      errors.push([
        returnDateInput,
        copy.returnDateInvalid || tripTranslations.en.returnDateInvalid,
      ]);
    }
    if (!returnPickupTimeInput.value) {
      errors.push([
        returnPickupTimeInput,
        copy.returnTimeRequired || tripTranslations.en.returnTimeRequired,
      ]);
    }
    if (!isValidFlightNumber(returnFlightNumberInput.value)) {
      errors.push([returnFlightNumberInput, copy.flightInvalid]);
    }
  }
  if (pickupSelect.value === "private_address") {
    pickupAddressInput.value = normalizeWhitespace(pickupAddressInput.value);
    if (
      pickupAddressInput.value.length < 6 ||
      pickupAddressInput.value.length > 160
    ) {
      errors.push([pickupAddressInput, copy.pickupAddressRequired]);
    }
  }
  if (destinationSelect.value === "private_address" && dropoffAddressInput) {
    dropoffAddressInput.value = normalizeWhitespace(dropoffAddressInput.value);
    if (
      dropoffAddressInput.value.length < 6 ||
      dropoffAddressInput.value.length > 160
    ) {
      errors.push([dropoffAddressInput, copy.dropoffAddressRequired]);
    }
  }
  if (
    pickupSelect.value === "private_address" &&
    destinationSelect.value === "private_address" &&
    pickupAddressInput.value.length >= 6 &&
    dropoffAddressInput.value.length >= 6 &&
    pickupAddressInput.value.toLocaleLowerCase() ===
      dropoffAddressInput.value.toLocaleLowerCase()
  ) {
    errors.push([
      dropoffAddressInput,
      copy.addressesMustDiffer || paymentTranslations.en.addressesMustDiffer,
    ]);
  }
  const hotelRequired =
    pickupSelect.value === "hotel" ||
    destinationSelect.value !== "private_address";
  if (hotelRequired && !hotelNameInput.value.trim()) {
    errors.push([hotelNameInput, copy.requiredField]);
  } else if (hotelNameInput.value && !isValidHotelName(hotelNameInput.value)) {
    errors.push([hotelNameInput, copy.hotelNameRequired]);
  }
  if (!nameInput.value.trim()) {
    errors.push([nameInput, copy.requiredField]);
  } else if (!isValidName(nameInput.value)) {
    errors.push([nameInput, copy.nameInvalid]);
  }
  if (!phoneInput.value.trim()) {
    errors.push([phoneInput, copy.requiredField]);
  } else if (!isValidPhone(phoneInput.value)) {
    errors.push([phoneInput, copy.phoneInvalid]);
  }
  if (!emailInput.value.trim()) {
    errors.push([emailInput, copy.requiredField]);
  } else if (!emailInput.checkValidity() || !isValidEmail(emailInput.value)) {
    errors.push([emailInput, copy.emailInvalid]);
  }
  if (!isValidFlightNumber(flightNumberInput.value)) {
    errors.push([flightNumberInput, copy.flightInvalid]);
  }

  errors.forEach(([input, message]) => showFieldError(input, message));
  if (!errors.length) return true;

  paymentErrorMessage.textContent = copy.formIncomplete;
  paymentErrorMessage.hidden = false;
  errors[0][0].focus();
  errors[0][0]
    .closest(".booking-field")
    ?.scrollIntoView({ behavior: "smooth", block: "center" });
  return false;
};

quoteForm.querySelectorAll("input, select").forEach((input) => {
  input.addEventListener(
    input.tagName === "SELECT" ? "change" : "input",
    () => {
      clearFieldError(input);
      paymentErrorMessage.hidden = true;
    },
  );
});

const setupTimePicker = (input, control, valueElement) => {
  const syncState = () => {
    const hasValue = Boolean(input.value);
    control.classList.toggle("has-value", hasValue);

    if (hasValue) {
      valueElement.removeAttribute("data-i18n");
      valueElement.textContent = input.value;
    } else {
      valueElement.dataset.i18n = "chooseTime";
      valueElement.textContent =
        translations[document.documentElement.lang]?.chooseTime ||
        paymentTranslations.en.chooseTime;
    }
  };

  control.addEventListener("click", (event) => {
    if (event.target === input) return;
    event.preventDefault();
    input.focus();

    try {
      if (typeof input.showPicker === "function") {
        input.showPicker();
      } else {
        input.click();
      }
    } catch {
      input.click();
    }
  });

  input.addEventListener("input", syncState);
  input.addEventListener("change", syncState);
  syncState();
  return syncState;
};

const syncArrivalTimeState = setupTimePicker(
  arrivalTimeInput,
  arrivalTimeControl,
  arrivalTimeValue,
);
const syncReturnTimeState = setupTimePicker(
  returnPickupTimeInput,
  returnTimeControl,
  returnTimeValue,
);
syncArrivalTimeState();
syncReturnTimeState();

const setWhatsAppBookingUrl = (details) => {
  const waBtn = document.querySelector("#confirmed-whatsapp");
  if (!waBtn) return;
  const lines = ["🚗 *Antalya VIP Tourism — New Booking*"];
  if (details.ref) lines.push(`📋 Ref: ${details.ref}`);
  if (details.name) lines.push(`👤 Name: ${details.name}`);
  if (details.phone) lines.push(`📞 Phone: ${details.phone}`);
  if (details.email) lines.push(`✉️ Email: ${details.email}`);
  if (details.tripType) lines.push(`↔️ Journey: ${details.tripType}`);
  if (details.date) lines.push(`📅 Date: ${details.date}`);
  if (details.hotel) lines.push(`🏨 Hotel: ${details.hotel}`);
  if (details.childSeats) lines.push(`👶 Child seats: ${details.childSeats}`);
  if (details.luggage) lines.push(`🧳 Luggage: ${details.luggage}`);
  if (details.pickup) lines.push(`📍 Pickup: ${details.pickup}`);
  if (details.dropoff) lines.push(`🏁 Dropoff: ${details.dropoff}`);
  if (details.vehicle) lines.push(`🚘 Vehicle: ${details.vehicle}`);
  if (details.guests) lines.push(`👥 Guests: ${details.guests}`);
  if (details.flight) lines.push(`✈️ Flight: ${details.flight}`);
  if (details.arrival) lines.push(`🕐 Arrival: ${details.arrival}`);
  if (details.returnDate) lines.push(`📅 Return date: ${details.returnDate}`);
  if (details.returnPickupTime)
    lines.push(`🕐 Return pickup: ${details.returnPickupTime}`);
  if (details.returnFlight)
    lines.push(`✈️ Return flight: ${details.returnFlight}`);
  if (details.price) lines.push(`💶 Price: ${formatEuroAmount(details.price)}`);
  if (details.payment) lines.push(`💳 Payment: ${details.payment}`);
  const msg = encodeURIComponent(lines.join("\n"));
  waBtn.href = `https://wa.me/905302655790?text=${msg}`;
};

const openConfirmation = () => {
  quoteModal.classList.add("open");
  quoteModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  quoteModal.querySelector(".modal-close").focus();
};

const closeConfirmation = () => {
  quoteModal.classList.remove("open");
  quoteModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
};

quoteForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  paymentErrorMessage.hidden = true;
  paymentErrorMessage.textContent = "";

  if (!validateBookingForm()) return;

  gtag("event", "begin_checkout", {
    currency: "EUR",
    value: currentQuoteData.price || 0,
    trip_type: getSelectedTripType(),
    items: [
      {
        item_id: currentQuoteData.destination,
        item_name: `Transfer to ${currentQuoteData.destination}`,
        price: currentQuoteData.price || 0,
        quantity: 1,
      },
    ],
  });

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const email = emailInput.value.trim();
  const hotelName = hotelNameInput.value.trim();
  const childSeatCount = parseInt(childSeatsSelect.value || "0", 10);
  const luggageCount = parseInt(luggageSelect?.value || "0", 10);
  const pickupAddress = pickupAddressInput.value.trim();
  const tripType = getSelectedTripType();

  const submitBtn = document.querySelector("#main-book-submit");
  submitBtn.disabled = true;
  const originalText = submitBtn.querySelector("span").textContent;
  submitBtn.querySelector("span").textContent = "…";

  if (!currentQuoteData.destination) {
    const journeyCount = tripType === "round_trip" ? 2 : 1;
    currentQuoteData = {
      pickup: pickupSelect.value,
      destination: destinationSelect.value,
      vehicle: vehicleSelect.value,
      price:
        (routeData[destinationSelect.value]?.prices[vehicleSelect.value] || 0) *
        journeyCount,
      tripType,
      journeyCount,
    };
  }

  try {
    const { createBooking } = await import("./lib/api.js");
    const booking = await createBooking({
      customer_name: name,
      customer_email: email,
      customer_phone: phone,
      hotel_name: hotelName,
      child_seat_count: childSeatCount,
      luggage_count: luggageCount,
      flight_number: flightNumberInput.value.trim() || null,
      flight_arrival_time:
        document.querySelector("#flight-arrival-time").value || null,
      pickup_location: currentQuoteData.pickup || "airport",
      pickup_address:
        currentQuoteData.pickup === "private_address" ? pickupAddress : null,
      dropoff_address:
        currentQuoteData.destination === "private_address"
          ? dropoffAddressInput?.value.trim() || null
          : null,
      dropoff_location: currentQuoteData.destination || "",
      pickup_date: document.querySelector("#travel-date").value,
      trip_type: tripType,
      return_date: tripType === "round_trip" ? returnDateInput.value : null,
      return_pickup_time:
        tripType === "round_trip" ? returnPickupTimeInput.value : null,
      return_flight_number:
        tripType === "round_trip"
          ? returnFlightNumberInput.value.trim() || null
          : null,
      guests: parseInt(document.querySelector("#guests").value, 10),
      vehicle_type: currentQuoteData.vehicle === "sprinter" ? "vclass" : "vito",
      payment_method: "cash",
      language: document.documentElement.lang || "en",
      ..._utmParams,
    });

    document.querySelector("#confirmed-ref").textContent = booking.booking_ref;
    const confirmationKey =
      currentQuoteData.destination === "airport"
        ? "airportReturnPrice"
        : currentQuoteData.destination === "private_address"
          ? "customDestinationPrice"
          : "cashConfirmation";
    confirmationMessage.dataset.i18n = confirmationKey;
    confirmationMessage.textContent =
      translations[document.documentElement.lang]?.[confirmationKey] ||
      (confirmationKey === "airportReturnPrice"
        ? "The price will be confirmed after we check the hotel or pick-up address."
        : confirmationKey === "customDestinationPrice"
          ? paymentTranslations.en.customDestinationPrice
          : paymentTranslations.en.cashConfirmation);

    if (currentQuoteData.price > 0) {
      gtag("event", "purchase", {
        transaction_id: booking.booking_ref,
        currency: "EUR",
        value: currentQuoteData.price,
        payment_type: "cash",
        items: [
          {
            item_id: currentQuoteData.destination,
            item_name: `Transfer to ${currentQuoteData.destination}`,
            price: currentQuoteData.price,
            quantity: 1,
          },
        ],
      });
      gtag("event", "conversion", {
        send_to: "AW-18248114753/IW8CCL7H38AcEMHEsP1D",
        transaction_id: booking.booking_ref,
        value: currentQuoteData.price,
        currency: "EUR",
      });
    }

    setWhatsAppBookingUrl({
      ref: booking.booking_ref,
      name,
      phone,
      email,
      date: document.querySelector("#travel-date").value,
      tripType: tripType === "round_trip" ? "Round trip" : "One way",
      hotel: hotelName,
      childSeats: childSeatCount,
      luggage: luggageCount,
      pickup:
        currentQuoteData.pickup === "private_address"
          ? pickupAddress
          : currentQuoteData.pickup === "airport"
            ? "Antalya Airport"
            : hotelName,
      dropoff:
        currentQuoteData.destination === "airport"
          ? "Antalya Airport"
          : currentQuoteData.destination === "private_address"
            ? dropoffAddressInput.value.trim()
            : routeData[currentQuoteData.destination]?.name ||
              currentQuoteData.destination,
      vehicle:
        currentQuoteData.vehicle === "sprinter"
          ? "V-Class (Sprinter)"
          : "Mercedes Vito",
      guests: document.querySelector("#guests").value,
      flight: flightNumberInput.value.trim() || null,
      arrival: document.querySelector("#flight-arrival-time").value || null,
      returnDate: tripType === "round_trip" ? returnDateInput.value : null,
      returnPickupTime:
        tripType === "round_trip" ? returnPickupTimeInput.value : null,
      returnFlight:
        tripType === "round_trip"
          ? returnFlightNumberInput.value.trim() || null
          : null,
      price: currentQuoteData.price || null,
      payment: "Cash in vehicle",
    });
    event.target.reset();
    travelDate.value = localToday;
    currentQuoteData = {};
    updateGuestCapacity();
    updatePickupAddress();
    updateDropoffAddress();
    updateDestinationAvailability();
    updateHotelRequirement();
    updateTripTypeUI();
    syncArrivalTimeState();
    syncReturnTimeState();
    if (priceDisplay) priceDisplay.classList.remove("visible");
    openConfirmation();
  } catch (err) {
    console.error("Booking error:", err);
    const language = document.documentElement.lang || "en";
    paymentErrorMessage.textContent =
      translations[language]?.bookingError ||
      paymentTranslations.en.bookingError;
    paymentErrorMessage.hidden = false;
  } finally {
    submitBtn.disabled = false;
    if (submitBtn.querySelector("span").textContent === "…") {
      submitBtn.querySelector("span").textContent = originalText;
    }
    syncArrivalTimeState();
    syncReturnTimeState();
  }
});

document.querySelectorAll(".route-price-button").forEach((button) => {
  button.addEventListener("click", () => {
    const selectedVehicle =
      button.dataset.vehicle || vehicleSelect.value || "vito";
    destinationSelect.value = button.dataset.route;
    vehicleSelect.value = selectedVehicle;
    updateDropoffAddress();
    updateHotelRequirement();
    updateGuestCapacity();
    updateInlinePrice(button.dataset.route, selectedVehicle);
    gtag?.("event", "route_selected", {
      route: button.dataset.route,
      source: "route_card",
    });
    document.querySelector("#booking").scrollIntoView({ behavior: "smooth" });
    setTimeout(() => document.querySelector("#customer-name").focus(), 600);
  });
});

const routeSlider = document.querySelector("#route-slider");
const routeSliderPrev = document.querySelector(".route-slider-prev");
const routeSliderNext = document.querySelector(".route-slider-next");

const updateRouteSliderControls = () => {
  if (!routeSlider) return;
  const maxScroll = routeSlider.scrollWidth - routeSlider.clientWidth;
  routeSliderPrev.disabled = routeSlider.scrollLeft <= 4;
  routeSliderNext.disabled = routeSlider.scrollLeft >= maxScroll - 4;
};

const scrollRouteSlider = (direction) => {
  const card = routeSlider?.querySelector(".route-card");
  if (!routeSlider || !card) return;
  const gap = parseFloat(getComputedStyle(routeSlider).gap) || 0;
  routeSlider.scrollBy({
    left: direction * (card.getBoundingClientRect().width + gap),
    behavior: "smooth",
  });
};

routeSliderPrev?.addEventListener("click", () => scrollRouteSlider(-1));
routeSliderNext?.addEventListener("click", () => scrollRouteSlider(1));
routeSlider?.addEventListener("scroll", updateRouteSliderControls, {
  passive: true,
});
routeSlider?.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    scrollRouteSlider(-1);
  }
  if (event.key === "ArrowRight") {
    event.preventDefault();
    scrollRouteSlider(1);
  }
});
window.addEventListener("resize", updateRouteSliderControls);
updateRouteSliderControls();

document.querySelectorAll(".price-pill").forEach((pill) => {
  pill.addEventListener("click", () => {
    destinationSelect.value = pill.dataset.route;
    updateDropoffAddress();
    updateHotelRequirement();
    updateInlinePrice(pill.dataset.route);
    gtag?.("event", "route_selected", {
      route: pill.dataset.route,
      source: "price_pill",
    });
    document.querySelector("#booking").scrollIntoView({ behavior: "smooth" });
    setTimeout(() => document.querySelector("#customer-name").focus(), 600);
  });
});

quoteModal
  .querySelector(".modal-close")
  .addEventListener("click", closeConfirmation);
quoteModal
  .querySelector(".modal-backdrop")
  .addEventListener("click", closeConfirmation);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeConfirmation();
    closeMenu();
  }
});

const LANG_FLAGS = {
  en: "🇬🇧",
  de: "🇩🇪",
  tr: "🇹🇷",
  ru: "🇷🇺",
  ar: "🇸🇦",
  pl: "🇵🇱",
  nl: "🇳🇱",
  uk: "🇺🇦",
  fr: "🇫🇷",
  sv: "🇸🇪",
  ja: "🇯🇵",
  ko: "🇰🇷",
};

const langDropdown = document.getElementById("lang-dropdown");
const langTrigger = langDropdown?.querySelector(".lang-trigger");
const langFlagEl = langDropdown?.querySelector(".lang-flag-current");

const closeLangDropdown = () => {
  langDropdown?.classList.remove("open");
  langTrigger?.setAttribute("aria-expanded", "false");
};

langTrigger?.addEventListener("click", (e) => {
  e.stopPropagation();
  const isOpen = langDropdown.classList.toggle("open");
  langTrigger.setAttribute("aria-expanded", String(isOpen));
});

document.addEventListener("click", (e) => {
  if (langDropdown && !langDropdown.contains(e.target)) closeLangDropdown();
});

const applyLanguage = (language) => {
  const supportedLanguage =
    translations[language] || language === "en" ? language : "en";
  document.documentElement.lang = supportedLanguage;
  document.documentElement.dir = ["ar", "ur"].includes(supportedLanguage)
    ? "rtl"
    : "ltr";

  if (langFlagEl)
    langFlagEl.textContent = LANG_FLAGS[supportedLanguage] || "🌐";

  document.querySelectorAll(".language-button").forEach((item) => {
    const isActive = item.dataset.language === supportedLanguage;
    item.classList.toggle("active", isActive);
    item.setAttribute("aria-pressed", String(isActive));
  });

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    if (!element.dataset.original) element.dataset.original = element.innerHTML;
    element.innerHTML = resolvePriceTokens(
      translations[supportedLanguage]?.[element.dataset.i18n] ||
        element.dataset.original,
    );
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    if (!element.dataset.originalPlaceholder) {
      element.dataset.originalPlaceholder =
        element.getAttribute("placeholder") || "";
    }
    element.setAttribute(
      "placeholder",
      translations[supportedLanguage]?.[element.dataset.i18nPlaceholder] ||
        element.dataset.originalPlaceholder,
    );
  });

  const activeFleet = document.querySelector(".fleet-tab.active");
  if (activeFleet) updateFleet(activeFleet.dataset.fleet);
  if (destinationSelect.value && priceDisplay.classList.contains("visible")) {
    updateInlinePrice(destinationSelect.value);
  }
  try {
    localStorage.setItem("avl-language", supportedLanguage);
  } catch {}
};

document.querySelectorAll(".language-button").forEach((button) => {
  button.addEventListener("click", () => {
    const language = button.dataset.language;
    const languageUrl = getLanguageUrl(language);
    if (languageUrl) {
      try {
        localStorage.setItem("avl-language", language);
      } catch {}
      window.location.assign(languageUrl);
      return;
    }

    gtag?.("event", "language_selected", { language });
    applyLanguage(language);
    closeLangDropdown();
    if (mobileMenu.classList.contains("open")) closeMenu();
  });
});

const normalizeDirectoryPath = (pathname) => {
  if (pathname.endsWith("/")) return pathname;
  if (pathname.endsWith("/index.html")) {
    return pathname.replace(/index\.html$/, "");
  }
  return `${pathname}/`;
};

function getLanguageUrl(language) {
  const pathname = normalizeDirectoryPath(window.location.pathname);
  const hash = window.location.hash || "";

  const localizedMatch = pathname.match(/^\/(de|tr|ru)(\/.*)?$/);
  const basePath = localizedMatch ? localizedMatch[2] || "/" : pathname;
  const isIndexablePath =
    basePath === "/" || basePath.startsWith("/transfers/");

  if (isIndexablePath && ["en", "de", "tr", "ru"].includes(language)) {
    const prefix = language === "en" ? "" : `/${language}`;
    return `${prefix}${basePath}${hash}`;
  }

  return null;
}

const SUPPORTED_LANGS = [
  "en",
  "de",
  "tr",
  "ru",
  "cs",
  "ar",
  "pl",
  "nl",
  "uk",
  "ur",
  "fr",
  "sv",
  "ja",
  "ko",
];

function detectBrowserLanguage() {
  const langs = navigator.languages?.length
    ? navigator.languages
    : [navigator.language || "en"];
  for (const l of langs) {
    const code = l.split("-")[0].toLowerCase();
    if (SUPPORTED_LANGS.includes(code)) return code;
  }
  return "en";
}

const pathLanguage =
  window.location.pathname.match(/^\/(de|tr|ru)(?:\/|$)/)?.[1] ||
  document.documentElement.lang ||
  "en";
let savedLanguage = pathLanguage;
try {
  savedLanguage = ["de", "tr", "ru"].includes(pathLanguage)
    ? pathLanguage
    : localStorage.getItem("avl-language") ||
      pathLanguage ||
      detectBrowserLanguage();
} catch {
  savedLanguage = pathLanguage || detectBrowserLanguage();
}
applyLanguage(savedLanguage);

const _utmParams = (() => {
  try {
    const sp = new URLSearchParams(window.location.search);
    const stored = JSON.parse(sessionStorage.getItem("avl-attribution") || "{}");
    const fresh = {
      utm_source: sp.get("utm_source"),
      utm_medium: sp.get("utm_medium"),
      utm_campaign: sp.get("utm_campaign"),
      utm_term: sp.get("utm_term"),
      utm_content: sp.get("utm_content"),
      gclid: sp.get("gclid"),
    };
    const merged = {};
    for (const k of Object.keys(fresh)) merged[k] = fresh[k] || stored[k] || null;
    merged.landing_page = stored.landing_page || window.location.pathname;
    merged.referrer = stored.referrer || (document.referrer || null);
    sessionStorage.setItem("avl-attribution", JSON.stringify(merged));
    return merged;
  } catch {
    return {};
  }
})();

gtag?.("event", "landing_view", {
  language: savedLanguage,
  page: window.location.pathname,
  source: document.referrer ? "referral" : "direct",
  utm_source: _utmParams.utm_source,
  utm_campaign: _utmParams.utm_campaign,
});

document.querySelectorAll("a[href*='wa.me']").forEach((link) => {
  link.addEventListener(
    "click",
    () => {
      gtag?.("event", "whatsapp_clicked", {
        source: link.closest("[id]")?.id || "unknown",
      });
    },
    { once: false },
  );
});

document.querySelectorAll("a[href^='tel:']").forEach((link) => {
  link.addEventListener("click", () => {
    gtag?.("event", "phone_clicked", {
      source: link.closest("[id]")?.id || "unknown",
    });
  });
});

// Handle the verified iyzico callback return.
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("payment") === "success" && urlParams.get("booking_ref")) {
  const bookingRef = urlParams.get("booking_ref");
  document.querySelector("#confirmed-ref").textContent = bookingRef;
  confirmationMessage.dataset.i18n = "weWillContact";
  confirmationMessage.textContent =
    translations[document.documentElement.lang]?.weWillContact ||
    "Your payment was successful. We will contact you within 30 minutes.";
  setWhatsAppBookingUrl({ ref: bookingRef, payment: "Card (paid online)" });
  openConfirmation();
  window.history.replaceState({}, "", window.location.pathname);
} else if (urlParams.get("payment") === "failed") {
  const language = document.documentElement.lang || "en";
  paymentErrorMessage.textContent =
    translations[language]?.paymentError || "Payment failed. Please try again.";
  paymentErrorMessage.hidden = false;
  document.querySelector("#booking").scrollIntoView({ behavior: "smooth" });
  window.history.replaceState({}, "", window.location.pathname);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document
  .querySelectorAll(".service-card, .route-card, .review-card")
  .forEach((element) => {
    const siblings = Array.from(element.parentElement.children);
    const delay = (siblings.indexOf(element) % 4) * 0.09;
    element.style.opacity = "0";
    element.style.transform = "translateY(22px)";
    element.style.transition = `opacity .65s ease ${delay}s, transform .65s ease ${delay}s, box-shadow .35s ease`;
    observer.observe(element);
  });

const revealStyle = document.createElement("style");
revealStyle.textContent =
  ".is-visible{opacity:1!important;transform:translateY(0)!important}";
document.head.appendChild(revealStyle);

// Count-up animation for luxury stats
document.querySelectorAll(".luxury-stats strong").forEach((el) => {
  const raw = el.textContent.trim();
  const match = raw.match(/^([\d,]+)(\+?)(%?)$/);
  if (!match) return;
  const target = parseInt(match[1].replace(/,/g, ""), 10);
  const suffix = match[2] + match[3];
  const statsObs = new IntersectionObserver(
    (entries) => {
      if (!entries[0].isIntersecting) return;
      statsObs.unobserve(el);
      let startTs = null;
      const duration = 1800;
      const step = (ts) => {
        if (!startTs) startTs = ts;
        const progress = Math.min((ts - startTs) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);
        el.textContent =
          (current >= 1000 ? current.toLocaleString() : current) + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else
          el.textContent =
            (target >= 1000 ? target.toLocaleString() : target) + suffix;
      };
      requestAnimationFrame(step);
    },
    { threshold: 0.5 },
  );
  statsObs.observe(el);
});

// Mobile sticky booking bar
const bookBar = document.createElement("div");
bookBar.className = "mobile-book-bar";
bookBar.innerHTML = `
  <a class="button button-gold" href="#booking">
    <span data-i18n="bookTransfer">Book your transfer</span>
    <svg class="icon" aria-hidden="true"><use href="#icon-arrow-right"></use></svg>
  </a>
  <a class="btn-wa" href="https://wa.me/905302655790" target="_blank" rel="noreferrer" aria-label="WhatsApp">
    <svg aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" viewBox="0 0 24 24"><path d="M20 11.5a8 8 0 0 1-11.8 7L3 20l1.5-5.1A8 8 0 1 1 20 11.5Z"/><path d="M8 8.5c.8 3 2.5 4.7 5.5 5.5"/></svg>
  </a>
`;
document.body.appendChild(bookBar);

const bookBarLabel = bookBar.querySelector("[data-i18n='bookTransfer']");
bookBarLabel.dataset.original = bookBarLabel.innerHTML;
bookBarLabel.innerHTML =
  translations[document.documentElement.lang]?.bookTransfer ||
  bookBarLabel.dataset.original;

const heroSection = document.querySelector(".hero");
const barObs = new IntersectionObserver(
  (entries) => {
    bookBar.classList.toggle("visible", !entries[0].isIntersecting);
  },
  { threshold: 0.1 },
);
barObs.observe(heroSection);
