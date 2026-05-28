import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Démarrez votre projet avec Studio PWI. Réservez un appel découverte gratuit de 20 minutes ou envoyez-nous un message — réponse sous 24h ouvrées.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main">
        <Contact />
      </main>
      <Footer />
    </>
  );
}
