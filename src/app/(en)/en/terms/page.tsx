import type { Metadata } from "next";
import LegalPage from "@/components/layout/LegalPage";
import { pageMetadata } from "@/i18n/metadata";
import { routes } from "@/i18n/routes";

// English translation of /conditions-generales, for English-speaking
// visitors and clients. The French version prevails if the two differ.
export const metadata: Metadata = pageMetadata({
  locale: "en",
  paths: routes.terms,
  title: "Terms of use",
  description:
    "Terms of use for studiopwi.com and the services of Studio PWI, governed by Swiss law.",
});

export default function TermsPage() {
  return (
    <LegalPage locale="en" eyebrow="Legal — Terms" title="Terms of use" updated="November 13, 2026">
      <p>
        These terms of use (the &ldquo;Terms&rdquo;) govern access to and use of the website{" "}
        <strong>studiopwi.com</strong> (the &ldquo;Site&rdquo;), run by Studio PWI, Route des
        Addoz 52, 2017 Boudry, Switzerland.
      </p>
      <p>
        This is a translation. If it differs from the{" "}
        <a href={routes.terms.fr} hrefLang="fr">French version</a>, the French version prevails.
      </p>

      <h2>1. Accepting the Terms</h2>
      <p>
        By accessing and using the Site, you accept these Terms in full. If you don&apos;t accept
        them, please stop using the Site right away.
      </p>
      <p>
        These Terms apply to every visitor of the Site, whether or not they are a client of
        Studio PWI. Our services are covered by a separate written contract (see section 7),
        which prevails if the two conflict.
      </p>

      <h2>2. The Site and our services</h2>
      <p>
        The Site presents the services of Studio PWI, a web studio that builds websites for
        landscapers and landscaping businesses in Switzerland. On it, you can:
      </p>
      <ul>
        <li>View our service offers and past projects;</li>
        <li>Send a contact or quote request.</li>
      </ul>
      <p>
        Website design services are governed by service contracts signed separately. These Terms
        are not a service contract.
      </p>

      <h2>3. Intellectual property</h2>
      <p>
        Everything on the Site — text, images, videos, graphics, logo, structure and source code
        — is protected by the{" "}
        <strong>Swiss Federal Act on Copyright and Related Rights (CopA)</strong> and, where
        relevant, by trademark and design law.
      </p>
      <p>
        Copying, showing, changing, publishing or sending all or part of the Site, by any means,
        without Studio PWI&apos;s prior written consent is strictly prohibited and amounts to
        infringement.
      </p>
      <p>
        Any third-party logos and trademarks on the Site remain the exclusive property of their
        owners.
      </p>

      <h2>4. Using the Site</h2>
      <p>By using the Site, you agree:</p>
      <ul>
        <li>Not to submit false, misleading or fraudulent content;</li>
        <li>Not to try to gain unauthorised access to the Site&apos;s systems;</li>
        <li>
          Not to use robots, scripts or any other automated means to extract data from the Site
          without prior written permission;
        </li>
        <li>Not to send viruses, malicious code or any other harmful content.</li>
      </ul>
      <p>Studio PWI may block access to the Site for any user who doesn&apos;t follow these Terms.</p>

      <h2>5. Limitation of liability</h2>
      <p>
        Studio PWI works to keep the information on the Site accurate and up to date. However,
        it is provided for information only and may change at any time without notice.
      </p>
      <p>Studio PWI accepts no liability for:</p>
      <ul>
        <li>Errors, inaccuracies or omissions in the Site&apos;s content;</li>
        <li>
          The Site being temporarily unavailable because of maintenance, a technical failure or
          force majeure;
        </li>
        <li>Direct or indirect damage resulting from using the Site or being unable to access it;</li>
        <li>The content or practices of third-party sites reached through links on the Site.</li>
      </ul>
      <p>
        Studio PWI&apos;s liability is limited to what mandatory Swiss law allows.
      </p>

      <h2>6. Links</h2>
      <p>
        The Site may contain links to third-party sites, provided for information only. Studio
        PWI does not control their content and accepts no responsibility for their privacy
        practices or legal compliance.
      </p>
      <p>
        You may link to the Site, as long as the link is clearly identified and does not harm
        Studio PWI&apos;s image.
      </p>

      <h2>7. Commercial terms</h2>
      <p>
        Prices on the Site are in <strong>Swiss francs (CHF)</strong>. No VAT applies: Studio PWI
        is not registered for VAT (see our <a href={routes.legalNotice.en}>Legal notice</a>).
      </p>
      <p>
        The prices of the offers shown on the Site are <strong>fixed prices</strong>, with no
        hourly billing, for the content each offer describes. Any request outside an offer gets
        its own quote, also at a fixed price. Each service is covered by a separate written
        contract that sets out the chosen offer. No order is valid until an order form or service
        contract has been signed.
      </p>

      <h2>8. Personal data</h2>
      <p>
        Using the Site may involve collecting personal data. This is described in our{" "}
        <a href={routes.privacy.en}>Privacy policy</a>, which follows the FADP and the GDPR.
      </p>

      <h2>9. Governing law and jurisdiction</h2>
      <p>
        These Terms are governed exclusively by <strong>Swiss law</strong>, excluding its
        conflict-of-law rules and the Vienna Convention on Contracts for the International Sale
        of Goods.
      </p>
      <p>
        Any dispute about the use of the Site or the meaning of these Terms falls under the
        exclusive jurisdiction of the <strong>courts of the canton of Neuchâtel</strong>,
        Switzerland, subject to an appeal to the Swiss Federal Supreme Court.
      </p>
      <p>
        If you live in the European Union, the mandatory consumer protection rules of your
        country of residence still apply.
      </p>

      <h2>10. Changes to these Terms</h2>
      <p>
        Studio PWI may change these Terms at any time. Changes take effect as soon as they are
        published on the Site. The update date at the top of this page is the one that counts.
      </p>
      <p>By continuing to use the Site after a change, you accept the new Terms.</p>

      <h2>11. Other provisions</h2>
      <p>
        If a court finds any part of these Terms void or unenforceable, the rest remains fully in
        force.
      </p>
      <p>
        If Studio PWI does not enforce a provision of these Terms, that does not mean it waives
        the right to enforce it later.
      </p>

      <h2>12. Contact</h2>
      <p>For any question about these Terms:</p>
      <address>
        <strong>Studio PWI</strong>
        <br />
        Route des Addoz 52, 2017 Boudry, Switzerland
        <br />
        <a href="mailto:contact@studiopwi.com">contact@studiopwi.com</a>
      </address>
    </LegalPage>
  );
}
