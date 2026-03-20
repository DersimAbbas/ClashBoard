import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  usePlayer,
  useCreatePlayer,
  useUpdatePlayer,
} from "../../hooks/usePlayers";
import styles from "./Admin.module.css";

export default function AdminPlayerForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const { data: existing, isLoading } = usePlayer(id ?? "");
  const createMutation = useCreatePlayer();
  const updateMutation = useUpdatePlayer();

  const [gamerTag, setGamerTag] = useState("");
  const [realName, setRealName] = useState("");
  const [mainCharacter, setMainCharacter] = useState("");
  const [secondaryCharacter, setSecondaryCharacter] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [region, setRegion] = useState("");

  useEffect(() => {
    if (existing) {
      setGamerTag(existing.gamerTag);
      setRealName(existing.realName ?? "");
      setMainCharacter(existing.mainCharacter ?? "");
      setSecondaryCharacter(existing.secondaryCharacter ?? "");
      setAvatarUrl(existing.avatarUrl ?? "");
      setRegion(existing.region ?? "");
    }
  }, [existing]);

  const isPending = createMutation.isPending || updateMutation.isPending;
  const error = createMutation.error || updateMutation.error;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data = {
      gamerTag,
      realName: realName || null,
      mainCharacter: mainCharacter || null,
      secondaryCharacter: secondaryCharacter || null,
      avatarUrl: avatarUrl || null,
      region: region || null,
    };

    if (isEdit && id) {
      updateMutation.mutate(
        { id, data },
        { onSuccess: () => navigate("/admin/players") }
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => navigate("/admin/players"),
      });
    }
  }

  if (isEdit && isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <>
      <h1 className={styles.title}>
        {isEdit ? "Edit Player" : "New Player"}
      </h1>

      {error && <div className={styles.error}>{error.message}</div>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label}>Gamer Tag *</label>
          <input
            className={styles.input}
            value={gamerTag}
            onChange={(e) => setGamerTag(e.target.value)}
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Real Name</label>
          <input
            className={styles.input}
            value={realName}
            onChange={(e) => setRealName(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Main Character</label>
          <input
            className={styles.input}
            value={mainCharacter}
            onChange={(e) => setMainCharacter(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Secondary Character</label>
          <input
            className={styles.input}
            value={secondaryCharacter}
            onChange={(e) => setSecondaryCharacter(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Avatar URL</label>
          <input
            className={styles.input}
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Region</label>
          <input
            className={styles.input}
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.btnPrimary} disabled={isPending}>
            {isPending ? "Saving..." : isEdit ? "Update" : "Create"}
          </button>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={() => navigate("/admin/players")}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
