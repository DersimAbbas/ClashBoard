import type { Match } from "../types/match";

export async function fetchMatches(): Promise<Match[]> {
  const response = await fetch("/api/matches");

  if (!response.ok) {
    throw new Error(`Failed to fetch matches: ${response.status}`);
  }

  return response.json();
}

export async function fetchLeagueMatches(leagueId: string): Promise<Match[]> {
  const response = await fetch(`/api/leagues/${leagueId}/matches`);

  if (!response.ok) {
    throw new Error(`Failed to fetch league matches: ${response.status}`);
  }

  return response.json();
}
