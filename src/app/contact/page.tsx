import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Contact from "@/components/sections/Contact";
import Faq from "@/components/sections/Faq";
import { ContactPageLd } from "@/components/seo/JsonLd";
import { site } from "@/content/site";

// The homepage's contact section and FAQ as a page of their own (Figma
// "Contact — 1440"). Same components, not copies: the form, the booking block
// and the questions stay identical in both places. The FAQPage schema stays on
// the homepage only, where its @id lives — one FAQPage per set of questions.
//
// A page-level openGraph replaces the root one whole, so the card image and
// site name are restated here rather than inherited.
export const metadata: Metadata = {
  title: site.contactPage.seo.title,
  description: site.contactPage.seo.description,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    locale: "fr_CH",
    url: "/contact",
    siteName: site.name,
    title: site.contactPage.seo.title,
    description: site.contactPage.seo.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.contactPage.seo.title,
    description: site.contactPage.seo.description,
    images: ["/opengraph-image"],
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactPageLd />
      <Header />
      <main id="main">
        <Contact page />
        <Faq />
      </main>
      <Footer anchorBase="/" />
    </>
  );
}
