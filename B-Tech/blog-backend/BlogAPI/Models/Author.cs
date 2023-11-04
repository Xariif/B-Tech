using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BlogAPI.Models
{
    public class Author
    {
        [BsonId]
        public required ObjectId Id { get; set; }

        public required string Name { get; set; }

        public required string Surname { get; set; }

        public string? Description { get; set; }

        public DateTime ActiveFrom { get; set; }
    }
}
