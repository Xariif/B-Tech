using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BlogAPI.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public required ObjectId Id { get; set; }
        public required string UserId { get; set; }
        public required string Name { get; set; }
        public required string Surname { get; set; }
        public required string Email { get; set; }
        public int? Phone { get; set; }
        public DateTime ActiveFrom { get; set; }
    }
}
