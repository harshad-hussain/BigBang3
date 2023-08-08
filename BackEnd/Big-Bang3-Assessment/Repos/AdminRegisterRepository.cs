using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Big_Bang3_Assessment.Data;
using Big_Bang3_Assessment.Model;
using Microsoft.EntityFrameworkCore;

namespace Big_Bang3_Assessment.Repositories
{
    public class AdminRegisterRepository : IAdminRegisterRepository
    {
        private readonly TourismDbContext _context;

        public AdminRegisterRepository(TourismDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<AdminRegister>> GetAllAdminRegistersAsync()
        {
            return await _context.AdminRegisters.ToListAsync();
        }

        public async Task<AdminRegister> GetAdminRegisterByIdAsync(int id)
        {
            return await _context.AdminRegisters.FindAsync(id);
        }

        public async Task<AdminRegister> CreateAdminRegisterAsync(AdminRegister adminRegister)
        {
            _context.AdminRegisters.Add(adminRegister);
            await _context.SaveChangesAsync();
            return adminRegister;
        }

        public async Task UpdateAdminRegisterAsync(AdminRegister adminRegister)
        {
            _context.Entry(adminRegister).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAdminRegisterAsync(int id)
        {
            var adminRegister = await _context.AdminRegisters.FindAsync(id);
            if (adminRegister != null)
            {
                _context.AdminRegisters.Remove(adminRegister);
                await _context.SaveChangesAsync();
            }
        }
    }
}
