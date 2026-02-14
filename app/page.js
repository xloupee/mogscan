"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { formatScore, initials, multipliers, profiles } from "./lib/leaderboard";

export default function HomePage() {
  const [period, setPeriod] = useState("daily");

  const ranked = useMemo(() => {
    const factor = multipliers[period] ?? 1;
    return profiles
      .map((profile) => ({
        ...profile,
        adjusted: profile.score * factor,
        losses: Math.max(profile.total - profile.elite, 0),
      }))
      .sort((a, b) => b.adjusted - a.adjusted);
  }, [period]);

  return (
    <>
      <div className="bg-orb orb-1" aria-hidden="true" />
      <div className="bg-orb orb-2" aria-hidden="true" />

      <header className="topbar">
        <div className="brand-wrap">
          <h1 className="brand">mogscan</h1>
        </div>

        <nav className="main-nav" aria-label="Primary">
          <Link href="/" className="active">
            Leaderboard
          </Link>
          <Link href="/news">News</Link>
          <Link href="/mogmap">MogMap</Link>
        </nav>

      </header>

      <main className="page">
        <section className="board-head">
          <div>
            <h2>MOG Leaderboard</h2>
            <p className="board-sub">Click any row to open profile page</p>
          </div>

          <div className="tabs" role="tablist" aria-label="Leaderboard period">
            {Object.keys(multipliers).map((tab) => {
              const active = tab === period;
              return (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={active}
                  className={active ? "is-active" : ""}
                  onClick={() => setPeriod(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              );
            })}
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
                      <div className="name">{profile.name}</div>
                      <div className="handle">{profile.handle}</div>
                    </div>
                  </div>

                  <div className="row-right">
                    <div className="ratio">
                      <span className="pos">{profile.elite}</span> / <span className="neg">{profile.losses}</span>
                    </div>
                    <div className="score">{formatScore(profile.adjusted)}</div>
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
