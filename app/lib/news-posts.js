export const DEFAULT_NEWS_POSTS = [
  {
    id: "2022128828320219185",
    tweet_id: "2022128828320219185",
    url: "https://x.com/Kick_Champ/status/2022128828320219185",
    author: "KickChamp👑 (@Kick_Champ)",
    avatar: "https://unavatar.io/x/Kick_Champ",
    summary:
      "Clavicular is officially hosting the FRAME MOG CHAMPIONSHIP between the ASU Frat Leader and Androgenic this Saturday at 7:00 PM EST.",
    created_at: "2026-02-10T00:00:00.000Z",
  },
  {
    id: "2022169194125725990",
    tweet_id: "2022169194125725990",
    url: "https://x.com/AutismCapital/status/2022169194125725990?s=20",
    author: "Autism Capital (@AutismCapital)",
    avatar: "https://unavatar.io/x/AutismCapital",
    summary: "Status update from Autism Capital.",
    created_at: "2026-02-11T00:00:00.000Z",
  },
  {
    id: "2022375826948497784",
    tweet_id: "2022375826948497784",
    url: "https://x.com/PresidentToguro/status/2022375826948497784?s=20",
    author: "President-Elect Toguro (@PresidentToguro)",
    avatar: "https://unavatar.io/x/PresidentToguro",
    summary:
      "Clavicular gets BRUTALLY selfiemogged by the baldmaxxing goblinchad William Banks causing a HYPER SPIKE in his cortisol levels.",
    created_at: "2026-02-12T00:00:00.000Z",
  },
];

export function extractTweetId(url) {
  const match = String(url || "").match(/status\/(\d{8,})/);
  return match?.[1] || null;
}

export function extractHandle(url) {
  const match = String(url || "").match(/x\.com\/([A-Za-z0-9_]+)/i);
  return match?.[1] || null;
}

export function normalizePost(post) {
  const url = String(post.url || "").trim();
  const tweetId = post.tweet_id || extractTweetId(url);
  const handle = extractHandle(url);
  const author = String(post.author || "").trim() || (handle ? `${handle} (@${handle})` : "Unknown author");
  const avatar = String(post.avatar || "").trim() || (handle ? `https://unavatar.io/x/${handle}` : "");

  return {
    id: String(post.id || tweetId || url),
    tweet_id: String(tweetId || ""),
    url,
    author,
    avatar,
    summary: String(post.summary || "").trim(),
    created_at: post.created_at || new Date().toISOString(),
  };
}
