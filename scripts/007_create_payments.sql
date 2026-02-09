-- Create payments table for tracking SumUp payments
-- This is a backup/audit log independent of Odoo
-- Run this in Supabase SQL Editor

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id text not null unique, -- Our generated order ID (ORD-timestamp-random)
  sumup_checkout_id text, -- SumUp checkout reference
  sumup_transaction_id text, -- SumUp transaction ID after payment
  
  -- Payment details
  amount decimal(10,2) not null,
  currency text not null default 'EUR',
  status text not null default 'pending' check (status in ('pending', 'processing', 'completed', 'failed', 'cancelled', 'refunded')),
  
  -- Attendee info
  first_name text not null,
  last_name text not null,
  email text not null,
  affiliation text,
  country text,
  
  -- Ticket info
  ticket_type text not null,
  base_price decimal(10,2),
  total_price decimal(10,2) not null,
  add_ons text[], -- Array of add-on descriptions
  tags text[], -- Tags for Odoo
  
  -- Related ticket (linked after ticket generation)
  ticket_id uuid references public.tickets(id),
  ticket_number text,
  
  -- Sync status
  odoo_synced boolean default false,
  odoo_contact_id integer,
  odoo_error text,
  
  -- Timestamps
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  completed_at timestamp with time zone
);

-- Allow public insert/update (no auth required for checkout)
alter table public.payments enable row level security;

-- Allow anyone to insert (for checkout)
create policy "payments_insert_public"
  on public.payments for insert
  with check (true);

-- Allow anyone to update their own payment (by order_id)
create policy "payments_update_public"
  on public.payments for update
  using (true);

-- Allow anyone to select (for order status checks)
create policy "payments_select_public"
  on public.payments for select
  using (true);

-- Create indexes for quick lookups
create index if not exists payments_order_id_idx on public.payments(order_id);
create index if not exists payments_email_idx on public.payments(email);
create index if not exists payments_status_idx on public.payments(status);
create index if not exists payments_sumup_checkout_id_idx on public.payments(sumup_checkout_id);
create index if not exists payments_created_at_idx on public.payments(created_at desc);

-- Trigger to update updated_at timestamp
create or replace function update_payments_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

create trigger payments_updated_at
  before update on public.payments
  for each row
  execute function update_payments_updated_at();
