import styles from "./SectionMarker.module.css";

type Props = {
  number: string;
  label: string;
};

export default function SectionMarker({ number, label }: Props) {
  return (
    <p className={styles.marker} aria-hidden="true">
      <span className={styles.dot} />
      <span className={styles.number}>{number}</span>
      <span className={styles.slash}>/</span>
      <span className={styles.label}>{label}</span>
    </p>
  );
}
