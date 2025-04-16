namespace ProductManagementAPI.Common.Dtos
{
    public class PlanSearchDto
    {
        public string? PlanNumber { get; set; }
        public string? PlanName { get; set; }
        public int? MonthId { get; set; }
        public int? YearId { get; set; }
        public int? PropertyId { get; set; }
        public int? StatusId { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}
