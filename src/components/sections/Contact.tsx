import { site } from "@/content/site";
import ContactForm from "@/components/ui/ContactForm";
import Reveal from "@/components/motion/Reveal";
import styles from "./Contact.module.css";

// Server component wrapper — only the form itself is a client island.
export default function Contact() {
  const { title, lead, trustSignals } = site.contact;

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
        </Reveal>

        <Reveal className={styles.formCol} order={1}>
          <ContactForm source="contact" />
        </Reveal>
      </div>
    </section>
  );
}
