using BlogAPI.Interfaces.Repositories;
using BlogAPI.Repositories;
using BlogAPI.Services;
using RestSharp;

namespace BlogAPI.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services )
        {
            services.AddScoped<PostService>();
            services.AddScoped<UserService>();
            services.AddScoped<Auth0Service>();

            services.AddScoped<PostRepository>();
            services.AddScoped<UserRepository>();
            services.AddScoped<Auth0Repository>();

            


            return services;
        }


    }
}
