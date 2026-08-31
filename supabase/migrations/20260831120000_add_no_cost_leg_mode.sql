-- "Maliyeti yok" ayak modeli.
--
-- Kâr/zarar ekranında bazı ayakların gerçek bir gideri olmaz: kampanya veya
-- telafi amaçlı yapılan seferler, ortak aracıyla bedelsiz karşılanan bacaklar
-- ya da yalnızca gelir tarafı takip edilen kayıtlar. Bu ayaklar bugüne kadar
-- "tek yön KM bekleniyor" uyarısında takılı kalıyor ve dağıtımı durduruyordu.
--
-- `no_cost` modunda araç maliyeti, tedarikçi bedeli ve karşılama gideri sıfır
-- kabul edilir; bedel sütunu `own_vehicle` ile aynı şekilde NULL kalır.

ALTER TABLE bookings
  DROP CONSTRAINT IF EXISTS bookings_service_cost_mode_check;

ALTER TABLE bookings
  ADD CONSTRAINT bookings_service_cost_mode_check
  CHECK (
    (service_cost_mode IN ('own_vehicle', 'no_cost') AND sold_transfer_cost_try IS NULL)
    OR (
      service_cost_mode = 'sold_transfer'
      AND sold_transfer_cost_try IS NOT NULL
      AND trip_type IN ('one_way', 'round_trip')
    )
  );

ALTER TABLE bookings
  DROP CONSTRAINT IF EXISTS bookings_return_service_cost_mode_check;

ALTER TABLE bookings
  ADD CONSTRAINT bookings_return_service_cost_mode_check
  CHECK (
    return_service_cost_mode IS NULL
    OR return_service_cost_mode IN ('own_vehicle', 'sold_transfer', 'no_cost')
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
      return_service_cost_mode IN ('own_vehicle', 'no_cost')
      AND return_sold_transfer_cost_try IS NULL
    )
    OR (
      return_service_cost_mode IS NULL
      AND return_sold_transfer_cost_try IS NULL
    )
  );
