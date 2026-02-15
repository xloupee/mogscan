"use client";

import { useEffect, useMemo, useState } from "react";

function formatNewsTimestamp(value, nowMs) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown date";

  const diffMs = nowMs - date.getTime();
  if (diffMs >= 0 && diffMs < 60 * 1000) return "just now";
  if (diffMs >= 0 && diffMs < 60 * 60 * 1000) {
    const minutes = Math.max(1, Math.floor(diffMs / (60 * 1000)));
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  }

  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function TwitterEmbeds({ tweets = [] }) {
  const [mediaById, setMediaById] = useState({});
  const [now, setNow] = useState(() => Date.now());

  const normalizedTweets = useMemo(
    () => tweets.filter((tweet) => tweet?.tweet_id && tweet?.url),
    [tweets],
  );

  useEffect(() => {
    let active = true;

    const load = async () => {
      const entries = await Promise.all(
        normalizedTweets.map(async (tweet) => {
          try {
            const response = await fetch(`/api/tweet-media?id=${tweet.tweet_id}`);
            const media = await response.json();
            return [tweet.tweet_id, media];
          } catch {
            return [tweet.tweet_id, { type: "none" }];
          }
        }),
      );

      if (active) {
        setMediaById(Object.fromEntries(entries));
      }
    };

    if (normalizedTweets.length) {
      load();
    } else {
      setMediaById({});
    }

    return () => {
      active = false;
    };
  }, [normalizedTweets]);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(timer);
  }, []);

  if (!normalizedTweets.length) {
    return <p className="news-empty">No tweets yet. Add one from the dashboard.</p>;
  }

  return (
    <section className="news-feed-list">
      {normalizedTweets.map((tweet) => {
        const media = mediaById[tweet.tweet_id];
        const originalTweetText = String(media?.text || "").trim();
        const postText = originalTweetText || String(tweet.summary || "").trim();

        return (
          <article key={tweet.tweet_id} className="news-post-card">
            <div className="news-post-head">
              <div className="news-post-author">
                {tweet.avatar ? <img className="news-post-avatar" src={tweet.avatar} alt={tweet.author} loading="lazy" /> : null}
                <div className="news-post-author-meta">
                  <h3>{tweet.author}</h3>
                  <p className="news-post-date">{formatNewsTimestamp(tweet.created_at, now)}</p>
                </div>
              </div>
              <a href={tweet.url} target="_blank" rel="noreferrer">
                View Post
              </a>
            </div>

            {postText ? <p className="news-post-summary">{postText}</p> : null}

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
                src={`https://x.com/i/videos/tweet/${tweet.tweet_id}`}
                title={`Media from tweet ${tweet.tweet_id}`}
                loading="lazy"
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                allowFullScreen
              />
            )}

            <div className="news-post-footer">
              <span className="x-badge">X</span>
              <span>{tweet.url}</span>
            </div>
          </article>
        );
      })}
    </section>
  );
}
