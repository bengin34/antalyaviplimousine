-- Remove the retired payment field and add iyzico checkout metadata.
ALTER TABLE bookings
DROP COLUMN IF EXISTS stripe_payment_intent;

ALTER TABLE bookings
ADD COLUMN IF NOT EXISTS iyzico_token TEXT,
ADD COLUMN IF NOT EXISTS iyzico_conversation_id TEXT,
ADD COLUMN IF NOT EXISTS iyzico_payment_id TEXT,
ADD COLUMN IF NOT EXISTS payment_currency TEXT,
ADD COLUMN IF NOT EXISTS payment_error TEXT,
ADD COLUMN IF NOT EXISTS paid_at TIMESTAMPTZ;

CREATE UNIQUE INDEX IF NOT EXISTS bookings_iyzico_token_unique
ON bookings (iyzico_token)
WHERE iyzico_token IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS bookings_iyzico_payment_id_unique
ON bookings (iyzico_payment_id)
WHERE iyzico_payment_id IS NOT NULL;

-- Public access is no longer needed because booking operations use Edge Functions.
DROP POLICY IF EXISTS "bookings_insert_anon" ON bookings;
DROP POLICY IF EXISTS "bookings_select_anon" ON bookings;

-- Keep the server-side price table aligned with the public quote matrix.
INSERT INTO routes (
  from_location,
  to_location,
  vehicle_type,
  price_eur,
  duration_min,
  distance_km
) VALUES
  ('airport', 'belek',      'vito',    40,  35,  45),
  ('airport', 'belek',      'vclass',  60,  35,  45),
  ('airport', 'side',       'vito',    50,  55,  65),
  ('airport', 'side',       'vclass',  75,  55,  65),
  ('airport', 'kemer',      'vito',    55,  60,  50),
  ('airport', 'kemer',      'vclass',  80,  60,  50),
  ('airport', 'alanya',     'vito',   100, 120, 125),
  ('airport', 'alanya',     'vclass', 130, 120, 125),
  ('airport', 'tekirova',   'vito',   100,  75,  75),
  ('airport', 'tekirova',   'vclass', 130,  75,  75),
  ('airport', 'manavgat',   'vito',    50,  65,  75),
  ('airport', 'manavgat',   'vclass',  75,  65,  75),
  ('airport', 'bogazkent',  'vito',    45,  45,  48),
  ('airport', 'bogazkent',  'vclass',  65,  45,  48),
  ('airport', 'antalya',    'vito',    30,  25,  15),
  ('airport', 'antalya',    'vclass',  45,  25,  15),
  ('airport', 'bodrum',     'vito',   200, 300, 380),
  ('airport', 'bodrum',     'vclass', 250, 300, 380),
  ('airport', 'dalaman',    'vito',   200, 210, 235),
  ('airport', 'dalaman',    'vclass', 250, 210, 235),
  ('airport', 'fethiye',    'vito',   200, 180, 205),
  ('airport', 'fethiye',    'vclass', 250, 180, 205),
  ('airport', 'pamukkale',  'vito',   200, 180, 245),
  ('airport', 'pamukkale',  'vclass', 250, 180, 245),
  ('airport', 'kapadokya',  'vito',   300, 480, 540),
  ('airport', 'kapadokya',  'vclass', 400, 480, 540)
ON CONFLICT (from_location, to_location, vehicle_type)
DO UPDATE SET
  price_eur = EXCLUDED.price_eur,
  duration_min = EXCLUDED.duration_min,
  distance_km = EXCLUDED.distance_km;
