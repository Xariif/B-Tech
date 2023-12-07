using BlogAPI.Repositories;
using BlogAPI.Services;

namespace BlogAPI.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<PostsService>();
            services.AddScoped<UsersService>();
            services.AddScoped<Auth0Service>();

            services.AddScoped<PostsRepository>();
            services.AddScoped<UsersRepository>();
            services.AddScoped<Auth0Repository>();




            return services;
        }


    }
}
