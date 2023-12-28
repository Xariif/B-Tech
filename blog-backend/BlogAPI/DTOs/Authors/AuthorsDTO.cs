using BlogAPI.Models;

namespace BlogAPI.DTOs.Authors
{
    public class AuthorsDTO
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public string? Description { get; set; }
        public SocialMedia? SocialMedia { get; set; }
    }
}
