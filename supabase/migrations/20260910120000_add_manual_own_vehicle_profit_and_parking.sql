-- Kendi aracımızla yapılan seferlerde KM başı maliyet hesabı kaldırılıyor.
-- Bunun yerine admin, seferin reklam öncesi kârını (gelir - gerçek maliyet)
-- doğrudan ayak bazında girer. Karşılama ücreti ödenmeyen havalimanı
-- ayaklarında ise eşdeğer bir gider olarak saat başı otopark ücreti uygulanır.
--
-- `manual_outbound_distance_km`, `manual_return_distance_km`,
-- `chauffeur_hire_days.distance_km` ve `profit_loss_settings.km_cost_try`
-- kolonları kaldırılmıyor: geçmiş kayıtlarda veri barındırabilirler ve zaten
-- kaydedilmiş `profit_distributions.calculation_snapshot` JSON'ları
-- `km_cost_try` alanını içeriyor. Bu migration yalnızca ekleme yapar.

ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS own_vehicle_profit_try NUMERIC(10, 2)
    CHECK (own_vehicle_profit_try IS NULL OR (own_vehicle_profit_try >= -9999999.99 AND own_vehicle_profit_try <= 9999999.99)),
  ADD COLUMN IF NOT EXISTS return_own_vehicle_profit_try NUMERIC(10, 2)
    CHECK (return_own_vehicle_profit_try IS NULL OR (return_own_vehicle_profit_try >= -9999999.99 AND return_own_vehicle_profit_try <= 9999999.99)),
  ADD COLUMN IF NOT EXISTS airport_meet_fee_parking_hours NUMERIC(4, 2) NOT NULL DEFAULT 1
    CHECK (airport_meet_fee_parking_hours > 0 AND airport_meet_fee_parking_hours <= 24);

GRANT UPDATE (
  own_vehicle_profit_try,
  return_own_vehicle_profit_try,
  airport_meet_fee_parking_hours
) ON bookings TO authenticated;

ALTER TABLE chauffeur_hire_days
  ADD COLUMN IF NOT EXISTS profit_before_ads_try NUMERIC(10, 2)
    CHECK (profit_before_ads_try IS NULL OR (profit_before_ads_try >= -9999999.99 AND profit_before_ads_try <= 9999999.99));
