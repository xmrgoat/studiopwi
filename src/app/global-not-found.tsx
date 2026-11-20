import type { Metadata } from "next";
import RootShell from "@/components/layout/RootShell";
import NotFoundView from "@/components/pages/NotFoundView";
import "./globals.css";

// The 404 for URLs that match no route. With one root layout per language
// there is no single layout to render app/not-found.tsx in, so Next renders
// this page whole (experimental.globalNotFound in next.config.ts). It can't
// tell which language the visitor came for: French first, with a link to
// the English homepage.
export const metadata: Metadata = {
  title: "404 · Studio PWI",
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <RootShell locale="fr">
      <NotFoundView locale="fr" other="en" />
    </RootShell>
  );
}
