using BlogAPI.Models;

namespace BlogAPI.DTOs.Authors
{
    public class UpdateAuthorsDTO
    {
        public string? Description { get; set; }
        public SocialMedia? SocialMedia { get; set; }
    }
}
