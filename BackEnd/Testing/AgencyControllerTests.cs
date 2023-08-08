using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;
using Big_Bang3_Assessment.Controllers;
using Big_Bang3_Assessment.Data;
using Big_Bang3_Assessment.Model;

namespace YourNamespace.Tests.Controllers
{
    public class AgencyControllerTests
    {
        [Fact]
        public async Task GetAgencies_ReturnsAllAgencies()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<TourismDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDb")
                .Options;

            using (var context = new TourismDbContext(options))
            {
                context.agencies.Add(new Agency { Agency_Id = 402, Agency_Name = "Goa Holidays" });
                context.agencies.Add(new Agency { Agency_Id =  403, Agency_Name = "Marcus Holidays" });
                context.SaveChanges();
            }

            using (var context = new TourismDbContext(options))
            {
                var controller = new AgencyController(context, null);

                // Act
                var result = await controller.GetAgencies();

                // Assert
                var actionResult = Assert.IsType<ActionResult<IEnumerable<Agency>>>(result);
                var model = Assert.IsAssignableFrom<IEnumerable<Agency>>(actionResult.Value);
                Assert.Equal(403, model.Count());
            }
        }

        [Fact]
        public async Task GetAgency_ReturnsNotFound_WhenAgencyNotFound()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<TourismDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDb")
                .Options;

            using (var context = new TourismDbContext(options))
            {
                context.agencies.Add(new Agency { Agency_Id = 402, Agency_Name = "Goa Holidays" });
                context.SaveChanges();
            }

            using (var context = new TourismDbContext(options))
            {
                var controller = new AgencyController(context, null);

                // Act
                var result = await controller.GetAgency(403);

                // Assert
                Assert.IsType<NotFoundResult>(result.Result);
            }
        }

        [Fact]
        public async Task GetAgency_ReturnsAgency_WhenFound()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<TourismDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDb")
                .Options;

            using (var context = new TourismDbContext(options))
            {
                context.agencies.Add(new Agency { Agency_Id = 402, Agency_Name = "Goa Holidays" });
                context.SaveChanges();
            }

            using (var context = new TourismDbContext(options))
            {
                var controller = new AgencyController(context, null);

                // Act
                var result = await controller.GetAgency(402);

                // Assert
                var actionResult = Assert.IsType<ActionResult<Agency>>(result);
                var model = Assert.IsAssignableFrom<Agency>(actionResult.Value);
                Assert.Equal(1, model.Agency_Id);
            }
        }

        [Fact]
        public async Task DeleteAgency_ReturnsNotFound_WhenAgencyNotFound()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<TourismDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDb")
                .Options;

            using (var context = new TourismDbContext(options))
            {
                context.agencies.Add(new Agency { Agency_Id = 402, Agency_Name = "Goa Holidays" });
                context.SaveChanges();
            }

            using (var context = new TourismDbContext(options))
            {
                var controller = new AgencyController(context, null);

                // Act
                var result = await controller.DeleteAgency(403);

                // Assert
                Assert.IsType<NotFoundResult>(result);
            }
        }

        [Fact]
        public async Task DeleteAgency_DeletesAgency_WhenFound()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<TourismDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDb")
                .Options;

            using (var context = new TourismDbContext(options))
            {
                context.agencies.Add(new Agency { Agency_Id = 402, Agency_Name = "Goa Holidays" });
                context.SaveChanges();
            }

            using (var context = new TourismDbContext(options))
            {
                var controller = new AgencyController(context, null);

                // Act
                var result = await controller.DeleteAgency(1);

                // Assert
                Assert.IsType<NoContentResult>(result);
                Assert.Null(context.agencies.Find(402));
            }
        }

        // Similar tests for other controller methods...
    }
}
