import type { Metadata } from "next";
import RootShell from "@/components/layout/RootShell";
import { rootMetadata } from "@/i18n/metadata";
import "../globals.css";

// Root layout of the French site (/, /contact, /portfolio/…, the legal
// pages). The English site has its own, app/(en)/layout.tsx; both render
// the same RootShell with their own <html lang>.
export const metadata: Metadata = rootMetadata("fr");
export { viewport } from "@/components/layout/RootShell";

export default function FrenchLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="fr">{children}</RootShell>;
}
