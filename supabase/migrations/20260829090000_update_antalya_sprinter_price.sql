-- Update Antalya City sprinter (vclass) price from 55 to 60 EUR.
INSERT INTO routes (from_location, to_location, vehicle_type, price_eur, duration_min, distance_km)
VALUES ('airport', 'antalya', 'vclass', 60.00, 25, 15)
ON CONFLICT (from_location, to_location, vehicle_type)
DO UPDATE SET price_eur = EXCLUDED.price_eur;
