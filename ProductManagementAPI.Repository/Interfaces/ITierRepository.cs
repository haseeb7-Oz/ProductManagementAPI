using ProductManagementAPI.Data.Entities;

namespace ProductManagementAPI.Repositories.Interfaces
{
    public interface ITierRepository
    {
        Task<IEnumerable<Tier>> GetAllAsync();
    }
}
