using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Big_Bang3_Assessment.Data;
using Big_Bang3_Assessment.Model;
using Microsoft.EntityFrameworkCore;

namespace Big_Bang3_Assessment.Repositories
{
    public class AgentRegisterRepository : IAgentRegisterRepository
    {
        private readonly TourismDbContext _context;

        public AgentRegisterRepository(TourismDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<AgentRegister>> GetAllAgentRegistersAsync()
        {
            return await _context.agentRegisters.Include(x => x.agencies).ToListAsync();
        }

        public async Task<AgentRegister> GetAgentRegisterByIdAsync(int id)
        {
            return await _context.agentRegisters.FindAsync(id);
        }

        public async Task<AgentRegister> CreateAgentRegisterAsync(AgentRegister agentRegister)
        {
            agentRegister.status = "Pending";
            _context.agentRegisters.Add(agentRegister);
            await _context.SaveChangesAsync();
            return agentRegister;
        }

        public async Task UpdateAgentRegisterAsync(AgentRegister agentRegister)
        {
            _context.Entry(agentRegister).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAgentRegisterAsync(int id)
        {
            var agentRegister = await _context.agentRegisters.FindAsync(id);
            if (agentRegister != null)
            {
                _context.agentRegisters.Remove(agentRegister);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<AgentRegister>> GetApprovedTravelAgentsAsync()
        {
            return await _context.agentRegisters
                .Include(ta => ta.AdminRegister)
                .Where(ta => ta.status == "Approved")
                .ToListAsync();
        }
    }
}
