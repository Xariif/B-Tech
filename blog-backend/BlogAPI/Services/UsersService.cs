using BlogAPI.DTOs.Users;
using BlogAPI.Repositories;
using Users = BlogAPI.Models.Users;

namespace BlogAPI.Services
{
    public class UsersService
    {
        private readonly UsersRepository _usersRepository;

        public UsersService(UsersRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }


        public async Task<UsersDTO> GetUserByUserIdAsync(string userId)
        {
            var user = await _usersRepository.FindByUserIdAsync(userId) ?? throw new ArgumentException("User not found");
            return new UsersDTO
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



        public Task<List<UsersDTO>> GetAllUsersAsync()
        {

            var users = _usersRepository.FindAllAsync<Users>();
            var usersDto = users.Result.Select(user => new UsersDTO
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

        public async Task UpdateUserAsync(string userId, UsersDTO updateUser)
        {

            var user = await _usersRepository.FindByUserIdAsync(userId) ??
                       throw new ArgumentException("User not found");
            user = new Users
            {
                Id = user.Id,
                UserId = user.UserId,
                Name = updateUser.Name,
                Surname = updateUser.Surname,
                ActiveFrom = user.ActiveFrom,
                Phone = updateUser.Phone,
                Email = user.Email
            };

            await _usersRepository.UpdateAsync<Users>(user.Id.ToString(), user);
        }



        public async Task DeleteUserAsync(string id)
        {
            await _usersRepository.DeleteAsync(id);
        }

    }
}
