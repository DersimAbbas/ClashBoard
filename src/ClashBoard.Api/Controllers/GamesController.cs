using ClashBoard.Api.Data;
using ClashBoard.Api.Models.DTOs;
using ClashBoard.Api.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ClashBoard.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GamesController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var games = await db.Games
            .AsNoTracking()
            .OrderBy(g => g.Name)
            .ToListAsync();

        return Ok(games);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var game = await db.Games
            .AsNoTracking()
            .FirstOrDefaultAsync(g => g.Id == id);

        if (game is null)
            return NotFound();

        return Ok(game);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateGameRequest request)
    {
        var nameExists = await db.Games.AnyAsync(g => g.Name == request.Name);
        if (nameExists)
            return Conflict("A game with this name already exists.");

        var game = new Game
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            LogoUrl = request.LogoUrl,
            CreatedAt = DateTime.UtcNow
        };

        db.Games.Add(game);
        await db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = game.Id }, game);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateGameRequest request)
    {
        var game = await db.Games.FindAsync(id);
        if (game is null)
            return NotFound();

        var nameConflict = await db.Games.AnyAsync(g => g.Name == request.Name && g.Id != id);
        if (nameConflict)
            return Conflict("A game with this name already exists.");

        game.Name = request.Name;
        game.LogoUrl = request.LogoUrl;

        await db.SaveChangesAsync();

        return Ok(game);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var game = await db.Games.FindAsync(id);
        if (game is null)
            return NotFound();

        var hasLeagues = await db.Leagues.AnyAsync(l => l.GameId == id);
        if (hasLeagues)
            return BadRequest("Cannot delete a game that has associated leagues.");

        db.Games.Remove(game);
        await db.SaveChangesAsync();

        return NoContent();
    }
}
