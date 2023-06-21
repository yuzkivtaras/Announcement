using DataServices.IRepository;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;

namespace TestTaskAnnouncement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnnouncementController : ControllerBase
    {
        private readonly IAnnouncementRepository _announcementRepository;

        public AnnouncementController(IAnnouncementRepository announcementRepository)
        {
            _announcementRepository = announcementRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Announcement>>> GetAnnouncements()
        {
            var announcements = await _announcementRepository.GetAllAnnouncements();

            return Ok(announcements);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Announcement>> GetAnnouncement(int id)
        {
            var announcement = await _announcementRepository.GetAnnouncementById(id);

            if (announcement == null)
            {
                return NotFound();
            }

            return Ok(announcement);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAnnouncement([FromBody] Announcement announcement)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _announcementRepository.CreateAsync(announcement);
            return CreatedAtAction(nameof(GetAnnouncement), new { id = announcement.Id }, announcement);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditAnnouncement(int id, [FromBody] Announcement announcement)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingAnnouncement = await _announcementRepository.GetAnnouncementById(id);

            if (existingAnnouncement == null)
            {
                return NotFound();
            }

            existingAnnouncement.Title = announcement.Title;
            existingAnnouncement.Description = announcement.Description;
            existingAnnouncement.Created = announcement.Created;

            await _announcementRepository.UpdateAsync(existingAnnouncement);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAnnouncement(int id)
        {
            var existingAnnouncement = await _announcementRepository.GetAnnouncementById(id);

            if (existingAnnouncement == null)
            {
                return NotFound();
            }

            await _announcementRepository.DeleteAsync(existingAnnouncement);

            return NoContent();
        }

        [HttpGet("similar")]
        public async Task<ActionResult<IEnumerable<Announcement>>> GetSimilarAnnouncements()
        {
            var similarAnnouncements = await _announcementRepository.GetSimilarAnnouncements();

            return Ok(similarAnnouncements);
        }
    }
}
