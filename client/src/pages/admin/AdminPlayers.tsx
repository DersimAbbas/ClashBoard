import { Link } from "react-router-dom";
import { usePlayers, useDeletePlayer } from "../../hooks/usePlayers";
import styles from "./Admin.module.css";

export default function AdminPlayers() {
  const { data: players, isLoading } = usePlayers();
  const deleteMutation = useDeletePlayer();

  function handleDelete(id: string, tag: string) {
    if (!confirm(`Delete player "${tag}"?`)) return;
    deleteMutation.mutate(id);
  }

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Players</h1>
        <Link to="/admin/players/new" className={styles.btnPrimary}>
          + New Player
        </Link>
      </div>

      {isLoading && <div className={styles.loading}>Loading...</div>}

      {players && players.length === 0 && (
        <div className={styles.empty}>No players yet.</div>
      )}

      {players && players.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Gamer Tag</th>
              <th>Real Name</th>
              <th>Main Character</th>
              <th>Region</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.id}>
                <td>{player.gamerTag}</td>
                <td>{player.realName ?? "—"}</td>
                <td>{player.mainCharacter ?? "—"}</td>
                <td>{player.region ?? "—"}</td>
                <td>
                  <div className={styles.actions}>
                    <Link
                      to={`/admin/players/${player.id}/edit`}
                      className={styles.actionLink}
                    >
                      Edit
                    </Link>
                    <button
                      className={styles.actionLinkDanger}
                      onClick={() => handleDelete(player.id, player.gamerTag)}
                      disabled={deleteMutation.isPending}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
