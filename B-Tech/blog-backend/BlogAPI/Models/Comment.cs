using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BlogAPI.Models
{

    public class Comment
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId PostId { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId? AuthorId { get; set; }

        public bool Edited { get; set; } = false;

        public string? AuthorName { get; set; }

        public DateTime CreatedAt { get; set; }

        public required string Description { get; set; }

        public int Likes { get; set; } = 0;

        public int Dislikes { get; set; } = 0;

        public List<Comment>? SubComments { get; set; }
    }
}