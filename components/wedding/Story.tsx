import { Coffee, Flower2, Heart, Sparkles } from "lucide-react";
import { weddingConfig as config } from "@/config/wedding";
import { DecorativeDivider, SectionHeading } from "@/components/ui/Ornaments";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const icons = {
  flower: Flower2,
  coffee: Coffee,
  heart: Heart,
  sparkles: Sparkles,
};
export default function Story() {
  return (
    <section id="story" className="section story-section">
      <div className="section-shell">
        <RevealOnScroll>
          <SectionHeading {...config.sections.story} />
        </RevealOnScroll>
        <ol className="story-timeline">
          {config.story.map((item, index) => {
            const Icon = icons[item.icon];
            return (
              <li key={item.year}>
                <RevealOnScroll delay={index * 0.06} className="story-item">
                  <span className="story-marker">
                    <Icon size={19} strokeWidth={1.1} />
                  </span>
                  <span className="story-year">{item.year}</span>
                  <div className="story-description">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </RevealOnScroll>
              </li>
            );
          })}
        </ol>
        <DecorativeDivider />
      </div>
    </section>
  );
}
