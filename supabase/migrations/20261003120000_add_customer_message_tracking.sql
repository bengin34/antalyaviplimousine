-- "Yeni" gelen kutusu için müşteri mesajı takibi.
--
-- Yeni bir rezervasyon geldiğinde operatör iki mesaj gönderir:
--   1. Kontrol mesajı ("Talebinizi aldık, detayları kontrol ediyoruz")
--   2. Onay mesajı (fiyat + transfer detaylarıyla)
--
-- `status` bunu söyleyemez: create-booking fiyatı belli olan web
-- rezervasyonlarını doğrudan 'confirmed' olarak yazar. Bu yüzden mesajın
-- gönderildiği an ayrı kolonlarda tutulur. Onay mesajı gönderilmemiş her
-- aktif rezervasyon admin panelinde "Yeni" sekmesinde kalır.
--
-- Kolonlar yalnızca eklenir; mevcut kolonlara ve politikalara dokunulmaz.

alter table public.bookings
  add column if not exists check_message_sent_at timestamptz,
  add column if not exists confirm_message_sent_at timestamptz;

comment on column public.bookings.check_message_sent_at is
  'Müşteriye kontrol ("talebinizi aldık") mesajının WhatsApp''ta ilk açıldığı an.';
comment on column public.bookings.confirm_message_sent_at is
  'Müşteriye onay mesajının WhatsApp''ta ilk açıldığı an. NULL ise rezervasyon "Yeni" sekmesinde görünür.';

-- Bu migration'dan önce gelen rezervasyonlar zaten elle karşılanmıştı; hepsi
-- "Yeni" sekmesine düşmesin. Son 48 saatte gelenler bilerek dışarıda
-- bırakılır: henüz karşılanmamış olabilirler, gerekirse sekmeden tek dokunuşla
-- "işlendi" olarak işaretlenirler.
update public.bookings
set
  check_message_sent_at = coalesce(check_message_sent_at, created_at),
  confirm_message_sent_at = coalesce(confirm_message_sent_at, created_at)
where created_at < now() - interval '48 hours';

-- Gelen kutusu sorgusu yalnızca onay bekleyen az sayıdaki satırı okur.
create index if not exists bookings_awaiting_confirm_message_idx
  on public.bookings (created_at desc)
  where confirm_message_sent_at is null;

-- Yönetici bu iki kolonu yazabilmeli (kolon bazlı GRANT düzeni, bkz. 012).
GRANT UPDATE (check_message_sent_at, confirm_message_sent_at) ON bookings TO authenticated;
