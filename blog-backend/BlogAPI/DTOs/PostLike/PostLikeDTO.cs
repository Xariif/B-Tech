using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BlogAPI.DTOs.PostLike
{
	public class PostLikeDTO
	{
      
            public string Id { get; set; }

            public string UserId { get; set; }

            public string PostId { get; set; }

            public bool IsLiked { get; set; }

    }
}

