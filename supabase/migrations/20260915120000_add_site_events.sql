-- Birinci taraf ziyaretçi ölçümü.
--
-- Neden GA4'e ek olarak: GA4 yalnızca çerez onayı verilmiş ve reklam
-- engelleyici kullanmayan ziyaretçileri görür — trafiğin kayda değer bir
-- kısmı orada hiç görünmez. Bu tablo kendi alan adımızdan kendi
-- veritabanımıza yazar; engellenmez ve `bookings` ile aynı şemada
-- durduğu için "hangi kampanya kaç euro ciro getirdi" sorusu tek bir
-- join ile cevaplanır. GA4 kaldırılmıyor: Google Ads teklif algoritması
-- yalnızca kendi sinyaliyle öğreniyor, o yüzden ikisi paralel çalışır.
--
-- Kişisel veri yazılmaz: IP, isim, e-posta, telefon yok. `session_id`
-- istemcinin ürettiği rastgele bir dizedir, sekme kapanınca kaybolur ve
-- hiçbir kişiye bağlanamaz. Bu yüzden satırlar çerez onayına tabi değildir.
create table public.site_events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  -- Oturum içi tekilleştirme için. Kalıcı değil, kimliğe bağlanamaz.
  session_id text not null,
  event text not null,
  page text,
  language text,
  -- Kampanya alanları `bookings` ile aynı adları taşır ki iki tablo
  -- doğrudan karşılaştırılabilsin (bkz. 20260822120000).
  utm_source text,
  utm_campaign text,
  gclid text,
  -- Huninin konusu: hangi rota, hangi araç, hangi fiyat.
  route text,
  vehicle text,
  price numeric(10, 2),
  -- Şemaya kolon eklemeden taşınan serbest alan. Kişisel veri buraya da
  -- yazılmaz; istemci tarafındaki `track()` bilinen kişisel anahtarları
  -- gönderim öncesi düşürür.
  props jsonb not null default '{}'::jsonb
);

comment on table public.site_events is
  'Birinci taraf huni olayları. Kişisel veri içermez; session_id rastgele '
  've geçicidir. GA4''ün yerine değil, yanına çalışır.';

-- Sorgular neredeyse her zaman "son N gün" ve "şu olay" biçiminde.
create index site_events_created_at_idx on public.site_events (created_at desc);
create index site_events_event_created_at_idx on public.site_events (event, created_at desc);

-- Olay adı serbest metin değil. Anon anahtar tarayıcıda herkese açık
-- olduğu için tabloya yazabilecek tek şey bu listedeki adlardır; rastgele
-- veri dökülmesi şemanın kendisi tarafından engellenir.
alter table public.site_events
  add constraint site_events_event_check check (
    event in (
      'landing_view',
      'route_selected',
      'vehicle_selected',
      'price_shown',
      'quote_unavailable',
      'booking_started',
      'form_abandoned',
      'flight_verification_failed',
      'begin_checkout',
      'booking_submitted',
      'whatsapp_clicked',
      'phone_clicked'
    )
  );

-- Uzunluk tavanları: tek bir istemci tabloyu şişiremesin.
alter table public.site_events
  add constraint site_events_field_lengths check (
    length(session_id) between 8 and 64
    and (page is null or length(page) <= 300)
    and (language is null or length(language) <= 8)
    and (utm_source is null or length(utm_source) <= 100)
    and (utm_campaign is null or length(utm_campaign) <= 200)
    and (gclid is null or length(gclid) <= 200)
    and (route is null or length(route) <= 100)
    and (vehicle is null or length(vehicle) <= 40)
    and pg_column_size(props) <= 2048
  );

alter table public.site_events enable row level security;

revoke all on table public.site_events from public, anon, authenticated;
grant insert on table public.site_events to anon, authenticated;
grant select on table public.site_events to authenticated;

-- anon yalnızca yazar. Okuma politikası yok: tarayıcıdaki anahtarla
-- kimse başkasının ziyaret geçmişini geri okuyamaz.
create policy site_events_anon_insert
  on public.site_events
  for insert
  to anon, authenticated
  with check (true);

-- Admin paneli raporları için okuma.
create policy site_events_authenticated_read
  on public.site_events
  for select
  to authenticated
  using (true);

-- Saklama süresi. Huni oranları için birkaç aylık veri yeter; satırlar
-- sınırsız birikirse ücretsiz katmandaki disk payını yer. Fonksiyon
-- service role ile çağrılır (pg_cron veya elle).
create function public.prune_site_events(p_days integer default 90)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  removed integer;
begin
  if p_days < 1 then
    raise exception 'Saklama süresi en az 1 gün olmalı';
  end if;

  delete from public.site_events
  where created_at < now() - make_interval(days => p_days);

  get diagnostics removed = row_count;
  return removed;
end;
$$;

revoke all on function public.prune_site_events(integer) from public, anon, authenticated;

comment on function public.prune_site_events(integer) is
  'site_events tablosundan p_days günden eski satırları siler ve silinen '
  'satır sayısını döner. Yalnızca service role çağırabilir.';
