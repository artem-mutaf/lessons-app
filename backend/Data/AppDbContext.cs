using Microsoft.EntityFrameworkCore;
using TestTask.Models;

namespace TestTask.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
    : base(options)
    {
    }
    
    public DbSet<Lesson> Lessons => Set<Lesson>();
}