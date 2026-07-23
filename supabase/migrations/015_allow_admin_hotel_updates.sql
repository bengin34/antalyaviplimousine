-- Allow authenticated admins to correct the hotel/accommodation name while
-- keeping all unrelated booking fields read-only.
REVOKE UPDATE ON bookings FROM authenticated;
GRANT UPDATE (status, price_eur, hotel_name) ON bookings TO authenticated;
