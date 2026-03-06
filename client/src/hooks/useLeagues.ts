import { useQuery } from "@tanstack/react-query";
import { fetchLeagues } from "../api/leagues";
import type { League } from "../types/league";

export function useLeagues() {
  return useQuery<League[]>({
    queryKey: ["leagues"],
    queryFn: fetchLeagues,
  });
}
