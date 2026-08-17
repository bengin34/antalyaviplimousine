-- Fix Tekirova prices to match routes.js source of truth
INSERT INTO routes (
  from_location,
  to_location,
  vehicle_type,
  price_eur,
  duration_min,
  distance_km
)
VALUES
  ('airport', 'tekirova', 'vito',   75.00, 75, 75),
  ('airport', 'tekirova', 'vclass', 115.00, 75, 75)
ON CONFLICT (from_location, to_location, vehicle_type)
DO UPDATE SET
  price_eur = EXCLUDED.price_eur;