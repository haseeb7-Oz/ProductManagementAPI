using System;
using System.Collections.Generic;

namespace ProductManagementAPI.Data.Entities;

public partial class Year
{
    public int Id { get; set; }

    public int? Value { get; set; }

    public virtual ICollection<PlanManagement> PlanManagements { get; set; } = new List<PlanManagement>();
}
