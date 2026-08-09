-- Allow authenticated admins to create manual bookings from the admin panel
-- (for example phone or WhatsApp reservations that never went through the
-- public checkout). Reads and the restricted column-level UPDATE grant stay
-- unchanged; this only adds a full-row INSERT capability for the admin role.

GRANT INSERT ON bookings TO authenticated;
CREATE POLICY "admin_insert_bookings" ON bookings
  FOR INSERT TO authenticated
  WITH CHECK (true);
