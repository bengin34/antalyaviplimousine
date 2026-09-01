-- Price the Antalya–Fethiye coast west of Tekirova: Kumluca/Adrasan and Kaş.
--
-- The hotel index resolves a handful of hotels there (Radisson Blu Kaş,
-- Doğanın Ruhu, Adrasan Beach Club) that were previously filed under the
-- €35 Antalya city tariff — 90 to 185 km short of their real distance. They
-- carry no marketed landing page; a guest reaches them by naming the hotel,
-- and the fare is quoted on the route's own distance.

INSERT INTO routes (
  from_location,
  to_location,
  vehicle_type,
  price_eur,
  duration_min,
  distance_km
)
VALUES
  ('airport', 'kumluca', 'vito', 120.00, 80, 90),
  ('airport', 'kumluca', 'vclass', 170.00, 80, 90),
  ('airport', 'kas', 'vito', 170.00, 165, 185),
  ('airport', 'kas', 'vclass', 250.00, 165, 185)
ON CONFLICT (from_location, to_location, vehicle_type)
DO UPDATE SET
  price_eur = EXCLUDED.price_eur,
  duration_min = EXCLUDED.duration_min,
  distance_km = EXCLUDED.distance_km;
