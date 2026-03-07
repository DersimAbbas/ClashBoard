import styles from "./HeroSection.module.css";

interface HeroSectionProps {
  seasonLabel: string;
  title: string;
}

export default function HeroSection({ seasonLabel, title }: HeroSectionProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.seasonLabel}>{seasonLabel}</div>
      <h1 className={styles.title}>{title}</h1>
    </section>
  );
}
