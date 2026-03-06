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
        var leagues = await db.Leagues
            .Include(l => l.Game)
            .Include(l => l.LeaguePlayers)
            .ThenInclude(lp => lp.Player)
            .AsNoTracking()
            .ToListAsync();
        
        return Ok(leagues);
    }
}