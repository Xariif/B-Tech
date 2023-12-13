namespace BlogAPI.DTOs.Posts
{
    public class CreatePostDTO
    {
        public string? MainParentId { get; set; }
        public required string Title { get; set; }
        public required string Content { get; set; }
        public required string Category { get; set; }
        public List<string>? Tags { get; set; }
        public IFormFile MainImage { get; set; }
    }
}
