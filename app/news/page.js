import Link from "next/link";
import SiteBrand from "../components/site-brand";
import { listNewsSources } from "../lib/news-sources";
import { listNewsPosts } from "../lib/news-store";
import TwitterEmbeds from "./twitter-embeds";

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const accounts = await listNewsSources();
  const tweets = await listNewsPosts();

  return (
    <>
      <div className="bg-orb orb-1" aria-hidden="true" />
      <div className="bg-orb orb-2" aria-hidden="true" />

      <header className="topbar">
        <SiteBrand />

        <nav className="main-nav" aria-label="Primary">
          <Link href="/">Leaderboard</Link>
          <Link href="/news" className="active">
            News
          </Link>
          <Link href="/faq">FAQ</Link>
        </nav>
      </header>

      <main className="news-page">
        <section className="news-hero-panel">
          <div className="news-hero-copy">
            <span className="news-pill">Live Signal</span>
            <h1>Modern MOG Newsroom</h1>
            <p>Fast, media-first updates across the accounts and posts your community follows most.</p>
            <div className="news-hero-links">
              <Link className="news-cta" href="/">
                Back to Leaderboard
              </Link>
              <Link className="news-cta" href="/dashboard">
                Open Dashboard
              </Link>
              <a className="news-cta ghost" href="https://x.com/mogscanx?s=11" target="_blank" rel="noreferrer">
                Follow on X
              </a>
            </div>
          </div>

          <div className="news-hero-stats">
            <div className="news-stat">
              <span>Tracked Sources</span>
              <strong>{accounts.length}</strong>
            </div>
            <div className="news-stat">
              <span>Featured Posts</span>
              <strong>{tweets.length}</strong>
            </div>
            <div className="news-stat">
              <span>Feed Status</span>
              <strong>Live</strong>
            </div>
          </div>
        </section>

        <section className="news-layout">
          <aside className="news-sources-panel">
            <div className="news-section-head">
              <h2>Trusted Sources</h2>
              <p>Primary accounts for MOG updates</p>
            </div>

            <div className="news-source-list">
              {accounts.map((item) => (
                <article key={item.href} className="news-source-card">
                  <div className="news-source-head">
                    <img className="news-source-avatar" src={item.avatar} alt={item.title} loading="lazy" />
                    <h3>{item.title}</h3>
                  </div>
                  <p>{item.summary}</p>
                  <a href={item.href} target="_blank" rel="noreferrer">
                    Open Profile
                  </a>
                </article>
              ))}
            </div>
          </aside>

          <section className="news-feed-panel">
            <div className="news-section-head">
              <h2>Featured Posts</h2>
              <p>Rich previews with automatic photo/video handling</p>
            </div>
            <TwitterEmbeds tweets={tweets} />
          </section>
        </section>
      </main>
    </>
  );
}
