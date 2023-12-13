using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BlogAPI.Models
{
    public class Posts
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public required ObjectId Id { get; set; }
        public required ObjectId? MainParentId { get; set; }
        public required string Title { get; set; }
        public required string Content { get; set; }
        public required ObjectId AuthorId { get; set; }
        public required string Category { get; set; }
        public required List<string>? Tags { get; set; }
        public required DateTime CreatedAt { get; set; }
        public int Views { get; set; }
        public int Likes { get; set; }
        public int Dislikes { get; set; }
        public required Status Status { get; set; }
        public ObjectId? MainPhotoId { get; set; }
    }

}

public enum Status
{
    Aproved,
    Rejected,
    Draft,
    ToConfirm
}



