using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BlogAPI.Models
{
    public class Post
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public  ObjectId Id { get; set; }
        public  string? Title { get; set; }
        public  string? Content { get; set; }
        public  string? Author { get; set; }
        public string? Category { get; set; }
        public string[]? Tags { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; } = null;
    }
}
