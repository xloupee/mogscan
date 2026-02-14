"use client";

import { useEffect, useState } from "react";

const TWEETS = [
  {
    id: "2022128828320219185",
    url: "https://x.com/Kick_Champ/status/2022128828320219185",
    author: "KickChamp👑 (@Kick_Champ)",
    summary:
      "Clavicular is officially hosting the FRAME MOG CHAMPIONSHIP between the ASU Frat Leader and Androgenic this Saturday at 7:00 PM EST.",
  },
  {
    id: "2022169194125725990",
    url: "https://x.com/AutismCapital/status/2022169194125725990?s=20",
    author: "Autism Capital (@AutismCapital)",
    summary: "Status update from Autism Capital.",
  },
  {
    id: "2022375826948497784",
    url: "https://x.com/PresidentToguro/status/2022375826948497784?s=20",
    author: "President-Elect Toguro (@PresidentToguro)",
    summary:
      "Clavicular gets BRUTALLY selfiemogged by the baldmaxxing goblinchad William Banks causing a HYPER SPIKE in his cortisol levels.",
  },
];

export default function TwitterEmbeds() {
  const [mediaById, setMediaById] = useState({});

  useEffect(() => {
    let active = true;

    const load = async () => {
      const entries = await Promise.all(
        TWEETS.map(async (tweet) => {
          try {
            const response = await fetch(`/api/tweet-media?id=${tweet.id}`);
            const media = await response.json();
            return [tweet.id, media];
          } catch {
            return [tweet.id, { type: "none" }];
          }
        }),
      );

      if (active) {
        setMediaById(Object.fromEntries(entries));
      }
    };

    load();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="news-list">
      {TWEETS.map((tweet) => {
        const media = mediaById[tweet.id];

        return (
          <article key={tweet.id} className="x-preview-wrap">
            <a className="x-preview-url" href={tweet.url} target="_blank" rel="noreferrer">
              {tweet.url}
            </a>

            <div className="x-preview-card">
              <div className="x-preview-accent" />

              <div className="x-preview-body">
                <h2>{tweet.author}</h2>
                <p>{tweet.summary}</p>

                {!media && <div className="tweet-media-loading">Loading media...</div>}

                {media?.type === "photo" && (
                  <img className="tweet-media-image" src={media.imageUrl} alt={media.alt || "Tweet image"} loading="lazy" />
                )}

                {media?.type === "video" && media.videoUrl && (
                  <video className="tweet-media-video" controls preload="none" poster={media.poster} playsInline>
                    <source src={media.videoUrl} type="video/mp4" />
                  </video>
                )}

                {media?.type !== "photo" && media?.type !== "video" && (
                  <iframe
                    className="tweet-embed"
                    src={`https://x.com/i/videos/tweet/${tweet.id}`}
                    title={`Media from tweet ${tweet.id}`}
                    loading="lazy"
                    allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                    allowFullScreen
                  />
                )}

                <div className="x-preview-footer">
                  <span className="x-badge">X</span>
                  <span>Open on x.com</span>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
