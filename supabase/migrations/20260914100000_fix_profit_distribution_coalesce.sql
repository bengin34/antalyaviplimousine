-- COALESCE bir fonksiyon değil, SQL dil yapısıdır: pg_catalog ile nitelenemez.
-- 20260821090851 içindeki "pg_catalog.coalesce(...)" her çağrıda
-- 42883 (function pg_catalog.coalesce(date, date) does not exist) veriyordu;
-- PostgREST bunu 404 olarak yansıttığı için kâr dağıtımı hiç kaydedilemedi.
-- Fonksiyonun gövdesi birebir aynı, yalnız o çağrı niteliksiz coalesce oldu.

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
  v_advertising_cost_eur numeric;
  v_advertising_cost_try numeric;
  v_total_expense_eur numeric;
  v_total_expense_try numeric;
  v_net_profit_eur numeric;
  v_net_profit_try numeric;
  v_realized_leg_count numeric;
  v_result public.profit_distributions;
begin
  if v_actor_id is null then
    raise exception using errcode = 'P0001', message = 'Authentication required';
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
     or v_total_expense_eur <> v_vehicle_cost_eur + v_supplier_cost_eur + v_airport_cost_eur + v_advertising_cost_eur
     or v_total_expense_try <> v_vehicle_cost_try + v_supplier_cost_try + v_airport_cost_try + v_advertising_cost_try
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
    v_advertising_cost_eur, v_advertising_cost_try,
    v_total_expense_eur, v_total_expense_try,
    v_net_profit_eur, v_net_profit_try,
    v_realized_leg_count::integer, p_snapshot, v_actor_id
  )
  returning * into v_result;

  return v_result;
end;
$$;

revoke execute on function public.create_profit_distribution(date, date, numeric, numeric, jsonb) from public, anon;
grant execute on function public.create_profit_distribution(date, date, numeric, numeric, jsonb) to authenticated;
