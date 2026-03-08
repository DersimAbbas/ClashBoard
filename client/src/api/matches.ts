import type { Match } from "../types/match";

export async function fetchMatches(): Promise<Match[]> {
  const response = await fetch("/api/matches");

  if (!response.ok) {
    throw new Error(`Failed to fetch matches: ${response.status}`);
  }

  return response.json();
}
