using System.Collections.Generic;
using System.Threading.Tasks;
using Big_Bang3_Assessment.Model;

namespace Big_Bang3_Assessment.Repositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<User> GetUserByIdAsync(int id);
        Task<User> CreateUserAsync(User user);
        Task UpdateUserAsync(User user);
        Task DeleteUserAsync(int id);
        Task<IEnumerable<User>> FilterUsersByNameAsync(string name);
    }
}
 