import type { Game } from "../types/league";

export interface CreateGameData {
  name: string;
  logoUrl: string | null;
}

export interface UpdateGameData {
  name: string;
  logoUrl: string | null;
}

export async function fetchGames(): Promise<Game[]> {
  const response = await fetch("/api/games");
  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }
  return response.json();
}

export async function fetchGame(id: string): Promise<Game> {
  const response = await fetch(`/api/games/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch game");
  }
  return response.json();
}

export async function createGame(data: CreateGameData): Promise<Game> {
  const response = await fetch("/api/games", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Failed to create game");
  }
  return response.json();
}

export async function updateGame(id: string, data: UpdateGameData): Promise<Game> {
  const response = await fetch(`/api/games/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Failed to update game");
  }
  return response.json();
}

export async function deleteGame(id: string): Promise<void> {
  const response = await fetch(`/api/games/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Failed to delete game");
  }
}
