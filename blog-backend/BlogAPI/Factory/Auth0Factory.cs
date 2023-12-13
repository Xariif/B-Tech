using BlogAPI.Utils.Auth0;
using RestSharp;

namespace BlogAPI.Factory
{
    public class Auth0Factory
    {
        private readonly RestClient _client;
        private readonly IConfigurationRoot _configuration;

        public Auth0Factory(string url, IConfigurationRoot configuration)
        {
            _client = new RestClient(url);
            _configuration = configuration;
        }

        public async Task<RestResponse> RequestAsync(string endpoint, Method method, List<HeaderParameter>? headers = null, object? body = null)
        {
            var token = await ApiManagementKeyUtils.GetTokenAsync(_client, _configuration) ?? throw new Exception("No token");
            _client.AddDefaultHeader("Authorization", $"Bearer {token.AccessToken}");

            var request = new RestRequest(endpoint, method);

            if (headers != null)
            {
                foreach (var header in headers)
                {
                    if (header?.Name != null)
                        request.AddHeader(header.Name, header?.Value?.ToString() ?? string.Empty);
                }
            }

            if (body != null)
            {
                request.AddJsonBody(body);
            }

            var response = await _client.ExecuteAsync(request);



            if (!response.IsSuccessful)
                throw new Exception(response.ErrorMessage);

            return response;
        }
    }
}
