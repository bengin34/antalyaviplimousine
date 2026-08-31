import { test, expect } from 'vitest'
import { buildConfirmMessage, buildReminderMessage, buildReceivedMessage, buildReviewMessage, buildMeetGreetMessage, faqURL } from './whatsapp-templates.js'
import { faqAnchor, homeFaqGroups } from '../public-app/app/lib/faq'

// The message minus its FAQ link, for assertions about the booking details.
const bookingDetailsOf = (msg) =>
  msg
    .split('\n')
    .filter((line) => !line.includes('antalyaviptourism.com'))
    .join('\n')

// Locations are SLUGS (as stored in the DB), not display names.
const base = {
  booking_ref: 'VIP-2026-0042',
  customer_name: 'Ahmet Yılmaz',
  pickup_date: '2026-08-15',
  pickup_time: '10:30',
  pickup_location: 'airport',
  dropoff_location: 'belek',
  hotel_name: 'Regnum Carya Golf & Spa Resort',
  vehicle_type: 'vclass',
  guests: 3,
  luggage_count: 2,
  child_seat_count: 1,
  price_eur: 55,
  language: 'en',
}

test('confirm message maps location slugs to display names in the route', () => {
  const msg = buildConfirmMessage(base)
  expect(msg).toContain('VIP-2026-0042')
  expect(msg).toContain('Antalya Havalimanı')   // 'airport' → display name
  expect(msg).toContain('Belek')                // 'belek' → display name
  // No raw slug leaks. The FAQ link is excluded: its slug names the question
  // it opens, so words like 'airport' belong there.
  expect(bookingDetailsOf(msg)).not.toContain('airport')
  expect(msg).toContain('2026-08-15')
  expect(msg).toContain('55')
  expect(msg).not.toContain('Google Maps')      // no map URL in confirm
})

test('private_address route uses the address string', () => {
  const msg = buildConfirmMessage({
    ...base,
    pickup_location: 'private_address',
    pickup_address: 'Lara Cd. No:5',
  })
  expect(msg).toContain('Lara Cd. No:5')
})

test('confirm message localizes labels by language', () => {
  const en = buildConfirmMessage({ ...base, language: 'en' })
  const de = buildConfirmMessage({ ...base, language: 'de' })
  const ru = buildConfirmMessage({ ...base, language: 'ru' })
  const tr = buildConfirmMessage({ ...base, language: 'tr' })
  expect(new Set([en, de, ru, tr]).size).toBe(4)
})

test('unknown language falls back to english', () => {
  const unknown = buildConfirmMessage({ ...base, language: 'zz' })
  const missing = buildConfirmMessage({ ...base, language: undefined })
  const en = buildConfirmMessage({ ...base, language: 'en' })
  expect(unknown).toBe(en)
  expect(missing).toBe(en)
})

test('airport pickup time uses flight arrival when present', () => {
  const msg = buildConfirmMessage({ ...base, pickup_location: 'airport', flight_arrival_time: '11:45', pickup_time: '10:30' })
  expect(msg).toContain('11:45')
})

test('pickup time trimmed from HH:MM:SS to HH:MM', () => {
  const msg = buildConfirmMessage({ ...base, pickup_location: 'belek', pickup_time: '10:30:00' })
  expect(msg).toContain('10:30')
  expect(msg).not.toContain('10:30:00')
})

test('reminder omits driver line when driver fields empty', () => {
  const msg = buildReminderMessage(base)
  expect(msg).not.toMatch(/07 ABC|Mehmet/)
})

test('reminder includes driver name and plate when present', () => {
  const msg = buildReminderMessage({ ...base, driver_name: 'Mehmet', vehicle_plate: '07 ABC 123' })
  expect(msg).toContain('Mehmet')
  expect(msg).toContain('07 ABC 123')
})

test('reminder uses outbound pickup for round trips', () => {
  const roundTrip = { ...base, trip_type: 'round_trip', return_date: '2026-08-22', return_pickup_time: '14:00' }
  const msg = buildReminderMessage(roundTrip)
  expect(msg).toContain('2026-08-15')      // outbound date
  expect(msg).not.toContain('2026-08-22')  // not the return date
})

test('current exact addresses appear in confirm message without maps', () => {
  const msg = buildConfirmMessage({
    ...base,
    pickup_location: 'belek',
    pickup_address: 'Kadriye Mah. Güncel Alış No: 12',
    dropoff_location: 'airport',
    dropoff_address: 'Antalya Havalimanı Terminal 2 Dış Hatlar',
    hotel_name: 'Eski Otel Adı',
  })

  expect(msg).toContain('Pickup location: Kadriye Mah. Güncel Alış No: 12')
  expect(msg).toContain('Drop-off location: Antalya Havalimanı Terminal 2 Dış Hatlar')
  expect(msg).not.toContain('Eski Otel Adı')
  expect(msg).not.toContain('Google Maps')
})

test('hotel name is used as the precise non-airport endpoint when no address exists', () => {
  const msg = buildConfirmMessage(base)
  expect(msg).toContain('Regnum Carya Golf & Spa Resort, Belek, Antalya, Türkiye')
})

test('reminder names the exact pickup and drop-off without a map link', () => {
  const msg = buildReminderMessage({
    ...base,
    pickup_address: 'Antalya Havalimanı Terminal 1',
    dropoff_address: 'İskele Mevkii, Belek Mah. No: 7',
  })

  expect(msg).toContain('Pickup location: Antalya Havalimanı Terminal 1')
  expect(msg).toContain('Drop-off location: İskele Mevkii, Belek Mah. No: 7')
  expect(msg).not.toContain('google.com/maps')
})

test('no customer message carries a map link', () => {
  const roundTrip = {
    ...base,
    trip_type: 'round_trip',
    return_date: '2026-08-22',
    return_pickup_time: '10:40',
    price_eur: 110,
  }
  const messages = [
    buildConfirmMessage(roundTrip, { leg: 'outbound' }),
    buildConfirmMessage(roundTrip, { leg: 'return' }),
    buildReminderMessage(roundTrip, { leg: 'outbound' }),
    buildReminderMessage(roundTrip, { leg: 'return' }),
    buildReceivedMessage(base),
    buildReviewMessage(base),
    buildMeetGreetMessage(base),
  ]

  for (const msg of messages) {
    expect(msg).not.toContain('google.com/maps')
    expect(msg).not.toContain('Google Maps')
  }
})

test('return confirmation uses current return fields and reverses exact endpoints', () => {
  const roundTrip = {
    ...base,
    trip_type: 'round_trip',
    pickup_address: 'Antalya Havalimanı Terminal 1',
    dropoff_address: 'Regnum Carya Ana Giriş, Kadriye',
    pickup_time: '09:15',
    flight_arrival_time: '10:30',
    flight_number: 'XQ100',
    return_date: '2026-08-22',
    return_pickup_time: '14:40:00',
    return_flight_number: 'XQ101',
    price_eur: 110,
  }
  const msg = buildConfirmMessage(roundTrip, { leg: 'return' })

  expect(msg).toContain('*Return transfer*')
  expect(msg).toContain('Date: 2026-08-22')
  expect(msg).toContain('Pickup time: 14:40')
  expect(msg).toContain('Flight: XQ101')
  expect(msg).toContain('Pickup location: Regnum Carya Ana Giriş, Kadriye')
  expect(msg).toContain('Drop-off location: Antalya Havalimanı Terminal 1')
  expect(msg).toContain('Price: €55')
  expect(msg).not.toContain('2026-08-15')
  expect(msg).not.toContain('XQ100')
})

test('return reminder uses return route together with current driver data', () => {
  const roundTrip = {
    ...base,
    trip_type: 'round_trip',
    pickup_address: 'Terminal 1',
    dropoff_address: 'Güncel Otel Girişi',
    return_date: '2026-08-22',
    return_pickup_time: '14:40',
    return_flight_number: 'TK2420',
    driver_name: 'Mehmet Kaya',
    vehicle_plate: '07 VIP 707',
  }
  const msg = buildReminderMessage(roundTrip, { leg: 'return' })

  expect(msg).toContain('Pickup location: Güncel Otel Girişi')
  expect(msg).toContain('Drop-off location: Terminal 1')
  expect(msg).toContain('Mehmet Kaya')
  expect(msg).toContain('07 VIP 707')
})

test('Arabic booking messages use Arabic labels and the selected leg', () => {
  const msg = buildConfirmMessage({
    ...base,
    language: 'ar',
    trip_type: 'round_trip',
    return_date: '2026-08-22',
    return_pickup_time: '14:40',
  }, { leg: 'return' })

  expect(msg).toContain('*رحلة العودة*')
  expect(msg).toContain('موقع الاستقبال:')
  expect(msg).not.toContain('مسار Google Maps:')
})

test('daily chauffeur confirmation states the period, total, and fuel exclusion', () => {
  const msg = buildConfirmMessage({
    ...base,
    language: 'tr', trip_type: 'daily_chauffeur', dropoff_location: null,
    pickup_date: '2026-08-10', pickup_time: '09:00', service_end_date: '2026-08-13',
    daily_rate_eur: 150, price_eur: 600, departure_flight_date: '2026-08-14',
    departure_flight_time: '12:00', departure_flight_number: 'TK1235',
  })

  expect(msg).toContain('*Günlük araç + şoför*')
  expect(msg).toContain('2026-08-10 – 2026-08-13')
  expect(msg).toContain('Günlük ücret: €150')
  expect(msg).toContain('Toplam hizmet bedeli: €600')
  expect(msg).toContain('Yakıt: Dahil değildir')
})

test('received message acknowledges booking and says we are reviewing', () => {
  const msg = buildReceivedMessage(base)
  expect(msg).toContain('Ahmet Yılmaz')
  expect(msg).toContain('received')
  expect(msg).not.toContain('VIP-2026-0042')
  expect(msg).not.toContain('€')
})

test('received message uses correct language', () => {
  const en = buildReceivedMessage({ ...base, language: 'en' })
  const tr = buildReceivedMessage({ ...base, language: 'tr' })
  const de = buildReceivedMessage({ ...base, language: 'de' })
  const fr = buildReceivedMessage({ ...base, language: 'fr' })
  const ru = buildReceivedMessage({ ...base, language: 'ru' })

  expect(new Set([en, tr, de, fr, ru]).size).toBe(5)
})

test('review message requests customer feedback', () => {
  const msg = buildReviewMessage(base)
  expect(msg).toContain('Ahmet Yılmaz')
  expect(msg).not.toContain('€')
  expect(msg).not.toContain('VIP-2026-0042')
})

test('review message localizes by language', () => {
  const en = buildReviewMessage({ ...base, language: 'en' })
  const tr = buildReviewMessage({ ...base, language: 'tr' })
  const de = buildReviewMessage({ ...base, language: 'de' })

  expect(new Set([en, tr, de]).size).toBe(3)
})

test('return confirmation quotes the return flight departure time, not an arrival', () => {
  const roundTrip = {
    ...base,
    trip_type: 'round_trip',
    return_date: '2026-08-22',
    return_pickup_time: '10:40',
    return_flight_number: 'XQ101',
    return_flight_departure_time: '14:00:00',
    price_eur: 110,
  }
  const msg = buildConfirmMessage(roundTrip, { leg: 'return' })

  expect(msg).toContain('Flight: XQ101 · Departure: 14:00')
  expect(msg).not.toContain('Arrival')
})

test('return confirmation keeps the flight line short when no departure time is stored', () => {
  const roundTrip = {
    ...base,
    trip_type: 'round_trip',
    return_date: '2026-08-22',
    return_pickup_time: '10:40',
    return_flight_number: 'XQ101',
    price_eur: 110,
  }

  expect(buildConfirmMessage(roundTrip, { leg: 'return' })).toContain('Flight: XQ101\n')
})

test('outbound confirmation is unaffected by the return departure time', () => {
  const roundTrip = {
    ...base,
    trip_type: 'round_trip',
    flight_number: 'XQ100',
    return_date: '2026-08-22',
    return_pickup_time: '10:40',
    return_flight_departure_time: '14:00:00',
    price_eur: 110,
  }

  expect(buildConfirmMessage(roundTrip, { leg: 'outbound' })).not.toContain('Departure')
})

test('Turkish return confirmation labels the flight time as kalkış', () => {
  const roundTrip = {
    ...base,
    language: 'tr',
    trip_type: 'round_trip',
    return_date: '2026-08-22',
    return_pickup_time: '10:40',
    return_flight_number: 'XQ101',
    return_flight_departure_time: '14:00:00',
    price_eur: 110,
  }

  expect(buildConfirmMessage(roundTrip, { leg: 'return' })).toContain('Uçuş: XQ101 · Kalkış: 14:00')
})


test('an airport arrival links the FAQ answer about the airport pickup', () => {
  const msg = buildReminderMessage({ ...base, pickup_location: 'airport' })
  expect(msg).toContain('Please read our FAQ before your trip:')
  expect(msg).toContain('Airport pickup — how it works: https://antalyaviptourism.com/#faq-airport-pickup')
})

test('the return leg links the FAQ answer about the return transfer', () => {
  const roundTrip = {
    ...base,
    trip_type: 'round_trip',
    return_date: '2026-08-22',
    return_pickup_time: '10:40',
    price_eur: 110,
  }

  expect(buildReminderMessage(roundTrip, { leg: 'return' })).toContain('#faq-return-contact')
  expect(buildConfirmMessage(roundTrip, { leg: 'return' })).toContain('#faq-return-contact')
  // The outbound leg of the same booking keeps its own answer.
  expect(buildConfirmMessage(roundTrip, { leg: 'outbound' })).toContain('#faq-airport-pickup')
})

test('a transfer to the airport links the return answer however it was booked', () => {
  // The return leg is often entered as its own one-way booking rather than as
  // the return of a round trip, so it never carries a 'return' leg label.
  const manualReturn = {
    ...base,
    trip_type: 'one_way',
    manual_return_of_ref: 'VIP-2026-0042',
    pickup_location: 'belek',
    dropoff_location: 'airport',
  }

  expect(buildReminderMessage(manualReturn)).toContain('#faq-return-contact')
  expect(buildConfirmMessage(manualReturn)).toContain('#faq-return-contact')
  expect(buildReminderMessage(manualReturn)).not.toContain('#faq-payment')
})

test('a hotel-to-hotel transfer links the payment answer', () => {
  const msg = buildConfirmMessage({ ...base, pickup_location: 'belek', dropoff_location: 'kemer' })
  expect(msg).toContain('Payment & price: https://antalyaviptourism.com/#faq-payment')
})

test('a daily chauffeur booking links the journey answer', () => {
  const msg = buildConfirmMessage({
    ...base,
    trip_type: 'daily_chauffeur',
    dropoff_location: null,
    service_end_date: '2026-08-18',
    daily_rate_eur: 150,
  })
  expect(msg).toContain('#faq-extra-stops')
})

test('a request acknowledgement links the FAQ section as a whole', () => {
  expect(buildReceivedMessage(base)).toContain('https://antalyaviptourism.com/#faq')
  expect(buildReceivedMessage(base)).not.toContain('#faq-')
})

test('meet & greet links the airport pickup answer', () => {
  expect(buildMeetGreetMessage(base)).toContain('#faq-airport-pickup')
})

test('the FAQ link is localized and keeps its topic anchor', () => {
  expect(faqURL('tr', 'return')).toBe('https://antalyaviptourism.com/tr/#faq-return-contact')
  expect(faqURL('de', 'arrival')).toBe('https://antalyaviptourism.com/de/#faq-airport-pickup')
  expect(faqURL('en', 'payment')).toBe('https://antalyaviptourism.com/#faq-payment')
  // A language without its own home page falls back to the English one.
  expect(faqURL('zz', 'arrival')).toBe('https://antalyaviptourism.com/#faq-airport-pickup')
})

test('the FAQ note and topic label follow the requested language', () => {
  const tr = buildReminderMessage(base, { language: 'tr' })
  expect(tr).toContain('📖 Seyahatinizden önce lütfen SSS bölümümüzü okuyun:')
  expect(tr).toContain('Havalimanı karşılama — nasıl işliyor: https://antalyaviptourism.com/tr/#faq-airport-pickup')

  const ru = buildReminderMessage(base, { language: 'ru' })
  expect(ru).toContain('Встреча в аэропорту — как это происходит: https://antalyaviptourism.com/ru/#faq-airport-pickup')
})

test('an explicit language overrides the language stored on the booking', () => {
  const stored = { ...base, language: 'en' }
  expect(buildReminderMessage(stored, { language: 'de' })).toBe(
    buildReminderMessage({ ...stored, language: 'de' }),
  )
})

test('the review request stays a single call to action', () => {
  const msg = buildReviewMessage(base)
  expect(msg).toContain('https://g.page/r/CbJCg7BC63cBEBI/review')
  expect(msg).not.toContain('#faq')
})


test('every FAQ link points at an anchor the public home page actually renders', () => {
  // The anchors live in whatsapp-templates.js but the ids are rendered from
  // public-app/app/lib/faq.ts, so a renamed slug must not silently produce a
  // dead link in a customer's message.
  const rendered = new Set(
    homeFaqGroups.flatMap((group) => group.items.map((item) => faqAnchor(item.slug))),
  )

  for (const topic of ['arrival', 'return', 'payment', 'daily']) {
    const anchor = faqURL('en', topic).split('#')[1]
    expect(rendered.has(anchor), `${topic} -> #${anchor}`).toBe(true)
  }

  // The general topic points at the FAQ section itself, not at one question.
  expect(faqURL('en', 'general').split('#')[1]).toBe('faq')
})

test('FAQ anchors name their question rather than its position in the list', () => {
  for (const group of homeFaqGroups) {
    for (const item of group.items) {
      expect(item.slug).toMatch(/^[a-z][a-z-]*[a-z]$/)
    }
  }
})
