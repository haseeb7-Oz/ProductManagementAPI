using ProductManagementAPI.Database.Entities.SeedEntities;

namespace ProductManagementAPI.Database.Entities
{
    public class TierEntity
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }

        public Guid? PlanManagementId { get; set; }
        public PlanManagementEntity? PlanManagement { get; set; }

        public ICollection<OfferEntity> Offers { get; set; } = new List<OfferEntity>();
    }
}
