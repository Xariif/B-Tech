namespace BlogAPI.DTOs.Posts
{
    public class CreateDraftPostDTO
    {
        public string? MainParentId { get; set; }
        public required string Title { get; set; }
        public string? Content { get; set; }
        public string? Category { get; set; }
        public List<string>? Tags { get; set; }
        public IFormFile? MainImage { get; set; }
    }
}
