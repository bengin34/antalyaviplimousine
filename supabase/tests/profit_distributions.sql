begin;
select plan(68);

create function pg_temp.error_code(p_statement text) returns text language plpgsql as $$
begin
  execute p_statement;
  return null;
exception when others then
  return sqlstate;
end;
$$;

create function pg_temp.valid_snapshot(
  p_period_start date,
  p_period_end date,
  p_net_profit_eur numeric default 80.00,
  p_net_profit_try numeric default 2300.00,
  p_operations_share_pct numeric default 50.00,
  p_vehicle_owner_share_pct numeric default 50.00
) returns jsonb language sql immutable as $$
  select pg_catalog.jsonb_build_object(
    'schema_version', 1,
    'period_start', p_period_start,
    'period_end', p_period_end,
    'operations_share_pct', p_operations_share_pct,
    'vehicle_owner_share_pct', p_vehicle_owner_share_pct,
    'operations_amount_eur', pg_catalog.round(p_net_profit_eur * p_operations_share_pct / 100, 2),
    'vehicle_owner_amount_eur', p_net_profit_eur - pg_catalog.round(p_net_profit_eur * p_operations_share_pct / 100, 2),
    'operations_amount_try', pg_catalog.round(p_net_profit_try * p_operations_share_pct / 100, 2),
    'vehicle_owner_amount_try', p_net_profit_try - pg_catalog.round(p_net_profit_try * p_operations_share_pct / 100, 2),
    'income_eur', p_net_profit_eur + 20.00,
    'income_try', p_net_profit_try + 1700.00,
    'vehicle_cost_eur', 10.00,
    'vehicle_cost_try', 1000.00,
    'supplier_cost_eur', 5.00,
    'supplier_cost_try', 500.00,
    'airport_cost_eur', 2.00,
    'airport_cost_try', 100.00,
    'advertising_cost_eur', 3.00,
    'advertising_cost_try', 100.00,
    'total_expense_eur', 20.00,
    'total_expense_try', 1700.00,
    'net_profit_eur', p_net_profit_eur,
    'net_profit_try', p_net_profit_try,
    'realized_leg_count', 1,
    'resolved_legs', pg_catalog.jsonb_build_array(pg_catalog.jsonb_build_object('key', 'booking-1:outbound')),
    'monthly_settings', '{}'::jsonb
  );
$$;

select has_table('public', 'profit_share_settings', 'profit share settings table exists');
select has_table('public', 'profit_distributions', 'profit distributions table exists');
select has_function('public', 'set_profit_share_settings', array['date', 'numeric', 'numeric'], 'settings RPC exists');
select has_function('public', 'create_profit_distribution', array['date', 'date', 'numeric', 'numeric', 'jsonb'], 'distribution RPC exists');
select row_security_active('public.profit_share_settings');
select row_security_active('public.profit_distributions');
select table_privs_are('public', 'profit_share_settings', 'authenticated', array['SELECT'], 'authenticated has SELECT only on settings');
select table_privs_are('public', 'profit_distributions', 'authenticated', array['SELECT'], 'authenticated has SELECT only on distributions');
select table_privs_are('public', 'profit_share_settings', 'anon', array[]::text[], 'anon has no settings privileges');
select table_privs_are('public', 'profit_distributions', 'anon', array[]::text[], 'anon has no distribution privileges');
select function_privs_are('public', 'set_profit_share_settings', array['date', 'numeric', 'numeric'], 'authenticated', array['EXECUTE'], 'authenticated can execute settings RPC');
select function_privs_are('public', 'create_profit_distribution', array['date', 'date', 'numeric', 'numeric', 'jsonb'], 'authenticated', array['EXECUTE'], 'authenticated can execute distribution RPC');
select function_privs_are('public', 'set_profit_share_settings', array['date', 'numeric', 'numeric'], 'anon', array[]::text[], 'anon cannot execute settings RPC');
select function_privs_are('public', 'create_profit_distribution', array['date', 'date', 'numeric', 'numeric', 'jsonb'], 'anon', array[]::text[], 'anon cannot execute distribution RPC');
select has_constraint('public', 'profit_distributions', 'profit_distributions_period_no_overlap', 'distribution periods have an exclusion constraint');
select has_index('public', 'profit_distributions', 'profit_distributions_period_end_idx', 'distribution history has a descending period-end index');

insert into auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at)
values (
  '11111111-1111-4111-8111-111111111111',
  '00000000-0000-0000-0000-000000000000',
  'authenticated', 'authenticated', 'profit-distribution-test@example.com', '',
  pg_catalog.now(), pg_catalog.now(), pg_catalog.now()
);

set local role anon;
select is(pg_temp.error_code('select count(*) from public.profit_share_settings'), '42501', 'anon cannot read settings');
select is(pg_temp.error_code($$select public.set_profit_share_settings(date '2020-01-01', 50, 50)$$), '42501', 'anon cannot call settings RPC');
select is(pg_temp.error_code($$select public.create_profit_distribution(date '2020-01-01', date '2020-01-01', 50, 50, '{}'::jsonb)$$), '42501', 'anon cannot call distribution RPC');

reset role;
set local role authenticated;
select is(pg_temp.error_code($$select public.set_profit_share_settings(date '2020-01-01', 50, 50)$$), 'P0001', 'settings RPC explicitly rejects a missing auth uid');
select is(pg_temp.error_code($$select public.create_profit_distribution(date '2020-01-01', date '2020-01-01', 50, 50, '{}'::jsonb)$$), 'P0001', 'distribution RPC explicitly rejects a missing auth uid before other validation');
select pg_catalog.set_config('request.jwt.claim.sub', '11111111-1111-4111-8111-111111111111', true);

select lives_ok($$select count(*) from public.profit_share_settings$$, 'authenticated can read settings');
select lives_ok($$select count(*) from public.profit_distributions$$, 'authenticated can read distributions');
select is(pg_temp.error_code($$insert into public.profit_share_settings (opening_date) values (date '2020-01-01')$$), '42501', 'authenticated cannot insert settings directly');
select is(pg_temp.error_code($$update public.profit_share_settings set opening_date = date '2020-01-02'$$), '42501', 'authenticated cannot update settings directly');
select is(pg_temp.error_code($$delete from public.profit_share_settings$$), '42501', 'authenticated cannot delete settings directly');
select is(pg_temp.error_code($$insert into public.profit_distributions (period_start, period_end) values (date '2020-01-01', date '2020-01-01')$$), '42501', 'authenticated cannot insert distributions directly');
select is(pg_temp.error_code($$update public.profit_distributions set period_end = date '2020-01-02'$$), '42501', 'authenticated cannot update distributions directly');
select is(pg_temp.error_code($$delete from public.profit_distributions$$), '42501', 'authenticated cannot delete distributions directly');

select lives_ok($$select public.set_profit_share_settings(date '2020-01-01', 50, 50)$$, 'authenticated can create singleton settings');
select lives_ok($$select public.set_profit_share_settings(date '2020-01-02', 55, 45)$$, 'opening date can change before the first distribution');
select is((select opening_date from public.profit_share_settings where id = 1), date '2020-01-02', 'pre-distribution opening date change is persisted');
select is(pg_temp.error_code($$select public.set_profit_share_settings(date '2020-01-02', 50.001, 49.999)$$), 'P0001', 'settings shares reject more than two decimals');
select is(pg_temp.error_code($$select public.set_profit_share_settings(date '2020-01-02', 60, 41)$$), 'P0001', 'settings shares must total 100');

select lives_ok($$select public.create_profit_distribution(
  date '2020-01-02', date '2020-01-03', 50, 50,
  pg_temp.valid_snapshot(date '2020-01-02', date '2020-01-03')
)$$, 'first distribution starts on the configured opening date');
select is((select period_start from public.profit_distributions order by period_end desc limit 1), date '2020-01-02', 'first persisted period starts on opening date');
select is((select created_by from public.profit_distributions order by period_end desc limit 1), '11111111-1111-4111-8111-111111111111'::uuid, 'distribution records auth.uid as creator');
select is((select calculation_snapshot from public.profit_distributions order by period_end desc limit 1), pg_temp.valid_snapshot(date '2020-01-02', date '2020-01-03'), 'distribution preserves the submitted snapshot exactly');
select is(pg_temp.error_code($$select public.set_profit_share_settings(date '2020-02-01', 55, 45)$$), 'P0001', 'opening date is immutable after the first distribution');
select lives_ok($$select public.set_profit_share_settings(date '2020-01-02', 60, 40)$$, 'default shares remain editable after the first distribution');
select is((select default_operations_share_pct from public.profit_share_settings where id = 1), 60.00::numeric, 'updated default share is persisted');

select lives_ok($$select public.create_profit_distribution(
  date '2020-01-04', date '2020-01-05', 50, 50,
  pg_temp.valid_snapshot(date '2020-01-04', date '2020-01-05', 80, -100)
)$$, 'positive EUR profit allows a negative TRY reference result');
select is((select net_profit_try from public.profit_distributions where period_start = date '2020-01-04'), (-100.00)::numeric, 'negative TRY profit is persisted');
select is((select period_start from public.profit_distributions order by period_end desc limit 1), date '2020-01-04', 'next distribution starts one day after the prior period end');

select is(pg_temp.error_code($$select public.create_profit_distribution(date '2020-01-07', date '2020-01-07', 50, 50, pg_temp.valid_snapshot(date '2020-01-07', date '2020-01-07'))$$), 'P0001', 'a gap after the last distribution is rejected');
select is(pg_temp.error_code($$select public.create_profit_distribution(date '2020-01-05', date '2020-01-06', 50, 50, pg_temp.valid_snapshot(date '2020-01-05', date '2020-01-06'))$$), 'P0001', 'an overlapping expected start is rejected');
select is(pg_temp.error_code($$select public.create_profit_distribution(date '2020-01-04', date '2020-01-05', 50, 50, pg_temp.valid_snapshot(date '2020-01-04', date '2020-01-05'))$$), 'P0001', 'a stale duplicate submission is rejected');
select is(pg_temp.error_code(pg_catalog.format(
  $sql$select public.create_profit_distribution(date '2020-01-06', date %L, 50, 50, pg_temp.valid_snapshot(date '2020-01-06', date %L))$sql$,
  (pg_catalog.now() at time zone 'Europe/Berlin')::date,
  (pg_catalog.now() at time zone 'Europe/Berlin')::date
)), 'P0001', 'a period ending today in Berlin is rejected');
select is(pg_temp.error_code(pg_catalog.format(
  $sql$select public.create_profit_distribution(date '2020-01-06', date %L, 50, 50, pg_temp.valid_snapshot(date '2020-01-06', date %L))$sql$,
  ((pg_catalog.now() at time zone 'Europe/Berlin')::date + 1),
  ((pg_catalog.now() at time zone 'Europe/Berlin')::date + 1)
)), 'P0001', 'a future period end is rejected');
select is(pg_temp.error_code($$select public.create_profit_distribution(date '2020-01-06', date '2020-01-06', 50, 50, pg_temp.valid_snapshot(date '2020-01-06', date '2020-01-06', 0, 100))$$), 'P0001', 'zero EUR profit is rejected');
select is(pg_temp.error_code($$select public.create_profit_distribution(date '2020-01-06', date '2020-01-06', 50, 50, pg_temp.valid_snapshot(date '2020-01-06', date '2020-01-06', -1, 100))$$), 'P0001', 'negative EUR profit is rejected');
select is(pg_temp.error_code($$select public.create_profit_distribution(date '2020-01-06', date '2020-01-06', 50, 50, '{"schema_version": 1}'::jsonb)$$), 'P0001', 'a snapshot missing required fields is rejected');
select is(pg_temp.error_code($$select public.create_profit_distribution(date '2020-01-06', date '2020-01-06', 50.001, 49.999, pg_temp.valid_snapshot(date '2020-01-06', date '2020-01-06', 80, 2300, 50.001, 49.999))$$), 'P0001', 'distribution shares reject more than two decimals');
select is(pg_temp.error_code($$select public.create_profit_distribution(date '2020-01-06', date '2020-01-06', 60, 41, pg_temp.valid_snapshot(date '2020-01-06', date '2020-01-06', 80, 2300, 60, 41))$$), 'P0001', 'distribution shares must total 100');
select is(pg_temp.error_code($$select public.create_profit_distribution(
  date '2020-01-06', date '2020-01-06', 50, 50,
  pg_catalog.jsonb_set(pg_temp.valid_snapshot(date '2020-01-06', date '2020-01-06'), '{total_expense_eur}', '21'::jsonb)
)$$), 'P0001', 'snapshot expense totals must reconcile');
select is(pg_temp.error_code($$select public.create_profit_distribution(date '2020-01-06', date '2020-01-06', 50, 50, pg_temp.valid_snapshot(date '2020-02-01', date '2020-01-06'))$$), 'P0001', 'snapshot period must match RPC period');
select is(pg_temp.error_code($$select public.create_profit_distribution(
  date '2020-01-06', date '2020-01-06', 50, 50,
  pg_catalog.jsonb_set(pg_temp.valid_snapshot(date '2020-01-06', date '2020-01-06'), '{operations_amount_eur}', '39'::jsonb)
)$$), 'P0001', 'partner amounts must reconcile to profit and percentages');
select is(pg_temp.error_code($$select public.create_profit_distribution(
  date '2020-01-06', date '2020-01-06', 50, 50,
  pg_catalog.jsonb_set(pg_temp.valid_snapshot(date '2020-01-06', date '2020-01-06'), '{schema_version}', '2'::jsonb)
)$$), 'P0001', 'unsupported snapshot schema versions are rejected');
select is(pg_temp.error_code($$select public.create_profit_distribution(
  date '2020-01-06', date '2020-01-06', 50, 50,
  pg_catalog.jsonb_set(pg_temp.valid_snapshot(date '2020-01-06', date '2020-01-06'), '{realized_leg_count}', '-1'::jsonb)
)$$), 'P0001', 'negative realized leg counts are rejected');
select is(pg_temp.error_code($$select public.create_profit_distribution(
  date '2020-01-06', date '2020-01-06', 50, 50,
  pg_catalog.jsonb_set(pg_temp.valid_snapshot(date '2020-01-06', date '2020-01-06'), '{resolved_legs}', '{}'::jsonb)
)$$), 'P0001', 'resolved legs must be a JSON array');
select is(pg_temp.error_code($$select public.create_profit_distribution(
  date '2020-01-06', date '2020-01-06', 50, 50,
  pg_catalog.jsonb_set(pg_temp.valid_snapshot(date '2020-01-06', date '2020-01-06'), '{monthly_settings}', '[]'::jsonb)
)$$), 'P0001', 'monthly settings must be a JSON object');

reset role;
select is(pg_temp.error_code($$insert into public.profit_distributions (
  period_start, period_end, operations_share_pct, vehicle_owner_share_pct,
  operations_amount_eur, vehicle_owner_amount_eur, operations_amount_try, vehicle_owner_amount_try,
  income_eur, income_try, vehicle_cost_eur, vehicle_cost_try, supplier_cost_eur, supplier_cost_try,
  airport_cost_eur, airport_cost_try, advertising_cost_eur, advertising_cost_try,
  total_expense_eur, total_expense_try, net_profit_eur, net_profit_try,
  realized_leg_count, calculation_snapshot, created_by
) values (
  date '2020-01-03', date '2020-01-06', 50, 50, 40, 40, 1150, 1150,
  100, 4000, 10, 1000, 5, 500, 2, 100, 3, 100, 20, 1700, 80, 2300, 1,
  pg_temp.valid_snapshot(date '2020-01-03', date '2020-01-06'),
  '11111111-1111-4111-8111-111111111111'
)$$), '23P01', 'exclusion constraint rejects overlapping rows as defense in depth');
select is(pg_temp.error_code($$insert into public.profit_distributions (
  period_start, period_end, operations_share_pct, vehicle_owner_share_pct,
  operations_amount_eur, vehicle_owner_amount_eur, operations_amount_try, vehicle_owner_amount_try,
  income_eur, income_try, vehicle_cost_eur, vehicle_cost_try, supplier_cost_eur, supplier_cost_try,
  airport_cost_eur, airport_cost_try, advertising_cost_eur, advertising_cost_try,
  total_expense_eur, total_expense_try, net_profit_eur, net_profit_try,
  realized_leg_count, calculation_snapshot, created_by
) values (
  date '2020-02-01', date '2020-02-01', 50, 50, 41, 40, 1150, 1150,
  100, 4000, 10, 1000, 5, 500, 2, 100, 3, 100, 20, 1700, 80, 2300, 1,
  pg_temp.valid_snapshot(date '2020-02-01', date '2020-02-01'),
  '11111111-1111-4111-8111-111111111111'
)$$), '23514', 'table constraints reject unreconciled partner amounts');

select is((select count(*) from public.profit_share_settings), 1::bigint, 'settings remains a singleton');
select is((select count(*) from public.profit_distributions), 2::bigint, 'only valid distributions were persisted');
select is((select calculation_snapshot ->> 'schema_version' from public.profit_distributions where period_start = date '2020-01-04'), '1', 'persisted snapshots retain schema version 1');
select is((select operations_amount_eur + vehicle_owner_amount_eur from public.profit_distributions where period_start = date '2020-01-04'), 80.00::numeric, 'persisted EUR partner amounts reconcile exactly');
select is((select operations_amount_try + vehicle_owner_amount_try from public.profit_distributions where period_start = date '2020-01-04'), (-100.00)::numeric, 'persisted TRY partner amounts reconcile exactly');

select * from finish();
rollback;
