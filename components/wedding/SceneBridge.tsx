"use client";
import { useRef } from "react";
import { m, useScroll, useSpring, useTransform } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { Bird } from "./NatureAtmosphere";

export default function SceneBridge({
  label,
  variant = "ivory",
}: {
  label: string;
  variant?: "ivory" | "rose";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 55, damping: 25 });
  const drift = useTransform(progress, [0, 1], [-35, 35]);
  const rise = useTransform(progress, [0, 1], [12, -12]);
  return (
    <div
      ref={ref}
      className={`scene-bridge scene-bridge-${variant}`}
      aria-hidden="true"
    >
      <svg className="bridge-vine" viewBox="0 0 800 110" fill="none">
        <path
          d="M0 67c143-72 192 63 333-8S534 9 800 66"
          stroke="currentColor"
          strokeWidth=".8"
        />
        <path
          d="M89 41c-17-15-32-11-38-6 17 8 26 10 38 6Zm40 9c8-19 25-20 33-18-9 13-20 19-33 18Zm104 23c-14 14-27 13-36 6 14-8 25-10 36-6Zm362-36c11-17 30-18 36-9-16 9-25 11-36 9Zm75 9c-12 14-28 13-34 6 12-9 24-10 34-6Z"
          fill="currentColor"
          opacity=".5"
        />
      </svg>
      <m.div
        className="bridge-birds"
        style={{ x: reduced ? 0 : drift, y: reduced ? 0 : rise }}
      >
        <Bird />
        <Bird />
      </m.div>
      <p>{label}</p>
      <span className="bridge-thread" />
    </div>
  );
}
