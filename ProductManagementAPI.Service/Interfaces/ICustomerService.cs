using ProductManagementAPI.Data.Entities;
using ProductManagementAPI.Database.Entities;

namespace ProductManagementAPI.Services.Interfaces
{
    public interface ICustomerService
    {
        Task<IEnumerable<Customer>> GetAllCustomersAsync();
        Task<Customer> GetCustomerByIdAsync(Guid id);
        Task<IEnumerable<Customer>> SearchCustomersAsync(string? keyword, int pageNumber, int pageSize);
        Task<Customer> AddCustomerAsync(Customer customer);
        Task<Customer> UpdateCustomerAsync(Customer customer);
        Task DeleteCustomerAsync(Guid id);
    }
}
