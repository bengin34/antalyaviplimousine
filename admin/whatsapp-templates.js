import { locationLabel, navigationURLs } from './turkish-formatters.js'

// Shared transfer start-time rule used by the React timeline and detail views.
function transferStartTime(pickupLocation, pickupTime, flightArrivalTime) {
  if (pickupLocation === 'airport') return flightArrivalTime || pickupTime
  return pickupTime
}

// Postgres `time` columns arrive as HH:MM:SS; trim to HH:MM for the message.
function fmtTime(t) {
  return t ? String(t).slice(0, 5) : '—'
}

function fmtPrice(value) {
  const price = Number(value)
  if (!Number.isFinite(price)) return '0'
  return Number.isInteger(price) ? String(price) : price.toFixed(2).replace(/0+$/, '').replace(/\.$/, '')
}

const VEHICLE_LABELS = {
  vclass: 'Mercedes V-Class',
  vito: 'Mercedes Vito',
}

function vehicleLabel(type) {
  return VEHICLE_LABELS[type] ?? type
}

// Per-language dictionaries for customer-facing WhatsApp messages.
// Values: labels and natural sentences for a VIP airport transfer service in Antalya.
const LANG = {
  en: {
    confirmGreeting: (name) => `Dear ${name},\n\nThank you for choosing Antalya VIP Limousine. Your transfer has been confirmed. Here are the details:`,
    confirmClosing: "We look forward to welcoming you. Please don't hesitate to contact us if you have any questions.",
    reminderGreeting: (name) => `Dear ${name},\n\nThis is a friendly reminder about your upcoming transfer with Antalya VIP Limousine:`,
    reminderClosing: 'Your driver will be waiting for you. Safe travels!',
    receivedGreeting: (name) => `Dear ${name},\n\nThank you for your request. We have received your booking and are reviewing it carefully.`,
    receivedClosing: 'We will contact you soon with the details of your transfer.',
    reviewGreeting: (name) => `Dear ${name},\n\nWe hope you enjoyed your transfer service with Antalya VIP Limousine.`,
    reviewClosing: 'If you are satisfied with our service, we would love to hear your feedback. Thank you!',
    labelRef: 'Reference',
    labelDate: 'Date',
    labelPickupTime: 'Pickup time',
    labelRoute: 'Route',
    labelVehicle: 'Vehicle',
    labelGuests: 'Guests',
    labelPrice: 'Price',
    labelTransfer: 'Transfer',
    labelOutbound: 'Outbound transfer',
    labelReturn: 'Return transfer',
    labelPickup: 'Pickup location',
    labelDropoff: 'Drop-off location',
    labelMap: 'Google Maps route',
    labelFlight: 'Flight',
    labelLuggage: 'Luggage',
    labelChildSeats: 'Child seats',
    labelDriver: 'Driver',
    labelPlate: 'Plate',
    labelDailyHire: 'Daily vehicle + chauffeur',
    labelPeriod: 'Service period',
    labelDailyRate: 'Daily rate',
    labelTotal: 'Total service price',
    labelFuel: 'Fuel',
    fuelExcluded: 'Not included; paid separately by the customer according to use',
    labelArrivalFlight: 'Arrival flight',
    labelDepartureFlight: 'Departure flight',
  },
  de: {
    confirmGreeting: (name) => `Sehr geehrte/r ${name},\n\nvielen Dank für Ihre Buchung bei Antalya VIP Limousine. Ihr Transfer wurde bestätigt. Hier sind die Details:`,
    confirmClosing: 'Wir freuen uns, Sie begrüßen zu dürfen. Bei Fragen stehen wir Ihnen jederzeit gerne zur Verfügung.',
    reminderGreeting: (name) => `Sehr geehrte/r ${name},\n\nhiermit möchten wir Sie an Ihren bevorstehenden Transfer mit Antalya VIP Limousine erinnern:`,
    reminderClosing: 'Ihr Fahrer wird auf Sie warten. Gute Reise!',
    receivedGreeting: (name) => `Sehr geehrte/r ${name},\n\nvielen Dank für Ihre Anfrage. Wir haben Ihre Buchung erhalten und prüfen sie sorgfältig.`,
    receivedClosing: 'Wir werden Sie bald mit den Details Ihres Transfers kontaktieren.',
    reviewGreeting: (name) => `Sehr geehrte/r ${name},\n\nwir hoffen, dass Ihnen Ihr Transferservice mit Antalya VIP Limousine gefallen hat.`,
    reviewClosing: 'Wenn Sie mit unserem Service zufrieden sind, würden wir uns über Ihr Feedback freuen. Vielen Dank!',
    labelRef: 'Referenz',
    labelDate: 'Datum',
    labelPickupTime: 'Abholzeit',
    labelRoute: 'Strecke',
    labelVehicle: 'Fahrzeug',
    labelGuests: 'Gäste',
    labelPrice: 'Preis',
    labelTransfer: 'Transfer',
    labelOutbound: 'Hintransfer',
    labelReturn: 'Rücktransfer',
    labelPickup: 'Abholort',
    labelDropoff: 'Zielort',
    labelMap: 'Google-Maps-Route',
    labelFlight: 'Flug',
    labelLuggage: 'Gepäck',
    labelChildSeats: 'Kindersitze',
    labelDriver: 'Fahrer',
    labelPlate: 'Kennzeichen',
  },
  ru: {
    confirmGreeting: (name) => `Уважаемый(-ая) ${name},\n\nспасибо за выбор Antalya VIP Limousine. Ваш трансфер подтверждён. Детали бронирования:`,
    confirmClosing: 'Мы рады приветствовать вас. Если у вас есть вопросы, пожалуйста, свяжитесь с нами.',
    reminderGreeting: (name) => `Уважаемый(-ая) ${name},\n\nнапоминаем о вашем предстоящем трансфере с Antalya VIP Limousine:`,
    reminderClosing: 'Ваш водитель будет вас ждать. Счастливого пути!',
    receivedGreeting: (name) => `Уважаемый(-ая) ${name},\n\nспасибо за ваш запрос. Мы получили вашу бронь и тщательно её рассматриваем.`,
    receivedClosing: 'Мы скоро свяжемся с вами с деталями вашего трансфера.',
    reviewGreeting: (name) => `Уважаемый(-ая) ${name},\n\nмы надеемся, что вам понравилась услуга трансфера с Antalya VIP Limousine.`,
    reviewClosing: 'Если вы довольны нашим сервисом, мы будем рады услышать ваше мнение. Спасибо!',
    labelRef: 'Номер брони',
    labelDate: 'Дата',
    labelPickupTime: 'Время подачи',
    labelRoute: 'Маршрут',
    labelVehicle: 'Автомобиль',
    labelGuests: 'Гостей',
    labelPrice: 'Стоимость',
    labelTransfer: 'Трансфер',
    labelOutbound: 'Трансфер туда',
    labelReturn: 'Обратный трансфер',
    labelPickup: 'Место подачи',
    labelDropoff: 'Место назначения',
    labelMap: 'Маршрут Google Maps',
    labelFlight: 'Рейс',
    labelLuggage: 'Багаж',
    labelChildSeats: 'Детские кресла',
    labelDriver: 'Водитель',
    labelPlate: 'Номер машины',
  },
  tr: {
    confirmGreeting: (name) => `Sayın ${name},\n\nAntalya VIP Limousine'i tercih ettiğiniz için teşekkür ederiz. Transferiniz onaylanmıştır. İşte detaylar:`,
    confirmClosing: 'Sizi ağırlamaktan memnuniyet duyacağız. Herhangi bir sorunuz olursa lütfen bizimle iletişime geçmekten çekinmeyin.',
    reminderGreeting: (name) => `Sayın ${name},\n\nAntalya VIP Limousine ile yaklaşan transferinizi size hatırlatmak istedik:`,
    reminderClosing: 'Sürücünüz sizi bekliyor olacak. İyi yolculuklar!',
    receivedGreeting: (name) => `Sayın ${name},\n\ntalebiniz için teşekkür ederiz. Rezervasyonunuzu aldık ve dikkatle inceliyoruz.`,
    receivedClosing: 'Transferinizin detayları ile yakında sizinle iletişime geçeceğiz.',
    reviewGreeting: (name) => `Sayın ${name},\n\nAntalya VIP Limousine ile transfer hizmetimizden memnun kaldığınız umarız.`,
    reviewClosing: 'Eğer hizmetimizden memnun iseniz, değerli görüşlerinizi duymaktan mutlu oluruz. Teşekkür ederiz!',
    labelRef: 'Rezervasyon No',
    labelDate: 'Tarih',
    labelPickupTime: 'Alış saati',
    labelRoute: 'Güzergah',
    labelVehicle: 'Araç',
    labelGuests: 'Misafir',
    labelPrice: 'Fiyat',
    labelTransfer: 'Transfer',
    labelOutbound: 'Gidiş transferi',
    labelReturn: 'Dönüş transferi',
    labelPickup: 'Alış konumu',
    labelDropoff: 'Varış konumu',
    labelMap: 'Google Maps güzergâhı',
    labelFlight: 'Uçuş',
    labelLuggage: 'Bagaj',
    labelChildSeats: 'Çocuk koltuğu',
    labelDriver: 'Sürücü',
    labelPlate: 'Plaka',
    labelDailyHire: 'Günlük araç + şoför',
    labelPeriod: 'Hizmet dönemi',
    labelDailyRate: 'Günlük ücret',
    labelTotal: 'Toplam hizmet bedeli',
    labelFuel: 'Yakıt',
    fuelExcluded: 'Dahil değildir; müşteri kullanıma göre ayrıca öder',
    labelArrivalFlight: 'Geliş uçuşu',
    labelDepartureFlight: 'Dönüş uçuşu',
  },
  fr: {
    confirmGreeting: (name) => `Cher(e) ${name},\n\nMerci d'avoir choisi Antalya VIP Limousine. Votre transfert a été confirmé. Voici les détails:`,
    confirmClosing: 'Nous avons hâte de vous accueillir. N\'hésitez pas à nous contacter si vous avez des questions.',
    reminderGreeting: (name) => `Cher(e) ${name},\n\nCeci est un rappel amical concernant votre transfert à venir avec Antalya VIP Limousine:`,
    reminderClosing: 'Votre conducteur vous attendra. Bon voyage!',
    receivedGreeting: (name) => `Cher(e) ${name},\n\nMerci de votre demande. Nous avons bien reçu votre réservation et nous l'examinons attentivement.`,
    receivedClosing: 'Nous vous recontacterons bientôt avec les détails de votre transfert.',
    reviewGreeting: (name) => `Cher(e) ${name},\n\nNous espérons que vous avez apprécié votre service de transfert avec Antalya VIP Limousine.`,
    reviewClosing: 'Si vous êtes satisfait de nos services, nous serions ravis d\'avoir votre avis. Merci!',
    labelRef: 'Référence',
    labelDate: 'Date',
    labelPickupTime: 'Heure de prise en charge',
    labelRoute: 'Itinéraire',
    labelVehicle: 'Véhicule',
    labelGuests: 'Passagers',
    labelPrice: 'Prix',
    labelTransfer: 'Transfert',
    labelOutbound: 'Transfert aller',
    labelReturn: 'Transfert retour',
    labelPickup: 'Lieu de prise en charge',
    labelDropoff: 'Lieu de destination',
    labelMap: 'Itinéraire Google Maps',
    labelFlight: 'Vol',
    labelLuggage: 'Bagages',
    labelChildSeats: 'Sièges enfant',
    labelDriver: 'Conducteur',
    labelPlate: 'Plaque',
  },
  ar: {
    confirmGreeting: (name) => `عزيزي/عزيزتي ${name}،\n\nشكراً لاختيارك Antalya VIP Limousine. تم تأكيد خدمة النقل الخاصة بك. إليك أحدث التفاصيل:`,
    confirmClosing: 'نتطلع إلى استقبالك. لا تتردد في التواصل معنا إذا كان لديك أي سؤال.',
    reminderGreeting: (name) => `عزيزي/عزيزتي ${name}،\n\nنود تذكيرك بخدمة النقل القادمة مع Antalya VIP Limousine:`,
    reminderClosing: 'سيكون سائقك في انتظارك. نتمنى لك رحلة آمنة!',
    labelRef: 'رقم الحجز',
    labelDate: 'التاريخ',
    labelPickupTime: 'وقت الاستقبال',
    labelRoute: 'المسار',
    labelVehicle: 'السيارة',
    labelGuests: 'الركاب',
    labelPrice: 'السعر',
    labelTransfer: 'خدمة النقل',
    labelOutbound: 'رحلة الذهاب',
    labelReturn: 'رحلة العودة',
    labelPickup: 'موقع الاستقبال',
    labelDropoff: 'موقع الوصول',
    labelMap: 'مسار Google Maps',
    labelFlight: 'الرحلة الجوية',
    labelLuggage: 'الأمتعة',
    labelChildSeats: 'مقاعد الأطفال',
    labelDriver: 'السائق',
    labelPlate: 'لوحة السيارة',
  },
}

function getLang(language) {
  return LANG[language] ?? LANG.en
}

function transferDetails(booking, requestedLeg = 'outbound') {
  const b = booking ?? {}
  const isRoundTrip = b.trip_type === 'round_trip'
  const isDailyChauffeur = b.trip_type === 'daily_chauffeur'
  const isReturn = requestedLeg === 'return' && isRoundTrip

  if (isDailyChauffeur) {
    return {
      leg: 'daily',
      date: b.pickup_date,
      time: b.pickup_time,
      flightNumber: b.flight_number,
      pickupLocation: b.pickup_location,
      pickupAddress: b.pickup_address,
      isRoundTrip: false,
      isDailyChauffeur: true,
      pickup: b.pickup_address || b.hotel_name || locationLabel(b.pickup_location),
      price: Number(b.price_eur) || 0,
    }
  }

  const transfer = isReturn
    ? {
        leg: 'return',
        date: b.return_date,
        time: b.return_pickup_time,
        flightNumber: b.return_flight_number,
        pickupLocation: b.dropoff_location,
        pickupAddress: b.dropoff_address,
        dropoffLocation: b.pickup_location,
        dropoffAddress: b.pickup_address,
      }
    : {
        leg: 'outbound',
        date: b.pickup_date,
        time: transferStartTime(b.pickup_location, b.pickup_time, b.flight_arrival_time),
        flightNumber: b.flight_number,
        pickupLocation: b.pickup_location,
        pickupAddress: b.pickup_address,
        dropoffLocation: b.dropoff_location,
        dropoffAddress: b.dropoff_address,
      }

  const navigation = navigationURLs({
    originValue: transfer.pickupLocation,
    originAddress: transfer.pickupAddress,
    destinationValue: transfer.dropoffLocation,
    destinationAddress: transfer.dropoffAddress,
    hotelName: b.hotel_name,
  })

  return {
    ...transfer,
    isRoundTrip,
    route: `${locationLabel(transfer.pickupLocation)} → ${locationLabel(transfer.dropoffLocation)}`,
    pickup: navigation.origin,
    dropoff: navigation.destination,
    mapURL: navigation.google,
    price: isRoundTrip ? (Number(b.price_eur) || 0) / 2 : Number(b.price_eur) || 0,
  }
}

function detailLines(booking, transfer, t, { includeMap = true } = {}) {
  const b = booking ?? {}
  if (transfer.isDailyChauffeur) {
    const english = LANG.en
    const text = (key) => t[key] ?? english[key]
    const lines = [
      `*${text('labelDailyHire')}*`,
      `${text('labelPeriod')}: ${b.pickup_date || '—'} – ${b.service_end_date || '—'}`,
      `${t.labelPickupTime}: ${fmtTime(b.pickup_time)}`,
      `${t.labelPickup}: ${transfer.pickup}`,
      `${t.labelVehicle}: ${vehicleLabel(b.vehicle_type)}`,
      `${t.labelGuests}: ${b.guests ?? '—'}`,
      `${text('labelDailyRate')}: €${fmtPrice(b.daily_rate_eur)}`,
      `${text('labelTotal')}: €${fmtPrice(b.price_eur)}`,
      `${text('labelFuel')}: ${text('fuelExcluded')}`,
    ]
    if (b.flight_number) lines.push(`${text('labelArrivalFlight')}: ${b.flight_number} · ${fmtTime(b.flight_arrival_time)}`)
    if (b.departure_flight_date) lines.push(`${text('labelDepartureFlight')}: ${b.departure_flight_date} · ${b.departure_flight_number || '—'} · ${fmtTime(b.departure_flight_time)}`)
    if (Number(b.luggage_count) > 0) lines.push(`${t.labelLuggage}: ${b.luggage_count}`)
    if (Number(b.child_seat_count) > 0) lines.push(`${t.labelChildSeats}: ${b.child_seat_count}`)
    return lines
  }
  const lines = [
    `*${transfer.isRoundTrip ? (transfer.leg === 'return' ? t.labelReturn : t.labelOutbound) : t.labelTransfer}*`,
    `${t.labelRoute}: ${transfer.route}`,
    `${t.labelDate}: ${transfer.date || '—'}`,
    `${t.labelPickupTime}: ${fmtTime(transfer.time)}`,
  ]

  if (transfer.flightNumber) lines.push(`${t.labelFlight}: ${transfer.flightNumber}`)

  lines.push(
    `${t.labelPickup}: ${transfer.pickup}`,
    `${t.labelDropoff}: ${transfer.dropoff}`,
  )

  if (includeMap) lines.push(`${t.labelMap}: ${transfer.mapURL}`)

  lines.push(
    `${t.labelVehicle}: ${vehicleLabel(b.vehicle_type)}`,
    `${t.labelGuests}: ${b.guests ?? '—'}`,
  )

  if (Number(b.luggage_count) > 0) lines.push(`${t.labelLuggage}: ${b.luggage_count}`)
  if (Number(b.child_seat_count) > 0) lines.push(`${t.labelChildSeats}: ${b.child_seat_count}`)

  lines.push(`${t.labelPrice}: €${fmtPrice(transfer.price)}`)
  return lines
}

/**
 * Build a WhatsApp confirmation message for a booking.
 * @param {object} booking
 * @returns {string}
 */
export function buildConfirmMessage(booking, { leg = 'outbound' } = {}) {
  const b = booking ?? {}
  const t = getLang(b.language)
  const transfer = transferDetails(b, leg)

  const lines = [
    t.confirmGreeting(b.customer_name),
    '',
    `${t.labelRef}: ${b.booking_ref}`,
    ...detailLines(b, transfer, t, { includeMap: false }),
    '',
    t.confirmClosing,
  ]

  return lines.join('\n')
}

/**
 * Build a WhatsApp reminder message for a booking.
 * Builds the reminder for the requested, currently displayed transfer leg.
 * @param {object} booking
 * @returns {string}
 */
export function buildReminderMessage(booking, { leg = 'outbound' } = {}) {
  const b = booking ?? {}
  const t = getLang(b.language)
  const transfer = transferDetails(b, leg)

  const lines = [
    t.reminderGreeting(b.customer_name),
    '',
    `${t.labelRef}: ${b.booking_ref}`,
    ...detailLines(b, transfer, t),
  ]

  if (b.driver_name) {
    lines.push(`${t.labelDriver}: ${b.driver_name}`)
  }
  if (b.vehicle_plate) {
    lines.push(`${t.labelPlate}: ${b.vehicle_plate}`)
  }

  lines.push('')
  lines.push(t.reminderClosing)

  return lines.join('\n')
}

/**
 * Build a WhatsApp message acknowledging receipt of booking request.
 * @param {object} booking
 * @returns {string}
 */
export function buildReceivedMessage(booking) {
  const b = booking ?? {}
  const t = getLang(b.language)

  const lines = [
    t.receivedGreeting(b.customer_name),
    '',
    t.receivedClosing,
  ]

  return lines.join('\n')
}

/**
 * Build a WhatsApp message requesting customer review/feedback.
 * @param {object} booking
 * @returns {string}
 */
export function buildReviewMessage(booking) {
  const b = booking ?? {}
  const t = getLang(b.language)

  const lines = [
    t.reviewGreeting(b.customer_name),
    '',
    t.reviewClosing,
  ]

  return lines.join('\n')
}
