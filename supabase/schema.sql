-- Salvataggio condiviso del cruscotto Giappone 2026.
-- Uno stato JSON per "codice viaggio". La tabella non è leggibile direttamente:
-- si passa solo dalle due funzioni, che richiedono il codice (salvato come hash).

create table if not exists public.trip_state (
  code_hash  text primary key,
  data       jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.trip_state enable row level security;
revoke all on table public.trip_state from anon, authenticated;

create or replace function public.get_trip_state(p_code text)
returns jsonb
language sql
security definer
set search_path = public
as $$
  select data from public.trip_state
  where code_hash = encode(sha256(convert_to(p_code, 'UTF8')), 'hex');
$$;

create or replace function public.save_trip_state(p_code text, p_data jsonb)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_code is null or length(p_code) < 8 then
    raise exception 'codice troppo corto';
  end if;
  if pg_column_size(p_data) > 200000 then
    raise exception 'dati troppo grandi';
  end if;
  insert into public.trip_state (code_hash, data, updated_at)
  values (encode(sha256(convert_to(p_code, 'UTF8')), 'hex'), p_data, now())
  on conflict (code_hash) do update set data = excluded.data, updated_at = now();
end;
$$;

revoke all on function public.get_trip_state(text) from public;
revoke all on function public.save_trip_state(text, jsonb) from public;
grant execute on function public.get_trip_state(text) to anon, authenticated;
grant execute on function public.save_trip_state(text, jsonb) to anon, authenticated;
