using ClashBoard.Api.Data;
using ClashBoard.Api.Models.DTOs;
using ClashBoard.Api.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ClashBoard.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PlayersController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var players = await PlayerQuery()
            .ToListAsync();

        return Ok(players);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var player = await PlayerQuery()
            .FirstOrDefaultAsync(p => p.Id == id);

        if (player is null)
            return NotFound();

        return Ok(player);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreatePlayerRequest request)
    {
        var tagExists = await db.Players.AnyAsync(p => p.GamerTag == request.GamerTag);
        if (tagExists)
            return Conflict("A player with this gamer tag already exists.");

        var player = new Player
        {
            Id = Guid.NewGuid(),
            GamerTag = request.GamerTag,
            RealName = request.RealName,
            MainCharacter = request.MainCharacter,
            SecondaryCharacter = request.SecondaryCharacter,
            AvatarUrl = request.AvatarUrl,
            Region = request.Region,
            CreatedAt = DateTime.UtcNow
        };

        db.Players.Add(player);
        await db.SaveChangesAsync();

        var created = await PlayerQuery().FirstAsync(p => p.Id == player.Id);
        return CreatedAtAction(nameof(GetById), new { id = player.Id }, created);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdatePlayerRequest request)
    {
        var player = await db.Players.FindAsync(id);
        if (player is null)
            return NotFound();

        var tagConflict = await db.Players.AnyAsync(p => p.GamerTag == request.GamerTag && p.Id != id);
        if (tagConflict)
            return Conflict("A player with this gamer tag already exists.");

        player.GamerTag = request.GamerTag;
        player.RealName = request.RealName;
        player.MainCharacter = request.MainCharacter;
        player.SecondaryCharacter = request.SecondaryCharacter;
        player.AvatarUrl = request.AvatarUrl;
        player.Region = request.Region;
        player.UpdatedAt = DateTime.UtcNow;

        await db.SaveChangesAsync();

        var updated = await PlayerQuery().FirstAsync(p => p.Id == id);
        return Ok(updated);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var player = await db.Players.FindAsync(id);
        if (player is null)
            return NotFound();

        db.Players.Remove(player);
        await db.SaveChangesAsync();

        return NoContent();
    }

    private IQueryable<Player> PlayerQuery()
    {
        return db.Players
            .Include(p => p.LeaguePlayers)
                .ThenInclude(lp => lp.League)
            .OrderBy(p => p.GamerTag)
            .AsNoTracking();
    }
}
