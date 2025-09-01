-- Insert default ticket types for iSMIT 2026
insert into public.ticket_types (name, description, price, currency, max_quantity, available_from, available_until, is_active) values
  (
    'iSMIT Member & Associated Organizations',
    'Registration for members of iSMIT and other associated organizations',
    210.00,
    'EUR',
    500,
    '2026-02-01 00:00:00+00',
    '2026-11-15 23:59:59+00',
    true
  ),
  (
    'Non-Member: Surgeon/Physician',
    'Registration for non-member surgeons and physicians',
    420.00,
    'EUR',
    1000,
    '2026-02-01 00:00:00+00',
    '2026-11-15 23:59:59+00',
    true
  ),
  (
    'Non-Member: Engineer/Scientist',
    'Registration for non-member engineers and scientists',
    360.00,
    'EUR',
    500,
    '2026-02-01 00:00:00+00',
    '2026-11-15 23:59:59+00',
    true
  ),
  (
    'Student & Resident',
    'Discounted registration for students and residents (proof of status required)',
    150.00,
    'EUR',
    300,
    '2026-02-01 00:00:00+00',
    '2026-11-15 23:59:59+00',
    true
  )
on conflict (name) do update set
  description = excluded.description,
  price = excluded.price,
  currency = excluded.currency,
  max_quantity = excluded.max_quantity,
  available_from = excluded.available_from,
  available_until = excluded.available_until,
  is_active = excluded.is_active;