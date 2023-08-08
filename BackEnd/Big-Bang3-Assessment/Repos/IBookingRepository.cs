using System.Collections.Generic;
using System.Threading.Tasks;
using Big_Bang3_Assessment.Model;

namespace Big_Bang3_Assessment.Repositories
{
    public interface IBookingRepository
    {
        Task<IEnumerable<Booking>> GetAllBookingsAsync();
        Task<Booking> GetBookingByIdAsync(int id);
        Task<Booking> CreateBookingAsync(Booking booking, int userId, int agencyId);
        Task UpdateBookingAsync(Booking booking);
        Task DeleteBookingAsync(int id);
    }
}
