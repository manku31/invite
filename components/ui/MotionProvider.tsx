"use client";
import { LazyMotion, MotionConfig } from "motion/react";
import { useState, type ReactNode } from "react";
import { MotionPreferenceContext } from "@/lib/use-reduced-motion";

const loadFeatures = () =>
  import("@/lib/motion-features").then((module) => module.default);
export default function MotionProvider({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  return (
    <MotionPreferenceContext.Provider value={{ paused, setPaused }}>
      <MotionConfig reducedMotion={paused ? "always" : "user"}>
        <LazyMotion features={loadFeatures} strict>
          <div data-motion-paused={paused}>{children}</div>
        </LazyMotion>
      </MotionConfig>
    </MotionPreferenceContext.Provider>
  );
}
