using BlogAPI.Factory;
using BlogAPI.Utils;
using RestSharp;

namespace BlogAPI.Repositories
{
    public class Auth0Repository
    {
        private readonly IConfigurationRoot _configuration = ConfigUtils.GetConfig();
        private readonly Auth0Factory _restSharpFactory;


        public Auth0Repository()
        {
            _restSharpFactory = new Auth0Factory("https://dev-uasjfxeuwrj58j4g.us.auth0.com", _configuration);
        }


        public Task<RestResponse> GetAsync(string endpoint, List<HeaderParameter>? headers = null, object? body = null)
        {
            return _restSharpFactory.RequestAsync(endpoint, Method.Get, headers, body);
        }

        public Task<RestResponse> PostAsync(string endpoint, List<HeaderParameter>? headers = null, object? body = null)
        {
            return _restSharpFactory.RequestAsync(endpoint, Method.Post, headers, body);
        }

        public Task<RestResponse> PutAsync(string endpoint, List<HeaderParameter>? headers = null, object? body = null)
        {
            return _restSharpFactory.RequestAsync(endpoint, Method.Put, headers, body);
        }

        public Task<RestResponse> DeleteAsync(string endpoint, List<HeaderParameter>? headers = null, object? body = null)
        {
            return _restSharpFactory.RequestAsync(endpoint, Method.Delete, headers, body);
        }
    }
}
