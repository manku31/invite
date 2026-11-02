"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { MoveUpRight } from "lucide-react";
import { weddingConfig as config } from "@/config/wedding";
import { SectionHeading } from "@/components/ui/Ornaments";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
const Lightbox = dynamic(() => import("./Lightbox"), { ssr: false });
export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section id="gallery" className="section gallery-section">
      <div className="section-shell">
        <RevealOnScroll>
          <SectionHeading {...config.sections.gallery} />
        </RevealOnScroll>
        <div className="gallery-grid">
          {config.gallery.map((photo, index) => (
            <RevealOnScroll
              key={photo.src}
              delay={index * 0.06}
              className={`gallery-item gallery-${photo.shape}`}
            >
              <button
                onClick={() => setActive(index)}
                aria-label={`Open image: ${photo.caption}`}
              >
                <span className="gallery-image">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 600px) 90vw, (max-width: 1000px) 42vw, 33vw"
                  />
                  <span className="gallery-expand" aria-hidden="true">
                    <MoveUpRight size={20} />
                  </span>
                </span>
                <span className="gallery-caption">
                  <span>0{index + 1}</span>
                  {photo.caption}
                </span>
              </button>
            </RevealOnScroll>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {active !== null && (
          <Lightbox
            index={active}
            onChange={setActive}
            onClose={() => setActive(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
