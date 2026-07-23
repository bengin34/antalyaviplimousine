ALTER TABLE bookings
ADD COLUMN IF NOT EXISTS luggage_count INT NOT NULL DEFAULT 0;

ALTER TABLE bookings
DROP CONSTRAINT IF EXISTS bookings_luggage_count_check;

ALTER TABLE bookings
ADD CONSTRAINT bookings_luggage_count_check
CHECK (luggage_count BETWEEN 0 AND 12);
