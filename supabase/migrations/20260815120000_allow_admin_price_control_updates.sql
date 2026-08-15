-- Admin Price Control Center: let signed-in admins edit live transfer and
-- daily chauffeur prices directly, restricted to the price columns only.
REVOKE UPDATE ON routes FROM authenticated;
GRANT UPDATE (price_eur) ON routes TO authenticated;
CREATE POLICY "admin_update_routes" ON routes
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

REVOKE UPDATE ON chauffeur_service_rates FROM authenticated;
GRANT UPDATE (daily_rate_eur, updated_at) ON chauffeur_service_rates TO authenticated;
CREATE POLICY "admin_update_chauffeur_service_rates" ON chauffeur_service_rates
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
