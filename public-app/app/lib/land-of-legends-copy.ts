import type { LandOfLegendsErrors } from "./land-of-legends";

/**
 * Copy for the Land of Legends excursion page. Published in the four
 * languages that bring most of our guests; any other site language reads the
 * English copy (the page itself only exists under these four).
 */
export const landOfLegendsLanguages = ["en", "de", "tr", "ru"] as const;
export type LandOfLegendsLanguage = (typeof landOfLegendsLanguages)[number];

export type LandOfLegendsCopy = {
  locale: string;
  metaTitle: string;
  metaDescription: (fromPrice: number) => string;
  home: string;
  transfers: string;
  bookNow: string;
  eyebrow: string;
  heading: string;
  intro: string;
  fromLabel: (price: number) => string;
  highlights: readonly string[];
  priceTableTitle: string;
  priceTableNote: string;
  regionColumn: string;
  onRequest: string;
  formTitle: string;
  ticketsNotIncluded: string;
  meetingLabel: string;
  shortNotice: string;
  driveTime: (minutes: number, area: string) => string;
  regionOnRequest: string;
  sprinterNote: (guests: number) => string;
  bigGroup: string;
  askWhatsapp: string;
  confirmedPriceLabel: string;
  /** Journey-type option and hint inside the main airport booking form. */
  tripOption: string;
  tripHint: string;
  detailsLink: string;
  hotelLabel: string;
  hotelPlaceholder: string;
  hotelNotListed: string;
  hotelNoMatch: string;
  hotelMatched: (hotel: string, region: string) => string;
  hotelUnmatched: string;
  dateLabel: string;
  departureLabel: string;
  departureHint: string;
  returnLabel: string;
  returnHint: string;
  guestsLabel: string;
  vehicleLabel: string;
  vito: string;
  sprinter: string;
  childSeatsLabel: string;
  childSeatNone: string;
  childAgeLabel: (index: number) => string;
  childAgeSelect: string;
  childAgeBaby: string;
  strollersLabel: string;
  nameLabel: string;
  phoneLabel: string;
  emailLabel: string;
  notesLabel: string;
  notesPlaceholder: string;
  totalLabel: string;
  totalIncludes: string;
  quoteOnRequest: string;
  payInCar: string;
  submit: string;
  submitting: string;
  submitError: string;
  confirmedTitle: string;
  confirmedFixed: string;
  confirmedQuote: string;
  reference: string;
  whatsappCta: string;
  newBooking: string;
  faqTitle: string;
  faq: ReadonlyArray<readonly [string, string]>;
  errors: LandOfLegendsErrors;
  /** Region names as table headings, where the route catalog's wording does not fit (e.g. Russian cases). */
  regionNames?: Readonly<Record<string, string>>;
};

const en: LandOfLegendsCopy = {
  locale: "en_GB",
  metaTitle: "The Land of Legends Transfer from Your Hotel | Antalya VIP Tourism",
  metaDescription: (from) => `Private return transfer from your hotel in Antalya, Belek, Side, Kemer or Alanya to The Land of Legends. Driver waits for you, fixed price per vehicle from €${from}, pay in the car.`,
  home: "Home",
  transfers: "Airport transfers",
  bookNow: "Book now",
  eyebrow: "Theme park day trip",
  heading: "The Land of Legends transfer — there and back, driver waits",
  intro: "Pick your hotel, choose when to leave and when to come back. Your private Mercedes takes you to The Land of Legends in Kadriye, waits for you until you are done — even after the evening show — and brings you back to your hotel. Park tickets are not included.",
  fromLabel: (price) => `from €${price} per vehicle`,
  highlights: [
    "Return journey and waiting included",
    "Fixed price per vehicle, not per person",
    "Child seats free of charge",
    "Pay in cash in the car — no prepayment",
    "Park tickets not included",
  ],
  priceTableTitle: "Fixed prices by hotel area",
  priceTableNote: "Per vehicle, hotel → The Land of Legends → hotel, waiting included. Mercedes Vito up to 6 guests, Sprinter up to 12.",
  regionColumn: "Hotel area",
  onRequest: "On request",
  formTitle: "Book your Land of Legends transfer",
  ticketsNotIncluded: "Park tickets not included",
  meetingLabel: "Meeting point for the ride back",
  shortNotice: "Short notice: we confirm your driver on WhatsApp before the trip.",
  driveTime: (minutes, area) => `About ${minutes} min drive from ${area} — leave in time for opening.`,
  regionOnRequest: "This area is priced on request — book now and we confirm the price on WhatsApp.",
  sprinterNote: (guests) => `We selected the Sprinter for ${guests} guests.`,
  bigGroup: "13 or more guests? We send two vehicles — message us on WhatsApp.",
  askWhatsapp: "Questions? WhatsApp us",
  confirmedPriceLabel: "Price per vehicle, cash in the car",
  tripOption: "The Land of Legends",
  tripHint: "Day trip from your hotel: we take you to the park, the driver waits until you are done and brings you back. Fixed price per vehicle; park tickets not included.",
  detailsLink: "Prices by area and details",
  hotelLabel: "Your hotel",
  hotelPlaceholder: "Start typing your hotel name",
  hotelNotListed: "My hotel is not in the list",
  hotelNoMatch: "No match yet — type the full name and we will confirm the price.",
  hotelMatched: (hotel, region) => `${hotel} — priced as ${region}`,
  hotelUnmatched: "We could not place this hotel automatically. Book anyway — we confirm the price on WhatsApp before your trip.",
  dateLabel: "Date of visit",
  departureLabel: "Pick-up at your hotel",
  departureHint: "The park opens at 10:00.",
  returnLabel: "Pick-up at The Land of Legends",
  returnHint: "Up to 23:30 — stay for the evening show.",
  guestsLabel: "Guests",
  vehicleLabel: "Vehicle",
  vito: "Mercedes Vito (up to 6)",
  sprinter: "Mercedes Sprinter (up to 12)",
  childSeatsLabel: "Child seats",
  childSeatNone: "No child seat",
  childAgeLabel: (index) => `Child ${index} age`,
  childAgeSelect: "Select age",
  childAgeBaby: "Under 1",
  strollersLabel: "Baby strollers",
  nameLabel: "Full name",
  phoneLabel: "Phone / WhatsApp",
  emailLabel: "Email",
  notesLabel: "Notes (optional)",
  notesPlaceholder: "Room number, special requests…",
  totalLabel: "Total price",
  totalIncludes: "Return trip + waiting, per vehicle",
  quoteOnRequest: "Price confirmed on WhatsApp",
  payInCar: "You pay the driver in cash at the start of the trip.",
  submit: "Book transfer",
  submitting: "Sending…",
  submitError: "Your booking could not be completed. Please try again or write to us on WhatsApp.",
  confirmedTitle: "Booking received",
  confirmedFixed: "Your Land of Legends transfer is booked. Your driver's details follow on WhatsApp the day before.",
  confirmedQuote: "Your request is in. We will confirm the price for your hotel on WhatsApp shortly.",
  reference: "Reference",
  whatsappCta: "Send to us on WhatsApp",
  newBooking: "Make another booking",
  faqTitle: "Good to know",
  faq: [
    ["Does the driver really wait the whole day?", "Yes. The price includes the wait, so the same driver who drops you off picks you up at the time you chose — up to 23:30, after the evening show."],
    ["Where do we meet the driver for the ride back?", "At the main entrance car park, at the time you chose. Your driver sends you a WhatsApp message on the day with his name and number."],
    ["Is the price per person?", "No. The price is for the whole vehicle: a Vito carries up to 6 guests, a Sprinter up to 12."],
    ["What if we want to leave earlier or later?", "Message your driver on WhatsApp. Changes on the day are usually no problem; a return after 23:30 needs our OK first, so message us on WhatsApp."],
    ["Are park tickets included?", "No, this is the transfer only. Buy your Land of Legends tickets at the park or online."],
  ],
  errors: {
    hotel: "Please enter your hotel name.",
    date: "Please choose a date from today on.",
    time: "Please choose a time.",
    visit: "The park pick-up must be at least 2 hours later and no later than 23:30. Want to stay later? Message us on WhatsApp.",
    tooSoon: "We need at least 3 hours' notice. For a sooner pick-up, message us on WhatsApp.",
    guests: "This group needs a larger vehicle — choose the Sprinter or contact us on WhatsApp.",
    childAge: "Please select the child's age.",
    name: "Please enter your full name.",
    phone: "Please enter a valid international phone number.",
    email: "Please enter a valid email address.",
  },
};

const de: LandOfLegendsCopy = {
  ...en,
  locale: "de_DE",
  metaTitle: "Transfer zum The Land of Legends ab Ihrem Hotel | Antalya VIP Tourism",
  metaDescription: (from) => `Privater Hin- und Rücktransfer von Ihrem Hotel in Antalya, Belek, Side, Kemer oder Alanya zum The Land of Legends. Der Fahrer wartet, Festpreis pro Fahrzeug ab ${from} €, Zahlung im Auto.`,
  home: "Startseite",
  transfers: "Flughafentransfers",
  bookNow: "Jetzt buchen",
  eyebrow: "Tagesausflug in den Freizeitpark",
  heading: "Transfer zum The Land of Legends — hin und zurück, der Fahrer wartet",
  intro: "Hotel wählen, Abfahrt und Rückfahrt festlegen. Ihr privater Mercedes bringt Sie zum The Land of Legends in Kadriye, wartet, bis Sie fertig sind — auch nach der Abendshow — und bringt Sie zurück ins Hotel. Parktickets sind nicht enthalten.",
  fromLabel: (price) => `ab ${price} € pro Fahrzeug`,
  highlights: [
    "Rückfahrt und Wartezeit inklusive",
    "Festpreis pro Fahrzeug, nicht pro Person",
    "Kindersitze kostenlos",
    "Barzahlung im Auto — keine Vorkasse",
    "Parktickets nicht enthalten",
  ],
  priceTableTitle: "Festpreise nach Hotelregion",
  priceTableNote: "Pro Fahrzeug, Hotel → The Land of Legends → Hotel, inklusive Wartezeit. Mercedes Vito bis 6 Gäste, Sprinter bis 12.",
  regionColumn: "Hotelregion",
  onRequest: "Auf Anfrage",
  formTitle: "Land-of-Legends-Transfer buchen",
  ticketsNotIncluded: "Parktickets nicht enthalten",
  meetingLabel: "Treffpunkt für die Rückfahrt",
  shortNotice: "Kurzfristig: Wir bestätigen Ihren Fahrer vor der Fahrt per WhatsApp.",
  driveTime: (minutes, area) => `Etwa ${minutes} Min. Fahrt ab ${area} — rechtzeitig zur Öffnung losfahren.`,
  regionOnRequest: "Für diese Region gilt Preis auf Anfrage — buchen Sie jetzt, wir bestätigen den Preis per WhatsApp.",
  sprinterNote: (guests) => `Für ${guests} Gäste haben wir den Sprinter gewählt.`,
  bigGroup: "13 Gäste oder mehr? Wir schicken zwei Fahrzeuge — schreiben Sie uns per WhatsApp.",
  askWhatsapp: "Fragen? Per WhatsApp schreiben",
  confirmedPriceLabel: "Preis pro Fahrzeug, bar im Auto",
  tripOption: "The Land of Legends",
  tripHint: "Tagesausflug ab Ihrem Hotel: Wir bringen Sie zum Park, der Fahrer wartet, bis Sie fertig sind, und bringt Sie zurück. Festpreis pro Fahrzeug; Parktickets nicht enthalten.",
  detailsLink: "Preise nach Region und Details",
  hotelLabel: "Ihr Hotel",
  hotelPlaceholder: "Hotelnamen eingeben",
  hotelNotListed: "Mein Hotel ist nicht in der Liste",
  hotelNoMatch: "Noch kein Treffer — geben Sie den vollen Namen ein, wir bestätigen den Preis.",
  hotelMatched: (hotel, region) => `${hotel} — Preis für ${region}`,
  hotelUnmatched: "Wir konnten dieses Hotel nicht automatisch zuordnen. Buchen Sie trotzdem — wir bestätigen den Preis vor der Fahrt per WhatsApp.",
  dateLabel: "Datum des Besuchs",
  departureLabel: "Abholung am Hotel",
  departureHint: "Der Park öffnet um 10:00 Uhr.",
  returnLabel: "Abholung am The Land of Legends",
  returnHint: "Bis 23:30 Uhr — bleiben Sie zur Abendshow.",
  guestsLabel: "Gäste",
  vehicleLabel: "Fahrzeug",
  vito: "Mercedes Vito (bis 6)",
  sprinter: "Mercedes Sprinter (bis 12)",
  childSeatsLabel: "Kindersitze",
  childSeatNone: "Kein Kindersitz",
  childAgeLabel: (index) => `Alter Kind ${index}`,
  childAgeSelect: "Alter wählen",
  childAgeBaby: "Unter 1",
  strollersLabel: "Kinderwagen",
  nameLabel: "Vollständiger Name",
  phoneLabel: "Telefon / WhatsApp",
  emailLabel: "E-Mail",
  notesLabel: "Hinweise (optional)",
  notesPlaceholder: "Zimmernummer, besondere Wünsche…",
  totalLabel: "Gesamtpreis",
  totalIncludes: "Hin- und Rückfahrt + Wartezeit, pro Fahrzeug",
  quoteOnRequest: "Preis wird per WhatsApp bestätigt",
  payInCar: "Sie zahlen bar beim Fahrer zu Beginn der Fahrt.",
  submit: "Transfer buchen",
  submitting: "Wird gesendet…",
  submitError: "Die Buchung konnte nicht abgeschlossen werden. Bitte erneut versuchen oder per WhatsApp schreiben.",
  confirmedTitle: "Buchung eingegangen",
  confirmedFixed: "Ihr Land-of-Legends-Transfer ist gebucht. Die Fahrerdaten erhalten Sie am Vortag per WhatsApp.",
  confirmedQuote: "Ihre Anfrage ist eingegangen. Wir bestätigen den Preis für Ihr Hotel in Kürze per WhatsApp.",
  reference: "Buchungsnummer",
  whatsappCta: "Per WhatsApp senden",
  newBooking: "Weitere Buchung",
  faqTitle: "Gut zu wissen",
  faq: [
    ["Wartet der Fahrer wirklich den ganzen Tag?", "Ja. Die Wartezeit ist im Preis enthalten — derselbe Fahrer holt Sie zur gewählten Zeit wieder ab, bis 23:30 Uhr nach der Abendshow."],
    ["Wo treffen wir den Fahrer für die Rückfahrt?", "Am Parkplatz am Haupteingang, zur gewählten Uhrzeit. Ihr Fahrer schreibt Ihnen am Tag per WhatsApp mit Name und Nummer."],
    ["Ist der Preis pro Person?", "Nein. Der Preis gilt für das ganze Fahrzeug: Vito bis 6 Gäste, Sprinter bis 12."],
    ["Was, wenn wir früher oder später fahren möchten?", "Schreiben Sie Ihrem Fahrer per WhatsApp. Änderungen am Tag sind meist kein Problem; eine Rückfahrt nach 23:30 Uhr bitte vorher per WhatsApp mit uns absprechen."],
    ["Sind die Parktickets enthalten?", "Nein, nur der Transfer. Tickets erhalten Sie am Park oder online."],
  ],
  errors: {
    hotel: "Bitte geben Sie Ihr Hotel ein.",
    date: "Bitte ein Datum ab heute wählen.",
    time: "Bitte eine Uhrzeit wählen.",
    visit: "Die Abholung am Park muss mindestens 2 Stunden später und spätestens um 23:30 Uhr sein. Länger bleiben? Schreiben Sie uns per WhatsApp.",
    tooSoon: "Wir brauchen mindestens 3 Stunden Vorlauf. Für eine frühere Abholung schreiben Sie uns per WhatsApp.",
    guests: "Für diese Gruppe brauchen Sie ein größeres Fahrzeug — wählen Sie den Sprinter oder schreiben Sie uns per WhatsApp.",
    childAge: "Bitte das Alter des Kindes wählen.",
    name: "Bitte vollständigen Namen eingeben.",
    phone: "Bitte eine gültige internationale Telefonnummer eingeben.",
    email: "Bitte eine gültige E-Mail-Adresse eingeben.",
  },
};

const tr: LandOfLegendsCopy = {
  ...en,
  locale: "tr_TR",
  metaTitle: "Otelinizden The Land of Legends Transferi | Antalya VIP Tourism",
  metaDescription: (from) => `Antalya, Belek, Side, Kemer veya Alanya'daki otelinizden The Land of Legends'a özel gidiş-dönüş transfer. Şoför sizi bekler, araç başı sabit fiyat ${from} €'dan başlar, ödeme araçta.`,
  home: "Ana sayfa",
  transfers: "Havalimanı transferleri",
  bookNow: "Rezervasyon yap",
  eyebrow: "Tema park günübirlik gezisi",
  heading: "The Land of Legends transferi — gidiş-dönüş, şoför bekler",
  intro: "Otelinizi seçin, ne zaman çıkıp ne zaman döneceğinizi belirleyin. Özel Mercedes aracınız sizi Kadriye'deki The Land of Legends'a götürür, işiniz bitene kadar — akşam gösterisinden sonra bile — bekler ve otelinize geri getirir. Park biletleri dahil değildir.",
  fromLabel: (price) => `araç başı ${price} €'dan başlayan fiyatlarla`,
  highlights: [
    "Dönüş ve bekleme dahil",
    "Kişi başı değil, araç başı sabit fiyat",
    "Çocuk koltuğu ücretsiz",
    "Ödeme araçta nakit — ön ödeme yok",
    "Park biletleri dahil değil",
  ],
  priceTableTitle: "Otel bölgesine göre sabit fiyatlar",
  priceTableNote: "Araç başı, otel → The Land of Legends → otel, bekleme dahil. Mercedes Vito 6 kişiye, Sprinter 12 kişiye kadar.",
  regionColumn: "Otel bölgesi",
  onRequest: "Fiyat sorunuz",
  formTitle: "Land of Legends transferinizi ayırtın",
  ticketsNotIncluded: "Park biletleri dahil değil",
  meetingLabel: "Dönüş için buluşma noktası",
  shortNotice: "Son dakika: şoförünüzü yolculuktan önce WhatsApp'tan onaylarız.",
  driveTime: (minutes, area) => `${area} bölgesinden yaklaşık ${minutes} dk yol — açılışa yetişecek şekilde çıkın.`,
  regionOnRequest: "Bu bölgenin fiyatı talep üzerine — şimdi rezervasyon yapın, fiyatı WhatsApp'tan onaylayalım.",
  sprinterNote: (guests) => `${guests} kişi için Sprinter seçtik.`,
  bigGroup: "13 kişi veya daha fazla mısınız? İki araç göndeririz — WhatsApp'tan yazın.",
  askWhatsapp: "Sorunuz mu var? WhatsApp'tan yazın",
  confirmedPriceLabel: "Araç başı fiyat, araçta nakit",
  tripOption: "The Land of Legends",
  tripHint: "Otelinizden günübirlik: sizi parka götürür, şoför işiniz bitene kadar bekler ve geri getirir. Araç başı sabit fiyat; park biletleri dahil değil.",
  detailsLink: "Bölgelere göre fiyatlar ve detaylar",
  hotelLabel: "Oteliniz",
  hotelPlaceholder: "Otel adını yazmaya başlayın",
  hotelNotListed: "Otelim listede yok",
  hotelNoMatch: "Henüz eşleşme yok — tam adı yazın, fiyatı biz onaylayalım.",
  hotelMatched: (hotel, region) => `${hotel} — ${region} fiyatı`,
  hotelUnmatched: "Bu oteli otomatik eşleştiremedik. Yine de rezervasyon yapın — fiyatı yolculuktan önce WhatsApp'tan onaylarız.",
  dateLabel: "Ziyaret tarihi",
  departureLabel: "Otelden alış saati",
  departureHint: "Park 10:00'da açılır.",
  returnLabel: "The Land of Legends'tan alış saati",
  returnHint: "En geç 23:30 — akşam gösterisine kalabilirsiniz.",
  guestsLabel: "Kişi sayısı",
  vehicleLabel: "Araç",
  vito: "Mercedes Vito (6 kişiye kadar)",
  sprinter: "Mercedes Sprinter (12 kişiye kadar)",
  childSeatsLabel: "Çocuk koltuğu",
  childSeatNone: "Çocuk koltuğu yok",
  childAgeLabel: (index) => `${index}. çocuğun yaşı`,
  childAgeSelect: "Yaş seçin",
  childAgeBaby: "1 yaş altı",
  strollersLabel: "Bebek arabası",
  nameLabel: "Ad soyad",
  phoneLabel: "Telefon / WhatsApp",
  emailLabel: "E-posta",
  notesLabel: "Not (isteğe bağlı)",
  notesPlaceholder: "Oda numarası, özel istekler…",
  totalLabel: "Toplam fiyat",
  totalIncludes: "Gidiş-dönüş + bekleme, araç başı",
  quoteOnRequest: "Fiyat WhatsApp'tan onaylanır",
  payInCar: "Ödemeyi yolculuk başında şoföre nakit yaparsınız.",
  submit: "Transferi ayırt",
  submitting: "Gönderiliyor…",
  submitError: "Rezervasyon tamamlanamadı. Lütfen tekrar deneyin veya WhatsApp'tan yazın.",
  confirmedTitle: "Rezervasyon alındı",
  confirmedFixed: "Land of Legends transferiniz ayrıldı. Şoför bilgileri bir gün önce WhatsApp'tan gelir.",
  confirmedQuote: "Talebiniz alındı. Oteliniz için fiyatı kısa süre içinde WhatsApp'tan onaylayacağız.",
  reference: "Rezervasyon no",
  whatsappCta: "WhatsApp'tan gönder",
  newBooking: "Yeni rezervasyon",
  faqTitle: "Bilmeniz gerekenler",
  faq: [
    ["Şoför gerçekten tüm gün bekliyor mu?", "Evet. Bekleme fiyata dahil; sizi bırakan şoför seçtiğiniz saatte — akşam gösterisinden sonra en geç 23:30'da — tekrar alır."],
    ["Dönüşte şoförle nerede buluşuyoruz?", "Seçtiğiniz saatte ana giriş otoparkında. Şoförünüz o gün adı ve numarasıyla size WhatsApp'tan yazar."],
    ["Fiyat kişi başı mı?", "Hayır. Fiyat tüm araç için: Vito 6 kişiye, Sprinter 12 kişiye kadar."],
    ["Daha erken ya da geç dönmek istersek?", "Şoförünüze WhatsApp'tan yazın. Gün içi değişiklikler genelde sorun olmaz; 23:30 sonrası dönüş için lütfen önce WhatsApp'tan bize yazın."],
    ["Park biletleri dahil mi?", "Hayır, yalnızca transfer. Biletleri parkta veya online alabilirsiniz."],
  ],
  errors: {
    hotel: "Lütfen otel adını girin.",
    date: "Lütfen bugünden itibaren bir tarih seçin.",
    time: "Lütfen saat seçin.",
    visit: "Parktan alış en az 2 saat sonra ve en geç 23:30 olmalı. Daha geç kalmak mı istiyorsunuz? WhatsApp'tan yazın.",
    tooSoon: "En az 3 saat önceden rezervasyon gerekiyor. Daha erken alış için WhatsApp'tan yazın.",
    guests: "Bu grup için daha büyük araç gerekiyor — Sprinter seçin veya WhatsApp'tan yazın.",
    childAge: "Lütfen çocuğun yaşını seçin.",
    name: "Lütfen ad soyad girin.",
    phone: "Lütfen geçerli bir uluslararası telefon numarası girin.",
    email: "Lütfen geçerli bir e-posta adresi girin.",
  },
};

const ru: LandOfLegendsCopy = {
  ...en,
  // The route catalog names are accusative ("трансфер в Аланью"); a table heading needs the nominative.
  regionNames: {
    antalya: "Центр Антальи",
    alanya: "Аланья",
    alanya_bati: "Западная Аланья",
    alanya_merkez: "Центр Аланьи",
    alanya_dogu: "Восточная Аланья",
    tekirova: "Текирова",
  },
  locale: "ru_RU",
  metaTitle: "Трансфер в The Land of Legends из вашего отеля | Antalya VIP Tourism",
  metaDescription: (from) => `Частный трансфер туда и обратно из отеля в Анталье, Белеке, Сиде, Кемере или Аланье в The Land of Legends. Водитель ждёт, фиксированная цена за автомобиль от ${from} €, оплата в машине.`,
  home: "Главная",
  transfers: "Трансферы из аэропорта",
  bookNow: "Забронировать",
  eyebrow: "Поездка в тематический парк",
  heading: "Трансфер в The Land of Legends — туда и обратно, водитель ждёт",
  intro: "Выберите отель, время выезда и возвращения. Ваш частный Mercedes отвезёт вас в The Land of Legends в Кадрие, подождёт, пока вы не закончите — даже после вечернего шоу — и вернёт в отель. Билеты в парк не включены.",
  fromLabel: (price) => `от ${price} € за автомобиль`,
  highlights: [
    "Обратная дорога и ожидание включены",
    "Фиксированная цена за автомобиль, а не за человека",
    "Детские кресла бесплатно",
    "Оплата наличными в машине — без предоплаты",
    "Билеты в парк не включены",
  ],
  priceTableTitle: "Фиксированные цены по районам отелей",
  priceTableNote: "За автомобиль, отель → The Land of Legends → отель, с ожиданием. Mercedes Vito до 6 гостей, Sprinter до 12.",
  regionColumn: "Район отеля",
  onRequest: "По запросу",
  formTitle: "Забронировать трансфер в The Land of Legends",
  ticketsNotIncluded: "Билеты в парк не включены",
  meetingLabel: "Место встречи для обратной дороги",
  shortNotice: "Срочный заказ: мы подтвердим водителя в WhatsApp до поездки.",
  driveTime: (minutes, area) => `Около ${minutes} мин в пути (${area}) — выезжайте заранее к открытию.`,
  regionOnRequest: "Цена для этого района по запросу — бронируйте, мы подтвердим цену в WhatsApp.",
  sprinterNote: (guests) => `Для ${guests} гостей мы выбрали Sprinter.`,
  bigGroup: "13 гостей и больше? Отправим два автомобиля — напишите нам в WhatsApp.",
  askWhatsapp: "Вопросы? Напишите в WhatsApp",
  confirmedPriceLabel: "Цена за автомобиль, наличными в машине",
  tripOption: "The Land of Legends",
  tripHint: "Поездка на день из отеля: отвезём в парк, водитель подождёт, пока вы не закончите, и вернёт обратно. Фиксированная цена за автомобиль; билеты в парк не включены.",
  detailsLink: "Цены по районам и подробности",
  hotelLabel: "Ваш отель",
  hotelPlaceholder: "Начните вводить название отеля",
  hotelNotListed: "Моего отеля нет в списке",
  hotelNoMatch: "Совпадений нет — введите полное название, мы подтвердим цену.",
  hotelMatched: (hotel, region) => `${hotel} — цена для района ${region}`,
  hotelUnmatched: "Мы не смогли автоматически определить этот отель. Бронируйте — цену подтвердим в WhatsApp до поездки.",
  dateLabel: "Дата посещения",
  departureLabel: "Подача к отелю",
  departureHint: "Парк открывается в 10:00.",
  returnLabel: "Подача у The Land of Legends",
  returnHint: "До 23:30 — можно остаться на вечернее шоу.",
  guestsLabel: "Гости",
  vehicleLabel: "Автомобиль",
  vito: "Mercedes Vito (до 6)",
  sprinter: "Mercedes Sprinter (до 12)",
  childSeatsLabel: "Детские кресла",
  childSeatNone: "Без детского кресла",
  childAgeLabel: (index) => `Возраст ребёнка ${index}`,
  childAgeSelect: "Выберите возраст",
  childAgeBaby: "До 1 года",
  strollersLabel: "Детские коляски",
  nameLabel: "Имя и фамилия",
  phoneLabel: "Телефон / WhatsApp",
  emailLabel: "Email",
  notesLabel: "Примечания (необязательно)",
  notesPlaceholder: "Номер комнаты, пожелания…",
  totalLabel: "Итоговая цена",
  totalIncludes: "Туда и обратно + ожидание, за автомобиль",
  quoteOnRequest: "Цена подтверждается в WhatsApp",
  payInCar: "Оплата водителю наличными в начале поездки.",
  submit: "Забронировать трансфер",
  submitting: "Отправка…",
  submitError: "Не удалось завершить бронирование. Попробуйте ещё раз или напишите нам в WhatsApp.",
  confirmedTitle: "Бронирование получено",
  confirmedFixed: "Ваш трансфер в The Land of Legends забронирован. Данные водителя придут в WhatsApp накануне.",
  confirmedQuote: "Заявка получена. Мы скоро подтвердим цену для вашего отеля в WhatsApp.",
  reference: "Номер брони",
  whatsappCta: "Отправить в WhatsApp",
  newBooking: "Новое бронирование",
  faqTitle: "Полезно знать",
  faq: [
    ["Водитель действительно ждёт весь день?", "Да. Ожидание включено в цену — тот же водитель заберёт вас в выбранное время, до 23:30 после вечернего шоу."],
    ["Где мы встречаемся с водителем на обратную дорогу?", "На парковке у главного входа, в выбранное время. В день поездки водитель напишет вам в WhatsApp с именем и номером."],
    ["Цена за человека?", "Нет. Цена за весь автомобиль: Vito до 6 гостей, Sprinter до 12."],
    ["Что если мы захотим уехать раньше или позже?", "Напишите водителю в WhatsApp. Изменения в тот же день обычно не проблема; возвращение после 23:30 — только по согласованию, напишите нам в WhatsApp."],
    ["Билеты в парк включены?", "Нет, только трансфер. Билеты можно купить в парке или онлайн."],
  ],
  errors: {
    hotel: "Пожалуйста, введите название отеля.",
    date: "Выберите дату начиная с сегодняшней.",
    time: "Пожалуйста, выберите время.",
    visit: "Подача у парка — минимум через 2 часа и не позднее 23:30. Хотите остаться дольше? Напишите нам в WhatsApp.",
    tooSoon: "Нужно бронировать минимум за 3 часа. Для более ранней подачи напишите нам в WhatsApp.",
    guests: "Для этой группы нужен автомобиль больше — выберите Sprinter или напишите в WhatsApp.",
    childAge: "Пожалуйста, выберите возраст ребёнка.",
    name: "Пожалуйста, введите имя и фамилию.",
    phone: "Введите действительный международный номер телефона.",
    email: "Введите действительный email.",
  },
};

export const landOfLegendsCopy: Record<LandOfLegendsLanguage, LandOfLegendsCopy> = { en, de, tr, ru };

/** A pricing region's name in this page's language. */
export function landOfLegendsRegionName(
  region: string,
  language: LandOfLegendsLanguage,
  catalog: Readonly<Record<string, { names: Readonly<Record<string, string>> }>>,
) {
  const override = landOfLegendsCopy[language].regionNames?.[region];
  if (override) return override;
  const route = catalog[region];
  return route ? route.names[language] ?? route.names.en : region;
}

export const landOfLegendsPath = (language: LandOfLegendsLanguage) =>
  `${language === "en" ? "" : `/${language}`}/land-of-legends/`;
