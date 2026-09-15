-- ============================================================
-- Seed route pricing
-- Run AFTER 001_initial_schema.sql
-- Adjust prices to match your actual rates before going live.
-- ============================================================

INSERT INTO routes (from_location, to_location, vehicle_type, price_eur, duration_min, distance_km) VALUES
  ('airport', 'belek',      'vito',    43.00,  35,  45),
  ('airport', 'belek',      'vclass',  73.00,  35,  45),
  ('airport', 'side',       'vito',    53.00,  55,  65),
  ('airport', 'side',       'vclass',  88.00,  55,  65),
  ('airport', 'kemer',      'vito',    58.00,  60,  50),
  ('airport', 'kemer',      'vclass',  93.00,  60,  50),
  ('airport', 'alanya',     'vito',    98.00, 120, 125),
  ('airport', 'alanya',     'vclass', 148.00, 120, 125),
  ('airport', 'alanya_bati', 'vito', 73.00, 100, 105),
  ('airport', 'alanya_bati', 'vclass', 93.00, 100, 105),
  ('airport', 'alanya_merkez', 'vito', 78.00, 120, 125),
  ('airport', 'alanya_merkez', 'vclass', 98.00, 120, 125),
  ('airport', 'alanya_dogu', 'vito', 83.00, 130, 138),
  ('airport', 'alanya_dogu', 'vclass', 108.00, 130, 138),
  ('airport', 'kargicak', 'vito', 93.00, 145, 150),
  ('airport', 'kargicak', 'vclass', 118.00, 145, 150),
  ('airport', 'demirtas', 'vito', 103.00, 165, 170),
  ('airport', 'demirtas', 'vclass', 133.00, 165, 170),
  ('airport', 'tekirova',   'vito',    78.00,  75,  75),
  ('airport', 'tekirova',   'vclass', 118.00,  75,  75),
  ('airport', 'kumluca',    'vito',   123.00,  80,  90),
  ('airport', 'kumluca',    'vclass', 173.00,  80,  90),
  ('airport', 'kas',        'vito',   173.00, 165, 185),
  ('airport', 'kas',        'vclass', 253.00, 165, 185),
  ('airport', 'manavgat',   'vito',    53.00,  65,  75),
  ('airport', 'manavgat',   'vclass',  88.00,  65,  75),
  ('airport', 'kizilagac',  'vito',    73.00,  75,  85),
  ('airport', 'kizilagac',  'vclass', 118.00,  75,  85),
  ('airport', 'bogazkent',  'vito',    48.00,  45,  48),
  ('airport', 'bogazkent',  'vclass',  83.00,  45,  48),
  ('airport', 'antalya',    'vito',    38.00,  25,  15),
  ('airport', 'antalya',    'vclass',  63.00,  25,  15),
  ('airport', 'bodrum',     'vito',   283.00, 300, 380),
  ('airport', 'bodrum',     'vclass', 333.00, 300, 380),
  ('airport', 'dalaman',    'vito',   183.00, 210, 235),
  ('airport', 'dalaman',    'vclass', 268.00, 210, 235),
  ('airport', 'fethiye',    'vito',   183.00, 180, 205),
  ('airport', 'fethiye',    'vclass', 268.00, 180, 205),
  ('airport', 'pamukkale',  'vito',   253.00, 180, 245),
  ('airport', 'pamukkale',  'vclass', 303.00, 180, 245),
  ('airport', 'kapadokya',  'vito',   303.00, 480, 540),
  ('airport', 'kapadokya',  'vclass', 353.00, 480, 540)
ON CONFLICT (from_location, to_location, vehicle_type)
DO UPDATE SET
  price_eur = EXCLUDED.price_eur,
  duration_min = EXCLUDED.duration_min,
  distance_km = EXCLUDED.distance_km;
