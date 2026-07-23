ALTER TABLE bookings ADD COLUMN IF NOT EXISTS pickup_time TIME;
-- No backfill: existing bookings will show "—" for pickup time.
-- New bookings will populate this field once the booking form is updated.
