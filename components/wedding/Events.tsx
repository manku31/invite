import {
  ArrowUpRight,
  Flower2,
  Heart,
  Music2,
  Sparkles,
  Sun,
} from "lucide-react";
import { weddingConfig as config, type WeddingEvent } from "@/config/wedding";
import { formatDate } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/Ornaments";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const icons = {
  flower: Flower2,
  sun: Sun,
  music: Music2,
  heart: Heart,
  sparkles: Sparkles,
};
export function EventCard({
  event,
  index,
}: {
  event: WeddingEvent;
  index: number;
}) {
  const Icon = icons[event.icon];
  return (
    <RevealOnScroll
      delay={(index % 3) * 0.1}
      className={`event-stationery tone-${event.tone}`}
    >
      <article>
        <span className="event-number">0{index + 1}</span>
        <div className="event-icon">
          <Icon size={35} strokeWidth={1} />
        </div>
        <h3>{event.name}</h3>
        <p className="event-subtitle">{event.subtitle}</p>
        <div className="event-date">
          <span>{formatDate(event.date, { day: "2-digit" })}</span>
          <div>
            <time dateTime={event.date}>
              {formatDate(event.date, { month: "long", year: "numeric" })}
            </time>
            <span>{event.timeLabel}</span>
          </div>
        </div>
        <p className="event-venue">{event.venue}</p>
        <p className="event-location">{event.location}</p>
        {event.description && (
          <p className="event-description">{event.description}</p>
        )}
        {event.id === "wedding" && (
          <p className="event-couple">{config.identity}</p>
        )}
        <a
          href={event.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link"
          aria-label={`View location for ${event.name}`}
        >
          View location <ArrowUpRight size={14} />
        </a>
      </article>
    </RevealOnScroll>
  );
}

export default function Events() {
  return (
    <section id="events" className="section events-section">
      <div className="section-shell">
        <RevealOnScroll>
          <SectionHeading {...config.sections.events} />
        </RevealOnScroll>
        <div className="events-grid">
          {config.events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
