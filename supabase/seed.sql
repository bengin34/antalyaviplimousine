-- ============================================================
-- Seed route pricing
-- Run AFTER 001_initial_schema.sql
-- Adjust prices to match your actual rates before going live.
-- ============================================================

INSERT INTO routes (from_location, to_location, vehicle_type, price_eur, duration_min, distance_km) VALUES
  -- Airport → Destinations (Mercedes Sprinter; legacy schema key: vclass)
  ('airport', 'belek',   'vclass',  60,  35,  45),
  ('airport', 'side',    'vclass',  75,  55,  65),
  ('airport', 'kemer',   'vclass',  80,  60,  50),
  ('airport', 'alanya',  'vclass', 130, 120, 125),
  ('airport', 'antalya', 'vclass',  45,  25,  15),

  -- Airport → Destinations (Mercedes Vito)
  ('airport', 'belek',   'vito',    40,  35,  45),
  ('airport', 'side',    'vito',    50,  55,  65),
  ('airport', 'kemer',   'vito',    55,  60,  50),
  ('airport', 'alanya',  'vito',   100, 120, 125),
  ('airport', 'antalya', 'vito',    30,  25,  15),

  -- Return: Destinations → Airport (Mercedes Sprinter; legacy schema key: vclass)
  ('belek',   'airport', 'vclass',  60,  35,  45),
  ('side',    'airport', 'vclass',  75,  55,  65),
  ('kemer',   'airport', 'vclass',  80,  60,  50),
  ('alanya',  'airport', 'vclass', 130, 120, 125),
  ('antalya', 'airport', 'vclass',  45,  25,  15),

  -- Return: Destinations → Airport (Mercedes Vito)
  ('belek',   'airport', 'vito',    40,  35,  45),
  ('side',    'airport', 'vito',    50,  55,  65),
  ('kemer',   'airport', 'vito',    55,  60,  50),
  ('alanya',  'airport', 'vito',   100, 120, 125),
  ('antalya', 'airport', 'vito',    30,  25,  15)
ON CONFLICT DO NOTHING;
