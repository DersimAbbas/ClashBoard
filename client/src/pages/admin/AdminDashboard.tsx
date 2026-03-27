import { Link } from "react-router-dom";
import { useLeagues } from "../../hooks/useLeagues";
import { usePlayers } from "../../hooks/usePlayers";
import { useMatches } from "../../hooks/useMatches";
import { useGames } from "../../hooks/useGames";
import styles from "./AdminDashboard.module.css";

export default function AdminDashboard() {
  const { data: leagues } = useLeagues();
  const { data: players } = usePlayers();
  const { data: matches } = useMatches();
  const { data: games } = useGames();

  return (
    <>
      <h1 className={styles.title}>Dashboard</h1>
      <div className={styles.cards}>
        <Link to="/admin/leagues" className={styles.card}>
          <div className={styles.cardLabel}>Leagues</div>
          <div className={styles.cardValue}>{leagues?.length ?? "—"}</div>
          <div className={styles.cardName}>Manage leagues</div>
        </Link>
        <Link to="/admin/games" className={styles.card}>
          <div className={styles.cardLabel}>Games</div>
          <div className={styles.cardValue}>{games?.length ?? "—"}</div>
          <div className={styles.cardName}>Manage games</div>
        </Link>
        <Link to="/admin/players" className={styles.card}>
          <div className={styles.cardLabel}>Players</div>
          <div className={styles.cardValue}>{players?.length ?? "—"}</div>
          <div className={styles.cardName}>Manage players</div>
        </Link>
        <Link to="/admin/matches" className={styles.card}>
          <div className={styles.cardLabel}>Matches</div>
          <div className={styles.cardValue}>{matches?.length ?? "—"}</div>
          <div className={styles.cardName}>Manage matches</div>
        </Link>
      </div>
    </>
  );
}
