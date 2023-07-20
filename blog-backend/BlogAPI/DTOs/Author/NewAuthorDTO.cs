using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BlogAPI.DTOs.Author
{
    public class NewAuthorDTO
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public required string Name { get; set; }
        public required string  Surname { get; set; }
        public string? Description { get; set; }
        public DateTime? ActiveFrom { get; set; } = DateTime.Now;
    }
}
