import { NextResponse } from "next/server";

function toMediaPayload(id, payload) {
  const text = String(payload?.text || "").trim();
  const detail = Array.isArray(payload?.mediaDetails) ? payload.mediaDetails[0] : null;
  if (!detail) {
    return { type: "none", text };
  }

  if (detail.type === "photo") {
    return {
      type: "photo",
      imageUrl: detail.media_url_https || detail.media_url || "",
      alt: payload?.text || "Tweet image",
      text,
    };
  }

  if (detail.type === "video" || detail.type === "animated_gif") {
    const variants = Array.isArray(detail.video_info?.variants) ? detail.video_info.variants : [];
    const mp4 = variants
      .filter((variant) => variant?.content_type === "video/mp4" && variant?.url)
      .sort((a, b) => (b.bitrate || 0) - (a.bitrate || 0))[0];

    return {
      type: "video",
      videoUrl: mp4?.url || "",
      poster: detail.media_url_https || detail.media_url || "",
      fallbackUrl: `https://x.com/i/videos/tweet/${id}`,
      text,
    };
  }

  return { type: "none", text };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id || !/^\d+$/.test(id)) {
    return NextResponse.json({ error: "Invalid tweet id" }, { status: 400 });
  }

  try {
    const token = `${Date.now()}`;
    const endpoint = `https://cdn.syndication.twimg.com/tweet-result?id=${id}&lang=en&token=${token}`;

    const response = await fetch(endpoint, {
      cache: "no-store",
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    if (!response.ok) {
      throw new Error(`Syndication request failed with ${response.status}`);
    }

    const payload = await response.json();
    const media = toMediaPayload(id, payload);

    return NextResponse.json(media, {
      status: 200,
      headers: { "Cache-Control": "public, max-age=300" },
    });
  } catch {
    return NextResponse.json({ type: "none", text: "" }, { status: 200 });
  }
}
