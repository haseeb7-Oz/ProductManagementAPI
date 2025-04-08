using Microsoft.EntityFrameworkCore;
using ProductManagementAPI.Database.Entities;

namespace ProductManagementAPI.Database.Seed
{
    public class TierSeeder
    {
        private readonly ModelBuilder _builder;

        public TierSeeder(ModelBuilder builder)
        {
            _builder = builder;
        }

        public void Seed()
        {
            var tier = new TierEntity
            {
                Id = OfferSeeder.SeededTierId,
                Name = "2000n100ADW_s",
                PlanManagementId = null
            };

            _builder.Entity<TierEntity>().HasData(tier);
        }
    }
}
