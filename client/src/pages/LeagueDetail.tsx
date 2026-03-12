import { useParams } from "react-router-dom";
import { useLeague } from "../hooks/useLeagues";
import { useLeagueMatches } from "../hooks/useMatches";
import HeroSection from "../components/HeroSection";
import SectionLabel from "../components/SectionLabel";
import StandingsTable from "../components/StandingsTable";
import MatchCard from "../components/MatchCard";
import styles from "./LeagueDetail.module.css";

export default function LeagueDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: league, isLoading, error } = useLeague(id!);
  const { data: matches } = useLeagueMatches(id!);

  if (isLoading) {
    return (
      <div className={styles.centered}>
        <div className={styles.spinner} />
        <p>Loading league...</p>
      </div>
    );
  }

  if (error || !league) {
    return (
      <div className={styles.centered}>
        <p className={styles.error}>
          {error ? "Failed to load league" : "League not found"}
        </p>
        {error && <p>{error.message}</p>}
      </div>
    );
  }

  return (
    <>
      <HeroSection seasonLabel={league.game.name} title={league.name} />

      <div className={styles.content}>
        <div className={styles.info}>
          {league.description && (
            <p className={styles.description}>{league.description}</p>
          )}
          <div className={styles.meta}>
            {league.startDate && (
              <span className={styles.metaItem}>
                Start:{" "}
                {new Date(league.startDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            )}
            {league.endDate && (
              <span className={styles.metaItem}>
                End:{" "}
                {new Date(league.endDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            )}
            <span className={styles.metaItem}>
              Scoring: {league.pointsPerWin}W / {league.pointsPerDraw}D /{" "}
              {league.pointsPerLoss}L
            </span>
          </div>
        </div>

        <SectionLabel text="Standings" />
        <StandingsTable league={league} />

        <SectionLabel text="Match History" />
        {matches && matches.length > 0 ? (
          <div className={styles.matchList}>
            {matches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p>No matches played yet</p>
          </div>
        )}
      </div>
    </>
  );
}
