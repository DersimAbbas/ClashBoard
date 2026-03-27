import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchGames,
  fetchGame,
  createGame,
  updateGame,
  deleteGame,
} from "../api/games";
import type { CreateGameData, UpdateGameData } from "../api/games";
import type { Game } from "../types/league";

export function useGames() {
  return useQuery<Game[]>({
    queryKey: ["games"],
    queryFn: fetchGames,
  });
}

export function useGame(id: string) {
  return useQuery<Game>({
    queryKey: ["games", id],
    queryFn: () => fetchGame(id),
    enabled: !!id,
  });
}

export function useCreateGame() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateGameData) => createGame(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
    },
  });
}

export function useUpdateGame() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateGameData }) =>
      updateGame(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
    },
  });
}

export function useDeleteGame() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteGame(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
    },
  });
}
