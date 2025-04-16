using ProductManagementAPI.Database.Entities;

namespace ProductManagementAPI.Services.Interfaces
{
    public interface ITierService
    {
        Task<IEnumerable<TierEntity>> GetAllTiersAsync();
    }
}
