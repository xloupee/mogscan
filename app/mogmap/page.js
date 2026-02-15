import Link from "next/link";
import SiteBrand from "../components/site-brand";
import UsMap from "./us-map";

export default function MogMapPage() {
  return (
    <>
      <div className="bg-orb orb-1" aria-hidden="true" />
      <div className="bg-orb orb-2" aria-hidden="true" />

      <header className="topbar">
        <SiteBrand />

        <nav className="main-nav" aria-label="Primary">
          <Link href="/">Leaderboard</Link>
          <Link href="/news">News</Link>
          <Link href="/faq">FAQ</Link>
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
