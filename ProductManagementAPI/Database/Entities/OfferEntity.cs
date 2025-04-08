using System.Text.Json.Serialization;

namespace ProductManagementAPI.Database.Entities
{
    public class OfferEntity
    {
        public Guid Id { get; set; }
        public string? OfferName { get; set; }
        public string? DateRange { get; set; }
        public int? Sundays { get; set; }
        public int? Mondays { get; set; }
        public int? Tuesdays { get; set; }
        public int? Wednesdays { get; set; }
        public int? Thursdays { get; set; }
        public int? Fridays { get; set; }
        public int? Saturdays { get; set; }

        public Guid? TierId { get; set; }

        [JsonIgnoreAttribute]
        public TierEntity? Tier { get; set; } = default!;
    }
}
