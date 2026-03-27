using ClashBoard.Api.Data;
using ClashBoard.Api.Models.DTOs;
using ClashBoard.Api.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ClashBoard.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LeaguesController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var leagues = await LeagueQuery().ToListAsync();
        return Ok(leagues);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var league = await LeagueQuery().FirstOrDefaultAsync(l => l.Id == id);

        if (league is null)
            return NotFound();

        return Ok(league);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateLeagueRequest request)
    {
        var gameExists = await db.Games.AnyAsync(g => g.Id == request.GameId);
        if (!gameExists)
            return BadRequest("Game not found.");

        var league = new League
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Description = request.Description,
            GameId = request.GameId,
            Status = request.Status,
            PointsPerWin = request.PointsPerWin,
            PointsPerDraw = request.PointsPerDraw,
            PointsPerLoss = request.PointsPerLoss,
            StartDate = request.StartDate.HasValue ? DateTime.SpecifyKind(request.StartDate.Value, DateTimeKind.Utc) : null,
            EndDate = request.EndDate.HasValue ? DateTime.SpecifyKind(request.EndDate.Value, DateTimeKind.Utc) : null,
            CreatedAt = DateTime.UtcNow
        };

        db.Leagues.Add(league);
        await db.SaveChangesAsync();

        var created = await LeagueQuery().FirstAsync(l => l.Id == league.Id);
        return CreatedAtAction(nameof(GetById), new { id = league.Id }, created);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateLeagueRequest request)
    {
        var league = await db.Leagues.FindAsync(id);
        if (league is null)
            return NotFound();

        var gameExists = await db.Games.AnyAsync(g => g.Id == request.GameId);
        if (!gameExists)
            return BadRequest("Game not found.");

        league.Name = request.Name;
        league.Description = request.Description;
        league.GameId = request.GameId;
        league.Status = request.Status;
        league.PointsPerWin = request.PointsPerWin;
        league.PointsPerDraw = request.PointsPerDraw;
        league.PointsPerLoss = request.PointsPerLoss;
        league.StartDate = request.StartDate.HasValue ? DateTime.SpecifyKind(request.StartDate.Value, DateTimeKind.Utc) : null;
        league.EndDate = request.EndDate.HasValue ? DateTime.SpecifyKind(request.EndDate.Value, DateTimeKind.Utc) : null;

        await db.SaveChangesAsync();

        var updated = await LeagueQuery().FirstAsync(l => l.Id == id);
        return Ok(updated);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var league = await db.Leagues.FindAsync(id);
        if (league is null)
            return NotFound();

        db.Leagues.Remove(league);
        await db.SaveChangesAsync();

        return NoContent();
    }

    private IQueryable<League> LeagueQuery()
    {
        return db.Leagues
            .Include(l => l.Game)
            .Include(l => l.LeaguePlayers)
            .ThenInclude(lp => lp.Player)
            .AsNoTracking();
    }
}