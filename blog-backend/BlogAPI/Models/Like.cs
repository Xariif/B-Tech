using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BlogAPI.Models
{
	public class Like
	{
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId UserId { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId ItemId { get; set; }

		public bool IsLiked { get; set; }

        public LikeType Type { get; set; }

    }

    public enum LikeType
    {
        Post,
        Comment
    }
}

