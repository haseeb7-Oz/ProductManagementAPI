using Microsoft.EntityFrameworkCore;
using ProductManagementAPI.Database.Entities.SeedEntities;

namespace ProductManagementAPI.Database.Seed
{
    public class MonthSeeder
    {
        private readonly ModelBuilder _builder;

        public MonthSeeder(ModelBuilder builder)
        {
            _builder = builder;
        }

        public void Seed()
        {
            var months = new List<MonthEntity>
            {
                new() { Id = 1, Name = "January" },
                new() { Id = 2, Name = "February" },
                new() { Id = 3, Name = "March" },
                new() { Id = 4, Name = "April" },
                new() { Id = 5, Name = "May" },
                new() { Id = 6, Name = "June" },
                new() { Id = 7, Name = "July" },
                new() { Id = 8, Name = "August" },
                new() { Id = 9, Name = "September" },
                new() { Id = 10, Name = "October" },
                new() { Id = 11, Name = "November" },
                new() { Id = 12, Name = "December" }
            };

            _builder.Entity<MonthEntity>().HasData(months);
        }
    }
}
