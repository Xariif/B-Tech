namespace BlogAPI.DTOs.Author
{
    public class UserDTO
    {
        public required string UserId { get; set; }
        public required string Name { get; set; }
        public required string Surname { get; set; }
        public int? Phone { get; set; }
        public string? Email { get; set; }
        public string? Description { get; set; }
        public required DateTime ActiveFrom { get; set; }

    }
}
