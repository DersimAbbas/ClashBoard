import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGame,
  useCreateGame,
  useUpdateGame,
} from "../../hooks/useGames";
import styles from "./Admin.module.css";

export default function AdminGameForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const { data: existing, isLoading } = useGame(id ?? "");
  const createMutation = useCreateGame();
  const updateMutation = useUpdateGame();

  const [name, setName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");

  useEffect(() => {
    if (existing) {
      setName(existing.name);
      setLogoUrl(existing.logoUrl ?? "");
    }
  }, [existing]);

  const isPending = createMutation.isPending || updateMutation.isPending;
  const error = createMutation.error || updateMutation.error;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data = {
      name,
      logoUrl: logoUrl || null,
    };

    if (isEdit && id) {
      updateMutation.mutate(
        { id, data },
        { onSuccess: () => navigate("/admin/games") }
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => navigate("/admin/games"),
      });
    }
  }

  if (isEdit && isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <>
      <h1 className={styles.title}>
        {isEdit ? "Edit Game" : "New Game"}
      </h1>

      {error && <div className={styles.error}>{error.message}</div>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label}>Name *</label>
          <input
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Logo URL</label>
          <input
            className={styles.input}
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
          />
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.btnPrimary} disabled={isPending}>
            {isPending ? "Saving..." : isEdit ? "Update" : "Create"}
          </button>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={() => navigate("/admin/games")}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
