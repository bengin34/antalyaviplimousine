-- Daily private vehicle + chauffeur bookings. The service price covers the
-- vehicle and chauffeur; fuel is explicitly excluded and acknowledged before
-- public or admin submission.

CREATE TABLE IF NOT EXISTS chauffeur_service_rates (
  vehicle_type   TEXT PRIMARY KEY CHECK (vehicle_type IN ('vclass', 'vito')),
  daily_rate_eur NUMERIC(10, 2) NOT NULL CHECK (daily_rate_eur > 0),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO chauffeur_service_rates (vehicle_type, daily_rate_eur)
VALUES ('vito', 150.00), ('vclass', 150.00)
ON CONFLICT (vehicle_type) DO NOTHING;

ALTER TABLE chauffeur_service_rates ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON chauffeur_service_rates TO anon, authenticated, service_role;
CREATE POLICY "public_read_chauffeur_service_rates" ON chauffeur_service_rates
  FOR SELECT TO anon, authenticated USING (true);

ALTER TABLE bookings
  DROP CONSTRAINT IF EXISTS bookings_trip_type_check,
  DROP CONSTRAINT IF EXISTS bookings_round_trip_details_check;

ALTER TABLE bookings
  ALTER COLUMN dropoff_location DROP NOT NULL,
  ADD COLUMN IF NOT EXISTS service_end_date DATE,
  ADD COLUMN IF NOT EXISTS daily_rate_eur NUMERIC(10, 2)
    CHECK (daily_rate_eur > 0 AND daily_rate_eur <= 999999.99),
  ADD COLUMN IF NOT EXISTS departure_flight_date DATE,
  ADD COLUMN IF NOT EXISTS departure_flight_time TIME,
  ADD COLUMN IF NOT EXISTS departure_flight_number TEXT,
  ADD COLUMN IF NOT EXISTS fuel_terms_accepted_at TIMESTAMPTZ;

ALTER TABLE bookings
  ADD CONSTRAINT bookings_trip_type_check
    CHECK (trip_type IN ('one_way', 'round_trip', 'daily_chauffeur')),
  ADD CONSTRAINT bookings_trip_details_check
    CHECK (
      (trip_type = 'one_way')
      OR (
        trip_type = 'round_trip'
        AND return_date IS NOT NULL
        AND return_pickup_time IS NOT NULL
        AND return_date >= pickup_date
      )
      OR (
        trip_type = 'daily_chauffeur'
        AND service_end_date IS NOT NULL
        AND service_end_date >= pickup_date
        AND service_end_date <= pickup_date + 29
        AND pickup_time IS NOT NULL
        AND daily_rate_eur IS NOT NULL
        AND fuel_terms_accepted_at IS NOT NULL
        AND dropoff_location IS NULL
      )
    ),
  ADD CONSTRAINT bookings_departure_flight_details_check
    CHECK (
      (departure_flight_time IS NULL AND departure_flight_number IS NULL)
      OR departure_flight_date IS NOT NULL
    );

CREATE TABLE IF NOT EXISTS chauffeur_hire_days (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id       UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  service_date     DATE NOT NULL,
  day_number       INT NOT NULL CHECK (day_number > 0 AND day_number <= 30),
  status           TEXT NOT NULL DEFAULT 'scheduled'
                   CHECK (status IN ('scheduled', 'in_progress', 'completed')),
  driver_name      TEXT,
  vehicle_plate    TEXT,
  distance_km      NUMERIC(10, 2) CHECK (distance_km >= 0 AND distance_km <= 10000),
  fuel_amount_eur  NUMERIC(10, 2) CHECK (fuel_amount_eur >= 0 AND fuel_amount_eur <= 999999.99),
  fuel_paid        BOOLEAN NOT NULL DEFAULT FALSE,
  notes            TEXT,
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (booking_id, service_date)
);

ALTER TABLE chauffeur_hire_days ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE ON chauffeur_hire_days TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON chauffeur_hire_days TO service_role;
CREATE POLICY "admin_read_chauffeur_hire_days" ON chauffeur_hire_days
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "admin_insert_chauffeur_hire_days" ON chauffeur_hire_days
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "admin_update_chauffeur_hire_days" ON chauffeur_hire_days
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "admin_delete_chauffeur_hire_days" ON chauffeur_hire_days
  FOR DELETE TO authenticated USING (true);

CREATE OR REPLACE FUNCTION sync_chauffeur_hire_days()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  IF NEW.trip_type = 'daily_chauffeur' THEN
    DELETE FROM public.chauffeur_hire_days
      WHERE booking_id = NEW.id
        AND (service_date < NEW.pickup_date OR service_date > NEW.service_end_date);

    INSERT INTO public.chauffeur_hire_days (booking_id, service_date, day_number)
    SELECT
      NEW.id,
      day::date,
      (day::date - NEW.pickup_date) + 1
    FROM generate_series(
      NEW.pickup_date::timestamp,
      NEW.service_end_date::timestamp,
      INTERVAL '1 day'
    ) AS day
    ON CONFLICT (booking_id, service_date)
    DO UPDATE SET day_number = EXCLUDED.day_number;
  ELSE
    DELETE FROM public.chauffeur_hire_days WHERE booking_id = NEW.id;
  END IF;

  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION sync_chauffeur_hire_days() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION sync_chauffeur_hire_days() TO service_role;

DROP TRIGGER IF EXISTS sync_chauffeur_hire_days_after_booking_write ON bookings;
CREATE TRIGGER sync_chauffeur_hire_days_after_booking_write
AFTER INSERT OR UPDATE OF trip_type, pickup_date, service_end_date ON bookings
FOR EACH ROW EXECUTE FUNCTION sync_chauffeur_hire_days();

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
  notes,
  driver_name,
  vehicle_plate,
  manual_outbound_distance_km,
  manual_return_distance_km
) ON bookings TO authenticated;
