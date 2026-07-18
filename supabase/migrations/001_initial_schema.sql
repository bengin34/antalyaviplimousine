-- ============================================================
-- Antalya VIP Limousine — Initial Schema
-- Run this in Supabase SQL Editor (Dashboard > SQL)
-- ============================================================

-- Routes / pricing matrix
CREATE TABLE IF NOT EXISTS routes (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  from_location TEXT        NOT NULL,
  to_location   TEXT        NOT NULL,
  vehicle_type  TEXT        NOT NULL CHECK (vehicle_type IN ('vclass', 'vito')),
  price_eur     DECIMAL(10,2) NOT NULL,
  duration_min  INT         NOT NULL,
  distance_km   INT         NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (from_location, to_location, vehicle_type)
);

ALTER TABLE routes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "routes_public_read" ON routes FOR SELECT USING (true);

-- Bookings
CREATE TABLE IF NOT EXISTS bookings (
  id                   UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_ref          TEXT          UNIQUE NOT NULL,
  customer_name        TEXT          NOT NULL,
  customer_email       TEXT          NOT NULL,
  customer_phone       TEXT          NOT NULL,
  hotel_name           TEXT          NOT NULL CHECK (char_length(trim(hotel_name)) BETWEEN 2 AND 120),
  child_seat_count     INT           NOT NULL DEFAULT 0 CHECK (child_seat_count BETWEEN 0 AND 4),
  pickup_location      TEXT          NOT NULL,
  dropoff_location     TEXT          NOT NULL,
  pickup_date          DATE          NOT NULL,
  flight_number        TEXT,
  flight_arrival_time  TIME,
  guests               INT           NOT NULL DEFAULT 1,
  vehicle_type         TEXT          NOT NULL CHECK (vehicle_type IN ('vclass', 'vito')),
  price_eur            DECIMAL(10,2) NOT NULL,
  status               TEXT          NOT NULL DEFAULT 'pending'
                                     CHECK (status IN ('pending', 'paid', 'confirmed', 'cancelled')),
  payment_method       TEXT          NOT NULL DEFAULT 'cash'
                                     CHECK (payment_method IN ('cash', 'card')),
  iyzico_token          TEXT,
  iyzico_conversation_id TEXT,
  iyzico_payment_id     TEXT,
  payment_currency      TEXT,
  payment_error         TEXT,
  paid_at               TIMESTAMPTZ,
  notes                TEXT,
  language             TEXT          DEFAULT 'en',
  created_at           TIMESTAMPTZ   DEFAULT NOW()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
-- Booking writes and reads are handled by Edge Functions with the service role.

-- Admin notes (service role only — no public policy)
CREATE TABLE IF NOT EXISTS booking_notes (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID        REFERENCES bookings(id) ON DELETE CASCADE,
  note       TEXT        NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE booking_notes ENABLE ROW LEVEL SECURITY;
