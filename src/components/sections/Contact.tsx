import { site } from "@/content/site";
import ContactForm from "@/components/ui/ContactForm";
import AuditForm from "@/components/ui/AuditForm";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import styles from "./Contact.module.css";

// Server component wrapper — only the form itself is a client island.
//
// The free audit + homepage draft comes first (November 2026): its short form
// heads the form column, with the general form (nom, email, message) under
// it for any other question. The call is the second path, not a choice to
// make up front: "Vous préférez en parler ?" offers the Calendly slot and,
// in its small print, WhatsApp. In the source the booking block follows the
// forms, so a phone reads intro → audit → question → call; on desktop the
// grid lifts it under the intro, beside the forms. Replies within 24 h.
//
// `page` renders the same section as the /contact page: the title becomes the
// page's h1, the intro shows on load instead of on scroll (it is above the
// fold, and the h1 must never fade), and the contact page's review is added.
export default function Contact({ page = false }: { page?: boolean }) {
  const { title, lead, trustSignals, booking, phoneLabel, whatsappLead } = site.contact;
  const quote = page ? site.contactPage.quote : null;
  const Title = page ? "h1" : "h2";
  // One level under the section title, whichever that is.
  const Sub = page ? "h2" : "h3";
  const audit = site.audit.form;

  const intro = (
    <>
      <Title className={styles.title}>{title}</Title>
      <p className={styles.lead}>{lead}</p>

      <ul className={styles.signals}>
        {trustSignals.map((signal) => (
          <li key={signal} className={styles.signal}>
            <span className={styles.check} aria-hidden="true" />
            {signal}
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <section
      className={`section ${styles.section} ${page ? styles.page : ""}`}
      id="contact"
    >
      <div className={`grid ${styles.grid} ${quote ? styles.withQuote : ""}`}>
        {page ? (
          <div className={styles.copy}>{intro}</div>
        ) : (
          <Reveal className={styles.copy}>{intro}</Reveal>
        )}

        <Reveal className={styles.formCol} order={1}>
          <div className={styles.formBlock}>
            <div className={styles.formHead}>
              <Sub className={styles.formTitle}>{audit.title}</Sub>
              <p className={styles.formLead}>{audit.lead}</p>
            </div>
            <AuditForm />
          </div>
          <div className={styles.formBlock}>
            <Sub className={styles.formTitle}>{site.contact.generalTitle}</Sub>
            <ContactForm source="contact" />
          </div>
        </Reveal>

        <Reveal className={styles.booking} order={2}>
          <p className={styles.bookingLead}>{booking.lead}</p>
          <Button href={site.booking.url} variant="outline" external>
            {site.booking.label}
          </Button>
          {/* The small print under the button, held 8px apart: the
              Calendly note, then the other ways to reach us. */}
          <div className={styles.notes}>
            <p className={styles.bookingNote}>{booking.note}</p>
            {site.phone && (
              <p className={styles.phone}>
                {phoneLabel} :{" "}
                <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}>{site.phone}</a>
              </p>
            )}
            <p className={styles.whatsapp}>
              {whatsappLead}{" "}
              <a href={site.whatsapp.url} target="_blank" rel="noopener noreferrer">
                <span className={styles.whatsappIcon} aria-hidden="true" />
                {site.whatsapp.label}
                <span className="sr-only"> (nouvel onglet)</span>
              </a>
            </p>
          </div>
        </Reveal>

        {quote && (
          <Reveal as="figure" className={styles.quote} order={3}>
            <blockquote className={styles.quoteText}>« {quote.text} »</blockquote>
            <figcaption className={styles.quoteAuthor}>{quote.author}</figcaption>
          </Reveal>
        )}
      </div>
    </section>
  );
}
