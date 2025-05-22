using System;
using System.Collections.Generic;

namespace ProductManagementAPI.Data.Entities;

public partial class Tier
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public Guid? PlanManagementId { get; set; }

    public virtual ICollection<Offer> Offers { get; set; } = new List<Offer>();

    public virtual PlanManagement? PlanManagement { get; set; }
}
