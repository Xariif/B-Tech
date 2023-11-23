using Auth0.ManagementApi.Models;

namespace BlogAPI.Interfaces.Services
{
    public interface IUserService
    {
        User GetUserByEmail(string email);
        List<User> GetUsers();

    }
}
