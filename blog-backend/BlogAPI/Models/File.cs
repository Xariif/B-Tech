using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BlogAPI.Models
{
    public class File
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public required ObjectId Id { get; set; }
        public required string Name { get; set; }
        public required string Type { get; set; }
        public required long Size { get; set; }
        public required FileData FileData { get; set; }
    }

    public class FileData
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public required ObjectId Id { get; set; }
        public required byte[] File{ get; set; }
    }
}
