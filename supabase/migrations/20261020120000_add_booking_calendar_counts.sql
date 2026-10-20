-- Per-day booking counts for the admin timeline's month calendar.
--
-- The calendar used to download pickup/return/end dates for every active
-- booking ever made and count them in the browser. That grew without bound
-- and, past PostgREST's 1000-row cap, silently undercounted. This returns the
-- counts for one date window, with the same rules as the old client code:
-- a booking counts on its pickup date, a round trip also on its return date,
-- and a daily chauffeur hire on every day after pickup through its end date.
--
-- Security invoker: it reads bookings through their RLS, so only admins get
-- rows back.

create or replace function public.booking_calendar_counts(p_from date, p_to date)
returns table (day date, bookings integer)
language sql
stable
security invoker
set search_path = ''
as $$
  with active as (
    select b.pickup_date, b.return_date, b.trip_type, b.service_end_date
    from public.bookings b
    where b.status in ('pending', 'paid', 'confirmed', 'in_transit', 'completed')
      and (
        b.pickup_date between p_from and p_to
        or (b.trip_type = 'round_trip' and b.return_date between p_from and p_to)
        or (b.trip_type = 'daily_chauffeur' and b.service_end_date >= p_from and b.pickup_date <= p_to)
      )
  ),
  booked_days as (
    select pickup_date as day from active
    union all
    select return_date from active
    where trip_type = 'round_trip' and return_date is not null
    union all
    select hire_day::date
    from active,
      generate_series((pickup_date + 1)::timestamp, service_end_date::timestamp, interval '1 day') as hire_day
    where trip_type = 'daily_chauffeur' and service_end_date is not null
  )
  select day, count(*)::integer
  from booked_days
  where day between p_from and p_to
  group by day
  order by day;
$$;

revoke all on function public.booking_calendar_counts(date, date) from public, anon;
grant execute on function public.booking_calendar_counts(date, date) to authenticated;
