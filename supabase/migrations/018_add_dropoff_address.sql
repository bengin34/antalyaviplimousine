-- Store a private destination independently from the private pick-up address.
ALTER TABLE bookings
ADD COLUMN IF NOT EXISTS dropoff_address TEXT;
-- Keep authenticated admin updates limited to the reservation fields exposed by
-- the admin editor. Provider/payment identifiers and booking references remain
-- read-only.
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
  notes
) ON bookings TO authenticated;
