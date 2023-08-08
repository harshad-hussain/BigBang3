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
    public class BookingsController : ControllerBase
    {
        private readonly TourismDbContext _context;

        public BookingsController(TourismDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBooking()
        {
            try
            {
                return await _context.Booking.Include(x => x.user).Include(a => a.agency).ToListAsync();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing the request.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Booking>> GetBooking(int id)
        {
            try
            {
                var booking = await _context.Booking
                                             .Include(x => x.user)
                                             .Include(x => x.agency)
                                             .FirstOrDefaultAsync(x => x.Booking_Id == id);

                if (booking == null)
                {
                    return NotFound();
                }
                return booking;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing the request.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutBooking(int id, Booking booking)
        {
            try
            {
                if (id != booking.Booking_Id)
                {
                    return BadRequest();
                }

                _context.Entry(booking).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!BookingExists(id))
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
        public async Task<ActionResult<Booking>> PostBooking(Booking booking)
        {
            try
            {
                var user = await _context.users.FindAsync(booking.user.User_Id);

                if (user == null)
                {
                    return BadRequest("Invalid user ID");
                }

                booking.user = user;

                var agency = await _context.agencies.FindAsync(booking.agency.Agency_Id);
                if (agency == null)
                {
                    return BadRequest("Invalid agency ID");
                }
                booking.agency = agency;
                _context.Booking.Add(booking);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetBooking", new { id = booking.Booking_Id }, booking);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing the request.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            try
            {
                var booking = await _context.Booking.FindAsync(id);
                if (booking == null)
                {
                    return NotFound();
                }

                _context.Booking.Remove(booking);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing the request.");
            }
        }

        private bool BookingExists(int id)
        {
            return _context.Booking.Any(e => e.Booking_Id == id);
        }
    }
}
