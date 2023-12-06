namespace BlogAPI.DTOs.User
{
    public class UpdateUserDto
    {     
            public  required string Name { get; set; } 
            public  required string Surname { get; set; }
            public int? Phone { get; set; }
    }
}
