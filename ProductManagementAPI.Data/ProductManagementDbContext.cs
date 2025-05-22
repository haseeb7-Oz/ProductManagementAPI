using Microsoft.EntityFrameworkCore;
using ProductManagementAPI.Data.Entities;

namespace ProductManagementAPI.Data;

public partial class ProductManagementDbContext : DbContext
{
    public ProductManagementDbContext(DbContextOptions<ProductManagementDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<Month> Months { get; set; }

    public virtual DbSet<Offer> Offers { get; set; }

    public virtual DbSet<PlanManagement> PlanManagements { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<Property> Properties { get; set; }

    public virtual DbSet<Status> Statuses { get; set; }

    public virtual DbSet<Tier> Tiers { get; set; }

    public virtual DbSet<Year> Years { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Customer>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedOnAdd();
        });

        modelBuilder.Entity<Offer>(entity =>
        {
            entity.HasIndex(e => e.TierId, "IX_Offers_TierId");

            entity.Property(e => e.Id).ValueGeneratedOnAdd();

            entity.HasOne(d => d.Tier).WithMany(p => p.Offers).HasForeignKey(d => d.TierId);
        });

        modelBuilder.Entity<PlanManagement>(entity =>
        {
            entity.HasIndex(e => e.MonthId, "IX_PlanManagements_MonthId");

            entity.HasIndex(e => e.PropertyId, "IX_PlanManagements_PropertyId");

            entity.HasIndex(e => e.StatusId, "IX_PlanManagements_StatusId");

            entity.HasIndex(e => e.YearId, "IX_PlanManagements_YearId");

            entity.Property(e => e.Id).ValueGeneratedOnAdd();

            entity.HasOne(d => d.Month).WithMany(p => p.PlanManagements).HasForeignKey(d => d.MonthId);

            entity.HasOne(d => d.Property).WithMany(p => p.PlanManagements).HasForeignKey(d => d.PropertyId);

            entity.HasOne(d => d.Status).WithMany(p => p.PlanManagements).HasForeignKey(d => d.StatusId);

            entity.HasOne(d => d.Year).WithMany(p => p.PlanManagements).HasForeignKey(d => d.YearId);
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedOnAdd();
            entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");
        });

        modelBuilder.Entity<Status>(entity =>
        {
            entity.Property(e => e.Status1).HasColumnName("Status");
        });

        modelBuilder.Entity<Tier>(entity =>
        {
            entity.HasIndex(e => e.PlanManagementId, "IX_Tiers_PlanManagementId");

            entity.Property(e => e.Id).ValueGeneratedOnAdd();

            entity.HasOne(d => d.PlanManagement).WithMany(p => p.Tiers).HasForeignKey(d => d.PlanManagementId);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
