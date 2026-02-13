import Link from "next/link";

export default function NewsPage() {
  return (
    <main className="profile-page">
      <div className="profile-shell">
        <Link className="back-link" href="/">
          ← Back to leaderboard
        </Link>
        <header className="profile-head">
          <div>
            <h1>News</h1>
            <p>Feed coming soon.</p>
          </div>
        </header>
      </div>
    </main>
  );
}
