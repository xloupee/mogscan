import { createSupabaseAdminClient } from "./supabase-admin";

export const DEFAULT_COIN_ADDRESS = "0x0000000000000000000000000000000000000000";
const TABLE = "site_settings";
const SETTINGS_ROW_ID = 1;

function normalizeCoinAddress(value) {
  const trimmed = String(value || "").trim();
  return trimmed || DEFAULT_COIN_ADDRESS;
}

export async function getCoinAddress() {
  const client = createSupabaseAdminClient();
  if (!client) {
    return {
      coinAddress: DEFAULT_COIN_ADDRESS,
      source: "fallback",
    };
  }

  const { data, error } = await client
    .from(TABLE)
    .select("coin_address")
    .eq("id", SETTINGS_ROW_ID)
    .maybeSingle();

  if (error) {
    return {
      coinAddress: DEFAULT_COIN_ADDRESS,
      source: "fallback",
    };
  }

  return {
    coinAddress: normalizeCoinAddress(data?.coin_address),
    source: "supabase",
  };
}

export async function updateCoinAddress(coinAddress) {
  const client = createSupabaseAdminClient();
  if (!client) {
    throw new Error("Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  }

  const normalized = normalizeCoinAddress(coinAddress);

  const { data, error } = await client
    .from(TABLE)
    .upsert(
      {
        id: SETTINGS_ROW_ID,
        coin_address: normalized,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    )
    .select("coin_address")
    .single();

  if (error) {
    throw new Error(error.message || "Failed to update coin address");
  }

  return {
    coinAddress: normalizeCoinAddress(data?.coin_address),
    source: "supabase",
  };
}

