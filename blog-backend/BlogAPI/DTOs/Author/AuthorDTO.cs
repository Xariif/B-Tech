namespace BlogAPI.DTOs.Author
{
    public class AuthorDTO
    {
        public string? Id { get; set; }
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public string? Description { get; set; }
        public DateTime? ActiveFrom { get; set; }        
    }
}
