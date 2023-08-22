using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BlogAPI.Models
{
    public class CommentLike
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId UserId { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId CommentId { get; set; }

        public bool IsLiked { get; set; }
    }
}

