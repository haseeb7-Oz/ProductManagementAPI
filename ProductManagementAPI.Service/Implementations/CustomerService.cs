using ProductManagementAPI.Database.Entities;
using ProductManagementAPI.Repositories.Interfaces;
using ProductManagementAPI.Services.Interfaces;

namespace ProductManagementAPI.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly ICustomerRepository _customerRepository;

        public CustomerService(ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
        }

        public async Task<IEnumerable<CustomerEntity>> GetAllCustomersAsync() => await _customerRepository.GetAllAsync();

        public async Task<CustomerEntity> GetCustomerByIdAsync(Guid id) => await _customerRepository.GetByIdAsync(id);

        public async Task<IEnumerable<CustomerEntity>> SearchCustomersAsync(string? keyword, int pageNumber, int pageSize)
        {
            return await _customerRepository.SearchAsync(keyword, pageNumber, pageSize);
        }

        public async Task<CustomerEntity> AddCustomerAsync(CustomerEntity customer) => await _customerRepository.AddAsync(customer);

        public async Task<CustomerEntity> UpdateCustomerAsync(CustomerEntity customer) => await _customerRepository.UpdateAsync(customer);

        public async Task DeleteCustomerAsync(Guid id) => await _customerRepository.DeleteAsync(id);
    }
}
