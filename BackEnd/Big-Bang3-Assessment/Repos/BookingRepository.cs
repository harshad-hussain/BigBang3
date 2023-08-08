using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Big_Bang3_Assessment.Data;
using Big_Bang3_Assessment.Model;
using Microsoft.EntityFrameworkCore;

namespace Big_Bang3_Assessment.Repositories
{
    public class BookingRepository : IBookingRepository
    {
        private readonly TourismDbContext _context;

        public BookingRepository(TourismDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Booking>> GetAllBookingsAsync()
        {
            return await _context.Booking.Include(x => x.user).Include(a => a.agency).ToListAsync();
        }

        public async Task<Booking> GetBookingByIdAsync(int id)
        {
            return await _context.Booking
                .Include(x => x.user)
                .Include(x => x.agency)
                .FirstOrDefaultAsync(x => x.Booking_Id == id);
        }

        public async Task<Booking> CreateBookingAsync(Booking booking, int userId, int agencyId)
        {
            var user = await _context.users.FindAsync(userId);
            if (user == null)
            {
                return null; // Return appropriate response or handle error
            }
            booking.user = user;

            var agency = await _context.agencies.FindAsync(agencyId);
            if (agency == null)
            {
                return null; // Return appropriate response or handle error
            }
            booking.agency = agency;

            _context.Booking.Add(booking);
            await _context.SaveChangesAsync();
            return booking;
        }

        public async Task UpdateBookingAsync(Booking booking)
        {
            _context.Entry(booking).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteBookingAsync(int id)
        {
            var booking = await _context.Booking.FindAsync(id);
            if (booking != null)
            {
                _context.Booking.Remove(booking);
                await _context.SaveChangesAsync();
            }
        }
    }
}
