import type { ReactNode } from "react";
import { weddingConfig } from "@/config/wedding";

export function Ganesh({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M31 22 40 9l9 13M29 25c4-7 18-7 22 0M30 30C10 14 8 51 28 50M50 30c20-16 22 21 2 20M29 31c-6 11 0 20 8 24M51 31c5 10 0 16-9 19-8 3-6 14 1 14 7 0 11-7 6-11M25 58c-17 0-13 13-2 13h34c11 0 15-13-2-13M38 30h4M40 28v8" />
      <path d="m29 42 5 2m12-2-4 2M19 57l-5-4m47 4 5-4" />
      <circle cx="40" cy="20" r="1" fill="currentColor" />
    </svg>
  );
}

export function Trishul({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M32 57V7m-4 6 4-7 4 7M18 12v9c0 17 28 17 28 0v-9m-5 6 5-7 5 7M13 18l5-7 5 7M23 37l18 11V37L23 48Z" />
      <path d="M47 3a8 8 0 1 0 10 10A9 9 0 0 1 47 3Z" />
    </svg>
  );
}

export function PeacockFeather({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M17 59C26 41 36 32 43 19M25 44C-1 16 25 1 42 5c18 5 20 38-17 39Z" />
      <path d="M29 36C13 24 24 9 38 12c15 3 13 22-9 24ZM19 48l9-1M23 41l-6-9M31 30l-6-9M31 39l12-3" />
      <ellipse cx="35" cy="24" rx="5" ry="7" transform="rotate(30 35 24)" />
      <path d="m34 51 22-8m-19 7 1 3m3-5 1 3m3-5 1 3" />
    </svg>
  );
}

export function Lotus({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 66"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden="true"
    >
      <path d="M50 55C28 41 36 18 50 5c14 13 22 36 0 50Z" />
      <path d="M50 55C28 57 16 39 18 21c18 0 31 14 32 34ZM50 55c22 2 34-16 32-34-18 0-31 14-32 34Z" />
      <path d="M50 55C26 66 9 52 4 36c17-4 35 3 46 19Zm0 0c24 11 41-3 46-19-17-4-35 3-46 19Z" />
      <path d="M21 62h58M50 54V24" />
      <circle cx="50" cy="12" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function DecorativeDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`decorative-divider ${className}`} aria-hidden="true">
      <span />
      <span className="divider-monogram">{weddingConfig.monogram}</span>
      <span />
    </div>
  );
}

export function FloralDecoration({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`floral-decoration ${className}`}
      viewBox="0 0 180 260"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1.1">
        <path d="M89 249C61 172 123 137 82 53M90 210c29-10 43-28 44-53M84 180c-23-10-35-35-34-55M86 143c25-15 34-34 33-55M88 108c-24-7-38-29-41-49M84 65c15-16 18-35 12-53" />
        {[
          [125, 166, 35],
          [56, 130, -40],
          [115, 96, 35],
          [48, 65, -35],
          [94, 22, 10],
          [82, 211, -55],
          [104, 180, 55],
        ].map(([x, y, r], i) => (
          <path
            key={i}
            transform={`translate(${x} ${y}) rotate(${r})`}
            d="M0 0C-18-7-18-28-1-34C13-20 15-7 0 0ZM0 0v-27"
          />
        ))}
        <g transform="translate(78 53)">
          <path d="M0 0c-32 1-23-25-9-18-11-27 18-33 19-12C31-49 47-22 26-15 53-9 35 17 18 4 18 29-9 24 0 0Z" />
          <circle cx="10" cy="-8" r="8" />
        </g>
      </g>
    </svg>
  );
}

export function OrnamentalFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`ornamental-frame ${className}`}>{children}</div>;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className = "",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={`section-heading ${className}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
