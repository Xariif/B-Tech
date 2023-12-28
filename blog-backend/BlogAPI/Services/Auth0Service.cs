using Auth0.ManagementApi.Models;
using BlogAPI.Repositories;
using Newtonsoft.Json;
using RestSharp;

namespace BlogAPI.Services
{
    public class Auth0Service
    {
        readonly Auth0Repository _auth0Repository = new();
        private readonly UsersRepository _usersRepository;

        public Auth0Service(UsersRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }

        public async Task<bool> DeleteUserAsync(string auth0Id)
        {
            var res = await _auth0Repository.DeleteAsync($"/api/v2/users/{auth0Id}");

            if (!res.IsSuccessful)
                throw new Exception(res.ErrorMessage);

            return res.IsSuccessful;
        }

        public async Task<bool> DeleteUserConnectionAsync(string auth0Id)
        {
            var res = await _auth0Repository.DeleteAsync($"/api/v2/connections/{auth0Id}/users");

            if (!res.IsSuccessful)
                throw new Exception(res.ErrorMessage);

            return res.IsSuccessful;
        }

        public async Task<bool> GiveRoleAsync(string auth0Id, string rolesId)
        {
            var rolesPayload = new { roles = new[] { rolesId } };
            var json = Newtonsoft.Json.JsonConvert.SerializeObject(rolesPayload);

            var headers = new List<HeaderParameter>
            {
                new HeaderParameter("Content-Type", "application/json")
            };

            var res = await _auth0Repository.PostAsync($"/api/v2/users/{auth0Id}/roles", headers, json);

            if (!res.IsSuccessful)
                throw new Exception(res.ErrorMessage);

            return res.IsSuccessful;
        }

        public async Task<bool> RemoveRoleAsync(string auth0Id, string roleId)
        {
            var rolesPayload = new { roles = new[] { roleId } };
            var json = Newtonsoft.Json.JsonConvert.SerializeObject(rolesPayload);

            var headers = new List<HeaderParameter>
            {
                new HeaderParameter("Content-Type", "application/json")
            };

            var res = await _auth0Repository.DeleteAsync($"/api/v2/users/{auth0Id}/roles", headers, json);

            if (!res.IsSuccessful)
                throw new Exception(res.ErrorMessage);

            return res.IsSuccessful;
        }

        public async Task<List<Role>?> GetUserRolesAsync(string auth0Id)
        {
            var res = await _auth0Repository.GetAsync($"/api/v2/users/{auth0Id}/roles");
            var roles = new List<Role>();

            if (res.Content != null)
                roles = JsonConvert.DeserializeObject<List<Role>>(res.Content);

            return roles;
        }

        public async Task<List<User>?> GetUsersAsync()
        {
            var res = await _auth0Repository.GetAsync("/api/v2/users");
            var users = new List<User>();

            if (res.Content != null)
                users = JsonConvert.DeserializeObject<List<User>>(res.Content);

            return users;
        }
    }
}
