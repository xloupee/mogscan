create table if not exists public.leaderboard_profiles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  image text,
  handle text,
  rank_label text,
  score numeric not null,
  elite integer not null default 0,
  total integer not null default 0,
  traits text[] not null default '{}',
  created_at timestamptz not null default now()
);

create index if not exists leaderboard_profiles_score_idx on public.leaderboard_profiles (score desc);
create index if not exists leaderboard_profiles_created_at_idx on public.leaderboard_profiles (created_at desc);
