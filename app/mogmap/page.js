import Link from "next/link";
import UsMap from "./us-map";

export default function MogMapPage() {
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
          <Link href="/news">News</Link>
          <Link href="/mogmap" className="active">
            MogMap
          </Link>
        </nav>
      </header>

      <main className="page">
        <section className="board-head">
          <div>
            <h2>MogMap</h2>
            <p className="board-sub">Interactive U.S. map</p>
          </div>
        </section>

        <UsMap />
      </main>
    </>
  );
}
