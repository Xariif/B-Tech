using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BlogAPI.Models
{

    public class Comments
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public required ObjectId Id { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public required ObjectId UserId { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public required ObjectId PostId { get; set; }
        public required string Content { get; set; }
        public required int Likes { get; set; } = 0;
        public int Dislikes { get; set; } = 0;
        public required DateTime CreatedAt { get; set; }
    }
}