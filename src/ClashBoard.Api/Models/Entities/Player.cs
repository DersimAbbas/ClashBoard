namespace ClashBoard.Api.Models.Entities;

public class Player
{
    public Guid Id { get; set; }
    public required string GamerTag { get; set; }
    public string? RealName { get; set; }
    public string? MainCharacter { get; set; }
    public string? SecondaryCharacter { get; set; }
    public string? AvatarUrl { get; set; }
    public string? Region { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }

    // Navigation
    public ICollection<LeaguePlayer> LeaguePlayers { get; set; } = [];
    public ICollection<Match> MatchesAsPlayer1 { get; set; } = [];
    public ICollection<Match> MatchesAsPlayer2 { get; set; } = [];
}
