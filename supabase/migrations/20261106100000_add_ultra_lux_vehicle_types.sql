-- Ultra Lux Edition vehicles are booked as daily chauffeur hires. Only the
-- bookings table learns the new types; routes and rate tables stay VIP-only.
-- The live table holds vehicle types the migrations never declared, so its
-- rule is widened in place: whatever it accepts today, plus the three new
-- types. With no such rule on the table there is nothing to widen.
DO $$
DECLARE rule record;
BEGIN
  FOR rule IN
    SELECT conname, pg_get_expr(conbin, conrelid) AS accepts FROM pg_constraint
    WHERE conrelid = 'public.bookings'::regclass AND contype = 'c'
      AND pg_get_expr(conbin, conrelid) ILIKE '%vehicle_type%'
      AND pg_get_expr(conbin, conrelid) NOT ILIKE '%trip_type%'
      AND pg_get_expr(conbin, conrelid) NOT ILIKE '%maybach%'
  LOOP
    EXECUTE format('ALTER TABLE public.bookings DROP CONSTRAINT %I', rule.conname);
    -- NOT VALID: rows already stored were accepted under the old rule and are not re-checked.
    EXECUTE format(
      'ALTER TABLE public.bookings ADD CONSTRAINT %I CHECK ((%s) OR vehicle_type IN (''lux_lounge'', ''lux_sprinter'', ''maybach'')) NOT VALID',
      rule.conname, rule.accepts);
  END LOOP;
END $$;
