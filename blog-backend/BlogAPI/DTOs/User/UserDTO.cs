using System.ComponentModel.DataAnnotations;

namespace BlogAPI.DTOs.Author
{
    public class UserDTO
    {
        [Required(ErrorMessage = "Id is required")]
        public string? Id { get; set; }
        public  string? UserId { get; set; }
        public  string? Name { get; set; }
        public  string? Surname { get; set; }
        public int? Phone { get; set; }
        public string? Email { get; set; }
        public string? Description { get; set; }
        public DateTime? ActiveFrom { get; set; }
    }

    public record TestUserDTO(string FirstName, string LastName, string Email);

}
