-- Uçuş doğrulama: müşteri iniş uçuş numarasını yazdığında AeroDataBox
-- uçuş-tarife API'sine karşı kontrol edilir ve doğrulanırsa iniş saati
-- otomatik doldurulur. Ücretsiz plan ayda 400 çağrı ile sınırlı; aşımı
-- imkânsız kılmak (yalnızca "olası değil" değil) bu migration'ın amacı.
--
-- `flight_verification_status` ve `flight_scheduled_arrival` nullable:
-- geçmişteki her satır null'dur ve API anahtarı tanımlanana kadar (veya
-- akış API'yi hiç çağırmadığında) her yeni satır da null kalır. null ve
-- 'unavailable' bir "bulgu" değil, bilgi eksikliğidir — admin panelinde
-- ikisi için de rozet gösterilmez.
alter table public.bookings
  add column if not exists flight_verification_status text,
  add column if not exists flight_scheduled_arrival text;

comment on column public.bookings.flight_verification_status is
  'Uçuş doğrulama sonucu. Nullable: eski kayıtlar ve API anahtarı olmadan '
  'işleyen akışlar null kalır. null/''unavailable'' bir sorunu değil, bilgi '
  'eksikliğini ifade eder.';
comment on column public.bookings.flight_scheduled_arrival is
  'AeroDataBox''ten dönen planlanan iniş saati, ''HH:MM'' biçiminde. '
  'Nullable: doğrulama yapılmadıysa veya sonuç bulunamadıysa null kalır.';

alter table public.bookings
  drop constraint if exists bookings_flight_verification_status_check;

alter table public.bookings
  add constraint bookings_flight_verification_status_check
  check (
    flight_verification_status is null
    or flight_verification_status in ('verified', 'not_found', 'wrong_airport', 'unavailable')
  );

-- Kalıcı önbellek: Edge Function örneği soğuduğunda bellek-içi önbellek
-- sıfırlanır ve aynı uçuş tekrar sorgulanır — kotamız buna izin vermiyor.
-- Aynı inen uçaktan birden çok transfer çıkabildiği için kalıcı önbellek
-- ikinci ve üçüncü rezervasyonu ücretsiz hale getirir.
create table public.flight_lookups (
  flight_key text primary key, -- örn. 'TK2412:2026-09-20'
  result jsonb not null,
  created_at timestamptz not null default now()
);

comment on table public.flight_lookups is
  'AeroDataBox sorgu sonuçlarının kalıcı önbelleği. Edge Function''ın '
  'bellek-içi önbelleği soğuk başlangıçta kaybolur; bu tablo aylık 400 '
  'çağrı kotasını korumak için kalıcıdır.';

-- Aylık sayaç ve sert tavan. 380'e ulaşıldığında fonksiyon upstream'i
-- hiç çağırmaz.
create table public.flight_api_usage (
  month text primary key, -- örn. '2026-09'
  calls integer not null default 0
);

alter table public.flight_lookups enable row level security;
alter table public.flight_api_usage enable row level security;

-- flight_lookups: hiçbir politika yok. Yalnızca service role dokunur ve
-- service role zaten RLS'yi atlar.

-- flight_api_usage: yalnızca admin panelinin sayacı okuyabilmesi için tek
-- bir select politikası. Yazma politikası yok — sayacı yalnızca aşağıdaki
-- fonksiyon artırır.
create policy flight_api_usage_authenticated_read
  on public.flight_api_usage
  for select
  to authenticated
  using (true);

-- Kota tüketimi. `where` koşulu her şeyin can alıcı noktası: tavana
-- ulaşıldığında update hiçbir satırı eşleştirmez, hiçbir şey artmaz ve
-- returning satır döndürmez, böylece v_calls null kalır ve fonksiyon
-- false döner. Bu, eşzamanlı isteklerde bile tavanın delinmesini önler.
create function public.consume_flight_quota(p_month text, p_cap integer)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_calls integer;
begin
  insert into flight_api_usage (month, calls)
  values (p_month, 1)
  on conflict (month) do update
    set calls = flight_api_usage.calls + 1
    where flight_api_usage.calls < p_cap
  returning calls into v_calls;

  return v_calls is not null;
end;
$$;
