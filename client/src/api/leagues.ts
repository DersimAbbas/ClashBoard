import type { League } from "../types/league";

export async function fetchLeagues(): Promise<League[]> {
  const response = await fetch("/api/leagues");

  if (!response.ok) {
    throw new Error(`Failed to fetch leagues: ${response.status}`);
  }

  return response.json();
}

export async function fetchLeague(id: string): Promise<League> {
  const response = await fetch(`/api/leagues/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch league: ${response.status}`);
  }

  return response.json();
}
