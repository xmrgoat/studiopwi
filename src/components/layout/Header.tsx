import { getDictionary, projectSlugs } from "@/content";
import { otherLocale, type Locale } from "@/i18n/locales";
import { projectPath, routes, switchMap } from "@/i18n/routes";
import HeaderBar, { type HeaderCopy, type ProjectLink } from "./HeaderBar";

// Server-side shell: reads the copy and the project list here and hands the
// bar only what it shows, so neither dictionary (nor cases.ts) ships in the
// client bundle. The interactive header itself is HeaderBar.
export default function Header({ locale }: { locale: Locale }) {
  const { site, cases, ui } = getDictionary(locale);
  const links: ProjectLink[] = cases.projects.map((p) => ({
    href: projectPath(locale, p.slug),
    client: p.client,
    teaser: p.teaser,
  }));
  const copy: HeaderCopy = {
    name: site.name,
    nav: site.nav,
    headerCta: site.headerCta,
    phone: site.phone,
    whatsapp: { url: site.whatsapp.url, label: site.whatsapp.label },
    ui: {
      newTab: ui.newTab,
      homeLabel: ui.homeLabel,
      primaryNav: ui.primaryNav,
      mobileNav: ui.mobileNav,
      openMenu: ui.openMenu,
      closeMenu: ui.closeMenu,
      callLabel: ui.callLabel,
    },
    home: routes.home[locale],
    contact: routes.contact[locale],
    switcher: {
      ...ui.switcher,
      map: switchMap(locale, projectSlugs),
      fallback: routes.home[otherLocale(locale)],
    },
  };
  return <HeaderBar projects={links} copy={copy} />;
}
