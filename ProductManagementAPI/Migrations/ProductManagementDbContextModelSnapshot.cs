﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ProductManagementAPI.Database;

#nullable disable

namespace ProductManagementAPI.Migrations
{
    [DbContext(typeof(ProductManagementDbContext))]
    partial class ProductManagementDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("ProductManagementAPI.Database.Entities.CustomerEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Customers");
                });

            modelBuilder.Entity("ProductManagementAPI.Database.Entities.OfferEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("DateRange")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Fridays")
                        .HasColumnType("int");

                    b.Property<int?>("Mondays")
                        .HasColumnType("int");

                    b.Property<string>("OfferName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Saturdays")
                        .HasColumnType("int");

                    b.Property<int?>("Sundays")
                        .HasColumnType("int");

                    b.Property<int?>("Thursdays")
                        .HasColumnType("int");

                    b.Property<Guid?>("TierId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int?>("Tuesdays")
                        .HasColumnType("int");

                    b.Property<int?>("Wednesdays")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TierId");

                    b.ToTable("Offers");

                    b.HasData(
                        new
                        {
                            Id = new Guid("43cb2fb4-aef7-47af-8820-7c699f40b1dd"),
                            DateRange = "1/1 - 1/31",
                            Fridays = 300,
                            Mondays = 450,
                            OfferName = "Slot Offers",
                            Saturdays = 300,
                            Sundays = 450,
                            Thursdays = 300,
                            TierId = new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"),
                            Tuesdays = 450,
                            Wednesdays = 300
                        },
                        new
                        {
                            Id = new Guid("43cb2fb4-aef7-47af-8820-7c699f40b1de"),
                            DateRange = "1/1 - 1/31",
                            Fridays = 300,
                            Mondays = 450,
                            OfferName = "Food Offers",
                            Saturdays = 300,
                            Sundays = 450,
                            Thursdays = 300,
                            TierId = new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"),
                            Tuesdays = 450,
                            Wednesdays = 300
                        });
                });

            modelBuilder.Entity("ProductManagementAPI.Database.Entities.PlanManagementEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int?>("MonthId")
                        .HasColumnType("int");

                    b.Property<string>("PlanName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PlanNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("PropertyId")
                        .HasColumnType("int");

                    b.Property<int?>("StatusId")
                        .HasColumnType("int");

                    b.Property<int?>("YearId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("MonthId");

                    b.HasIndex("PropertyId");

                    b.HasIndex("StatusId");

                    b.HasIndex("YearId");

                    b.ToTable("PlanManagements");
                });

            modelBuilder.Entity("ProductManagementAPI.Database.Entities.ProductEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal?>("Price")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int?>("stock")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("ProductManagementAPI.Database.Entities.SeedEntities.MonthEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Months");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "January"
                        },
                        new
                        {
                            Id = 2,
                            Name = "February"
                        },
                        new
                        {
                            Id = 3,
                            Name = "March"
                        },
                        new
                        {
                            Id = 4,
                            Name = "April"
                        },
                        new
                        {
                            Id = 5,
                            Name = "May"
                        },
                        new
                        {
                            Id = 6,
                            Name = "June"
                        },
                        new
                        {
                            Id = 7,
                            Name = "July"
                        },
                        new
                        {
                            Id = 8,
                            Name = "August"
                        },
                        new
                        {
                            Id = 9,
                            Name = "September"
                        },
                        new
                        {
                            Id = 10,
                            Name = "October"
                        },
                        new
                        {
                            Id = 11,
                            Name = "November"
                        },
                        new
                        {
                            Id = 12,
                            Name = "December"
                        });
                });

            modelBuilder.Entity("ProductManagementAPI.Database.Entities.SeedEntities.PropertyEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Properties");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "HRCIN"
                        },
                        new
                        {
                            Id = 2,
                            Name = "HRNYC"
                        });
                });

            modelBuilder.Entity("ProductManagementAPI.Database.Entities.SeedEntities.StatusEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Statuses");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Status = "Execution"
                        },
                        new
                        {
                            Id = 2,
                            Status = "Initiation"
                        },
                        new
                        {
                            Id = 3,
                            Status = "Planning"
                        });
                });

            modelBuilder.Entity("ProductManagementAPI.Database.Entities.SeedEntities.YearEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("Value")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Years");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Value = 2022
                        },
                        new
                        {
                            Id = 2,
                            Value = 2023
                        },
                        new
                        {
                            Id = 3,
                            Value = 2024
                        });
                });

            modelBuilder.Entity("ProductManagementAPI.Database.Entities.TierEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("PlanManagementId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("PlanManagementId");

                    b.ToTable("Tiers");

                    b.HasData(
                        new
                        {
                            Id = new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"),
                            Name = "2000n100ADW_s"
                        });
                });

            modelBuilder.Entity("ProductManagementAPI.Database.Entities.OfferEntity", b =>
                {
                    b.HasOne("ProductManagementAPI.Database.Entities.TierEntity", "Tier")
                        .WithMany("Offers")
                        .HasForeignKey("TierId");

                    b.Navigation("Tier");
                });

            modelBuilder.Entity("ProductManagementAPI.Database.Entities.PlanManagementEntity", b =>
                {
                    b.HasOne("ProductManagementAPI.Database.Entities.SeedEntities.MonthEntity", "Month")
                        .WithMany()
                        .HasForeignKey("MonthId");

                    b.HasOne("ProductManagementAPI.Database.Entities.SeedEntities.PropertyEntity", "Property")
                        .WithMany()
                        .HasForeignKey("PropertyId");

                    b.HasOne("ProductManagementAPI.Database.Entities.SeedEntities.StatusEntity", "Status")
                        .WithMany()
                        .HasForeignKey("StatusId");

                    b.HasOne("ProductManagementAPI.Database.Entities.SeedEntities.YearEntity", "Year")
                        .WithMany()
                        .HasForeignKey("YearId");

                    b.Navigation("Month");

                    b.Navigation("Property");

                    b.Navigation("Status");

                    b.Navigation("Year");
                });

            modelBuilder.Entity("ProductManagementAPI.Database.Entities.TierEntity", b =>
                {
                    b.HasOne("ProductManagementAPI.Database.Entities.PlanManagementEntity", "PlanManagement")
                        .WithMany()
                        .HasForeignKey("PlanManagementId");

                    b.Navigation("PlanManagement");
                });

            modelBuilder.Entity("ProductManagementAPI.Database.Entities.TierEntity", b =>
                {
                    b.Navigation("Offers");
                });
#pragma warning restore 612, 618
        }
    }
}
