"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SiteBrand from "../components/site-brand";

const DASHBOARD_USERNAME = "mogscan";
const DASHBOARD_PASSWORD = "mogscan123";
const DASHBOARD_AUTH_KEY = "mogscan_dashboard_authed";

export default function DashboardPage() {
  const [url, setUrl] = useState("");
  const [coinAddress, setCoinAddress] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [sourceSummary, setSourceSummary] = useState("");
  const [profileName, setProfileName] = useState("");
  const [profileScore, setProfileScore] = useState("");
  const [profileRankLabel, setProfileRankLabel] = useState("");
  const [profileHandle, setProfileHandle] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileTraits, setProfileTraits] = useState("");
  const [posts, setPosts] = useState([]);
  const [sources, setSources] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [source, setSource] = useState("unknown");
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [coinStatus, setCoinStatus] = useState({ type: "idle", message: "" });
  const [sourceStatus, setSourceStatus] = useState({ type: "idle", message: "" });
  const [profileStatus, setProfileStatus] = useState({ type: "idle", message: "" });
  const [loading, setLoading] = useState(false);
  const [coinLoading, setCoinLoading] = useState(false);
  const [sourceLoading, setSourceLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [seedLoading, setSeedLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const saved = window.sessionStorage.getItem(DASHBOARD_AUTH_KEY);
    if (saved === "1") {
      setIsAuthed(true);
    }
  }, []);

  async function loadPosts() {
    try {
      const response = await fetch("/api/news-posts", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to load posts");
      setPosts(data.posts || []);
      setSource(data.source || "unknown");
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Failed to load posts" });
    }
  }

  async function loadSources() {
    try {
      const response = await fetch("/api/news-sources", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to load sources");
      setSources(data.sources || []);
    } catch (error) {
      setSourceStatus({ type: "error", message: error.message || "Failed to load sources" });
    }
  }

  async function loadProfiles() {
    try {
      const response = await fetch("/api/profiles", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to load profiles");
      setProfiles(data.profiles || []);
    } catch (error) {
      setProfileStatus({ type: "error", message: error.message || "Failed to load profiles" });
    }
  }

  useEffect(() => {
    if (!isAuthed) return;
    loadPosts();
    loadSources();
    loadProfiles();
    loadSettings();
  }, [isAuthed]);

  async function loadSettings() {
    try {
      const response = await fetch("/api/site-settings", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to load settings");
      setCoinAddress(data.coinAddress || "");
    } catch (error) {
      setCoinStatus({ type: "error", message: error.message || "Failed to load coin address" });
    }
  }

  function onLoginSubmit(event) {
    event.preventDefault();

    if (username === DASHBOARD_USERNAME && password === DASHBOARD_PASSWORD) {
      setIsAuthed(true);
      setAuthError("");
      setPassword("");
      window.sessionStorage.setItem(DASHBOARD_AUTH_KEY, "1");
      return;
    }

    setAuthError("Invalid username or password.");
  }

  function onLogout() {
    setIsAuthed(false);
    setStatus({ type: "idle", message: "" });
    setUsername("");
    setPassword("");
    setAuthError("");
    window.sessionStorage.removeItem(DASHBOARD_AUTH_KEY);
  }

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/news-posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to save tweet");

      setStatus({ type: "success", message: "Tweet saved. News page will reflect this immediately." });
      setUrl("");
      await loadPosts();
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Failed to save tweet" });
    } finally {
      setLoading(false);
    }
  }

  async function onCoinSubmit(event) {
    event.preventDefault();
    setCoinLoading(true);
    setCoinStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/site-settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coinAddress }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to update coin address");

      setCoinAddress(data.coinAddress || "");
      setCoinStatus({ type: "success", message: "Coin address updated site-wide." });
    } catch (error) {
      setCoinStatus({ type: "error", message: error.message || "Failed to update coin address" });
    } finally {
      setCoinLoading(false);
    }
  }

  async function onSourceSubmit(event) {
    event.preventDefault();
    setSourceLoading(true);
    setSourceStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/news-sources", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          href: sourceUrl,
          summary: sourceSummary,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to save source");

      setSourceStatus({ type: "success", message: "Trusted source added to News." });
      setSourceUrl("");
      setSourceSummary("");
      await loadSources();
    } catch (error) {
      setSourceStatus({ type: "error", message: error.message || "Failed to save source" });
    } finally {
      setSourceLoading(false);
    }
  }

  async function onProfileSubmit(event) {
    event.preventDefault();
    setProfileLoading(true);
    setProfileStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/profiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: profileName,
          score: profileScore,
          rankLabel: profileRankLabel,
          handle: profileHandle,
          image: profileImage,
          traits: profileTraits
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean),
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to save profile");

      setProfileStatus({ type: "success", message: "Profile saved to leaderboard." });
      setProfileName("");
      setProfileScore("");
      setProfileRankLabel("");
      setProfileHandle("");
      setProfileImage("");
      setProfileTraits("");
      await loadProfiles();
    } catch (error) {
      setProfileStatus({ type: "error", message: error.message || "Failed to save profile" });
    } finally {
      setProfileLoading(false);
    }
  }

  async function onSeedProfiles() {
    setSeedLoading(true);
    setProfileStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/profiles/seed", { method: "POST" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to seed profiles");

      setProfileStatus({ type: "success", message: `Seeded ${data.count || 0} profiles into Supabase.` });
      await loadProfiles();
    } catch (error) {
      setProfileStatus({ type: "error", message: error.message || "Failed to seed profiles" });
    } finally {
      setSeedLoading(false);
    }
  }

  return (
    <>
      <div className="bg-orb orb-1" aria-hidden="true" />
      <div className="bg-orb orb-2" aria-hidden="true" />

      <header className="topbar">
        <SiteBrand />

        <nav className="main-nav" aria-label="Primary">
          <Link href="/">Leaderboard</Link>
          <Link href="/news">News</Link>
          <Link href="/dashboard" className="active">
            Dashboard
          </Link>
        </nav>
      </header>

      <main className="dashboard-page">
        {!isAuthed ? (
          <section className="dashboard-login-wrap">
            <form className="dashboard-form dashboard-login-form" onSubmit={onLoginSubmit}>
              <h2>Dashboard Login</h2>
              <p>Enter credentials to access the posting dashboard.</p>

              <label>
                Username
                <input
                  required
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  autoComplete="username"
                />
              </label>

              <label>
                Password
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                />
              </label>

              <button type="submit">Login</button>

              {authError ? <p className="dashboard-status error">{authError}</p> : null}
            </form>
          </section>
        ) : (
          <>
            <section className="dashboard-head">
              <div>
                <h2>Post to News</h2>
                <p>Paste a tweet link. Mogscan adds it to News instantly.</p>
              </div>
              <div className="dashboard-head-actions">
                <div className="dashboard-source">Data source: {source}</div>
                <button type="button" className="dashboard-logout" onClick={onLogout}>
                  Logout
                </button>
              </div>
            </section>

            <section className="dashboard-grid">
              <div className="dashboard-stack">
                <form className="dashboard-form" onSubmit={onSubmit}>
                  <label>
                    Tweet URL *
                    <input
                      required
                      type="url"
                      value={url}
                      onChange={(event) => setUrl(event.target.value)}
                      placeholder="https://x.com/.../status/123456789"
                    />
                  </label>

                  <button type="submit" disabled={loading}>
                    {loading ? "Adding..." : "Add to News"}
                  </button>

                  {status.message ? <p className={`dashboard-status ${status.type}`}>{status.message}</p> : null}
                </form>

                <form className="dashboard-form" onSubmit={onCoinSubmit}>
                  <label>
                    Coin Address (CA) *
                    <input
                      required
                      type="text"
                      value={coinAddress}
                      onChange={(event) => setCoinAddress(event.target.value)}
                      placeholder="0x..."
                    />
                  </label>

                  <button type="submit" disabled={coinLoading}>
                    {coinLoading ? "Saving..." : "Update CA"}
                  </button>

                  {coinStatus.message ? (
                    <p className={`dashboard-status ${coinStatus.type}`}>{coinStatus.message}</p>
                  ) : null}
                </form>

                <form className="dashboard-form" onSubmit={onSourceSubmit}>
                  <label>
                    Trusted Source URL *
                    <input
                      required
                      type="url"
                      value={sourceUrl}
                      onChange={(event) => setSourceUrl(event.target.value)}
                      placeholder="https://x.com/username"
                    />
                  </label>

                  <label>
                    Source Summary (optional)
                    <input
                      type="text"
                      value={sourceSummary}
                      onChange={(event) => setSourceSummary(event.target.value)}
                      placeholder="Short description shown on News page"
                    />
                  </label>

                  <button type="submit" disabled={sourceLoading}>
                    {sourceLoading ? "Adding..." : "Add Trusted Source"}
                  </button>

                  {sourceStatus.message ? (
                    <p className={`dashboard-status ${sourceStatus.type}`}>{sourceStatus.message}</p>
                  ) : null}
                </form>

                <form className="dashboard-form" onSubmit={onProfileSubmit}>
                  <label>
                    Profile Name *
                    <input
                      required
                      type="text"
                      value={profileName}
                      onChange={(event) => setProfileName(event.target.value)}
                      placeholder="New profile name"
                    />
                  </label>

                  <label>
                    PSL Score *
                    <input
                      required
                      type="number"
                      min="1"
                      max="10"
                      step="0.1"
                      value={profileScore}
                      onChange={(event) => setProfileScore(event.target.value)}
                      placeholder="7.5"
                    />
                  </label>

                  <label>
                    Tier Label (optional)
                    <input
                      type="text"
                      value={profileRankLabel}
                      onChange={(event) => setProfileRankLabel(event.target.value)}
                      placeholder="CHAD / GIGA CHAD / NORMIE"
                    />
                  </label>

                  <label>
                    Handle / subtitle (optional)
                    <input
                      type="text"
                      value={profileHandle}
                      onChange={(event) => setProfileHandle(event.target.value)}
                      placeholder="short descriptor"
                    />
                  </label>

                  <label>
                    Profile image URL/path (optional)
                    <input
                      type="text"
                      value={profileImage}
                      onChange={(event) => setProfileImage(event.target.value)}
                      placeholder="/profiles/new-profile.png"
                    />
                  </label>

                  <label>
                    Traits (optional, one per line)
                    <textarea
                      rows={5}
                      value={profileTraits}
                      onChange={(event) => setProfileTraits(event.target.value)}
                      placeholder={"Canthal tilt: ...\nJawline: ...\nSkin clarity: ..."}
                    />
                  </label>

                  <button type="submit" disabled={profileLoading}>
                    {profileLoading ? "Saving..." : "Add to Leaderboard"}
                  </button>
                  <button type="button" disabled={seedLoading} onClick={onSeedProfiles}>
                    {seedLoading ? "Seeding..." : "Seed Current Profiles to DB"}
                  </button>

                  {profileStatus.message ? (
                    <p className={`dashboard-status ${profileStatus.type}`}>{profileStatus.message}</p>
                  ) : null}
                </form>
              </div>

              <section className="dashboard-list">
                <h3>Current Posts</h3>
                {posts.length === 0 ? <p className="news-empty">No posts found.</p> : null}
                {posts.map((post) => (
                  <article key={post.id} className="dashboard-post-row">
                    <div>
                      <strong>{post.author}</strong>
                      <p>{post.summary || "No summary"}</p>
                    </div>
                    <a href={post.url} target="_blank" rel="noreferrer">
                      Open
                    </a>
                  </article>
                ))}

                <h3 className="dashboard-subhead">Trusted Sources</h3>
                {sources.length === 0 ? <p className="news-empty">No sources found.</p> : null}
                {sources.map((item) => (
                  <article key={item.id} className="dashboard-post-row">
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.summary || "No summary"}</p>
                    </div>
                    <a href={item.href} target="_blank" rel="noreferrer">
                      Open
                    </a>
                  </article>
                ))}

                <h3 className="dashboard-subhead">Leaderboard Profiles</h3>
                {profiles.length === 0 ? <p className="news-empty">No profiles found.</p> : null}
                {profiles.slice(0, 20).map((item) => (
                  <article key={item.id || item.slug} className="dashboard-post-row">
                    <div>
                      <strong>{item.name}</strong>
                      <p>
                        PSL {Number(item.score || 0).toFixed(1)} • {item.rankLabel || "Tier auto"}
                      </p>
                    </div>
                    <a href={`/profile/${item.slug}`}>Open</a>
                  </article>
                ))}
              </section>
            </section>
          </>
        )}
      </main>
    </>
  );
}
