import { NextResponse } from "next/server";
import { createNewsPost, isSupabaseConfigured, listNewsPosts } from "../../lib/news-store";

export async function GET() {
  try {
    const posts = await listNewsPosts();
    return NextResponse.json({ posts, source: isSupabaseConfigured() ? "supabase" : "fallback" });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to load posts" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const url = String(body?.url || "").trim();

    if (!url) {
      return NextResponse.json({ error: "Tweet URL is required" }, { status: 400 });
    }

    const post = await createNewsPost({
      url,
      summary: "",
      author: "",
      avatar: "",
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to save post" }, { status: 400 });
  }
}
