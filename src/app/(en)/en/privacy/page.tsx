import type { Metadata } from "next";
import LegalPage from "@/components/layout/LegalPage";
import { pageMetadata } from "@/i18n/metadata";
import { routes } from "@/i18n/routes";

// English translation of /confidentialite. Needed in English: the GDPR
// expects privacy information in a language the visitor understands.
export const metadata: Metadata = pageMetadata({
  locale: "en",
  paths: routes.privacy,
  title: "Privacy policy",
  description:
    "How Studio PWI collects, uses and protects your personal data, under the Swiss FADP and the EU GDPR.",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      locale="en"
      eyebrow="Legal — Personal data"
      title="Privacy policy"
      updated="November 13, 2026"
    >
      <p>
        This privacy policy explains how Studio PWI (&ldquo;we&rdquo;, &ldquo;our&rdquo; or
        &ldquo;Studio PWI&rdquo;) collects, uses and protects your personal data when you visit{" "}
        <strong>studiopwi.com</strong> or use our services.
      </p>
      <p>
        It follows the <strong>revised Swiss Federal Act on Data Protection (FADP)</strong>, in
        force since September 1, 2023, and the European Union&apos;s{" "}
        <strong>General Data Protection Regulation (GDPR)</strong>, which applies to visitors who
        live in the EU.
      </p>
      <p>
        This is a translation. If it differs from the{" "}
        <a href={routes.privacy.fr} hrefLang="fr">French version</a>, the French version applies.
      </p>

      <h2>1. Data controller</h2>
      <address>
        <strong>Studio PWI</strong>
        <br />
        Route des Addoz 52<br />
        2017 Boudry — Switzerland
        <br />
        <a href="mailto:contact@studiopwi.com">contact@studiopwi.com</a>
      </address>

      <h2>2. Personal data we collect</h2>

      <h3>Contact form</h3>
      <p>When you send a request through our contact form, we collect:</p>
      <ul>
        <li>
          <strong>First and last name</strong> — to identify the request
        </li>
        <li>
          <strong>Email address</strong> — to reply to you
        </li>
        <li>
          <strong>Message</strong>
        </li>
        <li>
          <strong>IP address</strong> — used briefly to limit the number of sends and prevent
          abuse. It is not stored.
        </li>
      </ul>

      <h3>Audit and mockup request</h3>
      <p>
        When you ask for the free audit of your website and a mockup of your homepage, we
        collect:
      </p>
      <ul>
        <li>
          <strong>First and last name</strong> — to identify the request
        </li>
        <li>
          <strong>Company name</strong> — to find your Google listing and prepare the audit
        </li>
        <li>
          <strong>Your website address</strong>, or the fact that you don&apos;t have one yet —
          the site to review
        </li>
        <li>
          <strong>Email address</strong> — to send you the audit and the mockup
        </li>
        <li>
          <strong>IP address</strong> — used briefly to limit the number of sends, as for the
          contact form. It is not stored.
        </li>
      </ul>

      <h3>WhatsApp</h3>
      <p>
        If you choose to message us on WhatsApp, your phone number, profile name and messages
        are processed by <strong>WhatsApp Ireland Limited</strong> (Meta group), Merrion Road,
        Dublin 4, D04 X2K5, Ireland, under its own{" "}
        <a
          href="https://www.whatsapp.com/legal/privacy-policy-eea"
          target="_blank"
          rel="noopener noreferrer"
        >
          privacy policy
        </a>
        . This channel is optional: the form and email are always available if you prefer not
        to use it. We use your messages only to reply to you.
      </p>

      <h3>Browsing data</h3>
      <p>
        Our server automatically records technical logs containing: IP address, browser, pages
        viewed, and the date and time of each visit. This data is used only to keep the site
        secure and stable.
      </p>
      <p>
        We measure site traffic with <strong>Vercel Web Analytics</strong>, in aggregate and
        anonymously: page views, country, device type. This tool sets no cookies and cannot
        identify you.
      </p>

      <h2>3. Purposes and legal bases</h2>
      <ul>
        <li>
          <strong>Answering your contact and audit requests</strong> — basis: steps taken before
          a contract (art. 6(1)(b) GDPR; art. 31 FADP)
        </li>
        <li>
          <strong>Security and abuse prevention</strong> — basis: legitimate interest (art.
          6(1)(f) GDPR; art. 31 FADP)
        </li>
        <li>
          <strong>Meeting legal obligations</strong> — basis: legal obligation (art. 6(1)(c)
          GDPR)
        </li>
      </ul>

      <h2>4. Recipients and processors</h2>
      <p>
        We never sell your data or share it with third parties for marketing. We use the
        following providers, strictly to deliver our services:
      </p>
      <ul>
        <li>
          <strong>Resend Inc.</strong> (transactional email) — 2261 Market Street #5668, San
          Francisco, CA 94114, United States.{" "}
          <a
            href="https://resend.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resend privacy policy
          </a>
          .
        </li>
        <li>
          <strong>Vercel Inc.</strong> (website hosting) — 340 S Lemon Ave #4133, Walnut, CA
          91789, United States.{" "}
          <a
            href="https://vercel.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel privacy policy
          </a>
          .
        </li>
        <li>
          <strong>Calendly LLC</strong> (appointment booking, only if you choose to book a slot
          on calendly.com) — 115 E Main St, Ste A1B, Buford, GA 30518, United States.{" "}
          <a href="https://calendly.com/privacy" target="_blank" rel="noopener noreferrer">
            Calendly privacy policy
          </a>
          .
        </li>
      </ul>
      <p>
        Data processing agreements (DPAs) are in place with each processor, as the FADP and the
        GDPR require.
      </p>

      <h2>5. How long we keep data</h2>
      <ul>
        <li>
          <strong>Contact requests</strong>: the site has no database. Your message reaches us
          by email and is kept only in our mailbox, for 3 years from our last exchange, unless
          the law requires us to keep it longer.
        </li>
        <li>
          <strong>Technical logs</strong>: 12 months at most.
        </li>
      </ul>

      <h2>6. International data transfers</h2>
      <p>Two of our processors are based in the United States:</p>
      <ul>
        <li>
          <strong>Vercel Inc.</strong> — website hosting. Pages are served from Vercel&apos;s
          European infrastructure (Frankfurt region), but as the company is American, access
          from the United States can&apos;t be ruled out.
        </li>
        <li>
          <strong>Resend Inc.</strong> — email delivery. Processing is set to the European
          region (Ireland), with the same caveat.
        </li>
      </ul>
      <p>
        These transfers are covered by the standard contractual clauses (SCCs) approved by the
        European Commission, under art. 16 FADP and art. 46 GDPR.
      </p>
      <p>
        As the site keeps no database, the only personal data involved is what your message to
        us contains.
      </p>

      <h2>7. Your rights</h2>
      <p>Under the FADP and the GDPR, you have the following rights over your personal data:</p>
      <ul>
        <li>
          <strong>Right of access</strong> — get a copy of your data
        </li>
        <li>
          <strong>Right to rectification</strong> — correct inaccurate data
        </li>
        <li>
          <strong>Right to erasure</strong> — ask for your data to be deleted (&ldquo;right to
          be forgotten&rdquo;)
        </li>
        <li>
          <strong>Right to restrict processing</strong>
        </li>
        <li>
          <strong>Right to data portability</strong> — receive your data in a structured format
        </li>
        <li>
          <strong>Right to object</strong> — object to processing based on legitimate interest
        </li>
        <li>
          <strong>Right to withdraw consent</strong> — at any time, without affecting past
          processing
        </li>
      </ul>
      <p>
        To use any of these rights, email us at{" "}
        <a href="mailto:contact@studiopwi.com">contact@studiopwi.com</a>. We will reply within 30
        days.
      </p>

      <h2>8. Right to complain</h2>
      <p>
        If you think your rights have not been respected, you can complain to the relevant
        supervisory authority:
      </p>
      <ul>
        <li>
          <strong>Switzerland</strong> — Federal Data Protection and Information Commissioner
          (FDPIC):{" "}
          <a href="https://www.edoeb.admin.ch" target="_blank" rel="noopener noreferrer">
            www.edoeb.admin.ch
          </a>
        </li>
        <li>
          <strong>European Union</strong> — the supervisory authority of the member state where
          you live
        </li>
      </ul>

      <h2>9. Cookies</h2>
      <p>
        This site uses <strong>no cookies</strong>: no advertising, analytics or technical
        cookies. So no consent banner is needed. If you book an appointment, you leave this site
        for calendly.com, which applies its own cookie policy.
      </p>

      <h2>10. Security</h2>
      <p>
        We use suitable technical and organisational measures to protect your data against
        unauthorised access, loss or disclosure: encrypted connections (TLS), rate limiting on
        our APIs, and no database — the site stores no personal data.
      </p>

      <h2>11. Changes to this policy</h2>
      <p>
        We may change this policy at any time. The version in force is the one published on
        this page, with its update date.
      </p>

      <h2>12. Contact</h2>
      <p>For any question about the protection of your personal data:</p>
      <address>
        Studio PWI — Data protection contact
        <br />
        <a href="mailto:contact@studiopwi.com">contact@studiopwi.com</a>
        <br />
        Route des Addoz 52, 2017 Boudry, Switzerland
      </address>
    </LegalPage>
  );
}
