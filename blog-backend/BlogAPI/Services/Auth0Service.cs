using Auth0.ManagementApi.Models;
using BlogAPI.Repositories;
using MongoDB.Driver;
using Newtonsoft.Json;
using RestSharp;
using User = Auth0.ManagementApi.Models.User;

namespace BlogAPI.Services
{
    public class Auth0Service : BaseService
    {
        static HttpClient client = new HttpClient();

        Auth0Repository _repository = new Auth0Repository();

        public async Task<bool> DeleteUserAsync(string userId)
        {
            var filter = Builders<Models.User>.Filter.Where(x => x.UserId == userId);
            await _userCollection.DeleteOneAsync(filter);

            var res = await _repository.DeleteAsync($"/api/v2/users/{userId}");

            if (!res.IsSuccessful)
                throw new Exception(res.ErrorMessage);

            return res.IsSuccessful;
        }



        public async Task<bool> GiveRoleAsync(string userId, string roleId)
        {
            var rolesPayload = new { roles = roleId };

            var json = Newtonsoft.Json.JsonConvert.SerializeObject(rolesPayload);

            var headers = new List<HeaderParameter>();

            headers.Add(new HeaderParameter("Content-Type", "application/json"));

            var res = await _repository.PostAsync($"/api/v2/users/{userId}/roles", headers, json);

            if (!res.IsSuccessful)
                throw new Exception(res.ErrorMessage);

            return res.IsSuccessful;
        }


        public async Task<bool> RemoveRoleAsync(string userId, string roleId)
        {
            var rolesPayload = new { roles = roleId };

            var json = Newtonsoft.Json.JsonConvert.SerializeObject(rolesPayload);

            var headers = new List<HeaderParameter>();

            headers.Add(new HeaderParameter("Content-Type", "application/json"));

            var res = await _repository.DeleteAsync($"/api/v2/users/{userId}/roles", headers, json);

            if (!res.IsSuccessful)
                throw new Exception(res.ErrorMessage);

            return res.IsSuccessful;
        }

        public async Task<List<Role>> GetUserRolesAsync(string userId)
        {
            var res = await _repository.GetAsync($"/api/v2/users/{userId}/roles");

            if (!res.IsSuccessful)
                throw new Exception(res.ErrorMessage);

            var roles = JsonConvert.DeserializeObject<List<Role>>(res.Content);

            return roles;
        }

        public async Task<List<User>> GetUsersAsync()
        {
            var res = await _repository.GetAsync("/api/v2/users");

            if (!res.IsSuccessful)
                throw new Exception(res.ErrorMessage);

            var users = JsonConvert.DeserializeObject<List<User>>(res?.Content);

            return users;
        }
    }
}
