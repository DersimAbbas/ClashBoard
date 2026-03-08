import { usePlayers } from "../hooks/usePlayers";
import HeroSection from "../components/HeroSection";
import SectionLabel from "../components/SectionLabel";
import styles from "./Players.module.css";

export default function Players() {
  const { data: players, isLoading, error } = usePlayers();

  if (isLoading) {
    return (
      <div className={styles.centered}>
        <div className={styles.spinner} />
        <p>Loading players...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.centered}>
        <p className={styles.error}>Failed to load players</p>
        <p>{error.message}</p>
      </div>
    );
  }

  if (!players || players.length === 0) {
    return (
      <div className={styles.centered}>
        <p>No players found</p>
      </div>
    );
  }

  return (
    <>
      <HeroSection seasonLabel="Season 1 — 2026" title="Players" />

      <div className={styles.content}>
        <SectionLabel text="All Players" />
        <div className={styles.panel}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Player</th>
                <th>Main</th>
                <th>Region</th>
                <th>W</th>
                <th>L</th>
                <th>Pts</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => {
                const totals = player.leaguePlayers.reduce(
                  (acc, lp) => ({
                    wins: acc.wins + lp.wins,
                    losses: acc.losses + lp.losses,
                    points: acc.points + lp.points,
                  }),
                  { wins: 0, losses: 0, points: 0 }
                );

                return (
                  <tr key={player.id}>
                    <td>
                      <div className={styles.playerCell}>
                        <div className={styles.avatar}>
                          {player.gamerTag.slice(0, 2).toUpperCase()}
                        </div>
                        <div className={styles.playerInfo}>
                          <span className={styles.gamerTag}>
                            {player.gamerTag}
                          </span>
                          {player.realName && (
                            <span className={styles.realName}>
                              {player.realName}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className={styles.character}>
                      {player.mainCharacter ?? "—"}
                    </td>
                    <td className={styles.region}>{player.region ?? "—"}</td>
                    <td className={styles.stat}>{totals.wins}</td>
                    <td className={styles.stat}>{totals.losses}</td>
                    <td className={styles.points}>{totals.points}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
