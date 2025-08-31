-- Create orders table
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  total_amount decimal(10,2) not null,
  currency text not null default 'EUR',
  status text not null default 'pending' check (status in ('pending', 'processing', 'completed', 'failed', 'cancelled', 'refunded')),
  payment_method text,
  payment_id text, -- SumUp transaction ID
  payment_status text,
  billing_first_name text,
  billing_last_name text,
  billing_email text,
  billing_phone text,
  billing_organization text,
  billing_address text,
  billing_city text,
  billing_postal_code text,
  billing_country text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.orders enable row level security;

-- Create policies
create policy "orders_select_own"
  on public.orders for select
  using (auth.uid() = user_id);

create policy "orders_insert_own"
  on public.orders for insert
  with check (auth.uid() = user_id);

create policy "orders_update_own"
  on public.orders for update
  using (auth.uid() = user_id);

-- Create indexes
create index if not exists orders_user_id_idx on public.orders(user_id);
create index if not exists orders_status_idx on public.orders(status);
create index if not exists orders_payment_id_idx on public.orders(payment_id);
