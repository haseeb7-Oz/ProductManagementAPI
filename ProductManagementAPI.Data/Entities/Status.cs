using System;
using System.Collections.Generic;

namespace ProductManagementAPI.Data.Entities;

public partial class Status
{
    public int Id { get; set; }

    public string? Status1 { get; set; }

    public virtual ICollection<PlanManagement> PlanManagements { get; set; } = new List<PlanManagement>();
}
