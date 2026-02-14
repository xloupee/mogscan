import Link from "next/link";
import TwitterEmbeds from "./twitter-embeds";

export default function NewsPage() {
  const accounts = [
    {
      title: "Clavicular Hub 🎬 (@ClavicularHub) on X",
      href: "https://x.com/ClavicularHub",
      summary:
        "NOT IMPERSONATING CLAVICULAR | The #1 RANKED CHAD news source for updates relating to @clavicular0",
    },
    {
      title: "Clippd (@gotclippd) on X",
      href: "https://x.com/gotclippd",
      summary: "streamer content - not impersonating anyone",
    },
  ];

  return (
    <>
      <div className="bg-orb orb-1" aria-hidden="true" />
      <div className="bg-orb orb-2" aria-hidden="true" />

      <header className="topbar">
        <div className="brand-wrap">
          <h1 className="brand">mogscan</h1>
        </div>

        <nav className="main-nav" aria-label="Primary">
          <Link href="/">Leaderboard</Link>
          <Link href="/news" className="active">
            News
          </Link>
          <Link href="/mogmap">MogMap</Link>
        </nav>
      </header>

      <main className="profile-page">
        <div className="profile-shell">
          <header className="news-head">
            <h1>News</h1>
            <p>Tracked X accounts and embedded posts</p>
          </header>

          <section className="news-list">
            {accounts.map((item) => (
              <article key={item.href} className="news-card">
                <h2>{item.title}</h2>
                <p>{item.summary}</p>
                <a href={item.href} target="_blank" rel="noreferrer">
                  Open on X
                </a>
              </article>
            ))}
          </section>

          <TwitterEmbeds />
        </div>
      </main>
    </>
  );
}
