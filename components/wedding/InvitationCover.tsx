"use client";

import Image from "next/image";
import { m } from "motion/react";
import { weddingConfig as config } from "@/config/wedding";
import { formatDate } from "@/lib/utils";
import { Ganesh } from "@/components/ui/Ornaments";

const paperEase = [0.32, 0.04, 0.2, 1] as const;

export default function InvitationCover({
  opening,
  onOpen,
}: {
  opening: boolean;
  onOpen: () => void;
}) {
  return (
    <section
      className="invitation-cover"
      aria-label="Your sealed wedding invitation"
      aria-busy={opening}
    >
      <m.div
        className="cover-atmosphere"
        initial={false}
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: 1.6, delay: opening ? 0.9 : 0 }}
      />
      <m.div
        className="cover-surround-copy"
        initial={false}
        animate={{ opacity: opening ? 0 : 1, y: opening ? -8 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="cover-small-star" aria-hidden="true">
          ✧
        </span>
        <p>{config.opening.dedication}</p>
      </m.div>
      <m.div
        className="gatefold-stage"
        initial={false}
        animate={{ scale: opening ? 1.08 : 1 }}
        transition={{ duration: 2.7, ease: paperEase }}
      >
        <button
          className="gatefold-trigger"
          onClick={onOpen}
          disabled={opening}
          aria-label={config.opening.buttonLabel}
          aria-describedby="cover-instruction"
        >
          <span className="sr-only">
            {config.couple.groom} and {config.couple.bride} invite you to their
            wedding.
          </span>
          <m.span
            className="gatefold-shadow"
            initial={false}
            animate={{ opacity: opening ? 0 : 1 }}
            transition={{ duration: 0.9 }}
          />
          {(["left", "right"] as const).map((side) => (
            <m.span
              key={side}
              className={`gatefold-panel gatefold-${side}`}
              initial={false}
              animate={{
                rotateY: opening ? (side === "left" ? -108 : 108) : 0,
                x: opening ? (side === "left" ? "-10%" : "10%") : "0%",
                opacity: opening ? 0 : 1,
              }}
              transition={{
                rotateY: { duration: 2.4, delay: 0.35, ease: paperEase },
                x: { duration: 2.4, delay: 0.35, ease: paperEase },
                opacity: { duration: 0.6, delay: opening ? 2.05 : 0 },
              }}
              aria-hidden="true"
            >
              <span className="gatefold-art">
                <Image
                  src={config.opening.artwork}
                  alt=""
                  fill
                  preload
                  sizes="(max-width: 600px) 100vw, 600px"
                />
              </span>
              <span className="gatefold-border" />
              <span className="gatefold-inner-border" />
              <span className="gatefold-seam" />
              <span className="gatefold-sheen" />
            </m.span>
          ))}
          <m.span
            className="cover-lettering"
            initial={false}
            animate={{ opacity: opening ? 0 : 1, y: opening ? -12 : 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            aria-hidden="true"
          >
            <Ganesh className="cover-ganesh" />
            <span className="cover-eyebrow" lang="hi">
              {config.opening.eyebrow}
            </span>
            <span className="cover-title">{config.opening.title}</span>
            <span className="cover-tiny-ornament">— ✧ —</span>
          </m.span>
          <m.span
            className="wax-seal-wrap"
            initial={false}
            animate={{
              opacity: opening ? 0 : 1,
              scale: opening ? 1.15 : 1,
              y: opening ? -22 : 0,
              rotate: opening ? -7 : -5,
            }}
            transition={{ duration: 0.65, ease: "easeInOut" }}
            aria-hidden="true"
          >
            <span className="seal-ribbon seal-ribbon-top" />
            <span className="seal-ribbon seal-ribbon-bottom" />
            <span className="wax-seal">
              <span className="wax-seal-ring">
                <Ganesh className="seal-lotus" />
                <span className="seal-monogram">
                  {config.couple.groom[0]}
                  <i>♥</i>
                  {config.couple.bride[0]}
                </span>
                <span className="seal-small-star">✧</span>
              </span>
            </span>
          </m.span>
          <m.span
            className="cover-date-block"
            initial={false}
            animate={{ opacity: opening ? 0 : 1, y: opening ? 10 : 0 }}
            transition={{ duration: 0.5 }}
            aria-hidden="true"
          >
            <span className="cover-date">
              {formatDate(config.weddingDate, { day: "2-digit" })}
              <i />
              {formatDate(config.weddingDate, { month: "long" })}
              <i />
              {formatDate(config.weddingDate, { year: "numeric" })}
            </span>
            <span className="cover-city">{config.homeLocation}</span>
          </m.span>
          <m.span
            id="cover-instruction"
            className="cover-instruction"
            initial={false}
            animate={{ opacity: opening ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="cover-touch-mark" aria-hidden="true" />
            {config.opening.prompt}
          </m.span>
        </button>
      </m.div>
      <m.p
        className="cover-footer"
        initial={false}
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        {config.opening.footer}
      </m.p>
      <span className="sr-only" role="status">
        {opening ? config.opening.openingMessage : ""}
      </span>
    </section>
  );
}
