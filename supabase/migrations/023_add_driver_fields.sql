-- Optional driver name and vehicle plate for a booking, editable from the admin
-- booking detail screen and used to fill the WhatsApp reminder template. A
-- single vehicle/driver is used for now, so these may routinely stay empty.
ALTER TABLE bookings
ADD COLUMN IF NOT EXISTS driver_name TEXT,
ADD COLUMN IF NOT EXISTS vehicle_plate TEXT;
-- Re-grant the admin (authenticated) column-level UPDATE. This REVOKE+GRANT
-- replaces the previous grant wholesale, so every column from migration 018 is
-- re-listed here verbatim, plus the two new driver columns. Dropping any column
-- from this list would silently revoke admin update access to it.
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
  vehicle_plate
) ON bookings TO authenticated;
