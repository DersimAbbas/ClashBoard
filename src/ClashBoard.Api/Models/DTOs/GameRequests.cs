namespace ClashBoard.Api.Models.DTOs;

public record CreateGameRequest(
    string Name,
    string? LogoUrl
);

public record UpdateGameRequest(
    string Name,
    string? LogoUrl
);
