using ClashBoard.Api.Models.Entities;

namespace ClashBoard.Api.Models.DTOs;

public record CreateLeagueRequest(
    string Name,
    string? Description,
    Guid GameId,
    LeagueStatus Status = LeagueStatus.Upcoming,
    int PointsPerWin = 3,
    int PointsPerDraw = 1,
    int PointsPerLoss = 0,
    DateTime? StartDate = null,
    DateTime? EndDate = null
);

public record UpdateLeagueRequest(
    string Name,
    string? Description,
    Guid GameId,
    LeagueStatus Status,
    int PointsPerWin,
    int PointsPerDraw,
    int PointsPerLoss,
    DateTime? StartDate,
    DateTime? EndDate
);
