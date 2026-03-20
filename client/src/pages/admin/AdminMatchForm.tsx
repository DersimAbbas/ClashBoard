import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMatches, useCreateMatch, useUpdateMatch } from "../../hooks/useMatches";
import { useLeagues } from "../../hooks/useLeagues";
import { usePlayers } from "../../hooks/usePlayers";
import { MatchStatus } from "../../types/match";
import styles from "./Admin.module.css";

export default function AdminMatchForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const { data: matches } = useMatches();
  const { data: leagues } = useLeagues();
  const { data: players } = usePlayers();
  const createMutation = useCreateMatch();
  const updateMutation = useUpdateMatch();

  const existing = isEdit ? matches?.find((m) => m.id === id) : undefined;

  const [leagueId, setLeagueId] = useState("");
  const [player1Id, setPlayer1Id] = useState("");
  const [player2Id, setPlayer2Id] = useState("");
  const [status, setStatus] = useState<number>(MatchStatus.Scheduled);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [winnerId, setWinnerId] = useState("");
  const [player1Character, setPlayer1Character] = useState("");
  const [player2Character, setPlayer2Character] = useState("");
  const [notes, setNotes] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");

  useEffect(() => {
    if (existing) {
      setLeagueId(existing.leagueId);
      setPlayer1Id(existing.player1Id);
      setPlayer2Id(existing.player2Id);
      setStatus(existing.status);
      setPlayer1Score(existing.player1Score);
      setPlayer2Score(existing.player2Score);
      setWinnerId(existing.winnerId ?? "");
      setPlayer1Character(existing.player1Character ?? "");
      setPlayer2Character(existing.player2Character ?? "");
      setNotes(existing.notes ?? "");
      setScheduledAt(existing.scheduledAt?.slice(0, 16) ?? "");
    }
  }, [existing]);

  const isPending = createMutation.isPending || updateMutation.isPending;
  const error = createMutation.error || updateMutation.error;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (isEdit && id) {
      updateMutation.mutate(
        {
          id,
          data: {
            leagueId,
            player1Id,
            player2Id,
            winnerId: winnerId || null,
            status,
            player1Score,
            player2Score,
            player1Character: player1Character || null,
            player2Character: player2Character || null,
            notes: notes || null,
            scheduledAt: scheduledAt || null,
            completedAt:
              status === MatchStatus.Completed ? new Date().toISOString() : null,
          },
        },
        { onSuccess: () => navigate("/admin/matches") }
      );
    } else {
      createMutation.mutate(
        {
          leagueId,
          player1Id,
          player2Id,
          status,
          player1Character: player1Character || null,
          player2Character: player2Character || null,
          notes: notes || null,
          scheduledAt: scheduledAt || null,
        },
        { onSuccess: () => navigate("/admin/matches") }
      );
    }
  }

  if (isEdit && !existing && matches) {
    return <div className={styles.error}>Match not found.</div>;
  }

  return (
    <>
      <h1 className={styles.title}>{isEdit ? "Edit Match" : "New Match"}</h1>

      {error && <div className={styles.error}>{error.message}</div>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label}>League *</label>
          <select
            className={styles.select}
            value={leagueId}
            onChange={(e) => setLeagueId(e.target.value)}
            required
          >
            <option value="">Select league...</option>
            {leagues?.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Player 1 *</label>
          <select
            className={styles.select}
            value={player1Id}
            onChange={(e) => setPlayer1Id(e.target.value)}
            required
          >
            <option value="">Select player...</option>
            {players?.map((p) => (
              <option key={p.id} value={p.id}>
                {p.gamerTag}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Player 2 *</label>
          <select
            className={styles.select}
            value={player2Id}
            onChange={(e) => setPlayer2Id(e.target.value)}
            required
          >
            <option value="">Select player...</option>
            {players?.map((p) => (
              <option key={p.id} value={p.id}>
                {p.gamerTag}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Status</label>
          <select
            className={styles.select}
            value={status}
            onChange={(e) => setStatus(Number(e.target.value))}
          >
            <option value={MatchStatus.Scheduled}>Scheduled</option>
            <option value={MatchStatus.Completed}>Completed</option>
            <option value={MatchStatus.Cancelled}>Cancelled</option>
          </select>
        </div>

        {isEdit && (
          <>
            <div className={styles.field}>
              <label className={styles.label}>Player 1 Score</label>
              <input
                className={styles.input}
                type="number"
                min={0}
                value={player1Score}
                onChange={(e) => setPlayer1Score(Number(e.target.value))}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Player 2 Score</label>
              <input
                className={styles.input}
                type="number"
                min={0}
                value={player2Score}
                onChange={(e) => setPlayer2Score(Number(e.target.value))}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Winner</label>
              <select
                className={styles.select}
                value={winnerId}
                onChange={(e) => setWinnerId(e.target.value)}
              >
                <option value="">No winner</option>
                {player1Id && (
                  <option value={player1Id}>
                    {players?.find((p) => p.id === player1Id)?.gamerTag ??
                      "Player 1"}
                  </option>
                )}
                {player2Id && (
                  <option value={player2Id}>
                    {players?.find((p) => p.id === player2Id)?.gamerTag ??
                      "Player 2"}
                  </option>
                )}
              </select>
            </div>
          </>
        )}

        <div className={styles.field}>
          <label className={styles.label}>Player 1 Character</label>
          <input
            className={styles.input}
            value={player1Character}
            onChange={(e) => setPlayer1Character(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Player 2 Character</label>
          <input
            className={styles.input}
            value={player2Character}
            onChange={(e) => setPlayer2Character(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Scheduled At</label>
          <input
            className={styles.input}
            type="datetime-local"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Notes</label>
          <input
            className={styles.input}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.btnPrimary} disabled={isPending}>
            {isPending ? "Saving..." : isEdit ? "Update" : "Create"}
          </button>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={() => navigate("/admin/matches")}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
