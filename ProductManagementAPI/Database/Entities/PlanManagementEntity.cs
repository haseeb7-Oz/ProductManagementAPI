using ProductManagementAPI.Database.Entities.SeedEntities;

namespace ProductManagementAPI.Database.Entities
{
    public class PlanManagementEntity
    {
        public Guid Id { get; set; }
        public string? PlanNumber { get; set; }
        public string? PlanName { get; set; }

        public int? MonthId { get; set; }
        public MonthEntity? Month { get; set; }

        public int? YearId { get; set; }
        public YearEntity? Year { get; set; }

        public int? PropertyId { get; set; }
        public PropertyEntity? Property { get; set; }

        public int? StatusId { get; set; }
        public StatusEntity? Status { get; set; }
    }
}
