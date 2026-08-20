import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://studiopwi.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date("2026-08-20"), // Figma redesign — full rewrite
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/confidentialite`,
      lastModified: new Date("2026-08-20"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/conditions-generales`,
      lastModified: new Date("2026-08-19"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/mentions-legales`,
      lastModified: new Date("2026-08-19"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
