using ProductManagementAPI.Database.Entities;
using ProductManagementAPI.Common.Dtos;

namespace ProductManagementAPI.Services.Interfaces
{
    public interface IPlanManagementService
    {
        Task<IEnumerable<PlanManagementEntity>> GetAllPlansAsync();
        Task<PlanManagementEntity?> GetPlanByIdAsync(Guid id);
        Task<IEnumerable<PlanManagementEntity>> SearchPlansAsync(PlanSearchDto searchDto);
        Task<PlanManagementEntity> AddPlanAsync(PlanManagementEntity plan);
        Task<PlanManagementEntity> UpdatePlanAsync(PlanManagementEntity plan);
        Task DeletePlanAsync(Guid id);
    }
}
