using Microsoft.EntityFrameworkCore;
using ProductManagementAPI.Database;
using ProductManagementAPI.Database.Entities;
using ProductManagementAPI.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductManagementAPI.Repositories
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly ProductManagementDbContext _context;

        public CustomerRepository(ProductManagementDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CustomerEntity>> GetAllAsync() => await _context.Customers.ToListAsync();

        public async Task<CustomerEntity> GetByIdAsync(Guid id) => await _context.Customers.FindAsync(id);

        public async Task<IEnumerable<CustomerEntity>> SearchAsync(string? keyword, int pageNumber, int pageSize)
        {
            var query = _context.Customers.AsQueryable();

            if (!string.IsNullOrEmpty(keyword))
            {
                query = query.Where(c => c.FirstName.Contains(keyword) || c.LastName.Contains(keyword) || c.Email.Contains(keyword));
            }

            return await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        public async Task<CustomerEntity> AddAsync(CustomerEntity customer)
        {
            await _context.Customers.AddAsync(customer);
            await _context.SaveChangesAsync();

            return customer;
        }

        public async Task<CustomerEntity> UpdateAsync(CustomerEntity customer)
        {
            _context.Customers.Update(customer);
            await _context.SaveChangesAsync();

            return customer;
        }

        public async Task DeleteAsync(Guid id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer != null)
            {
                _context.Customers.Remove(customer);
                await _context.SaveChangesAsync();
            }
        }
    }
}
