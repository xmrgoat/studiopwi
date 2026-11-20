import type { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import { homeMetadata } from "@/i18n/metadata";

// The English homepage, /en. Canonical /en with hreflang fr (/), en,
// x-default (/).
export const metadata: Metadata = homeMetadata("en");

export default function Page() {
  return <HomePage locale="en" />;
}
