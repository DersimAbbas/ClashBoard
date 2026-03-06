export interface Game {
  id: string;
  name: string;
  logoUrl: string | null;
  createdAt: string;
}

export interface Player {
  id: string;
  gamerTag: string;
  realName: string | null;
  mainCharacter: string | null;
  secondaryCharacter: string | null;
  avatarUrl: string | null;
  region: string | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface LeaguePlayer {
  id: string;
  leagueId: string;
  playerId: string;
  wins: number;
  losses: number;
  draws: number;
  points: number;
  matchesPlayed: number;
  gamesWon: number;
  gamesLost: number;
  currentWinStreak: number;
  bestWinStreak: number;
  recentForm: string | null; // "W,W,L,W,L"
  joinedAt: string;
  player: Player;
}

export const LeagueStatus = {
  Upcoming: 0,
  Active: 1,
  Completed: 2,
} as const;

export type LeagueStatus = (typeof LeagueStatus)[keyof typeof LeagueStatus];

export interface League {
  id: string;
  name: string;
  description: string | null;
  gameId: string;
  status: LeagueStatus;
  pointsPerWin: number;
  pointsPerDraw: number;
  pointsPerLoss: number;
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
  game: Game;
  leaguePlayers: LeaguePlayer[];
}
