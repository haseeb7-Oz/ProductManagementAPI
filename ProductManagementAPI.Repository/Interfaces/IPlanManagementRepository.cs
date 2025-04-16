using ProductManagementAPI.Database.Entities;
using ProductManagementAPI.Common.Dtos;

namespace ProductManagementAPI.Repositories.Interfaces
{
    public interface IPlanManagementRepository
    {
        Task<IEnumerable<PlanManagementEntity>> GetAllAsync();
        Task<PlanManagementEntity?> GetByIdAsync(Guid id);
        Task<IEnumerable<PlanManagementEntity>> SearchAsync(PlanSearchDto searchDto);
        Task<PlanManagementEntity> AddAsync(PlanManagementEntity plan);
        Task<PlanManagementEntity> UpdateAsync(PlanManagementEntity plan);
        Task DeleteAsync(Guid id);
    }
}
