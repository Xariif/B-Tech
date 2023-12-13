using Auth0.ManagementApi.Models;
using BlogAPI.Models;
using RestSharp;
using System.IdentityModel.Tokens.Jwt;

namespace BlogAPI.Utils.Auth0
{
    public static class ApiMenegmentKeyUtils
    {
        private static AccessToken? _accessToken;

        public static void SetAccessToken(AccessToken accessToken)
        {
            _accessToken = accessToken;
        }

        public static async Task<AccessToken> GetTokenAsync(RestClient client,IConfigurationRoot configuration)
        {

            if (_accessToken != null  && !IsAccessTokenExpired(_accessToken))
            {
                return _accessToken;
            }


            string? clientId =  configuration["Auth0:M2MClientId"];
            string? clientSecret = configuration["Auth0:ClientSecret"];
            string? managementAudience = configuration["Auth0:Domain"] + "/api/v2/";



            var request = new RestRequest("/oauth/token", Method.Post);
            request.AddHeader("content-type", "application/x-www-form-urlencoded");
            request.AddParameter("client_id", clientId);
            request.AddParameter("client_secret", clientSecret);
            request.AddParameter("audience", managementAudience);
            request.AddParameter("grant_type", "client_credentials");

            RestResponse<AccessToken>? response = await client.ExecuteAsync<AccessToken>(request);

            if (!response.IsSuccessful)
                throw new Exception("Bad request");

            _accessToken = response.Data;

            return response.Data ?? throw new Exception(response.ErrorMessage);
        }
        private static bool IsAccessTokenExpired(AccessToken accessToken)
        {

            var tokenHandler = new JwtSecurityTokenHandler();


            var token = tokenHandler.ReadJwtToken(accessToken.access_token);

            if(token.ValidTo >= DateTime.UtcNow)
                return false;

            return true;
        }



      
    }
}
