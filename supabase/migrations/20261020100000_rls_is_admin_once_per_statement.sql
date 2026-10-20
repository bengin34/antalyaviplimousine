-- Evaluate the admin check once per statement instead of once per row.
--
-- is_admin() is `set search_path = ''`, which keeps Postgres from inlining it,
-- so a bare `using (public.is_admin())` runs the function - and its lookup on
-- admin_users - for every row the query scans. Wrapped in a scalar subquery it
-- becomes an InitPlan: computed once, reused for every row. The funnel report
-- (site_funnel_summary is security invoker) hit this hardest, one call per
-- page-view row in site_events, and every embedded booking_notes /
-- chauffeur_hire_days row multiplied it again on the admin timeline.
--
-- Same predicate, same result; only the plan changes. Policies that are
-- `using (true)` or already wrap auth.uid() are left alone.

-- bookings
alter policy "admin_read_bookings" on public.bookings
  using ((select public.is_admin()));
alter policy "admin_insert_bookings" on public.bookings
  with check ((select public.is_admin()));
alter policy "admin_update_bookings" on public.bookings
  using ((select public.is_admin())) with check ((select public.is_admin()));
alter policy "admin_delete_bookings" on public.bookings
  using ((select public.is_admin()));

-- booking_notes
alter policy "admin_read_notes" on public.booking_notes
  using ((select public.is_admin()));
alter policy "admin_insert_notes" on public.booking_notes
  with check ((select public.is_admin()) and exists (select 1 from public.bookings where bookings.id = booking_notes.booking_id));

-- chauffeur_hire_days
alter policy "admin_read_chauffeur_hire_days" on public.chauffeur_hire_days
  using ((select public.is_admin()));
alter policy "admin_insert_chauffeur_hire_days" on public.chauffeur_hire_days
  with check ((select public.is_admin()));
alter policy "admin_update_chauffeur_hire_days" on public.chauffeur_hire_days
  using ((select public.is_admin())) with check ((select public.is_admin()));
alter policy "admin_delete_chauffeur_hire_days" on public.chauffeur_hire_days
  using ((select public.is_admin()));

-- tariffs
alter policy "admin_update_routes" on public.routes
  using ((select public.is_admin())) with check ((select public.is_admin()));
alter policy "admin_update_chauffeur_service_rates" on public.chauffeur_service_rates
  using ((select public.is_admin())) with check ((select public.is_admin()));
alter policy "admin_update_land_of_legends_rates" on public.land_of_legends_rates
  using ((select public.is_admin())) with check ((select public.is_admin()));

-- profit & loss
alter policy "admin_read_profit_loss_settings" on public.profit_loss_settings
  using ((select public.is_admin()));
alter policy "admin_insert_profit_loss_settings" on public.profit_loss_settings
  with check ((select public.is_admin()));
alter policy "admin_update_profit_loss_settings" on public.profit_loss_settings
  using ((select public.is_admin())) with check ((select public.is_admin()));
alter policy "admin_read_profit_loss_distance_overrides" on public.profit_loss_distance_overrides
  using ((select public.is_admin()));
alter policy "admin_insert_profit_loss_distance_overrides" on public.profit_loss_distance_overrides
  with check ((select public.is_admin()));
alter policy "admin_update_profit_loss_distance_overrides" on public.profit_loss_distance_overrides
  using ((select public.is_admin())) with check ((select public.is_admin()));
alter policy profit_share_settings_authenticated_read on public.profit_share_settings
  using ((select public.is_admin()));
alter policy profit_distributions_authenticated_read on public.profit_distributions
  using ((select public.is_admin()));

-- usage and analytics
alter policy flight_api_usage_authenticated_read on public.flight_api_usage
  using ((select public.is_admin()));
alter policy site_events_authenticated_read on public.site_events
  using ((select public.is_admin()));
