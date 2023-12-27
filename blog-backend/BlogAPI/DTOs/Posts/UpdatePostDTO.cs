namespace BlogAPI.DTOs.Posts
{
    public class UpdatePostDTO
    {
        public required string Id { get; set; }
        public required string Title { get; set; }
        public required string Content { get; set; }
        public required string Category { get; set; }
        public List<string>? Tags { get; set; }
        public required IFormFile MainImage { get; set; }
    }
}
