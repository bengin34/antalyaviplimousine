-- Raise Manavgat/Kızılağaç prices to cover the region's farthest hotels
-- (e.g. Seaden De Mar, ~80km from AYT) without discounting below cost.
INSERT INTO routes (from_location, to_location, vehicle_type, price_eur, duration_min, distance_km)
VALUES
  ('airport', 'kizilagac', 'vito',    70.00, 75, 85),
  ('airport', 'kizilagac', 'vclass', 115.00, 75, 85)
ON CONFLICT (from_location, to_location, vehicle_type)
DO UPDATE SET price_eur = EXCLUDED.price_eur;
