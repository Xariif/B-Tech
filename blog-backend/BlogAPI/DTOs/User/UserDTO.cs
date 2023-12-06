using System.ComponentModel.DataAnnotations;

namespace BlogAPI.DTOs.Author
{
    public class UserDto
    {
        public required string Id { get; set; }
        public required string UserId { get; set; }
        public required string Name { get; set; }
        public required string Surname { get; set; }
        public int? Phone { get; set; }
        public required string Email { get; set; }
        public DateTime? ActiveFrom { get; set; }
    }
}
