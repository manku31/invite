"use client";
import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { m, useScroll, useTransform } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { ArrowDown } from "lucide-react";
import { weddingConfig as config } from "@/config/wedding";
import { formatDate } from "@/lib/utils";
import { AnimatedText } from "@/components/ui/RevealOnScroll";
import { Ganesh } from "@/components/ui/Ornaments";
import PetalAnimation from "./PetalAnimation";
import { useInvitationExperience } from "./InvitationExperience";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { revealed } = useInvitationExperience();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 75]);
  const nameScale = Math.min(
    1,
    7 / Math.max(config.couple.bride.length, config.couple.groom.length),
  );
  return (
    <section
      ref={ref}
      id="home"
      className="hero"
      aria-label="Wedding invitation"
    >
      <m.div
        className="hero-art"
        style={{ y: reduced ? 0 : y }}
        initial={{ opacity: 0.4, scale: reduced ? 1 : 1.035 }}
        animate={{
          opacity: revealed ? 1 : 0.4,
          scale: revealed || reduced ? 1 : 1.065,
        }}
        transition={{ duration: reduced ? 0 : 3.8, ease: "easeOut" }}
      >
        <Image
          src={config.hero.illustration}
          alt=""
          fill
          preload
          sizes="(max-width: 800px) 1200px, 100vw"
          className="palace-image"
        />
      </m.div>
      <div className="hero-light" />
      <div className="hero-edge" aria-hidden="true" />
      <PetalAnimation />
      <div className="hero-content">
        <AnimatedText active={revealed} delay={0.3} className="hero-blessing">
          <Ganesh />
          <p lang="hi">{config.hero.blessing}</p>
        </AnimatedText>
        <AnimatedText active={revealed} delay={0.65}>
          <p className="eyebrow hero-eyebrow">{config.hero.eyebrow}</p>
          <p className="hero-invitation">
            {config.hero.invitation.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
        </AnimatedText>
        <h1
          className="hero-names"
          tabIndex={-1}
          style={{ "--name-scale": nameScale } as CSSProperties}
        >
          <AnimatedText active={revealed} delay={1.1}>
            <span>
              {config.couple.groom}
              <small>Sharma</small>
            </span>
          </AnimatedText>
          <AnimatedText
            active={revealed}
            delay={1.4}
            className="hero-ampersand"
          >
            <span>&</span>
          </AnimatedText>
          <AnimatedText active={revealed} delay={1.7}>
            <span>
              {config.couple.bride}
              <small>Sharma</small>
            </span>
          </AnimatedText>
          <span className="sr-only"> — Wedding invitation</span>
        </h1>
        <AnimatedText active={revealed} delay={2.05} className="hero-date">
          <span>{formatDate(config.weddingDate, { day: "2-digit" })}</span>
          <i />
          <span>{formatDate(config.weddingDate, { month: "long" })}</span>
          <i />
          <span>{formatDate(config.weddingDate, { year: "numeric" })}</span>
        </AnimatedText>
        <AnimatedText active={revealed} delay={2.2}>
          <p className="hero-weekday">
            {formatDate(config.weddingDate, { weekday: "long" })}
          </p>
          <p className="hero-location">{config.homeLocation}</p>
          <p className="hero-tagline">{config.couple.introduction}</p>
        </AnimatedText>
      </div>
      <AnimatedText active={revealed} delay={2.55} className="hero-scroll">
        <a href="#couple">
          <span>{config.hero.scrollLabel}</span>
          <ArrowDown size={17} strokeWidth={1.2} />
        </a>
      </AnimatedText>
      <span className="hero-side-label">{config.hero.sideLabel}</span>
    </section>
  );
}
