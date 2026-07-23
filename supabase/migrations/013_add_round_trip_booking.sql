ALTER TABLE bookings
ADD COLUMN IF NOT EXISTS trip_type TEXT NOT NULL DEFAULT 'one_way',
ADD COLUMN IF NOT EXISTS return_date DATE,
ADD COLUMN IF NOT EXISTS return_pickup_time TIME,
ADD COLUMN IF NOT EXISTS return_flight_number TEXT;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'bookings_trip_type_check'
      AND conrelid = 'bookings'::regclass
  ) THEN
    ALTER TABLE bookings
    ADD CONSTRAINT bookings_trip_type_check
    CHECK (trip_type IN ('one_way', 'round_trip'));
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'bookings_round_trip_details_check'
      AND conrelid = 'bookings'::regclass
  ) THEN
    ALTER TABLE bookings
    ADD CONSTRAINT bookings_round_trip_details_check
    CHECK (
      trip_type = 'one_way'
      OR (
        return_date IS NOT NULL
        AND return_pickup_time IS NOT NULL
        AND return_date >= pickup_date
      )
    );
  END IF;
END
$$;
