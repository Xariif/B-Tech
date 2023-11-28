﻿using Amazon.Runtime.Internal;
using Auth0.ManagementApi.Models;
using BlogAPI.Factory;
using BlogAPI.Interfaces.Repositories;
using BlogAPI.Models;
using BlogAPI.Utils.Auth0;
using RestSharp;
using System.Text.Json;
using System.Threading.Tasks;

namespace BlogAPI.Repositories
{
    public class Auth0Repository
    {
        private readonly IConfigurationRoot _configuration;
        private Auth0Factory _restSharpFactory;


        public Auth0Repository(IConfigurationRoot configuration)
        {
            _configuration = configuration;
            var baseUrl = _configuration["Auth0:Domain"]; 
            _restSharpFactory = new Auth0Factory(baseUrl, configuration);            
        }


        public async Task<RestResponse> GetAsync(string endpoint, List<HeaderParameter>? headers = null, object? body = null)
        {
            return await _restSharpFactory.RequestAsync(endpoint,Method.Get, headers,body);
        }

        public async Task<RestResponse> PostAsync(string endpoint, List<HeaderParameter>? headers = null, object? body = null)
        {
            return await _restSharpFactory.RequestAsync(endpoint, Method.Post, headers, body);
        }

        public async Task<RestResponse> PutAsync(string endpoint, List<HeaderParameter>? headers = null, object? body = null)
        {
            return await _restSharpFactory.RequestAsync(endpoint, Method.Put, headers, body);
        }

        public async Task<RestResponse> DeleteAsync(string endpoint, List<HeaderParameter>? headers = null, object? body = null)
        {
            return await _restSharpFactory.RequestAsync(endpoint, Method.Delete, headers, body);
        }
    }
}
