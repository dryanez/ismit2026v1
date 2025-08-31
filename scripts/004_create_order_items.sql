-- Create order items table
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade not null,
  ticket_type_id uuid references public.ticket_types(id) on delete restrict not null,
  quantity integer not null default 1 check (quantity > 0),
  unit_price decimal(10,2) not null,
  total_price decimal(10,2) not null,
  attendee_first_name text,
  attendee_last_name text,
  attendee_email text,
  attendee_organization text,
  dietary_requirements text,
  special_needs text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.order_items enable row level security;

-- Create policies
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

create policy "order_items_update_own"
  on public.order_items for update
  using (
    exists (
      select 1 from public.orders 
      where orders.id = order_items.order_id 
      and orders.user_id = auth.uid()
    )
  );

-- Create indexes
create index if not exists order_items_order_id_idx on public.order_items(order_id);
create index if not exists order_items_ticket_type_id_idx on public.order_items(ticket_type_id);
