import { NextResponse } from "next/server";
import { seedDefaultProfiles } from "../../../lib/profiles-store";

export async function POST() {
  try {
    const result = await seedDefaultProfiles();
    return NextResponse.json({ ok: true, count: result.count });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to seed profiles" }, { status: 400 });
  }
}

