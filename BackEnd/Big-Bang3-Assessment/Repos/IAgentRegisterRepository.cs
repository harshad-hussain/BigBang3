using System.Collections.Generic;
using System.Threading.Tasks;
using Big_Bang3_Assessment.Model;

namespace Big_Bang3_Assessment.Repositories
{
    public interface IAgentRegisterRepository
    {
        Task<IEnumerable<AgentRegister>> GetAllAgentRegistersAsync();
        Task<AgentRegister> GetAgentRegisterByIdAsync(int id);
        Task<AgentRegister> CreateAgentRegisterAsync(AgentRegister agentRegister);
        Task UpdateAgentRegisterAsync(AgentRegister agentRegister);
        Task DeleteAgentRegisterAsync(int id);
        Task<IEnumerable<AgentRegister>> GetApprovedTravelAgentsAsync();
    }
}
