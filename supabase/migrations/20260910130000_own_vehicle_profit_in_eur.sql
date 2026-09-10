-- Reklam öncesi kâr artık avro cinsinden girilir; TL'ye çevrim yalnızca
-- reklam ve otopark giderini düşerken hesaplama katmanında yapılır.
ALTER TABLE bookings RENAME COLUMN own_vehicle_profit_try TO own_vehicle_profit_eur;
ALTER TABLE bookings RENAME COLUMN return_own_vehicle_profit_try TO return_own_vehicle_profit_eur;
ALTER TABLE chauffeur_hire_days RENAME COLUMN profit_before_ads_try TO profit_before_ads_eur;
