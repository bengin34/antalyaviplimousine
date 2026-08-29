-- Split the single Alanya tariff into the five sub-regions of
-- ALANYA_PRICING_PLAN.md, at the plan's prices plus EUR 5.
--
-- One EUR 95 price covered everything from Okurcalar to Demirtaş, a 65 km
-- spread, so a guest in the western strip was quoted well above the market
-- while Kargıcak and Demirtaş were sold under cost. The `alanya` route stays
-- in place: historic bookings reference it, it keeps its landing page, and it
-- remains the fallback price when a guest cannot place their own hotel.

INSERT INTO routes (
  from_location,
  to_location,
  vehicle_type,
  price_eur,
  duration_min,
  distance_km
)
VALUES
  ('airport', 'alanya_bati', 'vito', 70.00, 100, 105),
  ('airport', 'alanya_bati', 'vclass', 90.00, 100, 105),
  ('airport', 'alanya_merkez', 'vito', 75.00, 120, 125),
  ('airport', 'alanya_merkez', 'vclass', 95.00, 120, 125),
  ('airport', 'alanya_dogu', 'vito', 80.00, 130, 138),
  ('airport', 'alanya_dogu', 'vclass', 105.00, 130, 138),
  ('airport', 'kargicak', 'vito', 90.00, 145, 150),
  ('airport', 'kargicak', 'vclass', 115.00, 145, 150),
  ('airport', 'demirtas', 'vito', 100.00, 165, 170),
  ('airport', 'demirtas', 'vclass', 130.00, 165, 170)
ON CONFLICT (from_location, to_location, vehicle_type)
DO UPDATE SET
  price_eur = EXCLUDED.price_eur,
  duration_min = EXCLUDED.duration_min,
  distance_km = EXCLUDED.distance_km;
