using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Big_Bang3_Assessment.Model;

namespace Big_Bang3_Assessment.Repositories
{
    public interface IAgencyRepository
    {
        Task<IEnumerable<Agency>> GetAllAgenciesAsync();
        Task<Agency> GetAgencyByIdAsync(int id);
        Task<Agency> CreateAgencyAsync(Agency agency, IFormFile imageFile);
        Task<IEnumerable<Agency>> FilterAgenciesByRatingAsync(string rating);
        Task<IEnumerable<Agency>> FilterAgenciesByRatePerDayAsync(int ratePerDay);
        Task UpdateAgencyAsync(Agency agency, IFormFile tourImagePath);
        Task DeleteAgencyAsync(int id);
    }
}
