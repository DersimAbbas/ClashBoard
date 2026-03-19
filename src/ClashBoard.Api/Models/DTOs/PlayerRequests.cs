namespace ClashBoard.Api.Models.DTOs;

public record CreatePlayerRequest(
    string GamerTag,
    string? RealName = null,
    string? MainCharacter = null,
    string? SecondaryCharacter = null,
    string? AvatarUrl = null,
    string? Region = null
);

public record UpdatePlayerRequest(
    string GamerTag,
    string? RealName,
    string? MainCharacter,
    string? SecondaryCharacter,
    string? AvatarUrl,
    string? Region
);
