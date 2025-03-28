using ProductManagementAPI.Database.Entities;
using ProductManagementAPI.Repositories;
using ProductManagementAPI.Repositories.Interfaces;
using ProductManagementAPI.Services.Interfaces;

namespace ProductManagementAPI.Services
{
    public class PlanManagementService : IPlanManagementService
    {
        private readonly IPlanManagementRepository _planManagementRepository;

        public PlanManagementService(IPlanManagementRepository planManagementRepository)
        {
            _planManagementRepository = planManagementRepository;
        }

        public async Task<IEnumerable<PlanManagementEntity>> GetAllPlansAsync() => await _planManagementRepository.GetAllAsync();

        public async Task<PlanManagementEntity> GetPlanByIdAsync(Guid id) => await _planManagementRepository.GetByIdAsync(id);

        public async Task<IEnumerable<PlanManagementEntity>> SearchPlansAsync(string? keyword, int pageNumber, int pageSize)
        {
            return await _planManagementRepository.SearchAsync(keyword, pageNumber, pageSize);
        }

        public async Task<PlanManagementEntity> AddPlanAsync(PlanManagementEntity plan) => await _planManagementRepository.AddAsync(plan);

        public async Task<PlanManagementEntity> UpdatePlanAsync(PlanManagementEntity plan) => await _planManagementRepository.UpdateAsync(plan);

        public async Task DeletePlanAsync(Guid id) => await _planManagementRepository.DeleteAsync(id);        
    }
}
