using ProductManagementAPI.Database.Entities;

namespace ProductManagementAPI.Repositories.Interfaces
{
    public interface ICustomerRepository
    {
        Task<IEnumerable<CustomerEntity>> GetAllAsync();
        Task<CustomerEntity> GetByIdAsync(Guid id);
        Task<IEnumerable<CustomerEntity>> SearchAsync(string? keyword, int pageNumber, int pageSize);
        Task<CustomerEntity> AddAsync(CustomerEntity customer);
        Task<CustomerEntity> UpdateAsync(CustomerEntity customer);
        Task DeleteAsync(Guid id);
    }
}
