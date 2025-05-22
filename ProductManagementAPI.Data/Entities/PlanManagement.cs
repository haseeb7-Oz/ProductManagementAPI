using System;
using System.Collections.Generic;

namespace ProductManagementAPI.Data.Entities;

public partial class PlanManagement
{
    public Guid Id { get; set; }

    public string? PlanNumber { get; set; }

    public string? PlanName { get; set; }

    public int? MonthId { get; set; }

    public int? YearId { get; set; }

    public int? PropertyId { get; set; }

    public int? StatusId { get; set; }

    public virtual Month? Month { get; set; }

    public virtual Property? Property { get; set; }

    public virtual Status? Status { get; set; }

    public virtual ICollection<Tier> Tiers { get; set; } = new List<Tier>();

    public virtual Year? Year { get; set; }
}
