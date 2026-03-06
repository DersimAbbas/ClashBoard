import { useLeagues } from "../hooks/useLeagues";
import StandingsTable from "../components/StandingsTable";
import styles from "./Home.module.css";

export default function Home() {
  const { data: leagues, isLoading, error } = useLeagues();

  if (isLoading) {
    return (
      <div className={styles.centered}>
        <div className={styles.spinner} />
        <p>Loading leagues...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.centered}>
        <p className={styles.error}>Failed to load leagues</p>
        <p>{error.message}</p>
      </div>
    );
  }

  if (!leagues || leagues.length === 0) {
    return (
      <div className={styles.centered}>
        <p>No leagues found</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {leagues.map((league) => (
        <StandingsTable key={league.id} league={league} />
      ))}
    </div>
  );
}
