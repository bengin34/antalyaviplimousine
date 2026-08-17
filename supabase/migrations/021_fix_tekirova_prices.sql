-- Fix tekirova prices to match routes.js source of truth (vito: 75, sprinter: 115)
INSERT INTO route_prices (origin, destination, vehicle, price, duration_min, distance_km)
VALUES
  ('airport', 'tekirova', 'vito',   75.00, 75, 75),
  ('airport', 'tekirova', 'vclass', 115.00, 75, 75)
ON CONFLICT (origin, destination, vehicle)
DO UPDATE SET price = EXCLUDED.price;
