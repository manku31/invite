import { weddingConfig as config } from "@/config/wedding";
import { Lotus, SectionHeading } from "@/components/ui/Ornaments";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export default function Family() {
  return (
    <section className="section family-section" aria-label="Our families">
      <RevealOnScroll className="section-shell">
        <SectionHeading {...config.sections.family} />
        <p className="family-blessing">{config.family.blessing}</p>
        <div className="family-grid">
          <div>
            <p className="eyebrow">{config.family.bride.label}</p>
            <h3>{config.family.bride.names}</h3>
            <p>{config.family.bride.relation}</p>
            <span className="family-child">{config.couple.brideFullName}</span>
          </div>
          <Lotus className="family-lotus" />
          <div>
            <p className="eyebrow">{config.family.groom.label}</p>
            <h3>{config.family.groom.names}</h3>
            <p>{config.family.groom.relation}</p>
            <span className="family-child">{config.couple.groomFullName}</span>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
