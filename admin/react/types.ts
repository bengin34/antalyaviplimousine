export type BookingStatus = 'pending' | 'paid' | 'confirmed' | 'in_transit' | 'completed' | 'cancelled'

export interface BookingNote {
  id: string
  note: string
  created_at: string
}

export interface ChauffeurHireDay {
  id: string
  booking_id: string
  service_date: string
  day_number: number
  status: 'scheduled' | 'in_progress' | 'completed'
  driver_name: string | null
  vehicle_plate: string | null
  distance_km: number | string | null
  fuel_amount_eur: number | string | null
  fuel_paid: boolean
  notes: string | null
  updated_at: string
}

export interface Booking {
  id: string
  booking_ref: string
  customer_name: string
  customer_email: string
  customer_phone: string
  hotel_name: string
  child_seat_count: number
  child_ages: number[]
  luggage_count: number
  pickup_location: string
  pickup_address: string | null
  dropoff_location: string | null
  dropoff_address: string | null
  pickup_date: string
  pickup_time: string | null
  flight_number: string | null
  flight_arrival_time: string | null
  trip_type: 'one_way' | 'round_trip' | 'daily_chauffeur'
  return_date: string | null
  return_pickup_time: string | null
  return_flight_number: string | null
  service_end_date: string | null
  daily_rate_eur: number | string | null
  departure_flight_date: string | null
  departure_flight_time: string | null
  departure_flight_number: string | null
  fuel_terms_accepted_at: string | null
  guests: number
  vehicle_type: 'vclass' | 'vito'
  service_cost_mode: 'own_vehicle' | 'sold_transfer'
  sold_transfer_cost_try: number | string | null
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
  manual_return_of_ref?: string | null
  created_at: string
  booking_notes?: BookingNote[]
  chauffeur_hire_days?: ChauffeurHireDay[]
  [key: string]: unknown
}

export interface TimelineCard extends Booking {
  _displayDate: string
  _displayTime: string | null
  _isReturn: boolean
  _needsReturnContact?: boolean
  _hireDayNumber?: number
  _hireDayCount?: number
}

export type Navigate = (hash: string) => void
