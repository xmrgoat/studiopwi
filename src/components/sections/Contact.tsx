import { site } from "@/content/site";
import SectionMarker from "@/components/ui/SectionMarker";
import ItalicAccent from "@/components/ui/ItalicAccent";
import ContactForm from "@/components/ui/ContactForm";
import styles from "./Contact.module.css";

export default function Contact() {
  const { contact } = site;

  return (
    <section id="contact" className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.left}>
            <SectionMarker number={contact.marker.number} label={contact.marker.label} />
            <h2 className={styles.headline}>
              {contact.headline.before}{" "}
              <ItalicAccent>{contact.headline.accent}</ItalicAccent>
            </h2>
            <p className={styles.lead}>{contact.lead}</p>

            <ul className={styles.infoList}>
              {contact.info.map((item) => (
                <li key={item.label} className={styles.infoItem}>
                  <span className={styles.infoLabel}>{item.label}</span>
                  <span className={styles.infoValue}>{item.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.right}>
            <ContactForm source="direct" />
          </div>
        </div>
      </div>
    </section>
  );
}
