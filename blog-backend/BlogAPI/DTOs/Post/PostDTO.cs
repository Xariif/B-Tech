namespace BlogAPI.DTOs.Post
{
    public class PostDTO
    {
        public required string Id { get; set; }
        public required string Title { get; set; }
        public required string Content { get; set; }
        public required string Category { get; set; }
        public required string AuthorId { get; set; }
        public required string AuthorName { get; set; }
        public required string Tag { get; set; }
        public required DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; } = DateTime.Now;
    }
}
