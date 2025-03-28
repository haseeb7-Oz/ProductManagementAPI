using Microsoft.EntityFrameworkCore;
using ProductManagementAPI.Database.Entities.SeedEntities;

namespace ProductManagementAPI.Database.Seed
{
    public class PropertySeeder
    {
        private readonly ModelBuilder _builder;

        public PropertySeeder(ModelBuilder builder)
        {
            _builder = builder;
        }

        public void Seed()
        {
            var properties = new List<PropertyEntity>
            {
                new() { Id = 1, Name = "HRCIN" },
                new() { Id = 2, Name = "HRNYC" },
            };

            _builder.Entity<PropertyEntity>().HasData(properties);
        }
    }
}
