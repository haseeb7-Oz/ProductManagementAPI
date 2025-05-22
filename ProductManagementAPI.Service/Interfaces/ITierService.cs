using ProductManagementAPI.Data.Entities;

namespace ProductManagementAPI.Services.Interfaces
{
    public interface ITierService
    {
        Task<IEnumerable<Tier>> GetAllTiersAsync();
    }
}
