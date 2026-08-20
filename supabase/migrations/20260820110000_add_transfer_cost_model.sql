-- Adds an explicit service cost model for transfer bookings so the profit/loss
-- report can distinguish between trips fulfilled with our own vehicle and
-- transfers sold to an external supplier.

ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS service_cost_mode TEXT NOT NULL DEFAULT 'own_vehicle'
    CHECK (service_cost_mode IN ('own_vehicle', 'sold_transfer')),
  ADD COLUMN IF NOT EXISTS sold_transfer_cost_try NUMERIC(10, 2)
    CHECK (sold_transfer_cost_try > 0 AND sold_transfer_cost_try <= 9999999.99);

ALTER TABLE bookings
  DROP CONSTRAINT IF EXISTS bookings_service_cost_mode_check;

ALTER TABLE bookings
  ADD CONSTRAINT bookings_service_cost_mode_check
  CHECK (
    (service_cost_mode = 'own_vehicle' AND sold_transfer_cost_try IS NULL)
    OR (
      service_cost_mode = 'sold_transfer'
      AND sold_transfer_cost_try IS NOT NULL
      AND trip_type IN ('one_way', 'round_trip')
    )
  );

REVOKE UPDATE ON bookings FROM authenticated;
GRANT UPDATE (
  status,
  price_eur,
  payment_method,
  customer_name,
  customer_phone,
  hotel_name,
  customer_email,
  child_seat_count,
  luggage_count,
  pickup_location,
  pickup_address,
  dropoff_location,
  dropoff_address,
  pickup_date,
  pickup_time,
  flight_number,
  flight_arrival_time,
  trip_type,
  return_date,
  return_pickup_time,
  return_flight_number,
  service_end_date,
  daily_rate_eur,
  departure_flight_date,
  departure_flight_time,
  departure_flight_number,
  fuel_terms_accepted_at,
  guests,
  vehicle_type,
  service_cost_mode,
  sold_transfer_cost_try,
  notes,
  driver_name,
  vehicle_plate,
  manual_outbound_distance_km,
  manual_return_distance_km
) ON bookings TO authenticated;
