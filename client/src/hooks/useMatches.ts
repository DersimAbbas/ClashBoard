import { useQuery } from "@tanstack/react-query";
import { fetchMatches } from "../api/matches";
import type { Match } from "../types/match";

export function useMatches() {
  return useQuery<Match[]>({
    queryKey: ["matches"],
    queryFn: fetchMatches,
  });
}
