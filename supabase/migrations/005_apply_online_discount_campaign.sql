-- Apply the online-only 25% discount campaign to the server-side price matrix,
-- rounded down to the nearest EUR 5 for cleaner campaign pricing.
INSERT INTO routes (
  from_location,
  to_location,
  vehicle_type,
  price_eur,
  duration_min,
  distance_km
) VALUES
  ('airport', 'belek',      'vito',    30.00,  35,  45),
  ('airport', 'belek',      'vclass',  45.00,  35,  45),
  ('airport', 'side',       'vito',    35.00,  55,  65),
  ('airport', 'side',       'vclass',  55.00,  55,  65),
  ('airport', 'kemer',      'vito',    40.00,  60,  50),
  ('airport', 'kemer',      'vclass',  60.00,  60,  50),
  ('airport', 'alanya',     'vito',    75.00, 120, 125),
  ('airport', 'alanya',     'vclass',  95.00, 120, 125),
  ('airport', 'tekirova',   'vito',    75.00,  75,  75),
  ('airport', 'tekirova',   'vclass',  95.00,  75,  75),
  ('airport', 'manavgat',   'vito',    35.00,  65,  75),
  ('airport', 'manavgat',   'vclass',  55.00,  65,  75),
  ('airport', 'bogazkent',  'vito',    30.00,  45,  48),
  ('airport', 'bogazkent',  'vclass',  45.00,  45,  48),
  ('airport', 'antalya',    'vito',    20.00,  25,  15),
  ('airport', 'antalya',    'vclass',  30.00,  25,  15),
  ('airport', 'bodrum',     'vito',   150.00, 300, 380),
  ('airport', 'bodrum',     'vclass', 185.00, 300, 380),
  ('airport', 'dalaman',    'vito',   150.00, 210, 235),
  ('airport', 'dalaman',    'vclass', 185.00, 210, 235),
  ('airport', 'fethiye',    'vito',   150.00, 180, 205),
  ('airport', 'fethiye',    'vclass', 185.00, 180, 205),
  ('airport', 'pamukkale',  'vito',   150.00, 180, 245),
  ('airport', 'pamukkale',  'vclass', 185.00, 180, 245),
  ('airport', 'kapadokya',  'vito',   225.00, 480, 540),
  ('airport', 'kapadokya',  'vclass', 300.00, 480, 540)
ON CONFLICT (from_location, to_location, vehicle_type)
DO UPDATE SET
  price_eur = EXCLUDED.price_eur,
  duration_min = EXCLUDED.duration_min,
  distance_km = EXCLUDED.distance_km;
