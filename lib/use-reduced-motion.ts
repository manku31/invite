"use client";
import { createContext, useContext, useSyncExternalStore } from "react";

export const MotionPreferenceContext = createContext({
  paused: false,
  setPaused: (_paused: boolean) => {
    void _paused;
  },
});

const query = "(prefers-reduced-motion: reduce)";
function subscribe(listener: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
}
const getSnapshot = () => window.matchMedia(query).matches;
const getServerSnapshot = () => false;

/** The hydration snapshot matches SSR; CSS handles reduced motion before hydration. */
export function useSystemReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useReducedMotion() {
  const system = useSystemReducedMotion();
  const { paused } = useContext(MotionPreferenceContext);
  return system || paused;
}
