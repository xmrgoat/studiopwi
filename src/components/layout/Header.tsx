import { projects } from "@/content/cases";
import HeaderBar, { type ProjectLink } from "./HeaderBar";

// Server-side shell: reads the project list here and hands the bar only what
// the "Réalisations" entry shows, so cases.ts stays out of the client bundle.
// The interactive header itself is HeaderBar.
export default function Header() {
  const links: ProjectLink[] = projects.map((p) => ({
    href: `/portfolio/${p.slug}`,
    client: p.client,
    teaser: p.teaser,
  }));
  return <HeaderBar projects={links} />;
}
