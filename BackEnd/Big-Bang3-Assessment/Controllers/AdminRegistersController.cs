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
using System.Data;

namespace Big_Bang3_Assessment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminRegistersController : ControllerBase
    {
        private readonly TourismDbContext _context;

        public AdminRegistersController(TourismDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdminRegister>>> GetadminRegisters()
        {
            if (_context.AdminRegisters == null)
            {
                return NotFound();
            }
            return await _context.AdminRegisters.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AdminRegister>> GetAdminRegister(int id)
        {
            try
            {
                if (_context.AdminRegisters == null)
                {
                    return NotFound();
                }
                var adminRegister = await _context.AdminRegisters.FindAsync(id);

                if (adminRegister == null)
                {
                    return NotFound();
                }

                return adminRegister;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing the request.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdminRegister(int id, AdminRegister adminRegister)
        {
            if (id != adminRegister.Admin_Id)
            {
                return BadRequest();
            }

            _context.Entry(adminRegister).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdminRegisterExists(id))
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

        [HttpPost]
        public async Task<ActionResult<AdminRegister>> PostAdminRegister(AdminRegister adminRegister)
        {
            if (_context.AdminRegisters == null)
            {
                return Problem("Entity set 'TourismDbContext.adminRegisters'  is null.");
            }
            _context.AdminRegisters.Add(adminRegister);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAdminRegister", new { id = adminRegister.Admin_Id }, adminRegister);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdminRegister(int id)
        {
            if (_context.AdminRegisters == null)
            {
                return NotFound();
            }
            var adminRegister = await _context.AdminRegisters.FindAsync(id);
            if (adminRegister == null)
            {
                return NotFound();
            }

            _context.AdminRegisters.Remove(adminRegister);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AdminRegisterExists(int id)
        {
            return (_context.AdminRegisters?.Any(e => e.Admin_Id == id)).GetValueOrDefault();
        }

        [HttpGet("UnapprovedTravelAgents")]
        public async Task<ActionResult<IEnumerable<AgentRegister>>> GetUnapprovedTravelAgents()
        {
            try
            {
                var unapprovedTravelAgents = await _context.agentRegisters
                    .Include(ta => ta.AdminRegister)
                    .Where(ta => ta.status == "Pending")
                    .ToListAsync();

                return unapprovedTravelAgents;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing the request.");
            }
        }

        [HttpPut("UpdateApprovalStatus/{id}")]
        public async Task<IActionResult> UpdateApprovalStatus(int id, [FromBody] string approvalStatus)
        {
            try
            {
                var travelAgent = await _context.agentRegisters.FindAsync(id);
                if (travelAgent == null)
                {
                    return NotFound("Travel Agent not found");
                }

                if (approvalStatus != "Approved" && approvalStatus != "Declined")
                {
                    return BadRequest("Invalid approval status. It should be either 'Approved' or 'Declined'.");
                }

                travelAgent.status = approvalStatus;

                await _context.SaveChangesAsync();

                return Ok("Approval status updated successfully");
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing the request.");
            }
        }
    }
}
