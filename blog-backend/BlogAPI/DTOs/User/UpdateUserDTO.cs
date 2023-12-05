namespace BlogAPI.DTOs.User
{
    public class UpdateUserDTO
    {     
            public required string UserId { get; set; }
            public  required string Name { get; set; }
            public  required string Surname { get; set; }
            public int? Phone { get; set; }
            public required string Email { get; set; }        
    }
}
