import { useQuery } from "@tanstack/react-query";
import { fetchPlayers } from "../api/players";
import type { Player } from "../types/player";

export function usePlayers() {
  return useQuery<Player[]>({
    queryKey: ["players"],
    queryFn: fetchPlayers,
  });
}
