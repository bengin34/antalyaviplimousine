-- Sprinter (vclass) fares +20%, rounded to the nearest 5. Keep server-side
-- booking and payment amounts aligned with src/prices.js.
INSERT INTO routes (
  from_location,
  to_location,
  vehicle_type,
  price_eur,
  duration_min,
  distance_km
) VALUES
  ('airport', 'belek',      'vclass',  70.00,  35,  45),
  ('airport', 'side',       'vclass',  85.00,  55,  65),
  ('airport', 'kemer',      'vclass',  90.00,  60,  50),
  ('airport', 'alanya',     'vclass', 145.00, 120, 125),
  ('airport', 'tekirova',   'vclass', 145.00,  75,  75),
  ('airport', 'manavgat',   'vclass',  85.00,  65,  75),
  ('airport', 'kizilagac',  'vclass',  95.00,  75,  85),
  ('airport', 'bogazkent',  'vclass',  80.00,  45,  48),
  ('airport', 'antalya',    'vclass',  55.00,  25,  15),
  ('airport', 'bodrum',     'vclass', 265.00, 300, 380),
  ('airport', 'dalaman',    'vclass', 265.00, 210, 235),
  ('airport', 'fethiye',    'vclass', 265.00, 180, 205),
  ('airport', 'pamukkale',  'vclass', 265.00, 180, 245),
  ('airport', 'kapadokya',  'vclass', 420.00, 480, 540)
ON CONFLICT (from_location, to_location, vehicle_type)
DO UPDATE SET
  price_eur = EXCLUDED.price_eur,
  duration_min = EXCLUDED.duration_min,
  distance_km = EXCLUDED.distance_km;
