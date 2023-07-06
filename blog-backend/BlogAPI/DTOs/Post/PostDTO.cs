using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace BlogAPI.DTOs.Post
{
    public class PostDTO
    {
        public  string? Id { get; set; }
        public  string? Title { get; set; }
        public  string? Content { get; set; }
        public  string? Author { get; set; }
        public string? Category { get; set; }
        public string[]? Tags { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; } 
    }
}
