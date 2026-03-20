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

export interface CreateLeagueData {
  name: string;
  description?: string | null;
  gameId: string;
  status?: number;
  pointsPerWin?: number;
  pointsPerDraw?: number;
  pointsPerLoss?: number;
  startDate?: string | null;
  endDate?: string | null;
}

export type UpdateLeagueData = CreateLeagueData;

export async function createLeague(data: CreateLeagueData): Promise<League> {
  const response = await fetch("/api/leagues", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to create league: ${response.status}`);
  }

  return response.json();
}

export async function updateLeague(
  id: string,
  data: UpdateLeagueData
): Promise<League> {
  const response = await fetch(`/api/leagues/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to update league: ${response.status}`);
  }

  return response.json();
}

export async function deleteLeague(id: string): Promise<void> {
  const response = await fetch(`/api/leagues/${id}`, { method: "DELETE" });

  if (!response.ok) {
    throw new Error(`Failed to delete league: ${response.status}`);
  }
}
