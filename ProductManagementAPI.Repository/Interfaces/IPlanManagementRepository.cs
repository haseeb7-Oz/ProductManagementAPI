using ProductManagementAPI.Common.Dtos;
using ProductManagementAPI.Data.Entities;

namespace ProductManagementAPI.Repositories.Interfaces
{
    public interface IPlanManagementRepository
    {
        Task<IEnumerable<PlanManagement>> GetAllAsync();
        Task<PlanManagement?> GetByIdAsync(Guid id);
        Task<IEnumerable<PlanManagement>> SearchAsync(PlanSearchDto searchDto);
        Task<PlanManagement> AddAsync(PlanManagement plan);
        Task<PlanManagement> UpdateAsync(PlanManagement plan);
        Task DeleteAsync(Guid id);
    }
}
