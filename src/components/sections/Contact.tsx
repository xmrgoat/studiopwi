import { site } from "@/content/site";
import ContactForm from "@/components/ui/ContactForm";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import styles from "./Contact.module.css";

// Server component wrapper — only the form itself is a client island.
//
// Two routes to the same discovery call: book a slot straight away
// (Calendly, in the copy column, so on a phone it comes before the form) or
// send the form and get a reply within 48h.
export default function Contact() {
  const { title, lead, trustSignals, booking, phoneLabel } = site.contact;

  return (
    <section className={`section ${styles.section}`} id="contact">
      <div className={`grid ${styles.grid}`}>
        <Reveal className={styles.copy}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.lead}>{lead}</p>

          <ul className={styles.signals}>
            {trustSignals.map((signal) => (
              <li key={signal} className={styles.signal}>
                <span className={styles.check} aria-hidden="true" />
                {signal}
              </li>
            ))}
          </ul>

          <div className={styles.booking}>
            <p className={styles.bookingLead}>{booking.lead}</p>
            <Button href={site.booking.url} variant="outline" external>
              {site.booking.label}
            </Button>
            <p className={styles.bookingNote}>{booking.note}</p>
            {site.phone && (
              <p className={styles.phone}>
                {phoneLabel} :{" "}
                <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}>{site.phone}</a>
              </p>
            )}
          </div>
        </Reveal>

        <Reveal className={styles.formCol} order={1}>
          <ContactForm source="contact" />
        </Reveal>
      </div>
    </section>
  );
}
