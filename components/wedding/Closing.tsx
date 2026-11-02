import Image from "next/image";
import { weddingConfig as config } from "@/config/wedding";
import { DecorativeDivider } from "@/components/ui/Ornaments";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { longDate } from "@/lib/utils";
export default function Closing() {
  return (
    <>
      <section className="closing-section">
        <div className="closing-illustration">
          <Image src={config.closing.illustration} alt="" fill sizes="100vw" />
        </div>
        <div className="closing-wash" />
        <RevealOnScroll className="closing-copy">
          <DecorativeDivider />
          <h2>
            {config.closing.lines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <p className="closing-note">{config.closing.note}</p>
          <p className="eyebrow closing-signoff">{config.closing.signOff}</p>
          <p className="closing-names">
            {config.couple.groom} <span>&</span> {config.couple.bride}
          </p>
          <p className="closing-date">{longDate(config.weddingDate)}</p>
          <p className="closing-address">{config.homeAddress}</p>
          <p className="closing-welcome">{config.family.welcome}</p>
        </RevealOnScroll>
      </section>
      <footer className="site-footer">
        <span>{config.closing.footer}</span>
        <a href="#home">{config.monogram}</a>
        {config.socialLinks.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
          </a>
        ))}
        <span>
          {new Date(config.weddingDate).getFullYear()} · {config.homeLocation}
        </span>
      </footer>
    </>
  );
}
