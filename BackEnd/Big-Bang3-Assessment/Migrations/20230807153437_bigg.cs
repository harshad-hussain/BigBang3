using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Big_Bang3_Assessment.Migrations
{
    /// <inheritdoc />
    public partial class bigg : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AdminPost_adminRegisters_adminRegisterAdmin_Id",
                table: "AdminPost");

            migrationBuilder.DropForeignKey(
                name: "FK_agencies_adminRegisters_AdminRegisterAdmin_Id",
                table: "agencies");

            migrationBuilder.DropForeignKey(
                name: "FK_agentRegisters_adminRegisters_AdminRegisterAdmin_Id",
                table: "agentRegisters");

            migrationBuilder.DropPrimaryKey(
                name: "PK_adminRegisters",
                table: "adminRegisters");

            migrationBuilder.RenameTable(
                name: "adminRegisters",
                newName: "AdminRegisters");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AdminRegisters",
                table: "AdminRegisters",
                column: "Admin_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AdminPost_AdminRegisters_adminRegisterAdmin_Id",
                table: "AdminPost",
                column: "adminRegisterAdmin_Id",
                principalTable: "AdminRegisters",
                principalColumn: "Admin_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_agencies_AdminRegisters_AdminRegisterAdmin_Id",
                table: "agencies",
                column: "AdminRegisterAdmin_Id",
                principalTable: "AdminRegisters",
                principalColumn: "Admin_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_agentRegisters_AdminRegisters_AdminRegisterAdmin_Id",
                table: "agentRegisters",
                column: "AdminRegisterAdmin_Id",
                principalTable: "AdminRegisters",
                principalColumn: "Admin_Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AdminPost_AdminRegisters_adminRegisterAdmin_Id",
                table: "AdminPost");

            migrationBuilder.DropForeignKey(
                name: "FK_agencies_AdminRegisters_AdminRegisterAdmin_Id",
                table: "agencies");

            migrationBuilder.DropForeignKey(
                name: "FK_agentRegisters_AdminRegisters_AdminRegisterAdmin_Id",
                table: "agentRegisters");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AdminRegisters",
                table: "AdminRegisters");

            migrationBuilder.RenameTable(
                name: "AdminRegisters",
                newName: "adminRegisters");

            migrationBuilder.AddPrimaryKey(
                name: "PK_adminRegisters",
                table: "adminRegisters",
                column: "Admin_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AdminPost_adminRegisters_adminRegisterAdmin_Id",
                table: "AdminPost",
                column: "adminRegisterAdmin_Id",
                principalTable: "adminRegisters",
                principalColumn: "Admin_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_agencies_adminRegisters_AdminRegisterAdmin_Id",
                table: "agencies",
                column: "AdminRegisterAdmin_Id",
                principalTable: "adminRegisters",
                principalColumn: "Admin_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_agentRegisters_adminRegisters_AdminRegisterAdmin_Id",
                table: "agentRegisters",
                column: "AdminRegisterAdmin_Id",
                principalTable: "adminRegisters",
                principalColumn: "Admin_Id");
        }
    }
}
