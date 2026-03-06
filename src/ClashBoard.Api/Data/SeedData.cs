using ClashBoard.Api.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace ClashBoard.Api.Data;

public static class SeedData
{
    public static async Task InitializeAsync(AppDbContext db)
    {
        if (await db.Games.AnyAsync())
            return; // Already seeded

        // --- Games ---
        var sf6 = new Game { Id = Guid.Parse("a1000000-0000-0000-0000-000000000001"), Name = "Street Fighter 6" };
        var tekken = new Game { Id = Guid.Parse("a1000000-0000-0000-0000-000000000002"), Name = "Tekken 8" };
        db.Games.AddRange(sf6, tekken);

        // --- Players ---
        var players = new[]
        {
            new Player { Id = Guid.Parse("b1000000-0000-0000-0000-000000000001"), GamerTag = "ShadowKen", RealName = "Alex Rivera", MainCharacter = "Ken", SecondaryCharacter = "Ryu", Region = "NA" },
            new Player { Id = Guid.Parse("b1000000-0000-0000-0000-000000000002"), GamerTag = "IceQueen", RealName = "Mina Park", MainCharacter = "Chun-Li", SecondaryCharacter = "Juri", Region = "KR" },
            new Player { Id = Guid.Parse("b1000000-0000-0000-0000-000000000003"), GamerTag = "TigerClaw", RealName = "Ravi Patel", MainCharacter = "Rashid", SecondaryCharacter = "Jamie", Region = "EU" },
            new Player { Id = Guid.Parse("b1000000-0000-0000-0000-000000000004"), GamerTag = "BlazeFist", RealName = "Marcus Cole", MainCharacter = "Luke", SecondaryCharacter = "Guile", Region = "NA" },
        };
        db.Players.AddRange(players);

        // --- League ---
        var league = new League
        {
            Id = Guid.Parse("c1000000-0000-0000-0000-000000000001"),
            Name = "SF6 Season 1",
            Description = "Street Fighter 6 ranked league — Spring 2026",
            GameId = sf6.Id,
            Status = LeagueStatus.Active,
            StartDate = new DateTime(2026, 3, 1, 0, 0, 0, DateTimeKind.Utc),
        };
        db.Leagues.Add(league);

        // --- LeaguePlayers (denormalized standings) ---
        var leaguePlayers = new[]
        {
            new LeaguePlayer { Id = Guid.Parse("d1000000-0000-0000-0000-000000000001"), LeagueId = league.Id, PlayerId = players[0].Id, Wins = 3, Losses = 1, Draws = 0, Points = 9, MatchesPlayed = 4, GamesWon = 8, GamesLost = 4, CurrentWinStreak = 2, BestWinStreak = 3, RecentForm = "W,W,L,W" },
            new LeaguePlayer { Id = Guid.Parse("d1000000-0000-0000-0000-000000000002"), LeagueId = league.Id, PlayerId = players[1].Id, Wins = 3, Losses = 1, Draws = 0, Points = 9, MatchesPlayed = 4, GamesWon = 7, GamesLost = 5, CurrentWinStreak = 1, BestWinStreak = 2, RecentForm = "W,L,W,W" },
            new LeaguePlayer { Id = Guid.Parse("d1000000-0000-0000-0000-000000000003"), LeagueId = league.Id, PlayerId = players[2].Id, Wins = 1, Losses = 2, Draws = 1, Points = 4, MatchesPlayed = 4, GamesWon = 5, GamesLost = 7, CurrentWinStreak = 0, BestWinStreak = 1, RecentForm = "L,W,D,L" },
            new LeaguePlayer { Id = Guid.Parse("d1000000-0000-0000-0000-000000000004"), LeagueId = league.Id, PlayerId = players[3].Id, Wins = 1, Losses = 3, Draws = 1, Points = 4, MatchesPlayed = 4, GamesWon = 4, GamesLost = 8, CurrentWinStreak = 0, BestWinStreak = 1, RecentForm = "L,L,D,W" },
        };
        db.LeaguePlayers.AddRange(leaguePlayers);

        // --- Matches (3 completed) ---
        var match1 = new Match
        {
            Id = Guid.Parse("e1000000-0000-0000-0000-000000000001"),
            LeagueId = league.Id,
            Player1Id = players[0].Id, Player2Id = players[1].Id,
            WinnerId = players[0].Id,
            Status = MatchStatus.Completed,
            Player1Score = 2, Player2Score = 1,
            Player1Character = "Ken", Player2Character = "Chun-Li",
            ScheduledAt = new DateTime(2026, 3, 2, 18, 0, 0, DateTimeKind.Utc),
            CompletedAt = new DateTime(2026, 3, 2, 18, 45, 0, DateTimeKind.Utc),
        };
        var match2 = new Match
        {
            Id = Guid.Parse("e1000000-0000-0000-0000-000000000002"),
            LeagueId = league.Id,
            Player1Id = players[2].Id, Player2Id = players[3].Id,
            WinnerId = players[2].Id,
            Status = MatchStatus.Completed,
            Player1Score = 2, Player2Score = 0,
            Player1Character = "Rashid", Player2Character = "Luke",
            ScheduledAt = new DateTime(2026, 3, 2, 20, 0, 0, DateTimeKind.Utc),
            CompletedAt = new DateTime(2026, 3, 2, 20, 30, 0, DateTimeKind.Utc),
        };
        var match3 = new Match
        {
            Id = Guid.Parse("e1000000-0000-0000-0000-000000000003"),
            LeagueId = league.Id,
            Player1Id = players[0].Id, Player2Id = players[2].Id,
            WinnerId = players[0].Id,
            Status = MatchStatus.Completed,
            Player1Score = 2, Player2Score = 1,
            Player1Character = "Ken", Player2Character = "Rashid",
            ScheduledAt = new DateTime(2026, 3, 4, 18, 0, 0, DateTimeKind.Utc),
            CompletedAt = new DateTime(2026, 3, 4, 18, 50, 0, DateTimeKind.Utc),
        };
        db.Matches.AddRange(match1, match2, match3);

        // --- MatchGames (rounds within matches) ---
        db.MatchGames.AddRange(
            // Match 1: ShadowKen vs IceQueen (2-1)
            new MatchGame { Id = Guid.Parse("f1000000-0000-0000-0000-000000000001"), MatchId = match1.Id, GameNumber = 1, WinnerId = players[0].Id, Player1Character = "Ken", Player2Character = "Chun-Li" },
            new MatchGame { Id = Guid.Parse("f1000000-0000-0000-0000-000000000002"), MatchId = match1.Id, GameNumber = 2, WinnerId = players[1].Id, Player1Character = "Ken", Player2Character = "Juri" },
            new MatchGame { Id = Guid.Parse("f1000000-0000-0000-0000-000000000003"), MatchId = match1.Id, GameNumber = 3, WinnerId = players[0].Id, Player1Character = "Ken", Player2Character = "Chun-Li" },
            // Match 2: TigerClaw vs BlazeFist (2-0)
            new MatchGame { Id = Guid.Parse("f1000000-0000-0000-0000-000000000004"), MatchId = match2.Id, GameNumber = 1, WinnerId = players[2].Id, Player1Character = "Rashid", Player2Character = "Luke" },
            new MatchGame { Id = Guid.Parse("f1000000-0000-0000-0000-000000000005"), MatchId = match2.Id, GameNumber = 2, WinnerId = players[2].Id, Player1Character = "Rashid", Player2Character = "Guile" },
            // Match 3: ShadowKen vs TigerClaw (2-1)
            new MatchGame { Id = Guid.Parse("f1000000-0000-0000-0000-000000000006"), MatchId = match3.Id, GameNumber = 1, WinnerId = players[2].Id, Player1Character = "Rashid", Player2Character = "Ken" },
            new MatchGame { Id = Guid.Parse("f1000000-0000-0000-0000-000000000007"), MatchId = match3.Id, GameNumber = 2, WinnerId = players[0].Id, Player1Character = "Ken", Player2Character = "Rashid" },
            new MatchGame { Id = Guid.Parse("f1000000-0000-0000-0000-000000000008"), MatchId = match3.Id, GameNumber = 3, WinnerId = players[0].Id, Player1Character = "Ken", Player2Character = "Rashid" }
        );

        await db.SaveChangesAsync();
    }
}
