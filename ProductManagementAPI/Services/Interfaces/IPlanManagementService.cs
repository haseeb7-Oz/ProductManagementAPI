using ProductManagementAPI.Database.Entities;

namespace ProductManagementAPI.Services.Interfaces
{
    public interface IPlanManagementService
    {
        Task<IEnumerable<PlanManagementEntity>> GetAllPlansAsync();
        Task<PlanManagementEntity> GetPlanByIdAsync(Guid id);
        Task<IEnumerable<PlanManagementEntity>> SearchPlansAsync(string? keyword, int pageNumber, int pageSize);
        Task<PlanManagementEntity> AddPlanAsync(PlanManagementEntity plan);
        Task<PlanManagementEntity> UpdatePlanAsync(PlanManagementEntity plan);
        Task DeletePlanAsync(Guid id);
    }
}
