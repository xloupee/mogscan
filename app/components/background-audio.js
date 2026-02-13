"use client";

import { useEffect, useRef, useState } from "react";

export default function BackgroundAudio() {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.22;
    const savedMute = window.localStorage.getItem("mogscan_music_muted");
    const muted = savedMute === null ? true : savedMute === "true";
    audio.muted = muted;
    setIsMuted(muted);

    const attemptPlay = () => {
      audio.play().catch(() => {});
    };

    if (!muted) {
      attemptPlay();
    }

    const unlockAudio = () => {
      if (!audio.muted) {
        attemptPlay();
      }
    };

    window.addEventListener("pointerdown", unlockAudio, { once: true });
    window.addEventListener("keydown", unlockAudio, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = isMuted;
    if (isMuted) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    window.localStorage.setItem("mogscan_music_muted", String(isMuted));
  }, [isMuted]);

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/lumi-athena-icewhore.mp3"
        autoPlay
        loop
        preload="auto"
        playsInline
        style={{ display: "none" }}
      />
      <button className="audio-toggle" aria-pressed={isMuted} onClick={() => setIsMuted((value) => !value)}>
        {isMuted ? "Unmute Music" : "Mute Music"}
      </button>
    </>
  );
}
