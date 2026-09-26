import Image from "next/image";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { weddingConfig as config } from "@/config/wedding";
import { eventTime, longDate, timeZoneLabel } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/Ornaments";
import { ImageReveal, RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ButtonLink } from "@/components/ui/Button";

export default function Venue() {
  return (
    <section id="venue" className="section venue-section">
      <div className="section-shell venue-grid">
        <RevealOnScroll className="venue-copy">
          <SectionHeading
            eyebrow={config.sections.venue.eyebrow}
            title={config.sections.venue.title}
          />
          <p className="body-copy">{config.sections.venue.description}</p>
          <div className="venue-details">
            <div>
              <MapPin size={19} strokeWidth={1.3} />
              <div>
                <h3>{config.venue.name}</h3>
                <address>
                  {config.venue.address}
                  <br />
                  {config.venue.city} {config.venue.postalCode}
                </address>
              </div>
            </div>
            <div>
              <CalendarDays size={19} strokeWidth={1.3} />
              <div>
                <p>{longDate(config.weddingDate)}</p>
                <p>
                  {eventTime(config.weddingDate)} onwards ·{" "}
                  {timeZoneLabel(config.weddingDate)}
                </p>
              </div>
            </div>
          </div>
          <ButtonLink
            href={config.venue.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Google Maps <ArrowUpRight size={16} />
          </ButtonLink>
          <p className="venue-arrival">{config.venue.arrivalNote}</p>
        </RevealOnScroll>
        <ImageReveal className="venue-visual">
          <div className="venue-image">
            <Image
              src={config.venue.image}
              alt={config.venue.imageAlt}
              fill
              sizes="(max-width: 700px) 90vw, 48vw"
            />
          </div>
          <span className="venue-image-label">
            {config.sections.venue.imageLabel}
          </span>
          <p className="image-caption">{config.sections.venue.imageCaption}</p>
        </ImageReveal>
      </div>
    </section>
  );
}
