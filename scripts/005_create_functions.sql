-- Function to calculate order total
create or replace function public.calculate_order_total(order_uuid uuid)
returns decimal(10,2)
language plpgsql
security definer
as $$
declare
  total decimal(10,2);
begin
  select coalesce(sum(total_price), 0)
  into total
  from public.order_items
  where order_id = order_uuid;
  
  return total;
end;
$$;

-- Function to update order total when items change
create or replace function public.update_order_total()
returns trigger
language plpgsql
security definer
as $$
begin
  if TG_OP = 'DELETE' then
    update public.orders
    set total_amount = public.calculate_order_total(OLD.order_id),
        updated_at = now()
    where id = OLD.order_id;
    return OLD;
  else
    update public.orders
    set total_amount = public.calculate_order_total(NEW.order_id),
        updated_at = now()
    where id = NEW.order_id;
    return NEW;
  end if;
end;
$$;

-- Create trigger to auto-update order totals
drop trigger if exists update_order_total_trigger on public.order_items;
create trigger update_order_total_trigger
  after insert or update or delete on public.order_items
  for each row
  execute function public.update_order_total();

-- Function to update updated_at timestamp
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  NEW.updated_at = timezone('utc'::text, now());
  return NEW;
end;
$$;

-- Create triggers for updated_at
drop trigger if exists update_profiles_updated_at on public.profiles;
create trigger update_profiles_updated_at
  before update on public.profiles
  for each row
  execute function public.update_updated_at_column();

drop trigger if exists update_orders_updated_at on public.orders;
create trigger update_orders_updated_at
  before update on public.orders
  for each row
  execute function public.update_updated_at_column();

drop trigger if exists update_ticket_types_updated_at on public.ticket_types;
create trigger update_ticket_types_updated_at
  before update on public.ticket_types
  for each row
  execute function public.update_updated_at_column();
