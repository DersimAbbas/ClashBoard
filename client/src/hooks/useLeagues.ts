import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchLeagues,
  fetchLeague,
  createLeague,
  updateLeague,
  deleteLeague,
} from "../api/leagues";
import type { CreateLeagueData, UpdateLeagueData } from "../api/leagues";
import type { League } from "../types/league";

export function useLeagues() {
  return useQuery<League[]>({
    queryKey: ["leagues"],
    queryFn: fetchLeagues,
  });
}

export function useLeague(id: string) {
  return useQuery<League>({
    queryKey: ["leagues", id],
    queryFn: () => fetchLeague(id),
  });
}

export function useCreateLeague() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateLeagueData) => createLeague(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leagues"] });
    },
  });
}

export function useUpdateLeague() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateLeagueData }) =>
      updateLeague(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leagues"] });
    },
  });
}

export function useDeleteLeague() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteLeague(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leagues"] });
    },
  });
}
