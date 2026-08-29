import { describe, expect, test } from 'vitest'
import { buildCustomerMatchCsv } from './pages/AdminPanelPage'
import { validateBookingForm, type BookingFormState } from './pages/NewBookingPage'
import { buildMonthCalendar, expandRoundTrips, shiftCalendarMonth } from './pages/timeline-logic'
import type { Booking } from './types'

const baseForm: BookingFormState = {
  name: 'Ayşe Yılmaz', phone: '+90 555 111 22 33', email: '', hotel: 'Rixos',
  tripType: 'one_way', pickup: 'airport', dropoff: 'belek', pickupAddress: '', dropoffAddress: '',
  pickupDate: '2026-08-10', pickupTime: '12:30', flightNumber: 'TK123', flightTime: '12:10',
  returnDate: '', returnTime: '', returnFlight: '', vehicle: 'vito', guests: '3', luggage: '2', costMode: 'own_vehicle', soldTransferCostTry: '',
  airportMeetFeeApplies: true,
  serviceEndDate: '2026-08-10', departureFlightDate: '', departureFlightTime: '', departureFlight: '',
  childSeats: '1', price: '80', payment: 'cash', status: 'confirmed', notes: '', fuelAccepted: false, language: '',
}

describe('React admin migration behavior', () => {
  test('keeps the per-leg round-trip price contract', () => {
    const result = validateBookingForm({
      ...baseForm, tripType: 'round_trip', price: '75', returnDate: '2026-08-15', returnTime: '09:00',
    })
    expect(result.error).toBe('')
    expect(result.payload?.price_eur).toBe(150)
  })

  test('persists the airport meet-fee opt-out in the booking payload', () => {
    const form = { ...baseForm, airportMeetFeeApplies: false } as BookingFormState
    const result = validateBookingForm(form)

    expect(result.error).toBe('')
    expect(result.payload?.airport_meet_fee_applies).toBe(false)
  })

  test('keeps private address validation', () => {
    const result = validateBookingForm({ ...baseForm, pickup: 'private_address', pickupAddress: 'kısa' })
    expect(result.error).toBe('Alış adresi 6-160 karakter olmalı.')
  })

  test('builds a daily chauffeur total and requires fuel acceptance', () => {
    const missingAcceptance = validateBookingForm({
      ...baseForm, tripType: 'daily_chauffeur', pickupTime: '09:00', serviceEndDate: '2026-08-13', price: '150',
    })
    expect(missingAcceptance.error).toContain('yakıt hariç')

    const result = validateBookingForm({
      ...baseForm, tripType: 'daily_chauffeur', pickupTime: '09:00', serviceEndDate: '2026-08-13', price: '150', fuelAccepted: true,
    })
    expect(result.error).toBe('')
    expect(result.payload).toMatchObject({ trip_type: 'daily_chauffeur', dropoff_location: null, daily_rate_eur: 150, price_eur: 600 })
  })

  test('requires a supplier cost for sold transfers and stores it in TRY', () => {
    const missingCost = validateBookingForm({
      ...baseForm,
      costMode: 'sold_transfer',
      soldTransferCostTry: '',
    })
    expect(missingCost.error).toContain('toplam maliyet')

    const result = validateBookingForm({
      ...baseForm,
      costMode: 'sold_transfer',
      soldTransferCostTry: '3250.50',
    })
    expect(result.error).toBe('')
    expect(result.payload).toMatchObject({
      service_cost_mode: 'sold_transfer',
      sold_transfer_cost_try: 3250.5,
    })
  })

  test('rejects sold transfer mode for daily chauffeur bookings', () => {
    const result = validateBookingForm({
      ...baseForm,
      tripType: 'daily_chauffeur',
      pickupTime: '09:00',
      serviceEndDate: '2026-08-13',
      price: '150',
      fuelAccepted: true,
      costMode: 'sold_transfer',
      soldTransferCostTry: '1200',
    })
    expect(result.error).toContain('Günlük araç + şoför')
  })

  test('expands a round trip into outbound and return cards', () => {
    const booking = {
      id: '1', booking_ref: 'AVL-1', customer_name: 'Ayşe', customer_email: '', customer_phone: '+90555',
      hotel_name: 'Rixos', child_seat_count: 0, child_ages: [] as number[], luggage_count: 1, pickup_location: 'airport',
      pickup_address: null, dropoff_location: 'belek', dropoff_address: null, pickup_date: '2026-08-10',
      pickup_time: '12:30:00', flight_number: 'TK1', flight_arrival_time: '12:10:00', trip_type: 'round_trip',
      return_date: '2026-08-15', return_pickup_time: '09:00:00', return_flight_number: 'TK2', guests: 2,
      vehicle_type: 'vito', price_eur: 150, status: 'confirmed', payment_method: 'cash', notes: null,
      language: 'tr', created_at: '2026-08-01T00:00:00Z',
    } as Booking
    const cards = expandRoundTrips([booking], 'timeline')
    expect(cards).toHaveLength(2)
    expect(cards[0]._displayTime).toBe('12:10:00')
    expect(cards[1]._isReturn).toBe(true)
    expect(cards[1].pickup_location).toBe('belek')
    expect(cards[1].dropoff_location).toBe('airport')
  })

  test('expands a daily chauffeur hire across every occupied day', () => {
    const booking = {
      id: 'daily-1', booking_ref: 'AVL-D1', customer_name: 'Ayşe', customer_email: '', customer_phone: '+90555',
      hotel_name: 'Rixos', child_seat_count: 0, child_ages: [] as number[], luggage_count: 1, pickup_location: 'hotel', pickup_address: null,
      dropoff_location: null, dropoff_address: null, pickup_date: '2026-08-10', pickup_time: '09:00:00',
      flight_number: null, flight_arrival_time: null, trip_type: 'daily_chauffeur', return_date: null,
      return_pickup_time: null, return_flight_number: null, service_end_date: '2026-08-13', daily_rate_eur: 150,
      departure_flight_date: null, departure_flight_time: null, departure_flight_number: null,
      fuel_terms_accepted_at: '2026-08-01T00:00:00Z', guests: 2, vehicle_type: 'vito', service_cost_mode: 'own_vehicle', sold_transfer_cost_try: null, price_eur: 600,
      status: 'confirmed', payment_method: 'cash', notes: null, language: 'tr', created_at: '2026-08-01T00:00:00Z',
      chauffeur_hire_days: [],
    } as Booking
    const cards = expandRoundTrips([booking], 'timeline')
    expect(cards.map(card => [card._displayDate, card._hireDayNumber, card._hireDayCount])).toEqual([
      ['2026-08-10', 1, 4], ['2026-08-11', 2, 4], ['2026-08-12', 3, 4], ['2026-08-13', 4, 4],
    ])
  })

  test('sorts the unified timeline ascending and the cancelled list descending', () => {
    const make = (ref: string, date: string) => ({
      id: ref, booking_ref: ref, customer_name: 'X', customer_email: '', customer_phone: '+90555',
      hotel_name: '', child_seat_count: 0, child_ages: [] as number[], luggage_count: 0, pickup_location: 'airport',
      pickup_address: null, dropoff_location: 'belek', dropoff_address: null, pickup_date: date,
      pickup_time: '10:00:00', flight_number: null, flight_arrival_time: null, trip_type: 'one_way',
      return_date: null, return_pickup_time: null, return_flight_number: null, guests: 1,
      vehicle_type: 'vito', price_eur: 100, status: 'confirmed', payment_method: 'cash', notes: null,
      language: 'tr', created_at: '2026-08-01T00:00:00Z',
    } as Booking)
    const rows = [make('A', '2026-08-12'), make('B', '2026-08-10'), make('C', '2026-08-11')]
    expect(expandRoundTrips(rows, 'timeline').map(card => card._displayDate)).toEqual(['2026-08-10', '2026-08-11', '2026-08-12'])
    expect(expandRoundTrips(rows, 'cancelled').map(card => card._displayDate)).toEqual(['2026-08-12', '2026-08-11', '2026-08-10'])
    // default mode is the ascending timeline
    expect(expandRoundTrips(rows).map(card => card._displayDate)).toEqual(['2026-08-10', '2026-08-11', '2026-08-12'])
  })

  test('builds a Monday-first monthly calendar and moves between years', () => {
    const august = buildMonthCalendar('2026-08')
    expect(august).toHaveLength(42)
    expect(august[5]).toEqual({ day: 1, isoDate: '2026-08-01' })
    expect(august[35]).toEqual({ day: 31, isoDate: '2026-08-31' })
    expect(shiftCalendarMonth('2026-01', -1)).toBe('2025-12')
    expect(shiftCalendarMonth('2026-12', 1)).toBe('2027-01')
  })

  test('keeps Google Ads normalization and duplicate removal', () => {
    const result = buildCustomerMatchCsv([
      { customer_name: 'Ayşe Yılmaz', customer_email: ' AYSE@example.com ', customer_phone: '0555 111 22 33' },
      { customer_name: 'Ayşe Yılmaz', customer_email: 'ayse@example.com', customer_phone: '+90 555 111 22 33' },
    ])
    expect(result.count).toBe(1)
    expect(result.csv).toContain('ayse@example.com,+905551112233,Ayşe,Yılmaz')
  })
})
