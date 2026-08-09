-- Manual one-way distance overrides for routes that cannot be resolved by the
-- fixed route graph. Round-trip bookings keep a separate value for each leg.
ALTER TABLE bookings
ADD COLUMN IF NOT EXISTS manual_outbound_distance_km NUMERIC(8, 2)
  CHECK (manual_outbound_distance_km > 0 AND manual_outbound_distance_km <= 10000),
ADD COLUMN IF NOT EXISTS manual_return_distance_km NUMERIC(8, 2)
  CHECK (manual_return_distance_km > 0 AND manual_return_distance_km <= 10000);

-- Re-list all operational fields because PostgreSQL column-level grants are
-- replaced wholesale whenever this permission set is updated.
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
  guests,
  vehicle_type,
  notes,
  driver_name,
  vehicle_plate,
  manual_outbound_distance_km,
  manual_return_distance_km
) ON bookings TO authenticated;
