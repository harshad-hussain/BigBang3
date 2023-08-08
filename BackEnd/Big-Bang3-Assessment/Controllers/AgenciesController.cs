using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Big_Bang3_Assessment.Data;
using Big_Bang3_Assessment.Model;
using Microsoft.AspNetCore.Authorization;

namespace Big_Bang3_Assessment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgencyController : ControllerBase
    {
        private readonly TourismDbContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;

        public AgencyController(TourismDbContext context, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;
        }

        [Authorize(Roles = "Agent")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Agency>>> GetAgencies()
        {
            try
            {
                return await _context.agencies
                    .Include(a => a.agentRegister)
                    .Include(a => a.bookings)
                    .Include(a => a.accommodationDetails)
                    .ToListAsync();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing the request.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Agency>> GetAgency(int id)
        {
            try
            {
                var agency = await _context.agencies
                    .Include(a => a.agentRegister)
                    .Include(a => a.bookings)
                    .Include(a => a.accommodationDetails)
                    .FirstOrDefaultAsync(a => a.Agency_Id == id);

                if (agency == null)
                {
                    return NotFound();
                }

                return agency;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing the request.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAgency(int id, [FromForm] Agency agency, IFormFile tourImagePath)
        {
            try
            {
                if (id != agency.Agency_Id)
                {
                    return BadRequest();
                }

                if (tourImagePath != null && tourImagePath.Length > 0)
                {
                    var uploadsFolder = Path.Combine(_hostEnvironment.WebRootPath, "uploads/images");
                    var fileName = Guid.NewGuid().ToString() + Path.GetExtension(tourImagePath.FileName);
                    var filePath = Path.Combine(uploadsFolder, fileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await tourImagePath.CopyToAsync(stream);
                    }

                    agency.TourImagePath = fileName;
                }

                _context.Entry(agency).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!AgencyExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing the request.");
            }
        }

        [Authorize(Roles = "Agent")]
        [HttpPost]
        public async Task<Agency> CreateAgency([FromForm] Agency agency, IFormFile imageFile)
        {
            try
            {
                if (imageFile != null && imageFile.Length > 0)
                {
                    var uploadsFolder = Path.Combine(_hostEnvironment.WebRootPath, "uploads/images");
                    var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
                    var filePath = Path.Combine(uploadsFolder, fileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await imageFile.CopyToAsync(stream);
                    }

                    agency.TourImagePath = fileName;
                }

                if (agency.agentRegister != null)
                {
                    var r = _context.agentRegisters.Find(agency.agentRegister.Agent_Id);
                    if (r != null)
                    {
                        agency.agentRegister = r;
                    }
                }

                if (agency != null)
                {
                    _context.agencies.Add(agency);
                    await _context.SaveChangesAsync();
                }

                return agency;
            }
            catch (Exception)
            {
                throw;
            }
        }

        [Authorize(Roles = "Users")]
        [HttpGet("filterByRating/{rating}")]
        public async Task<ActionResult<IEnumerable<Agency>>> FilterAgenciesByRating(string rating)
        {
            try
            {
                var filteredAgencies = await _context.agencies
                    .Include(a => a.agentRegister)
                    .Include(a => a.bookings)
                    .Include(a => a.accommodationDetails)
                    .Where(a => a.Agency_Rating == rating)
                    .ToListAsync();

                return filteredAgencies;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing the request.");
            }
        }

        [Authorize(Roles = "Users")]
        [HttpGet("filterByRatePerDay/{ratePerDay}")]
        public async Task<ActionResult<IEnumerable<Agency>>> FilterAgenciesByRatePerDay(int ratePerDay)
        {
            try
            {
                var filteredAgencies = await _context.agencies
                    .Include(a => a.agentRegister)
                    .Include(a => a.bookings)
                    .Include(a => a.accommodationDetails)
                    .Where(a => a.rate_for_day == ratePerDay)
                    .ToListAsync();

                return filteredAgencies;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing the request.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAgency(int id)
        {
            try
            {
                var agency = await _context.agencies.FindAsync(id);
                if (agency == null)
                {
                    return NotFound();
                }

                _context.agencies.Remove(agency);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing the request.");
            }
        }

        private bool AgencyExists(int id)
        {
            return _context.agencies.Any(a => a.Agency_Id == id);
        }
    }
}
