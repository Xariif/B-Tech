namespace BlogAPI.DTOs.Users
{
    public class UsersDTO
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public int? Phone { get; set; }
        public string Email { get; set; }
        public string UserId { get; set; }
        public DateTime ActiveFrom { get; set; }
    }
}
