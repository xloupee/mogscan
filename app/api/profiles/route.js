import { NextResponse } from "next/server";
import { createProfile, listProfiles } from "../../lib/profiles-store";

export async function GET() {
  try {
    const profiles = await listProfiles();
    return NextResponse.json({ profiles });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to load profiles" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const profile = await createProfile(body);
    return NextResponse.json({ profile }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to save profile" }, { status: 400 });
  }
}

