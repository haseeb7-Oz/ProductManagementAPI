using Microsoft.EntityFrameworkCore;
using ProductManagementAPI.Database.Entities.SeedEntities;

namespace ProductManagementAPI.Database.Seed
{
    public class StatusSeeder
    {
        private readonly ModelBuilder _builder;

        public StatusSeeder(ModelBuilder builder)
        {
            _builder = builder;
        }

        public void Seed()
        {
            var statuses = new List<StatusEntity>
            {
                new() { Id = 1, Status = "Execution" },
                new() { Id = 2, Status = "Initiation" },
                new() { Id = 3, Status = "Planning" }
            };

            _builder.Entity<StatusEntity>().HasData(statuses);
        }
    }
}
