using ProductManagementAPI.Database.Entities;

namespace ProductManagementAPI.Services.Interfaces
{
    public interface ICustomerService
    {
        Task<IEnumerable<CustomerEntity>> GetAllCustomersAsync();
        Task<CustomerEntity> GetCustomerByIdAsync(Guid id);
        Task<IEnumerable<CustomerEntity>> SearchCustomersAsync(string? keyword, int pageNumber, int pageSize);
        Task<CustomerEntity> AddCustomerAsync(CustomerEntity customer);
        Task<CustomerEntity> UpdateCustomerAsync(CustomerEntity customer);
        Task DeleteCustomerAsync(Guid id);
    }
}
