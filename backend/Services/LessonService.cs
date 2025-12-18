using Microsoft.EntityFrameworkCore;
using TestTask.Data;
using TestTask.DTOs;
using TestTask.Models;

namespace TestTask.Services;

public class LessonService
{
    private readonly AppDbContext _context;

    public LessonService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<LessonDto> CreateAsync(CreateLessonDto lessonDto)
    {
        var lesson = new Lesson
        {
            Title = lessonDto.Title,
            Description = lessonDto.Description,
            Duration = lessonDto.Duration,
        };
        
        _context.Lessons.Add(lesson);
        await _context.SaveChangesAsync();
        
        return MapToDto(lesson);
    }

    public async Task<List<LessonDto>> GetAllAsync(int page, int pageSize)
    {
        return await _context.Lessons
            .OrderByDescending(x => x.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(x => MapToDto(x))
            .ToListAsync();
    }

    public async Task<LessonDto?> GetByIdAsync(int id)
    {
        var lesson = await _context.Lessons.FindAsync(id);
        return lesson == null ? null : MapToDto(lesson);
    }

    public async Task<bool> UpdateAsync(int id, UpdateLessonDto lessonDto)
    {
        var lesson = await _context.Lessons.FindAsync(id);
        if (lesson == null)
            return false;
        
        lesson.Title = lessonDto.Title;
        lesson.Description = lessonDto.Description;
        lesson.Duration = lessonDto.Duration;
        
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var lesson = await _context.Lessons.FindAsync(id);
        if(lesson == null)
            return false;
        
        _context.Lessons.Remove(lesson);
        await _context.SaveChangesAsync();
        return true;
    }

    private static LessonDto MapToDto(Lesson lesson)
    {
        return new LessonDto
        {
            Id = lesson.Id,
            Title = lesson.Title,
            Description = lesson.Description,
            Duration = lesson.Duration,
            CreatedAt = lesson.CreatedAt
        };
    }
}