import type { Player } from "./league";

export const MatchStatus = {
  Scheduled: 0,
  Completed: 1,
  Cancelled: 2,
} as const;

export type MatchStatus = (typeof MatchStatus)[keyof typeof MatchStatus];

export interface MatchGame {
  id: string;
  matchId: string;
  gameNumber: number;
  winnerId: string;
  player1Character: string | null;
  player2Character: string | null;
  isPerfect: boolean | null;
}

export interface Match {
  id: string;
  leagueId: string;
  player1Id: string;
  player2Id: string;
  winnerId: string | null;
  status: MatchStatus;
  player1Score: number;
  player2Score: number;
  player1Character: string | null;
  player2Character: string | null;
  notes: string | null;
  scheduledAt: string | null;
  completedAt: string | null;
  createdAt: string;
  player1: Player;
  player2: Player;
  winner: Player | null;
  games: MatchGame[];
}
