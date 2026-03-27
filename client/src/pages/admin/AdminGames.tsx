import { Link } from "react-router-dom";
import { useGames, useDeleteGame } from "../../hooks/useGames";
import styles from "./Admin.module.css";

export default function AdminGames() {
  const { data: games, isLoading } = useGames();
  const deleteMutation = useDeleteGame();

  function handleDelete(id: string, name: string) {
    if (!confirm(`Delete game "${name}"?`)) return;
    deleteMutation.mutate(id);
  }

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Games</h1>
        <Link to="/admin/games/new" className={styles.btnPrimary}>
          + New Game
        </Link>
      </div>

      {isLoading && <div className={styles.loading}>Loading...</div>}

      {games && games.length === 0 && (
        <div className={styles.empty}>No games yet.</div>
      )}

      {games && games.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Logo URL</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game.id}>
                <td>{game.name}</td>
                <td>{game.logoUrl ?? "—"}</td>
                <td>{new Date(game.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className={styles.actions}>
                    <Link
                      to={`/admin/games/${game.id}/edit`}
                      className={styles.actionLink}
                    >
                      Edit
                    </Link>
                    <button
                      className={styles.actionLinkDanger}
                      onClick={() => handleDelete(game.id, game.name)}
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
