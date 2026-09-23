-- Golf çantası ve bebek arabası: normal bavuldan fazla bagaj yeri kaplar ve
-- araç seçimini değiştirebilir (golf çantası ≈ 2 bavul, bebek arabası ≈ 1).
-- Müşteri bunları rezervasyon formunda ayrıca belirtir; şoför ve operasyon
-- aracı yüke göre hazırlasın diye kayıtta tutulur.
--
-- Salt eklemeli: iki yeni kolon, varsayılan 0. Eski kayıtlar ve bu alanları
-- göndermeyen istemciler (admin yeni rezervasyon, eski önbellekli form) 0
-- olarak kalır. Bu migration, create-booking fonksiyonunun yeni sürümü
-- deploy edilmeden ÖNCE uygulanmalıdır.
alter table public.bookings
  add column if not exists golf_bag_count int not null default 0,
  add column if not exists stroller_count int not null default 0;

alter table public.bookings
  drop constraint if exists bookings_golf_bag_count_check;
alter table public.bookings
  add constraint bookings_golf_bag_count_check
  check (golf_bag_count between 0 and 8);

alter table public.bookings
  drop constraint if exists bookings_stroller_count_check;
alter table public.bookings
  add constraint bookings_stroller_count_check
  check (stroller_count between 0 and 3);
