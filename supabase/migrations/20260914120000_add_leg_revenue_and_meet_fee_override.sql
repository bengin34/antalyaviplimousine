-- Defter artık iki şeyi elle düzeltebiliyor:
--
-- 1) Tahsil edilen gelir. `price_eur` müşteriye söylenen fiyattır (onay
--    mesajında, listelerde görünür); müşteri bazen daha azını ödüyor. Ayak
--    başına gelir kolonu boşken bugünkü kural sürer: `price_eur`, gidiş-dönüşte
--    ikiye bölünmüş.
--
-- 2) Karşılama/otopark kararı. Kolonlar nullable ÜÇ durum taşır, çünkü mevcut
--    `airport_meet_fee_applies` varsayılanı TRUE: onu havalimanı dışı ayaklara
--    genişletmek geçmişteki her şehir içi transfere 250 ₺ karşılama gideri
--    bindirirdi. null = bugünkü konum kuralı, true = karşılama, false = otopark.

ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS revenue_eur NUMERIC(10, 2)
    CHECK (revenue_eur IS NULL OR (revenue_eur >= 0 AND revenue_eur <= 9999999.99)),
  ADD COLUMN IF NOT EXISTS return_revenue_eur NUMERIC(10, 2)
    CHECK (return_revenue_eur IS NULL OR (return_revenue_eur >= 0 AND return_revenue_eur <= 9999999.99)),
  ADD COLUMN IF NOT EXISTS meet_fee_override BOOLEAN,
  ADD COLUMN IF NOT EXISTS return_meet_fee_override BOOLEAN;

GRANT UPDATE (
  revenue_eur,
  return_revenue_eur,
  meet_fee_override,
  return_meet_fee_override
) ON bookings TO authenticated;
