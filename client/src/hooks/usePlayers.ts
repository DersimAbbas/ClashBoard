import { useQuery } from "@tanstack/react-query";
import { fetchPlayers, fetchPlayer } from "../api/players";
import type { Player } from "../types/player";

export function usePlayers() {
  return useQuery<Player[]>({
    queryKey: ["players"],
    queryFn: fetchPlayers,
  });
}

export function usePlayer(id: string) {
  return useQuery<Player>({
    queryKey: ["players", id],
    queryFn: () => fetchPlayer(id),
  });
}
