-- Lift the last five Vito tariffs that sold below the cost of driving them.
--
-- The profit model charges a transfer with the whole round trip — the vehicle
-- drives the guest out and comes back empty — at km_cost_try per km, plus the
-- EUR 5 airport meet. At the defaults (15 TRY/km, 50 TRY/EUR) that is EUR 0.60
-- per one-way km plus EUR 5, so a 125 km leg costs EUR 80 before a driver is
-- paid.
--
-- 20260901090000_price_routes_above_km_cost.sql set out to end exactly this,
-- but 20260915100000_raise_transfer_prices.sql landed after it and reset the
-- ladder, which put four Alanya sub-regions back under cost: Merkez EUR 78
-- against EUR 80, Dogu EUR 83 against EUR 87.80, Kargicak EUR 93 against
-- EUR 95, Demirtas EUR 103 against EUR 107. Cappadocia was EUR 303 against a
-- EUR 329 cost. These are the figures the operator set, each clearing cost by
-- about 10%.
--
-- Bati Alanya is deliberately NOT raised: at EUR 73 over 105 km it still
-- clears its own cost, and it is held level to stay competitive on the western
-- strip. `src/route-margin.test.js` records that as a documented thin margin.
-- Cappadocia at EUR 333 clears cost by a few euro and stays a route to quote
-- by hand, not a tariff to sell on.
--
-- Only the Vito rows move; every V-Class tariff already covered its cost, so
-- the vehicle premium narrows in these five regions by design. Durations and
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
  ('airport', 'alanya_merkez', 'vito',  93.00, 120, 125),
  ('airport', 'alanya_dogu',   'vito',  98.00, 130, 138),
  ('airport', 'kargicak',      'vito', 108.00, 145, 150),
  ('airport', 'demirtas',      'vito', 123.00, 165, 170),
  ('airport', 'kapadokya',     'vito', 333.00, 480, 540)
ON CONFLICT (from_location, to_location, vehicle_type)
DO UPDATE SET
  price_eur = EXCLUDED.price_eur,
  duration_min = EXCLUDED.duration_min,
  distance_km = EXCLUDED.distance_km;
