using ClashBoard.Api.Models.Entities;

namespace ClashBoard.Api.Models.DTOs;

public record CreateMatchRequest(
    Guid LeagueId,
    Guid Player1Id,
    Guid Player2Id,
    MatchStatus Status = MatchStatus.Scheduled,
    string? Player1Character = null,
    string? Player2Character = null,
    string? Notes = null,
    DateTime? ScheduledAt = null
);

public record UpdateMatchRequest(
    Guid LeagueId,
    Guid Player1Id,
    Guid Player2Id,
    Guid? WinnerId,
    MatchStatus Status,
    int Player1Score,
    int Player2Score,
    string? Player1Character,
    string? Player2Character,
    string? Notes,
    DateTime? ScheduledAt,
    DateTime? CompletedAt
);
