import type { Metadata } from "next";
import RootShell from "@/components/layout/RootShell";
import { rootMetadata } from "@/i18n/metadata";
import "../globals.css";

// Root layout of the English site, everything under /en. Same shell as the
// French layout, with <html lang="en"> and the English defaults.
export const metadata: Metadata = rootMetadata("en");
export { viewport } from "@/components/layout/RootShell";

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="en">{children}</RootShell>;
}
