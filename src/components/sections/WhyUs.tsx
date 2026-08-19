import { site } from "@/content/site";
import RichText from "@/components/ui/RichText";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import styles from "./WhyUs.module.css";

// Server component. Matches the desktop Figma frame: copy column on the left
// starting at the top, "Avis concret" column on the right dropped well down the
// frame, bare quotes (no card), and a CTA beneath both columns.
export default function WhyUs() {
  const { title, paragraphs, testimonialsTitle, testimonials, cta } = site.whyUs;

  return (
    <section className={`section ${styles.section}`} id="pourquoi">
      <div className={`grid ${styles.grid}`}>
        <Reveal className={styles.copy}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.paragraphs}>
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className={styles.paragraph}>
                <RichText text={paragraph} />
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal className={styles.reviews} order={1}>
          <h3 className={styles.reviewsTitle}>{testimonialsTitle}</h3>

          <ul className={styles.list}>
            {testimonials.map((testimonial) => (
              <li key={testimonial.quote}>
                <figure className={styles.figure}>
                  <blockquote className={styles.quote}>
                    <p className={styles.quoteText}>{testimonial.quote}</p>
                  </blockquote>
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

        <Reveal className={styles.ctaRow} order={2}>
          <Button href={cta.href} variant="primary">
            {cta.label}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
