using System;
using System.Collections.Generic;

namespace ProductManagementAPI.Data.Entities;

public partial class Property
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<PlanManagement> PlanManagements { get; set; } = new List<PlanManagement>();
}
