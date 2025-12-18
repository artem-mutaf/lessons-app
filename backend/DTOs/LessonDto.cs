namespace TestTask.DTOs;

public class LessonDto
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public int Duration { get; set; }
    public DateTime CreatedAt { get; set; }
}