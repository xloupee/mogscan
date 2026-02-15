import { NextResponse } from "next/server";
import { getCoinAddress, updateCoinAddress } from "../../lib/site-settings";

export async function GET() {
  try {
    const setting = await getCoinAddress();
    return NextResponse.json(setting);
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to load settings" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const coinAddress = String(body?.coinAddress || "").trim();

    if (!coinAddress) {
      return NextResponse.json({ error: "Coin address is required" }, { status: 400 });
    }

    const setting = await updateCoinAddress(coinAddress);
    return NextResponse.json(setting);
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to update settings" }, { status: 400 });
  }
}

