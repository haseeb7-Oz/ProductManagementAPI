using ProductManagementAPI.Database.Entities;

namespace ProductManagementAPI.Repositories.Interfaces
{
    public interface IPlanManagementRepository
    {
        Task<IEnumerable<PlanManagementEntity>> GetAllAsync();
        Task<PlanManagementEntity> GetByIdAsync(Guid id);
        Task<IEnumerable<PlanManagementEntity>> SearchAsync(string? keyword, int pageNumber, int pageSize);
        Task<PlanManagementEntity> AddAsync(PlanManagementEntity plan);
        Task<PlanManagementEntity> UpdateAsync(PlanManagementEntity plan);
        Task DeleteAsync(Guid id);
    }
}
