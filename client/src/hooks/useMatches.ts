import { useQuery } from "@tanstack/react-query";
import { fetchMatches, fetchLeagueMatches } from "../api/matches";
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
