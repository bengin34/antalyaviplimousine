-- Manual bookings are created without an e-mail or pick-up address, so admins
-- need to be able to fill in and correct those two fields later from the
-- booking detail screen. Extend the column-level UPDATE grant accordingly;
-- every other booking column stays read-only for the authenticated role.

REVOKE UPDATE ON bookings FROM authenticated;
GRANT UPDATE (status, price_eur, hotel_name, customer_email, pickup_address) ON bookings TO authenticated;
