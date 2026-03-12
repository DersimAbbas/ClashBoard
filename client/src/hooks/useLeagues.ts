import { useQuery } from "@tanstack/react-query";
import { fetchLeagues, fetchLeague } from "../api/leagues";
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
