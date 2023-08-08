
using ImageGalleryBB.Data;
using ImageGalleryBB.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bb3Gallery.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GalleryController : ControllerBase
    {


        private readonly GalleryContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;

        public GalleryController(GalleryContext context, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<PhotoGallery>>> GetPhotos()
        {
            return await _context.images.ToListAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<PhotoGallery>> GetPhoto(int id)
        {
            var photo = await _context.images.FirstOrDefaultAsync(a => a.Photo_Id == id);

            if (photo == null)
            {
                return NotFound();
            }

            return photo;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutPhotos(int id, PhotoGallery photo)
        {
            if (id != photo.Photo_Id)
            {
                return BadRequest();
            }

            _context.Entry(photo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PhotoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }



        [HttpPost]
        public async Task<IActionResult> PostPhoto([FromForm] PhotoGallery photo, IFormFile imageFile)
        {
            if (imageFile != null && imageFile.Length > 0)
            {
                var uploadsFolder = Path.Combine(_hostEnvironment.ContentRootPath, "wwwroot", "uploads", "images");

                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream);
                }

                photo.TourGallery = fileName;
            }

            _context.images.Add(photo);
            await _context.SaveChangesAsync();

            return Ok(photo); // Return 200 OK response with the photo object if needed
        }




        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int id)
        {
            var photo = await _context.images.FindAsync(id);
            if (photo == null)
            {
                return NotFound();
            }

            _context.images.Remove(photo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PhotoExists(int id)
        {
            return _context.images.Any(a => a.Photo_Id == id);
        }
    }
}