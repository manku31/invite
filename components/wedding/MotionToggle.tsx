"use client";

import { useContext } from "react";
import { Pause, Play } from "lucide-react";
import {
  MotionPreferenceContext,
  useSystemReducedMotion,
} from "@/lib/use-reduced-motion";
import { weddingConfig as config } from "@/config/wedding";

export default function MotionToggle() {
  const { paused, setPaused } = useContext(MotionPreferenceContext);
  const systemReduced = useSystemReducedMotion();
  const label = systemReduced
    ? config.experience.motionLabels.reduced
    : paused
      ? config.experience.motionLabels.resume
      : config.experience.motionLabels.pause;
  return (
    <button
      className="motion-toggle"
      aria-label={label}
      aria-pressed={paused || systemReduced}
      disabled={systemReduced}
      onClick={() => setPaused(!paused)}
    >
      {paused || systemReduced ? (
        <Play size={14} aria-hidden="true" />
      ) : (
        <Pause size={14} aria-hidden="true" />
      )}
      <span>{label}</span>
    </button>
  );
}
