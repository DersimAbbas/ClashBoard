import { MatchStatus, type Match } from "../types/match";
import styles from "./SchedulePanel.module.css";

type BadgeStatus = "live" | "upcoming" | "done";

const statusLabels: Record<BadgeStatus, string> = {
  live: "Live",
  upcoming: "Upcoming",
  done: "Finished",
};

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

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "TBD";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    + " — "
    + d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
}

interface SchedulePanelProps {
  matches: Match[];
}

export default function SchedulePanel({ matches }: SchedulePanelProps) {
  if (matches.length === 0) {
    return <div className={styles.panel}><p className={styles.empty}>No matches scheduled</p></div>;
  }

  return (
    <div className={styles.panel}>
      {matches.map((match) => {
        const badge = getBadgeStatus(match.status);
        return (
          <div key={match.id} className={styles.match}>
            <div className={styles.matchInfo}>
              <span className={styles.date}>{formatDate(match.scheduledAt)}</span>
              <span className={styles.players}>
                {match.player1.gamerTag} <span className={styles.vs}>vs</span> {match.player2.gamerTag}
              </span>
            </div>
            <span className={`${styles.badge} ${styles[badge]}`}>
              {statusLabels[badge]}
            </span>
          </div>
        );
      })}
    </div>
  );
}
