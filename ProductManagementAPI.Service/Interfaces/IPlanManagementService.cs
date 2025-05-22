using ProductManagementAPI.Common.Dtos;
using ProductManagementAPI.Data.Entities;

namespace ProductManagementAPI.Services.Interfaces
{
    public interface IPlanManagementService
    {
        Task<IEnumerable<PlanManagement>> GetAllPlansAsync();
        Task<PlanManagement?> GetPlanByIdAsync(Guid id);
        Task<IEnumerable<PlanManagement>> SearchPlansAsync(PlanSearchDto searchDto);
        Task<PlanManagement> AddPlanAsync(PlanManagement plan);
        Task<PlanManagement> UpdatePlanAsync(PlanManagement plan);
        Task DeletePlanAsync(Guid id);
    }
}
