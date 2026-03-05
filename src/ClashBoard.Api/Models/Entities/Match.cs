namespace ClashBoard.Api.Models.Entities;

public class Match
{
    public Guid Id { get; set; }
    public Guid LeagueId { get; set; }
    public Guid Player1Id { get; set; }
    public Guid Player2Id { get; set; }
    public Guid? WinnerId { get; set; }
    public MatchStatus Status { get; set; }
    public int Player1Score { get; set; }
    public int Player2Score { get; set; }
    public string? Player1Character { get; set; }
    public string? Player2Character { get; set; }
    public string? Notes { get; set; }
    public DateTime? ScheduledAt { get; set; }
    public DateTime? CompletedAt { get; set; }
    public DateTime CreatedAt { get; set; }

    // Navigation
    public League League { get; set; } = null!;
    public Player Player1 { get; set; } = null!;
    public Player Player2 { get; set; } = null!;
    public Player? Winner { get; set; }
    public ICollection<MatchGame> Games { get; set; } = [];
}

public enum MatchStatus
{
    Scheduled = 0,
    Completed = 1,
    Cancelled = 2
}
