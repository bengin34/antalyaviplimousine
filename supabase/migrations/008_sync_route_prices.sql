-- Keep server-side booking and payment amounts aligned with src/prices.js.
INSERT INTO routes (
  from_location,
  to_location,
  vehicle_type,
  price_eur,
  duration_min,
  distance_km
) VALUES
  ('airport', 'belek',      'vito',    35.00,  35,  45),
  ('airport', 'belek',      'vclass',  55.00,  35,  45),
  ('airport', 'side',       'vito',    45.00,  55,  65),
  ('airport', 'side',       'vclass',  65.00,  55,  65),
  ('airport', 'kemer',      'vito',    50.00,  60,  50),
  ('airport', 'kemer',      'vclass',  70.00,  60,  50),
  ('airport', 'alanya',     'vito',    90.00, 120, 125),
  ('airport', 'alanya',     'vclass', 115.00, 120, 125),
  ('airport', 'tekirova',   'vito',    90.00,  75,  75),
  ('airport', 'tekirova',   'vclass', 115.00,  75,  75),
  ('airport', 'manavgat',   'vito',    45.00,  65,  75),
  ('airport', 'manavgat',   'vclass',  65.00,  65,  75),
  ('airport', 'kizilagac',  'vito',    55.00,  75,  85),
  ('airport', 'kizilagac',  'vclass',  75.00,  75,  85),
  ('airport', 'bogazkent',  'vito',    40.00,  45,  48),
  ('airport', 'bogazkent',  'vclass',  60.00,  45,  48),
  ('airport', 'antalya',    'vito',    30.00,  25,  15),
  ('airport', 'antalya',    'vclass',  40.00,  25,  15),
  ('airport', 'bodrum',     'vito',   175.00, 300, 380),
  ('airport', 'bodrum',     'vclass', 215.00, 300, 380),
  ('airport', 'dalaman',    'vito',   175.00, 210, 235),
  ('airport', 'dalaman',    'vclass', 215.00, 210, 235),
  ('airport', 'fethiye',    'vito',   175.00, 180, 205),
  ('airport', 'fethiye',    'vclass', 215.00, 180, 205),
  ('airport', 'pamukkale',  'vito',   175.00, 180, 245),
  ('airport', 'pamukkale',  'vclass', 215.00, 180, 245),
  ('airport', 'kapadokya',  'vito',   260.00, 480, 540),
  ('airport', 'kapadokya',  'vclass', 345.00, 480, 540)
ON CONFLICT (from_location, to_location, vehicle_type)
DO UPDATE SET
  price_eur = EXCLUDED.price_eur,
  duration_min = EXCLUDED.duration_min,
  distance_km = EXCLUDED.distance_km;
