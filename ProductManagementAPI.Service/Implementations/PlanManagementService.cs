using ProductManagementAPI.Common.Dtos;
using ProductManagementAPI.Repositories.Interfaces;
using ProductManagementAPI.Services.Interfaces;
using ProductManagementAPI.Data.Entities;

namespace ProductManagementAPI.Services
{
    public class PlanManagementService : IPlanManagementService
    {
        private readonly IPlanManagementRepository _planManagementRepository;

        public PlanManagementService(IPlanManagementRepository planManagementRepository)
        {
            _planManagementRepository = planManagementRepository;
        }

        public async Task<IEnumerable<PlanManagement>> GetAllPlansAsync() => await _planManagementRepository.GetAllAsync();

        public async Task<PlanManagement?> GetPlanByIdAsync(Guid id) => await _planManagementRepository.GetByIdAsync(id);

        public async Task<IEnumerable<PlanManagement>> SearchPlansAsync(PlanSearchDto searchDto)
        {
            return await _planManagementRepository.SearchAsync(searchDto);
        }

        public async Task<PlanManagement> AddPlanAsync(PlanManagement plan) => await _planManagementRepository.AddAsync(plan);

        public async Task<PlanManagement> UpdatePlanAsync(PlanManagement plan) => await _planManagementRepository.UpdateAsync(plan);

        public async Task DeletePlanAsync(Guid id) => await _planManagementRepository.DeleteAsync(id);        
    }
}
