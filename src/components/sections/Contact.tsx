import { site } from "@/content/site";
import ContactForm from "@/components/ui/ContactForm";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import styles from "./Contact.module.css";

// Server component wrapper — only the form itself is a client island.
//
// Two routes to the same discovery call: send the form and get a reply within
// 48h, or book a slot straight away on Calendly. In the source the booking
// block follows the form, so on a phone the intro ("Remplissez le
// formulaire…") leads straight into the form and the "vous préférez choisir
// l'horaire vous-même ?" alternative comes after it; on desktop the grid puts
// it back under the intro, beside the form. WhatsApp sits in its small print,
// for the question that doesn't need a call yet.
//
// `page` renders the same section as the /contact page: the title becomes the
// page's h1, the intro shows on load instead of on scroll (it is above the
// fold, and the h1 must never fade), and the contact page's review is added.
export default function Contact({ page = false }: { page?: boolean }) {
  const { title, lead, trustSignals, booking, phoneLabel, whatsappLead } = site.contact;
  const quote = page ? site.contactPage.quote : null;
  const Title = page ? "h1" : "h2";

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
          <ContactForm source="contact" />
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
