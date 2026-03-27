using ClashBoard.Api.Data;
using ClashBoard.Api.Models.DTOs;
using ClashBoard.Api.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ClashBoard.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MatchesController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var matches = await MatchQuery()
            .ToListAsync();

        return Ok(matches);
    }

    [HttpGet("/api/leagues/{leagueId:guid}/matches")]
    public async Task<IActionResult> GetByLeague(Guid leagueId)
    {
        var leagueExists = await db.Leagues.AnyAsync(l => l.Id == leagueId);
        if (!leagueExists)
            return NotFound();

        var matches = await MatchQuery()
            .Where(m => m.LeagueId == leagueId)
            .ToListAsync();

        return Ok(matches);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateMatchRequest request)
    {
        var leagueExists = await db.Leagues.AnyAsync(l => l.Id == request.LeagueId);
        if (!leagueExists)
            return BadRequest("League not found.");

        var player1Exists = await db.Players.AnyAsync(p => p.Id == request.Player1Id);
        var player2Exists = await db.Players.AnyAsync(p => p.Id == request.Player2Id);
        if (!player1Exists || !player2Exists)
            return BadRequest("One or both players not found.");

        if (request.Player1Id == request.Player2Id)
            return BadRequest("A player cannot play against themselves.");

        var match = new Match
        {
            Id = Guid.NewGuid(),
            LeagueId = request.LeagueId,
            Player1Id = request.Player1Id,
            Player2Id = request.Player2Id,
            Status = request.Status,
            Player1Character = request.Player1Character,
            Player2Character = request.Player2Character,
            Notes = request.Notes,
            ScheduledAt = request.ScheduledAt.HasValue ? DateTime.SpecifyKind(request.ScheduledAt.Value, DateTimeKind.Utc) : null,
            CreatedAt = DateTime.UtcNow
        };

        db.Matches.Add(match);
        await db.SaveChangesAsync();

        var created = await MatchQuery().FirstAsync(m => m.Id == match.Id);
        return CreatedAtAction(nameof(GetAll), new { id = match.Id }, created);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateMatchRequest request)
    {
        var match = await db.Matches.FindAsync(id);
        if (match is null)
            return NotFound();

        if (request.WinnerId.HasValue)
        {
            if (request.WinnerId != request.Player1Id && request.WinnerId != request.Player2Id)
                return BadRequest("Winner must be one of the match players.");
        }

        match.LeagueId = request.LeagueId;
        match.Player1Id = request.Player1Id;
        match.Player2Id = request.Player2Id;
        match.WinnerId = request.WinnerId;
        match.Status = request.Status;
        match.Player1Score = request.Player1Score;
        match.Player2Score = request.Player2Score;
        match.Player1Character = request.Player1Character;
        match.Player2Character = request.Player2Character;
        match.Notes = request.Notes;
        match.ScheduledAt = request.ScheduledAt.HasValue ? DateTime.SpecifyKind(request.ScheduledAt.Value, DateTimeKind.Utc) : null;
        match.CompletedAt = request.CompletedAt.HasValue ? DateTime.SpecifyKind(request.CompletedAt.Value, DateTimeKind.Utc) : null;

        await db.SaveChangesAsync();

        var updated = await MatchQuery().FirstAsync(m => m.Id == id);
        return Ok(updated);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var match = await db.Matches.FindAsync(id);
        if (match is null)
            return NotFound();

        db.Matches.Remove(match);
        await db.SaveChangesAsync();

        return NoContent();
    }

    private IQueryable<Match> MatchQuery()
    {
        return db.Matches
            .Include(m => m.Player1)
            .Include(m => m.Player2)
            .Include(m => m.Winner)
            .Include(m => m.Games.OrderBy(g => g.GameNumber))
            .OrderBy(m => m.ScheduledAt)
            .AsNoTracking();
    }
}
