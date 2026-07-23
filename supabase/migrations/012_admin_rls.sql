-- Restrict UPDATE to status column only at DB level
REVOKE UPDATE ON bookings FROM authenticated;
GRANT UPDATE (status) ON bookings TO authenticated;

-- Allow authenticated users to read all bookings
CREATE POLICY "admin_read_bookings" ON bookings
  FOR SELECT TO authenticated USING (true);

-- Allow authenticated users to update (column-level grant limits to status)
CREATE POLICY "admin_update_bookings" ON bookings
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- booking_notes: read and append only (table already exists, RLS already enabled)
CREATE POLICY "admin_read_notes" ON booking_notes
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "admin_insert_notes" ON booking_notes
  FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM bookings WHERE id = booking_id));
