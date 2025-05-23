using Microsoft.EntityFrameworkCore;
using ProductManagementAPI.Database.Entities.SeedEntities;

namespace ProductManagementAPI.Database.Seed
{
    public class YearSeeder
    {
        private readonly ModelBuilder _builder;

        public YearSeeder(ModelBuilder builder)
        {
            _builder = builder;
        }

        public void Seed()
        {
            var years = new List<YearEntity>
            {
                new() { Id = 1, Value = 2022 },
                new() { Id = 2, Value = 2023 },
                new() { Id = 3, Value = 2024 }
            };

            _builder.Entity<YearEntity>().HasData(years);
        }
    }
}
