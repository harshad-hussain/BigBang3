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
    public class AgentRegistersController : ControllerBase
    {
        private readonly TourismDbContext _context;

        public AgentRegistersController(TourismDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AgentRegister>>> GetagentRegisters()
        {
            try
            {
                if (_context.agentRegisters == null)
                {
                    return NotFound();
                }
                return await _context.agentRegisters.Include(x => x.agencies).ToListAsync();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing the request.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AgentRegister>> GetAgentRegister(int id)
        {
            try
            {
                if (_context.agentRegisters == null)
                {
                    return NotFound();
                }
                var agentRegister = await _context.agentRegisters.FindAsync(id);

                if (agentRegister == null)
                {
                    return NotFound();
                }

                return agentRegister;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing the request.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAgentRegister(int id, AgentRegister agentRegister)
        {
            try
            {
                if (id != agentRegister.Agent_Id)
                {
                    return BadRequest();
                }

                _context.Entry(agentRegister).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!AgentRegisterExists(id))
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
        public async Task<ActionResult<AgentRegister>> PostAgentRegister(AgentRegister agentRegister)
        {
            try
            {
                if (_context.agentRegisters == null)
                {
                    return Problem("Entity set 'TourismDbContext.agentRegisters' is null.");
                }
                agentRegister.status = "Pending";
                _context.agentRegisters.Add(agentRegister);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetAgentRegister", new { id = agentRegister.Agent_Id }, agentRegister);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing the request.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAgentRegister(int id)
        {
            try
            {
                if (_context.agentRegisters == null)
                {
                    return NotFound();
                }
                var agentRegister = await _context.agentRegisters.FindAsync(id);
                if (agentRegister == null)
                {
                    return NotFound();
                }

                _context.agentRegisters.Remove(agentRegister);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing the request.");
            }
        }
        [HttpGet("Approved")]
        public async Task<ActionResult<IEnumerable<AgentRegister>>> GetApprovedTravelAgents()
        {
            try
            {
                var approvedTravelAgents = await _context.agentRegisters
                    .Include(ta => ta.AdminRegister)
                    .Where(ta => ta.status == "Approved")
                    .ToListAsync();

                return approvedTravelAgents;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing the request.");
            }
        }

        private bool AgentRegisterExists(int id)
        {
            return (_context.agentRegisters?.Any(e => e.Agent_Id == id)).GetValueOrDefault();
        }
    }
}
