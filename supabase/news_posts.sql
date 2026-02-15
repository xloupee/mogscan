create table if not exists public.news_posts (
  id uuid primary key default gen_random_uuid(),
  tweet_id text not null unique,
  url text not null,
  author text not null,
  avatar text,
  summary text,
  created_at timestamptz not null default now()
);

create index if not exists news_posts_created_at_idx on public.news_posts (created_at desc);
