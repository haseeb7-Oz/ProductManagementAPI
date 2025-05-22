using System;
using System.Collections.Generic;

namespace ProductManagementAPI.Data.Entities;

public partial class Offer
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

    public virtual Tier? Tier { get; set; }
}
