namespace BlogAPI.DTOs.Post
{
    public class NewPostDTO
    {
        public required string Title { get; set; }
        public required string Content { get; set; }
        public required string Author { get; set; }
        public string? Category { get; set; }
        public string[]? Tags { get; set; }

    }
}
