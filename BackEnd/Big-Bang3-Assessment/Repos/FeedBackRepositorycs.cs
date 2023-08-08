using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Big_Bang3_Assessment.Data;
using Big_Bang3_Assessment.Model;
using Microsoft.EntityFrameworkCore;

namespace Big_Bang3_Assessment.Repositories
{
    public class FeedBackRepository : IFeedBackRepository
    {
        private readonly TourismDbContext _context;

        public FeedBackRepository(TourismDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<FeedBack>> GetAllFeedBacksAsync()
        {
            return await _context.feedBacks.ToListAsync();
        }

        public async Task<FeedBack> GetFeedBackByIdAsync(int id)
        {
            return await _context.feedBacks.FindAsync(id);
        }

        public async Task<FeedBack> CreateFeedBackAsync(FeedBack feedBack, int userId)
        {
            var user = await _context.users.FindAsync(userId);
            if (user == null)
            {
                return null; // Return appropriate response or handle error
            }
            feedBack.user = user;

            _context.feedBacks.Add(feedBack);
            await _context.SaveChangesAsync();
            return feedBack;
        }

        public async Task UpdateFeedBackAsync(FeedBack feedBack)
        {
            _context.Entry(feedBack).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteFeedBackAsync(int id)
        {
            var feedBack = await _context.feedBacks.FindAsync(id);
            if (feedBack != null)
            {
                _context.feedBacks.Remove(feedBack);
                await _context.SaveChangesAsync();
            }
        }
    }
}
