-- Links a manually created return-trip booking (via the admin panel's
-- "Dönüş yolculuğu planla" quick action) back to the outbound booking it was
-- created from. Unlike trip_type = 'round_trip', these are two independent
-- booking rows; this column is what lets the admin UI tag the new row as a
-- return leg (DÖNÜŞ badge) and hide the "plan another return trip" action on it.
ALTER TABLE bookings
ADD COLUMN IF NOT EXISTS manual_return_of_ref TEXT
  REFERENCES bookings(booking_ref) ON DELETE SET NULL;
