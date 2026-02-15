import { createSupabaseAdminClient } from "./supabase-admin";
import { DEFAULT_NEWS_POSTS, extractTweetId, normalizePost } from "./news-posts";

const TABLE = "news_posts";

export function isSupabaseConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export async function listNewsPosts() {
  const client = createSupabaseAdminClient();
  if (!client) {
    return DEFAULT_NEWS_POSTS.map(normalizePost);
  }

  const { data, error } = await client
    .from(TABLE)
    .select("id,tweet_id,url,author,avatar,summary,created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    throw new Error(error.message || "Failed to fetch posts");
  }

  const normalized = (data || []).map(normalizePost).filter((item) => item.tweet_id && item.url);
  return normalized.length ? normalized : DEFAULT_NEWS_POSTS.map(normalizePost);
}

export async function createNewsPost({ url, summary, author, avatar }) {
  const client = createSupabaseAdminClient();
  if (!client) {
    throw new Error("Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  }

  const tweetId = extractTweetId(url);
  if (!tweetId) {
    throw new Error("Invalid tweet URL. Expected an X/Twitter status URL.");
  }

  const payload = normalizePost({
    tweet_id: tweetId,
    url,
    summary,
    author,
    avatar,
  });

  const insertRow = {
    tweet_id: payload.tweet_id,
    url: payload.url,
    author: payload.author,
    avatar: payload.avatar,
    summary: payload.summary,
  };

  const { data, error } = await client
    .from(TABLE)
    .upsert(insertRow, { onConflict: "tweet_id" })
    .select("id,tweet_id,url,author,avatar,summary,created_at")
    .single();

  if (error) {
    throw new Error(error.message || "Failed to save post");
  }

  return normalizePost(data);
}
