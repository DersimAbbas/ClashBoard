import type { Player } from "../types/player";

export async function fetchPlayers(): Promise<Player[]> {
  const response = await fetch("/api/players");

  if (!response.ok) {
    throw new Error(`Failed to fetch players: ${response.status}`);
  }

  return response.json();
}

export async function fetchPlayer(id: string): Promise<Player> {
  const response = await fetch(`/api/players/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch player: ${response.status}`);
  }

  return response.json();
}

export interface CreatePlayerData {
  gamerTag: string;
  realName?: string | null;
  mainCharacter?: string | null;
  secondaryCharacter?: string | null;
  avatarUrl?: string | null;
  region?: string | null;
}

export type UpdatePlayerData = CreatePlayerData;

export async function createPlayer(data: CreatePlayerData): Promise<Player> {
  const response = await fetch("/api/players", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const status = response.status;
    if (status === 409) throw new Error("A player with this gamer tag already exists");
    throw new Error(`Failed to create player: ${status}`);
  }

  return response.json();
}

export async function updatePlayer(
  id: string,
  data: UpdatePlayerData
): Promise<Player> {
  const response = await fetch(`/api/players/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const status = response.status;
    if (status === 409) throw new Error("A player with this gamer tag already exists");
    throw new Error(`Failed to update player: ${status}`);
  }

  return response.json();
}

export async function deletePlayer(id: string): Promise<void> {
  const response = await fetch(`/api/players/${id}`, { method: "DELETE" });

  if (!response.ok) {
    throw new Error(`Failed to delete player: ${response.status}`);
  }
}
