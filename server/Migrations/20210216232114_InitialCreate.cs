using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;
using WebApi.Helpers;

namespace WebApi.Migrations
{
	public partial class InitialCreate : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.CreateTable(
				name: "SearchLogs",
				columns: table => new
				{
					Id = table.Column<int>(type: "int", nullable: false)
						.Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
					HitCount = table.Column<int>(type: "int", nullable: false),
					Query = table.Column<string>(type: "nvarchar(max)", nullable: true),
					SearchDate = table.Column<DateTime>(type: "datetime2", nullable: false),
					URL = table.Column<string>(type: "nvarchar(max)", nullable: true)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_SearchLogs", x => x.Id);
				});

			migrationBuilder.CreateTable(
				name: "Users",
				columns: table => new
				{
					Id = table.Column<int>(type: "int", nullable: false)
						.Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
					FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
					LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
					PasswordHash = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
					PasswordSalt = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
					Username = table.Column<string>(type: "nvarchar(max)", nullable: true)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Users", x => x.Id);
				});


			var constantKey = "test";
			HashUtility.CreatePasswordHash(constantKey, out var passwordHash, out var passwordSalt);

			migrationBuilder.InsertData(
				table: "Users",
				columns: new[] { "Id", "FirstName", "LastName", "PasswordHash", "PasswordSalt", "Username", },
				values: new object[] { 1, "Testing", "Person", passwordHash, passwordSalt, constantKey });
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropTable(
				name: "SearchLogs");

			migrationBuilder.DropTable(
				name: "Users");
		}
	}
}
