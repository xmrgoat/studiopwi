import type { Metadata } from "next";
import { getDictionary } from "@/content";
import { ogLocale, otherLocale, type Locale } from "./locales";
import { alternates, routes, type PagePaths } from "./routes";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.studiopwi.com";

/** The generated Open Graph card for each language. */
export const ogImagePath: Record<Locale, string> = {
  fr: "/opengraph-image",
  en: "/en/opengraph-image",
};

type Image = { url: string; width: number; height: number; alt: string; type?: string };

function defaultImage(locale: Locale): Image {
  return {
    url: ogImagePath[locale],
    width: 1200,
    height: 630,
    alt: getDictionary(locale).site.seo.ogAlt,
    type: "image/png",
  };
}

/**
 * Metadata a root layout gives every page of its language: metadataBase (www),
 * the title template, the homepage description and the default cards. No
 * alternates here — each indexable page states its own canonical and
 * hreflang, so a page that forgets can't inherit the homepage's canonical.
 */
export function rootMetadata(locale: Locale): Metadata {
  const { site } = getDictionary(locale);
  const title = `${site.seo.title} · ${site.name}`;
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s · ${site.name}` },
    description: site.seo.description,
    applicationName: site.name,
    authors: [{ name: site.name }],
    keywords: [...site.seo.keywords],
    openGraph: {
      type: "website",
      locale: ogLocale[locale],
      alternateLocale: [ogLocale[otherLocale(locale)]],
      siteName: site.name,
      title,
      description: site.seo.description,
      images: [defaultImage(locale)],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: site.seo.description,
      images: [defaultImage(locale)],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    category: "business",
  };
}

/**
 * Metadata for an indexable page that exists in both languages: title and
 * description, self-referencing canonical, hreflang fr/en/x-default, and
 * complete Open Graph and Twitter cards (a page-level openGraph replaces the
 * root one whole, so the site name and image are restated).
 *
 * `title` is the page's own title; the layout template adds " · Studio PWI".
 * Pass `absoluteTitle` for the homepage, whose title already carries it.
 */
export function pageMetadata(opts: {
  locale: Locale;
  paths: PagePaths;
  title: string;
  description: string;
  absoluteTitle?: boolean;
  type?: "website" | "article";
  image?: Image;
}): Metadata {
  const { locale, paths, title, description } = opts;
  const { site } = getDictionary(locale);
  const fullTitle = opts.absoluteTitle ? title : `${title} · ${site.name}`;
  const image = opts.image ?? defaultImage(locale);
  return {
    title: opts.absoluteTitle ? { absolute: title } : title,
    description,
    alternates: alternates(paths, locale),
    openGraph: {
      type: opts.type ?? "website",
      locale: ogLocale[locale],
      alternateLocale: [ogLocale[otherLocale(locale)]],
      url: paths[locale],
      siteName: site.name,
      title: fullTitle,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

/** The homepage's metadata in either language. */
export function homeMetadata(locale: Locale): Metadata {
  const { site } = getDictionary(locale);
  return pageMetadata({
    locale,
    paths: routes.home,
    title: `${site.seo.title} · ${site.name}`,
    description: site.seo.description,
    absoluteTitle: true,
  });
}
