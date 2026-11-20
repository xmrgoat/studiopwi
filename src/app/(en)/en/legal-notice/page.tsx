import type { Metadata } from "next";
import LegalPage from "@/components/layout/LegalPage";
import { getDictionary } from "@/content";
import { pageMetadata } from "@/i18n/metadata";
import { routes } from "@/i18n/routes";

// English translation of /mentions-legales (the Swiss imprint).
export const metadata: Metadata = pageMetadata({
  locale: "en",
  paths: routes.legalNotice,
  title: "Legal notice",
  description:
    "Legal notice for studiopwi.com: who publishes the site, hosting, intellectual property and governing law.",
});

const { site } = getDictionary("en");

export default function ImprintPage() {
  return (
    <LegalPage
      locale="en"
      eyebrow="Legal — Imprint"
      title="Legal notice"
      updated="October 10, 2026"
    >
      <p>
        In line with the Swiss legal requirements for commercial websites, this legal notice
        identifies who is responsible for publishing and running <strong>studiopwi.com</strong>.
      </p>
      <p>
        This is a translation. If it differs from the{" "}
        <a href={routes.legalNotice.fr} hrefLang="fr">French version</a>, the French version applies.
      </p>

      <h2>1. Publisher</h2>
      <address>
        <strong>Studio PWI</strong>
        <br />
        Route des Addoz 52<br />
        2017 Boudry — Switzerland
        <br />
        <br />
        <strong>Email:</strong>{" "}
        <a href="mailto:contact@studiopwi.com">contact@studiopwi.com</a>
        <br />
        <strong>Website:</strong>{" "}
        <a href="https://www.studiopwi.com">studiopwi.com</a>
      </address>

      <h2>2. Person responsible for publication</h2>
      <p>
        The person responsible for publication is {site.founder}, founder of Studio PWI. For any
        editorial question, write to{" "}
        <a href="mailto:contact@studiopwi.com">contact@studiopwi.com</a>.
      </p>

      <h2>3. Status and VAT</h2>
      <p>
        Studio PWI is a sole proprietorship under Swiss law. It is not registered for VAT
        (turnover below the legal threshold of CHF&nbsp;100,000 — art.&nbsp;10 of the Swiss VAT
        Act, LTVA).
      </p>

      <h2>4. Hosting</h2>
      <p>
        studiopwi.com is hosted by <strong>Vercel Inc.</strong>, 340 S Lemon Ave #4133, Walnut,
        CA 91789, United States, on its global delivery network. For any question about the
        technical infrastructure, write to{" "}
        <a href="mailto:contact@studiopwi.com">contact@studiopwi.com</a>.
      </p>

      <h2>5. Intellectual property</h2>
      <p>
        All content on this site — text, graphics, photos, videos, logo, structure and source
        code — belongs exclusively to Studio PWI or its partners and is protected by the{" "}
        <strong>Swiss Federal Act on Copyright and Related Rights (CopA, SR 231.1)</strong>.
      </p>
      <p>
        Copying, showing, changing, distributing or using any of it, in whole or in part,
        without Studio PWI&apos;s prior written consent is strictly prohibited and may infringe
        copyright.
      </p>

      <h2>6. Accuracy of information</h2>
      <p>
        Studio PWI works to keep the information on this site accurate and up to date. However,
        Studio PWI cannot guarantee that it is accurate, complete or current, and accepts no
        liability for any errors or omissions.
      </p>

      <h2>7. Links</h2>
      <p>
        The site may contain links to third-party websites. These links are provided for
        information only. Studio PWI does not control those sites and accepts no responsibility
        for their content, accuracy or compliance with the law.
      </p>

      <h2>8. Personal data</h2>
      <p>
        How personal data is processed when you use the site is described in our{" "}
        <a href={routes.privacy.en}>Privacy policy</a>, which follows the revised Swiss Federal
        Act on Data Protection (FADP, SR 235.1), in force since September 1, 2023, and the EU
        General Data Protection Regulation (GDPR, EU 2016/679).
      </p>

      <h2>9. Governing law</h2>
      <p>
        This site and this legal notice are governed by <strong>Swiss law</strong>. Any dispute
        about the use of the site falls under the exclusive jurisdiction of the{" "}
        <strong>courts of the canton of Neuchâtel</strong>, subject to an appeal to the Swiss
        Federal Supreme Court.
      </p>

      <h2>10. Legal references</h2>
      <ul>
        <li>Swiss Code of Obligations (CO, SR 220)</li>
        <li>Federal Act on Copyright and Related Rights (CopA, SR 231.1)</li>
        <li>Federal Act against Unfair Competition (UCA, SR 241)</li>
        <li>Revised Federal Act on Data Protection (FADP, SR 235.1)</li>
        <li>Federal Act on Value Added Tax (VAT Act, SR 641.20)</li>
      </ul>

      <h2>11. Contact</h2>
      <p>For any question about this legal notice or the use of the site:</p>
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
