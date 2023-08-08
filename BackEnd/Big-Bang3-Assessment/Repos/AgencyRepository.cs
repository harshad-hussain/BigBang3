using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Big_Bang3_Assessment.Data;
using Big_Bang3_Assessment.Model;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;

namespace Big_Bang3_Assessment.Repositories
{
    public class AgencyRepository : IAgencyRepository
    {
        private readonly TourismDbContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;

        public AgencyRepository(TourismDbContext context, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;
        }

        public Task<Agency> CreateAgencyAsync(Agency agency, IFormFile imageFile)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAgencyAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Agency>> FilterAgenciesByRatePerDayAsync(int ratePerDay)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Agency>> FilterAgenciesByRatingAsync(string rating)
        {
            throw new NotImplementedException();
        }

        public Task<Agency> GetAgencyByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Agency>> GetAllAgenciesAsync()
        {
            return await _context.agencies
                .Include(a => a.agentRegister)
                .Include(a => a.bookings)
                .Include(a => a.accommodationDetails)
                .ToListAsync();
        }

        public Task UpdateAgencyAsync(Agency agency, IFormFile tourImagePath)
        {
            throw new NotImplementedException();
        }

        // Implement other interface methods similarly

        private bool AgencyExists(int id)
        {
            return _context.agencies.Any(a => a.Agency_Id == id);
        }
    }
}
