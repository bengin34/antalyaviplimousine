import { test, expect } from 'vitest'
import { whatsappURL, languageFromPhone, bookingHotelEnds, isHotelToHotelJourney, navigationPoint, navigationURLs } from './turkish-formatters.js'

test('no text arg returns bare wa.me link (unchanged)', () => {
  expect(whatsappURL('+90 555 111 22 33')).toBe('https://wa.me/905551112233')
})

test('text arg appends url-encoded ?text=', () => {
  const url = whatsappURL('05551112233', 'Merhaba & hoş geldiniz')
  expect(url).toBe('https://wa.me/905551112233?text=' + encodeURIComponent('Merhaba & hoş geldiniz'))
})

test('empty/undefined text keeps bare link', () => {
  expect(whatsappURL('05551112233', '')).toBe('https://wa.me/905551112233')
})

test('languageFromPhone detects Turkish numbers in local and international formats', () => {
  expect(languageFromPhone('0555 111 22 33')).toBe('tr')
  expect(languageFromPhone('5551112233')).toBe('tr')
  expect(languageFromPhone('+90 555 111 22 33')).toBe('tr')
  expect(languageFromPhone('0090 555 111 22 33')).toBe('tr')
})

test('languageFromPhone detects German, Russian, French and Arabic calling codes', () => {
  expect(languageFromPhone('+49 151 23456789')).toBe('de')
  expect(languageFromPhone('+7 916 123 45 67')).toBe('ru')
  expect(languageFromPhone('+380 63 123 45 67')).toBe('ru')
  expect(languageFromPhone('+33 6 12 34 56 78')).toBe('fr')
  expect(languageFromPhone('+971 50 123 4567')).toBe('ar')
  expect(languageFromPhone('+20 100 123 4567')).toBe('ar')
})

test('languageFromPhone falls back to English for unmapped or empty numbers', () => {
  expect(languageFromPhone('+1 415 555 0132')).toBe('en')
  expect(languageFromPhone('')).toBe('en')
  expect(languageFromPhone(undefined)).toBe('en')
})

test('bookingHotelEnds binds the guest hotel to the pick-up end when leaving a hotel', () => {
  expect(bookingHotelEnds({
    pickup_location: 'hotel', dropoff_location: 'bodrum',
    hotel_name: 'Lara Barut Collection', dropoff_hotel_name: 'Mandarin Oriental Bodrum',
  })).toEqual({ pickupHotel: 'Lara Barut Collection', dropoffHotel: 'Mandarin Oriental Bodrum' })
})

test('bookingHotelEnds leaves the drop-off end unnamed when a hotel-to-hotel ride has no destination hotel', () => {
  expect(bookingHotelEnds({
    pickup_location: 'hotel', dropoff_location: 'bodrum', hotel_name: 'Lara Barut Collection',
  })).toEqual({ pickupHotel: 'Lara Barut Collection', dropoffHotel: '' })
})

test('bookingHotelEnds keeps the airport ends unnamed', () => {
  expect(bookingHotelEnds({
    pickup_location: 'airport', dropoff_location: 'belek', hotel_name: 'Rixos Premium Belek',
  })).toEqual({ pickupHotel: '', dropoffHotel: 'Rixos Premium Belek' })
  expect(bookingHotelEnds({
    pickup_location: 'hotel', dropoff_location: 'airport', hotel_name: 'Rixos Premium Belek',
  })).toEqual({ pickupHotel: 'Rixos Premium Belek', dropoffHotel: '' })
})

test('bookingHotelEnds names the drop-off end on a private-address pick-up', () => {
  expect(bookingHotelEnds({
    pickup_location: 'private_address', dropoff_location: 'side', hotel_name: 'Barut Hemera',
  })).toEqual({ pickupHotel: '', dropoffHotel: 'Barut Hemera' })
})

test('navigationURLs names each end from its own hotel', () => {
  const { origin, destination } = navigationURLs({
    originValue: 'hotel', destinationValue: 'bodrum',
    originHotelName: 'Lara Barut Collection', destinationHotelName: 'Mandarin Oriental Bodrum',
  })
  expect(origin).toBe('Lara Barut Collection, Otel, Antalya, Türkiye')
  expect(destination).toBe('Mandarin Oriental Bodrum, Bodrum, Muğla, Türkiye')
})

test('navigationURLs leaves an unnamed end as the bare region', () => {
  expect(navigationURLs({
    originValue: 'hotel', destinationValue: 'bodrum', originHotelName: 'Lara Barut Collection',
  }).destination).toBe('Bodrum, Muğla, Türkiye')
})

test('navigationPoint names the province each region actually sits in', () => {
  expect(navigationPoint('bodrum')).toBe('Bodrum, Muğla, Türkiye')
  expect(navigationPoint('fethiye')).toBe('Fethiye, Muğla, Türkiye')
  expect(navigationPoint('dalaman')).toBe('Dalaman, Muğla, Türkiye')
  expect(navigationPoint('pamukkale')).toBe('Pamukkale, Denizli, Türkiye')
  expect(navigationPoint('kapadokya')).toBe('Kapadokya, Nevşehir, Türkiye')
})

test('navigationPoint keeps Antalya for the regions inside it', () => {
  expect(navigationPoint('belek')).toBe('Belek, Antalya, Türkiye')
  expect(navigationPoint('kas')).toBe('Kaş, Antalya, Türkiye')
  expect(navigationPoint('demirtas')).toBe('Demirtaş, Antalya, Türkiye')
  expect(navigationPoint('airport')).toBe('Antalya Havalimanı, Antalya, Türkiye')
})

test('navigationPoint carries the province through to a named hotel', () => {
  expect(navigationPoint('bodrum', null, 'Mandarin Oriental Bodrum'))
    .toBe('Mandarin Oriental Bodrum, Bodrum, Muğla, Türkiye')
  expect(navigationPoint('belek', null, 'Rixos Premium Belek'))
    .toBe('Rixos Premium Belek, Belek, Antalya, Türkiye')
})

test('bookingHotelEnds treats a region slug at the pick-up as a hotel end', () => {
  // The admin location dropdown offers every region, so a manual booking can
  // leave "belek" rather than the literal "hotel".
  expect(bookingHotelEnds({
    pickup_location: 'belek', dropoff_location: 'bodrum', hotel_name: 'Rixos Premium Belek',
  })).toEqual({ pickupHotel: 'Rixos Premium Belek', dropoffHotel: '' })
  expect(bookingHotelEnds({
    pickup_location: 'belek', dropoff_location: 'bodrum',
    hotel_name: 'Rixos Premium Belek', dropoff_hotel_name: 'Mandarin Oriental Bodrum',
  })).toEqual({ pickupHotel: 'Rixos Premium Belek', dropoffHotel: 'Mandarin Oriental Bodrum' })
})

test('bookingHotelEnds keeps naming the drop-off end on a record with no pick-up location', () => {
  expect(bookingHotelEnds({ dropoff_location: 'belek', hotel_name: 'Rixos Premium Belek' }))
    .toEqual({ pickupHotel: '', dropoffHotel: 'Rixos Premium Belek' })
  expect(bookingHotelEnds({ dropoff_location: 'airport', hotel_name: 'Rixos Premium Belek' }))
    .toEqual({ pickupHotel: 'Rixos Premium Belek', dropoffHotel: '' })
})

test('isHotelToHotelJourney holds only when both ends are places a guest stays', () => {
  expect(isHotelToHotelJourney('hotel', 'bodrum')).toBe(true)
  expect(isHotelToHotelJourney('belek', 'bodrum')).toBe(true)
  expect(isHotelToHotelJourney('hotel', 'airport')).toBe(false)
  expect(isHotelToHotelJourney('airport', 'belek')).toBe(false)
  expect(isHotelToHotelJourney('hotel', 'private_address')).toBe(false)
  expect(isHotelToHotelJourney('private_address', 'belek')).toBe(false)
  // The excursion ends at the park, and a daily hire has no destination.
  expect(isHotelToHotelJourney('hotel', 'land_of_legends')).toBe(false)
  expect(isHotelToHotelJourney('hotel', null)).toBe(false)
})
