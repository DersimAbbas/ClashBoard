import { useParams, Link } from "react-router-dom";
import { usePlayer } from "../hooks/usePlayers";
import { useMatches } from "../hooks/useMatches";
import HeroSection from "../components/HeroSection";
import SectionLabel from "../components/SectionLabel";
import MatchCard from "../components/MatchCard";
import styles from "./PlayerProfile.module.css";

function FormIndicator({ form }: { form: string | null }) {
  if (!form) return null;

  const results = form.split(",").map((r) => r.trim());

  return (
    <div className={styles.form}>
      {results.map((result, i) => {
        let dotClass = "";
        if (result === "W") dotClass = styles.formW;
        else if (result === "L") dotClass = styles.formL;
        else if (result === "D") dotClass = styles.formD;

        return (
          <span
            key={i}
            className={`${styles.formDot} ${dotClass}`}
            title={result}
          />
        );
      })}
    </div>
  );
}

export default function PlayerProfile() {
  const { id } = useParams<{ id: string }>();
  const { data: player, isLoading, error } = usePlayer(id!);
  const { data: matches } = useMatches();

  if (isLoading) {
    return (
      <div className={styles.centered}>
        <div className={styles.spinner} />
        <p>Loading player...</p>
      </div>
    );
  }

  if (error || !player) {
    return (
      <div className={styles.centered}>
        <p className={styles.error}>
          {error ? "Failed to load player" : "Player not found"}
        </p>
        {error && <p>{error.message}</p>}
      </div>
    );
  }

  const playerMatches = matches?.filter(
    (m) => m.player1Id === player.id || m.player2Id === player.id
  );

  return (
    <>
      <HeroSection seasonLabel="Player Profile" title={player.gamerTag} />

      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.avatar}>
            {player.gamerTag.slice(0, 2).toUpperCase()}
          </div>
          <div className={styles.details}>
            {player.realName && (
              <p className={styles.realName}>{player.realName}</p>
            )}
            <div className={styles.meta}>
              {player.mainCharacter && (
                <span className={styles.metaItem}>
                  Main: <span className={styles.metaValue}>{player.mainCharacter}</span>
                </span>
              )}
              {player.secondaryCharacter && (
                <span className={styles.metaItem}>
                  Secondary: <span className={styles.metaValue}>{player.secondaryCharacter}</span>
                </span>
              )}
              {player.region && (
                <span className={styles.metaItem}>
                  Region: <span className={styles.metaValue}>{player.region}</span>
                </span>
              )}
              <span className={styles.metaItem}>
                Member since:{" "}
                <span className={styles.metaValue}>
                  {new Date(player.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </span>
            </div>
          </div>
        </div>

        {player.leaguePlayers.length > 0 && (
          <>
            <SectionLabel text="League Stats" />
            <table className={styles.statsTable}>
              <thead>
                <tr>
                  <th>League</th>
                  <th>MP</th>
                  <th>W</th>
                  <th>L</th>
                  <th className={styles.hideOnMobile}>D</th>
                  <th className={styles.hideOnMobile}>GD</th>
                  <th>Pts</th>
                  <th className={styles.hideOnMobile}>Form</th>
                </tr>
              </thead>
              <tbody>
                {player.leaguePlayers.map((lp) => (
                  <tr key={lp.id}>
                    <td>
                      <Link to={`/leagues/${lp.leagueId}`} className={styles.leagueLink}>
                        {lp.league.name}
                      </Link>
                    </td>
                    <td>{lp.matchesPlayed}</td>
                    <td>{lp.wins}</td>
                    <td>{lp.losses}</td>
                    <td className={styles.hideOnMobile}>{lp.draws}</td>
                    <td className={styles.hideOnMobile}>
                      {lp.gamesWon - lp.gamesLost}
                    </td>
                    <td className={styles.points}>{lp.points}</td>
                    <td className={styles.hideOnMobile}>
                      <FormIndicator form={lp.recentForm} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        <SectionLabel text="Match History" />
        {playerMatches && playerMatches.length > 0 ? (
          <div className={styles.matchList}>
            {playerMatches.map((match) => (
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
