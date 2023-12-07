using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BlogAPI.Models
{
    public class Files
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public required ObjectId Id { get; set; }
        public required int Length { get; set; }
        public required int ChunkSize{ get; set; }
        public required DateTime UploadDate { get; set; }
        public required string FileName { get; set; }
        public required Metadata Metadata { get; set; }


    }

    public class Metadata
    {
        public required string ContentType { get; set; }
        public required string Md5 { get; set; }
        public string[]? Aliases { get; set; }
    }
}
