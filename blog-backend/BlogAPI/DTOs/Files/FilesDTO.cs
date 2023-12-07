
namespace BlogAPI.DTOs.Files
{
    public class FilesDTO
    {
        public string Id { get; set; }
        public int Length { get; set; }
        public int ChunkSize { get; set; }
        public DateTime UploadDate { get; set; }
        public string FileName { get; set; }
        public MetadataDTO Metadata { get; set; }
    }

    public class MetadataDTO
    {
        public string ContentType { get; set; }
        public string Md5 { get; set; }
        public string[]? Aliases { get; set; }
    }
}
