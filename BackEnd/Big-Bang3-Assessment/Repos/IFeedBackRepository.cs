using System.Collections.Generic;
using System.Threading.Tasks;
using Big_Bang3_Assessment.Model;

namespace Big_Bang3_Assessment.Repositories
{
    public interface IFeedBackRepository
    {
        Task<IEnumerable<FeedBack>> GetAllFeedBacksAsync();
        Task<FeedBack> GetFeedBackByIdAsync(int id);
        Task<FeedBack> CreateFeedBackAsync(FeedBack feedBack, int userId);
        Task UpdateFeedBackAsync(FeedBack feedBack);
        Task DeleteFeedBackAsync(int id);
    }
}
