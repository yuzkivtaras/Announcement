using DataServices.Data;
using DataServices.IRepository;
using Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace DataServices.Repository
{
    public class AnnouncementRepository : IAnnouncementRepository
    {
        private readonly AppDbContext _context;

        public AnnouncementRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Announcement>> GetAllAnnouncements()
        {
            return await _context.Announcements.ToListAsync();
        }

        public async Task<Announcement> GetAnnouncementById(int id)
        {
            return await _context.Announcements.FindAsync(id);
        }

        public async Task CreateAsync(Announcement announcement)
        {
            announcement.Created = DateTime.Now;
            _context.Announcements.Add(announcement);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Announcement announcement)
        {
            _context.Entry(announcement).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Announcement announcement)
        {
            _context.Announcements.Remove(announcement);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Announcement>> GetSimilarAnnouncements()
        {
            var allAnnouncements = await _context.Announcements.ToListAsync();

            var similarAnnouncements = new List<Announcement>();
            foreach (var announcement in allAnnouncements)
            {
                var similar = allAnnouncements
                    .Where(a => a.Id != announcement.Id &&
                                (a.Title.Split().Intersect(announcement.Title.Split()).Any() ||
                                 a.Description.Split().Intersect(announcement.Description.Split()).Any()))
                    .Take(3);

                similarAnnouncements.AddRange(similar);
            }

            return similarAnnouncements.Distinct().Take(3);
        }
    }
}
