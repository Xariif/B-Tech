using Auth0.ManagementApi.Models;
using BlogAPI.DTOs.Author;
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
    public class UserService : BaseService
    {
      

        public async Task<UserDTO> GetUserByUserIdAsync(string id)
        {
            var user = await GetByUserIdAsync(_userCollection, id) ?? throw new ArgumentException("User not found");
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

        public async Task<UserDTO> GetUserByNameSurnameAsync(string name, string surname)
        {
            var filter = Builders<User>.Filter.Where(x => x.Name == name && x.Surname == surname);
            var cursor = await _userCollection.FindAsync(filter);
            var user = await cursor.FirstOrDefaultAsync() ?? throw new ArgumentException("User not found");
            return new UserDTO
            {
                UserId = user.UserId,
                Name = user.Name,
                Surname = user.Surname,
                ActiveFrom = user.ActiveFrom,
                Email = user.Email,
                Description = user.Description,
                Phone = user.Phone,
            };
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            var filter = Builders<User>.Filter.Empty;

            var cursor =await _userCollection.FindAsync(filter);

            var users = await cursor.ToListAsync();

            return users;
        }
          
        public async Task UpdateUserAsync(UserDTO updateUser)
        {
            var user = await GetByIdAsync(_userCollection, updateUser.UserId) ?? throw new ArgumentException("Author not found");
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

            await _userCollection.ReplaceOneAsync(filter, user);
        }
          

        public async Task CreateAuthorInDbAsync(string userId)
        {
            var author = new Author()

            {
                Id = ObjectId.GenerateNewId(),
                UserId = userId,
                Desciption = null,
                SocialMedia = null,
            };
        

            var filter = Builders<Author>.Filter.Where(x => x.UserId == userId);
            var res = await _authorCollection.Find(filter).ToListAsync();
            if (res.Any())
            {
                throw new ArgumentException("Author with same id already exist.");
            }

            await _authorCollection.InsertOneAsync(author);
        }
        public async Task DeleteAuthorFromDbAsync(string userId)
        {
        
            var filter = Builders<Author>.Filter.Where(x => x.UserId == userId);
            var res = await _authorCollection.DeleteOneAsync(filter);
            if (res.DeletedCount == 0)
            {
                throw new ArgumentException("Author with this id dont exist.");
            }                       
        }
    }
}
