-- Raise every tariff that the profit model priced at or below its own cost.
--
-- The model charges a transfer with the whole round trip — the vehicle drives
-- the guest out and comes back empty — at km_cost_try per km, plus the EUR 5
-- airport meet. At the defaults (15 TRY/km, 50 TRY/EUR) that is EUR 0.60 per
-- one-way km plus EUR 5, so a 125 km leg costs EUR 80 before a driver is paid.
--
-- Measured against that, the five Alanya sub-regions added in
-- 20260829120000_add_alanya_sub_regions.sql sold the Vito under cost on four
-- of the five: Merkez EUR 75 against EUR 80, Dogu EUR 80 against EUR 87.80,
-- Kargicak EUR 90 against EUR 95, Demirtas EUR 100 against EUR 107. That
-- migration's own note said it was ending exactly this on Kargicak and
-- Demirtas; its numbers did not. These do, at roughly a 16% margin — the same
-- margin the single EUR 95 Alanya tariff it replaced was carrying.
--
-- Kizilagac and Kapadokya are older routes with the same problem (Kapadokya
-- was EUR 300 against a EUR 329 cost) and are raised to the figures the
-- operator set. Kapadokya at EUR 330 clears cost by about EUR 1 and stays a
-- route to quote by hand, not a tariff to sell on.
--
-- Vito and V-Class rise by the same amount in each region, so the vehicle
-- premium the sub-region ladder was built with is unchanged. Durations and
-- distances are unchanged and are repeated only because the row is an upsert.

INSERT INTO routes (
  from_location,
  to_location,
  vehicle_type,
  price_eur,
  duration_min,
  distance_km
)
VALUES
  ('airport', 'alanya_bati', 'vito', 80.00, 100, 105),
  ('airport', 'alanya_bati', 'vclass', 100.00, 100, 105),
  ('airport', 'alanya_merkez', 'vito', 95.00, 120, 125),
  ('airport', 'alanya_merkez', 'vclass', 115.00, 120, 125),
  ('airport', 'alanya_dogu', 'vito', 105.00, 130, 138),
  ('airport', 'alanya_dogu', 'vclass', 130.00, 130, 138),
  ('airport', 'kargicak', 'vito', 115.00, 145, 150),
  ('airport', 'kargicak', 'vclass', 140.00, 145, 150),
  ('airport', 'demirtas', 'vito', 130.00, 165, 170),
  ('airport', 'demirtas', 'vclass', 160.00, 165, 170),
  ('airport', 'kizilagac', 'vito', 65.00, 75, 85),
  ('airport', 'kizilagac', 'vclass', 100.00, 75, 85),
  ('airport', 'kapadokya', 'vito', 330.00, 480, 540),
  ('airport', 'kapadokya', 'vclass', 380.00, 480, 540)
ON CONFLICT (from_location, to_location, vehicle_type)
DO UPDATE SET
  price_eur = EXCLUDED.price_eur,
  duration_min = EXCLUDED.duration_min,
  distance_km = EXCLUDED.distance_km;
