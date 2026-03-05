namespace ClashBoard.Api.Models.Entities;

/// <summary>
/// Join table between League and Player, with denormalized standings data
/// for fast leaderboard reads. Updated whenever a match result is recorded.
/// </summary>
public class LeaguePlayer
{
    public Guid Id { get; set; }
    public Guid LeagueId { get; set; }
    public Guid PlayerId { get; set; }

    // Standings data (denormalized)
    public int Wins { get; set; }
    public int Losses { get; set; }
    public int Draws { get; set; }
    public int Points { get; set; }
    public int MatchesPlayed { get; set; }
    public int GamesWon { get; set; }
    public int GamesLost { get; set; }
    public int CurrentWinStreak { get; set; }
    public int BestWinStreak { get; set; }
    public string? RecentForm { get; set; } // "W,W,L,W,L" — last 5 results

    public DateTime JoinedAt { get; set; }

    // Navigation
    public League League { get; set; } = null!;
    public Player Player { get; set; } = null!;
}
