import { useMatches } from "../hooks/useMatches";
import HeroSection from "../components/HeroSection";
import SectionLabel from "../components/SectionLabel";
import MatchCard from "../components/MatchCard";
import styles from "./Matches.module.css";

export default function Matches() {
  const { data: matches, isLoading, error } = useMatches();

  if (isLoading) {
    return (
      <div className={styles.centered}>
        <div className={styles.spinner} />
        <p>Loading matches...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.centered}>
        <p className={styles.error}>Failed to load matches</p>
        <p>{error.message}</p>
      </div>
    );
  }

  if (!matches || matches.length === 0) {
    return (
      <div className={styles.centered}>
        <p>No matches found</p>
      </div>
    );
  }

  return (
    <>
      <HeroSection seasonLabel="Season 1 — 2026" title="Matches" />

      <div className={styles.content}>
        <SectionLabel text="All Matches" />
        <div className={styles.panel}>
          {matches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </div>
    </>
  );
}
