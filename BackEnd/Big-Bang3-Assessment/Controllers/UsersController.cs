using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Big_Bang3_Assessment.Data;
using Big_Bang3_Assessment.Model;

namespace Big_Bang3_Assessment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly TourismDbContext _context;

        public UsersController(TourismDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> Getusers()
        {
            try
            {
                if (_context.users == null)
                {
                    return NotFound();
                }
                return await _context.users.ToListAsync();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing the request.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            try
            {
                if (_context.users == null)
                {
                    return NotFound();
                }
                var user = await _context.users.FindAsync(id);

                if (user == null)
                {
                    return NotFound();
                }

                return user;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing the request.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            try
            {
                if (id != user.User_Id)
                {
                    return BadRequest();
                }

                _context.Entry(user).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!UserExists(id))
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
        public async Task<ActionResult<User>> PostUser(User user)
        {
            try
            {
                if (_context.users == null)
                {
                    return Problem("Entity set 'TourismDbContext.users' is null.");
                }
                _context.users.Add(user);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetUser", new { id = user.User_Id }, user);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing the request.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            try
            {
                if (_context.users == null)
                {
                    return NotFound();
                }
                var user = await _context.users.FindAsync(id);
                if (user == null)
                {
                    return NotFound();
                }

                _context.users.Remove(user);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing the request.");
            }
        }

        [HttpGet("FilterByName")]
        public async Task<ActionResult<IEnumerable<User>>> FilterUsersByName(string name)
        {
            try
            {
                if (_context.users == null)
                {
                    return NotFound();
                }

                var filteredUsers = await _context.users
                    .Where(user => user.User_Name == name)
                    .ToListAsync();

                if (filteredUsers.Count == 0)
                {
                    return NotFound("No users found with the specified name.");
                }

                return filteredUsers;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing the request.");
            }
        }

        private bool UserExists(int id)
        {
            return (_context.users?.Any(e => e.User_Id == id)).GetValueOrDefault();
        }
    }
}
