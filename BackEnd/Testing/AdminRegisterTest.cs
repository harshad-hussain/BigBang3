using Microsoft.EntityFrameworkCore;
using Big_Bang3_Assessment.Controllers;
using Big_Bang3_Assessment.Data;
using Big_Bang3_Assessment.Model;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace YourNamespace.Tests.Controllers
{
    public class AdminRegisterTest
    {
        [Fact]
        public async Task GetadminRegisters_ReturnsAllAdminRegisters()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<TourismDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDb")
                .Options;

            using (var context = new TourismDbContext(options))
            {
                // Seed the in-memory database with sample data
                context.AdminRegisters.AddRange(
                    new AdminRegister { Admin_Id = 1, Admin_Name = "Harshad" },
                    new AdminRegister { Admin_Id = 2, Admin_Name = "muthu" });
                context.SaveChanges();
            }

            using (var context = new TourismDbContext(options))
            {
                var controller = new AdminRegistersController(context);

                var result = await controller.GetadminRegisters();

                // Assert
                var actionResult = Assert.IsType<ActionResult<IEnumerable<AdminRegister>>>(result);
                var model = Assert.IsAssignableFrom<IEnumerable<AdminRegister>>(actionResult.Value);
                Assert.Equal(2, model.Count());
            }
        }

    }
}
