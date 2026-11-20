import type { MetadataRoute } from "next";
import { SITE_URL } from "@/i18n/metadata";

// Don't disallow /_next/ — Googlebot needs /_next/static/* (CSS/JS) to render
// the page, and /_next/image* is the URL every optimized <Image> is served
// from; blocking it hides photos from Google Images.
const DISALLOW = ["/api/", "/admin"];

// AI search and answer engines, named so the welcome is explicit. They get
// exactly the rules everyone else gets (a named group replaces `*` for that
// bot, so the disallow list is repeated). Both languages — / and /en — are
// open to all of them.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: DISALLOW },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
