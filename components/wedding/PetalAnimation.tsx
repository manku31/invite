"use client";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import type { CSSProperties } from "react";
import { useInvitationExperience } from "./InvitationExperience";

// Seeded variation keeps server HTML and client hydration identical.
const petals = Array.from({ length: 14 }, (_, i) => ({
  left: (i * 37 + 9) % 100,
  size: 7 + ((i * 13) % 10),
  duration: 14 + ((i * 7) % 14),
  delay: -(i * 2.7),
  sway: -55 + ((i * 31) % 110),
  opacity: 0.35 + (i % 4) * 0.1,
}));

export default function PetalAnimation() {
  const reduced = useReducedMotion();
  const { revealed } = useInvitationExperience();
  if (reduced || !revealed) return null;
  return (
    <div className="petals" aria-hidden="true">
      {petals.map((petal, index) => (
        <span
          key={index}
          className="petal"
          style={
            {
              left: `${petal.left}%`,
              width: petal.size,
              height: petal.size * 1.4,
              opacity: petal.opacity,
              animationDuration: `${petal.duration}s`,
              animationDelay: `${petal.delay}s`,
              "--sway": `${petal.sway}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
