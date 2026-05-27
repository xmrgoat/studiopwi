import type { MetadataRoute } from "next";
import { cases } from "@/content/cases";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://studiopwi.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date("2026-05-27"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/realisations`,
      lastModified: new Date("2026-05-27"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...cases.items.map((c) => ({
      url: `${SITE_URL}/realisations/${c.slug}`,
      lastModified: new Date("2026-05-27"),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date("2026-05-16"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date("2026-05-16"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/imprint`,
      lastModified: new Date("2026-05-16"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
