import { MatchStatus, type Match } from "../types/match";
import styles from "./SchedulePanel.module.css";

type BadgeStatus = "live" | "upcoming" | "done";

function getBadgeStatus(status: Match["status"]): BadgeStatus {
  switch (status) {
    case MatchStatus.Scheduled:
      return "upcoming";
    case MatchStatus.Completed:
      return "done";
    default:
      return "done";
  }
}

/** Short left-column label: time for upcoming, relative day for completed */
function formatShortDate(match: Match): string {
  if (!match.scheduledAt) return "TBD";
  const d = new Date(match.scheduledAt);

  if (match.status === MatchStatus.Completed) {
    const now = new Date();
    const diffDays = Math.floor(
      (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "YST";
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }

  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

/** Secondary info line under player names */
function formatInfo(match: Match): string {
  if (match.status === MatchStatus.Completed) {
    return `${match.player1Score}–${match.player2Score} · Finished`;
  }

  if (!match.scheduledAt) return "TBD";
  const d = new Date(match.scheduledAt);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

/** Status badge text */
function formatBadge(match: Match): string {
  if (match.status === MatchStatus.Completed) {
    return `${match.player1Score}–${match.player2Score}`;
  }
  return "Soon";
}

interface SchedulePanelProps {
  matches: Match[];
}

export default function SchedulePanel({ matches }: SchedulePanelProps) {
  if (matches.length === 0) {
    return (
      <div className={styles.panel}>
        <p className={styles.empty}>No matches scheduled</p>
      </div>
    );
  }

  return (
    <div className={styles.panel}>
      {matches.map((match) => {
        const badge = getBadgeStatus(match.status);
        return (
          <div key={match.id} className={styles.matchItem}>
            <div className={styles.matchDate}>{formatShortDate(match)}</div>
            <div className={styles.matchTeams}>
              <div className={styles.matchVs}>
                {match.player1.gamerTag} vs {match.player2.gamerTag}
              </div>
              <div className={styles.matchInfo}>{formatInfo(match)}</div>
            </div>
            <div className={`${styles.matchStatus} ${styles[badge]}`}>
              {formatBadge(match)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
