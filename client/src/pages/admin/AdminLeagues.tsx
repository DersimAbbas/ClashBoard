import { Link } from "react-router-dom";
import { useLeagues, useDeleteLeague } from "../../hooks/useLeagues";
import { LeagueStatus } from "../../types/league";
import styles from "./Admin.module.css";

const statusLabel: Record<number, { text: string; className: string }> = {
  [LeagueStatus.Upcoming]: { text: "Upcoming", className: styles.statusUpcoming },
  [LeagueStatus.Active]: { text: "Active", className: styles.statusActive },
  [LeagueStatus.Completed]: { text: "Completed", className: styles.statusCompleted },
};

export default function AdminLeagues() {
  const { data: leagues, isLoading } = useLeagues();
  const deleteMutation = useDeleteLeague();

  function handleDelete(id: string, name: string) {
    if (!confirm(`Delete league "${name}"?`)) return;
    deleteMutation.mutate(id);
  }

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Leagues</h1>
        <Link to="/admin/leagues/new" className={styles.btnPrimary}>
          + New League
        </Link>
      </div>

      {isLoading && <div className={styles.loading}>Loading...</div>}

      {leagues && leagues.length === 0 && (
        <div className={styles.empty}>No leagues yet.</div>
      )}

      {leagues && leagues.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Game</th>
              <th>Status</th>
              <th>Players</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leagues.map((league) => {
              const status = statusLabel[league.status] ?? {
                text: "Unknown",
                className: styles.statusBadge,
              };
              return (
                <tr key={league.id}>
                  <td>{league.name}</td>
                  <td>{league.game.name}</td>
                  <td>
                    <span className={status.className}>{status.text}</span>
                  </td>
                  <td>{league.leaguePlayers.length}</td>
                  <td>
                    <div className={styles.actions}>
                      <Link
                        to={`/admin/leagues/${league.id}/edit`}
                        className={styles.actionLink}
                      >
                        Edit
                      </Link>
                      <button
                        className={styles.actionLinkDanger}
                        onClick={() => handleDelete(league.id, league.name)}
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
