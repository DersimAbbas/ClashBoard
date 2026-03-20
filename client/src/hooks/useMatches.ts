import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchMatches,
  fetchLeagueMatches,
  createMatch,
  updateMatch,
  deleteMatch,
} from "../api/matches";
import type { CreateMatchData, UpdateMatchData } from "../api/matches";
import type { Match } from "../types/match";

export function useMatches() {
  return useQuery<Match[]>({
    queryKey: ["matches"],
    queryFn: fetchMatches,
  });
}

export function useLeagueMatches(leagueId: string) {
  return useQuery<Match[]>({
    queryKey: ["leagues", leagueId, "matches"],
    queryFn: () => fetchLeagueMatches(leagueId),
  });
}

export function useCreateMatch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateMatchData) => createMatch(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matches"] });
      queryClient.invalidateQueries({ queryKey: ["leagues"] });
    },
  });
}

export function useUpdateMatch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMatchData }) =>
      updateMatch(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matches"] });
      queryClient.invalidateQueries({ queryKey: ["leagues"] });
    },
  });
}

export function useDeleteMatch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteMatch(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matches"] });
      queryClient.invalidateQueries({ queryKey: ["leagues"] });
    },
  });
}
