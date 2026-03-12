using ClashBoard.Api.Data;
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

    private IQueryable<League> LeagueQuery()
    {
        return db.Leagues
            .Include(l => l.Game)
            .Include(l => l.LeaguePlayers)
            .ThenInclude(lp => lp.Player)
            .AsNoTracking();
    }
}