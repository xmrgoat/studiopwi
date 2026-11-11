import type { MetadataRoute } from "next";
import { projects } from "@/content/cases";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.studiopwi.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      // Bump when the homepage content, title or structured data changes.
      lastModified: new Date("2026-11-12"), // reviews, social profiles
      changeFrequency: "monthly",
      priority: 1,
    },
    // One entry per project page, read from cases.ts.
    ...projects.map((project) => ({
      url: `${SITE_URL}/portfolio/${project.slug}`,
      lastModified: new Date("2026-11-12"),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    {
      url: `${SITE_URL}/confidentialite`,
      lastModified: new Date("2026-10-10"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/conditions-generales`,
      lastModified: new Date("2026-10-10"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/mentions-legales`,
      lastModified: new Date("2026-10-10"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
