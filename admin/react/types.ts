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
  return_flight_departure_time?: string | null
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
  return_service_cost_mode?: 'own_vehicle' | 'sold_transfer' | null
  return_sold_transfer_cost_try?: number | string | null
  airport_meet_fee_applies?: boolean | null
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
  /** Dönüş/son gün kartlarında gösterilecek uçuş KALKIŞ saati. */
  _flightDepartureTime?: string | null
  _needsReturnContact?: boolean
  _hireDayNumber?: number
  _hireDayCount?: number
}

export interface ProfitShareSettings {
  id: 1
  opening_date: string
  default_operations_share_pct: number | string
  default_vehicle_owner_share_pct: number | string
  created_at: string
  updated_at: string
}

export interface ProfitDistributionSnapshot {
  schema_version: 1
  period_start: string
  period_end: string
  operations_share_pct: number
  vehicle_owner_share_pct: number
  operations_amount_eur: number
  vehicle_owner_amount_eur: number
  operations_amount_try: number
  vehicle_owner_amount_try: number
  income_eur: number
  income_try: number
  vehicle_cost_eur: number
  vehicle_cost_try: number
  supplier_cost_eur: number
  supplier_cost_try: number
  airport_cost_eur: number
  airport_cost_try: number
  advertising_cost_eur: number
  advertising_cost_try: number
  total_expense_eur: number
  total_expense_try: number
  net_profit_eur: number
  net_profit_try: number
  realized_leg_count: number
  resolved_legs: Array<Record<string, unknown>>
  monthly_settings: Record<string, Record<string, number>>
  [key: string]: unknown
}

export interface ProfitDistribution {
  id: string
  period_start: string
  period_end: string
  operations_share_pct: number | string
  vehicle_owner_share_pct: number | string
  operations_amount_eur: number | string
  vehicle_owner_amount_eur: number | string
  operations_amount_try: number | string
  vehicle_owner_amount_try: number | string
  income_eur: number | string
  income_try: number | string
  vehicle_cost_eur: number | string
  vehicle_cost_try: number | string
  supplier_cost_eur: number | string
  supplier_cost_try: number | string
  airport_cost_eur: number | string
  airport_cost_try: number | string
  advertising_cost_eur: number | string
  advertising_cost_try: number | string
  total_expense_eur: number | string
  total_expense_try: number | string
  net_profit_eur: number | string
  net_profit_try: number | string
  realized_leg_count: number
  calculation_snapshot: ProfitDistributionSnapshot
  created_by: string
  created_at: string
}

export interface SaveProfitShareSettingsInput {
  openingDate: string
  operationsSharePct: number
  vehicleOwnerSharePct: number
}

export interface CreateProfitDistributionInput {
  expectedStart: string
  periodEnd: string
  operationsSharePct: number
  vehicleOwnerSharePct: number
  snapshot: ProfitDistributionSnapshot
}

export type Navigate = (hash: string) => void
