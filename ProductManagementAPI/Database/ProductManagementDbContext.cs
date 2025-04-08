using Microsoft.EntityFrameworkCore;
using ProductManagementAPI.Database.Entities;
using ProductManagementAPI.Database.Entities.SeedEntities;
using ProductManagementAPI.Database.Seed;

namespace ProductManagementAPI.Database
{
    public class ProductManagementDbContext : DbContext
    {
        public ProductManagementDbContext(DbContextOptions<ProductManagementDbContext> options) : base(options)
        {
        }

        public DbSet<ProductEntity> Products { get; set; }
        public DbSet<CustomerEntity> Customers { get; set; } // Added Customer DbSet
        public DbSet<PlanManagementEntity> PlanManagements { get; set; } // Added PlanManagement DbSet
        public DbSet<OfferEntity> Offers { get; set; } // Added Offer DbSet
        public DbSet<TierEntity> Tiers { get; set; } // Added Tiers DbSet

        #region Seed_DbSet

        public DbSet<MonthEntity> Months { get; set; }
        public DbSet<YearEntity> Years { get; set; }
        public DbSet<StatusEntity> Statuses { get; set; }
        public DbSet<PropertyEntity> Properties { get; set; }

        #endregion


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProductEntity>().HasKey(product => product.Id);
            modelBuilder.Entity<CustomerEntity>().HasKey(customer => customer.Id); // Added Customer Entity Configuration
            modelBuilder.Entity<PlanManagementEntity>().HasKey(plan => plan.Id);
            modelBuilder.Entity<OfferEntity>().HasKey(offer => offer.Id);
            modelBuilder.Entity<TierEntity>().HasKey(tier => tier.Id);
            //modelBuilder.Entity<TierEntity>().HasMany(t => t.Offers).WithOne(o => o.Tier).HasForeignKey(o => o.TierId);


            // Apply Seeders
            new MonthSeeder(modelBuilder).Seed();
            new YearSeeder(modelBuilder).Seed();
            new PropertySeeder(modelBuilder).Seed();
            new StatusSeeder(modelBuilder).Seed();
            new TierSeeder(modelBuilder).Seed();
            new OfferSeeder(modelBuilder).Seed();
        }
    }
}
