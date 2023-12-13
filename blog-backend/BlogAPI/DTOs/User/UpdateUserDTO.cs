namespace BlogAPI.DTOs.User
{
    public class UpdateUserDTO
    {
     
            public  string UserId { get; set; }
            public  string Name { get; set; }
            public  string? Surname { get; set; }
            public int? Phone { get; set; }
            public string? Email { get; set; }
            public string? Description { get; set; }
        
    }
}
