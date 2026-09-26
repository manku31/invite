import type { MetadataRoute } from "next";
import { indexable, publishedUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(indexable ? { allow: "/", disallow: "/api/" } : { disallow: "/" }),
    },
    sitemap:
      indexable && publishedUrl
        ? new URL("/sitemap.xml", publishedUrl).href
        : undefined,
  };
}
