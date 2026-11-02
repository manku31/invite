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
            <p className="eyebrow">The groom</p>
            <h3 className="family-child">{config.couple.groomFullName}</h3>
            <p className="family-parents">
              {config.family.groom.father}
              <br />
              {config.family.groom.mother}
            </p>
            <p className="family-community">{config.family.groom.community}</p>
            <p>{config.family.groom.location}</p>
          </div>
          <Lotus className="family-lotus" />
          <div>
            <p className="eyebrow">The bride</p>
            <h3 className="family-child">{config.couple.brideFullName}</h3>
            <p className="family-parents">
              {config.family.bride.father}
              <br />
              {config.family.bride.mother}
            </p>
            <p className="family-community">{config.family.bride.community}</p>
            <p>{config.family.bride.location}</p>
          </div>
        </div>
        <p className="family-welcome">{config.family.welcome}</p>
      </RevealOnScroll>
    </section>
  );
}
