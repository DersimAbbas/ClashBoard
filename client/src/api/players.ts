import type { Player } from "../types/player";

export async function fetchPlayers(): Promise<Player[]> {
  const response = await fetch("/api/players");

  if (!response.ok) {
    throw new Error(`Failed to fetch players: ${response.status}`);
  }

  return response.json();
}
