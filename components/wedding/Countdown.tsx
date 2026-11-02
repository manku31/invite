"use client";
import { useEffect, useState } from "react";
import { CalendarPlus } from "lucide-react";
import { weddingConfig as config } from "@/config/wedding";
import { getCountdown } from "@/lib/utils";
import { Lotus } from "@/components/ui/Ornaments";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export default function Countdown() {
  const [time, setTime] = useState<ReturnType<typeof getCountdown> | null>(
    null,
  );
  useEffect(() => {
    const update = () => setTime(getCountdown(config.weddingDate, Date.now()));
    const interval = window.setInterval(() => {
      if (!document.hidden) update();
    }, 1000);
    update();
    document.addEventListener("visibilitychange", update);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  return (
    <section className="countdown-section" aria-label="Wedding countdown">
      <RevealOnScroll className="section-shell">
        <Lotus className="countdown-lotus" />
        <p className="eyebrow">{config.sections.countdown.eyebrow}</p>
        <h2>
          {time?.complete
            ? config.sections.countdown.complete
            : config.sections.countdown.title}
        </h2>
        <p className="countdown-identity">{config.identity}</p>
        <p className="countdown-note">
          {time?.complete
            ? config.couple.introduction
            : config.sections.countdown.description}
        </p>
        <div
          className="countdown"
          role="timer"
          aria-label={
            time
              ? `${time.days} days, ${time.hours} hours, ${time.minutes} minutes until the wedding`
              : "Calculating time until the wedding"
          }
        >
          {(["days", "hours", "minutes", "seconds"] as const).map((unit) => (
            <div key={unit}>
              <span className="countdown-number">
                {time ? String(time[unit]).padStart(2, "0") : "—"}
              </span>
              <span className="countdown-label">{unit}</span>
            </div>
          ))}
        </div>
        <a className="text-link calendar-link" href="/api/calendar" download>
          <CalendarPlus size={16} /> Save our date
        </a>
      </RevealOnScroll>
    </section>
  );
}
