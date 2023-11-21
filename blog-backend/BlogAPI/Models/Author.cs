using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace BlogAPI.Models
{
    public class Author
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public required ObjectId Id { get; set; }

        public required string UserId { get; set; } 

        public string? Desciption { get; set; }

        public SocialMedia? SocialMedia { get; set; }

    }

    public class SocialMedia
    {
        public string? Facebook { get; set; }
        public string? Instagram { get; set; }
        public string? Twitter { get; set; }
    }
}
