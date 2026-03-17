import { Link } from "react-router-dom";
import type { LeaguePlayer } from "../types/league";
import styles from "./TopPlayersPanel.module.css";

interface TopPlayersPanelProps {
  players: LeaguePlayer[];
}

export default function TopPlayersPanel({ players }: TopPlayersPanelProps) {
  const top5 = [...players]
    .sort((a, b) => b.points - a.points)
    .slice(0, 5);

  if (top5.length === 0) return null;

  return (
    <div className={styles.panel}>
      {top5.map((lp, i) => (
        <div key={lp.id} className={styles.row}>
          <span className={styles.rank}>{i + 1}</span>
          {lp.player.avatarUrl && (
            <img
              src={lp.player.avatarUrl}
              alt=""
              className={styles.avatar}
            />
          )}
          <div className={styles.info}>
            <Link to={`/players/${lp.player.id}`} className={styles.gamerTag}>{lp.player.gamerTag}</Link>
            {lp.player.mainCharacter && (
              <div className={styles.character}>{lp.player.mainCharacter}</div>
            )}
          </div>
          <span className={styles.points}>{lp.points}</span>
        </div>
      ))}
    </div>
  );
}
