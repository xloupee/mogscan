import Image from "next/image";
import Link from "next/link";
import SiteBrand from "./components/site-brand";
import { formatScore, initials } from "./lib/leaderboard";
import { listProfiles } from "./lib/profiles-store";

export const dynamic = "force-dynamic";

function uppercaseFirst(value) {
  const text = String(value || "");
  if (!text) return text;
  return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
}

export default async function HomePage() {
  const ranked = (await listProfiles())
    .map((profile) => ({
      ...profile,
      adjusted: profile.score,
      losses: Math.max(profile.total - profile.elite, 0),
    }))
    .sort((a, b) => b.adjusted - a.adjusted);

  return (
    <>
      <div className="bg-orb orb-1" aria-hidden="true" />
      <div className="bg-orb orb-2" aria-hidden="true" />

      <header className="topbar">
        <SiteBrand />

        <nav className="main-nav" aria-label="Primary">
          <Link href="/" className="active">
            Leaderboard
          </Link>
          <Link href="/news">News</Link>
          <Link href="/faq">FAQ</Link>
        </nav>
      </header>

      <main className="page">
        <section className="board-head">
          <div>
            <h2>MOG Leaderboard</h2>
            <p className="board-sub">Click any row to open profile page</p>
          </div>
        </section>

        <section className="leaderboard" aria-live="polite">
          {ranked.map((profile, index) => (
            <div key={profile.slug} className="entry">
              <Link className="row-link" href={`/profile/${profile.slug}`}>
                <article className="row" style={{ animationDelay: `${index * 45}ms` }}>
                  <div className="row-left">
                    <span className="rank">{index === 0 ? "🏆" : index + 1}</span>
                    <div className="avatar">
                      {profile.image ? (
                        <Image
                          src={profile.image}
                          alt={`${profile.name} avatar`}
                          fill
                          sizes="40px"
                          className="avatar-img"
                        />
                      ) : (
                        initials(profile.name)
                      )}
                    </div>
                    <div className="identity">
                      <div className="name">{uppercaseFirst(profile.name)}</div>
                      <div className="handle">{profile.handle}</div>
                    </div>
                  </div>

                  <div className="row-right">
                    <div className="ratio">PSL {profile.score.toFixed(1)}</div>
                    <div className="score">{formatScore(profile.adjusted, profile.rankLabel, profile.slug)}</div>
                  </div>
                </article>
              </Link>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
