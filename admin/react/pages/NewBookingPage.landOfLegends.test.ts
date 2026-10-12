import { describe, expect, test, vi } from 'vitest'

vi.mock('../lib/supabase', () => ({ supabase: null }))

const { validateBookingForm } = await import('./NewBookingPage')

const base = {
  name: 'Anna Schmidt', phone: '+4915123456789', email: 'anna@example.com', hotel: 'Delphin Imperial Lara',
  tripType: 'land_of_legends', pickup: 'hotel', dropoff: 'belek', pickupAddress: '', dropoffAddress: '',
  pickupDate: '2026-10-20', pickupTime: '09:30', flightNumber: '', flightTime: '',
  returnDate: '', returnTime: '22:30', returnFlight: '', returnFlightTime: '',
  vehicle: 'vito', guests: '4', luggage: '0', childSeats: '0', price: '105', payment: 'cash', status: 'confirmed',
  notes: '', costMode: 'own_vehicle', soldTransferCostTry: '', returnCostMode: 'own_vehicle', returnSoldTransferCostTry: '',
  airportMeetFeeApplies: true, serviceEndDate: '2026-10-20', departureFlightDate: '', departureFlightTime: '',
  departureFlight: '', fuelAccepted: false, language: '',
} as unknown as Parameters<typeof validateBookingForm>[0]

describe('admin Land of Legends bookings', () => {
  test('saves the park as drop-off and the park pick-up as a same-day return', () => {
    const { error, payload } = validateBookingForm(base)
    expect(error).toBe('')
    expect(payload).toMatchObject({
      trip_type: 'land_of_legends', pickup_location: 'hotel', dropoff_location: 'land_of_legends',
      return_date: '2026-10-20', return_pickup_time: '22:30', price_eur: 105, service_cost_mode: 'own_vehicle',
    })
  })

  test('rejects what the database would reject', () => {
    expect(validateBookingForm({ ...base, pickup: 'airport' }).error).toMatch(/otel olmalı/)
    expect(validateBookingForm({ ...base, costMode: 'sold_transfer', soldTransferCostTry: '1000' }).error).toMatch(/satılan transfer/)
    expect(validateBookingForm({ ...base, returnTime: '09:00' }).error).toMatch(/sonra olmalı/)
  })

  test('a plain transfer without a drop-off is refused instead of saved to nowhere', () => {
    expect(validateBookingForm({ ...base, tripType: 'one_way', dropoff: '' }).error).toMatch(/Varış/)
  })
})
