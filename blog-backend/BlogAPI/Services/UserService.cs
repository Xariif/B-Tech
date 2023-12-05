using Auth0.ManagementApi.Models;
using BlogAPI.DTOs.Author;
using BlogAPI.DTOs.User;
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


        public async Task<UserDTO> GetUserByUserIdAsync(string userId)
        {
            var user = await _userRepository.FindByUserIdAsync(userId) ?? throw new ArgumentException("User not found");
            return new UserDTO
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

   

        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _userRepository.FindAllAsync();
        }
          
        public async Task UpdateUserAsync(UpdateUserDTO updateUser)
        {
            var user = await _userRepository.FindByUserIdAsync(updateUser.UserId) ?? throw new ArgumentException("User not found");
            user = new User
            {
                Id = user.Id,
                UserId = updateUser.UserId,
                Name = updateUser.Name ,
                Surname = updateUser.Surname,
                ActiveFrom = user.ActiveFrom,
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
