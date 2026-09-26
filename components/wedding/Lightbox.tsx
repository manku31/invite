"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { weddingConfig as config } from "@/config/wedding";
import Modal from "@/components/ui/Modal";
export default function Lightbox({
  index,
  onChange,
  onClose,
}: {
  index: number;
  onChange: (index: number) => void;
  onClose: () => void;
}) {
  const photo = config.gallery[index];
  const reduced = useReducedMotion();
  const count = config.gallery.length;
  const touch = useRef<{ x: number; y: number } | null>(null);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onChange((index + 1) % count);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onChange((index - 1 + count) % count);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, onChange, count]);
  return (
    <Modal label="Gallery" className="lightbox" onClose={onClose}>
      <div
        className="lightbox-photo"
        onTouchStart={(event) => {
          touch.current =
            event.touches.length === 1
              ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
              : null;
        }}
        onTouchCancel={() => {
          touch.current = null;
        }}
        onTouchEnd={(event) => {
          const start = touch.current;
          touch.current = null;
          if (!start || event.touches.length > 0) return;
          const end = event.changedTouches[0];
          const dx = end.clientX - start.x;
          const dy = end.clientY - start.y;
          if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4)
            onChange((index + (dx < 0 ? 1 : -1) + count) % count);
        }}
      >
        <AnimatePresence mode="wait">
          <m.div
            key={photo.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 700px) 90vw, 75vw"
            />
          </m.div>
        </AnimatePresence>
      </div>
      <div className="lightbox-controls">
        <button
          className="icon-button"
          onClick={() => onChange((index - 1 + count) % count)}
          aria-label="Previous image"
        >
          <ArrowLeft size={22} />
        </button>
        <div aria-live="polite">
          <p>{photo.caption}</p>
          <span>
            {index + 1} / {count}
          </span>
        </div>
        <button
          className="icon-button"
          onClick={() => onChange((index + 1) % count)}
          aria-label="Next image"
        >
          <ArrowRight size={22} />
        </button>
      </div>
    </Modal>
  );
}
