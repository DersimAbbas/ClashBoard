import { useLeagues } from "../hooks/useLeagues";
import { useMatches } from "../hooks/useMatches";
import HeroSection from "../components/HeroSection";
import SectionLabel from "../components/SectionLabel";
import StandingsTable from "../components/StandingsTable";
import SchedulePanel from "../components/SchedulePanel";
import TopPlayersPanel from "../components/TopPlayersPanel";
import styles from "./Home.module.css";

export default function Home() {
  const { data: leagues, isLoading, error } = useLeagues();
  const { data: matches } = useMatches();

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

  const allPlayers = leagues.flatMap((l) => l.leaguePlayers);

  return (
    <>
      <HeroSection seasonLabel="Season 1 — 2026" title="Swedish Esport League" />

      <div className={styles.content}>
        <div className={styles.grid}>
          <main className={styles.standings}>
            <SectionLabel text="Standings" />
            {leagues.map((league) => (
              <StandingsTable key={league.id} league={league} />
            ))}
          </main>

          <aside className={styles.aside}>
            <SectionLabel text="Schedule" />
            <SchedulePanel matches={matches ?? []} />
            <SectionLabel text="Top Players" />
            <TopPlayersPanel players={allPlayers} />
          </aside>
        </div>
      </div>
    </>
  );
}
