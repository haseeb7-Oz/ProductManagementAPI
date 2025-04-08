using ProductManagementAPI.Database.Entities;
using ProductManagementAPI.Repositories.Interfaces;
using ProductManagementAPI.Services.Interfaces;

namespace ProductManagementAPI.Services
{
    public class TierService : ITierService
    {
        private readonly ITierRepository _tierRepository;

        public TierService(ITierRepository tierRepository)
        {
            _tierRepository = tierRepository;
        }

        public async Task<IEnumerable<TierEntity>> GetAllTiersAsync() => await _tierRepository.GetAllAsync();
    }
}
