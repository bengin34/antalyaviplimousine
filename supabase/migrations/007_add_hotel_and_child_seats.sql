ALTER TABLE bookings
ADD COLUMN IF NOT EXISTS hotel_name TEXT;

UPDATE bookings
SET hotel_name = 'Not provided'
WHERE hotel_name IS NULL OR trim(hotel_name) = '';

ALTER TABLE bookings
ALTER COLUMN hotel_name SET NOT NULL;

ALTER TABLE bookings
DROP CONSTRAINT IF EXISTS bookings_hotel_name_check;

ALTER TABLE bookings
ADD CONSTRAINT bookings_hotel_name_check
CHECK (char_length(trim(hotel_name)) BETWEEN 2 AND 120);

ALTER TABLE bookings
ADD COLUMN IF NOT EXISTS child_seat_count INT NOT NULL DEFAULT 0;

ALTER TABLE bookings
DROP CONSTRAINT IF EXISTS bookings_child_seat_count_check;

ALTER TABLE bookings
ADD CONSTRAINT bookings_child_seat_count_check
CHECK (child_seat_count BETWEEN 0 AND 4);
