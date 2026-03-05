namespace ClashBoard.Api.Models.Entities;

public class League
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }
    public Guid GameId { get; set; }
    public LeagueStatus Status { get; set; }
    public int PointsPerWin { get; set; } = 3;
    public int PointsPerDraw { get; set; } = 1;
    public int PointsPerLoss { get; set; } = 0;
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public DateTime CreatedAt { get; set; }

    // Navigation
    public Game Game { get; set; } = null!;
    public ICollection<LeaguePlayer> LeaguePlayers { get; set; } = [];
    public ICollection<Match> Matches { get; set; } = [];
}

public enum LeagueStatus
{
    Upcoming = 0,
    Active = 1,
    Completed = 2
}
