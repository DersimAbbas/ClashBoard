import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchPlayers,
  fetchPlayer,
  createPlayer,
  updatePlayer,
  deletePlayer,
} from "../api/players";
import type { CreatePlayerData, UpdatePlayerData } from "../api/players";
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

export function useCreatePlayer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePlayerData) => createPlayer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
    },
  });
}

export function useUpdatePlayer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePlayerData }) =>
      updatePlayer(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
    },
  });
}

export function useDeletePlayer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePlayer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
    },
  });
}
