import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://studiopwi.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date("2026-06-12"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/confidentialite`,
      lastModified: new Date("2026-05-16"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/conditions-generales`,
      lastModified: new Date("2026-05-16"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/mentions-legales`,
      lastModified: new Date("2026-05-16"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
