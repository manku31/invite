import type { MetadataRoute } from "next";
import { indexable, publishedUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return indexable && publishedUrl ? [{ url: publishedUrl.href }] : [];
}
