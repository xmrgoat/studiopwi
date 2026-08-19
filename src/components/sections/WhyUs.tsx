import { site } from "@/content/site";
import RichText from "@/components/ui/RichText";
import Reveal from "@/components/motion/Reveal";
import styles from "./WhyUs.module.css";

// Server component.
//
// The testimonial uses the mobile frame's treatment — a bordered card with a
// quote glyph and an attribution line — at every breakpoint. The desktop frame
// shows the quote bare, untranslated and unattributed, with the section's
// lower-left quadrant empty; the mobile frame is the finished one.
export default function WhyUs() {
  const { title, paragraphs, testimonialsTitle, testimonials } = site.whyUs;

  return (
    <section className={`section ${styles.section}`} id="pourquoi">
      <div className={`grid ${styles.grid}`}>
        <Reveal className={styles.copy}>
          <h2 className={styles.title}>{title}</h2>
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className={styles.paragraph}>
              <RichText text={paragraph} />
            </p>
          ))}
        </Reveal>

        <Reveal className={styles.reviews} order={1}>
          <h3 className={styles.reviewsTitle}>{testimonialsTitle}</h3>

          <ul className={styles.list}>
            {testimonials.map((testimonial) => (
              <li key={testimonial.quote} className={styles.card}>
                <figure className={styles.figure}>
                  <span className={styles.quoteMark} aria-hidden="true">
                    &rdquo;
                  </span>
                  <blockquote className={styles.quote}>
                    <p className={styles.quoteText}>{testimonial.quote}</p>
                  </blockquote>
                  {/* Attribution is omitted entirely when unknown, rather than
                      rendering an empty line — see the note in site.ts. */}
                  {testimonial.author && (
                    <figcaption className={styles.attribution}>
                      <span className={styles.author}>{testimonial.author}</span>
                      {testimonial.role && (
                        <span className={styles.role}>{testimonial.role}</span>
                      )}
                    </figcaption>
                  )}
                </figure>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
