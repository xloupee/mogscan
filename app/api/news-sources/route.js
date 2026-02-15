import { NextResponse } from "next/server";
import { createNewsSource, listNewsSources } from "../../lib/news-sources";

export async function GET() {
  try {
    const sources = await listNewsSources();
    return NextResponse.json({ sources });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to load sources" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const href = String(body?.href || "").trim();

    if (!href) {
      return NextResponse.json({ error: "Source URL is required" }, { status: 400 });
    }

    const source = await createNewsSource({
      href,
      title: body?.title || "",
      avatar: body?.avatar || "",
      summary: body?.summary || "",
    });

    return NextResponse.json({ source }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to save source" }, { status: 400 });
  }
}

