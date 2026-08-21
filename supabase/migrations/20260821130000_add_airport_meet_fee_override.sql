ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS airport_meet_fee_applies BOOLEAN NOT NULL DEFAULT TRUE;

GRANT UPDATE (airport_meet_fee_applies) ON bookings TO authenticated;
