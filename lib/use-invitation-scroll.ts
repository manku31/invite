"use client";

import { useEffect, useRef } from "react";
import { animate } from "motion/react";
import { weddingConfig as config } from "@/config/wedding";

/** One owner for guided, anchor, and wheel motion. Touch and keyboard stay native. */
export function useInvitationScroll(opened: boolean, reduced: boolean) {
  const hasOpened = useRef(false);
  useEffect(() => {
    if (!opened) return;
    const firstOpening = !hasOpened.current;
    hasOpened.current = true;
    let animation: ReturnType<typeof animate> | undefined;
    let guideTimer: ReturnType<typeof setTimeout> | undefined;
    let wheelFrame = 0;
    let navigationFrame = 0;
    let wheelTarget = window.scrollY;
    let wheelPosition = window.scrollY;
    let lastFrameTime = 0;
    const finePointer = window.matchMedia("(pointer: fine)");
    const maxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const stop = () => {
      clearTimeout(guideTimer);
      animation?.stop();
      animation = undefined;
      cancelAnimationFrame(wheelFrame);
      cancelAnimationFrame(navigationFrame);
      wheelFrame = 0;
    };
    const scrollTo = (
      target: number,
      duration = 1.8,
      onComplete?: () => void,
    ) => {
      stop();
      const destination = Math.min(maxScroll(), Math.max(0, target));
      if (reduced) {
        window.scrollTo({ top: destination, behavior: "instant" });
        onComplete?.();
        return;
      }
      animation = animate(window.scrollY, destination, {
        duration,
        ease: [0.42, 0, 0.2, 1],
        onUpdate: (top) => window.scrollTo({ top, behavior: "instant" }),
        onComplete,
      });
    };
    const findSection = (hash: string) => {
      try {
        return document.getElementById(
          decodeURIComponent(hash.replace(/^#/, "")),
        );
      } catch {
        return null;
      }
    };
    const sectionPosition = (section: HTMLElement) => {
      const padding =
        parseFloat(
          getComputedStyle(document.documentElement).scrollPaddingTop,
        ) || 24;
      return section.getBoundingClientRect().top + window.scrollY - padding;
    };
    const navigateTo = (section: HTMLElement) => {
      stop();
      const begin = () => {
        // Wait for the mobile menu to close before moving focus out of its dialog.
        if (document.querySelector("dialog[open]")) {
          navigationFrame = requestAnimationFrame(begin);
          return;
        }
        const position = sectionPosition(section);
        scrollTo(
          position,
          Math.min(
            2.5,
            Math.max(1.2, Math.abs(position - window.scrollY) / 1800),
          ),
          () => {
            const heading =
              section.querySelector<HTMLElement>("h1, h2") || section;
            if (!heading.hasAttribute("tabindex")) heading.tabIndex = -1;
            heading.focus({ preventScroll: true });
          },
        );
      };
      navigationFrame = requestAnimationFrame(begin);
    };
    const target = findSection(window.location.hash);
    if (
      firstOpening &&
      target &&
      !["#home", "#main"].includes(window.location.hash)
    ) {
      navigateTo(target);
    } else if (
      firstOpening &&
      !reduced &&
      config.opening.guidedScroll.enabled
    ) {
      guideTimer = setTimeout(() => {
        const couple = document.getElementById("couple");
        if (couple)
          scrollTo(
            sectionPosition(couple),
            config.opening.guidedScroll.durationSeconds,
          );
      }, config.opening.guidedScroll.pauseMs);
    }

    const wheelStep = (time: number) => {
      const delta = Math.min((time - lastFrameTime) / 1000, 0.04);
      lastFrameTime = time;
      const distance = wheelTarget - wheelPosition;
      if (Math.abs(distance) < 1) {
        window.scrollTo({ top: wheelTarget, behavior: "instant" });
        wheelFrame = 0;
        return;
      }
      // Preserve fractional positions so rounding scrollY cannot stall the final pixels.
      wheelPosition += distance * (1 - Math.exp(-delta / 0.105));
      window.scrollTo({ top: wheelPosition, behavior: "instant" });
      wheelFrame = requestAnimationFrame(wheelStep);
    };
    const onWheel = (event: WheelEvent) => {
      clearTimeout(guideTimer);
      animation?.stop();
      animation = undefined;
      if (
        reduced ||
        !config.experience.smoothWheel ||
        !finePointer.matches ||
        event.ctrlKey ||
        event.metaKey ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
      )
        return;
      if (document.querySelector("dialog[open]")) return;
      let element = event.target instanceof Element ? event.target : null;
      if (element?.closest("textarea, select, input, [contenteditable='true']"))
        return;
      while (element && element !== document.body) {
        if (
          element.scrollHeight > element.clientHeight + 1 &&
          /auto|scroll/.test(getComputedStyle(element).overflowY)
        )
          return;
        element = element.parentElement;
      }
      if (!event.cancelable || event.deltaY === 0) return;
      const amount =
        event.deltaY *
        (event.deltaMode === 1
          ? 16
          : event.deltaMode === 2
            ? window.innerHeight
            : 1);
      wheelTarget = Math.min(
        maxScroll(),
        Math.max(0, (wheelFrame ? wheelTarget : window.scrollY) + amount),
      );
      event.preventDefault();
      if (!wheelFrame) {
        wheelPosition = window.scrollY;
        lastFrameTime = performance.now();
        wheelFrame = requestAnimationFrame(wheelStep);
      }
    };
    const onAnchor = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const anchor =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>("a[href^='#']")
          : null;
      if (!anchor) return;
      const hash = anchor.getAttribute("href") || "";
      const section = findSection(hash);
      if (!section) return;
      event.preventDefault();
      if (window.location.hash !== hash)
        window.history.pushState(null, "", hash);
      navigateTo(section);
    };
    const onKey = (event: KeyboardEvent) => {
      if (
        [
          "ArrowDown",
          "ArrowUp",
          "PageDown",
          "PageUp",
          "Home",
          "End",
          " ",
          "Tab",
          "Escape",
        ].includes(event.key)
      )
        stop();
    };
    const onVisibility = () => {
      if (document.hidden) stop();
    };
    const onHistory = () => {
      stop();
      const section = findSection(window.location.hash);
      if (section) navigateTo(section);
      else if (!window.location.hash)
        scrollTo(0, 1.8, () => {
          document
            .querySelector<HTMLElement>("main h1")
            ?.focus({ preventScroll: true });
        });
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("pointerdown", stop, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", stop);
    window.addEventListener("popstate", onHistory);
    document.addEventListener("click", onAnchor);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("pointerdown", stop);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", stop);
      window.removeEventListener("popstate", onHistory);
      document.removeEventListener("click", onAnchor);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [opened, reduced]);
}
