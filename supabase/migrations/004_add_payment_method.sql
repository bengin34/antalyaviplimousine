ALTER TABLE bookings
ADD COLUMN IF NOT EXISTS payment_method TEXT;

UPDATE bookings
SET payment_method = 'card'
WHERE payment_method IS NULL;

ALTER TABLE bookings
ALTER COLUMN payment_method SET DEFAULT 'cash',
ALTER COLUMN payment_method SET NOT NULL;

ALTER TABLE bookings
DROP CONSTRAINT IF EXISTS bookings_payment_method_check;

ALTER TABLE bookings
ADD CONSTRAINT bookings_payment_method_check
CHECK (payment_method IN ('cash', 'card'));
