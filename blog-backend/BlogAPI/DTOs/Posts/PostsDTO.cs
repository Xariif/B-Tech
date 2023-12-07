using BlogAPI.Models;

namespace BlogAPI.DTOs.Posts
{
    public class PostsDTO
    {
        public string Id { get; set; }
        public string? MainParentId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string AuthorId { get; set; }
        public string Category { get; set; }
        public List<string>? Tags { get; set; }
        public DateTime CreatedAt { get; set; }
        public Status Status { get; set; }
        public DateTime LastUpdatedAt { get; set; }
        public int Views { get; set; } = 0;
        public int Likes { get; set; } = 0;
        public int Dislikes { get; set; } = 0;
    }
}
