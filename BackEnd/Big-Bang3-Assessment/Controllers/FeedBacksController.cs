using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    public class FeedBacksController : ControllerBase
    {
        private readonly TourismDbContext _context;

        public FeedBacksController(TourismDbContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FeedBack>>> GetfeedBacks()
        {
            try
            {
                return await _context.feedBacks.ToListAsync();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing the request.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<FeedBack>> GetFeedBack(int id)
        {
            try
            {
                var feedBack = await _context.feedBacks.FindAsync(id);

                if (feedBack == null)
                {
                    return NotFound();
                }

                return feedBack;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing the request.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutFeedBack(int id, FeedBack feedBack)
        {
            try
            {
                if (id != feedBack.FeedBack_id)
                {
                    return BadRequest();
                }

                _context.Entry(feedBack).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!FeedBackExists(id))
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

        [HttpPost]
        public async Task<ActionResult<FeedBack>> PostFeedBack(FeedBack feedBack)
        {
            try
            {
                var feedback = await _context.users.FindAsync(feedBack.user.User_Id);
                if (feedback == null)
                {
                    return BadRequest("Invalid user ID");
                }
                feedBack.user = feedback;

                _context.feedBacks.Add(feedBack);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetFeedBack", new { id = feedBack.FeedBack_id }, feedBack);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing the request.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFeedBack(int id)
        {
            try
            {
                var feedBack = await _context.feedBacks.FindAsync(id);
                if (feedBack == null)
                {
                    return NotFound();
                }

                _context.feedBacks.Remove(feedBack);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing the request.");
            }
        }

        private bool FeedBackExists(int id)
        {
            return _context.feedBacks.Any(e => e.FeedBack_id == id);
        }
    }
}
