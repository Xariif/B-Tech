using Auth0.ManagementApi.Models;
using BlogAPI.DTOs.Author;
using BlogAPI.Models;
using Microsoft.DotNet.Scaffolding.Shared.CodeModifier.CodeChange;
using Microsoft.OpenApi.Models;
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
        static HttpClient client = new HttpClient();

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


        public async Task DeleteUserAsync(string userId)
        {
            var filter = Builders<User>.Filter.Where(x => x.UserId == userId);
            await _userCollection.DeleteOneAsync(filter);

            var builder = WebApplication.CreateBuilder();

            string managementApiToken = builder.Configuration["Auth0:ManagmentToken"];

            var requestUrl = $"https://dev-uasjfxeuwrj58j4g.us.auth0.com/api/v2/users/{userId}";

            var request = new HttpRequestMessage(HttpMethod.Delete, requestUrl);
            request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", managementApiToken);

            HttpResponseMessage response = await client.SendAsync(request);

            if (!response.IsSuccessStatusCode)
                throw new Exception();
        }


        public async Task GiveRole(string userId, string roleId)
        {
            var builder = WebApplication.CreateBuilder();
                       

            string managementApiToken = builder.Configuration["Auth0:ManagmentToken"];

            string[] roleIds = { roleId }; // Replace with the role IDs

            var requestUrl = $"https://dev-uasjfxeuwrj58j4g.us.auth0.com/api/v2/users/{userId}/roles";

            var rolesPayload = new { roles = roleIds };

            var json = Newtonsoft.Json.JsonConvert.SerializeObject(rolesPayload);

            var request = new HttpRequestMessage(HttpMethod.Post, requestUrl);
            request.Content = new StringContent(json, Encoding.UTF8, "application/json");
            request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", managementApiToken);

            HttpResponseMessage response = await client.SendAsync(request);

            if (!response.IsSuccessStatusCode)
                throw new Exception();

        }
        public async Task RemoveRole(string userId, string roleId)
        {
            var builder = WebApplication.CreateBuilder();


            string managementApiToken = builder.Configuration["Auth0:ManagmentToken"];


            string[] roleIds = { roleId }; 

            var requestUrl = $"https://dev-uasjfxeuwrj58j4g.us.auth0.com/api/v2/users/{userId}/roles";

            var rolesPayload = new { roles = roleIds };

            var json = Newtonsoft.Json.JsonConvert.SerializeObject(rolesPayload);

            var request = new HttpRequestMessage(HttpMethod.Delete, requestUrl);
            request.Content = new StringContent(json, Encoding.UTF8, "application/json");
            request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", managementApiToken);

            HttpResponseMessage response = await client.SendAsync(request);

            if (!response.IsSuccessStatusCode)
                throw new Exception();

        }
    }
}
