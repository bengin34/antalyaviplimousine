-- Ultra Lux Edition vehicles are booked as daily chauffeur hires. Only the
-- bookings table learns the new types; routes and rate tables stay VIP-only.
-- The original check was declared inline, so drop it by what it constrains
-- rather than by an assumed name.
DO $$
DECLARE existing text;
BEGIN
  FOR existing IN
    SELECT conname FROM pg_constraint
    WHERE conrelid = 'public.bookings'::regclass AND contype = 'c'
      AND pg_get_constraintdef(oid) ILIKE '%vehicle_type%'
      AND pg_get_constraintdef(oid) NOT ILIKE '%trip_type%'
  LOOP
    EXECUTE format('ALTER TABLE public.bookings DROP CONSTRAINT %I', existing);
  END LOOP;
END $$;

ALTER TABLE public.bookings ADD CONSTRAINT bookings_vehicle_type_check
  CHECK (vehicle_type IN ('vclass', 'vito', 'lux_lounge', 'lux_sprinter', 'maybach'));
