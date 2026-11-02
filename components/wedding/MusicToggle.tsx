"use client";
import { useEffect, useRef, useState } from "react";
import { Music2, VolumeX } from "lucide-react";
import { weddingConfig as config } from "@/config/wedding";
export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!config.music.enabled) return;
    const audio = new Audio(config.music.src);
    audio.preload = "none";
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;
    const targetVolume = Math.max(0, Math.min(1, config.music.volume));
    let fade: ReturnType<typeof setInterval> | undefined;
    const onPlay = () => {
      setPlaying(true);
      clearInterval(fade);
      audio.volume = 0;
      fade = setInterval(() => {
        audio.volume = Math.min(targetVolume, audio.volume + 0.01);
        if (audio.volume >= targetVolume) clearInterval(fade);
      }, 90);
    };
    const onPause = () => {
      setPlaying(false);
      clearInterval(fade);
    };
    const onError = () => {
      clearInterval(fade);
      setPlaying(false);
      setLoading(false);
      setError("The music couldn’t load. Tap to try again.");
    };
    const onVisibility = () => {
      if (document.hidden) audio.pause();
    };
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onError);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      audio.pause();
      clearInterval(fade);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("error", onError);
      document.removeEventListener("visibilitychange", onVisibility);
      audio.removeAttribute("src");
      audio.load();
      audioRef.current = null;
    };
  }, []);
  if (!config.music.enabled) return null;
  async function toggle() {
    setError("");
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
      return;
    }
    setLoading(true);
    try {
      if (audioRef.current.error) audioRef.current.load();
      await audioRef.current.play();
      setPlaying(true);
    } catch {
      setError("The music couldn’t load. Tap to try again.");
      setPlaying(false);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="music-control">
      <button
        className={`music-toggle ${playing ? "is-playing" : ""}`}
        aria-label={
          playing ? "Pause background music" : "Play background music"
        }
        aria-pressed={playing}
        disabled={loading}
        onClick={toggle}
        title={config.music.title}
      >
        {playing ? (
          <span className="equalizer" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
        ) : error ? (
          <VolumeX size={16} />
        ) : (
          <Music2 size={16} />
        )}
        <span>{loading ? "Loading…" : `♪ ${config.music.label}`}</span>
      </button>
      {error && (
        <p role="status" className="music-error">
          {error}
        </p>
      )}
    </div>
  );
}
