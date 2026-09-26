"use client";

export default function GlobalError({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "#faf6ed",
          color: "#493b35",
          fontFamily: "Georgia, serif",
        }}
      >
        <title>Wedding invitation — Try again</title>
        <main
          style={{
            minHeight: "100svh",
            display: "grid",
            placeContent: "center",
            padding: 32,
            textAlign: "center",
          }}
        >
          <h1>Your invitation is still here</h1>
          <p>Something interrupted the page. Please try opening it again.</p>
          <button
            onClick={retry}
            style={{
              padding: "14px 24px",
              font: "inherit",
              cursor: "pointer",
              background: "#713e44",
              color: "#faf6ed",
              border: 0,
            }}
          >
            Try again
          </button>
          {/* A full reload also recovers a failed root layout or client router. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/" style={{ padding: 20, color: "inherit" }}>
            Return to the invitation
          </a>
        </main>
      </body>
    </html>
  );
}
