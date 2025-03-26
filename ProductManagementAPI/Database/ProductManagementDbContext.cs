using Microsoft.EntityFrameworkCore;
using ProductManagementAPI.Database.Entities;

namespace ProductManagementAPI.Database
{
    public class ProductManagementDbContext : DbContext
    {
        public ProductManagementDbContext(DbContextOptions<ProductManagementDbContext> options) : base(options)
        {
        }

        public DbSet<ProductEntity> Products { get; set; }
        public DbSet<CustomerEntity> Customers { get; set; } // Added Customer DbSet

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProductEntity>().HasKey(product => product.Id);
            modelBuilder.Entity<CustomerEntity>().HasKey(customer => customer.Id); // Added Customer Entity Configuration
        }
    }
}
