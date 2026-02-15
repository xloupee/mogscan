# Supabase News Setup

## 1. Create table
Run `supabase/news_posts.sql` in your Supabase SQL editor.

## 2. Set environment variables
Copy `.env.example` to `.env.local` and fill:
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `DASHBOARD_ADMIN_KEY` (recommended)

## 3. Use dashboard
Open `/dashboard` and submit a tweet URL.

## 4. News updates
Open `/news` and refresh; posts come from Supabase.
