import { Heart, UsersRound } from "lucide-react";
import { weddingConfig as config } from "@/config/wedding";
import {
  DecorativeDivider,
  PeacockFeather,
  Trishul,
  SectionHeading,
} from "@/components/ui/Ornaments";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const icons = {
  mahadev: Trishul,
  krishna: PeacockFeather,
  family: UsersRound,
  wedding: Heart,
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
                    <Icon className="story-symbol" />
                  </span>
                  <span className="story-year">{item.year}</span>
                  <div className="story-description">
                    <span className="story-motif-label">{item.motifLabel}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </RevealOnScroll>
              </li>
            );
          })}
        </ol>
        <RevealOnScroll className="story-signoff">
          <p className="couple-signature">{config.identity}</p>
          <p>{config.storySignOff}</p>
        </RevealOnScroll>
        <DecorativeDivider />
      </div>
    </section>
  );
}
