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

export interface CreateMatchData {
  leagueId: string;
  player1Id: string;
  player2Id: string;
  status?: number;
  player1Character?: string | null;
  player2Character?: string | null;
  notes?: string | null;
  scheduledAt?: string | null;
}

export interface UpdateMatchData {
  leagueId: string;
  player1Id: string;
  player2Id: string;
  winnerId?: string | null;
  status: number;
  player1Score: number;
  player2Score: number;
  player1Character?: string | null;
  player2Character?: string | null;
  notes?: string | null;
  scheduledAt?: string | null;
  completedAt?: string | null;
}

export async function createMatch(data: CreateMatchData): Promise<Match> {
  const response = await fetch("/api/matches", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to create match: ${response.status}`);
  }

  return response.json();
}

export async function updateMatch(
  id: string,
  data: UpdateMatchData
): Promise<Match> {
  const response = await fetch(`/api/matches/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to update match: ${response.status}`);
  }

  return response.json();
}

export async function deleteMatch(id: string): Promise<void> {
  const response = await fetch(`/api/matches/${id}`, { method: "DELETE" });

  if (!response.ok) {
    throw new Error(`Failed to delete match: ${response.status}`);
  }
}
