using ImageGalleryBB.Model;
using Microsoft.EntityFrameworkCore;

namespace ImageGalleryBB.Data
{
    public class GalleryContext:DbContext
    {
        public GalleryContext(DbContextOptions<GalleryContext> options) : base(options)
        {
        }
        public DbSet<PhotoGallery> images { get; set; }
    }
}
