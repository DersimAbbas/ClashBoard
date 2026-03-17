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
