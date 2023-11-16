using MongoDB.Bson;

namespace BlogAPI.Models
{
    public class File
    {
        public ObjectId Id { get; set; }
        public required string Name { get; set; }
        public required string Type { get; set; }
        public required long Size { get; set; }
        public required FileData FileData { get; set; }
    }

    public class FileData
    {
        public ObjectId Id { get; set; }
        public required string FileString { get; set; }
    }
}
