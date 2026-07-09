-- Add Manavgat/Kızılağaç route (~15 km beyond Manavgat).
-- Prices follow the online-only 25% discount campaign convention
-- (list 60/85 EUR -> charged 45/60 EUR).
INSERT INTO routes (
  from_location,
  to_location,
  vehicle_type,
  price_eur,
  duration_min,
  distance_km
) VALUES
  ('airport', 'kizilagac', 'vito',   45.00, 75, 85),
  ('airport', 'kizilagac', 'vclass', 60.00, 75, 85)
ON CONFLICT (from_location, to_location, vehicle_type)
DO UPDATE SET
  price_eur = EXCLUDED.price_eur,
  duration_min = EXCLUDED.duration_min,
  distance_km = EXCLUDED.distance_km;
