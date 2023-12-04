using Auth0.ManagementApi.Models;
using BlogAPI.DTOs.Author;
using BlogAPI.Interfaces.Repositories;
using BlogAPI.Models;
using BlogAPI.Repositories;
using Microsoft.DotNet.Scaffolding.Shared.CodeModifier.CodeChange;
using Microsoft.OpenApi.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using RestSharp;
using System.Net.Http.Headers;
using System.Text;
using Method = RestSharp.Method;
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


        public async Task<UserDTO> GetUserByUserIdAsync(string id)
        {
            var user = await _userRepository.FindByIdAsync(id) ?? throw new ArgumentException("User not found");
            return new UserDTO
            {
                UserId = user.UserId,
                Name = user.Name,
                Surname = user.Surname,
                Description = user.Description,
                ActiveFrom = user.ActiveFrom,
                Email = user.Email,
                Phone = user.Phone,

            };
        }

   

        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _userRepository.FindAllAsync();
        }
          
        public async Task UpdateUserAsync(UserDTO updateUser)
        {
            var user = await _userRepository.FindByIdAsync(updateUser.UserId) ?? throw new ArgumentException("Author not found");
            user = new User
            {
                Id = user.Id,
                UserId = updateUser.UserId,
                Name = updateUser.Name ?? throw new ArgumentException("Name is required"),
                Surname = updateUser.Surname ?? throw new ArgumentException("Surname is required"),
                Description = updateUser.Description,
                ActiveFrom = updateUser.ActiveFrom,
                Email = updateUser.Email,
                Phone = updateUser.Phone,
            };


            var filter = Builders<User>.Filter.Where(x => x.UserId == user.UserId);

            await _userRepository.UpdateAsync(user.Id.ToString(), user);
        }
          


        public async Task DeleteUserAsync(string id)
        {
            await _userRepository.DeleteAsync(id);
        }
 
    }
}
