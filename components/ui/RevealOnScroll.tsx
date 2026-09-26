"use client";
import { m, useScroll, useSpring, useTransform } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useRef, type ReactNode, type RefObject } from "react";
import { useInvitationExperience } from "@/components/wedding/InvitationExperience";

export function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  targetRef,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  targetRef?: RefObject<HTMLDivElement | null>;
}) {
  const reduced = useReducedMotion();
  const { revealed } = useInvitationExperience();
  return (
    <m.div
      ref={targetRef}
      className={`reveal ${className}`}
      initial={{ opacity: 0, y: reduced ? 0 : 20 }}
      whileInView={revealed ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reduced ? 0 : 1.15,
        delay: reduced ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </m.div>
  );
}

export function AnimatedText({
  children,
  delay = 0,
  className = "",
  active = true,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  active?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <m.div
      className={`animated-text ${className}`}
      initial={{ opacity: 0, y: reduced ? 0 : 12 }}
      animate={{ opacity: active ? 1 : 0, y: active || reduced ? 0 : 12 }}
      transition={{
        duration: reduced ? 0 : 1,
        delay: reduced ? 0 : delay,
        ease: "easeOut",
      }}
    >
      {children}
    </m.div>
  );
}

export function ImageReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 60, damping: 26 });
  const y = useTransform(progress, [0, 1], [10, -10]);
  return (
    <RevealOnScroll targetRef={ref} className={`image-reveal ${className}`}>
      <m.div className="image-reveal-content" style={{ y: reduced ? 0 : y }}>
        {children}
      </m.div>
    </RevealOnScroll>
  );
}
