namespace BlogAPI.DTOs.Users
{
    public class UpdateUsersDTO
    {
        public string Name { get; set; }
        public string Surname { get; set; }

        public int? Phone { get; set; }
        public string? Email { get; set; }
        public IFormFile? Avatar { get; set; }
    }
}
