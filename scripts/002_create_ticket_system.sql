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
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create orders table
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  total_amount decimal(10,2) not null,
  currency text not null default 'EUR',
  status text not null default 'pending' check (status in ('pending', 'paid', 'cancelled', 'refunded')),
  payment_intent_id text,
  payment_method text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create order items table
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade not null,
  ticket_type_id uuid references public.ticket_types(id) not null,
  quantity integer not null default 1,
  unit_price decimal(10,2) not null,
  total_price decimal(10,2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create payments table for tracking payment details
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade not null,
  amount decimal(10,2) not null,
  currency text not null default 'EUR',
  status text not null default 'pending' check (status in ('pending', 'completed', 'failed', 'cancelled')),
  payment_provider text not null default 'sumup',
  transaction_id text,
  payment_data jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on all tables
alter table public.ticket_types enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.payments enable row level security;

-- RLS policies for ticket_types (public read access)
create policy "ticket_types_select_all"
  on public.ticket_types for select
  using (true);

-- RLS policies for orders (users can only see their own orders)
create policy "orders_select_own"
  on public.orders for select
  using (auth.uid() = user_id);

create policy "orders_insert_own"
  on public.orders for insert
  with check (auth.uid() = user_id);

create policy "orders_update_own"
  on public.orders for update
  using (auth.uid() = user_id);

-- RLS policies for order_items (users can only see items from their own orders)
create policy "order_items_select_own"
  on public.order_items for select
  using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

create policy "order_items_insert_own"
  on public.order_items for insert
  with check (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

-- RLS policies for payments (users can only see payments for their own orders)
create policy "payments_select_own"
  on public.payments for select
  using (
    exists (
      select 1 from public.orders
      where orders.id = payments.order_id
      and orders.user_id = auth.uid()
    )
  );

create policy "payments_insert_own"
  on public.payments for insert
  with check (
    exists (
      select 1 from public.orders
      where orders.id = payments.order_id
      and orders.user_id = auth.uid()
    )
  );

create policy "payments_update_own"
  on public.payments for update
  using (
    exists (
      select 1 from public.orders
      where orders.id = payments.order_id
      and orders.user_id = auth.uid()
    )
  );
