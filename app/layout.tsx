import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { weddingConfig as config } from "@/config/wedding";
import { coupleNames, longDate, eventTime, timeZoneLabel } from "@/lib/utils";
import { siteUrl, publishedUrl, indexable } from "@/lib/site-url";
import "./globals.css";

const serif = localFont({
  src: [
    {
      path: "../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-400-italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-serif",
  display: "swap",
});
const script = localFont({
  src: "../node_modules/@fontsource/great-vibes/files/great-vibes-latin-400-normal.woff2",
  variable: "--font-script",
  display: "swap",
});
const sans = localFont({
  src: "../node_modules/@fontsource/dm-sans/files/dm-sans-latin-400-normal.woff2",
  variable: "--font-sans",
  display: "swap",
});

const title = `${coupleNames} — ${config.seo.titleSuffix}`;
export const metadata: Metadata = {
  metadataBase: siteUrl,
  alternates: publishedUrl ? { canonical: publishedUrl } : undefined,
  robots: { index: indexable, follow: indexable },
  title,
  description: config.seo.description,
  openGraph: {
    title,
    description: config.seo.description,
    type: "website",
    locale: config.locale.replace("-", "_"),
    url: siteUrl,
    siteName: title,
    images: [
      {
        url: config.seo.ogImage,
        width: 1200,
        height: 630,
        alt: `${coupleNames} wedding invitation`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: config.seo.description,
    images: [config.seo.ogImage],
  },
  icons: { icon: "/icon.svg", apple: "/apple-icon" },
};
export const viewport: Viewport = {
  themeColor: config.seo.themeColor,
  width: "device-width",
  initialScale: 1,
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${script.variable} ${sans.variable}`}
    >
      <body>
        {children}
        <noscript>
          <style>{`.invitation-experience{display:none!important}html,body{height:auto!important;overflow:auto!important}`}</style>
          <main className="fallback-page">
            <div className="fallback-card">
              <p className="eyebrow">{config.hero.eyebrow}</p>
              <h1>{coupleNames}</h1>
              <p>{config.couple.introduction}</p>
              <p>
                <strong>{longDate(config.weddingDate)}</strong>
                <br />
                {eventTime(config.weddingDate)} ·{" "}
                {timeZoneLabel(config.weddingDate)}
              </p>
              <p>
                {config.venue.name}
                <br />
                {config.venue.address}
                <br />
                {config.venue.city}
              </p>
              <a className="button" href={config.venue.mapUrl}>
                View on Google Maps
              </a>
              <a className="text-link" href="/api/calendar" download>
                Save our date
              </a>
              <p className="fallback-note">
                Enable JavaScript to open the animated invitation and explore
                all the celebrations.
              </p>
            </div>
          </main>
        </noscript>
      </body>
    </html>
  );
}
