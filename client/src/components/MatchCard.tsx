import { MatchStatus, type Match } from "../types/match";
import styles from "./MatchCard.module.css";

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "TBD";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatTime(dateStr: string | null): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

const statusLabels: Record<number, string> = {
  [MatchStatus.Scheduled]: "Upcoming",
  [MatchStatus.Completed]: "Finished",
  [MatchStatus.Cancelled]: "Cancelled",
};

const badgeStyles: Record<number, string> = {
  [MatchStatus.Scheduled]: styles.upcoming,
  [MatchStatus.Completed]: styles.done,
  [MatchStatus.Cancelled]: styles.cancelled,
};

interface MatchCardProps {
  match: Match;
}

export default function MatchCard({ match }: MatchCardProps) {
  return (
    <div className={styles.item}>
      <div className={styles.dateCol}>
        <span className={styles.date}>{formatDate(match.scheduledAt)}</span>
        <span className={styles.time}>{formatTime(match.scheduledAt)}</span>
      </div>

      <div className={styles.players}>
        <div className={styles.player}>
          <div className={styles.avatar}>
            {match.player1.gamerTag.slice(0, 2).toUpperCase()}
          </div>
          <span className={styles.gamerTag}>{match.player1.gamerTag}</span>
          {match.player1Character && (
            <span className={styles.character}>{match.player1Character}</span>
          )}
        </div>

        <div className={styles.score}>
          {match.status === MatchStatus.Completed ? (
            <>
              <span className={match.winnerId === match.player1Id ? styles.scoreWin : styles.scoreLoss}>
                {match.player1Score}
              </span>
              <span className={styles.scoreSep}>–</span>
              <span className={match.winnerId === match.player2Id ? styles.scoreWin : styles.scoreLoss}>
                {match.player2Score}
              </span>
            </>
          ) : (
            <span className={styles.vs}>VS</span>
          )}
        </div>

        <div className={`${styles.player} ${styles.playerRight}`}>
          <div className={styles.avatar}>
            {match.player2.gamerTag.slice(0, 2).toUpperCase()}
          </div>
          <span className={styles.gamerTag}>{match.player2.gamerTag}</span>
          {match.player2Character && (
            <span className={styles.character}>{match.player2Character}</span>
          )}
        </div>
      </div>

      <div className={`${styles.badge} ${badgeStyles[match.status] ?? ""}`}>
        {statusLabels[match.status] ?? ""}
      </div>
    </div>
  );
}
