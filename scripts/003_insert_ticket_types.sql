-- Insert default ticket types for iSMIT 2026
insert into public.ticket_types (name, description, price, currency, max_quantity, available_from, available_until, is_active) values
  (
    'Early Bird Registration',
    'Early bird registration for iSMIT 2026 conference (valid until May 31, 2026)',
    299.00,
    'EUR',
    500,
    '2026-02-01 00:00:00+00',
    '2026-05-31 23:59:59+00',
    true
  ),
  (
    'Regular Registration',
    'Regular registration for iSMIT 2026 conference',
    399.00,
    'EUR',
    1000,
    '2026-06-01 00:00:00+00',
    '2026-10-31 23:59:59+00',
    true
  ),
  (
    'Student Registration',
    'Discounted registration for students (proof of enrollment required)',
    199.00,
    'EUR',
    200,
    '2026-02-01 00:00:00+00',
    '2026-10-31 23:59:59+00',
    true
  ),
  (
    'Workshop Add-on',
    'Additional workshop access (can be added to any registration)',
    99.00,
    'EUR',
    100,
    '2026-02-01 00:00:00+00',
    '2026-11-15 23:59:59+00',
    true
  )
on conflict do nothing;
