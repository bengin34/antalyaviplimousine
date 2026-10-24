-- Otelden otele transferde iki uç da oteldir. Kayıt tek bir `hotel_name`
-- taşıyordu: misafirin oteli. Varış otelinin adı hiç sorulmadığı için mesaj
-- şablonları o tek adı iki uca da yazıyor, şoför alış otelinin adını varış
-- bölgesinde arıyordu ("Lara Barut Collection, Bodrum"). Varış oteli kendi
-- alanını alır.
--
-- Bölge `dropoff_location`'da kalır, yani fiyat hesabı değişmez. Eski
-- kayıtlarda alan NULL'dır; o zaman varış ucu yalnızca bölge adıyla gösterilir.
--
-- Salt eklemeli ve tekrar çalıştırılabilir. Yayın sırası:
--   1) bu migration, 2) create-booking fonksiyonu, 3) site (main'e merge).
-- Site önce yayına girerse yeni alan sessizce düşer; rezervasyon kaybolmaz.
ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS dropoff_hotel_name TEXT;

ALTER TABLE bookings
  DROP CONSTRAINT IF EXISTS bookings_dropoff_hotel_name_check;

ALTER TABLE bookings
  ADD CONSTRAINT bookings_dropoff_hotel_name_check
  CHECK (
    dropoff_hotel_name IS NULL
    OR char_length(trim(dropoff_hotel_name)) BETWEEN 2 AND 120
  );

-- Operatör bir kaydı panelden düzeltebilsin. Eklemeli: diğer sütunların
-- izinleri olduğu gibi kalır.
GRANT UPDATE (dropoff_hotel_name) ON bookings TO authenticated;
