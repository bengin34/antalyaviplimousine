-- ============================================================
-- Seed route pricing
-- Run AFTER 001_initial_schema.sql
-- Adjust prices to match your actual rates before going live.
-- ============================================================

INSERT INTO routes (from_location, to_location, vehicle_type, price_eur, duration_min, distance_km) VALUES
  -- Airport → Destinations (V-Class)
  ('airport', 'belek',   'vclass',  45,  35,  45),
  ('airport', 'side',    'vclass',  65,  55,  65),
  ('airport', 'kemer',   'vclass',  70,  60,  50),
  ('airport', 'alanya',  'vclass', 110, 120, 125),
  ('airport', 'antalya', 'vclass',  40,  25,  15),

  -- Airport → Destinations (Vito VIP)
  ('airport', 'belek',   'vito',    55,  35,  45),
  ('airport', 'side',    'vito',    79,  55,  65),
  ('airport', 'kemer',   'vito',    84,  60,  50),
  ('airport', 'alanya',  'vito',   130, 120, 125),
  ('airport', 'antalya', 'vito',    48,  25,  15),

  -- Return: Destinations → Airport (V-Class)
  ('belek',   'airport', 'vclass',  45,  35,  45),
  ('side',    'airport', 'vclass',  65,  55,  65),
  ('kemer',   'airport', 'vclass',  70,  60,  50),
  ('alanya',  'airport', 'vclass', 110, 120, 125),
  ('antalya', 'airport', 'vclass',  40,  25,  15),

  -- Return: Destinations → Airport (Vito VIP)
  ('belek',   'airport', 'vito',    55,  35,  45),
  ('side',    'airport', 'vito',    79,  55,  65),
  ('kemer',   'airport', 'vito',    84,  60,  50),
  ('alanya',  'airport', 'vito',   130, 120, 125),
  ('antalya', 'airport', 'vito',    48,  25,  15)
ON CONFLICT DO NOTHING;
