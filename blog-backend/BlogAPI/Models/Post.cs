﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BlogAPI.Models
{
	public class Post
	{
		[BsonId]
		[BsonRepresentation(BsonType.ObjectId)]
		public required ObjectId Id { get; set; }

		public required string Title { get; set; }

		public required string Content { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public required ObjectId AuthorId { get; set; }

		public required string Category { get; set; }

		public required string Tag { get; set; }

		public required DateTime CreatedAt { get; set; }

		public required DateTime UpdatedAt { get; set; } = DateTime.Now;

		public int Views { get; set; } = 0;

		public int Likes { get; set; } = 0;

		public int Dislikes { get; set; } = 0;

        public List<Comment> Comments { get; set; } = new List<Comment>();

    }
}


