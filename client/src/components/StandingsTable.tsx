import type { League, LeaguePlayer, LeagueStatus } from "../types/league";
import { LeagueStatus as LS } from "../types/league";
import styles from "./StandingsTable.module.css";

interface StandingsTableProps {
  league: League;
}

function sortPlayers(players: LeaguePlayer[]): LeaguePlayer[] {
  return [...players].sort((a, b) => {
    // 1. Points descending
    if (b.points !== a.points) return b.points - a.points;
    // 2. Wins descending
    if (b.wins !== a.wins) return b.wins - a.wins;
    // 3. Game differential descending
    const aDiff = a.gamesWon - a.gamesLost;
    const bDiff = b.gamesWon - b.gamesLost;
    return bDiff - aDiff;
  });
}

function statusClass(status: LeagueStatus): string {
  switch (status) {
    case LS.Active:
      return styles.statusActive;
    case LS.Upcoming:
      return styles.statusUpcoming;
    case LS.Completed:
      return styles.statusCompleted;
    default:
      return "";
  }
}

const statusLabels: Record<LeagueStatus, string> = {
  [LS.Upcoming]: "Upcoming",
  [LS.Active]: "Active",
  [LS.Completed]: "Completed",
};

function statusLabel(status: LeagueStatus): string {
  return statusLabels[status] ?? "Unknown";
}

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

export default function StandingsTable({ league }: StandingsTableProps) {
  const sorted = sortPlayers(league.leaguePlayers);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        {league.game.logoUrl && (
          <img
            src={league.game.logoUrl}
            alt={league.game.name}
            className={styles.gameLogo}
          />
        )}
        <h2 className={styles.leagueName}>{league.name}</h2>
        <span className={`${styles.statusBadge} ${statusClass(league.status)}`}>
          {statusLabel(league.status)}
        </span>
      </div>

      {sorted.length === 0 ? (
        <p className={styles.emptyMessage}>No players yet</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Player</th>
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
            {sorted.map((lp, index) => (
              <tr key={lp.id} className={index < 2 ? styles.top : undefined}>
                <td className={styles.rank}>{index + 1}</td>
                <td>
                  <div className={styles.playerCell}>
                    {lp.player.avatarUrl && (
                      <img
                        src={lp.player.avatarUrl}
                        alt=""
                        className={styles.avatar}
                      />
                    )}
                    <div>
                      <div className={styles.gamerTag}>
                        {lp.player.gamerTag}
                      </div>
                      {lp.player.mainCharacter && (
                        <div className={styles.mainChar}>
                          {lp.player.mainCharacter}
                        </div>
                      )}
                    </div>
                  </div>
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
      )}
    </div>
  );
}
