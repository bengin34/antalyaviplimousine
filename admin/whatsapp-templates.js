import { locationLabel, navigationURLs } from "./turkish-formatters.js";

// Shared transfer start-time rule used by the React timeline and detail views.
function transferStartTime(pickupLocation, pickupTime, flightArrivalTime) {
  if (pickupLocation === "airport") return flightArrivalTime || pickupTime;
  return pickupTime;
}

// Postgres `time` columns arrive as HH:MM:SS; trim to HH:MM for the message.
function fmtTime(t) {
  return t ? String(t).slice(0, 5) : "—";
}

function fmtPrice(value) {
  const price = Number(value);
  if (!Number.isFinite(price)) return "0";
  return Number.isInteger(price)
    ? String(price)
    : price.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
}

const VEHICLE_LABELS = {
  vclass: "Mercedes V-Class",
  vito: "Mercedes Vito",
};

function vehicleLabel(type) {
  return VEHICLE_LABELS[type] ?? type;
}

// Per-language dictionaries for customer-facing WhatsApp messages.
// Values: labels and natural sentences for a VIP airport transfer service in Antalya.
const LANG = {
  en: {
    confirmGreeting: (name) =>
      `Dear ${name},\n\n✅ Your Antalya VIP transfer is confirmed. Here are the details:`,
    confirmClosing:
      "We'll be ready at the agreed time. If anything changes or you have a question, just message us. Have a good trip! 🚗",
    reminderGreeting: (name) =>
      `Dear ${name},\n\n🚙 A quick reminder about your upcoming transfer:`,
    reminderClosing:
      "Your driver will be there on time. If you need anything, we're one message away. 🌟",
    receivedGreeting: (name) =>
      `Dear ${name},\n\n✨ Thank you for your booking with Antalya VIP Tourism. We've received it and are reviewing the details.`,
    receivedClosing:
      "We'll get back to you shortly to confirm. 🎯",
    meetGreetGreeting: (name) =>
      `Dear ${name},\n\n✈️ Welcome to Antalya! Here are your Meet & Greet details:`,
    meetGreetClosing:
      "Our team will meet you at meeting point J / 777 with a name board. Safe travels! 🌟",
    reviewGreeting: (name) =>
      `Dear ${name},\n\n🌟 Thank you for traveling with Antalya VIP Tourism. We hope everything went smoothly.`,
    reviewClosing:
      "If you have a moment, we'd appreciate a short review on Google — it really helps us. 👇\n\nhttps://g.page/r/CbJCg7BC63cBEBI/review",
    labelRef: "Reference",
    labelDate: "Date",
    labelPickupTime: "Pickup time",
    labelRoute: "Route",
    labelVehicle: "Vehicle",
    labelGuests: "Guests",
    labelPrice: "Price",
    labelTransfer: "Transfer",
    labelOutbound: "Outbound transfer",
    labelReturn: "Return transfer",
    labelPickup: "Pickup location",
    labelDropoff: "Drop-off location",
    labelMap: "Google Maps route",
    labelFlight: "Flight",
    labelLuggage: "Luggage",
    labelChildSeats: "Child seats",
    labelDriver: "Driver",
    labelPlate: "Plate",
    labelDailyHire: "Daily vehicle + chauffeur",
    labelPeriod: "Service period",
    labelDailyRate: "Daily rate",
    labelTotal: "Total service price",
    labelFuel: "Fuel",
    fuelExcluded:
      "Not included; paid separately by the customer according to use",
    labelArrivalFlight: "Arrival flight",
    labelDepartureFlight: "Departure flight",
  },
  de: {
    confirmGreeting: (name) =>
      `Hallo ${name},\n\n✅ Ihr Antalya VIP-Transfer ist bestätigt. Hier die Details:`,
    confirmClosing:
      "Wir sind zur vereinbarten Zeit bereit. Bei Fragen oder Änderungen schreiben Sie uns einfach. Gute Reise! 🚗",
    reminderGreeting: (name) =>
      `Hallo ${name},\n\n🚙 Eine kurze Erinnerung an Ihren bevorstehenden Transfer:`,
    reminderClosing:
      "Ihr Fahrer ist pünktlich vor Ort. Bei Fragen sind wir für Sie da. 🌟",
    receivedGreeting: (name) =>
      `Hallo ${name},\n\n✨ Vielen Dank für Ihre Buchung bei Antalya VIP Tourism. Wir haben sie erhalten und prüfen die Details.`,
    receivedClosing:
      "Wir melden uns in Kürze zur Bestätigung. 🎯",
    meetGreetGreeting: (name) =>
      `Hallo ${name},\n\n✈️ Willkommen in Antalya! Hier Ihre Meet & Greet-Details:`,
    meetGreetClosing:
      "Unser Team erwartet Sie am Treffpunkt J / 777 mit einem Namensschild. Gute Reise! 🌟",
    reviewGreeting: (name) =>
      `Hallo ${name},\n\n🌟 Danke, dass Sie mit Antalya VIP Tourism gefahren sind. Wir hoffen, alles ist gut verlaufen.`,
    reviewClosing:
      "Wenn Sie einen Moment haben, freuen wir uns über eine kurze Google-Bewertung — das hilft uns sehr. 👇\n\nhttps://g.page/r/CbJCg7BC63cBEBI/review",
    labelRef: "Referenz",
    labelDate: "Datum",
    labelPickupTime: "Abholzeit",
    labelRoute: "Strecke",
    labelVehicle: "Fahrzeug",
    labelGuests: "Gäste",
    labelPrice: "Preis",
    labelTransfer: "Transfer",
    labelOutbound: "Hintransfer",
    labelReturn: "Rücktransfer",
    labelPickup: "Abholort",
    labelDropoff: "Zielort",
    labelMap: "Google-Maps-Route",
    labelFlight: "Flug",
    labelLuggage: "Gepäck",
    labelChildSeats: "Kindersitze",
    labelDriver: "Fahrer",
    labelPlate: "Kennzeichen",
  },
  ru: {
    confirmGreeting: (name) =>
      `Здравствуйте, ${name}!\n\n✅ Ваш трансфер Antalya VIP подтверждён. Детали ниже:`,
    confirmClosing:
      "Мы будем готовы в назначенное время. Если появятся вопросы или изменения — просто напишите нам. Хорошей поездки! 🚗",
    reminderGreeting: (name) =>
      `Здравствуйте, ${name}!\n\n🚙 Короткое напоминание о вашем предстоящем трансфере:`,
    reminderClosing:
      "Водитель подъедет вовремя. Если что-то понадобится — мы на связи. 🌟",
    receivedGreeting: (name) =>
      `Здравствуйте, ${name}!\n\n✨ Спасибо за бронирование в Antalya VIP Tourism. Мы получили заявку и проверяем детали.`,
    receivedClosing:
      "Скоро свяжемся с вами для подтверждения. 🎯",
    meetGreetGreeting: (name) =>
      `Здравствуйте, ${name}!\n\n✈️ Добро пожаловать в Анталью! Детали встречи Meet & Greet:`,
    meetGreetClosing:
      "Наша команда встретит вас в точке J / 777 с табличкой с вашим именем. Хорошей поездки! 🌟",
    reviewGreeting: (name) =>
      `Здравствуйте, ${name}!\n\n🌟 Спасибо, что выбрали Antalya VIP Tourism. Надеемся, всё прошло хорошо.`,
    reviewClosing:
      "Если найдётся минутка, будем благодарны за короткий отзыв на Google — это очень помогает нам. 👇\n\nhttps://g.page/r/CbJCg7BC63cBEBI/review",
    labelRef: "Номер брони",
    labelDate: "Дата",
    labelPickupTime: "Время подачи",
    labelRoute: "Маршрут",
    labelVehicle: "Автомобиль",
    labelGuests: "Гостей",
    labelPrice: "Стоимость",
    labelTransfer: "Трансфер",
    labelOutbound: "Трансфер туда",
    labelReturn: "Обратный трансфер",
    labelPickup: "Место подачи",
    labelDropoff: "Место назначения",
    labelMap: "Маршрут Google Maps",
    labelFlight: "Рейс",
    labelLuggage: "Багаж",
    labelChildSeats: "Детские кресла",
    labelDriver: "Водитель",
    labelPlate: "Номер машины",
  },
  tr: {
    confirmGreeting: (name) =>
      `Merhaba ${name},\n\n✅ Antalya VIP transferiniz onaylandı. Detaylar aşağıda:`,
    confirmClosing:
      "Belirlenen saatte hazır olacağız. Sorunuz veya bir değişiklik olursa bize yazmanız yeterli. İyi yolculuklar! 🚗",
    reminderGreeting: (name) =>
      `Merhaba ${name},\n\n🚙 Yaklaşan transferiniz için kısa bir hatırlatma:`,
    reminderClosing:
      "Sürücünüz zamanında yanınızda olacak. İhtiyacınız olursa bize ulaşabilirsiniz. 🌟",
    receivedGreeting: (name) =>
      `Merhaba ${name},\n\n✨ Antalya VIP Tourism'i tercih ettiğiniz için teşekkürler. Rezervasyonunuzu aldık, detayları kontrol ediyoruz.`,
    receivedClosing:
      "Onay için kısa süre içinde size döneceğiz. 🎯",
    meetGreetGreeting: (name) =>
      `Merhaba ${name},\n\n✈️ Antalya'ya hoş geldiniz! Karşılama (Meet & Greet) detaylarınız:`,
    meetGreetClosing:
      "Ekibimiz J / 777 buluşma noktasında isim tabelasıyla sizi karşılayacak. İyi yolculuklar! 🌟",
    reviewGreeting: (name) =>
      `Merhaba ${name},\n\n🌟 Antalya VIP Tourism ile seyahat ettiğiniz için teşekkürler. Umarız her şey yolunda gitmiştir.`,
    reviewClosing:
      "Bir dakikanız olursa, Google'da bırakacağınız kısa bir değerlendirme bize çok yardımcı olur. 👇\n\nhttps://g.page/r/CbJCg7BC63cBEBI/review",
    labelRef: "Rezervasyon No",
    labelDate: "Tarih",
    labelPickupTime: "Alış saati",
    labelRoute: "Güzergah",
    labelVehicle: "Araç",
    labelGuests: "Misafir",
    labelPrice: "Fiyat",
    labelTransfer: "Transfer",
    labelOutbound: "Gidiş transferi",
    labelReturn: "Dönüş transferi",
    labelPickup: "Alış konumu",
    labelDropoff: "Varış konumu",
    labelMap: "Google Maps güzergâhı",
    labelFlight: "Uçuş",
    labelLuggage: "Bagaj",
    labelChildSeats: "Çocuk koltuğu",
    labelDriver: "Sürücü",
    labelPlate: "Plaka",
    labelDailyHire: "Günlük araç + şoför",
    labelPeriod: "Hizmet dönemi",
    labelDailyRate: "Günlük ücret",
    labelTotal: "Toplam hizmet bedeli",
    labelFuel: "Yakıt",
    fuelExcluded: "Dahil değildir; müşteri kullanıma göre ayrıca öder",
    labelArrivalFlight: "Geliş uçuşu",
    labelDepartureFlight: "Dönüş uçuşu",
  },
  fr: {
    confirmGreeting: (name) =>
      `Bonjour ${name},\n\n✅ Votre transfert Antalya VIP est confirmé. Voici les détails :`,
    confirmClosing:
      "Nous serons prêts à l'heure convenue. Pour toute question ou changement, écrivez-nous. Bon voyage ! 🚗",
    reminderGreeting: (name) =>
      `Bonjour ${name},\n\n🚙 Un petit rappel concernant votre transfert à venir :`,
    reminderClosing:
      "Votre chauffeur sera là à l'heure. N'hésitez pas à nous contacter si besoin. 🌟",
    receivedGreeting: (name) =>
      `Bonjour ${name},\n\n✨ Merci pour votre réservation chez Antalya VIP Tourism. Nous l'avons bien reçue et vérifions les détails.`,
    receivedClosing:
      "Nous revenons vers vous très vite pour la confirmation. 🎯",
    meetGreetGreeting: (name) =>
      `Bonjour ${name},\n\n✈️ Bienvenue à Antalya ! Voici les détails de votre accueil Meet & Greet :`,
    meetGreetClosing:
      "Notre équipe vous attendra au point de rencontre J / 777 avec un panneau à votre nom. Bon voyage ! 🌟",
    reviewGreeting: (name) =>
      `Bonjour ${name},\n\n🌟 Merci d'avoir voyagé avec Antalya VIP Tourism. Nous espérons que tout s'est bien passé.`,
    reviewClosing:
      "Si vous avez un instant, un court avis sur Google nous aiderait beaucoup. 👇\n\nhttps://g.page/r/CbJCg7BC63cBEBI/review",
    labelRef: "Référence",
    labelDate: "Date",
    labelPickupTime: "Heure de prise en charge",
    labelRoute: "Itinéraire",
    labelVehicle: "Véhicule",
    labelGuests: "Passagers",
    labelPrice: "Prix",
    labelTransfer: "Transfert",
    labelOutbound: "Transfert aller",
    labelReturn: "Transfert retour",
    labelPickup: "Lieu de prise en charge",
    labelDropoff: "Lieu de destination",
    labelMap: "Itinéraire Google Maps",
    labelFlight: "Vol",
    labelLuggage: "Bagages",
    labelChildSeats: "Sièges enfant",
    labelDriver: "Conducteur",
    labelPlate: "Plaque",
  },
  ar: {
    confirmGreeting: (name) =>
      `مرحباً ${name}،\n\n✅ تم تأكيد خدمة النقل Antalya VIP الخاصة بك. التفاصيل أدناه:`,
    confirmClosing:
      "سنكون جاهزين في الوقت المحدد. لأي سؤال أو تغيير، راسلنا فقط. رحلة سعيدة! 🚗",
    reminderGreeting: (name) =>
      `مرحباً ${name}،\n\n🚙 تذكير بسيط بخصوص رحلة النقل القادمة:`,
    reminderClosing:
      "سيكون سائقك في الموعد المحدد. نحن متاحون إن احتجت أي شيء. 🌟",
    receivedGreeting: (name) =>
      `مرحباً ${name}،\n\n✨ شكراً لحجزك مع Antalya VIP Tourism. لقد استلمنا الحجز ونراجع التفاصيل.`,
    receivedClosing:
      "سنعود إليك قريباً للتأكيد. 🎯",
    meetGreetGreeting: (name) =>
      `مرحباً ${name}،\n\n✈️ أهلاً بك في أنطاليا! تفاصيل الاستقبال Meet & Greet:`,
    meetGreetClosing:
      "سيستقبلك فريقنا عند نقطة اللقاء J / 777 بلافتة تحمل اسمك. رحلة موفقة! 🌟",
    reviewGreeting: (name) =>
      `مرحباً ${name}،\n\n🌟 شكراً لسفرك مع Antalya VIP Tourism. نأمل أن يكون كل شيء قد سار على ما يرام.`,
    reviewClosing:
      "إن توفّرت لديك لحظة، سنكون ممتنين لتقييم قصير على Google — فهذا يساعدنا كثيراً. 👇\n\nhttps://g.page/r/CbJCg7BC63cBEBI/review",
    labelRef: "رقم الحجز",
    labelDate: "التاريخ",
    labelPickupTime: "وقت الاستقبال",
    labelRoute: "المسار",
    labelVehicle: "السيارة",
    labelGuests: "الركاب",
    labelPrice: "السعر",
    labelTransfer: "خدمة النقل",
    labelOutbound: "رحلة الذهاب",
    labelReturn: "رحلة العودة",
    labelPickup: "موقع الاستقبال",
    labelDropoff: "موقع الوصول",
    labelMap: "مسار Google Maps",
    labelFlight: "الرحلة الجوية",
    labelLuggage: "الأمتعة",
    labelChildSeats: "مقاعد الأطفال",
    labelDriver: "السائق",
    labelPlate: "لوحة السيارة",
  },
};

function getLang(language) {
  return LANG[language] ?? LANG.en;
}

function transferDetails(booking, requestedLeg = "outbound") {
  const b = booking ?? {};
  const isRoundTrip = b.trip_type === "round_trip";
  const isDailyChauffeur = b.trip_type === "daily_chauffeur";
  const isReturn = requestedLeg === "return" && isRoundTrip;

  if (isDailyChauffeur) {
    return {
      leg: "daily",
      date: b.pickup_date,
      time: b.pickup_time,
      flightNumber: b.flight_number,
      pickupLocation: b.pickup_location,
      pickupAddress: b.pickup_address,
      isRoundTrip: false,
      isDailyChauffeur: true,
      pickup:
        b.pickup_address || b.hotel_name || locationLabel(b.pickup_location),
      price: Number(b.price_eur) || 0,
    };
  }

  const transfer = isReturn
    ? {
        leg: "return",
        date: b.return_date,
        time: b.return_pickup_time,
        flightNumber: b.return_flight_number,
        pickupLocation: b.dropoff_location,
        pickupAddress: b.dropoff_address,
        dropoffLocation: b.pickup_location,
        dropoffAddress: b.pickup_address,
      }
    : {
        leg: "outbound",
        date: b.pickup_date,
        time: transferStartTime(
          b.pickup_location,
          b.pickup_time,
          b.flight_arrival_time,
        ),
        flightNumber: b.flight_number,
        pickupLocation: b.pickup_location,
        pickupAddress: b.pickup_address,
        dropoffLocation: b.dropoff_location,
        dropoffAddress: b.dropoff_address,
      };

  const navigation = navigationURLs({
    originValue: transfer.pickupLocation,
    originAddress: transfer.pickupAddress,
    destinationValue: transfer.dropoffLocation,
    destinationAddress: transfer.dropoffAddress,
    hotelName: b.hotel_name,
  });

  return {
    ...transfer,
    isRoundTrip,
    route: `${locationLabel(transfer.pickupLocation)} → ${locationLabel(transfer.dropoffLocation)}`,
    pickup: navigation.origin,
    dropoff: navigation.destination,
    mapURL: navigation.google,
    price: isRoundTrip
      ? (Number(b.price_eur) || 0) / 2
      : Number(b.price_eur) || 0,
  };
}

function detailLines(booking, transfer, t, { includeMap = true } = {}) {
  const b = booking ?? {};
  if (transfer.isDailyChauffeur) {
    const english = LANG.en;
    const text = (key) => t[key] ?? english[key];
    const lines = [
      `*${text("labelDailyHire")}*`,
      `${text("labelPeriod")}: ${b.pickup_date || "—"} – ${b.service_end_date || "—"}`,
      `${t.labelPickupTime}: ${fmtTime(b.pickup_time)}`,
      `${t.labelPickup}: ${transfer.pickup}`,
      `${t.labelVehicle}: ${vehicleLabel(b.vehicle_type)}`,
      `${t.labelGuests}: ${b.guests ?? "—"}`,
      `${text("labelDailyRate")}: €${fmtPrice(b.daily_rate_eur)}`,
      `${text("labelTotal")}: €${fmtPrice(b.price_eur)}`,
      `${text("labelFuel")}: ${text("fuelExcluded")}`,
    ];
    if (b.flight_number)
      lines.push(
        `${text("labelArrivalFlight")}: ${b.flight_number} · ${fmtTime(b.flight_arrival_time)}`,
      );
    if (b.departure_flight_date)
      lines.push(
        `${text("labelDepartureFlight")}: ${b.departure_flight_date} · ${b.departure_flight_number || "—"} · ${fmtTime(b.departure_flight_time)}`,
      );
    if (Number(b.luggage_count) > 0)
      lines.push(`${t.labelLuggage}: ${b.luggage_count}`);
    if (Number(b.child_seat_count) > 0) {
      lines.push(`${t.labelChildSeats}: ${b.child_seat_count}`);
      if (Array.isArray(b.child_ages) && b.child_ages.length > 0)
        lines.push(`Child ages: ${b.child_ages.map((age, i) => `${i + 1}: ${age === 0 ? '<1' : age + 'y'}`).join(', ')}`);
    }
    return lines;
  }
  const lines = [
    `*${transfer.isRoundTrip ? (transfer.leg === "return" ? t.labelReturn : t.labelOutbound) : t.labelTransfer}*`,
    `${t.labelRoute}: ${transfer.route}`,
    `${t.labelDate}: ${transfer.date || "—"}`,
    `${t.labelPickupTime}: ${fmtTime(transfer.time)}`,
  ];

  if (transfer.flightNumber)
    lines.push(`${t.labelFlight}: ${transfer.flightNumber}`);

  lines.push(
    `${t.labelPickup}: ${transfer.pickup}`,
    `${t.labelDropoff}: ${transfer.dropoff}`,
  );

  if (includeMap) lines.push(`${t.labelMap}: ${transfer.mapURL}`);

  lines.push(
    `${t.labelVehicle}: ${vehicleLabel(b.vehicle_type)}`,
    `${t.labelGuests}: ${b.guests ?? "—"}`,
  );

  if (Number(b.luggage_count) > 0)
    lines.push(`${t.labelLuggage}: ${b.luggage_count}`);
  if (Number(b.child_seat_count) > 0) {
    lines.push(`${t.labelChildSeats}: ${b.child_seat_count}`);
    if (Array.isArray(b.child_ages) && b.child_ages.length > 0)
      lines.push(`Child ages: ${b.child_ages.map((age, i) => `${i + 1}: ${age === 0 ? '<1' : age + 'y'}`).join(', ')}`);
  }

  lines.push(`${t.labelPrice}: €${fmtPrice(transfer.price)}`);
  return lines;
}

/**
 * Build a WhatsApp confirmation message for a booking.
 * @param {object} booking
 * @param {{ leg?: string, language?: string }} [options]
 * @returns {string}
 */
export function buildConfirmMessage(booking, { leg = "outbound", language } = {}) {
  const b = booking ?? {};
  const t = getLang(language ?? b.language);
  const transfer = transferDetails(b, leg);

  const lines = [
    t.confirmGreeting(b.customer_name),
    "",
    `${t.labelRef}: ${b.booking_ref}`,
    ...detailLines(b, transfer, t, { includeMap: false }),
    "",
    t.confirmClosing,
  ];

  return lines.join("\n");
}

/**
 * Build a WhatsApp reminder message for a booking.
 * Builds the reminder for the requested, currently displayed transfer leg.
 * @param {object} booking
 * @param {{ leg?: string, language?: string }} [options]
 * @returns {string}
 */
export function buildReminderMessage(booking, { leg = "outbound", language } = {}) {
  const b = booking ?? {};
  const t = getLang(language ?? b.language);
  const transfer = transferDetails(b, leg);

  const lines = [
    t.reminderGreeting(b.customer_name),
    "",
    `${t.labelRef}: ${b.booking_ref}`,
    ...detailLines(b, transfer, t),
  ];

  if (b.driver_name) {
    lines.push(`${t.labelDriver}: ${b.driver_name}`);
  }
  if (b.vehicle_plate) {
    lines.push(`${t.labelPlate}: ${b.vehicle_plate}`);
  }

  lines.push("");
  lines.push(t.reminderClosing);

  return lines.join("\n");
}

/**
 * Build a WhatsApp message acknowledging receipt of booking request.
 * @param {object} booking
 * @returns {string}
 */
export function buildReceivedMessage(booking, { language } = {}) {
  const b = booking ?? {};
  const t = getLang(language ?? b.language);

  const lines = [t.receivedGreeting(b.customer_name), "", t.receivedClosing];

  return lines.join("\n");
}

/**
 * Build a WhatsApp message requesting customer review/feedback.
 * @param {object} booking
 * @returns {string}
 */
export function buildReviewMessage(booking, { language } = {}) {
  const b = booking ?? {};
  const t = getLang(language ?? b.language);

  const lines = [t.reviewGreeting(b.customer_name), "", t.reviewClosing];

  return lines.join("\n");
}

/**
 * Build a WhatsApp message for airport Meet & Greet service.
 * @param {object} booking
 * @returns {string}
 */
export function buildMeetGreetMessage(booking, { language } = {}) {
  const b = booking ?? {};
  const t = getLang(language ?? b.language);

  const lines = [t.meetGreetGreeting(b.customer_name), "", t.meetGreetClosing];

  return lines.join("\n");
}
