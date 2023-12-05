using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BlogAPI.Models
{

    public class Comment
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public required ObjectId Id { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public required ObjectId PostId { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public required ObjectId UserId { get; set; }
        public required bool Edited { get; set; } = false;
        public required string AuthorName { get; set; }
        public required DateTime CreatedAt { get; set; }
        public required string Description { get; set; }
        public required int Likes { get; set; } = 0;
        public int Dislikes { get; set; } = 0;
    }
}