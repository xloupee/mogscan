import { profiles as DEFAULT_PROFILES, tier } from "./leaderboard";
import { createSupabaseAdminClient } from "./supabase-admin";

const TABLE = "leaderboard_profiles";

function slugify(input) {
  return String(input || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

function normalizeTraits(traits) {
  if (Array.isArray(traits)) {
    return traits.map((item) => String(item || "").trim()).filter(Boolean);
  }
  return [];
}

function normalizeProfile(item) {
  const score = Number(item.score);
  const traits = normalizeTraits(item.traits);
  const elite = Number.isFinite(Number(item.elite)) ? Number(item.elite) : traits.length;
  const total = Number.isFinite(Number(item.total)) ? Number(item.total) : Math.max(elite, traits.length);

  return {
    id: String(item.id || item.slug || item.name),
    slug: String(item.slug || slugify(item.name || item.id || "profile")),
    name: String(item.name || "Unnamed Profile"),
    image: String(item.image || "").trim(),
    handle: String(item.handle || "").trim() || "new entry",
    rankLabel: String(item.rankLabel || item.rank_label || "").trim() || tier(score),
    score: Number.isFinite(score) ? score : 5,
    elite: Math.max(0, Math.floor(elite)),
    total: Math.max(0, Math.floor(total)),
    traits,
    created_at: item.created_at || new Date().toISOString(),
  };
}

export async function listProfiles() {
  const client = createSupabaseAdminClient();
  if (!client) return DEFAULT_PROFILES.map(normalizeProfile);

  const { data, error } = await client
    .from(TABLE)
    .select("id,slug,name,image,handle,rank_label,score,elite,total,traits,created_at")
    .order("score", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) return DEFAULT_PROFILES.map(normalizeProfile);
  if (!data?.length) return DEFAULT_PROFILES.map(normalizeProfile);

  const merged = new Map();
  for (const item of DEFAULT_PROFILES.map(normalizeProfile)) {
    merged.set(item.slug, item);
  }
  for (const item of data.map(normalizeProfile)) {
    merged.set(item.slug, item);
  }

  return Array.from(merged.values()).sort((a, b) => b.score - a.score);
}

export async function getProfileBySlug(slug) {
  const normalizedSlug = slugify(slug);
  if (!normalizedSlug) return null;

  const client = createSupabaseAdminClient();
  if (!client) {
    return DEFAULT_PROFILES.map(normalizeProfile).find((item) => item.slug === normalizedSlug) || null;
  }

  const { data, error } = await client
    .from(TABLE)
    .select("id,slug,name,image,handle,rank_label,score,elite,total,traits,created_at")
    .eq("slug", normalizedSlug)
    .maybeSingle();

  if (error) {
    return DEFAULT_PROFILES.map(normalizeProfile).find((item) => item.slug === normalizedSlug) || null;
  }
  if (!data) {
    return DEFAULT_PROFILES.map(normalizeProfile).find((item) => item.slug === normalizedSlug) || null;
  }
  return normalizeProfile(data);
}

export async function createProfile(input) {
  const client = createSupabaseAdminClient();
  if (!client) {
    throw new Error("Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  }

  const name = String(input?.name || "").trim();
  const score = Number(input?.score);
  if (!name) throw new Error("Profile name is required.");
  if (!Number.isFinite(score)) throw new Error("Score must be a valid number.");

  const slug = slugify(input?.slug || name);
  const traits = normalizeTraits(input?.traits);
  const elite = Number.isFinite(Number(input?.elite)) ? Number(input.elite) : traits.length;
  const total = Number.isFinite(Number(input?.total)) ? Number(input.total) : Math.max(elite, traits.length);
  const rankLabel = String(input?.rankLabel || "").trim() || tier(score);

  const row = {
    slug,
    name,
    image: String(input?.image || "").trim() || null,
    handle: String(input?.handle || "").trim() || "new entry",
    rank_label: rankLabel,
    score,
    elite: Math.max(0, Math.floor(elite)),
    total: Math.max(0, Math.floor(total)),
    traits,
  };

  const { data, error } = await client
    .from(TABLE)
    .upsert(row, { onConflict: "slug" })
    .select("id,slug,name,image,handle,rank_label,score,elite,total,traits,created_at")
    .single();

  if (error) throw new Error(error.message || "Failed to save profile");
  return normalizeProfile(data);
}

export async function seedDefaultProfiles() {
  const client = createSupabaseAdminClient();
  if (!client) {
    throw new Error("Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  }

  const rows = DEFAULT_PROFILES.map((item) => {
    const normalized = normalizeProfile(item);
    return {
      slug: normalized.slug,
      name: normalized.name,
      image: normalized.image || null,
      handle: normalized.handle || null,
      rank_label: normalized.rankLabel || null,
      score: normalized.score,
      elite: normalized.elite,
      total: normalized.total,
      traits: normalized.traits,
    };
  });

  const { data, error } = await client
    .from(TABLE)
    .upsert(rows, { onConflict: "slug" })
    .select("id");

  if (error) throw new Error(error.message || "Failed to seed profiles");
  return { count: data?.length || 0 };
}
