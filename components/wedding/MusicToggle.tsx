"use client";
import { useEffect, useRef, useState } from "react";
import { Music2, VolumeX } from "lucide-react";
import { weddingConfig as config } from "@/config/wedding";
import { useInvitationExperience } from "./InvitationExperience";
export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { registerMusicStart } = useInvitationExperience();
  useEffect(() => {
    if (!config.music.enabled) return;
    const audio = new Audio(config.music.src);
    audio.preload = "none";
    // Loop manually so each repeat restarts from `startAt`, not 0:00.
    audio.loop = false;
    audio.volume = 0;
    const startAt = Math.max(0, config.music.startAt ?? 0);
    // Before load, this sets the default playback start position.
    audio.currentTime = startAt;
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
    const onEnded = () => {
      audio.currentTime = startAt;
      void audio.play().catch(() => setPlaying(false));
    };
    const onVisibility = () => {
      if (document.hidden) audio.pause();
    };
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onError);
    audio.addEventListener("ended", onEnded);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      audio.pause();
      clearInterval(fade);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("ended", onEnded);
      document.removeEventListener("visibilitychange", onVisibility);
      audio.removeAttribute("src");
      audio.load();
      audioRef.current = null;
    };
  }, []);
  async function play() {
    const audio = audioRef.current;
    if (!audio) return;
    setError("");
    setLoading(true);
    try {
      if (audio.error) audio.load();
      await audio.play();
      setPlaying(true);
    } catch {
      setError("The music couldn’t load. Tap to try again.");
      setPlaying(false);
    } finally {
      setLoading(false);
    }
  }

  // Opening the invitation gate starts the music; guests can stop it with the button.
  useEffect(() => {
    if (!config.music.enabled) return;
    registerMusicStart(() => {
      if (audioRef.current?.paused) void play();
    });
    return () => registerMusicStart(null);
  });

  if (!config.music.enabled) return null;
  function toggle() {
    if (playing) {
      audioRef.current?.pause();
      setPlaying(false);
      return;
    }
    void play();
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
