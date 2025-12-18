namespace TestTask.Models;

public class Lesson
{
    public int Id { get; set; }
    
    public string Title { get; set; } = null!;
    
    public string? Description { get; set; }
    
    public int Duration { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}