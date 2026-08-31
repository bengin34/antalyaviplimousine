-- Gidiş ve dönüş ayaklarının maliyetini birbirinden ayırır ve dönüş uçuşunun
-- kalkış saatini saklar.
--
-- 1) Maliyet modeli daha önce rezervasyonun tamamı içindi: gidiş-dönüş bir
--    seyahatte girilen tek toplam maliyet iki ayağa yarı yarıya bölünüyordu.
--    Artık gidiş kendi aracımızla, dönüş satılan transfer olarak (veya tersi)
--    işaretlenebilir ve her ayak kendi maliyetini taşır.
--    `service_cost_mode` / `sold_transfer_cost_try` bundan sonra GİDİŞ ayağını
--    (tek yön ve günlük hizmette tüm seyahati) temsil eder.
--
-- 2) Dönüş transferinde referans nokta uçağın kalkış saatidir; otelden alınma
--    saati bu saatten geriye doğru hesaplanır.

ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS return_service_cost_mode TEXT,
  ADD COLUMN IF NOT EXISTS return_sold_transfer_cost_try NUMERIC(10, 2),
  ADD COLUMN IF NOT EXISTS return_flight_departure_time TIME;

-- Mevcut gidiş-dönüş kayıtlarında toplam maliyet iki ayağa bölünüyordu.
-- Aynı toplamı koruyacak şekilde ayak bazlı değerlere taşı: kuruş artığı,
-- eski `allocateMoneyAmounts` davranışıyla uyumlu olsun diye gidişte kalır.
UPDATE bookings
SET
  return_service_cost_mode = 'sold_transfer',
  return_sold_transfer_cost_try = GREATEST(
    0.01,
    sold_transfer_cost_try - (CEIL(ROUND(sold_transfer_cost_try * 100) / 2.0) / 100.0)
  ),
  sold_transfer_cost_try = CEIL(ROUND(sold_transfer_cost_try * 100) / 2.0) / 100.0
WHERE trip_type = 'round_trip'
  AND service_cost_mode = 'sold_transfer'
  AND sold_transfer_cost_try IS NOT NULL
  AND return_service_cost_mode IS NULL;

-- Kendi aracımızla yapılan gidiş-dönüşlerde dönüş ayağı da açıkça işaretlenir;
-- böylece UI ve hesaplama tarafında "belirtilmemiş" durumu kalmaz.
UPDATE bookings
SET return_service_cost_mode = 'own_vehicle'
WHERE trip_type = 'round_trip'
  AND return_service_cost_mode IS NULL;

ALTER TABLE bookings
  DROP CONSTRAINT IF EXISTS bookings_return_service_cost_mode_check;

ALTER TABLE bookings
  ADD CONSTRAINT bookings_return_service_cost_mode_check
  CHECK (
    return_service_cost_mode IS NULL
    OR return_service_cost_mode IN ('own_vehicle', 'sold_transfer')
  );

ALTER TABLE bookings
  DROP CONSTRAINT IF EXISTS bookings_return_sold_transfer_cost_try_check;

ALTER TABLE bookings
  ADD CONSTRAINT bookings_return_sold_transfer_cost_try_check
  CHECK (
    return_sold_transfer_cost_try IS NULL
    OR (return_sold_transfer_cost_try > 0 AND return_sold_transfer_cost_try <= 9999999.99)
  );

ALTER TABLE bookings
  DROP CONSTRAINT IF EXISTS bookings_return_cost_model_check;

ALTER TABLE bookings
  ADD CONSTRAINT bookings_return_cost_model_check
  CHECK (
    (
      return_service_cost_mode = 'sold_transfer'
      AND return_sold_transfer_cost_try IS NOT NULL
      AND trip_type = 'round_trip'
    )
    OR (
      return_service_cost_mode = 'own_vehicle'
      AND return_sold_transfer_cost_try IS NULL
    )
    OR (
      return_service_cost_mode IS NULL
      AND return_sold_transfer_cost_try IS NULL
    )
  );

-- Dönüş uçuşu kalkış saati yalnızca gidiş-dönüş seyahatlerinde anlamlıdır.
ALTER TABLE bookings
  DROP CONSTRAINT IF EXISTS bookings_return_flight_departure_time_check;

ALTER TABLE bookings
  ADD CONSTRAINT bookings_return_flight_departure_time_check
  CHECK (
    return_flight_departure_time IS NULL
    OR trip_type = 'round_trip'
  );

-- Yeni sütunlar için ek (additive) kolon bazlı UPDATE yetkisi. REVOKE+GRANT
-- yerine yalnızca ekleme yapılıyor; böylece daha önce ayrı migration'larla
-- verilen `airport_meet_fee_applies` ve `language` yetkileri korunur.
GRANT UPDATE (
  return_service_cost_mode,
  return_sold_transfer_cost_try,
  return_flight_departure_time
) ON bookings TO authenticated;
