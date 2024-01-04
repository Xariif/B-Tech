using BlogAPI.Models;

namespace BlogAPI.DTOs.Author
{
    public class AuthorDTO
    {
        public required string Id { get; set; }  
        public string? Description { get; set; }
        public required DateTime ActiveFrom { get; set; }
        public SocialMedia? SocialMedia { get; set; }
    }
}
