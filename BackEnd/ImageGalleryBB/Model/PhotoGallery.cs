using System.ComponentModel.DataAnnotations;

namespace ImageGalleryBB.Model
{

    public class PhotoGallery
    {
   
            [Key] public int Photo_Id { get; set; }

            public string? TourGallery { get; set; }
        }

    }
