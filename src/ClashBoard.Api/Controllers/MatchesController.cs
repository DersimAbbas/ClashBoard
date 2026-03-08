using ClashBoard.Api.Data;
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

    private IQueryable<Models.Entities.Match> MatchQuery()
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
