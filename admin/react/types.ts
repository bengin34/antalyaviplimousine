export type BookingStatus = 'pending' | 'paid' | 'confirmed' | 'in_transit' | 'completed' | 'cancelled'

export interface BookingNote {
  id: string
  note: string
  created_at: string
}

export interface Booking {
  id: string
  booking_ref: string
  customer_name: string
  customer_email: string
  customer_phone: string
  hotel_name: string
  child_seat_count: number
  luggage_count: number
  pickup_location: string
  pickup_address: string | null
  dropoff_location: string
  dropoff_address: string | null
  pickup_date: string
  pickup_time: string | null
  flight_number: string | null
  flight_arrival_time: string | null
  trip_type: 'one_way' | 'round_trip'
  return_date: string | null
  return_pickup_time: string | null
  return_flight_number: string | null
  guests: number
  vehicle_type: 'vclass' | 'vito'
  price_eur: number | string
  status: BookingStatus
  payment_method: 'cash' | 'card'
  paid_at?: string | null
  notes: string | null
  language: string
  driver_name?: string | null
  vehicle_plate?: string | null
  manual_outbound_distance_km?: number | string | null
  manual_return_distance_km?: number | string | null
  created_at: string
  booking_notes?: BookingNote[]
  [key: string]: unknown
}

export interface TimelineCard extends Booking {
  _displayDate: string
  _displayTime: string | null
  _isReturn: boolean
  _needsReturnContact?: boolean
}

export type Navigate = (hash: string) => void
