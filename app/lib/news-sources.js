import { createSupabaseAdminClient } from "./supabase-admin";

const TABLE = "trusted_sources";

export const DEFAULT_NEWS_SOURCES = [
  {
    id: "clavicular-hub",
    title: "Clavicular Hub 🎬 (@ClavicularHub) on X",
    href: "https://x.com/ClavicularHub",
    avatar: "https://unavatar.io/x/ClavicularHub",
    summary: "NOT IMPERSONATING CLAVICULAR | The #1 RANKED CHAD news source for updates relating to @clavicular0",
    created_at: "2026-02-10T00:00:00.000Z",
  },
  {
    id: "gotclippd",
    title: "Clippd (@gotclippd) on X",
    href: "https://x.com/gotclippd",
    avatar: "https://unavatar.io/x/gotclippd",
    summary: "streamer content - not impersonating anyone",
    created_at: "2026-02-11T00:00:00.000Z",
  },
];

function extractHandle(url) {
  const match = String(url || "").match(/x\.com\/([A-Za-z0-9_]+)/i);
  return match?.[1] || null;
}

function normalizeSource(item) {
  const href = String(item.href || "").trim();
  const handle = extractHandle(href);
  return {
    id: String(item.id || href),
    title: String(item.title || "").trim() || (handle ? `${handle} (@${handle}) on X` : "X Account"),
    href,
    avatar: String(item.avatar || "").trim() || (handle ? `https://unavatar.io/x/${handle}` : ""),
    summary: String(item.summary || "").trim() || "Latest updates from this source.",
    created_at: item.created_at || new Date().toISOString(),
  };
}

export function isValidSourceUrl(url) {
  return /^https?:\/\/(x|twitter)\.com\/[A-Za-z0-9_]+\/?$/i.test(String(url || "").trim());
}

export async function listNewsSources() {
  const client = createSupabaseAdminClient();
  if (!client) {
    return DEFAULT_NEWS_SOURCES.map(normalizeSource);
  }

  const { data, error } = await client
    .from(TABLE)
    .select("id,title,href,avatar,summary,created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    return DEFAULT_NEWS_SOURCES.map(normalizeSource);
  }

  const normalized = (data || []).map(normalizeSource).filter((item) => item.href);
  return normalized.length ? normalized : DEFAULT_NEWS_SOURCES.map(normalizeSource);
}

export async function createNewsSource({ href, title, avatar, summary }) {
  const client = createSupabaseAdminClient();
  if (!client) {
    throw new Error("Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  }

  if (!isValidSourceUrl(href)) {
    throw new Error("Invalid source URL. Expected an X profile URL like https://x.com/username");
  }

  const normalized = normalizeSource({ href, title, avatar, summary });

  const { data, error } = await client
    .from(TABLE)
    .upsert(
      {
        href: normalized.href,
        title: normalized.title,
        avatar: normalized.avatar,
        summary: normalized.summary,
      },
      { onConflict: "href" }
    )
    .select("id,title,href,avatar,summary,created_at")
    .single();

  if (error) {
    throw new Error(error.message || "Failed to save source");
  }

  return normalizeSource(data);
}

