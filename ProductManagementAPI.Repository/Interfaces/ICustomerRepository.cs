using ProductManagementAPI.Data.Entities;

namespace ProductManagementAPI.Repositories.Interfaces
{
    public interface ICustomerRepository
    {
        Task<IEnumerable<Customer>> GetAllAsync();
        Task<Customer> GetByIdAsync(Guid id);
        Task<IEnumerable<Customer>> SearchAsync(string? keyword, int pageNumber, int pageSize);
        Task<Customer> AddAsync(Customer customer);
        Task<Customer> UpdateAsync(Customer customer);
        Task DeleteAsync(Guid id);
    }
}
