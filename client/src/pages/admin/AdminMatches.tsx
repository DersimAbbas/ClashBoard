import { Link } from "react-router-dom";
import { useMatches, useDeleteMatch } from "../../hooks/useMatches";
import { MatchStatus } from "../../types/match";
import styles from "./Admin.module.css";

const statusLabel: Record<number, { text: string; className: string }> = {
  [MatchStatus.Scheduled]: { text: "Scheduled", className: styles.statusScheduled },
  [MatchStatus.Completed]: { text: "Completed", className: styles.statusCompleted },
  [MatchStatus.Cancelled]: { text: "Cancelled", className: styles.statusCancelled },
};

export default function AdminMatches() {
  const { data: matches, isLoading } = useMatches();
  const deleteMutation = useDeleteMatch();

  function handleDelete(id: string) {
    if (!confirm("Delete this match?")) return;
    deleteMutation.mutate(id);
  }

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Matches</h1>
        <Link to="/admin/matches/new" className={styles.btnPrimary}>
          + New Match
        </Link>
      </div>

      {isLoading && <div className={styles.loading}>Loading...</div>}

      {matches && matches.length === 0 && (
        <div className={styles.empty}>No matches yet.</div>
      )}

      {matches && matches.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Player 1</th>
              <th>Player 2</th>
              <th>Score</th>
              <th>Status</th>
              <th>Winner</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match) => {
              const status = statusLabel[match.status] ?? {
                text: "Unknown",
                className: styles.statusBadge,
              };
              return (
                <tr key={match.id}>
                  <td>{match.player1.gamerTag}</td>
                  <td>{match.player2.gamerTag}</td>
                  <td>
                    {match.player1Score} – {match.player2Score}
                  </td>
                  <td>
                    <span className={status.className}>{status.text}</span>
                  </td>
                  <td>{match.winner?.gamerTag ?? "—"}</td>
                  <td>
                    <div className={styles.actions}>
                      <Link
                        to={`/admin/matches/${match.id}/edit`}
                        className={styles.actionLink}
                      >
                        Edit
                      </Link>
                      <button
                        className={styles.actionLinkDanger}
                        onClick={() => handleDelete(match.id)}
                        disabled={deleteMutation.isPending}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
