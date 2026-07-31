-- Lower Kapadokya Sprinter fare to 350. Keep server-side booking and
-- payment amounts aligned with src/prices.js.
INSERT INTO routes (
  from_location,
  to_location,
  vehicle_type,
  price_eur,
  duration_min,
  distance_km
) VALUES
  ('airport', 'kapadokya',  'vclass', 350.00, 480, 540)
ON CONFLICT (from_location, to_location, vehicle_type)
DO UPDATE SET
  price_eur = EXCLUDED.price_eur,
  duration_min = EXCLUDED.duration_min,
  distance_km = EXCLUDED.distance_km;
