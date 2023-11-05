namespace BlogAPI.DTOs.Author
{
    public class AuthorDTO
    {
        public required string Id { get; set; }
        public required string Name { get; set; }
        public required string Surname { get; set; }
        public string? Description { get; set; }
        public required DateTime ActiveFrom { get; set; }
    }
}
