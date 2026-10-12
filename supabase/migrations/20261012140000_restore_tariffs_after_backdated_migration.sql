-- Put every tariff the backdated migration moved back onto the site's prices.
--
-- 20260901090000_price_routes_above_km_cost.sql arrived with a merge long after
-- its own timestamp, so it was still unapplied when it reached the database. A
-- push therefore ran it AFTER 20260915100000_raise_transfer_prices.sql instead
-- of before it, which is the order its filename implies, and it overwrote the
-- live ladder with the figures from September.
--
-- 20261012100000_price_alanya_and_kapadokya_above_cost.sql then corrected only
-- the five Vito rows it was written for, which left nine rows standing at the
-- backdated values: every V-Class tariff in the Alanya ladder plus Cappadocia,
-- both Bati Alanya rows, and both Kizilagac rows. The site quoted one price
-- and the database held another — up to EUR 27 above it on V-Class, and EUR 8
-- and EUR 18 below it on Kizilagac.
--
-- The values below are generated from `routeCatalog` in `src/routes.js`, the
-- source `scripts/verify-prices.mjs` checks both seed and migrations against,
-- so this states the whole affected set rather than a diff against it. Nothing
-- here is a pricing decision: Bati Alanya is still held at EUR 73 and the five
-- Vito tariffs still clear cost by about 10%.

INSERT INTO routes (
  from_location,
  to_location,
  vehicle_type,
  price_eur,
  duration_min,
  distance_km
)
VALUES
  ('airport', 'alanya_bati',   'vito',    73.00, 100, 105),
  ('airport', 'alanya_bati',   'vclass',  93.00, 100, 105),
  ('airport', 'alanya_merkez', 'vito',    93.00, 120, 125),
  ('airport', 'alanya_merkez', 'vclass',  98.00, 120, 125),
  ('airport', 'alanya_dogu',   'vito',    98.00, 130, 138),
  ('airport', 'alanya_dogu',   'vclass', 108.00, 130, 138),
  ('airport', 'kargicak',      'vito',   108.00, 145, 150),
  ('airport', 'kargicak',      'vclass', 118.00, 145, 150),
  ('airport', 'demirtas',      'vito',   123.00, 165, 170),
  ('airport', 'demirtas',      'vclass', 133.00, 165, 170),
  ('airport', 'kizilagac',     'vito',    73.00,  75,  85),
  ('airport', 'kizilagac',     'vclass', 118.00,  75,  85),
  ('airport', 'kapadokya',     'vito',   333.00, 480, 540),
  ('airport', 'kapadokya',     'vclass', 353.00, 480, 540)
ON CONFLICT (from_location, to_location, vehicle_type)
DO UPDATE SET
  price_eur = EXCLUDED.price_eur,
  duration_min = EXCLUDED.duration_min,
  distance_km = EXCLUDED.distance_km;
