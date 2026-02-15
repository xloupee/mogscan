create table if not exists public.site_settings (
  id integer primary key,
  coin_address text not null,
  updated_at timestamptz not null default now()
);

insert into public.site_settings (id, coin_address)
values (1, '0x0000000000000000000000000000000000000000')
on conflict (id) do nothing;
