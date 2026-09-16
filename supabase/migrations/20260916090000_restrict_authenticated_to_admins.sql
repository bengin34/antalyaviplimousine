-- "Giriş yapmış = yönetici" varsayımını kaldırır.
--
-- Bugüne kadar her politika `to authenticated using (true)` biçimindeydi:
-- yani oturum açan HERKES rezervasyonları okuyabiliyor, silebiliyor,
-- fiyatları değiştirebiliyordu. Bu, Supabase Auth'ta kayıt kapalı olduğu
-- sürece yalnızca tek bir hesap anlamına geliyordu — ama kayıt açıktı
-- (`/auth/v1/settings` → `disable_signup: false`). Anon anahtar tarayıcıda
-- herkese görünür olduğu için isteyen kendine hesap açıp müşteri adı,
-- telefonu ve uçuş bilgisine erişebilirdi.
--
-- Çözüm yetkiyi "oturum açmış olmak"tan alıp açık bir listeye bağlamak:
-- `admin_users`. Dashboard'daki kayıt ayarı ileride yanlışlıkla açılsa
-- bile yeni bir hesap hiçbir şey göremez.
--
-- `is_admin()` bilerek SECURITY INVOKER: politika içinden çağrıldığında
-- `admin_users` üzerindeki kendi RLS'i uygulanır ve aşağıdaki self-read
-- politikası kullanıcıya yalnızca kendi satırını gösterir. SECURITY
-- DEFINER'a gerek yok, dolayısıyla yeni bir linter uyarısı da doğmaz.

create table public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  note text
);

comment on table public.admin_users is
  'Admin paneline erişebilen hesaplar. Bu tabloda satırı olmayan bir '
  'oturum, giriş yapmış olsa bile hiçbir iş verisini göremez.';

alter table public.admin_users enable row level security;

revoke all on table public.admin_users from public, anon, authenticated;
grant select on table public.admin_users to authenticated;

-- Yalnızca kendi satırı. Bir yönetici diğer yöneticilerin listesini
-- göremez; is_admin() için kendi satırını görmesi yeterli.
create policy admin_users_self_read
  on public.admin_users
  for select
  to authenticated
  using (user_id = (select auth.uid()));

-- Bu migration çalıştığı andaki mevcut hesaplar devralınır. Şu ana kadar
-- panele girebilen tek hesap zaten yöneticiydi.
--
-- ÖNEMLİ: Kayıt açık olduğu için yabancı bir hesap kayıtlı olabilir.
-- Uygulamadan sonra listeyi doğrula:
--   select u.email, a.created_at from public.admin_users a
--     join auth.users u on u.id = a.user_id;
-- Tanımadığın bir e-posta varsa: delete from public.admin_users where user_id = '...';
insert into public.admin_users (user_id, note)
select id, 'migration ile devralindi'
from auth.users
on conflict (user_id) do nothing;

create function public.is_admin()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select exists (
    select 1 from public.admin_users a where a.user_id = (select auth.uid())
  );
$$;

comment on function public.is_admin() is
  'Çağıran oturum admin_users listesinde mi. Tüm yönetici politikalarının '
  'tek kapısı.';

revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

-- ============================================================
-- Politikalar: `using (true)` → `using (public.is_admin())`
-- Kolon bazlı GRANT'lar olduğu gibi kalır; onlar yöneticinin hangi
-- kolonlara dokunabildiğini sınırlar, bu politikalar kimin yönetici
-- olduğunu sınırlar. İkisi birlikte çalışır.
-- ============================================================

-- bookings
drop policy if exists "admin_read_bookings" on public.bookings;
create policy "admin_read_bookings" on public.bookings
  for select to authenticated using (public.is_admin());

drop policy if exists "admin_insert_bookings" on public.bookings;
create policy "admin_insert_bookings" on public.bookings
  for insert to authenticated with check (public.is_admin());

drop policy if exists "admin_update_bookings" on public.bookings;
create policy "admin_update_bookings" on public.bookings
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin_delete_bookings" on public.bookings;
create policy "admin_delete_bookings" on public.bookings
  for delete to authenticated using (public.is_admin());

-- booking_notes
drop policy if exists "admin_read_notes" on public.booking_notes;
create policy "admin_read_notes" on public.booking_notes
  for select to authenticated using (public.is_admin());

drop policy if exists "admin_insert_notes" on public.booking_notes;
create policy "admin_insert_notes" on public.booking_notes
  for insert to authenticated
  with check (
    public.is_admin()
    and exists (select 1 from public.bookings where id = booking_id)
  );

-- routes (public_read politikası dokunulmadan kalır)
drop policy if exists "admin_update_routes" on public.routes;
create policy "admin_update_routes" on public.routes
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

-- chauffeur_service_rates (public_read politikası dokunulmadan kalır)
drop policy if exists "admin_update_chauffeur_service_rates" on public.chauffeur_service_rates;
create policy "admin_update_chauffeur_service_rates" on public.chauffeur_service_rates
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

-- chauffeur_hire_days
drop policy if exists "admin_read_chauffeur_hire_days" on public.chauffeur_hire_days;
create policy "admin_read_chauffeur_hire_days" on public.chauffeur_hire_days
  for select to authenticated using (public.is_admin());

drop policy if exists "admin_insert_chauffeur_hire_days" on public.chauffeur_hire_days;
create policy "admin_insert_chauffeur_hire_days" on public.chauffeur_hire_days
  for insert to authenticated with check (public.is_admin());

drop policy if exists "admin_update_chauffeur_hire_days" on public.chauffeur_hire_days;
create policy "admin_update_chauffeur_hire_days" on public.chauffeur_hire_days
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin_delete_chauffeur_hire_days" on public.chauffeur_hire_days;
create policy "admin_delete_chauffeur_hire_days" on public.chauffeur_hire_days
  for delete to authenticated using (public.is_admin());

-- profit_loss_settings
drop policy if exists "admin_read_profit_loss_settings" on public.profit_loss_settings;
create policy "admin_read_profit_loss_settings" on public.profit_loss_settings
  for select to authenticated using (public.is_admin());

drop policy if exists "admin_insert_profit_loss_settings" on public.profit_loss_settings;
create policy "admin_insert_profit_loss_settings" on public.profit_loss_settings
  for insert to authenticated with check (public.is_admin());

drop policy if exists "admin_update_profit_loss_settings" on public.profit_loss_settings;
create policy "admin_update_profit_loss_settings" on public.profit_loss_settings
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

-- profit_loss_distance_overrides
drop policy if exists "admin_read_profit_loss_distance_overrides" on public.profit_loss_distance_overrides;
create policy "admin_read_profit_loss_distance_overrides" on public.profit_loss_distance_overrides
  for select to authenticated using (public.is_admin());

drop policy if exists "admin_insert_profit_loss_distance_overrides" on public.profit_loss_distance_overrides;
create policy "admin_insert_profit_loss_distance_overrides" on public.profit_loss_distance_overrides
  for insert to authenticated with check (public.is_admin());

drop policy if exists "admin_update_profit_loss_distance_overrides" on public.profit_loss_distance_overrides;
create policy "admin_update_profit_loss_distance_overrides" on public.profit_loss_distance_overrides
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

-- profit_share_settings / profit_distributions (yalnızca okuma)
drop policy if exists profit_share_settings_authenticated_read on public.profit_share_settings;
create policy profit_share_settings_authenticated_read on public.profit_share_settings
  for select to authenticated using (public.is_admin());

drop policy if exists profit_distributions_authenticated_read on public.profit_distributions;
create policy profit_distributions_authenticated_read on public.profit_distributions
  for select to authenticated using (public.is_admin());

-- flight_api_usage (kota sayacı)
drop policy if exists flight_api_usage_authenticated_read on public.flight_api_usage;
create policy flight_api_usage_authenticated_read on public.flight_api_usage
  for select to authenticated using (public.is_admin());

-- site_events: anon INSERT politikası KASITLI olarak `with check (true)`
-- kalır — ziyaretçi ölçümünün çalışma biçimi bu ve tablo CHECK
-- kısıtlarıyla korunuyor. Değişen yalnızca okuma tarafı.
drop policy if exists site_events_authenticated_read on public.site_events;
create policy site_events_authenticated_read on public.site_events
  for select to authenticated using (public.is_admin());

-- ============================================================
-- SECURITY DEFINER fonksiyonlar
-- ============================================================

-- Huni raporu artık kendi yetkisini taşımıyor: INVOKER'a çevrildiğinde
-- okuduğu site_events ve bookings tablolarının RLS'i uygulanır, yani
-- yukarıdaki is_admin() kapısından geçer. Böylece linter uyarısı da düşer.
alter function public.site_funnel_summary(integer) security invoker;

-- Aşağıdaki iki fonksiyon SECURITY DEFINER kalmak zorunda (authenticated
-- rolünün yazma yetkisi olmayan tablolara yazıyorlar), bu yüzden yetki
-- kontrolü gövdenin içine taşındı: "oturum var mı" yerine "yönetici mi".

create or replace function public.set_profit_share_settings(
  p_opening_date date,
  p_default_operations_share_pct numeric,
  p_default_vehicle_owner_share_pct numeric
)
returns public.profit_share_settings
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_actor_id uuid := auth.uid();
  v_existing_opening_date date;
  v_result public.profit_share_settings;
begin
  if v_actor_id is null or not public.is_admin() then
    raise exception using errcode = 'P0001', message = 'Admin authentication required';
  end if;

  if p_opening_date is null then
    raise exception using errcode = 'P0001', message = 'Opening date is required';
  end if;

  if p_default_operations_share_pct is null
     or p_default_vehicle_owner_share_pct is null
     or p_default_operations_share_pct < 0
     or p_default_operations_share_pct > 100
     or p_default_vehicle_owner_share_pct < 0
     or p_default_vehicle_owner_share_pct > 100
     or p_default_operations_share_pct <> pg_catalog.round(p_default_operations_share_pct, 2)
     or p_default_vehicle_owner_share_pct <> pg_catalog.round(p_default_vehicle_owner_share_pct, 2)
     or p_default_operations_share_pct + p_default_vehicle_owner_share_pct <> 100 then
    raise exception using errcode = 'P0001', message = 'Profit shares must have at most two decimals and total 100';
  end if;

  select settings.opening_date
    into v_existing_opening_date
    from public.profit_share_settings as settings
    where settings.id = 1
    for update;

  if found then
    if p_opening_date <> v_existing_opening_date
       and exists (select 1 from public.profit_distributions) then
      raise exception using errcode = 'P0001', message = 'Opening date cannot change after the first distribution';
    end if;

    update public.profit_share_settings as settings
      set opening_date = p_opening_date,
          default_operations_share_pct = p_default_operations_share_pct,
          default_vehicle_owner_share_pct = p_default_vehicle_owner_share_pct,
          updated_at = pg_catalog.now()
      where settings.id = 1
      returning settings.* into v_result;
  else
    if exists (select 1 from public.profit_distributions) then
      raise exception using errcode = 'P0001', message = 'Profit share settings are missing for an existing ledger';
    end if;

    begin
      insert into public.profit_share_settings (
        id,
        opening_date,
        default_operations_share_pct,
        default_vehicle_owner_share_pct
      ) values (
        1,
        p_opening_date,
        p_default_operations_share_pct,
        p_default_vehicle_owner_share_pct
      )
      returning * into v_result;
    exception when unique_violation then
      select settings.opening_date
        into v_existing_opening_date
        from public.profit_share_settings as settings
        where settings.id = 1
        for update;

      if p_opening_date <> v_existing_opening_date
         and exists (select 1 from public.profit_distributions) then
        raise exception using errcode = 'P0001', message = 'Opening date cannot change after the first distribution';
      end if;

      update public.profit_share_settings as settings
        set opening_date = p_opening_date,
            default_operations_share_pct = p_default_operations_share_pct,
            default_vehicle_owner_share_pct = p_default_vehicle_owner_share_pct,
            updated_at = pg_catalog.now()
        where settings.id = 1
        returning settings.* into v_result;
    end;
  end if;

  return v_result;
end;
$$;

create or replace function public.create_profit_distribution(
  p_expected_start date,
  p_period_end date,
  p_operations_share_pct numeric,
  p_vehicle_owner_share_pct numeric,
  p_snapshot jsonb
)
returns public.profit_distributions
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_actor_id uuid := auth.uid();
  v_opening_date date;
  v_last_period_end date;
  v_required_start date;
  v_key text;
  v_operations_amount_eur numeric;
  v_vehicle_owner_amount_eur numeric;
  v_operations_amount_try numeric;
  v_vehicle_owner_amount_try numeric;
  v_income_eur numeric;
  v_income_try numeric;
  v_vehicle_cost_eur numeric;
  v_vehicle_cost_try numeric;
  v_supplier_cost_eur numeric;
  v_supplier_cost_try numeric;
  v_airport_cost_eur numeric;
  v_airport_cost_try numeric;
  v_parking_cost_eur numeric;
  v_parking_cost_try numeric;
  v_advertising_cost_eur numeric;
  v_advertising_cost_try numeric;
  v_total_expense_eur numeric;
  v_total_expense_try numeric;
  v_net_profit_eur numeric;
  v_net_profit_try numeric;
  v_realized_leg_count numeric;
  v_result public.profit_distributions;
begin
  if v_actor_id is null or not public.is_admin() then
    raise exception using errcode = 'P0001', message = 'Admin authentication required';
  end if;

  select settings.opening_date
    into v_opening_date
    from public.profit_share_settings as settings
    where settings.id = 1
    for update;

  if not found then
    raise exception using errcode = 'P0001', message = 'Profit share settings must be configured first';
  end if;

  select pg_catalog.max(distribution.period_end)
    into v_last_period_end
    from public.profit_distributions as distribution;

  v_required_start := coalesce(v_last_period_end + 1, v_opening_date);

  if p_expected_start is null or p_expected_start <> v_required_start then
    raise exception using errcode = 'P0001', message = 'Distribution start is stale or not contiguous';
  end if;

  if p_period_end is null or p_period_end < p_expected_start then
    raise exception using errcode = 'P0001', message = 'Distribution end must be on or after its start';
  end if;

  if p_period_end >= (pg_catalog.now() at time zone 'Europe/Berlin')::date then
    raise exception using errcode = 'P0001', message = 'Only closed Berlin calendar days can be distributed';
  end if;

  if p_operations_share_pct is null
     or p_vehicle_owner_share_pct is null
     or p_operations_share_pct < 0
     or p_operations_share_pct > 100
     or p_vehicle_owner_share_pct < 0
     or p_vehicle_owner_share_pct > 100
     or p_operations_share_pct <> pg_catalog.round(p_operations_share_pct, 2)
     or p_vehicle_owner_share_pct <> pg_catalog.round(p_vehicle_owner_share_pct, 2)
     or p_operations_share_pct + p_vehicle_owner_share_pct <> 100 then
    raise exception using errcode = 'P0001', message = 'Profit shares must have at most two decimals and total 100';
  end if;

  if p_snapshot is null
     or pg_catalog.jsonb_typeof(p_snapshot) is distinct from 'object'
     or pg_catalog.jsonb_typeof(p_snapshot -> 'period_start') is distinct from 'string'
     or pg_catalog.jsonb_typeof(p_snapshot -> 'period_end') is distinct from 'string'
     or pg_catalog.jsonb_typeof(p_snapshot -> 'resolved_legs') is distinct from 'array'
     or pg_catalog.jsonb_typeof(p_snapshot -> 'monthly_settings') is distinct from 'object' then
    raise exception using errcode = 'P0001', message = 'Malformed profit distribution snapshot';
  end if;

  foreach v_key in array array[
    'schema_version',
    'operations_share_pct', 'vehicle_owner_share_pct',
    'operations_amount_eur', 'vehicle_owner_amount_eur',
    'operations_amount_try', 'vehicle_owner_amount_try',
    'income_eur', 'income_try',
    'vehicle_cost_eur', 'vehicle_cost_try',
    'supplier_cost_eur', 'supplier_cost_try',
    'airport_cost_eur', 'airport_cost_try',
    'parking_cost_eur', 'parking_cost_try',
    'advertising_cost_eur', 'advertising_cost_try',
    'total_expense_eur', 'total_expense_try',
    'net_profit_eur', 'net_profit_try',
    'realized_leg_count'
  ] loop
    if pg_catalog.jsonb_typeof(p_snapshot -> v_key) is distinct from 'number' then
      raise exception using errcode = 'P0001', message = 'Malformed profit distribution snapshot';
    end if;
  end loop;

  begin
    if (p_snapshot ->> 'schema_version')::numeric <> 1
       or (p_snapshot ->> 'period_start')::date <> p_expected_start
       or (p_snapshot ->> 'period_end')::date <> p_period_end then
      raise exception using errcode = 'P0001', message = 'Snapshot schema or period does not match the request';
    end if;

    v_operations_amount_eur := (p_snapshot ->> 'operations_amount_eur')::numeric;
    v_vehicle_owner_amount_eur := (p_snapshot ->> 'vehicle_owner_amount_eur')::numeric;
    v_operations_amount_try := (p_snapshot ->> 'operations_amount_try')::numeric;
    v_vehicle_owner_amount_try := (p_snapshot ->> 'vehicle_owner_amount_try')::numeric;
    v_income_eur := (p_snapshot ->> 'income_eur')::numeric;
    v_income_try := (p_snapshot ->> 'income_try')::numeric;
    v_vehicle_cost_eur := (p_snapshot ->> 'vehicle_cost_eur')::numeric;
    v_vehicle_cost_try := (p_snapshot ->> 'vehicle_cost_try')::numeric;
    v_supplier_cost_eur := (p_snapshot ->> 'supplier_cost_eur')::numeric;
    v_supplier_cost_try := (p_snapshot ->> 'supplier_cost_try')::numeric;
    v_airport_cost_eur := (p_snapshot ->> 'airport_cost_eur')::numeric;
    v_airport_cost_try := (p_snapshot ->> 'airport_cost_try')::numeric;
    v_parking_cost_eur := (p_snapshot ->> 'parking_cost_eur')::numeric;
    v_parking_cost_try := (p_snapshot ->> 'parking_cost_try')::numeric;
    v_advertising_cost_eur := (p_snapshot ->> 'advertising_cost_eur')::numeric;
    v_advertising_cost_try := (p_snapshot ->> 'advertising_cost_try')::numeric;
    v_total_expense_eur := (p_snapshot ->> 'total_expense_eur')::numeric;
    v_total_expense_try := (p_snapshot ->> 'total_expense_try')::numeric;
    v_net_profit_eur := (p_snapshot ->> 'net_profit_eur')::numeric;
    v_net_profit_try := (p_snapshot ->> 'net_profit_try')::numeric;
    v_realized_leg_count := (p_snapshot ->> 'realized_leg_count')::numeric;
  exception when others then
    raise exception using errcode = 'P0001', message = 'Malformed profit distribution snapshot';
  end;

  if (p_snapshot ->> 'operations_share_pct')::numeric <> p_operations_share_pct
     or (p_snapshot ->> 'vehicle_owner_share_pct')::numeric <> p_vehicle_owner_share_pct
     or v_net_profit_eur <= 0
     or v_realized_leg_count < 0
     or v_realized_leg_count <> pg_catalog.trunc(v_realized_leg_count)
     or v_realized_leg_count <> pg_catalog.jsonb_array_length(p_snapshot -> 'resolved_legs')
     or v_total_expense_eur <> v_vehicle_cost_eur + v_supplier_cost_eur + v_airport_cost_eur + v_parking_cost_eur + v_advertising_cost_eur
     or v_total_expense_try <> v_vehicle_cost_try + v_supplier_cost_try + v_airport_cost_try + v_parking_cost_try + v_advertising_cost_try
     or v_net_profit_eur <> v_income_eur - v_total_expense_eur
     or v_net_profit_try <> v_income_try - v_total_expense_try
     or v_operations_amount_eur <> pg_catalog.round(v_net_profit_eur * p_operations_share_pct / 100, 2)
     or v_vehicle_owner_amount_eur <> v_net_profit_eur - v_operations_amount_eur
     or v_operations_amount_try <> pg_catalog.round(v_net_profit_try * p_operations_share_pct / 100, 2)
     or v_vehicle_owner_amount_try <> v_net_profit_try - v_operations_amount_try then
    raise exception using errcode = 'P0001', message = 'Profit distribution snapshot does not reconcile';
  end if;

  insert into public.profit_distributions (
    period_start, period_end,
    operations_share_pct, vehicle_owner_share_pct,
    operations_amount_eur, vehicle_owner_amount_eur,
    operations_amount_try, vehicle_owner_amount_try,
    income_eur, income_try,
    vehicle_cost_eur, vehicle_cost_try,
    supplier_cost_eur, supplier_cost_try,
    airport_cost_eur, airport_cost_try,
    parking_cost_eur, parking_cost_try,
    advertising_cost_eur, advertising_cost_try,
    total_expense_eur, total_expense_try,
    net_profit_eur, net_profit_try,
    realized_leg_count, calculation_snapshot, created_by
  ) values (
    p_expected_start, p_period_end,
    p_operations_share_pct, p_vehicle_owner_share_pct,
    v_operations_amount_eur, v_vehicle_owner_amount_eur,
    v_operations_amount_try, v_vehicle_owner_amount_try,
    v_income_eur, v_income_try,
    v_vehicle_cost_eur, v_vehicle_cost_try,
    v_supplier_cost_eur, v_supplier_cost_try,
    v_airport_cost_eur, v_airport_cost_try,
    v_parking_cost_eur, v_parking_cost_try,
    v_advertising_cost_eur, v_advertising_cost_try,
    v_total_expense_eur, v_total_expense_try,
    v_net_profit_eur, v_net_profit_try,
    v_realized_leg_count::integer, p_snapshot, v_actor_id
  )
  returning * into v_result;

  return v_result;
end;
$$;
