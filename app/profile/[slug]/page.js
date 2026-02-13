import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { formatScore, initials, profiles, tier } from "../../lib/leaderboard";

export function generateStaticParams() {
  return profiles.map((profile) => ({ slug: profile.slug }));
}

export default async function ProfilePage({ params }) {
  const { slug } = await params;
  const profile = profiles.find((item) => item.slug === slug);

  if (!profile) {
    notFound();
  }

  const losses = Math.max(profile.total - profile.elite, 0);

  return (
    <main className="profile-page">
      <div className="profile-shell">
        <Link className="back-link" href="/">
          ← Back to leaderboard
        </Link>

        <header className="profile-hero">
          <div className="profile-identity">
            <div className="profile-avatar">
              {profile.image ? (
                <Image
                  src={profile.image}
                  alt={`${profile.name} avatar`}
                  fill
                  sizes="72px"
                  className="avatar-img"
                />
              ) : (
                initials(profile.name)
              )}
            </div>
            <div className="profile-title">
              <h1>{profile.name}</h1>
              <p>{profile.handle}</p>
            </div>
          </div>
          <div className="profile-score-card">
            <span>Overall Score</span>
            <strong>{profile.score.toFixed(1)}</strong>
            <em>{tier(profile.score)} tier</em>
          </div>
        </header>

        <section className="profile-grid">
          <div className="profile-stats">
            <article className="stat-card">
              <span>Score</span>
              <strong>{formatScore(profile.score)}</strong>
            </article>
            <article className="stat-card">
              <span>Tier</span>
              <strong>{tier(profile.score)}</strong>
            </article>
            <article className="stat-card">
              <span>Positive / Negative</span>
              <strong>
                {profile.elite} / {losses}
              </strong>
            </article>
          </div>

          <section className="trait-sheet">
            <h2>Trait Breakdown</h2>
            <div className="trait-grid">
              {profile.traits.map((trait) => (
                <div key={trait} className="detail-chip">
                  {trait}
                </div>
              ))}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
