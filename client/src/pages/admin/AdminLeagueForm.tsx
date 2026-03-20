import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useLeague,
  useCreateLeague,
  useUpdateLeague,
} from "../../hooks/useLeagues";
import { LeagueStatus } from "../../types/league";
import styles from "./Admin.module.css";

export default function AdminLeagueForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const { data: existing, isLoading } = useLeague(id ?? "");
  const createMutation = useCreateLeague();
  const updateMutation = useUpdateLeague();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [gameId, setGameId] = useState("");
  const [status, setStatus] = useState<number>(LeagueStatus.Upcoming);
  const [pointsPerWin, setPointsPerWin] = useState(3);
  const [pointsPerDraw, setPointsPerDraw] = useState(1);
  const [pointsPerLoss, setPointsPerLoss] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (existing) {
      setName(existing.name);
      setDescription(existing.description ?? "");
      setGameId(existing.gameId);
      setStatus(existing.status);
      setPointsPerWin(existing.pointsPerWin);
      setPointsPerDraw(existing.pointsPerDraw);
      setPointsPerLoss(existing.pointsPerLoss);
      setStartDate(existing.startDate?.slice(0, 10) ?? "");
      setEndDate(existing.endDate?.slice(0, 10) ?? "");
    }
  }, [existing]);

  const isPending = createMutation.isPending || updateMutation.isPending;
  const error = createMutation.error || updateMutation.error;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data = {
      name,
      description: description || null,
      gameId,
      status,
      pointsPerWin,
      pointsPerDraw,
      pointsPerLoss,
      startDate: startDate || null,
      endDate: endDate || null,
    };

    if (isEdit && id) {
      updateMutation.mutate(
        { id, data },
        { onSuccess: () => navigate("/admin/leagues") }
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => navigate("/admin/leagues"),
      });
    }
  }

  if (isEdit && isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <>
      <h1 className={styles.title}>{isEdit ? "Edit League" : "New League"}</h1>

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
          <label className={styles.label}>Description</label>
          <input
            className={styles.input}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Game ID *</label>
          <input
            className={styles.input}
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
            required
            placeholder="GUID of the game"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Status</label>
          <select
            className={styles.select}
            value={status}
            onChange={(e) => setStatus(Number(e.target.value))}
          >
            <option value={LeagueStatus.Upcoming}>Upcoming</option>
            <option value={LeagueStatus.Active}>Active</option>
            <option value={LeagueStatus.Completed}>Completed</option>
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Points per Win</label>
          <input
            className={styles.input}
            type="number"
            value={pointsPerWin}
            onChange={(e) => setPointsPerWin(Number(e.target.value))}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Points per Draw</label>
          <input
            className={styles.input}
            type="number"
            value={pointsPerDraw}
            onChange={(e) => setPointsPerDraw(Number(e.target.value))}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Points per Loss</label>
          <input
            className={styles.input}
            type="number"
            value={pointsPerLoss}
            onChange={(e) => setPointsPerLoss(Number(e.target.value))}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Start Date</label>
          <input
            className={styles.input}
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>End Date</label>
          <input
            className={styles.input}
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.btnPrimary} disabled={isPending}>
            {isPending ? "Saving..." : isEdit ? "Update" : "Create"}
          </button>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={() => navigate("/admin/leagues")}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
