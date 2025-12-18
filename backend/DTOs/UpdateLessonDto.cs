using System.ComponentModel.DataAnnotations;

namespace TestTask.DTOs;

public class UpdateLessonDto
{
    [Required]
    [MaxLength(100)]
    public string Title { get; set; } = null!;
    [Required]
    [MaxLength(500)]
    public string Description { get; set; } = null!;
    
    [Range(1, 600)]
    public int Duration { get; set; }
}