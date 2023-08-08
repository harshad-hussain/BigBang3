using System.Collections.Generic;
using System.Threading.Tasks;
using Big_Bang3_Assessment.Model;

namespace Big_Bang3_Assessment.Repositories
{
    public interface IAdminRegisterRepository
    {
        Task<IEnumerable<AdminRegister>> GetAllAdminRegistersAsync();
        Task<AdminRegister> GetAdminRegisterByIdAsync(int id);
        Task<AdminRegister> CreateAdminRegisterAsync(AdminRegister adminRegister);
        Task UpdateAdminRegisterAsync(AdminRegister adminRegister);
        Task DeleteAdminRegisterAsync(int id);
    }
}
