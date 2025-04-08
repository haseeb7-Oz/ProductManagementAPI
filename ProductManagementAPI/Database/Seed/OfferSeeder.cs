using Microsoft.EntityFrameworkCore;
using ProductManagementAPI.Database.Entities;
using ProductManagementAPI.Database.Entities.SeedEntities;

namespace ProductManagementAPI.Database.Seed
{
    public class OfferSeeder
    {
        public static readonly Guid SeededTierId = Guid.Parse("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb");
        private readonly ModelBuilder _builder;

        public OfferSeeder(ModelBuilder builder)
        {
            _builder = builder;
        }

        public void Seed()
        {
            var offers = new List<OfferEntity>
            {
                new() { Id = Guid.Parse("43cb2fb4-aef7-47af-8820-7c699f40b1dd"), OfferName = "Slot Offers", DateRange = "1/1 - 1/31", Sundays = 450, Mondays = 450, Tuesdays = 450, Wednesdays = 300, Thursdays = 300, Fridays = 300, Saturdays = 300, TierId = SeededTierId },
                new() { Id = Guid.Parse("43cb2fb4-aef7-47af-8820-7c699f40b1de"), OfferName = "Food Offers", DateRange = "1/1 - 1/31", Sundays = 450, Mondays = 450, Tuesdays = 450, Wednesdays = 300, Thursdays = 300, Fridays = 300, Saturdays = 300, TierId = SeededTierId }
            };

            _builder.Entity<OfferEntity>().HasData(offers);
        }
    }
}
