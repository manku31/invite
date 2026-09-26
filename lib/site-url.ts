import { weddingConfig as config } from "@/config/wedding";

/** Keep previews buildable, but never publish a localhost canonical URL. */
export function resolveSiteUrl(value: string | undefined): URL | undefined {
  if (!value?.trim()) return undefined;
  const url = new URL(value.trim());
  if (
    !["http:", "https:"].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    url.pathname !== "/"
  ) {
    throw new Error(
      "Set NEXT_PUBLIC_SITE_URL to your website origin, for example https://our-wedding.com (without a path, query, or credentials).",
    );
  }
  return url;
}

export const publishedUrl = resolveSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL || config.sharing.url,
);
export const siteUrl = publishedUrl || new URL("http://localhost:3000");
export const indexable = Boolean(publishedUrl && config.seo.allowIndexing);
