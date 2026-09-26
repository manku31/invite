"use client";

import { m, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useState, type CSSProperties } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useInvitationExperience } from "./InvitationExperience";
import { weddingConfig as config } from "@/config/wedding";

function Butterfly() {
  return (
    <svg viewBox="0 0 80 65" fill="none" aria-hidden="true">
      <g className="butterfly-wing wing-left">
        <path
          d="M39 34C25 4 2 6 7 27c3 13 18 15 30 14C20 30 6 48 20 57c9 5 16-7 20-17"
          fill="currentColor"
        />
        <path
          d="M35 32C21 15 15 14 13 23m22 18c-10 1-15 7-13 10"
          stroke="#f8efdd"
          strokeWidth="1.1"
          opacity=".7"
        />
      </g>
      <g className="butterfly-wing wing-right">
        <path
          d="M41 34C55 4 78 6 73 27c-3 13-18 15-30 14C60 30 74 48 60 57c-9 5-16-7-20-17"
          fill="currentColor"
        />
        <path
          d="M45 32C59 15 65 14 67 23m-22 18c10 1 15 7 13 10"
          stroke="#f8efdd"
          strokeWidth="1.1"
          opacity=".7"
        />
      </g>
      <path
        d="M40 44V25m0 2-7-8m7 8 7-8"
        stroke="#796747"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Bird({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 90 45"
      fill="none"
      aria-hidden="true"
    >
      <path
        className="bird-wing bird-wing-left"
        d="M45 28C30 8 14 9 3 18c14-2 25 5 42 10Z"
        fill="currentColor"
      />
      <path
        className="bird-wing bird-wing-right"
        d="M45 28C60 8 76 9 87 18c-14-2-25 5-42 10Z"
        fill="currentColor"
      />
      <path d="m38 26 7 6 8-6-7 1-1-4-2 4Z" fill="currentColor" />
    </svg>
  );
}

export default function NatureAtmosphere() {
  const { opened } = useInvitationExperience();
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 26,
    restDelta: 0.001,
  });
  const leftDrift = useTransform(progress, [0, 1], [24, -95]);
  const rightDrift = useTransform(progress, [0, 1], [-40, 100]);
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);
  if (!opened || reduced || !config.experience.nature.enabled) return null;
  return (
    <div className="nature-atmosphere" aria-hidden="true" data-paused={paused}>
      <m.div className="journey-progress" style={{ scaleX: progress }} />
      {config.experience.nature.butterflies && (
        <>
          <m.div
            className="garden-butterfly butterfly-one"
            style={{ y: leftDrift }}
          >
            <div className="butterfly-flight">
              <Butterfly />
            </div>
          </m.div>
          <m.div
            className="garden-butterfly butterfly-two"
            style={{ y: rightDrift }}
          >
            <div className="butterfly-flight">
              <Butterfly />
            </div>
          </m.div>
        </>
      )}
      {config.experience.nature.birds && (
        <div className="garden-birds">
          <Bird />
          <Bird />
          <Bird />
        </div>
      )}
      {config.experience.nature.leaves && (
        <div className="garden-leaves">
          {Array.from({ length: 6 }, (_, i) => (
            <span
              key={i}
              className={`wind-leaf wind-leaf-${i}`}
              style={
                {
                  "--leaf-delay": `${-i * 5.1}s`,
                  "--leaf-duration": `${22 + i * 3}s`,
                } as CSSProperties
              }
            >
              <svg viewBox="0 0 26 45">
                <path
                  d="M13 42C-4 27 2 9 21 2c10 20 2 34-8 40Z"
                  fill="currentColor"
                />
                <path
                  d="M13 42 18 8"
                  fill="none"
                  stroke="#f3e7ce"
                  strokeWidth=".8"
                />
              </svg>
            </span>
          ))}
        </div>
      )}
      {config.experience.nature.breeze && (
        <svg className="garden-breeze" viewBox="0 0 260 540" fill="none">
          <path d="M-35 50C190 140 210 250 45 272S-15 445 220 490" />
          <path d="M-65 80C150 160 175 232 35 251S-25 430 180 472" />
        </svg>
      )}
    </div>
  );
}
