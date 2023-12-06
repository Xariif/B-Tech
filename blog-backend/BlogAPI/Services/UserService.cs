using BlogAPI.DTOs.Author;
using BlogAPI.DTOs.User;
using BlogAPI.Repositories;
using User = BlogAPI.Models.User;

namespace BlogAPI.Services
{
    public class UserService
    {
        private readonly UserRepository _userRepository;

        public UserService(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }


        public async Task<UserDto> GetUserByUserIdAsync(string userId)
        {
            var user = await _userRepository.FindByUserIdAsync(userId) ?? throw new ArgumentException("User not found");
            return new UserDto
            {              
                Id = user.Id.ToString(),
                UserId = user.UserId,
                Name = user.Name,
                Surname = user.Surname,
                ActiveFrom = user.ActiveFrom,
                Email = user.Email,
                Phone = user.Phone
            };
        }

   

        public Task<List<UserDto>> GetAllUsersAsync()
        {

         var users  = _userRepository.FindAllAsync<User>();
         var usersDto = users.Result.Select(user => new UserDto
             {
                 Id = user.Id.ToString(),
                 UserId = user.UserId,
                 Name = user.Name,
                 Surname = user.Surname,
                 ActiveFrom = user.ActiveFrom,
                 Email = user.Email,
                 Phone = user.Phone
             })
             .ToList();


         return Task.FromResult(usersDto);
        }
          
        public async Task UpdateUserAsync(string userId ,UpdateUserDto updateUser)
        {
            
            var user = await _userRepository.FindByUserIdAsync(userId) ??
                       throw new ArgumentException("User not found");
            user = new User
            {
                Id = user.Id,
                UserId = user.UserId,
                Name = updateUser.Name,
                Surname = updateUser.Surname,
                ActiveFrom = user.ActiveFrom,
                Phone = updateUser.Phone,
                Email = user.Email
            };
            
             await _userRepository.UpdateAsync<User>(user.Id.ToString(), user);
        }
          


        public async Task DeleteUserAsync(string id)
        {
            await _userRepository.DeleteAsync(id);
        }
 
    }
}
