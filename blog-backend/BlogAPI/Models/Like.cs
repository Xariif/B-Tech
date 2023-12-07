using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BlogAPI.Models
{
	public class Like
	{
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public required ObjectId Id { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public required ObjectId UserId { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public required ObjectId ItemId { get; set; }
		public required bool IsLiked { get; set; }
        public required LikeType Type { get; set; }
    }

    public enum LikeType
    {
        Author,
        Post,
        Comment
    }
}

