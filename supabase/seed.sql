-- ============================================================
-- Seed route pricing
-- Run AFTER 001_initial_schema.sql
-- Adjust prices to match your actual rates before going live.
-- ============================================================

INSERT INTO routes (from_location, to_location, vehicle_type, price_eur, duration_min, distance_km) VALUES
  ('airport', 'belek',      'vito',    40.00,  35,  45),
  ('airport', 'belek',      'vclass',  70.00,  35,  45),
  ('airport', 'side',       'vito',    50.00,  55,  65),
  ('airport', 'side',       'vclass',  85.00,  55,  65),
  ('airport', 'kemer',      'vito',    55.00,  60,  50),
  ('airport', 'kemer',      'vclass',  90.00,  60,  50),
  ('airport', 'alanya',     'vito',    95.00, 120, 125),
  ('airport', 'alanya',     'vclass', 145.00, 120, 125),
  ('airport', 'tekirova',   'vito',    95.00,  75,  75),
  ('airport', 'tekirova',   'vclass', 145.00,  75,  75),
  ('airport', 'manavgat',   'vito',    50.00,  65,  75),
  ('airport', 'manavgat',   'vclass',  85.00,  65,  75),
  ('airport', 'kizilagac',  'vito',    60.00,  75,  85),
  ('airport', 'kizilagac',  'vclass',  95.00,  75,  85),
  ('airport', 'bogazkent',  'vito',    45.00,  45,  48),
  ('airport', 'bogazkent',  'vclass',  80.00,  45,  48),
  ('airport', 'antalya',    'vito',    35.00,  25,  15),
  ('airport', 'antalya',    'vclass',  55.00,  25,  15),
  ('airport', 'bodrum',     'vito',   280.00, 300, 380),
  ('airport', 'bodrum',     'vclass', 330.00, 300, 380),
  ('airport', 'dalaman',    'vito',   180.00, 210, 235),
  ('airport', 'dalaman',    'vclass', 265.00, 210, 235),
  ('airport', 'fethiye',    'vito',   180.00, 180, 205),
  ('airport', 'fethiye',    'vclass', 265.00, 180, 205),
  ('airport', 'pamukkale',  'vito',   250.00, 180, 245),
  ('airport', 'pamukkale',  'vclass', 300.00, 180, 245),
  ('airport', 'kapadokya',  'vito',   300.00, 480, 540),
  ('airport', 'kapadokya',  'vclass', 350.00, 480, 540)
ON CONFLICT (from_location, to_location, vehicle_type)
DO UPDATE SET
  price_eur = EXCLUDED.price_eur,
  duration_min = EXCLUDED.duration_min,
  distance_km = EXCLUDED.distance_km;
