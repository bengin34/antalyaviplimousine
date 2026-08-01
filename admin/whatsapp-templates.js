import { locationDisplay } from './turkish-formatters.js'

// Inline copy consistent with timeline.js:48 and booking-detail.js:12
function transferStartTime(pickupLocation, pickupTime, flightArrivalTime) {
  if (pickupLocation === 'airport') return flightArrivalTime || pickupTime
  return pickupTime
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
    labelRef: 'Reference',
    labelDate: 'Date',
    labelPickupTime: 'Pickup time',
    labelRoute: 'Route',
    labelVehicle: 'Vehicle',
    labelGuests: 'Guests',
    labelPrice: 'Price',
    labelMeetingPoint: 'Meeting point',
    labelDriver: 'Driver',
    labelPlate: 'Plate',
  },
  de: {
    confirmGreeting: (name) => `Sehr geehrte/r ${name},\n\nvielen Dank für Ihre Buchung bei Antalya VIP Limousine. Ihre Übertragung wurde bestätigt. Hier sind die Details:`,
    confirmClosing: 'Wir freuen uns, Sie begrüßen zu dürfen. Bei Fragen stehen wir Ihnen jederzeit gerne zur Verfügung.',
    reminderGreeting: (name) => `Sehr geehrte/r ${name},\n\nhiermit möchten wir Sie an Ihren bevorstehenden Transfer mit Antalya VIP Limousine erinnern:`,
    reminderClosing: 'Ihr Fahrer wird auf Sie warten. Gute Reise!',
    labelRef: 'Referenz',
    labelDate: 'Datum',
    labelPickupTime: 'Abholzeit',
    labelRoute: 'Strecke',
    labelVehicle: 'Fahrzeug',
    labelGuests: 'Gäste',
    labelPrice: 'Preis',
    labelMeetingPoint: 'Treffpunkt',
    labelDriver: 'Fahrer',
    labelPlate: 'Kennzeichen',
  },
  ru: {
    confirmGreeting: (name) => `Уважаемый(-ая) ${name},\n\nспасибо за выбор Antalya VIP Limousine. Ваш трансфер подтверждён. Детали бронирования:`,
    confirmClosing: 'Мы рады приветствовать вас. Если у вас есть вопросы, пожалуйста, свяжитесь с нами.',
    reminderGreeting: (name) => `Уважаемый(-ая) ${name},\n\nнапоминаем о вашем предстоящем трансфере с Antalya VIP Limousine:`,
    reminderClosing: 'Ваш водитель будет вас ждать. Счастливого пути!',
    labelRef: 'Номер брони',
    labelDate: 'Дата',
    labelPickupTime: 'Время подачи',
    labelRoute: 'Маршрут',
    labelVehicle: 'Автомобиль',
    labelGuests: 'Гостей',
    labelPrice: 'Стоимость',
    labelMeetingPoint: 'Место встречи',
    labelDriver: 'Водитель',
    labelPlate: 'Номер машины',
  },
  tr: {
    confirmGreeting: (name) => `Sayın ${name},\n\nAntalya VIP Limousine'i tercih ettiğiniz için teşekkür ederiz. Transferiniz onaylanmıştır. İşte detaylar:`,
    confirmClosing: 'Sizi ağırlamaktan memnuniyet duyacağız. Herhangi bir sorunuz olursa lütfen bizimle iletişime geçmekten çekinmeyin.',
    reminderGreeting: (name) => `Sayın ${name},\n\nAntalya VIP Limousine ile yaklaşan transferinizi size hatırlatmak istedik:`,
    reminderClosing: 'Sürücünüz sizi bekliyor olacak. İyi yolculuklar!',
    labelRef: 'Rezervasyon No',
    labelDate: 'Tarih',
    labelPickupTime: 'Alış saati',
    labelRoute: 'Güzergah',
    labelVehicle: 'Araç',
    labelGuests: 'Misafir',
    labelPrice: 'Fiyat',
    labelMeetingPoint: 'Buluşma noktası',
    labelDriver: 'Sürücü',
    labelPlate: 'Plaka',
  },
}

function getLang(language) {
  return LANG[language] ?? LANG.en
}

/**
 * Build a WhatsApp confirmation message for a booking.
 * @param {object} booking
 * @returns {string}
 */
export function buildConfirmMessage(booking) {
  const b = booking ?? {}
  const t = getLang(b.language)

  const pickupDisplay = locationDisplay(b.pickup_location, b.pickup_address)
  const dropoffDisplay = locationDisplay(b.dropoff_location, b.dropoff_address)
  const pickupTime = transferStartTime(b.pickup_location, b.pickup_time, b.flight_arrival_time)

  const lines = [
    t.confirmGreeting(b.customer_name),
    '',
    `${t.labelRef}: ${b.booking_ref}`,
    `${t.labelDate}: ${b.pickup_date}`,
    `${t.labelPickupTime}: ${pickupTime}`,
    `${t.labelRoute}: ${pickupDisplay} → ${dropoffDisplay}`,
    `${t.labelVehicle}: ${vehicleLabel(b.vehicle_type)}`,
    `${t.labelGuests}: ${b.guests}`,
    `${t.labelPrice}: €${b.price_eur}`,
    '',
    t.confirmClosing,
  ]

  return lines.join('\n')
}

/**
 * Build a WhatsApp reminder message for a booking.
 * Uses the outbound leg always (even for round trips).
 * @param {object} booking
 * @returns {string}
 */
export function buildReminderMessage(booking) {
  const b = booking ?? {}
  const t = getLang(b.language)

  // Always use outbound leg for reminders
  const pickupTime = transferStartTime(b.pickup_location, b.pickup_time, b.flight_arrival_time)
  const meetingPoint = locationDisplay(b.pickup_location, b.pickup_address)

  const lines = [
    t.reminderGreeting(b.customer_name),
    '',
    `${t.labelDate}: ${b.pickup_date}`,
    `${t.labelPickupTime}: ${pickupTime}`,
    `${t.labelMeetingPoint}: ${meetingPoint}`,
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
