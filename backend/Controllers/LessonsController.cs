using Microsoft.AspNetCore.Mvc;
using TestTask.DTOs;
using TestTask.Services;

namespace TestTask.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LessonsController(LessonService lessonService) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateLessonDto dto)
    {
        var result = await lessonService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 3)
    {
        var lessons = await lessonService.GetAllAsync(page, pageSize);
        return Ok(lessons);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var lesson = await lessonService.GetByIdAsync(id);
        if(lesson == null)
            return NotFound();
        
        return Ok(lesson);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateLessonDto dto)
    {
        var updated = await lessonService.UpdateAsync(id, dto);
        if(!updated)
            return NotFound();
        
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await lessonService.DeleteAsync(id);
        if(!deleted)
            return NotFound();
        
        return NoContent();
    }
}