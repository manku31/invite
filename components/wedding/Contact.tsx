import { Phone } from "lucide-react";
import { weddingConfig as config } from "@/config/wedding";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionHeading } from "@/components/ui/Ornaments";

export default function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <RevealOnScroll className="section-shell">
        <SectionHeading
          eyebrow="We’re here to help"
          title={config.contact.title}
        />
        <p className="body-copy">{config.family.welcome}</p>
        <div className="contact-numbers">
          {config.contact.numbers.map((number) => (
            <a
              className="button"
              key={number.href}
              href={number.href}
              aria-label={`Call ${number.display}`}
            >
              <Phone size={17} strokeWidth={1.3} />
              {number.display}
            </a>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
}
