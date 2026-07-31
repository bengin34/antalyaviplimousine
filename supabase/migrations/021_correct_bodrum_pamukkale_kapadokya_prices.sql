-- Correct Bodrum, Pamukkale and Kapadokya fares. Keep server-side booking
-- and payment amounts aligned with src/prices.js.
INSERT INTO routes (
  from_location,
  to_location,
  vehicle_type,
  price_eur,
  duration_min,
  distance_km
) VALUES
  ('airport', 'bodrum',     'vito',   280.00, 300, 380),
  ('airport', 'bodrum',     'vclass', 330.00, 300, 380),
  ('airport', 'pamukkale',  'vito',   250.00, 180, 245),
  ('airport', 'pamukkale',  'vclass', 300.00, 180, 245),
  ('airport', 'kapadokya',  'vito',   300.00, 480, 540)
ON CONFLICT (from_location, to_location, vehicle_type)
DO UPDATE SET
  price_eur = EXCLUDED.price_eur,
  duration_min = EXCLUDED.duration_min,
  distance_km = EXCLUDED.distance_km;
