import Image from "next/image";
import { weddingConfig as config } from "@/config/wedding";
import {
  DecorativeDivider,
  FloralDecoration,
  OrnamentalFrame,
  SectionHeading,
} from "@/components/ui/Ornaments";
import { ImageReveal, RevealOnScroll } from "@/components/ui/RevealOnScroll";

export default function Couple() {
  return (
    <section id="couple" className="section couple-section">
      <div className="section-shell couple-grid">
        <ImageReveal className="couple-portrait">
          <OrnamentalFrame>
            <Image
              src={config.couple.portrait}
              alt={config.couple.portraitAlt}
              fill
              sizes="(max-width: 700px) 82vw, 420px"
            />
          </OrnamentalFrame>
          <span className="portrait-caption">
            {config.couple.portraitCaption}
          </span>
        </ImageReveal>
        <RevealOnScroll className="couple-copy">
          <SectionHeading {...config.sections.couple} />
          <p className="couple-quote">{config.couple.introduction}</p>
          <p className="body-copy">{config.couple.note}</p>
          <DecorativeDivider />
          <p className="couple-signature">
            {config.couple.bride} <span>&</span> {config.couple.groom}
          </p>
        </RevealOnScroll>
      </div>
      <FloralDecoration className="couple-floral" />
    </section>
  );
}
