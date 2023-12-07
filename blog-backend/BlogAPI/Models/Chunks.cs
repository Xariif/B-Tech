using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BlogAPI.Models
{
    public class Chunks
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public required ObjectId Id { get; set; }
        public required ObjectId FilesId { get; set; }
        public required int N { get; set; }
        public required byte[] Data { get; set; }
    }
}

