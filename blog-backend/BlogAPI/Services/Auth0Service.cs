using BlogAPI.Models;
using BlogAPI.Repositories;
using MongoDB.Driver;
using RestSharp;
using System.Text;

namespace BlogAPI.Services
{
    public class Auth0Service : BaseService
    {
        static HttpClient client = new HttpClient();


   








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

        public async Task GetAllUsersAuth0Async()
        {


            var builder = WebApplication.CreateBuilder();

            string managementApiToken = builder.Configuration["Auth0:ManagmentToken"];

            var requestUrl = $"https://dev-uasjfxeuwrj58j4g.us.auth0.com/api/v2/users/";

            var request = new HttpRequestMessage(HttpMethod.Delete, requestUrl);
            request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", managementApiToken);

            HttpResponseMessage response = await client.SendAsync(request);

            if (!response.IsSuccessStatusCode)
                throw new Exception();


        }




        public async Task<List<Auth0.ManagementApi.Models.User>> GetUsersAsync()
        {
            var headers = new List<HeaderParameter>();
            headers.Add(new HeaderParameter("Content-Type", "application/json"));
            

          // var res  =await _repository.GetAsync("",headers);


            var test = "1";

            throw new Exception();


        }
    }
}
