using Auth0.ManagementApi.Models;
using BlogAPI.Interfaces.Repositories;
using BlogAPI.Repositories;
using MongoDB.Driver;
using Newtonsoft.Json;
using RestSharp;

namespace BlogAPI.Services
{
    public class Auth0Service 
    {
        readonly Auth0Repository _auth0Repository = new();
        private readonly UserRepository _userRepository;

        public Auth0Service(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<bool> DeleteUserAsync(string userId)
        {
            await _userRepository.DeleteAsync(userId);

            var res = await _auth0Repository.DeleteAsync($"/api/v2/users/{userId}");

            if (!res.IsSuccessful)
                throw new Exception(res.ErrorMessage);

            return res.IsSuccessful;
        }

        public async Task<bool> GiveRoleAsync(string userId, string roleId)
        {
            var rolesPayload = new { roles = roleId };
            var json = Newtonsoft.Json.JsonConvert.SerializeObject(rolesPayload);

            var headers = new List<HeaderParameter>
            {
                new HeaderParameter("Content-Type", "application/json")
            };

            var res = await _auth0Repository.PostAsync($"/api/v2/users/{userId}/roles", headers, json);

            if (!res.IsSuccessful)
                throw new Exception(res.ErrorMessage);

            return res.IsSuccessful;
        }

        public async Task<bool> RemoveRoleAsync(string userId, string roleId)
        {
            var rolesPayload = new { roles = roleId };
            var json = Newtonsoft.Json.JsonConvert.SerializeObject(rolesPayload);

            var headers = new List<HeaderParameter>
            {
                new HeaderParameter("Content-Type", "application/json")
            };

            var res = await _auth0Repository.DeleteAsync($"/api/v2/users/{userId}/roles", headers, json);

            if (!res.IsSuccessful)
                throw new Exception(res.ErrorMessage);

            return res.IsSuccessful;
        }

        public async Task<List<Role>?> GetUserRolesAsync(string userId)
        {
            var res = await _auth0Repository.GetAsync($"/api/v2/users/{userId}/roles");
            var roles = new List<Role>();

            if (res.Content != null)
                roles = JsonConvert.DeserializeObject<List<Role>>(res.Content);

            return roles;
        }

        public async Task<List<User>?> GetUsersAsync()
        {
            var res = await _auth0Repository.GetAsync("/api/v2/users");
            var users = new List<User>();

            if(res.Content!= null)
                 users = JsonConvert.DeserializeObject<List<User>>(res.Content);

            return users;
        }
    }
}
