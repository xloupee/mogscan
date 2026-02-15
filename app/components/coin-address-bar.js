"use client";

import { useEffect, useState } from "react";
import { DEFAULT_COIN_ADDRESS } from "../lib/site-settings";

export default function CoinAddressBar() {
  const [coinAddress, setCoinAddress] = useState(DEFAULT_COIN_ADDRESS);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const response = await fetch("/api/site-settings", { cache: "no-store" });
        const data = await response.json();
        if (!response.ok) return;
        if (mounted && data?.coinAddress) {
          setCoinAddress(data.coinAddress);
        }
      } catch {
        // Keep default value on network/API failures.
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="ca-bar" role="note" aria-label="Coin address">
      <div className="ca-bar-inner">
        <span className="ca-label">CA:</span>
        <code className="ca-value">{coinAddress}</code>
      </div>
    </div>
  );
}

