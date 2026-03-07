import styles from "./SchedulePanel.module.css";

type MatchStatus = "live" | "upcoming" | "done";

interface ScheduleMatch {
  date: string;
  player1: string;
  player2: string;
  status: MatchStatus;
}

const MOCK_MATCHES: ScheduleMatch[] = [
  { date: "Mar 8 — 18:00", player1: "ZerO", player2: "NovaBlade", status: "upcoming" },
  { date: "Mar 8 — 20:00", player1: "IceQueen", player2: "ShadowFX", status: "upcoming" },
  { date: "Mar 7 — 19:00", player1: "Draven", player2: "PixelKing", status: "done" },
];

const statusLabels: Record<MatchStatus, string> = {
  live: "Live",
  upcoming: "Upcoming",
  done: "Finished",
};

export default function SchedulePanel() {
  return (
    <div className={styles.panel}>
      {MOCK_MATCHES.map((match, i) => (
        <div key={i} className={styles.match}>
          <div className={styles.matchInfo}>
            <span className={styles.date}>{match.date}</span>
            <span className={styles.players}>
              {match.player1} <span className={styles.vs}>vs</span> {match.player2}
            </span>
          </div>
          <span className={`${styles.badge} ${styles[match.status]}`}>
            {statusLabels[match.status]}
          </span>
        </div>
      ))}
    </div>
  );
}
