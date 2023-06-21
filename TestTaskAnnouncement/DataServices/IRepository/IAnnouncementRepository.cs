using Entities.Models;

namespace DataServices.IRepository
{
    public interface IAnnouncementRepository
    {
        Task<IEnumerable<Announcement>> GetAllAnnouncements();
        Task<Announcement> GetAnnouncementById(int id);
        Task CreateAsync(Announcement announcement);
        Task UpdateAsync(Announcement announcement);
        Task DeleteAsync(Announcement announcement);
        Task<IEnumerable<Announcement>> GetSimilarAnnouncements();
    }
}
