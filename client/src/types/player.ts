export interface PlayerLeague {
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
  recentForm: string | null;
  joinedAt: string;
  league: {
    id: string;
    name: string;
  };
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
  leaguePlayers: PlayerLeague[];
}
