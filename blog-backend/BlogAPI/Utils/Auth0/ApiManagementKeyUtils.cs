using BlogAPI.Models;
using Newtonsoft.Json;
using RestSharp;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace BlogAPI.Utils.Auth0
{
    public static class ApiManagementKeyUtils
    {
        private static Token? _accessToken;
        private static ClaimsPrincipal User;

        public static void SetAccessToken(Token token)
        {
            _accessToken = token;
        }

        public static async Task<Token> GetTokenAsync(RestClient client, IConfigurationRoot configuration)
        {

            if (_accessToken != null && !IsAccessTokenExpired(_accessToken))
            {
                return _accessToken;
            }


            string? clientId = configuration["Auth0:M2MClientId"];
            string? clientSecret = configuration["Auth0:ClientSecret"];
            string? managementAudience = configuration["Auth0:Domain"] + "api/v2/";



            var request = new RestRequest("oauth/token", Method.Post);
            request.AddHeader("content-type", "application/x-www-form-urlencoded");
            request.AddParameter("client_id", clientId);
            request.AddParameter("client_secret", clientSecret);
            request.AddParameter("audience", managementAudience);
            request.AddParameter("grant_type", "client_credentials");

            var response = await client.ExecuteAsync<Token>(request);

            Token token = JsonConvert.DeserializeObject<Token>(response.Content);


            if (!response.IsSuccessful)
                throw new Exception("Bad request");


            return token ?? throw new Exception(response.ErrorMessage);
        }
        private static bool IsAccessTokenExpired(Token token)
        {
            if (token.ExpiresIn == null)
            {
                return true;
            }

            var tokenHandler = new JwtSecurityTokenHandler();



            var jwtToken = tokenHandler.ReadJwtToken(token.AccessToken);

            if (jwtToken.ValidTo >= DateTime.UtcNow)
                return false;

            return true;
        }




    }
}
