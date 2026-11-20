import type { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import { homeMetadata } from "@/i18n/metadata";

// The French homepage, /. Canonical / with hreflang fr, en (/en), x-default.
export const metadata: Metadata = homeMetadata("fr");

export default function Page() {
  return <HomePage locale="fr" />;
}
