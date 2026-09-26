import type { ReactNode } from "react";

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
      <Lotus />
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
