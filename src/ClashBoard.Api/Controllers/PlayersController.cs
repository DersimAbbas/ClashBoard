using ClashBoard.Api.Data;
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

    private IQueryable<Models.Entities.Player> PlayerQuery()
    {
        return db.Players
            .Include(p => p.LeaguePlayers)
                .ThenInclude(lp => lp.League)
            .OrderBy(p => p.GamerTag)
            .AsNoTracking();
    }
}
