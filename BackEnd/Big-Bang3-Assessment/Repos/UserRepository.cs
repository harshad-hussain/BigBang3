using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Big_Bang3_Assessment.Data;
using Big_Bang3_Assessment.Model;
using Microsoft.EntityFrameworkCore;

namespace Big_Bang3_Assessment.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly TourismDbContext _context;

        public UserRepository(TourismDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _context.users.ToListAsync();
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _context.users.FindAsync(id);
        }

        public async Task<User> CreateUserAsync(User user)
        {
            _context.users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task UpdateUserAsync(User user)
        {
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteUserAsync(int id)
        {
            var user = await _context.users.FindAsync(id);
            if (user != null)
            {
                _context.users.Remove(user);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<User>> FilterUsersByNameAsync(string name)
        {
            return await _context.users
                .Where(user => user.User_Name == name)
                .ToListAsync();
        }
    }
}
