create table if not exists public.trusted_sources (
  id uuid primary key default gen_random_uuid(),
  href text not null unique,
  title text not null,
  avatar text,
  summary text,
  created_at timestamptz not null default now()
);
