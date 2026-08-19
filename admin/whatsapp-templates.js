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
      `Dear ${name},\n\n✅ Your premium Antalya VIP transfer is confirmed! We're excited to welcome you.`,
    confirmClosing:
      "Your comfort and punctuality are our priorities. We're ready to provide you with an exceptional VIP experience. If you have any questions, we're just a message away! 🚗",
    reminderGreeting: (name) =>
      `Dear ${name},\n\n🚙 Your VIP transfer is coming up! Here's a quick reminder:`,
    reminderClosing:
      "Your professional driver is on standby and ready to welcome you. Looking forward to a smooth, luxurious journey! 🌟",
    receivedGreeting: (name) =>
      `Dear ${name},\n\n✨ Thank you for choosing Antalya VIP Tourism! We've received your booking and our team is reviewing it with care.`,
    receivedClosing:
      "We'll reach out shortly with your personalized transfer details. Get ready for premium service! 🎯",
    meetGreetGreeting: (name) =>
      `Dear ${name},\n\n✈️ Welcome to Antalya! Your VIP Meet & Greet experience awaits.`,
    meetGreetClosing:
      "Our team will be waiting for you at meeting point J / 777 with your personalized name board. We're here to make your arrival seamless and luxurious! 🌟",
    reviewGreeting: (name) =>
      `Dear ${name},\n\n🌟 Thank you for traveling with Antalya VIP Tourism! We hope your journey was exceptional.`,
    reviewClosing:
      "Your feedback helps us deliver premium service. Please share your experience on Google — we'd love to read your review! 👇\n\nhttps://g.page/r/CbJCg7BC63cBEBI/review",
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
      `Sehr geehrte/r ${name},\n\n✅ Ihr Premium-Transfer mit Antalya VIP Tourism ist bestätigt! Wir freuen uns auf Ihre Ankunft.`,
    confirmClosing:
      "Ihr Komfort und Ihre Pünktlichkeit sind unsere Priorität. Wir bieten Ihnen ein außergewöhnliches VIP-Erlebnis. Bei Fragen erreichen Sie uns jederzeit! 🚗",
    reminderGreeting: (name) =>
      `Sehr geehrte/r ${name},\n\n🚙 Ihr VIP-Transfer steht bevor! Hier ist eine schnelle Erinnerung:`,
    reminderClosing:
      "Ihr professioneller Fahrer ist einsatzbereit und freut sich auf Ihre Ankunft. Eine reibungslose, luxuriöse Fahrt erwartet Sie! 🌟",
    receivedGreeting: (name) =>
      `Sehr geehrte/r ${name},\n\n✨ Vielen Dank, dass Sie Antalya VIP Tourism wählen! Wir haben Ihre Buchung erhalten und unser Team überprüft diese sorgfältig.`,
    receivedClosing:
      "Wir kontaktieren Sie in Kürze mit Ihren personalisierten Transferdetails. Genießen Sie Premium-Service! 🎯",
    meetGreetGreeting: (name) =>
      `Sehr geehrte/r ${name},\n\n✈️ Willkommen in Antalya! Ihr VIP Meet & Greet Erlebnis wartet.`,
    meetGreetClosing:
      "Unser Team wartet auf Sie am Treffpunkt J / 777 mit Ihrem personalisierten Namensschild. Wir sind hier, um Ihre Ankunft nahtlos und luxuriös zu gestalten! 🌟",
    reviewGreeting: (name) =>
      `Sehr geehrte/r ${name},\n\n🌟 Vielen Dank für Ihre Reise mit Antalya VIP Tourism! Wir hoffen, Ihre Fahrt war außergewöhnlich.`,
    reviewClosing:
      "Ihr Feedback hilft uns, Premium-Service zu liefern. Bitte teilen Sie Ihre Erfahrung auf Google mit — wir freuen uns auf Ihre Bewertung! 👇\n\nhttps://g.page/r/CbJCg7BC63cBEBI/review",
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
      `Уважаемый(-ая) ${name},\n\n✅ Ваш премиум-трансфер с Antalya VIP Tourism подтверждён! Мы рады приветствовать вас.`,
    confirmClosing:
      "Ваш комфорт и пунктуальность — наш приоритет. Мы готовы предоставить вам исключительный VIP-сервис. Если у вас есть вопросы, мы в сообщении! 🚗",
    reminderGreeting: (name) =>
      `Уважаемый(-ая) ${name},\n\n🚙 Ваш VIP-трансфер уже совсем близко! Вспомните детали:`,
    reminderClosing:
      "Ваш профессиональный водитель на связи и готов вас приветствовать. Ожидаем гладкую, люксовую поездку! 🌟",
    receivedGreeting: (name) =>
      `Уважаемый(-ая) ${name},\n\n✨ Спасибо за выбор Antalya VIP Tourism! Мы получили вашу бронь и внимательно её рассматриваем.`,
    receivedClosing:
      "Мы скоро свяжемся с вами с персональными деталями вашего трансфера. Ждите премиум-сервиса! 🎯",
    meetGreetGreeting: (name) =>
      `Уважаемый(-ая) ${name},\n\n✈️ Добро пожаловать в Анталью! Ваш VIP Meet & Greet ждёт вас.`,
    meetGreetClosing:
      "Наша команда встречает вас в точке J / 777 с персональной табличкой. Мы здесь, чтобы ваш приезд был безупречным и люксовым! 🌟",
    reviewGreeting: (name) =>
      `Уважаемый(-ая) ${name},\n\n🌟 Спасибо за поездку с Antalya VIP Tourism! Надеемся, ваше путешествие было исключительным.`,
    reviewClosing:
      "Ваш отзыв помогает нам совершенствовать сервис. Поделитесь впечатлениями на Google — нам важна ваша оценка! 👇\n\nhttps://g.page/r/CbJCg7BC63cBEBI/review",
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
      `Sayın ${name},\n\n✅ Antalya VIP Tourism premium transferiniz onaylanmıştır! Sizi ağırlamaktan heyecanlıyız.`,
    confirmClosing:
      "Konforunuz ve zamanınız bizim önceliğimiz. Size istisnai bir VIP deneyimi sunmaya hazırız. Herhangi bir sorunuz varsa, biz buradayız! 🚗",
    reminderGreeting: (name) =>
      `Sayın ${name},\n\n🚙 VIP transferiniz yaklaşıyor! İşte detaylar:`,
    reminderClosing:
      "Profesyonel sürücünüz sizi karşılamak için bekleniyor. Rahat ve lüks bir yolculuk bekleniyor! 🌟",
    receivedGreeting: (name) =>
      `Sayın ${name},\n\n✨ Antalya VIP Tourism'i seçtiğiniz için teşekkür! Rezervasyonunuzu aldık ve dikkatle inceliyoruz.`,
    receivedClosing:
      "Kısa sürede transfer detaylarınızı size iletişim kuracağız. Premium hizmete hazır olun! 🎯",
    meetGreetGreeting: (name) =>
      `Sayın ${name},\n\n✈️ Antalya'ya hoş geldiniz! VIP Meet & Greet deneyiminiz sizi bekliyor.`,
    meetGreetClosing:
      "Ekibimiz J / 777 buluşma noktasında kişiye özel isim tabelasıyla sizi karşılayacak. Geliş deneyiminizi kusursuz ve lüks yapmak için buradayız! 🌟",
    reviewGreeting: (name) =>
      `Sayın ${name},\n\n🌟 Antalya VIP Tourism ile seyahatiniz için teşekkür! Yolculuğunuzun olağanüstü olduğunu umuyoruz.`,
    reviewClosing:
      "Geri bildiriminiz bize premium hizmet vermeyi sağlıyor. Lütfen Google'da deneyiminizi paylaşın — değerli görüşlerinizi duymaktan mutlu oluruz! 👇\n\nhttps://g.page/r/CbJCg7BC63cBEBI/review",
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
      `Cher(e) ${name},\n\n✅ Votre transfert premium Antalya VIP Tourism est confirmé! Nous sommes ravis de vous accueillir.`,
    confirmClosing:
      "Votre confort et votre ponctualité sont nos priorités. Nous sommes prêts à vous offrir une expérience VIP exceptionnelle. Des questions? Nous sommes à votre service! 🚗",
    reminderGreeting: (name) =>
      `Cher(e) ${name},\n\n🚙 Votre transfert VIP arrive bientôt! Voici un rappel:`,
    reminderClosing:
      "Votre conducteur professionnel vous attend pour une réception chaleureuse. Un voyage en toute sérénité vous attend! 🌟",
    receivedGreeting: (name) =>
      `Cher(e) ${name},\n\n✨ Merci d'avoir choisi Antalya VIP Tourism! Nous avons bien reçu votre réservation et l'examinons avec attention.`,
    receivedClosing:
      "Nous vous recontacterons bientôt avec vos détails de transfert personnalisés. Préparez-vous au service premium! 🎯",
    meetGreetGreeting: (name) =>
      `Cher(e) ${name},\n\n✈️ Bienvenue à Antalya! Votre expérience VIP Meet & Greet vous attend.`,
    meetGreetClosing:
      "Notre équipe vous attendra au point de rencontre J / 777 avec un panneau personnalisé. Nous sommes là pour rendre votre arrivée exceptionnelle! 🌟",
    reviewGreeting: (name) =>
      `Cher(e) ${name},\n\n🌟 Merci d'avoir voyagé avec Antalya VIP Tourism! Nous espérons que votre voyage a été exceptionnel.`,
    reviewClosing:
      "Vos commentaires nous aident à offrir un service premium. Partagez votre expérience sur Google — nous serions ravis de lire votre avis! 👇\n\nhttps://g.page/r/CbJCg7BC63cBEBI/review",
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
      `عزيزي/عزيزتي ${name}،\n\n✅ تم تأكيد خدمة النقل الفاخرة مع Antalya VIP Tourism! نحن متحمسون لاستقبالك.`,
    confirmClosing:
      "راحتك وموثوقيتنا هما أولويتنا. نحن مستعدون لتقديم تجربة VIP استثنائية. لأي استفسارات، نحن هنا! 🚗",
    reminderGreeting: (name) =>
      `عزيزي/عزيزتي ${name}،\n\n🚙 خدمة النقل الفاخرة الخاصة بك قريبة! إليك التفاصيل:`,
    reminderClosing:
      "سائقك المحترف مستعد لاستقبالك بحفاوة. رحلة سلسة وفاخرة تنتظرك! 🌟",
    receivedGreeting: (name) =>
      `عزيزي/عزيزتي ${name}،\n\n✨ شكراً لاختيارك Antalya VIP Tourism! استقبلنا حجزك وفريقنا يفحصه بعناية.`,
    receivedClosing:
      "سنتواصل معك قريباً بتفاصيل نقلك الشخصية. استعد للخدمة الفاخرة! 🎯",
    meetGreetGreeting: (name) =>
      `عزيزي/عزيزتي ${name}،\n\n✈️ أهلاً وسهلاً في أنطاليا! تجربة Meet & Greet الفاخرة تنتظرك.`,
    meetGreetClosing:
      "فريقنا سينتظرك عند نقطة اللقاء J / 777 برفع لافتة باسمك الشخصي. نحن هنا لجعل استقبالك خالياً من العراقيل وفاخراً! 🌟",
    reviewGreeting: (name) =>
      `عزيزي/عزيزتي ${name}،\n\n🌟 شكراً لسفرك مع Antalya VIP Tourism! نتمنى أن تكون رحلتك استثنائية.`,
    reviewClosing:
      "تقييمك يساعدنا على تقديم خدمة فاخرة. يرجى مشاركة تجربتك على Google — نود قراءة رأيك! 👇\n\nhttps://g.page/r/CbJCg7BC63cBEBI/review",
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
    if (Number(b.child_seat_count) > 0)
      lines.push(`${t.labelChildSeats}: ${b.child_seat_count}`);
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
  if (Number(b.child_seat_count) > 0)
    lines.push(`${t.labelChildSeats}: ${b.child_seat_count}`);

  lines.push(`${t.labelPrice}: €${fmtPrice(transfer.price)}`);
  return lines;
}

/**
 * Build a WhatsApp confirmation message for a booking.
 * @param {object} booking
 * @returns {string}
 */
export function buildConfirmMessage(booking, { leg = "outbound" } = {}) {
  const b = booking ?? {};
  const t = getLang(b.language);
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
 * @returns {string}
 */
export function buildReminderMessage(booking, { leg = "outbound" } = {}) {
  const b = booking ?? {};
  const t = getLang(b.language);
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
export function buildReceivedMessage(booking) {
  const b = booking ?? {};
  const t = getLang(b.language);

  const lines = [t.receivedGreeting(b.customer_name), "", t.receivedClosing];

  return lines.join("\n");
}

/**
 * Build a WhatsApp message requesting customer review/feedback.
 * @param {object} booking
 * @returns {string}
 */
export function buildReviewMessage(booking) {
  const b = booking ?? {};
  const t = getLang(b.language);

  const lines = [t.reviewGreeting(b.customer_name), "", t.reviewClosing];

  return lines.join("\n");
}

/**
 * Build a WhatsApp message for airport Meet & Greet service.
 * @param {object} booking
 * @returns {string}
 */
export function buildMeetGreetMessage(booking) {
  const b = booking ?? {};
  const t = getLang(b.language);

  const lines = [t.meetGreetGreeting(b.customer_name), "", t.meetGreetClosing];

  return lines.join("\n");
}
