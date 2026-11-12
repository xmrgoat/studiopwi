import styles from "./Testimonial.module.css";

// A client's words, as on the homepage "Avis concret" block — the Figma
// "Testimonial" component. Server component; the role, when there is one,
// follows the name on the same line ("Nicolas Descloux, Ô Paysage").
export default function Testimonial({
  quote,
  author,
  role,
}: {
  quote: string;
  author?: string;
  role?: string;
}) {
  return (
    <figure className={styles.figure}>
      <blockquote className={styles.quote}>
        <p className={styles.text}>{quote}</p>
      </blockquote>
      {author && (
        <figcaption className={styles.author}>
          {role ? `${author}, ${role}` : author}
        </figcaption>
      )}
    </figure>
  );
}
