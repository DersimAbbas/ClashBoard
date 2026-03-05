namespace ClashBoard.Api.Models.Entities;

public class Game
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public string? LogoUrl { get; set; }
    public DateTime CreatedAt { get; set; }

    // Navigation
    public ICollection<League> Leagues { get; set; } = [];
}
