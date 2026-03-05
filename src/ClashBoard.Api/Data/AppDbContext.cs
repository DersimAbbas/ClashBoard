using ClashBoard.Api.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace ClashBoard.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Game> Games => Set<Game>();
    public DbSet<Player> Players => Set<Player>();
    public DbSet<League> Leagues => Set<League>();
    public DbSet<LeaguePlayer> LeaguePlayers => Set<LeaguePlayer>();
    public DbSet<Match> Matches => Set<Match>();
    public DbSet<MatchGame> MatchGames => Set<MatchGame>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // --- Game ---
        modelBuilder.Entity<Game>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasDefaultValueSql("gen_random_uuid()");
            entity.Property(e => e.Name).HasMaxLength(100).IsRequired();
            entity.HasIndex(e => e.Name).IsUnique();
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("now()");
        });

        // --- Player ---
        modelBuilder.Entity<Player>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasDefaultValueSql("gen_random_uuid()");
            entity.Property(e => e.GamerTag).HasMaxLength(50).IsRequired();
            entity.HasIndex(e => e.GamerTag).IsUnique();
            entity.Property(e => e.RealName).HasMaxLength(100);
            entity.Property(e => e.MainCharacter).HasMaxLength(50);
            entity.Property(e => e.SecondaryCharacter).HasMaxLength(50);
            entity.Property(e => e.Region).HasMaxLength(20);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("now()");
        });

        // --- League ---
        modelBuilder.Entity<League>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasDefaultValueSql("gen_random_uuid()");
            entity.Property(e => e.Name).HasMaxLength(150).IsRequired();
            entity.Property(e => e.Status).HasConversion<string>().HasMaxLength(20);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("now()");

            entity.HasOne(e => e.Game)
                .WithMany(g => g.Leagues)
                .HasForeignKey(e => e.GameId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // --- LeaguePlayer ---
        modelBuilder.Entity<LeaguePlayer>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasDefaultValueSql("gen_random_uuid()");
            entity.HasIndex(e => new { e.LeagueId, e.PlayerId }).IsUnique();
            entity.Property(e => e.RecentForm).HasMaxLength(20);
            entity.Property(e => e.JoinedAt).HasDefaultValueSql("now()");

            entity.HasOne(e => e.League)
                .WithMany(l => l.LeaguePlayers)
                .HasForeignKey(e => e.LeagueId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.Player)
                .WithMany(p => p.LeaguePlayers)
                .HasForeignKey(e => e.PlayerId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // --- Match ---
        modelBuilder.Entity<Match>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasDefaultValueSql("gen_random_uuid()");
            entity.Property(e => e.Status).HasConversion<string>().HasMaxLength(20);
            entity.Property(e => e.Player1Character).HasMaxLength(50);
            entity.Property(e => e.Player2Character).HasMaxLength(50);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("now()");

            entity.HasOne(e => e.League)
                .WithMany(l => l.Matches)
                .HasForeignKey(e => e.LeagueId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.Player1)
                .WithMany(p => p.MatchesAsPlayer1)
                .HasForeignKey(e => e.Player1Id)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.Player2)
                .WithMany(p => p.MatchesAsPlayer2)
                .HasForeignKey(e => e.Player2Id)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.Winner)
                .WithMany()
                .HasForeignKey(e => e.WinnerId)
                .OnDelete(DeleteBehavior.SetNull)
                .IsRequired(false);
        });

        // --- MatchGame ---
        modelBuilder.Entity<MatchGame>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasDefaultValueSql("gen_random_uuid()");
            entity.Property(e => e.Player1Character).HasMaxLength(50);
            entity.Property(e => e.Player2Character).HasMaxLength(50);
            entity.HasIndex(e => new { e.MatchId, e.GameNumber }).IsUnique();

            entity.HasOne(e => e.Match)
                .WithMany(m => m.Games)
                .HasForeignKey(e => e.MatchId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.Winner)
                .WithMany()
                .HasForeignKey(e => e.WinnerId)
                .OnDelete(DeleteBehavior.Restrict);
        });
    }
}
