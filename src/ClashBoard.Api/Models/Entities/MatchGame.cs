namespace ClashBoard.Api.Models.Entities;

/// <summary>
/// Individual round/game within a match set.
/// Optional granularity — matches work fine with just Player1Score/Player2Score.
/// </summary>
public class MatchGame
{
    public Guid Id { get; set; }
    public Guid MatchId { get; set; }
    public int GameNumber { get; set; }
    public Guid WinnerId { get; set; }
    public string? Player1Character { get; set; }
    public string? Player2Character { get; set; }
    public bool? IsPerfect { get; set; }

    // Navigation
    public Match Match { get; set; } = null!;
    public Player Winner { get; set; } = null!;
}
