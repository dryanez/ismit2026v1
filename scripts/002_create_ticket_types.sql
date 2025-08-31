-- Create ticket types table
create table if not exists public.ticket_types (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price decimal(10,2) not null,
  currency text not null default 'EUR',
  max_quantity integer,
  available_from timestamp with time zone,
  available_until timestamp with time zone,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.ticket_types enable row level security;

-- Create policies (ticket types are public read-only)
create policy "ticket_types_select_all"
  on public.ticket_types for select
  using (is_active = true);

-- Insert default ticket types
insert into public.ticket_types (name, description, price, currency, max_quantity, available_until) values
  ('Early Bird Registration', 'Early bird pricing available until May 31, 2026', 450.00, 'EUR', 100, '2026-05-31 23:59:59+00'),
  ('Regular Registration', 'Standard conference registration', 550.00, 'EUR', 200, '2026-10-31 23:59:59+00'),
  ('Student Registration', 'Discounted rate for students (ID required)', 250.00, 'EUR', 50, '2026-10-31 23:59:59+00'),
  ('Day Pass - Day 1', 'Single day access for November 19, 2026', 200.00, 'EUR', 75, '2026-11-19 23:59:59+00'),
  ('Day Pass - Day 2', 'Single day access for November 20, 2026', 200.00, 'EUR', 75, '2026-11-20 23:59:59+00'),
  ('Day Pass - Day 3', 'Single day access for November 21, 2026', 200.00, 'EUR', 75, '2026-11-21 23:59:59+00');
