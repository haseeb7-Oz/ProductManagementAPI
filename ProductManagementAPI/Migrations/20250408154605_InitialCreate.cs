using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ProductManagementAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Tiers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PlanManagementId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tiers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tiers_PlanManagements_PlanManagementId",
                        column: x => x.PlanManagementId,
                        principalTable: "PlanManagements",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Offers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OfferName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateRange = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Sundays = table.Column<int>(type: "int", nullable: true),
                    Mondays = table.Column<int>(type: "int", nullable: true),
                    Tuesdays = table.Column<int>(type: "int", nullable: true),
                    Wednesdays = table.Column<int>(type: "int", nullable: true),
                    Thursdays = table.Column<int>(type: "int", nullable: true),
                    Fridays = table.Column<int>(type: "int", nullable: true),
                    Saturdays = table.Column<int>(type: "int", nullable: true),
                    TierId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Offers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Offers_Tiers_TierId",
                        column: x => x.TierId,
                        principalTable: "Tiers",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "Tiers",
                columns: new[] { "Id", "Name", "PlanManagementId" },
                values: new object[] { new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"), "2000n100ADW_s", null });

            migrationBuilder.InsertData(
                table: "Offers",
                columns: new[] { "Id", "DateRange", "Fridays", "Mondays", "OfferName", "Saturdays", "Sundays", "Thursdays", "TierId", "Tuesdays", "Wednesdays" },
                values: new object[,]
                {
                    { new Guid("43cb2fb4-aef7-47af-8820-7c699f40b1dd"), "1/1 - 1/31", 300, 450, "Slot Offers", 300, 450, 300, new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"), 450, 300 },
                    { new Guid("43cb2fb4-aef7-47af-8820-7c699f40b1de"), "1/1 - 1/31", 300, 450, "Food Offers", 300, 450, 300, new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"), 450, 300 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Offers_TierId",
                table: "Offers",
                column: "TierId");

            migrationBuilder.CreateIndex(
                name: "IX_Tiers_PlanManagementId",
                table: "Tiers",
                column: "PlanManagementId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Offers");

            migrationBuilder.DropTable(
                name: "Tiers");
        }
    }
}
