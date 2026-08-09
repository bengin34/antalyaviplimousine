-- Admin users may permanently remove test or incorrectly created bookings.
-- Related booking notes and distance overrides are removed by their existing
-- ON DELETE CASCADE foreign keys.
GRANT DELETE ON bookings TO authenticated;

CREATE POLICY "admin_delete_bookings" ON bookings
  FOR DELETE TO authenticated USING (true);
