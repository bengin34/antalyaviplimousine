-- The Land of Legends gezi transferi: otel → The Land of Legends (Kadriye) →
-- otel, şoför park boyunca bekler. Tek araç tüm gün bağlı kaldığı için iki
-- ayrı havalimanı transferi gibi değil, kendi tarifesiyle fiyatlanır:
--
--   Vito = 50 € sabit (şoför + bekleme) + 0,70 € × gidiş-dönüş km, 5 €'ya yuvarlı
--   Sprinter = Vito × 1,4, 5 €'ya yuvarlı
--
-- Kaynak: src/land-of-legends.js. Fiyatlar orada değişir; bu tablo onunla
-- `npm run check:prices` ile eşleştirilir. Bölge, misafirin seçtiği otelin
-- fiyat bölgesidir (hotel-index). Tabloda olmayan bölge (Kaş vb.) elle fiyatlanır.
--
-- Salt eklemeli; create-booking fonksiyonunun yeni sürümünden ÖNCE uygulanmalı.

CREATE TABLE IF NOT EXISTS land_of_legends_rates (
  region_slug  TEXT NOT NULL,
  vehicle_type TEXT NOT NULL CHECK (vehicle_type IN ('vito', 'vclass')),
  price_eur    NUMERIC(10, 2) NOT NULL CHECK (price_eur > 0),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (region_slug, vehicle_type)
);

INSERT INTO land_of_legends_rates (region_slug, vehicle_type, price_eur) VALUES
  ('belek', 'vito', 65.00),
  ('belek', 'vclass', 90.00),
  ('bogazkent', 'vito', 65.00),
  ('bogazkent', 'vclass', 90.00),
  ('antalya', 'vito', 105.00),
  ('antalya', 'vclass', 145.00),
  ('side', 'vito', 115.00),
  ('side', 'vclass', 160.00),
  ('manavgat', 'vito', 115.00),
  ('manavgat', 'vclass', 160.00),
  ('kizilagac', 'vito', 135.00),
  ('kizilagac', 'vclass', 190.00),
  ('kemer', 'vito', 155.00),
  ('kemer', 'vclass', 215.00),
  ('alanya_bati', 'vito', 170.00),
  ('alanya_bati', 'vclass', 240.00),
  ('tekirova', 'vito', 185.00),
  ('tekirova', 'vclass', 260.00),
  ('alanya_merkez', 'vito', 210.00),
  ('alanya_merkez', 'vclass', 295.00),
  ('kumluca', 'vito', 225.00),
  ('kumluca', 'vclass', 315.00),
  ('alanya', 'vito', 230.00),
  ('alanya', 'vclass', 320.00),
  ('alanya_dogu', 'vito', 230.00),
  ('alanya_dogu', 'vclass', 320.00),
  ('kargicak', 'vito', 240.00),
  ('kargicak', 'vclass', 335.00),
  ('demirtas', 'vito', 265.00),
  ('demirtas', 'vclass', 370.00)
ON CONFLICT (region_slug, vehicle_type) DO UPDATE SET price_eur = EXCLUDED.price_eur, updated_at = NOW();

ALTER TABLE land_of_legends_rates ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON land_of_legends_rates TO anon, authenticated, service_role;
CREATE POLICY "public_read_land_of_legends_rates" ON land_of_legends_rates
  FOR SELECT TO anon, authenticated USING (true);
GRANT UPDATE (price_eur, updated_at) ON land_of_legends_rates TO authenticated;
CREATE POLICY "admin_update_land_of_legends_rates" ON land_of_legends_rates
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Rezervasyonda misafirin otel bölgesi saklanır: fiyatın hangi bölgeden
-- hesaplandığı operatör için görünür kalsın.
ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS excursion_region TEXT;

ALTER TABLE bookings
  DROP CONSTRAINT IF EXISTS bookings_trip_type_check,
  DROP CONSTRAINT IF EXISTS bookings_trip_details_check;

ALTER TABLE bookings
  ADD CONSTRAINT bookings_trip_type_check
    CHECK (trip_type IN ('one_way', 'round_trip', 'daily_chauffeur', 'land_of_legends')),
  ADD CONSTRAINT bookings_trip_details_check
    CHECK (
      (trip_type = 'one_way')
      OR (
        trip_type = 'round_trip'
        AND return_date IS NOT NULL
        AND return_pickup_time IS NOT NULL
        AND return_date >= pickup_date
      )
      OR (
        trip_type = 'daily_chauffeur'
        AND service_end_date IS NOT NULL
        AND service_end_date >= pickup_date
        AND service_end_date <= pickup_date + 29
        AND pickup_time IS NOT NULL
        AND daily_rate_eur IS NOT NULL
        AND fuel_terms_accepted_at IS NOT NULL
        AND dropoff_location IS NULL
      )
      OR (
        -- Aynı gün gidiş, bekleme ve dönüş: dönüş saati gidişten sonra olmalı.
        trip_type = 'land_of_legends'
        AND dropoff_location = 'land_of_legends'
        AND pickup_time IS NOT NULL
        AND return_date IS NOT NULL
        AND return_date = pickup_date
        AND return_pickup_time IS NOT NULL
        AND return_pickup_time > pickup_time
      )
    );

GRANT UPDATE (excursion_region) ON bookings TO authenticated;
