import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://studiopwi.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Don't disallow /_next/ — Googlebot needs /_next/static/* (CSS/JS)
        // to render the page, and /_next/image* is the URL every optimized
        // <Image> is served from; blocking it hides photos from Google Images.
        disallow: ["/api/", "/admin"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
