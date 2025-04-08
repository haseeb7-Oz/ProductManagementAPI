using ProductManagementAPI.Database.Entities;

namespace ProductManagementAPI.Repositories.Interfaces
{
    public interface ITierRepository
    {
        Task<IEnumerable<TierEntity>> GetAllAsync();
    }
}
