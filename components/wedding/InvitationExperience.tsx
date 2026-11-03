"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { weddingConfig as config } from "@/config/wedding";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import InvitationCover from "./InvitationCover";
import { useInvitationScroll } from "@/lib/use-invitation-scroll";

type Phase = "closed" | "opening" | "revealing" | "open";
type MusicStarter = (() => void) | null;
const ExperienceContext = createContext<{
  revealed: boolean;
  opened: boolean;
  /** MusicToggle registers its play function so opening the gate can start music. */
  registerMusicStart: (start: MusicStarter) => void;
}>({ revealed: true, opened: true, registerMusicStart: () => {} });
export const useInvitationExperience = () => useContext(ExperienceContext);

export default function InvitationExperience({
  children,
}: {
  children: ReactNode;
}) {
  const [phase, setPhase] = useState<Phase>("closed");
  const reduced = useReducedMotion();
  const opened = phase === "open";
  const revealed = phase === "revealing" || opened;
  const contentRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const musicStart = useRef<MusicStarter>(null);
  const registerMusicStart = (start: MusicStarter) => {
    musicStart.current = start;
  };
  useInvitationScroll(opened, reduced);

  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    const scheduledTimers = timers.current;
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, behavior: "instant" });
    return () => {
      window.history.scrollRestoration = previousRestoration;
      scheduledTimers.forEach(clearTimeout);
    };
  }, []);

  function openInvitation() {
    if (started.current) return;
    started.current = true;
    // Must run synchronously inside the tap so mobile browsers allow audio.
    musicStart.current?.();
    if (reduced) {
      setPhase("open");
      return;
    }
    setPhase("opening");
    timers.current.push(
      setTimeout(() => setPhase("revealing"), config.opening.revealAfterMs),
      setTimeout(() => setPhase("open"), config.opening.openAfterMs),
    );
  }

  // Changing the system setting during the opening should finish it immediately.
  useEffect(() => {
    if (!reduced || phase === "closed" || phase === "open") return;
    const timer = setTimeout(() => {
      timers.current.forEach(clearTimeout);
      setPhase("open");
    }, 0);
    return () => clearTimeout(timer);
  }, [phase, reduced]);

  useEffect(() => {
    if (!opened) return;
    contentRef.current
      ?.querySelector<HTMLElement>("h1")
      ?.focus({ preventScroll: true });
  }, [opened]);

  return (
    <ExperienceContext.Provider value={{ revealed, opened, registerMusicStart }}>
      <div
        className="invitation-experience"
        data-phase={phase}
        data-locked={!opened}
        style={
          {
            "--invitation-paper": `url("${config.opening.artwork}")`,
          } as CSSProperties
        }
      >
        <div
          ref={contentRef}
          className="invitation-content"
          inert={!opened}
          aria-hidden={!opened}
        >
          {children}
        </div>
        {!opened && (
          <InvitationCover
            opening={phase !== "closed"}
            onOpen={openInvitation}
          />
        )}
      </div>
    </ExperienceContext.Provider>
  );
}
