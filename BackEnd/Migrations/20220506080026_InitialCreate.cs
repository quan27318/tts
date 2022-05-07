using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackEnd.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Types",
                columns: table => new
                {
                    TypeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TypeName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Types", x => x.TypeId);
                });

            migrationBuilder.CreateTable(
                name: "WorkFlows",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DayStart = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DayEnd = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Explain = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    TypeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkFlows", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkFlows_Types_TypeId",
                        column: x => x.TypeId,
                        principalTable: "Types",
                        principalColumn: "TypeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Types",
                columns: new[] { "TypeId", "TypeName" },
                values: new object[,]
                {
                    { 1, "Xử lý hồ sơ vay vốn" },
                    { 2, "Xử lý hồ sơ đăng ký dịch vụ" },
                    { 3, "Giải ngân" },
                    { 4, "Khác" }
                });

            migrationBuilder.InsertData(
                table: "WorkFlows",
                columns: new[] { "Id", "DayEnd", "DayStart", "Description", "Explain", "IsActive", "Status", "TypeId" },
                values: new object[] { 1, new DateTime(2022, 5, 6, 15, 0, 25, 879, DateTimeKind.Local).AddTicks(7183), new DateTime(2022, 5, 6, 15, 0, 25, 879, DateTimeKind.Local).AddTicks(7173), "None", "None", false, "None", 1 });

            migrationBuilder.CreateIndex(
                name: "IX_WorkFlows_TypeId",
                table: "WorkFlows",
                column: "TypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WorkFlows");

            migrationBuilder.DropTable(
                name: "Types");
        }
    }
}
